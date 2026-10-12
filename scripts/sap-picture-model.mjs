import { createHash } from 'node:crypto';

export function parseAtlas(text) {
  const match=/^window\.ATLAS\s*=\s*([\s\S]*);\s*$/.exec(text);
  if(!match)throw new Error('Formato ATLAS inválido');
  const data=JSON.parse(match[1]);
  const ids=new Set(data.nodes.map(n=>n.id));
  if(ids.size!==data.nodes.length)throw new Error('IDs de componentes duplicados');
  for(const edge of data.edges)if(!ids.has(edge.from)||!ids.has(edge.to))throw new Error('Relação sem componente: '+edge.id);
  return data;
}
const scalar=v=>v===null?'null':JSON.stringify(v);
export function record(kind,id,title,fields,body) {
  const meta={schema:'architecture-map/1',kind,id,project:'sap-atlas',title,status:'partial',sources:['public/technical-data.js'],...fields};
  return '---\n'+Object.entries(meta).map(([k,v])=>Array.isArray(v)?`${k}:\n${v.map(x=>'  - '+scalar(x)).join('\n')}`:k+': '+scalar(v)).join('\n')+'\n---\n\n'+body+'\n';
}
const bullet=items=>items?.length?items.map(s=>'- '+String(s).replace(/\r?\n/g,' ')).join('\n'):'- Detalhe ainda por validar para a edição e versão.';
const idForUrl=url=>'catalog.product.'+createHash('sha256').update(url).digest('hex').slice(0,12);
const categoryId=s=>'catalog.category.'+createHash('sha256').update(s).digest('hex').slice(0,10);
const categoryAliases={'scm':'Supply chain management','hcm':'Human capital management','artificial-intelligence':'Artificial Intelligence','technology-platform':'SAP Business Technology Platform'};
export function makeDataset(data,revision) {
  const files=[];const put=(dir,id,text)=>files.push({source:`${dir}/${id}.md`,text});
  const sources=ids=>(ids||[]).map(id=>data.sources[id]).filter(Boolean).map(s=>`- [${s.title}](${s.url}) · data declarada na fonte fornecida: ${s.checked}`).join('\n');
  put('nodes','sap-atlas',record('plant','sap-atlas','SAP Atlas · produtos, componentes e percursos',{parent:null,revision},'Catálogo SAP e arquitetura técnica, com relações, capacidades e percursos navegáveis.\n\nEsta vista reúne cenários alternativos; não descreve uma instalação única. Os dados vêm dos anexos e não de uma nova recolha online. Produtos sem aprofundamento mantêm o estado parcial.'));
  for(const n of data.nodes.filter(n=>n.id!=='root')) {
    const parent=n.parent==='root'?'sap-atlas':n.parent;
    const body=`${n.summary||'Registo sem resumo técnico validado.'}\n\n## Responsabilidade e âmbito\n${n.owner||'Por validar'}\n\n${n.requirement||''} · ${n.evidence||'Por validar'}${n.provider?' · '+n.provider:''}\n\n## Pré-requisitos\n${bullet(n.requirements)}\n\n## Configurar e operar\n${bullet(n.configuration)}\n\n## Fontes SAP\n${sources(n.sourceIds)||'Sem fonte técnica específica associada.'}\n\n[Ver no explorador técnico](/explorer.html#g=${encodeURIComponent(n.id)}&relations=all)`;
    put('nodes',n.id,record('module',n.id,n.title,{parent,'sap-component':n.id},body));
  }
  const seenUrls=new Set();const categories=new Set();
  for(const p of data.products) {
    if(!p.source_url||seenUrls.has(p.source_url))throw new Error('Produto sem URL ou duplicado');seenUrls.add(p.source_url);
    const category=categoryAliases[p.category]||p.category||'Categoria por validar';const cid=categoryId(category);
    if(!categories.has(category)) {
      categories.add(category);
      put('nodes',cid,record('module',cid,'Catálogo · '+category,{parent:'sap-atlas'},'Entradas comerciais agrupadas pela categoria presente no corpus. A classificação não comprova arquitetura, disponibilidade regional nem dependências.'));
    }
    const id=idForUrl(p.source_url);const docs=(p.documentationMatches||[]).map(m=>`- [${m.name}](${m.url}) · ${m.match}`).join('\n');
    const body=`${p.description||'Descrição funcional ainda por aprofundar.'}\n\n## Capacidades descritas no catálogo\n${bullet(p.key_capabilities_for_customer_mapping)}\n\n## Documentação por edição e versão\n${docs||'Ainda sem correspondência documental exata.'}\n\n## Proveniência\n[Página comercial SAP](${p.source_url})\n\n${p.extraction_confidence||'Origem: catálogo fornecido.'}\n\nEste registo não confirma alojamento, licenciamento, protocolos ou componentes internos. Validar a oferta e a versão antes de usar como desenho técnico.`;
    put('nodes',id,record('module',id,p.product_name,{parent:cid,'catalog-url':p.source_url,sources:['public/technical-data.js','public/research-data.js']},body));
  }
  const native={calls:'calls',hosts:'hosts',reads:'reads',writes:'writes',composes:'composes'};
  for(const e of data.edges) {
    if(e.from==='root'||e.to==='root')continue;
    const title=e.label||data.relations[e.type]?.title||e.type;
    const body=`${title}.\n\n## Relação SAP\n${data.relations[e.type]?.title||e.type}\n\n## Protocolo e transporte\n${e.protocol||'Não especificado.'}\n\n## Segurança\n${e.security||'Não especificada.'}\n\n## Quando se aplica\n${e.condition||'Por validar.'}\n\n${e.detail||''}\n\n## Fontes\n${sources(e.sourceIds)||'Sem fonte específica.'}`;
    put('edges',e.id,record('edge',e.id,title,{from:e.from,to:e.to,relation:native[e.type]||'depends-on','sap-relation':data.relations[e.type]?.title||e.type,'sap-type':e.type},body));
  }
  for(const feature of data.features)put('features',feature.id,record('feature',feature.id,feature.title,{touches:feature.nodes},'Componentes associados a este cenário no Atlas. O destaque indica alcance funcional; a lista não estabelece ordem de execução.'));
  const journeys=[
    {id:'btp-account',title:'BTP · do contrato à aplicação',steps:['global-account','entitlements','subaccount','cloud-foundry','cap'],texts:['Administrar o contrato e a organização de contas.','Disponibilizar planos e quotas contratados.','Configurar uma subaccount numa região e atribuir os planos necessários.','Ativar o ambiente Cloud Foundry se for o runtime escolhido.','Publicar e configurar a aplicação CAP no runtime selecionado.']},
    {id:'btp-login',title:'BTP · login da aplicação e federação',steps:['business-user','approuter','xsuaa','ias','idp','ias','xsuaa','approuter','cap'],texts:['O utilizador inicia o acesso à aplicação.','O application router inicia o fluxo de autenticação configurado.','O serviço de autorização participa no padrão CF/XSUAA.','IAS participa como IdP quando o trust está configurado.','O IdP corporativo autentica o utilizador numa federação configurada.','O fluxo regressa ao serviço de identidade.','A autorização e os tokens dependem do trust, scopes e role collections.','O application router encaminha a chamada autorizada.','A aplicação executa a operação.']},
    {id:'ibp-planning',title:'IBP · da procura ao plano acordado',steps:['ibp-demand','ibp-supply','ibp-sop','ibp-response'],texts:['Preparar histórico e estimar a procura.','Simular abastecimento e capacidade ao longo da rede.','Conciliar objetivos financeiros e operacionais em S&OP.','Monitorizar exceções e rever o plano.']},
    {id:'apo-planning',title:'APO · previsão, rede e confirmação',steps:['apo-demand','apo-network','apo-production','apo-promise'],texts:['Preparar a previsão e a revisão da procura.','Planear compras, produção e distribuição com restrições.','Aprofundar a capacidade e as regras de produção suportadas.','Validar o processo de confirmação e a integração ERP.']},
    {id:'erp-request',title:'ERP · do pedido Fiori aos dados HANA',steps:['browser','web-dispatcher','pas','hana-primary'],texts:['O utilizador inicia um pedido.','O Web Dispatcher encaminha o pedido no padrão representado.','O servidor de aplicação executa a lógica ERP.','A base de dados participa na leitura e persistência.']}
  ];
  for(const j of journeys)put('journeys',j.id,record('journey',j.id,j.title,{steps:j.steps},'Percurso pedagógico do Atlas, sujeito à edição, configuração e cenário. A ordem explica o processo; não cria novas ligações de rede.\n\n'+j.texts.map((t,i)=>`${i+1}. ${t}`).join('\n')));
  return files;
}
export function restoreSapRelations(model) {
  // Native Limen validates its code-architecture vocabulary. The product adapter restores
  // the original SAP relationship labels rather than reclassifying them as code dependencies.
  for(const e of model.edges)if(e.meta['sap-relation'])e.kind=e.meta['sap-relation'];
  return model;
}
