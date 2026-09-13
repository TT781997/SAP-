import type { ServiceCopy } from "../../data/types";

export const services: Record<string, ServiceCopy> = {
  "aws": {
    "nome": "Amazon Web Services",
    "tipo": "IaaS",
    "oQueFaz": "Hyperscaler Amazon. Fornece compute, rede, storage, regiões e serviços de landing zone (Direct Connect, Transit Gateway, VPCs de inspeção). No RISE with SAP a VPC onde corre o S/4HANA Cloud Private Edition é gerida pela SAP sobre AWS; o cliente gere a sua própria landing zone e a interconexão com a org SAP. No GROW / Public Edition e no BTP, a AWS é uma das regiões onde a SAP publica serviços.",
    "paraQueServe": "Dar infraestrutura elástica ao digital core e à plataforma sem o cliente administrar as VMs do ERP no modelo RISE. Serve também de região para HANA Cloud, Integration Suite e extensões BTP. Mistura típica: ERP em AWS-RISE e data lakes nativos AWS na conta própria, ligados por Transit Gateway.",
    "exemploReal": "A AWS publica cookbooks oficiais “RISE with SAP on AWS” e “Enterprise-ready network foundation for RISE with SAP”: landing zone do cliente, Transit Gateway, attachment à VPC gerida pela SAP, VPN de recurso e Direct Connect.",
    "nesteCenario": {
      "onprem": "Não é o anfitrião do ERP. Pode existir como cloud satélite da empresa sem fazer parte do core SAP. Card atenuado.",
      "cloud": "Região possível para BTP, HANA Cloud e S/4HANA Cloud Public Edition. Activo se o selector estiver em AWS.",
      "rise": "Um dos três hyperscalers à escolha no contrato. A SAP gere a VPC do S/4; o cliente gere Direct Connect / Transit Gateway e o landing zone."
    }
  },
  "azure": {
    "nome": "Microsoft Azure",
    "tipo": "IaaS",
    "oQueFaz": "Hyperscaler Microsoft. Mesmo papel da AWS no modelo RISE/GROW: IaaS sob o S/4 gerido pela SAP e/ou sob o BTP. ExpressRoute é a interconexão típica. Entra ID federa-se com SAP Cloud Identity Services para SSO da suite inteira. Muitos clientes europeus já têm operação Microsoft; escolher Azure evita um segundo stack de identidade e rede.",
    "paraQueServe": "Anfitrião do RISE ou região BTP/Public Edition quando a empresa já vive em Microsoft 365 / Entra ID / ExpressRoute. A mistura forte é identidade: Entra ID → IAS → S/4 + SuccessFactors + BTP + Work Zone.",
    "exemploReal": "Padrão dominante em clientes europeus que federam Entra ID com SAP Cloud Identity Services e usam ExpressRoute para o VPC RISE. A documentação conjunta SAP/Microsoft descreve o peering entre a subscription do cliente e a subscription gerida pela SAP.",
    "nesteCenario": {
      "onprem": "Não é o anfitrião do ERP. Entra ID pode já ser o IdP corporativo mesmo no on-prem. Card atenuado como IaaS.",
      "cloud": "Região possível do GROW. Entra ID como IdP corporativo federado ao IAS.",
      "rise": "Hyperscaler por omissão nesta app (selector inicia em Azure). SAP gere o S/4 Private Edition; o cliente gere ExpressRoute e o IdP."
    }
  },
  "gcp": {
    "nome": "Google Cloud",
    "tipo": "IaaS",
    "oQueFaz": "Hyperscaler Google. No RISE a SAP gere uma “SAP organization” (projectos, VPC, Compute Engine, storage); o cliente gere a “customer organization” e a conectividade (Cloud Interconnect, VPC partilhada) a partir da sua org GCP e do on-prem. O BTP e o Public Edition também publicam regiões GCP.",
    "paraQueServe": "Anfitrião RISE ou região BTP quando a empresa já tem gravidade de dados/analytics no Google Cloud. A mistura típica é RISE no GCP + serviços de dados na org do cliente, sem misturar as responsabilidades SAP vs cliente.",
    "exemploReal": "A documentação pública Google Cloud “Overview of RISE with SAP on Google Cloud” descreve o modelo SAP organization versus customer organization e os padrões on-prem → Interconnect → projecto RISE.",
    "nesteCenario": {
      "onprem": "Não é o anfitrião do ERP. Card atenuado.",
      "cloud": "Região possível para BTP e Public Edition.",
      "rise": "Terceiro hyperscaler à escolha. Trocar o selector para GCP só muda este card L0 e o texto dos tooltips."
    }
  },
  "dc-onprem": {
    "nome": "Data Center do Cliente",
    "tipo": "On-prem",
    "oQueFaz": "Infraestrutura gerida pelo cliente ou por um hoster clássico / colocation: compute, storage, rede, firewalls, backup. É onde correm ECC ou S/4 any-premise, HANA on-prem, NetWeaver, PI/PO, Solution Manager, MES/OT, sistemas regulamentares e satélites que a empresa ainda não quer ou não pode pôr na cloud pública.",
    "paraQueServe": "No preset on-prem é a fundação de tudo. No RISE passa a ser o residual: shop-floor, OT, dados que não saem, sistemas em phase-out. A mistura correcta no híbrido é DC residual + Cloud Connector + opcionalmente Edge Integration Cell.",
    "exemploReal": "H.B. Fuller, no percurso RISE para S/4HANA Cloud Private Edition, evitou um data center físico e estimou cerca de 200 mil dólares de poupança só nesse item, com instância global em 123 países e cerca de 1,5 milhões de dólares evitados em infra legada.",
    "nesteCenario": {
      "onprem": "Card fundação de L0. Todo o core assenta aqui.",
      "cloud": "Irrelevante como anfitrião do ERP Public Edition. Só faria sentido se o perfil indústria estiver activo (MES residual).",
      "rise": "Atenuado e residual. Sistemas sobreviventes ligam-se por Cloud Connector / EIC. Se o perfil soberania estiver activo, comparar com o card Customer Data Center."
    }
  },
  "cdc-option": {
    "nome": "RISE Customer Data Center (CDC)",
    "tipo": "IaaS soberano",
    "oQueFaz": "Opção do RISE / SAP Cloud ERP Private em que o S/4 Private Edition é operado com modelo cloud (contrato, SLA, operação SAP ou partner) mas o hardware vive num data center à escolha do cliente — incluindo HPE GreenLake e variantes soberanas. Não é on-prem clássico: o modelo operacional é cloud; a localidade dos dados é do cliente.",
    "paraQueServe": "Misturar os benefícios do RISE com requisitos de soberania, latência ou regulação que impedem hyperscaler público. Perfil Regulado / soberania.",
    "exemploReal": "A SAP documenta a SAP Cloud ERP Private, Customer Data Center Option. HPE GreenLake é uma das vias usadas desde o início do RISE para clientes que rejeitam AWS/Azure/GCP como âncora de produção.",
    "nesteCenario": {
      "onprem": "Irrelevante. On-prem clássico não é CDC.",
      "cloud": "Irrelevante. GROW Public Edition não tem opção CDC.",
      "rise": "Opcional. Activo e recomendado só com o perfil regulado."
    },
    "naoConfundir": "Não é o Data Center do Cliente clássico. Não é Public Edition. Não é SAP Sovereign Cloud / NS2 / EU AI Cloud."
  },
  "hana-onprem": {
    "nome": "SAP HANA (on-premise)",
    "tipo": "DB",
    "oQueFaz": "Base de dados in-memory instalada e operada no data center do cliente. Motor transaccional e analítico do S/4HANA any-premise e de BW/4HANA on-prem. O cliente é dono do sizing, HA/DR, patches, backups e encriptação. Sem HANA o S/4 on-prem não corre. A Help documenta também HANA Live, HANA express edition e SAP HANA Cloud Services como linha distinta, bem como SAP IQ, SAP ASE, SAP MaxDB, SAP SQL Anywhere e SAP on IBM Db2 / SQL Server como motores AnyDB do mundo ECC clássico.",
    "paraQueServe": "Processamento em tempo real no mesmo engine sob operação 100% interna. Mistura on-prem típica: HANA + S/4 any-premise + BW/4 + Solution Manager.",
    "exemploReal": "A Shell usou S/4HANA sobre HANA como digital core financeiro em tempo real (Central Finance) — padrão clássico on-prem ou hosted antes da onda RISE.",
    "nesteCenario": {
      "onprem": "Base de dados do core. Card activo.",
      "cloud": "Substituído por HANA Cloud e pelo HANA gerido do Public Edition.",
      "rise": "O HANA do S/4 Private Edition é operado pela SAP no hyperscaler e não aparece neste card. Este card só resta se BW ou sidecars continuarem no DC."
    }
  },
  "hana-cloud": {
    "nome": "SAP HANA Cloud",
    "tipo": "DBPaaS",
    "oQueFaz": "HANA como serviço gerido no BTP: motor relacional in-memory, data lake, multi-model (grafo, spatial, JSON). Persistência das extensões side-by-side (CAP, Build, ABAP Cloud) e de workloads analíticos que não devem viver em tabelas Z do S/4. Distinto do HANA que está dentro do S/4 Cloud — este card é o HANA que o cliente provisiona no BTP. Help: SAP HANA Cloud Services e SAP HANA Cloud in CN Regions.",
    "paraQueServe": "Materializar o clean core: a app nova grava no HANA Cloud, o S/4 fica standard. Também alimenta Datasphere, SAC e cenários near-real-time.",
    "exemploReal": "Ferrara Candy correu RISE S/4HANA Cloud Private Edition powered by BTP; as extensões e os padrões de integração em tempo real assentam em serviços de dados geridos do BTP e não em custom ABAP profundo no core.",
    "nesteCenario": {
      "onprem": "Ausente. O equivalente é HANA on-prem.",
      "cloud": "Activo. Persistência de extensões e analytics do GROW.",
      "rise": "Activo. Os créditos BTP do RISE cobrem o uso típico. Não confundir com o HANA gerido debaixo do S/4 Private Edition."
    }
  },
  "datasphere": {
    "nome": "SAP Datasphere",
    "tipo": "Data Fabric",
    "oQueFaz": "Camada semântica de dados de negócio. Sucessor directo do produto que se chamava SAP Data Warehouse Cloud (DWC / DwC-produto). Help: Datasphere e Datasphere, SAP BW Bridge. Une dados SAP e não-SAP com ou sem replicação, organiza-os em spaces, oferece Data Builder e Business Builder, e tem BW Bridge para reaproveitar modelos BW. É a peça de fabric dentro da Business Data Cloud.",
    "paraQueServe": "Ter um modelo governado para finanças, supply chain e RH sem copiar o ERP inteiro para um warehouse clássico. Fonte semântica para SAC e para data products que os agentes Joule consomem.",
    "exemploReal": "Arquitectura de referência SAP: Datasphere + SAC + BW/4 em modo híbrido. Clientes com investimento BW usam o BW Bridge para não deitar fora transformações e extractors.",
    "nesteCenario": {
      "onprem": "Atenuado. Pode consumir HANA/BW on-prem via DP Agent, mas não é o default do cenário clássico.",
      "cloud": "Activo. Data warehouse / fabric estratégico do Public Cloud.",
      "rise": "Activo. Peça da Business Data Cloud e da via analítica do landscape RISE."
    },
    "naoConfundir": "O acrónimo histórico DWC/DwC DESTE produto é Data Warehouse Cloud. NÃO é Deploy with Confidence (id dwc)."
  },
  "bdc": {
    "nome": "SAP Business Data Cloud",
    "tipo": "Data + AI",
    "oQueFaz": "Oferta que une Datasphere, SAP Analytics Cloud e a fundação de dados para Business AI / Joule. Publica data products curados (dados + metadados + semântica de processo SAP) para aplicações e agentes. É o context layer da Business AI Platform (BTP + Business Data Cloud + AI Foundation).",
    "paraQueServe": "Impedir que a IA empresarial trabalhe sem contexto de processo. Mistura: S/4 + LoB geram dados → BDC/Datasphere governa → Joule e apps inteligentes consomem.",
    "exemploReal": "Na SAP Sapphire 2026 a SAP posicionou Business Data Cloud + BTP + AI Foundation como tecto único da Business AI Platform. A H&M demonstrou um Store Intelligence Agent sobre RISE + Business Data Cloud + Commerce Cloud + SuccessFactors.",
    "nesteCenario": {
      "onprem": "Irrelevante no default on-prem clássico.",
      "cloud": "Activo quando o cliente adopta o stack dados+IA do GROW.",
      "rise": "Activo. Base de contexto para Joule e agentes no landscape RISE."
    }
  },
  "bw4": {
    "nome": "SAP BW/4HANA",
    "tipo": "Data Warehouse",
    "oQueFaz": "Data warehouse empresarial sobre HANA, sucessor do BW 7.x. Modelação LSA++, extractors SAP, process chains, queries. Continua vivo em milhares de clientes. Na cloud, o caminho estratégico é Datasphere + BW Bridge, não um BW eterno.",
    "paraQueServe": "Reporting de grupo, staging pesado, compliance de dados históricos. Mistura híbrida típica: BW/4 on-prem ou gerido + Datasphere na cloud + SAC por cima.",
    "exemploReal": "NEOM combinou S/4HANA + Ariba + BW/4HANA + SAC para acompanhar milhares de milhões em construção com reporting operacional quase em tempo real.",
    "nesteCenario": {
      "onprem": "Warehouse default se o cliente já é SAP analytics clássico. Activo.",
      "cloud": "Atenuado. Destino estratégico = Datasphere. BW Bridge é a ponte, não o fim.",
      "rise": "Opcional / atenuado. Muitos RISE mantêm BW/4 durante anos e vão despejando modelos para Datasphere."
    }
  },
  "businessobjects": {
    "nome": "SAP BusinessObjects",
    "tipo": "BI clássico",
    "oQueFaz": "Plataforma clássica de BI. Help: BusinessObjects Business Intelligence Platform, Dashboards, Design Studio, Explorer, Live Office, Crystal Server, Financial Information Management, Intercompany, Profitability and Cost Management, Predictive Workbench by IBM. Ainda serve milhões de reports em clientes ECC/S/4 on-prem. Destino estratégico de reporting novo é SAP Analytics Cloud.",
    "paraQueServe": "Manter o parque de WeBI/Crystal enquanto se constrói o alvo em SAC + Datasphere. Mistura honesta: BOBJ legado + SAC para o novo + BW/4 no meio.",
    "exemploReal": "A ŠKODA AUTO usou BusinessObjects para reporting executivo em tempo real — caso clássico do parque BOBJ ainda em produção em grupos industriais.",
    "nesteCenario": {
      "onprem": "Activo como BI clássico, sobretudo com toggle legado on.",
      "cloud": "Escondido / legado. Novo reporting nasce em SAC.",
      "rise": "Legado. Visível com o toggle. Plano típico: coexistência e phase-out para SAC."
    }
  },
  "papm": {
    "nome": "SAP PaPM",
    "tipo": "Rentabilidade",
    "oQueFaz": "Profitability and Performance Management. Help: SAP Profitability and Performance Management e SAP Profitability and Performance Management Cloud. Alocações, custos, rentabilidade de produto/cliente para além do CO clássico. Distinto do SAC Planning e do BPC.",
    "paraQueServe": "Onde o custo realmente cai. Mistura: S/4 CO produz → PaPM aloca → SAC apresenta.",
    "exemploReal": "All Products separa PaPM, PaPM Cloud, BPC, PCM (Profitability and Cost Management BOBJ) e SAC — quatro gerações da mesma pergunta de negócio.",
    "nesteCenario": {
      "onprem": "Opcional / activo em controlling avançado.",
      "cloud": "Opcional (PaPM Cloud).",
      "rise": "Opcional."
    }
  },
  "bpc": {
    "nome": "SAP BPC",
    "tipo": "Planning legado",
    "oQueFaz": "Business Planning and Consolidation. Planning e close clássicos sobre BW. Destino estratégico: SAC Planning + Group Reporting no S/4. Fica no mapa porque ainda é o motor de planeamento de muitos grupos.",
    "paraQueServe": "Budget e consolidação enquanto o alvo cloud não está vivo. Mistura de saída: BPC → SAC Planning + Group Reporting.",
    "exemploReal": "Entrada All Products: Business Planning and Consolidation. Coexiste com Analysis for Microsoft Office como cliente Excel clássico.",
    "nesteCenario": {
      "onprem": "Activo com toggle legado.",
      "cloud": "Escondido. Alvo = SAC.",
      "rise": "Legado. Visível com toggle."
    }
  },
  "analysis-office": {
    "nome": "SAP Analysis for Microsoft Office",
    "tipo": "BI Excel",
    "oQueFaz": "Add-in Excel/PowerPoint para queries BW, HANA e, em gerações recentes, SAC. Help: Analysis for Microsoft Office e Analytics Cloud add-in for Microsoft PowerPoint. É o sítio onde o controller continua a viver quando não abre o SAC.",
    "paraQueServe": "Análise tabular pesada. Mistura: BW/4 ou SAC como fonte → Analysis como cliente.",
    "exemploReal": "Produto autónomo no All Products, família Analytics, distinto do SAC web.",
    "nesteCenario": {
      "onprem": "Activo.",
      "cloud": "Opcional (add-in SAC).",
      "rise": "Opcional."
    }
  },
  "data-services": {
    "nome": "SAP Data Services",
    "tipo": "ETL",
    "oQueFaz": "Motor clássico de ETL/ELT e qualidade de dados da família EIM. Help: Data Services, Data Quality Management, Information Steward, Agile Data Preparation, Data Hub. Continua a alimentar BW, HANA e destinos não-SAP em landscapes on-prem. Destino estratégico de pipelines novos: Integration Suite + Datasphere / Data Intelligence residual.",
    "paraQueServe": "Extrair, limpar e carregar dados mestres e transaccionais. Mistura brownfield: Data Services + Information Steward a governar qualidade + BW/4 ou Datasphere como destino.",
    "exemploReal": "Parque EIM clássico da SAP: Data Services + Information Steward + Data Quality Management listados como produtos distintos no All Products.",
    "nesteCenario": {
      "onprem": "Activo com toggle legado / EIM clássico.",
      "cloud": "Atenuado. Pipelines novos nascem em Datasphere / Integration Suite.",
      "rise": "Legado. Visível com toggle. Plano típico: phase-out para Datasphere + Suite."
    }
  },
  "data-intelligence": {
    "nome": "SAP Data Intelligence",
    "tipo": "Data pipeline",
    "oQueFaz": "Orquestração de pipelines de dados e ML (sucessor conceptual do Data Hub). Help: Data Intelligence, Data Ingestion for Industry Cloud Solutions. Em muitos clientes foi a ponte entre o lago e o S/4 antes da Business Data Cloud. Destino estratégico: Datasphere + BDC + AI Foundation.",
    "paraQueServe": "Orquestrar fluxos complexos SAP/não-SAP e notebooks. Mistura de transição: Data Intelligence a correr ao lado de Datasphere até o pipeline ser reescrito.",
    "exemploReal": "Data Hub e Data Intelligence aparecem ambos no All Products; a SAP empurra workloads novos para Datasphere / BDC.",
    "nesteCenario": {
      "onprem": "Opcional / legado activo.",
      "cloud": "Atenuado. Alvo = Datasphere + BDC.",
      "rise": "Atenuado. Coexistência possível durante a transição."
    }
  },
  "ilm": {
    "nome": "SAP Information Lifecycle Management",
    "tipo": "Arquivo / retenção",
    "oQueFaz": "Retenção, bloqueio e destruição de dados pessoais e fiscais (GDPR / CNPD), arquivo de documentos. Help: Information Lifecycle Management, File Lifecycle Management, Archiving and Document Access by OpenText, Content Management Core by OpenText, Extended ECM by OpenText, Data Custodian. Complementa o S/4: o ERP gera o documento; o ILM decide quanto tempo vive.",
    "paraQueServe": "Não guardar para sempre o que a lei manda apagar. Mistura regulada: S/4 + ILM + OpenText + GRC.",
    "exemploReal": "Família ILM + OpenText no All Products é o padrão de arquivo SAP em grupos europeus auditados.",
    "nesteCenario": {
      "onprem": "Activo em landscapes regulados.",
      "cloud": "Opcional (retenção no Public Edition + serviços de arquivo).",
      "rise": "Opcional, recomendado com perfil regulado."
    }
  },
  "btp": {
    "nome": "SAP BTP",
    "tipo": "PaaS",
    "oQueFaz": "Business Technology Platform. Tecto único de integração, dados, extensibilidade, automação, identidade e IA. Sítio oficial do clean core: diferenciação sai do S/4 e nasce aqui (CAP, ABAP Cloud, Build, Kyma, Cloud Foundry). Comercialmente chega por créditos (RISE), subscription ou consumo. Não é um único serviço — é a plataforma que hospeda dezenas de services do Discovery Center.",
    "paraQueServe": "Misturar um core estável com inovação rápida. Regra de ouro: S/4 standard + BTP side-by-side + Integration Suite no meio. No on-prem clássico o BTP é uma ilha; no GROW/RISE é estruturante.",
    "exemploReal": "Ferrara Candy: RISE S/4 Private Edition powered by BTP, go-live big-bang em 25 módulos, mais de 98% de qualidade de master data. Southwest Gas: BTP + SuccessFactors LMS para validar certificações de técnicos de campo com QR no telemóvel.",
    "nesteCenario": {
      "onprem": "Atenuado. Pode existir como ilha de inovação sem ser o default do landscape.",
      "cloud": "Activo. Plataforma de extensões e integração do GROW. Sem BTP o Public Edition não se estende de forma upgrade-safe.",
      "rise": "Activo e estruturante. Clean core = custom code sai do S/4 para o BTP. Cloud ALM governa o ciclo de vida. Créditos BTP vêm no envelope RISE."
    }
  },
  "build": {
    "nome": "SAP Build",
    "tipo": "Dev + Low-code",
    "oQueFaz": "Família unificada de desenvolvimento no BTP. Help: Build, Build Code, Build Process Automation, Build Process Automation foundation add-on by UiPath, Build Work Zone standard edition, Business Application Studio, Business Application Factory, Application Frontend Service, AppGyver (linha histórica low-code).",
    "paraQueServe": "Fiori extra, portais, workflows de aprovação, microserviços e apps mobile sem user-exits nem Z-reports no S/4. Mistura com Signavio: o processo alvo nasce no Signavio; a automação que não cabe no standard nasce no Build Process Automation.",
    "exemploReal": "Hitachi High-Tech reportou 94% de redução no footprint de customização. Gerdau usou Build + Integration Suite + S/4 para onboarding 50% mais rápido.",
    "nesteCenario": {
      "onprem": "Atenuado / ausente no default.",
      "cloud": "Activo. Ferramenta de extensão do Public Edition.",
      "rise": "Activo. Destino preferencial do custom code que o Cloud ALM classifica fora do core."
    }
  },
  "workzone": {
    "nome": "SAP Build Work Zone",
    "tipo": "UX / Launchpad",
    "oQueFaz": "Digital workplace. Help distingue SAP Work Zone / SAP Build Work Zone advanced edition (workplace de TI) de SAP SuccessFactors Work Zone (experiência de colaborador RH). Este card é o Build Work Zone. Ponto de entrada único para Fiori do S/4, apps BTP, SuccessFactors, Ariba e apps de terceiros. Substitui conceptualmente o SAP Enterprise Portal.",
    "paraQueServe": "Um URL só para o utilizador final. Mistura UX: IAS autentica → Work Zone agrega → S/4 + LoB + extensões Build aparecem como tiles.",
    "exemploReal": "PwC unificou mais de 100 000 profissionais em 19 países sobre um core cloud SAP — padrão de entrada única que o Work Zone materializa.",
    "nesteCenario": {
      "onprem": "Atenuado. O equivalente clássico é Fiori Launchpad / Enterprise Portal no DC.",
      "cloud": "Activo. Shell UX do GROW.",
      "rise": "Activo. Ponto de entrada recomendado do landscape híbrido."
    }
  },
  "ias": {
    "nome": "SAP Cloud Identity Services",
    "tipo": "IdP / IAM",
    "oQueFaz": "Identity Authentication (IAS) + Identity Provisioning (IPS). SSO e ciclo de vida de utilizadores entre S/4 Cloud, BTP, SuccessFactors, Ariba, Concur, Fieldglass e o IdP corporativo (Entra ID, Okta). Help também lista SAP Single Sign-On clássico e Decentralized Identity Verification. Distinto de IAG (governação SoD) e de Customer Data Cloud (consumidor final).",
    "paraQueServe": "Um login corporativo para a suite e provisionamento automático de contas e roles. Mistura obrigatória em GROW e RISE.",
    "exemploReal": "Componente incluído no tenant RISE / S/4HANA Cloud. Quase todos os landscapes cloud federam o IdP corporativo (muito frequentemente Entra ID no Azure) ao IAS.",
    "nesteCenario": {
      "onprem": "Atenuado. Só entra se já existirem ilhas cloud.",
      "cloud": "Activo. IdP da suite Public Edition.",
      "rise": "Activo. Identidade do S/4 Private Edition + BTP + LoB."
    }
  },
  "abap-env": {
    "nome": "SAP BTP ABAP Environment",
    "tipo": "Runtime",
    "oQueFaz": "Steampunk. Help: BTP ABAP environment, ABAP Cloud, ABAP Development Tools for Eclipse, Landscape Portal for SAP S/4HANA Cloud ABAP environment. ABAP Cloud no BTP, sobre HANA Cloud. Permite reescrever ou nascer extensões ABAP fora do S/4, com released APIs, RAP e Fiori.",
    "paraQueServe": "Tirar código Z do core sem perder a competência ABAP. Mistura brownfield: ATC no S/4 classifica o custom code → diferenciação vai para ABAP Environment ou CAP → Cloud ALM acompanha o deploy BTP.",
    "exemploReal": "O modelo Clean Core da SAP usa o ABAP Environment como destino side-by-side de extensões RAP. Hitachi High-Tech (94% menos customização) é o padrão de resultado.",
    "nesteCenario": {
      "onprem": "Ausente. O ABAP vive no NetWeaver / S/4 any-premise.",
      "cloud": "Activo como runtime de extensão do Public Edition.",
      "rise": "Activo. Uma das três runtimes estratégicas do BTP no RISE."
    }
  },
  "runtimes-btp": {
    "nome": "Runtimes BTP (Cloud Foundry + Kyma)",
    "tipo": "Runtime",
    "oQueFaz": "Os dois runtimes poliglotas do BTP. Cloud Foundry para apps CAP, Node, Java, Python. Kyma para Kubernetes gerido. Help: Cloud Application Programming Model, Cloud SDK, Cloud Platform (nome histórico).",
    "paraQueServe": "Correr extensões que não são ABAP: conectores de chão de fábrica, APIs públicas, workers de eventos, frontends HTML5. Mistura indústria: Kyma + Event Mesh + Cloud Connector / EIC para telemetria OT sem tocar no S/4.",
    "exemploReal": "A documentação de desenvolvedores BTP recomenda CF para a maioria das extensões CAP e Kyma quando há necessidade de Kubernetes e workloads event-driven.",
    "nesteCenario": {
      "onprem": "Ausente.",
      "cloud": "Activo. CF é o default das extensões GROW.",
      "rise": "Activo. CF default; Kyma quando o perfil indústria ou o volume de microserviços o justificam."
    }
  },
  "ai-foundation": {
    "nome": "SAP AI Foundation",
    "tipo": "AI",
    "oQueFaz": "Camada de governação e runtime de IA no BTP. Help: AI Core, AI Launchpad, AI Business Services, Joule for Developers ABAP AI Capabilities, CX AI Toolkit, CXAI, Intelligent Situation Automation, Intelligent Technologies. Não é o copiloto (isso é Joule); é o chão de fábrica onde se constroem, publicam e governam agentes e extensões de IA.",
    "paraQueServe": "Misturar IA com processo sem shadow-IT de prompts. Joule é a face; AI Foundation é o motor e o governo. Cloud ALM observa agentes neste plano.",
    "exemploReal": "Sapphire 2026: Business AI Platform = BTP + Business Data Cloud + AI Foundation, com Knowledge Graph e Joule Studio 2.0. H&M usou esta fundação para o Store Intelligence Agent.",
    "nesteCenario": {
      "onprem": "Irrelevante no default.",
      "cloud": "Activo no stack IA do GROW.",
      "rise": "Activo. Base dos assistentes Joule contratualmente previstos no 1.º ano RISE."
    }
  },
  "iag": {
    "nome": "SAP Cloud Identity Access Governance",
    "tipo": "IAM / SoD cloud",
    "oQueFaz": "Governação de acessos na cloud: SoD, access requests, reviews. Help: Cloud Identity Access Governance. Complementa IAS (quem és) e GRC Access Control (parque on-prem). IAG é a via cloud-first de SoD sobre S/4 Cloud, BTP e LoB.",
    "paraQueServe": "SoD sem SolMan/GRC clássico. Mistura regulada: IAS autentica → IAG governa o acesso → GRC on-prem só no residual.",
    "exemploReal": "Entrada própria no All Products, família Identity, distinta de Cloud Identity Services.",
    "nesteCenario": {
      "onprem": "Atenuado (GRC Access Control).",
      "cloud": "Recomendado com perfil regulado.",
      "rise": "Recomendado com perfil regulado."
    }
  },
  "sap-start": {
    "nome": "SAP Start / Mobile Start",
    "tipo": "UX",
    "oQueFaz": "Ponto de entrada móvel / home da suite. Help: SAP Start, SAP Mobile Start e SAP Task Center. Mais leve que Work Zone advanced: cards, aprovações, Joule no telemóvel.",
    "paraQueServe": "Adopção móvel sem portal pesado. Mistura: IAS → Start/Mobile Start → Task Center → apps S/4 e LoB.",
    "exemploReal": "Três entradas All Products: SAP Start, Mobile Start, Task Center. Work Zone continua a ser o workplace completo.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Activo como companion móvel do GROW.",
      "rise": "Activo como companion móvel."
    }
  },
  "enterprise-portal": {
    "nome": "SAP Enterprise Portal (legado)",
    "tipo": "UX legado",
    "oQueFaz": "Portal NetWeaver clássico (iViews, KM, roles). Help: Enterprise Portal e NetWeaver Portal Enterprise Workspaces. Destino: Fiori Launchpad on-prem ou Build Work Zone.",
    "paraQueServe": "Explicar de onde vêm os portais SAP que o cliente ainda tem. Toggle legado.",
    "exemploReal": "Qualquer landscape ECC com Portal a servir de intranet SAP. A migração típica é Portal → Fiori Launchpad → Work Zone.",
    "nesteCenario": {
      "onprem": "Legado activo com o toggle.",
      "cloud": "Escondido.",
      "rise": "Escondido / legado."
    }
  },
  "lama": {
    "nome": "SAP Landscape Management",
    "tipo": "Ops de landscape",
    "oQueFaz": "Automatização de operações de sistemas SAP: copy, refresh, start/stop, mass operations. Help: SAP Landscape Management Cloud e SAP IT Infrastructure Management. Complementa Cloud ALM (que não faz system copy de um S/4 on-prem).",
    "paraQueServe": "Refresh de QA a partir de PRD, clones para projectos. Mistura on-prem / RISE dual: LaMa opera os sistemas que o cliente ainda controla; Cloud ALM opera o run cloud.",
    "exemploReal": "LaMa Cloud e LaMa on-prem listados no All Products. Service providers e centros de competência SAP usam LaMa para fazendas de sistemas.",
    "nesteCenario": {
      "onprem": "Opcional / activo em fazendas SAP grandes.",
      "cloud": "Irrelevante no GROW típico (a SAP opera o tenant).",
      "rise": "Opcional para sistemas residuais no DC do cliente."
    }
  },
  "cal": {
    "nome": "SAP Cloud Appliance Library",
    "tipo": "Laboratório",
    "oQueFaz": "Catálogo de appliances SAP pré-instaladas em hyperscaler para trial, POC e sandbox. Help: Cloud Appliance Library. Não é produção RISE; é o sítio onde se experimenta S/4, BTP e add-ons sem esperar por um projecto.",
    "paraQueServe": "Provas de conceito rápidas. Mistura pedagógica: CAL para experimentar → Signavio para decidir o to-be → RISE/GROW para produzir.",
    "exemploReal": "Entrada All Products. Equipas de pré-venda e academias SAP usam CAL como laboratório standard.",
    "nesteCenario": {
      "onprem": "Opcional como sandbox em cloud ao lado do DC.",
      "cloud": "Opcional para POC antes do contrato GROW.",
      "rise": "Opcional para sandbox fora do contrato de produção."
    }
  },
  "integration-suite": {
    "nome": "SAP Integration Suite",
    "tipo": "EiPaaS",
    "oQueFaz": "iPaaS no BTP, sucessor estratégico de PI/PO (manutenção standard de PI/PO até Dezembro de 2027). Capacidades: Cloud Integration (iFlows), API Management, Event Mesh, Integration Advisor, Open Connectors, Trading Partner Management, Integration Assessment, Migration Assessment. Help lista também API Business Hub / Business Accelerator Hub, Application Interface Framework e Managed Gateway for Spend como peça irmã. Edge Integration Cell é o runtime híbrido associado.",
    "paraQueServe": "A2A, B2B/EDI, B2G e eventos entre SAP e não-SAP. RISE inclui um baseline de mensagens; landscapes com muitos sistemas externos quase sempre precisam de capacidade extra.",
    "exemploReal": "Jabil usa Integration Suite + BTP como espinha dorsal global, com padrão API + eventos. Nu Skin reduziu criações de integração de semanas para dias. FC Bayern consolidou 52 sistemas.",
    "nesteCenario": {
      "onprem": "Atenuado. O middleware default é PI/PO; a Suite pode já existir como ilha de migração.",
      "cloud": "Activo. iPaaS do GROW / Public Edition.",
      "rise": "Activo. Baseline incluído no RISE. Cloud ALM monitoriza iFlows. Destino oficial da migração PI/PO."
    }
  },
  "event-mesh": {
    "nome": "SAP Event Mesh",
    "tipo": "EDA",
    "oQueFaz": "Broker de eventos no BTP. O S/4 publica business events. Consumidores no BTP, LoB ou terceiros subscrevem. Substitui o reflexo de RFC síncrono ponto-a-ponto. Para escala enterprise multi-região usa-se o card Advanced Event Mesh. Help também lista Event Stream Processor e Event Insight como linha histórica.",
    "paraQueServe": "Desacoplar o core. Mistura correcta em RISE/Public: S/4 publica o evento → Event Mesh → extensão Build/Kyma ou iFlow.",
    "exemploReal": "Padrão recomendado SAP para S/4HANA Cloud e RISE. Jabil descreve a mudança para arquitectura API + event-based como direcção oficial do landscape.",
    "nesteCenario": {
      "onprem": "Ausente no default (IDocs, RFC, PI).",
      "cloud": "Activo. Padrão de desacoplamento do Public Edition.",
      "rise": "Activo. Eventos de negócio do Private Edition consumidos por extensões BTP."
    }
  },
  "advanced-event-mesh": {
    "nome": "SAP Integration Suite, Advanced Event Mesh",
    "tipo": "EDA enterprise",
    "oQueFaz": "Event mesh de escala enterprise, documentado na Help como produto próprio. Multi-região, fan-out massivo, parceiros externos. Event Mesh cobre o padrão S/4 → BTP; Advanced Event Mesh cobre o backbone de eventos da empresa.",
    "paraQueServe": "Quando o volume ou a topologia rebenta o Event Mesh standard.",
    "exemploReal": "Linha distinta no All Products e no Discovery Center.",
    "nesteCenario": {
      "onprem": "Ausente.",
      "cloud": "Opcional.",
      "rise": "Opcional, recomendado com perfil indústria e EDA pesada."
    }
  },
  "eic": {
    "nome": "Edge Integration Cell",
    "tipo": "Runtime híbrido",
    "oQueFaz": "Runtime da Integration Suite que corre no landscape privado do cliente, em Kubernetes. O iFlow é desenhado e monitorizado na cloud; a execução e os dados ficam on-prem. Help também lista Edge Lifecycle Management.",
    "paraQueServe": "Mistura híbrida regulamentada ou de chão de fábrica: governo do iPaaS na cloud, payload dentro de casa. Complementa o Cloud Connector (o Connector é túnel; o EIC é runtime de integração completo).",
    "exemploReal": "Arquitectura de referência AWS/SAP para RISE: EIC em alta disponibilidade no landing zone do cliente.",
    "nesteCenario": {
      "onprem": "Ausente.",
      "cloud": "Raro. Só com perfil indústria/regulado.",
      "rise": "Opcional no default, recomendado com perfil indústria ou regulado."
    }
  },
  "cloud-connector": {
    "nome": "SAP Cloud Connector",
    "tipo": "Connectivity",
    "oQueFaz": "Túnel seguro outbound do data center do cliente para o BTP. Não abre inbound no firewall. Expõe de forma controlada RFC, OData e HTTP de sistemas on-prem a extensões BTP e iFlows. Help lista também Corporate Connectivity for Banking e Connector for Multi-Bank Connectivity como conectores de domínio.",
    "paraQueServe": "Qualquer mistura híbrida honesta. Sem Cloud Connector as extensões BTP não chegam ao ECC/S/4 residual nem ao MES.",
    "exemploReal": "Componente standard de todos os cookbooks RISE híbridos em AWS, Azure e GCP.",
    "nesteCenario": {
      "onprem": "Ausente no on-prem puro.",
      "cloud": "Opcional. Activo se restarem satélites on-prem.",
      "rise": "Activo na maioria dos RISE reais."
    }
  },
  "pipo": {
    "nome": "SAP PI/PO (legado)",
    "tipo": "Middleware on-prem",
    "oQueFaz": "Process Integration / Process Orchestration. Middleware A2A clássico no NetWeaver. Destino estratégico é a Integration Suite. Fim da manutenção standard: Dezembro de 2027.",
    "paraQueServe": "Manter o landscape on-prem a falar consigo próprio. Mistura RISE: workstream obrigatório de Migration Assessment PI/PO → Integration Suite.",
    "exemploReal": "A maior parte dos programas RISE inclui um workstream explícito PI/PO → Integration Suite.",
    "nesteCenario": {
      "onprem": "Middleware default. Card activo.",
      "cloud": "Escondido.",
      "rise": "Legado em phase-out. Visível atenuado com o toggle ou perfil brownfield."
    }
  },
  "managed-gateway": {
    "nome": "Managed Gateway (ex-Ariba CIG)",
    "tipo": "Gateway Spend",
    "oQueFaz": "Help: SAP Integration Suite, Managed Gateway for Spend Management and SAP Business Network (antes Ariba Cloud Integration Gateway). Conteúdo pré-construído S/4 ↔ Ariba / Business Network / Fieldglass.",
    "paraQueServe": "Não reinventar iFlows de PO, GR, factura, supplier. Mistura spend: S/4 + Ariba + Network passam por este gateway.",
    "exemploReal": "A Help ainda tem entrada Ariba Cloud Integration Gateway a apontar para o nome novo na Integration Suite.",
    "nesteCenario": {
      "onprem": "Atenuado (CIG clássico / add-ons SRM).",
      "cloud": "Activo com perfil spend.",
      "rise": "Activo com perfil spend."
    }
  },
  "multi-bank": {
    "nome": "SAP Multi-Bank Connectivity",
    "tipo": "Banca",
    "oQueFaz": "Rede multi-banco. Help: SAP Multi-Bank Connectivity e Connector for SAP Multi-Bank Connectivity. Liga o S/4 a dezenas de bancos sem um middleware por banco. Help ainda lista Bank Communication Management como ancestral on-prem.",
    "paraQueServe": "Pagamentos e cash management sem host-to-host artesanal. Mistura: S/4 Treasury / AP → Multi-Bank → bancos.",
    "exemploReal": "Produto autónomo no All Products; aparece nos scope items de S/4 Cloud Finance.",
    "nesteCenario": {
      "onprem": "Atenuado (BCM / host-to-host clássico).",
      "cloud": "Opcional, muito frequente em Finance cloud.",
      "rise": "Opcional, muito frequente em Finance do Private Edition."
    }
  },
  "snc": {
    "nome": "SAP Supply Network Collaboration",
    "tipo": "Colaboração fornecedor",
    "oQueFaz": "Colaboração clássica com fornecedores de produção (previsão, consignação, VMI). Help: Supply Network Collaboration e Information Collaboration Hub for Life Sciences. Na cloud o destino estratégico é Business Network for Supply Chain.",
    "paraQueServe": "Fornecedor de componentes vê a necessidade e confirma. Mistura indústria: S/4 / IBP planeia → SNC ou Business Network colabora → EWM recebe.",
    "exemploReal": "SNC é a linha clássica no All Products; Business Network for Supply Chain é o alvo cloud.",
    "nesteCenario": {
      "onprem": "Opcional / activo em indústria com VMI clássico.",
      "cloud": "Atenuado. Alvo = Business Network.",
      "rise": "Opcional. Coexistência ou migração para Network."
    }
  },
  "ecc": {
    "nome": "SAP ECC 6.0 (legado)",
    "tipo": "ERP legado",
    "oQueFaz": "SAP ERP Central Component, a Business Suite 7 sobre AnyDB ou HANA. Help ainda lista SAP R/3 como ancestral. Fim de manutenção mainstream alinhado com NetWeaver 7.5 / Business Suite 7 (2027 standard, 2030 extended). Ponto de partida da maioria dos RISE brownfield.",
    "paraQueServe": "Ainda é o motor de milhares de empresas. Mistura de saída: ECC + PI/PO + SolMan + HCM on-prem → RISE Private Edition + Integration Suite + Cloud ALM + SuccessFactors.",
    "exemploReal": "O padrão público da maior parte das histórias RISE (H.B. Fuller e existing SAP ERP customers) é exactamente este ponto de partida.",
    "nesteCenario": {
      "onprem": "Activo se o toggle legado estiver on ou se o landscape ainda não é S/4.",
      "cloud": "Escondido. GROW é greenfield Public Edition, não ECC na cloud.",
      "rise": "Legado de origem. Visível com toggle. O card destino é s4hana Private Edition."
    }
  },
  "s4-any": {
    "nome": "SAP S/4HANA (any-premise)",
    "tipo": "ERP on-prem",
    "oQueFaz": "S/4HANA instalado e operado pelo cliente ou por um hoster clássico, sobre HANA on-prem. Digital core funcional quase completo. TCO, upgrades, HA/DR e segurança a cargo da TI interna.",
    "paraQueServe": "Quem quer S/4 mas ainda não quer o contrato RISE/GROW. Mistura clássica: S/4 any-premise + HANA on-prem + PI/PO ou Suite + SolMan + Fiori on-prem.",
    "exemploReal": "A maioria dos clientes RISE publicados partiu de ECC ou deste any-premise.",
    "nesteCenario": {
      "onprem": "Motor da empresa quando o on-prem já é S/4. Card central de L4.",
      "cloud": "Escondido. Substituído por S/4HANA Cloud Public Edition.",
      "rise": "Atenuado durante a convivência dual. O sucessor no mesmo lugar visual é s4hana Private Edition."
    }
  },
  "s4hana": {
    "nome": "SAP S/4HANA Cloud",
    "tipo": "ERP Cloud",
    "oQueFaz": "Digital core na cloud. Help: SAP S/4HANA Cloud Private Edition e RISE with SAP Private Cloud Edition. O MESMO card representa duas edições, distinguíveis pelo preset: Public Edition (GROW) e Private Edition (RISE). Cobre finanças, logística, vendas, manufacturing, EWM/TM, projectos, serviço. Extensões in-app (key user) são limitadas; diferenciação vai para o BTP.",
    "paraQueServe": "Motor transaccional da empresa. Public Edition = velocidade e standard. Private Edition = preservar complexidade com operação SAP e caminho para clean core.",
    "exemploReal": "Alto (Governo do Canadá): S/4HANA Cloud Public Edition + SuccessFactors live em 6 meses. Ferrara Candy: RISE Private Edition, 25 módulos em big-bang. H.B. Fuller: Private Edition em 123 países.",
    "nesteCenario": {
      "onprem": "Escondido. O card activo de L4 é s4-any ou ecc.",
      "cloud": "Public Edition. Standard, upgrades SAP, Cloud ALM para Activate e operações.",
      "rise": "Private Edition no hyperscaler gerido pela SAP (ou CDC). Clean core medido no dashboard RISE Methodology do Cloud ALM."
    }
  },
  "fiori": {
    "nome": "SAP Fiori",
    "tipo": "UX",
    "oQueFaz": "Linguagem de experiência SAP: apps Fiori, SAPUI5, launchpad, design system. Help: SAP Fiori Apps Reference Library, SAPUI5, SAP Screen Personas, SAP Business Client, SAP GUI for Windows / Java.",
    "paraQueServe": "Tirar o utilizador do SAP GUI clássico. Mistura: Fiori nativo do S/4 + apps Build + tiles LoB no Work Zone, com IAS à porta.",
    "exemploReal": "Qualquer go-live S/4 Cloud citado neste mapa (Alto, Ferrara, H.B. Fuller) entrega o dia-a-dia em Fiori, não em SAP GUI.",
    "nesteCenario": {
      "onprem": "Activo como launchpad on-prem / Gateway.",
      "cloud": "Activo.",
      "rise": "Activo."
    }
  },
  "netweaver": {
    "nome": "SAP NetWeaver",
    "tipo": "PaaS on-prem",
    "oQueFaz": "Plataforma técnica clássica: ABAP Application Server, Java stack histórico, Kernel, Gateway, Web Dispatcher. Help: NetWeaver AS ABAP 7.4 for Suite version for HANA e linha 7.5. Debaixo de ECC, SolMan, PI/PO, Portal. Manutenção alinhada com Business Suite 7 / 2027.",
    "paraQueServe": "Explicar sobre que chão corre o mundo on-prem.",
    "exemploReal": "Todo o parque ECC e PI/PO corre sobre NetWeaver. A data de 2027 de PI/PO e SolMan é, em grande medida, a data de NetWeaver 7.5.",
    "nesteCenario": {
      "onprem": "Activo.",
      "cloud": "Escondido.",
      "rise": "Escondido / legado."
    }
  },
  "mdg": {
    "nome": "SAP Master Data Governance",
    "tipo": "Dados mestres",
    "oQueFaz": "Governação de master data (Business Partner, material, finanças). Help: Master Data Governance, MDG Cloud Edition, e extensões enterprise asset management / retail and fashion by Prometheus Group.",
    "paraQueServe": "Uma ficha de fornecedor, cliente ou artigo. Mistura: MDG no S/4 + Integration Suite a distribuir + Ariba/SuccessFactors a consumir o mesmo Business Partner.",
    "exemploReal": "Ferrara Candy reportou mais de 98% de qualidade de master/finance data no go-live RISE.",
    "nesteCenario": {
      "onprem": "Activo.",
      "cloud": "Activo.",
      "rise": "Activo."
    }
  },
  "group-reporting": {
    "nome": "SAP Group Reporting",
    "tipo": "Consolidação",
    "oQueFaz": "Consolidação no S/4. Help também lista Group Reporting Data Collection e Disclosure Management como satélites de fecho de grupo. Substitui em grande medida BPC consolidation / BCS / EC-CS.",
    "paraQueServe": "Contas do grupo. Mistura: S/4 sociedades → Group Reporting → Disclosure Management / SAC.",
    "exemploReal": "Scope item central de S/4 Finance. Data Collection é produto à parte no All Products para o input das entidades não-S/4.",
    "nesteCenario": {
      "onprem": "Activo em S/4 any-premise com grupo.",
      "cloud": "Activo no Public Edition Finance.",
      "rise": "Activo."
    }
  },
  "central-finance": {
    "nome": "SAP Central Finance",
    "tipo": "Finanças centrais",
    "oQueFaz": "S/4HANA usado como ledger financeiro central que replica documentos de vários ECC/S/4 satélite em tempo real. Help lista também Central Finance Master Data Replication e Transaction Replication by insightsoftware. Não substitui o ERP logístico das sociedades — concentra FI/CO.",
    "paraQueServe": "Grupos com muitos ECC que querem um fecho único sem big-bang de todas as sociedades. Mistura brownfield: ECC satélites → SLT / replication → Central Finance no RISE → Group Reporting.",
    "exemploReal": "A Shell usou S/4HANA / Central Finance como digital core financeiro em tempo real. Padrão clássico de transformação faseada.",
    "nesteCenario": {
      "onprem": "Opcional / activo em grupos multi-ECC.",
      "cloud": "Raro no Public Edition (modelo diferente).",
      "rise": "Recomendado com perfil brownfield de grupo com vários ERP."
    }
  },
  "treasury": {
    "nome": "SAP Treasury and Risk Management",
    "tipo": "Tesouraria",
    "oQueFaz": "Tesouraria, risco financeiro, instrumentos, liquidez. Help: Treasury and Risk Management (e extensões Impairment), Trading Platform Integration, Liquidity Risk Management, Market Rates Management, Treasury G-Invoicing, Payment Engine, SAP Pay, Digital Payments Add-On, Digital Currency Hub, Capital Yield Tax Management.",
    "paraQueServe": "Caixa, dívida, hedges. Mistura: S/4 Treasury + Multi-Bank + Trading Platform + SAC.",
    "exemploReal": "Família Treasury no All Products é distinta do FI-AP clássico. Multi-Bank Connectivity é o braço de conectividade.",
    "nesteCenario": {
      "onprem": "Activo em tesourarias maduras.",
      "cloud": "Opcional no Public Edition Finance.",
      "rise": "Opcional / activo em grupos com tesouraria central."
    }
  },
  "cash-application": {
    "nome": "SAP Cash Application",
    "tipo": "AI Finance",
    "oQueFaz": "Matching inteligente de extractos e pagamentos a facturas abertas. Help: Cash Application add-on for contract accounting. Peça de Autonomous Finance sobre o S/4.",
    "paraQueServe": "Reduzir o trabalho manual de compensação. Mistura: Multi-Bank traz o extracto → Cash Application propõe o match → S/4 FI confirma.",
    "exemploReal": "Posicionado pela SAP na família Autonomous Finance / Business AI sobre S/4.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional Finance.",
      "rise": "Opcional Finance."
    }
  },
  "rar": {
    "nome": "SAP Revenue Accounting and Reporting",
    "tipo": "Receita",
    "oQueFaz": "Reconhecimento de receita (IFRS 15 / ASC 606). Help: Revenue Accounting and Reporting 1.3. Complementa BRIM quando há obrigações de performance complexas.",
    "paraQueServe": "Contabilizar receita no ritmo certo. Mistura: S/4 SD ou BRIM facturam → RAR reconhece → Group Reporting consolida.",
    "exemploReal": "Produto autónomo no All Products, família Finance, distinto do billing SD.",
    "nesteCenario": {
      "onprem": "Opcional em grupos IFRS 15.",
      "cloud": "Opcional.",
      "rise": "Opcional com perfil regulado."
    }
  },
  "disclosure-management": {
    "nome": "SAP Disclosure Management",
    "tipo": "Relato",
    "oQueFaz": "Produção e workflow do relatório financeiro e de sustentabilidade a publicar. Help: Disclosure Management. Senta-se a jusante do Group Reporting e do Control Tower ESG.",
    "paraQueServe": "O PDF / iXBRL que vai para o mercado. Mistura: Group Reporting + Sustainability Control Tower → Disclosure Management.",
    "exemploReal": "Satélite oficial do fecho de grupo no All Products, ao lado de Group Reporting Data Collection.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional com perfil regulado."
    }
  },
  "ppm": {
    "nome": "SAP Portfolio and Project Management",
    "tipo": "Projectos",
    "oQueFaz": "Portefólio e projectos. Help: Portfolio and Project Management, Commercial Project Management, cProject Suite, Enterprise Project Connection, Unified Planning Center. No S/4 Cloud parte das capacidades vive em Enterprise Portfolio and Project Management embedded.",
    "paraQueServe": "Capex, engenharia, projectos de cliente. Mistura: PPM / CPM planeia → S/4 PS / Finance executa → SAC reporta.",
    "exemploReal": "H.B. Fuller e outros RISE industriais incluem projectos no perímetro. CPM é o irmão de projectos comerciais ( timbiling ).",
    "nesteCenario": {
      "onprem": "Opcional / activo em engenharia e capex.",
      "cloud": "Opcional (scope Public mais curto).",
      "rise": "Opcional com perfil indústria."
    }
  },
  "business-one": {
    "nome": "SAP Business One",
    "tipo": "ERP PME",
    "oQueFaz": "ERP para pequenas empresas, HANA ou MS SQL, on-prem ou hospedado por partners. Não é S/4. Não entra em RISE. Roadmap próprio.",
    "paraQueServe": "PME que não precisam de S/4. Mistura de grupo: sede em S/4 + filiais pequenas em Business One, ligadas por Integration Suite.",
    "exemploReal": "A SAP posiciona Business One como ERP de PME partner-led, distinto de GROW (que é S/4 Public Edition).",
    "nesteCenario": {
      "onprem": "Activo no universo PME.",
      "cloud": "Activo como linha PME paralela ao GROW.",
      "rise": "Irrelevante como core. Satélite possível de subsidiária."
    }
  },
  "bydesign": {
    "nome": "SAP Business ByDesign",
    "tipo": "ERP PME Cloud",
    "oQueFaz": "ERP SaaS para mid-market, mais profundo que Business One e mais pequeno que S/4 Public Edition. Help: Business ByDesign e Cloud Applications Studio (PDI).",
    "paraQueServe": "Mid-market que já está em ByDesign, ou grupos que usam ByDesign em subsidiárias.",
    "exemploReal": "ByDesign é a linha SaaS histórica de mid-market da SAP, anterior ao empurrão GROW.",
    "nesteCenario": {
      "onprem": "Irrelevante.",
      "cloud": "Opcional. Não é o default GROW.",
      "rise": "Irrelevante como core. Satélite possível."
    }
  },
  "successfactors": {
    "nome": "SAP SuccessFactors",
    "tipo": "SaaS HCM",
    "oQueFaz": "Suite de RH na cloud. Help documenta Employee Central, Recruiting / Applicant Management / Candidate Pipeline / E-Recruiting for S/4HANA, Career and Talent Development, Opportunity Marketplace, Work Zone de colaborador, Enterprise Service Management, Learning Solution, Performance & Goals, Compensation, Succession, 360 Reviews, Analytics, Time and Attendance / Absence by WorkForce Software, Deskless Worker Experience, U.S. Benefits Administration by Benefitfocus. Destino estratégico do HCM on-prem. Inclui SmartRecruiters no recruiting.",
    "paraQueServe": "Contratar, integrar, formar, avaliar, pagar e gerir talento. Mistura: Employee Central é o master da pessoa; o S/4 recebe custo, org e time; o IAS autentica; o Joule atende o colaborador; o Fieldglass cobre o trabalhador que não é funcionário.",
    "exemploReal": "Alto: RH live em 6 meses com S/4 Public. Darussalam Assets: menos 75% no tempo de recruitment. Gerdau: onboarding 50% mais rápido. Southwest Gas: LMS + BTP para compliance de campo via QR.",
    "nesteCenario": {
      "onprem": "Atenuado. O default clássico é SAP HCM no ECC/S/4.",
      "cloud": "Activo. HCM do GROW.",
      "rise": "Activo."
    }
  },
  "hcm-onprem": {
    "nome": "SAP HCM (on-premise)",
    "tipo": "HR on-prem",
    "oQueFaz": "Módulo clássico de RH no ECC / S/4 any-premise: PA, OM, Time, Payroll. Help: ERP HCM HR Support Package Versions, HR Renewal, Best Practices For HCM. Destino estratégico: SuccessFactors.",
    "paraQueServe": "Pagar salários e gerir tempo enquanto o talento já pode estar em SuccessFactors.",
    "exemploReal": "A coexistência HCM on-prem (payroll) + SuccessFactors (Employee Central / Talent) é um dos híbridos mais frequentes da Europa.",
    "nesteCenario": {
      "onprem": "Activo.",
      "cloud": "Escondido / legado.",
      "rise": "Atenuado. Folha residual on-prem é um padrão real de mistura RISE."
    }
  },
  "ariba": {
    "nome": "SAP Ariba",
    "tipo": "SaaS Procurement",
    "oQueFaz": "Suite source-to-pay na cloud. Help: Ariba, Buying, Invoicing, Intake Management, Category Management, Strategic Sourcing, Procurement, Mobile, Contract Price Renegotiation. Trabalha de par com o Business Network e com o MM do S/4. Help ainda lista SRM Server, SLC, Sourcing and CLM como ancestrais.",
    "paraQueServe": "Compras indirectas e colaboração com fornecedores. Mistura spend completa: Ariba + Business Network + Managed Gateway + S/4 MM + Concur + Fieldglass + Taulia + Spend Control Tower + VIM.",
    "exemploReal": "NEOM: Ariba no P2P, registo de fornecedores cerca de menos 80%. Ferrara: Ariba Business Network + GTS. Sonae Arauco: mais 25% de produtividade. SKF: procurement global com Ariba.",
    "nesteCenario": {
      "onprem": "Atenuado (MM clássico / SRM legado).",
      "cloud": "Activo, sobretudo com perfil spend.",
      "rise": "Activo."
    }
  },
  "business-network": {
    "nome": "SAP Business Network",
    "tipo": "Rede",
    "oQueFaz": "Rede multi-empresa. Help: Business Network, Business Network for Supply Chain, Asset Collaboration, Logistics Provider, Supply Chain Collaboration clinical trials add-on, project44 Add-Ons, Ariba Network.",
    "paraQueServe": "Sair do e-mail e do PDF. Mistura: S/4 ou Ariba publicam o documento → Business Network → o parceiro responde sem ter SAP.",
    "exemploReal": "O RISE inclui tipicamente um starter da Business Network. Ferrara usou a rede no onboarding de fornecedores e no compliance.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Activo com perfil spend.",
      "rise": "Activo. Starter costuma vir no envelope RISE."
    }
  },
  "concur": {
    "nome": "SAP Concur",
    "tipo": "SaaS T&E",
    "oQueFaz": "Travel, Expense e Invoice na cloud. Help: Concur, Concur Invoice, Concur Travel & Expense.",
    "paraQueServe": "Tirar o T&E do papel. Mistura spend: Concur para o colaborador que viaja, Ariba para o comprador, S/4 para o contabilista.",
    "exemploReal": "NEOM: despesas reembolsadas em dois dias em vez de três ou quatro meses. H.B. Fuller inclui Concur no envelope RISE descrito publicamente.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional no GROW base, recomendado com perfil spend.",
      "rise": "Opcional no envelope mínimo, muito frequente na mistura real."
    }
  },
  "fieldglass": {
    "nome": "SAP Fieldglass",
    "tipo": "SaaS VMS",
    "oQueFaz": "Vendor Management System para workforce externa: temporários, SOW, serviços. Não é SuccessFactors.",
    "paraQueServe": "Onboarding, timesheet, compliance e pagamento de externos.",
    "exemploReal": "Amdocs publicou um caso com SuccessFactors + Fieldglass + S/4HANA, com ganhos de compliance SOX.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional, recomendado com perfil workforce.",
      "rise": "Opcional, recomendado com perfil workforce."
    }
  },
  "taulia": {
    "nome": "SAP Taulia",
    "tipo": "Working capital",
    "oQueFaz": "Working capital e supply-chain finance: early payment, dynamic discounting. Help lista também SAP Supplier Financing. A SAP reportou mais de 980 mil milhões de dólares geridos por ano.",
    "paraQueServe": "Libertar caixa sem mudar o processo source-to-pay.",
    "exemploReal": "Número público SAP: Taulia gere mais de 980 mil milhões de dólares por ano.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional com perfil spend.",
      "rise": "Opcional com perfil spend."
    }
  },
  "spend-control-tower": {
    "nome": "SAP Spend Control Tower",
    "tipo": "Analytics Spend",
    "oQueFaz": "Torre de visibilidade de spend. Agrega Ariba, S/4 MM, Fieldglass, Concur. Não substitui o Ariba nem o SAC genérico.",
    "paraQueServe": "CFO / CPO a ver o gasto total.",
    "exemploReal": "Entrada autónoma no All Products, família Source-to-Pay.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional com perfil spend.",
      "rise": "Opcional com perfil spend."
    }
  },
  "vim": {
    "nome": "SAP Invoice Management by OpenText",
    "tipo": "AP Invoice",
    "oQueFaz": "Captura e workflow de facturas de fornecedor (VIM). Help: Invoice Management by OpenText, Information Capture by OpenText, Invoice and Goods Receipt Reconciliation. Na cloud o destino mistura-se com Ariba Invoice + S/4 Central Invoice Management.",
    "paraQueServe": "Tirar a factura de papel/PDF da contabilidade. Mistura spend on-prem: OCR OpenText → VIM → S/4 FI-AP.",
    "exemploReal": "VIM by OpenText é o standard de facto de AP invoice em grupos SAP europeus on-prem.",
    "nesteCenario": {
      "onprem": "Activo em AP clássico.",
      "cloud": "Atenuado. Alvo = Ariba Invoice / CIM.",
      "rise": "Opcional. Muitos RISE mantêm VIM no Private Edition."
    }
  },
  "signavio": {
    "nome": "SAP Signavio",
    "tipo": "Process Intelligence",
    "oQueFaz": "Suite de transformação de processos. Help: Process Transformation Suite, Process Manager, Process Modeler, Process Intelligence, Process Governance, Process Collaboration Hub, Journey Modeler, Process Transformation Manager. Família antiga: Business Process Intelligence e Process Mining by Celonis. Process Navigator traz best practices S/4. A implantação controlada do to-be é o sítio onde entra o card Deploy with Confidence.",
    "paraQueServe": "Fit-gap honesto. As-is minerado, to-be desenhado, gap transformado em requisitos do Cloud ALM.",
    "exemploReal": "Vodafone Procurement: 11 mil modelos migrados de ARIS; 284 milhões de cases em Process Intelligence; 82 reports Celonis migrados para SAC. Alto: Process Navigator reduziu documentação cerca de 30%.",
    "nesteCenario": {
      "onprem": "Activo como ferramenta de preparação.",
      "cloud": "Activo. Fit-to-standard do GROW.",
      "rise": "Activo. Toolchain de processo da metodologia RISE."
    }
  },
  "sac": {
    "nome": "SAP Analytics Cloud",
    "tipo": "Analytics + Planning",
    "oQueFaz": "BI, predictive e enterprise planning na cloud. Help lista também Analytics Hub e o add-in PowerPoint. Face analítica da Business Data Cloud. Destino estratégico do parque BusinessObjects.",
    "paraQueServe": "Closing comments, forecast, dashboards de direcção, planeamento integrado.",
    "exemploReal": "Vodafone migrou 82 reports para SAC. NEOM usou BW/4 + SAC. Shanxi Antai: BTP + SAC para gestão de carbono.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Activo.",
      "rise": "Activo."
    }
  },
  "joule": {
    "nome": "Joule + SAP Business AI",
    "tipo": "AI / Assistente",
    "oQueFaz": "Copiloto e agentes com contexto de processo SAP. Help: Joule e Joule for Developers ABAP AI Capabilities. CoPilot é o ancestral. Domínios: Autonomous Finance, Spend, SCM, HCM, CX. Joule Studio para construir agentes; AI Agent Hub para os governar.",
    "paraQueServe": "Perguntar o estado de uma PO, lançar uma acção em SuccessFactors, explicar um desvio em SAC.",
    "exemploReal": "H&M: Store Intelligence Agent sobre RISE + Business Data Cloud + Commerce Cloud + SuccessFactors. A SAP anunciou compromisso contratual de activar assistentes Joule no primeiro ano RISE.",
    "nesteCenario": {
      "onprem": "Irrelevante no default.",
      "cloud": "Activo.",
      "rise": "Activo."
    }
  },
  "ibp": {
    "nome": "SAP Integrated Business Planning",
    "tipo": "SaaS Planning",
    "oQueFaz": "Planeamento de supply chain na cloud: S&OP, demand, inventory, response & supply. Sucessor conceptual do APO. Help lista IBP Integration Enhancements, Advanced Planning and Optimization e Sales and Operations Planning.",
    "paraQueServe": "Alinhar vendas, operações e finanças num plano.",
    "exemploReal": "Ferrara incluiu IBP no landscape RISE publicado.",
    "nesteCenario": {
      "onprem": "Atenuado (APO legado / PP clássico).",
      "cloud": "Opcional. Recomendado com perfil indústria.",
      "rise": "Opcional. Recomendado com perfil indústria."
    }
  },
  "ewm": {
    "nome": "SAP EWM",
    "tipo": "Warehouse",
    "oQueFaz": "Extended Warehouse Management. Help: Digital Supply Chain Management edition for S/4HANA e S/4HANA Supply Chain. Não é o WM clássico do ECC.",
    "paraQueServe": "Operar armazéns complexos.",
    "exemploReal": "EWM embedded é peça standard dos go-lives industriais S/4 (Ferrara referiu EWM/MDG/GTS no big-bang).",
    "nesteCenario": {
      "onprem": "Activo quando o on-prem tem armazém avançado.",
      "cloud": "Opcional (scope Public mais curto).",
      "rise": "Opcional no envelope mínimo, frequente em perfil indústria."
    }
  },
  "tm": {
    "nome": "SAP Transportation Management",
    "tipo": "Transportes",
    "oQueFaz": "Planeamento e execução de transportes. Help: S/4HANA Supply Chain for transportation management e Transportation Resource Planning.",
    "paraQueServe": "Sair da folha de Excel do despachante.",
    "exemploReal": "Pacotes RISE de Digital Supply Chain posicionam TM ao lado de EWM e IBP.",
    "nesteCenario": {
      "onprem": "Activo em landscapes logísticos.",
      "cloud": "Opcional.",
      "rise": "Opcional, recomendado com perfil indústria."
    }
  },
  "digital-manufacturing": {
    "nome": "SAP Digital Manufacturing",
    "tipo": "MES Cloud",
    "oQueFaz": "MES na cloud. Help: Digital Manufacturing, Production Connector, Shop Floor Manager, Complex Assembly Manufacturing, Complex Manufacturing Accelerator.",
    "paraQueServe": "Chão de fábrica. Mistura híbrida clássica: S/4 Private Edition + DM + Cloud Connector / EIC + APM + EWM.",
    "exemploReal": "Pacotes RISE de Production da SAP assentam em Digital Manufacturing.",
    "nesteCenario": {
      "onprem": "Atenuado (MES legado / ME / MII).",
      "cloud": "Opcional com perfil indústria.",
      "rise": "Recomendado com perfil indústria."
    }
  },
  "apm": {
    "nome": "SAP Asset Performance Management",
    "tipo": "Asset SaaS",
    "oQueFaz": "Estratégia e performance de activos. Help: Asset Performance Management, Enterprise Asset Management, Enhanced Maintenance and Service Planning, Asset Manager.",
    "paraQueServe": "Passar de manutenção calendário a manutenção por condição.",
    "exemploReal": "Pacotes RISE de Asset Management combinam APM + Field Service + EAM do S/4.",
    "nesteCenario": {
      "onprem": "Atenuado (PM clássico).",
      "cloud": "Opcional com perfil indústria.",
      "rise": "Opcional com perfil indústria."
    }
  },
  "yard-logistics": {
    "nome": "SAP Yard Logistics",
    "tipo": "Yard",
    "oQueFaz": "Gestão do recinto: check-in de camiões, docas, movimentação no pátio. Senta-se entre TM e EWM.",
    "paraQueServe": "Cais e pátios pesados.",
    "exemploReal": "Produto autónomo no All Products, família Digital Supply Chain.",
    "nesteCenario": {
      "onprem": "Opcional em logística pesada.",
      "cloud": "Raro no Public Edition.",
      "rise": "Opcional com perfil indústria / logística."
    }
  },
  "warehouse-insights": {
    "nome": "SAP Warehouse Insights / Robotics",
    "tipo": "Warehouse add-on",
    "oQueFaz": "Help: Warehouse Insights, Warehouse Robotics, Warehouse Operator. Optimização e robótica em cima do EWM.",
    "paraQueServe": "OEE do armazém e frota robótica.",
    "exemploReal": "Três entradas distintas no All Products, à volta do EWM.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional com perfil indústria e armazém automatizado."
    }
  },
  "ipd": {
    "nome": "SAP Integrated Product Development",
    "tipo": "PLM Cloud",
    "oQueFaz": "PLM / engenharia na cloud. Help: IPD, PLM, Product Lifecycle Costing, PLM system integration para S/4 / ERP / 3DEXPERIENCE / Autodesk Vault / Windchill, Teamcenter by Siemens, 3D Visual Enterprise.",
    "paraQueServe": "Desenhar o produto e o custo-alvo antes da ordem de produção.",
    "exemploReal": "H.B. Fuller listou PLM no perímetro RISE.",
    "nesteCenario": {
      "onprem": "Atenuado (PLM on-prem clássico).",
      "cloud": "Opcional.",
      "rise": "Opcional com perfil indústria de produto."
    }
  },
  "gbt": {
    "nome": "SAP Global Batch Traceability",
    "tipo": "Rastreio",
    "oQueFaz": "Rastreio de lote ponta-a-ponta. Help: Global Batch Traceability e GBT on S/4HANA. Crítico em pharma, food, chemicals. Help também lista Advanced Track and Trace for Pharmaceuticals.",
    "paraQueServe": "Recall em minutos, não em semanas. Mistura regulada: S/4 lote → GBT → EHS / qualidade.",
    "exemploReal": "GBT e ATTP são produtos autónomos no All Products, família Life Sciences / qualidade.",
    "nesteCenario": {
      "onprem": "Opcional / activo em pharma e food.",
      "cloud": "Opcional.",
      "rise": "Opcional com perfil indústria / regulado."
    }
  },
  "event-management": {
    "nome": "SAP Event Management",
    "tipo": "Visibilidade logística",
    "oQueFaz": "Track-and-trace de eventos de cadeia (embarque, atraso, prova de entrega). Help: Event Management e Event Management on S/4HANA. Destino cloud mistura-se com Business Network e TM.",
    "paraQueServe": "Saber onde vai a mercadoria. Mistura: TM planeia → Event Management / Network vê o evento.",
    "exemploReal": "Produto clássico no All Products da família SCM.",
    "nesteCenario": {
      "onprem": "Opcional em logística.",
      "cloud": "Atenuado.",
      "rise": "Opcional."
    }
  },
  "fnr": {
    "nome": "SAP Forecasting and Replenishment",
    "tipo": "Reposição retalho",
    "oQueFaz": "Help: Forecasting and Replenishment for Retail e Predictive Replenishment. Reposição de loja e DC no retalho. Complementa IBP (que planeia a rede) no último quilómetro da gôndola.",
    "paraQueServe": "Não faltar leite na prateleira. Mistura retalho: IBP + F&R / Predictive Replenishment + EWM + Customer Checkout.",
    "exemploReal": "Duas entradas All Products na família Retail.",
    "nesteCenario": {
      "onprem": "Opcional em retalho.",
      "cloud": "Opcional.",
      "rise": "Opcional em retalho."
    }
  },
  "returns-management": {
    "nome": "SAP Intelligent Returns Management",
    "tipo": "Devoluções",
    "oQueFaz": "Devoluções inteligentes (omnichannel). Help: Intelligent Returns Management e Recommerce. Fecha o ciclo commerce / retalho.",
    "paraQueServe": "Reverse logistics. Mistura CX+supply: Commerce / Checkout → Returns → EWM → S/4 crédito.",
    "exemploReal": "Intelligent Returns e Recommerce listados no All Products.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional em commerce.",
      "rise": "Opcional em commerce."
    }
  },
  "commerce-cloud": {
    "nome": "SAP Commerce Cloud",
    "tipo": "SaaS CX",
    "oQueFaz": "Plataforma de commerce (ex-Hybris). Help: composable storefront e accelerators, Search Service, Open Payment Framework, localization for China, Marketplace Management by Mirakl.",
    "paraQueServe": "Canal digital. Mistura CX: Commerce + Emarsys + Sales Cloud + Service Cloud + Customer Data Cloud + S/4 + Joule.",
    "exemploReal": "H&M usou Commerce Cloud no demo Sapphire 2026 do InStore Concierge. Cintas publicou BTP + Commerce Cloud + Concur + CX + SuccessFactors.",
    "nesteCenario": {
      "onprem": "Atenuado (hybris on-prem legado).",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "sales-cloud": {
    "nome": "SAP Sales Cloud",
    "tipo": "SaaS CX",
    "oQueFaz": "CRM de vendas. Help documenta Sales Cloud Version 2 e o pacote Sales Cloud and Service Cloud Version 2. Ancestral: Hybris Cloud for Customer.",
    "paraQueServe": "O vendedor. Mistura: Sales Cloud ganha a oportunidade → CPQ configura → S/4 fatura → Service Cloud faz o pós-venda.",
    "exemploReal": "A suite SAP CX é o destino do antigo C/4HANA.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "service-cloud": {
    "nome": "SAP Service Cloud",
    "tipo": "SaaS CX",
    "oQueFaz": "CRM de serviço. Help: Service Cloud, Service Cloud Version 2, Self-Service Accelerator for Utilities by SEW.",
    "paraQueServe": "Pós-venda e assistência.",
    "exemploReal": "A SAP posiciona Service Cloud + FSM nos pacotes de Asset Management e Autonomous CX.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional, recomendado com perfil indústria."
    }
  },
  "emarsys": {
    "nome": "SAP Emarsys (Engagement Cloud)",
    "tipo": "SaaS CX",
    "oQueFaz": "Marketing automation. Help: Emarsys, Emarsys Account Engagement, Engagement Cloud. Marketing / Marketing Cloud é a linha anterior.",
    "paraQueServe": "Campanhas e personalização.",
    "exemploReal": "A SAP posiciona Emarsys como o pilar Marketing da suite CX no índice oficial.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "customer-data-cloud": {
    "nome": "SAP Customer Data Cloud",
    "tipo": "SaaS CX",
    "oQueFaz": "CIAM e perfil de consumidor. Distinto do IAS e do Business Data Cloud.",
    "paraQueServe": "Login da loja, consentimento GDPR/CNPD, perfil único.",
    "exemploReal": "Help agrupa Customer experience > Customer data como área própria da suite CX.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional se houver canal digital consumidor.",
      "rise": "Opcional se houver canal digital consumidor."
    },
    "naoConfundir": "Não é SAP Cloud Identity Services (IAS/IPS). Não é Business Data Cloud."
  },
  "cpq": {
    "nome": "SAP CPQ",
    "tipo": "SaaS CX",
    "oQueFaz": "Configure, Price and Quote. Help: CPQ e Solution Sales Configuration (cloud / S/4 / Commerce).",
    "paraQueServe": "Vendas configuráveis.",
    "exemploReal": "A Help lista CPQ e Solution Sales Configuration como produtos distintos do Sales Cloud.",
    "nesteCenario": {
      "onprem": "Atenuado (VC / SSC on-prem).",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "fsm": {
    "nome": "SAP Field Service Management",
    "tipo": "SaaS CX",
    "oQueFaz": "Despacho de técnicos de campo. Help: Field Service Management e Field Service and Asset Management.",
    "paraQueServe": "Assistência no activo. Mistura: APM ou S/4 EAM → FSM → Service and Asset Manager → S/4.",
    "exemploReal": "Coresystems foi absorvido para esta família. Pacotes RISE de Asset Management combinam FSM + APM + EAM.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional com perfil indústria."
    }
  },
  "service-asset-manager": {
    "nome": "SAP Service and Asset Manager",
    "tipo": "App móvel",
    "oQueFaz": "App móvel de manutenção e serviço. Substitui conceptualmente Work Manager, Inventory Manager, Rounds Manager e Maintenance Assistant.",
    "paraQueServe": "Mãos no activo.",
    "exemploReal": "Help ainda documenta Work Manager / Inventory Manager / Rounds Manager / Maintenance Assistant como linha clássica.",
    "nesteCenario": {
      "onprem": "Activo em manutenção de activos.",
      "cloud": "Opcional.",
      "rise": "Opcional com perfil indústria."
    }
  },
  "order-management": {
    "nome": "SAP Order Management",
    "tipo": "SaaS CX",
    "oQueFaz": "Help: Order Management Foundation, Order Management for Sourcing and Availability, Order and Delivery Scheduling.",
    "paraQueServe": "Orquestração omnichannel antes do S/4.",
    "exemploReal": "A Help separa Order Management de Commerce Cloud e de S/4 SD.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional em retalho omnichannel.",
      "rise": "Opcional em retalho omnichannel."
    }
  },
  "customer-checkout": {
    "nome": "SAP Customer Checkout",
    "tipo": "POS",
    "oQueFaz": "Ponto de venda. Help: Customer Checkout e edições cloud. Linha adjacente: Omnichannel POS by GK, Enterprise POS, Offline Mobile Store by GK, Store Management by GK, Dynamic Pricing by GK.",
    "paraQueServe": "Loja física.",
    "exemploReal": "Várias gerações de POS no All Products. Customer Checkout cloud é o alvo PME/retalho SAP-nativo.",
    "nesteCenario": {
      "onprem": "Opcional em retalho.",
      "cloud": "Opcional em retalho.",
      "rise": "Opcional em retalho."
    }
  },
  "entitlement-management": {
    "nome": "SAP Entitlement Management",
    "tipo": "SaaS CX",
    "oQueFaz": "Direitos do cliente sobre subscrições, licenças e uso.",
    "paraQueServe": "Software e serviços recorrentes. Mistura: S/4 ou BRIM fatura → Entitlement autoriza o uso.",
    "exemploReal": "Produto autónomo no All Products, ao lado da família CX e de BRIM.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional em subscription.",
      "rise": "Opcional em subscription."
    }
  },
  "sustainability": {
    "nome": "SAP Sustainability Control Tower",
    "tipo": "Sustentabilidade",
    "oQueFaz": "Torre de controlo ESG. Help: Control Tower, Sustainability Solutions, Sustainability Performance Management.",
    "paraQueServe": "Reporte CSRD / emissões ao nível do grupo.",
    "exemploReal": "Shanxi Antai publicou gestão de carbono ponta-a-ponta com BTP e SAC.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional com perfil regulado.",
      "rise": "Opcional com perfil regulado / indústria."
    }
  },
  "footprint-management": {
    "nome": "SAP Sustainability Footprint Management",
    "tipo": "Sustentabilidade",
    "oQueFaz": "Cálculo de pegada. Help: Footprint Management, Sustainability Data Exchange, Responsible Design and Production.",
    "paraQueServe": "Saber a pegada do artigo e partilhá-la.",
    "exemploReal": "Quatro entradas distintas no All Products sob Sustainability Solutions.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "green-ledger": {
    "nome": "SAP Green Ledger",
    "tipo": "Sustentabilidade",
    "oQueFaz": "Contabilidade de emissões no livro do S/4. Help: Green Ledger e Green Token.",
    "paraQueServe": "CSRD com rasto contabilístico.",
    "exemploReal": "SAC tem conteúdo Green Ledger Reporting for S/4HANA and S/4HANA Cloud.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "ehs": {
    "nome": "SAP EHS",
    "tipo": "Ambiente e segurança",
    "oQueFaz": "Environment, Health and Safety. Help: EHS Management, EHS Regulatory Content, Environmental Compliance, Management of Change.",
    "paraQueServe": "Segurança operacional e auditoria ambiental.",
    "exemploReal": "H.B. Fuller incluiu EHS Management no perímetro RISE publicado.",
    "nesteCenario": {
      "onprem": "Activo em indústrias reguladas.",
      "cloud": "Opcional.",
      "rise": "Opcional com perfil indústria / regulado."
    }
  },
  "grc": {
    "nome": "SAP GRC / Access Control",
    "tipo": "Risco e controlo",
    "oQueFaz": "Governance, Risk and Compliance. Help: GRC, Access Control, Process Control, Risk Management, GRC for HANA, Financial Compliance Management, Access Violation Management by Greenlight.",
    "paraQueServe": "Auditoria, SOX, SoD.",
    "exemploReal": "Ferrara referiu GRC no big-bang RISE. Amdocs publicou 100% SOX compliance.",
    "nesteCenario": {
      "onprem": "Activo em landscapes auditados.",
      "cloud": "Opcional com perfil regulado.",
      "rise": "Opcional com perfil regulado."
    }
  },
  "gts": {
    "nome": "SAP GTS (Global Trade)",
    "tipo": "Comércio externo",
    "oQueFaz": "Global Trade Services: sanctioned party, embargo, classificação aduaneira, declarações.",
    "paraQueServe": "Não vender ao destino errado e não falhar a alfândega.",
    "exemploReal": "Ferrara Candy: Ariba Business Network + GTS co-hosted para sanctioned parties.",
    "nesteCenario": {
      "onprem": "Activo em exportadores.",
      "cloud": "Opcional.",
      "rise": "Opcional com perfil regulado / spend internacional."
    }
  },
  "document-compliance": {
    "nome": "SAP Document and Reporting Compliance",
    "tipo": "Compliance fiscal",
    "oQueFaz": "Factura electrónica e reporte legal. Help: DRC Cloud Edition, Document Compliance, Digital Compliance India, Electronic Invoicing Brazil, Peppol guides, Tax Declaration Framework Brazil.",
    "paraQueServe": "e-invoice, SAF-T, Peppol. O card é a plataforma, não cada localização-país.",
    "exemploReal": "Família enorme no All Products porque cada país tem um conector.",
    "nesteCenario": {
      "onprem": "Activo em países com mandato de e-document.",
      "cloud": "Activo. Peça do GROW mínimo honesto.",
      "rise": "Activo."
    }
  },
  "brim": {
    "nome": "SAP BRIM",
    "tipo": "Billing de subscrição",
    "oQueFaz": "Billing and Revenue Innovation Management. Help: BRIM, Convergent Mediation by DigitalRoute, Contract Accounts Receivable and Payable.",
    "paraQueServe": "Monetizar uso e subscrição (telco, utilities, software).",
    "exemploReal": "All Products lista BRIM como família própria, distinta do SD billing clássico.",
    "nesteCenario": {
      "onprem": "Activo em telco/utilities/subscription on-prem.",
      "cloud": "Opcional.",
      "rise": "Opcional. Private Edition cabe BRIM pesado."
    }
  },
  "iot": {
    "nome": "SAP Internet of Things",
    "tipo": "IoT",
    "oQueFaz": "Camada IoT da SAP. Help: SAP Internet of Things (SAP IoT), Auto-ID Infrastructure. Alimenta APM, Digital Manufacturing e Event Mesh com telemetria. Muitos cenários novos passam por BTP Kyma + Event Mesh em vez do produto IoT clássico.",
    "paraQueServe": "Ligar sensores ao processo. Mistura indústria: IoT / Auto-ID → Event Mesh → APM ou DM → S/4.",
    "exemploReal": "IoT e Auto-ID Infrastructure listados no All Products. Auto-ID é a linha RFID clássica.",
    "nesteCenario": {
      "onprem": "Atenuado (Auto-ID / MII).",
      "cloud": "Opcional.",
      "rise": "Opcional com perfil indústria."
    }
  },
  "real-estate": {
    "nome": "SAP Cloud for Real Estate / RE-FX",
    "tipo": "Imobiliário",
    "oQueFaz": "Imobiliário. Help: Cloud for Real Estate, Real Estate Management e add-on Tenant Relationship Management.",
    "paraQueServe": "Contratos de arrendamento, espaço, IFRS 16. Mistura: RE-FX / Cloud for Real Estate + S/4 FI + SAC.",
    "exemploReal": "Duas gerações no All Products: RE-FX clássico e Cloud for Real Estate.",
    "nesteCenario": {
      "onprem": "Opcional (RE-FX).",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "industry-cloud": {
    "nome": "SAP Industry Cloud",
    "tipo": "Vertical",
    "oQueFaz": "Camada de soluções verticais. Help: Industry Cloud Enterprise Agreement, Industry Process Framework, SAP for Banking, Insurance, Healthcare, Utilities, Waste and Recycling, Intelligent Agriculture, Batch Release Hub for Life Sciences, Intelligent Clinical Supply Management, Sports One. Card-guarda-chuva. Cloud for Energy, Digital Vehicle e Fashion têm cards próprios porque mudam a mistura.",
    "paraQueServe": "Lembrar que S/4 + BTP não chega em utilities, auto, life sciences, agro.",
    "exemploReal": "All Products tem secções SAP for Banking, Insurance, Healthcare, Utilities, Waste and Recycling.",
    "nesteCenario": {
      "onprem": "Atenuado (IS-* clássicos).",
      "cloud": "Opcional vertical.",
      "rise": "Opcional vertical."
    }
  },
  "cloud-for-energy": {
    "nome": "SAP Cloud for Energy",
    "tipo": "Utilities",
    "oQueFaz": "Suite cloud de energia. Help: Cloud for Energy, Market Communication, Market Process Management, Energy Data Management, Energy Portfolio Management, Intelligent Metering DE, Pricing and Costing for Utilities, Multichannel Foundation for Utilities.",
    "paraQueServe": "Mercado, medição, comunicação de mercado.",
    "exemploReal": "Família Utilities no All Products. Clientes DE/AT usam Market Communication + EDM.",
    "nesteCenario": {
      "onprem": "Atenuado (IS-U).",
      "cloud": "Opcional vertical.",
      "rise": "Opcional vertical, recomendado em utilities."
    }
  },
  "digital-vehicle": {
    "nome": "SAP Digital Vehicle Hub / Suite",
    "tipo": "Automotive",
    "oQueFaz": "Help: Digital Vehicle Hub, Operations, Suite, E-Mobility. Gémeo digital e operações do veículo.",
    "paraQueServe": "OEM e frotas.",
    "exemploReal": "Três entradas All Products + E-Mobility.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional vertical.",
      "rise": "Opcional vertical auto."
    }
  },
  "fashion": {
    "nome": "SAP Fashion / Apparel and Footwear",
    "tipo": "Retail moda",
    "oQueFaz": "Help: Fashion Management, Apparel and Footwear, MDG retail and fashion extension by Prometheus Group.",
    "paraQueServe": "Variantes, épocas, grelhas de tamanhos.",
    "exemploReal": "AFS / Fashion Management decidem muitas vezes Private Edition vs Public.",
    "nesteCenario": {
      "onprem": "Activo em clientes AFS/Fashion.",
      "cloud": "Opcional — Public pode ficar curto.",
      "rise": "Opcional, frequentemente a razão para Private Edition."
    }
  },
  "cloud-alm": {
    "nome": "SAP Cloud ALM",
    "tipo": "ALM SaaS",
    "oQueFaz": "Application Lifecycle Management cloud-native. Quatro planos: Implementação (Activate, sprints, requisitos, testes, features, quality gates); Operações (health, integration/exception, job monitoring, BPM); Analytics do landscape; Observabilidade de agentes Joule. Inclui o dashboard RISE Methodology / System View de clean core. Incluído em RISE e GROW via Enterprise Support, Cloud Editions — pede-se o tenant em SAP for Me.",
    "paraQueServe": "Mission control da mistura GROW ou RISE. Traduz o to-be do Signavio em requisitos e testes; mede o clean core. Face visível da disciplina Deploy with Confidence.",
    "exemploReal": "A SAP descreve Cloud ALM como backbone da toolchain agent-led da metodologia RISE. O próprio produto Cloud ALM é construído internamente com Deploy with Confidence.",
    "nesteCenario": {
      "onprem": "Disponível se houver Enterprise Support, mas o default é Solution Manager. Card atenuado.",
      "cloud": "ALM por omissão do GROW.",
      "rise": "ALM por omissão do RISE. Dashboard RISE Methodology / System View."
    }
  },
  "solman": {
    "nome": "SAP Solution Manager",
    "tipo": "ALM on-prem",
    "oQueFaz": "ALM clássico: ChaRM, ITSM, documentação, Test Suite, monitoring, Custom Code Management. Fim da manutenção mainstream: final de 2027. RISE puro NÃO inclui usage rights de SolMan.",
    "paraQueServe": "Mission control do on-prem. Destino estratégico: Cloud ALM (Readiness Check, nota 3236443).",
    "exemploReal": "A SAP agenda o EoM mainstream do Solution Manager para o final de 2027.",
    "nesteCenario": {
      "onprem": "Card principal de L6.",
      "cloud": "Escondido.",
      "rise": "Atenuado. Default é Cloud ALM."
    }
  },
  "focused-run": {
    "nome": "SAP Focused Run",
    "tipo": "Ops avançado",
    "oQueFaz": "Monitoring de alto volume para service providers e landscapes muito grandes.",
    "paraQueServe": "Quem opera dezenas ou centenas de sistemas SAP.",
    "exemploReal": "A SAP lista três ALM estratégicos: Cloud ALM, Solution Manager, Focused Run. Não há paridade entre os três.",
    "nesteCenario": {
      "onprem": "Opcional em operadores e grupos muito grandes.",
      "cloud": "Irrelevante no GROW típico.",
      "rise": "Opcional."
    }
  },
  "leanix": {
    "nome": "SAP LeanIX",
    "tipo": "Enterprise Architecture",
    "oQueFaz": "Inventário vivo de aplicações, interfaces e capacidades. Help: LeanIX, Enterprise Architecture Designer, Enterprise Architecture Framework.",
    "paraQueServe": "Saber o que existe antes de misturar.",
    "exemploReal": "Toolchain SAP de transformação: LeanIX + Signavio + WalkMe + Cloud ALM.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Activo em transformações GROW multi-app.",
      "rise": "Activo."
    }
  },
  "walkme": {
    "nome": "WalkMe",
    "tipo": "Digital adoption",
    "oQueFaz": "Digital adoption. Help: WalkMe Digital Adoption. Guias in-app sobre Fiori, SuccessFactors, Ariba.",
    "paraQueServe": "Evitar que um S/4 Fiori impecável morra na adopção.",
    "exemploReal": "Fact sheets RISE listam Signavio + LeanIX + WalkMe como toolchain de transformação.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional, útil em GROW.",
      "rise": "Opcional, frequente no envelope de transformação."
    }
  },
  "enable-now": {
    "nome": "SAP Enable Now",
    "tipo": "Formação",
    "oQueFaz": "Autoría e entrega de formação in-app. Help: Enable Now e Knowledge Acceleration. Diferente do WalkMe e do SuccessFactors Learning.",
    "paraQueServe": "Enablement do go-live.",
    "exemploReal": "Programas Activate clássicos incluem Enable Now como standard de enablement.",
    "nesteCenario": {
      "onprem": "Activo.",
      "cloud": "Activo / opcional.",
      "rise": "Activo / opcional."
    }
  },
  "dwc": {
    "nome": "Deploy with Confidence (DwC)",
    "tipo": "Método",
    "oQueFaz": "Paved road interna da engenharia SAP para entregar software SaaS todos os dias com qualidade: trunk-based development, testes automatizados, feature toggles, daily deploy, zero-downtime na perspectiva do tenant. Nasceu como iniciativa de Operational Excellence (finalista do Hasso Plattner Founders’ Award 2020). NÃO é um SKU, NÃO aparece no contrato do cliente, NÃO é o antigo Data Warehouse Cloud.",
    "paraQueServe": "Dois papéis. Primeiro: explicar a cadência de Cloud ALM, Signavio, SuccessFactors e Public Edition. Segundo: padrão mental de como um processo to-be do Signavio se IMPLANTA com confiança — quality gates no Cloud ALM, clean core no BTP, feature toggles, testes Tricentis, evidência para auditoria.",
    "exemploReal": "A equipa do SAP Cloud ALM descreveu o produto a correr sobre Deploy with Confidence: deploys diários, feature toggles, change lead time inferior a um dia. A Vodafone não ganhou 11 mil modelos Signavio para os deixar num repositório.",
    "nesteCenario": {
      "onprem": "Atenuado. On-prem clássico implanta com SolMan/ChaRM — o contrário cultural do DwC.",
      "cloud": "Activo como método.",
      "rise": "Activo como método. Liga Signavio a Cloud ALM e a BTP."
    },
    "naoConfundir": "NÃO é SAP Data Warehouse Cloud (hoje Datasphere, id datasphere). NÃO é a oferta de partner Delivery Confidence for SAP da KPMG. NÃO se licencia."
  },
  "btc": {
    "nome": "SAP Business Transformation Center",
    "tipo": "Migração de dados",
    "oQueFaz": "Transformação seletiva e assessment de dados ECC/S/4 → Cloud ERP. Help: Business Transformation Center, Landscape Transformation, Test Data Migration Server.",
    "paraQueServe": "Selective data transition. Signavio escolhe o processo → BTC escolhe os dados → Cloud ALM corre o projecto.",
    "exemploReal": "Documentação Cloud ALM 2026 refere BTC em Data Management.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Raro (GROW é sobretudo greenfield).",
      "rise": "Recomendado com perfil brownfield."
    }
  },
  "tricentis": {
    "nome": "SAP Test Automation by Tricentis",
    "tipo": "Testes",
    "oQueFaz": "Help: Test Automation by Tricentis, Tricentis Test Automation for SAP, Enterprise Continuous Testing, Enterprise Performance Testing, Change Impact Analysis, Quality Center by Micro Focus, Test Acceleration and Optimization.",
    "paraQueServe": "Regressão a cada upgrade S/4 Cloud. Cloud ALM guarda o plano → Tricentis executa → quality gate DwC-style.",
    "exemploReal": "Cloud ALM for Implementation integra cenários de teste automatizado.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Recomendado.",
      "rise": "Recomendado."
    }
  },
  "sap-for-me": {
    "nome": "SAP for Me",
    "tipo": "Customer portal",
    "oQueFaz": "Portal do cliente SAP: contratos, sistemas, licenças, pedidos de tenant Cloud ALM. Help: SAP for Me. Built-In Support e Support Content vivem nesta órbita.",
    "paraQueServe": "Pedir o tenant Cloud ALM e ver o que está contratado. SAP for Me (contrato) → Cloud ALM (execução).",
    "exemploReal": "É daqui que a maior parte dos clientes RISE/GROW provisiona o Cloud ALM.",
    "nesteCenario": {
      "onprem": "Activo.",
      "cloud": "Activo.",
      "rise": "Activo."
    }
  },
  "etd": {
    "nome": "SAP Enterprise Threat Detection",
    "tipo": "Segurança",
    "oQueFaz": "SIEM focado em ameaças sobre sistemas SAP (logs, anomalias, ataques). Help: Enterprise Threat Detection. Complementa GRC (SoD) e IAG (acesso): ETD vê o ataque, não só o perfil.",
    "paraQueServe": "Detectar abuso e ataque no stack SAP. Mistura regulada: ETD + GRC + IAG + Cloud ALM.",
    "exemploReal": "Produto autónomo no All Products, família Security, distinto de Access Control.",
    "nesteCenario": {
      "onprem": "Opcional / recomendado com perfil regulado.",
      "cloud": "Opcional.",
      "rise": "Opcional com perfil regulado."
    }
  },
  "sci": {
    "nome": "SAP Cloud Infrastructure (SCI)",
    "tipo": "IaaS soberana",
    "oQueFaz": "IaaS operada pela própria SAP, desenvolvida com tecnologias open-source (OpenStack + Kubernetes) na rede global de data centers SAP — NÃO é AWS, Azure nem GCP. Compute (VMs/flavors), block/object/file storage, SDN, load balancing, DNSaaS, identity/key management, container registry. Linha: SAP Converged Cloud (2015) → SAP Cloud Infrastructure. Em 2025 a SAP reportou cerca de 15 regiões, 29 data centers, mais de 200 mil VMs. Na Europa é a opção IaaS do SAP Sovereign Cloud: dados no UE (Walldorf, St. Leon-Rot, colocation Frankfurt), três availability zones, certificações ISO 27001 IT-Grundschutz (Abr 2026), VS-NfD (Jun 2026), BSI C5 Type II, KRITIS/NIS 2. Base da EU AI Cloud (modelos de IA na abstração SCI + BTP, sem dependência de hyperscaler americano).",
    "paraQueServe": "Correr S/4HANA Cloud, BTP, HANA Cloud e workloads do cliente quando a soberania impede AWS/Azure/GCP. Mistura regulada: SCI + Sovereign Cloud + BTP + S/4 + Cloud ALM. Alternativa no mesmo L0 que os três hyperscalers e que o CDC / On-Site.",
    "exemploReal": "SAP.com lista SAP Cloud Infrastructure como pilar do Sovereign Cloud. Wikipedia e o anúncio EU AI Cloud (Nov 2025) descrevem SCI como IaaS SAP sem dependência de tecnologias de hyperscaler. HANA Cloud documenta SCI como infraestrutura suportada.",
    "nesteCenario": {
      "onprem": "Irrelevante como anfitrião do ERP on-prem. Card atenuado.",
      "cloud": "Opcional. Activo quando o selector L0 está em SCI ou o perfil regulado está on. GROW/Public Edition pode ser publicado sobre SCI em regiões soberanas.",
      "rise": "Opcional / recomendado com perfil regulado. RISE/Private Edition sobre IaaS SAP em vez de hyperscaler americano."
    },
    "naoConfundir": "NÃO é SAP Cloud Integration (o nome antigo do iFlow na Integration Suite, por vezes também chamado SCI/CPI). NÃO é BTP (BTP é PaaS). NÃO é o Data Center do Cliente clássico. NÃO é NS2 (NS2 é a via EUA / National Security Services)."
  },
  "sovereign-cloud": {
    "nome": "SAP Sovereign Cloud",
    "tipo": "Portefólio soberania",
    "oQueFaz": "Portefólio, não uma VM. Quatro dimensões: soberania de dados, operacional, legal e técnica. Três vias de deployment: (1) SAP Cloud Infrastructure — IaaS SAP; (2) Sovereign Cloud On-Site — infra operada pela SAP no DC escolhido pelo cliente; (3) hyperscaler soberano / NS2. Disponibilidade pública referida em EUA (NS2), Austrália, Canadá, Índia, Nova Zelândia, Reino Unido, Alemanha, França e outros países europeus. EU AI Cloud (2025) une o stack soberano europeu (SCI + BTP + AI Foundation, parceria Mistral).",
    "paraQueServe": "Escolher o NÍVEL de soberania, não só o sítio das VMs. Mistura: perfil regulado liga este card a SCI ou a CDC/On-Site ou a NS2.",
    "exemploReal": "Página oficial SAP Sovereign Cloud e o anúncio EU AI Cloud de Novembro 2025. Investimento anunciado de milhares de milhões na Europa, incluindo 2 mil milhões na Alemanha.",
    "nesteCenario": {
      "onprem": "Atenuado (soberania on-prem é o DC do cliente, não este portefólio).",
      "cloud": "Opcional, activo com perfil regulado.",
      "rise": "Opcional, activo com perfil regulado."
    },
    "naoConfundir": "Não é um quarto hyperscaler. É o guarda-chuva comercial/compliance. O IaaS concreto na Europa é o card SCI."
  },
  "ns2": {
    "nome": "SAP NS2 (National Security Services)",
    "tipo": "Soberania EUA",
    "oQueFaz": "Via EUA do Sovereign Cloud: operação por SAP National Security Services sobre infra aprovada (incl. AWS GovCloud). Pessoal, clearances e residência de dados alinhados a requisitos do sector público e defesa dos EUA. HANA Cloud foi anunciado em NS2.",
    "paraQueServe": "Clientes governo / defesa EUA. Na Europa o equivalente de conversa é SCI + Sovereign Cloud, não NS2.",
    "exemploReal": "Blog SAP: HANA Cloud em Sovereign Cloud e NS2. sap.com lista NS2 como via EUA do portefólio soberano.",
    "nesteCenario": {
      "onprem": "Irrelevante.",
      "cloud": "Opcional, só com perfil regulado e contexto EUA.",
      "rise": "Opcional, só com perfil regulado e contexto EUA."
    },
    "naoConfundir": "Não é SCI. SCI é IaaS SAP europeia/global nos DC SAP. NS2 é a entidade e o modelo operacional EUA."
  },
  "powerbuilder": {
    "nome": "SAP PowerBuilder",
    "tipo": "IDE legado",
    "oQueFaz": "IDE clássico para aplicações cliente-servidor (DataWindows). Help: PowerBuilder. Não faz parte do BTP nem do clean core.",
    "paraQueServe": "Manter apps PowerBuilder enquanto se migra para Fiori/Build.",
    "exemploReal": "Entrada All Products. Linha de ferramenta, não LoB.",
    "nesteCenario": {
      "onprem": "Opcional legado.",
      "cloud": "Escondido.",
      "rise": "Escondido."
    }
  },
  "powerdesigner": {
    "nome": "SAP PowerDesigner",
    "tipo": "Modelação",
    "oQueFaz": "Ferramenta de modelação empresarial (dados, processos, arquitectura). Help: PowerDesigner. Destino conceptual: LeanIX + Signavio + Datasphere.",
    "paraQueServe": "Documentar modelos de dados e arquitectura em landscapes clássicos.",
    "exemploReal": "Produto autónomo no All Products, família EA/modelação.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "infomaker": {
    "nome": "SAP InfoMaker",
    "tipo": "Reporting legado",
    "oQueFaz": "Ferramenta clássica de reporting associada ao ecossistema PowerBuilder.",
    "paraQueServe": "Reports desktop em landscapes antigos.",
    "exemploReal": "All Products. Destino = SAC / Analysis for Office.",
    "nesteCenario": {
      "onprem": "Legado.",
      "cloud": "Escondido.",
      "rise": "Escondido."
    }
  },
  "open-server": {
    "nome": "SAP Open Server",
    "tipo": "Middleware DB legado",
    "oQueFaz": "Camada de servidor aberto da família Sybase / ASE para protocolos de BD.",
    "paraQueServe": "Compatibilidade com stacks Sybase clássicos.",
    "exemploReal": "All Products, família ASE/SQL Anywhere.",
    "nesteCenario": {
      "onprem": "Legado.",
      "cloud": "Escondido.",
      "rise": "Escondido."
    }
  },
  "orientdb": {
    "nome": "SAP Enterprise OrientDB",
    "tipo": "Grafo legado",
    "oQueFaz": "Edição empresarial OrientDB referenciada no índice Help. Workloads de grafo novos vão para HANA Cloud multi-model / Knowledge Graph.",
    "paraQueServe": "Grafos em landscapes que ainda a usam.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Legado.",
      "cloud": "Atenuado.",
      "rise": "Atenuado."
    }
  },
  "replication-server": {
    "nome": "SAP Replication Server",
    "tipo": "Replicação",
    "oQueFaz": "Replicação clássica Sybase/SAP entre bases. Help: Replication Server. Em S/4/Central Finance o padrão moderno é SLT / BTC / Datasphere replication.",
    "paraQueServe": "Replicar dados entre motores clássicos.",
    "exemploReal": "All Products, família dados.",
    "nesteCenario": {
      "onprem": "Opcional legado.",
      "cloud": "Atenuado.",
      "rise": "Atenuado."
    }
  },
  "sql-anywhere": {
    "nome": "SAP SQL Anywhere",
    "tipo": "DB embarcada",
    "oQueFaz": "Base embarcada / edge. Help: SQL Anywhere. Distinta do HANA.",
    "paraQueServe": "Apps ocasionalmente conectadas, POS, edge.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Atenuado.",
      "rise": "Atenuado."
    }
  },
  "sql-analyzer": {
    "nome": "SQL Analyzer Tool for SAP HANA",
    "tipo": "Ferramenta",
    "oQueFaz": "Analisador de SQL/planos sobre HANA. Help: SQL Analyzer Tool for SAP HANA.",
    "paraQueServe": "Afinar queries HANA.",
    "exemploReal": "All Products, família HANA tools.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "event-ticketing": {
    "nome": "SAP Event Ticketing",
    "tipo": "Ticketing",
    "oQueFaz": "Bilheteira / eventos. Help: Event Ticketing. Vertical de lazer, não Event Mesh.",
    "paraQueServe": "Venda de bilhetes e acesso a eventos.",
    "exemploReal": "All Products. Não confundir com Event Management logístico.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    },
    "naoConfundir": "Não é SAP Event Management (track-and-trace) nem Event Mesh."
  },
  "event-stream-processor": {
    "nome": "SAP Event Stream Processor",
    "tipo": "Streaming legado",
    "oQueFaz": "CEP/streaming clássico. Help: Event Stream Processor. Destino: Event Mesh / Advanced Event Mesh / AI Core streaming.",
    "paraQueServe": "Processar streams em landscapes antigos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Legado.",
      "cloud": "Atenuado.",
      "rise": "Atenuado."
    }
  },
  "event-insight": {
    "nome": "SAP Event Insight",
    "tipo": "Eventos legado",
    "oQueFaz": "Insight sobre eventos de negócio, linha histórica no Help.",
    "paraQueServe": "Visibilidade de eventos antes do Event Mesh.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "innovation-management": {
    "nome": "SAP Innovation Management",
    "tipo": "Inovação",
    "oQueFaz": "Portefólio de ideias e inovação. Help: Innovation Management.",
    "paraQueServe": "Funil de ideias até projecto (liga a PPM).",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "knowledge-acceleration": {
    "nome": "SAP Knowledge Acceleration",
    "tipo": "Enablement",
    "oQueFaz": "Conteúdos de aceleração de conhecimento. Help: Knowledge Acceleration. Irmão do Enable Now.",
    "paraQueServe": "Formação acelerada em módulos SAP.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "micro-app-hub": {
    "nome": "SAP Micro-App Hub",
    "tipo": "Hub de micro-apps",
    "oQueFaz": "Catálogo de micro-apps. Help: Micro-App Hub.",
    "paraQueServe": "Distribuir mini-apps no workplace.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "collaboration-manager": {
    "nome": "SAP Collaboration Manager",
    "tipo": "Colaboração",
    "oQueFaz": "Colaboração em processos/documentos. Help: Collaboration Manager.",
    "paraQueServe": "Workrooms em volta de objectos SAP.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "content-to-go": {
    "nome": "SAP Content to Go",
    "tipo": "Conteúdo móvel",
    "oQueFaz": "Distribuição de conteúdo Enable Now / help para dispositivos. Help: Content to Go.",
    "paraQueServe": "Levar simulações e help ao telemóvel.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "employee-lookup": {
    "nome": "SAP Employee Lookup",
    "tipo": "App RH",
    "oQueFaz": "App de pesquisa de colaboradores. Help: Employee Lookup 2.3.",
    "paraQueServe": "Encontrar colegas. Destino UX: Work Zone / Mobile Start.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "candidate-pipeline": {
    "nome": "Candidate Pipeline",
    "tipo": "Recruiting",
    "oQueFaz": "Pipeline de candidatos no universo SuccessFactors / recruiting. Help: Candidate Pipeline.",
    "paraQueServe": "Acompanhar candidatos até à admissão.",
    "exemploReal": "All Products, família SuccessFactors.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "agent-compliance": {
    "nome": "Agent Compliance",
    "tipo": "Compliance RH",
    "oQueFaz": "Compliance de agentes / força de vendas no índice Help.",
    "paraQueServe": "Certificações e regras de agentes.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "questionmark": {
    "nome": "Assessment Management by Questionmark",
    "tipo": "Avaliação",
    "oQueFaz": "Avaliações e testes por Questionmark. Help: Assessment Management by Questionmark.",
    "paraQueServe": "Exames e certificações ligadas a Learning.",
    "exemploReal": "All Products, parceiro.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "behavioral-insights": {
    "nome": "Behavioral Insights",
    "tipo": "Analytics pessoas",
    "oQueFaz": "Insights comportamentais no portefólio Help.",
    "paraQueServe": "Padrões de comportamento de colaboradores/clientes.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "budget-benefits": {
    "nome": "Budget-Based Benefits Selection",
    "tipo": "Benefícios",
    "oQueFaz": "Selecção de benefícios por orçamento. Help: Budget-Based Benefits Selection.",
    "paraQueServe": "Open enrollment com envelope orçamental.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "workforce-forecast": {
    "nome": "SAP Workforce Forecasting and Scheduling",
    "tipo": "WFM",
    "oQueFaz": "Previsão e horários de workforce. Help: Workforce Forecasting and Scheduling by Workforce Software.",
    "paraQueServe": "Turnos e forecasting operacional.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "public-budgeting": {
    "nome": "Budgeting and Planning for Public Sector",
    "tipo": "Sector público",
    "oQueFaz": "Orçamentação e planeamento para sector público. Help: Budgeting and Planning for Public Sector.",
    "paraQueServe": "Orçamento público sobre S/4 / SAC.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "financial-closing": {
    "nome": "SAP Financial Closing Cockpit",
    "tipo": "Fecho",
    "oQueFaz": "Orquestração do fecho financeiro. Help: Financial Closing Cockpit Add-On.",
    "paraQueServe": "Checklist e tasks do month-end.",
    "exemploReal": "All Products, família Finance.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "financial-consolidation": {
    "nome": "SAP Financial Consolidation",
    "tipo": "Consolidação legado",
    "oQueFaz": "Consolidação clássica (BFC). Help: Financial Consolidation. Destino: Group Reporting.",
    "paraQueServe": "Contas do grupo em landscapes pré-S/4.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Legado.",
      "cloud": "Escondido.",
      "rise": "Legado."
    }
  },
  "funding-management": {
    "nome": "SAP Funding Management",
    "tipo": "Fundos",
    "oQueFaz": "Gestão de fundos / grants. Help: Funding Management.",
    "paraQueServe": "Sector público e educação: fundos e availability control.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "green-token": {
    "nome": "SAP Green Token",
    "tipo": "Sustentabilidade",
    "oQueFaz": "Cadeia de custódia de atributos ambientais. Help: Green Token. Irmão do Green Ledger.",
    "paraQueServe": "Provar a origem verde de um lote / certificado.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "rdp": {
    "nome": "SAP Responsible Design and Production",
    "tipo": "EPR / circular",
    "oQueFaz": "Conceção responsável e EPR (plásticos, responsabilidade alargada do produtor). Help: Responsible Design and Production.",
    "paraQueServe": "Obrigações de embalagem e eco-design.",
    "exemploReal": "All Products, família Sustainability.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "sus-data-exchange": {
    "nome": "SAP Sustainability Data Exchange",
    "tipo": "ESG partilha",
    "oQueFaz": "Partilha de dados ESG com parceiros. Help: Sustainability Data Exchange.",
    "paraQueServe": "Trocar pegadas e atributos na rede.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "sus-performance": {
    "nome": "SAP Sustainability Performance Management",
    "tipo": "ESG performance",
    "oQueFaz": "Performance de sustentabilidade. Help: Sustainability Performance Management.",
    "paraQueServe": "KPI ESG operacionais, a montante do Control Tower.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "ltc": {
    "nome": "Lead-to-Cash",
    "tipo": "Cadeia de processo",
    "oQueFaz": "Cadeia comercial ponta-a-ponta (lead → contrato → factura → caixa). Help lista Lead-to-Cash Business Process. Não é um exe: é o processo que o Signavio modela e o S/4+Sales+Commerce executam.",
    "paraQueServe": "Ver a mistura comercial como um fluxo, não como produtos isolados.",
    "exemploReal": "All Products como business process.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "s2p-process": {
    "nome": "Source-to-Pay (cadeia)",
    "tipo": "Cadeia de processo",
    "oQueFaz": "Cadeia de compras ponta-a-ponta. Help: Source-to-Pay Business Process.",
    "paraQueServe": "Ler Ariba + S/4 MM + Network como um fluxo.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "p2f": {
    "nome": "Plan-to-Fulfill",
    "tipo": "Cadeia de processo",
    "oQueFaz": "Cadeia de planeamento à entrega. Help: Plan-to-Fulfill Business Process.",
    "paraQueServe": "IBP → S/4 → EWM/TM como um fluxo.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "r2r-hr": {
    "nome": "Recruit-to-Retire",
    "tipo": "Cadeia de processo",
    "oQueFaz": "Cadeia de vida do colaborador. Help: Recruit-to-Retire Business Process.",
    "paraQueServe": "SuccessFactors + Folha + Fieldglass como um fluxo.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "i2m": {
    "nome": "Idea-to-Market",
    "tipo": "Cadeia de processo",
    "oQueFaz": "Cadeia de inovação a produto. Help: Idea to Market Business Process.",
    "paraQueServe": "Innovation Management + IPD + S/4 como um fluxo.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "trade-claims": {
    "nome": "SAP Intelligent Trade Claims Management",
    "tipo": "Trade promo",
    "oQueFaz": "Claims de promoções comerciais. Help: Intelligent Trade Claims Management.",
    "paraQueServe": "Deduzir e liquidar claims de retalhistas.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "trade-management": {
    "nome": "SAP Trade Management",
    "tipo": "Trade",
    "oQueFaz": "Gestão de trade promotions. Help: Trade Management.",
    "paraQueServe": "Planeamento de promoções no canal.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "intercompany-exchange": {
    "nome": "Intercompany data exchange",
    "tipo": "Utilities intercompany",
    "oQueFaz": "Troca intercompany para utilities CH (electricidade/gás) no S/4. Help: Intercompany Data Exchange for Swiss Electric and Gas Utilities.",
    "paraQueServe": "Market communication entre empresas do grupo.",
    "exemploReal": "All Products, vertical utilities.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "igr": {
    "nome": "SAP Invoice and Goods Receipt Reconciliation",
    "tipo": "MM/FI",
    "oQueFaz": "Reconciliação factura vs entrada de mercadorias. Help: Invoice and Goods Receipt Reconciliation.",
    "paraQueServe": "3-way match residual quando não há VIM/Ariba Invoice.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "landscape-portal": {
    "nome": "Landscape Portal (ABAP environment)",
    "tipo": "Ops ABAP Cloud",
    "oQueFaz": "Portal de landscape do ABAP environment S/4 Cloud. Help: Landscape Portal for SAP S/4HANA Cloud ABAP environment.",
    "paraQueServe": "Operar tenants ABAP Cloud.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "moc": {
    "nome": "SAP Management of Change",
    "tipo": "EHS / mudança",
    "oQueFaz": "Gestão de mudança operacional (fábrica, EHS). Help: Management of Change.",
    "paraQueServe": "Permit-to-work e mudanças de instalação.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "mdg-prometheus": {
    "nome": "MDG extensions by Prometheus Group",
    "tipo": "MDG add-on",
    "oQueFaz": "Extensões MDG EAM e retail/fashion by Prometheus Group. Help lista várias linhas.",
    "paraQueServe": "Master data de activos e moda para além do MDG standard.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "metadata-management": {
    "nome": "SAP Metadata Management",
    "tipo": "Metadados",
    "oQueFaz": "Gestão de metadados no parque EIM clássico. Help: Metadata Management.",
    "paraQueServe": "Catálogo de metadados ao lado de Information Steward.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "notes-management": {
    "nome": "SAP Notes Management",
    "tipo": "Notas",
    "oQueFaz": "Gestão de SAP Notes no landscape. Help: Notes Management.",
    "paraQueServe": "Aplicar e rastrear notes. Destino ops: Cloud ALM / LaMa.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "notification-social": {
    "nome": "Notification Integration for Social Media",
    "tipo": "Notificações",
    "oQueFaz": "Integração de notificações com apps sociais. Help: Notification Integration Service for Social Media Apps.",
    "paraQueServe": "Alertas em canais sociais.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "oasm": {
    "nome": "Online Application Submission Management",
    "tipo": "Submissão online",
    "oQueFaz": "Submissão online de candidaturas / pedidos. Help: Online Application Submission Management.",
    "paraQueServe": "Portais de submissão sector público / utilities.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "ods": {
    "nome": "SAP Order and Delivery Scheduling",
    "tipo": "Scheduling omnichannel",
    "oQueFaz": "Scheduling de encomenda e entrega. Help: Order and Delivery Scheduling. Satélite da família Order Management.",
    "paraQueServe": "Prometer e calendarizar entregas omnichannel.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "plm-recipe": {
    "nome": "SAP PLM Recipe Management",
    "tipo": "Receitas",
    "oQueFaz": "Receitas de produto (process / CPG). Help: PLM Recipe Management.",
    "paraQueServe": "Fórmulas e receitas antes da ordem de processo.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "pos-classic": {
    "nome": "SAP Point-of-Sale (clássico)",
    "tipo": "POS legado",
    "oQueFaz": "POS clássico Enterprise Point-of-Sale. Help: Point-of-Sale / Enterprise POS. Destino: Customer Checkout / Omnichannel POS by GK.",
    "paraQueServe": "Caixa em landscapes antigos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Legado.",
      "cloud": "Atenuado.",
      "rise": "Atenuado."
    }
  },
  "process-object-builder": {
    "nome": "SAP Process Object Builder",
    "tipo": "A2A legado",
    "oQueFaz": "Builder de process objects na integração clássica. Help: Process Object Builder.",
    "paraQueServe": "Objectos de processo A2A em PI/PO.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "workflow-mgmt": {
    "nome": "SAP Workflow Management / Process Visibility",
    "tipo": "Workflow legado",
    "oQueFaz": "Workflow Management e Process Visibility no BTP (linha anterior ao Build Process Automation). Help: Process Visibility Capability Within Workflow Management.",
    "paraQueServe": "Workflows BTP antigos. Destino: Build Process Automation.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "product-model-viewer": {
    "nome": "SAP Product Model Viewer",
    "tipo": "PLM viewer",
    "oQueFaz": "Visualizador de modelo de produto. Help: Product Model Viewer / 3D Visual Enterprise.",
    "paraQueServe": "Ver o gémeo 3D no processo de engenharia.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "product-transition": {
    "nome": "Product Transition Process",
    "tipo": "Transição de produto",
    "oQueFaz": "Processo de transição / phase-in phase-out de produto. Help: Product Transition Process.",
    "paraQueServe": "Substituir artigos sem partir MRP.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "ppg-bdf": {
    "nome": "Product and Process Governance by BDF",
    "tipo": "Governação PLM",
    "oQueFaz": "Governação de produto e processo by BDF. Help: Product and Process Governance by BDF (e on S/4HANA).",
    "paraQueServe": "Governar mudanças de produto em indústria regulada.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "pra": {
    "nome": "SAP Production and Revenue Accounting",
    "tipo": "Upstream oil",
    "oQueFaz": "Accounting de produção e receita (oil & gas upstream). Help: Production and Revenue Accounting.",
    "paraQueServe": "Dividir receita de poços e joint ventures.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "qir": {
    "nome": "SAP Quality Issue Resolution",
    "tipo": "Qualidade",
    "oQueFaz": "Resolução de problemas de qualidade em colaboração. Help: Quality Issue Resolution e Quality Issue Management.",
    "paraQueServe": "8D / CAPA com fornecedores.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "re-tenant": {
    "nome": "RE-FX Tenant Relationship add-on",
    "tipo": "Imobiliário",
    "oQueFaz": "Add-on de relação com inquilino no Real Estate. Help: Real Estate Management add-on for Tenant Relationship Management.",
    "paraQueServe": "Contratos e serviço ao inquilino.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "resolve": {
    "nome": "SAP Resolve",
    "tipo": "Suporte",
    "oQueFaz": "Oferta de resolução / supportability no índice Help.",
    "paraQueServe": "Encaminhar problemas de produto.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "revenue-growth": {
    "nome": "SAP Revenue Growth Management",
    "tipo": "Crescimento receita",
    "oQueFaz": "Growth management e optimization de receita. Help: Revenue Growth Management / Revenue Growth Optimization.",
    "paraQueServe": "Preço, mix e crescimento comercial.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "self-billing": {
    "nome": "SAP Self-Billing Cockpit",
    "tipo": "Self-billing",
    "oQueFaz": "Cockpit de self-billing com clientes/fornecedores. Help: Self-Billing Cockpit.",
    "paraQueServe": "O cliente fatura-se a si com base em entregas.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "service-tax-br": {
    "nome": "Service Taxation Enhancements for Brazil",
    "tipo": "Localização BR",
    "oQueFaz": "Melhorias de tributação de serviços no Brasil. Help: Service Taxation Enhancements for Brazil.",
    "paraQueServe": "Impostos de serviço BR no S/4.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "sso-classic": {
    "nome": "SAP Single Sign-On",
    "tipo": "SSO legado",
    "oQueFaz": "SSO clássico (Secure Login, Kerberos, X.509). Help: SAP Single Sign-On. Destino: IAS.",
    "paraQueServe": "SSO on-prem enquanto não há IAS.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Activo em muitos DC.",
      "cloud": "Atenuado (IAS).",
      "rise": "Atenuado (IAS)."
    }
  },
  "social-media-int": {
    "nome": "Social Media Integration",
    "tipo": "Social",
    "oQueFaz": "Integrações sociais (China ESS, SuccessFactors Recruiting, LINE, SAC). Help lista várias linhas.",
    "paraQueServe": "Publicar e captar eventos sociais.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "ssc": {
    "nome": "SAP Solution Sales Configuration",
    "tipo": "CPQ on-prem/cloud",
    "oQueFaz": "Configurador de soluções. Help: Solution Sales Configuration cloud edition, for S/4HANA, for Commerce Cloud. Irmão do CPQ.",
    "paraQueServe": "Configurar bundles complexos no ERP ou na loja.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "slc": {
    "nome": "SAP Supplier Lifecycle Management",
    "tipo": "Fornecedores legado",
    "oQueFaz": "Ciclo de vida do fornecedor on-prem. Help: SLC. Destino: Ariba + Network + MDG.",
    "paraQueServe": "Qualificar fornecedores no ECC/S/4 clássico.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Legado.",
      "cloud": "Atenuado.",
      "rise": "Atenuado."
    }
  },
  "srm": {
    "nome": "SAP Supplier Relationship Management",
    "tipo": "SRM legado",
    "oQueFaz": "SRM clássico. Help: SRM Server e add-ons. Destino: Ariba.",
    "paraQueServe": "Compras no mundo Business Suite 7.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Legado.",
      "cloud": "Escondido.",
      "rise": "Escondido."
    }
  },
  "tank-planning": {
    "nome": "Tank Planning Cockpit",
    "tipo": "Oil tank farm",
    "oQueFaz": "Planeamento de tanques. Help: Tank Planning Cockpit.",
    "paraQueServe": "Movimentar produto em parques de tanques.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "task-center": {
    "nome": "SAP Task Center",
    "tipo": "Inbox unificada",
    "oQueFaz": "Inbox única de aprovações S/4 + SuccessFactors + Build. Help: Task Center. Satélite de SAP Start / Work Zone.",
    "paraQueServe": "Uma fila de tarefas para o utilizador.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "tax-declaration-br": {
    "nome": "SAP Tax Declaration Framework for Brazil",
    "tipo": "Fiscal BR",
    "oQueFaz": "Framework de declarações fiscais Brasil. Help: Tax Declaration Framework for Brazil e Tax Intelligence by All Tax.",
    "paraQueServe": "Obrigações acessórias BR.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "teamcenter-gw": {
    "nome": "Teamcenter gateway for PLM si",
    "tipo": "PLM conector",
    "oQueFaz": "Gateway Teamcenter by Siemens para PLM system integration. Help: Teamcenter by Siemens gateway.",
    "paraQueServe": "Ligar o PLM Siemens ao S/4.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "translation-hub": {
    "nome": "SAP Translation Hub",
    "tipo": "Tradução",
    "oQueFaz": "Serviço BTP de tradução. Help: Translation Hub.",
    "paraQueServe": "Traduzir textos de UI e master data.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "tlc": {
    "nome": "Transport Load Consolidation",
    "tipo": "Carga TM",
    "oQueFaz": "Consolidação de carga. Help: Transport Load Consolidation.",
    "paraQueServe": "Encher camiões / contentores no TM.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "print-forms": {
    "nome": "Print Forms Service",
    "tipo": "Formulários",
    "oQueFaz": "Serviço BTP de formulários de impressão. Help: Print Forms Service.",
    "paraQueServe": "Output de documentos sem ADS on-prem.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "private-link": {
    "nome": "SAP Private Link Service",
    "tipo": "Rede privada",
    "oQueFaz": "Private Link no BTP para chegar a recursos no hyperscaler sem Internet pública. Help: Private Link Service. É a peça ⑪ do esquema Azure.",
    "paraQueServe": "BTP ↔ spoke RISE sem sair à Internet.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "process-control": {
    "nome": "SAP Process Control",
    "tipo": "GRC controlos",
    "oQueFaz": "Controlos de processo no GRC. Help: Process Control.",
    "paraQueServe": "Testar controlos SOX / internos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "celonis-mining": {
    "nome": "SAP Process Mining by Celonis",
    "tipo": "Process mining legado",
    "oQueFaz": "Process mining by Celonis no índice Help. Destino Signavio Process Intelligence.",
    "paraQueServe": "Minerar processos em landscapes que ainda têm a bundle Celonis.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    },
    "naoConfundir": "Não é o Signavio Process Intelligence (alvo actual)."
  },
  "plc": {
    "nome": "SAP Product Lifecycle Costing",
    "tipo": "Custo-alvo",
    "oQueFaz": "Custeio de ciclo de vida / target cost. Help: Product Lifecycle Costing e PCE.",
    "paraQueServe": "Custo-alvo na engenharia, antes do S/4 CO.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "plm-onprem": {
    "nome": "SAP Product Lifecycle Management",
    "tipo": "PLM clássico",
    "oQueFaz": "PLM on-prem / digital products. Help: Product Lifecycle Management. Destino cloud: IPD.",
    "paraQueServe": "Engenharia em landscapes clássicos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Activo se já há PLM.",
      "cloud": "Atenuado (IPD).",
      "rise": "Opcional."
    }
  },
  "promotion-mgmt": {
    "nome": "SAP Promotion Management for Retail",
    "tipo": "Promoções retalho",
    "oQueFaz": "Promoções de retalho. Help: Promotion Management for Retail e Omnichannel Promotion Pricing.",
    "paraQueServe": "Folhetos e preços promocionais na loja.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "quality-center": {
    "nome": "SAP Quality Center by Micro Focus",
    "tipo": "Testes legado",
    "oQueFaz": "Quality Center by Micro Focus. Help. Destino: Tricentis + Cloud ALM.",
    "paraQueServe": "Repositório de testes clássico.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "insurance-underwriting": {
    "nome": "SAP Quotation and Underwriting",
    "tipo": "Seguros",
    "oQueFaz": "Cotação e underwriting de seguros. Help: Quotation and Underwriting / Product Quotation and Underwriting Management / Underwriting for Insurance.",
    "paraQueServe": "Subscrever riscos no core de seguros.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "r3": {
    "nome": "SAP R/3",
    "tipo": "ERP ancestral",
    "oQueFaz": "Ancestral do ECC. Help: SAP R/3. Só pedagógico / legado extremo.",
    "paraQueServe": "Explicar de onde veio o ECC.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Legado histórico.",
      "cloud": "Escondido.",
      "rise": "Escondido."
    }
  },
  "rabbitmq-btp": {
    "nome": "RabbitMQ on SAP BTP",
    "tipo": "Messaging",
    "oQueFaz": "RabbitMQ como serviço no BTP. Help: RabbitMQ on SAP BTP.",
    "paraQueServe": "Mensageria poliglota nas extensões.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Ausente.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "redis-btp": {
    "nome": "Redis on SAP BTP",
    "tipo": "Cache",
    "oQueFaz": "Redis gerido no BTP. Help: Redis on SAP BTP.",
    "paraQueServe": "Cache e sessões das extensões.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Ausente.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "rto": {
    "nome": "SAP Real-Time Offer Management",
    "tipo": "Ofertas tempo real",
    "oQueFaz": "Ofertas em tempo real. Help: Real-Time Offer Management.",
    "paraQueServe": "Next-best-offer no canal.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "recommerce": {
    "nome": "SAP Recommerce",
    "tipo": "2.ª mão",
    "oQueFaz": "Recommerce / segunda mão. Help: Recommerce.",
    "paraQueServe": "Devoluções que voltam à venda.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "regulation-mgmt": {
    "nome": "SAP Regulation Management by Greenlight",
    "tipo": "GRC regulação",
    "oQueFaz": "Regulação e mitigation AVM by Greenlight. Help: Regulation Management.",
    "paraQueServe": "Mapear regulações a controlos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "regulatory-change": {
    "nome": "Regulatory Change Manager",
    "tipo": "Regulação",
    "oQueFaz": "Gestor de mudança regulatória. Help: Regulatory Change Manager.",
    "paraQueServe": "Acompanhar mudanças de lei.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "rbsc": {
    "nome": "Repository Based Shipment Channel",
    "tipo": "Entrega software",
    "oQueFaz": "Canal de shipment baseado em repositório. Help: Repository Based Shipment Channel.",
    "paraQueServe": "Receber stacks SAP.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "retail-execution": {
    "nome": "SAP Retail Execution",
    "tipo": "Força de campo retalho",
    "oQueFaz": "Execução de retalho no campo (visitas, planograma). Help: Retail Execution e app móvel.",
    "paraQueServe": "Merchandisers na loja do cliente.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "rpm": {
    "nome": "SAP Returnable Packaging Management",
    "tipo": "Embalagens retornáveis",
    "oQueFaz": "Embalagens retornáveis / pallets. Help: Returnable Packaging Management.",
    "paraQueServe": "Contas de pallets com fornecedores e clientes.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "risk-mgmt": {
    "nome": "SAP Risk Management",
    "tipo": "Risco GRC",
    "oQueFaz": "Gestão de risco empresarial. Help: Risk Management.",
    "paraQueServe": "Registo de riscos e KRI.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "rounds-manager": {
    "nome": "SAP Rounds Manager",
    "tipo": "Rounds legado",
    "oQueFaz": "Rounds de manutenção clássicos. Help: Rounds Manager. Destino: Service and Asset Manager.",
    "paraQueServe": "Rondas no activo em landscapes antigos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "rural-sourcing": {
    "nome": "SAP Rural Sourcing Management",
    "tipo": "Agro sourcing",
    "oQueFaz": "Sourcing rural / originação agrícola. Help: Rural Sourcing Management.",
    "paraQueServe": "Comprar colheita a pequenos produtores.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "sales-insights-retail": {
    "nome": "SAP Sales Insights for Retail",
    "tipo": "Analytics retalho",
    "oQueFaz": "Insights de vendas de retalho. Help: Sales Insights for Retail.",
    "paraQueServe": "Sell-through e margem de loja.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "sop-classic": {
    "nome": "SAP Sales and Operations Planning",
    "tipo": "S&OP legado",
    "oQueFaz": "S&OP clássico. Help: Sales and Operations Planning. Destino: IBP.",
    "paraQueServe": "S&OP em ECC/APO.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Legado.",
      "cloud": "Atenuado.",
      "rise": "Atenuado."
    }
  },
  "screen-personas": {
    "nome": "SAP Screen Personas",
    "tipo": "UX clássico",
    "oQueFaz": "Simplificar ecrãs SAP GUI. Help: Screen Personas.",
    "paraQueServe": "Dar uma cara aceitável ao GUI enquanto não há Fiori.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "secondary-distribution": {
    "nome": "SAP Secondary Distribution for Oil and Gas",
    "tipo": "Downstream oil",
    "oQueFaz": "Distribuição secundária oil & gas. Help: Secondary Distribution for Oil and Gas / S/4 Supply Chain for secondary distribution.",
    "paraQueServe": "Terminais e entregas a postos.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "security-dd": {
    "nome": "Security Due Diligence Service",
    "tipo": "Security review",
    "oQueFaz": "Serviço de due diligence de segurança. Help: Security Due Diligence Service.",
    "paraQueServe": "Rever a postura de segurança do landscape.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "shop-floor-mgr": {
    "nome": "SAP Shop Floor Manager",
    "tipo": "MES clássico",
    "oQueFaz": "Gestor de chão de fábrica clássico. Help: Shop Floor Manager. Destino: Digital Manufacturing.",
    "paraQueServe": "Execução de ordens em MES antigo.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "smart-business": {
    "nome": "SAP Smart Business",
    "tipo": "KPI Fiori",
    "oQueFaz": "KPI tiles Fiori clássicos. Help: Smart Business.",
    "paraQueServe": "Tiles de KPI no launchpad. Destino: SAC / Work Zone cards.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "slt-toolset": {
    "nome": "Software Logistics Toolset",
    "tipo": "SUM / SL",
    "oQueFaz": "Software Logistics Toolset (SUM, SPAM, etc.). Help: Software Logistics Toolset.",
    "paraQueServe": "Upgrades e patches on-prem.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "solution-hub": {
    "nome": "SAP Solution Hub",
    "tipo": "Catálogo soluções",
    "oQueFaz": "Hub de soluções. Help: Solution Hub.",
    "paraQueServe": "Descobrir soluções e pacotes.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "sourcing-clm": {
    "nome": "SAP Sourcing and CLM",
    "tipo": "Sourcing legado",
    "oQueFaz": "Sourcing e Contract Lifecycle Management clássicos. Help: Sourcing and SAP Contract Lifecycle Management. Destino: Ariba.",
    "paraQueServe": "RFx e contratos no mundo pré-Ariba cloud.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "sports-one": {
    "nome": "SAP Sports One",
    "tipo": "Desporto",
    "oQueFaz": "Suite para clubes e federações. Help: Sports One.",
    "paraQueServe": "Plantel, médicos, formação desportiva.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "store-mgmt-gk": {
    "nome": "SAP Store Management by GK",
    "tipo": "Loja GK",
    "oQueFaz": "Gestão de loja by GK. Help: Store Management by GK.",
    "paraQueServe": "Backoffice da loja junto ao POS GK.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "strategy-mgmt": {
    "nome": "SAP Strategy Management",
    "tipo": "Estratégia",
    "oQueFaz": "Strategy Management (BSC). Help: Strategy Management.",
    "paraQueServe": "Mapas estratégicos e iniciativas.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "scm-classic": {
    "nome": "SAP Supply Chain Management",
    "tipo": "SCM suite legado",
    "oQueFaz": "Suite SCM clássica (APO, EWM antigo, TM antigo, SNC). Help: Supply Chain Management.",
    "paraQueServe": "Explicar o ancestral de IBP/EWM/TM.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "scpm": {
    "nome": "SAP Supply Chain Performance Management",
    "tipo": "KPI supply",
    "oQueFaz": "Performance da supply chain. Help: Supply Chain Performance Management.",
    "paraQueServe": "KPI de cadeia. Destino: SAC + IBP analytics.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "support-content": {
    "nome": "Support Content",
    "tipo": "Suporte",
    "oQueFaz": "Conteúdos de suporte no Help. Help: Support Content / Built-In Support.",
    "paraQueServe": "Artigos de suporte no produto.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "hana-supportability": {
    "nome": "Supportability Tools for SAP HANA",
    "tipo": "Ops HANA",
    "oQueFaz": "Ferramentas de supportability HANA. Help: Supportability Tools for SAP HANA.",
    "paraQueServe": "Diagnosticar HANA on-prem.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "tao": {
    "nome": "SAP Test Acceleration and Optimization",
    "tipo": "Testes legado",
    "oQueFaz": "TAO. Help: Test Acceleration and Optimization. Destino: Tricentis.",
    "paraQueServe": "Acelerar testes no SolMan.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "tdms": {
    "nome": "SAP Test Data Migration Server",
    "tipo": "Dados de teste",
    "oQueFaz": "TDMS. Help: Test Data Migration Server.",
    "paraQueServe": "Recortar e mascarar dados de PRD para QA.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "toc": {
    "nome": "Theory of Constraints",
    "tipo": "Planning add-on",
    "oQueFaz": "Theory of Constraints no planning. Help: Theory of Constraints.",
    "paraQueServe": "Gargalos no planeamento.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "tpi": {
    "nome": "SAP Trading Platform Integration",
    "tipo": "Tesouraria",
    "oQueFaz": "Integração com plataformas de trading. Help: Trading Platform Integration.",
    "paraQueServe": "Deals de tesouraria a entrar no TRM.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "transactional-banking": {
    "nome": "SAP Transactional Banking",
    "tipo": "Banking core",
    "oQueFaz": "Core transaccional bancário. Help: Transactional Banking for S/4HANA.",
    "paraQueServe": "Contas e pagamentos no banco.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "trp": {
    "nome": "SAP Transportation Resource Planning",
    "tipo": "Recursos TM",
    "oQueFaz": "Planeamento de recursos de transporte. Help: Transportation Resource Planning.",
    "paraQueServe": "Tractores, reboques, tripulações.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "transportplaner": {
    "nome": "Transportplaner",
    "tipo": "Planning transportes",
    "oQueFaz": "Transportplaner no índice Help (planning táctico).",
    "paraQueServe": "Plano táctico de transportes.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "ui-masking": {
    "nome": "UI Data Protection Masking",
    "tipo": "Máscara UI",
    "oQueFaz": "Mascarar dados sensíveis no UI. Help: UI Data Protection Masking.",
    "paraQueServe": "Esconder NIF/IBAN em ecrãs.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "upc": {
    "nome": "Unified Planning Center",
    "tipo": "Planning hub",
    "oQueFaz": "Centro unificado de planeamento. Help: Unified Planning Center.",
    "paraQueServe": "Hub de planos (SAC/IBP/PPM).",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "utilities-css": {
    "nome": "Utilities Customer Self-Service",
    "tipo": "Self-service utilities",
    "oQueFaz": "Self-service de cliente utilities. Help: Utilities Customer Self-Service Agent / Multichannel Foundation.",
    "paraQueServe": "Portal do cliente de energia.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "work-manager": {
    "nome": "SAP Work Manager",
    "tipo": "Mobile legado",
    "oQueFaz": "Work Manager clássico. Help: Work Manager. Destino: Service and Asset Manager.",
    "paraQueServe": "Técnicos em landscapes Agentry.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "cproject": {
    "nome": "SAP cProject Suite",
    "tipo": "Projectos legado",
    "oQueFaz": "cProjects clássico. Help: cProject Suite. Destino: PPM / S/4 PS.",
    "paraQueServe": "Projectos em Business Suite 7.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "cpm": {
    "nome": "SAP Commercial Project Management",
    "tipo": "Projectos comerciais",
    "oQueFaz": "CPM — projectos com cliente ( timbiling, forecast). Help: Commercial Project Management.",
    "paraQueServe": "Professional services e project manufacturing.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "eis": {
    "nome": "SAP Enterprise Inventory and Service-Level Optimization",
    "tipo": "Inventário multi-escalão",
    "oQueFaz": "EIS — optimização de inventário e serviço. Help: Enterprise Inventory and Service-Level Optimization.",
    "paraQueServe": "Stock multi-escalão. Destino conceptual IBP inventory.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "enterprise-chatbot": {
    "nome": "SAP Enterprise Chatbot",
    "tipo": "Chatbot legado",
    "oQueFaz": "Chatbot empresarial clássico. Help: Enterprise Chatbot. Destino: Joule.",
    "paraQueServe": "FAQ e tickets antes do Joule.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "edm-digital": {
    "nome": "SAP Enterprise Digital Management",
    "tipo": "Digital ops",
    "oQueFaz": "Enterprise Digital Management no índice Help.",
    "paraQueServe": "Operar canais digitais.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "esm": {
    "nome": "SAP Enterprise Service Management",
    "tipo": "ESM",
    "oQueFaz": "Service management empresarial (também linha SuccessFactors ESM). Help: Enterprise Service Management.",
    "paraQueServe": "Serviços internos / shared services.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "big-data-services": {
    "nome": "SAP Big Data Services",
    "tipo": "Big data legado",
    "oQueFaz": "Serviços big data 2022 no Help. Destino: BDC / Datasphere / hyperscaler nativo.",
    "paraQueServe": "Lakes clássicos SAP.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "margin-assurance": {
    "nome": "Big Data Margin Assurance",
    "tipo": "Margem",
    "oQueFaz": "Asseguramento de margem com big data. Help: Big Data Margin Assurance.",
    "paraQueServe": "Detectar fugas de margem.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "forecast-opt-hana": {
    "nome": "Forecast Optimization on HANA",
    "tipo": "Forecast",
    "oQueFaz": "Optimização de forecast sobre HANA. Help: Forecast Optimization on HANA.",
    "paraQueServe": "Forecast estatístico clássico. Destino: IBP / Predictive Replenishment.",
    "exemploReal": "All Products.",
    "nesteCenario": {
      "onprem": "Opcional / atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "business-suite": {
    "nome": "SAP Business Suite (cloud)",
    "tipo": "Suite comercial",
    "oQueFaz": "Nome comercial actual em sap.com/products.html: o portefólio cloud que junta Cloud ERP (aplicações), Business AI (Joule e agentes), Business Data Cloud e BTP. Não é a Business Suite 7 on-prem (ECC). A página oficial descreve-a como suite autónoma: finanças, spend, supply chain, HCM, CX e indústria, com agentes Joule a executar sobre dados e processos SAP.",
    "paraQueServe": "Ler o mapa como a SAP vende em 2026, não só como lista de SKUs. Mistura: Business Suite = s4hana cloud + LoB + bdc + joule + btp. RISE e GROW são as vias de contrato para entrar nesta suite.",
    "exemploReal": "sap.com/products.html e sap.com/products/business-suite.html posicionam Business Suite como produto de destaque, alimentado por Business AI + BDC + aplicações, sobre BTP.",
    "nesteCenario": {
      "onprem": "Irrelevante (a suite cloud). O ancestral on-prem é ECC / Business Suite 7.",
      "cloud": "Activo como guarda-chuva comercial do GROW.",
      "rise": "Activo como guarda-chuva comercial do RISE."
    },
    "naoConfundir": "NÃO é SAP Business Suite 7 / ECC. Esse ancestral é o card ecc."
  },
  "cloud-erp": {
    "nome": "SAP Cloud ERP",
    "tipo": "ERP Cloud (marca)",
    "oQueFaz": "Nome comercial em sap.com/products.html e /erp.html para o ERP na cloud. Na prática é o S/4HANA Cloud (Public Edition no GROW, Private Edition no RISE). A página fala de ERP ready-to-run com AI embutida em finanças, supply chain e procurement.",
    "paraQueServe": "Quando o cliente ouve 'Cloud ERP' e não 'S/4'. Este card aponta para s4hana. Não duplica o digital core: é a etiqueta de marketing.",
    "exemploReal": "Featured product em sap.com/products.html com link para /products/erp/s4hana.html.",
    "nesteCenario": {
      "onprem": "Irrelevante.",
      "cloud": "Activo. Sinónimo comercial do Public Edition.",
      "rise": "Activo. Sinónimo comercial do Private Edition / RISE Cloud ERP."
    },
    "naoConfundir": "Não é um terceiro ERP além do S/4 Cloud. É o mesmo motor com outro nome comercial."
  },
  "visual-enterprise": {
    "nome": "SAP 3D Visual Enterprise",
    "tipo": "PLM 3D",
    "oQueFaz": "Visualização 3D ligada a dados de negócio. A-Z: SAP 3D Visual Enterprise. Irmão do Product Model Viewer.",
    "paraQueServe": "Ver o gémeo 3D no chão de fábrica e no serviço.",
    "exemploReal": "sap.com/products/a-z.html entrada #.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "absence-wfs": {
    "nome": "SAP Absence and Leave Management by WorkForce Software",
    "tipo": "Ausências",
    "oQueFaz": "Pedidos de ausência by WorkForce Software. A-Z HCM.",
    "paraQueServe": "Férias e leaves quando o WFS está no landscape (além do SF Time).",
    "exemploReal": "A-Z: Absence and Leave Management.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "access-control": {
    "nome": "SAP Access Control",
    "tipo": "GRC SoD",
    "oQueFaz": "SoD e provisionamento on-prem. A-Z: Access Control. Família GRC; IAG é o irmão cloud.",
    "paraQueServe": "Aprovar acessos e detectar conflitos no ECC/S/4 on-prem.",
    "exemploReal": "A-Z Financial management / Access Control.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "avm-pathlock": {
    "nome": "SAP Access Violation Management by Pathlock",
    "tipo": "SoD parceiro",
    "oQueFaz": "SAP Access Violation Management by Pathlock (SoD parceiro) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Analisar violações SoD em landscapes híbridos.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "blackline-asa": {
    "nome": "SAP Account Substantiation and Automation by BlackLine",
    "tipo": "Fecho parceiro",
    "oQueFaz": "SAP Account Substantiation and Automation by BlackLine (Fecho parceiro) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Reconciliar contas no fecho, ao lado do Closing Cockpit.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "ase": {
    "nome": "SAP Adaptive Server Enterprise",
    "tipo": "DB OLTP",
    "oQueFaz": "SAP Adaptive Server Enterprise (DB OLTP) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "OLTP clássico que ainda corre em muitos clientes.",
    "exemploReal": "A-Z: Adaptive Server Enterprise.",
    "nesteCenario": {
      "onprem": "Opcional legado.",
      "cloud": "Escondido.",
      "rise": "Escondido."
    }
  },
  "syniti-adm": {
    "nome": "SAP Advanced Data Migration by Syniti",
    "tipo": "Migração",
    "oQueFaz": "SAP Advanced Data Migration by Syniti (Migração) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Cargas brownfield / S/4 conversion.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "afc": {
    "nome": "SAP Advanced Financial Closing",
    "tipo": "Fecho cloud",
    "oQueFaz": "SAP Advanced Financial Closing (Fecho cloud) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Orquestrar o fecho no S/4 Cloud / RISE.",
    "exemploReal": "A-Z: Advanced Financial Closing.",
    "nesteCenario": {
      "onprem": "Atenuado (usar FCC).",
      "cloud": "Recomendado.",
      "rise": "Recomendado."
    }
  },
  "apo": {
    "nome": "SAP Advanced Planning and Optimization",
    "tipo": "APO legado",
    "oQueFaz": "SAP Advanced Planning and Optimization (APO legado) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "SNP/DP/PP-DS em Business Suite 7.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Legado.",
      "cloud": "Escondido.",
      "rise": "Atenuado."
    }
  },
  "att-pharma": {
    "nome": "SAP Advanced Track and Trace for Pharmaceuticals",
    "tipo": "T&T pharma",
    "oQueFaz": "SAP Advanced Track and Trace for Pharmaceuticals (T&T pharma) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Serialização e compliance DSCSA/EU-FMD.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "agent-lm": {
    "nome": "SAP Agent Lifecycle Management",
    "tipo": "Agentes",
    "oQueFaz": "SAP Agent Lifecycle Management (Agentes) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Onboarding e compliance de agentes.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "agent-pm": {
    "nome": "SAP Agent Performance Management",
    "tipo": "Agentes",
    "oQueFaz": "SAP Agent Performance Management (Agentes) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Incentivos de canal.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "acm": {
    "nome": "SAP Agricultural Contract Management",
    "tipo": "Agro contratos",
    "oQueFaz": "SAP Agricultural Contract Management (Agro contratos) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Compra de colheita e posições.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "ai-agent-hub": {
    "nome": "SAP AI Agent Hub",
    "tipo": "Agentes IA",
    "oQueFaz": "Hub de agentes IA. A-Z: SAP AI Agent Hub. Sítio onde se publicam e governam agentes Joule.",
    "paraQueServe": "Catálogo e governação de agentes no BTP.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Ausente.",
      "cloud": "Recomendado com Joule.",
      "rise": "Recomendado com Joule."
    }
  },
  "aif": {
    "nome": "SAP Application Interface Framework",
    "tipo": "AIF",
    "oQueFaz": "SAP Application Interface Framework (AIF) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Monitorizar e mapear IDocs/proxies no ERP.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "opentext-archive": {
    "nome": "SAP Archiving and Document Access by OpenText",
    "tipo": "Arquivo",
    "oQueFaz": "SAP Archiving and Document Access by OpenText (Arquivo) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Arquivar documentos de negócio fora do HANA.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "asset-workbench": {
    "nome": "SAP Asset Information Workbench",
    "tipo": "Activos",
    "oQueFaz": "SAP Asset Information Workbench (Activos) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Dados técnicos do activo para APM/EAM.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "audit-mgmt": {
    "nome": "SAP Audit Management",
    "tipo": "Auditoria GRC",
    "oQueFaz": "SAP Audit Management (Auditoria GRC) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Plano de auditoria e working papers.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "batch-release-ls": {
    "nome": "SAP Batch Release Hub for Life Sciences",
    "tipo": "Life sciences",
    "oQueFaz": "SAP Batch Release Hub for Life Sciences (Life sciences) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Batch release com dados de qualidade e compliance.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "broker-reconciliation": {
    "nome": "SAP Broker Reconciliation for Commodity Derivatives",
    "tipo": "Commodities",
    "oQueFaz": "SAP Broker Reconciliation for Commodity Derivatives (Commodities) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Tesouraria de commodities.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "bas": {
    "nome": "SAP Business Application Studio",
    "tipo": "IDE cloud",
    "oQueFaz": "SAP Business Application Studio (IDE cloud) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Desenvolver CAP, Fiori, extensões clean core.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Ausente.",
      "cloud": "Activo com BTP.",
      "rise": "Activo com BTP."
    }
  },
  "integrity-screening": {
    "nome": "SAP Business Integrity Screening",
    "tipo": "Fraude",
    "oQueFaz": "SAP Business Integrity Screening (Fraude) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Detectar pagamentos e parceiros suspeitos.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "bn-asset": {
    "nome": "SAP Business Network Asset Collaboration",
    "tipo": "Rede activos",
    "oQueFaz": "SAP Business Network Asset Collaboration (Rede activos) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "OEM e operador partilham o gémeo do activo.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "bn-commerce": {
    "nome": "SAP Business Network Commerce Automation",
    "tipo": "Rede compras",
    "oQueFaz": "SAP Business Network Commerce Automation (Rede compras) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Transaccionar com fornecedores na rede.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "bn-freight": {
    "nome": "SAP Business Network Freight Collaboration",
    "tipo": "Rede freight",
    "oQueFaz": "SAP Business Network Freight Collaboration (Rede freight) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Tendering e tracking de freight.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "bn-gtt": {
    "nome": "SAP Business Network Global Track and Trace",
    "tipo": "GTT",
    "oQueFaz": "SAP Business Network Global Track and Trace (GTT) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Visibilidade multi-modal da encomenda.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "bn-traceability": {
    "nome": "SAP Business Network Material Traceability",
    "tipo": "Rastreio material",
    "oQueFaz": "SAP Business Network Material Traceability (Rastreio material) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Origem do lote ao longo da rede.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "bn-planning": {
    "nome": "SAP Business Network Planning Collaboration",
    "tipo": "Rede planning",
    "oQueFaz": "SAP Business Network Planning Collaboration (Rede planning) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Partilhar previsões IBP com fornecedores.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "bn-scc": {
    "nome": "SAP Business Network Supply Chain Collaboration",
    "tipo": "SCC",
    "oQueFaz": "SAP Business Network Supply Chain Collaboration (SCC) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Forecast, inventory e ordens com o fornecedor.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "vistex-channel": {
    "nome": "SAP Channel Program Management by Vistex",
    "tipo": "Canal Vistex",
    "oQueFaz": "SAP Channel Program Management by Vistex (Canal Vistex) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Incentivos e programas a revendedores.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "mirakl": {
    "nome": "SAP Commerce Marketplace Management by Mirakl",
    "tipo": "Marketplace",
    "oQueFaz": "SAP Commerce Marketplace Management by Mirakl (Marketplace) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Multi-seller na loja.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "commodity-mgmt": {
    "nome": "SAP Commodity Management",
    "tipo": "Commodities",
    "oQueFaz": "SAP Commodity Management (Commodities) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Contratos e risco de commodities.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "complaint-handling": {
    "nome": "SAP Complaint Handling",
    "tipo": "Reclamações",
    "oQueFaz": "SAP Complaint Handling (Reclamações) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Reclamações de qualidade / cliente.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "opentext-cms": {
    "nome": "SAP Content Management Core by OpenText",
    "tipo": "ECM",
    "oQueFaz": "SAP Content Management Core by OpenText (ECM) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Repositório ECM junto ao S/4.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "skillsoft": {
    "nome": "SAP Content Stream by Skillsoft",
    "tipo": "Learning content",
    "oQueFaz": "SAP Content Stream by Skillsoft (Learning content) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Catálogo de formação.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "serialization": {
    "nome": "SAP Corporate Serialization",
    "tipo": "Serialização",
    "oQueFaz": "SAP Corporate Serialization (Serialização) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Números de série ponta-a-ponta.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "crystal": {
    "nome": "SAP Crystal Reports",
    "tipo": "Reporting",
    "oQueFaz": "SAP Crystal Reports (Reporting) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Reports pixel-perfect clássicos.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "car": {
    "nome": "SAP Customer Activity Repository",
    "tipo": "Retalho CAR",
    "oQueFaz": "SAP Customer Activity Repository (Retalho CAR) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "POS, stock e procura numa vista.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "cdp": {
    "nome": "SAP Customer Data Platform",
    "tipo": "CDP",
    "oQueFaz": "SAP Customer Data Platform (CDP) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Unificar eventos de cliente para CX.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    },
    "naoConfundir": "Não é o Customer Data Cloud (esse é CIAM/Gigya)."
  },
  "dairy-msg": {
    "nome": "SAP Dairy Management by msg",
    "tipo": "Lacticínios",
    "oQueFaz": "SAP Dairy Management by msg (Lacticínios) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Recepção de leite e yield.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "vistex-data": {
    "nome": "SAP Data Maintenance by Vistex",
    "tipo": "Master data Vistex",
    "oQueFaz": "SAP Data Maintenance by Vistex (Master data Vistex) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Preços e masters Vistex.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "dqm-location": {
    "nome": "SAP Data Quality Management, location microservices",
    "tipo": "DQ moradas",
    "oQueFaz": "SAP Data Quality Management, location microservices (DQ moradas) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Validar moradas em apps BTP/S/4.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "opentext-dam": {
    "nome": "SAP Digital Asset Management Cloud by OpenText",
    "tipo": "DAM",
    "oQueFaz": "SAP Digital Asset Management Cloud by OpenText (DAM) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Activos digitais (imagens, vídeo) para CX/PLM.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "document-ai": {
    "nome": "SAP Document AI",
    "tipo": "IA documentos",
    "oQueFaz": "SAP Document AI (IA documentos) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Extrair facturas, encomendas e IDs com IA.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Recomendado.",
      "rise": "Recomendado."
    }
  },
  "opentext-presentment": {
    "nome": "SAP Document Presentment by OpenText",
    "tipo": "Presentment",
    "oQueFaz": "SAP Document Presentment by OpenText (Presentment) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Enviar facturas/extractos ao cliente.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "e-mobility": {
    "nome": "SAP E-Mobility",
    "tipo": "Mobilidade eléctrica",
    "oQueFaz": "SAP E-Mobility (Mobilidade eléctrica) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Carregamento e frota eléctrica.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "ectr": {
    "nome": "SAP Engineering Control Center",
    "tipo": "ECTR",
    "oQueFaz": "SAP Engineering Control Center (ECTR) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Engenheiro grava o modelo no S/4/PLM.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "vistex-excise": {
    "nome": "SAP Excise Tax Management by Vistex",
    "tipo": "Imposto especial",
    "oQueFaz": "SAP Excise Tax Management by Vistex (Imposto especial) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Excise em bebidas, tabaco, combustível.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "opentext-xecm": {
    "nome": "SAP Extended ECM by OpenText",
    "tipo": "xECM",
    "oQueFaz": "SAP Extended ECM by OpenText (xECM) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "ECM alargado ligado a objectos SAP.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "vistex-price": {
    "nome": "SAP Extended Price Management by Vistex",
    "tipo": "Preço Vistex",
    "oQueFaz": "SAP Extended Price Management by Vistex (Preço Vistex) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Price lists complexas e channel price.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "vistex-grower": {
    "nome": "SAP Grower Management for Perishables by Vistex",
    "tipo": "Produtores",
    "oQueFaz": "SAP Grower Management for Perishables by Vistex (Produtores) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Contratos com agricultores.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "incentive-mgmt": {
    "nome": "SAP Incentive Management",
    "tipo": "Incentivos",
    "oQueFaz": "SAP Incentive Management (Incentivos) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Comissões de força de vendas.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "information-steward": {
    "nome": "SAP Information Steward",
    "tipo": "DQ clássico",
    "oQueFaz": "SAP Information Steward (DQ clássico) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Perfilar e validar qualidade de dados on-prem.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "intelligent-agriculture": {
    "nome": "SAP Intelligent Agriculture",
    "tipo": "Agro",
    "oQueFaz": "SAP Intelligent Agriculture (Agro) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Talhões, safras e compliance agrícola.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "icsm": {
    "nome": "SAP Intelligent Clinical Supply Management",
    "tipo": "Ensaios clínicos",
    "oQueFaz": "SAP Intelligent Clinical Supply Management (Ensaios clínicos) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Kits clínicos e blinding.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "blackline-ic": {
    "nome": "SAP Intercompany Governance by BlackLine",
    "tipo": "Intercompany",
    "oQueFaz": "SAP Intercompany Governance by BlackLine (Intercompany) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Reconciliar IC no grupo.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "iq": {
    "nome": "SAP IQ",
    "tipo": "Colunar clássico",
    "oQueFaz": "SAP IQ (Colunar clássico) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "DWH clássico SAP Sybase.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Legado.",
      "cloud": "Atenuado.",
      "rise": "Atenuado."
    }
  },
  "joule-studio": {
    "nome": "SAP Joule Studio",
    "tipo": "Studio agentes",
    "oQueFaz": "Studio para criar skills e agentes Joule. A-Z e o post Alok. Esquema SCH-JOULE-STUDIO.",
    "paraQueServe": "Estender o Joule sem mexer no core.",
    "exemploReal": "A-Z: Joule Studio.",
    "nesteCenario": {
      "onprem": "Ausente.",
      "cloud": "Recomendado com Joule.",
      "rise": "Recomendado."
    }
  },
  "joule-consultants": {
    "nome": "SAP Joule for Consultants",
    "tipo": "IA consultores",
    "oQueFaz": "SAP Joule for Consultants (IA consultores) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Acelerar projectos Activate / RISE.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "joule-developers": {
    "nome": "Joule for developers",
    "tipo": "IA dev",
    "oQueFaz": "Joule for developers (IA dev) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Gerar e explicar código nas extensões.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "knowledge-central": {
    "nome": "SAP Knowledge Central by NICE",
    "tipo": "Knowledge CX",
    "oQueFaz": "SAP Knowledge Central by NICE (Knowledge CX) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Base de conhecimento no service desk.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "knowledge-graph": {
    "nome": "SAP Knowledge Graph",
    "tipo": "Grafo",
    "oQueFaz": "SAP Knowledge Graph (Grafo) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Relações semânticas para grounding do Joule.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "slt": {
    "nome": "SAP Landscape Transformation Replication Server",
    "tipo": "SLT",
    "oQueFaz": "SAP Landscape Transformation Replication Server (SLT) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Replicar ECC/S/4 para HANA, BW, CFIN, BTC.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    },
    "naoConfundir": "Não é o Sybase Replication Server (card replication-server)."
  },
  "lt": {
    "nome": "SAP Landscape Transformation",
    "tipo": "Conversão landscape",
    "oQueFaz": "SAP Landscape Transformation (Conversão landscape) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "M&A e carve-out de clientes SAP.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "learning-hub": {
    "nome": "SAP Learning Hub",
    "tipo": "Formação",
    "oQueFaz": "SAP Learning Hub (Formação) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Formação oficial SAP para o projecto.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "linear-asset": {
    "nome": "SAP Linear Asset Management",
    "tipo": "Activos lineares",
    "oQueFaz": "SAP Linear Asset Management (Activos lineares) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "EAM de infra-estruturas lineares.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "market-rates": {
    "nome": "SAP Market Rates Management",
    "tipo": "Tesouraria",
    "oQueFaz": "SAP Market Rates Management (Tesouraria) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Câmbios e curvas para TRM.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "meat-msg": {
    "nome": "SAP Meat and Fish Management by msg",
    "tipo": "Carne e peixe",
    "oQueFaz": "SAP Meat and Fish Management by msg (Carne e peixe) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Desossa, yield e catch weight.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "osta": {
    "nome": "SAP Omnichannel Sales Transfer and Audit",
    "tipo": "Retalho audit",
    "oQueFaz": "SAP Omnichannel Sales Transfer and Audit (Retalho audit) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Fechar o dia da loja contra o CAR/S/4.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "vistex-paybacks": {
    "nome": "SAP Paybacks and Chargebacks by Vistex",
    "tipo": "Chargebacks",
    "oQueFaz": "SAP Paybacks and Chargebacks by Vistex (Chargebacks) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Liquidar programas de canal.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "postgres-btp": {
    "nome": "PostgreSQL on SAP BTP",
    "tipo": "DB BTP",
    "oQueFaz": "PostgreSQL on SAP BTP (DB BTP) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "BD relacional das extensões CAP.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Ausente.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "vistex-price-hub": {
    "nome": "SAP Price Staging Hub by Vistex",
    "tipo": "Preço",
    "oQueFaz": "SAP Price Staging Hub by Vistex (Preço) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Staging de preços antes do S/4.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "prm": {
    "nome": "SAP Project and Resource Management",
    "tipo": "Projectos cloud",
    "oQueFaz": "SAP Project and Resource Management (Projectos cloud) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Staffing e projectos sem o PPM on-prem.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "digitalroute-rdo": {
    "nome": "SAP Revenue Data Orchestration by DigitalRoute",
    "tipo": "Uso / receita",
    "oQueFaz": "SAP Revenue Data Orchestration by DigitalRoute (Uso / receita) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Mediar eventos de uso até à factura.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "vistex-rights": {
    "nome": "SAP Rights and Royalty Management by Vistex",
    "tipo": "Royalties",
    "oQueFaz": "SAP Rights and Royalty Management by Vistex (Royalties) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Media, pharma e IP royalties.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "risk-assurance": {
    "nome": "SAP Risk and Assurance Management",
    "tipo": "GRC cloud",
    "oQueFaz": "SAP Risk and Assurance Management (GRC cloud) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Riscos e assurance no S/4 Cloud.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Atenuado.",
      "cloud": "Recomendado vs GRC on-prem.",
      "rise": "Recomendado."
    }
  },
  "secure-login": {
    "nome": "SAP Secure Login Service for SAP GUI",
    "tipo": "SSO GUI",
    "oQueFaz": "SAP Secure Login Service for SAP GUI (SSO GUI) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "SSO moderno no GUI em RISE.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "smartrecruiters": {
    "nome": "SmartRecruiters for SAP SuccessFactors",
    "tipo": "Recruiting",
    "oQueFaz": "SmartRecruiters for SAP SuccessFactors (Recruiting) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Recruiting moderno ligado ao SF.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "spend-analytics": {
    "nome": "SAP Spend Analytics",
    "tipo": "Analytics spend",
    "oQueFaz": "SAP Spend Analytics (Analytics spend) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Ver o gasto além do Ariba reporting.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "student-lm": {
    "nome": "SAP Student Lifecycle Management",
    "tipo": "Ensino",
    "oQueFaz": "SAP Student Lifecycle Management (Ensino) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Universidades: matrícula a diploma.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "territory-quota": {
    "nome": "SAP Territory and Quota",
    "tipo": "Territórios",
    "oQueFaz": "SAP Territory and Quota (Territórios) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Desenhar territórios no Sales Cloud.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "time-attendance": {
    "nome": "SAP Time and Attendance Management by WorkForce Software",
    "tipo": "Ponto",
    "oQueFaz": "SAP Time and Attendance Management by WorkForce Software (Ponto) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Relógio de ponto e turnos.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "twm": {
    "nome": "SAP Total Workforce Management",
    "tipo": "Workforce total",
    "oQueFaz": "SAP Total Workforce Management (Workforce total) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Ler SF + Fieldglass como uma força de trabalho.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "us-benefits": {
    "nome": "SAP U.S. Benefits Administration by Benefitfocus",
    "tipo": "Benefícios US",
    "oQueFaz": "SAP U.S. Benefits Administration by Benefitfocus (Benefícios US) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Open enrollment US.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "ui-logging": {
    "nome": "UI data protection logging",
    "tipo": "Audit UI",
    "oQueFaz": "UI data protection logging (Audit UI) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Quem viu o IBAN.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "knoa": {
    "nome": "SAP User Experience Management by Knoa",
    "tipo": "UX analytics",
    "oQueFaz": "SAP User Experience Management by Knoa (UX analytics) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Medir fricção no GUI/Fiori.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "utilities-core": {
    "nome": "SAP Utilities Core foundation",
    "tipo": "IS-U core",
    "oQueFaz": "SAP Utilities Core foundation (IS-U core) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Core IS-U (contrato, medição) além do Cloud for Energy.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "vc-pricing": {
    "nome": "SAP Variant Configuration and Pricing",
    "tipo": "VC / preço",
    "oQueFaz": "SAP Variant Configuration and Pricing (VC / preço) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Configurar produto + preço em runtime.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "vistex-vendor": {
    "nome": "SAP Vendor Program Management by Vistex",
    "tipo": "Programas fornecedor",
    "oQueFaz": "SAP Vendor Program Management by Vistex (Programas fornecedor) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Billbacks e programas lado compra.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  },
  "watch-list": {
    "nome": "SAP Watch List Screening",
    "tipo": "Screening",
    "oQueFaz": "SAP Watch List Screening (Screening) no portefólio SAP. Peça documentada no índice comercial A-Z e no help.sap.com; neste mapa é um satélite de mistura — não um motor autónomo do landscape.",
    "paraQueServe": "Filtrar parceiros contra listas oficiais.",
    "exemploReal": "Entrada no índice comercial A-Z da SAP (sap.com/products/a-z.html) e no help.sap.com/docs/all-products.",
    "nesteCenario": {
      "onprem": "Opcional.",
      "cloud": "Opcional.",
      "rise": "Opcional."
    }
  }
};
