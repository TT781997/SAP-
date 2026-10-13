import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {execFileSync} from 'node:child_process';
const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(readFileSync(new URL(p,root),'utf8'));
const profiles=read('public/knowledge/profiles.json');
const docs=JSON.parse(gunzipSync(readFileSync(new URL('public/knowledge/index.json.gz',root))));
const byId=new Map(docs.map(d=>[d.id,d]));

test('primary ERP documentation outranks an integration guide mentioning ERP',()=>{
 const p=profiles.products.find(p=>p.name==='SAP ERP');
 assert.equal(p.versionReview.primaryProductId,'SAP_ERP');
 assert.equal(p.helpMatches[0].id,'SAP_ERP');assert.equal(p.helpMatches[0].role,'primary');
 const concur=p.helpMatches.find(m=>m.id==='SAP_INTEGRATION_WITH_CONCUR_SOLUTIONS');
 if(concur)assert.equal(concur.role,'related');
});

test('the version review covers every commercial entry and preserves unknown associations',()=>{
 const report=read('public/knowledge/completion-review.json');
 assert.equal(report.versionReview.products,profiles.products.length);
 assert.ok(profiles.products.every(p=>p.versionReview.reviewedAt==='2026-10-13'));
 for(const p of profiles.products)for(const id of p.currentDocuments){
  const d=byId.get(id);assert.ok(d,id);assert.equal(d.productId,p.versionReview.primaryProductId);assert.equal(d.versionReview.state,'same-version');
 }
 const commerce=profiles.products.find(p=>p.name==='SAP Commerce Cloud');
 assert.equal(commerce.versionReview.matchRule,'ambiguous-alias');assert.equal(commerce.versionReview.primaryProductId,null);
 const translation=profiles.products.find(p=>p.name==='SAP Translation Hub');
 assert.equal(translation.versionReview.matchRule,'ambiguous-title');assert.equal(translation.versionReview.primaryProductId,null);
 assert.equal(translation.versionReview.matchingProductIds.length,2);
});

test('production topics retain the product and version actually returned by SAP',()=>{
 const current=docs.filter(d=>d.kind==='sap-help-topic');assert.ok(current.length>700);
 for(const d of current){assert.equal(d.status,'collected');assert.equal(d.metadataVersion,d.version);assert.equal(d.metadataProduct,d.productId);assert.ok(d.sha256)}
 const ibp=current.find(d=>d.productId==='SAP_INTEGRATED_BUSINESS_PLANNING');assert.equal(ibp.version,'2608');
});

test('a publisher Access Denied response is not classified as missing credentials',()=>{
 const outcomes=read('research/finish-2026-10-13/current-help-topics.json');
 const denied=outcomes.filter(r=>r.error==='HTTP Error 403: Forbidden');assert.ok(denied.length);
 assert.ok(denied.every(r=>r.status==='source-access-denied'));
 const report=read('public/knowledge/completion-review.json');assert.equal(report.overallStatus,'external-access-required');
 assert.ok(report.sources.some(s=>s.source==='AWS e Microsoft'&&s.status==='verified-accessible'));
 const script=`import sys,json,urllib.error;sys.path.insert(0,'scripts');import collect_current_sap_help as c
from unittest.mock import patch
error=urllib.error.HTTPError('https://help.sap.com/',403,'Forbidden',{},None)
with patch.object(c.urllib.request,'urlopen',side_effect=error) as request:
 try:c.request('/http.svc/pagecontent',{})
 except urllib.error.HTTPError:pass
 try:c.request('/http.svc/pagecontent',{})
 except ValueError as blocked:assert str(blocked)=='source-circuit-open'
 else:raise AssertionError('A second request was allowed after 403')
 assert request.call_count==1
print('circuit verified')`;
 assert.equal(execFileSync('python3',['-c',script],{cwd:root,encoding:'utf8'}).trim(),'circuit verified');
});

test('version IDs are compared without inventing chronology or compatibility',()=>{
 const script=`import sys,json;sys.path.insert(0,'scripts');from review_sap_versions import compare_version;print(json.dumps([compare_version('2502','2608'),compare_version('Cloud','CLOUD'),compare_version('7.0.4','7.0.4'),compare_version('2608','2608.500'),compare_version('1.0',None)]))`;
 const result=JSON.parse(execFileSync('python',['-c',script],{cwd:root,encoding:'utf8'}));
 assert.deepEqual(result,['different-version','same-version','same-version','different-version','no-version-reference']);
});

test('IBP licensing changes are conditional on the subscription date',()=>{
 const curation=read('research/knowledge-curation.json');
 const ibp=curation.topics.find(t=>t.id==='ibp');
 const claim=ibp.sections.prerequisites.find(c=>c.refs.includes('ibp-current'));
 assert.match(claim.text,/20\/04\/2026/);assert.match(claim.text,/Contratos anteriores/);
 assert.ok(byId.has(profiles.references['ibp-current'].id));
});
