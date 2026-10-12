import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseAtlas, makeDataset, restoreSapRelations } from '../scripts/sap-picture-model.mjs';
import { buildModel } from '../vendor/limen/src/picture/picture-model.ts';
import { embedJson } from '../vendor/limen/src/picture/html.ts';
const data=parseAtlas(readFileSync(new URL('../public/technical-data.js',import.meta.url),'utf8'));
const files=makeDataset(data,'a'.repeat(40));
const model=restoreSapRelations(buildModel({files,diagnostics:[]}));
test('preserves all 258 commercial product URLs and their documentation',()=>{
 const products=model.nodes.filter(n=>n.meta['catalog-url']);
 assert.equal(products.length,data.products.length);
 assert.deepEqual(new Set(products.map(p=>p.meta['catalog-url'])),new Set(data.products.map(p=>p.source_url)));
 const ibp=products.find(p=>p.title==='SAP Integrated Business Planning');
 assert.match(ibp.bodyHtml,/help\.sap\.com\/docs\/SAP_INTEGRATED_BUSINESS_PLANNING/);
});
test('retains every SAP edge endpoint and relationship without recasting trust as dependency',()=>{
 assert.equal(model.edges.length,data.edges.filter(e=>e.from!=='root'&&e.to!=='root').length);
 for(const e of model.edges){const source=data.edges.find(x=>x.id===e.id);assert.equal(e.from,source.from);assert.equal(e.to,source.to);assert.equal(e.kind,data.relations[source.type]?.title||source.type)}
 const structure=model.edges.find(e=>e.from==='global-account'&&e.to==='subaccount');assert.ok(structure);
});
test('account and login journeys retain the ordered steps and repeated identity visits',()=>{
 assert.deepEqual(model.journeys.find(j=>j.id==='btp-account').steps,['global-account','entitlements','subaccount','cloud-foundry','cap']);
 const steps=model.journeys.find(j=>j.id==='btp-login').steps;
 assert.equal(steps.filter(x=>x==='ias').length,2);assert.equal(steps.filter(x=>x==='approuter').length,2);
 assert.deepEqual(model.journeys.find(j=>j.id==='ibp-planning').steps,['ibp-demand','ibp-supply','ibp-sop','ibp-response']);
});
test('no dangling nodes, overlays, or source references are introduced',()=>{
 assert.deepEqual(model.diagnostics.filter(d=>d.level==='error'),[]);
 const ids=new Set(model.nodes.map(n=>n.id));
 for(const j of model.journeys)for(const id of j.steps)assert.ok(ids.has(id));
 assert.ok(model.nodes.every(n=>n.status==='partial'));
});
test('JSON input does not execute code and model embedding cannot terminate its script',()=>{
 assert.throws(()=>parseAtlas('window.ATLAS = doSomething();'));
 const unsafe={...model,project:{...model.project,title:'</script><script>alert(1)</script>'}};
 assert.ok(!embedJson(unsafe).includes('</script>'));
});

test('video map keeps SAP relationships while scenario associations remain explicitly separate',async()=>{
 const {drilldownModel}=await import('../scripts/sap-drilldown.mjs');
 const map=drilldownModel(model);
 const technical=map.edges.filter(e=>e.meta['semantic-role']!=='scenario-overlay');
 assert.equal(technical.length,model.edges.length);
 for(const e of technical){const source=data.edges.find(x=>x.id===e.id);assert.equal(e.kind,source.type);assert.equal(e.from,source.from);assert.equal(e.to,source.to)}
 const scenarios=map.nodes.filter(n=>n.kind==='feature');assert.equal(scenarios.length,model.features.length);
 const links=map.edges.filter(e=>e.meta['semantic-role']==='scenario-overlay');assert.ok(links.length>0);
 assert.ok(links.every(e=>e.kind==='scenario-association'&&e.title.includes('não representa tráfego')));
});

test('legacy renderer is standalone, dark by default, and keeps the layered alternative',async()=>{
 const {renderDrilldown}=await import('../scripts/sap-drilldown.mjs');
 const html=await renderDrilldown(model,data.relations);
 assert.match(html,/data-sap-theme="dark"/);
 assert.match(html,/id="panel-toggle"/);
 assert.match(html,/id="search-input"/);
 assert.match(html,/sap-picture-layers\.html/);
 assert.match(html,/architecture-map-model\/2/);
 assert.match(html,/\.rk-authenticates\{--kc:var\(--k-authenticates\)/);
 assert.match(html,/\.rk-scenario-association\{--kc:var\(--k-scenario-association\)/);
 assert.ok(!/<script[^>]+src=/.test(html));
});
