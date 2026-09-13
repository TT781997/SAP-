import type { ServiceCopy } from "../../data/types";

export const services: Record<string, ServiceCopy> = {
  "aws": {
    "nome": "Amazon Web Services",
    "tipo": "IaaS",
    "oQueFaz": "Hyperscaler Amazon. Fornece compute, network, storage, regiões e serviços de landing zone (Direct Connect, Transit Gateway, VPCs de inspeção). No RISE with SAP a VPC onde corre o S/4HANA Cloud Private Edition é gerida by SAP sobre AWS; the customer manages a sua própria landing zone e a interconexão com a org SAP. No GROW / Public Edition e no BTP, a AWS é uma das regiões onde a SAP publica serviços.",
    "paraQueServe": "Dar infrastructure elástica ao digital core e à platform without o customer administrar as VMs of the ERP no modelo RISE. Serve also de região para HANA Cloud, Integration Suite e extensions BTP. Mistura típica: ERP em AWS-RISE e data lakes nativos AWS na conta própria, ligados por Transit Gateway.",
    "exemploReal": "A AWS publica cookbooks oficiais “RISE with SAP on AWS” e “Enterprise-ready network foundation for RISE with SAP”: landing zone of the customer, Transit Gateway, attachment à VPC gerida by SAP, VPN de recurso e Direct Connect.",
    "nesteCenario": {
      "onprem": "Is not the host of the ERP. Pode existir como cloud satellite da empresa without fazer parte do core SAP. Carte atténuée.",
      "cloud": "Possible region for BTP, HANA Cloud and S/4HANA Cloud Public Edition. Active if the selector is on AWS.",
      "rise": "One of the three hyperscalers in the contract. SAP manages the S/4 VPC; the customer manages Direct Connect / Transit Gateway and the landing zone."
    }
  },
  "azure": {
    "nome": "Microsoft Azure",
    "tipo": "IaaS",
    "oQueFaz": "Hyperscaler Microsoft. Mesmo papel da AWS no modelo RISE/GROW: IaaS sob o S/4 managed by SAP e/ou sob o BTP. ExpressRoute é a interconexão típica. Entra ID federa-se com SAP Cloud Identity Services para SSO da suite inteira. Muitos customers European já têm operação Microsoft; escolher Azure evita um segundo stack de identity e network.",
    "paraQueServe": "Anfitrião do RISE ou região BTP/Public Edition when a empresa já vive em Microsoft 365 / Entra ID / ExpressRoute. A mix forte é identity: Entra ID → IAS → S/4 + SuccessFactors + BTP + Work Zone.",
    "exemploReal": "Padrão dominante em customers European que federam Entra ID com SAP Cloud Identity Services e usam ExpressRoute para o VPC RISE. A documentsção conjunta SAP/Microsoft descreve o peering entre a subscription of the customer e a subscription gerida by SAP.",
    "nesteCenario": {
      "onprem": "Is not the host of the ERP. Entra ID may already be the corporate IdP even on-prem. Dimmed as IaaS.",
      "cloud": "Possible GROW region. Entra ID as corporate IdP federated to IAS.",
      "rise": "Default hyperscaler in this app (selector starts on Azure). SAP manages S/4 Private Edition; the customer manages ExpressRoute and the IdP."
    }
  },
  "gcp": {
    "nome": "Google Cloud",
    "tipo": "IaaS",
    "oQueFaz": "Hyperscaler Google. No RISE a SAP gere uma “SAP organization” (projects, VPC, Compute Engine, storage); the customer manages a “customer organization” e a conectividade (Cloud Interconnect, VPC partilhada) a partir da sua org GCP e do on-prem. O BTP e o Public Edition also publicam regiões GCP.",
    "paraQueServe": "Anfitrião RISE ou região BTP when a empresa já tem gravidade de data/analytics no Google Cloud. A typical mix é RISE no GCP + serviços de data na org of the customer, without mixr as responsabilidades SAP vs customer.",
    "exemploReal": "A documentsção public Google Cloud “Overview of RISE with SAP on Google Cloud” descreve o modelo SAP organization versus customer organization e os padrões on-prem → Interconnect → project RISE.",
    "nesteCenario": {
      "onprem": "Ce n'est pas l'hôte de l'ERP. Carte atténuée.",
      "cloud": "Possible region for BTP and Public Edition.",
      "rise": "Third hyperscaler of choice. Switching the selector to GCP only changes this L0 card and tooltip text."
    }
  },
  "dc-onprem": {
    "nome": "Data Center do Cliente",
    "tipo": "On-prem",
    "oQueFaz": "Infraestrutura gerida pelo customer ou por um hoster clássico / colocation: compute, storage, network, firewalls, backup. É onde correm ECC ou S/4 any-premise, HANA on-prem, NetWeaver, PI/PO, Solution Manager, MES/OT, systems regulamentares e satellites que a empresa ainda não quer ou não pode pôr na cloud public.",
    "paraQueServe": "No preset on-prem é a fundação de tudo. No RISE passa a ser o residual: shop-floor, OT, data que não saem, systems em phase-out. A correct mix no hybrid é DC residual + Cloud Connector + optionalmente Edge Integration Cell.",
    "exemploReal": "H.B. Fuller, no percurso RISE para S/4HANA Cloud Private Edition, evitou um data centre físico e estimou cerca de 200 mil dólares de poupança só nesse item, com instância global em 123 countries e cerca de 1,5 milhões de dólares evitados em infra legada.",
    "nesteCenario": {
      "onprem": "Carte fondation L0. Tout le cœur repose ici.",
      "cloud": "Irrelevant as Public Edition ERP host. Only makes sense if the industry profile is on (residual MES).",
      "rise": "Dimmed and residual. Surviving systems connect via Cloud Connector / EIC. If the sovereignty profile is on, compare with the Customer Data Center card."
    }
  },
  "cdc-option": {
    "nome": "RISE Customer Data Center (CDC)",
    "tipo": "IaaS souverain",
    "oQueFaz": "Opção do RISE / SAP Cloud ERP Private em que o S/4 Private Edition é operated com modelo cloud (contract, SLA, operação SAP ou partner) mas o hardware vive num data centre of choice of the customer — includesndo HPE GreenLake e variantes soberanas. Is not on-prem clássico: o modelo operacional é cloud; a localidade dos data é of the customer.",
    "paraQueServe": "Misturar os benefícios do RISE com requisitos de sovereignty, latência ou regulação que impedem hyperscaler public. Perfil Regulado / sovereignty.",
    "exemploReal": "A SAP documents a SAP Cloud ERP Private, Customer Data Center Option. HPE GreenLake é uma das vias usadas desde o início do RISE para customers que rejeitam AWS/Azure/GCP como âncora de production.",
    "nesteCenario": {
      "onprem": "Sans objet. On-prem clássico is not CDC.",
      "cloud": "Sans objet. GROW Public Edition não tem opção CDC.",
      "rise": "Optionnel. Active e recommended só com o regulated profile."
    },
    "naoConfundir": "Is not o Customer Data Centre clássico. Is not Public Edition. Is not SAP Sovereign Cloud / NS2 / EU AI Cloud."
  },
  "hana-onprem": {
    "nome": "SAP HANA (on-premise)",
    "tipo": "BD",
    "oQueFaz": "Base de data in-memory instalada e operada no customer data centre. Motor transaccional e analítico do S/4HANA any-premise e de BW/4HANA on-prem. O customer é dono do sizing, HA/DR, patches, backups e encriptação. Sem HANA o S/4 on-prem não corre. A Help documents also HANA Live, HANA express edition e SAP HANA Cloud Services como linha distinta, bem como SAP IQ, SAP ASE, SAP MaxDB, SAP SQL Anywhere e SAP on IBM Db2 / SQL Server como enginees AnyDB do mundo ECC clássico.",
    "paraQueServe": "Processamento em tempo real no mesmo engine sob operação 100% interna. Mistura on-prem típica: HANA + S/4 any-premise + BW/4 + Solution Manager.",
    "exemploReal": "A Shell usou S/4HANA sobre HANA como digital core financeiro em tempo real (Central Finance) — padrão clássico on-prem ou hosted antes da onda RISE.",
    "nesteCenario": {
      "onprem": "Core database. Carte active.",
      "cloud": "Replaced by HANA Cloud e pelthe managed HANA do Public Edition.",
      "rise": "S/4 Private Edition HANA is operated by SAP on the hyperscaler and does not appear on this card. This card only remains if BW or sidecars stay in the DC."
    }
  },
  "hana-cloud": {
    "nome": "SAP HANA Cloud",
    "tipo": "DBPaaS",
    "oQueFaz": "HANA como serviço gerido no BTP: engine relacional in-memory, data lake, multi-model (grafo, spatial, JSON). Persistência das extensions side-by-side (CAP, Build, ABAP Cloud) e de workloads analíticos que não devem viver em tabelas Z do S/4. Distinto do HANA que está dentro do S/4 Cloud — este card é o HANA que o customer provisiona no BTP. Help: SAP HANA Cloud Services e SAP HANA Cloud in CN Regions.",
    "paraQueServe": "Materializar o clean core: a app nova grava no HANA Cloud, o S/4 fica standard. Também alimenta Datasphere, SAC e cenários near-real-time.",
    "exemploReal": "Ferrara Candy correu RISE S/4HANA Cloud Private Edition powered by BTP; as extensions e os padrões de integration em tempo real assentam em serviços de data geridos do BTP e não em custom ABAP profundo no core.",
    "nesteCenario": {
      "onprem": "Absent. The equivalent is HANA on-prem.",
      "cloud": "Actif. Persistence for extensions and GROW analytics.",
      "rise": "Actif. Os BTP credits do RISE cover typical usage. Do not confuse with the managed HANA under the S/4 Private Edition."
    }
  },
  "datasphere": {
    "nome": "SAP Datasphere",
    "tipo": "Data Fabric",
    "oQueFaz": "Camada semântica de data de negócio. Sucessor directo do produto que se chamava SAP Data Warehouse Cloud (DWC / DwC-produto). Help: Datasphere e Datasphere, SAP BW Bridge. Une data SAP e não-SAP com ou without replicação, organiza-os em spaces, oferece Data Builder e Business Builder, e tem BW Bridge para reaproveitar modelos BW. É a piece de fabric dentro da Business Data Cloud.",
    "paraQueServe": "Ter um modelo governsdo para finanças, supply chain e RH without copiar o ERP inteiro para um warehouse clássico. Fonte semântica to SAC e para data products que os agentes Joule consomem.",
    "exemploReal": "Arquitectura de referência SAP: Datasphere + SAC + BW/4 em modo hybrid. Clientes com investimento BW usam o BW Bridge para não deitar fora transformações e extractors.",
    "nesteCenario": {
      "onprem": "Atténué. Can consume on-prem HANA/BW via DP Agent, but is not the classic default.",
      "cloud": "Actif. Strategic data warehouse / fabric of Public Cloud.",
      "rise": "Actif. Piece of Business Data Cloud e da analytics path of the RISE landscape."
    },
    "naoConfundir": "O acrónimo histórico DWC/DwC DESTE produto é Data Warehouse Cloud. NÃO é Deploy with Confidence (id dwc)."
  },
  "bdc": {
    "nome": "SAP Business Data Cloud",
    "tipo": "Données + IA",
    "oQueFaz": "Oferta que une Datasphere, SAP Analytics Cloud e a fundação de data para Business AI / Joule. Publica data products curados (data + metadata + semântica de process SAP) para applications e agentes. É o context layer da Business AI Platform (BTP + Business Data Cloud + AI Foundation).",
    "paraQueServe": "Impedir que a IA empresarial trabalhe without contexto de process. Mistura: S/4 + LoB geram data → BDC/Datasphere governs → Joule e apps inteligentes consomem.",
    "exemploReal": "Na SAP Sapphire 2026 a SAP posicionou Business Data Cloud + BTP + AI Foundation como tecto único da Business AI Platform. A H&M demonstrou um Store Intelligence Agent sobre RISE + Business Data Cloud + Commerce Cloud + SuccessFactors.",
    "nesteCenario": {
      "onprem": "Not applicable in classic on-prem default.",
      "cloud": "Active when the customer adopts the data+AI stack do GROW.",
      "rise": "Actif. Context layer para Joule e agentes no landscape RISE."
    }
  },
  "bw4": {
    "nome": "SAP BW/4HANA",
    "tipo": "Entrepôt de données",
    "oQueFaz": "Data warehouse empresarial sobre HANA, successor do BW 7.x. Modelação LSA++, extractors SAP, process chains, queries. Continua vivo em milhares de customers. Na cloud, o caminho estratégico é Datasphere + BW Bridge, não um BW eterno.",
    "paraQueServe": "Reporting de group, staging pesado, compliance de data históricos. Mistura híbrida típica: BW/4 on-prem ou gerido + Datasphere na cloud + SAC por cima.",
    "exemploReal": "NEOM combinou S/4HANA + Ariba + BW/4HANA + SAC para acompanhar milhares de milhões em construção com reporting operacional quase em tempo real.",
    "nesteCenario": {
      "onprem": "Default warehouse if the customer is already classic SAP analytics. Actif.",
      "cloud": "Atténué. Strategic target = Datasphere. BW Bridge is the bridge, not the destination.",
      "rise": "Optional / dimmed. Many RISE landscapes keep BW/4 for years and gradually move models to Datasphere."
    }
  },
  "businessobjects": {
    "nome": "SAP BusinessObjects",
    "tipo": "BI classique",
    "oQueFaz": "Plataforma clássica de BI. Help: BusinessObjects Business Intelligence Platform, Dashboards, Design Studio, Explorer, Live Office, Crystal Server, Financial Information Management, Intercompany, Profitability and Cost Management, Predictive Workbench by IBM. Ainda serve milhões de reports em customers ECC/S/4 on-prem. Destino estratégico de reporting novo é SAP Analytics Cloud.",
    "paraQueServe": "Manter o parque de WeBI/Crystal enquanto se constrói o target em SAC + Datasphere. Mistura honesta: BOBJ legacy + SAC para o novo + BW/4 no meio.",
    "exemploReal": "A ŠKODA AUTO usou BusinessObjects para reporting executivo em tempo real — caso clássico do parque BOBJ ainda em production em groups industriais.",
    "nesteCenario": {
      "onprem": "Active como BI clássico, sobretudo com legacy toggle on.",
      "cloud": "Masqué / héritage. New reporting is born in SAC.",
      "rise": "Hérité. Visible com o toggle. Typical plan: coexistence and phase-out to SAC."
    }
  },
  "papm": {
    "nome": "SAP PaPM",
    "tipo": "Rentabilité",
    "oQueFaz": "Profitability and Performance Management. Help: SAP Profitability and Performance Management e SAP Profitability and Performance Management Cloud. Alocações, custos, rentabilidade de produto/customer para além do CO clássico. Distinto do SAC Planning e do BPC.",
    "paraQueServe": "Onde o custo realmente cai. Mistura: S/4 CO produz → PaPM aloca → SAC apresenta.",
    "exemploReal": "All Products separa PaPM, PaPM Cloud, BPC, PCM (Profitability and Cost Management BOBJ) e SAC — quatro gerações da mesma pergunta de negócio.",
    "nesteCenario": {
      "onprem": "Optional / active em controlling avançado.",
      "cloud": "Optional (PaPM Cloud).",
      "rise": "Optionnel."
    }
  },
  "bpc": {
    "nome": "SAP BPC",
    "tipo": "Planification héritée",
    "oQueFaz": "Business Planning and Consolidation. Planning e close clássicos sobre BW. Destino estratégico: SAC Planning + Group Reporting no S/4. Fica no mapa porque ainda é o engine de planeamento de muitos groups.",
    "paraQueServe": "Budget e consolidation enquanto o target cloud não está vivo. Mistura de saída: BPC → SAC Planning + Group Reporting.",
    "exemploReal": "Entrada All Products: Business Planning and Consolidation. Coexiste com Analysis for Microsoft Office como customer Excel clássico.",
    "nesteCenario": {
      "onprem": "Actif avec le bascule héritage.",
      "cloud": "Masqué. Target = SAC.",
      "rise": "Hérité. Visible avec la bascule."
    }
  },
  "analysis-office": {
    "nome": "SAP Analysis for Microsoft Office",
    "tipo": "BI Excel",
    "oQueFaz": "Add-in Excel/PowerPoint para queries BW, HANA e, em gerações recentes, SAC. Help: Analysis for Microsoft Office e Analytics Cloud add-in for Microsoft PowerPoint. É o sítio onde o controller continua a viver when não abre o SAC.",
    "paraQueServe": "Análise tabular pesada. Mistura: BW/4 ou SAC como fonte → Analysis como customer.",
    "exemploReal": "Produto autónomo no All Products, family Analytics, distinto do SAC web.",
    "nesteCenario": {
      "onprem": "Actif.",
      "cloud": "Optional (add-in SAC).",
      "rise": "Optionnel."
    }
  },
  "data-services": {
    "nome": "SAP Data Services",
    "tipo": "ETL",
    "oQueFaz": "Motor clássico de ETL/ELT e quality de data da family EIM. Help: Data Services, Data Quality Management, Information Steward, Agile Data Preparation, Data Hub. Continua a alimentar BW, HANA e destinos não-SAP em landscapes on-prem. Destino estratégico de pipelines novos: Integration Suite + Datasphere / Data Intelligence residual.",
    "paraQueServe": "Extrair, limpar e carregar master data e transaccionais. Mistura brownfield: Data Services + Information Steward a governsr quality + BW/4 ou Datasphere como destino.",
    "exemploReal": "Parque EIM clássico from SAP: Data Services + Information Steward + Data Quality Management listsdos como produtos distintos no All Products.",
    "nesteCenario": {
      "onprem": "Active com legacy toggle / EIM clássico.",
      "cloud": "Atténué. New pipelines are born in Datasphere / Integration Suite.",
      "rise": "Hérité. Visible avec la bascule. Plano típico: phase-out to Datasphere + Suite."
    }
  },
  "data-intelligence": {
    "nome": "SAP Data Intelligence",
    "tipo": "Pipeline de données",
    "oQueFaz": "Orquestração de pipelines de data e ML (successor conceptual do Data Hub). Help: Data Intelligence, Data Ingestion for Industry Cloud Solutions. Em muitos customers foi a bridge entre o lago e o S/4 antes da Business Data Cloud. Destino estratégico: Datasphere + BDC + AI Foundation.",
    "paraQueServe": "Orquestrar flows complexos SAP/não-SAP e notebooks. Mistura de transição: Data Intelligence a correr ao lado de Datasphere até o pipeline ser reescrito.",
    "exemploReal": "Data Hub e Data Intelligence aparecem ambos no All Products; a SAP empurra workloads novos to Datasphere / BDC.",
    "nesteCenario": {
      "onprem": "Optional / legacy active.",
      "cloud": "Atténué. Target = Datasphere + BDC.",
      "rise": "Atténué. Coexistência possível durante a transição."
    }
  },
  "ilm": {
    "nome": "SAP Information Lifecycle Management",
    "tipo": "Archive / rétention",
    "oQueFaz": "Retenção, bloqueio e destruição de data pessoais e fiscais (GDPR / CNPD), arquivo de documentos. Help: Information Lifecycle Management, File Lifecycle Management, Archiving and Document Access by OpenText, Content Management Core by OpenText, Extended ECM by OpenText, Data Custodian. Complementa o S/4: o ERP gera o documento; o ILM decide quanto tempo vive.",
    "paraQueServe": "Não guardar para sempre o que a lei manda apagar. Mistura regulada: S/4 + ILM + OpenText + GRC.",
    "exemploReal": "Família ILM + OpenText no All Products é o padrão de arquivo SAP em groups European auditados.",
    "nesteCenario": {
      "onprem": "Active em landscapes regulateds.",
      "cloud": "Optional (retenção no Public Edition + serviços de arquivo).",
      "rise": "Optional, recommended com regulated profile."
    }
  },
  "btp": {
    "nome": "SAP BTP",
    "tipo": "PaaS",
    "oQueFaz": "Business Technology Platform. Tecto único de integration, data, extensibility, automação, identity e IA. Sítio oficial do clean core: diferenciação sai do S/4 e nasce aqui (CAP, ABAP Cloud, Build, Kyma, Cloud Foundry). Comercialmente chega por credits (RISE), subscription ou consumo. Is not um único serviço — é a platform que hospeda dezenas de services do Discovery Center.",
    "paraQueServe": "Misturar um core estável com inovação rápida. Regra de ouro: S/4 standard + BTP side-by-side + Integration Suite no meio. No on-prem clássico o BTP é uma ilha; no GROW/RISE é estruturante.",
    "exemploReal": "Ferrara Candy: RISE S/4 Private Edition powered by BTP, go-live big-bang em 25 módulos, mais de 98% de quality de master data. Southwest Gas: BTP + SuccessFactors LMS para validar certificações de técnicos de campo com QR no telemóvel.",
    "nesteCenario": {
      "onprem": "Atténué. May exist as an innovation island without being the landscape default.",
      "cloud": "Actif. GROW extension and integration platform. Without BTP, Public Edition cannot be extended in an upgrade-safe way.",
      "rise": "Active and structural. Clean core = custom code leaves S/4 for BTP. Cloud ALM governs the lifecycle. BTP credits come in the RISE envelope."
    }
  },
  "build": {
    "nome": "SAP Build",
    "tipo": "Dev + low-code",
    "oQueFaz": "Família unificada de desenvolvimento no BTP. Help: Build, Build Code, Build Process Automation, Build Process Automation foundation add-on by UiPath, Build Work Zone standard edition, Business Application Studio, Business Application Factory, Application Frontend Service, AppGyver (linha histórica low-code).",
    "paraQueServe": "Fiori extra, portais, workflows de aprovação, microserviços e apps mobile without user-exits nem Z-reports no S/4. Mistura com Signavio: o process target nasce no Signavio; a automação que não cabe no standard nasce no Build Process Automation.",
    "exemploReal": "Hitachi High-Tech reportou 94% de redução no footprint de customisation. Gerdau usou Build + Integration Suite + S/4 para onboarding 50% mais rápido.",
    "nesteCenario": {
      "onprem": "Dimmed / absent in the default mix.",
      "cloud": "Actif. Ferramenta de extension do Public Edition.",
      "rise": "Actif. Destino preferencial do custom code que o Cloud ALM classifica fora do core."
    }
  },
  "workzone": {
    "nome": "SAP Build Work Zone",
    "tipo": "UX / Launchpad",
    "oQueFaz": "Digital workplace. Help distingue SAP Work Zone / SAP Build Work Zone advanced edition (workplace de TI) de SAP SuccessFactors Work Zone (experiência de employee RH). Este card é o Build Work Zone. Entry point único para Fiori do S/4, apps BTP, SuccessFactors, Ariba e apps de terceiros. Substitui conceptualmente o SAP Enterprise Portal.",
    "paraQueServe": "Um URL só para o end user. Mistura UX: IAS authenticates → Work Zone agrega → S/4 + LoB + extensions Build aparecem como tiles.",
    "exemploReal": "PwC unificou mais de 100 000 profissionais em 19 countries sobre um core cloud SAP — padrão de entrada única que o Work Zone materializa.",
    "nesteCenario": {
      "onprem": "Atténué. The classic equivalent is Fiori Launchpad / Enterprise Portal in the DC.",
      "cloud": "Actif. GROW UX shell.",
      "rise": "Actif. Recommended entry point of the hybrid landscape."
    }
  },
  "ias": {
    "nome": "SAP Cloud Identity Services",
    "tipo": "IdP / IAM",
    "oQueFaz": "Identity Authentication (IAS) + Identity Provisioning (IPS). SSO e ciclo de vida de users entre S/4 Cloud, BTP, SuccessFactors, Ariba, Concur, Fieldglass e o IdP corporativo (Entra ID, Okta). Help also lists SAP Single Sign-On clássico e Decentralized Identity Verification. Distinct from IAG (governsnce SoD) e de Customer Data Cloud (consumidor final).",
    "paraQueServe": "Um login corporativo para a suite e provisioning automático de contas e roles. Mistura obrigatória em GROW e RISE.",
    "exemploReal": "Componente included in the tenant RISE / S/4HANA Cloud. Quase todos os landscapes cloud federam o IdP corporativo (muito frequentemente Entra ID no Azure) ao IAS.",
    "nesteCenario": {
      "onprem": "Atténué. Only joins if cloud islands already exist.",
      "cloud": "Actif. Public Edition suite IdP.",
      "rise": "Actif. Identity for S/4 Private Edition + BTP + LoB."
    }
  },
  "abap-env": {
    "nome": "SAP BTP ABAP Environment",
    "tipo": "Runtime",
    "oQueFaz": "Steampunk. Help: BTP ABAP environment, ABAP Cloud, ABAP Development Tools for Eclipse, Landscape Portal for SAP S/4HANA Cloud ABAP environment. ABAP Cloud no BTP, sobre HANA Cloud. Permite reescrever ou nascer extensions ABAP fora do S/4, com released APIs, RAP e Fiori.",
    "paraQueServe": "Tirar Z-code do core without perder a competência ABAP. Mistura brownfield: ATC no S/4 classifica o custom code → diferenciação vai para ABAP Environment ou CAP → Cloud ALM acompanha o deploy BTP.",
    "exemploReal": "O modelo Clean Core from SAP usa o ABAP Environment como destino side-by-side de extensions RAP. Hitachi High-Tech (94% menos customisation) é o padrão de resultado.",
    "nesteCenario": {
      "onprem": "Absent. ABAP lives on NetWeaver / S/4 any-premise.",
      "cloud": "Active as Public Edition extension runtime.",
      "rise": "Actif. One of the three strategic BTP runtimes in RISE."
    }
  },
  "runtimes-btp": {
    "nome": "Runtimes BTP (Cloud Foundry + Kyma)",
    "tipo": "Runtime",
    "oQueFaz": "Os dois runtimes poliglotas do BTP. Cloud Foundry para apps CAP, Node, Java, Python. Kyma para Kubernetes gerido. Help: Cloud Application Programming Model, Cloud SDK, Cloud Platform (nome histórico).",
    "paraQueServe": "Correr extensions que não são ABAP: conectores de shop floor, APIs publics, workers de events, frontends HTML5. Mistura industry: Kyma + Event Mesh + Cloud Connector / EIC para telemetria OT without tocar no S/4.",
    "exemploReal": "A documentsção de desenvolvedores BTP recomenda CF para a maioria das extensions CAP e Kyma when há necessidade de Kubernetes e workloads event-driven.",
    "nesteCenario": {
      "onprem": "Absent.",
      "cloud": "Actif. CF is the default for GROW extensions.",
      "rise": "Actif. CF default; Kyma when the industry profile or microservice volume justifies it."
    }
  },
  "ai-foundation": {
    "nome": "SAP AI Foundation",
    "tipo": "IA",
    "oQueFaz": "Camada de governsnce e runtime de IA no BTP. Help: AI Core, AI Launchpad, AI Business Services, Joule for Developers ABAP AI Capabilities, CX AI Toolkit, CXAI, Intelligent Situation Automation, Intelligent Technologies. Is not o copiloto (isso é Joule); é o shop floor onde se constroem, publicam e governsm agentes e extensions de IA.",
    "paraQueServe": "Misturar IA com process without shadow-IT de prompts. Joule é a face; AI Foundation é o engine e o governo. Cloud ALM observes agentes neste plano.",
    "exemploReal": "Sapphire 2026: Business AI Platform = BTP + Business Data Cloud + AI Foundation, com Knowledge Graph e Joule Studio 2.0. H&M usou esta fundação para o Store Intelligence Agent.",
    "nesteCenario": {
      "onprem": "Sans objet dans le mix par défaut.",
      "cloud": "Active in the GROW AI stack.",
      "rise": "Actif. Foundation of the Joule assistants contractually included in RISE year 1."
    }
  },
  "iag": {
    "nome": "SAP Cloud Identity Access Governance",
    "tipo": "IAM / SoD cloud",
    "oQueFaz": "Governação de access na cloud: SoD, access requests, reviews. Help: Cloud Identity Access Governance. Complementa IAS (quem és) e GRC Access Control (parque on-prem). IAG é a via cloud-first de SoD sobre S/4 Cloud, BTP e LoB.",
    "paraQueServe": "SoD without SolMan/GRC clássico. Mistura regulada: IAS authenticates → IAG governs o acesso → GRC on-prem só no residual.",
    "exemploReal": "Entrada própria no All Products, family Identity, distinta de Cloud Identity Services.",
    "nesteCenario": {
      "onprem": "Dimmed (GRC Access Control).",
      "cloud": "Recommandé avec le profil réglementé.",
      "rise": "Recommandé avec le profil réglementé."
    }
  },
  "sap-start": {
    "nome": "SAP Start / Mobile Start",
    "tipo": "UX",
    "oQueFaz": "Entry point móvel / home da suite. Help: SAP Start, SAP Mobile Start e SAP Task Center. Mais leve que Work Zone advanced: cards, aprovações, Joule no telemóvel.",
    "paraQueServe": "Adopção móvel without portal pesado. Mistura: IAS → Start/Mobile Start → Task Center → apps S/4 e LoB.",
    "exemploReal": "Três entradas All Products: SAP Start, Mobile Start, Task Center. Work Zone continua a ser o workplace completo.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Active as GROW mobile companion.",
      "rise": "Active as mobile companion."
    }
  },
  "enterprise-portal": {
    "nome": "SAP Enterprise Portal (legado)",
    "tipo": "UX héritée",
    "oQueFaz": "Portal NetWeaver clássico (iViews, KM, roles). Help: Enterprise Portal e NetWeaver Portal Enterprise Workspaces. Destino: Fiori Launchpad on-prem ou Build Work Zone.",
    "paraQueServe": "Explicar de onde vêm os portais SAP que o customer ainda tem. Toggle legacy.",
    "exemploReal": "Qualquer landscape ECC com Portal a servir de intranet SAP. A migration típica é Portal → Fiori Launchpad → Work Zone.",
    "nesteCenario": {
      "onprem": "Legacy active with the toggle.",
      "cloud": "Masqué.",
      "rise": "Masqué / héritage."
    }
  },
  "lama": {
    "nome": "SAP Landscape Management",
    "tipo": "Ops du landscape",
    "oQueFaz": "Automatização de operações de systems SAP: copy, refresh, start/stop, mass operations. Help: SAP Landscape Management Cloud e SAP IT Infrastructure Management. Complementa Cloud ALM (que não faz system copy de um S/4 on-prem).",
    "paraQueServe": "Refresh de QA a partir de PRD, clones para projects. Mistura on-prem / RISE dual: LaMa opera os systems que o customer ainda controla; Cloud ALM opera o run cloud.",
    "exemploReal": "LaMa Cloud e LaMa on-prem listsdos no All Products. Service providers e centros de competência SAP usam LaMa para fazendas de systems.",
    "nesteCenario": {
      "onprem": "Optional / active in large SAP farms.",
      "cloud": "Not applicable in typical GROW (SAP operates the tenant).",
      "rise": "Optional for residual systems in the customer DC."
    }
  },
  "cal": {
    "nome": "SAP Cloud Appliance Library",
    "tipo": "Laboratoire",
    "oQueFaz": "Catálogo de appliances SAP pré-instaladas em hyperscaler para trial, POC e sandbox. Help: Cloud Appliance Library. Is not production RISE; é o sítio onde se experimenta S/4, BTP e add-ons without esperar por um project.",
    "paraQueServe": "Provas de conceito rápidas. Mistura pedagógica: CAL para experimentar → Signavio para decidir o to-be → RISE/GROW para produzir.",
    "exemploReal": "Entrada All Products. Equipas de pré-venda e academias SAP usam CAL como laboratório standard.",
    "nesteCenario": {
      "onprem": "Optional as a cloud sandbox beside the DC.",
      "cloud": "Optional for a POC before the GROW contract.",
      "rise": "Optional as a sandbox outside the production contract."
    }
  },
  "integration-suite": {
    "nome": "SAP Integration Suite",
    "tipo": "EiPaaS",
    "oQueFaz": "iPaaS no BTP, successor estratégico de PI/PO (maintenance standard de PI/PO até Dezembro de 2027). Capacidades: Cloud Integration (iFlows), API Management, Event Mesh, Integration Advisor, Open Connectors, Trading Partner Management, Integration Assessment, Migration Assessment. Help lists also API Business Hub / Business Accelerator Hub, Application Interface Framework e Managed Gateway for Spend como piece irmã. Edge Integration Cell é o runtime hybrid associado.",
    "paraQueServe": "A2A, B2B/EDI, B2G e events entre SAP e não-SAP. RISE includes um baseline de mensagens; landscapes com muitos systems externals quase sempre precisam de capacidade extra.",
    "exemploReal": "Jabil usa Integration Suite + BTP como espinha dorsal global, com padrão API + events. Nu Skin reduziu criações de integration de semanas para dias. FC Bayern consolidou 52 systems.",
    "nesteCenario": {
      "onprem": "Atténué. Default middleware is PI/PO; the Suite may already exist as a migration island.",
      "cloud": "Actif. GROW iPaaS / Public Edition.",
      "rise": "Actif. Baseline included in RISE. Cloud ALM monitors iFlows. Official PI/PO migration target."
    }
  },
  "event-mesh": {
    "nome": "SAP Event Mesh",
    "tipo": "EDA",
    "oQueFaz": "Broker de events no BTP. O S/4 publica business events. Consumidores no BTP, LoB ou terceiros subscrevem. Substitui o reflexo de RFC síncrono ponto-a-ponto. Para escala enterprise multi-região usa-se o card Advanced Event Mesh. Help also lists Event Stream Processor e Event Insight como linha histórica.",
    "paraQueServe": "Desacoplar o core. Mistura correcta em RISE/Public: S/4 publica o event → Event Mesh → extension Build/Kyma ou iFlow.",
    "exemploReal": "Padrão recommended SAP para S/4HANA Cloud e RISE. Jabil descreve a mudança para architecture API + event-based como direcção oficial do landscape.",
    "nesteCenario": {
      "onprem": "Absent in the default (IDocs, RFC, PI).",
      "cloud": "Actif. Public Edition decoupling pattern.",
      "rise": "Actif. Private Edition business events consumed by BTP extensions."
    }
  },
  "advanced-event-mesh": {
    "nome": "SAP Integration Suite, Advanced Event Mesh",
    "tipo": "EDA entreprise",
    "oQueFaz": "Event mesh de escala enterprise, documentsdo na Help como produto próprio. Multi-região, fan-out massivo, parceiros externals. Event Mesh cobre o padrão S/4 → BTP; Advanced Event Mesh cobre o backbone de events da empresa.",
    "paraQueServe": "Quando o volume ou a topologia rebenta o Event Mesh standard.",
    "exemploReal": "Linha distinta no All Products e no Discovery Center.",
    "nesteCenario": {
      "onprem": "Absent.",
      "cloud": "Optionnel.",
      "rise": "Optional, recommended com industry profile e EDA pesada."
    }
  },
  "eic": {
    "nome": "Edge Integration Cell",
    "tipo": "Runtime hybride",
    "oQueFaz": "Runtime da Integration Suite que corre no landscape private of the customer, em Kubernetes. O iFlow é desenhado e monitorsdo na cloud; a execução e os data ficam on-prem. Help also lists Edge Lifecycle Management.",
    "paraQueServe": "Mistura híbrida regulamentada ou de shop floor: governo do iPaaS na cloud, payload dentro de casa. Complementa o Cloud Connector (o Connector é tunnel; o EIC é runtime de integration completo).",
    "exemploReal": "Arquitectura de referência AWS/SAP para RISE: EIC em alta disponibilidade no landing zone of the customer.",
    "nesteCenario": {
      "onprem": "Absent.",
      "cloud": "Rare. Only with industry/regulated profile.",
      "rise": "Optional in the default, recommended with industry or regulated profile."
    }
  },
  "cloud-connector": {
    "nome": "SAP Cloud Connector",
    "tipo": "Connectivité",
    "oQueFaz": "Túnel seguro outbound do customer data centre para o BTP. Não abre inbound no firewall. Expõe de forma controlada RFC, OData e HTTP de systems on-prem a extensions BTP e iFlows. Help lists also Corporate Connectivity for Banking e Connector for Multi-Bank Connectivity como conectores de domínio.",
    "paraQueServe": "Qualquer mix híbrida honesta. Sem Cloud Connector as extensions BTP não chegam ao ECC/S/4 residual nem ao MES.",
    "exemploReal": "Componente standard de todos os cookbooks RISE hybrids em AWS, Azure e GCP.",
    "nesteCenario": {
      "onprem": "Absent en on-prem pur.",
      "cloud": "Optionnel. Active se restarem satellites on-prem.",
      "rise": "Active in most real RISE landscapes."
    }
  },
  "pipo": {
    "nome": "SAP PI/PO (legado)",
    "tipo": "Middleware on-prem",
    "oQueFaz": "Process Integration / Process Orchestration. Middleware A2A clássico no NetWeaver. Destino estratégico é a Integration Suite. Fim da maintenance standard: Dezembro de 2027.",
    "paraQueServe": "Manter o landscape on-prem a falar consigo próprio. Mistura RISE: workstream obrigatório de Migration Assessment PI/PO → Integration Suite.",
    "exemploReal": "A maior parte dos programas RISE includes um workstream explícito PI/PO → Integration Suite.",
    "nesteCenario": {
      "onprem": "Default middleware. Carte active.",
      "cloud": "Masqué.",
      "rise": "Legacy in phase-out. Visible dimmed with the toggle or brownfield profile."
    }
  },
  "managed-gateway": {
    "nome": "Managed Gateway (ex-Ariba CIG)",
    "tipo": "Passerelle Spend",
    "oQueFaz": "Help: SAP Integration Suite, Managed Gateway for Spend Management and SAP Business Network (antes Ariba Cloud Integration Gateway). Conteúdo pré-construído S/4 ↔ Ariba / Business Network / Fieldglass.",
    "paraQueServe": "Não reinventar iFlows de PO, GR, invoice, supplier. Mistura spend: S/4 + Ariba + Network passam por este gateway.",
    "exemploReal": "A Help ainda tem entrada Ariba Cloud Integration Gateway a apontar para o nome novo na Integration Suite.",
    "nesteCenario": {
      "onprem": "Dimmed (classic CIG / SRM add-ons).",
      "cloud": "Actif avec le profil spend.",
      "rise": "Actif avec le profil spend."
    }
  },
  "multi-bank": {
    "nome": "SAP Multi-Bank Connectivity",
    "tipo": "Banque",
    "oQueFaz": "Rede multi-banco. Help: SAP Multi-Bank Connectivity e Connector for SAP Multi-Bank Connectivity. Liga o S/4 a dezenas de bancos without um middleware por banco. Help ainda lists Bank Communication Management como ancestor on-prem.",
    "paraQueServe": "Pagamentos e cash management without host-to-host artesanal. Mistura: S/4 Treasury / AP → Multi-Bank → bancos.",
    "exemploReal": "Produto autónomo no All Products; aparece nos scope items de S/4 Cloud Finance.",
    "nesteCenario": {
      "onprem": "Dimmed (classic BCM / host-to-host).",
      "cloud": "Optional, very common in cloud Finance.",
      "rise": "Optional, very common in Private Edition Finance."
    }
  },
  "snc": {
    "nome": "SAP Supply Network Collaboration",
    "tipo": "Collaboration fournisseur",
    "oQueFaz": "Colaboração clássica com suppliers de production (previsão, consignação, VMI). Help: Supply Network Collaboration e Information Collaboration Hub for Life Sciences. Na cloud o strategic target é Business Network for Supply Chain.",
    "paraQueServe": "Fornecedor de componentes vê a necessidade e confirma. Mistura industry: S/4 / IBP planeia → SNC ou Business Network colabora → EWM recebe.",
    "exemploReal": "SNC é a linha clássica no All Products; Business Network for Supply Chain é o target cloud.",
    "nesteCenario": {
      "onprem": "Optional / active em industry com VMI clássico.",
      "cloud": "Atténué. Target = Business Network.",
      "rise": "Optionnel. Coexistence or migration to the Network."
    }
  },
  "ecc": {
    "nome": "SAP ECC 6.0 (legado)",
    "tipo": "ERP héritée",
    "oQueFaz": "SAP ERP Central Component, a Business Suite 7 sobre AnyDB ou HANA. Help ainda lists SAP R/3 como ancestor. Fim de maintenance mainstream alinhado com NetWeaver 7.5 / Business Suite 7 (2027 standard, 2030 extended). Ponto de partida da maioria dos RISE brownfield.",
    "paraQueServe": "Ainda é o engine de milhares de empresas. Mistura de saída: ECC + PI/PO + SolMan + HCM on-prem → RISE Private Edition + Integration Suite + Cloud ALM + SuccessFactors.",
    "exemploReal": "O padrão public da maior parte das histórias RISE (H.B. Fuller e existing SAP ERP customers) é exactamente este ponto de partida.",
    "nesteCenario": {
      "onprem": "Active if the legacy toggle is on or the landscape is not yet S/4.",
      "cloud": "Masqué. GROW is greenfield Public Edition, not ECC in the cloud.",
      "rise": "Origin legacy. Visible com toggle. The destination card is s4hana Private Edition."
    }
  },
  "s4-any": {
    "nome": "SAP S/4HANA (any-premise)",
    "tipo": "ERP on-prem",
    "oQueFaz": "S/4HANA instalado e operated pelo customer ou por um hoster clássico, sobre HANA on-prem. Digital core funcional quase completo. TCO, upgrades, HA/DR e segurança a cargo da TI interna.",
    "paraQueServe": "Quem quer S/4 mas ainda não quer o contract RISE/GROW. Mistura clássica: S/4 any-premise + HANA on-prem + PI/PO ou Suite + SolMan + Fiori on-prem.",
    "exemploReal": "A maioria dos customers RISE publicados partiu de ECC ou deste any-premise.",
    "nesteCenario": {
      "onprem": "The company's engine when on-prem is already S/4. Central L4 card.",
      "cloud": "Masqué. Replaced by S/4HANA Cloud Public Edition.",
      "rise": "Dimmed during dual-running. The successor in the same visual slot is s4hana Private Edition."
    }
  },
  "s4hana": {
    "nome": "SAP S/4HANA Cloud",
    "tipo": "ERP Cloud",
    "oQueFaz": "Digital core na cloud. Help: SAP S/4HANA Cloud Private Edition e RISE with SAP Private Cloud Edition. O MESMO card representa duas edições, distinguíveis pelo preset: Public Edition (GROW) e Private Edition (RISE). Cobre finanças, logística, vendas, manufacturing, EWM/TM, projects, serviço. Extensões in-app (key user) são limitadas; diferenciação vai para o BTP.",
    "paraQueServe": "Motor transaccional da empresa. Public Edition = velocidade e standard. Private Edition = preservar complexidade com operação SAP e caminho para clean core.",
    "exemploReal": "Alto (Governo do Canadá): S/4HANA Cloud Public Edition + SuccessFactors live em 6 meses. Ferrara Candy: RISE Private Edition, 25 módulos em big-bang. H.B. Fuller: Private Edition em 123 countries.",
    "nesteCenario": {
      "onprem": "Masqué. The active L4 card is s4-any ou ecc.",
      "cloud": "Public Edition. Standard processes, SAP upgrades, Cloud ALM for Activate and operations.",
      "rise": "Private Edition on the SAP-managed hyperscaler (or CDC). Clean core is measured on the Cloud ALM RISE Methodology dashboard."
    }
  },
  "fiori": {
    "nome": "SAP Fiori",
    "tipo": "UX",
    "oQueFaz": "Linguagem de experiência SAP: apps Fiori, SAPUI5, launchpad, design system. Help: SAP Fiori Apps Reference Library, SAPUI5, SAP Screen Personas, SAP Business Client, SAP GUI for Windows / Java.",
    "paraQueServe": "Get the user off classic SAP GUI. Mistura: Fiori nativo do S/4 + apps Build + tiles LoB no Work Zone, com IAS at the door.",
    "exemploReal": "Qualquer go-live S/4 Cloud citado neste mapa (Alto, Ferrara, H.B. Fuller) entrega o day-to-day em Fiori, não em SAP GUI.",
    "nesteCenario": {
      "onprem": "Active como launchpad on-prem / Gateway.",
      "cloud": "Actif.",
      "rise": "Actif."
    }
  },
  "netweaver": {
    "nome": "SAP NetWeaver",
    "tipo": "PaaS on-prem",
    "oQueFaz": "Plataforma técnica clássica: ABAP Application Server, Java stack histórico, Kernel, Gateway, Web Dispatcher. Help: NetWeaver AS ABAP 7.4 for Suite version for HANA e linha 7.5. Debaixo de ECC, SolMan, PI/PO, Portal. Manutenção alinhada com Business Suite 7 / 2027.",
    "paraQueServe": "Explicar sobre que chão corre o mundo on-prem.",
    "exemploReal": "Todo o parque ECC e PI/PO corre sobre NetWeaver. A data de 2027 de PI/PO e SolMan é, em grande medida, a data de NetWeaver 7.5.",
    "nesteCenario": {
      "onprem": "Actif.",
      "cloud": "Masqué.",
      "rise": "Masqué / héritage."
    }
  },
  "mdg": {
    "nome": "SAP Master Data Governance",
    "tipo": "Données de base",
    "oQueFaz": "Governação de master data (Business Partner, material, finanças). Help: Master Data Governance, MDG Cloud Edition, e extensions enterprise asset management / retail and fashion by Prometheus Group.",
    "paraQueServe": "Uma ficha de supplier, customer ou artigo. Mistura: MDG no S/4 + Integration Suite a distribuir + Ariba/SuccessFactors a consumir o mesmo Business Partner.",
    "exemploReal": "Ferrara Candy reportou mais de 98% de quality de master/finance data no go-live RISE.",
    "nesteCenario": {
      "onprem": "Actif.",
      "cloud": "Actif.",
      "rise": "Actif."
    }
  },
  "group-reporting": {
    "nome": "SAP Group Reporting",
    "tipo": "Consolidation",
    "oQueFaz": "Consolidação no S/4. Help also lists Group Reporting Data Collection e Disclosure Management como satellites de close de group. Substitui em grande medida BPC consolidation / BCS / EC-CS.",
    "paraQueServe": "Contas do group. Mistura: S/4 company codes → Group Reporting → Disclosure Management / SAC.",
    "exemploReal": "Scope item central de S/4 Finance. Data Collection é produto à parte no All Products para o input das entidades não-S/4.",
    "nesteCenario": {
      "onprem": "Active on S/4 any-premise with a group.",
      "cloud": "Active in Public Edition Finance.",
      "rise": "Actif."
    }
  },
  "central-finance": {
    "nome": "SAP Central Finance",
    "tipo": "Finance centrale",
    "oQueFaz": "S/4HANA usado como ledger financeiro central que replica documentos de vários ECC/S/4 satellite em tempo real. Help lists also Central Finance Master Data Replication e Transaction Replication by insightsoftware. Não replaces o ERP logístico das company codes — concentra FI/CO.",
    "paraQueServe": "Grupos com muitos ECC que querem um close único without big-bang de todas as company codes. Mistura brownfield: ECC satellites → SLT / replication → Central Finance no RISE → Group Reporting.",
    "exemploReal": "A Shell usou S/4HANA / Central Finance como digital core financeiro em tempo real. Padrão clássico de transformation faseada.",
    "nesteCenario": {
      "onprem": "Optional / active in multi-ECC groups.",
      "cloud": "Rare in Public Edition (different model).",
      "rise": "Recommended with a brownfield group profile spanning several ERPs."
    }
  },
  "treasury": {
    "nome": "SAP Treasury and Risk Management",
    "tipo": "Trésorerie",
    "oQueFaz": "Tesouraria, risk financeiro, instrumentos, liquidez. Help: Treasury and Risk Management (e extensions Impairment), Trading Platform Integration, Liquidity Risk Management, Market Rates Management, Treasury G-Invoicing, Payment Engine, SAP Pay, Digital Payments Add-On, Digital Currency Hub, Capital Yield Tax Management.",
    "paraQueServe": "Caixa, dívida, hedges. Mistura: S/4 Treasury + Multi-Bank + Trading Platform + SAC.",
    "exemploReal": "Família Treasury no All Products é distinta do FI-AP clássico. Multi-Bank Connectivity é o braço de conectividade.",
    "nesteCenario": {
      "onprem": "Active in mature treasuries.",
      "cloud": "Optional in Public Edition Finance.",
      "rise": "Optional / active in groups with central treasury."
    }
  },
  "cash-application": {
    "nome": "SAP Cash Application",
    "tipo": "IA Finance",
    "oQueFaz": "Matching inteligente de extractos e payments a invoices abertas. Help: Cash Application add-on for contract accounting. Peça de Autonomous Finance sobre o S/4.",
    "paraQueServe": "Reduzir o trabalho manual de compensação. Mistura: Multi-Bank traz o extracto → Cash Application propõe o match → S/4 FI confirma.",
    "exemploReal": "Posicionado by SAP na family Autonomous Finance / Business AI sobre S/4.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel Finance.",
      "rise": "Optionnel Finance."
    }
  },
  "rar": {
    "nome": "SAP Revenue Accounting and Reporting",
    "tipo": "Revenu",
    "oQueFaz": "Reconhecimento de receita (IFRS 15 / ASC 606). Help: Revenue Accounting and Reporting 1.3. Complementa BRIM when há obrigações de performance complexas.",
    "paraQueServe": "Contabilizar receita no ritmo certo. Mistura: S/4 SD ou BRIM invoicem → RAR reconhece → Group Reporting consolida.",
    "exemploReal": "Produto autónomo no All Products, family Finance, distinto do billing SD.",
    "nesteCenario": {
      "onprem": "Optional in IFRS 15 groups.",
      "cloud": "Optionnel.",
      "rise": "Optionnel avec le profil réglementé."
    }
  },
  "disclosure-management": {
    "nome": "SAP Disclosure Management",
    "tipo": "Reporting réglementaire",
    "oQueFaz": "Produção e workflow do relatório financeiro e de sustainability a publicar. Help: Disclosure Management. Senta-se a jusante do Group Reporting e do Control Tower ESG.",
    "paraQueServe": "O PDF / iXBRL que vai para o mercado. Mistura: Group Reporting + Sustainability Control Tower → Disclosure Management.",
    "exemploReal": "Satélite oficial do close de group no All Products, ao lado de Group Reporting Data Collection.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel avec le profil réglementé."
    }
  },
  "ppm": {
    "nome": "SAP Portfolio and Project Management",
    "tipo": "Projets",
    "oQueFaz": "Portefólio e projects. Help: Portfolio and Project Management, Commercial Project Management, cProject Suite, Enterprise Project Connection, Unified Planning Center. No S/4 Cloud parte das capacidades vive em Enterprise Portfolio and Project Management embedded.",
    "paraQueServe": "Capex, engenharia, projects de customer. Mistura: PPM / CPM planeia → S/4 PS / Finance executa → SAC reporta.",
    "exemploReal": "H.B. Fuller e outros RISE industriais incluem projects no perímetro. CPM é o irmão de projects comerciais ( timbiling ).",
    "nesteCenario": {
      "onprem": "Optional / active in engineering and capex.",
      "cloud": "Optional (shorter Public scope).",
      "rise": "Optionnel avec le profil industrie."
    }
  },
  "business-one": {
    "nome": "SAP Business One",
    "tipo": "ERP PME",
    "oQueFaz": "ERP para pequenas empresas, HANA ou MS SQL, on-prem ou hospedado por partners. Is not S/4. Não entra em RISE. Roadmap próprio.",
    "paraQueServe": "PME que não precisam de S/4. Mistura de group: sede em S/4 + filiais pequenas em Business One, ligadas por Integration Suite.",
    "exemploReal": "A SAP posiciona Business One como ERP de PME partner-led, distinct from GROW (que é S/4 Public Edition).",
    "nesteCenario": {
      "onprem": "Active in the SME universe.",
      "cloud": "Active as a parallel SME line next to GROW.",
      "rise": "Irrelevant as core. Possible subsidiary satellite."
    }
  },
  "bydesign": {
    "nome": "SAP Business ByDesign",
    "tipo": "ERP PME Cloud",
    "oQueFaz": "ERP SaaS para mid-market, mais profundo que Business One e mais pequeno que S/4 Public Edition. Help: Business ByDesign e Cloud Applications Studio (PDI).",
    "paraQueServe": "Mid-market que já está em ByDesign, ou groups que usam ByDesign em subsidiárias.",
    "exemploReal": "ByDesign é a linha SaaS histórica de mid-market from SAP, anterior ao empurrão GROW.",
    "nesteCenario": {
      "onprem": "Sans objet.",
      "cloud": "Optionnel. Is not the default GROW.",
      "rise": "Irrelevant as core. Possible satellite."
    }
  },
  "successfactors": {
    "nome": "SAP SuccessFactors",
    "tipo": "SaaS HCM",
    "oQueFaz": "Suite de RH na cloud. Help documents Employee Central, Recruiting / Applicant Management / Candidate Pipeline / E-Recruiting for S/4HANA, Career and Talent Development, Opportunity Marketplace, Work Zone de employee, Enterprise Service Management, Learning Solution, Performance & Goals, Compensation, Succession, 360 Reviews, Analytics, Time and Attendance / Absence by WorkForce Software, Deskless Worker Experience, U.S. Benefits Administration by Benefitfocus. Destino estratégico do HCM on-prem. Inclui SmartRecruiters no recruiting.",
    "paraQueServe": "Contratar, integrar, formar, avaliar, pagar e gerir talento. Mistura: Employee Central é o master da pessoa; o S/4 recebe custo, org e time; o IAS authenticates; o Joule atende o employee; o Fieldglass cobre o trabalhador que is not funcionário.",
    "exemploReal": "Alto: RH live em 6 meses com S/4 Public. Darussalam Assets: menos 75% no tempo de recruitment. Gerdau: onboarding 50% mais rápido. Southwest Gas: LMS + BTP para compliance de campo via QR.",
    "nesteCenario": {
      "onprem": "Atténué. The classic default is SAP HCM on ECC/S/4.",
      "cloud": "Actif. GROW HCM.",
      "rise": "Actif."
    }
  },
  "hcm-onprem": {
    "nome": "SAP HCM (on-premise)",
    "tipo": "RH on-prem",
    "oQueFaz": "Módulo clássico de RH no ECC / S/4 any-premise: PA, OM, Time, Payroll. Help: ERP HCM HR Support Package Versions, HR Renewal, Best Practices For HCM. Destino estratégico: SuccessFactors.",
    "paraQueServe": "Pagar salários e gerir tempo enquanto o talento já pode estar em SuccessFactors.",
    "exemploReal": "A coexistence HCM on-prem (payroll) + SuccessFactors (Employee Central / Talent) é um dos hybrids mais frequentes da Europe.",
    "nesteCenario": {
      "onprem": "Actif.",
      "cloud": "Masqué / héritage.",
      "rise": "Atténué. Residual on-prem payroll is a real RISE mix pattern."
    }
  },
  "ariba": {
    "nome": "SAP Ariba",
    "tipo": "SaaS Achats",
    "oQueFaz": "Suite source-to-pay na cloud. Help: Ariba, Buying, Invoicing, Intake Management, Category Management, Strategic Sourcing, Procurement, Mobile, Contract Price Renegotiation. Trabalha de par com o Business Network e com o MM do S/4. Help ainda lists SRM Server, SLC, Sourcing and CLM como ancestrais.",
    "paraQueServe": "Compras indirectas e colaboração com suppliers. Mistura spend completa: Ariba + Business Network + Managed Gateway + S/4 MM + Concur + Fieldglass + Taulia + Spend Control Tower + VIM.",
    "exemploReal": "NEOM: Ariba no P2P, registo de suppliers cerca de menos 80%. Ferrara: Ariba Business Network + GTS. Sonae Arauco: mais 25% de produtividade. SKF: procurement global com Ariba.",
    "nesteCenario": {
      "onprem": "Dimmed (classic MM / legacy SRM).",
      "cloud": "Active, especially with the spend profile.",
      "rise": "Actif."
    }
  },
  "business-network": {
    "nome": "SAP Business Network",
    "tipo": "Réseau",
    "oQueFaz": "Rede multi-empresa. Help: Business Network, Business Network for Supply Chain, Asset Collaboration, Logistics Provider, Supply Chain Collaboration clinical trials add-on, project44 Add-Ons, Ariba Network.",
    "paraQueServe": "Sair do e-mail e do PDF. Mistura: S/4 ou Ariba publicam o documento → Business Network → o parceiro responde without ter SAP.",
    "exemploReal": "O RISE includes tipicamente um starter da Business Network. Ferrara usou a network no onboarding de suppliers e no compliance.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Actif avec le profil spend.",
      "rise": "Actif. A starter pack usually comes in the RISE envelope."
    }
  },
  "concur": {
    "nome": "SAP Concur",
    "tipo": "SaaS notes de frais",
    "oQueFaz": "Travel, Expense e Invoice na cloud. Help: Concur, Concur Invoice, Concur Travel & Expense.",
    "paraQueServe": "Tirar o T&E do papel. Mistura spend: Concur para o employee que viaja, Ariba para o comprador, S/4 para o contabilists.",
    "exemploReal": "NEOM: despesas reembolsadas em dois dias em vez de três ou quatro meses. H.B. Fuller includes Concur in the envelope RISE descrito publicamente.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optional in baseline GROW, recommended with the spend profile.",
      "rise": "Optional in the minimum envelope, very common in the real mix."
    }
  },
  "fieldglass": {
    "nome": "SAP Fieldglass",
    "tipo": "SaaS VMS",
    "oQueFaz": "Vendor Management System para workforce externa: temporaries, SOW, serviços. Is not SuccessFactors.",
    "paraQueServe": "Onboarding, timesheet, compliance e pagamento de externals.",
    "exemploReal": "Amdocs publicou um caso com SuccessFactors + Fieldglass + S/4HANA, com ganhos de compliance SOX.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optional, recommended com workforce profile.",
      "rise": "Optional, recommended com workforce profile."
    }
  },
  "taulia": {
    "nome": "SAP Taulia",
    "tipo": "Besoin en fonds de roulement",
    "oQueFaz": "Working capital e supply-chain finance: early payment, dynamic discounting. Help lists also SAP Supplier Financing. A SAP reportou mais de 980 mil milhões de dólares geridos por ano.",
    "paraQueServe": "Libertar cash without mudar o process source-to-pay.",
    "exemploReal": "Número public SAP: Taulia gere mais de 980 mil milhões de dólares por ano.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel avec le profil spend.",
      "rise": "Optionnel avec le profil spend."
    }
  },
  "spend-control-tower": {
    "nome": "SAP Spend Control Tower",
    "tipo": "Analytique Spend",
    "oQueFaz": "Torre de visibilidade de spend. Agrega Ariba, S/4 MM, Fieldglass, Concur. Não replaces o Ariba nem o SAC genérico.",
    "paraQueServe": "CFO / CPO a ver o gasto total.",
    "exemploReal": "Entrada autónoma no All Products, family Source-to-Pay.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel avec le profil spend.",
      "rise": "Optionnel avec le profil spend."
    }
  },
  "vim": {
    "nome": "SAP Invoice Management by OpenText",
    "tipo": "Facture fournisseur",
    "oQueFaz": "Captura e workflow de invoices de supplier (VIM). Help: Invoice Management by OpenText, Information Capture by OpenText, Invoice and Goods Receipt Reconciliation. Na cloud o destino mix-se com Ariba Invoice + S/4 Central Invoice Management.",
    "paraQueServe": "Tirar a invoice de papel/PDF da contabilidade. Mistura spend on-prem: OCR OpenText → VIM → S/4 FI-AP.",
    "exemploReal": "VIM by OpenText é o standard de facto de AP invoice em groups SAP European on-prem.",
    "nesteCenario": {
      "onprem": "Active em AP clássico.",
      "cloud": "Atténué. Target = Ariba Invoice / CIM.",
      "rise": "Optionnel. Many RISE landscapes keep VIM on Private Edition."
    }
  },
  "signavio": {
    "nome": "SAP Signavio",
    "tipo": "Intelligence des processus",
    "oQueFaz": "Suite de transformation de processes. Help: Process Transformation Suite, Process Manager, Process Modeler, Process Intelligence, Process Governance, Process Collaboration Hub, Journey Modeler, Process Transformation Manager. Família antiga: Business Process Intelligence e Process Mining by Celonis. Process Navigator traz best practices S/4. A deploysção controlada do to-be é o sítio onde entra o card Deploy with Confidence.",
    "paraQueServe": "Fit-gap honesto. As-is minerado, to-be desenhado, gap transformado em requisitos do Cloud ALM.",
    "exemploReal": "Vodafone Procurement: 11 mil modelos migrados de ARIS; 284 milhões de cases em Process Intelligence; 82 reports Celonis migrados to SAC. Alto: Process Navigator reduziu documentsção cerca de 30%.",
    "nesteCenario": {
      "onprem": "Active como ferramenta de preparação.",
      "cloud": "Actif. GROW fit-to-standard.",
      "rise": "Actif. Process toolchain of the RISE methodology."
    }
  },
  "sac": {
    "nome": "SAP Analytics Cloud",
    "tipo": "Analytique + planification",
    "oQueFaz": "BI, predictive e enterprise planning na cloud. Help lists also Analytics Hub e o add-in PowerPoint. Face analítica da Business Data Cloud. Destino estratégico do parque BusinessObjects.",
    "paraQueServe": "Closing comments, forecast, dashboards de direcção, planeamento integrado.",
    "exemploReal": "Vodafone migrou 82 reports to SAC. NEOM usou BW/4 + SAC. Shanxi Antai: BTP + SAC para gestão de carbono.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Actif.",
      "rise": "Actif."
    }
  },
  "joule": {
    "nome": "Joule + SAP Business AI",
    "tipo": "IA / assistant",
    "oQueFaz": "Copiloto e agentes com contexto de process SAP. Help: Joule e Joule for Developers ABAP AI Capabilities. CoPilot é o ancestor. Domínios: Autonomous Finance, Spend, SCM, HCM, CX. Joule Studio para construir agentes; AI Agent Hub para os governsr.",
    "paraQueServe": "Perguntar o estado de uma PO, lançar uma acção em SuccessFactors, explicar um desvio em SAC.",
    "exemploReal": "H&M: Store Intelligence Agent sobre RISE + Business Data Cloud + Commerce Cloud + SuccessFactors. A SAP anunciou compromisso contratual de activar Joule assistants no primeiro ano RISE.",
    "nesteCenario": {
      "onprem": "Sans objet dans le mix par défaut.",
      "cloud": "Actif.",
      "rise": "Actif."
    }
  },
  "ibp": {
    "nome": "SAP Integrated Business Planning",
    "tipo": "SaaS Planning",
    "oQueFaz": "Planeamento de supply chain na cloud: S&OP, demand, inventory, response & supply. Sucessor conceptual do APO. Help lists IBP Integration Enhancements, Advanced Planning and Optimization e Sales and Operations Planning.",
    "paraQueServe": "Alinhar vendas, operações e finanças num plano.",
    "exemploReal": "Ferrara includesu IBP no landscape RISE publicado.",
    "nesteCenario": {
      "onprem": "Dimmed (APO legacy / PP clássico).",
      "cloud": "Optionnel. Recommandé avec le profil industrie.",
      "rise": "Optionnel. Recommandé avec le profil industrie."
    }
  },
  "ewm": {
    "nome": "SAP EWM",
    "tipo": "Warehouse",
    "oQueFaz": "Extended Warehouse Management. Help: Digital Supply Chain Management edition for S/4HANA e S/4HANA Supply Chain. Is not o WM clássico do ECC.",
    "paraQueServe": "Operar armazéns complexos.",
    "exemploReal": "EWM embedded é piece standard dos go-lives industriais S/4 (Ferrara referiu EWM/MDG/GTS no big-bang).",
    "nesteCenario": {
      "onprem": "Active when o on-prem tem warehouse avançado.",
      "cloud": "Optional (shorter Public scope).",
      "rise": "Optional in the envelope mínimo, frequente em industry profile."
    }
  },
  "tm": {
    "nome": "SAP Transportation Management",
    "tipo": "Transportes",
    "oQueFaz": "Planeamento e execução de transportation. Help: S/4HANA Supply Chain for transportation management e Transportation Resource Planning.",
    "paraQueServe": "Sair da folha de Excel do despachante.",
    "exemploReal": "Pacotes RISE de Digital Supply Chain posicionam TM ao lado de EWM e IBP.",
    "nesteCenario": {
      "onprem": "Active em landscapes logísticos.",
      "cloud": "Optionnel.",
      "rise": "Optional, recommended com industry profile."
    }
  },
  "digital-manufacturing": {
    "nome": "SAP Digital Manufacturing",
    "tipo": "MES cloud",
    "oQueFaz": "MES na cloud. Help: Digital Manufacturing, Production Connector, Shop Floor Manager, Complex Assembly Manufacturing, Complex Manufacturing Accelerator.",
    "paraQueServe": "Chão de fábrica. Mistura híbrida clássica: S/4 Private Edition + DM + Cloud Connector / EIC + APM + EWM.",
    "exemploReal": "Pacotes RISE de Production from SAP assentam em Digital Manufacturing.",
    "nesteCenario": {
      "onprem": "Dimmed (MES legacy / ME / MII).",
      "cloud": "Optionnel avec le profil industrie.",
      "rise": "Recommandé avec le profil industrie."
    }
  },
  "apm": {
    "nome": "SAP Asset Performance Management",
    "tipo": "Asset SaaS",
    "oQueFaz": "Estratégia e performance de assets. Help: Asset Performance Management, Enterprise Asset Management, Enhanced Maintenance and Service Planning, Asset Manager.",
    "paraQueServe": "Passar de maintenance calendário a maintenance por condição.",
    "exemploReal": "Pacotes RISE de Asset Management combinam APM + Field Service + EAM do S/4.",
    "nesteCenario": {
      "onprem": "Dimmed (PM clássico).",
      "cloud": "Optionnel avec le profil industrie.",
      "rise": "Optionnel avec le profil industrie."
    }
  },
  "yard-logistics": {
    "nome": "SAP Yard Logistics",
    "tipo": "Yard",
    "oQueFaz": "Gestão do recinto: check-in de camiões, docas, movimentação no pátio. Senta-se entre TM e EWM.",
    "paraQueServe": "Cais e pátios pesados.",
    "exemploReal": "Produto autónomo no All Products, family Digital Supply Chain.",
    "nesteCenario": {
      "onprem": "Optional em logística pesada.",
      "cloud": "Rare en Public Edition.",
      "rise": "Optional com industry profile / logística."
    }
  },
  "warehouse-insights": {
    "nome": "SAP Warehouse Insights / Robotics",
    "tipo": "Warehouse add-on",
    "oQueFaz": "Help: Warehouse Insights, Warehouse Robotics, Warehouse Operator. Optimização e robótica em cima do EWM.",
    "paraQueServe": "OEE do warehouse e frota robótica.",
    "exemploReal": "Três entradas distintas no All Products, à volta do EWM.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel.",
      "rise": "Optional com industry profile e warehouse automatizado."
    }
  },
  "ipd": {
    "nome": "SAP Integrated Product Development",
    "tipo": "PLM Cloud",
    "oQueFaz": "PLM / engenharia na cloud. Help: IPD, PLM, Product Lifecycle Costing, PLM system integration para S/4 / ERP / 3DEXPERIENCE / Autodesk Vault / Windchill, Teamcenter by Siemens, 3D Visual Enterprise.",
    "paraQueServe": "Desenhar o produto e o custo-target antes da ordem de production.",
    "exemploReal": "H.B. Fuller listou PLM no perímetro RISE.",
    "nesteCenario": {
      "onprem": "Dimmed (PLM on-prem clássico).",
      "cloud": "Optionnel.",
      "rise": "Optional com industry profile de produto."
    }
  },
  "gbt": {
    "nome": "SAP Global Batch Traceability",
    "tipo": "Rastreio",
    "oQueFaz": "Rastreio de lote ponta-a-ponta. Help: Global Batch Traceability e GBT on S/4HANA. Crítico em pharma, food, chemicals. Help also lists Advanced Track and Trace for Pharmaceuticals.",
    "paraQueServe": "Recall em minutos, não em semanas. Mistura regulada: S/4 lote → GBT → EHS / quality.",
    "exemploReal": "GBT e ATTP são produtos autónomos no All Products, family Life Sciences / quality.",
    "nesteCenario": {
      "onprem": "Optional / active em pharma e food.",
      "cloud": "Optionnel.",
      "rise": "Optional com industry profile / regulated."
    }
  },
  "event-management": {
    "nome": "SAP Event Management",
    "tipo": "Visibilidade logística",
    "oQueFaz": "Track-and-trace de events de cadeia (embarque, atraso, prova de entrega). Help: Event Management e Event Management on S/4HANA. Destino cloud mix-se com Business Network e TM.",
    "paraQueServe": "Saber onde vai a mercadoria. Mistura: TM planeia → Event Management / Network vê o event.",
    "exemploReal": "Produto clássico no All Products da family SCM.",
    "nesteCenario": {
      "onprem": "Optional em logística.",
      "cloud": "Atténué.",
      "rise": "Optionnel."
    }
  },
  "fnr": {
    "nome": "SAP Forecasting and Replenishment",
    "tipo": "Reposição retalho",
    "oQueFaz": "Help: Forecasting and Replenishment for Retail e Predictive Replenishment. Reposição de loja e DC no retalho. Complementa IBP (que planeia a network) no último quilómetro da gôndola.",
    "paraQueServe": "Não faltar leite na prateleira. Mistura retalho: IBP + F&R / Predictive Replenishment + EWM + Customer Checkout.",
    "exemploReal": "Duas entradas All Products na family Retail.",
    "nesteCenario": {
      "onprem": "Optional em retalho.",
      "cloud": "Optionnel.",
      "rise": "Optional em retalho."
    }
  },
  "returns-management": {
    "nome": "SAP Intelligent Returns Management",
    "tipo": "Devoluções",
    "oQueFaz": "Devoluções inteligentes (omnichannel). Help: Intelligent Returns Management e Recommerce. Fecha o ciclo commerce / retalho.",
    "paraQueServe": "Reverse logistics. Mistura CX+supply: Commerce / Checkout → Returns → EWM → S/4 crédito.",
    "exemploReal": "Intelligent Returns e Recommerce listsdos no All Products.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optional em commerce.",
      "rise": "Optional em commerce."
    }
  },
  "commerce-cloud": {
    "nome": "SAP Commerce Cloud",
    "tipo": "SaaS CX",
    "oQueFaz": "Plataforma de commerce (ex-Hybris). Help: composable storefront e accelerators, Search Service, Open Payment Framework, localization for China, Marketplace Management by Mirakl.",
    "paraQueServe": "Canal digital. Mistura CX: Commerce + Emarsys + Sales Cloud + Service Cloud + Customer Data Cloud + S/4 + Joule.",
    "exemploReal": "H&M usou Commerce Cloud no demo Sapphire 2026 do InStore Concierge. Cintas publicou BTP + Commerce Cloud + Concur + CX + SuccessFactors.",
    "nesteCenario": {
      "onprem": "Dimmed (hybris on-prem legacy).",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "sales-cloud": {
    "nome": "SAP Sales Cloud",
    "tipo": "SaaS CX",
    "oQueFaz": "CRM de vendas. Help documents Sales Cloud Version 2 e o pacote Sales Cloud and Service Cloud Version 2. Ancestral: Hybris Cloud for Customer.",
    "paraQueServe": "O vendedor. Mistura: Sales Cloud ganha a oportunidade → CPQ configura → S/4 fatura → Service Cloud faz o pós-venda.",
    "exemploReal": "A suite SAP CX é o destino do antigo C/4HANA.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "service-cloud": {
    "nome": "SAP Service Cloud",
    "tipo": "SaaS CX",
    "oQueFaz": "CRM de serviço. Help: Service Cloud, Service Cloud Version 2, Self-Service Accelerator for Utilities by SEW.",
    "paraQueServe": "Pós-venda e assistência.",
    "exemploReal": "A SAP posiciona Service Cloud + FSM nos pacotes de Asset Management e Autonomous CX.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel.",
      "rise": "Optional, recommended com industry profile."
    }
  },
  "emarsys": {
    "nome": "SAP Emarsys (Engagement Cloud)",
    "tipo": "SaaS CX",
    "oQueFaz": "Marketing automation. Help: Emarsys, Emarsys Account Engagement, Engagement Cloud. Marketing / Marketing Cloud é a linha anterior.",
    "paraQueServe": "Campanhas e personalização.",
    "exemploReal": "A SAP posiciona Emarsys como o pilar Marketing da suite CX no índice oficial.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "customer-data-cloud": {
    "nome": "SAP Customer Data Cloud",
    "tipo": "SaaS CX",
    "oQueFaz": "CIAM e perfil de consumidor. Distinto do IAS e do Business Data Cloud.",
    "paraQueServe": "Login da loja, consentimento GDPR/CNPD, perfil único.",
    "exemploReal": "Help agrupa Customer experience > Customer data como área própria da suite CX.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optional se houver canal digital consumidor.",
      "rise": "Optional se houver canal digital consumidor."
    },
    "naoConfundir": "Is not SAP Cloud Identity Services (IAS/IPS). Is not Business Data Cloud."
  },
  "cpq": {
    "nome": "SAP CPQ",
    "tipo": "SaaS CX",
    "oQueFaz": "Configure, Price and Quote. Help: CPQ e Solution Sales Configuration (cloud / S/4 / Commerce).",
    "paraQueServe": "Vendas configuráveis.",
    "exemploReal": "A Help lists CPQ e Solution Sales Configuration como produtos distintos do Sales Cloud.",
    "nesteCenario": {
      "onprem": "Dimmed (VC / SSC on-prem).",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "fsm": {
    "nome": "SAP Field Service Management",
    "tipo": "SaaS CX",
    "oQueFaz": "Despacho de técnicos de campo. Help: Field Service Management e Field Service and Asset Management.",
    "paraQueServe": "Assistência no active. Mistura: APM ou S/4 EAM → FSM → Service and Asset Manager → S/4.",
    "exemploReal": "Coresystems foi absorvido para esta family. Pacotes RISE de Asset Management combinam FSM + APM + EAM.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel.",
      "rise": "Optionnel avec le profil industrie."
    }
  },
  "service-asset-manager": {
    "nome": "SAP Service and Asset Manager",
    "tipo": "App móvel",
    "oQueFaz": "App móvel de maintenance e serviço. Substitui conceptualmente Work Manager, Inventory Manager, Rounds Manager e Maintenance Assistant.",
    "paraQueServe": "Mãos no active.",
    "exemploReal": "Help ainda documents Work Manager / Inventory Manager / Rounds Manager / Maintenance Assistant como linha clássica.",
    "nesteCenario": {
      "onprem": "Active em maintenance de assets.",
      "cloud": "Optionnel.",
      "rise": "Optionnel avec le profil industrie."
    }
  },
  "order-management": {
    "nome": "SAP Order Management",
    "tipo": "SaaS CX",
    "oQueFaz": "Help: Order Management Foundation, Order Management for Sourcing and Availability, Order and Delivery Scheduling.",
    "paraQueServe": "Orquestração omnichannel antes do S/4.",
    "exemploReal": "A Help separa Order Management de Commerce Cloud e de S/4 SD.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optional em retalho omnichannel.",
      "rise": "Optional em retalho omnichannel."
    }
  },
  "customer-checkout": {
    "nome": "SAP Customer Checkout",
    "tipo": "POS",
    "oQueFaz": "Ponto de venda. Help: Customer Checkout e edições cloud. Linha adjacente: Omnichannel POS by GK, Enterprise POS, Offline Mobile Store by GK, Store Management by GK, Dynamic Pricing by GK.",
    "paraQueServe": "Loja física.",
    "exemploReal": "Várias gerações de POS no All Products. Customer Checkout cloud é o target PME/retalho SAP-nativo.",
    "nesteCenario": {
      "onprem": "Optional em retalho.",
      "cloud": "Optional em retalho.",
      "rise": "Optional em retalho."
    }
  },
  "entitlement-management": {
    "nome": "SAP Entitlement Management",
    "tipo": "SaaS CX",
    "oQueFaz": "Direitos of the customer sobre subscrições, licences e uso.",
    "paraQueServe": "Software e serviços recorrentes. Mistura: S/4 ou BRIM fatura → Entitlement autoriza o uso.",
    "exemploReal": "Produto autónomo no All Products, ao lado da family CX e de BRIM.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optional em subscription.",
      "rise": "Optional em subscription."
    }
  },
  "sustainability": {
    "nome": "SAP Sustainability Control Tower",
    "tipo": "Sustentabilidade",
    "oQueFaz": "Torre de controlo ESG. Help: Control Tower, Sustainability Solutions, Sustainability Performance Management.",
    "paraQueServe": "Reporte CSRD / emissões ao nível do group.",
    "exemploReal": "Shanxi Antai publicou gestão de carbono ponta-a-ponta com BTP e SAC.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel avec le profil réglementé.",
      "rise": "Optional com regulated profile / industry."
    }
  },
  "footprint-management": {
    "nome": "SAP Sustainability Footprint Management",
    "tipo": "Sustentabilidade",
    "oQueFaz": "Cálculo de footprint. Help: Footprint Management, Sustainability Data Exchange, Responsible Design and Production.",
    "paraQueServe": "Saber a footprint do artigo e partilhá-la.",
    "exemploReal": "Quatro entradas distintas no All Products sob Sustainability Solutions.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "green-ledger": {
    "nome": "SAP Green Ledger",
    "tipo": "Sustentabilidade",
    "oQueFaz": "Contabilidade de emissões no livro do S/4. Help: Green Ledger e Green Token.",
    "paraQueServe": "CSRD com rasto contabilístico.",
    "exemploReal": "SAC tem conteúdo Green Ledger Reporting for S/4HANA and S/4HANA Cloud.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "ehs": {
    "nome": "SAP EHS",
    "tipo": "Ambiente e segurança",
    "oQueFaz": "Environment, Health and Safety. Help: EHS Management, EHS Regulatory Content, Environmental Compliance, Management of Change.",
    "paraQueServe": "Segurança operacional e auditoria ambiental.",
    "exemploReal": "H.B. Fuller includesu EHS Management no perímetro RISE publicado.",
    "nesteCenario": {
      "onprem": "Active em industrys reguladas.",
      "cloud": "Optionnel.",
      "rise": "Optional com industry profile / regulated."
    }
  },
  "grc": {
    "nome": "SAP GRC / Access Control",
    "tipo": "Risco e controlo",
    "oQueFaz": "Governance, Risk and Compliance. Help: GRC, Access Control, Process Control, Risk Management, GRC for HANA, Financial Compliance Management, Access Violation Management by Greenlight.",
    "paraQueServe": "Auditoria, SOX, SoD.",
    "exemploReal": "Ferrara referiu GRC no big-bang RISE. Amdocs publicou 100% SOX compliance.",
    "nesteCenario": {
      "onprem": "Active em landscapes auditados.",
      "cloud": "Optionnel avec le profil réglementé.",
      "rise": "Optionnel avec le profil réglementé."
    }
  },
  "gts": {
    "nome": "SAP GTS (Global Trade)",
    "tipo": "Comércio externo",
    "oQueFaz": "Global Trade Services: sanctioned party, embargo, classificação aduaneira, declarações.",
    "paraQueServe": "Não vender ao destino errado e não falhar a alfândega.",
    "exemploReal": "Ferrara Candy: Ariba Business Network + GTS co-hosted para sanctioned parties.",
    "nesteCenario": {
      "onprem": "Active em exportadores.",
      "cloud": "Optionnel.",
      "rise": "Optional com regulated profile / spend internacional."
    }
  },
  "document-compliance": {
    "nome": "SAP Document and Reporting Compliance",
    "tipo": "Compliance fiscal",
    "oQueFaz": "Factura electrónica e reporte legal. Help: DRC Cloud Edition, Document Compliance, Digital Compliance India, Electronic Invoicing Brazil, Peppol guides, Tax Declaration Framework Brazil.",
    "paraQueServe": "e-invoice, SAF-T, Peppol. O card é a platform, não cada localização-país.",
    "exemploReal": "Família enorme no All Products porque cada país tem um conector.",
    "nesteCenario": {
      "onprem": "Active em countries com mandate de e-document.",
      "cloud": "Actif. Peça do GROW honest minimum.",
      "rise": "Actif."
    }
  },
  "brim": {
    "nome": "SAP BRIM",
    "tipo": "Billing de subscrição",
    "oQueFaz": "Billing and Revenue Innovation Management. Help: BRIM, Convergent Mediation by DigitalRoute, Contract Accounts Receivable and Payable.",
    "paraQueServe": "Monetizar uso e subscrição (telco, utilities, software).",
    "exemploReal": "All Products lists BRIM como family própria, distinta do SD billing clássico.",
    "nesteCenario": {
      "onprem": "Active em telco/utilities/subscription on-prem.",
      "cloud": "Optionnel.",
      "rise": "Optionnel. Private Edition cabe BRIM pesado."
    }
  },
  "iot": {
    "nome": "SAP Internet of Things",
    "tipo": "IoT",
    "oQueFaz": "Camada IoT from SAP. Help: SAP Internet of Things (SAP IoT), Auto-ID Infrastructure. Alimenta APM, Digital Manufacturing e Event Mesh com telemetria. Muitos cenários novos passam por BTP Kyma + Event Mesh em vez do produto IoT clássico.",
    "paraQueServe": "Ligar sensores ao process. Mistura industry: IoT / Auto-ID → Event Mesh → APM ou DM → S/4.",
    "exemploReal": "IoT e Auto-ID Infrastructure listsdos no All Products. Auto-ID é a linha RFID clássica.",
    "nesteCenario": {
      "onprem": "Dimmed (Auto-ID / MII).",
      "cloud": "Optionnel.",
      "rise": "Optionnel avec le profil industrie."
    }
  },
  "real-estate": {
    "nome": "SAP Cloud for Real Estate / RE-FX",
    "tipo": "Imobiliário",
    "oQueFaz": "Imobiliário. Help: Cloud for Real Estate, Real Estate Management e add-on Tenant Relationship Management.",
    "paraQueServe": "Contratos de arrendamento, espaço, IFRS 16. Mistura: RE-FX / Cloud for Real Estate + S/4 FI + SAC.",
    "exemploReal": "Duas gerações no All Products: RE-FX clássico e Cloud for Real Estate.",
    "nesteCenario": {
      "onprem": "Optional (RE-FX).",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "industry-cloud": {
    "nome": "SAP Industry Cloud",
    "tipo": "Vertical",
    "oQueFaz": "Camada de soluções verticais. Help: Industry Cloud Enterprise Agreement, Industry Process Framework, SAP for Banking, Insurance, Healthcare, Utilities, Waste and Recycling, Intelligent Agriculture, Batch Release Hub for Life Sciences, Intelligent Clinical Supply Management, Sports One. Card-guarda-chuva. Cloud for Energy, Digital Vehicle e Fashion têm cards próprios porque mudam a mix.",
    "paraQueServe": "Lembrar que S/4 + BTP não chega em utilities, auto, life sciences, agro.",
    "exemploReal": "All Products tem secções SAP for Banking, Insurance, Healthcare, Utilities, Waste and Recycling.",
    "nesteCenario": {
      "onprem": "Dimmed (IS-* clássicos).",
      "cloud": "Optional vertical.",
      "rise": "Optional vertical."
    }
  },
  "cloud-for-energy": {
    "nome": "SAP Cloud for Energy",
    "tipo": "Utilities",
    "oQueFaz": "Suite cloud de energia. Help: Cloud for Energy, Market Communication, Market Process Management, Energy Data Management, Energy Portfolio Management, Intelligent Metering DE, Pricing and Costing for Utilities, Multichannel Foundation for Utilities.",
    "paraQueServe": "Mercado, medição, comunicação de mercado.",
    "exemploReal": "Família Utilities no All Products. Clientes DE/AT usam Market Communication + EDM.",
    "nesteCenario": {
      "onprem": "Dimmed (IS-U).",
      "cloud": "Optional vertical.",
      "rise": "Optional vertical, recommended em utilities."
    }
  },
  "digital-vehicle": {
    "nome": "SAP Digital Vehicle Hub / Suite",
    "tipo": "Automotive",
    "oQueFaz": "Help: Digital Vehicle Hub, Operations, Suite, E-Mobility. Gémeo digital e operações do veículo.",
    "paraQueServe": "OEM e frotas.",
    "exemploReal": "Três entradas All Products + E-Mobility.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optional vertical.",
      "rise": "Optional vertical auto."
    }
  },
  "fashion": {
    "nome": "SAP Fashion / Apparel and Footwear",
    "tipo": "Retail moda",
    "oQueFaz": "Help: Fashion Management, Apparel and Footwear, MDG retail and fashion extension by Prometheus Group.",
    "paraQueServe": "Variantes, épocas, grelhas de tamanhos.",
    "exemploReal": "AFS / Fashion Management decidem muitas vezes Private Edition vs Public.",
    "nesteCenario": {
      "onprem": "Active em customers AFS/Fashion.",
      "cloud": "Optional — Public pode ficar curto.",
      "rise": "Optional, frequentemente a razão para Private Edition."
    }
  },
  "cloud-alm": {
    "nome": "SAP Cloud ALM",
    "tipo": "ALM SaaS",
    "oQueFaz": "Application Lifecycle Management cloud-native. Quatro planos: Implementação (Activate, sprints, requisitos, tests, features, quality gates); Operações (health, integration/exception, job monitoring, BPM); Analytics do landscape; Observabilidade de agentes Joule. Inclui o dashboard RISE Methodology / System View de clean core. Incluído em RISE e GROW via Enterprise Support, Cloud Editions — pede-se o tenant em SAP for Me.",
    "paraQueServe": "Mission control da mix GROW ou RISE. Traduz o to-be do Signavio em requisitos e tests; mede o clean core. Face visible da disciplina Deploy with Confidence.",
    "exemploReal": "A SAP descreve Cloud ALM como backbone da toolchain agent-led da metodologia RISE. O próprio produto Cloud ALM é construído internamente com Deploy with Confidence.",
    "nesteCenario": {
      "onprem": "Disponível se houver Enterprise Support, mas the default é Solution Manager. Carte atténuée.",
      "cloud": "Default ALM of GROW.",
      "rise": "Default ALM of RISE. RISE Methodology / System View dashboard."
    }
  },
  "solman": {
    "nome": "SAP Solution Manager",
    "tipo": "ALM on-prem",
    "oQueFaz": "ALM clássico: ChaRM, ITSM, documentsção, Test Suite, monitoring, Custom Code Management. Fim da maintenance mainstream: final de 2027. RISE puro NÃO includes usage rights de SolMan.",
    "paraQueServe": "Mission control do on-prem. Destino estratégico: Cloud ALM (Readiness Check, nota 3236443).",
    "exemploReal": "A SAP agenda o EoM mainstream do Solution Manager para o final de 2027.",
    "nesteCenario": {
      "onprem": "Main L6 card.",
      "cloud": "Masqué.",
      "rise": "Atténué. Default is Cloud ALM."
    }
  },
  "focused-run": {
    "nome": "SAP Focused Run",
    "tipo": "Ops avançado",
    "oQueFaz": "Monitoring de alto volume para service providers e landscapes muito grandes.",
    "paraQueServe": "Quem opera dezenas ou centenas de systems SAP.",
    "exemploReal": "A SAP lists três ALM estratégicos: Cloud ALM, Solution Manager, Focused Run. Não há paridade entre os três.",
    "nesteCenario": {
      "onprem": "Optional em operatedres e groups muito grandes.",
      "cloud": "Not applicable in typical GROW.",
      "rise": "Optionnel."
    }
  },
  "leanix": {
    "nome": "SAP LeanIX",
    "tipo": "Architecture d'entreprise",
    "oQueFaz": "Inventário vivo de applications, interfaces e capacidades. Help: LeanIX, Enterprise Architecture Designer, Enterprise Architecture Framework.",
    "paraQueServe": "Saber o que existe antes de mixr.",
    "exemploReal": "Toolchain SAP de transformation: LeanIX + Signavio + WalkMe + Cloud ALM.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Active em transformações GROW multi-app.",
      "rise": "Actif."
    }
  },
  "walkme": {
    "nome": "WalkMe",
    "tipo": "Adoption digitale",
    "oQueFaz": "Digital adoption. Help: WalkMe Digital Adoption. Guias in-app sobre Fiori, SuccessFactors, Ariba.",
    "paraQueServe": "Evitar que um S/4 Fiori impecável morra na adopção.",
    "exemploReal": "Fact sheets RISE listsm Signavio + LeanIX + WalkMe como toolchain de transformation.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optional, útil em GROW.",
      "rise": "Optional, frequente in the envelope de transformation."
    }
  },
  "enable-now": {
    "nome": "SAP Enable Now",
    "tipo": "Formação",
    "oQueFaz": "Autoría e entrega de training in-app. Help: Enable Now e Knowledge Acceleration. Diferente do WalkMe e do SuccessFactors Learning.",
    "paraQueServe": "Enablement do go-live.",
    "exemploReal": "Programas Activate clássicos incluem Enable Now como standard de enablement.",
    "nesteCenario": {
      "onprem": "Actif.",
      "cloud": "Active / optional.",
      "rise": "Active / optional."
    }
  },
  "dwc": {
    "nome": "Deploy with Confidence (DwC)",
    "tipo": "Méthode",
    "oQueFaz": "Paved road interna da engenharia SAP para entregar software SaaS todos os dias com quality: trunk-based development, tests automatizados, feature toggles, daily deploy, zero-downtime na perspectiva do tenant. Nasceu como iniciativa de Operational Excellence (finalists do Hasso Plattner Founders’ Award 2020). NÃO é um SKU, NÃO aparece in the contract of the customer, NÃO é o antigo Data Warehouse Cloud.",
    "paraQueServe": "Dois papéis. Primeiro: explicar a cadência de Cloud ALM, Signavio, SuccessFactors e Public Edition. Segundo: padrão mental de como um process to-be do Signavio se IMPLANTA com confiança — quality gates no Cloud ALM, clean core no BTP, feature toggles, tests Tricentis, evidência para auditoria.",
    "exemploReal": "A equipa do SAP Cloud ALM descreveu o produto a correr sobre Deploy with Confidence: deploys diários, feature toggles, change lead time inferior a um dia. A Vodafone não ganhou 11 mil modelos Signavio para os deixar num repositório.",
    "nesteCenario": {
      "onprem": "Atténué. On-prem clássico deploys com SolMan/ChaRM — o contrário cultural do DwC.",
      "cloud": "Actif comme méthode.",
      "rise": "Actif comme méthode. Liga Signavio a Cloud ALM e a BTP."
    },
    "naoConfundir": "NÃO é SAP Data Warehouse Cloud (hoje Datasphere, id datasphere). NÃO é a oferta de partner Delivery Confidence for SAP da KPMG. NÃO se licencia."
  },
  "btc": {
    "nome": "SAP Business Transformation Center",
    "tipo": "Migração de dados",
    "oQueFaz": "Transtraining seletiva e assessment de data ECC/S/4 → Cloud ERP. Help: Business Transformation Center, Landscape Transformation, Test Data Migration Server.",
    "paraQueServe": "Selective data transition. Signavio escolhe o process → BTC escolhe os data → Cloud ALM corre o project.",
    "exemploReal": "Documentação Cloud ALM 2026 refere BTC em Data Management.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Raro (GROW é sobretudo greenfield).",
      "rise": "Recommandé avec le profil brownfield."
    }
  },
  "tricentis": {
    "nome": "SAP Test Automation by Tricentis",
    "tipo": "Tests",
    "oQueFaz": "Help: Test Automation by Tricentis, Tricentis Test Automation for SAP, Enterprise Continuous Testing, Enterprise Performance Testing, Change Impact Analysis, Quality Center by Micro Focus, Test Acceleration and Optimization.",
    "paraQueServe": "Regressão a cada upgrade S/4 Cloud. Cloud ALM guarda o plano → Tricentis executa → quality gate DwC-style.",
    "exemploReal": "Cloud ALM for Implementation integra cenários de teste automatizado.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Recommandé.",
      "rise": "Recommandé."
    }
  },
  "sap-for-me": {
    "nome": "SAP for Me",
    "tipo": "Portail client",
    "oQueFaz": "Portal of the customer SAP: contracts, systems, licences, requests de tenant Cloud ALM. Help: SAP for Me. Built-In Support e Support Content vivem nesta órbita.",
    "paraQueServe": "Pedir o tenant Cloud ALM e ver o que está contratado. SAP for Me (contract) → Cloud ALM (execução).",
    "exemploReal": "É daqui que a maior parte dos customers RISE/GROW provisiona o Cloud ALM.",
    "nesteCenario": {
      "onprem": "Actif.",
      "cloud": "Actif.",
      "rise": "Actif."
    }
  },
  "etd": {
    "nome": "SAP Enterprise Threat Detection",
    "tipo": "Segurança",
    "oQueFaz": "SIEM focado em ameaças sobre systems SAP (logs, anomalias, ataques). Help: Enterprise Threat Detection. Complementa GRC (SoD) e IAG (acesso): ETD vê o ataque, não só o perfil.",
    "paraQueServe": "Detectar abuso e ataque no stack SAP. Mistura regulada: ETD + GRC + IAG + Cloud ALM.",
    "exemploReal": "Produto autónomo no All Products, family Security, distinct from Access Control.",
    "nesteCenario": {
      "onprem": "Optional / recommended com regulated profile.",
      "cloud": "Optionnel.",
      "rise": "Optionnel avec le profil réglementé."
    }
  },
  "sci": {
    "nome": "SAP Cloud Infrastructure (SCI)",
    "tipo": "IaaS souveraine",
    "oQueFaz": "IaaS operada pela própria SAP, desenvolvida com tecnologias open-source (OpenStack + Kubernetes) na network global de data centres SAP — NÃO é AWS, Azure nem GCP. Compute (VMs/flavors), block/object/file storage, SDN, load balancing, DNSaaS, identity/key management, container registry. Linha: SAP Converged Cloud (2015) → SAP Cloud Infrastructure. Em 2025 a SAP reportou cerca de 15 regiões, 29 data centres, mais de 200 mil VMs. Na Europe é a opção IaaS do SAP Sovereign Cloud: data no UE (Walldorf, St. Leon-Rot, colocation Frankfurt), três availability zones, certificações ISO 27001 IT-Grundschutz (Abr 2026), VS-NfD (Jun 2026), BSI C5 Type II, KRITIS/NIS 2. Base da EU AI Cloud (modelos de IA na abstração SCI + BTP, without dependência de hyperscaler americano).",
    "paraQueServe": "Correr S/4HANA Cloud, BTP, HANA Cloud e workloads of the customer when a sovereignty impede AWS/Azure/GCP. Mistura regulada: SCI + Sovereign Cloud + BTP + S/4 + Cloud ALM. Alternativa no mesmo L0 que os três hyperscalers e que o CDC / On-Site.",
    "exemploReal": "SAP.com lists SAP Cloud Infrastructure como pilar do Sovereign Cloud. Wikipedia e o anúncio EU AI Cloud (Nov 2025) descrevem SCI as IaaS SAP without dependência de tecnologias de hyperscaler. HANA Cloud documents SCI como infrastructure suportada.",
    "nesteCenario": {
      "onprem": "Not applicable como host of the ERP on-prem. Carte atténuée.",
      "cloud": "Optionnel. Active when o selector L0 está em SCI ou o regulated profile está on. GROW/Public Edition pode ser publicado sobre SCI em regiões soberanas.",
      "rise": "Optional / recommended com regulated profile. RISE/Private Edition sobre IaaS SAP em vez de hyperscaler americano."
    },
    "naoConfundir": "NÃO é SAP Cloud Integration (o nome antigo do iFlow na Integration Suite, por vezes also chamado SCI/CPI). NÃO é BTP (BTP é PaaS). NÃO é o Customer Data Centre clássico. NÃO é NS2 (NS2 é a via EUA / National Security Services)."
  },
  "sovereign-cloud": {
    "nome": "SAP Sovereign Cloud",
    "tipo": "Portefólio soberania",
    "oQueFaz": "Portefólio, não uma VM. Quatro dimensões: sovereignty de data, operacional, legal e técnica. Três vias de deployment: (1) SAP Cloud Infrastructure — IaaS SAP; (2) Sovereign Cloud On-Site — infra operada by SAP no DC escolhido pelo customer; (3) hyperscaler soberano / NS2. Disponibilidade public referida em EUA (NS2), Austrália, Canadá, Índia, Nova Zelândia, Reino Unido, Alemanha, França e outros countries European. EU AI Cloud (2025) une o stack soberano europeu (SCI + BTP + AI Foundation, parceria Mistral).",
    "paraQueServe": "Escolher o NÍVEL de sovereignty, não só o sítio das VMs. Mistura: regulated profile liga este card a SCI ou a CDC/On-Site ou a NS2.",
    "exemploReal": "Página oficial SAP Sovereign Cloud e o anúncio EU AI Cloud de Novembro 2025. Investimento anunciado de milhares de milhões na Europe, includesndo 2 mil milhões na Alemanha.",
    "nesteCenario": {
      "onprem": "Dimmed (sovereignty on-prem é o DC of the customer, não este portfolio).",
      "cloud": "Optional, active com regulated profile.",
      "rise": "Optional, active com regulated profile."
    },
    "naoConfundir": "Is not um quarto hyperscaler. É o guarda-chuva comercial/compliance. O IaaS concreto na Europe é o card SCI."
  },
  "ns2": {
    "nome": "SAP NS2 (National Security Services)",
    "tipo": "Soberania EUA",
    "oQueFaz": "Via EUA do Sovereign Cloud: operação por SAP National Security Services sobre infra aprovada (incl. AWS GovCloud). Pessoal, clearances e residência de data alinhados a requisitos do sector public e defesa dos EUA. HANA Cloud foi anunciado em NS2.",
    "paraQueServe": "Clientes governo / defesa EUA. Na Europe o equivalente de conversa é SCI + Sovereign Cloud, não NS2.",
    "exemploReal": "Blog SAP: HANA Cloud em Sovereign Cloud e NS2. sap.com lists NS2 como via EUA do portfolio soberano.",
    "nesteCenario": {
      "onprem": "Sans objet.",
      "cloud": "Optional, só com regulated profile e contexto EUA.",
      "rise": "Optional, só com regulated profile e contexto EUA."
    },
    "naoConfundir": "Is not SCI. SCI é IaaS SAP europeia/global nos DC SAP. NS2 é a entidade e o modelo operacional EUA."
  },
  "powerbuilder": {
    "nome": "SAP PowerBuilder",
    "tipo": "IDE legado",
    "oQueFaz": "IDE clássico para applications customer-servidor (DataWindows). Help: PowerBuilder. Não faz parte do BTP nem do clean core.",
    "paraQueServe": "Manter apps PowerBuilder enquanto se migra para Fiori/Build.",
    "exemploReal": "Entrada All Products. Linha de ferramenta, não LoB.",
    "nesteCenario": {
      "onprem": "Optional legacy.",
      "cloud": "Masqué.",
      "rise": "Masqué."
    }
  },
  "powerdesigner": {
    "nome": "SAP PowerDesigner",
    "tipo": "Modelação",
    "oQueFaz": "Ferramenta de modelação empresarial (data, processes, architecture). Help: PowerDesigner. Destino conceptual: LeanIX + Signavio + Datasphere.",
    "paraQueServe": "Documentar modelos de data e architecture em landscapes clássicos.",
    "exemploReal": "Produto autónomo no All Products, family EA/modelação.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "infomaker": {
    "nome": "SAP InfoMaker",
    "tipo": "Reporting legado",
    "oQueFaz": "Ferramenta clássica de reporting associada ao ecossystem PowerBuilder.",
    "paraQueServe": "Reports desktop em landscapes antigos.",
    "exemploReal": "All Products. Destino = SAC / Analysis for Office.",
    "nesteCenario": {
      "onprem": "Hérité.",
      "cloud": "Masqué.",
      "rise": "Masqué."
    }
  },
  "open-server": {
    "nome": "SAP Open Server",
    "tipo": "Middleware DB legado",
    "oQueFaz": "Camada de servidor aberto da family Sybase / ASE para protocolos de BD.",
    "paraQueServe": "Compatibilidade com stacks Sybase clássicos.",
    "exemploReal": "All Products, family ASE/SQL Anywhere.",
    "nesteCenario": {
      "onprem": "Hérité.",
      "cloud": "Masqué.",
      "rise": "Masqué."
    }
  },
  "orientdb": {
    "nome": "SAP Enterprise OrientDB",
    "tipo": "Grafo legado",
    "oQueFaz": "Edição empresarial OrientDB referenciada no índice Help. Workloads de grafo novos vão para HANA Cloud multi-model / Knowledge Graph.",
    "paraQueServe": "Grafos em landscapes que ainda a usam.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Hérité.",
      "cloud": "Atténué.",
      "rise": "Atténué."
    }
  },
  "replication-server": {
    "nome": "SAP Replication Server",
    "tipo": "Replicação",
    "oQueFaz": "Replicação clássica Sybase/SAP entre bases. Help: Replication Server. Em S/4/Central Finance o padrão moderno é SLT / BTC / Datasphere replication.",
    "paraQueServe": "Replicar data entre enginees clássicos.",
    "exemploReal": "All Products, family data.",
    "nesteCenario": {
      "onprem": "Optional legacy.",
      "cloud": "Atténué.",
      "rise": "Atténué."
    }
  },
  "sql-anywhere": {
    "nome": "SAP SQL Anywhere",
    "tipo": "DB embarcada",
    "oQueFaz": "Base embarcada / edge. Help: SQL Anywhere. Distinta do HANA.",
    "paraQueServe": "Apps ocasionalmente conectadas, POS, edge.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Atténué.",
      "rise": "Atténué."
    }
  },
  "sql-analyzer": {
    "nome": "SQL Analyzer Tool for SAP HANA",
    "tipo": "Ferramenta",
    "oQueFaz": "Analisador de SQL/planos sobre HANA. Help: SQL Analyzer Tool for SAP HANA.",
    "paraQueServe": "Afinar queries HANA.",
    "exemploReal": "All Products, family HANA tools.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "event-ticketing": {
    "nome": "SAP Event Ticketing",
    "tipo": "Ticketing",
    "oQueFaz": "Bilheteira / events. Help: Event Ticketing. Vertical de lazer, não Event Mesh.",
    "paraQueServe": "Venda de bilhetes e acesso a events.",
    "exemploReal": "All Products. Do not confuse with Event Management logístico.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    },
    "naoConfundir": "Is not SAP Event Management (track-and-trace) nem Event Mesh."
  },
  "event-stream-processor": {
    "nome": "SAP Event Stream Processor",
    "tipo": "Streaming legado",
    "oQueFaz": "CEP/streaming clássico. Help: Event Stream Processor. Destino: Event Mesh / Advanced Event Mesh / AI Core streaming.",
    "paraQueServe": "Processar streams em landscapes antigos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Hérité.",
      "cloud": "Atténué.",
      "rise": "Atténué."
    }
  },
  "event-insight": {
    "nome": "SAP Event Insight",
    "tipo": "Eventos legado",
    "oQueFaz": "Insight sobre events de negócio, linha histórica no Help.",
    "paraQueServe": "Visibilidade de events antes do Event Mesh.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "innovation-management": {
    "nome": "SAP Innovation Management",
    "tipo": "Inovação",
    "oQueFaz": "Portefólio de ideias e inovação. Help: Innovation Management.",
    "paraQueServe": "Funil de ideias até project (liga a PPM).",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "knowledge-acceleration": {
    "nome": "SAP Knowledge Acceleration",
    "tipo": "Enablement",
    "oQueFaz": "Conteúdos de aceleração de conhecimento. Help: Knowledge Acceleration. Irmão do Enable Now.",
    "paraQueServe": "Formação acelerada em módulos SAP.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "micro-app-hub": {
    "nome": "SAP Micro-App Hub",
    "tipo": "Hub de micro-apps",
    "oQueFaz": "Catálogo de micro-apps. Help: Micro-App Hub.",
    "paraQueServe": "Distribuir mini-apps no workplace.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "collaboration-manager": {
    "nome": "SAP Collaboration Manager",
    "tipo": "Colaboração",
    "oQueFaz": "Colaboração em processes/documentos. Help: Collaboration Manager.",
    "paraQueServe": "Workrooms em volta de objectos SAP.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "content-to-go": {
    "nome": "SAP Content to Go",
    "tipo": "Conteúdo móvel",
    "oQueFaz": "Distribuição de conteúdo Enable Now / help para dispositivos. Help: Content to Go.",
    "paraQueServe": "Levar simulações e help ao telemóvel.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "employee-lookup": {
    "nome": "SAP Employee Lookup",
    "tipo": "App RH",
    "oQueFaz": "App de pesquisa de employees. Help: Employee Lookup 2.3.",
    "paraQueServe": "Encontrar colegas. Destino UX: Work Zone / Mobile Start.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "candidate-pipeline": {
    "nome": "Candidate Pipeline",
    "tipo": "Recruiting",
    "oQueFaz": "Pipeline de candidatos no universo SuccessFactors / recruiting. Help: Candidate Pipeline.",
    "paraQueServe": "Acompanhar candidatos até à admissão.",
    "exemploReal": "All Products, family SuccessFactors.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "agent-compliance": {
    "nome": "Agent Compliance",
    "tipo": "Compliance RH",
    "oQueFaz": "Compliance de agentes / força de vendas no índice Help.",
    "paraQueServe": "Certificações e regras de agentes.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "questionmark": {
    "nome": "Assessment Management by Questionmark",
    "tipo": "Avaliação",
    "oQueFaz": "Avaliações e tests por Questionmark. Help: Assessment Management by Questionmark.",
    "paraQueServe": "Exames e certificações ligadas a Learning.",
    "exemploReal": "All Products, parceiro.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "behavioral-insights": {
    "nome": "Behavioral Insights",
    "tipo": "Analytics pessoas",
    "oQueFaz": "Insights comportamentais no portfolio Help.",
    "paraQueServe": "Padrões de comportamento de employees/customers.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "budget-benefits": {
    "nome": "Budget-Based Benefits Selection",
    "tipo": "Benefícios",
    "oQueFaz": "Selecção de benefícios por orçamento. Help: Budget-Based Benefits Selection.",
    "paraQueServe": "Open enrollment com envelope orçamental.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "workforce-forecast": {
    "nome": "SAP Workforce Forecasting and Scheduling",
    "tipo": "WFM",
    "oQueFaz": "Previsão e horários de workforce. Help: Workforce Forecasting and Scheduling by Workforce Software.",
    "paraQueServe": "Turnos e forecasting operacional.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "public-budgeting": {
    "nome": "Budgeting and Planning for Public Sector",
    "tipo": "Sector público",
    "oQueFaz": "Orçamentação e planeamento para sector public. Help: Budgeting and Planning for Public Sector.",
    "paraQueServe": "Orçamento public sobre S/4 / SAC.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "financial-closing": {
    "nome": "SAP Financial Closing Cockpit",
    "tipo": "Fecho",
    "oQueFaz": "Orquestração do close financeiro. Help: Financial Closing Cockpit Add-On.",
    "paraQueServe": "Checklist e tasks do month-end.",
    "exemploReal": "All Products, family Finance.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "financial-consolidation": {
    "nome": "SAP Financial Consolidation",
    "tipo": "Consolidação legado",
    "oQueFaz": "Consolidação clássica (BFC). Help: Financial Consolidation. Destino: Group Reporting.",
    "paraQueServe": "Contas do group em landscapes pré-S/4.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Hérité.",
      "cloud": "Masqué.",
      "rise": "Hérité."
    }
  },
  "funding-management": {
    "nome": "SAP Funding Management",
    "tipo": "Fundos",
    "oQueFaz": "Gestão de fundos / grants. Help: Funding Management.",
    "paraQueServe": "Sector public e educação: fundos e availability control.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "green-token": {
    "nome": "SAP Green Token",
    "tipo": "Sustentabilidade",
    "oQueFaz": "Cadeia de custódia de atributos ambientais. Help: Green Token. Irmão do Green Ledger.",
    "paraQueServe": "Provar a origem verde de um lote / certificado.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "rdp": {
    "nome": "SAP Responsible Design and Production",
    "tipo": "EPR / circular",
    "oQueFaz": "Conceção responsável e EPR (plásticos, responsabilidade alargada do produtor). Help: Responsible Design and Production.",
    "paraQueServe": "Obrigações de embalagem e eco-design.",
    "exemploReal": "All Products, family Sustainability.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "sus-data-exchange": {
    "nome": "SAP Sustainability Data Exchange",
    "tipo": "ESG partilha",
    "oQueFaz": "Partilha de data ESG com parceiros. Help: Sustainability Data Exchange.",
    "paraQueServe": "Trocar footprints e atributos na network.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "sus-performance": {
    "nome": "SAP Sustainability Performance Management",
    "tipo": "ESG performance",
    "oQueFaz": "Performance de sustainability. Help: Sustainability Performance Management.",
    "paraQueServe": "KPI ESG operacionais, a montante do Control Tower.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "ltc": {
    "nome": "Lead-to-Cash",
    "tipo": "Cadeia de processo",
    "oQueFaz": "Cadeia comercial ponta-a-ponta (lead → contract → invoice → cash). Help lists Lead-to-Cash Business Process. Is not um exe: é o process que o Signavio modela e o S/4+Sales+Commerce executam.",
    "paraQueServe": "Ver a mix comercial como um flow, não como produtos isolados.",
    "exemploReal": "All Products como business process.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "s2p-process": {
    "nome": "Source-to-Pay (cadeia)",
    "tipo": "Cadeia de processo",
    "oQueFaz": "Cadeia de procurement ponta-a-ponta. Help: Source-to-Pay Business Process.",
    "paraQueServe": "Ler Ariba + S/4 MM + Network como um flow.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "p2f": {
    "nome": "Plan-to-Fulfill",
    "tipo": "Cadeia de processo",
    "oQueFaz": "Cadeia de planeamento à entrega. Help: Plan-to-Fulfill Business Process.",
    "paraQueServe": "IBP → S/4 → EWM/TM como um flow.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "r2r-hr": {
    "nome": "Recruit-to-Retire",
    "tipo": "Cadeia de processo",
    "oQueFaz": "Cadeia de vida do employee. Help: Recruit-to-Retire Business Process.",
    "paraQueServe": "SuccessFactors + Folha + Fieldglass como um flow.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "i2m": {
    "nome": "Idea-to-Market",
    "tipo": "Cadeia de processo",
    "oQueFaz": "Cadeia de inovação a produto. Help: Idea to Market Business Process.",
    "paraQueServe": "Innovation Management + IPD + S/4 como um flow.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "trade-claims": {
    "nome": "SAP Intelligent Trade Claims Management",
    "tipo": "Trade promo",
    "oQueFaz": "Claims de promoções comerciais. Help: Intelligent Trade Claims Management.",
    "paraQueServe": "Deduzir e liquidar claims de retalhistas.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "trade-management": {
    "nome": "SAP Trade Management",
    "tipo": "Trade",
    "oQueFaz": "Gestão de trade promotions. Help: Trade Management.",
    "paraQueServe": "Planeamento de promoções no canal.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "intercompany-exchange": {
    "nome": "Intercompany data exchange",
    "tipo": "Utilities intercompany",
    "oQueFaz": "Troca intercompany para utilities CH (electricidade/gás) no S/4. Help: Intercompany Data Exchange for Swiss Electric and Gas Utilities.",
    "paraQueServe": "Market communication entre empresas do group.",
    "exemploReal": "All Products, vertical utilities.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "igr": {
    "nome": "SAP Invoice and Goods Receipt Reconciliation",
    "tipo": "MM/FI",
    "oQueFaz": "Reconciliação invoice vs entrada de mercadorias. Help: Invoice and Goods Receipt Reconciliation.",
    "paraQueServe": "3-way match residual when não há VIM/Ariba Invoice.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "landscape-portal": {
    "nome": "Landscape Portal (ABAP environment)",
    "tipo": "Ops ABAP Cloud",
    "oQueFaz": "Portal de landscape do ABAP environment S/4 Cloud. Help: Landscape Portal for SAP S/4HANA Cloud ABAP environment.",
    "paraQueServe": "Operar tenants ABAP Cloud.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "moc": {
    "nome": "SAP Management of Change",
    "tipo": "EHS / mudança",
    "oQueFaz": "Gestão de mudança operacional (fábrica, EHS). Help: Management of Change.",
    "paraQueServe": "Permit-to-work e mudanças de instalação.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "mdg-prometheus": {
    "nome": "MDG extensions by Prometheus Group",
    "tipo": "MDG add-on",
    "oQueFaz": "Extensões MDG EAM e retail/fashion by Prometheus Group. Help lists várias linhas.",
    "paraQueServe": "Master data de assets e moda para além do MDG standard.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "metadata-management": {
    "nome": "SAP Metadata Management",
    "tipo": "Metadados",
    "oQueFaz": "Gestão de metadata no parque EIM clássico. Help: Metadata Management.",
    "paraQueServe": "Catálogo de metadata ao lado de Information Steward.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "notes-management": {
    "nome": "SAP Notes Management",
    "tipo": "Notas",
    "oQueFaz": "Gestão de SAP Notes no landscape. Help: Notes Management.",
    "paraQueServe": "Aplicar e rastrear notes. Destino ops: Cloud ALM / LaMa.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "notification-social": {
    "nome": "Notification Integration for Social Media",
    "tipo": "Notificações",
    "oQueFaz": "Integração de notificações com apps sociais. Help: Notification Integration Service for Social Media Apps.",
    "paraQueServe": "Alertas em canais sociais.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "oasm": {
    "nome": "Online Application Submission Management",
    "tipo": "Submissão online",
    "oQueFaz": "Submissão online de candidaturas / requests. Help: Online Application Submission Management.",
    "paraQueServe": "Portais de submissão sector public / utilities.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "ods": {
    "nome": "SAP Order and Delivery Scheduling",
    "tipo": "Scheduling omnichannel",
    "oQueFaz": "Scheduling de encomenda e entrega. Help: Order and Delivery Scheduling. Satélite da family Order Management.",
    "paraQueServe": "Prometer e calendarizar entregas omnichannel.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "plm-recipe": {
    "nome": "SAP PLM Recipe Management",
    "tipo": "Receitas",
    "oQueFaz": "Receitas de produto (process / CPG). Help: PLM Recipe Management.",
    "paraQueServe": "Fórmulas e receitas antes da ordem de process.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "pos-classic": {
    "nome": "SAP Point-of-Sale (clássico)",
    "tipo": "POS legado",
    "oQueFaz": "POS clássico Enterprise Point-of-Sale. Help: Point-of-Sale / Enterprise POS. Destino: Customer Checkout / Omnichannel POS by GK.",
    "paraQueServe": "Caixa em landscapes antigos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Hérité.",
      "cloud": "Atténué.",
      "rise": "Atténué."
    }
  },
  "process-object-builder": {
    "nome": "SAP Process Object Builder",
    "tipo": "A2A legado",
    "oQueFaz": "Builder de process objects na integration clássica. Help: Process Object Builder.",
    "paraQueServe": "Objectos de process A2A em PI/PO.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "workflow-mgmt": {
    "nome": "SAP Workflow Management / Process Visibility",
    "tipo": "Workflow legado",
    "oQueFaz": "Workflow Management e Process Visibility no BTP (linha anterior ao Build Process Automation). Help: Process Visibility Capability Within Workflow Management.",
    "paraQueServe": "Workflows BTP antigos. Destino: Build Process Automation.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "product-model-viewer": {
    "nome": "SAP Product Model Viewer",
    "tipo": "PLM viewer",
    "oQueFaz": "Visualizador de modelo de produto. Help: Product Model Viewer / 3D Visual Enterprise.",
    "paraQueServe": "Ver o gémeo 3D no process de engenharia.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "product-transition": {
    "nome": "Product Transition Process",
    "tipo": "Transição de produto",
    "oQueFaz": "Processo de transição / phase-in phase-out de produto. Help: Product Transition Process.",
    "paraQueServe": "Substituir artigos without partir MRP.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "ppg-bdf": {
    "nome": "Product and Process Governance by BDF",
    "tipo": "Governação PLM",
    "oQueFaz": "Governação de produto e process by BDF. Help: Product and Process Governance by BDF (e on S/4HANA).",
    "paraQueServe": "Governar mudanças de produto em industry regulada.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "pra": {
    "nome": "SAP Production and Revenue Accounting",
    "tipo": "Upstream oil",
    "oQueFaz": "Accounting de production e receita (oil & gas upstream). Help: Production and Revenue Accounting.",
    "paraQueServe": "Dividir receita de poços e joint ventures.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "qir": {
    "nome": "SAP Quality Issue Resolution",
    "tipo": "Qualidade",
    "oQueFaz": "Resolução de problemas de quality em colaboração. Help: Quality Issue Resolution e Quality Issue Management.",
    "paraQueServe": "8D / CAPA com suppliers.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "re-tenant": {
    "nome": "RE-FX Tenant Relationship add-on",
    "tipo": "Imobiliário",
    "oQueFaz": "Add-on de relação com inquilino no Real Estate. Help: Real Estate Management add-on for Tenant Relationship Management.",
    "paraQueServe": "Contratos e serviço ao inquilino.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "resolve": {
    "nome": "SAP Resolve",
    "tipo": "Suporte",
    "oQueFaz": "Oferta de resolução / supportability no índice Help.",
    "paraQueServe": "Encaminhar problemas de produto.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "revenue-growth": {
    "nome": "SAP Revenue Growth Management",
    "tipo": "Crescimento receita",
    "oQueFaz": "Growth management e optimization de receita. Help: Revenue Growth Management / Revenue Growth Optimization.",
    "paraQueServe": "Preço, mix e crescimento comercial.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "self-billing": {
    "nome": "SAP Self-Billing Cockpit",
    "tipo": "Self-billing",
    "oQueFaz": "Cockpit de self-billing com customers/suppliers. Help: Self-Billing Cockpit.",
    "paraQueServe": "O customer fatura-se a si com base em entregas.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "service-tax-br": {
    "nome": "Service Taxation Enhancements for Brazil",
    "tipo": "Localização BR",
    "oQueFaz": "Melhorias de tributação de serviços no Brasil. Help: Service Taxation Enhancements for Brazil.",
    "paraQueServe": "Impostos de serviço BR no S/4.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "sso-classic": {
    "nome": "SAP Single Sign-On",
    "tipo": "SSO legado",
    "oQueFaz": "SSO clássico (Secure Login, Kerberos, X.509). Help: SAP Single Sign-On. Destino: IAS.",
    "paraQueServe": "SSO on-prem enquanto não há IAS.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Active em muitos DC.",
      "cloud": "Dimmed (IAS).",
      "rise": "Dimmed (IAS)."
    }
  },
  "social-media-int": {
    "nome": "Social Media Integration",
    "tipo": "Social",
    "oQueFaz": "Integrações sociais (China ESS, SuccessFactors Recruiting, LINE, SAC). Help lists várias linhas.",
    "paraQueServe": "Publicar e captar events sociais.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "ssc": {
    "nome": "SAP Solution Sales Configuration",
    "tipo": "CPQ on-prem/cloud",
    "oQueFaz": "Configurador de soluções. Help: Solution Sales Configuration cloud edition, for S/4HANA, for Commerce Cloud. Irmão do CPQ.",
    "paraQueServe": "Configurar bundles complexos no ERP ou na loja.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "slc": {
    "nome": "SAP Supplier Lifecycle Management",
    "tipo": "Fornecedores legado",
    "oQueFaz": "Ciclo de vida do supplier on-prem. Help: SLC. Destino: Ariba + Network + MDG.",
    "paraQueServe": "Qualificar suppliers no ECC/S/4 clássico.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Hérité.",
      "cloud": "Atténué.",
      "rise": "Atténué."
    }
  },
  "srm": {
    "nome": "SAP Supplier Relationship Management",
    "tipo": "SRM legado",
    "oQueFaz": "SRM clássico. Help: SRM Server e add-ons. Destino: Ariba.",
    "paraQueServe": "Compras no mundo Business Suite 7.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Hérité.",
      "cloud": "Masqué.",
      "rise": "Masqué."
    }
  },
  "tank-planning": {
    "nome": "Tank Planning Cockpit",
    "tipo": "Oil tank farm",
    "oQueFaz": "Planeamento de tanques. Help: Tank Planning Cockpit.",
    "paraQueServe": "Movimentar produto em parques de tanques.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "task-center": {
    "nome": "SAP Task Center",
    "tipo": "Inbox unificada",
    "oQueFaz": "Inbox única de aprovações S/4 + SuccessFactors + Build. Help: Task Center. Satélite de SAP Start / Work Zone.",
    "paraQueServe": "Uma fila de tarefas para o user.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "tax-declaration-br": {
    "nome": "SAP Tax Declaration Framework for Brazil",
    "tipo": "Fiscal BR",
    "oQueFaz": "Framework de declarações fiscais Brasil. Help: Tax Declaration Framework for Brazil e Tax Intelligence by All Tax.",
    "paraQueServe": "Obrigações acessórias BR.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "teamcenter-gw": {
    "nome": "Teamcenter gateway for PLM si",
    "tipo": "PLM conector",
    "oQueFaz": "Gateway Teamcenter by Siemens para PLM system integration. Help: Teamcenter by Siemens gateway.",
    "paraQueServe": "Ligar o PLM Siemens ao S/4.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "translation-hub": {
    "nome": "SAP Translation Hub",
    "tipo": "Tradução",
    "oQueFaz": "Serviço BTP de tradução. Help: Translation Hub.",
    "paraQueServe": "Traduzir textos de UI e master data.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "tlc": {
    "nome": "Transport Load Consolidation",
    "tipo": "Carga TM",
    "oQueFaz": "Consolidação de carga. Help: Transport Load Consolidation.",
    "paraQueServe": "Encher camiões / contentores no TM.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "print-forms": {
    "nome": "Print Forms Service",
    "tipo": "Formulários",
    "oQueFaz": "Serviço BTP de formulários de impressão. Help: Print Forms Service.",
    "paraQueServe": "Output de documentos without ADS on-prem.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "private-link": {
    "nome": "SAP Private Link Service",
    "tipo": "Rede privada",
    "oQueFaz": "Private Link no BTP para chegar a recursos no hyperscaler without Internet public. Help: Private Link Service. É a piece ⑪ do esquema Azure.",
    "paraQueServe": "BTP ↔ spoke RISE without sair à Internet.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "process-control": {
    "nome": "SAP Process Control",
    "tipo": "GRC controlos",
    "oQueFaz": "Controlos de process no GRC. Help: Process Control.",
    "paraQueServe": "Testar controlos SOX / internos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "celonis-mining": {
    "nome": "SAP Process Mining by Celonis",
    "tipo": "Process mining legado",
    "oQueFaz": "Process mining by Celonis no índice Help. Destino Signavio Process Intelligence.",
    "paraQueServe": "Minerar processes em landscapes que ainda têm a bundle Celonis.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    },
    "naoConfundir": "Is not o Signavio Process Intelligence (target actual)."
  },
  "plc": {
    "nome": "SAP Product Lifecycle Costing",
    "tipo": "Custo-alvo",
    "oQueFaz": "Custeio de ciclo de vida / target cost. Help: Product Lifecycle Costing e PCE.",
    "paraQueServe": "Custo-target na engenharia, antes do S/4 CO.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "plm-onprem": {
    "nome": "SAP Product Lifecycle Management",
    "tipo": "PLM clássico",
    "oQueFaz": "PLM on-prem / digital products. Help: Product Lifecycle Management. Destino cloud: IPD.",
    "paraQueServe": "Engenharia em landscapes clássicos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Active se já há PLM.",
      "cloud": "Dimmed (IPD).",
      "rise": "Optionnel."
    }
  },
  "promotion-mgmt": {
    "nome": "SAP Promotion Management for Retail",
    "tipo": "Promoções retalho",
    "oQueFaz": "Promoções de retalho. Help: Promotion Management for Retail e Omnichannel Promotion Pricing.",
    "paraQueServe": "Folhetos e preços promocionais na loja.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "quality-center": {
    "nome": "SAP Quality Center by Micro Focus",
    "tipo": "Testes legado",
    "oQueFaz": "Quality Center by Micro Focus. Help. Destino: Tricentis + Cloud ALM.",
    "paraQueServe": "Repositório de tests clássico.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "insurance-underwriting": {
    "nome": "SAP Quotation and Underwriting",
    "tipo": "Seguros",
    "oQueFaz": "Cotação e underwriting de seguros. Help: Quotation and Underwriting / Product Quotation and Underwriting Management / Underwriting for Insurance.",
    "paraQueServe": "Subscrever risks no core de seguros.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "r3": {
    "nome": "SAP R/3",
    "tipo": "ERP ancestral",
    "oQueFaz": "Ancestral do ECC. Help: SAP R/3. Só pedagógico / legacy extremo.",
    "paraQueServe": "Explicar de onde veio o ECC.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Legacy histórico.",
      "cloud": "Masqué.",
      "rise": "Masqué."
    }
  },
  "rabbitmq-btp": {
    "nome": "RabbitMQ on SAP BTP",
    "tipo": "Messaging",
    "oQueFaz": "RabbitMQ como serviço no BTP. Help: RabbitMQ on SAP BTP.",
    "paraQueServe": "Mensageria poliglota nas extensions.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Absent.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "redis-btp": {
    "nome": "Redis on SAP BTP",
    "tipo": "Cache",
    "oQueFaz": "Redis gerido no BTP. Help: Redis on SAP BTP.",
    "paraQueServe": "Cache e sessões das extensions.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Absent.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "rto": {
    "nome": "SAP Real-Time Offer Management",
    "tipo": "Ofertas tempo real",
    "oQueFaz": "Ofertas em tempo real. Help: Real-Time Offer Management.",
    "paraQueServe": "Next-best-offer no canal.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "recommerce": {
    "nome": "SAP Recommerce",
    "tipo": "2.ª mão",
    "oQueFaz": "Recommerce / segunda mão. Help: Recommerce.",
    "paraQueServe": "Devoluções que voltam à venda.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "regulation-mgmt": {
    "nome": "SAP Regulation Management by Greenlight",
    "tipo": "GRC regulação",
    "oQueFaz": "Regulação e mitigation AVM by Greenlight. Help: Regulation Management.",
    "paraQueServe": "Mapear regulações a controlos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "regulatory-change": {
    "nome": "Regulatory Change Manager",
    "tipo": "Regulação",
    "oQueFaz": "Gestor de mudança regulatória. Help: Regulatory Change Manager.",
    "paraQueServe": "Acompanhar mudanças de lei.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "rbsc": {
    "nome": "Repository Based Shipment Channel",
    "tipo": "Entrega software",
    "oQueFaz": "Canal de shipment baseado em repositório. Help: Repository Based Shipment Channel.",
    "paraQueServe": "Receber stacks SAP.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "retail-execution": {
    "nome": "SAP Retail Execution",
    "tipo": "Força de campo retalho",
    "oQueFaz": "Execução de retalho no campo (visitas, planograma). Help: Retail Execution e app móvel.",
    "paraQueServe": "Merchandisers na loja of the customer.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "rpm": {
    "nome": "SAP Returnable Packaging Management",
    "tipo": "Embalagens retornáveis",
    "oQueFaz": "Embalagens retornáveis / pallets. Help: Returnable Packaging Management.",
    "paraQueServe": "Contas de pallets com suppliers e customers.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "risk-mgmt": {
    "nome": "SAP Risk Management",
    "tipo": "Risco GRC",
    "oQueFaz": "Gestão de risk empresarial. Help: Risk Management.",
    "paraQueServe": "Registo de risks e KRI.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "rounds-manager": {
    "nome": "SAP Rounds Manager",
    "tipo": "Rounds legado",
    "oQueFaz": "Rounds de maintenance clássicos. Help: Rounds Manager. Destino: Service and Asset Manager.",
    "paraQueServe": "Rondas no active em landscapes antigos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "rural-sourcing": {
    "nome": "SAP Rural Sourcing Management",
    "tipo": "Agro sourcing",
    "oQueFaz": "Sourcing rural / originação agrícola. Help: Rural Sourcing Management.",
    "paraQueServe": "Comprar colheita a pequenos produtores.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "sales-insights-retail": {
    "nome": "SAP Sales Insights for Retail",
    "tipo": "Analytics retalho",
    "oQueFaz": "Insights de vendas de retalho. Help: Sales Insights for Retail.",
    "paraQueServe": "Sell-through e margem de loja.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "sop-classic": {
    "nome": "SAP Sales and Operations Planning",
    "tipo": "S&OP legado",
    "oQueFaz": "S&OP clássico. Help: Sales and Operations Planning. Destino: IBP.",
    "paraQueServe": "S&OP em ECC/APO.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Hérité.",
      "cloud": "Atténué.",
      "rise": "Atténué."
    }
  },
  "screen-personas": {
    "nome": "SAP Screen Personas",
    "tipo": "UX clássico",
    "oQueFaz": "Simplificar ecrãs SAP GUI. Help: Screen Personas.",
    "paraQueServe": "Dar uma cara aceitável ao GUI enquanto não há Fiori.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "secondary-distribution": {
    "nome": "SAP Secondary Distribution for Oil and Gas",
    "tipo": "Downstream oil",
    "oQueFaz": "Distribuição secundária oil & gas. Help: Secondary Distribution for Oil and Gas / S/4 Supply Chain for secondary distribution.",
    "paraQueServe": "Terminais e entregas a postos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "security-dd": {
    "nome": "Security Due Diligence Service",
    "tipo": "Security review",
    "oQueFaz": "Serviço de due diligence de segurança. Help: Security Due Diligence Service.",
    "paraQueServe": "Rever a postura de segurança do landscape.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "shop-floor-mgr": {
    "nome": "SAP Shop Floor Manager",
    "tipo": "MES clássico",
    "oQueFaz": "Gestor de shop floor clássico. Help: Shop Floor Manager. Destino: Digital Manufacturing.",
    "paraQueServe": "Execução de ordens em MES antigo.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "smart-business": {
    "nome": "SAP Smart Business",
    "tipo": "KPI Fiori",
    "oQueFaz": "KPI tiles Fiori clássicos. Help: Smart Business.",
    "paraQueServe": "Tiles de KPI no launchpad. Destino: SAC / Work Zone cards.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "slt-toolset": {
    "nome": "Software Logistics Toolset",
    "tipo": "SUM / SL",
    "oQueFaz": "Software Logistics Toolset (SUM, SPAM, etc.). Help: Software Logistics Toolset.",
    "paraQueServe": "Upgrades e patches on-prem.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "solution-hub": {
    "nome": "SAP Solution Hub",
    "tipo": "Catálogo soluções",
    "oQueFaz": "Hub de soluções. Help: Solution Hub.",
    "paraQueServe": "Descobrir soluções e pacotes.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "sourcing-clm": {
    "nome": "SAP Sourcing and CLM",
    "tipo": "Sourcing legado",
    "oQueFaz": "Sourcing e Contract Lifecycle Management clássicos. Help: Sourcing and SAP Contract Lifecycle Management. Destino: Ariba.",
    "paraQueServe": "RFx e contracts no mundo pré-Ariba cloud.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "sports-one": {
    "nome": "SAP Sports One",
    "tipo": "Desporto",
    "oQueFaz": "Suite para clubes e federações. Help: Sports One.",
    "paraQueServe": "Plantel, médicos, training desportiva.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "store-mgmt-gk": {
    "nome": "SAP Store Management by GK",
    "tipo": "Loja GK",
    "oQueFaz": "Gestão de loja by GK. Help: Store Management by GK.",
    "paraQueServe": "Backoffice da loja junto ao POS GK.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "strategy-mgmt": {
    "nome": "SAP Strategy Management",
    "tipo": "Estratégia",
    "oQueFaz": "Strategy Management (BSC). Help: Strategy Management.",
    "paraQueServe": "Mapas estratégicos e iniciativas.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "scm-classic": {
    "nome": "SAP Supply Chain Management",
    "tipo": "SCM suite legado",
    "oQueFaz": "Suite SCM clássica (APO, EWM antigo, TM antigo, SNC). Help: Supply Chain Management.",
    "paraQueServe": "Explicar o ancestor de IBP/EWM/TM.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "scpm": {
    "nome": "SAP Supply Chain Performance Management",
    "tipo": "KPI supply",
    "oQueFaz": "Performance da supply chain. Help: Supply Chain Performance Management.",
    "paraQueServe": "KPI de cadeia. Destino: SAC + IBP analytics.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "support-content": {
    "nome": "Support Content",
    "tipo": "Suporte",
    "oQueFaz": "Conteúdos de suporte no Help. Help: Support Content / Built-In Support.",
    "paraQueServe": "Artigos de suporte no produto.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "hana-supportability": {
    "nome": "Supportability Tools for SAP HANA",
    "tipo": "Ops HANA",
    "oQueFaz": "Ferramentas de supportability HANA. Help: Supportability Tools for SAP HANA.",
    "paraQueServe": "Diagnosticar HANA on-prem.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "tao": {
    "nome": "SAP Test Acceleration and Optimization",
    "tipo": "Testes legado",
    "oQueFaz": "TAO. Help: Test Acceleration and Optimization. Destino: Tricentis.",
    "paraQueServe": "Acelerar tests no SolMan.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "tdms": {
    "nome": "SAP Test Data Migration Server",
    "tipo": "Dados de teste",
    "oQueFaz": "TDMS. Help: Test Data Migration Server.",
    "paraQueServe": "Recortar e mascarar data de PRD para QA.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "toc": {
    "nome": "Theory of Constraints",
    "tipo": "Planning add-on",
    "oQueFaz": "Theory of Constraints no planning. Help: Theory of Constraints.",
    "paraQueServe": "Gargalos no planeamento.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "tpi": {
    "nome": "SAP Trading Platform Integration",
    "tipo": "Trésorerie",
    "oQueFaz": "Integração com platforms de trading. Help: Trading Platform Integration.",
    "paraQueServe": "Deals de treasury a entrar no TRM.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "transactional-banking": {
    "nome": "SAP Transactional Banking",
    "tipo": "Banking core",
    "oQueFaz": "Core transaccional bancário. Help: Transactional Banking for S/4HANA.",
    "paraQueServe": "Contas e payments no banco.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "trp": {
    "nome": "SAP Transportation Resource Planning",
    "tipo": "Recursos TM",
    "oQueFaz": "Planeamento de recursos de transporte. Help: Transportation Resource Planning.",
    "paraQueServe": "Tractores, reboques, tripulações.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "transportplaner": {
    "nome": "Transportplaner",
    "tipo": "Planning transportes",
    "oQueFaz": "Transportplaner no índice Help (planning táctico).",
    "paraQueServe": "Plano táctico de transportation.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "ui-masking": {
    "nome": "UI Data Protection Masking",
    "tipo": "Máscara UI",
    "oQueFaz": "Mascarar data sensíveis no UI. Help: UI Data Protection Masking.",
    "paraQueServe": "Esconder NIF/IBAN em ecrãs.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "upc": {
    "nome": "Unified Planning Center",
    "tipo": "Planning hub",
    "oQueFaz": "Centro unificado de planeamento. Help: Unified Planning Center.",
    "paraQueServe": "Hub de planos (SAC/IBP/PPM).",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "utilities-css": {
    "nome": "Utilities Customer Self-Service",
    "tipo": "Self-service utilities",
    "oQueFaz": "Self-service de customer utilities. Help: Utilities Customer Self-Service Agent / Multichannel Foundation.",
    "paraQueServe": "Portal of the customer de energia.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "work-manager": {
    "nome": "SAP Work Manager",
    "tipo": "Mobile legado",
    "oQueFaz": "Work Manager clássico. Help: Work Manager. Destino: Service and Asset Manager.",
    "paraQueServe": "Técnicos em landscapes Agentry.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "cproject": {
    "nome": "SAP cProject Suite",
    "tipo": "Projectos legado",
    "oQueFaz": "cProjects clássico. Help: cProject Suite. Destino: PPM / S/4 PS.",
    "paraQueServe": "Projectos em Business Suite 7.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "cpm": {
    "nome": "SAP Commercial Project Management",
    "tipo": "Projectos comerciais",
    "oQueFaz": "CPM — projects com customer ( timbiling, forecast). Help: Commercial Project Management.",
    "paraQueServe": "Professional services e project manufacturing.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "eis": {
    "nome": "SAP Enterprise Inventory and Service-Level Optimization",
    "tipo": "Inventário multi-escalão",
    "oQueFaz": "EIS — optimização de inventário e serviço. Help: Enterprise Inventory and Service-Level Optimization.",
    "paraQueServe": "Stock multi-escalão. Destino conceptual IBP inventory.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "enterprise-chatbot": {
    "nome": "SAP Enterprise Chatbot",
    "tipo": "Chatbot legado",
    "oQueFaz": "Chatbot empresarial clássico. Help: Enterprise Chatbot. Destino: Joule.",
    "paraQueServe": "FAQ e tickets antes do Joule.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "edm-digital": {
    "nome": "SAP Enterprise Digital Management",
    "tipo": "Digital ops",
    "oQueFaz": "Enterprise Digital Management no índice Help.",
    "paraQueServe": "Operar canais digitais.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "esm": {
    "nome": "SAP Enterprise Service Management",
    "tipo": "ESM",
    "oQueFaz": "Service management empresarial (also linha SuccessFactors ESM). Help: Enterprise Service Management.",
    "paraQueServe": "Serviços internos / shared services.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "big-data-services": {
    "nome": "SAP Big Data Services",
    "tipo": "Big data legado",
    "oQueFaz": "Serviços big data 2022 no Help. Destino: BDC / Datasphere / hyperscaler nativo.",
    "paraQueServe": "Lakes clássicos SAP.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "margin-assurance": {
    "nome": "Big Data Margin Assurance",
    "tipo": "Margem",
    "oQueFaz": "Asseguramento de margem com big data. Help: Big Data Margin Assurance.",
    "paraQueServe": "Detectar fugas de margem.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "forecast-opt-hana": {
    "nome": "Forecast Optimization on HANA",
    "tipo": "Forecast",
    "oQueFaz": "Optimização de forecast sobre HANA. Help: Forecast Optimization on HANA.",
    "paraQueServe": "Forecast estatístico clássico. Destino: IBP / Predictive Replenishment.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Optional / dimmed.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "business-suite": {
    "nome": "SAP Business Suite (cloud)",
    "tipo": "Suite comercial",
    "oQueFaz": "Nome comercial actual em sap.com/products.html: o portfolio cloud que junta Cloud ERP (applications), Business AI (Joule e agentes), Business Data Cloud e BTP. Is not a Business Suite 7 on-prem (ECC). A página oficial descreve-a como suite autónoma: finanças, spend, supply chain, HCM, CX e industry, com agentes Joule a executar sobre data e processes SAP.",
    "paraQueServe": "Ler o mapa como a SAP vende em 2026, não só como lists de SKUs. Mistura: Business Suite = s4hana cloud + LoB + bdc + joule + btp. RISE e GROW são as vias de contract para entrar nesta suite.",
    "exemploReal": "sap.com/products.html e sap.com/products/business-suite.html posicionam Business Suite como produto de destaque, alimentado por Business AI + BDC + applications, sobre BTP.",
    "nesteCenario": {
      "onprem": "Not applicable (a suite cloud). O ancestor on-prem é ECC / Business Suite 7.",
      "cloud": "Active como guarda-chuva comercial do GROW.",
      "rise": "Active como guarda-chuva comercial do RISE."
    },
    "naoConfundir": "NÃO é SAP Business Suite 7 / ECC. Esse ancestor é o card ecc."
  },
  "cloud-erp": {
    "nome": "SAP Cloud ERP",
    "tipo": "ERP Cloud (marca)",
    "oQueFaz": "Nome comercial em sap.com/products.html e /erp.html para o ERP na cloud. Na prática é o S/4HANA Cloud (Public Edition no GROW, Private Edition no RISE). A página fala de ERP ready-to-run com AI embutida em finanças, supply chain e procurement.",
    "paraQueServe": "Quando o customer ouve 'Cloud ERP' e não 'S/4'. Este card aponta para s4hana. Não duplica o digital core: é a etiqueta de marketing.",
    "exemploReal": "Featured product em sap.com/products.html com link para /products/erp/s4hana.html.",
    "nesteCenario": {
      "onprem": "Sans objet.",
      "cloud": "Actif. Sinónimo comercial do Public Edition.",
      "rise": "Actif. Sinónimo comercial do Private Edition / RISE Cloud ERP."
    },
    "naoConfundir": "Is not um terceiro ERP além do S/4 Cloud. É o mesmo engine com outro nome comercial."
  },
  "visual-enterprise": {
    "nome": "SAP 3D Visual Enterprise",
    "tipo": "PLM 3D",
    "oQueFaz": "Visualização 3D ligada a data de negócio. A-Z: SAP 3D Visual Enterprise. Irmão do Product Model Viewer.",
    "paraQueServe": "Ver o gémeo 3D no shop floor e no serviço.",
    "exemploReal": "sap.com/products/a-z.html entrada #.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "absence-wfs": {
    "nome": "SAP Absence and Leave Management by WorkForce Software",
    "tipo": "Ausências",
    "oQueFaz": "Pedidos de ausência by WorkForce Software. A-Z HCM.",
    "paraQueServe": "Férias e leaves when o WFS está no landscape (além do SF Time).",
    "exemploReal": "A-Z: Absence and Leave Management.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "access-control": {
    "nome": "SAP Access Control",
    "tipo": "GRC SoD",
    "oQueFaz": "SoD e provisioning on-prem. A-Z: Access Control. Família GRC; IAG é o irmão cloud.",
    "paraQueServe": "Aprovar access e detectar conflitos no ECC/S/4 on-prem.",
    "exemploReal": "A-Z Financial management / Access Control.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "avm-pathlock": {
    "nome": "SAP Access Violation Management by Pathlock",
    "tipo": "SoD parceiro",
    "oQueFaz": "SAP Access Violation Management by Pathlock (SoD parceiro) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Analisar violações SoD em landscapes hybrids.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "blackline-asa": {
    "nome": "SAP Account Substantiation and Automation by BlackLine",
    "tipo": "Fecho parceiro",
    "oQueFaz": "SAP Account Substantiation and Automation by BlackLine (Fecho parceiro) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Reconciliar contas no close, ao lado do Closing Cockpit.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "ase": {
    "nome": "SAP Adaptive Server Enterprise",
    "tipo": "DB OLTP",
    "oQueFaz": "SAP Adaptive Server Enterprise (DB OLTP) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "OLTP clássico que ainda corre em muitos customers.",
    "exemploReal": "A-Z: Adaptive Server Enterprise.",
    "nesteCenario": {
      "onprem": "Optional legacy.",
      "cloud": "Masqué.",
      "rise": "Masqué."
    }
  },
  "syniti-adm": {
    "nome": "SAP Advanced Data Migration by Syniti",
    "tipo": "Migração",
    "oQueFaz": "SAP Advanced Data Migration by Syniti (Migração) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Cargas brownfield / S/4 conversion.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "afc": {
    "nome": "SAP Advanced Financial Closing",
    "tipo": "Fecho cloud",
    "oQueFaz": "SAP Advanced Financial Closing (Fecho cloud) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Orquestrar o close no S/4 Cloud / RISE.",
    "exemploReal": "A-Z: Advanced Financial Closing.",
    "nesteCenario": {
      "onprem": "Dimmed (usar FCC).",
      "cloud": "Recommandé.",
      "rise": "Recommandé."
    }
  },
  "apo": {
    "nome": "SAP Advanced Planning and Optimization",
    "tipo": "APO legado",
    "oQueFaz": "SAP Advanced Planning and Optimization (APO legacy) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "SNP/DP/PP-DS em Business Suite 7.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Hérité.",
      "cloud": "Masqué.",
      "rise": "Atténué."
    }
  },
  "att-pharma": {
    "nome": "SAP Advanced Track and Trace for Pharmaceuticals",
    "tipo": "T&T pharma",
    "oQueFaz": "SAP Advanced Track and Trace for Pharmaceuticals (T&T pharma) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Serialização e compliance DSCSA/EU-FMD.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "agent-lm": {
    "nome": "SAP Agent Lifecycle Management",
    "tipo": "Agentes",
    "oQueFaz": "SAP Agent Lifecycle Management (Agentes) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Onboarding e compliance de agentes.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "agent-pm": {
    "nome": "SAP Agent Performance Management",
    "tipo": "Agentes",
    "oQueFaz": "SAP Agent Performance Management (Agentes) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Incentivos de canal.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "acm": {
    "nome": "SAP Agricultural Contract Management",
    "tipo": "Agro contratos",
    "oQueFaz": "SAP Agricultural Contract Management (Agro contracts) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Compra de colheita e posições.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "ai-agent-hub": {
    "nome": "SAP AI Agent Hub",
    "tipo": "Agentes IA",
    "oQueFaz": "Hub de agentes IA. A-Z: SAP AI Agent Hub. Sítio onde se publicam e governsm agentes Joule.",
    "paraQueServe": "Catálogo e governsnce de agentes no BTP.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Absent.",
      "cloud": "Recommended com Joule.",
      "rise": "Recommended com Joule."
    }
  },
  "aif": {
    "nome": "SAP Application Interface Framework",
    "tipo": "AIF",
    "oQueFaz": "SAP Application Interface Framework (AIF) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Monitorizar e mapear IDocs/proxies no ERP.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "opentext-archive": {
    "nome": "SAP Archiving and Document Access by OpenText",
    "tipo": "Arquivo",
    "oQueFaz": "SAP Archiving and Document Access by OpenText (Arquivo) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Arquivar documentos de negócio fora do HANA.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "asset-workbench": {
    "nome": "SAP Asset Information Workbench",
    "tipo": "Activos",
    "oQueFaz": "SAP Asset Information Workbench (Actives) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Dados técnicos do active para APM/EAM.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "audit-mgmt": {
    "nome": "SAP Audit Management",
    "tipo": "Auditoria GRC",
    "oQueFaz": "SAP Audit Management (Auditoria GRC) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Plano de auditoria e working papers.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "batch-release-ls": {
    "nome": "SAP Batch Release Hub for Life Sciences",
    "tipo": "Life sciences",
    "oQueFaz": "SAP Batch Release Hub for Life Sciences (Life sciences) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Batch release com data de quality e compliance.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "broker-reconciliation": {
    "nome": "SAP Broker Reconciliation for Commodity Derivatives",
    "tipo": "Commodities",
    "oQueFaz": "SAP Broker Reconciliation for Commodity Derivatives (Commodities) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Tesouraria de commodities.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "bas": {
    "nome": "SAP Business Application Studio",
    "tipo": "IDE cloud",
    "oQueFaz": "SAP Business Application Studio (IDE cloud) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Desenvolver CAP, Fiori, extensions clean core.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Absent.",
      "cloud": "Active com BTP.",
      "rise": "Active com BTP."
    }
  },
  "integrity-screening": {
    "nome": "SAP Business Integrity Screening",
    "tipo": "Fraude",
    "oQueFaz": "SAP Business Integrity Screening (Fraude) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Detectar payments e parceiros suspeitos.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "bn-asset": {
    "nome": "SAP Business Network Asset Collaboration",
    "tipo": "Rede activos",
    "oQueFaz": "SAP Business Network Asset Collaboration (Rede assets) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "OEM e operatedr partilham o gémeo do active.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "bn-commerce": {
    "nome": "SAP Business Network Commerce Automation",
    "tipo": "Rede compras",
    "oQueFaz": "SAP Business Network Commerce Automation (Rede procurement) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Transaccionar com suppliers na network.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "bn-freight": {
    "nome": "SAP Business Network Freight Collaboration",
    "tipo": "Rede freight",
    "oQueFaz": "SAP Business Network Freight Collaboration (Rede freight) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Tendering e tracking de freight.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "bn-gtt": {
    "nome": "SAP Business Network Global Track and Trace",
    "tipo": "GTT",
    "oQueFaz": "SAP Business Network Global Track and Trace (GTT) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Visibilidade multi-modal da encomenda.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "bn-traceability": {
    "nome": "SAP Business Network Material Traceability",
    "tipo": "Rastreio material",
    "oQueFaz": "SAP Business Network Material Traceability (Rastreio material) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Origem do lote ao longo da network.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "bn-planning": {
    "nome": "SAP Business Network Planning Collaboration",
    "tipo": "Rede planning",
    "oQueFaz": "SAP Business Network Planning Collaboration (Rede planning) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Partilhar previsões IBP com suppliers.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "bn-scc": {
    "nome": "SAP Business Network Supply Chain Collaboration",
    "tipo": "SCC",
    "oQueFaz": "SAP Business Network Supply Chain Collaboration (SCC) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Forecast, inventory e ordens com o supplier.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "vistex-channel": {
    "nome": "SAP Channel Program Management by Vistex",
    "tipo": "Canal Vistex",
    "oQueFaz": "SAP Channel Program Management by Vistex (Canal Vistex) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Incentivos e programas a revendedores.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "mirakl": {
    "nome": "SAP Commerce Marketplace Management by Mirakl",
    "tipo": "Marketplace",
    "oQueFaz": "SAP Commerce Marketplace Management by Mirakl (Marketplace) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Multi-seller na loja.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "commodity-mgmt": {
    "nome": "SAP Commodity Management",
    "tipo": "Commodities",
    "oQueFaz": "SAP Commodity Management (Commodities) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Contratos e risk de commodities.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "complaint-handling": {
    "nome": "SAP Complaint Handling",
    "tipo": "Reclamações",
    "oQueFaz": "SAP Complaint Handling (Reclamações) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Reclamações de quality / customer.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "opentext-cms": {
    "nome": "SAP Content Management Core by OpenText",
    "tipo": "ECM",
    "oQueFaz": "SAP Content Management Core by OpenText (ECM) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Repositório ECM junto ao S/4.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "skillsoft": {
    "nome": "SAP Content Stream by Skillsoft",
    "tipo": "Learning content",
    "oQueFaz": "SAP Content Stream by Skillsoft (Learning content) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Catálogo de training.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "serialization": {
    "nome": "SAP Corporate Serialization",
    "tipo": "Serialização",
    "oQueFaz": "SAP Corporate Serialization (Serialização) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Números de série ponta-a-ponta.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "crystal": {
    "nome": "SAP Crystal Reports",
    "tipo": "Reporting",
    "oQueFaz": "SAP Crystal Reports (Reporting) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Reports pixel-perfect clássicos.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "car": {
    "nome": "SAP Customer Activity Repository",
    "tipo": "Retalho CAR",
    "oQueFaz": "SAP Customer Activity Repository (Retalho CAR) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "POS, stock e procura numa vista.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "cdp": {
    "nome": "SAP Customer Data Platform",
    "tipo": "CDP",
    "oQueFaz": "SAP Customer Data Platform (CDP) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Unificar events de customer para CX.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    },
    "naoConfundir": "Is not o Customer Data Cloud (esse é CIAM/Gigya)."
  },
  "dairy-msg": {
    "nome": "SAP Dairy Management by msg",
    "tipo": "Lacticínios",
    "oQueFaz": "SAP Dairy Management by msg (Lacticínios) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Recepção de leite e yield.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "vistex-data": {
    "nome": "SAP Data Maintenance by Vistex",
    "tipo": "Master data Vistex",
    "oQueFaz": "SAP Data Maintenance by Vistex (Master data Vistex) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Preços e masters Vistex.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "dqm-location": {
    "nome": "SAP Data Quality Management, location microservices",
    "tipo": "DQ moradas",
    "oQueFaz": "SAP Data Quality Management, location microservices (DQ moradas) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Validar moradas em apps BTP/S/4.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "opentext-dam": {
    "nome": "SAP Digital Asset Management Cloud by OpenText",
    "tipo": "DAM",
    "oQueFaz": "SAP Digital Asset Management Cloud by OpenText (DAM) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Actives digitais (imagens, vídeo) para CX/PLM.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "document-ai": {
    "nome": "SAP Document AI",
    "tipo": "IA documentos",
    "oQueFaz": "SAP Document AI (IA documentos) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Extrair invoices, encomendas e IDs com IA.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Recommandé.",
      "rise": "Recommandé."
    }
  },
  "opentext-presentment": {
    "nome": "SAP Document Presentment by OpenText",
    "tipo": "Presentment",
    "oQueFaz": "SAP Document Presentment by OpenText (Presentment) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Enviar invoices/extractos ao customer.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "e-mobility": {
    "nome": "SAP E-Mobility",
    "tipo": "Mobilidade eléctrica",
    "oQueFaz": "SAP E-Mobility (Mobilidade eléctrica) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Carregamento e frota eléctrica.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "ectr": {
    "nome": "SAP Engineering Control Center",
    "tipo": "ECTR",
    "oQueFaz": "SAP Engineering Control Center (ECTR) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Engenheiro grava o modelo no S/4/PLM.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "vistex-excise": {
    "nome": "SAP Excise Tax Management by Vistex",
    "tipo": "Imposto especial",
    "oQueFaz": "SAP Excise Tax Management by Vistex (Imposto especial) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Excise em bebidas, tabaco, combustível.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "opentext-xecm": {
    "nome": "SAP Extended ECM by OpenText",
    "tipo": "xECM",
    "oQueFaz": "SAP Extended ECM by OpenText (xECM) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "ECM alargado ligado a objectos SAP.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "vistex-price": {
    "nome": "SAP Extended Price Management by Vistex",
    "tipo": "Preço Vistex",
    "oQueFaz": "SAP Extended Price Management by Vistex (Preço Vistex) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Price lists complexas e channel price.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "vistex-grower": {
    "nome": "SAP Grower Management for Perishables by Vistex",
    "tipo": "Produtores",
    "oQueFaz": "SAP Grower Management for Perishables by Vistex (Produtores) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Contratos com agricultores.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "incentive-mgmt": {
    "nome": "SAP Incentive Management",
    "tipo": "Incentivos",
    "oQueFaz": "SAP Incentive Management (Incentivos) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Comissões de força de vendas.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "information-steward": {
    "nome": "SAP Information Steward",
    "tipo": "DQ clássico",
    "oQueFaz": "SAP Information Steward (DQ clássico) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Perfilar e validar quality de data on-prem.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "intelligent-agriculture": {
    "nome": "SAP Intelligent Agriculture",
    "tipo": "Agro",
    "oQueFaz": "SAP Intelligent Agriculture (Agro) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Talhões, safras e compliance agrícola.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "icsm": {
    "nome": "SAP Intelligent Clinical Supply Management",
    "tipo": "Ensaios clínicos",
    "oQueFaz": "SAP Intelligent Clinical Supply Management (Ensaios clínicos) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Kits clínicos e blinding.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "blackline-ic": {
    "nome": "SAP Intercompany Governance by BlackLine",
    "tipo": "Intercompany",
    "oQueFaz": "SAP Intercompany Governance by BlackLine (Intercompany) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Reconciliar IC no group.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "iq": {
    "nome": "SAP IQ",
    "tipo": "Colunar clássico",
    "oQueFaz": "SAP IQ (Colunar clássico) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "DWH clássico SAP Sybase.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Hérité.",
      "cloud": "Atténué.",
      "rise": "Atténué."
    }
  },
  "joule-studio": {
    "nome": "SAP Joule Studio",
    "tipo": "Studio agentes",
    "oQueFaz": "Studio para criar skills e agentes Joule. A-Z e o post Alok. Esquema SCH-JOULE-STUDIO.",
    "paraQueServe": "Estender o Joule without mexer no core.",
    "exemploReal": "A-Z: Joule Studio.",
    "nesteCenario": {
      "onprem": "Absent.",
      "cloud": "Recommended com Joule.",
      "rise": "Recommandé."
    }
  },
  "joule-consultants": {
    "nome": "SAP Joule for Consultants",
    "tipo": "IA consultores",
    "oQueFaz": "SAP Joule for Consultants (IA consultores) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Acelerar projects Activate / RISE.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "joule-developers": {
    "nome": "Joule for developers",
    "tipo": "IA dev",
    "oQueFaz": "Joule for developers (IA dev) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Gerar e explicar código nas extensions.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "knowledge-central": {
    "nome": "SAP Knowledge Central by NICE",
    "tipo": "Knowledge CX",
    "oQueFaz": "SAP Knowledge Central by NICE (Knowledge CX) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Base de conhecimento no service desk.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "knowledge-graph": {
    "nome": "SAP Knowledge Graph",
    "tipo": "Grafo",
    "oQueFaz": "SAP Knowledge Graph (Grafo) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Relações semânticas para grounding do Joule.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "slt": {
    "nome": "SAP Landscape Transformation Replication Server",
    "tipo": "SLT",
    "oQueFaz": "SAP Landscape Transformation Replication Server (SLT) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Replicar ECC/S/4 para HANA, BW, CFIN, BTC.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    },
    "naoConfundir": "Is not o Sybase Replication Server (card replication-server)."
  },
  "lt": {
    "nome": "SAP Landscape Transformation",
    "tipo": "Conversão landscape",
    "oQueFaz": "SAP Landscape Transformation (Conversão landscape) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "M&A e carve-out de customers SAP.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "learning-hub": {
    "nome": "SAP Learning Hub",
    "tipo": "Formação",
    "oQueFaz": "SAP Learning Hub (Formação) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Formação oficial SAP para o project.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "linear-asset": {
    "nome": "SAP Linear Asset Management",
    "tipo": "Activos lineares",
    "oQueFaz": "SAP Linear Asset Management (Actives lineares) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "EAM de infra-estruturas lineares.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "market-rates": {
    "nome": "SAP Market Rates Management",
    "tipo": "Trésorerie",
    "oQueFaz": "SAP Market Rates Management (Tesouraria) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Câmbios e curvas para TRM.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "meat-msg": {
    "nome": "SAP Meat and Fish Management by msg",
    "tipo": "Carne e peixe",
    "oQueFaz": "SAP Meat and Fish Management by msg (Carne e peixe) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Desossa, yield e catch weight.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "osta": {
    "nome": "SAP Omnichannel Sales Transfer and Audit",
    "tipo": "Retalho audit",
    "oQueFaz": "SAP Omnichannel Sales Transfer and Audit (Retalho audit) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Fechar o dia da loja contra o CAR/S/4.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "vistex-paybacks": {
    "nome": "SAP Paybacks and Chargebacks by Vistex",
    "tipo": "Chargebacks",
    "oQueFaz": "SAP Paybacks and Chargebacks by Vistex (Chargebacks) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Liquidar programas de canal.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "postgres-btp": {
    "nome": "PostgreSQL on SAP BTP",
    "tipo": "DB BTP",
    "oQueFaz": "PostgreSQL on SAP BTP (DB BTP) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "BD relacional das extensions CAP.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Absent.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "vistex-price-hub": {
    "nome": "SAP Price Staging Hub by Vistex",
    "tipo": "Preço",
    "oQueFaz": "SAP Price Staging Hub by Vistex (Preço) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Staging de preços antes do S/4.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "prm": {
    "nome": "SAP Project and Resource Management",
    "tipo": "Projectos cloud",
    "oQueFaz": "SAP Project and Resource Management (Projectos cloud) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Staffing e projects without o PPM on-prem.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "digitalroute-rdo": {
    "nome": "SAP Revenue Data Orchestration by DigitalRoute",
    "tipo": "Uso / receita",
    "oQueFaz": "SAP Revenue Data Orchestration by DigitalRoute (Uso / receita) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Mediar events de uso até à invoice.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "vistex-rights": {
    "nome": "SAP Rights and Royalty Management by Vistex",
    "tipo": "Royalties",
    "oQueFaz": "SAP Rights and Royalty Management by Vistex (Royalties) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Media, pharma e IP royalties.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "risk-assurance": {
    "nome": "SAP Risk and Assurance Management",
    "tipo": "GRC cloud",
    "oQueFaz": "SAP Risk and Assurance Management (GRC cloud) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Riscos e assurance no S/4 Cloud.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Atténué.",
      "cloud": "Recommended vs GRC on-prem.",
      "rise": "Recommandé."
    }
  },
  "secure-login": {
    "nome": "SAP Secure Login Service for SAP GUI",
    "tipo": "SSO GUI",
    "oQueFaz": "SAP Secure Login Service for SAP GUI (SSO GUI) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "SSO moderno no GUI em RISE.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "smartrecruiters": {
    "nome": "SmartRecruiters for SAP SuccessFactors",
    "tipo": "Recruiting",
    "oQueFaz": "SmartRecruiters for SAP SuccessFactors (Recruiting) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Recruiting moderno ligado ao SF.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "spend-analytics": {
    "nome": "SAP Spend Analytics",
    "tipo": "Analytics spend",
    "oQueFaz": "SAP Spend Analytics (Analytics spend) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Ver o gasto além do Ariba reporting.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "student-lm": {
    "nome": "SAP Student Lifecycle Management",
    "tipo": "Ensino",
    "oQueFaz": "SAP Student Lifecycle Management (Ensino) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Universidades: matrícula a diploma.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "territory-quota": {
    "nome": "SAP Territory and Quota",
    "tipo": "Territórios",
    "oQueFaz": "SAP Territory and Quota (Territórios) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Desenhar territórios no Sales Cloud.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "time-attendance": {
    "nome": "SAP Time and Attendance Management by WorkForce Software",
    "tipo": "Ponto",
    "oQueFaz": "SAP Time and Attendance Management by WorkForce Software (Ponto) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Relógio de ponto e turnos.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "twm": {
    "nome": "SAP Total Workforce Management",
    "tipo": "Workforce total",
    "oQueFaz": "SAP Total Workforce Management (Workforce total) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Ler SF + Fieldglass como uma força de trabalho.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "us-benefits": {
    "nome": "SAP U.S. Benefits Administration by Benefitfocus",
    "tipo": "Benefícios US",
    "oQueFaz": "SAP U.S. Benefits Administration by Benefitfocus (Benefícios US) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Open enrollment US.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "ui-logging": {
    "nome": "UI data protection logging",
    "tipo": "Audit UI",
    "oQueFaz": "UI data protection logging (Audit UI) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Quem viu o IBAN.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "knoa": {
    "nome": "SAP User Experience Management by Knoa",
    "tipo": "UX analytics",
    "oQueFaz": "SAP User Experience Management by Knoa (UX analytics) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Medir fricção no GUI/Fiori.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "utilities-core": {
    "nome": "SAP Utilities Core foundation",
    "tipo": "IS-U core",
    "oQueFaz": "SAP Utilities Core foundation (IS-U core) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Core IS-U (contract, medição) além do Cloud for Energy.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "vc-pricing": {
    "nome": "SAP Variant Configuration and Pricing",
    "tipo": "VC / preço",
    "oQueFaz": "SAP Variant Configuration and Pricing (VC / preço) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Configurar produto + preço em runtime.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "vistex-vendor": {
    "nome": "SAP Vendor Program Management by Vistex",
    "tipo": "Programas fornecedor",
    "oQueFaz": "SAP Vendor Program Management by Vistex (Programas supplier) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Billbacks e programas lado compra.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  },
  "watch-list": {
    "nome": "SAP Watch List Screening",
    "tipo": "Screening",
    "oQueFaz": "SAP Watch List Screening (Screening) no portfolio SAP. Peça documentsda no índice comercial A-Z e no help.sap.com; neste mapa é um satellite de mix — não um engine autónomo do landscape.",
    "paraQueServe": "Filtrar parceiros contra listss oficiais.",
    "exemploReal": "Entrada no índice comercial A-Z from SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Optionnel.",
      "cloud": "Optionnel.",
      "rise": "Optionnel."
    }
  }
};
