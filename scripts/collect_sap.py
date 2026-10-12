#!/usr/bin/env python3
"""Import supplied SAP corpus or collect linked public pages with resumable provenance."""
import argparse, datetime, hashlib, json, time, urllib.error, urllib.parse, urllib.request, urllib.robotparser, zipfile
from html.parser import HTMLParser
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
HOSTS = {'www.sap.com', 'help.sap.com', 'architecture.learning.sap.com'}
SEEDS = ['https://www.sap.com/products/a-z.html','https://help.sap.com/docs/all-products','https://architecture.learning.sap.com/docs/ref-arch']

def save(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n')

def digest(data): return hashlib.sha256(data).hexdigest()

class Page(HTMLParser):
    def __init__(self, url, article=False):
        super().__init__(convert_charrefs=True)
        self.url=url; self.article_only=article; self.depth=0; self.ignore=0
        self.text=[]; self.links=[]; self.images=[]; self.headings=[]; self.heading=None; self.title=[]; self.in_title=False
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='article': self.depth+=1
        if tag in ('script','style','noscript'): self.ignore+=1
        if tag=='title': self.in_title=True
        if self.ignore or (self.article_only and not self.depth): return
        if tag in ('h1','h2','h3','h4','h5','h6'): self.heading={'level':int(tag[1]),'parts':[]}
        if tag=='a' and a.get('href'):
            u=urllib.parse.urljoin(self.url,a['href'])
            if u.startswith(('https://','http://')): self.links.append(u)
        if tag=='img' and a.get('src'):self.images.append({'url':urllib.parse.urljoin(self.url,a['src']),'alt':a.get('alt','')})
        if tag in ('p','li','div','section','tr','pre','br','h1','h2','h3','h4'):self.text.append('\n')
    def handle_endtag(self,tag):
        if tag=='article':self.depth=max(0,self.depth-1)
        if tag in ('script','style','noscript'):self.ignore=max(0,self.ignore-1)
        if tag=='title':self.in_title=False
        if self.heading and tag=='h'+str(self.heading['level']):
            self.headings.append({'level':self.heading['level'],'text':' '.join(self.heading['parts']).strip()});self.heading=None
        if tag in ('p','li','tr','pre'):self.text.append('\n')
    def handle_data(self,data):
        if self.in_title:self.title.append(data)
        if self.ignore or (self.article_only and not self.depth):return
        s=' '.join(data.split())
        if s:self.text.append(s+' ')
        if self.heading and s:self.heading['parts'].append(s)
    def record(self):
        lines=[' '.join(s.split()) for s in ''.join(self.text).splitlines()]
        return {'title':' '.join(self.title).strip(),'text':'\n'.join(s for s in lines if s),'headings':self.headings,'links':sorted(set(self.links)),'images':self.images}

def import_archive(archive):
    z=zipfile.ZipFile(archive); prefix='work/sap-crawl-2026-10-09/'
    research=json.loads((ROOT/'public/research-data.js').read_text().removeprefix('window.SAP_RESEARCH = ').removesuffix(';'))
    model=json.loads(z.read(prefix+'az-model.json'))
    commercial={urllib.parse.urljoin('https://www.sap.com',p.get('resolvedPath') or p['path']):p for items in model['groupMap'].values() for p in items}
    products=[{**p,'commercialDetails':commercial.get(p['url'],{}),'evidenceStatus':'supplied_snapshot_not_live_verified'} for p in research['products']]
    articles=[]; rawdir=ROOT/'research/snapshots/2026-10-09';rawdir.mkdir(parents=True,exist_ok=True)
    for a in research['architectures']:
        name=prefix+'pages/arch-'+a['id']+'.html'
        if name not in z.namelist():continue
        raw=z.read(name); sha=digest(raw); (rawdir/(sha+'.html')).write_bytes(raw)
        parser=Page(a['url'],article=True);parser.feed(raw.decode('utf-8'))
        articles.append({**a,**parser.record(),'sha256':sha,'snapshotHashMatchesMetadata':sha==a.get('sha256'),'evidenceStatus':'supplied_snapshot_not_live_verified','rawFile':'research/snapshots/2026-10-09/'+sha+'.html'})
    out=ROOT/'public/sap-corpus'
    save(out/'commercial-products.json',products)
    save(out/'documentation-products.json',research['documentation'])
    save(out/'documentation-hierarchy.json',research['documentationHierarchy'])
    save(out/'reference-architectures.json',articles)
    save(out/'product-documentation-candidates.json',research['matches'])
    report={'origin':'User-supplied SAP-Atlas-projeto-completo ZIP','archiveSha256':digest(Path(archive).read_bytes()),'sourceDate':research['report']['checked'],'liveVerified':False,'commercialProducts':len(products),'documentationRecords':len(research['documentation']),'referenceArticles':len(articles),'articlesWithText':sum(bool(a['text']) for a in articles),'metadataHashMatches':sum(a['snapshotHashMatchesMetadata'] for a in articles),'scope':'Archived indices and full extracted reference-architecture article text. Not the full SAP Help manuals or all commercial subpages. Matching candidates do not establish edition, provider support, or dependencies.'}
    save(out/'manifest.json',report); print(json.dumps(report,ensure_ascii=False,indent=2))

def live(limit):
    out=ROOT/'research/live';out.mkdir(parents=True,exist_ok=True)
    old=json.loads((out/'manifest.json').read_text()) if (out/'manifest.json').exists() else {'pages':{},'pending':[]}
    records=old['pages'];queue=list(dict.fromkeys(old.get('pending',[])+SEEDS))
    # Seed known public product/documentation/architecture URLs without treating archived content as current.
    for filename in ('commercial-products.json','documentation-products.json','reference-architectures.json'):
        p=ROOT/'public/sap-corpus'/filename
        if p.exists():queue.extend(r['url'] for r in json.loads(p.read_text()) if r.get('url'))
    queue=list(dict.fromkeys(queue));robots={};attempted=0
    while queue and (limit is None or attempted<limit):
        url=queue.pop(0);url=urllib.parse.urldefrag(url)[0];host=urllib.parse.urlsplit(url).hostname
        if host not in HOSTS or records.get(url,{}).get('status')=='collected':continue
        stamp=datetime.datetime.now(datetime.timezone.utc).isoformat();rec={'url':url,'attemptedAt':stamp}
        try:
            if host not in robots:
                ru='https://'+host+'/robots.txt';rq=urllib.request.Request(ru,headers={'User-Agent':'SAPAtlasResearch/1.0'})
                try:
                    with urllib.request.urlopen(rq,timeout=25) as r:body=r.read().decode()
                except urllib.error.HTTPError as e:
                    if e.code==404:body='User-agent: *\nAllow: /'
                    else:raise
                rp=urllib.robotparser.RobotFileParser(ru);rp.parse(body.splitlines());robots[host]=rp
            if not robots[host].can_fetch('SAPAtlasResearch',url):rec['status']='robots_disallowed'
            else:
                req=urllib.request.Request(url,headers={'User-Agent':'SAPAtlasResearch/1.0','Accept':'text/html,application/json'})
                with urllib.request.urlopen(req,timeout=30) as r:
                    raw=r.read();final=r.url;ctype=r.headers.get('Content-Type','');code=r.status
                if urllib.parse.urlsplit(final).hostname not in HOSTS:raise ValueError('Redirect outside configured SAP hosts')
                sha=digest(raw);(out/(sha+'.raw')).write_bytes(raw)
                rec.update(status='collected',httpStatus=code,finalUrl=final,contentType=ctype,bytes=len(raw),sha256=sha)
                if 'html' in ctype:
                    parser=Page(final,article=host=='architecture.learning.sap.com');parser.feed(raw.decode('utf-8',errors='replace'));page=parser.record();save(out/(sha+'.json'),page)
                    for link in page['links']:
                        u=urllib.parse.urlsplit(link)
                        if u.hostname in HOSTS and (u.path.startswith('/docs/') or (u.hostname=='www.sap.com' and u.path.startswith('/products/'))):queue.append(urllib.parse.urldefrag(link)[0])
                    rec['extractedTextCharacters']=len(page['text'])
                    rec['requiresBrowserExtraction']=host=='help.sap.com' and len(page['text'])<1000
        except Exception as e:rec.update(status='failed',error=str(e))
        records[url]=rec;attempted+=1
        save(out/'manifest.json',{'pages':records,'pending':list(dict.fromkeys(queue)),'complete':not queue and all(r.get('status')=='collected' and not r.get('requiresBrowserExtraction') for r in records.values()),'note':'Collected HTML is not proof that dynamic Help Portal manual topics were fully extracted.'})
        print(json.dumps(rec,ensure_ascii=False),flush=True)
        if rec.get('status')=='failed' and '403' in rec.get('error',''):
            # Stop on policy/access denial; no repeated requests or attempts to bypass it.
            break
        time.sleep(0.5)
    if any(r['status']=='failed' for r in records.values()):raise SystemExit(2)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--archive');p.add_argument('--live',action='store_true');p.add_argument('--max-pages',type=int)
    a=p.parse_args()
    if a.archive:import_archive(a.archive)
    if a.live:live(a.max_pages)
    if not a.archive and not a.live:p.error('Use --archive or --live')
