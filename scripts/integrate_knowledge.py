#!/usr/bin/env python3
"""Associate collected prose with products; integrate only reviewed assertions into the map."""
import gzip
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/knowledge'
DATE = '2026-10-13'
LABELS = {'purpose':'Função e processo', 'components':'Componentes e dados', 'deployment':'Implantação',
    'prerequisites':'Preparação', 'integration':'Integração', 'operations':'Operação', 'historical':'Referências históricas'}
TOPIC_WORDS = {'purpose':r'what is|overview|introduc|functional|scope description',
    'components':r'architect|landscape|component|account model|data model|spaces|calculation scenario',
    'deployment':r'install|deploy|provision|initial setup', 'prerequisites':r'prerequisite|requirements|getting started|initial setup',
    'integration':r'integrat|connector|adapter|RFC|datastore|connectiv', 'operations':r'operat|monitor|backup|recover|administ|troubleshoot'}


def read_atlas():
    text = (ROOT / 'public/technical-data.js').read_text()
    return json.loads(text.split('=', 1)[1].strip().removesuffix(';'))


def write(path, obj):
    path.write_text(json.dumps(obj, ensure_ascii=False, separators=(',', ':')) + '\n')


def integrate():
    atlas = read_atlas()
    docs = json.loads(gzip.decompress((OUT / 'index.json.gz').read_bytes()))
    curation = json.loads((ROOT / 'research/knowledge-curation.json').read_text())
    references = {}
    for key, selector in curation['references'].items():
        matches = [d for d in docs if d.get('repository') == selector['repository'] and (d.get('url') == selector['url'] if 'url' in selector else d.get('path') == selector['path'])]
        if len(matches) != 1: raise ValueError('Missing or ambiguous reference: ' + key)
        references[key] = matches[0]
        doc = matches[0]
        source_id = 'knowledge-' + key
        atlas['sources'][source_id] = {'id':source_id, 'title':doc['title'] + ' · ' + doc['publisher'],
            'url':doc['url'], 'checked':DATE, 'repository':doc['repository'], 'commit':doc.get('commit'),
            'path':doc['path'], 'documentId':doc['id'], 'flags':doc['flags']}

    topics = []
    for topic in curation['topics']:
        topic = json.loads(json.dumps(topic))
        for entries in topic['sections'].values():
            for claim in entries:
                claim['documentIds'] = [references[r]['id'] for r in claim['refs']]
        topic['labels'] = LABELS
        topic['reviewedAt'] = curation.get('reviewedAt', DATE)
        topics.append(topic)

    profiles = []
    for product in atlas['products']:
        name = product['product_name']
        product_id = product.get('product_id') or 'catalog-' + hashlib.sha256(product['source_url'].encode()).hexdigest()[:12]
        product['knowledgeId'] = product_id
        related_topics = [t for t in topics if name in t['productNames']]
        repos = sorted(set(curation['additionalProductRepositories'].get(name, []) + [r for t in related_topics for r in t['repositories']]))
        # Exact name in title/excerpt is a discovery association, not proof of architecture.
        mentioned = [d['id'] for d in docs if name.casefold() in (d['title'] + ' ' + d['excerpt']).casefold()][:80]
        associated_product_ids = {m['id'] for m in product.get('documentationMatches', [])}
        pdf_ids = [d['id'] for d in docs if d.get('productId') in associated_product_ids]
        mentioned = sorted(set(mentioned + pdf_ids))
        curated = sorted(set(id_ for t in related_topics for entries in t['sections'].values() for claim in entries for id_ in claim['documentIds']))
        pool = [d for d in docs if d['repository'] in repos or d['id'] in set(curated + pdf_ids)]
        dimensions = {}
        for dimension, label in LABELS.items():
            if dimension == 'historical': continue
            claims = [claim for t in related_topics for claim in t['sections'].get(dimension, [])]
            found = [d['id'] for d in pool if re.search(TOPIC_WORDS[dimension], d['title']+' '+' '.join(d['headings']), re.I)][:5]
            dimensions[dimension] = {'label':label, 'state':'reviewed-scope' if claims else 'collected-unreviewed' if found else 'catalogue' if dimension == 'purpose' and product.get('description') else 'not-reviewed',
                'claimCount':len(claims), 'candidateDocuments':found}
        profiles.append({'id': product_id, 'name':name, 'category': product['category'],
            'description':product.get('description',''), 'capabilities':product.get('key_capabilities_for_customer_mapping',[]),
            'commercialUrl':product['source_url'], 'catalogueDate':'2026-10-09', 'helpMatches':product.get('documentationMatches',[]),
            'topics':[t['id'] for t in related_topics], 'repositories':repos, 'reviewedDocuments':curated,
            'mentionedDocuments':mentioned, 'associatedDocumentCount':len({d['id'] for d in docs if d['repository'] in repos} | set(curated) | set(pdf_ids)),
            'publicGuides':pdf_ids,
            'dimensions':dimensions, 'gaps':[g for t in related_topics for g in t['gaps']] or [
                'A ficha funcional está preservada do catálogo. Componentes, edição, integração e operação ainda precisam de revisão documental específica.'],
            'knowledgeUrl':'/knowledge.html#product=' + product_id})
    write(OUT / 'profiles.json', {'schema':'sap-profiles/1', 'reviewedAt':DATE, 'products':profiles, 'topics':topics,
        'references':{k: {'id':d['id'], 'title':d['title'], 'url':d['url'], 'flags':d['flags']} for k,d in references.items()}})
    atlas['knowledge'] = {'collectedAt':DATE, 'profileCount':len(profiles), 'topics':{t['id']:t for t in topics},
        'products':{p['id']:{'topics':p['topics'], 'documentCount':p['associatedDocumentCount'], 'knowledgeUrl':p['knowledgeUrl']} for p in profiles}}

    nodes = {n['id']:n for n in atlas['nodes']}
    def update(id_, summary, requirements, configuration, refs, **fields):
        if id_ not in nodes: raise ValueError('Unknown map node: ' + id_)
        n = nodes[id_]
        n.update(summary=summary, requirements=requirements, configuration=configuration, **fields)
        n['sourceIds'] = sorted(set(n.get('sourceIds', []) + ['knowledge-' + r for r in refs]))
        n['knowledgeReviewedAt'] = DATE

    def add(id_, title, parent, summary, refs, requirements, configuration, **fields):
        if id_ not in nodes:
            n = {'id':id_, 'title':title, 'parent':parent, 'type':'control', 'kind':'Configuração',
                'evidence':'Documentação recolhida · âmbito indicado', 'owner':'Cliente / parceiro', 'requirement':'Conforme cenário', **fields}
            atlas['nodes'].append(n); nodes[id_] = n
        update(id_, summary, requirements, configuration, refs, **fields)

    update('global-account', 'Representa o contrato SAP; gere subaccounts, membros, entitlements e quotas. Não depende de uma região nem de um ambiente.',
        ['Contrato e administradores da global account'], ['Criar subaccounts diretamente ou agrupadas em diretórios opcionais.', 'Distribuir planos e quotas; administrar membros e autorizações.'], ['accounts','quotas'])
    update('subaccount', 'Âmbito independente para serviços e aplicações numa região. É distinto de uma conta de utilizador.',
        ['Global account e região com os serviços necessários'], ['Escolher região e configurar trust e acessos.', 'Distribuir entitlements; ativar apenas os ambientes necessários.'], ['accounts','quotas'])
    update('entitlements', 'Entitlement: direito de consumir um service plan. Quota: quantidade atribuída. A global account distribui direitos pelas subaccounts, eventualmente através de diretórios.',
        ['Direitos disponíveis no contrato'], ['Atribuir quotas e planos conforme consumo ou subscrição.', 'Distinguir o ambiente Cloud Foundry do plano/quota do runtime; Kyma requer entitlement de quota do ambiente.'], ['quotas'])
    add('btp-directory', 'SAP BTP · diretório opcional', 'global-account',
        'Agrupa diretórios e subaccounts. A hierarquia tem até sete níveis contando global account e subaccount. O diretório não consome serviços.',
        ['accounts','quotas'], ['Organização que beneficia de agrupamento de contas'],
        ['Ativar gestão de autorizações ou entitlements apenas quando necessária.', 'Reservar/distribuir quotas quando a gestão de entitlements está ativada.'], requirement='Opcional · organização')
    add('cf-org', 'Cloud Foundry · organização', 'cloud-foundry', 'A ativação de Cloud Foundry cria uma org em relação 1:1 com a subaccount. A org contém spaces.',
        ['accounts','cf'], ['Ambiente Cloud Foundry ativado'], ['Organizar spaces e acessos da equipa.'], requirement='Condicional · Cloud Foundry')
    add('cf-space', 'Cloud Foundry · space', 'cf-org', 'Âmbito para desenvolvimento, implantação e operação de aplicações e serviços dentro da org Cloud Foundry.',
        ['accounts','quotas'], ['Org Cloud Foundry'], ['Definir membros e quotas por space quando necessário.'], requirement='Condicional · Cloud Foundry')
    add('kyma-namespace', 'Kyma · namespace', 'kyma', 'Organiza workloads num cluster Kyma. Uma subaccount pode ter vários clusters, cada um com vários namespaces.',
        ['accounts'], ['Runtime Kyma escolhido e cluster disponível'], ['Organizar os workloads e os acessos Kubernetes.'], requirement='Condicional · Kyma')
    update('sap-ibp', 'Planeamento cloud de procura, inventário, abastecimento, S&OP e monitorização. Referência editorial: IBP 2608 HFC5. O licenciamento distingue subscrições anteriores e posteriores a 20/04/2026; os guias de integração 2502 mantêm âmbito próprio.',
        ['Sistema IBP licenciado e acessos apropriados', 'Planning area e dados coerentes para o processo selecionado'],
        ['Preparar dados mestre e key figures; validar o modelo de planeamento.', 'Confirmar as licenças do contrato e a versão do tenant.', 'Distinguir application help 2608 de model configuration, integrações 2502 e exemplos de formação.'], ['ibp-current','ibp-export','ibp-customer','ibp-prep','ibp-excel'], evidence='Guia SAP IBP 2608 HFC5 + integrações 2502 com âmbito indicado')
    add('ibp-licenses','IBP · aplicações e licenças','sap-ibp','O guia de utilização é organizado por áreas funcionais; as licenças comerciais têm âmbito próprio. A mudança de 20/04/2026 aplica-se a novas subscrições, com orientação separada para contratos anteriores.',
        ['ibp-current'],['Identificar a data e as condições da subscrição'],['Conferir as capacidades licenciadas antes de escolher o processo de planeamento.'],kind='Modelo comercial',requirement='Conforme contrato')
    add('ibp-foundation','IBP · foundation license','ibp-licenses','Licença base obrigatória para novas subscrições após 20/04/2026. Integra capacidades antes cobertas por S&OP e Supply Chain Control Tower, incluindo algoritmos de forecasting referidos no guia.',
        ['ibp-current'],['Confirmar o regime do contrato'],['Validar as funcionalidades disponíveis no tenant.'],kind='Licença comercial',requirement='Subscrições após 20/04/2026')
    add('ibp-advanced-supply','IBP · advanced supply license','ibp-licenses','No regime posterior a 20/04/2026, reúne capacidades antes associadas às licenças S&OP e response and supply. Não constitui um runtime ou um host separado.',
        ['ibp-current'],['Processo de abastecimento e direitos contratuais apropriados'],['Conferir o detalhe de funcionalidades na documentação de licenciamento.'],kind='Licença comercial',requirement='Conforme contrato e processo')
    add('ibp-planning-area', 'IBP · planning area', 'sap-ibp', 'O workshop SAP prepara uma planning area configurada para demand planning e séries temporais. O modelo depende do processo.',
        ['ibp-prep'], ['Licença e acesso a IBP', 'Modelo de planeamento adequado'], ['Definir dados mestre e key figures necessários.'], kind='Modelo de planeamento')
    add('ibp-master-data', 'IBP · dados mestre', 'ibp-planning-area', 'No exemplo SAP: produtos, locais, clientes e unidades de medida suportam as séries temporais de planeamento.',
        ['ibp-prep'], ['Planning area preparada'], ['Validar os dados antes do exercício de integração.'], kind='Dados de planeamento')
    add('ibp-key-figures', 'IBP · key figures e séries temporais', 'ibp-planning-area', 'O exemplo utiliza ACTUALSQTY para vendas e CONSDEMANDQTY para previsão. São exemplos, não nomes obrigatórios em todas as planning areas.',
        ['ibp-prep'], ['Dados mestre e séries temporais'], ['Verificar definições e conteúdo dos indicadores do cenário.'], kind='Dados de planeamento')
    add('ibp-excel', 'IBP · add-in Microsoft Excel', 'sap-ibp', 'Usa planning views e templates ligados a um sistema IBP. Os templates GitHub recolhidos são exemplos sem suporte para produção.',
        ['ibp-excel'], ['Add-in instalado e acesso a IBP'], ['Escolher templates adequados; os exemplos têm limites documentados.'], type='client', kind='Ferramenta de planeamento')
    add('ibp-integration-example', 'IBP · integração TechEd 2024', 'sap-ibp', 'Exemplo de formação IBP ↔ Cloud Integration ↔ S3 ↔ Snowflake, com SAP_COM_0931 e destination BTP. O acesso do workshop expirou em 2024.',
        ['ibp-prep','ibp-integration','ibp-workshop'], ['IBP, Integration Suite e sistemas de staging/destino disponíveis'],
        ['Rever o communication arrangement e a autenticação para um sistema real.', 'Preservar validação TLS; não copiar a opção tls_trust_all do tutorial.'], kind='Exemplo de integração', requirement='Opcional · exemplo de formação')
    add('ibp-export', 'IBP 2502 · exportação de dados', 'sap-ibp', 'Exporta key figures e dados mestre usando SAP Cloud Integration for data services. O guia descreve ficheiros, web services e RFC para sistemas locais, conforme cenário.',
        ['ibp-export'], ['Planning area e calculation scenario para key figures', 'Autorizações, datastores e ambiente de integração configurados'],
        ['Definir projeto, task e data flow para a origem e destino escolhidos.', 'Aplicar filtros e agendamento sem execução concorrente de tasks.'], kind='Cenário de integração', requirement='Condicional · cenário IBP 2502')
    add('apo-livecache-azure', 'liveCache · cenário Windows / Azure', 'sap-apo', 'Guia Microsoft para liveCache baseado em MaxDB em Azure VMs. Não representa todas as instalações APO.',
        ['livecache'], ['Versões SAP, Windows e VM suportadas; verificar PAM e SAP Notes'],
        ['Considerar VM dedicada para uso produtivo e dimensionar RAM/CPU.', 'Aplicar as recomendações de persistência e backup/restore do guia para este cenário.'], type='database', kind='Cenário de implantação', requirement='Condicional · Windows / Azure')
    update('sap-apo', 'Planeamento e otimização da cadeia logística. O guia oficial APO 7.0 EHP4 aprofunda aplicação, liveCache, SCM Optimizer, CIF, monitorização e recuperação; a matriz de componentes depende do cenário.',
        ['Identificar a versão e a opção de deployment SCM / add-on ERP', 'Verificar componentes no Master Guide e a instalação real'],
        ['Organizar os processos DP, SNP, produção e confirmação usados.', 'Definir monitorização de CIF/qRFC, liveCache e otimização.', 'Preparar recuperação consistente dos componentes e sistemas conectados.'], ['apo-operations','livecache'], evidence='Guia de operações SAP 7.0 EHP4 · âmbito por versão')
    add('apo-technical', 'APO 7.0 EHP4 · landscape e operação', 'sap-apo', 'Agrupamento do cenário operacional documentado. Não é uma camada de instalação obrigatória; a opção SCM difere do add-on ERP.',
        ['apo-operations'], ['Versão e cenário identificados'], ['Consultar o Master Guide para componentes e os procedimentos do Operations Guide.'], type='module', kind='Cenário operacional')
    add('apo-application', 'APO · aplicação SCM / add-on ERP', 'apo-technical', 'O guia distingue APO como parte de SCM e a opção APO add-on para ERP. A configuração e as dependências têm de corresponder à opção instalada.',
        ['apo-operations'], ['Opção de implantação e componentes confirmados'], ['Monitorizar a aplicação e a integração através de CCMS e ferramentas APO.'], type='software', kind='Aplicação SAP')
    add('apo-livecache', 'APO · SAP liveCache', 'apo-technical', 'Componente com administração, monitorização e recuperação próprias. O Operations Guide recomenda DBA Cockpit para administrar e iniciar/parar liveCache.',
        ['apo-operations'], ['Componente liveCache conforme cenário e versão'], ['Monitorizar memória, estado e backups em DBACOCKPIT.', 'Verificar consistência conforme procedimento /SAPAPO/OM17.'], type='database', kind='Componente SAP')
    add('apo-optimizer', 'APO · SAP SCM Optimizer', 'apo-technical', 'Componente de otimização com ferramentas e logs próprios. A ligação ao sistema SCM/APO e a utilização dependem do processo selecionado.',
        ['apo-operations'], ['Otimização requerida pelo cenário'], ['Consultar os logs de execução e a monitorização descrita no Operations Guide.'], type='software', kind='Componente SAP', requirement='Condicional · processo de otimização')
    add('apo-cif', 'APO · Core Interface / CIF', 'apo-technical', 'Integração com sistemas SAP conectados, com filas qRFC, reconciliação e pós-processamento. É uma capacidade de integração, não um servidor intermediário único.',
        ['apo-operations'], ['Integração e destinos configurados para os sistemas conectados'], ['Monitorizar filas de entrada e saída em SMQ1/SMQ2 e os monitores CIF.', 'Coordenar recuperação e consistência dos dados entre sistemas.'], type='control', kind='Capacidade de integração')
    nodes['apo-livecache-azure']['parent'] = 'apo-livecache'
    nodes['apo-livecache-azure']['provider'] = 'Azure'

    # Topic links show the reviewed scope without marking every pre-existing claim verified.
    for topic in topics:
        for id_ in topic['nodeIds']:
            if id_ in nodes: nodes[id_]['knowledgeTopic'] = topic['id']
    for id_ in ['btp-directory','cf-org','cf-space','kyma-namespace']: nodes[id_]['knowledgeTopic'] = 'btp'
    for id_ in ['ibp-planning-area','ibp-master-data','ibp-key-figures','ibp-excel','ibp-integration-example','ibp-export','ibp-licenses','ibp-foundation','ibp-advanced-supply']: nodes[id_]['knowledgeTopic'] = 'ibp'
    nodes['apo-livecache-azure']['knowledgeTopic'] = 'apo'
    for id_ in ['apo-technical','apo-application','apo-livecache','apo-optimizer','apo-cif']: nodes[id_]['knowledgeTopic'] = 'apo'

    def edge(id_, from_, to, label, refs, condition):
        entry = {'id':'knowledge-' + id_, 'from':from_, 'to':to, 'type':'composes', 'label':label,
            'protocol':'Relação de estrutura; não representa tráfego de rede', 'security':'Autorizações do âmbito administrativo',
            'condition':condition, 'sourceIds':['knowledge-' + r for r in refs], 'evidence':'Documentação recolhida', 'detail':''}
        existing = next((e for e in atlas['edges'] if e['id'] == entry['id']), None)
        if existing: existing.update(entry)
        else: atlas['edges'].append(entry)
    for e in atlas['edges']:
        if e['from'] == 'global-account' and e['to'] == 'subaccount' and e['type'] == 'composes':
            e.update(label='Contém subaccounts diretamente ou através de diretórios opcionais', condition='Modelo de contas BTP', sourceIds=['knowledge-accounts'])
    edge('global-directory','global-account','btp-directory','Agrupa contas através de diretório opcional',['accounts'],'Diretório criado na global account')
    edge('directory-subaccount','btp-directory','subaccount','Agrupa subaccounts',['accounts'],'Subaccount colocada num diretório opcional')
    edge('subaccount-org','subaccount','cf-org','Tem uma org Cloud Foundry em relação 1:1',['accounts'],'Cloud Foundry ativado na subaccount')
    edge('org-space','cf-org','cf-space','Organiza aplicações e serviços em spaces',['accounts'],'Cloud Foundry ativado')
    edge('kyma-namespace','kyma','kyma-namespace','Organiza workloads em namespaces',['accounts'],'Cluster Kyma selecionado')
    for parent, child in [('sap-ibp','ibp-planning-area'),('ibp-planning-area','ibp-master-data'),('ibp-planning-area','ibp-key-figures'),('sap-ibp','ibp-excel'),('sap-ibp','ibp-integration-example')]:
        edge(parent+'-'+child,parent,child,'Inclui elemento do cenário de planeamento',['ibp-prep' if child != 'ibp-excel' else 'ibp-excel'],'Elemento do exemplo documentado; validar processo e licença')
    edge('ibp-export','sap-ibp','ibp-export','Inclui cenário de exportação',['ibp-export'],'Processo de integração documentado para IBP 2502')
    for parent,child in [('sap-ibp','ibp-licenses'),('ibp-licenses','ibp-foundation'),('ibp-licenses','ibp-advanced-supply')]:
        edge('license-'+child,parent,child,'Organiza o âmbito comercial de licenciamento',['ibp-current'],'Subscrição e capacidades licenciadas conforme contrato; não representa tráfego')
    # A planning product's association with a deployment example is not a network call.
    edge('apo-livecache','sap-apo','apo-livecache-azure','Referencia cenário liveCache Windows/Azure',['livecache'],'Cenário específico documentado pelo parceiro')
    next(e for e in atlas['edges'] if e['id']=='knowledge-apo-livecache')['type'] = 'pattern'
    for child in ['apo-application','apo-livecache','apo-optimizer','apo-cif']:
        edge('apo-component-'+child,'apo-technical',child,'Elemento do landscape operacional APO',['apo-operations'],'Componente / capacidade conforme opção de implantação e processo')

    (ROOT / 'public/technical-data.js').write_text('window.ATLAS = ' + json.dumps(atlas, ensure_ascii=False, separators=(',', ':')) + ';')
    manifest = json.loads((OUT / 'manifest.json').read_text())
    manifest['counts'].update(products=len(profiles), reviewedTopics=len(topics), productsWithReviewedScope=sum(bool(p['topics']) for p in profiles),
        productsWithDedicatedRepository=sum(bool(p['repositories']) for p in profiles), productsWithPublicPdfGuides=sum(bool(p['publicGuides']) for p in profiles))
    write(OUT / 'manifest.json', manifest)
    print('Integrated',len(profiles),'product profiles,',len(topics),'reviewed topics,',len(atlas['nodes']),'map components')


if __name__ == '__main__': integrate()
