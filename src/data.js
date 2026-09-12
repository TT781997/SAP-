// Fonte única de conteúdo do Mapa do Ecossistema SAP (catálogo de 248 serviços).
//
// Tipos de ligação (edge), classificados em classificarLigacao():
//   sólida (nativa)      integração nativa / suite-to-suite
//   tracejado (extensao) extensão clean core / side-by-side no BTP
//   pontilhado (rede)    conectividade de rede / hyperscaler / Cloud Connector / SCI
//   traço-ponto (governa) governação ALM / Activate / clean core / Signavio → DwC → Cloud ALM
//
// dwc (id) = Deploy with Confidence, método interno de engenharia SAP, NÃO um SKU.
// datasphere (id) = o antigo "Data Warehouse Cloud" (o "DWC" de analytics).
// sci (id) = SAP Cloud Infrastructure (IaaS da própria SAP, OpenStack+K8s) — NÃO
// confundir com "SAP Cloud Integration" (nome antigo do iFlow na Integration Suite,
// por vezes também abreviado SCI/CPI).
//
// Edges: modo default do canvas = ZERO edges desenhadas (só cards + camadas +
// clusters). Hover num card mostra até 8 edges de 1º grau. Selecção mostra as
// mesmas edges + esbate o resto a opacity 0.35. Ver DiagramCanvas.jsx.
//
// Estados de um card num preset (obterEstado()); nunca escondem o card — só
// mudam opacidade/saturação, à excepção de 'legado' (só com o toggle ligado):
//   activo | recomendado | opcional | legado | irrelevante

export const LAYERS = [
  { id: 'infra', nivel: 0, nome: 'Infraestrutura', corVar: 'var(--color-layer-infra)' },
  { id: 'dados', nivel: 1, nome: 'Dados', corVar: 'var(--color-layer-dados)' },
  { id: 'plataforma', nivel: 2, nome: 'Plataforma (SAP BTP)', corVar: 'var(--color-layer-plataforma)' },
  { id: 'integracao', nivel: 3, nome: 'Integração', corVar: 'var(--color-layer-integracao)' },
  { id: 'core', nivel: 4, nome: 'Core ERP / Digital Core', corVar: 'var(--color-layer-core)' },
  { id: 'lob', nivel: 5, nome: 'LoB / SaaS / Indústria / Experiência / IA', corVar: 'var(--color-layer-lob)' },
  { id: 'alm', nivel: 6, nome: 'Ciclo de Vida, Arquitectura e Transformação', corVar: 'var(--color-layer-alm)' },
]

export const SCENARIOS = {
  onprem: {
    nome: 'On-Premise Tradicional',
    chip: 'Data center próprio, ECC/S/4 any-premise, PI/PO e Solution Manager — controlo total, upgrades a cargo da TI.',
    resumo: 'O cliente opera o data center, NetWeaver, HANA, ECC ou S/4 any-premise, PI/PO e Solution Manager. Controlo total, TCO e upgrades a cargo da TI. LoB cloud (SuccessFactors, Ariba, Concur) podem já existir como ilhas — híbrido by accident. Destino de saída: RISE ou GROW, com PI/PO e SolMan em phase-out até 2027.',
  },
  cloud: {
    nome: 'Cloud Pública — GROW',
    chip: 'S/4HANA Cloud Public Edition standard, BTP para extensões, Integration Suite, Cloud ALM incluído.',
    resumo: 'S/4HANA Cloud Public Edition no hyperscaler, processos standard, BTP para extensões, Integration Suite como iPaaS, LoB SaaS à la carte, Cloud ALM incluído. DRC e Multi-Bank entram no mínimo honesto de Finance. Signavio conduz o fit-to-standard. Deploy with Confidence, do lado SAP, é o que permite ao Public Edition e ao Signavio receberem inovação em ciclo curto; do lado cliente, traduz-se em não customizar o core.',
  },
  rise: {
    nome: 'Híbrido — RISE with SAP',
    chip: 'Um contrato: software + BTP + infra gerida pela SAP. S/4 Private Edition, clean core medido pelo Cloud ALM.',
    resumo: 'Um contrato: software + BTP + infra gerida pela SAP no hyperscaler (ou CDC). S/4 Private Edition ≈ scope on-prem com operação SAP. Signavio decide o processo, LeanIX o landscape, BTC os dados, Tricentis a regressão, Cloud ALM executa e mede o clean core, Deploy with Confidence é a disciplina de implantar o to-be sem partir o próximo upgrade. On-prem residual liga-se por Cloud Connector / Edge Integration Cell. PI/PO e SolMan em phase-out até 2027. Grupos multi-ECC podem usar Central Finance como passo intermédio.',
  },
}
export const ORDEM_CENARIOS = ['onprem', 'cloud', 'rise']

export const HYPERSCALER_IDS = ['aws', 'azure', 'gcp', 'sci']

export const CLUSTERS = {
  spend: { nome: 'Spend', membros: ['ariba', 'business-network', 'concur', 'fieldglass', 'taulia', 'managed-gateway', 'spend-control-tower', 'vim', 'bn-asset', 'bn-commerce', 'spend-analytics'], colapsadoPorDefeito: true },
  cx: { nome: 'CX', membros: ['commerce-cloud', 'sales-cloud', 'service-cloud', 'emarsys', 'customer-data-cloud', 'cpq', 'fsm', 'order-management', 'customer-checkout', 'entitlement-management', 'mirakl', 'cdp', 'knowledge-central', 'territory-quota'], colapsadoPorDefeito: true },
  supply: { nome: 'Supply Chain', membros: ['ibp', 'ewm', 'tm', 'digital-manufacturing', 'apm', 'yard-logistics', 'warehouse-insights', 'ipd', 'service-asset-manager', 'gbt', 'event-management', 'snc', 'fnr', 'returns-management', 'bn-freight', 'bn-gtt', 'bn-traceability', 'bn-planning', 'bn-scc'], colapsadoPorDefeito: true },
  'finance-ext': { nome: 'Finance Extended', membros: ['central-finance', 'treasury', 'cash-application', 'rar', 'disclosure-management'], colapsadoPorDefeito: true },
  pme: { nome: 'PME', membros: ['business-one', 'bydesign'], colapsadoPorDefeito: false },
  runtimes: { nome: 'Runtimes BTP', membros: ['abap-env', 'runtimes-btp'], colapsadoPorDefeito: false },
  'dados-ext': { nome: 'Dados Extended', membros: ['data-services', 'data-intelligence', 'ilm'], colapsadoPorDefeito: false },
}

export const LEGADO_IDS = ['ecc', 's4-any', 'hana-onprem', 'pipo', 'solman', 'netweaver', 'hcm-onprem', 'businessobjects', 'enterprise-portal', 'bpc', 'data-services', 'data-intelligence']

export const PERFIS = [
  { id: 'greenfield', nome: 'Mid-market greenfield' },
  { id: 'brownfield', nome: 'Brownfield ECC complexo' },
  { id: 'industria', nome: 'Indústria / shop-floor' },
  { id: 'regulado', nome: 'Regulado / soberania de dados' },
  { id: 'spend', nome: 'Muito spend / supplier network' },
  { id: 'workforce', nome: 'Muito workforce externo' },
]

export const SERVICOS = [

  /* ======================== L0 INFRAESTRUTURA ======================== */

  {
    id: "aws",
    nome: "Amazon Web Services",
    camada: "infra",
    tipo: "IaaS",
    cluster: null,
    cenarios: ["cloud", "rise"],
    perfisRecomendados: ["greenfield", "brownfield"],
    oQueFaz: "Hyperscaler Amazon. Fornece compute, rede, storage, regiões e serviços de landing zone (Direct Connect, Transit Gateway, VPCs de inspeção). No RISE with SAP a VPC onde corre o S/4HANA Cloud Private Edition é gerida pela SAP sobre AWS; o cliente gere a sua própria landing zone e a interconexão com a org SAP. No GROW / Public Edition e no BTP, a AWS é uma das regiões onde a SAP publica serviços.",
    paraQueServe: "Dar infraestrutura elástica ao digital core e à plataforma sem o cliente administrar as VMs do ERP no modelo RISE. Serve também de região para HANA Cloud, Integration Suite e extensões BTP. Mistura típica: ERP em AWS-RISE e data lakes nativos AWS na conta própria, ligados por Transit Gateway.",
    exemploReal: "A AWS publica cookbooks oficiais “RISE with SAP on AWS” e “Enterprise-ready network foundation for RISE with SAP”: landing zone do cliente, Transit Gateway, attachment à VPC gerida pela SAP, VPN de recurso e Direct Connect.",
    ligaA: ["azure", "gcp", "cdc-option", "s4hana", "btp", "hana-cloud", "cloud-connector", "eic"],
    nesteCenario: {
      onprem: "Não é o anfitrião do ERP. Pode existir como cloud satélite da empresa sem fazer parte do core SAP. Card atenuado.",
      cloud: "Região possível para BTP, HANA Cloud e S/4HANA Cloud Public Edition. Activo se o selector estiver em AWS.",
      rise: "Um dos três hyperscalers à escolha no contrato. A SAP gere a VPC do S/4; o cliente gere Direct Connect / Transit Gateway e o landing zone."
    }
  },

  {
    id: "azure",
    nome: "Microsoft Azure",
    camada: "infra",
    tipo: "IaaS",
    cluster: null,
    cenarios: ["cloud", "rise"],
    perfisRecomendados: ["greenfield", "brownfield"],
    oQueFaz: "Hyperscaler Microsoft. Mesmo papel da AWS no modelo RISE/GROW: IaaS sob o S/4 gerido pela SAP e/ou sob o BTP. ExpressRoute é a interconexão típica. Entra ID federa-se com SAP Cloud Identity Services para SSO da suite inteira. Muitos clientes europeus já têm operação Microsoft; escolher Azure evita um segundo stack de identidade e rede.",
    paraQueServe: "Anfitrião do RISE ou região BTP/Public Edition quando a empresa já vive em Microsoft 365 / Entra ID / ExpressRoute. A mistura forte é identidade: Entra ID → IAS → S/4 + SuccessFactors + BTP + Work Zone.",
    exemploReal: "Padrão dominante em clientes europeus que federam Entra ID com SAP Cloud Identity Services e usam ExpressRoute para o VPC RISE. A documentação conjunta SAP/Microsoft descreve o peering entre a subscription do cliente e a subscription gerida pela SAP.",
    ligaA: ["aws", "gcp", "cdc-option", "s4hana", "btp", "ias", "hana-cloud", "workzone"],
    nesteCenario: {
      onprem: "Não é o anfitrião do ERP. Entra ID pode já ser o IdP corporativo mesmo no on-prem. Card atenuado como IaaS.",
      cloud: "Região possível do GROW. Entra ID como IdP corporativo federado ao IAS.",
      rise: "Hyperscaler por omissão nesta app (selector inicia em Azure). SAP gere o S/4 Private Edition; o cliente gere ExpressRoute e o IdP."
    }
  },

  {
    id: "gcp",
    nome: "Google Cloud",
    camada: "infra",
    tipo: "IaaS",
    cluster: null,
    cenarios: ["cloud", "rise"],
    perfisRecomendados: ["greenfield", "brownfield"],
    oQueFaz: "Hyperscaler Google. No RISE a SAP gere uma “SAP organization” (projectos, VPC, Compute Engine, storage); o cliente gere a “customer organization” e a conectividade (Cloud Interconnect, VPC partilhada) a partir da sua org GCP e do on-prem. O BTP e o Public Edition também publicam regiões GCP.",
    paraQueServe: "Anfitrião RISE ou região BTP quando a empresa já tem gravidade de dados/analytics no Google Cloud. A mistura típica é RISE no GCP + serviços de dados na org do cliente, sem misturar as responsabilidades SAP vs cliente.",
    exemploReal: "A documentação pública Google Cloud “Overview of RISE with SAP on Google Cloud” descreve o modelo SAP organization versus customer organization e os padrões on-prem → Interconnect → projecto RISE.",
    ligaA: ["aws", "azure", "cdc-option", "s4hana", "btp", "hana-cloud", "bdc"],
    nesteCenario: {
      onprem: "Não é o anfitrião do ERP. Card atenuado.",
      cloud: "Região possível para BTP e Public Edition.",
      rise: "Terceiro hyperscaler à escolha. Trocar o selector para GCP só muda este card L0 e o texto dos tooltips."
    }
  },

  {
    id: "dc-onprem",
    nome: "Data Center do Cliente",
    camada: "infra",
    tipo: "On-prem",
    cluster: null,
    cenarios: ["onprem", "rise"],
    perfisRecomendados: ["brownfield", "industria", "regulado"],
    oQueFaz: "Infraestrutura gerida pelo cliente ou por um hoster clássico / colocation: compute, storage, rede, firewalls, backup. É onde correm ECC ou S/4 any-premise, HANA on-prem, NetWeaver, PI/PO, Solution Manager, MES/OT, sistemas regulamentares e satélites que a empresa ainda não quer ou não pode pôr na cloud pública.",
    paraQueServe: "No preset on-prem é a fundação de tudo. No RISE passa a ser o residual: shop-floor, OT, dados que não saem, sistemas em phase-out. A mistura correcta no híbrido é DC residual + Cloud Connector + opcionalmente Edge Integration Cell.",
    exemploReal: "H.B. Fuller, no percurso RISE para S/4HANA Cloud Private Edition, evitou um data center físico e estimou cerca de 200 mil dólares de poupança só nesse item, com instância global em 123 países e cerca de 1,5 milhões de dólares evitados em infra legada.",
    ligaA: ["cdc-option", "hana-onprem", "netweaver", "ecc", "s4-any", "pipo", "solman", "cloud-connector", "eic", "digital-manufacturing", "lama", "cal"],
    nesteCenario: {
      onprem: "Card fundação de L0. Todo o core assenta aqui.",
      cloud: "Irrelevante como anfitrião do ERP Public Edition. Só faria sentido se o perfil indústria estiver activo (MES residual).",
      rise: "Atenuado e residual. Sistemas sobreviventes ligam-se por Cloud Connector / EIC. Se o perfil soberania estiver activo, comparar com o card Customer Data Center."
    }
  },

  {
    id: "cdc-option",
    nome: "RISE Customer Data Center (CDC)",
    camada: "infra",
    tipo: "IaaS soberano",
    cluster: null,
    cenarios: ["rise"],
    perfisRecomendados: ["regulado"],
    oQueFaz: "Opção do RISE / SAP Cloud ERP Private em que o S/4 Private Edition é operado com modelo cloud (contrato, SLA, operação SAP ou partner) mas o hardware vive num data center à escolha do cliente — incluindo HPE GreenLake e variantes soberanas. Não é on-prem clássico: o modelo operacional é cloud; a localidade dos dados é do cliente.",
    paraQueServe: "Misturar os benefícios do RISE com requisitos de soberania, latência ou regulação que impedem hyperscaler público. Perfil Regulado / soberania.",
    exemploReal: "A SAP documenta a SAP Cloud ERP Private, Customer Data Center Option. HPE GreenLake é uma das vias usadas desde o início do RISE para clientes que rejeitam AWS/Azure/GCP como âncora de produção.",
    ligaA: ["dc-onprem", "aws", "azure", "gcp", "s4hana", "cloud-alm", "eic"],
    naoConfundir: "Não é o Data Center do Cliente clássico. Não é Public Edition. Não é SAP Sovereign Cloud / NS2 / EU AI Cloud.",
    nesteCenario: {
      onprem: "Irrelevante. On-prem clássico não é CDC.",
      cloud: "Irrelevante. GROW Public Edition não tem opção CDC.",
      rise: "Opcional. Activo e recomendado só com o perfil regulado."
    }
  },

  {
    id: "sci",
    nome: "SAP Cloud Infrastructure (SCI)",
    camada: "infra",
    tipo: "IaaS soberana",
    cluster: null,
    cenarios: ["cloud", "rise"],
    perfisRecomendados: ["regulado"],
    aliases: ["SCI", "SAP Cloud Infrastructure", "Cloud Infrastructure", "SAP Converged Cloud", "infraestrutura SAP", "IaaS SAP", "OpenStack SAP"],
    oQueFaz: "IaaS operada pela própria SAP, desenvolvida com tecnologias open-source (OpenStack + Kubernetes) na rede global de data centers SAP — NÃO é AWS, Azure nem GCP. Compute (VMs/flavors), block/object/file storage, SDN, load balancing, DNSaaS, identity/key management, container registry. Linha: SAP Converged Cloud (2015) → SAP Cloud Infrastructure. Em 2025 a SAP reportou cerca de 15 regiões, 29 data centers, mais de 200 mil VMs. Na Europa é a opção IaaS do SAP Sovereign Cloud: dados no UE (Walldorf, St. Leon-Rot, colocation Frankfurt), três availability zones, certificações ISO 27001 IT-Grundschutz (Abr 2026), VS-NfD (Jun 2026), BSI C5 Type II, KRITIS/NIS 2. Base da EU AI Cloud (modelos de IA na abstração SCI + BTP, sem dependência de hyperscaler americano).",
    paraQueServe: "Correr S/4HANA Cloud, BTP, HANA Cloud e workloads do cliente quando a soberania impede AWS/Azure/GCP. Mistura regulada: SCI + Sovereign Cloud + BTP + S/4 + Cloud ALM. Alternativa no mesmo L0 que os três hyperscalers e que o CDC / On-Site.",
    exemploReal: "SAP.com lista SAP Cloud Infrastructure como pilar do Sovereign Cloud. Wikipedia e o anúncio EU AI Cloud (Nov 2025) descrevem SCI como IaaS SAP sem dependência de tecnologias de hyperscaler. HANA Cloud documenta SCI como infraestrutura suportada.",
    ligaA: ["aws", "azure", "gcp", "cdc-option", "sovereign-cloud", "ns2", "s4hana", "btp", "hana-cloud", "cloud-alm"],
    naoConfundir: "NÃO é SAP Cloud Integration (o nome antigo do iFlow na Integration Suite, por vezes também chamado SCI/CPI). NÃO é BTP (BTP é PaaS). NÃO é o Data Center do Cliente clássico. NÃO é NS2 (NS2 é a via EUA / National Security Services).",
    nesteCenario: {
      onprem: "Irrelevante como anfitrião do ERP on-prem. Card atenuado.",
      cloud: "Opcional. Activo quando o selector L0 está em SCI ou o perfil regulado está on. GROW/Public Edition pode ser publicado sobre SCI em regiões soberanas.",
      rise: "Opcional / recomendado com perfil regulado. RISE/Private Edition sobre IaaS SAP em vez de hyperscaler americano."
    }
  },

  {
    id: "sovereign-cloud",
    nome: "SAP Sovereign Cloud",
    camada: "infra",
    tipo: "Portefólio soberania",
    cluster: null,
    cenarios: ["cloud", "rise"],
    perfisRecomendados: ["regulado"],
    aliases: ["Sovereign Cloud", "nuvem soberana", "EU AI Cloud", "Delos Cloud", "soberania SAP"],
    oQueFaz: "Portefólio, não uma VM. Quatro dimensões: soberania de dados, operacional, legal e técnica. Três vias de deployment: (1) SAP Cloud Infrastructure — IaaS SAP; (2) Sovereign Cloud On-Site — infra operada pela SAP no DC escolhido pelo cliente; (3) hyperscaler soberano / NS2. Disponibilidade pública referida em EUA (NS2), Austrália, Canadá, Índia, Nova Zelândia, Reino Unido, Alemanha, França e outros países europeus. EU AI Cloud (2025) une o stack soberano europeu (SCI + BTP + AI Foundation, parceria Mistral).",
    paraQueServe: "Escolher o NÍVEL de soberania, não só o sítio das VMs. Mistura: perfil regulado liga este card a SCI ou a CDC/On-Site ou a NS2.",
    exemploReal: "Página oficial SAP Sovereign Cloud e o anúncio EU AI Cloud de Novembro 2025. Investimento anunciado de milhares de milhões na Europa, incluindo 2 mil milhões na Alemanha.",
    ligaA: ["sci", "cdc-option", "ns2", "s4hana", "btp", "hana-cloud", "ai-foundation"],
    naoConfundir: "Não é um quarto hyperscaler. É o guarda-chuva comercial/compliance. O IaaS concreto na Europa é o card SCI.",
    nesteCenario: {
      onprem: "Atenuado (soberania on-prem é o DC do cliente, não este portefólio).",
      cloud: "Opcional, activo com perfil regulado.",
      rise: "Opcional, activo com perfil regulado."
    }
  },

  {
    id: "ns2",
    nome: "SAP NS2 (National Security Services)",
    camada: "infra",
    tipo: "Soberania EUA",
    cluster: null,
    cenarios: ["cloud", "rise"],
    perfisRecomendados: ["regulado"],
    aliases: ["NS2", "National Security Services", "SAP NS2", "GovCloud SAP"],
    oQueFaz: "Via EUA do Sovereign Cloud: operação por SAP National Security Services sobre infra aprovada (incl. AWS GovCloud). Pessoal, clearances e residência de dados alinhados a requisitos do sector público e defesa dos EUA. HANA Cloud foi anunciado em NS2.",
    paraQueServe: "Clientes governo / defesa EUA. Na Europa o equivalente de conversa é SCI + Sovereign Cloud, não NS2.",
    exemploReal: "Blog SAP: HANA Cloud em Sovereign Cloud e NS2. sap.com lista NS2 como via EUA do portefólio soberano.",
    ligaA: ["sovereign-cloud", "sci", "aws", "s4hana", "btp", "hana-cloud"],
    naoConfundir: "Não é SCI. SCI é IaaS SAP europeia/global nos DC SAP. NS2 é a entidade e o modelo operacional EUA.",
    nesteCenario: {
      onprem: "Irrelevante.",
      cloud: "Opcional, só com perfil regulado e contexto EUA.",
      rise: "Opcional, só com perfil regulado e contexto EUA."
    }
  },

  /* ======================== L1 DADOS ======================== */

  {
    id: 'hana-onprem',
    nome: 'SAP HANA (on-premise)',
    camada: 'dados',
    tipo: 'DB',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Base de dados in-memory instalada e operada no data center do cliente. Motor transaccional e analítico do S/4HANA any-premise e de BW/4HANA on-prem. O cliente é dono do sizing, HA/DR, patches, backups e encriptação. Sem HANA o S/4 on-prem não corre. A Help documenta também HANA Live, HANA express edition e SAP HANA Cloud Services como linha distinta, bem como SAP IQ, SAP ASE, SAP MaxDB, SAP SQL Anywhere e SAP on IBM Db2 / SQL Server como motores AnyDB do mundo ECC clássico.',
    paraQueServe: 'Processamento em tempo real no mesmo engine sob operação 100% interna. Mistura on-prem típica: HANA + S/4 any-premise + BW/4 + Solution Manager.',
    exemploReal: 'A Shell usou S/4HANA sobre HANA como digital core financeiro em tempo real (Central Finance) — padrão clássico on-prem ou hosted antes da onda RISE.',
    ligaA: ['s4-any', 'dc-onprem', 'bw4', 'datasphere', 'netweaver', 'central-finance'],
    nesteCenario: {
      onprem: 'Base de dados do core. Card activo.',
      cloud: 'Substituído por HANA Cloud e pelo HANA gerido do Public Edition.',
      rise: 'O HANA do S/4 Private Edition é operado pela SAP no hyperscaler e não aparece neste card. Este card só resta se BW ou sidecars continuarem no DC.'
    },
    satelitesHelp: 'SAP HANA Live; SAP HANA, express edition; SAP HANA Cloud Services; SAP IQ; SAP Adaptive Server Enterprise; SAP MaxDB; SAP SQL Anywhere; SAP on IBM Db2; SAP on SQL Server'
  },

  {
    id: 'hana-cloud',
    nome: 'SAP HANA Cloud',
    camada: 'dados',
    tipo: 'DBPaaS',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'HANA como serviço gerido no BTP: motor relacional in-memory, data lake, multi-model (grafo, spatial, JSON). Persistência das extensões side-by-side (CAP, Build, ABAP Cloud) e de workloads analíticos que não devem viver em tabelas Z do S/4. Distinto do HANA que está dentro do S/4 Cloud — este card é o HANA que o cliente provisiona no BTP. Help: SAP HANA Cloud Services e SAP HANA Cloud in CN Regions.',
    paraQueServe: 'Materializar o clean core: a app nova grava no HANA Cloud, o S/4 fica standard. Também alimenta Datasphere, SAC e cenários near-real-time.',
    exemploReal: 'Ferrara Candy correu RISE S/4HANA Cloud Private Edition powered by BTP; as extensões e os padrões de integração em tempo real assentam em serviços de dados geridos do BTP e não em custom ABAP profundo no core.',
    ligaA: ['btp', 's4hana', 'datasphere', 'sac', 'build', 'bdc', 'abap-env'],
    nesteCenario: {
      onprem: 'Ausente. O equivalente é HANA on-prem.',
      cloud: 'Activo. Persistência de extensões e analytics do GROW.',
      rise: 'Activo. Os créditos BTP do RISE cobrem o uso típico. Não confundir com o HANA gerido debaixo do S/4 Private Edition.'
    }
  },

  {
    id: 'datasphere',
    nome: 'SAP Datasphere',
    aliases: ['DWC', 'Data Warehouse Cloud'],
    camada: 'dados',
    tipo: 'Data Fabric',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'Camada semântica de dados de negócio. Sucessor directo do produto que se chamava SAP Data Warehouse Cloud (DWC / DwC-produto). Help: Datasphere e Datasphere, SAP BW Bridge. Une dados SAP e não-SAP com ou sem replicação, organiza-os em spaces, oferece Data Builder e Business Builder, e tem BW Bridge para reaproveitar modelos BW. É a peça de fabric dentro da Business Data Cloud.',
    paraQueServe: 'Ter um modelo governado para finanças, supply chain e RH sem copiar o ERP inteiro para um warehouse clássico. Fonte semântica para SAC e para data products que os agentes Joule consomem.',
    exemploReal: 'Arquitectura de referência SAP: Datasphere + SAC + BW/4 em modo híbrido. Clientes com investimento BW usam o BW Bridge para não deitar fora transformações e extractors.',
    ligaA: ['hana-cloud', 'sac', 's4hana', 'bdc', 'btp', 'bw4'],
    naoConfundir: 'O acrónimo histórico DWC/DwC DESTE produto é Data Warehouse Cloud. NÃO é Deploy with Confidence (id dwc).',
    nesteCenario: {
      onprem: 'Atenuado. Pode consumir HANA/BW on-prem via DP Agent, mas não é o default do cenário clássico.',
      cloud: 'Activo. Data warehouse / fabric estratégico do Public Cloud.',
      rise: 'Activo. Peça da Business Data Cloud e da via analítica do landscape RISE.'
    }
  },

  {
    id: 'bdc',
    nome: 'SAP Business Data Cloud',
    camada: 'dados',
    tipo: 'Data + AI',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'Oferta que une Datasphere, SAP Analytics Cloud e a fundação de dados para Business AI / Joule. Publica data products curados (dados + metadados + semântica de processo SAP) para aplicações e agentes. É o context layer da Business AI Platform (BTP + Business Data Cloud + AI Foundation).',
    paraQueServe: 'Impedir que a IA empresarial trabalhe sem contexto de processo. Mistura: S/4 + LoB geram dados → BDC/Datasphere governa → Joule e apps inteligentes consomem.',
    exemploReal: 'Na SAP Sapphire 2026 a SAP posicionou Business Data Cloud + BTP + AI Foundation como tecto único da Business AI Platform. A H&M demonstrou um Store Intelligence Agent sobre RISE + Business Data Cloud + Commerce Cloud + SuccessFactors.',
    ligaA: ['datasphere', 'sac', 'joule', 'btp', 'hana-cloud', 's4hana', 'ai-foundation'],
    nesteCenario: {
      onprem: 'Irrelevante no default on-prem clássico.',
      cloud: 'Activo quando o cliente adopta o stack dados+IA do GROW.',
      rise: 'Activo. Base de contexto para Joule e agentes no landscape RISE.'
    }
  },

  {
    id: 'bw4',
    nome: 'SAP BW/4HANA',
    camada: 'dados',
    tipo: 'Data Warehouse',
    cluster: null,
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Data warehouse empresarial sobre HANA, sucessor do BW 7.x. Modelação LSA++, extractors SAP, process chains, queries. Continua vivo em milhares de clientes. Na cloud, o caminho estratégico é Datasphere + BW Bridge, não um BW eterno.',
    paraQueServe: 'Reporting de grupo, staging pesado, compliance de dados históricos. Mistura híbrida típica: BW/4 on-prem ou gerido + Datasphere na cloud + SAC por cima.',
    exemploReal: 'NEOM combinou S/4HANA + Ariba + BW/4HANA + SAC para acompanhar milhares de milhões em construção com reporting operacional quase em tempo real.',
    ligaA: ['hana-onprem', 'datasphere', 'sac', 's4-any', 's4hana', 'businessobjects', 'analysis-office'],
    nesteCenario: {
      onprem: 'Warehouse default se o cliente já é SAP analytics clássico. Activo.',
      cloud: 'Atenuado. Destino estratégico = Datasphere. BW Bridge é a ponte, não o fim.',
      rise: 'Opcional / atenuado. Muitos RISE mantêm BW/4 durante anos e vão despejando modelos para Datasphere.'
    }
  },

  {
    id: 'businessobjects',
    nome: 'SAP BusinessObjects',
    camada: 'dados',
    tipo: 'BI clássico',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Plataforma clássica de BI. Help: BusinessObjects Business Intelligence Platform, Dashboards, Design Studio, Explorer, Live Office, Crystal Server, Financial Information Management, Intercompany, Profitability and Cost Management, Predictive Workbench by IBM. Ainda serve milhões de reports em clientes ECC/S/4 on-prem. Destino estratégico de reporting novo é SAP Analytics Cloud.',
    paraQueServe: 'Manter o parque de WeBI/Crystal enquanto se constrói o alvo em SAC + Datasphere. Mistura honesta: BOBJ legado + SAC para o novo + BW/4 no meio.',
    exemploReal: 'A ŠKODA AUTO usou BusinessObjects para reporting executivo em tempo real — caso clássico do parque BOBJ ainda em produção em grupos industriais.',
    ligaA: ['bw4', 'sac', 's4-any', 'analysis-office', 'bpc'],
    nesteCenario: {
      onprem: 'Activo como BI clássico, sobretudo com toggle legado on.',
      cloud: 'Escondido / legado. Novo reporting nasce em SAC.',
      rise: 'Legado. Visível com o toggle. Plano típico: coexistência e phase-out para SAC.'
    },
    satelitesHelp: 'BusinessObjects BI Platform; Dashboards; Design Studio; Explorer; Live Office; Crystal Server; Financial Information Management; Intercompany; Profitability and Cost Management; Predictive Workbench by IBM'
  },

  {
    id: 'papm',
    nome: 'SAP PaPM',
    camada: 'dados',
    tipo: 'Rentabilidade',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Profitability and Performance Management. Help: SAP Profitability and Performance Management e SAP Profitability and Performance Management Cloud. Alocações, custos, rentabilidade de produto/cliente para além do CO clássico. Distinto do SAC Planning e do BPC.',
    paraQueServe: 'Onde o custo realmente cai. Mistura: S/4 CO produz → PaPM aloca → SAC apresenta.',
    exemploReal: 'All Products separa PaPM, PaPM Cloud, BPC, PCM (Profitability and Cost Management BOBJ) e SAC — quatro gerações da mesma pergunta de negócio.',
    ligaA: ['s4hana', 'sac', 'bpc'],
    nesteCenario: {
      onprem: 'Opcional / activo em controlling avançado.',
      cloud: 'Opcional (PaPM Cloud).',
      rise: 'Opcional.'
    }
  },

  {
    id: 'bpc',
    nome: 'SAP BPC',
    camada: 'dados',
    tipo: 'Planning legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Business Planning and Consolidation. Planning e close clássicos sobre BW. Destino estratégico: SAC Planning + Group Reporting no S/4. Fica no mapa porque ainda é o motor de planeamento de muitos grupos.',
    paraQueServe: 'Budget e consolidação enquanto o alvo cloud não está vivo. Mistura de saída: BPC → SAC Planning + Group Reporting.',
    exemploReal: 'Entrada All Products: Business Planning and Consolidation. Coexiste com Analysis for Microsoft Office como cliente Excel clássico.',
    ligaA: ['bw4', 'sac', 'group-reporting', 'analysis-office', 'businessobjects'],
    nesteCenario: {
      onprem: 'Activo com toggle legado.',
      cloud: 'Escondido. Alvo = SAC.',
      rise: 'Legado. Visível com toggle.'
    }
  },

  {
    id: 'analysis-office',
    nome: 'SAP Analysis for Microsoft Office',
    camada: 'dados',
    tipo: 'BI Excel',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Add-in Excel/PowerPoint para queries BW, HANA e, em gerações recentes, SAC. Help: Analysis for Microsoft Office e Analytics Cloud add-in for Microsoft PowerPoint. É o sítio onde o controller continua a viver quando não abre o SAC.',
    paraQueServe: 'Análise tabular pesada. Mistura: BW/4 ou SAC como fonte → Analysis como cliente.',
    exemploReal: 'Produto autónomo no All Products, família Analytics, distinto do SAC web.',
    ligaA: ['bw4', 'sac', 'bpc', 'businessobjects'],
    nesteCenario: {
      onprem: 'Activo.',
      cloud: 'Opcional (add-in SAC).',
      rise: 'Opcional.'
    }
  },

  {
    id: 'data-services',
    nome: 'SAP Data Services',
    camada: 'dados',
    tipo: 'ETL',
    cluster: 'dados-ext',
    cenarios: ['onprem'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Motor clássico de ETL/ELT e qualidade de dados da família EIM. Help: Data Services, Data Quality Management, Information Steward, Agile Data Preparation, Data Hub. Continua a alimentar BW, HANA e destinos não-SAP em landscapes on-prem. Destino estratégico de pipelines novos: Integration Suite + Datasphere / Data Intelligence residual.',
    paraQueServe: 'Extrair, limpar e carregar dados mestres e transaccionais. Mistura brownfield: Data Services + Information Steward a governar qualidade + BW/4 ou Datasphere como destino.',
    exemploReal: 'Parque EIM clássico da SAP: Data Services + Information Steward + Data Quality Management listados como produtos distintos no All Products.',
    ligaA: ['bw4', 'data-intelligence', 'ilm', 'datasphere', 's4-any'],
    nesteCenario: {
      onprem: 'Activo com toggle legado / EIM clássico.',
      cloud: 'Atenuado. Pipelines novos nascem em Datasphere / Integration Suite.',
      rise: 'Legado. Visível com toggle. Plano típico: phase-out para Datasphere + Suite.'
    },
    satelitesHelp: 'Data Services; Data Quality Management; Information Steward; Agile Data Preparation; Data Hub; Data Mapping and Protection by BigID; Advanced Data Migration and Management by Syniti'
  },

  {
    id: 'data-intelligence',
    nome: 'SAP Data Intelligence',
    camada: 'dados',
    tipo: 'Data pipeline',
    cluster: 'dados-ext',
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Orquestração de pipelines de dados e ML (sucessor conceptual do Data Hub). Help: Data Intelligence, Data Ingestion for Industry Cloud Solutions. Em muitos clientes foi a ponte entre o lago e o S/4 antes da Business Data Cloud. Destino estratégico: Datasphere + BDC + AI Foundation.',
    paraQueServe: 'Orquestrar fluxos complexos SAP/não-SAP e notebooks. Mistura de transição: Data Intelligence a correr ao lado de Datasphere até o pipeline ser reescrito.',
    exemploReal: 'Data Hub e Data Intelligence aparecem ambos no All Products; a SAP empurra workloads novos para Datasphere / BDC.',
    ligaA: ['data-services', 'datasphere', 'bdc', 'btp'],
    nesteCenario: {
      onprem: 'Opcional / legado activo.',
      cloud: 'Atenuado. Alvo = Datasphere + BDC.',
      rise: 'Atenuado. Coexistência possível durante a transição.'
    }
  },

  {
    id: 'ilm',
    nome: 'SAP Information Lifecycle Management',
    camada: 'dados',
    tipo: 'Arquivo / retenção',
    cluster: 'dados-ext',
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['regulado', 'brownfield'],
    oQueFaz: 'Retenção, bloqueio e destruição de dados pessoais e fiscais (GDPR / CNPD), arquivo de documentos. Help: Information Lifecycle Management, File Lifecycle Management, Archiving and Document Access by OpenText, Content Management Core by OpenText, Extended ECM by OpenText, Data Custodian. Complementa o S/4: o ERP gera o documento; o ILM decide quanto tempo vive.',
    paraQueServe: 'Não guardar para sempre o que a lei manda apagar. Mistura regulada: S/4 + ILM + OpenText + GRC.',
    exemploReal: 'Família ILM + OpenText no All Products é o padrão de arquivo SAP em grupos europeus auditados.',
    ligaA: ['s4hana', 's4-any', 'grc', 'document-compliance'],
    nesteCenario: {
      onprem: 'Activo em landscapes regulados.',
      cloud: 'Opcional (retenção no Public Edition + serviços de arquivo).',
      rise: 'Opcional, recomendado com perfil regulado.'
    },
    satelitesHelp: 'Information Lifecycle Management; File Lifecycle Management; Archiving and Document Access by OpenText; Content Management Core by OpenText; Extended ECM by OpenText; Data Custodian; Document Presentment by OpenText; Digital Asset Management by OpenText'
  },

  /* ======================== L2 PLATAFORMA ======================== */

  {
    id: 'btp',
    nome: 'SAP BTP',
    aliases: ['BTP', 'Business Technology Platform', 'Cloud Platform', 'SAP Cloud Platform'],
    camada: 'plataforma',
    tipo: 'PaaS',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield', 'industria'],
    oQueFaz: 'Business Technology Platform. Tecto único de integração, dados, extensibilidade, automação, identidade e IA. Sítio oficial do clean core: diferenciação sai do S/4 e nasce aqui (CAP, ABAP Cloud, Build, Kyma, Cloud Foundry). Comercialmente chega por créditos (RISE), subscription ou consumo. Não é um único serviço — é a plataforma que hospeda dezenas de services do Discovery Center.',
    paraQueServe: 'Misturar um core estável com inovação rápida. Regra de ouro: S/4 standard + BTP side-by-side + Integration Suite no meio. No on-prem clássico o BTP é uma ilha; no GROW/RISE é estruturante.',
    exemploReal: 'Ferrara Candy: RISE S/4 Private Edition powered by BTP, go-live big-bang em 25 módulos, mais de 98% de qualidade de master data. Southwest Gas: BTP + SuccessFactors LMS para validar certificações de técnicos de campo com QR no telemóvel.',
    ligaA: ['integration-suite', 'build', 'hana-cloud', 'ias', 's4hana', 'joule', 'workzone', 'cloud-alm', 'event-mesh', 'runtimes-btp', 'abap-env', 'ai-foundation', 'iag'],
    nesteCenario: {
      onprem: 'Atenuado. Pode existir como ilha de inovação sem ser o default do landscape.',
      cloud: 'Activo. Plataforma de extensões e integração do GROW. Sem BTP o Public Edition não se estende de forma upgrade-safe.',
      rise: 'Activo e estruturante. Clean core = custom code sai do S/4 para o BTP. Cloud ALM governa o ciclo de vida. Créditos BTP vêm no envelope RISE.'
    },
    satelitesHelp: 'Audit Log Service; Cloud Logging; PostgreSQL on BTP; Redis on BTP; RabbitMQ on BTP; Private Link Service; Print Forms Service; Translation Hub; Task Center; Application Frontend Service; Key Management Service; Cloud SDK; CAP'
  },

  {
    id: 'build',
    nome: 'SAP Build',
    camada: 'plataforma',
    tipo: 'Dev + Low-code',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'Família unificada de desenvolvimento no BTP. Help: Build, Build Code, Build Process Automation, Build Process Automation foundation add-on by UiPath, Build Work Zone standard edition, Business Application Studio, Business Application Factory, Application Frontend Service, AppGyver (linha histórica low-code).',
    paraQueServe: 'Fiori extra, portais, workflows de aprovação, microserviços e apps mobile sem user-exits nem Z-reports no S/4. Mistura com Signavio: o processo alvo nasce no Signavio; a automação que não cabe no standard nasce no Build Process Automation.',
    exemploReal: 'Hitachi High-Tech reportou 94% de redução no footprint de customização. Gerdau usou Build + Integration Suite + S/4 para onboarding 50% mais rápido.',
    ligaA: ['btp', 'workzone', 's4hana', 'successfactors', 'hana-cloud', 'abap-env', 'signavio', 'runtimes-btp', 'sap-start'],
    nesteCenario: {
      onprem: 'Atenuado / ausente no default.',
      cloud: 'Activo. Ferramenta de extensão do Public Edition.',
      rise: 'Activo. Destino preferencial do custom code que o Cloud ALM classifica fora do core.'
    }
  },

  {
    id: 'workzone',
    nome: 'SAP Build Work Zone',
    camada: 'plataforma',
    tipo: 'UX / Launchpad',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'Digital workplace. Help distingue SAP Work Zone / SAP Build Work Zone advanced edition (workplace de TI) de SAP SuccessFactors Work Zone (experiência de colaborador RH). Este card é o Build Work Zone. Ponto de entrada único para Fiori do S/4, apps BTP, SuccessFactors, Ariba e apps de terceiros. Substitui conceptualmente o SAP Enterprise Portal.',
    paraQueServe: 'Um URL só para o utilizador final. Mistura UX: IAS autentica → Work Zone agrega → S/4 + LoB + extensões Build aparecem como tiles.',
    exemploReal: 'PwC unificou mais de 100 000 profissionais em 19 países sobre um core cloud SAP — padrão de entrada única que o Work Zone materializa.',
    ligaA: ['build', 's4hana', 'successfactors', 'ias', 'btp', 'fiori', 'enterprise-portal', 'sap-start'],
    nesteCenario: {
      onprem: 'Atenuado. O equivalente clássico é Fiori Launchpad / Enterprise Portal no DC.',
      cloud: 'Activo. Shell UX do GROW.',
      rise: 'Activo. Ponto de entrada recomendado do landscape híbrido.'
    }
  },

  {
    id: 'ias',
    nome: 'SAP Cloud Identity Services',
    aliases: ['IAS', 'IPS', 'Cloud Identity', 'Identity Authentication', 'Identity Provisioning'],
    camada: 'plataforma',
    tipo: 'IdP / IAM',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield', 'regulado'],
    oQueFaz: 'Identity Authentication (IAS) + Identity Provisioning (IPS). SSO e ciclo de vida de utilizadores entre S/4 Cloud, BTP, SuccessFactors, Ariba, Concur, Fieldglass e o IdP corporativo (Entra ID, Okta). Help também lista SAP Single Sign-On clássico e Decentralized Identity Verification. Distinto de IAG (governação SoD) e de Customer Data Cloud (consumidor final).',
    paraQueServe: 'Um login corporativo para a suite e provisionamento automático de contas e roles. Mistura obrigatória em GROW e RISE.',
    exemploReal: 'Componente incluído no tenant RISE / S/4HANA Cloud. Quase todos os landscapes cloud federam o IdP corporativo (muito frequentemente Entra ID no Azure) ao IAS.',
    ligaA: ['btp', 's4hana', 'successfactors', 'azure', 'workzone', 'cloud-alm', 'ariba', 'concur', 'fieldglass', 'iag', 'customer-data-cloud'],
    nesteCenario: {
      onprem: 'Atenuado. Só entra se já existirem ilhas cloud.',
      cloud: 'Activo. IdP da suite Public Edition.',
      rise: 'Activo. Identidade do S/4 Private Edition + BTP + LoB.'
    }
  },

  {
    id: 'abap-env',
    nome: 'SAP BTP ABAP Environment',
    camada: 'plataforma',
    tipo: 'Runtime',
    cluster: 'runtimes',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Steampunk. Help: BTP ABAP environment, ABAP Cloud, ABAP Development Tools for Eclipse, Landscape Portal for SAP S/4HANA Cloud ABAP environment. ABAP Cloud no BTP, sobre HANA Cloud. Permite reescrever ou nascer extensões ABAP fora do S/4, com released APIs, RAP e Fiori.',
    paraQueServe: 'Tirar código Z do core sem perder a competência ABAP. Mistura brownfield: ATC no S/4 classifica o custom code → diferenciação vai para ABAP Environment ou CAP → Cloud ALM acompanha o deploy BTP.',
    exemploReal: 'O modelo Clean Core da SAP usa o ABAP Environment como destino side-by-side de extensões RAP. Hitachi High-Tech (94% menos customização) é o padrão de resultado.',
    ligaA: ['btp', 'build', 'hana-cloud', 's4hana', 'runtimes-btp', 'cloud-alm'],
    nesteCenario: {
      onprem: 'Ausente. O ABAP vive no NetWeaver / S/4 any-premise.',
      cloud: 'Activo como runtime de extensão do Public Edition.',
      rise: 'Activo. Uma das três runtimes estratégicas do BTP no RISE.'
    }
  },

  {
    id: 'runtimes-btp',
    nome: 'Runtimes BTP (Cloud Foundry + Kyma)',
    camada: 'plataforma',
    tipo: 'Runtime',
    cluster: 'runtimes',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'industria'],
    oQueFaz: 'Os dois runtimes poliglotas do BTP. Cloud Foundry para apps CAP, Node, Java, Python. Kyma para Kubernetes gerido. Help: Cloud Application Programming Model, Cloud SDK, Cloud Platform (nome histórico).',
    paraQueServe: 'Correr extensões que não são ABAP: conectores de chão de fábrica, APIs públicas, workers de eventos, frontends HTML5. Mistura indústria: Kyma + Event Mesh + Cloud Connector / EIC para telemetria OT sem tocar no S/4.',
    exemploReal: 'A documentação de desenvolvedores BTP recomenda CF para a maioria das extensões CAP e Kyma quando há necessidade de Kubernetes e workloads event-driven.',
    ligaA: ['btp', 'build', 'abap-env', 'event-mesh', 'hana-cloud', 'advanced-event-mesh'],
    nesteCenario: {
      onprem: 'Ausente.',
      cloud: 'Activo. CF é o default das extensões GROW.',
      rise: 'Activo. CF default; Kyma quando o perfil indústria ou o volume de microserviços o justificam.'
    }
  },

  {
    id: 'ai-foundation',
    nome: 'SAP AI Foundation',
    camada: 'plataforma',
    tipo: 'AI',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'Camada de governação e runtime de IA no BTP. Help: AI Core, AI Launchpad, AI Business Services, Joule for Developers ABAP AI Capabilities, CX AI Toolkit, CXAI, Intelligent Situation Automation, Intelligent Technologies. Não é o copiloto (isso é Joule); é o chão de fábrica onde se constroem, publicam e governam agentes e extensões de IA.',
    paraQueServe: 'Misturar IA com processo sem shadow-IT de prompts. Joule é a face; AI Foundation é o motor e o governo. Cloud ALM observa agentes neste plano.',
    exemploReal: 'Sapphire 2026: Business AI Platform = BTP + Business Data Cloud + AI Foundation, com Knowledge Graph e Joule Studio 2.0. H&M usou esta fundação para o Store Intelligence Agent.',
    ligaA: ['btp', 'joule', 'bdc', 'cloud-alm', 's4hana'],
    nesteCenario: {
      onprem: 'Irrelevante no default.',
      cloud: 'Activo no stack IA do GROW.',
      rise: 'Activo. Base dos assistentes Joule contratualmente previstos no 1.º ano RISE.'
    }
  },

  {
    id: 'iag',
    nome: 'SAP Cloud Identity Access Governance',
    camada: 'plataforma',
    tipo: 'IAM / SoD cloud',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Governação de acessos na cloud: SoD, access requests, reviews. Help: Cloud Identity Access Governance. Complementa IAS (quem és) e GRC Access Control (parque on-prem). IAG é a via cloud-first de SoD sobre S/4 Cloud, BTP e LoB.',
    paraQueServe: 'SoD sem SolMan/GRC clássico. Mistura regulada: IAS autentica → IAG governa o acesso → GRC on-prem só no residual.',
    exemploReal: 'Entrada própria no All Products, família Identity, distinta de Cloud Identity Services.',
    ligaA: ['ias', 'grc', 's4hana', 'btp', 'cloud-alm'],
    nesteCenario: {
      onprem: 'Atenuado (GRC Access Control).',
      cloud: 'Recomendado com perfil regulado.',
      rise: 'Recomendado com perfil regulado.'
    }
  },

  {
    id: 'sap-start',
    nome: 'SAP Start / Mobile Start',
    camada: 'plataforma',
    tipo: 'UX',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield'],
    oQueFaz: 'Ponto de entrada móvel / home da suite. Help: SAP Start, SAP Mobile Start e SAP Task Center. Mais leve que Work Zone advanced: cards, aprovações, Joule no telemóvel.',
    paraQueServe: 'Adopção móvel sem portal pesado. Mistura: IAS → Start/Mobile Start → Task Center → apps S/4 e LoB.',
    exemploReal: 'Três entradas All Products: SAP Start, Mobile Start, Task Center. Work Zone continua a ser o workplace completo.',
    ligaA: ['workzone', 'fiori', 'ias', 'joule', 'build'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Activo como companion móvel do GROW.',
      rise: 'Activo como companion móvel.'
    }
  },

  {
    id: 'enterprise-portal',
    nome: 'SAP Enterprise Portal (legado)',
    camada: 'plataforma',
    tipo: 'UX legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Portal NetWeaver clássico (iViews, KM, roles). Help: Enterprise Portal e NetWeaver Portal Enterprise Workspaces. Destino: Fiori Launchpad on-prem ou Build Work Zone.',
    paraQueServe: 'Explicar de onde vêm os portais SAP que o cliente ainda tem. Toggle legado.',
    exemploReal: 'Qualquer landscape ECC com Portal a servir de intranet SAP. A migração típica é Portal → Fiori Launchpad → Work Zone.',
    ligaA: ['netweaver', 'fiori', 'workzone', 'dc-onprem'],
    nesteCenario: {
      onprem: 'Legado activo com o toggle.',
      cloud: 'Escondido.',
      rise: 'Escondido / legado.'
    }
  },

  {
    id: 'lama',
    nome: 'SAP Landscape Management',
    camada: 'plataforma',
    tipo: 'Ops de landscape',
    cluster: null,
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Automatização de operações de sistemas SAP: copy, refresh, start/stop, mass operations. Help: SAP Landscape Management Cloud e SAP IT Infrastructure Management. Complementa Cloud ALM (que não faz system copy de um S/4 on-prem).',
    paraQueServe: 'Refresh de QA a partir de PRD, clones para projectos. Mistura on-prem / RISE dual: LaMa opera os sistemas que o cliente ainda controla; Cloud ALM opera o run cloud.',
    exemploReal: 'LaMa Cloud e LaMa on-prem listados no All Products. Service providers e centros de competência SAP usam LaMa para fazendas de sistemas.',
    ligaA: ['dc-onprem', 's4-any', 'solman', 'cloud-alm', 'cal'],
    nesteCenario: {
      onprem: 'Opcional / activo em fazendas SAP grandes.',
      cloud: 'Irrelevante no GROW típico (a SAP opera o tenant).',
      rise: 'Opcional para sistemas residuais no DC do cliente.'
    }
  },

  {
    id: 'cal',
    nome: 'SAP Cloud Appliance Library',
    camada: 'plataforma',
    tipo: 'Laboratório',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'Catálogo de appliances SAP pré-instaladas em hyperscaler para trial, POC e sandbox. Help: Cloud Appliance Library. Não é produção RISE; é o sítio onde se experimenta S/4, BTP e add-ons sem esperar por um projecto.',
    paraQueServe: 'Provas de conceito rápidas. Mistura pedagógica: CAL para experimentar → Signavio para decidir o to-be → RISE/GROW para produzir.',
    exemploReal: 'Entrada All Products. Equipas de pré-venda e academias SAP usam CAL como laboratório standard.',
    ligaA: ['aws', 'azure', 'gcp', 's4hana', 'btp'],
    nesteCenario: {
      onprem: 'Opcional como sandbox em cloud ao lado do DC.',
      cloud: 'Opcional para POC antes do contrato GROW.',
      rise: 'Opcional para sandbox fora do contrato de produção.'
    }
  },

  /* ======================== L3 INTEGRAÇÃO ======================== */

  {
    id: 'integration-suite',
    nome: 'SAP Integration Suite',
    aliases: ['CPI', 'SCI', 'SAP Cloud Integration', 'também conhecido como SAP Cloud Integration / CPI'],
    camada: 'integracao',
    tipo: 'EiPaaS',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield', 'industria', 'spend'],
    oQueFaz: 'iPaaS no BTP, sucessor estratégico de PI/PO (manutenção standard de PI/PO até Dezembro de 2027). Capacidades: Cloud Integration (iFlows), API Management, Event Mesh, Integration Advisor, Open Connectors, Trading Partner Management, Integration Assessment, Migration Assessment. Help lista também API Business Hub / Business Accelerator Hub, Application Interface Framework e Managed Gateway for Spend como peça irmã. Edge Integration Cell é o runtime híbrido associado.',
    paraQueServe: 'A2A, B2B/EDI, B2G e eventos entre SAP e não-SAP. RISE inclui um baseline de mensagens; landscapes com muitos sistemas externos quase sempre precisam de capacidade extra.',
    exemploReal: 'Jabil usa Integration Suite + BTP como espinha dorsal global, com padrão API + eventos. Nu Skin reduziu criações de integração de semanas para dias. FC Bayern consolidou 52 sistemas.',
    ligaA: ['btp', 's4hana', 'ariba', 'successfactors', 'eic', 'event-mesh', 'pipo', 'cloud-alm', 'cloud-connector', 'concur', 'fieldglass', 'commerce-cloud', 'digital-manufacturing', 'managed-gateway', 'advanced-event-mesh', 'multi-bank'],
    nesteCenario: {
      onprem: 'Atenuado. O middleware default é PI/PO; a Suite pode já existir como ilha de migração.',
      cloud: 'Activo. iPaaS do GROW / Public Edition.',
      rise: 'Activo. Baseline incluído no RISE. Cloud ALM monitoriza iFlows. Destino oficial da migração PI/PO.'
    },
    satelitesHelp: 'API Management; API Business Hub; Business Accelerator Hub; Application Interface Framework; ANSI X12 / EDIFACT / EANCOM / Peppol / GUSI / OAGIS / PIDX Implementation Guides'
  },

  {
    id: 'event-mesh',
    nome: 'SAP Event Mesh',
    camada: 'integracao',
    tipo: 'EDA',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'industria'],
    oQueFaz: 'Broker de eventos no BTP. O S/4 publica business events. Consumidores no BTP, LoB ou terceiros subscrevem. Substitui o reflexo de RFC síncrono ponto-a-ponto. Para escala enterprise multi-região usa-se o card Advanced Event Mesh. Help também lista Event Stream Processor e Event Insight como linha histórica.',
    paraQueServe: 'Desacoplar o core. Mistura correcta em RISE/Public: S/4 publica o evento → Event Mesh → extensão Build/Kyma ou iFlow.',
    exemploReal: 'Padrão recomendado SAP para S/4HANA Cloud e RISE. Jabil descreve a mudança para arquitectura API + event-based como direcção oficial do landscape.',
    ligaA: ['integration-suite', 's4hana', 'btp', 'runtimes-btp', 'advanced-event-mesh'],
    nesteCenario: {
      onprem: 'Ausente no default (IDocs, RFC, PI).',
      cloud: 'Activo. Padrão de desacoplamento do Public Edition.',
      rise: 'Activo. Eventos de negócio do Private Edition consumidos por extensões BTP.'
    }
  },

  {
    id: 'advanced-event-mesh',
    nome: 'SAP Integration Suite, Advanced Event Mesh',
    camada: 'integracao',
    tipo: 'EDA enterprise',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Event mesh de escala enterprise, documentado na Help como produto próprio. Multi-região, fan-out massivo, parceiros externos. Event Mesh cobre o padrão S/4 → BTP; Advanced Event Mesh cobre o backbone de eventos da empresa.',
    paraQueServe: 'Quando o volume ou a topologia rebenta o Event Mesh standard.',
    exemploReal: 'Linha distinta no All Products e no Discovery Center.',
    ligaA: ['event-mesh', 'integration-suite', 's4hana', 'runtimes-btp'],
    nesteCenario: {
      onprem: 'Ausente.',
      cloud: 'Opcional.',
      rise: 'Opcional, recomendado com perfil indústria e EDA pesada.'
    }
  },

  {
    id: 'eic',
    nome: 'Edge Integration Cell',
    camada: 'integracao',
    tipo: 'Runtime híbrido',
    cluster: null,
    cenarios: ['rise'],
    perfisRecomendados: ['industria', 'regulado'],
    oQueFaz: 'Runtime da Integration Suite que corre no landscape privado do cliente, em Kubernetes. O iFlow é desenhado e monitorizado na cloud; a execução e os dados ficam on-prem. Help também lista Edge Lifecycle Management.',
    paraQueServe: 'Mistura híbrida regulamentada ou de chão de fábrica: governo do iPaaS na cloud, payload dentro de casa. Complementa o Cloud Connector (o Connector é túnel; o EIC é runtime de integração completo).',
    exemploReal: 'Arquitectura de referência AWS/SAP para RISE: EIC em alta disponibilidade no landing zone do cliente.',
    ligaA: ['integration-suite', 'dc-onprem', 'cloud-connector', 's4hana', 'digital-manufacturing', 'cdc-option'],
    nesteCenario: {
      onprem: 'Ausente.',
      cloud: 'Raro. Só com perfil indústria/regulado.',
      rise: 'Opcional no default, recomendado com perfil indústria ou regulado.'
    }
  },

  {
    id: 'cloud-connector',
    nome: 'SAP Cloud Connector',
    camada: 'integracao',
    tipo: 'Connectivity',
    cluster: null,
    cenarios: ['rise', 'cloud'],
    perfisRecomendados: ['brownfield', 'industria', 'regulado'],
    oQueFaz: 'Túnel seguro outbound do data center do cliente para o BTP. Não abre inbound no firewall. Expõe de forma controlada RFC, OData e HTTP de sistemas on-prem a extensões BTP e iFlows. Help lista também Corporate Connectivity for Banking e Connector for Multi-Bank Connectivity como conectores de domínio.',
    paraQueServe: 'Qualquer mistura híbrida honesta. Sem Cloud Connector as extensões BTP não chegam ao ECC/S/4 residual nem ao MES.',
    exemploReal: 'Componente standard de todos os cookbooks RISE híbridos em AWS, Azure e GCP.',
    ligaA: ['btp', 'dc-onprem', 'eic', 's4-any', 'ecc', 'integration-suite', 'digital-manufacturing'],
    nesteCenario: {
      onprem: 'Ausente no on-prem puro.',
      cloud: 'Opcional. Activo se restarem satélites on-prem.',
      rise: 'Activo na maioria dos RISE reais.'
    }
  },

  {
    id: 'pipo',
    nome: 'SAP PI/PO (legado)',
    camada: 'integracao',
    tipo: 'Middleware on-prem',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Process Integration / Process Orchestration. Middleware A2A clássico no NetWeaver. Destino estratégico é a Integration Suite. Fim da manutenção standard: Dezembro de 2027.',
    paraQueServe: 'Manter o landscape on-prem a falar consigo próprio. Mistura RISE: workstream obrigatório de Migration Assessment PI/PO → Integration Suite.',
    exemploReal: 'A maior parte dos programas RISE inclui um workstream explícito PI/PO → Integration Suite.',
    ligaA: ['s4-any', 'ecc', 'integration-suite', 'dc-onprem', 'solman', 'netweaver'],
    nesteCenario: {
      onprem: 'Middleware default. Card activo.',
      cloud: 'Escondido.',
      rise: 'Legado em phase-out. Visível atenuado com o toggle ou perfil brownfield.'
    }
  },

  {
    id: 'managed-gateway',
    nome: 'Managed Gateway (ex-Ariba CIG)',
    camada: 'integracao',
    tipo: 'Gateway Spend',
    cluster: 'spend',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['spend'],
    oQueFaz: 'Help: SAP Integration Suite, Managed Gateway for Spend Management and SAP Business Network (antes Ariba Cloud Integration Gateway). Conteúdo pré-construído S/4 ↔ Ariba / Business Network / Fieldglass.',
    paraQueServe: 'Não reinventar iFlows de PO, GR, factura, supplier. Mistura spend: S/4 + Ariba + Network passam por este gateway.',
    exemploReal: 'A Help ainda tem entrada Ariba Cloud Integration Gateway a apontar para o nome novo na Integration Suite.',
    ligaA: ['integration-suite', 'ariba', 'business-network', 'fieldglass', 's4hana'],
    nesteCenario: {
      onprem: 'Atenuado (CIG clássico / add-ons SRM).',
      cloud: 'Activo com perfil spend.',
      rise: 'Activo com perfil spend.'
    }
  },

  {
    id: 'multi-bank',
    nome: 'SAP Multi-Bank Connectivity',
    camada: 'integracao',
    tipo: 'Banca',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['regulado', 'greenfield'],
    oQueFaz: 'Rede multi-banco. Help: SAP Multi-Bank Connectivity e Connector for SAP Multi-Bank Connectivity. Liga o S/4 a dezenas de bancos sem um middleware por banco. Help ainda lista Bank Communication Management como ancestral on-prem.',
    paraQueServe: 'Pagamentos e cash management sem host-to-host artesanal. Mistura: S/4 Treasury / AP → Multi-Bank → bancos.',
    exemploReal: 'Produto autónomo no All Products; aparece nos scope items de S/4 Cloud Finance.',
    ligaA: ['s4hana', 'integration-suite', 'treasury'],
    nesteCenario: {
      onprem: 'Atenuado (BCM / host-to-host clássico).',
      cloud: 'Opcional, muito frequente em Finance cloud.',
      rise: 'Opcional, muito frequente em Finance do Private Edition.'
    }
  },

  {
    id: 'snc',
    nome: 'SAP Supply Network Collaboration',
    camada: 'integracao',
    tipo: 'Colaboração fornecedor',
    cluster: 'supply',
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['industria', 'spend'],
    oQueFaz: 'Colaboração clássica com fornecedores de produção (previsão, consignação, VMI). Help: Supply Network Collaboration e Information Collaboration Hub for Life Sciences. Na cloud o destino estratégico é Business Network for Supply Chain.',
    paraQueServe: 'Fornecedor de componentes vê a necessidade e confirma. Mistura indústria: S/4 / IBP planeia → SNC ou Business Network colabora → EWM recebe.',
    exemploReal: 'SNC é a linha clássica no All Products; Business Network for Supply Chain é o alvo cloud.',
    ligaA: ['s4-any', 's4hana', 'business-network', 'ibp', 'ewm'],
    nesteCenario: {
      onprem: 'Opcional / activo em indústria com VMI clássico.',
      cloud: 'Atenuado. Alvo = Business Network.',
      rise: 'Opcional. Coexistência ou migração para Network.'
    }
  },

  /* ======================== L4 CORE ERP ======================== */

  {
    id: 'ecc',
    nome: 'SAP ECC 6.0 (legado)',
    camada: 'core',
    tipo: 'ERP legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'SAP ERP Central Component, a Business Suite 7 sobre AnyDB ou HANA. Help ainda lista SAP R/3 como ancestral. Fim de manutenção mainstream alinhado com NetWeaver 7.5 / Business Suite 7 (2027 standard, 2030 extended). Ponto de partida da maioria dos RISE brownfield.',
    paraQueServe: 'Ainda é o motor de milhares de empresas. Mistura de saída: ECC + PI/PO + SolMan + HCM on-prem → RISE Private Edition + Integration Suite + Cloud ALM + SuccessFactors.',
    exemploReal: 'O padrão público da maior parte das histórias RISE (H.B. Fuller e existing SAP ERP customers) é exactamente este ponto de partida.',
    ligaA: ['s4-any', 's4hana', 'pipo', 'solman', 'hcm-onprem', 'netweaver', 'dc-onprem', 'btc', 'central-finance'],
    nesteCenario: {
      onprem: 'Activo se o toggle legado estiver on ou se o landscape ainda não é S/4.',
      cloud: 'Escondido. GROW é greenfield Public Edition, não ECC na cloud.',
      rise: 'Legado de origem. Visível com toggle. O card destino é s4hana Private Edition.'
    }
  },

  {
    id: 's4-any',
    nome: 'SAP S/4HANA (any-premise)',
    camada: 'core',
    tipo: 'ERP on-prem',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'S/4HANA instalado e operado pelo cliente ou por um hoster clássico, sobre HANA on-prem. Digital core funcional quase completo. TCO, upgrades, HA/DR e segurança a cargo da TI interna.',
    paraQueServe: 'Quem quer S/4 mas ainda não quer o contrato RISE/GROW. Mistura clássica: S/4 any-premise + HANA on-prem + PI/PO ou Suite + SolMan + Fiori on-prem.',
    exemploReal: 'A maioria dos clientes RISE publicados partiu de ECC ou deste any-premise.',
    ligaA: ['hana-onprem', 'pipo', 'dc-onprem', 'solman', 'cloud-connector', 'ecc', 'fiori', 'ewm', 'tm', 'mdg', 'group-reporting', 'central-finance', 'treasury', 'ppm'],
    nesteCenario: {
      onprem: 'Motor da empresa quando o on-prem já é S/4. Card central de L4.',
      cloud: 'Escondido. Substituído por S/4HANA Cloud Public Edition.',
      rise: 'Atenuado durante a convivência dual. O sucessor no mesmo lugar visual é s4hana Private Edition.'
    }
  },

  {
    id: 's4hana',
    nome: 'SAP S/4HANA Cloud',
    aliases: ['S/4', 'S4', 'S4HANA', 'S/4HANA Cloud', 'GROW', 'RISE core'],
    camada: 'core',
    tipo: 'ERP Cloud',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield', 'industria', 'regulado', 'spend'],
    oQueFaz: 'Digital core na cloud. Help: SAP S/4HANA Cloud Private Edition e RISE with SAP Private Cloud Edition. O MESMO card representa duas edições, distinguíveis pelo preset: Public Edition (GROW) e Private Edition (RISE). Cobre finanças, logística, vendas, manufacturing, EWM/TM, projectos, serviço. Extensões in-app (key user) são limitadas; diferenciação vai para o BTP.',
    paraQueServe: 'Motor transaccional da empresa. Public Edition = velocidade e standard. Private Edition = preservar complexidade com operação SAP e caminho para clean core.',
    exemploReal: 'Alto (Governo do Canadá): S/4HANA Cloud Public Edition + SuccessFactors live em 6 meses. Ferrara Candy: RISE Private Edition, 25 módulos em big-bang. H.B. Fuller: Private Edition em 123 países.',
    ligaA: ['hana-cloud', 'btp', 'integration-suite', 'successfactors', 'ariba', 'signavio', 'sac', 'joule', 'cloud-alm', 'ias', 'event-mesh', 'ewm', 'tm', 'mdg', 'fiori', 'ibp', 'grc', 'gts', 'document-compliance', 'group-reporting', 'multi-bank', 'central-finance', 'treasury'],
    nesteCenario: {
      onprem: 'Escondido. O card activo de L4 é s4-any ou ecc.',
      cloud: 'Public Edition. Standard, upgrades SAP, Cloud ALM para Activate e operações.',
      rise: 'Private Edition no hyperscaler gerido pela SAP (ou CDC). Clean core medido no dashboard RISE Methodology do Cloud ALM.'
    }
  },

  {
    id: 'fiori',
    nome: 'SAP Fiori',
    camada: 'core',
    tipo: 'UX',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'Linguagem de experiência SAP: apps Fiori, SAPUI5, launchpad, design system. Help: SAP Fiori Apps Reference Library, SAPUI5, SAP Screen Personas, SAP Business Client, SAP GUI for Windows / Java.',
    paraQueServe: 'Tirar o utilizador do SAP GUI clássico. Mistura: Fiori nativo do S/4 + apps Build + tiles LoB no Work Zone, com IAS à porta.',
    exemploReal: 'Qualquer go-live S/4 Cloud citado neste mapa (Alto, Ferrara, H.B. Fuller) entrega o dia-a-dia em Fiori, não em SAP GUI.',
    ligaA: ['s4hana', 's4-any', 'workzone', 'build', 'ias', 'sap-start'],
    nesteCenario: {
      onprem: 'Activo como launchpad on-prem / Gateway.',
      cloud: 'Activo.',
      rise: 'Activo.'
    }
  },

  {
    id: 'netweaver',
    nome: 'SAP NetWeaver',
    camada: 'core',
    tipo: 'PaaS on-prem',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Plataforma técnica clássica: ABAP Application Server, Java stack histórico, Kernel, Gateway, Web Dispatcher. Help: NetWeaver AS ABAP 7.4 for Suite version for HANA e linha 7.5. Debaixo de ECC, SolMan, PI/PO, Portal. Manutenção alinhada com Business Suite 7 / 2027.',
    paraQueServe: 'Explicar sobre que chão corre o mundo on-prem.',
    exemploReal: 'Todo o parque ECC e PI/PO corre sobre NetWeaver. A data de 2027 de PI/PO e SolMan é, em grande medida, a data de NetWeaver 7.5.',
    ligaA: ['ecc', 's4-any', 'pipo', 'solman', 'enterprise-portal', 'dc-onprem', 'hana-onprem'],
    nesteCenario: {
      onprem: 'Activo.',
      cloud: 'Escondido.',
      rise: 'Escondido / legado.'
    }
  },

  {
    id: 'mdg',
    nome: 'SAP Master Data Governance',
    camada: 'core',
    tipo: 'Dados mestres',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['brownfield', 'greenfield'],
    oQueFaz: 'Governação de master data (Business Partner, material, finanças). Help: Master Data Governance, MDG Cloud Edition, e extensões enterprise asset management / retail and fashion by Prometheus Group.',
    paraQueServe: 'Uma ficha de fornecedor, cliente ou artigo. Mistura: MDG no S/4 + Integration Suite a distribuir + Ariba/SuccessFactors a consumir o mesmo Business Partner.',
    exemploReal: 'Ferrara Candy reportou mais de 98% de qualidade de master/finance data no go-live RISE.',
    ligaA: ['s4hana', 's4-any', 'ariba', 'successfactors', 'integration-suite', 'fashion'],
    nesteCenario: {
      onprem: 'Activo.',
      cloud: 'Activo.',
      rise: 'Activo.'
    }
  },

  {
    id: 'group-reporting',
    nome: 'SAP Group Reporting',
    camada: 'core',
    tipo: 'Consolidação',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['brownfield', 'regulado'],
    oQueFaz: 'Consolidação no S/4. Help também lista Group Reporting Data Collection e Disclosure Management como satélites de fecho de grupo. Substitui em grande medida BPC consolidation / BCS / EC-CS.',
    paraQueServe: 'Contas do grupo. Mistura: S/4 sociedades → Group Reporting → Disclosure Management / SAC.',
    exemploReal: 'Scope item central de S/4 Finance. Data Collection é produto à parte no All Products para o input das entidades não-S/4.',
    ligaA: ['s4hana', 's4-any', 'sac', 'bpc', 'disclosure-management', 'central-finance'],
    nesteCenario: {
      onprem: 'Activo em S/4 any-premise com grupo.',
      cloud: 'Activo no Public Edition Finance.',
      rise: 'Activo.'
    }
  },

  {
    id: 'central-finance',
    nome: 'SAP Central Finance',
    camada: 'core',
    tipo: 'Finanças centrais',
    cluster: 'finance-ext',
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'S/4HANA usado como ledger financeiro central que replica documentos de vários ECC/S/4 satélite em tempo real. Help lista também Central Finance Master Data Replication e Transaction Replication by insightsoftware. Não substitui o ERP logístico das sociedades — concentra FI/CO.',
    paraQueServe: 'Grupos com muitos ECC que querem um fecho único sem big-bang de todas as sociedades. Mistura brownfield: ECC satélites → SLT / replication → Central Finance no RISE → Group Reporting.',
    exemploReal: 'A Shell usou S/4HANA / Central Finance como digital core financeiro em tempo real. Padrão clássico de transformação faseada.',
    ligaA: ['ecc', 's4-any', 's4hana', 'group-reporting', 'btc', 'hana-onprem'],
    nesteCenario: {
      onprem: 'Opcional / activo em grupos multi-ECC.',
      cloud: 'Raro no Public Edition (modelo diferente).',
      rise: 'Recomendado com perfil brownfield de grupo com vários ERP.'
    }
  },

  {
    id: 'treasury',
    nome: 'SAP Treasury and Risk Management',
    camada: 'core',
    tipo: 'Tesouraria',
    cluster: 'finance-ext',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado', 'brownfield'],
    oQueFaz: 'Tesouraria, risco financeiro, instrumentos, liquidez. Help: Treasury and Risk Management (e extensões Impairment), Trading Platform Integration, Liquidity Risk Management, Market Rates Management, Treasury G-Invoicing, Payment Engine, SAP Pay, Digital Payments Add-On, Digital Currency Hub, Capital Yield Tax Management.',
    paraQueServe: 'Caixa, dívida, hedges. Mistura: S/4 Treasury + Multi-Bank + Trading Platform + SAC.',
    exemploReal: 'Família Treasury no All Products é distinta do FI-AP clássico. Multi-Bank Connectivity é o braço de conectividade.',
    ligaA: ['s4hana', 's4-any', 'multi-bank', 'sac', 'cash-application'],
    nesteCenario: {
      onprem: 'Activo em tesourarias maduras.',
      cloud: 'Opcional no Public Edition Finance.',
      rise: 'Opcional / activo em grupos com tesouraria central.'
    },
    satelitesHelp: 'Treasury and Risk Management; Trading Platform Integration; Liquidity Risk Management; Market Rates Management; Payment Engine; SAP Pay; Digital Payments Add-On; Digital Currency Hub; Treasury G-Invoicing'
  },

  {
    id: 'cash-application',
    nome: 'SAP Cash Application',
    camada: 'core',
    tipo: 'AI Finance',
    cluster: 'finance-ext',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'Matching inteligente de extractos e pagamentos a facturas abertas. Help: Cash Application add-on for contract accounting. Peça de Autonomous Finance sobre o S/4.',
    paraQueServe: 'Reduzir o trabalho manual de compensação. Mistura: Multi-Bank traz o extracto → Cash Application propõe o match → S/4 FI confirma.',
    exemploReal: 'Posicionado pela SAP na família Autonomous Finance / Business AI sobre S/4.',
    ligaA: ['s4hana', 'multi-bank', 'joule', 'treasury'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional Finance.',
      rise: 'Opcional Finance.'
    }
  },

  {
    id: 'rar',
    nome: 'SAP Revenue Accounting and Reporting',
    camada: 'core',
    tipo: 'Receita',
    cluster: 'finance-ext',
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Reconhecimento de receita (IFRS 15 / ASC 606). Help: Revenue Accounting and Reporting 1.3. Complementa BRIM quando há obrigações de performance complexas.',
    paraQueServe: 'Contabilizar receita no ritmo certo. Mistura: S/4 SD ou BRIM facturam → RAR reconhece → Group Reporting consolida.',
    exemploReal: 'Produto autónomo no All Products, família Finance, distinto do billing SD.',
    ligaA: ['s4hana', 's4-any', 'brim', 'group-reporting'],
    nesteCenario: {
      onprem: 'Opcional em grupos IFRS 15.',
      cloud: 'Opcional.',
      rise: 'Opcional com perfil regulado.'
    }
  },

  {
    id: 'disclosure-management',
    nome: 'SAP Disclosure Management',
    camada: 'core',
    tipo: 'Relato',
    cluster: 'finance-ext',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Produção e workflow do relatório financeiro e de sustentabilidade a publicar. Help: Disclosure Management. Senta-se a jusante do Group Reporting e do Control Tower ESG.',
    paraQueServe: 'O PDF / iXBRL que vai para o mercado. Mistura: Group Reporting + Sustainability Control Tower → Disclosure Management.',
    exemploReal: 'Satélite oficial do fecho de grupo no All Products, ao lado de Group Reporting Data Collection.',
    ligaA: ['group-reporting', 'sac', 'sustainability'],
    nesteCenario: {
      onprem: 'Opcional.',
      cloud: 'Opcional.',
      rise: 'Opcional com perfil regulado.'
    }
  },

  {
    id: 'ppm',
    nome: 'SAP Portfolio and Project Management',
    camada: 'core',
    tipo: 'Projectos',
    cluster: null,
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['industria', 'brownfield'],
    oQueFaz: 'Portefólio e projectos. Help: Portfolio and Project Management, Commercial Project Management, cProject Suite, Enterprise Project Connection, Unified Planning Center. No S/4 Cloud parte das capacidades vive em Enterprise Portfolio and Project Management embedded.',
    paraQueServe: 'Capex, engenharia, projectos de cliente. Mistura: PPM / CPM planeia → S/4 PS / Finance executa → SAC reporta.',
    exemploReal: 'H.B. Fuller e outros RISE industriais incluem projectos no perímetro. CPM é o irmão de projectos comerciais.',
    ligaA: ['s4hana', 's4-any', 'sac', 'ipd'],
    nesteCenario: {
      onprem: 'Opcional / activo em engenharia e capex.',
      cloud: 'Opcional (scope Public mais curto).',
      rise: 'Opcional com perfil indústria.'
    }
  },

  {
    id: 'business-one',
    nome: 'SAP Business One',
    camada: 'core',
    tipo: 'ERP PME',
    cluster: 'pme',
    cenarios: ['onprem', 'cloud'],
    perfisRecomendados: ['greenfield'],
    oQueFaz: 'ERP para pequenas empresas, HANA ou MS SQL, on-prem ou hospedado por partners. Não é S/4. Não entra em RISE. Roadmap próprio.',
    paraQueServe: 'PME que não precisam de S/4. Mistura de grupo: sede em S/4 + filiais pequenas em Business One, ligadas por Integration Suite.',
    exemploReal: 'A SAP posiciona Business One como ERP de PME partner-led, distinto de GROW (que é S/4 Public Edition).',
    ligaA: ['bydesign', 'integration-suite', 'btp'],
    nesteCenario: {
      onprem: 'Activo no universo PME.',
      cloud: 'Activo como linha PME paralela ao GROW.',
      rise: 'Irrelevante como core. Satélite possível de subsidiária.'
    }
  },

  {
    id: 'bydesign',
    nome: 'SAP Business ByDesign',
    camada: 'core',
    tipo: 'ERP PME Cloud',
    cluster: 'pme',
    cenarios: ['cloud'],
    perfisRecomendados: ['greenfield'],
    oQueFaz: 'ERP SaaS para mid-market, mais profundo que Business One e mais pequeno que S/4 Public Edition. Help: Business ByDesign e Cloud Applications Studio (PDI).',
    paraQueServe: 'Mid-market que já está em ByDesign, ou grupos que usam ByDesign em subsidiárias.',
    exemploReal: 'ByDesign é a linha SaaS histórica de mid-market da SAP, anterior ao empurrão GROW.',
    ligaA: ['business-one', 's4hana', 'integration-suite'],
    nesteCenario: {
      onprem: 'Irrelevante.',
      cloud: 'Opcional. Não é o default GROW.',
      rise: 'Irrelevante como core. Satélite possível.'
    }
  },

  /* ======================== L5 LoB (parte 1) ======================== */

  {
    id: 'successfactors',
    nome: 'SAP SuccessFactors',
    aliases: ['SF', 'Success Factors', 'HCM cloud'],
    camada: 'lob',
    tipo: 'SaaS HCM',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield', 'workforce'],
    oQueFaz: 'Suite de RH na cloud. Help documenta Employee Central, Recruiting / Applicant Management / Candidate Pipeline / E-Recruiting for S/4HANA, Career and Talent Development, Opportunity Marketplace, Work Zone de colaborador, Enterprise Service Management, Learning Solution, Performance & Goals, Compensation, Succession, 360 Reviews, Analytics, Time and Attendance / Absence by WorkForce Software, Deskless Worker Experience, U.S. Benefits Administration by Benefitfocus. Destino estratégico do HCM on-prem. Inclui SmartRecruiters no recruiting.',
    paraQueServe: 'Contratar, integrar, formar, avaliar, pagar e gerir talento. Mistura: Employee Central é o master da pessoa; o S/4 recebe custo, org e time; o IAS autentica; o Joule atende o colaborador; o Fieldglass cobre o trabalhador que não é funcionário.',
    exemploReal: 'Alto: RH live em 6 meses com S/4 Public. Darussalam Assets: menos 75% no tempo de recruitment. Gerdau: onboarding 50% mais rápido. Southwest Gas: LMS + BTP para compliance de campo via QR.',
    ligaA: ['s4hana', 'integration-suite', 'ias', 'joule', 'workzone', 'cloud-alm', 'build', 'hcm-onprem', 'fieldglass'],
    nesteCenario: {
      onprem: 'Atenuado. O default clássico é SAP HCM no ECC/S/4.',
      cloud: 'Activo. HCM do GROW.',
      rise: 'Activo.'
    },
    satelitesHelp: 'Employee Central; Recruiting; Learning; Performance & Goals; Compensation; Succession; 360 Reviews; Opportunity Marketplace; SuccessFactors Work Zone; Time and Attendance by WorkForce Software; Benefits by Benefitfocus'
  },

  {
    id: 'hcm-onprem',
    nome: 'SAP HCM (on-premise)',
    camada: 'lob',
    tipo: 'HR on-prem',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Módulo clássico de RH no ECC / S/4 any-premise: PA, OM, Time, Payroll. Help: ERP HCM HR Support Package Versions, HR Renewal, Best Practices For HCM. Destino estratégico: SuccessFactors.',
    paraQueServe: 'Pagar salários e gerir tempo enquanto o talento já pode estar em SuccessFactors.',
    exemploReal: 'A coexistência HCM on-prem (payroll) + SuccessFactors (Employee Central / Talent) é um dos híbridos mais frequentes da Europa.',
    ligaA: ['ecc', 's4-any', 'successfactors', 'pipo', 'integration-suite'],
    nesteCenario: {
      onprem: 'Activo.',
      cloud: 'Escondido / legado.',
      rise: 'Atenuado. Folha residual on-prem é um padrão real de mistura RISE.'
    }
  },

  {
    id: 'ariba',
    nome: 'SAP Ariba',
    camada: 'lob',
    tipo: 'SaaS Procurement',
    cluster: 'spend',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['spend', 'greenfield', 'brownfield'],
    oQueFaz: 'Suite source-to-pay na cloud. Help: Ariba, Buying, Invoicing, Intake Management, Category Management, Strategic Sourcing, Procurement, Mobile, Contract Price Renegotiation. Trabalha de par com o Business Network e com o MM do S/4. Help ainda lista SRM Server, SLC, Sourcing and CLM como ancestrais.',
    paraQueServe: 'Compras indirectas e colaboração com fornecedores. Mistura spend completa: Ariba + Business Network + Managed Gateway + S/4 MM + Concur + Fieldglass + Taulia + Spend Control Tower + VIM.',
    exemploReal: 'NEOM: Ariba no P2P, registo de fornecedores cerca de menos 80%. Ferrara: Ariba Business Network + GTS. Sonae Arauco: mais 25% de produtividade. SKF: procurement global com Ariba.',
    ligaA: ['s4hana', 'business-network', 'integration-suite', 'managed-gateway', 'signavio', 'joule', 'cloud-alm', 'concur', 'fieldglass', 'taulia', 'gts', 'spend-control-tower', 'vim'],
    nesteCenario: {
      onprem: 'Atenuado (MM clássico / SRM legado).',
      cloud: 'Activo, sobretudo com perfil spend.',
      rise: 'Activo.'
    }
  },

  {
    id: 'business-network',
    nome: 'SAP Business Network',
    camada: 'lob',
    tipo: 'Rede',
    cluster: 'spend',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['spend', 'industria'],
    oQueFaz: 'Rede multi-empresa. Help: Business Network, Business Network for Supply Chain, Asset Collaboration, Logistics Provider, Supply Chain Collaboration clinical trials add-on, project44 Add-Ons, Ariba Network.',
    paraQueServe: 'Sair do e-mail e do PDF. Mistura: S/4 ou Ariba publicam o documento → Business Network → o parceiro responde sem ter SAP.',
    exemploReal: 'O RISE inclui tipicamente um starter da Business Network. Ferrara usou a rede no onboarding de fornecedores e no compliance.',
    ligaA: ['ariba', 's4hana', 'fieldglass', 'taulia', 'tm', 'apm', 'managed-gateway'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Activo com perfil spend.',
      rise: 'Activo. Starter costuma vir no envelope RISE.'
    }
  },

  {
    id: 'concur',
    nome: 'SAP Concur',
    camada: 'lob',
    tipo: 'SaaS T&E',
    cluster: 'spend',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['spend', 'greenfield'],
    oQueFaz: 'Travel, Expense e Invoice na cloud. Help: Concur, Concur Invoice, Concur Travel & Expense.',
    paraQueServe: 'Tirar o T&E do papel. Mistura spend: Concur para o colaborador que viaja, Ariba para o comprador, S/4 para o contabilista.',
    exemploReal: 'NEOM: despesas reembolsadas em dois dias em vez de três ou quatro meses. H.B. Fuller inclui Concur no envelope RISE descrito publicamente.',
    ligaA: ['s4hana', 'ariba', 'ias', 'integration-suite', 'successfactors', 'spend-control-tower'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional no GROW base, recomendado com perfil spend.',
      rise: 'Opcional no envelope mínimo, muito frequente na mistura real.'
    }
  },

  {
    id: 'fieldglass',
    nome: 'SAP Fieldglass',
    camada: 'lob',
    tipo: 'SaaS VMS',
    cluster: 'spend',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['workforce', 'spend'],
    oQueFaz: 'Vendor Management System para workforce externa: temporários, SOW, serviços. Não é SuccessFactors.',
    paraQueServe: 'Onboarding, timesheet, compliance e pagamento de externos.',
    exemploReal: 'Amdocs publicou um caso com SuccessFactors + Fieldglass + S/4HANA, com ganhos de compliance SOX.',
    ligaA: ['successfactors', 'ariba', 'business-network', 's4hana', 'ias', 'managed-gateway'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional, recomendado com perfil workforce.',
      rise: 'Opcional, recomendado com perfil workforce.'
    }
  },

  {
    id: 'taulia',
    nome: 'SAP Taulia',
    camada: 'lob',
    tipo: 'Working capital',
    cluster: 'spend',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['spend'],
    oQueFaz: 'Working capital e supply-chain finance: early payment, dynamic discounting. Help lista também SAP Supplier Financing. A SAP reportou mais de 980 mil milhões de dólares geridos por ano.',
    paraQueServe: 'Libertar caixa sem mudar o processo source-to-pay.',
    exemploReal: 'Número público SAP: Taulia gere mais de 980 mil milhões de dólares por ano.',
    ligaA: ['ariba', 'business-network', 's4hana'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional com perfil spend.',
      rise: 'Opcional com perfil spend.'
    }
  },

  {
    id: 'spend-control-tower',
    nome: 'SAP Spend Control Tower',
    camada: 'lob',
    tipo: 'Analytics Spend',
    cluster: 'spend',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['spend'],
    oQueFaz: 'Torre de visibilidade de spend. Agrega Ariba, S/4 MM, Fieldglass, Concur. Não substitui o Ariba nem o SAC genérico.',
    paraQueServe: 'CFO / CPO a ver o gasto total.',
    exemploReal: 'Entrada autónoma no All Products, família Source-to-Pay.',
    ligaA: ['ariba', 'concur', 'fieldglass', 's4hana', 'sac'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional com perfil spend.',
      rise: 'Opcional com perfil spend.'
    }
  },

  {
    id: 'vim',
    nome: 'SAP Invoice Management by OpenText',
    camada: 'lob',
    tipo: 'AP Invoice',
    cluster: 'spend',
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['spend', 'brownfield'],
    oQueFaz: 'Captura e workflow de facturas de fornecedor (VIM). Help: Invoice Management by OpenText, Information Capture by OpenText, Invoice and Goods Receipt Reconciliation. Na cloud o destino mistura-se com Ariba Invoice + S/4 Central Invoice Management.',
    paraQueServe: 'Tirar a factura de papel/PDF da contabilidade. Mistura spend on-prem: OCR OpenText → VIM → S/4 FI-AP.',
    exemploReal: 'VIM by OpenText é o standard de facto de AP invoice em grupos SAP europeus on-prem.',
    ligaA: ['s4-any', 's4hana', 'ariba', 'ilm'],
    nesteCenario: {
      onprem: 'Activo em AP clássico.',
      cloud: 'Atenuado. Alvo = Ariba Invoice / CIM.',
      rise: 'Opcional. Muitos RISE mantêm VIM no Private Edition.'
    }
  },

  {
    id: 'signavio',
    nome: 'SAP Signavio',
    camada: 'lob',
    tipo: 'Process Intelligence',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'Suite de transformação de processos. Help: Process Transformation Suite, Process Manager, Process Modeler, Process Intelligence, Process Governance, Process Collaboration Hub, Journey Modeler, Process Transformation Manager. Família antiga: Business Process Intelligence e Process Mining by Celonis. Process Navigator traz best practices S/4. A implantação controlada do to-be é o sítio onde entra o card Deploy with Confidence.',
    paraQueServe: 'Fit-gap honesto. As-is minerado, to-be desenhado, gap transformado em requisitos do Cloud ALM.',
    exemploReal: 'Vodafone Procurement: 11 mil modelos migrados de ARIS; 284 milhões de cases em Process Intelligence; 82 reports Celonis migrados para SAC. Alto: Process Navigator reduziu documentação cerca de 30%.',
    ligaA: ['s4hana', 'btp', 'ariba', 'cloud-alm', 'leanix', 'sac', 'dwc', 'build', 'btc'],
    nesteCenario: {
      onprem: 'Activo como ferramenta de preparação.',
      cloud: 'Activo. Fit-to-standard do GROW.',
      rise: 'Activo. Toolchain de processo da metodologia RISE.'
    },
    satelitesHelp: 'Process Transformation Suite; Process Manager; Process Modeler; Process Intelligence; Process Governance; Process Collaboration Hub; Journey Modeler; Process Transformation Manager; Process Mining by Celonis; Business Process Intelligence'
  },

  {
    id: 'sac',
    nome: 'SAP Analytics Cloud',
    camada: 'lob',
    tipo: 'Analytics + Planning',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'BI, predictive e enterprise planning na cloud. Help lista também Analytics Hub e o add-in PowerPoint. Face analítica da Business Data Cloud. Destino estratégico do parque BusinessObjects.',
    paraQueServe: 'Closing comments, forecast, dashboards de direcção, planeamento integrado.',
    exemploReal: 'Vodafone migrou 82 reports para SAC. NEOM usou BW/4 + SAC. Shanxi Antai: BTP + SAC para gestão de carbono.',
    ligaA: ['datasphere', 's4hana', 'bdc', 'joule', 'signavio', 'hana-cloud', 'businessobjects', 'bw4', 'analysis-office', 'papm'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Activo.',
      rise: 'Activo.'
    }
  },

  {
    id: 'joule',
    nome: 'Joule + SAP Business AI',
    camada: 'lob',
    tipo: 'AI / Assistente',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    corAcento: 'var(--color-accent-ia)',
    oQueFaz: 'Copiloto e agentes com contexto de processo SAP. Help: Joule e Joule for Developers ABAP AI Capabilities. CoPilot é o ancestral. Domínios: Autonomous Finance, Spend, SCM, HCM, CX. Joule Studio para construir agentes; AI Agent Hub para os governar.',
    paraQueServe: 'Perguntar o estado de uma PO, lançar uma acção em SuccessFactors, explicar um desvio em SAC.',
    exemploReal: 'H&M: Store Intelligence Agent sobre RISE + Business Data Cloud + Commerce Cloud + SuccessFactors. A SAP anunciou compromisso contratual de activar assistentes Joule no primeiro ano RISE.',
    ligaA: ['s4hana', 'btp', 'bdc', 'successfactors', 'ariba', 'sac', 'cloud-alm', 'ai-foundation', 'commerce-cloud'],
    nesteCenario: {
      onprem: 'Irrelevante no default.',
      cloud: 'Activo.',
      rise: 'Activo.'
    }
  },

  {
    id: 'ibp',
    nome: 'SAP Integrated Business Planning',
    camada: 'lob',
    tipo: 'SaaS Planning',
    cluster: 'supply',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Planeamento de supply chain na cloud: S&OP, demand, inventory, response & supply. Sucessor conceptual do APO. Help lista IBP Integration Enhancements, Advanced Planning and Optimization e Sales and Operations Planning.',
    paraQueServe: 'Alinhar vendas, operações e finanças num plano.',
    exemploReal: 'Ferrara incluiu IBP no landscape RISE publicado.',
    ligaA: ['s4hana', 'ewm', 'tm', 'digital-manufacturing', 'sac', 'btp', 'fnr'],
    nesteCenario: {
      onprem: 'Atenuado (APO legado / PP clássico).',
      cloud: 'Opcional. Recomendado com perfil indústria.',
      rise: 'Opcional. Recomendado com perfil indústria.'
    }
  },

  {
    id: 'ewm',
    nome: 'SAP EWM',
    camada: 'lob',
    tipo: 'Warehouse',
    cluster: 'supply',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Extended Warehouse Management. Help: Digital Supply Chain Management edition for S/4HANA e S/4HANA Supply Chain. Não é o WM clássico do ECC.',
    paraQueServe: 'Operar armazéns complexos.',
    exemploReal: 'EWM embedded é peça standard dos go-lives industriais S/4 (Ferrara referiu EWM/MDG/GTS no big-bang).',
    ligaA: ['s4hana', 's4-any', 'tm', 'ibp', 'digital-manufacturing', 'business-network', 'yard-logistics', 'warehouse-insights'],
    nesteCenario: {
      onprem: 'Activo quando o on-prem tem armazém avançado.',
      cloud: 'Opcional (scope Public mais curto).',
      rise: 'Opcional no envelope mínimo, frequente em perfil indústria.'
    }
  },

  {
    id: 'tm',
    nome: 'SAP Transportation Management',
    camada: 'lob',
    tipo: 'Transportes',
    cluster: 'supply',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Planeamento e execução de transportes. Help: S/4HANA Supply Chain for transportation management e Transportation Resource Planning.',
    paraQueServe: 'Sair da folha de Excel do despachante.',
    exemploReal: 'Pacotes RISE de Digital Supply Chain posicionam TM ao lado de EWM e IBP.',
    ligaA: ['s4hana', 's4-any', 'ewm', 'ibp', 'business-network', 'yard-logistics'],
    nesteCenario: {
      onprem: 'Activo em landscapes logísticos.',
      cloud: 'Opcional.',
      rise: 'Opcional, recomendado com perfil indústria.'
    }
  },

  {
    id: 'digital-manufacturing',
    nome: 'SAP Digital Manufacturing',
    camada: 'lob',
    tipo: 'MES Cloud',
    cluster: 'supply',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'MES na cloud. Help: Digital Manufacturing, Production Connector, Shop Floor Manager, Complex Assembly Manufacturing, Complex Manufacturing Accelerator.',
    paraQueServe: 'Chão de fábrica. Mistura híbrida clássica: S/4 Private Edition + DM + Cloud Connector / EIC + APM + EWM.',
    exemploReal: 'Pacotes RISE de Production da SAP assentam em Digital Manufacturing.',
    ligaA: ['s4hana', 'apm', 'ewm', 'ibp', 'cloud-connector', 'eic', 'event-mesh', 'ipd'],
    nesteCenario: {
      onprem: 'Atenuado (MES legado / ME / MII).',
      cloud: 'Opcional com perfil indústria.',
      rise: 'Recomendado com perfil indústria.'
    }
  },

  {
    id: 'apm',
    nome: 'SAP Asset Performance Management',
    camada: 'lob',
    tipo: 'Asset SaaS',
    cluster: 'supply',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Estratégia e performance de activos. Help: Asset Performance Management, Enterprise Asset Management, Enhanced Maintenance and Service Planning, Asset Manager.',
    paraQueServe: 'Passar de manutenção calendário a manutenção por condição.',
    exemploReal: 'Pacotes RISE de Asset Management combinam APM + Field Service + EAM do S/4.',
    ligaA: ['s4hana', 'digital-manufacturing', 'business-network', 'fsm', 'service-asset-manager'],
    nesteCenario: {
      onprem: 'Atenuado (PM clássico).',
      cloud: 'Opcional com perfil indústria.',
      rise: 'Opcional com perfil indústria.'
    }
  },

  {
    id: 'yard-logistics',
    nome: 'SAP Yard Logistics',
    camada: 'lob',
    tipo: 'Yard',
    cluster: 'supply',
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Gestão do recinto: check-in de camiões, docas, movimentação no pátio. Senta-se entre TM e EWM.',
    paraQueServe: 'Cais e pátios pesados.',
    exemploReal: 'Produto autónomo no All Products, família Digital Supply Chain.',
    ligaA: ['tm', 'ewm', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional em logística pesada.',
      cloud: 'Raro no Public Edition.',
      rise: 'Opcional com perfil indústria / logística.'
    }
  },

  {
    id: 'warehouse-insights',
    nome: 'SAP Warehouse Insights / Robotics',
    camada: 'lob',
    tipo: 'Warehouse add-on',
    cluster: 'supply',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Help: Warehouse Insights, Warehouse Robotics, Warehouse Operator. Optimização e robótica em cima do EWM.',
    paraQueServe: 'OEE do armazém e frota robótica.',
    exemploReal: 'Três entradas distintas no All Products, à volta do EWM.',
    ligaA: ['ewm', 's4hana', 'digital-manufacturing'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional com perfil indústria e armazém automatizado.'
    }
  },

  {
    id: 'ipd',
    nome: 'SAP Integrated Product Development',
    camada: 'lob',
    tipo: 'PLM Cloud',
    cluster: 'supply',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'PLM / engenharia na cloud. Help: IPD, PLM, Product Lifecycle Costing, PLM system integration para S/4 / ERP / 3DEXPERIENCE / Autodesk Vault / Windchill, Teamcenter by Siemens, 3D Visual Enterprise.',
    paraQueServe: 'Desenhar o produto e o custo-alvo antes da ordem de produção.',
    exemploReal: 'H.B. Fuller listou PLM no perímetro RISE.',
    ligaA: ['s4hana', 'mdg', 'digital-manufacturing', 'footprint-management'],
    nesteCenario: {
      onprem: 'Atenuado (PLM on-prem clássico).',
      cloud: 'Opcional.',
      rise: 'Opcional com perfil indústria de produto.'
    },
    satelitesHelp: 'Integrated Product Development; PLM; Product Lifecycle Costing; Teamcenter by Siemens; 3D Visual Enterprise; PLM system integration 3DEXPERIENCE / Vault / Windchill'
  },

  {
    id: 'gbt',
    nome: 'SAP Global Batch Traceability',
    camada: 'lob',
    tipo: 'Rastreio',
    cluster: 'supply',
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['industria', 'regulado'],
    oQueFaz: 'Rastreio de lote ponta-a-ponta. Help: Global Batch Traceability e GBT on S/4HANA. Crítico em pharma, food, chemicals. Help também lista Advanced Track and Trace for Pharmaceuticals.',
    paraQueServe: 'Recall em minutos, não em semanas. Mistura regulada: S/4 lote → GBT → EHS / qualidade.',
    exemploReal: 'GBT e ATTP são produtos autónomos no All Products, família Life Sciences / qualidade.',
    ligaA: ['s4hana', 's4-any', 'ehs', 'digital-manufacturing'],
    nesteCenario: {
      onprem: 'Opcional / activo em pharma e food.',
      cloud: 'Opcional.',
      rise: 'Opcional com perfil indústria / regulado.'
    }
  },

  {
    id: 'event-management',
    nome: 'SAP Event Management',
    camada: 'lob',
    tipo: 'Visibilidade logística',
    cluster: 'supply',
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Track-and-trace de eventos de cadeia (embarque, atraso, prova de entrega). Help: Event Management e Event Management on S/4HANA. Destino cloud mistura-se com Business Network e TM.',
    paraQueServe: 'Saber onde vai a mercadoria. Mistura: TM planeia → Event Management / Network vê o evento.',
    exemploReal: 'Produto clássico no All Products da família SCM.',
    ligaA: ['tm', 's4-any', 's4hana', 'business-network'],
    nesteCenario: {
      onprem: 'Opcional em logística.',
      cloud: 'Atenuado.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'fnr',
    nome: 'SAP Forecasting and Replenishment',
    camada: 'lob',
    tipo: 'Reposição retalho',
    cluster: 'supply',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Help: Forecasting and Replenishment for Retail e Predictive Replenishment. Reposição de loja e DC no retalho. Complementa IBP (que planeia a rede) no último quilómetro da gôndola.',
    paraQueServe: 'Não faltar leite na prateleira. Mistura retalho: IBP + F&R / Predictive Replenishment + EWM + Customer Checkout.',
    exemploReal: 'Duas entradas All Products na família Retail.',
    ligaA: ['ibp', 'ewm', 's4hana', 'customer-checkout'],
    nesteCenario: {
      onprem: 'Opcional em retalho.',
      cloud: 'Opcional.',
      rise: 'Opcional em retalho.'
    }
  },

  {
    id: 'returns-management',
    nome: 'SAP Intelligent Returns Management',
    camada: 'lob',
    tipo: 'Devoluções',
    cluster: 'supply',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'industria'],
    oQueFaz: 'Devoluções inteligentes (omnichannel). Help: Intelligent Returns Management e Recommerce. Fecha o ciclo commerce / retalho.',
    paraQueServe: 'Reverse logistics. Mistura CX+supply: Commerce / Checkout → Returns → EWM → S/4 crédito.',
    exemploReal: 'Intelligent Returns e Recommerce listados no All Products.',
    ligaA: ['commerce-cloud', 'ewm', 's4hana', 'customer-checkout'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional em commerce.',
      rise: 'Opcional em commerce.'
    }
  },

  /* ======================== L5 LoB (parte 2) ======================== */

  {
    id: 'commerce-cloud',
    nome: 'SAP Commerce Cloud',
    camada: 'lob',
    tipo: 'SaaS CX',
    cluster: 'cx',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield'],
    oQueFaz: 'Plataforma de commerce (ex-Hybris). Help: composable storefront e accelerators, Search Service, Open Payment Framework, localization for China, Marketplace Management by Mirakl.',
    paraQueServe: 'Canal digital. Mistura CX: Commerce + Emarsys + Sales Cloud + Service Cloud + Customer Data Cloud + S/4 + Joule.',
    exemploReal: 'H&M usou Commerce Cloud no demo Sapphire 2026 do InStore Concierge. Cintas publicou BTP + Commerce Cloud + Concur + CX + SuccessFactors.',
    ligaA: ['s4hana', 'sales-cloud', 'service-cloud', 'emarsys', 'customer-data-cloud', 'joule', 'integration-suite', 'bdc', 'order-management', 'cpq'],
    nesteCenario: {
      onprem: 'Atenuado (hybris on-prem legado).',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'sales-cloud',
    nome: 'SAP Sales Cloud',
    camada: 'lob',
    tipo: 'SaaS CX',
    cluster: 'cx',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield'],
    oQueFaz: 'CRM de vendas. Help documenta Sales Cloud Version 2 e o pacote Sales Cloud and Service Cloud Version 2. Ancestral: Hybris Cloud for Customer.',
    paraQueServe: 'O vendedor. Mistura: Sales Cloud ganha a oportunidade → CPQ configura → S/4 fatura → Service Cloud faz o pós-venda.',
    exemploReal: 'A suite SAP CX é o destino do antigo C/4HANA.',
    ligaA: ['commerce-cloud', 'service-cloud', 's4hana', 'integration-suite', 'joule', 'cpq', 'emarsys'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'service-cloud',
    nome: 'SAP Service Cloud',
    camada: 'lob',
    tipo: 'SaaS CX',
    cluster: 'cx',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['industria', 'greenfield'],
    oQueFaz: 'CRM de serviço. Help: Service Cloud, Service Cloud Version 2, Self-Service Accelerator for Utilities by SEW.',
    paraQueServe: 'Pós-venda e assistência.',
    exemploReal: 'A SAP posiciona Service Cloud + FSM nos pacotes de Asset Management e Autonomous CX.',
    ligaA: ['sales-cloud', 'commerce-cloud', 's4hana', 'apm', 'joule', 'fsm', 'entitlement-management'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional, recomendado com perfil indústria.'
    }
  },

  {
    id: 'emarsys',
    nome: 'SAP Emarsys (Engagement Cloud)',
    camada: 'lob',
    tipo: 'SaaS CX',
    cluster: 'cx',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield'],
    oQueFaz: 'Marketing automation. Help: Emarsys, Emarsys Account Engagement, Engagement Cloud. Marketing / Marketing Cloud é a linha anterior.',
    paraQueServe: 'Campanhas e personalização.',
    exemploReal: 'A SAP posiciona Emarsys como o pilar Marketing da suite CX no índice oficial.',
    ligaA: ['commerce-cloud', 'sales-cloud', 'customer-data-cloud', 's4hana', 'joule'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'customer-data-cloud',
    nome: 'SAP Customer Data Cloud',
    camada: 'lob',
    tipo: 'SaaS CX',
    cluster: 'cx',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'regulado'],
    oQueFaz: 'CIAM e perfil de consumidor. Distinto do IAS e do Business Data Cloud.',
    paraQueServe: 'Login da loja, consentimento GDPR/CNPD, perfil único.',
    exemploReal: 'Help agrupa Customer experience > Customer data como área própria da suite CX.',
    ligaA: ['commerce-cloud', 'emarsys', 'ias', 'sales-cloud'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional se houver canal digital consumidor.',
      rise: 'Opcional se houver canal digital consumidor.'
    },
    naoConfundir: 'Não é SAP Cloud Identity Services (IAS/IPS). Não é Business Data Cloud.'
  },

  {
    id: 'cpq',
    nome: 'SAP CPQ',
    camada: 'lob',
    tipo: 'SaaS CX',
    cluster: 'cx',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'industria'],
    oQueFaz: 'Configure, Price and Quote. Help: CPQ e Solution Sales Configuration (cloud / S/4 / Commerce).',
    paraQueServe: 'Vendas configuráveis.',
    exemploReal: 'A Help lista CPQ e Solution Sales Configuration como produtos distintos do Sales Cloud.',
    ligaA: ['sales-cloud', 'commerce-cloud', 's4hana'],
    nesteCenario: {
      onprem: 'Atenuado (VC / SSC on-prem).',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'fsm',
    nome: 'SAP Field Service Management',
    camada: 'lob',
    tipo: 'SaaS CX',
    cluster: 'cx',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Despacho de técnicos de campo. Help: Field Service Management e Field Service and Asset Management.',
    paraQueServe: 'Assistência no activo. Mistura: APM ou S/4 EAM → FSM → Service and Asset Manager → S/4.',
    exemploReal: 'Coresystems foi absorvido para esta família. Pacotes RISE de Asset Management combinam FSM + APM + EAM.',
    ligaA: ['service-cloud', 'service-asset-manager', 's4hana', 'apm'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional com perfil indústria.'
    }
  },

  {
    id: 'service-asset-manager',
    nome: 'SAP Service and Asset Manager',
    camada: 'lob',
    tipo: 'App móvel',
    cluster: 'supply',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'App móvel de manutenção e serviço. Substitui conceptualmente Work Manager, Inventory Manager, Rounds Manager e Maintenance Assistant.',
    paraQueServe: 'Mãos no activo.',
    exemploReal: 'Help ainda documenta Work Manager / Inventory Manager / Rounds Manager / Maintenance Assistant como linha clássica.',
    ligaA: ['s4hana', 'fsm', 'apm', 'digital-manufacturing'],
    nesteCenario: {
      onprem: 'Activo em manutenção de activos.',
      cloud: 'Opcional.',
      rise: 'Opcional com perfil indústria.'
    }
  },

  {
    id: 'order-management',
    nome: 'SAP Order Management',
    camada: 'lob',
    tipo: 'SaaS CX',
    cluster: 'cx',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield'],
    oQueFaz: 'Help: Order Management Foundation, Order Management for Sourcing and Availability, Order and Delivery Scheduling.',
    paraQueServe: 'Orquestração omnichannel antes do S/4.',
    exemploReal: 'A Help separa Order Management de Commerce Cloud e de S/4 SD.',
    ligaA: ['commerce-cloud', 's4hana', 'ewm', 'customer-checkout'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional em retalho omnichannel.',
      rise: 'Opcional em retalho omnichannel.'
    }
  },

  {
    id: 'customer-checkout',
    nome: 'SAP Customer Checkout',
    camada: 'lob',
    tipo: 'POS',
    cluster: 'cx',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['greenfield'],
    oQueFaz: 'Ponto de venda. Help: Customer Checkout e edições cloud. Linha adjacente: Omnichannel POS by GK, Enterprise POS, Offline Mobile Store by GK, Store Management by GK, Dynamic Pricing by GK.',
    paraQueServe: 'Loja física.',
    exemploReal: 'Várias gerações de POS no All Products. Customer Checkout cloud é o alvo PME/retalho SAP-nativo.',
    ligaA: ['commerce-cloud', 'order-management', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional em retalho.',
      cloud: 'Opcional em retalho.',
      rise: 'Opcional em retalho.'
    }
  },

  {
    id: 'entitlement-management',
    nome: 'SAP Entitlement Management',
    camada: 'lob',
    tipo: 'SaaS CX',
    cluster: 'cx',
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield'],
    oQueFaz: 'Direitos do cliente sobre subscrições, licenças e uso.',
    paraQueServe: 'Software e serviços recorrentes. Mistura: S/4 ou BRIM fatura → Entitlement autoriza o uso.',
    exemploReal: 'Produto autónomo no All Products, ao lado da família CX e de BRIM.',
    ligaA: ['s4hana', 'brim', 'commerce-cloud', 'service-cloud'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional em subscription.',
      rise: 'Opcional em subscription.'
    }
  },

  {
    id: 'sustainability',
    nome: 'SAP Sustainability Control Tower',
    camada: 'lob',
    tipo: 'Sustentabilidade',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['regulado', 'industria'],
    oQueFaz: 'Torre de controlo ESG. Help: Control Tower, Sustainability Solutions, Sustainability Performance Management.',
    paraQueServe: 'Reporte CSRD / emissões ao nível do grupo.',
    exemploReal: 'Shanxi Antai publicou gestão de carbono ponta-a-ponta com BTP e SAC.',
    ligaA: ['s4hana', 'sac', 'ehs', 'btp', 'footprint-management', 'green-ledger'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional com perfil regulado.',
      rise: 'Opcional com perfil regulado / indústria.'
    }
  },

  {
    id: 'footprint-management',
    nome: 'SAP Sustainability Footprint Management',
    camada: 'lob',
    tipo: 'Sustentabilidade',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['regulado', 'industria'],
    oQueFaz: 'Cálculo de pegada. Help: Footprint Management, Sustainability Data Exchange, Responsible Design and Production.',
    paraQueServe: 'Saber a pegada do artigo e partilhá-la.',
    exemploReal: 'Quatro entradas distintas no All Products sob Sustainability Solutions.',
    ligaA: ['sustainability', 'green-ledger', 's4hana', 'business-network', 'ipd'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'green-ledger',
    nome: 'SAP Green Ledger',
    camada: 'lob',
    tipo: 'Sustentabilidade',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['regulado', 'industria'],
    oQueFaz: 'Contabilidade de emissões no livro do S/4. Help: Green Ledger e Green Token.',
    paraQueServe: 'CSRD com rasto contabilístico.',
    exemploReal: 'SAC tem conteúdo Green Ledger Reporting for S/4HANA and S/4HANA Cloud.',
    ligaA: ['s4hana', 'sustainability', 'footprint-management', 'sac'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'ehs',
    nome: 'SAP EHS',
    camada: 'lob',
    tipo: 'Ambiente e segurança',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria', 'regulado'],
    oQueFaz: 'Environment, Health and Safety. Help: EHS Management, EHS Regulatory Content, Environmental Compliance, Management of Change.',
    paraQueServe: 'Segurança operacional e auditoria ambiental.',
    exemploReal: 'H.B. Fuller incluiu EHS Management no perímetro RISE publicado.',
    ligaA: ['s4hana', 's4-any', 'apm', 'sustainability', 'grc', 'digital-manufacturing', 'gbt'],
    nesteCenario: {
      onprem: 'Activo em indústrias reguladas.',
      cloud: 'Opcional.',
      rise: 'Opcional com perfil indústria / regulado.'
    }
  },

  {
    id: 'grc',
    nome: 'SAP GRC / Access Control',
    camada: 'lob',
    tipo: 'Risco e controlo',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado', 'brownfield'],
    oQueFaz: 'Governance, Risk and Compliance. Help: GRC, Access Control, Process Control, Risk Management, GRC for HANA, Financial Compliance Management, Access Violation Management by Greenlight.',
    paraQueServe: 'Auditoria, SOX, SoD.',
    exemploReal: 'Ferrara referiu GRC no big-bang RISE. Amdocs publicou 100% SOX compliance.',
    ligaA: ['s4hana', 's4-any', 'ias', 'iag', 'gts', 'cloud-alm', 'document-compliance'],
    nesteCenario: {
      onprem: 'Activo em landscapes auditados.',
      cloud: 'Opcional com perfil regulado.',
      rise: 'Opcional com perfil regulado.'
    }
  },

  {
    id: 'gts',
    nome: 'SAP GTS (Global Trade)',
    camada: 'lob',
    tipo: 'Comércio externo',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado', 'spend', 'industria'],
    oQueFaz: 'Global Trade Services: sanctioned party, embargo, classificação aduaneira, declarações.',
    paraQueServe: 'Não vender ao destino errado e não falhar a alfândega.',
    exemploReal: 'Ferrara Candy: Ariba Business Network + GTS co-hosted para sanctioned parties.',
    ligaA: ['s4hana', 's4-any', 'ariba', 'grc', 'document-compliance'],
    nesteCenario: {
      onprem: 'Activo em exportadores.',
      cloud: 'Opcional.',
      rise: 'Opcional com perfil regulado / spend internacional.'
    }
  },

  {
    id: 'document-compliance',
    nome: 'SAP Document and Reporting Compliance',
    camada: 'lob',
    tipo: 'Compliance fiscal',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Factura electrónica e reporte legal. Help: DRC Cloud Edition, Document Compliance, Digital Compliance India, Electronic Invoicing Brazil, Peppol guides, Tax Declaration Framework Brazil.',
    paraQueServe: 'e-invoice, SAF-T, Peppol. O card é a plataforma, não cada localização-país.',
    exemploReal: 'Família enorme no All Products porque cada país tem um conector.',
    ligaA: ['s4hana', 's4-any', 'gts', 'grc'],
    nesteCenario: {
      onprem: 'Activo em países com mandato de e-document.',
      cloud: 'Activo. Peça do GROW mínimo honesto.',
      rise: 'Activo.'
    },
    satelitesHelp: 'DRC Cloud Edition; Digital Compliance Service for India; Electronic Invoicing for Brazil; Peppol Implementation Guides; Tax Declaration Framework for Brazil; Tax Intelligence by All Tax'
  },

  {
    id: 'brim',
    nome: 'SAP BRIM',
    camada: 'lob',
    tipo: 'Billing de subscrição',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['greenfield'],
    oQueFaz: 'Billing and Revenue Innovation Management. Help: BRIM, Convergent Mediation by DigitalRoute, Contract Accounts Receivable and Payable.',
    paraQueServe: 'Monetizar uso e subscrição (telco, utilities, software).',
    exemploReal: 'All Products lista BRIM como família própria, distinta do SD billing clássico.',
    ligaA: ['s4hana', 'entitlement-management', 'commerce-cloud', 'rar'],
    nesteCenario: {
      onprem: 'Activo em telco/utilities/subscription on-prem.',
      cloud: 'Opcional.',
      rise: 'Opcional. Private Edition cabe BRIM pesado.'
    }
  },

  {
    id: 'iot',
    nome: 'SAP Internet of Things',
    camada: 'lob',
    tipo: 'IoT',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Camada IoT da SAP. Help: SAP Internet of Things (SAP IoT), Auto-ID Infrastructure. Alimenta APM, Digital Manufacturing e Event Mesh com telemetria. Muitos cenários novos passam por BTP Kyma + Event Mesh em vez do produto IoT clássico.',
    paraQueServe: 'Ligar sensores ao processo. Mistura indústria: IoT / Auto-ID → Event Mesh → APM ou DM → S/4.',
    exemploReal: 'IoT e Auto-ID Infrastructure listados no All Products. Auto-ID é a linha RFID clássica.',
    ligaA: ['apm', 'digital-manufacturing', 'event-mesh', 's4hana', 'btp'],
    nesteCenario: {
      onprem: 'Atenuado (Auto-ID / MII).',
      cloud: 'Opcional.',
      rise: 'Opcional com perfil indústria.'
    }
  },

  {
    id: 'real-estate',
    nome: 'SAP Cloud for Real Estate / RE-FX',
    camada: 'lob',
    tipo: 'Imobiliário',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Imobiliário. Help: Cloud for Real Estate, Real Estate Management e add-on Tenant Relationship Management.',
    paraQueServe: 'Contratos de arrendamento, espaço, IFRS 16. Mistura: RE-FX / Cloud for Real Estate + S/4 FI + SAC.',
    exemploReal: 'Duas gerações no All Products: RE-FX clássico e Cloud for Real Estate.',
    ligaA: ['s4hana', 's4-any', 'sac'],
    nesteCenario: {
      onprem: 'Opcional (RE-FX).',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'industry-cloud',
    nome: 'SAP Industry Cloud',
    camada: 'lob',
    tipo: 'Vertical',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Camada de soluções verticais. Help: Industry Cloud Enterprise Agreement, Industry Process Framework, SAP for Banking, Insurance, Healthcare, Utilities, Waste and Recycling, Intelligent Agriculture, Batch Release Hub for Life Sciences, Intelligent Clinical Supply Management, Sports One. Card-guarda-chuva. Cloud for Energy, Digital Vehicle e Fashion têm cards próprios porque mudam a mistura.',
    paraQueServe: 'Lembrar que S/4 + BTP não chega em utilities, auto, life sciences, agro.',
    exemploReal: 'All Products tem secções SAP for Banking, Insurance, Healthcare, Utilities, Waste and Recycling.',
    ligaA: ['s4hana', 'btp', 'cloud-for-energy', 'digital-vehicle', 'fashion'],
    nesteCenario: {
      onprem: 'Atenuado (IS-* clássicos).',
      cloud: 'Opcional vertical.',
      rise: 'Opcional vertical.'
    },
    satelitesHelp: 'SAP for Banking; Insurance; Healthcare; Utilities; Waste and Recycling; Intelligent Agriculture; Batch Release Hub; Intelligent Clinical Supply; Sports One; Deposits Management; Card Management; Underwriting; Claims Management'
  },

  {
    id: 'cloud-for-energy',
    nome: 'SAP Cloud for Energy',
    camada: 'lob',
    tipo: 'Utilities',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['industria', 'regulado'],
    oQueFaz: 'Suite cloud de energia. Help: Cloud for Energy, Market Communication, Market Process Management, Energy Data Management, Energy Portfolio Management, Intelligent Metering DE, Pricing and Costing for Utilities, Multichannel Foundation for Utilities.',
    paraQueServe: 'Mercado, medição, comunicação de mercado.',
    exemploReal: 'Família Utilities no All Products. Clientes DE/AT usam Market Communication + EDM.',
    ligaA: ['industry-cloud', 's4hana', 'eic', 'document-compliance'],
    nesteCenario: {
      onprem: 'Atenuado (IS-U).',
      cloud: 'Opcional vertical.',
      rise: 'Opcional vertical, recomendado em utilities.'
    }
  },

  {
    id: 'digital-vehicle',
    nome: 'SAP Digital Vehicle Hub / Suite',
    camada: 'lob',
    tipo: 'Automotive',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Help: Digital Vehicle Hub, Operations, Suite, E-Mobility. Gémeo digital e operações do veículo.',
    paraQueServe: 'OEM e frotas.',
    exemploReal: 'Três entradas All Products + E-Mobility.',
    ligaA: ['industry-cloud', 's4hana', 'digital-manufacturing', 'apm', 'fsm'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional vertical.',
      rise: 'Opcional vertical auto.'
    }
  },

  {
    id: 'fashion',
    nome: 'SAP Fashion / Apparel and Footwear',
    camada: 'lob',
    tipo: 'Retail moda',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Help: Fashion Management, Apparel and Footwear, MDG retail and fashion extension by Prometheus Group.',
    paraQueServe: 'Variantes, épocas, grelhas de tamanhos.',
    exemploReal: 'AFS / Fashion Management decidem muitas vezes Private Edition vs Public.',
    ligaA: ['industry-cloud', 's4hana', 'commerce-cloud', 'ewm', 'ibp', 'mdg'],
    nesteCenario: {
      onprem: 'Activo em clientes AFS/Fashion.',
      cloud: 'Opcional — Public pode ficar curto.',
      rise: 'Opcional, frequentemente a razão para Private Edition.'
    }
  },

  /* ======================== L6 ALM / TRANSFORMAÇÃO ======================== */

  {
    id: 'cloud-alm',
    nome: 'SAP Cloud ALM',
    aliases: ['Cloud ALM', 'CALM', 'ALM cloud', 'application lifecycle'],
    camada: 'alm',
    tipo: 'ALM SaaS',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield', 'regulado'],
    oQueFaz: 'Application Lifecycle Management cloud-native. Quatro planos: Implementação (Activate, sprints, requisitos, testes, features, quality gates); Operações (health, integration/exception, job monitoring, BPM); Analytics do landscape; Observabilidade de agentes Joule. Inclui o dashboard RISE Methodology / System View de clean core. Incluído em RISE e GROW via Enterprise Support, Cloud Editions — pede-se o tenant em SAP for Me.',
    paraQueServe: 'Mission control da mistura GROW ou RISE. Traduz o to-be do Signavio em requisitos e testes; mede o clean core. Face visível da disciplina Deploy with Confidence.',
    exemploReal: 'A SAP descreve Cloud ALM como backbone da toolchain agent-led da metodologia RISE. O próprio produto Cloud ALM é construído internamente com Deploy with Confidence.',
    ligaA: ['s4hana', 'btp', 'integration-suite', 'signavio', 'dwc', 'joule', 'ias', 'solman', 'leanix', 'successfactors', 'ariba', 'focused-run', 'walkme', 'enable-now', 'btc', 'tricentis', 'sap-for-me', 'iag'],
    nesteCenario: {
      onprem: 'Disponível se houver Enterprise Support, mas o default é Solution Manager. Card atenuado.',
      cloud: 'ALM por omissão do GROW.',
      rise: 'ALM por omissão do RISE. Dashboard RISE Methodology / System View.'
    }
  },

  {
    id: 'solman',
    nome: 'SAP Solution Manager',
    camada: 'alm',
    tipo: 'ALM on-prem',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: ['brownfield', 'regulado'],
    oQueFaz: 'ALM clássico: ChaRM, ITSM, documentação, Test Suite, monitoring, Custom Code Management. Fim da manutenção mainstream: final de 2027. RISE puro NÃO inclui usage rights de SolMan.',
    paraQueServe: 'Mission control do on-prem. Destino estratégico: Cloud ALM (Readiness Check, nota 3236443).',
    exemploReal: 'A SAP agenda o EoM mainstream do Solution Manager para o final de 2027.',
    ligaA: ['s4-any', 'ecc', 'pipo', 'dc-onprem', 'cloud-alm', 'netweaver', 'focused-run', 'tricentis'],
    nesteCenario: {
      onprem: 'Card principal de L6.',
      cloud: 'Escondido.',
      rise: 'Atenuado. Default é Cloud ALM.'
    }
  },

  {
    id: 'focused-run',
    nome: 'SAP Focused Run',
    camada: 'alm',
    tipo: 'Ops avançado',
    cluster: null,
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['regulado', 'industria'],
    oQueFaz: 'Monitoring de alto volume para service providers e landscapes muito grandes.',
    paraQueServe: 'Quem opera dezenas ou centenas de sistemas SAP.',
    exemploReal: 'A SAP lista três ALM estratégicos: Cloud ALM, Solution Manager, Focused Run. Não há paridade entre os três.',
    ligaA: ['solman', 'cloud-alm', 's4-any', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional em operadores e grupos muito grandes.',
      cloud: 'Irrelevante no GROW típico.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'leanix',
    nome: 'SAP LeanIX',
    camada: 'alm',
    tipo: 'Enterprise Architecture',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['brownfield', 'greenfield'],
    oQueFaz: 'Inventário vivo de aplicações, interfaces e capacidades. Help: LeanIX, Enterprise Architecture Designer, Enterprise Architecture Framework.',
    paraQueServe: 'Saber o que existe antes de misturar.',
    exemploReal: 'Toolchain SAP de transformação: LeanIX + Signavio + WalkMe + Cloud ALM.',
    ligaA: ['cloud-alm', 'signavio', 's4hana', 'btp', 'walkme', 'dwc'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Activo em transformações GROW multi-app.',
      rise: 'Activo.'
    }
  },

  {
    id: 'walkme',
    nome: 'WalkMe',
    camada: 'alm',
    tipo: 'Digital adoption',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'Digital adoption. Help: WalkMe Digital Adoption. Guias in-app sobre Fiori, SuccessFactors, Ariba.',
    paraQueServe: 'Evitar que um S/4 Fiori impecável morra na adopção.',
    exemploReal: 'Fact sheets RISE listam Signavio + LeanIX + WalkMe como toolchain de transformação.',
    ligaA: ['signavio', 'leanix', 'enable-now', 'fiori', 'cloud-alm', 'successfactors'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Opcional, útil em GROW.',
      rise: 'Opcional, frequente no envelope de transformação.'
    }
  },

  {
    id: 'enable-now',
    nome: 'SAP Enable Now',
    camada: 'alm',
    tipo: 'Formação',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'Autoría e entrega de formação in-app. Help: Enable Now e Knowledge Acceleration. Diferente do WalkMe e do SuccessFactors Learning.',
    paraQueServe: 'Enablement do go-live.',
    exemploReal: 'Programas Activate clássicos incluem Enable Now como standard de enablement.',
    ligaA: ['walkme', 'signavio', 'successfactors', 'fiori', 'cloud-alm'],
    nesteCenario: {
      onprem: 'Activo.',
      cloud: 'Activo / opcional.',
      rise: 'Activo / opcional.'
    }
  },

  {
    id: 'dwc',
    nome: 'Deploy with Confidence (DwC)',
    aliases: ['Deploy with Confidence', 'DwC', 'deploy with confidence'],
    camada: 'alm',
    tipo: 'Método',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    corAcento: 'var(--color-accent-metodo)',
    oQueFaz: 'Paved road interna da engenharia SAP para entregar software SaaS todos os dias com qualidade: trunk-based development, testes automatizados, feature toggles, daily deploy, zero-downtime na perspectiva do tenant. Nasceu como iniciativa de Operational Excellence (finalista do Hasso Plattner Founders\u2019 Award 2020). NÃO é um SKU, NÃO aparece no contrato do cliente, NÃO é o antigo Data Warehouse Cloud.',
    paraQueServe: 'Dois papéis. Primeiro: explicar a cadência de Cloud ALM, Signavio, SuccessFactors e Public Edition. Segundo: padrão mental de como um processo to-be do Signavio se IMPLANTA com confiança — quality gates no Cloud ALM, clean core no BTP, feature toggles, testes Tricentis, evidência para auditoria.',
    exemploReal: 'A equipa do SAP Cloud ALM descreveu o produto a correr sobre Deploy with Confidence: deploys diários, feature toggles, change lead time inferior a um dia. A Vodafone não ganhou 11 mil modelos Signavio para os deixar num repositório.',
    ligaA: ['signavio', 'cloud-alm', 's4hana', 'btp', 'build', 'leanix', 'tricentis', 'btc'],
    nesteCenario: {
      onprem: 'Atenuado. On-prem clássico implanta com SolMan/ChaRM — o contrário cultural do DwC.',
      cloud: 'Activo como método.',
      rise: 'Activo como método. Liga Signavio a Cloud ALM e a BTP.'
    },
    naoConfundir: 'NÃO é SAP Data Warehouse Cloud (hoje Datasphere, id datasphere). NÃO é a oferta de partner Delivery Confidence for SAP da KPMG. NÃO se licencia.'
  },

  {
    id: 'btc',
    nome: 'SAP Business Transformation Center',
    camada: 'alm',
    tipo: 'Migração de dados',
    cluster: null,
    cenarios: ['rise'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Transformação seletiva e assessment de dados ECC/S/4 → Cloud ERP. Help: Business Transformation Center, Landscape Transformation, Test Data Migration Server.',
    paraQueServe: 'Selective data transition. Signavio escolhe o processo → BTC escolhe os dados → Cloud ALM corre o projecto.',
    exemploReal: 'Documentação Cloud ALM 2026 refere BTC em Data Management.',
    ligaA: ['cloud-alm', 'signavio', 's4hana', 'ecc', 'dwc'],
    nesteCenario: {
      onprem: 'Atenuado.',
      cloud: 'Raro (GROW é sobretudo greenfield).',
      rise: 'Recomendado com perfil brownfield.'
    }
  },

  {
    id: 'tricentis',
    nome: 'SAP Test Automation by Tricentis',
    camada: 'alm',
    tipo: 'Testes',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['brownfield', 'regulado'],
    oQueFaz: 'Help: Test Automation by Tricentis, Tricentis Test Automation for SAP, Enterprise Continuous Testing, Enterprise Performance Testing, Change Impact Analysis, Quality Center by Micro Focus, Test Acceleration and Optimization.',
    paraQueServe: 'Regressão a cada upgrade S/4 Cloud. Cloud ALM guarda o plano → Tricentis executa → quality gate DwC-style.',
    exemploReal: 'Cloud ALM for Implementation integra cenários de teste automatizado.',
    ligaA: ['cloud-alm', 'solman', 's4hana', 'dwc'],
    nesteCenario: {
      onprem: 'Opcional.',
      cloud: 'Recomendado.',
      rise: 'Recomendado.'
    }
  },

  {
    id: 'sap-for-me',
    nome: 'SAP for Me',
    aliases: ['SAP for Me', 'SAP For Me', 'SAP For me', 'sap for me', 'sapforme', 'for me', 'forme', 'SAP4Me', 'customer portal', 'portal do cliente'],
    camada: 'alm',
    tipo: 'Customer portal',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['greenfield', 'brownfield'],
    oQueFaz: 'Portal do cliente SAP: contratos, sistemas, licenças, pedidos de tenant Cloud ALM. Help: SAP for Me. Built-In Support e Support Content vivem nesta órbita.',
    paraQueServe: 'Pedir o tenant Cloud ALM e ver o que está contratado. SAP for Me (contrato) → Cloud ALM (execução).',
    exemploReal: 'É daqui que a maior parte dos clientes RISE/GROW provisiona o Cloud ALM.',
    ligaA: ['cloud-alm', 's4hana', 'btp'],
    nesteCenario: {
      onprem: 'Activo.',
      cloud: 'Activo.',
      rise: 'Activo.'
    }
  },

  {
    id: 'etd',
    nome: 'SAP Enterprise Threat Detection',
    camada: 'alm',
    tipo: 'Segurança',
    cluster: null,
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'SIEM focado em ameaças sobre sistemas SAP (logs, anomalias, ataques). Help: Enterprise Threat Detection. Complementa GRC (SoD) e IAG (acesso): ETD vê o ataque, não só o perfil.',
    paraQueServe: 'Detectar abuso e ataque no stack SAP. Mistura regulada: ETD + GRC + IAG + Cloud ALM.',
    exemploReal: 'Produto autónomo no All Products, família Security, distinto de Access Control.',
    ligaA: ['grc', 'iag', 's4-any', 's4hana', 'cloud-alm'],
    nesteCenario: {
      onprem: 'Opcional / recomendado com perfil regulado.',
      cloud: 'Opcional.',
      rise: 'Opcional com perfil regulado.'
    }
  },

  /* ===== APENDICE A -> CARDS ===== */

  {
    id: 'powerbuilder',
    nome: 'SAP PowerBuilder',
    camada: 'plataforma',
    tipo: 'IDE legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'IDE clássico para aplicações cliente-servidor (DataWindows). Help: PowerBuilder. Não faz parte do BTP nem do clean core.',
    paraQueServe: 'Manter apps PowerBuilder enquanto se migra para Fiori/Build.',
    exemploReal: 'Entrada All Products. Linha de ferramenta, não LoB.',
    ligaA: ['netweaver', 'fiori', 'build'],
    nesteCenario: {
      onprem: 'Opcional legado.',
      cloud: 'Escondido.',
      rise: 'Escondido.'
    },
    aliases: ['PowerBuilder', 'PB']
  },

  {
    id: 'powerdesigner',
    nome: 'SAP PowerDesigner',
    camada: 'alm',
    tipo: 'Modelação',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Ferramenta de modelação empresarial (dados, processos, arquitectura). Help: PowerDesigner. Destino conceptual: LeanIX + Signavio + Datasphere.',
    paraQueServe: 'Documentar modelos de dados e arquitectura em landscapes clássicos.',
    exemploReal: 'Produto autónomo no All Products, família EA/modelação.',
    ligaA: ['leanix', 'signavio', 'datasphere', 'bw4'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['PowerDesigner']
  },

  {
    id: 'infomaker',
    nome: 'SAP InfoMaker',
    camada: 'dados',
    tipo: 'Reporting legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Ferramenta clássica de reporting associada ao ecossistema PowerBuilder.',
    paraQueServe: 'Reports desktop em landscapes antigos.',
    exemploReal: 'All Products. Destino = SAC / Analysis for Office.',
    ligaA: ['powerbuilder', 'sac', 'analysis-office'],
    nesteCenario: {
      onprem: 'Legado.',
      cloud: 'Escondido.',
      rise: 'Escondido.'
    }
  },

  {
    id: 'open-server',
    nome: 'SAP Open Server',
    camada: 'dados',
    tipo: 'Middleware DB legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Camada de servidor aberto da família Sybase / ASE para protocolos de BD.',
    paraQueServe: 'Compatibilidade com stacks Sybase clássicos.',
    exemploReal: 'All Products, família ASE/SQL Anywhere.',
    ligaA: ['hana-onprem'],
    nesteCenario: {
      onprem: 'Legado.',
      cloud: 'Escondido.',
      rise: 'Escondido.'
    }
  },

  {
    id: 'orientdb',
    nome: 'SAP Enterprise OrientDB',
    camada: 'dados',
    tipo: 'Grafo legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Edição empresarial OrientDB referenciada no índice Help. Workloads de grafo novos vão para HANA Cloud multi-model / Knowledge Graph.',
    paraQueServe: 'Grafos em landscapes que ainda a usam.',
    exemploReal: 'All Products.',
    ligaA: ['hana-cloud', 'bdc'],
    nesteCenario: {
      onprem: 'Legado.',
      cloud: 'Atenuado.',
      rise: 'Atenuado.'
    }
  },

  {
    id: 'replication-server',
    nome: 'SAP Replication Server',
    camada: 'dados',
    tipo: 'Replicação',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Replicação clássica Sybase/SAP entre bases. Help: Replication Server. Em S/4/Central Finance o padrão moderno é SLT / BTC / Datasphere replication.',
    paraQueServe: 'Replicar dados entre motores clássicos.',
    exemploReal: 'All Products, família dados.',
    ligaA: ['hana-onprem', 'central-finance', 'btc'],
    nesteCenario: {
      onprem: 'Opcional legado.',
      cloud: 'Atenuado.',
      rise: 'Atenuado.'
    }
  },

  {
    id: 'sql-anywhere',
    nome: 'SAP SQL Anywhere',
    camada: 'dados',
    tipo: 'DB embarcada',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Base embarcada / edge. Help: SQL Anywhere. Distinta do HANA.',
    paraQueServe: 'Apps ocasionalmente conectadas, POS, edge.',
    exemploReal: 'All Products.',
    ligaA: ['hana-onprem', 'customer-checkout'],
    nesteCenario: {
      onprem: 'Opcional.',
      cloud: 'Atenuado.',
      rise: 'Atenuado.'
    }
  },

  {
    id: 'sql-analyzer',
    nome: 'SQL Analyzer Tool for SAP HANA',
    camada: 'dados',
    tipo: 'Ferramenta',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Analisador de SQL/planos sobre HANA. Help: SQL Analyzer Tool for SAP HANA.',
    paraQueServe: 'Afinar queries HANA.',
    exemploReal: 'All Products, família HANA tools.',
    ligaA: ['hana-onprem', 'hana-cloud'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['SQL Analyzer']
  },

  {
    id: 'event-ticketing',
    nome: 'SAP Event Ticketing',
    camada: 'lob',
    tipo: 'Ticketing',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Bilheteira / eventos. Help: Event Ticketing. Vertical de lazer, não Event Mesh.',
    paraQueServe: 'Venda de bilhetes e acesso a eventos.',
    exemploReal: 'All Products. Não confundir com Event Management logístico.',
    ligaA: ['commerce-cloud', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Event Ticketing'],
    naoConfundir: 'Não é SAP Event Management (track-and-trace) nem Event Mesh.'
  },

  {
    id: 'event-stream-processor',
    nome: 'SAP Event Stream Processor',
    camada: 'integracao',
    tipo: 'Streaming legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'CEP/streaming clássico. Help: Event Stream Processor. Destino: Event Mesh / Advanced Event Mesh / AI Core streaming.',
    paraQueServe: 'Processar streams em landscapes antigos.',
    exemploReal: 'All Products.',
    ligaA: ['event-mesh', 'advanced-event-mesh'],
    nesteCenario: {
      onprem: 'Legado.',
      cloud: 'Atenuado.',
      rise: 'Atenuado.'
    },
    aliases: ['ESP', 'Event Stream Processor']
  },

  {
    id: 'event-insight',
    nome: 'SAP Event Insight',
    camada: 'integracao',
    tipo: 'Eventos legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Insight sobre eventos de negócio, linha histórica no Help.',
    paraQueServe: 'Visibilidade de eventos antes do Event Mesh.',
    exemploReal: 'All Products.',
    ligaA: ['event-management', 'event-mesh'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'innovation-management',
    nome: 'SAP Innovation Management',
    camada: 'lob',
    tipo: 'Inovação',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Portefólio de ideias e inovação. Help: Innovation Management.',
    paraQueServe: 'Funil de ideias até projecto (liga a PPM).',
    exemploReal: 'All Products.',
    ligaA: ['ppm', 'signavio'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'knowledge-acceleration',
    nome: 'SAP Knowledge Acceleration',
    camada: 'alm',
    tipo: 'Enablement',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Conteúdos de aceleração de conhecimento. Help: Knowledge Acceleration. Irmão do Enable Now.',
    paraQueServe: 'Formação acelerada em módulos SAP.',
    exemploReal: 'All Products.',
    ligaA: ['enable-now', 'walkme'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'micro-app-hub',
    nome: 'SAP Micro-App Hub',
    camada: 'plataforma',
    tipo: 'Hub de micro-apps',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Catálogo de micro-apps. Help: Micro-App Hub.',
    paraQueServe: 'Distribuir mini-apps no workplace.',
    exemploReal: 'All Products.',
    ligaA: ['workzone', 'build', 'sap-start'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'collaboration-manager',
    nome: 'SAP Collaboration Manager',
    camada: 'lob',
    tipo: 'Colaboração',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Colaboração em processos/documentos. Help: Collaboration Manager.',
    paraQueServe: 'Workrooms em volta de objectos SAP.',
    exemploReal: 'All Products.',
    ligaA: ['workzone', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'content-to-go',
    nome: 'SAP Content to Go',
    camada: 'alm',
    tipo: 'Conteúdo móvel',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Distribuição de conteúdo Enable Now / help para dispositivos. Help: Content to Go.',
    paraQueServe: 'Levar simulações e help ao telemóvel.',
    exemploReal: 'All Products.',
    ligaA: ['enable-now'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'employee-lookup',
    nome: 'SAP Employee Lookup',
    camada: 'lob',
    tipo: 'App RH',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'App de pesquisa de colaboradores. Help: Employee Lookup 2.3.',
    paraQueServe: 'Encontrar colegas. Destino UX: Work Zone / Mobile Start.',
    exemploReal: 'All Products.',
    ligaA: ['successfactors', 'sap-start', 'workzone'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'candidate-pipeline',
    nome: 'Candidate Pipeline',
    camada: 'lob',
    tipo: 'Recruiting',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Pipeline de candidatos no universo SuccessFactors / recruiting. Help: Candidate Pipeline.',
    paraQueServe: 'Acompanhar candidatos até à admissão.',
    exemploReal: 'All Products, família SuccessFactors.',
    ligaA: ['successfactors'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Candidate Pipeline']
  },

  {
    id: 'agent-compliance',
    nome: 'Agent Compliance',
    camada: 'lob',
    tipo: 'Compliance RH',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Compliance de agentes / força de vendas no índice Help.',
    paraQueServe: 'Certificações e regras de agentes.',
    exemploReal: 'All Products.',
    ligaA: ['successfactors', 'grc'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'questionmark',
    nome: 'Assessment Management by Questionmark',
    camada: 'lob',
    tipo: 'Avaliação',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Avaliações e testes por Questionmark. Help: Assessment Management by Questionmark.',
    paraQueServe: 'Exames e certificações ligadas a Learning.',
    exemploReal: 'All Products, parceiro.',
    ligaA: ['successfactors'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'behavioral-insights',
    nome: 'Behavioral Insights',
    camada: 'lob',
    tipo: 'Analytics pessoas',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Insights comportamentais no portefólio Help.',
    paraQueServe: 'Padrões de comportamento de colaboradores/clientes.',
    exemploReal: 'All Products.',
    ligaA: ['successfactors', 'sac'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'budget-benefits',
    nome: 'Budget-Based Benefits Selection',
    camada: 'lob',
    tipo: 'Benefícios',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Selecção de benefícios por orçamento. Help: Budget-Based Benefits Selection.',
    paraQueServe: 'Open enrollment com envelope orçamental.',
    exemploReal: 'All Products.',
    ligaA: ['successfactors'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'workforce-forecast',
    nome: 'SAP Workforce Forecasting and Scheduling',
    camada: 'lob',
    tipo: 'WFM',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['workforce'],
    oQueFaz: 'Previsão e horários de workforce. Help: Workforce Forecasting and Scheduling by Workforce Software.',
    paraQueServe: 'Turnos e forecasting operacional.',
    exemploReal: 'All Products.',
    ligaA: ['successfactors', 'fieldglass'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Workforce Forecasting']
  },

  {
    id: 'public-budgeting',
    nome: 'Budgeting and Planning for Public Sector',
    camada: 'lob',
    tipo: 'Sector público',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Orçamentação e planeamento para sector público. Help: Budgeting and Planning for Public Sector.',
    paraQueServe: 'Orçamento público sobre S/4 / SAC.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'sac'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'financial-closing',
    nome: 'SAP Financial Closing Cockpit',
    camada: 'core',
    tipo: 'Fecho',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Orquestração do fecho financeiro. Help: Financial Closing Cockpit Add-On.',
    paraQueServe: 'Checklist e tasks do month-end.',
    exemploReal: 'All Products, família Finance.',
    ligaA: ['s4hana', 's4-any', 'group-reporting'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Financial Closing Cockpit', 'FCC']
  },

  {
    id: 'financial-consolidation',
    nome: 'SAP Financial Consolidation',
    camada: 'core',
    tipo: 'Consolidação legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Consolidação clássica (BFC). Help: Financial Consolidation. Destino: Group Reporting.',
    paraQueServe: 'Contas do grupo em landscapes pré-S/4.',
    exemploReal: 'All Products.',
    ligaA: ['group-reporting', 'bpc'],
    nesteCenario: {
      onprem: 'Legado.',
      cloud: 'Escondido.',
      rise: 'Legado.'
    }
  },

  {
    id: 'funding-management',
    nome: 'SAP Funding Management',
    camada: 'core',
    tipo: 'Fundos',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Gestão de fundos / grants. Help: Funding Management.',
    paraQueServe: 'Sector público e educação: fundos e availability control.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'public-budgeting'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'green-token',
    nome: 'SAP Green Token',
    camada: 'lob',
    tipo: 'Sustentabilidade',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado', 'industria'],
    oQueFaz: 'Cadeia de custódia de atributos ambientais. Help: Green Token. Irmão do Green Ledger.',
    paraQueServe: 'Provar a origem verde de um lote / certificado.',
    exemploReal: 'All Products.',
    ligaA: ['green-ledger', 'footprint-management', 'sustainability'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'rdp',
    nome: 'SAP Responsible Design and Production',
    camada: 'lob',
    tipo: 'EPR / circular',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado', 'industria'],
    oQueFaz: 'Conceção responsável e EPR (plásticos, responsabilidade alargada do produtor). Help: Responsible Design and Production.',
    paraQueServe: 'Obrigações de embalagem e eco-design.',
    exemploReal: 'All Products, família Sustainability.',
    ligaA: ['footprint-management', 'sustainability', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['RDP', 'Responsible Design and Production']
  },

  {
    id: 'sus-data-exchange',
    nome: 'SAP Sustainability Data Exchange',
    camada: 'lob',
    tipo: 'ESG partilha',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Partilha de dados ESG com parceiros. Help: Sustainability Data Exchange.',
    paraQueServe: 'Trocar pegadas e atributos na rede.',
    exemploReal: 'All Products.',
    ligaA: ['footprint-management', 'business-network', 'sustainability'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'sus-performance',
    nome: 'SAP Sustainability Performance Management',
    camada: 'lob',
    tipo: 'ESG performance',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Performance de sustentabilidade. Help: Sustainability Performance Management.',
    paraQueServe: 'KPI ESG operacionais, a montante do Control Tower.',
    exemploReal: 'All Products.',
    ligaA: ['sustainability', 'sac'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'ltc',
    nome: 'Lead-to-Cash',
    camada: 'alm',
    tipo: 'Cadeia de processo',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Cadeia comercial ponta-a-ponta (lead → contrato → factura → caixa). Help lista Lead-to-Cash Business Process. Não é um exe: é o processo que o Signavio modela e o S/4+Sales+Commerce executam.',
    paraQueServe: 'Ver a mistura comercial como um fluxo, não como produtos isolados.',
    exemploReal: 'All Products como business process.',
    ligaA: ['signavio', 'sales-cloud', 'commerce-cloud', 's4hana', 'cpq'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Lead to Cash', 'L2C']
  },

  {
    id: 's2p-process',
    nome: 'Source-to-Pay (cadeia)',
    camada: 'alm',
    tipo: 'Cadeia de processo',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Cadeia de compras ponta-a-ponta. Help: Source-to-Pay Business Process.',
    paraQueServe: 'Ler Ariba + S/4 MM + Network como um fluxo.',
    exemploReal: 'All Products.',
    ligaA: ['signavio', 'ariba', 's4hana', 'business-network'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Source to Pay', 'S2P']
  },

  {
    id: 'p2f',
    nome: 'Plan-to-Fulfill',
    camada: 'alm',
    tipo: 'Cadeia de processo',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Cadeia de planeamento à entrega. Help: Plan-to-Fulfill Business Process.',
    paraQueServe: 'IBP → S/4 → EWM/TM como um fluxo.',
    exemploReal: 'All Products.',
    ligaA: ['signavio', 'ibp', 's4hana', 'ewm', 'tm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Plan to Fulfill']
  },

  {
    id: 'r2r-hr',
    nome: 'Recruit-to-Retire',
    camada: 'alm',
    tipo: 'Cadeia de processo',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Cadeia de vida do colaborador. Help: Recruit-to-Retire Business Process.',
    paraQueServe: 'SuccessFactors + Folha + Fieldglass como um fluxo.',
    exemploReal: 'All Products.',
    ligaA: ['signavio', 'successfactors', 'hcm-onprem', 'fieldglass'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Recruit to Retire']
  },

  {
    id: 'i2m',
    nome: 'Idea-to-Market',
    camada: 'alm',
    tipo: 'Cadeia de processo',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Cadeia de inovação a produto. Help: Idea to Market Business Process.',
    paraQueServe: 'Innovation Management + IPD + S/4 como um fluxo.',
    exemploReal: 'All Products.',
    ligaA: ['signavio', 'innovation-management', 'ipd', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Idea to Market']
  },

  {
    id: 'trade-claims',
    nome: 'SAP Intelligent Trade Claims Management',
    camada: 'lob',
    tipo: 'Trade promo',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Claims de promoções comerciais. Help: Intelligent Trade Claims Management.',
    paraQueServe: 'Deduzir e liquidar claims de retalhistas.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'ariba', 'sac'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Trade Claims']
  },

  {
    id: 'trade-management',
    nome: 'SAP Trade Management',
    camada: 'lob',
    tipo: 'Trade',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Gestão de trade promotions. Help: Trade Management.',
    paraQueServe: 'Planeamento de promoções no canal.',
    exemploReal: 'All Products.',
    ligaA: ['trade-claims', 's4hana', 'sac'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'intercompany-exchange',
    nome: 'Intercompany data exchange',
    camada: 'integracao',
    tipo: 'Utilities intercompany',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria', 'regulado'],
    oQueFaz: 'Troca intercompany para utilities CH (electricidade/gás) no S/4. Help: Intercompany Data Exchange for Swiss Electric and Gas Utilities.',
    paraQueServe: 'Market communication entre empresas do grupo.',
    exemploReal: 'All Products, vertical utilities.',
    ligaA: ['cloud-for-energy', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'igr',
    nome: 'SAP Invoice and Goods Receipt Reconciliation',
    camada: 'core',
    tipo: 'MM/FI',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Reconciliação factura vs entrada de mercadorias. Help: Invoice and Goods Receipt Reconciliation.',
    paraQueServe: '3-way match residual quando não há VIM/Ariba Invoice.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'vim', 'ariba'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'landscape-portal',
    nome: 'Landscape Portal (ABAP environment)',
    camada: 'plataforma',
    tipo: 'Ops ABAP Cloud',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Portal de landscape do ABAP environment S/4 Cloud. Help: Landscape Portal for SAP S/4HANA Cloud ABAP environment.',
    paraQueServe: 'Operar tenants ABAP Cloud.',
    exemploReal: 'All Products.',
    ligaA: ['abap-env', 's4hana', 'cloud-alm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'moc',
    nome: 'SAP Management of Change',
    camada: 'lob',
    tipo: 'EHS / mudança',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria', 'regulado'],
    oQueFaz: 'Gestão de mudança operacional (fábrica, EHS). Help: Management of Change.',
    paraQueServe: 'Permit-to-work e mudanças de instalação.',
    exemploReal: 'All Products.',
    ligaA: ['ehs', 's4hana', 'digital-manufacturing'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Management of Change', 'MoC']
  },

  {
    id: 'mdg-prometheus',
    nome: 'MDG extensions by Prometheus Group',
    camada: 'core',
    tipo: 'MDG add-on',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Extensões MDG EAM e retail/fashion by Prometheus Group. Help lista várias linhas.',
    paraQueServe: 'Master data de activos e moda para além do MDG standard.',
    exemploReal: 'All Products.',
    ligaA: ['mdg', 'fashion', 'apm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'metadata-management',
    nome: 'SAP Metadata Management',
    camada: 'dados',
    tipo: 'Metadados',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Gestão de metadados no parque EIM clássico. Help: Metadata Management.',
    paraQueServe: 'Catálogo de metadados ao lado de Information Steward.',
    exemploReal: 'All Products.',
    ligaA: ['data-services', 'ilm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'notes-management',
    nome: 'SAP Notes Management',
    camada: 'alm',
    tipo: 'Notas',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Gestão de SAP Notes no landscape. Help: Notes Management.',
    paraQueServe: 'Aplicar e rastrear notes. Destino ops: Cloud ALM / LaMa.',
    exemploReal: 'All Products.',
    ligaA: ['solman', 'cloud-alm', 'lama'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'notification-social',
    nome: 'Notification Integration for Social Media',
    camada: 'integracao',
    tipo: 'Notificações',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Integração de notificações com apps sociais. Help: Notification Integration Service for Social Media Apps.',
    paraQueServe: 'Alertas em canais sociais.',
    exemploReal: 'All Products.',
    ligaA: ['workzone', 'successfactors'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'oasm',
    nome: 'Online Application Submission Management',
    camada: 'lob',
    tipo: 'Submissão online',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Submissão online de candidaturas / pedidos. Help: Online Application Submission Management.',
    paraQueServe: 'Portais de submissão sector público / utilities.',
    exemploReal: 'All Products.',
    ligaA: ['successfactors', 'cloud-for-energy'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'ods',
    nome: 'SAP Order and Delivery Scheduling',
    camada: 'lob',
    tipo: 'Scheduling omnichannel',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Scheduling de encomenda e entrega. Help: Order and Delivery Scheduling. Satélite da família Order Management.',
    paraQueServe: 'Prometer e calendarizar entregas omnichannel.',
    exemploReal: 'All Products.',
    ligaA: ['order-management', 's4hana', 'tm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'plm-recipe',
    nome: 'SAP PLM Recipe Management',
    camada: 'lob',
    tipo: 'Receitas',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Receitas de produto (process / CPG). Help: PLM Recipe Management.',
    paraQueServe: 'Fórmulas e receitas antes da ordem de processo.',
    exemploReal: 'All Products.',
    ligaA: ['ipd', 's4hana', 'digital-manufacturing'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'pos-classic',
    nome: 'SAP Point-of-Sale (clássico)',
    camada: 'lob',
    tipo: 'POS legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'POS clássico Enterprise Point-of-Sale. Help: Point-of-Sale / Enterprise POS. Destino: Customer Checkout / Omnichannel POS by GK.',
    paraQueServe: 'Caixa em landscapes antigos.',
    exemploReal: 'All Products.',
    ligaA: ['customer-checkout', 's4hana'],
    nesteCenario: {
      onprem: 'Legado.',
      cloud: 'Atenuado.',
      rise: 'Atenuado.'
    }
  },

  {
    id: 'process-object-builder',
    nome: 'SAP Process Object Builder',
    camada: 'integracao',
    tipo: 'A2A legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Builder de process objects na integração clássica. Help: Process Object Builder.',
    paraQueServe: 'Objectos de processo A2A em PI/PO.',
    exemploReal: 'All Products.',
    ligaA: ['pipo', 'integration-suite'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'workflow-mgmt',
    nome: 'SAP Workflow Management / Process Visibility',
    camada: 'plataforma',
    tipo: 'Workflow legado',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Workflow Management e Process Visibility no BTP (linha anterior ao Build Process Automation). Help: Process Visibility Capability Within Workflow Management.',
    paraQueServe: 'Workflows BTP antigos. Destino: Build Process Automation.',
    exemploReal: 'All Products.',
    ligaA: ['build', 'signavio'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Workflow Management', 'Process Visibility']
  },

  {
    id: 'product-model-viewer',
    nome: 'SAP Product Model Viewer',
    camada: 'lob',
    tipo: 'PLM viewer',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Visualizador de modelo de produto. Help: Product Model Viewer / 3D Visual Enterprise.',
    paraQueServe: 'Ver o gémeo 3D no processo de engenharia.',
    exemploReal: 'All Products.',
    ligaA: ['ipd'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'product-transition',
    nome: 'Product Transition Process',
    camada: 'lob',
    tipo: 'Transição de produto',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Processo de transição / phase-in phase-out de produto. Help: Product Transition Process.',
    paraQueServe: 'Substituir artigos sem partir MRP.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'ipd', 'mdg'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'ppg-bdf',
    nome: 'Product and Process Governance by BDF',
    camada: 'lob',
    tipo: 'Governação PLM',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria', 'regulado'],
    oQueFaz: 'Governação de produto e processo by BDF. Help: Product and Process Governance by BDF (e on S/4HANA).',
    paraQueServe: 'Governar mudanças de produto em indústria regulada.',
    exemploReal: 'All Products.',
    ligaA: ['ipd', 'ehs', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'pra',
    nome: 'SAP Production and Revenue Accounting',
    camada: 'core',
    tipo: 'Upstream oil',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Accounting de produção e receita (oil & gas upstream). Help: Production and Revenue Accounting.',
    paraQueServe: 'Dividir receita de poços e joint ventures.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'industry-cloud'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'qir',
    nome: 'SAP Quality Issue Resolution',
    camada: 'lob',
    tipo: 'Qualidade',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Resolução de problemas de qualidade em colaboração. Help: Quality Issue Resolution e Quality Issue Management.',
    paraQueServe: '8D / CAPA com fornecedores.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'business-network', 'digital-manufacturing'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Quality Issue Resolution', 'QIR', 'Quality Issue Management']
  },

  {
    id: 're-tenant',
    nome: 'RE-FX Tenant Relationship add-on',
    camada: 'lob',
    tipo: 'Imobiliário',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Add-on de relação com inquilino no Real Estate. Help: Real Estate Management add-on for Tenant Relationship Management.',
    paraQueServe: 'Contratos e serviço ao inquilino.',
    exemploReal: 'All Products.',
    ligaA: ['real-estate', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'resolve',
    nome: 'SAP Resolve',
    camada: 'alm',
    tipo: 'Suporte',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Oferta de resolução / supportability no índice Help.',
    paraQueServe: 'Encaminhar problemas de produto.',
    exemploReal: 'All Products.',
    ligaA: ['sap-for-me', 'cloud-alm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'revenue-growth',
    nome: 'SAP Revenue Growth Management',
    camada: 'lob',
    tipo: 'Crescimento receita',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Growth management e optimization de receita. Help: Revenue Growth Management / Revenue Growth Optimization.',
    paraQueServe: 'Preço, mix e crescimento comercial.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'sac', 'trade-management'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Revenue Growth Optimization']
  },

  {
    id: 'self-billing',
    nome: 'SAP Self-Billing Cockpit',
    camada: 'lob',
    tipo: 'Self-billing',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Cockpit de self-billing com clientes/fornecedores. Help: Self-Billing Cockpit.',
    paraQueServe: 'O cliente fatura-se a si com base em entregas.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'ariba'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Self-Billing Cockpit']
  },

  {
    id: 'service-tax-br',
    nome: 'Service Taxation Enhancements for Brazil',
    camada: 'lob',
    tipo: 'Localização BR',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Melhorias de tributação de serviços no Brasil. Help: Service Taxation Enhancements for Brazil.',
    paraQueServe: 'Impostos de serviço BR no S/4.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'document-compliance'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'sso-classic',
    nome: 'SAP Single Sign-On',
    camada: 'plataforma',
    tipo: 'SSO legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'SSO clássico (Secure Login, Kerberos, X.509). Help: SAP Single Sign-On. Destino: IAS.',
    paraQueServe: 'SSO on-prem enquanto não há IAS.',
    exemploReal: 'All Products.',
    ligaA: ['ias', 'netweaver'],
    nesteCenario: {
      onprem: 'Activo em muitos DC.',
      cloud: 'Atenuado (IAS).',
      rise: 'Atenuado (IAS).'
    },
    aliases: ['Single Sign-On', 'SAP SSO']
  },

  {
    id: 'social-media-int',
    nome: 'Social Media Integration',
    camada: 'integracao',
    tipo: 'Social',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Integrações sociais (China ESS, SuccessFactors Recruiting, LINE, SAC). Help lista várias linhas.',
    paraQueServe: 'Publicar e captar eventos sociais.',
    exemploReal: 'All Products.',
    ligaA: ['successfactors', 'sac', 'emarsys'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'ssc',
    nome: 'SAP Solution Sales Configuration',
    camada: 'lob',
    tipo: 'CPQ on-prem/cloud',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Configurador de soluções. Help: Solution Sales Configuration cloud edition, for S/4HANA, for Commerce Cloud. Irmão do CPQ.',
    paraQueServe: 'Configurar bundles complexos no ERP ou na loja.',
    exemploReal: 'All Products.',
    ligaA: ['cpq', 's4hana', 'commerce-cloud'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Solution Sales Configuration', 'SSC']
  },

  {
    id: 'slc',
    nome: 'SAP Supplier Lifecycle Management',
    camada: 'lob',
    tipo: 'Fornecedores legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Ciclo de vida do fornecedor on-prem. Help: SLC. Destino: Ariba + Network + MDG.',
    paraQueServe: 'Qualificar fornecedores no ECC/S/4 clássico.',
    exemploReal: 'All Products.',
    ligaA: ['ariba', 'mdg', 's4-any'],
    nesteCenario: {
      onprem: 'Legado.',
      cloud: 'Atenuado.',
      rise: 'Atenuado.'
    },
    aliases: ['SLC', 'Supplier Lifecycle Management']
  },

  {
    id: 'srm',
    nome: 'SAP Supplier Relationship Management',
    camada: 'lob',
    tipo: 'SRM legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'SRM clássico. Help: SRM Server e add-ons. Destino: Ariba.',
    paraQueServe: 'Compras no mundo Business Suite 7.',
    exemploReal: 'All Products.',
    ligaA: ['ariba', 'ecc', 'slc'],
    nesteCenario: {
      onprem: 'Legado.',
      cloud: 'Escondido.',
      rise: 'Escondido.'
    },
    aliases: ['SRM']
  },

  {
    id: 'tank-planning',
    nome: 'Tank Planning Cockpit',
    camada: 'lob',
    tipo: 'Oil tank farm',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Planeamento de tanques. Help: Tank Planning Cockpit.',
    paraQueServe: 'Movimentar produto em parques de tanques.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'tm', 'industry-cloud'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'task-center',
    nome: 'SAP Task Center',
    camada: 'plataforma',
    tipo: 'Inbox unificada',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Inbox única de aprovações S/4 + SuccessFactors + Build. Help: Task Center. Satélite de SAP Start / Work Zone.',
    paraQueServe: 'Uma fila de tarefas para o utilizador.',
    exemploReal: 'All Products.',
    ligaA: ['sap-start', 'workzone', 'build', 's4hana', 'ias'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Task Center']
  },

  {
    id: 'tax-declaration-br',
    nome: 'SAP Tax Declaration Framework for Brazil',
    camada: 'lob',
    tipo: 'Fiscal BR',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Framework de declarações fiscais Brasil. Help: Tax Declaration Framework for Brazil e Tax Intelligence by All Tax.',
    paraQueServe: 'Obrigações acessórias BR.',
    exemploReal: 'All Products.',
    ligaA: ['document-compliance', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'teamcenter-gw',
    nome: 'Teamcenter gateway for PLM si',
    camada: 'lob',
    tipo: 'PLM conector',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Gateway Teamcenter by Siemens para PLM system integration. Help: Teamcenter by Siemens gateway.',
    paraQueServe: 'Ligar o PLM Siemens ao S/4.',
    exemploReal: 'All Products.',
    ligaA: ['ipd', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'translation-hub',
    nome: 'SAP Translation Hub',
    camada: 'plataforma',
    tipo: 'Tradução',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Serviço BTP de tradução. Help: Translation Hub.',
    paraQueServe: 'Traduzir textos de UI e master data.',
    exemploReal: 'All Products.',
    ligaA: ['btp', 'build'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Translation Hub']
  },

  {
    id: 'tlc',
    nome: 'Transport Load Consolidation',
    camada: 'lob',
    tipo: 'Carga TM',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Consolidação de carga. Help: Transport Load Consolidation.',
    paraQueServe: 'Encher camiões / contentores no TM.',
    exemploReal: 'All Products.',
    ligaA: ['tm', 'ewm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'print-forms',
    nome: 'Print Forms Service',
    camada: 'plataforma',
    tipo: 'Formulários',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Serviço BTP de formulários de impressão. Help: Print Forms Service.',
    paraQueServe: 'Output de documentos sem ADS on-prem.',
    exemploReal: 'All Products.',
    ligaA: ['btp', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Print Forms']
  },

  {
    id: 'private-link',
    nome: 'SAP Private Link Service',
    camada: 'plataforma',
    tipo: 'Rede privada',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Private Link no BTP para chegar a recursos no hyperscaler sem Internet pública. Help: Private Link Service. É a peça ⑪ do esquema Azure.',
    paraQueServe: 'BTP ↔ spoke RISE sem sair à Internet.',
    exemploReal: 'All Products.',
    ligaA: ['btp', 'azure', 'aws', 's4hana', 'cloud-connector'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Private Link', 'Private Link Service']
  },

  {
    id: 'process-control',
    nome: 'SAP Process Control',
    camada: 'lob',
    tipo: 'GRC controlos',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Controlos de processo no GRC. Help: Process Control.',
    paraQueServe: 'Testar controlos SOX / internos.',
    exemploReal: 'All Products.',
    ligaA: ['grc', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Process Control']
  },

  {
    id: 'celonis-mining',
    nome: 'SAP Process Mining by Celonis',
    camada: 'lob',
    tipo: 'Process mining legado',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Process mining by Celonis no índice Help. Destino Signavio Process Intelligence.',
    paraQueServe: 'Minerar processos em landscapes que ainda têm a bundle Celonis.',
    exemploReal: 'All Products.',
    ligaA: ['signavio'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Celonis', 'Process Mining by Celonis'],
    naoConfundir: 'Não é o Signavio Process Intelligence (alvo actual).'
  },

  {
    id: 'plc',
    nome: 'SAP Product Lifecycle Costing',
    camada: 'lob',
    tipo: 'Custo-alvo',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Custeio de ciclo de vida / target cost. Help: Product Lifecycle Costing e PCE.',
    paraQueServe: 'Custo-alvo na engenharia, antes do S/4 CO.',
    exemploReal: 'All Products.',
    ligaA: ['ipd', 's4hana', 'papm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['PLC', 'Product Lifecycle Costing']
  },

  {
    id: 'plm-onprem',
    nome: 'SAP Product Lifecycle Management',
    camada: 'lob',
    tipo: 'PLM clássico',
    cluster: null,
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'PLM on-prem / digital products. Help: Product Lifecycle Management. Destino cloud: IPD.',
    paraQueServe: 'Engenharia em landscapes clássicos.',
    exemploReal: 'All Products.',
    ligaA: ['ipd', 's4-any'],
    nesteCenario: {
      onprem: 'Activo se já há PLM.',
      cloud: 'Atenuado (IPD).',
      rise: 'Opcional.'
    }
  },

  {
    id: 'promotion-mgmt',
    nome: 'SAP Promotion Management for Retail',
    camada: 'lob',
    tipo: 'Promoções retalho',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Promoções de retalho. Help: Promotion Management for Retail e Omnichannel Promotion Pricing.',
    paraQueServe: 'Folhetos e preços promocionais na loja.',
    exemploReal: 'All Products.',
    ligaA: ['customer-checkout', 'commerce-cloud', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Promotion Management']
  },

  {
    id: 'quality-center',
    nome: 'SAP Quality Center by Micro Focus',
    camada: 'alm',
    tipo: 'Testes legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Quality Center by Micro Focus. Help. Destino: Tricentis + Cloud ALM.',
    paraQueServe: 'Repositório de testes clássico.',
    exemploReal: 'All Products.',
    ligaA: ['tricentis', 'solman'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'insurance-underwriting',
    nome: 'SAP Quotation and Underwriting',
    camada: 'lob',
    tipo: 'Seguros',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria', 'regulado'],
    oQueFaz: 'Cotação e underwriting de seguros. Help: Quotation and Underwriting / Product Quotation and Underwriting Management / Underwriting for Insurance.',
    paraQueServe: 'Subscrever riscos no core de seguros.',
    exemploReal: 'All Products.',
    ligaA: ['industry-cloud', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Underwriting']
  },

  {
    id: 'r3',
    nome: 'SAP R/3',
    camada: 'core',
    tipo: 'ERP ancestral',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Ancestral do ECC. Help: SAP R/3. Só pedagógico / legado extremo.',
    paraQueServe: 'Explicar de onde veio o ECC.',
    exemploReal: 'All Products.',
    ligaA: ['ecc'],
    nesteCenario: {
      onprem: 'Legado histórico.',
      cloud: 'Escondido.',
      rise: 'Escondido.'
    },
    aliases: ['R/3', 'R3']
  },

  {
    id: 'rabbitmq-btp',
    nome: 'RabbitMQ on SAP BTP',
    camada: 'plataforma',
    tipo: 'Messaging',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'RabbitMQ como serviço no BTP. Help: RabbitMQ on SAP BTP.',
    paraQueServe: 'Mensageria poliglota nas extensões.',
    exemploReal: 'All Products.',
    ligaA: ['btp', 'runtimes-btp', 'event-mesh'],
    nesteCenario: {
      onprem: 'Ausente.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'redis-btp',
    nome: 'Redis on SAP BTP',
    camada: 'plataforma',
    tipo: 'Cache',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Redis gerido no BTP. Help: Redis on SAP BTP.',
    paraQueServe: 'Cache e sessões das extensões.',
    exemploReal: 'All Products.',
    ligaA: ['btp', 'runtimes-btp'],
    nesteCenario: {
      onprem: 'Ausente.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'rto',
    nome: 'SAP Real-Time Offer Management',
    camada: 'lob',
    tipo: 'Ofertas tempo real',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Ofertas em tempo real. Help: Real-Time Offer Management.',
    paraQueServe: 'Next-best-offer no canal.',
    exemploReal: 'All Products.',
    ligaA: ['emarsys', 'commerce-cloud', 'joule'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'recommerce',
    nome: 'SAP Recommerce',
    camada: 'lob',
    tipo: '2.ª mão',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Recommerce / segunda mão. Help: Recommerce.',
    paraQueServe: 'Devoluções que voltam à venda.',
    exemploReal: 'All Products.',
    ligaA: ['returns-management', 'commerce-cloud'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'regulation-mgmt',
    nome: 'SAP Regulation Management by Greenlight',
    camada: 'lob',
    tipo: 'GRC regulação',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Regulação e mitigation AVM by Greenlight. Help: Regulation Management.',
    paraQueServe: 'Mapear regulações a controlos.',
    exemploReal: 'All Products.',
    ligaA: ['grc'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'regulatory-change',
    nome: 'Regulatory Change Manager',
    camada: 'lob',
    tipo: 'Regulação',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Gestor de mudança regulatória. Help: Regulatory Change Manager.',
    paraQueServe: 'Acompanhar mudanças de lei.',
    exemploReal: 'All Products.',
    ligaA: ['grc', 'document-compliance'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'rbsc',
    nome: 'Repository Based Shipment Channel',
    camada: 'alm',
    tipo: 'Entrega software',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Canal de shipment baseado em repositório. Help: Repository Based Shipment Channel.',
    paraQueServe: 'Receber stacks SAP.',
    exemploReal: 'All Products.',
    ligaA: ['lama', 'solman'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'retail-execution',
    nome: 'SAP Retail Execution',
    camada: 'lob',
    tipo: 'Força de campo retalho',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Execução de retalho no campo (visitas, planograma). Help: Retail Execution e app móvel.',
    paraQueServe: 'Merchandisers na loja do cliente.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'emarsys', 'fsm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Retail Execution']
  },

  {
    id: 'rpm',
    nome: 'SAP Returnable Packaging Management',
    camada: 'lob',
    tipo: 'Embalagens retornáveis',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Embalagens retornáveis / pallets. Help: Returnable Packaging Management.',
    paraQueServe: 'Contas de pallets com fornecedores e clientes.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'ewm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'risk-mgmt',
    nome: 'SAP Risk Management',
    camada: 'lob',
    tipo: 'Risco GRC',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Gestão de risco empresarial. Help: Risk Management.',
    paraQueServe: 'Registo de riscos e KRI.',
    exemploReal: 'All Products.',
    ligaA: ['grc'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Risk Management']
  },

  {
    id: 'rounds-manager',
    nome: 'SAP Rounds Manager',
    camada: 'lob',
    tipo: 'Rounds legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Rounds de manutenção clássicos. Help: Rounds Manager. Destino: Service and Asset Manager.',
    paraQueServe: 'Rondas no activo em landscapes antigos.',
    exemploReal: 'All Products.',
    ligaA: ['service-asset-manager', 's4-any'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'rural-sourcing',
    nome: 'SAP Rural Sourcing Management',
    camada: 'lob',
    tipo: 'Agro sourcing',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Sourcing rural / originação agrícola. Help: Rural Sourcing Management.',
    paraQueServe: 'Comprar colheita a pequenos produtores.',
    exemploReal: 'All Products.',
    ligaA: ['industry-cloud', 'ariba', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'sales-insights-retail',
    nome: 'SAP Sales Insights for Retail',
    camada: 'lob',
    tipo: 'Analytics retalho',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Insights de vendas de retalho. Help: Sales Insights for Retail.',
    paraQueServe: 'Sell-through e margem de loja.',
    exemploReal: 'All Products.',
    ligaA: ['sac', 's4hana', 'customer-checkout'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'sop-classic',
    nome: 'SAP Sales and Operations Planning',
    camada: 'lob',
    tipo: 'S&OP legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'S&OP clássico. Help: Sales and Operations Planning. Destino: IBP.',
    paraQueServe: 'S&OP em ECC/APO.',
    exemploReal: 'All Products.',
    ligaA: ['ibp', 's4-any'],
    nesteCenario: {
      onprem: 'Legado.',
      cloud: 'Atenuado.',
      rise: 'Atenuado.'
    }
  },

  {
    id: 'screen-personas',
    nome: 'SAP Screen Personas',
    camada: 'core',
    tipo: 'UX clássico',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Simplificar ecrãs SAP GUI. Help: Screen Personas.',
    paraQueServe: 'Dar uma cara aceitável ao GUI enquanto não há Fiori.',
    exemploReal: 'All Products.',
    ligaA: ['fiori', 's4-any'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Screen Personas']
  },

  {
    id: 'secondary-distribution',
    nome: 'SAP Secondary Distribution for Oil and Gas',
    camada: 'lob',
    tipo: 'Downstream oil',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Distribuição secundária oil & gas. Help: Secondary Distribution for Oil and Gas / S/4 Supply Chain for secondary distribution.',
    paraQueServe: 'Terminais e entregas a postos.',
    exemploReal: 'All Products.',
    ligaA: ['s4hana', 'tm', 'industry-cloud'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'security-dd',
    nome: 'Security Due Diligence Service',
    camada: 'alm',
    tipo: 'Security review',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Serviço de due diligence de segurança. Help: Security Due Diligence Service.',
    paraQueServe: 'Rever a postura de segurança do landscape.',
    exemploReal: 'All Products.',
    ligaA: ['etd', 'grc', 'sap-for-me'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'shop-floor-mgr',
    nome: 'SAP Shop Floor Manager',
    camada: 'lob',
    tipo: 'MES clássico',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Gestor de chão de fábrica clássico. Help: Shop Floor Manager. Destino: Digital Manufacturing.',
    paraQueServe: 'Execução de ordens em MES antigo.',
    exemploReal: 'All Products.',
    ligaA: ['digital-manufacturing', 's4-any'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'smart-business',
    nome: 'SAP Smart Business',
    camada: 'dados',
    tipo: 'KPI Fiori',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'KPI tiles Fiori clássicos. Help: Smart Business.',
    paraQueServe: 'Tiles de KPI no launchpad. Destino: SAC / Work Zone cards.',
    exemploReal: 'All Products.',
    ligaA: ['fiori', 'sac'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'slt-toolset',
    nome: 'Software Logistics Toolset',
    camada: 'alm',
    tipo: 'SUM / SL',
    cluster: null,
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Software Logistics Toolset (SUM, SPAM, etc.). Help: Software Logistics Toolset.',
    paraQueServe: 'Upgrades e patches on-prem.',
    exemploReal: 'All Products.',
    ligaA: ['solman', 'lama', 's4-any'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['SL Toolset', 'SUM']
  },

  {
    id: 'solution-hub',
    nome: 'SAP Solution Hub',
    camada: 'alm',
    tipo: 'Catálogo soluções',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Hub de soluções. Help: Solution Hub.',
    paraQueServe: 'Descobrir soluções e pacotes.',
    exemploReal: 'All Products.',
    ligaA: ['sap-for-me', 'cal'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'sourcing-clm',
    nome: 'SAP Sourcing and CLM',
    camada: 'lob',
    tipo: 'Sourcing legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Sourcing e Contract Lifecycle Management clássicos. Help: Sourcing and SAP Contract Lifecycle Management. Destino: Ariba.',
    paraQueServe: 'RFx e contratos no mundo pré-Ariba cloud.',
    exemploReal: 'All Products.',
    ligaA: ['ariba', 'srm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'sports-one',
    nome: 'SAP Sports One',
    camada: 'lob',
    tipo: 'Desporto',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Suite para clubes e federações. Help: Sports One.',
    paraQueServe: 'Plantel, médicos, formação desportiva.',
    exemploReal: 'All Products.',
    ligaA: ['industry-cloud', 'successfactors'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'store-mgmt-gk',
    nome: 'SAP Store Management by GK',
    camada: 'lob',
    tipo: 'Loja GK',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Gestão de loja by GK. Help: Store Management by GK.',
    paraQueServe: 'Backoffice da loja junto ao POS GK.',
    exemploReal: 'All Products.',
    ligaA: ['customer-checkout', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'strategy-mgmt',
    nome: 'SAP Strategy Management',
    camada: 'lob',
    tipo: 'Estratégia',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Strategy Management (BSC). Help: Strategy Management.',
    paraQueServe: 'Mapas estratégicos e iniciativas.',
    exemploReal: 'All Products.',
    ligaA: ['sac', 'ppm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'scm-classic',
    nome: 'SAP Supply Chain Management',
    camada: 'lob',
    tipo: 'SCM suite legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Suite SCM clássica (APO, EWM antigo, TM antigo, SNC). Help: Supply Chain Management.',
    paraQueServe: 'Explicar o ancestral de IBP/EWM/TM.',
    exemploReal: 'All Products.',
    ligaA: ['ibp', 'ewm', 'tm', 'snc'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'scpm',
    nome: 'SAP Supply Chain Performance Management',
    camada: 'lob',
    tipo: 'KPI supply',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Performance da supply chain. Help: Supply Chain Performance Management.',
    paraQueServe: 'KPI de cadeia. Destino: SAC + IBP analytics.',
    exemploReal: 'All Products.',
    ligaA: ['ibp', 'sac'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'support-content',
    nome: 'Support Content',
    camada: 'alm',
    tipo: 'Suporte',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Conteúdos de suporte no Help. Help: Support Content / Built-In Support.',
    paraQueServe: 'Artigos de suporte no produto.',
    exemploReal: 'All Products.',
    ligaA: ['sap-for-me'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'hana-supportability',
    nome: 'Supportability Tools for SAP HANA',
    camada: 'dados',
    tipo: 'Ops HANA',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Ferramentas de supportability HANA. Help: Supportability Tools for SAP HANA.',
    paraQueServe: 'Diagnosticar HANA on-prem.',
    exemploReal: 'All Products.',
    ligaA: ['hana-onprem'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'tao',
    nome: 'SAP Test Acceleration and Optimization',
    camada: 'alm',
    tipo: 'Testes legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'TAO. Help: Test Acceleration and Optimization. Destino: Tricentis.',
    paraQueServe: 'Acelerar testes no SolMan.',
    exemploReal: 'All Products.',
    ligaA: ['solman', 'tricentis'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'tdms',
    nome: 'SAP Test Data Migration Server',
    camada: 'alm',
    tipo: 'Dados de teste',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'TDMS. Help: Test Data Migration Server.',
    paraQueServe: 'Recortar e mascarar dados de PRD para QA.',
    exemploReal: 'All Products.',
    ligaA: ['lama', 'btc', 's4-any'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['TDMS']
  },

  {
    id: 'toc',
    nome: 'Theory of Constraints',
    camada: 'lob',
    tipo: 'Planning add-on',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Theory of Constraints no planning. Help: Theory of Constraints.',
    paraQueServe: 'Gargalos no planeamento.',
    exemploReal: 'All Products.',
    ligaA: ['ibp', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'tpi',
    nome: 'SAP Trading Platform Integration',
    camada: 'core',
    tipo: 'Tesouraria',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Integração com plataformas de trading. Help: Trading Platform Integration.',
    paraQueServe: 'Deals de tesouraria a entrar no TRM.',
    exemploReal: 'All Products.',
    ligaA: ['treasury'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Trading Platform Integration']
  },

  {
    id: 'transactional-banking',
    nome: 'SAP Transactional Banking',
    camada: 'lob',
    tipo: 'Banking core',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Core transaccional bancário. Help: Transactional Banking for S/4HANA.',
    paraQueServe: 'Contas e pagamentos no banco.',
    exemploReal: 'All Products.',
    ligaA: ['industry-cloud', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['Transactional Banking']
  },

  {
    id: 'trp',
    nome: 'SAP Transportation Resource Planning',
    camada: 'lob',
    tipo: 'Recursos TM',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Planeamento de recursos de transporte. Help: Transportation Resource Planning.',
    paraQueServe: 'Tractores, reboques, tripulações.',
    exemploReal: 'All Products.',
    ligaA: ['tm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'transportplaner',
    nome: 'Transportplaner',
    camada: 'lob',
    tipo: 'Planning transportes',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Transportplaner no índice Help (planning táctico).',
    paraQueServe: 'Plano táctico de transportes.',
    exemploReal: 'All Products.',
    ligaA: ['tm', 'trp'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'ui-masking',
    nome: 'UI Data Protection Masking',
    camada: 'plataforma',
    tipo: 'Máscara UI',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Mascarar dados sensíveis no UI. Help: UI Data Protection Masking.',
    paraQueServe: 'Esconder NIF/IBAN em ecrãs.',
    exemploReal: 'All Products.',
    ligaA: ['grc', 's4hana', 'ias'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['UI Masking', 'Data Protection Masking']
  },

  {
    id: 'upc',
    nome: 'Unified Planning Center',
    camada: 'lob',
    tipo: 'Planning hub',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Centro unificado de planeamento. Help: Unified Planning Center.',
    paraQueServe: 'Hub de planos (SAC/IBP/PPM).',
    exemploReal: 'All Products.',
    ligaA: ['sac', 'ibp', 'ppm'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'utilities-css',
    nome: 'Utilities Customer Self-Service',
    camada: 'lob',
    tipo: 'Self-service utilities',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Self-service de cliente utilities. Help: Utilities Customer Self-Service Agent / Multichannel Foundation.',
    paraQueServe: 'Portal do cliente de energia.',
    exemploReal: 'All Products.',
    ligaA: ['cloud-for-energy', 'commerce-cloud'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'work-manager',
    nome: 'SAP Work Manager',
    camada: 'lob',
    tipo: 'Mobile legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Work Manager clássico. Help: Work Manager. Destino: Service and Asset Manager.',
    paraQueServe: 'Técnicos em landscapes Agentry.',
    exemploReal: 'All Products.',
    ligaA: ['service-asset-manager', 's4-any'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'cproject',
    nome: 'SAP cProject Suite',
    camada: 'core',
    tipo: 'Projectos legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'cProjects clássico. Help: cProject Suite. Destino: PPM / S/4 PS.',
    paraQueServe: 'Projectos em Business Suite 7.',
    exemploReal: 'All Products.',
    ligaA: ['ppm', 's4-any'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'cpm',
    nome: 'SAP Commercial Project Management',
    camada: 'core',
    tipo: 'Projectos comerciais',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'CPM — projectos com cliente (timbiling, forecast). Help: Commercial Project Management.',
    paraQueServe: 'Professional services e project manufacturing.',
    exemploReal: 'All Products.',
    ligaA: ['ppm', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['CPM', 'Commercial Project Management']
  },

  {
    id: 'eis',
    nome: 'SAP Enterprise Inventory and Service-Level Optimization',
    camada: 'lob',
    tipo: 'Inventário multi-escalão',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'EIS — optimização de inventário e serviço. Help: Enterprise Inventory and Service-Level Optimization.',
    paraQueServe: 'Stock multi-escalão. Destino conceptual IBP inventory.',
    exemploReal: 'All Products.',
    ligaA: ['ibp', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    },
    aliases: ['EIS']
  },

  {
    id: 'enterprise-chatbot',
    nome: 'SAP Enterprise Chatbot',
    camada: 'lob',
    tipo: 'Chatbot legado',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Chatbot empresarial clássico. Help: Enterprise Chatbot. Destino: Joule.',
    paraQueServe: 'FAQ e tickets antes do Joule.',
    exemploReal: 'All Products.',
    ligaA: ['joule', 'service-cloud'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'edm-digital',
    nome: 'SAP Enterprise Digital Management',
    camada: 'lob',
    tipo: 'Digital ops',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Enterprise Digital Management no índice Help.',
    paraQueServe: 'Operar canais digitais.',
    exemploReal: 'All Products.',
    ligaA: ['commerce-cloud', 'emarsys'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'esm',
    nome: 'SAP Enterprise Service Management',
    camada: 'lob',
    tipo: 'ESM',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Service management empresarial (também linha SuccessFactors ESM). Help: Enterprise Service Management.',
    paraQueServe: 'Serviços internos / shared services.',
    exemploReal: 'All Products.',
    ligaA: ['service-cloud', 'successfactors'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'big-data-services',
    nome: 'SAP Big Data Services',
    camada: 'dados',
    tipo: 'Big data legado',
    cluster: null,
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Serviços big data 2022 no Help. Destino: BDC / Datasphere / hyperscaler nativo.',
    paraQueServe: 'Lakes clássicos SAP.',
    exemploReal: 'All Products.',
    ligaA: ['datasphere', 'bdc'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'margin-assurance',
    nome: 'Big Data Margin Assurance',
    camada: 'lob',
    tipo: 'Margem',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Asseguramento de margem com big data. Help: Big Data Margin Assurance.',
    paraQueServe: 'Detectar fugas de margem.',
    exemploReal: 'All Products.',
    ligaA: ['sac', 's4hana'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  },

  {
    id: 'forecast-opt-hana',
    nome: 'Forecast Optimization on HANA',
    camada: 'lob',
    tipo: 'Forecast',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Optimização de forecast sobre HANA. Help: Forecast Optimization on HANA.',
    paraQueServe: 'Forecast estatístico clássico. Destino: IBP / Predictive Replenishment.',
    exemploReal: 'All Products.',
    ligaA: ['ibp', 'fnr', 'hana-onprem'],
    nesteCenario: {
      onprem: 'Opcional / atenuado.',
      cloud: 'Opcional.',
      rise: 'Opcional.'
    }
  }
,

  {
    id: "business-suite",
    nome: "SAP Business Suite (cloud)",
    camada: "core",
    tipo: "Suite comercial",
    cluster: null,
    cenarios: ["cloud", "rise"],
    perfisRecomendados: ["greenfield", "brownfield"],
    aliases: ["SAP Business Suite", "Autonomous Suite", "Business Suite", "suite SAP"],
    oQueFaz: "Nome comercial actual em sap.com/products.html: o portefólio cloud que junta Cloud ERP (aplicações), Business AI (Joule e agentes), Business Data Cloud e BTP. Não é a Business Suite 7 on-prem (ECC). A página oficial descreve-a como suite autónoma: finanças, spend, supply chain, HCM, CX e indústria, com agentes Joule a executar sobre dados e processos SAP.",
    paraQueServe: "Ler o mapa como a SAP vende em 2026, não só como lista de SKUs. Mistura: Business Suite = s4hana cloud + LoB + bdc + joule + btp. RISE e GROW são as vias de contrato para entrar nesta suite.",
    exemploReal: "sap.com/products.html e sap.com/products/business-suite.html posicionam Business Suite como produto de destaque, alimentado por Business AI + BDC + aplicações, sobre BTP.",
    ligaA: ["s4hana", "joule", "bdc", "btp", "successfactors", "ariba", "ibp", "commerce-cloud"],
    naoConfundir: "NÃO é SAP Business Suite 7 / ECC. Esse ancestral é o card ecc.",
    nesteCenario: {
      onprem: "Irrelevante (a suite cloud). O ancestral on-prem é ECC / Business Suite 7.",
      cloud: "Activo como guarda-chuva comercial do GROW.",
      rise: "Activo como guarda-chuva comercial do RISE."
    }
  },
  {
    id: "cloud-erp",
    nome: "SAP Cloud ERP",
    camada: "core",
    tipo: "ERP Cloud (marca)",
    cluster: null,
    cenarios: ["cloud", "rise"],
    perfisRecomendados: ["greenfield", "brownfield"],
    aliases: ["Cloud ERP", "SAP Cloud ERP", "ready-to-run ERP"],
    oQueFaz: "Nome comercial em sap.com/products.html e /erp.html para o ERP na cloud. Na prática é o S/4HANA Cloud (Public Edition no GROW, Private Edition no RISE). A página fala de ERP ready-to-run com AI embutida em finanças, supply chain e procurement.",
    paraQueServe: "Quando o cliente ouve 'Cloud ERP' e não 'S/4'. Este card aponta para s4hana. Não duplica o digital core: é a etiqueta de marketing.",
    exemploReal: "Featured product em sap.com/products.html com link para /products/erp/s4hana.html.",
    ligaA: ["s4hana", "business-suite", "btp", "joule"],
    naoConfundir: "Não é um terceiro ERP além do S/4 Cloud. É o mesmo motor com outro nome comercial.",
    nesteCenario: {
      onprem: "Irrelevante.",
      cloud: "Activo. Sinónimo comercial do Public Edition.",
      rise: "Activo. Sinónimo comercial do Private Edition / RISE Cloud ERP."
    }
  },

  /* ===== A-Z sap.com/products/a-z.html ===== */

  {
    id: 'visual-enterprise',
    nome: 'SAP 3D Visual Enterprise',
    camada: 'lob',
    tipo: 'PLM 3D',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Visualização 3D ligada a dados de negócio. A-Z: SAP 3D Visual Enterprise. Irmão do Product Model Viewer.',
    paraQueServe: 'Ver o gémeo 3D no chão de fábrica e no serviço.',
    exemploReal: 'sap.com/products/a-z.html entrada #.',
    ligaA: ['ipd', 'product-model-viewer', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['3D Visual Enterprise']
  },

  {
    id: 'absence-wfs',
    nome: 'SAP Absence and Leave Management by WorkForce Software',
    camada: 'lob',
    tipo: 'Ausências',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['workforce'],
    oQueFaz: 'Pedidos de ausência by WorkForce Software. A-Z HCM.',
    paraQueServe: 'Férias e leaves quando o WFS está no landscape (além do SF Time).',
    exemploReal: 'A-Z: Absence and Leave Management.',
    ligaA: ['successfactors', 'workforce-forecast'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'access-control',
    nome: 'SAP Access Control',
    camada: 'lob',
    tipo: 'GRC SoD',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'SoD e provisionamento on-prem. A-Z: Access Control. Família GRC; IAG é o irmão cloud.',
    paraQueServe: 'Aprovar acessos e detectar conflitos no ECC/S/4 on-prem.',
    exemploReal: 'A-Z Financial management / Access Control.',
    ligaA: ['grc', 'iag', 's4-any'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['Access Control', 'GRC AC']
  },

  {
    id: 'avm-pathlock',
    nome: 'SAP Access Violation Management by Pathlock',
    camada: 'lob',
    tipo: 'SoD parceiro',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Violations de acesso by Pathlock. A-Z.',
    paraQueServe: 'Analisar violações SoD em landscapes híbridos.',
    exemploReal: 'A-Z.',
    ligaA: ['access-control', 'grc', 'iag'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'blackline-asa',
    nome: 'SAP Account Substantiation and Automation by BlackLine',
    camada: 'core',
    tipo: 'Fecho parceiro',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Substantiation e automação de contas by BlackLine. A-Z.',
    paraQueServe: 'Reconciliar contas no fecho, ao lado do Closing Cockpit.',
    exemploReal: 'A-Z.',
    ligaA: ['financial-closing', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['BlackLine']
  },

  {
    id: 'ase',
    nome: 'SAP Adaptive Server Enterprise',
    camada: 'dados',
    tipo: 'DB OLTP',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'ASE / Sybase SQL Server. A-Z. Distinto de HANA e de SQL Anywhere.',
    paraQueServe: 'OLTP clássico que ainda corre em muitos clientes.',
    exemploReal: 'A-Z: Adaptive Server Enterprise.',
    ligaA: ['sql-anywhere', 'hana-onprem', 'replication-server'],
    nesteCenario: { onprem: 'Opcional legado.', cloud: 'Escondido.', rise: 'Escondido.' },
    aliases: ['ASE', 'Sybase ASE']
  },

  {
    id: 'syniti-adm',
    nome: 'SAP Advanced Data Migration by Syniti',
    camada: 'dados',
    tipo: 'Migração',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'Migração e qualidade de dados by Syniti. A-Z.',
    paraQueServe: 'Cargas brownfield / S/4 conversion.',
    exemploReal: 'A-Z.',
    ligaA: ['btc', 'mdg', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['Syniti', 'ADM']
  },

  {
    id: 'afc',
    nome: 'SAP Advanced Financial Closing',
    camada: 'core',
    tipo: 'Fecho cloud',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Fecho financeiro avançado na cloud. A-Z. Evolução do Closing Cockpit.',
    paraQueServe: 'Orquestrar o fecho no S/4 Cloud / RISE.',
    exemploReal: 'A-Z: Advanced Financial Closing.',
    ligaA: ['financial-closing', 's4hana', 'group-reporting'],
    nesteCenario: { onprem: 'Atenuado (usar FCC).', cloud: 'Recomendado.', rise: 'Recomendado.' },
    aliases: ['AFC', 'Advanced Financial Closing']
  },

  {
    id: 'apo',
    nome: 'SAP Advanced Planning and Optimization',
    camada: 'lob',
    tipo: 'APO legado',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'APO clássico. A-Z. Destino: IBP + S/4 PP/DS + eATP.',
    paraQueServe: 'SNP/DP/PP-DS em Business Suite 7.',
    exemploReal: 'A-Z.',
    ligaA: ['ibp', 'scm-classic', 's4-any'],
    nesteCenario: { onprem: 'Legado.', cloud: 'Escondido.', rise: 'Atenuado.' },
    aliases: ['APO']
  },

  {
    id: 'att-pharma',
    nome: 'SAP Advanced Track and Trace for Pharmaceuticals',
    camada: 'lob',
    tipo: 'T&T pharma',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria', 'regulado'],
    oQueFaz: 'Track and trace farmacêutico no S/4. A-Z.',
    paraQueServe: 'Serialização e compliance DSCSA/EU-FMD.',
    exemploReal: 'A-Z.',
    ligaA: ['gbt', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['ATTP']
  },

  {
    id: 'agent-lm',
    nome: 'SAP Agent Lifecycle Management',
    camada: 'lob',
    tipo: 'Agentes',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Ciclo de vida de agentes (seguros / canais). A-Z.',
    paraQueServe: 'Onboarding e compliance de agentes.',
    exemploReal: 'A-Z.',
    ligaA: ['agent-compliance', 'successfactors', 'insurance-underwriting'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'agent-pm',
    nome: 'SAP Agent Performance Management',
    camada: 'lob',
    tipo: 'Agentes',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Performance e comissões de agentes. A-Z.',
    paraQueServe: 'Incentivos de canal.',
    exemploReal: 'A-Z.',
    ligaA: ['agent-lm', 'incentive-mgmt'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'acm',
    nome: 'SAP Agricultural Contract Management',
    camada: 'lob',
    tipo: 'Agro contratos',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Contratos agrícolas. A-Z.',
    paraQueServe: 'Compra de colheita e posições.',
    exemploReal: 'A-Z.',
    ligaA: ['rural-sourcing', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['ACM']
  },

  {
    id: 'ai-agent-hub',
    nome: 'SAP AI Agent Hub',
    camada: 'plataforma',
    tipo: 'Agentes IA',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Hub de agentes IA. A-Z: SAP AI Agent Hub. Sítio onde se publicam e governam agentes Joule.',
    paraQueServe: 'Catálogo e governação de agentes no BTP.',
    exemploReal: 'A-Z.',
    ligaA: ['joule', 'ai-foundation', 'btp'],
    nesteCenario: { onprem: 'Ausente.', cloud: 'Recomendado com Joule.', rise: 'Recomendado com Joule.' }
  },

  {
    id: 'aif',
    nome: 'SAP Application Interface Framework',
    camada: 'integracao',
    tipo: 'AIF',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Framework de interfaces no ECC/S/4. A-Z. Complementa PI/PO e Integration Suite no lado aplicativo.',
    paraQueServe: 'Monitorizar e mapear IDocs/proxies no ERP.',
    exemploReal: 'A-Z.',
    ligaA: ['s4-any', 'pipo', 'integration-suite'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['AIF']
  },

  {
    id: 'opentext-archive',
    nome: 'SAP Archiving and Document Access by OpenText',
    camada: 'dados',
    tipo: 'Arquivo',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Arquivo e acesso a documentos by OpenText. A-Z.',
    paraQueServe: 'Arquivar documentos de negócio fora do HANA.',
    exemploReal: 'A-Z.',
    ligaA: ['ilm', 's4hana', 'vim'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'asset-workbench',
    nome: 'SAP Asset Information Workbench',
    camada: 'lob',
    tipo: 'Activos',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Workbench de informação de activos. A-Z.',
    paraQueServe: 'Dados técnicos do activo para APM/EAM.',
    exemploReal: 'A-Z.',
    ligaA: ['apm', 'mdg'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'audit-mgmt',
    nome: 'SAP Audit Management',
    camada: 'lob',
    tipo: 'Auditoria GRC',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Auditoria interna. A-Z. Família GRC.',
    paraQueServe: 'Plano de auditoria e working papers.',
    exemploReal: 'A-Z.',
    ligaA: ['grc', 'process-control', 'risk-mgmt'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'batch-release-ls',
    nome: 'SAP Batch Release Hub for Life Sciences',
    camada: 'lob',
    tipo: 'Life sciences',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria', 'regulado'],
    oQueFaz: 'Libertação de lotes farmacêuticos. A-Z.',
    paraQueServe: 'Batch release com dados de qualidade e compliance.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'att-pharma', 'qir'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'broker-reconciliation',
    nome: 'SAP Broker Reconciliation for Commodity Derivatives',
    camada: 'core',
    tipo: 'Commodities',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Reconciliação de brokers em derivados. A-Z.',
    paraQueServe: 'Tesouraria de commodities.',
    exemploReal: 'A-Z.',
    ligaA: ['treasury', 'commodity-mgmt'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'bas',
    nome: 'SAP Business Application Studio',
    camada: 'plataforma',
    tipo: 'IDE cloud',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'IDE cloud do BTP. A-Z. Sucessor do Web IDE.',
    paraQueServe: 'Desenvolver CAP, Fiori, extensões clean core.',
    exemploReal: 'A-Z.',
    ligaA: ['btp', 'build', 'abap-env'],
    nesteCenario: { onprem: 'Ausente.', cloud: 'Activo com BTP.', rise: 'Activo com BTP.' },
    aliases: ['BAS', 'Business Application Studio']
  },

  {
    id: 'integrity-screening',
    nome: 'SAP Business Integrity Screening',
    camada: 'lob',
    tipo: 'Fraude',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Screening de integridade / fraude. A-Z.',
    paraQueServe: 'Detectar pagamentos e parceiros suspeitos.',
    exemploReal: 'A-Z.',
    ligaA: ['grc', 'watch-list'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'bn-asset',
    nome: 'SAP Business Network Asset Collaboration',
    camada: 'lob',
    tipo: 'Rede activos',
    cluster: 'spend',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Colaboração de activos na Business Network. A-Z.',
    paraQueServe: 'OEM e operador partilham o gémeo do activo.',
    exemploReal: 'A-Z.',
    ligaA: ['business-network', 'apm'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'bn-commerce',
    nome: 'SAP Business Network Commerce Automation',
    camada: 'lob',
    tipo: 'Rede compras',
    cluster: 'spend',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Automação comercial na Network (PO, ASN, invoice). A-Z.',
    paraQueServe: 'Transaccionar com fornecedores na rede.',
    exemploReal: 'A-Z.',
    ligaA: ['business-network', 'ariba'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'bn-freight',
    nome: 'SAP Business Network Freight Collaboration',
    camada: 'lob',
    tipo: 'Rede freight',
    cluster: 'supply',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Colaboração com transportadores. A-Z.',
    paraQueServe: 'Tendering e tracking de freight.',
    exemploReal: 'A-Z.',
    ligaA: ['business-network', 'tm'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'bn-gtt',
    nome: 'SAP Business Network Global Track and Trace',
    camada: 'lob',
    tipo: 'GTT',
    cluster: 'supply',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Track and trace global na Network. A-Z.',
    paraQueServe: 'Visibilidade multi-modal da encomenda.',
    exemploReal: 'A-Z.',
    ligaA: ['business-network', 'gbt', 'event-management'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['GTT', 'Global Track and Trace']
  },

  {
    id: 'bn-traceability',
    nome: 'SAP Business Network Material Traceability',
    camada: 'lob',
    tipo: 'Rastreio material',
    cluster: 'supply',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Rastreio de material na Network. A-Z.',
    paraQueServe: 'Origem do lote ao longo da rede.',
    exemploReal: 'A-Z.',
    ligaA: ['business-network', 'gbt'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'bn-planning',
    nome: 'SAP Business Network Planning Collaboration',
    camada: 'lob',
    tipo: 'Rede planning',
    cluster: 'supply',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Colaboração de planos com parceiros. A-Z.',
    paraQueServe: 'Partilhar previsões IBP com fornecedores.',
    exemploReal: 'A-Z.',
    ligaA: ['business-network', 'ibp'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'bn-scc',
    nome: 'SAP Business Network Supply Chain Collaboration',
    camada: 'lob',
    tipo: 'SCC',
    cluster: 'supply',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Supply Chain Collaboration na Network. A-Z.',
    paraQueServe: 'Forecast, inventory e ordens com o fornecedor.',
    exemploReal: 'A-Z.',
    ligaA: ['business-network', 'snc', 'ibp'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['BN SCC']
  },

  {
    id: 'vistex-channel',
    nome: 'SAP Channel Program Management by Vistex',
    camada: 'lob',
    tipo: 'Canal Vistex',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Programas de canal by Vistex. A-Z.',
    paraQueServe: 'Incentivos e programas a revendedores.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'incentive-mgmt'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'mirakl',
    nome: 'SAP Commerce Marketplace Management by Mirakl',
    camada: 'lob',
    tipo: 'Marketplace',
    cluster: 'cx',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Marketplace no Commerce Cloud by Mirakl. A-Z.',
    paraQueServe: 'Multi-seller na loja.',
    exemploReal: 'A-Z.',
    ligaA: ['commerce-cloud'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'commodity-mgmt',
    nome: 'SAP Commodity Management',
    camada: 'core',
    tipo: 'Commodities',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Gestão de commodities no S/4. A-Z.',
    paraQueServe: 'Contratos e risco de commodities.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'treasury', 'broker-reconciliation'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'complaint-handling',
    nome: 'SAP Complaint Handling',
    camada: 'lob',
    tipo: 'Reclamações',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Tratamento de reclamações. A-Z.',
    paraQueServe: 'Reclamações de qualidade / cliente.',
    exemploReal: 'A-Z.',
    ligaA: ['qir', 'service-cloud', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'opentext-cms',
    nome: 'SAP Content Management Core by OpenText',
    camada: 'dados',
    tipo: 'ECM',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Content management core by OpenText. A-Z.',
    paraQueServe: 'Repositório ECM junto ao S/4.',
    exemploReal: 'A-Z.',
    ligaA: ['opentext-archive', 'vim', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'skillsoft',
    nome: 'SAP Content Stream by Skillsoft',
    camada: 'alm',
    tipo: 'Learning content',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Conteúdos Skillsoft no Learning. A-Z.',
    paraQueServe: 'Catálogo de formação.',
    exemploReal: 'A-Z.',
    ligaA: ['successfactors', 'enable-now'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'serialization',
    nome: 'SAP Corporate Serialization',
    camada: 'lob',
    tipo: 'Serialização',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Serialização corporativa. A-Z.',
    paraQueServe: 'Números de série ponta-a-ponta.',
    exemploReal: 'A-Z.',
    ligaA: ['gbt', 'att-pharma', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'crystal',
    nome: 'SAP Crystal Reports',
    camada: 'dados',
    tipo: 'Reporting',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Crystal Reports / Crystal Server / Crystal Solutions. A-Z. Distinto do SAC.',
    paraQueServe: 'Reports pixel-perfect clássicos.',
    exemploReal: 'A-Z.',
    ligaA: ['businessobjects', 'sac'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['Crystal Reports', 'Crystal Server']
  },

  {
    id: 'car',
    nome: 'SAP Customer Activity Repository',
    camada: 'lob',
    tipo: 'Retalho CAR',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'CAR — repositório de actividade do cliente retalho. A-Z.',
    paraQueServe: 'POS, stock e procura numa vista.',
    exemploReal: 'A-Z.',
    ligaA: ['customer-checkout', 's4hana', 'fnr'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['CAR']
  },

  {
    id: 'cdp',
    nome: 'SAP Customer Data Platform',
    camada: 'lob',
    tipo: 'CDP',
    cluster: 'cx',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'CDP. A-Z. Irmão do Customer Data Cloud (CIAM); o CDP perfila o cliente 360.',
    paraQueServe: 'Unificar eventos de cliente para CX.',
    exemploReal: 'A-Z.',
    ligaA: ['customer-data-cloud', 'emarsys', 'sales-cloud'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['CDP'],
    naoConfundir: 'Não é o Customer Data Cloud (esse é CIAM/Gigya).'
  },

  {
    id: 'dairy-msg',
    nome: 'SAP Dairy Management by msg',
    camada: 'lob',
    tipo: 'Lacticínios',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Dairy by msg. A-Z.',
    paraQueServe: 'Recepção de leite e yield.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'industry-cloud'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'vistex-data',
    nome: 'SAP Data Maintenance by Vistex',
    camada: 'dados',
    tipo: 'Master data Vistex',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Manutenção de dados by Vistex. A-Z.',
    paraQueServe: 'Preços e masters Vistex.',
    exemploReal: 'A-Z.',
    ligaA: ['mdg', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'dqm-location',
    nome: 'SAP Data Quality Management, location microservices',
    camada: 'dados',
    tipo: 'DQ moradas',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Microserviços de qualidade de morada. A-Z.',
    paraQueServe: 'Validar moradas em apps BTP/S/4.',
    exemploReal: 'A-Z.',
    ligaA: ['btp', 'mdg', 'data-services'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'opentext-dam',
    nome: 'SAP Digital Asset Management Cloud by OpenText',
    camada: 'lob',
    tipo: 'DAM',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'DAM cloud by OpenText. A-Z.',
    paraQueServe: 'Activos digitais (imagens, vídeo) para CX/PLM.',
    exemploReal: 'A-Z.',
    ligaA: ['commerce-cloud', 'opentext-cms'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'document-ai',
    nome: 'SAP Document AI',
    camada: 'plataforma',
    tipo: 'IA documentos',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Document AI no BTP (ex-Document Information Extraction). A-Z.',
    paraQueServe: 'Extrair facturas, encomendas e IDs com IA.',
    exemploReal: 'A-Z.',
    ligaA: ['btp', 'ai-foundation', 'vim', 'joule'],
    nesteCenario: { onprem: 'Atenuado.', cloud: 'Recomendado.', rise: 'Recomendado.' },
    aliases: ['Document Information Extraction', 'DOX']
  },

  {
    id: 'opentext-presentment',
    nome: 'SAP Document Presentment by OpenText',
    camada: 'lob',
    tipo: 'Presentment',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Presentment de documentos by OpenText. A-Z.',
    paraQueServe: 'Enviar facturas/extractos ao cliente.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'opentext-cms'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'e-mobility',
    nome: 'SAP E-Mobility',
    camada: 'lob',
    tipo: 'Mobilidade eléctrica',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'E-Mobility. A-Z.',
    paraQueServe: 'Carregamento e frota eléctrica.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'iot', 'industry-cloud'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'ectr',
    nome: 'SAP Engineering Control Center',
    camada: 'lob',
    tipo: 'ECTR',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Engineering Control Center (integra CAD no SAP). A-Z.',
    paraQueServe: 'Engenheiro grava o modelo no S/4/PLM.',
    exemploReal: 'A-Z.',
    ligaA: ['ipd', 'plm-onprem', 'teamcenter-gw'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['ECTR']
  },

  {
    id: 'vistex-excise',
    nome: 'SAP Excise Tax Management by Vistex',
    camada: 'lob',
    tipo: 'Imposto especial',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Impostos especiais de consumo by Vistex. A-Z.',
    paraQueServe: 'Excise em bebidas, tabaco, combustível.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'document-compliance'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'opentext-xecm',
    nome: 'SAP Extended ECM by OpenText',
    camada: 'dados',
    tipo: 'xECM',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Extended ECM by OpenText. A-Z.',
    paraQueServe: 'ECM alargado ligado a objectos SAP.',
    exemploReal: 'A-Z.',
    ligaA: ['opentext-cms', 'opentext-archive', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'vistex-price',
    nome: 'SAP Extended Price Management by Vistex',
    camada: 'lob',
    tipo: 'Preço Vistex',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Preços alargados by Vistex. A-Z.',
    paraQueServe: 'Price lists complexas e channel price.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'ssc'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'vistex-grower',
    nome: 'SAP Grower Management for Perishables by Vistex',
    camada: 'lob',
    tipo: 'Produtores',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Growers de perecíveis by Vistex. A-Z.',
    paraQueServe: 'Contratos com agricultores.',
    exemploReal: 'A-Z.',
    ligaA: ['acm', 'rural-sourcing'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'incentive-mgmt',
    nome: 'SAP Incentive Management',
    camada: 'lob',
    tipo: 'Incentivos',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Incentive Management (e Vistex Incentive Administration). A-Z.',
    paraQueServe: 'Comissões de força de vendas.',
    exemploReal: 'A-Z.',
    ligaA: ['successfactors', 's4hana', 'agent-pm'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['Incentive Administration by Vistex']
  },

  {
    id: 'information-steward',
    nome: 'SAP Information Steward',
    camada: 'dados',
    tipo: 'DQ clássico',
    cluster: null,
    cenarios: ['onprem', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Information Steward. A-Z. Família EIM com Data Services.',
    paraQueServe: 'Perfilar e validar qualidade de dados on-prem.',
    exemploReal: 'A-Z.',
    ligaA: ['data-services', 'metadata-management'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'intelligent-agriculture',
    nome: 'SAP Intelligent Agriculture',
    camada: 'lob',
    tipo: 'Agro',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Agricultura inteligente. A-Z.',
    paraQueServe: 'Talhões, safras e compliance agrícola.',
    exemploReal: 'A-Z.',
    ligaA: ['acm', 'iot', 'industry-cloud'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'icsm',
    nome: 'SAP Intelligent Clinical Supply Management',
    camada: 'lob',
    tipo: 'Ensaios clínicos',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria', 'regulado'],
    oQueFaz: 'Supply de ensaios clínicos. A-Z.',
    paraQueServe: 'Kits clínicos e blinding.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'ibp'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['ICSM']
  },

  {
    id: 'blackline-ic',
    nome: 'SAP Intercompany Governance by BlackLine',
    camada: 'core',
    tipo: 'Intercompany',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Governação intercompany by BlackLine. A-Z.',
    paraQueServe: 'Reconciliar IC no grupo.',
    exemploReal: 'A-Z.',
    ligaA: ['blackline-asa', 's4hana', 'group-reporting'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'iq',
    nome: 'SAP IQ',
    camada: 'dados',
    tipo: 'Colunar clássico',
    cluster: null,
    cenarios: ['onprem'],
    perfisRecomendados: [],
    oQueFaz: 'Sybase IQ, warehouse colunar. A-Z. Destino: HANA Cloud / Datasphere / BDC.',
    paraQueServe: 'DWH clássico SAP Sybase.',
    exemploReal: 'A-Z.',
    ligaA: ['hana-cloud', 'datasphere', 'ase'],
    nesteCenario: { onprem: 'Legado.', cloud: 'Atenuado.', rise: 'Atenuado.' },
    aliases: ['Sybase IQ']
  },

  {
    id: 'joule-studio',
    nome: 'SAP Joule Studio',
    camada: 'plataforma',
    tipo: 'Studio agentes',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Studio para criar skills e agentes Joule. A-Z e o post Alok. Esquema SCH-JOULE-STUDIO.',
    paraQueServe: 'Estender o Joule sem mexer no core.',
    exemploReal: 'A-Z: Joule Studio.',
    ligaA: ['joule', 'ai-agent-hub', 'build', 'ai-foundation'],
    nesteCenario: { onprem: 'Ausente.', cloud: 'Recomendado com Joule.', rise: 'Recomendado.' },
    aliases: ['Joule Studio']
  },

  {
    id: 'joule-consultants',
    nome: 'SAP Joule for Consultants',
    camada: 'alm',
    tipo: 'IA consultores',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Joule para consultores (activar, configurar, explorar). A-Z.',
    paraQueServe: 'Acelerar projectos Activate / RISE.',
    exemploReal: 'A-Z.',
    ligaA: ['joule', 'btc', 'cloud-alm', 'enable-now'],
    nesteCenario: { onprem: 'Atenuado.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'joule-developers',
    nome: 'Joule for developers',
    camada: 'plataforma',
    tipo: 'IA dev',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Joule no BAS / ABAP / Build Code. A-Z.',
    paraQueServe: 'Gerar e explicar código nas extensões.',
    exemploReal: 'A-Z.',
    ligaA: ['joule', 'bas', 'build', 'abap-env'],
    nesteCenario: { onprem: 'Atenuado.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'knowledge-central',
    nome: 'SAP Knowledge Central by NICE',
    camada: 'lob',
    tipo: 'Knowledge CX',
    cluster: 'cx',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Knowledge central by NICE. A-Z.',
    paraQueServe: 'Base de conhecimento no service desk.',
    exemploReal: 'A-Z.',
    ligaA: ['service-cloud'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'knowledge-graph',
    nome: 'SAP Knowledge Graph',
    camada: 'dados',
    tipo: 'Grafo',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Knowledge Graph (HANA Cloud / BDC). A-Z.',
    paraQueServe: 'Relações semânticas para grounding do Joule.',
    exemploReal: 'A-Z.',
    ligaA: ['hana-cloud', 'bdc', 'joule', 'ai-foundation'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['Knowledge Graph']
  },

  {
    id: 'slt',
    nome: 'SAP Landscape Transformation Replication Server',
    camada: 'dados',
    tipo: 'SLT',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'SLT — replicação trigger-based para HANA / CFIN / Datasphere. A-Z. Distinto do Sybase Replication Server.',
    paraQueServe: 'Replicar ECC/S/4 para HANA, BW, CFIN, BTC.',
    exemploReal: 'A-Z.',
    ligaA: ['hana-onprem', 'central-finance', 'btc', 'datasphere'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['SLT', 'LT Replication Server'],
    naoConfundir: 'Não é o Sybase Replication Server (card replication-server).'
  },

  {
    id: 'lt',
    nome: 'SAP Landscape Transformation',
    camada: 'alm',
    tipo: 'Conversão landscape',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['brownfield'],
    oQueFaz: 'LT — transformações de landscape (carve-out, merge). A-Z.',
    paraQueServe: 'M&A e carve-out de clientes SAP.',
    exemploReal: 'A-Z.',
    ligaA: ['btc', 'slt', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'learning-hub',
    nome: 'SAP Learning Hub',
    camada: 'alm',
    tipo: 'Formação',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Learning Hub. A-Z.',
    paraQueServe: 'Formação oficial SAP para o projecto.',
    exemploReal: 'A-Z.',
    ligaA: ['enable-now', 'knowledge-acceleration'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'linear-asset',
    nome: 'SAP Linear Asset Management',
    camada: 'lob',
    tipo: 'Activos lineares',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Activos lineares (pipeline, via, rede). A-Z.',
    paraQueServe: 'EAM de infra-estruturas lineares.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'apm'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'market-rates',
    nome: 'SAP Market Rates Management',
    camada: 'core',
    tipo: 'Tesouraria',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Market Rates Management. A-Z.',
    paraQueServe: 'Câmbios e curvas para TRM.',
    exemploReal: 'A-Z.',
    ligaA: ['treasury'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'meat-msg',
    nome: 'SAP Meat and Fish Management by msg',
    camada: 'lob',
    tipo: 'Carne e peixe',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Meat and Fish by msg. A-Z.',
    paraQueServe: 'Desossa, yield e catch weight.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'industry-cloud'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'osta',
    nome: 'SAP Omnichannel Sales Transfer and Audit',
    camada: 'lob',
    tipo: 'Retalho audit',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Transfer e audit de vendas omnichannel. A-Z.',
    paraQueServe: 'Fechar o dia da loja contra o CAR/S/4.',
    exemploReal: 'A-Z.',
    ligaA: ['car', 'customer-checkout', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'vistex-paybacks',
    nome: 'SAP Paybacks and Chargebacks by Vistex',
    camada: 'lob',
    tipo: 'Chargebacks',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Paybacks e chargebacks by Vistex. A-Z.',
    paraQueServe: 'Liquidar programas de canal.',
    exemploReal: 'A-Z.',
    ligaA: ['vistex-channel', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'postgres-btp',
    nome: 'PostgreSQL on SAP BTP',
    camada: 'plataforma',
    tipo: 'DB BTP',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'PostgreSQL hyperscaler option no BTP. A-Z.',
    paraQueServe: 'BD relacional das extensões CAP.',
    exemploReal: 'A-Z.',
    ligaA: ['btp', 'runtimes-btp', 'hana-cloud'],
    nesteCenario: { onprem: 'Ausente.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'vistex-price-hub',
    nome: 'SAP Price Staging Hub by Vistex',
    camada: 'lob',
    tipo: 'Preço',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Price staging hub by Vistex. A-Z.',
    paraQueServe: 'Staging de preços antes do S/4.',
    exemploReal: 'A-Z.',
    ligaA: ['vistex-price', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'prm',
    nome: 'SAP Project and Resource Management',
    camada: 'core',
    tipo: 'Projectos cloud',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Project and Resource Management. A-Z. Irmão cloud do PPM.',
    paraQueServe: 'Staffing e projectos sem o PPM on-prem.',
    exemploReal: 'A-Z.',
    ligaA: ['ppm', 's4hana', 'successfactors'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'digitalroute-rdo',
    nome: 'SAP Revenue Data Orchestration by DigitalRoute',
    camada: 'lob',
    tipo: 'Uso / receita',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Orquestração de dados de receita by DigitalRoute. A-Z. Alimenta BRIM.',
    paraQueServe: 'Mediar eventos de uso até à factura.',
    exemploReal: 'A-Z.',
    ligaA: ['brim'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['DigitalRoute']
  },

  {
    id: 'vistex-rights',
    nome: 'SAP Rights and Royalty Management by Vistex',
    camada: 'lob',
    tipo: 'Royalties',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Rights and royalties by Vistex. A-Z.',
    paraQueServe: 'Media, pharma e IP royalties.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'industry-cloud'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'risk-assurance',
    nome: 'SAP Risk and Assurance Management',
    camada: 'lob',
    tipo: 'GRC cloud',
    cluster: null,
    cenarios: ['cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Risk and Assurance Management (GRC cloud). A-Z.',
    paraQueServe: 'Riscos e assurance no S/4 Cloud.',
    exemploReal: 'A-Z.',
    ligaA: ['grc', 'risk-mgmt', 'process-control'],
    nesteCenario: { onprem: 'Atenuado.', cloud: 'Recomendado vs GRC on-prem.', rise: 'Recomendado.' }
  },

  {
    id: 'secure-login',
    nome: 'SAP Secure Login Service for SAP GUI',
    camada: 'plataforma',
    tipo: 'SSO GUI',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Secure Login para SAP GUI. A-Z. Irmão cloud do SSO clássico.',
    paraQueServe: 'SSO moderno no GUI em RISE.',
    exemploReal: 'A-Z.',
    ligaA: ['sso-classic', 'ias', 's4-any'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['Secure Login']
  },

  {
    id: 'smartrecruiters',
    nome: 'SmartRecruiters for SAP SuccessFactors',
    camada: 'lob',
    tipo: 'Recruiting',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['workforce'],
    oQueFaz: 'SmartRecruiters bundled com SuccessFactors. A-Z.',
    paraQueServe: 'Recruiting moderno ligado ao SF.',
    exemploReal: 'A-Z.',
    ligaA: ['successfactors'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'spend-analytics',
    nome: 'SAP Spend Analytics',
    camada: 'lob',
    tipo: 'Analytics spend',
    cluster: 'spend',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Spend analytics. A-Z.',
    paraQueServe: 'Ver o gasto além do Ariba reporting.',
    exemploReal: 'A-Z.',
    ligaA: ['ariba', 'sac', 'spend-control-tower'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'student-lm',
    nome: 'SAP Student Lifecycle Management',
    camada: 'lob',
    tipo: 'Ensino',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria'],
    oQueFaz: 'Student Lifecycle no S/4 Private. A-Z.',
    paraQueServe: 'Universidades: matrícula a diploma.',
    exemploReal: 'A-Z.',
    ligaA: ['s4hana', 'successfactors'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'territory-quota',
    nome: 'SAP Territory and Quota',
    camada: 'lob',
    tipo: 'Territórios',
    cluster: 'cx',
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Territórios e quotas de vendas. A-Z.',
    paraQueServe: 'Desenhar territórios no Sales Cloud.',
    exemploReal: 'A-Z.',
    ligaA: ['sales-cloud'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'time-attendance',
    nome: 'SAP Time and Attendance Management by WorkForce Software',
    camada: 'lob',
    tipo: 'Ponto',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['workforce'],
    oQueFaz: 'Time and Attendance by WFS. A-Z.',
    paraQueServe: 'Relógio de ponto e turnos.',
    exemploReal: 'A-Z.',
    ligaA: ['successfactors', 'absence-wfs', 'workforce-forecast'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'twm',
    nome: 'SAP Total Workforce Management',
    camada: 'lob',
    tipo: 'Workforce total',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['workforce'],
    oQueFaz: 'Total Workforce (próprios + contingentes). A-Z.',
    paraQueServe: 'Ler SF + Fieldglass como uma força de trabalho.',
    exemploReal: 'A-Z.',
    ligaA: ['successfactors', 'fieldglass'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['Total Workforce Management']
  },

  {
    id: 'us-benefits',
    nome: 'SAP U.S. Benefits Administration by Benefitfocus',
    camada: 'lob',
    tipo: 'Benefícios US',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['workforce'],
    oQueFaz: 'Benefícios EUA by Benefitfocus. A-Z.',
    paraQueServe: 'Open enrollment US.',
    exemploReal: 'A-Z.',
    ligaA: ['successfactors', 'budget-benefits'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'ui-logging',
    nome: 'UI data protection logging',
    camada: 'plataforma',
    tipo: 'Audit UI',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Logging de acesso a dados no UI. A-Z. Irmão do masking.',
    paraQueServe: 'Quem viu o IBAN.',
    exemploReal: 'A-Z.',
    ligaA: ['ui-masking', 'grc'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'knoa',
    nome: 'SAP User Experience Management by Knoa',
    camada: 'alm',
    tipo: 'UX analytics',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'UX management by Knoa. A-Z.',
    paraQueServe: 'Medir fricção no GUI/Fiori.',
    exemploReal: 'A-Z.',
    ligaA: ['fiori', 'walkme', 'enable-now'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'utilities-core',
    nome: 'SAP Utilities Core foundation',
    camada: 'lob',
    tipo: 'IS-U core',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['industria', 'regulado'],
    oQueFaz: 'Foundation utilities no S/4. A-Z.',
    paraQueServe: 'Core IS-U (contrato, medição) além do Cloud for Energy.',
    exemploReal: 'A-Z.',
    ligaA: ['cloud-for-energy', 's4hana'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'vc-pricing',
    nome: 'SAP Variant Configuration and Pricing',
    camada: 'lob',
    tipo: 'VC / preço',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Variant configuration and pricing (CPS). A-Z. Irmão do SSC/CPQ.',
    paraQueServe: 'Configurar produto + preço em runtime.',
    exemploReal: 'A-Z.',
    ligaA: ['ssc', 'cpq', 's4hana', 'commerce-cloud'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['CPS', 'Variant Configuration']
  },

  {
    id: 'vistex-vendor',
    nome: 'SAP Vendor Program Management by Vistex',
    camada: 'lob',
    tipo: 'Programas fornecedor',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: [],
    oQueFaz: 'Programas de fornecedor by Vistex. A-Z.',
    paraQueServe: 'Billbacks e programas lado compra.',
    exemploReal: 'A-Z.',
    ligaA: ['vistex-channel', 'ariba'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' }
  },

  {
    id: 'watch-list',
    nome: 'SAP Watch List Screening',
    camada: 'lob',
    tipo: 'Screening',
    cluster: null,
    cenarios: ['onprem', 'cloud', 'rise'],
    perfisRecomendados: ['regulado'],
    oQueFaz: 'Watch list screening (sancções). A-Z.',
    paraQueServe: 'Filtrar parceiros contra listas oficiais.',
    exemploReal: 'A-Z.',
    ligaA: ['gts', 'integrity-screening', 'grc'],
    nesteCenario: { onprem: 'Opcional.', cloud: 'Opcional.', rise: 'Opcional.' },
    aliases: ['Watch List Screening']
  }


]

export const SERVICOS_POR_ID = Object.fromEntries(SERVICOS.map((s) => [s.id, s]))

const IDS_REDE = new Set(['aws', 'azure', 'gcp', 'sci', 'dc-onprem', 'cdc-option', 'cloud-connector', 'eic', 'sovereign-cloud', 'ns2'])

const PADRAO_ESTADO = /\b(activo|ativo|escondido|irrelevante|ausente|substituído|legado|atenuado|opcional|recomendado|raro|disponível)\b/i
function estadoBaseDoTexto(texto) {
  const m = texto.match(PADRAO_ESTADO)
  if (!m) return null
  switch (m[1].toLowerCase()) {
    case 'activo': case 'ativo': return 'activo'
    case 'escondido': case 'irrelevante': case 'ausente': case 'substituído': return 'irrelevante'
    case 'legado': return 'irrelevante'
    default: return 'opcional'
  }
}

export function obterEstado(servicoId, { cenario, mostrarLegado, perfisActivos = [] }) {
  const s = SERVICOS_POR_ID[servicoId]
  const texto = s.nesteCenario[cenario]
  let estado = estadoBaseDoTexto(texto) ?? (s.cenarios.includes(cenario) ? 'activo' : 'irrelevante')

  if (LEGADO_IDS.includes(servicoId) && mostrarLegado && cenario !== 'onprem') {
    estado = 'legado'
  }
  if (estado === 'opcional' && perfisActivos.some((p) => s.perfisRecomendados?.includes(p))) {
    estado = 'recomendado'
  }
  return estado
}

export function temDestaquePerfil(servicoId, perfisActivos = []) {
  if (perfisActivos.length === 0) return false
  const s = SERVICOS_POR_ID[servicoId]
  return perfisActivos.some((p) => s.perfisRecomendados?.includes(p))
}

export function classificarLigacao(deId, paraId) {
  const de = SERVICOS_POR_ID[deId]
  const para = SERVICOS_POR_ID[paraId]
  if (!de || !para) return 'nativa'
  if (de.camada === 'alm' || para.camada === 'alm') return 'governa'
  if (IDS_REDE.has(deId) || IDS_REDE.has(paraId)) return 'rede'
  if (de.camada === 'plataforma' || para.camada === 'plataforma') return 'extensao'
  return 'nativa'
}

export const LABELS_TIPO_LIGACAO = {
  nativa: 'Integração nativa / suite-to-suite',
  extensao: 'Extensão clean core (BTP)',
  rede: 'Conectividade de rede / hyperscaler / SCI',
  governa: 'Governação ALM / clean core / transports',
}

function obterPadrao(deId, paraId, tipo) {
  const par = [deId, paraId]
  if (par.includes('event-mesh') || par.includes('advanced-event-mesh')) return 'Evento de negócio'
  if (par.includes('integration-suite') || par.includes('pipo')) return 'iFlow / API'
  if (par.some((id) => id.startsWith('hana-'))) return 'Replicação / acesso nativo à BD'
  if (par.includes('cloud-connector') || par.includes('eic')) return 'Túnel seguro / runtime híbrido'
  if (tipo === 'governa') return 'Monitorização / quality gate / clean core'
  if (tipo === 'rede') return 'Conectividade de rede'
  if (tipo === 'extensao') return 'Extensão side-by-side (BTP)'
  return 'API / integração suite-to-suite'
}

// Todas as ligações do catálogo (id->id via ligaA), deduplicadas. Não são
// desenhadas por defeito — ver getLigacoesDoServico() abaixo, usado só em
// hover/selecção, e getEspinha() para a "espinha" opcional por preset.
function construirLigacoes() {
  const vistos = new Set()
  const ligacoes = []
  for (const s of SERVICOS) {
    for (const alvo of s.ligaA) {
      if (!SERVICOS_POR_ID[alvo]) continue
      const chave = [s.id, alvo].sort().join('|')
      if (vistos.has(chave)) continue
      vistos.add(chave)
      const tipo = classificarLigacao(s.id, alvo)
      ligacoes.push({ id: chave, de: s.id, para: alvo, tipo, padrao: obterPadrao(s.id, alvo, tipo) })
    }
  }
  return ligacoes
}
export const TODAS_LIGACOES = construirLigacoes()

const LIGACOES_POR_ID = (() => {
  const mapa = {}
  for (const l of TODAS_LIGACOES) {
    ;(mapa[l.de] ??= []).push(l)
    ;(mapa[l.para] ??= []).push(l)
  }
  return mapa
})()

// Modo hover/selecção: só as ligações de 1º grau desse card, no máximo 8,
// priorizando as que envolvem cards activo/recomendado no preset actual.
export function getLigacoesDoServico(servicoId, { cenario, mostrarLegado, perfisActivos }) {
  const todas = LIGACOES_POR_ID[servicoId] ?? []
  const ctx = { cenario, mostrarLegado, perfisActivos }
  const pontuadas = todas.map((l) => {
    const outroId = l.de === servicoId ? l.para : l.de
    const estado = obterEstado(outroId, ctx)
    const prioridade = estado === 'activo' || estado === 'recomendado' ? 2 : estado === 'opcional' ? 1 : 0
    return { ligacao: l, outroId, prioridade }
  })
  pontuadas.sort((a, b) => b.prioridade - a.prioridade)
  const visiveis = pontuadas.slice(0, 8)
  return { visiveis: visiveis.map((p) => p.ligacao), ocultas: Math.max(0, todas.length - 8) }
}

export const IDS_GOVERNANCA_INICIAL = new Set(['cloud-alm', 'signavio', 'dwc', 's4hana', 'btp', 'integration-suite'])

// Espinha vertical por preset (secção 1 do brief): sequência curta e fixa,
// sem cruzamentos, mostrada opcionalmente via o botão "Só espinha do cenário".
export const ESPINHAS_PRESET = {
  cloud: ['azure', 'hana-cloud', 'btp', 'integration-suite', 's4hana', 'cloud-alm'],
  rise: ['azure', 's4hana', 'btp', 'integration-suite', 'signavio', 'cloud-alm'],
  onprem: ['dc-onprem', 'hana-onprem', 's4-any', 'pipo', 'solman'],
}

// --- Pesquisa: normalização + índice ---------------------------------------
export function normalizarBusca(texto) {
  return texto
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove diacríticos
    .toLowerCase()
    .replace(/[\s-]+/g, '') // colapsa espaços e hífenes
    .trim()
}

function normalizarQuery(query) {
  let q = normalizarBusca(query)
  if (q.startsWith('sap')) q = q.slice(3) // prefixo opcional "sap "/"sap-" já colapsado acima
  return q
}

const INDICE_BUSCA = SERVICOS.map((s) => ({
  servico: s,
  chaves: [
    normalizarBusca(s.id),
    normalizarBusca(s.nome),
    normalizarBusca(s.tipo),
    normalizarBusca(s.camada),
    ...(s.aliases ?? []).map(normalizarBusca),
    ...(s.satelitesHelp ? s.satelitesHelp.split(';').map((x) => normalizarBusca(x)) : []),
  ],
}))

export function pesquisarServicos(query) {
  const q = normalizarQuery(query)
  if (!q) return []
  const semPrefixo = normalizarBusca(query)
  const pontuados = []
  for (const entrada of INDICE_BUSCA) {
    let melhor = 0
    for (const chave of entrada.chaves) {
      if (chave === q || chave === semPrefixo) melhor = Math.max(melhor, 3)
      else if (chave.includes(q) || chave.includes(semPrefixo)) melhor = Math.max(melhor, 1)
    }
    if (melhor > 0) pontuados.push({ servico: entrada.servico, pontuacao: melhor })
  }
  // sort estável: pontuação desc, mantém ordem do catálogo em empate
  pontuados.sort((a, b) => b.pontuacao - a.pontuacao)
  return pontuados.map((p) => p.servico).slice(0, 10)
}
