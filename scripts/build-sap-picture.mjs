import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { readPicture } from '../vendor/limen/src/picture/picture-build.ts';
import { assembleHtml, readViewer } from '../vendor/limen/src/picture/html.ts';
import { parseAtlas, makeDataset, restoreSapRelations } from './sap-picture-model.mjs';
export const root=fileURLToPath(new URL('../',import.meta.url));
export const dataset=resolve(root,'.limen/picture');
const revision=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
const data=parseAtlas(await readFile(resolve(root,'public/technical-data.js'),'utf8'));
for(const dir of ['nodes','edges','features','journeys']){await rm(resolve(dataset,dir),{recursive:true,force:true});await mkdir(resolve(dataset,dir),{recursive:true})}
for(const file of makeDataset(data,revision))await writeFile(resolve(dataset,file.source),file.text);
export async function buildSapPicture(live) {
  const model=restoreSapRelations(await readPicture(dataset,root));
  const errors=model.diagnostics.filter(d=>d.level==='error');
  if(errors.length)throw new Error(JSON.stringify(errors));
  let viewer=await readViewer(resolve(root,'vendor/limen/picture/viewer'));
  // Keep upstream immutable. Apply SAP wording and the return link at assembly time.
  const labels=new Map([
    ['Plant · architecture','SAP · produtos e arquitetura'],['Plant architecture','Produtos e arquitetura SAP'],['Plant map','Mapa SAP'],
    ['Show all module connections','Mostrar todas as relações entre grupos'],['Show selected connections','Mostrar relações da seleção'],
    ['Filter (press /)','Pesquisar produtos, componentes e percursos (/)'],['Filter this list','Pesquisar nesta lista'],['Open as a layer ↗','Abrir em camada ↗'],
    ['Open module','Abrir grupo'],['Close module','Fechar grupo'],['>Journeys<','>Percursos<'],['>Days<','>Histórico<'],['"Planned"','"Planeado"'],['"In progress"','"Em execução"'],
    ['"Map features"','"Cenários do mapa"'],['Ordered steps through the plant','Percursos ordenados pelos componentes'],['Work that touches this module','Tarefas associadas ao grupo'],
    ['Close this layer (Esc)','Fechar esta camada (Esc)'],['Esc closes the top one','Esc fecha a camada superior'],['>Close</button>','>Fechar</button>'],['← Previous','← Anterior'],['Next →','Seguinte →'],
    ['section("Steps"','section("Passos"'],['section("Places"','section("Componentes"'],['"Module"','"Grupo"'],['"Journey"','"Percurso"'],['"Place"','"Componente"'],['This place','Este componente'],['this place','este componente'],
    ['code connection, arrow shows direction','relação SAP · a seta indica a direção'],['number = connections between two modules','número = relações entre dois grupos'],
    ['journey step order, not code','ordem do percurso · não é uma ligação de rede'],['route crosses a card','percurso atravessa um cartão'],
    ['lit: touched by the selection','destaque: componentes da seleção'],['place you opened','componente aberto'],['partly described','conteúdo parcial'],
    ['work items on the place','tarefas associadas ao componente'],['Plant, work, and decisions','Produtos, percursos e trabalho de revisão'],
    ['Needs Adam','Precisa de decisão'],['What this place is for','Para que serve'],['How it works','Como funciona'],['In module','Grupo'],
    ['Only partly described in the map','Conteúdo parcial · validar âmbito e versão'],['Connections','Relações'],['Journeys through this place','Percursos neste componente'],
    ['Work that touches this place','Tarefas associadas'],['No connection in the map.','Sem relação registada.'],['No work item names this place.','Sem tarefa associada.'],
    ['No journey passes here.','Sem percurso associado.'],['Cited files','Ficheiros de origem'],['Ordered steps','Passos do percurso'],
    ['select a step to mark it in the plant','seleciona um passo para o destacar no mapa'],['Clear selection','Limpar seleção'],
    ['["work", "Work",','["work", "Tarefas",'],['["journeys", "Journeys",','["journeys", "Percursos",'],['["days", "Days",','["days", "Histórico",'],['["places", "Places",','["places", "Produtos e componentes",']
  ]);
  const translate=s=>{for(const[a,b]of labels)s=s.split(a).join(b);return s};
  const summaryLine='(n.summary ? `<p class="layer-lead">${esc(n.summary)}</p>` : "") +';
  const detailedLayer=summaryLine+' (n.bodyHtml ? `<section class="layer-part md">${n.bodyHtml}</section>` : "") + section("Componentes", list((n.children ?? []).map(id => nodeLink(id)))) +';
  viewer={...viewer,template:translate(viewer.template).replace('lang="en"','lang="pt-PT"'),
    js:translate(viewer.js).replace('new Set(["planned", "dropped", "map"])','new Set(["dropped", "map"])').replace('? s[1] : "work"','? s[1] : "places"'),
    layersJs:translate(viewer.layersJs.split(summaryLine).join(detailedLayer))};
  let html=assembleHtml(model,viewer,revision,live);
  html=html.replace('</head>','<style>.sap-return{position:fixed;bottom:16px;left:16px;z-index:1000;padding:9px 14px;border:1px solid #b8cedf;border-radius:8px;background:#fff;color:#075985;text-decoration:none;box-shadow:0 2px 10px #0001}.sap-return:focus-visible{outline:3px solid #0070f2}</style></head>');
  html=html.replace('</body>','<a class="sap-return" href="/explorer.html">← SAP Atlas · explorador</a></body>');
  return {model,html};
}
const {model,html}=await buildSapPicture();
await writeFile(resolve(root,'public/sap-picture.html'),html);
await writeFile(resolve(root,'public/sap-picture-model.json'),JSON.stringify(model)+'\n');
console.log(`SAP Picture: ${model.nodes.length} componentes/produtos, ${model.edges.length} relações, ${model.journeys.length} percursos. Sem chamadas a modelos.`);
