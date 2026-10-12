#!/usr/bin/env python3
"""Index verified, pinned documentation. Source text is data, never executed.

Usage: python scripts/build_knowledge.py --sources-directory /tmp/sap-source-repos
The application build uses the committed output; it never downloads documentation.
"""
import argparse
import gzip
import hashlib
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
DATE = '2026-10-12'
OUT = ROOT / 'public/knowledge'


def dump(path, obj, compressed=False):
    raw = (json.dumps(obj, ensure_ascii=False, separators=(',', ':')) + '\n').encode()
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(gzip.compress(raw, mtime=0) if compressed else raw)


def plain(text):
    text = re.sub(r'<!--.*?-->', '', text, flags=re.S)
    text = re.sub(r'^---\n.*?\n---\n', '', text, count=1, flags=re.S)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'!?\[([^\]]+)\]\([^)]*\)', r'\1', text)
    return re.sub(r'\s+', ' ', text).strip()


def flags(text, repo, title):
    values = []
    if 'NO LONGER SUPPORTED' in text[:1000].upper(): values.append('unsupported')
    if re.search(r'deprecated|decommissioned|retired', title, re.I): values.append('deprecated')
    if 'This content has been archived' in text: values.append('archived')
    if repo.startswith(('SAP-samples/', 'aws-samples/')): values.append('sample')
    if repo == 'SAP-samples/teched2024-IN280': values.append('training-2024')
    if re.search(r'tls_trust_all\s*[-=:]\s*1|validate_certs\s*:\s*false|verify\s*=\s*False', text, re.I):
        values.append('example-disables-tls-verification')
    return values


def run(args):
    return subprocess.check_output(args, text=True).strip()


def build(cache):
    configs = json.loads((ROOT / 'research/knowledge-sources.json').read_text())
    repositories, documents = [], []
    for cfg in configs:
        repo, commit = cfg['repository'], cfg['commit']
        directory = cache / repo.replace('/', '__')
        if (directory / '.git').exists():
            if run(['git', '-C', str(directory), 'rev-parse', 'HEAD']) != commit:
                raise ValueError('Unexpected revision: ' + repo)
            paths = run(['git', '-C', str(directory), 'ls-files']).splitlines()
        else:
            collected = json.loads((directory / 'COLLECTION.json').read_text())
            if collected['commit'] != commit: raise ValueError('Unexpected revision: ' + repo)
            paths = [r['path'] for r in collected['records'] if r['status'] == 'collected']
        # Only tracked prose/man pages. No datasets, notebooks, binaries or executables.
        if cfg.get('scope'): paths = [p for p in paths if p.startswith(cfg['scope']+'/')]
        paths = sorted(p for p in paths if p.lower().endswith(('.md', '.mdx')) or (repo == 'SUSE/SAPHanaSR' and p.startswith('man/') and re.search(r'\.[578]$', p)))
        key = repo.replace('/', '--')
        texts = {}
        license_paths = sorted(p for p in directory.iterdir() if p.is_file() and p.name.lower().startswith(('license', 'licence', 'notice')))
        licenses = {p.name: p.read_text(errors='replace') for p in license_paths}
        if not licenses: raise ValueError('Missing license: ' + repo)
        license_name = 'CC-BY-4.0' if repo.startswith('SAP-docs/') or repo.startswith('MicrosoftDocs/') else 'GPL-2.0' if repo.startswith('SUSE/') else 'See LICENSE'
        bundle = '/knowledge/corpus/' + key + '.json.gz'
        for path in paths:
            file = directory / path
            if not file.is_file(): raise ValueError('Missing collected file: ' + str(file))
            text = file.read_text(errors='replace')
            headings = re.findall(r'^#{1,6}\s+(.+)', text, re.M)
            title = re.sub(r'[*`\\]', '', headings[0]) if headings else path.rsplit('/', 1)[-1]
            id_ = hashlib.sha256((repo + '@' + commit + ':' + path).encode()).hexdigest()[:20]
            documents.append({'id': id_, 'title': title, 'repository': repo, 'path': path,
                'commit': commit, 'url': f'https://github.com/{repo}/blob/{commit}/{quote(path)}',
                'publisher': repo.split('/')[0], 'publisherClass': 'sap' if repo.startswith(('SAP-docs/', 'SAP-samples/')) else 'partner',
                'kind': 'documentation' if repo.startswith(('SAP-docs/', 'MicrosoftDocs/')) else 'sample' if repo.startswith(('SAP-samples/', 'aws-samples/')) else 'automation-guide',
                'collectedAt': DATE, 'sha256': hashlib.sha256(text.encode()).hexdigest(),
                'excerpt': plain(text)[:420], 'headings': headings[:12], 'flags': flags(text, repo, title),
                'bundle': bundle, 'license': license_name})
            texts[id_] = text
        dump(OUT / bundle.lstrip('/').removeprefix('knowledge/'), {'repository': repo, 'commit': commit, 'licenses': licenses, 'documents': texts}, True)
        repositories.append({**cfg, 'documentCount': len(paths), 'bundle': bundle, 'license': license_name, 'collectedAt': DATE})
        print(repo, len(paths), flush=True)

    articles = json.loads((ROOT / 'research/refresh-2026-10-12/reference-architectures-current.json').read_text())
    for a in articles:
        documents.append({'id': 'arch-' + a['url'].rsplit('/', 1)[-1], 'title': a['title'],
            'repository': 'SAP Architecture Center', 'publisher': 'SAP', 'publisherClass': 'sap', 'kind': 'reference-architecture',
            'url': a['url'], 'collectedAt': DATE, 'sha256': a['sha256'], 'excerpt': 'Referência SAP · ' + ('artigo arquivado pela SAP' if 'This content has been archived' in a['text'] else 'consultar âmbito e cenário no artigo original'),
            'headings': [x.get('text','') if isinstance(x,dict) else x for x in a['headings'][:12]], 'flags': flags(a['text'], '', a['title']), 'license': 'SAP website terms',
            'links': [x for x in a['links'] if isinstance(x,str) and x.startswith('https://')][:40]})
    guide_file = ROOT / 'research/refresh-2026-10-12/help-public-guides.json'
    guides = json.loads(guide_file.read_text()) if guide_file.exists() else []
    for guide in guides:
        if guide['status'] != 'collected': continue
        documents.append({**guide, 'repository':'SAP Help Portal', 'publisher':'SAP', 'publisherClass':'sap',
            'kind':'public-pdf-guide', 'path':guide['url'].rsplit('/',1)[-1], 'excerpt':'Guia público SAP · ' + str(guide.get('version') or 'versão indicada na fonte'),
            'flags':['version-specific'], 'fullText':'original-source-only'})
    dump(OUT / 'index.json.gz', documents, True)
    help_data = json.loads((ROOT / 'research/refresh-2026-10-12/help-products-current.json').read_text())
    help_products = help_data['data']['products'] if isinstance(help_data, dict) else help_data
    dump(OUT / 'help-products.json.gz', help_products, True)
    searches = json.loads((ROOT / 'research/refresh-2026-10-12/github-product-search.json').read_text())
    # Candidates stay candidates; they do not become sources of technical assertions.
    dump(OUT / 'github-search.json', searches)
    manifest = {'schema': 'sap-knowledge/1', 'collectedAt': DATE, 'repositories': repositories,
        'counts': {'documents': len(documents), 'repositoryDocuments': sum(r['documentCount'] for r in repositories),
            'repositories': len(repositories), 'architectures': len(articles), 'archivedArchitectures': sum('archived' in d['flags'] for d in documents if d['kind'] == 'reference-architecture'),
            'helpProducts': len(help_products), 'publicPdfGuides':sum(g['status']=='collected' for g in guides),
            'publicPdfLinksDiscovered':len(guides), 'publicPdfNotCollected':sum(g['status']!='collected' for g in guides),
            'githubProductsSearched': sum(r['status'] == 'searched' for r in searches)},
        'limitations': [
            {'source': 'SAP Products A–Z', 'status': 'http-403', 'detail': 'O site recusou a nova recolha. Catálogo de 258 entradas preservado da recolha de 09/10; não foi reconfirmado hoje.'},
            {'source': 'SAP Help Portal', 'status': 'public-search-and-pdfs', 'detail': 'Índice e pesquisa pública consultados. Até cinco resultados PDF por associação de produto; todos os PDFs públicos devolvidos pelas consultas foram tentados, com limite técnico de 256 MB por PDF. As páginas HTML /docs devolvem a aplicação JavaScript. Texto dos repositórios SAP-docs conservado com atribuição; PDFs protegidos por copyright ligados na origem. A pesquisa não cobre todos os guias, idiomas e versões.'},
            {'source': 'Sites dos hyperscalers', 'status': 'network-policy', 'detail': 'Docs AWS, Microsoft Learn e Google Cloud bloqueados pela allowlist atual. Documentação pública dos respetivos publishers recolhida pelo GitHub; domínios adicionais guardados no rascunho do ambiente.'},
            {'source': 'Manuais restritos e SAP Notes', 'status': 'not-collected', 'detail': 'Conteúdo que exige sessão SAP não foi recolhido. Ligações e menções a SAP Notes não significam que a nota tenha sido lida.'}],
        'coverageMeaning': 'Documento recolhido, associação a produto e revisão de uma afirmação são estados distintos. A presença de documentação não confirma licenciamento, versão, região ou instalação.',
        'index': '/knowledge/index.json.gz'}
    dump(OUT / 'manifest.json', manifest)
    print(json.dumps(manifest['counts'], ensure_ascii=False))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sources-directory', type=Path, required=True)
    build(parser.parse_args().sources_directory)
