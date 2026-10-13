#!/usr/bin/env python3
"""Integrate the dated version/access review without promoting missing access to evidence."""
import gzip
import hashlib
import json
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from review_sap_versions import compare_version

ROOT=Path(__file__).resolve().parents[1]
SNAPSHOT=ROOT/'research/finish-2026-10-13'
PUBLIC=ROOT/'public/knowledge'
DATE='2026-10-13'


def read(path):return json.loads(path.read_text())
def write(path,value):path.write_text(json.dumps(value,ensure_ascii=False,separators=(',',':'))+'\n')


def prepare_index():
    docs=json.loads(gzip.decompress((PUBLIC/'index.json.gz').read_bytes()))
    # Replaying the review replaces its own records, preserving the pinned corpus.
    docs=[d for d in docs if d.get('reviewSnapshot')!=DATE]
    topics=read(SNAPSHOT/'current-help-topics.json')
    for topic in topics:
        if topic['status']!='collected':continue
        docs.append({**topic,'reviewSnapshot':DATE,'repository':'SAP Help Portal','publisher':'SAP','publisherClass':'sap',
            'kind':'sap-help-topic','path':urlparse(topic['url']).path.rsplit('/',1)[-1],
            'excerpt':'Tópico de '+str(topic.get('guideTitle') or topic['title'])+' · versão '+topic['version'],
            'flags':['version-specific']+(['version-out-of-maintenance'] if topic.get('versionOutOfMaintenance') else []),
            'license':'SAP website terms · original linked','fullText':'original-source-only'})
    partners=read(SNAPSHOT/'partner-sources.json')
    for page in partners:
        if page['status']!='collected':continue
        microsoft=urlparse(page['url']).hostname=='learn.microsoft.com'
        docs.append({'id':'partner-'+hashlib.sha256(page['url'].encode()).hexdigest()[:20],'url':page['url'],'title':page['title'],
            'reviewSnapshot':DATE,'repository':'Microsoft Learn' if microsoft else 'AWS Documentation',
            'publisher':'Microsoft' if microsoft else 'AWS','publisherClass':'partner','kind':'partner-documentation',
            'collectedAt':DATE,'sha256':page['sha256'],'headings':[h['text'] for h in page['headings']],
            'excerpt':'Documentação oficial do parceiro · fonte consultada em '+DATE,'flags':[],
            'license':'Publisher website terms · original linked','fullText':'original-source-only'})
    help_data=read(SNAPSHOT/'help-products-current.json')['data']['products']
    references={p['product']:parse_qs(urlparse(p.get('url','')).query).get('version',[''])[0] for p in help_data if p.get('url')}
    for d in docs:
        if d.get('productId'):
            target=references.get(d['productId'])
            d['indexReferenceVersion']=target
            d['versionReview']={'reviewedAt':DATE,'state':compare_version(d.get('version'),target),'referenceVersion':target}
    (PUBLIC/'index.json.gz').write_bytes(gzip.compress((json.dumps(docs,ensure_ascii=False,separators=(',',':'))+'\n').encode(),mtime=0))
    (PUBLIC/'help-products.json.gz').write_bytes(gzip.compress((json.dumps(help_data,ensure_ascii=False,separators=(',',':'))+'\n').encode(),mtime=0))
    return docs,topics,partners


def finish():
    docs,topics,partners=prepare_index()
    reviews=read(SNAPSHOT/'version-review.json')
    repository_reviews=read(SNAPSHOT/'github-revision-review.json')
    atlas_path=ROOT/'public/technical-data.js';atlas=json.loads(atlas_path.read_text().split('=',1)[1].strip().removesuffix(';'))
    # Source verification records a read, not automatic validation of every claim
    # or every old diagram edge citing that source.
    by_url={p['url']:p for p in partners if p['status']=='collected'}
    for source in atlas['sources'].values():
        if source['url'] in by_url:source.update(checked=DATE,liveVerified=True,sha256=by_url[source['url']]['sha256'])
    atlas_path.write_text('window.ATLAS = '+json.dumps(atlas,ensure_ascii=False,separators=(',',':'))+';')
    # Resolve newly collected references with the existing curated integration.
    from integrate_knowledge import integrate
    integrate()
    profiles=read(PUBLIC/'profiles.json')
    review_by_id={r['productId']:r for r in reviews}
    for p in profiles['products']:
        r=review_by_id[p['id']];p['versionReview']=r
        p['currentDocuments']=[d['id'] for d in docs if d.get('productId')==r['primaryProductId'] and d.get('versionReview',{}).get('state')=='same-version']
        p['mentionedDocuments']=sorted(set(p['mentionedDocuments']+p['currentDocuments']))
    profiles['reviewedAt']=DATE
    write(PUBLIC/'profiles.json',profiles)
    manifest=read(PUBLIC/'manifest.json')
    manifest['collectedAt']=DATE
    manifest['counts'].update(documents=len(docs),currentHelpTopics=sum(t['status']=='collected' for t in topics),
        partnerPagesVerified=sum(p['status']=='collected' for p in partners),productsVersionReviewed=len(reviews),
        primaryVersionReferences=sum(bool(r['primaryProductId']) for r in reviews),
        currentTopicProducts=len({t['productId'] for t in topics if t['status']=='collected'}),
        repositoryRevisionsReviewed=len(repository_reviews))
    manifest['limitations']=[
        {'source':'SAP Products A–Z','status':'publisher-access-denied','detail':'Nova tentativa em 13/10 devolveu 403 do próprio site. O catálogo de 09/10 continua identificado pela data original.'},
        {'source':'Versões SAP','status':'reviewed-with-explicit-unknowns','detail':'258 entradas revistas contra o índice de 13/10. Associações principais exigem título exato ou alias único. Versões diferentes são identificadas; não se deduz suporte ou obsolescência por comparação numérica.'},
        {'source':'SAP Help Portal','status':'partial-publisher-access-denied','detail':'Tópicos atuais lidos pela API pública em PRODUCTION, sem fallback DRAFT. A SAP passou a devolver Access Denied. As recusas ficam distintas de autenticação; o coletor interrompe os pedidos nesse estado.'},
        {'source':'AWS e Microsoft','status':'verified-accessible','detail':'As 29 fontes do mapa foram recolhidas diretamente em 13/10. Os repositórios GitHub continuam disponíveis.'},
        {'source':'Google Cloud','status':'redirect-domain-required','detail':'O site redireciona para docs.cloud.google.com, ainda bloqueado na verificação. O domínio adicional foi guardado no rascunho do ambiente.'},
        {'source':'SAP Notes e manuais protegidos','status':'authorized-session-unavailable','detail':'Não há autenticação SAP configurada. me.sap.com e support.sap.com foram adicionados ao rascunho de rede. Referências a notas não são apresentadas como notas lidas.'}]
    write(PUBLIC/'manifest.json',manifest)
    report={'reviewedAt':DATE,'overallStatus':'external-access-required','versionReview':{'products':len(reviews),
        'primaryReferences':sum(bool(r['primaryProductId']) for r in reviews),
        'ambiguousAssociations':[{'productName':r['productName'],'rule':r['matchRule'],'matchingProductIds':r['matchingProductIds']} for r in reviews if r['matchRule'].startswith('ambiguous-')],
        'meaning':'A revisão classifica a evidência existente; não valida uma instalação, contrato ou todas as funções de cada edição.'},
        'repositories':repository_reviews,'currentHelpTopics':{'collected':manifest['counts']['currentHelpTopics'],
        'accessDenied':sum(t['status']=='source-access-denied' for t in topics),'protected':sum(t['status']=='authentication-required' for t in topics)},
        'sources':manifest['limitations'],'requiredExternalActions':[
            'Aplicar/publicar os domínios adicionais nas definições do ambiente.',
            'Disponibilizar acesso SAP autorizado ou documentação exportada para os conteúdos efetivamente protegidos.',
            'Retomar as APIs SAP apenas depois de existir uma alteração de acesso; não reenviar pedidos rejeitados sem alteração.']}
    write(PUBLIC/'completion-review.json',report)
    atlas=json.loads(atlas_path.read_text().split('=',1)[1].strip().removesuffix(';'))
    atlas['knowledge']['collectedAt']=DATE
    atlas['knowledge']['versionReview']={r['productId']:r for r in reviews}
    atlas_path.write_text('window.ATLAS = '+json.dumps(atlas,ensure_ascii=False,separators=(',',':'))+';')
    print('Integrated current review:',manifest['counts'])


if __name__=='__main__':finish()
