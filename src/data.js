// ============================================================================
// data.js — Modelo de dados do Mapa do Ecossistema SAP
// ----------------------------------------------------------------------------
// Este é o único ficheiro que precisas de editar para:
//   - corrigir/adicionar texto de um serviço (secção SERVICOS)
//   - mudar a cor de uma camada (secção LAYERS)
//   - ajustar quem está activo/atenuado/escondido em cada cenário
//     (secção TABELA_CENARIOS)
// Todo o resto da app (App.jsx, componentes) lê destes dados — não há
// texto de serviços "hardcoded" nos componentes.
// ============================================================================

// ----------------------------------------------------------------------------
// 1. CAMADAS (de baixo para cima no diagrama)
// ----------------------------------------------------------------------------
export const LAYERS = [
  { id: 'infra', nivel: 0, nome: 'Infraestrutura', corVar: 'var(--color-layer-infra)', corClasse: 'layer-infra' },
  { id: 'dados', nivel: 1, nome: 'Dados', corVar: 'var(--color-layer-dados)', corClasse: 'layer-dados' },
  { id: 'plataforma', nivel: 2, nome: 'Plataforma (SAP BTP)', corVar: 'var(--color-layer-plataforma)', corClasse: 'layer-plataforma' },
  { id: 'integracao', nivel: 3, nome: 'Integração', corVar: 'var(--color-layer-integracao)', corClasse: 'layer-integracao' },
  { id: 'core', nivel: 4, nome: 'Core ERP / Digital Core', corVar: 'var(--color-layer-core)', corClasse: 'layer-core' },
  { id: 'lob', nivel: 5, nome: 'LoB / SaaS + Experiência + IA', corVar: 'var(--color-layer-lob)', corClasse: 'layer-lob' },
]

// ----------------------------------------------------------------------------
// 2. CENÁRIOS
// ----------------------------------------------------------------------------
export const SCENARIOS = {
  onprem: {
    id: 'onprem',
    nome: 'On-Premise Tradicional',
    chip: 'TI interna gere tudo: hardware, HANA, S/4 (ou ECC) e PI/PO, on-premises.',
    resumo:
      'O cliente opera hardware, HANA, S/4 (ou ECC) e PI/PO. Controlo total, TCO e upgrades a cargo da TI interna. BTP/SaaS são opcionais e laterais.',
  },
  cloud: {
    id: 'cloud',
    nome: 'Cloud Pública',
    chip: 'S/4HANA Cloud Public Edition, standard, no hyperscaler — fit-to-standard e time-to-value curto.',
    resumo:
      'S/4HANA Cloud Public Edition (GROW) no hyperscaler, processos standard, BTP para extensões, Integration Suite como iPaaS, LoB SaaS nativos. Time-to-value curto, fit-to-standard.',
  },
  rise: {
    id: 'rise',
    nome: 'Híbrido — RISE with SAP',
    chip: 'S/4HANA Cloud Private Edition operado pela SAP no hyperscaler à escolha, com clean core no BTP.',
    resumo:
      'Um contrato (software + BTP + infra gerida pela SAP no hyperscaler à escolha). S/4 Private Edition ≈ scope on-prem, mas operação SAP. Clean core: custom code sai para o BTP. On-prem residual liga-se por Cloud Connector / Edge Integration Cell. PI/PO em phase-out até 2027.',
  },
}
export const ORDEM_CENARIOS = ['onprem', 'cloud', 'rise']

// ----------------------------------------------------------------------------
// 3. HYPERSCALERS (mini-seletor — só altera o card L0 + tooltip)
// ----------------------------------------------------------------------------
export const HYPERSCALER_IDS = ['aws', 'azure', 'gcp']

// ----------------------------------------------------------------------------
// 4. CATÁLOGO DE SERVIÇOS
//    icone   -> chave em src/icons.js (nunca logótipos de marcas reais)
//    ligaA   -> ids de outros serviços com quem se relaciona (drawer + linhas)
//    contextoPorCenario -> texto exacto do campo "Neste cenário" do drawer
// ----------------------------------------------------------------------------
export const SERVICOS = [
  {
    id: 'aws',
    nome: 'Amazon Web Services',
    camada: 'infra',
    tipo: 'IaaS',
    icone: 'hyperscaler',
    cenarios: ['cloud', 'rise'],
    oQueFaz:
      'Hyperscaler que fornece compute, rede, storage e região. No RISE, a VPC do S/4 é gerida pela SAP sobre AWS.',
    paraQueServe:
      'Alojar S/4HANA Cloud (private ou public), BTP em região AWS, e ligar o landing zone do cliente via Direct Connect / Transit Gateway.',
    exemploReal:
      'Vários clientes RISE publicam arquitecturas de referência AWS + SAP; a fundação de rede empresarial (landing zone, inspeção, Transit Gateway) é o padrão para ligar o on-prem ao VPC gerido pela SAP.',
    ligaA: ['azure', 'gcp', 's4hana', 'btp', 'hana-cloud'],
    contextoPorCenario: {
      onprem: 'Não entra neste cenário — não há hyperscaler; tudo corre no data center do cliente.',
      cloud: 'Aloja o S/4HANA Cloud Public Edition e o BTP nesta região, se for o hyperscaler escolhido acima.',
      rise: 'A VPC do S/4HANA Cloud Private Edition corre aqui — mas gerida pela SAP, não pelo cliente.',
    },
  },
  {
    id: 'azure',
    nome: 'Microsoft Azure',
    camada: 'infra',
    tipo: 'IaaS',
    icone: 'hyperscaler',
    cenarios: ['cloud', 'rise'],
    oQueFaz: 'Hyperscaler Microsoft. Mesmo papel que AWS: IaaS sob S/4 gerido (RISE) ou BTP.',
    paraQueServe:
      'Empresas já no ecossistema Microsoft (Entra ID, ExpressRoute) escolhem Azure como região RISE / BTP.',
    exemploReal:
      'Padrão comum em clientes europeus que já usam Azure AD / Entra ID como IdP em conjunto com SAP Cloud Identity Services.',
    ligaA: ['aws', 'gcp', 's4hana', 'btp', 'ias'],
    contextoPorCenario: {
      onprem: 'Não entra neste cenário — não há hyperscaler; tudo corre no data center do cliente.',
      cloud: 'Aloja o S/4HANA Cloud Public Edition e o BTP nesta região; frequente em clientes já no ecossistema Microsoft.',
      rise: 'A VPC do S/4HANA Cloud Private Edition corre aqui, gerida pela SAP, muitas vezes federada ao Entra ID via Cloud Identity Services.',
    },
  },
  {
    id: 'gcp',
    nome: 'Google Cloud',
    camada: 'infra',
    tipo: 'IaaS',
    icone: 'hyperscaler',
    cenarios: ['cloud', 'rise'],
    oQueFaz:
      'Hyperscaler Google. SAP gere o projecto RISE; o cliente gere a conectividade (Interconnect / VPC partilhada) a partir da sua org GCP.',
    paraQueServe: 'Alojar a private cloud RISE e integrar com serviços Google na org do cliente.',
    exemploReal:
      'A documentação pública Google Cloud descreve o modelo "SAP organization vs customer organization" para RISE on GCP.',
    ligaA: ['aws', 'azure', 's4hana', 'btp'],
    contextoPorCenario: {
      onprem: 'Não entra neste cenário — não há hyperscaler; tudo corre no data center do cliente.',
      cloud: 'Aloja o S/4HANA Cloud Public Edition e o BTP nesta região, se for o hyperscaler escolhido acima.',
      rise: 'A private cloud RISE corre aqui, num projecto gerido pela SAP, ligado à organização GCP do cliente.',
    },
  },
  {
    id: 'dc-onprem',
    nome: 'Data Center do Cliente',
    camada: 'infra',
    tipo: 'On-prem',
    icone: 'datacenter',
    cenarios: ['onprem', 'rise'],
    oQueFaz:
      'Infraestrutura gerida pelo cliente (ou hosted clássico) onde correm ECC/S/4 any-premise, PI/PO e satélites.',
    paraQueServe:
      'Cenário tradicional e, no RISE, sistemas que ainda não migraram (legado, shop-floor, regulamentares) ligados via Cloud Connector / Edge Integration Cell.',
    exemploReal:
      'H.B. Fuller evitou um data center físico no percurso RISE e estimou ~US$200 mil de poupança só nesse item, com instância global em 123 países.',
    ligaA: ['hana-onprem', 's4-any', 'pipo', 'cloud-connector', 'eic'],
    contextoPorCenario: {
      onprem: 'É o centro deste cenário: aqui correm o HANA, o S/4 (ou ECC) e o PI/PO, sob gestão total do cliente.',
      cloud: 'Escondido por defeito — a Cloud Pública assume tudo no hyperscaler. Ativa "Mostrar legado" para o ver como referência.',
      rise: 'Residual: só os sistemas que ainda não migraram ficam aqui, ligados por Cloud Connector ou Edge Integration Cell.',
    },
  },
  {
    id: 'hana-onprem',
    nome: 'SAP HANA (on-premise)',
    camada: 'dados',
    tipo: 'DB',
    icone: 'hana-onprem',
    cenarios: ['onprem'],
    oQueFaz: 'Base de dados in-memory instalada no data center do cliente. Motor do S/4HANA any-premise.',
    paraQueServe: 'Transaccional + analítico no mesmo engine, sem latência de disco clássica, sob operação do cliente.',
    exemploReal:
      'Shell usou S/4HANA / HANA como digital core financeiro em tempo real (Central Finance) — padrão clássico on-prem/hosted antes da onda RISE.',
    ligaA: ['s4-any', 'dc-onprem'],
    contextoPorCenario: {
      onprem: 'É o motor de base de dados do S/4 (ou ECC) neste cenário, instalado e operado pelo cliente.',
      cloud: 'Substituído pelo SAP HANA Cloud no BTP — não há HANA on-premise numa Cloud Pública standard.',
      rise: 'Substituído: o S/4HANA Cloud Private Edition corre sobre HANA na private cloud gerida pela SAP.',
    },
  },
  {
    id: 'hana-cloud',
    nome: 'SAP HANA Cloud',
    camada: 'dados',
    tipo: 'DBPaaS',
    icone: 'hana-cloud',
    cenarios: ['cloud', 'rise'],
    oQueFaz:
      'HANA como serviço gerido no BTP: transaccional, data lake e multi-model (relacional, grafo, spatial).',
    paraQueServe:
      'Persistência de extensões BTP, datasources para SAC/Datasphere, e offload analítico sem tocar no core S/4.',
    exemploReal:
      'Extensões side-by-side no BTP usam HANA Cloud em vez de tabelas Z no S/4 — padrão Clean Core adoptado em rollouts RISE como o da Ferrara Candy.',
    ligaA: ['btp', 's4hana', 'datasphere', 'sac', 'build'],
    contextoPorCenario: {
      onprem: 'Não é o default aqui — este cenário assenta em HANA on-premise, sob gestão do cliente.',
      cloud: 'É a base de dados do S/4HANA Cloud Public Edition e o motor de persistência de dados no BTP.',
      rise: 'Corre na private cloud RISE; extensões side-by-side no BTP também a usam em vez de tabelas Z no core.',
    },
  },
  {
    id: 'datasphere',
    nome: 'SAP Datasphere',
    camada: 'dados',
    tipo: 'Data Fabric',
    icone: 'datasphere',
    cenarios: ['cloud', 'rise'],
    oQueFaz:
      'Camada semântica de dados de negócio (Business Data Cloud / Datasphere) para unir SAP e não-SAP sem copiar tudo.',
    paraQueServe:
      'Modelo de dados governado para finanças, supply chain e RH, alimentando SAC e agentes de IA com contexto.',
    exemploReal: 'Arquitectura de referência SAP: Datasphere + SAC + BW/4 como via analítica híbrida cloud/on-prem.',
    ligaA: ['hana-cloud', 'sac', 's4hana', 'bdc'],
    contextoPorCenario: {
      onprem: 'Não é o default aqui — sem BTP em produção, não há camada semântica de dados na cloud.',
      cloud: 'Une dados do S/4 e não-SAP numa camada semântica governada, sem duplicar tudo para fora do core.',
      rise: 'Parte da via analítica híbrida: liga o S/4 Private Edition a SAC e a fontes fora do SAP.',
    },
  },
  {
    id: 'bdc',
    nome: 'SAP Business Data Cloud',
    camada: 'dados',
    tipo: 'Data + AI',
    icone: 'bdc',
    cenarios: ['cloud', 'rise'],
    oQueFaz:
      'Oferta que une Datasphere, SAC e fundação de dados para Business AI / Joule (contexto empresarial).',
    paraQueServe:
      'Dar aos assistentes e agentes o contexto de processos SAP — sem isto a IA empresarial "alucina" fora do processo.',
    exemploReal:
      'Na SAP Sapphire 2026 a SAP posicionou Business Data Cloud + BTP + AI Foundation como tecto único da Business AI Platform. H&M mostrou um Store Intelligence Agent sobre RISE + Business Data Cloud.',
    ligaA: ['datasphere', 'sac', 'joule', 'btp'],
    contextoPorCenario: {
      onprem: 'Não é o default aqui — a Business AI Platform pressupõe BTP e dados na cloud.',
      cloud: 'Dá contexto de processo aos agentes Joule, unindo Datasphere e SAC sob o mesmo tecto de dados.',
      rise: 'Combinado com RISE e BTP, é a fundação de dados que evita que a IA "alucine" fora do processo SAP.',
    },
  },
  {
    id: 'btp',
    nome: 'SAP BTP',
    camada: 'plataforma',
    tipo: 'PaaS',
    icone: 'btp',
    cenarios: ['cloud', 'rise'],
    oQueFaz:
      'Business Technology Platform: integração, dados, extensibilidade, automação e IA. É onde vive o clean core (extensões fora do S/4).',
    paraQueServe:
      'Apps side-by-side (CAP, ABAP Cloud, Build), iPaaS, identidade, automações e eventos — sem modificar o core ERP.',
    exemploReal:
      'Ferrara Candy: RISE S/4HANA Cloud Private Edition powered by BTP, go-live big-bang em 25 módulos, 98%+ qualidade de master data. Southwest Gas: BTP + SuccessFactors LMS para validar certificações de técnicos de campo via QR no telemóvel.',
    ligaA: ['integration-suite', 'build', 'hana-cloud', 'ias', 's4hana', 'joule'],
    contextoPorCenario: {
      onprem: 'Atenuado: pode existir como extensão lateral, mas não é o default de um cenário puramente on-premise.',
      cloud: 'É onde vivem as extensões, a integração, os dados e a IA — sem tocar no S/4HANA Cloud standard.',
      rise: 'Incluído com créditos RISE; é o destino de todo o custom code, mantendo o S/4 Private Edition limpo (clean core).',
    },
  },
  {
    id: 'build',
    nome: 'SAP Build',
    camada: 'plataforma',
    tipo: 'Dev + Low-code',
    icone: 'build',
    cenarios: ['cloud', 'rise'],
    oQueFaz:
      'Família unificada: Build Apps, Build Code, Process Automation, Work Zone, ABAP environment, Cloud Foundry e Kyma.',
    paraQueServe:
      'Extensões Fiori, workflows no-code, portais de trabalho e microserviços — tudo no BTP, aderente ao clean core.',
    exemploReal:
      'Hitachi High-Tech reportou 94% de redução no footprint de customização; Gerdau usou Build + Integration Suite + S/4 para onboarding 50% mais rápido.',
    ligaA: ['btp', 'workzone', 's4hana', 'successfactors'],
    contextoPorCenario: {
      onprem: 'Atenuado: só relevante se já houver BTP a correr side-by-side com o core on-premise.',
      cloud: 'Constrói as apps Fiori, workflows e microserviços que estendem o S/4HANA Cloud sem o modificar.',
      rise: 'Mesmo papel que na Cloud Pública: extensões e automações no BTP, fora do S/4 Private Edition.',
    },
  },
  {
    id: 'workzone',
    nome: 'SAP Build Work Zone',
    camada: 'plataforma',
    tipo: 'UX / Launchpad',
    icone: 'workzone',
    cenarios: ['cloud', 'rise'],
    oQueFaz: 'Ponto de entrada único (digital workplace) para S/4, apps BTP e SaaS LoB.',
    paraQueServe: 'Um sítio só para o utilizador: tiles Fiori, processos, conteúdo e apps de terceiros.',
    exemploReal:
      'Padrão de UX da Intelligent Enterprise: Work Zone como shell sobre S/4 + SuccessFactors + apps custom.',
    ligaA: ['build', 's4hana', 'successfactors', 'ias'],
    contextoPorCenario: {
      onprem: 'Atenuado: só faz sentido se já existir um launchpad BTP a par do Fiori on-premise.',
      cloud: 'É o ponto de entrada único do utilizador: tiles do S/4, apps BTP e SuccessFactors no mesmo sítio.',
      rise: 'Mesmo shell de digital workplace, agora sobre um S/4 Private Edition operado pela SAP.',
    },
  },
  {
    id: 'ias',
    nome: 'SAP Cloud Identity Services',
    camada: 'plataforma',
    tipo: 'IdP / IAM',
    icone: 'ias',
    cenarios: ['cloud', 'rise'],
    oQueFaz:
      'Identity Authentication + Identity Provisioning. SSO e ciclo de vida de utilizadores entre S/4, BTP e LoB.',
    paraQueServe:
      'Login único corporativo e provisionamento automático (joiner/mover/leaver) para toda a suite.',
    exemploReal:
      'Componente incluído no tenant RISE / S/4HANA Cloud; quase todos os landscapes cloud usam IAS federado ao IdP corporativo (Entra ID, Okta).',
    ligaA: ['btp', 's4hana', 'successfactors', 'azure'],
    contextoPorCenario: {
      onprem: 'Atenuado: só entra em jogo se houver SSO federado com serviços cloud a par do core on-premise.',
      cloud: 'Faz o SSO e o ciclo de vida de utilizadores entre o S/4HANA Cloud, o BTP e o LoB SaaS.',
      rise: 'Mesmo papel de identidade, incluído no tenant RISE, tipicamente federado ao IdP corporativo.',
    },
  },
  {
    id: 'integration-suite',
    nome: 'SAP Integration Suite',
    camada: 'integracao',
    tipo: 'EiPaaS',
    icone: 'integration-suite',
    cenarios: ['cloud', 'rise'],
    oQueFaz:
      'iPaaS no BTP: Cloud Integration (iFlows), API Management, Event Mesh, Integration Advisor, Open Connectors, Trading Partner Management. Sucessor estratégico de PI/PO.',
    paraQueServe:
      'A2A, B2B/EDI, B2G e eventos entre SAP e não-SAP, cloud e on-prem. RISE inclui um baseline; landscapes com >10–15 fluxos costumam precisar de capacidade extra.',
    exemploReal:
      'Jabil usa Integration Suite + BTP como espinha dorsal global, com padrão API + eventos, a caminho de RISE e clean core. Nu Skin reduziu criações de integração de semanas para dias. FC Bayern consolidou 52 sistemas.',
    ligaA: ['btp', 's4hana', 'ariba', 'successfactors', 'eic', 'event-mesh', 'pipo'],
    contextoPorCenario: {
      onprem: 'Atenuado: existe como opção de iPaaS lateral, mas o PI/PO é que serve o core neste cenário.',
      cloud: 'É o iPaaS: iFlows, API Management e eventos entre o S/4HANA Cloud e tudo o resto, SAP ou não.',
      rise: 'Inclui um baseline no contrato RISE; landscapes maiores costumam precisar de capacidade extra.',
    },
  },
  {
    id: 'event-mesh',
    nome: 'SAP Event Mesh',
    camada: 'integracao',
    tipo: 'EDA',
    icone: 'event-mesh',
    cenarios: ['cloud', 'rise'],
    oQueFaz:
      'Broker de eventos no BTP. O S/4 publica business events; consumidores (BTP, LoB, terceiros) subscrevem.',
    paraQueServe:
      'Desacoplar o core: em vez de RFC síncrono ponto-a-ponto, o landscape reage a "BusinessPartner.Changed" etc.',
    exemploReal:
      'Padrão recomendado SAP para S/4HANA Cloud / RISE — Jabil descreve explicitamente a mudança para arquitectura API + event-based.',
    ligaA: ['integration-suite', 's4hana', 'btp'],
    contextoPorCenario: {
      onprem: 'Não é o default aqui — sem BTP em produção, o S/4 não publica eventos, comunica via PI/PO.',
      cloud: 'O S/4HANA Cloud publica eventos de negócio aqui; consumidores no BTP ou LoB reagem sem RFC síncrono.',
      rise: 'Mesmo padrão de arquitectura orientada a eventos, recomendado pela SAP para desacoplar o S/4 Private Edition.',
    },
  },
  {
    id: 'eic',
    nome: 'Edge Integration Cell',
    camada: 'integracao',
    tipo: 'Runtime híbrido',
    icone: 'eic',
    cenarios: ['rise'],
    oQueFaz:
      'Runtime da Integration Suite que corre no landscape privado (Kubernetes) para dados que não podem sair para a cloud.',
    paraQueServe: 'Cenários regulamentados ou shop-floor: desenhas o iFlow na cloud e executas on-prem.',
    exemploReal:
      'Arquitectura de referência AWS/SAP para RISE: EIC em HA no landing zone do cliente, desenhado na cloud e executado na privada.',
    ligaA: ['integration-suite', 'dc-onprem', 'cloud-connector', 's4hana'],
    contextoPorCenario: {
      onprem: 'Não entra neste cenário — não há tenant cloud da Integration Suite para trazer o runtime para o on-premise.',
      cloud: 'Normalmente não é necessário — a Cloud Pública não pressupõe dados que tenham de ficar no landscape privado.',
      rise: 'Opcional: corre no landscape privado do cliente para dados que não podem sair para a cloud, desenhado na Integration Suite.',
    },
  },
  {
    id: 'cloud-connector',
    nome: 'SAP Cloud Connector',
    camada: 'integracao',
    tipo: 'Connectivity',
    icone: 'cloud-connector',
    cenarios: ['rise', 'cloud'],
    oQueFaz: 'Túnel seguro outbound do on-prem para o BTP. Não abre inbound no firewall do cliente.',
    paraQueServe:
      'Deixar extensões BTP e iFlows chamarem RFC/OData/HTTP de sistemas que ainda estão no data center.',
    exemploReal: 'Peça obrigatória de qualquer landscape híbrido RISE com satélites on-prem.',
    ligaA: ['btp', 'dc-onprem', 'eic', 's4-any'],
    contextoPorCenario: {
      onprem: 'Não entra neste cenário — sem BTP em produção, não há necessidade do túnel outbound.',
      cloud: 'Uso pontual: liga extensões BTP a algum sistema satélite que ainda reste fora do hyperscaler.',
      rise: 'Peça obrigatória para os sistemas sobreviventes on-premise falarem com o BTP e o S/4 Private Edition.',
    },
  },
  {
    id: 'pipo',
    nome: 'SAP PI/PO (legado)',
    camada: 'integracao',
    tipo: 'Middleware on-prem',
    icone: 'pipo',
    cenarios: ['onprem'],
    notaMapa: 'manutenção até Dez 2027',
    oQueFaz: 'Process Integration / Process Orchestration. Middleware clássico A2A on-prem.',
    paraQueServe:
      'Ainda corre milhares de interfaces; destino estratégico é a Integration Suite (fim de manutenção standard: Dez 2027).',
    exemploReal:
      'A maior parte dos programas RISE inclui workstream de migração PI/PO → Integration Suite (Migration Assessment).',
    ligaA: ['s4-any', 'integration-suite', 'dc-onprem'],
    contextoPorCenario: {
      onprem: 'É o middleware A2A deste cenário — ainda a correr milhares de interfaces sobre o S/4 (ou ECC). Manutenção standard até Dezembro de 2027.',
      cloud: 'Escondido — substituído pela SAP Integration Suite; não faz parte de uma Cloud Pública standard.',
      rise: 'Em phase-out: manutenção standard até Dezembro de 2027, com destino final na Integration Suite.',
    },
  },
  {
    id: 's4-any',
    nome: 'SAP S/4HANA (any-premise)',
    camada: 'core',
    tipo: 'ERP on-prem',
    icone: 's4',
    cenarios: ['onprem'],
    anotacaoLegado: 'inclui ECC (legado)',
    oQueFaz: 'S/4HANA instalado e operado pelo cliente (ou hoster clássico), sobre HANA on-prem.',
    paraQueServe:
      'Mesmo digital core (FI, MM, SD, PP, EWM…) mas com TCO, upgrades e segurança a cargo do cliente.',
    exemploReal: 'Ponto de partida da maioria dos clientes RISE que vinham de ECC ou S/4 on-prem.',
    ligaA: ['hana-onprem', 'pipo', 'dc-onprem'],
    contextoPorCenario: {
      onprem: 'É o digital core deste cenário: instalado, operado e actualizado pela TI interna do cliente.',
      cloud: 'Escondido — a Cloud Pública usa a edição Public do S/4HANA Cloud, não a versão any-premise.',
      rise: 'Escondido — o RISE usa o S/4HANA Cloud Private Edition, operado pela SAP, não a versão any-premise.',
    },
  },
  {
    id: 's4hana',
    nome: 'SAP S/4HANA Cloud',
    camada: 'core',
    tipo: 'ERP Cloud',
    icone: 's4',
    cenarios: ['cloud', 'rise'],
    oQueFaz:
      'Digital core. Public Edition (GROW, standardizado) ou Private Edition (RISE, scope próximo do on-prem, operado pela SAP no hyperscaler).',
    paraQueServe:
      'Finanças, logística, vendas, manufacturing, EWM/TM — o motor transaccional da empresa. Extensões in-app limitadas; o resto vai para o BTP (clean core).',
    exemploReal:
      'Alto (Governo do Canadá): S/4HANA Cloud Public Edition + SuccessFactors live em 6 meses, standard-only. Ferrara Candy: RISE Private Edition, 25 módulos em big-bang. H.B. Fuller: Private Edition em 123 países, ~US$1.5 M evitado em infra legada.',
    ligaA: ['hana-cloud', 'btp', 'integration-suite', 'successfactors', 'ariba', 'signavio', 'sac', 'joule'],
    contextoPorCenario: {
      onprem: 'Escondido — este cenário usa o S/4HANA any-premise, operado pelo cliente, não a edição cloud.',
      cloud: 'É o digital core deste cenário, na Public Edition: processos standard, fit-to-standard, GROW with SAP.',
      rise: 'É o digital core deste cenário, na Private Edition: scope próximo do on-premise, operado pela SAP.',
    },
  },
  {
    id: 'successfactors',
    nome: 'SAP SuccessFactors',
    camada: 'lob',
    tipo: 'SaaS HCM',
    icone: 'successfactors',
    cenarios: ['cloud', 'rise'],
    oQueFaz: 'Suite de RH na cloud: Employee Central, Recruiting, Learning, Performance, Folha em vários países.',
    paraQueServe: 'Contratar, integrar, formar, pagar e gerir talento, integrado ao S/4 (custo, org, time).',
    exemploReal:
      'Alto: RH live em 6 meses com S/4 Public. Darussalam Assets: −75% no tempo de recruitment. Gerdau: onboarding 50% mais rápido. Southwest Gas: LMS + BTP para compliance de campo.',
    ligaA: ['s4hana', 'integration-suite', 'ias', 'joule'],
    contextoPorCenario: {
      onprem: 'Atenuado: pode coexistir como RH em SaaS a par de um core on-premise, mas não é o default.',
      cloud: 'Cobre todo o RH — Employee Central, Recruiting, Learning, Performance — integrado ao S/4HANA Cloud.',
      rise: 'Mesmo papel de HCM em SaaS, agora ao lado de um S/4 Private Edition operado pela SAP.',
    },
  },
  {
    id: 'ariba',
    nome: 'SAP Ariba',
    camada: 'lob',
    tipo: 'SaaS Procurement',
    icone: 'ariba',
    cenarios: ['cloud', 'rise'],
    oQueFaz: 'Source-to-pay na cloud: sourcing, contratos, supplier lifecycle, catalog, Business Network.',
    paraQueServe: 'Compras indirectas e rede de fornecedores, com facturas e collaboration fora do GUI do ERP.',
    exemploReal:
      'NEOM: Ariba no P2P, registo de fornecedores ~−80%. Ferrara: Ariba Business Network + GTS para compliance de sanctioned parties. Sonae Arauco: +25% produtividade em procurement. SKF: procurement global com Ariba.',
    ligaA: ['s4hana', 'integration-suite', 'signavio'],
    contextoPorCenario: {
      onprem: 'Atenuado: pode coexistir como procurement em SaaS a par de um core on-premise, mas não é o default.',
      cloud: 'Cobre o source-to-pay — sourcing, contratos, Business Network — fora do GUI do S/4HANA Cloud.',
      rise: 'Mesmo papel de procurement em SaaS, agora ao lado de um S/4 Private Edition operado pela SAP.',
    },
  },
  {
    id: 'signavio',
    nome: 'SAP Signavio',
    camada: 'lob',
    tipo: 'Process Intelligence',
    icone: 'signavio',
    cenarios: ['cloud', 'rise', 'onprem'],
    oQueFaz:
      'Process Manager, Process Intelligence (mining), Process Insights, Collaboration Hub. Como a empresa TRABALHA, não só o que o ERP guarda.',
    paraQueServe:
      'Mapear as-is, comparar com best practices (Process Navigator), priorizar o que vai para S/4 standard vs. BTP.',
    exemploReal:
      'Vodafone Procurement: suite Signavio completa no programa RISE; 11 mil modelos migrados de ARIS; 284 M de cases em Process Intelligence. Alto: Process Navigator reduziu documentação ~30%. H.B. Fuller: Signavio + BTP para M&A mais rápidas.',
    ligaA: ['s4hana', 'btp', 'ariba'],
    contextoPorCenario: {
      onprem: 'Já é activo aqui: mapeia como a empresa trabalha, mesmo antes de qualquer migração para a cloud.',
      cloud: 'Compara o as-is com best practices e prioriza o que fica standard no S/4HANA Cloud.',
      rise: 'Normalmente o ponto de partida de um programa RISE: mapear, comparar e só depois migrar.',
    },
  },
  {
    id: 'sac',
    nome: 'SAP Analytics Cloud',
    camada: 'lob',
    tipo: 'Analytics + Planning',
    icone: 'sac',
    cenarios: ['cloud', 'rise'],
    oQueFaz: 'BI, predictive e enterprise planning na cloud, live sobre S/4, Datasphere e HANA.',
    paraQueServe: 'Closing comments, forecast, dashboards de direção, planeamento integrado finance/supply.',
    exemploReal:
      'Vodafone migrou 82 reports Celonis/legado para SAC no mesmo programa Signavio. NEOM usou BW/4 + SAC para acompanhar milhares de milhões em construção.',
    ligaA: ['datasphere', 's4hana', 'bdc', 'joule'],
    contextoPorCenario: {
      onprem: 'Atenuado: pode coexistir como BI em SaaS a par de um core on-premise, mas não é o default.',
      cloud: 'Faz BI, predictive e planeamento sobre o S/4HANA Cloud e o Datasphere, nativamente na cloud.',
      rise: 'Mesmo papel de analytics e planeamento, agora sobre um S/4 Private Edition operado pela SAP.',
    },
  },
  {
    id: 'joule',
    nome: 'Joule + SAP Business AI',
    camada: 'lob',
    tipo: 'AI / Assistente',
    icone: 'joule',
    // Único serviço com acento próprio: a paleta do briefing reserva uma cor
    // "IA" à parte das 6 camadas — aplicada só aqui para não a diluir.
    corAcento: 'var(--color-accent-ia)',
    cenarios: ['cloud', 'rise'],
    oQueFaz:
      'Copiloto e agentes com contexto de processo SAP (Business AI Platform: BTP + Business Data Cloud + AI Foundation).',
    paraQueServe:
      'Perguntar "qual é o status desta PO?", lançar acções em S/4/SF/Ariba, e no futuro agentes por domínio (Finance, Spend, SCM, HCM, CX).',
    exemploReal:
      'H&M: Store Intelligence Agent sobre RISE + Business Data Cloud + Commerce + SuccessFactors, a gerar recomendações em tempo real para gestores de loja. Clientes RISE passam a ter compromisso contratual de activar assistentes Joule no 1.º ano.',
    ligaA: ['s4hana', 'btp', 'bdc', 'successfactors', 'ariba'],
    contextoPorCenario: {
      onprem: 'Atenuado: precisa de BTP e de dados na cloud, por isso é lateral a um core on-premise.',
      cloud: 'Responde sobre o estado de processos do S/4HANA Cloud e do LoB, com contexto do Business Data Cloud.',
      rise: 'Mesmo copiloto, com activação contratual no 1.º ano — clientes RISE comprometem-se a ligá-lo.',
    },
  },
]

export const SERVICOS_POR_ID = Object.fromEntries(SERVICOS.map((s) => [s.id, s]))

// ----------------------------------------------------------------------------
// 5. VISIBILIDADE POR CENÁRIO
// ----------------------------------------------------------------------------
// Regra geral: activo = { já está no array `cenarios` do serviço }.
// Para os restantes, este mapa define explicitamente quem fica "atenuado"
// (existe, visível, mas fora do caminho default) — tudo o que não aparece
// nem em `ativo` nem em `atenuado` fica "escondido" nesse cenário.
// Isto segue à letra as regras dadas: On-Premise e RISE têm "atenuados";
// Cloud Pública só tem "activos" + "escondidos" explícitos (fit-to-standard,
// diagrama limpo) — daqui resulta directamente.
const TABELA_CENARIOS = {
  onprem: {
    ativo: ['dc-onprem', 'hana-onprem', 's4-any', 'pipo', 'signavio'],
    atenuado: ['btp', 'integration-suite', 'successfactors', 'ariba', 'sac', 'joule'],
  },
  cloud: {
    ativo: [
      'hana-cloud', 'datasphere', 'bdc', 'btp', 'build', 'workzone', 'ias',
      'integration-suite', 'event-mesh', 's4hana', 'successfactors', 'ariba',
      'signavio', 'sac', 'joule',
    ],
    atenuado: ['cloud-connector'],
  },
  rise: {
    ativo: [
      'hana-cloud', 'datasphere', 'bdc', 'btp', 'build', 'workzone', 'ias',
      'integration-suite', 'event-mesh', 'eic', 'cloud-connector', 's4hana',
      'successfactors', 'ariba', 'signavio', 'sac', 'joule',
    ],
    atenuado: ['dc-onprem', 'pipo'],
  },
}

// Ao ligar "Mostrar legado", estes ids — quando escondidos por defeito —
// passam a aparecer como "fantasmas" (opacity muito baixa, grayscale,
// contorno tracejado) só para contraste pedagógico com o que existia antes.
const LEGADO_IDS = ['dc-onprem', 'hana-onprem', 's4-any', 'pipo']

/**
 * Calcula o estado visual de um serviço para o cenário/hyperscaler/toggle
 * actuais. Estados possíveis: 'ativo' | 'atenuado' | 'escondido' | 'legado'.
 */
export function obterEstado(servicoId, { cenario, hyperscaler, mostrarLegado }) {
  if (HYPERSCALER_IDS.includes(servicoId)) {
    if (cenario === 'onprem') return 'escondido'
    return servicoId === hyperscaler ? 'ativo' : 'escondido'
  }

  const tabela = TABELA_CENARIOS[cenario]
  let estado = 'escondido'
  if (tabela.ativo.includes(servicoId)) estado = 'ativo'
  else if (tabela.atenuado.includes(servicoId)) estado = 'atenuado'

  if (estado === 'escondido' && mostrarLegado && LEGADO_IDS.includes(servicoId)) {
    estado = 'legado'
  }
  return estado
}

// ----------------------------------------------------------------------------
// 6. LIGAÇÕES (edges) — construídas a partir de `ligaA`, deduplicadas
// ----------------------------------------------------------------------------
// Heurística de classificação (editável): qualquer ligação a infra/rede é
// "rede"; qualquer ligação ao BTP e à sua "casca" de UX/identidade é
// "extensão clean core"; tudo o resto é integração nativa/suite-to-suite.
const IDS_REDE = ['aws', 'azure', 'gcp', 'dc-onprem', 'cloud-connector', 'eic']
const IDS_EXTENSAO = ['btp', 'build', 'workzone', 'ias']

export function classificarLigacao(aId, bId) {
  if (IDS_REDE.includes(aId) || IDS_REDE.includes(bId)) return 'rede'
  if (IDS_EXTENSAO.includes(aId) || IDS_EXTENSAO.includes(bId)) return 'extensao'
  return 'nativa'
}

function obterPadrao(aId, bId, tipo) {
  const par = [aId, bId]
  if (par.includes('event-mesh')) return 'Evento'
  if (par.includes('integration-suite') || par.includes('pipo')) return 'iFlow / API'
  if (par.includes('hana-onprem') || par.includes('hana-cloud')) return 'Replicação / acesso nativo à BD'
  if (par.includes('cloud-connector') || par.includes('eic')) return 'Túnel seguro / runtime híbrido'
  if (tipo === 'rede') return 'Conectividade de rede'
  if (tipo === 'extensao') return 'Extensão clean core (BTP)'
  return 'API / integração suite-to-suite'
}

function construirLigacoes() {
  const vistas = new Set()
  const ligacoes = []
  for (const s of SERVICOS) {
    for (const paraId of s.ligaA) {
      if (!SERVICOS_POR_ID[paraId]) continue
      const chave = [s.id, paraId].sort().join('|')
      if (vistas.has(chave)) continue
      vistas.add(chave)
      const tipo = classificarLigacao(s.id, paraId)
      ligacoes.push({ id: chave, de: s.id, para: paraId, tipo, padrao: obterPadrao(s.id, paraId, tipo) })
    }
  }
  return ligacoes
}

export const TODAS_LIGACOES = construirLigacoes()

export const LABELS_TIPO_LIGACAO = {
  nativa: 'Integração nativa / suite-to-suite',
  extensao: 'Side-by-side / extensão clean core',
  rede: 'Conectividade de rede / hyperscaler',
}
