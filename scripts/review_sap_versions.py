#!/usr/bin/env python3
"""Resolve primary products by exact title before aliases and compare documented versions."""
import gzip
import hashlib
import html
import json
import re
import unicodedata
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT=Path(__file__).resolve().parents[1]
DATE='2026-10-13'
OUT=ROOT/'research/finish-2026-10-13'


def name(value):
    text=unicodedata.normalize('NFKD',html.unescape(value or '')).casefold()
    return re.sub(r'[^a-z0-9]+',' ',text).strip()


def version(url): return parse_qs(urlparse(url or '').query).get('version',[''])[0]


def primary_match(product, entries):
    exact=[e for e in entries if name(e['title'])==name(product['product_name']) and e.get('url')]
    # Identical commercial titles can refer to distinct technical namespaces.
    # An earlier automatic match cannot resolve that edition ambiguity.
    if len(exact)==1:return exact[0],'exact-title'
    if len(exact)>1:return None,'ambiguous-title'
    aliases=[e for e in entries if any(name(a)==name(product['product_name']) for a in e.get('alternativeProductNames',[]) if a) and e.get('url')]
    if len(aliases)==1:return aliases[0],'unique-alias'
    return None,'ambiguous-alias' if aliases else 'no-primary-match'


def compare_version(actual,expected):
    if not expected:return 'no-version-reference'
    if not actual:return 'unversioned-document'
    if actual==expected:return 'same-version'
    if str(actual).strip().casefold()==str(expected).strip().casefold() and str(expected).strip().casefold() in {'cloud','latest','ship','dev','hanacloud'}:return 'same-version'
    # There is no universal ordering for SAP version IDs (cloud labels, SPs,
    # component versions and year releases). Different does not mean unsupported.
    return 'different-version'


def review():
    raw=json.loads((OUT/'help-products-current.json').read_text())
    entries=raw['data']['products'] if isinstance(raw,dict) else raw
    path=ROOT/'public/technical-data.js';atlas=json.loads(path.read_text().split('=',1)[1].strip().removesuffix(';'))
    docs=json.loads(gzip.decompress((ROOT/'public/knowledge/index.json.gz').read_bytes()))
    records=[]
    for p in atlas['products']:
        primary,rule=primary_match(p,entries)
        record={'productId':p['knowledgeId'],'productName':p['product_name'],'reviewedAt':DATE,'matchRule':rule,
            'primaryProductId':primary['product'] if primary else None,'indexVersion':version(primary['url']) if primary else None,
            'indexUrl':'https://help.sap.com'+primary['url'] if primary else None,'documentVersions':[],
            'matchingProductIds':[e['product'] for e in entries if e.get('url') and
                (name(e['title'])==name(p['product_name']) or any(name(a)==name(p['product_name']) for a in e.get('alternativeProductNames',[]) if a))]}
        if primary:
            match={'id':primary['product'],'name':primary['title'],'url':record['indexUrl'],'match':'título exato · edição por confirmar' if rule=='exact-title' else 'alias único · edição por confirmar','role':'primary'}
            other=[{**m,'role':'related'} for m in p.get('documentationMatches',[]) if m['id']!=primary['product']]
            p['documentationMatches']=[match]+other
            for doc in docs:
                if doc.get('productId')==primary['product']:
                    record['documentVersions'].append({'documentId':doc['id'],'version':doc.get('version'),
                        'state':compare_version(doc.get('version'),record['indexVersion'])})
        else:
            p['documentationMatches']=[{**m,'role':'related'} for m in p.get('documentationMatches',[])]
        p['versionReview']=record
        records.append(record)
    path.write_text('window.ATLAS = '+json.dumps(atlas,ensure_ascii=False,separators=(',',':'))+';')
    (OUT/'version-review.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
    print('Version review',len(records),'products;',sum(bool(r['primaryProductId']) for r in records),'unambiguous primary associations')
    return records


if __name__=='__main__':review()
