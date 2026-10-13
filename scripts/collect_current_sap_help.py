#!/usr/bin/env python3
"""Read production Help Portal topics using its published frontend API contract.

No login, DRAFT fallback or unpublished ID enumeration. Original HTML stays local.
"""
import argparse
import concurrent.futures
import hashlib
import json
import re
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from collect_sap import Page

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'research/finish-2026-10-13'
DATE='2026-10-13'
CACHE=OUT/'help-cache'
LOCK=threading.Lock()
METADATA={}
DENIED=threading.Event()


def request(path,params):
    if DENIED.is_set():raise ValueError('source-circuit-open')
    url='https://help.sap.com'+path+'?'+urllib.parse.urlencode(params)
    req=urllib.request.Request(url,headers={'User-Agent':'SAP-Atlas-Research/1.0'})
    try:
        with urllib.request.urlopen(req,timeout=30) as r:
            raw=r.read(20*1024*1024)
            data=json.loads(raw)
            if data.get('status') not in (None,'OK'):raise ValueError('API status: '+str(data.get('status')))
            return data.get('data',data)
    except urllib.error.HTTPError as error:
        if error.code==403:DENIED.set()
        raise


def save(path,value):
    temp=path.with_suffix('.tmp');temp.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n');temp.replace(path)


def discover(review):
    record={**review,'discoveredAt':DATE,'topics':[]}
    if not review['primaryProductId'] or not review['indexVersion']:
        return {**record,'status':'no-unambiguous-version-reference'}
    try:
        data=request('/http.svc/elasticsearch',{'area':'content','state':'PRODUCTION','q':review['productName'],
            'transtype':'standard,html,pdf,others','language':'en-US','from':0,'to':19,'excludeNotSearchable':1,
            'product':review['primaryProductId'],'version':review['indexVersion'],'ppdependencysearch':1})
        rows=data.get('results',[])
        record['topics']=[r for r in rows if r.get('productId')==review['primaryProductId'] and r.get('versionId')==review['indexVersion']]
        record['status']='discovered';record['protectedResults']=sum(bool(r.get('showLock')) for r in record['topics'])
    except (urllib.error.URLError,ValueError,OSError) as e:record.update(status='failed',error=str(e))
    time.sleep(.2)
    return record


def read_topic(row):
    url=urllib.parse.urljoin('https://help.sap.com',row['url'])
    key='help-topic-'+hashlib.sha256(url.encode()).hexdigest()[:20]
    record={'id':key,'url':url,'title':row.get('title') or row.get('deliverableTitle'),'productId':row['productId'],
        'version':row['versionId'],'collectedAt':DATE,'sourceDate':row.get('date'),'guideTitle':row.get('deliverableTitle')}
    if row.get('showLock'):return {**record,'status':'authentication-required'}
    parts=urllib.parse.urlparse(url);path=parts.path.split('/')
    if len(path)<5 or path[1]!='docs' or not path[-1].endswith('.html'):
        return {**record,'status':'not-html-topic'}
    product,deliverable,topic=path[2],path[3],path[-1]
    cache=CACHE/(key+'.json')
    if cache.exists():return json.loads(cache.read_text())['record']
    try:
        meta_key=(product,deliverable,row['versionId'])
        with LOCK:meta=METADATA.get(meta_key)
        if meta is None:
            meta=request('/http.svc/deliverableMetadata',{'product_url':product,'deliverable_url':deliverable,
                'topic_url':topic,'version':row['versionId'],'language':'en-US','state':'PRODUCTION'})
            with LOCK:METADATA[meta_key]=meta
        d=meta['deliverable']
        if d['product']!=row['productId'] or d['version']!=row['versionId']:raise ValueError('Unexpected product/version returned')
        data=request('/http.svc/pagecontent',{'deliverableInfo':1,'deliverable_id':d['id'],'buildNo':d['buildNo'],'file_path':topic})
        if data.get('deliverable',{}).get('state')!='PRODUCTION':raise ValueError('Non-production response rejected')
        if data.get('deliverable',{}).get('version')!=row['versionId']:raise ValueError('Unexpected content version returned')
        if data.get('fallback'):raise ValueError('Fallback landing page is not the requested topic')
        actual=data.get('currentPage',{}).get('loio','')
        if actual!=topic.removesuffix('.html'):raise ValueError('Unexpected topic returned')
        body=data['body'];parser=Page(url);parser.feed(body);page=parser.record()
        record.update(status='collected',title=data['currentPage'].get('t') or record['title'],sha256=hashlib.sha256(body.encode()).hexdigest(),
            metadataVersion=d['version'],metadataProduct=d['product'],versionOutOfMaintenance=bool(d.get('versionOom')),
            build=d['buildNo'],headings=[h['text'] for h in page['headings']],textCharacters=len(page['text']),
            guideTitle=data.get('deliverable',{}).get('title') or record['guideTitle'])
        save(cache,{'record':record,'text':page['text'],'body':body})
    except urllib.error.HTTPError as e:
        record.update(status='authentication-required' if e.code==401 else 'source-access-denied' if e.code==403 else 'failed',error=str(e))
    except (urllib.error.URLError,ValueError,KeyError,OSError) as e:record.update(status='failed',error=str(e))
    time.sleep(.2)
    return record


def main():
    cli=argparse.ArgumentParser(description=__doc__)
    cli.add_argument('--retry-denied',action='store_true',help='Retry recorded 403 responses only after access has changed.')
    args=cli.parse_args()
    OUT.mkdir(exist_ok=True);CACHE.mkdir(exist_ok=True)
    reviews=json.loads((OUT/'version-review.json').read_text())
    discovery_file=OUT/'current-help-discovery.json'
    discovery=json.loads(discovery_file.read_text()) if discovery_file.exists() else []
    done={r['productId'] for r in discovery if r['status']!='failed'}
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        for record in pool.map(discover,[r for r in reviews if r['productId'] not in done]):
            discovery=[r for r in discovery if r['productId']!=record['productId']]+[record];save(discovery_file,discovery)
            if len(discovery)%30==0:print('Current version discovery',len(discovery),'/',len(reviews),flush=True)
    rows={urllib.parse.urljoin('https://help.sap.com',r['url']):r for p in discovery for r in p['topics']}
    records_file=OUT/'current-help-topics.json'
    records=json.loads(records_file.read_text()) if records_file.exists() else []
    finished_states={'collected','authentication-required','not-html-topic'}
    if not args.retry_denied:finished_states.add('source-access-denied')
    finished={r['url'] for r in records if r['status'] in finished_states}
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        futures=[pool.submit(read_topic,r) for url,r in rows.items() if url not in finished]
        for future in concurrent.futures.as_completed(futures):
            record=future.result();records=[r for r in records if r['url']!=record['url']]+[record];save(records_file,records)
            if len(records)%50==0:print('Current production topics',len(records),'collected',sum(r['status']=='collected' for r in records),flush=True)
    print('Current production topics:',len(records),'collected:',sum(r['status']=='collected' for r in records),flush=True)


if __name__=='__main__':main()
