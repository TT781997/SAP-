import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { embedJson } from '../vendor/limen/src/picture/html.ts';
const root=fileURLToPath(new URL('../',import.meta.url));

export function drilldownModel(model) {
  const nodes=model.nodes.map(n=>({...n,meta:{...n.meta}}));
  const edges=model.edges.map(e=>({...e,kind:e.meta['sap-type']||e.kind,meta:{...e.meta}}));
  const ids=new Set(nodes.map(n=>n.id));
  for(const feature of model.features) {
    const id='scenario.'+feature.id;
    if(ids.has(id))throw new Error('Identificador de cenário duplicado');ids.add(id);
    nodes.push({id,title:feature.title,kind:'feature',parent:null,status:feature.status,summary:feature.summary,
      sources:feature.sources,bodyHtml:feature.bodyHtml,source:feature.source,children:[],depth:0,
      meta:{'semantic-role':'Cenário pedagógico; as associações não representam tráfego de rede'}});
    for(const target of feature.touches) {
      if(!ids.has(target))throw new Error('Componente do cenário inexistente: '+target);
      edges.push({id:'scenario-link.'+feature.id+'.'+target,from:id,to:target,kind:'scenario-association',
        title:'Componente associado ao cenário · não representa tráfego',status:'partial',summary:'Associação funcional ao cenário.',
        bodyHtml:'<p>Esta relação destaca componentes associados ao cenário. Não descreve uma chamada, protocolo ou fluxo de rede.</p>',
        sources:feature.sources,source:feature.source,meta:{'semantic-role':'scenario-overlay'}});
    }
  }
  return {...model,schema:'architecture-map-model/2',nodes,edges};
}

export async function renderDrilldown(model,relations) {
  const dir=resolve(root,'vendor/limen-drilldown');
  let [template,css,js]=await Promise.all(['template.html','viewer.css','viewer.js'].map(f=>readFile(resolve(dir,f),'utf8')));
  const labels={module:'Componente',feature:'Cenário',partial:'Parcial',ready:'Verificado',stub:'Por preencher',
    ...Object.fromEntries(Object.entries(relations).map(([type,r])=>[type,r.title])),
    'scenario-association':'associa ao cenário'};
  const translate=new Map([
    ['Architecture map','SAP Atlas · mapa de produtos'],['Search  /','Pesquisar produtos e componentes  /'],['Search blocks','Pesquisar produtos e componentes'],
    ['Search results','Resultados da pesquisa'],['>Diagnostics<','>Notas do mapa<'],['>Details<','>Detalhes<'],['aria-label="Details"','aria-label="Detalhes"'],
    ['"Diagnostics"','"Notas do mapa"'],['"Connections"','"Relações"'],['"Connection kinds"','"Tipos de relação"'],['"Sources"','"Ficheiros de origem"'],['"Counts"','"Contagens"'],
    ['"Top-level blocks"','"Grupos na visão geral"'],['"All blocks"','"Todos os componentes"'],['"Outgoing"','"Saídas"'],['"Incoming"','"Entradas"'],
    ['"Parts ("','"Partes ("'],['"Metadata"','"Metadados"'],['"Blocks"','"Componentes"'],['"Block kinds"','"Tipos de componente"'],['"Status"','"Estado"'],
    ['"Inside "','"Dentro de "'],['"Outside"','"Externo"'],['"Outside: "','"Externo: "'],['"outside"','"externo"'],['" outside"','" externos"'],
    ['"Open "','"Abrir "'],['"Hide "','"Ocultar "'],['"Show "','"Mostrar "'],['"links show on hover or selection"','"associações destacadas ao passar o rato ou selecionar"'],
    ['" show on hover"','" destacadas ao passar o rato"'],['" of this block itself: see Details"','" do próprio componente: consultar Detalhes"'],
    ['"Arrows point from the user to the used part. Click a block with parts to open it. Esc goes up."','"A seta indica a direção da relação descrita. Clica num componente com partes para entrar. Esc sobe um nível. Associações a cenários não são tráfego."'],
    ['"No description."','"Descrição ainda por preencher."'],['"No connections."','"Sem relações registadas."'],['"on hover"','"ao passar o rato"'],['"all"','"todas"']
  ]);
  const text=s=>{for(const[a,b]of translate)s=s.split(a).join(b);return s};
  js=text(js);
  js=js.replace('var SVG_NS =',`var SAP_LABELS = ${JSON.stringify(labels).replace(/</g,'\\u003c')};\nfunction sapLabel(value){return SAP_LABELS[value]||value;}\nvar SVG_NS =`);
  js=js.replace('status || "no status"','sapLabel(status) || "Sem estado"')
    .replace('"tag " + kindClass(kind), kind','"tag " + kindClass(kind), sapLabel(kind)')
    .replace('"rel-name", kind','"rel-name", sapLabel(kind)')
    .replaceAll('"lg-name", k','"lg-name", sapLabel(k)')
    .replace('ghost ? "outside" : n.kind','ghost ? "Externo" : sapLabel(n.kind)')
    .replace('kinds.join(", ") + " blocks"','kinds.map(sapLabel).join(", ")')
    .replace('level.sideKinds.join(", ") + " link"','level.sideKinds.map(sapLabel).join(", ") + " associação"')
    .replace('var names = level.sideKinds.join(", ");','var names = level.sideKinds.map(sapLabel).join(", ");')
    .replace('names + " links: "','names + " associações: "')
    .replace('"None."','"Nenhuma."');
  js=js.replace('return n + " " + (n === 1 ? one : many || one + "s");',
    'var words={block:["componente","componentes"],connection:["relação","relações"],part:["parte","partes"]};var pair=words[one];return n+" "+(pair?(n===1?pair[0]:pair[1]):(n===1?one:many||one+"s"));');
  // Give every SAP relation its own legend colour, using only validated CSS values.
  const native=['depends-on','hosts','calls','implements','generates','reads','writes','composes'];
  const extra=Object.keys(relations).filter(k=>!native.includes(k)).concat('scenario-association');
  if(extra.some(k=>!/^[-a-z0-9]+$/.test(k)))throw new Error('Tipo de relação inválido');
  js=js.replace('var REL_STYLES = ["depends-on", "hosts", "calls", "implements", "generates", "reads", "writes", "composes"];',
    'var REL_STYLES = '+JSON.stringify([...native,...extra])+';');
  for(const [type,r]of Object.entries(relations).concat([['scenario-association',{color:'#e879f9',dash:'2 4'}]])) {
    if(!/^[-a-z0-9]+$/.test(type))throw new Error('Tipo de relação inválido');
    const colour=/^#[0-9a-f]{3,8}$/i.test(r.color)?r.color:'#94a3b8';
    const dash=/^[0-9.\s,]*$/.test(r.dash||'')?(r.dash||''):'';
    css+=`\n:root{--k-${type}:${colour}}.rk-${type}{--kc:var(--k-${type});--kd:${dash||'none'}}.rk-${type} .line,.rk-${type} .edge-line{${dash?'stroke-dasharray:'+dash+';':''}}`;
  }
  const light=/:root\s*\{([^}]+)\}/.exec(css)?.[1]||'';
  const dark=/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{([^}]+)\}/.exec(css)?.[1]||'';
  css+=`\nhtml[data-sap-theme="light"]{${light};color-scheme:light}html[data-sap-theme="dark"]{${dark};color-scheme:dark}\n`;
  css+='\n.sap-nav{display:flex;gap:8px;align-items:center}.sap-nav a{font-size:12px;color:var(--accent);text-decoration:none;white-space:nowrap}.sap-nav a:focus-visible{outline:2px solid var(--accent)}@media(max-width:700px){.top{flex-wrap:wrap}.sap-nav{order:10;width:100%}.project-state{display:none}}';
  template=text(template).replace('lang="en"','lang="pt-PT" data-sap-theme="dark"');
  template=template.replace('<header class="top">','<header class="top"><nav class="sap-nav" aria-label="Vistas SAP Atlas"><a href="/explorer.html">Explorador SAP</a><a href="/sap-picture-layers.html">Vista em camadas</a></nav>')
    .replace('<button type="button" id="panel-toggle"','<button type="button" class="tbtn" id="sap-theme">Tema claro</button><button type="button" id="panel-toggle"');
  const theme=`(function(){var b=document.getElementById('sap-theme');function set(t){document.documentElement.dataset.sapTheme=t;b.textContent=t==='dark'?'Tema claro':'Tema escuro';try{localStorage.setItem('sap-video-theme',t)}catch{}}var t='dark';try{t=localStorage.getItem('sap-video-theme')||'dark'}catch{}set(t==='light'?'light':'dark');b.onclick=function(){set(document.documentElement.dataset.sapTheme==='dark'?'light':'dark')}})();`;
  const parts={
    '<!-- ARCHMAP:CSS -->':'<style>'+css.replace(/<\/style/gi,'<\\/style')+'</style>',
    '<!-- ARCHMAP:DATA -->':'<script type="application/json" id="archmap-data">'+embedJson(drilldownModel(model))+'</script>',
    '<!-- ARCHMAP:JS -->':'<script>'+js.replace(/<\/script/gi,'<\\/script')+'</script><script>'+theme+'</script>'
  };
  return template.replace(/<!-- ARCHMAP:(?:CSS|DATA|JS) -->/g,m=>parts[m]);
}
