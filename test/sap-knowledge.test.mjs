import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gunzipSync,gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {parseAtlas} from '../scripts/sap-picture-model.mjs';
import {decodeKnowledgeResponse} from '../public/knowledge-loader.js';
const root=new URL('../',import.meta.url);
const read=path=>JSON.parse(readFileSync(new URL(path,root),'utf8'));
const manifest=read('public/knowledge/manifest.json'),profiles=read('public/knowledge/profiles.json');
const index=JSON.parse(gunzipSync(readFileSync(new URL('public/knowledge/index.json.gz',root))));
const byId=new Map(index.map(d=>[d.id,d]));
const atlas=parseAtlas(readFileSync(new URL('public/technical-data.js',root),'utf8'));

test('all product profiles retain commercial provenance and measured coverage',()=>{
 assert.equal(profiles.products.length,atlas.products.length);
 assert.equal(new Set(profiles.products.map(p=>p.id)).size,atlas.products.length);
 assert.deepEqual(new Set(profiles.products.map(p=>p.commercialUrl)),new Set(atlas.products.map(p=>p.source_url)));
 for(const p of profiles.products){assert.equal(Object.keys(p.dimensions).length,6);for(const id of [...p.reviewedDocuments,...p.mentionedDocuments])assert.ok(byId.has(id),id)}
 assert.equal(manifest.counts.productsWithReviewedScope,profiles.products.filter(p=>p.topics.length).length);
});

test('each collected document resolves to the pinned source text and hash',()=>{
 assert.equal(index.length,manifest.counts.documents);
 assert.equal(byId.size,index.length);
 let count=0;
 for(const r of manifest.repositories){
  const bundle=JSON.parse(gunzipSync(readFileSync(new URL('public'+r.bundle,root))));
  assert.equal(bundle.commit,r.commit);assert.ok(Object.keys(bundle.licenses).length);
  const docs=index.filter(d=>d.repository===r.repository);assert.equal(docs.length,r.documentCount);
  for(const d of docs){const text=bundle.documents[d.id];assert.equal(typeof text,'string');assert.equal(createHash('sha256').update(text).digest('hex'),d.sha256);assert.ok(d.url.includes(r.commit));count++}
 }
 assert.equal(count,manifest.counts.repositoryDocuments);
});

test('unsupported IBP example supports historical context only',()=>{
 const example=index.find(d=>d.repository==='SAP-samples/ibp-data-intelligence-forecasting-prophet'&&d.path==='README.md');
 assert.ok(example.flags.includes('unsupported'));
 for(const t of profiles.topics)for(const [section,claims]of Object.entries(t.sections))for(const c of claims){
  assert.ok(c.documentIds.length);for(const id of c.documentIds)assert.ok(byId.has(id));
  if(c.documentIds.includes(example.id))assert.equal(section,'historical');
 }
});

test('archived architecture articles are distinguished from active guidance',()=>{
 const architecture=index.filter(d=>d.kind==='reference-architecture');
 assert.equal(architecture.length,manifest.counts.architectures);
 assert.equal(architecture.filter(d=>d.flags.includes('archived')).length,manifest.counts.archivedArchitectures);
 assert.ok(architecture.some(d=>!d.flags.includes('archived')));
});

test('BTP structure has conditional directories and a documented 1:1 CF organization',()=>{
 const directory=atlas.nodes.find(n=>n.id==='btp-directory');assert.match(directory.requirement,/Opcional/);
 assert.ok(atlas.edges.find(e=>e.from==='global-account'&&e.to==='subaccount'));
 assert.ok(atlas.edges.find(e=>e.from==='btp-directory'&&e.to==='subaccount'));
 const org=atlas.edges.find(e=>e.from==='subaccount'&&e.to==='cf-org');assert.match(org.label,/1:1/);assert.match(org.condition,/ativado/);
 assert.equal(org.type,'composes');assert.match(org.protocol,/não representa tráfego/);
});

test('GitHub discovery candidates stay unverified and all product queries ran',()=>{
 const records=read('public/knowledge/github-search.json');
 assert.equal(records.length,atlas.products.length);assert.ok(records.every(r=>r.status==='searched'));
 for(const r of records)for(const candidate of r.repositories)assert.equal(candidate.matchStatus,'search_candidate_not_verified');
 assert.equal(manifest.counts.githubProductsSearched,records.length);
});

test('published IBP configuration preserves TLS verification and identifies the lab scope',()=>{
 const lab=atlas.nodes.find(n=>n.id==='ibp-integration-example');assert.match(lab.summary,/formação/);assert.match(lab.summary,/2024/);
 assert.ok(!lab.configuration.some(s=>/tls_trust_all\s*[-=:]\s*1/i.test(s)));
 const doc=index.find(d=>d.repository==='SAP-samples/teched2024-IN280'&&d.path==='exercises/ex1/README.md');assert.ok(doc.flags.includes('example-disables-tls-verification'));
});

test('corpus reader accepts both opaque gzip and JSON already decompressed by HTTP',async()=>{
 const expected={title:'Planeamento IBP',text:'<script>not executable</script>'},raw=JSON.stringify(expected);
 assert.deepEqual(await decodeKnowledgeResponse(new Response(gzipSync(raw))),expected);
 assert.deepEqual(await decodeKnowledgeResponse(new Response(raw,{headers:{'Content-Encoding':'gzip'}})),expected);
 await assert.rejects(()=>decodeKnowledgeResponse(new Response('not found',{status:404})),/404/);
});

test('every public PDF returned by discovery has a collection result, with versions retained',()=>{
 const readResearch=path=>read('research/refresh-2026-10-12/'+path);
 const searches=readResearch('help-public-search.json'),guides=readResearch('help-public-guides.json');
 // Python escapes URI path punctuation that URL.href leaves literal; compare the
 // decoded path and query rather than treating equivalent encodings as new guides.
 const canonical=value=>{const u=new URL(value,'https://help.sap.com');return u.origin+'|'+decodeURIComponent(u.pathname)+'|'+JSON.stringify([...u.searchParams])};
 const discovered=new Set(searches.flatMap(r=>r.results.map(d=>canonical(d.url))));
 assert.equal(discovered.size,guides.length);
 for(const g of guides){assert.ok(discovered.has(canonical(g.url)),g.url);if(g.status==='collected'){assert.ok(g.pages>0);assert.match(g.sha256,/^[a-f0-9]{64}$/);assert.ok(g.version);assert.ok(byId.has(g.id))}else{assert.equal(g.error,'not-pdf');assert.ok(g.finalUrl.includes('/docs/'))}}
 assert.equal(manifest.counts.publicPdfGuides,guides.filter(g=>g.status==='collected').length);
});
