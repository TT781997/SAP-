#!/usr/bin/env python3
"""Read the public Help search API and unlocked PDF guides. Never follows login links.

Search metadata is published; copyrighted PDF/text caches stay local for research.
Requires pdftotext (Poppler) to inspect public PDFs. HTTP/TLS verification stays enabled.
"""
import concurrent.futures
import hashlib
import http.client
import json
import re
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'research/refresh-2026-10-12'
DATE = '2026-10-12'
PDF_LIMIT = 256 * 1024 * 1024


def read(url, metadata=None):
    request = urllib.request.Request(url, headers={'User-Agent':'SAP-Atlas-Research/1.0'})
    with urllib.request.urlopen(request, timeout=35) as response:
        if metadata is not None:
            metadata.update(finalUrl=response.geturl(), httpStatus=response.status, contentType=response.headers.get('Content-Type',''))
        if int(response.headers.get('Content-Length', '0')) > PDF_LIMIT: raise ValueError('size-limit: ' + response.headers.get('Content-Length'))
        data = response.read(PDF_LIMIT + 1)
        if len(data) > PDF_LIMIT: raise ValueError('size-limit')
        return data


def sha(raw): return hashlib.sha256(raw).hexdigest()


def source_url(value):
    parts = urllib.parse.urlsplit(urllib.parse.urljoin('https://help.sap.com', value))
    return urllib.parse.urlunsplit((parts.scheme, parts.netloc, urllib.parse.quote(parts.path, safe='/%'),
        urllib.parse.urlencode(urllib.parse.parse_qsl(parts.query)), parts.fragment))


def search(product):
    record = {'productName':product['product_name'], 'searchedAt':DATE}
    matches = product.get('documentationMatches', [])
    if not matches: return {**record, 'status':'no-exact-product-association', 'results':[]}
    product_id = matches[0]['id']
    params = {'area':'content','state':'PRODUCTION','q':product['product_name'],'transtype':'pdf',
        'language':'en-US','from':'0','to':'4','excludeNotSearchable':'1','product':product_id}
    url = 'https://help.sap.com/http.svc/elasticsearch?' + urllib.parse.urlencode(params)
    try:
        response = json.loads(read(url))
        results = response.get('data', {}).get('results', [])
        # Product/version metadata is retained. Matching names alone are never enough.
        results = [r for r in results if r.get('productId') == product_id and r.get('mimeType') == 'application/pdf' and not r.get('showLock')]
        record.update(status='searched', productId=product_id, queryUrl=url, results=results)
    except (urllib.error.URLError, ValueError, OSError, http.client.HTTPException) as error:
        record.update(status='failed', error=str(error), queryUrl=url, results=[])
    time.sleep(.5)
    return record


def collect(result):
    url = source_url(result['url'])
    if urllib.parse.urlparse(url).hostname != 'help.sap.com': return None
    key = sha(url.encode())[:20]
    cache = OUT / 'pdf-cache'
    cache.mkdir(exist_ok=True)
    pdf, text = cache / (key+'.pdf'), cache / (key+'.txt')
    record = {'id':'help-pdf-'+key, 'title':result.get('title') or result.get('deliverableTitle') or url.rsplit('/',1)[-1], 'url':url, 'productId':result['productId'],
        'productName':result.get('product'), 'version':result.get('versionId'), 'sourceDate':result.get('date'),
        'collectedAt':DATE, 'license':'SAP copyright · original linked, full PDF not republished'}
    try:
        raw = pdf.read_bytes() if pdf.exists() else read(url, record)
        if not raw.startswith(b'%PDF-'): raise ValueError('not-pdf')
        pdf.write_bytes(raw)
        extracted = subprocess.run(['pdftotext','-layout',str(pdf),str(text)], capture_output=True, timeout=40)
        if extracted.returncode: raise ValueError('PDF text extraction failed')
        prose = text.read_text(errors='replace')
        headings = []
        for line in prose.splitlines():
            match = re.match(r'^\s*(\d+(?:\.\d+)*)\s{2,}([A-Za-z][^\n]{3,180})$', line)
            if match:
                title = re.sub(r'\s*\.{2,}.*$', '', match[2]).strip()
                if title and title not in headings: headings.append(title)
        record.update(status='collected', sha256=sha(raw), textSha256=sha(prose.encode()),
            pages=prose.count('\f'), headings=headings[:60], bytes=len(raw),
            textCharacters=len(prose), extractionStatus='text' if len(prose.strip())>=200 else 'image-only')
    except (urllib.error.URLError, ValueError, OSError, http.client.HTTPException, subprocess.TimeoutExpired) as error:
        record.update(status='failed', error=str(error))
    return record


def save(file, data):
    temp=file.with_suffix('.tmp')
    temp.write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n')
    temp.replace(file)


def main():
    OUT.mkdir(exist_ok=True)
    products = json.loads((ROOT/'public/technical-data.js').read_text().split('=',1)[1].strip().removesuffix(';'))['products']
    search_file, guide_file = OUT/'help-public-search.json', OUT/'help-public-guides.json'
    searches = json.loads(search_file.read_text()) if search_file.exists() else []
    done = {r['productName'] for r in searches if r['status'] != 'failed'}
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        for record in executor.map(search, [p for p in products if p['product_name'] not in done]):
            searches = [r for r in searches if r['productName'] != record['productName']] + [record]
            save(search_file, searches)
            if len(searches)%20 == 0: print('Help public PDF search',len(searches),'/',len(products),flush=True)
    guides = json.loads(guide_file.read_text()) if guide_file.exists() else []
    # Permanent redirects, rejected access and size limits need a changed source or
    # an explicitly revised limit, rather than unchanged requests on every build.
    done_urls = {g['url'] for g in guides if g['status'] == 'collected' or (g.get('error','')=='not-pdf' and g.get('finalUrl') != g['url'])}
    selected = {}
    for record in searches:
        # Collect every unlocked PDF returned by the recorded product queries.
        for result in record['results']:
            url=source_url(result['url'])
            if url not in done_urls: selected[url]=result
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        futures=[executor.submit(collect,result) for result in selected.values()]
        for future in concurrent.futures.as_completed(futures):
            record=future.result()
            if not record: continue
            guides=[g for g in guides if g['url']!=record['url']]+[record]
            save(guide_file,guides)
            if len(guides)%20 == 0:print('Public PDF guides',len(guides),'collected',sum(g['status']=='collected' for g in guides),flush=True)
    print('PDF search records',len(searches),'guides',len(guides),'collected',sum(g['status']=='collected' for g in guides),flush=True)


if __name__ == '__main__': main()
