import json,time,subprocess,re
from pathlib import Path
root=Path(__file__).resolve().parents[1];d=json.loads((root/'public/technical-data.js').read_text()[len('window.ATLAS = '):-1]);out=root/'research/refresh-2026-10-12';out.mkdir(exist_ok=True)
file=out/'github-product-search.json';records=json.loads(file.read_text()) if file.exists() else []
seen={r['productName'] for r in records if r.get('status')=='searched'}
trusted={'SAP','SAP-samples','SAP-docs','Azure','MicrosoftDocs','GoogleCloudPlatform','aws-samples','SUSE','redhat-sap'}
for i,p in enumerate(d['products']):
 name=p['product_name']
 if name in seen:continue
 query='"'+name+'" in:name,description,readme'
 r=subprocess.run(['gh','api','search/repositories','--method','GET','-f','q='+query,'-f','per_page=5'],capture_output=True,text=True,timeout=35)
 rec={'productName':name,'query':query,'searchedAt':'2026-10-12','status':'searched' if r.returncode==0 else 'failed'}
 if r.returncode==0:
  j=json.loads(r.stdout);rec.update(total=j['total_count'],incompleteResults=j.get('incomplete_results',False),repositories=[{'repository':x['full_name'],'url':x['html_url'],'description':x['description'],'publisher':x['owner']['login'],'publisherClass':'sap-official' if x['owner']['login'] in {'SAP','SAP-samples','SAP-docs'} else 'partner' if x['owner']['login'] in trusted else 'community','archived':x['archived'],'updatedAt':x['updated_at'],'license':(x.get('license') or {}).get('spdx_id'),'matchStatus':'search_candidate_not_verified'} for x in j['items']])
 else:rec['error']=r.stderr[:250]
 records=[x for x in records if x['productName']!=name];records.append(rec);file.write_text(json.dumps(records,ensure_ascii=False,indent=2))
 if (i+1)%20==0:print('GitHub product searches',i+1,'/',len(d['products']),flush=True)
 if r.returncode!=0 and ('rate limit' in r.stderr.lower() or '429' in r.stderr):print('Rate limit; progress saved',flush=True);break
 time.sleep(2.2)
print('Searched',sum(r['status']=='searched' for r in records),'failed',sum(r['status']=='failed' for r in records),flush=True)
