// Tradução completa dos 248 serviços para inglês (nome/tipo/oQueFaz/
// paraQueServe/exemploReal/nesteCenario/naoConfundir), validada 1:1 contra
// os ids de SERVICOS em data.js. Nomes comerciais SAP mantêm-se como usados
// em inglês; ids/camada/cluster/ligaA nunca traduzem (vêm sempre de data.js).
const servicesEN = {
  aws: {
    nome: 'Amazon Web Services',
    tipo: 'IaaS',
    oQueFaz: "Amazon's hyperscaler. Provides compute, network, storage, regions and landing-zone services (Direct Connect, Transit Gateway, inspection VPCs). In RISE with SAP, the VPC running S/4HANA Cloud Private Edition is managed by SAP on top of AWS; the customer manages their own landing zone and interconnection with the SAP org. In GROW / Public Edition and on BTP, AWS is one of the regions where SAP publishes services.",
    paraQueServe: "Gives the digital core and platform elastic infrastructure without the customer administering the ERP's VMs under the RISE model. Also serves as a region for HANA Cloud, Integration Suite and BTP extensions. Typical mix: ERP on AWS-RISE and native AWS data lakes on the customer's own account, connected via Transit Gateway.",
    exemploReal: 'AWS publishes official cookbooks such as "RISE with SAP on AWS" and "Enterprise-ready network foundation for RISE with SAP": customer landing zone, Transit Gateway, attachment to the SAP-managed VPC, backup VPN and Direct Connect.',
    nesteCenario: {
      onprem: 'Not the ERP host. May exist as a cloud satellite of the company without being part of the SAP core. Card dimmed.',
      cloud: 'Possible region for BTP, HANA Cloud and S/4HANA Cloud Public Edition. Active if the selector is set to AWS.',
      rise: "One of three hyperscalers to choose from in the contract. SAP manages the S/4 VPC; the customer manages Direct Connect / Transit Gateway and the landing zone."
    }
  },
  azure: {
    nome: 'Microsoft Azure',
    tipo: 'IaaS',
    oQueFaz: "Microsoft's hyperscaler. Same role as AWS in the RISE/GROW model: IaaS under the SAP-managed S/4 and/or under BTP. ExpressRoute is the typical interconnection. Entra ID federates with SAP Cloud Identity Services for SSO across the whole suite. Many European customers already run on Microsoft; choosing Azure avoids a second identity/network stack.",
    paraQueServe: 'Host for RISE or BTP/Public Edition region when the company already lives in Microsoft 365 / Entra ID / ExpressRoute. The strong mix here is identity: Entra ID → IAS → S/4 + SuccessFactors + BTP + Work Zone.',
    exemploReal: 'Dominant pattern among European customers who federate Entra ID with SAP Cloud Identity Services and use ExpressRoute for the RISE VPC. Joint SAP/Microsoft documentation describes the peering between the customer subscription and the SAP-managed subscription.',
    nesteCenario: {
      onprem: 'Not the ERP host. Entra ID may already be the corporate IdP even on-premise. Card dimmed as IaaS.',
      cloud: 'Possible GROW region. Entra ID as the corporate IdP federated to IAS.',
      rise: "Hyperscaler by default in this app (selector starts on Azure). SAP manages the S/4 Private Edition; the customer manages ExpressRoute and the IdP."
    }
  },
  gcp: {
    nome: 'Google Cloud',
    tipo: 'IaaS',
    oQueFaz: 'Google\u2019s hyperscaler. In RISE, SAP manages a "SAP organization" (projects, VPC, Compute Engine, storage); the customer manages the "customer organization" and connectivity (Cloud Interconnect, shared VPC) from their own GCP org and on-premise. BTP and Public Edition also publish GCP regions.',
    paraQueServe: 'RISE host or BTP region when the company already has data/analytics gravity in Google Cloud. Typical mix: RISE on GCP + data services in the customer\u2019s org, without mixing SAP and customer responsibilities.',
    exemploReal: 'The public Google Cloud documentation "Overview of RISE with SAP on Google Cloud" describes the SAP organization vs customer organization model and the on-premise → Interconnect → RISE project patterns.',
    nesteCenario: {
      onprem: 'Not the ERP host. Card dimmed.',
      cloud: 'Possible region for BTP and Public Edition.',
      rise: 'Third hyperscaler to choose from. Switching the selector to GCP only changes this L0 card and the tooltip text.'
    }
  },
  'dc-onprem': {
    nome: 'Customer Data Center',
    tipo: 'On-prem',
    oQueFaz: 'Infrastructure run by the customer or a classic hoster/colocation provider: compute, storage, network, firewalls, backup. This is where ECC or S/4 any-premise, on-premise HANA, NetWeaver, PI/PO, Solution Manager, MES/OT and regulatory systems run, plus satellites the company doesn\u2019t yet want or can\u2019t place in the public cloud.',
    paraQueServe: 'In the on-premise preset this is the foundation of everything. In RISE it becomes the residual: shop-floor, OT, data that can\u2019t leave, systems being phased out. The right hybrid mix is residual DC + Cloud Connector + optionally Edge Integration Cell.',
    exemploReal: 'H.B. Fuller, on its RISE journey to S/4HANA Cloud Private Edition, avoided a physical data center and estimated around $200,000 in savings on that item alone, with a global instance across 123 countries and about $1.5 million avoided in legacy infrastructure.',
    nesteCenario: {
      onprem: 'Foundation card of L0. The whole core sits on top of it.',
      cloud: 'Not relevant as the Public Edition ERP host. Would only matter with the industry profile active (residual MES).',
      rise: 'Dimmed and residual. Surviving systems connect via Cloud Connector / EIC. If the sovereignty profile is active, compare with the Customer Data Center card.'
    }
  },
  'cdc-option': {
    nome: 'RISE Customer Data Center (CDC)',
    tipo: 'Sovereign IaaS',
    oQueFaz: 'RISE / SAP Cloud ERP Private option where the S/4 Private Edition is operated under a cloud model (contract, SLA, SAP or partner operation) but the hardware lives in a data center of the customer\u2019s choice \u2014 including HPE GreenLake and sovereign variants. Not classic on-premise: the operating model is cloud; data locality belongs to the customer.',
    paraQueServe: 'Mixing RISE benefits with sovereignty, latency or regulatory requirements that rule out a public hyperscaler. Regulated / sovereignty profile.',
    exemploReal: 'SAP documents SAP Cloud ERP Private, Customer Data Center Option. HPE GreenLake has been one of the routes used since the early days of RISE for customers who rule out AWS/Azure/GCP as a production anchor.',
    naoConfundir: 'Not the classic Customer Data Center. Not Public Edition. Not SAP Sovereign Cloud / NS2 / EU AI Cloud.',
    nesteCenario: {
      onprem: 'Not relevant. Classic on-premise is not CDC.',
      cloud: 'Not relevant. GROW Public Edition has no CDC option.',
      rise: 'Optional. Active and recommended only with the regulated profile.'
    }
  },
  sci: {
    nome: 'SAP Cloud Infrastructure (SCI)',
    tipo: 'Sovereign IaaS',
    oQueFaz: "IaaS operated by SAP itself, built with open-source technologies (OpenStack + Kubernetes) across SAP's global data center network \u2014 NOT AWS, Azure or GCP. Compute (VMs/flavors), block/object/file storage, SDN, load balancing, DNSaaS, identity/key management, container registry. Lineage: SAP Converged Cloud (2015) \u2192 SAP Cloud Infrastructure. In 2025 SAP reported around 15 regions, 29 data centers, over 200,000 VMs. In Europe it is the IaaS option for SAP Sovereign Cloud: data hosted in the EU (Walldorf, St. Leon-Rot, Frankfurt colocation), three availability zones, ISO 27001 IT-Grundschutz certification (Apr 2026), VS-NfD (Jun 2026), BSI C5 Type II, KRITIS/NIS 2. Foundation of the EU AI Cloud (AI models on the SCI + BTP abstraction, with no dependency on an American hyperscaler).",
    paraQueServe: "Running S/4HANA Cloud, BTP, HANA Cloud and customer workloads when sovereignty rules out AWS/Azure/GCP. Regulated mix: SCI + Sovereign Cloud + BTP + S/4 + Cloud ALM. An alternative in the same L0 slot as the three hyperscalers and the CDC / On-Site option.",
    exemploReal: 'sap.com lists SAP Cloud Infrastructure as a pillar of Sovereign Cloud. Wikipedia and the EU AI Cloud announcement (Nov 2025) describe SCI as SAP IaaS with no dependency on hyperscaler technology. HANA Cloud documentation lists SCI as supported infrastructure.',
    naoConfundir: 'NOT SAP Cloud Integration (the old name for the iFlow engine in Integration Suite, sometimes also abbreviated SCI/CPI). NOT BTP (BTP is PaaS). NOT the classic Customer Data Center. NOT NS2 (NS2 is the US / National Security Services route).',
    nesteCenario: {
      onprem: 'Not relevant as the on-premise ERP host. Card dimmed.',
      cloud: 'Optional. Active when the L0 selector is set to SCI or the regulated profile is on. GROW/Public Edition can be published on SCI in sovereign regions.',
      rise: 'Optional / recommended with the regulated profile. RISE/Private Edition on SAP IaaS instead of an American hyperscaler.'
    }
  },
  'sovereign-cloud': {
    nome: 'SAP Sovereign Cloud',
    tipo: 'Sovereignty portfolio',
    oQueFaz: 'A portfolio, not a VM. Four dimensions: data, operational, legal and technical sovereignty. Three deployment routes: (1) SAP Cloud Infrastructure \u2014 SAP IaaS; (2) Sovereign Cloud On-Site \u2014 infrastructure operated by SAP in a data center chosen by the customer; (3) sovereign hyperscaler / NS2. Public availability referenced in the US (NS2), Australia, Canada, India, New Zealand, the UK, Germany, France and other European countries. EU AI Cloud (2025) brings together the European sovereign stack (SCI + BTP + AI Foundation, Mistral partnership).',
    paraQueServe: 'Choosing the LEVEL of sovereignty, not just where the VMs sit. Mix: the regulated profile links this card to SCI, or to CDC/On-Site, or to NS2.',
    exemploReal: "SAP's official Sovereign Cloud page and the EU AI Cloud announcement from November 2025. Announced investment of several billion euros in Europe, including \u20ac2 billion in Germany.",
    naoConfundir: "Not a fourth hyperscaler. It is the commercial/compliance umbrella. The concrete IaaS in Europe is the SCI card.",
    nesteCenario: {
      onprem: 'Dimmed (on-premise sovereignty is the customer\u2019s DC, not this portfolio).',
      cloud: 'Optional, active with the regulated profile.',
      rise: 'Optional, active with the regulated profile.'
    }
  },
  ns2: {
    nome: 'SAP NS2 (National Security Services)',
    tipo: 'US sovereignty',
    oQueFaz: 'US route of Sovereign Cloud: operated by SAP National Security Services on approved infrastructure (incl. AWS GovCloud). Personnel, clearances and data residency aligned with US public-sector and defense requirements. HANA Cloud was announced on NS2.',
    paraQueServe: 'US government / defense customers. In Europe the equivalent conversation is SCI + Sovereign Cloud, not NS2.',
    exemploReal: 'SAP blog: HANA Cloud on Sovereign Cloud and NS2. sap.com lists NS2 as the US route of the sovereign portfolio.',
    naoConfundir: 'Not SCI. SCI is European/global SAP IaaS across SAP data centers. NS2 is the US entity and operating model.',
    nesteCenario: {
      onprem: 'Not relevant.',
      cloud: 'Optional, only with the regulated profile and a US context.',
      rise: 'Optional, only with the regulated profile and a US context.'
    }
  },
  'hana-onprem': {
    nome: 'SAP HANA (on-premise)',
    tipo: 'DB',
    oQueFaz: 'In-memory database installed and operated in the customer\u2019s data center. Transactional and analytical engine for on-premise S/4HANA and BW/4HANA. The customer owns sizing, HA/DR, patches, backups and encryption. Without HANA, on-premise S/4 doesn\u2019t run. The Help portal also documents HANA Live, HANA express edition and SAP HANA Cloud Services as a separate line, plus SAP IQ, SAP ASE, SAP MaxDB, SAP SQL Anywhere and SAP on IBM Db2 / SQL Server as the AnyDB engines of the classic ECC world.',
    paraQueServe: 'Real-time processing on the same engine under fully in-house operation. Typical on-premise mix: HANA + S/4 any-premise + BW/4 + Solution Manager.',
    exemploReal: 'Shell used S/4HANA on HANA as a real-time financial digital core (Central Finance) \u2014 a classic on-premise or hosted pattern from before the RISE wave.',
    nesteCenario: {
      onprem: 'Core database. Active card.',
      cloud: 'Replaced by HANA Cloud and by the Public Edition\u2019s managed HANA.',
      rise: 'The HANA under S/4 Private Edition is operated by SAP on the hyperscaler and doesn\u2019t appear as this card. This card only remains if BW or sidecars stay in the DC.'
    }
  },
  'hana-cloud': {
    nome: 'SAP HANA Cloud',
    tipo: 'DBPaaS',
    oQueFaz: 'HANA as a managed service on BTP: in-memory relational engine, data lake, multi-model (graph, spatial, JSON). Persistence for side-by-side extensions (CAP, Build, ABAP Cloud) and for analytical workloads that shouldn\u2019t live in Z-tables inside S/4. Distinct from the HANA embedded in S/4 Cloud \u2014 this card is the HANA the customer provisions on BTP. Help: SAP HANA Cloud Services and SAP HANA Cloud in CN Regions.',
    paraQueServe: 'Materializing the clean core: the new app writes to HANA Cloud, S/4 stays standard. Also feeds Datasphere, SAC and near-real-time scenarios.',
    exemploReal: 'Ferrara Candy ran RISE S/4HANA Cloud Private Edition powered by BTP; extensions and real-time integration patterns sit on managed BTP data services rather than deep custom ABAP in the core.',
    nesteCenario: {
      onprem: 'Absent. The equivalent is on-premise HANA.',
      cloud: 'Active. Persistence for extensions and analytics in GROW.',
      rise: 'Active. RISE BTP credits typically cover normal usage. Not to be confused with the managed HANA underneath S/4 Private Edition.'
    }
  },
  datasphere: {
    nome: 'SAP Datasphere',
    tipo: 'Data Fabric',
    oQueFaz: 'Business-data semantic layer. Direct successor of the product formerly called SAP Data Warehouse Cloud (DWC / product-DwC). Help: Datasphere and Datasphere, SAP BW Bridge. Joins SAP and non-SAP data with or without replication, organizes it into spaces, offers Data Builder and Business Builder, and has BW Bridge to reuse BW models. It\u2019s the fabric piece inside Business Data Cloud.',
    paraQueServe: 'Having a governed model for finance, supply chain and HR without copying the whole ERP into a classic warehouse. Semantic source for SAC and for data products that Joule agents consume.',
    exemploReal: 'SAP reference architecture: Datasphere + SAC + BW/4 in hybrid mode. Customers with BW investment use BW Bridge to avoid discarding transformations and extractors.',
    naoConfundir: 'The historical DWC/DwC acronym for THIS product is Data Warehouse Cloud. It is NOT Deploy with Confidence (id dwc).',
    nesteCenario: {
      onprem: 'Dimmed. Can consume on-premise HANA/BW via DP Agent, but is not the default for the classic scenario.',
      cloud: 'Active. Strategic data warehouse / fabric for Public Cloud.',
      rise: 'Active. Part of Business Data Cloud and the analytical path of the RISE landscape.'
    }
  },
  bdc: {
    nome: 'SAP Business Data Cloud',
    tipo: 'Data + AI',
    oQueFaz: 'Offering that unifies Datasphere, SAP Analytics Cloud and the data foundation for Business AI / Joule. Publishes curated data products (data + metadata + SAP process semantics) for applications and agents. It\u2019s the context layer of the Business AI Platform (BTP + Business Data Cloud + AI Foundation).',
    paraQueServe: 'Stopping enterprise AI from working without process context. Mix: S/4 + LoB generate data \u2192 BDC/Datasphere governs \u2192 Joule and intelligent apps consume.',
    exemploReal: 'At SAP Sapphire 2026, SAP positioned Business Data Cloud + BTP + AI Foundation as the single roof of the Business AI Platform. H&M demonstrated a Store Intelligence Agent on RISE + Business Data Cloud + Commerce Cloud + SuccessFactors.',
    nesteCenario: {
      onprem: 'Not relevant in the classic on-premise default.',
      cloud: 'Active when the customer adopts GROW\u2019s data+AI stack.',
      rise: 'Active. Context foundation for Joule and agents in the RISE landscape.'
    }
  },
  bw4: {
    nome: 'SAP BW/4HANA',
    tipo: 'Data Warehouse',
    oQueFaz: 'Enterprise data warehouse on HANA, successor to BW 7.x. LSA++ modeling, SAP extractors, process chains, queries. Still alive in thousands of customers. In the cloud, the strategic path is Datasphere + BW Bridge, not an everlasting BW.',
    paraQueServe: 'Group reporting, heavy staging, historical data compliance. Typical hybrid mix: on-premise or managed BW/4 + Datasphere in the cloud + SAC on top.',
    exemploReal: 'NEOM combined S/4HANA + Ariba + BW/4HANA + SAC to track billions in construction spend with near-real-time operational reporting.',
    nesteCenario: {
      onprem: 'Default warehouse if the customer is already a classic SAP analytics shop. Active.',
      cloud: 'Dimmed. Strategic destination = Datasphere. BW Bridge is the bridge, not the endpoint.',
      rise: 'Optional / dimmed. Many RISE customers keep BW/4 for years while gradually offloading models to Datasphere.'
    }
  },
  businessobjects: {
    nome: 'SAP BusinessObjects',
    tipo: 'Classic BI',
    oQueFaz: 'Classic BI platform. Help: BusinessObjects Business Intelligence Platform, Dashboards, Design Studio, Explorer, Live Office, Crystal Server, Financial Information Management, Intercompany, Profitability and Cost Management, Predictive Workbench by IBM. Still serves millions of reports at on-premise ECC/S/4 customers. Strategic destination for new reporting is SAP Analytics Cloud.',
    paraQueServe: 'Keeping the WeBI/Crystal estate running while the SAC + Datasphere target is built. Honest mix: legacy BOBJ + SAC for new work + BW/4 in between.',
    exemploReal: '\u0160KODA AUTO used BusinessObjects for real-time executive reporting \u2014 a classic case of the BOBJ estate still in production at industrial groups.',
    nesteCenario: {
      onprem: 'Active as classic BI, especially with the legacy toggle on.',
      cloud: 'Hidden / legacy. New reporting is born in SAC.',
      rise: 'Legacy. Visible with the toggle. Typical plan: coexistence and phase-out towards SAC.'
    }
  },
  papm: {
    nome: 'SAP PaPM',
    tipo: 'Profitability',
    oQueFaz: 'Profitability and Performance Management. Help: SAP Profitability and Performance Management and SAP Profitability and Performance Management Cloud. Allocations, costing, product/customer profitability beyond classic CO. Distinct from SAC Planning and BPC.',
    paraQueServe: 'Where cost actually lands. Mix: S/4 CO produces \u2192 PaPM allocates \u2192 SAC presents.',
    exemploReal: 'All Products separates PaPM, PaPM Cloud, BPC, PCM (Profitability and Cost Management BOBJ) and SAC \u2014 four generations of the same business question.',
    nesteCenario: {
      onprem: 'Optional / active in advanced controlling.',
      cloud: 'Optional (PaPM Cloud).',
      rise: 'Optional.'
    }
  },
  bpc: {
    nome: 'SAP BPC',
    tipo: 'Legacy planning',
    oQueFaz: 'Business Planning and Consolidation. Classic planning and close on top of BW. Strategic destination: SAC Planning + Group Reporting in S/4. Stays on the map because it\u2019s still the planning engine for many groups.',
    paraQueServe: 'Budgeting and consolidation while the cloud target isn\u2019t live yet. Exit mix: BPC \u2192 SAC Planning + Group Reporting.',
    exemploReal: 'All Products entry: Business Planning and Consolidation. Coexists with Analysis for Microsoft Office as a classic Excel client.',
    nesteCenario: {
      onprem: 'Active with the legacy toggle.',
      cloud: 'Hidden. Target = SAC.',
      rise: 'Legacy. Visible with the toggle.'
    }
  },
  'analysis-office': {
    nome: 'SAP Analysis for Microsoft Office',
    tipo: 'Excel BI',
    oQueFaz: 'Excel/PowerPoint add-in for BW, HANA and, in recent generations, SAC queries. Help: Analysis for Microsoft Office and Analytics Cloud add-in for Microsoft PowerPoint. It\u2019s where the controller keeps working when they don\u2019t open SAC.',
    paraQueServe: 'Heavy tabular analysis. Mix: BW/4 or SAC as the source \u2192 Analysis as the client.',
    exemploReal: 'Standalone product in All Products, Analytics family, distinct from web SAC.',
    nesteCenario: {
      onprem: 'Active.',
      cloud: 'Optional (SAC add-in).',
      rise: 'Optional.'
    }
  },
  'data-services': {
    nome: 'SAP Data Services',
    tipo: 'ETL',
    oQueFaz: 'Classic ETL/ELT and data quality engine from the EIM family. Help: Data Services, Data Quality Management, Information Steward, Agile Data Preparation, Data Hub. Still feeds BW, HANA and non-SAP targets in on-premise landscapes. Strategic destination for new pipelines: Integration Suite + Datasphere / residual Data Intelligence.',
    paraQueServe: 'Extracting, cleaning and loading master and transactional data. Brownfield mix: Data Services + Information Steward governing quality + BW/4 or Datasphere as the target.',
    exemploReal: 'Classic SAP EIM estate: Data Services + Information Steward + Data Quality Management listed as distinct products in All Products.',
    nesteCenario: {
      onprem: 'Active with the legacy toggle / classic EIM.',
      cloud: 'Dimmed. New pipelines are born in Datasphere / Integration Suite.',
      rise: 'Legacy. Visible with the toggle. Typical plan: phase-out towards Datasphere + Suite.'
    }
  },
  'data-intelligence': {
    nome: 'SAP Data Intelligence',
    tipo: 'Data pipeline',
    oQueFaz: 'Orchestration of data and ML pipelines (conceptual successor of Data Hub). Help: Data Intelligence, Data Ingestion for Industry Cloud Solutions. For many customers it was the bridge between the lake and S/4 before Business Data Cloud. Strategic destination: Datasphere + BDC + AI Foundation.',
    paraQueServe: 'Orchestrating complex SAP/non-SAP flows and notebooks. Transitional mix: Data Intelligence running alongside Datasphere until the pipeline is rewritten.',
    exemploReal: 'Data Hub and Data Intelligence both appear in All Products; SAP is pushing new workloads towards Datasphere / BDC.',
    nesteCenario: {
      onprem: 'Optional / active legacy.',
      cloud: 'Dimmed. Target = Datasphere + BDC.',
      rise: 'Dimmed. Coexistence possible during the transition.'
    }
  },
  ilm: {
    nome: 'SAP Information Lifecycle Management',
    tipo: 'Archiving / retention',
    oQueFaz: 'Retention, blocking and destruction of personal and tax data (GDPR), document archiving. Help: Information Lifecycle Management, File Lifecycle Management, Archiving and Document Access by OpenText, Content Management Core by OpenText, Extended ECM by OpenText, Data Custodian. Complements S/4: the ERP creates the document; ILM decides how long it lives.',
    paraQueServe: 'Not keeping forever what the law requires you to delete. Regulated mix: S/4 + ILM + OpenText + GRC.',
    exemploReal: 'The ILM + OpenText family in All Products is the de facto archiving standard for audited European SAP groups.',
    nesteCenario: {
      onprem: 'Active in regulated landscapes.',
      cloud: 'Optional (retention in Public Edition + archiving services).',
      rise: 'Optional, recommended with the regulated profile.'
    }
  },
  btp: {
    nome: 'SAP BTP',
    tipo: 'PaaS',
    oQueFaz: 'Business Technology Platform. Single roof for integration, data, extensibility, automation, identity and AI. The official home of clean core: differentiation leaves S/4 and is born here (CAP, ABAP Cloud, Build, Kyma, Cloud Foundry). Commercially delivered via credits (RISE), subscription or consumption. Not a single service \u2014 it\u2019s the platform hosting dozens of Discovery Center services.',
    paraQueServe: 'Mixing a stable core with fast innovation. Golden rule: standard S/4 + side-by-side BTP + Integration Suite in between. In classic on-premise, BTP is an island; in GROW/RISE it\u2019s structural.',
    exemploReal: 'Ferrara Candy: RISE S/4 Private Edition powered by BTP, big-bang go-live across 25 modules, over 98% master-data quality. Southwest Gas: BTP + SuccessFactors LMS to validate field technician certifications via QR code on the phone.',
    nesteCenario: {
      onprem: 'Dimmed. May exist as an innovation island without being the landscape default.',
      cloud: 'Active. Extension and integration platform for GROW. Without BTP, Public Edition can\u2019t extend in an upgrade-safe way.',
      rise: 'Active and structural. Clean core = custom code leaves S/4 for BTP. Cloud ALM governs the lifecycle. BTP credits come in the RISE envelope.'
    }
  },
  build: {
    nome: 'SAP Build',
    tipo: 'Dev + Low-code',
    oQueFaz: 'Unified development family on BTP. Help: Build, Build Code, Build Process Automation, Build Process Automation foundation add-on by UiPath, Build Work Zone standard edition, Business Application Studio, Business Application Factory, Application Frontend Service, AppGyver (historical low-code line).',
    paraQueServe: 'Extra Fiori, portals, approval workflows, microservices and mobile apps without user-exits or Z-reports in S/4. Mix with Signavio: the target process is born in Signavio; automation that doesn\u2019t fit the standard is born in Build Process Automation.',
    exemploReal: 'Hitachi High-Tech reported a 94% reduction in customization footprint. Gerdau used Build + Integration Suite + S/4 for 50% faster onboarding.',
    nesteCenario: {
      onprem: 'Dimmed / absent by default.',
      cloud: 'Active. Extension tool for Public Edition.',
      rise: 'Active. Preferred destination for custom code that Cloud ALM classifies as outside the core.'
    }
  },
  workzone: {
    nome: 'SAP Build Work Zone',
    tipo: 'UX / Launchpad',
    oQueFaz: 'Digital workplace. Help distinguishes SAP Work Zone / SAP Build Work Zone advanced edition (IT workplace) from SAP SuccessFactors Work Zone (employee HR experience). This card is Build Work Zone. Single entry point for S/4 Fiori, BTP apps, SuccessFactors, Ariba and third-party apps. Conceptually replaces the SAP Enterprise Portal.',
    paraQueServe: 'One URL for the end user. UX mix: IAS authenticates \u2192 Work Zone aggregates \u2192 S/4 + LoB + Build extensions appear as tiles.',
    exemploReal: 'PwC unified over 100,000 professionals across 19 countries on a single SAP cloud core \u2014 the single-entry-point pattern that Work Zone materializes.',
    nesteCenario: {
      onprem: 'Dimmed. The classic equivalent is Fiori Launchpad / Enterprise Portal in the DC.',
      cloud: 'Active. GROW\u2019s UX shell.',
      rise: 'Active. Recommended entry point for the hybrid landscape.'
    }
  },
  ias: {
    nome: 'SAP Cloud Identity Services',
    tipo: 'IdP / IAM',
    oQueFaz: 'Identity Authentication (IAS) + Identity Provisioning (IPS). SSO and user lifecycle across S/4 Cloud, BTP, SuccessFactors, Ariba, Concur, Fieldglass and the corporate IdP (Entra ID, Okta). Help also lists classic SAP Single Sign-On and Decentralized Identity Verification. Distinct from IAG (SoD governance) and Customer Data Cloud (end consumer).',
    paraQueServe: 'One corporate login for the suite and automatic provisioning of accounts and roles. Mandatory mix in GROW and RISE.',
    exemploReal: 'Component included in the RISE / S/4HANA Cloud tenant. Almost every cloud landscape federates the corporate IdP (very often Entra ID on Azure) to IAS.',
    nesteCenario: {
      onprem: 'Dimmed. Only comes in if cloud islands already exist.',
      cloud: 'Active. IdP for the Public Edition suite.',
      rise: 'Active. Identity for S/4 Private Edition + BTP + LoB.'
    }
  },
  'abap-env': {
    nome: 'SAP BTP ABAP Environment',
    tipo: 'Runtime',
    oQueFaz: 'Steampunk. Help: BTP ABAP environment, ABAP Cloud, ABAP Development Tools for Eclipse, Landscape Portal for SAP S/4HANA Cloud ABAP environment. ABAP Cloud on BTP, on top of HANA Cloud. Lets you rewrite or start ABAP extensions outside S/4, with released APIs, RAP and Fiori.',
    paraQueServe: 'Taking Z code out of the core without losing ABAP expertise. Brownfield mix: ATC in S/4 classifies custom code \u2192 differentiation moves to ABAP Environment or CAP \u2192 Cloud ALM tracks the BTP deployment.',
    exemploReal: "SAP's Clean Core model uses the ABAP Environment as the side-by-side destination for RAP extensions. Hitachi High-Tech (94% less customization) is the resulting pattern.",
    nesteCenario: {
      onprem: 'Absent. ABAP lives in NetWeaver / S/4 any-premise.',
      cloud: 'Active as the extension runtime for Public Edition.',
      rise: 'Active. One of BTP\u2019s three strategic runtimes in RISE.'
    }
  },
  'runtimes-btp': {
    nome: 'BTP Runtimes (Cloud Foundry + Kyma)',
    tipo: 'Runtime',
    oQueFaz: "BTP's two polyglot runtimes. Cloud Foundry for CAP, Node, Java, Python apps. Kyma for managed Kubernetes. Help: Cloud Application Programming Model, Cloud SDK, Cloud Platform (historical name).",
    paraQueServe: 'Running extensions that aren\u2019t ABAP: shop-floor connectors, public APIs, event workers, HTML5 frontends. Industry mix: Kyma + Event Mesh + Cloud Connector / EIC for OT telemetry without touching S/4.',
    exemploReal: 'BTP developer documentation recommends CF for most CAP extensions and Kyma when Kubernetes or event-driven workloads are needed.',
    nesteCenario: {
      onprem: 'Absent.',
      cloud: "Active. CF is the default for GROW extensions.",
      rise: 'Active. CF by default; Kyma when the industry profile or microservice volume justifies it.'
    }
  },
  'ai-foundation': {
    nome: 'SAP AI Foundation',
    tipo: 'AI',
    oQueFaz: 'Governance and AI runtime layer on BTP. Help: AI Core, AI Launchpad, AI Business Services, Joule for Developers ABAP AI Capabilities, CX AI Toolkit, CXAI, Intelligent Situation Automation, Intelligent Technologies. Not the copilot itself (that\u2019s Joule); it\u2019s the shop floor where AI agents and extensions are built, published and governed.',
    paraQueServe: 'Mixing AI with process without prompt shadow-IT. Joule is the face; AI Foundation is the engine and the governance. Cloud ALM observes agents at this layer.',
    exemploReal: 'Sapphire 2026: Business AI Platform = BTP + Business Data Cloud + AI Foundation, with Knowledge Graph and Joule Studio 2.0. H&M used this foundation for the Store Intelligence Agent.',
    nesteCenario: {
      onprem: 'Not relevant by default.',
      cloud: "Active in GROW's AI stack.",
      rise: 'Active. Foundation for the Joule assistants contractually included in RISE year one.'
    }
  },
  iag: {
    nome: 'SAP Cloud Identity Access Governance',
    tipo: 'IAM / cloud SoD',
    oQueFaz: 'Cloud access governance: SoD, access requests, reviews. Help: Cloud Identity Access Governance. Complements IAS (who you are) and GRC Access Control (on-premise estate). IAG is the cloud-first route to SoD over S/4 Cloud, BTP and LoB.',
    paraQueServe: 'SoD without classic SolMan/GRC. Regulated mix: IAS authenticates \u2192 IAG governs access \u2192 on-premise GRC only for the residual.',
    exemploReal: 'Its own entry in All Products, Identity family, distinct from Cloud Identity Services.',
    nesteCenario: {
      onprem: 'Dimmed (GRC Access Control).',
      cloud: 'Recommended with the regulated profile.',
      rise: 'Recommended with the regulated profile.'
    }
  },
  'sap-start': {
    nome: 'SAP Start / Mobile Start',
    tipo: 'UX',
    oQueFaz: 'Mobile entry point / suite home. Help: SAP Start, SAP Mobile Start and SAP Task Center. Lighter than Work Zone advanced: cards, approvals, Joule on the phone.',
    paraQueServe: 'Mobile adoption without a heavy portal. Mix: IAS \u2192 Start/Mobile Start \u2192 Task Center \u2192 S/4 and LoB apps.',
    exemploReal: 'Three entries in All Products: SAP Start, Mobile Start, Task Center. Work Zone remains the full workplace.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: "Active as GROW's mobile companion.",
      rise: 'Active as the mobile companion.'
    }
  },
  'enterprise-portal': {
    nome: 'SAP Enterprise Portal (legacy)',
    tipo: 'Legacy UX',
    oQueFaz: 'Classic NetWeaver portal (iViews, KM, roles). Help: Enterprise Portal and NetWeaver Portal Enterprise Workspaces. Destination: on-premise Fiori Launchpad or Build Work Zone.',
    paraQueServe: 'Explaining where the SAP portals a customer still has came from. Legacy toggle.',
    exemploReal: 'Any ECC landscape with Portal serving as the SAP intranet. The typical migration is Portal \u2192 Fiori Launchpad \u2192 Work Zone.',
    nesteCenario: {
      onprem: 'Active legacy with the toggle.',
      cloud: 'Hidden.',
      rise: 'Hidden / legacy.'
    }
  },
  lama: {
    nome: 'SAP Landscape Management',
    tipo: 'Landscape ops',
    oQueFaz: 'Automation of SAP system operations: copy, refresh, start/stop, mass operations. Help: SAP Landscape Management Cloud and SAP IT Infrastructure Management. Complements Cloud ALM (which doesn\u2019t do a system copy of an on-premise S/4).',
    paraQueServe: 'Refreshing QA from PRD, cloning for projects. Dual on-premise / RISE mix: LaMa operates the systems the customer still controls; Cloud ALM operates the cloud run.',
    exemploReal: 'LaMa Cloud and on-premise LaMa are both listed in All Products. Service providers and SAP competence centers use LaMa for large system farms.',
    nesteCenario: {
      onprem: 'Optional / active in large SAP farms.',
      cloud: 'Not relevant in typical GROW (SAP operates the tenant).',
      rise: 'Optional for residual systems in the customer DC.'
    }
  },
  cal: {
    nome: 'SAP Cloud Appliance Library',
    tipo: 'Lab',
    oQueFaz: 'Catalog of pre-installed SAP appliances on a hyperscaler for trials, POCs and sandboxes. Help: Cloud Appliance Library. Not RISE production; it\u2019s where you experiment with S/4, BTP and add-ons without waiting for a project.',
    paraQueServe: 'Quick proofs of concept. Educational mix: CAL to experiment \u2192 Signavio to decide the to-be \u2192 RISE/GROW to produce.',
    exemploReal: 'Entry in All Products. Pre-sales teams and SAP academies use CAL as a standard lab.',
    nesteCenario: {
      onprem: 'Optional as a cloud sandbox alongside the DC.',
      cloud: 'Optional for POCs before the GROW contract.',
      rise: 'Optional for a sandbox outside the production contract.'
    }
  },
  'integration-suite': {
    nome: 'SAP Integration Suite',
    tipo: 'EiPaaS',
    oQueFaz: 'iPaaS on BTP, strategic successor to PI/PO (standard PI/PO maintenance until December 2027). Capabilities: Cloud Integration (iFlows), API Management, Event Mesh, Integration Advisor, Open Connectors, Trading Partner Management, Integration Assessment, Migration Assessment. Help also lists API Business Hub / Business Accelerator Hub, Application Interface Framework and Managed Gateway for Spend as a sibling piece. Edge Integration Cell is the associated hybrid runtime.',
    paraQueServe: "A2A, B2B/EDI, B2G and events between SAP and non-SAP. RISE includes a messaging baseline; landscapes with many external systems almost always need extra capacity.",
    exemploReal: 'Jabil uses Integration Suite + BTP as its global backbone, with an API + events pattern. Nu Skin cut integration build time from weeks to days. FC Bayern consolidated 52 systems.',
    nesteCenario: {
      onprem: 'Dimmed. The default middleware is PI/PO; the Suite may already exist as a migration island.',
      cloud: 'Active. iPaaS for GROW / Public Edition.',
      rise: 'Active. Baseline included in RISE. Cloud ALM monitors iFlows. Official destination for the PI/PO migration.'
    }
  },
  'event-mesh': {
    nome: 'SAP Event Mesh',
    tipo: 'EDA',
    oQueFaz: 'Event broker on BTP. S/4 publishes business events. Consumers on BTP, LoB or third parties subscribe. Replaces the reflex of synchronous point-to-point RFC. For enterprise multi-region scale, see the Advanced Event Mesh card. Help also lists Event Stream Processor and Event Insight as a historical line.',
    paraQueServe: 'Decoupling the core. Correct mix in RISE/Public: S/4 publishes the event \u2192 Event Mesh \u2192 Build/Kyma extension or iFlow.',
    exemploReal: 'SAP-recommended pattern for S/4HANA Cloud and RISE. Jabil describes the move to an API + event-based architecture as the landscape\u2019s official direction.',
    nesteCenario: {
      onprem: 'Absent by default (IDocs, RFC, PI).',
      cloud: "Active. Decoupling pattern for Public Edition.",
      rise: "Active. Private Edition business events consumed by BTP extensions."
    }
  },
  'advanced-event-mesh': {
    nome: 'SAP Integration Suite, Advanced Event Mesh',
    tipo: 'Enterprise EDA',
    oQueFaz: 'Enterprise-scale event mesh, documented in Help as its own product. Multi-region, massive fan-out, external partners. Event Mesh covers the S/4 \u2192 BTP pattern; Advanced Event Mesh covers the company\u2019s event backbone.',
    paraQueServe: 'When volume or topology outgrows the standard Event Mesh.',
    exemploReal: 'A distinct line in All Products and the Discovery Center.',
    nesteCenario: {
      onprem: 'Absent.',
      cloud: 'Optional.',
      rise: 'Optional, recommended with the industry profile and heavy EDA.'
    }
  },
  eic: {
    nome: 'Edge Integration Cell',
    tipo: 'Hybrid runtime',
    oQueFaz: "Integration Suite runtime that runs in the customer's private landscape, on Kubernetes. The iFlow is designed and monitored in the cloud; execution and data stay on-premise. Help also lists Edge Lifecycle Management.",
    paraQueServe: 'Regulated hybrid or shop-floor mix: iPaaS governance in the cloud, payload staying in-house. Complements Cloud Connector (the Connector is a tunnel; EIC is a full integration runtime).',
    exemploReal: 'AWS/SAP reference architecture for RISE: EIC in high availability in the customer landing zone.',
    nesteCenario: {
      onprem: 'Absent.',
      cloud: 'Rare. Only with the industry/regulated profile.',
      rise: 'Optional by default, recommended with the industry or regulated profile.'
    }
  },
  'cloud-connector': {
    nome: 'SAP Cloud Connector',
    tipo: 'Connectivity',
    oQueFaz: "Secure outbound tunnel from the customer's data center to BTP. Doesn't open an inbound firewall port. Exposes RFC, OData and HTTP from on-premise systems to BTP extensions and iFlows in a controlled way. Help also lists Corporate Connectivity for Banking and Connector for Multi-Bank Connectivity as domain connectors.",
    paraQueServe: 'Any honest hybrid mix. Without Cloud Connector, BTP extensions can\u2019t reach the residual ECC/S/4 or the MES.',
    exemploReal: 'Standard component of every hybrid RISE cookbook on AWS, Azure and GCP.',
    nesteCenario: {
      onprem: 'Absent in pure on-premise.',
      cloud: 'Optional. Active if any on-premise satellites remain.',
      rise: 'Active in most real-world RISE deployments.'
    }
  },
  pipo: {
    nome: 'SAP PI/PO (legacy)',
    tipo: 'On-prem middleware',
    oQueFaz: 'Process Integration / Process Orchestration. Classic A2A middleware on NetWeaver. Strategic destination is Integration Suite. End of standard maintenance: December 2027.',
    paraQueServe: 'Keeping the on-premise landscape talking to itself. RISE mix: mandatory Migration Assessment workstream PI/PO \u2192 Integration Suite.',
    exemploReal: 'Most RISE programs include an explicit PI/PO \u2192 Integration Suite workstream.',
    nesteCenario: {
      onprem: 'Default middleware. Active card.',
      cloud: 'Hidden.',
      rise: 'Legacy, being phased out. Visible dimmed with the toggle or the brownfield profile.'
    }
  },
  'managed-gateway': {
    nome: 'Managed Gateway (ex-Ariba CIG)',
    tipo: 'Spend gateway',
    oQueFaz: 'Help: SAP Integration Suite, Managed Gateway for Spend Management and SAP Business Network (formerly Ariba Cloud Integration Gateway). Pre-built S/4 \u2194 Ariba / Business Network / Fieldglass content.',
    paraQueServe: 'Not reinventing iFlows for PO, GR, invoice, supplier. Spend mix: S/4 + Ariba + Network all go through this gateway.',
    exemploReal: 'Help still has an Ariba Cloud Integration Gateway entry pointing to the new name in Integration Suite.',
    nesteCenario: {
      onprem: 'Dimmed (classic CIG / SRM add-ons).',
      cloud: 'Active with the spend profile.',
      rise: 'Active with the spend profile.'
    }
  },
  'multi-bank': {
    nome: 'SAP Multi-Bank Connectivity',
    tipo: 'Banking',
    oQueFaz: "Multi-bank network. Help: SAP Multi-Bank Connectivity and Connector for SAP Multi-Bank Connectivity. Connects S/4 to dozens of banks without a per-bank middleware. Help still lists Bank Communication Management as an on-premise ancestor.",
    paraQueServe: 'Payments and cash management without artisanal host-to-host. Mix: S/4 Treasury / AP \u2192 Multi-Bank \u2192 banks.',
    exemploReal: 'Standalone product in All Products; appears in S/4 Cloud Finance scope items.',
    nesteCenario: {
      onprem: 'Dimmed (classic BCM / host-to-host).',
      cloud: 'Optional, very common in cloud Finance.',
      rise: 'Optional, very common in Private Edition Finance.'
    }
  },
  snc: {
    nome: 'SAP Supply Network Collaboration',
    tipo: 'Supplier collaboration',
    oQueFaz: 'Classic collaboration with production suppliers (forecast, consignment, VMI). Help: Supply Network Collaboration and Information Collaboration Hub for Life Sciences. In the cloud the strategic destination is Business Network for Supply Chain.',
    paraQueServe: 'The component supplier sees the requirement and confirms it. Industry mix: S/4 / IBP plans \u2192 SNC or Business Network collaborates \u2192 EWM receives.',
    exemploReal: 'SNC is the classic line in All Products; Business Network for Supply Chain is the cloud target.',
    nesteCenario: {
      onprem: 'Optional / active in industry with classic VMI.',
      cloud: 'Dimmed. Target = Business Network.',
      rise: 'Optional. Coexistence or migration to Network.'
    }
  },
  ecc: {
    nome: 'SAP ECC 6.0 (legacy)',
    tipo: 'Legacy ERP',
    oQueFaz: 'SAP ERP Central Component, the Business Suite 7 on AnyDB or HANA. Help still lists SAP R/3 as its ancestor. Mainstream maintenance end aligned with NetWeaver 7.5 / Business Suite 7 (2027 standard, 2030 extended). Starting point for most brownfield RISE journeys.',
    paraQueServe: 'Still the engine of thousands of companies. Exit mix: ECC + PI/PO + SolMan + on-premise HCM \u2192 RISE Private Edition + Integration Suite + Cloud ALM + SuccessFactors.',
    exemploReal: 'The public pattern behind most RISE stories (H.B. Fuller and other existing SAP ERP customers) is exactly this starting point.',
    nesteCenario: {
      onprem: 'Active if the legacy toggle is on or if the landscape isn\u2019t S/4 yet.',
      cloud: 'Hidden. GROW is greenfield Public Edition, not ECC in the cloud.',
      rise: 'Legacy origin. Visible with the toggle. The destination card is s4hana Private Edition.'
    }
  },
  's4-any': {
    nome: 'SAP S/4HANA (any-premise)',
    tipo: 'On-prem ERP',
    oQueFaz: 'S/4HANA installed and operated by the customer or a classic hoster, on on-premise HANA. Near-complete functional digital core. TCO, upgrades, HA/DR and security sit with internal IT.',
    paraQueServe: 'For those who want S/4 but don\u2019t yet want a RISE/GROW contract. Classic mix: any-premise S/4 + on-premise HANA + PI/PO or Suite + SolMan + on-premise Fiori.',
    exemploReal: 'Most published RISE customers started from ECC or from this any-premise edition.',
    nesteCenario: {
      onprem: "The company's engine when on-premise is already S/4. Central L4 card.",
      cloud: 'Hidden. Replaced by S/4HANA Cloud Public Edition.',
      rise: 'Dimmed during the dual coexistence. Its successor in the same visual slot is s4hana Private Edition.'
    }
  },
  s4hana: {
    nome: 'SAP S/4HANA Cloud',
    tipo: 'Cloud ERP',
    oQueFaz: 'Digital core in the cloud. Help: SAP S/4HANA Cloud Private Edition and RISE with SAP Private Cloud Edition. The SAME card represents two editions, distinguished by preset: Public Edition (GROW) and Private Edition (RISE). Covers finance, logistics, sales, manufacturing, EWM/TM, projects, service. In-app (key user) extensions are limited; differentiation moves to BTP.',
    paraQueServe: "The company's transactional engine. Public Edition = speed and standard. Private Edition = preserving complexity with SAP operation and a path to clean core.",
    exemploReal: 'Alto (Government of Canada): S/4HANA Cloud Public Edition + SuccessFactors live in 6 months. Ferrara Candy: RISE Private Edition, 25 modules in a big-bang. H.B. Fuller: Private Edition across 123 countries.',
    nesteCenario: {
      onprem: 'Hidden. The active L4 card is s4-any or ecc.',
      cloud: 'Public Edition. Standard, SAP-driven upgrades, Cloud ALM for Activate and operations.',
      rise: 'Private Edition on the hyperscaler managed by SAP (or CDC). Clean core measured on Cloud ALM\u2019s RISE Methodology dashboard.'
    }
  },
  fiori: {
    nome: 'SAP Fiori',
    tipo: 'UX',
    oQueFaz: 'SAP\u2019s experience language: Fiori apps, SAPUI5, launchpad, design system. Help: SAP Fiori Apps Reference Library, SAPUI5, SAP Screen Personas, SAP Business Client, SAP GUI for Windows / Java.',
    paraQueServe: 'Getting the user out of classic SAP GUI. Mix: native S/4 Fiori + Build apps + LoB tiles in Work Zone, with IAS at the door.',
    exemploReal: 'Every S/4 Cloud go-live cited on this map (Alto, Ferrara, H.B. Fuller) delivers day-to-day work in Fiori, not SAP GUI.',
    nesteCenario: {
      onprem: 'Active as on-premise launchpad / Gateway.',
      cloud: 'Active.',
      rise: 'Active.'
    }
  },
  netweaver: {
    nome: 'SAP NetWeaver',
    tipo: 'On-prem PaaS',
    oQueFaz: 'Classic technical platform: ABAP Application Server, historical Java stack, Kernel, Gateway, Web Dispatcher. Help: NetWeaver AS ABAP 7.4 for Suite version for HANA and the 7.5 line. Underneath ECC, SolMan, PI/PO, Portal. Maintenance aligned with Business Suite 7 / 2027.',
    paraQueServe: 'Explaining the ground the on-premise world runs on.',
    exemploReal: "The whole ECC and PI/PO estate runs on NetWeaver. PI/PO's and SolMan's 2027 date is, in large part, NetWeaver 7.5's date.",
    nesteCenario: {
      onprem: 'Active.',
      cloud: 'Hidden.',
      rise: 'Hidden / legacy.'
    }
  },
  mdg: {
    nome: 'SAP Master Data Governance',
    tipo: 'Master data',
    oQueFaz: 'Master data governance (Business Partner, material, finance). Help: Master Data Governance, MDG Cloud Edition, and enterprise asset management / retail and fashion extensions by Prometheus Group.',
    paraQueServe: 'One record for a supplier, customer or article. Mix: MDG in S/4 + Integration Suite distributing + Ariba/SuccessFactors consuming the same Business Partner.',
    exemploReal: 'Ferrara Candy reported over 98% master/finance data quality at RISE go-live.',
    nesteCenario: {
      onprem: 'Active.',
      cloud: 'Active.',
      rise: 'Active.'
    }
  },
  'group-reporting': {
    nome: 'SAP Group Reporting',
    tipo: 'Consolidation',
    oQueFaz: 'Consolidation in S/4. Help also lists Group Reporting Data Collection and Disclosure Management as group-close satellites. Largely replaces BPC consolidation / BCS / EC-CS.',
    paraQueServe: 'Group accounts. Mix: S/4 legal entities \u2192 Group Reporting \u2192 Disclosure Management / SAC.',
    exemploReal: 'A central scope item of S/4 Finance. Data Collection is a separate product in All Products for input from non-S/4 entities.',
    nesteCenario: {
      onprem: 'Active in any-premise S/4 with a group.',
      cloud: 'Active in Public Edition Finance.',
      rise: 'Active.'
    }
  },
  'central-finance': {
    nome: 'SAP Central Finance',
    tipo: 'Central finance',
    oQueFaz: 'S/4HANA used as a central financial ledger that replicates documents from multiple satellite ECC/S/4 systems in real time. Help also lists Central Finance Master Data Replication and Transaction Replication by insightsoftware. Doesn\u2019t replace the entities\u2019 logistics ERP \u2014 it concentrates FI/CO.',
    paraQueServe: 'Groups with many ECC systems wanting a single close without a big-bang across all entities. Brownfield mix: satellite ECCs \u2192 SLT / replication \u2192 Central Finance on RISE \u2192 Group Reporting.',
    exemploReal: 'Shell used S/4HANA / Central Finance as a real-time central financial digital core. A classic pattern for phased transformation.',
    nesteCenario: {
      onprem: 'Optional / active in multi-ECC groups.',
      cloud: 'Rare in typical Public Edition (different model).',
      rise: 'Recommended with the brownfield profile for groups with several ERPs.'
    }
  },
  treasury: {
    nome: 'SAP Treasury and Risk Management',
    tipo: 'Treasury',
    oQueFaz: 'Treasury, financial risk, instruments, liquidity. Help: Treasury and Risk Management (and Impairment extensions), Trading Platform Integration, Liquidity Risk Management, Market Rates Management, Treasury G-Invoicing, Payment Engine, SAP Pay, Digital Payments Add-On, Digital Currency Hub, Capital Yield Tax Management.',
    paraQueServe: 'Cash, debt, hedges. Mix: S/4 Treasury + Multi-Bank + Trading Platform + SAC.',
    exemploReal: 'The Treasury family in All Products is distinct from classic FI-AP. Multi-Bank Connectivity is the connectivity arm.',
    nesteCenario: {
      onprem: 'Active in mature treasury departments.',
      cloud: 'Optional in Public Edition Finance.',
      rise: 'Optional / active in groups with a central treasury.'
    }
  },
  'cash-application': {
    nome: 'SAP Cash Application',
    tipo: 'AI Finance',
    oQueFaz: 'Intelligent matching of bank statements and payments against open invoices. Help: Cash Application add-on for contract accounting. Part of Autonomous Finance on top of S/4.',
    paraQueServe: 'Reducing manual reconciliation work. Mix: Multi-Bank brings the statement \u2192 Cash Application proposes the match \u2192 S/4 FI confirms.',
    exemploReal: 'Positioned by SAP in the Autonomous Finance / Business AI family on top of S/4.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional Finance.',
      rise: 'Optional Finance.'
    }
  },
  rar: {
    nome: 'SAP Revenue Accounting and Reporting',
    tipo: 'Revenue',
    oQueFaz: 'Revenue recognition (IFRS 15 / ASC 606). Help: Revenue Accounting and Reporting 1.3. Complements BRIM when there are complex performance obligations.',
    paraQueServe: 'Recognizing revenue at the right pace. Mix: S/4 SD or BRIM bill \u2192 RAR recognizes \u2192 Group Reporting consolidates.',
    exemploReal: 'Standalone product in All Products, Finance family, distinct from SD billing.',
    nesteCenario: {
      onprem: 'Optional in IFRS 15 groups.',
      cloud: 'Optional.',
      rise: 'Optional with the regulated profile.'
    }
  },
  'disclosure-management': {
    nome: 'SAP Disclosure Management',
    tipo: 'Disclosure',
    oQueFaz: 'Production and workflow of the financial and sustainability report to be published. Help: Disclosure Management. Sits downstream of Group Reporting and the ESG Control Tower.',
    paraQueServe: 'The PDF / iXBRL that goes to the market. Mix: Group Reporting + Sustainability Control Tower \u2192 Disclosure Management.',
    exemploReal: 'The official satellite of the group close in All Products, next to Group Reporting Data Collection.',
    nesteCenario: {
      onprem: 'Optional.',
      cloud: 'Optional.',
      rise: 'Optional with the regulated profile.'
    }
  },
  ppm: {
    nome: 'SAP Portfolio and Project Management',
    tipo: 'Projects',
    oQueFaz: 'Portfolio and projects. Help: Portfolio and Project Management, Commercial Project Management, cProject Suite, Enterprise Project Connection, Unified Planning Center. In S/4 Cloud some capabilities live in embedded Enterprise Portfolio and Project Management.',
    paraQueServe: 'Capex, engineering, customer projects. Mix: PPM / CPM plans \u2192 S/4 PS / Finance executes \u2192 SAC reports.',
    exemploReal: 'H.B. Fuller and other industrial RISE deployments include projects in scope. CPM is the sibling for commercial (billable) projects.',
    nesteCenario: {
      onprem: 'Optional / active in engineering and capex.',
      cloud: 'Optional (shorter Public scope).',
      rise: 'Optional with the industry profile.'
    }
  },
  'business-one': {
    nome: 'SAP Business One',
    tipo: 'SMB ERP',
    oQueFaz: "ERP for small businesses, HANA or MS SQL, on-premise or partner-hosted. Not S/4. Doesn't fit into RISE. Its own roadmap.",
    paraQueServe: 'SMBs that don\u2019t need S/4. Group mix: HQ on S/4 + small subsidiaries on Business One, connected via Integration Suite.',
    exemploReal: 'SAP positions Business One as a partner-led SMB ERP, distinct from GROW (which is S/4 Public Edition).',
    nesteCenario: {
      onprem: 'Active in the SMB universe.',
      cloud: 'Active as an SMB line parallel to GROW.',
      rise: 'Not relevant as the core. Possible subsidiary satellite.'
    }
  },
  bydesign: {
    nome: 'SAP Business ByDesign',
    tipo: 'SMB Cloud ERP',
    oQueFaz: 'SaaS ERP for mid-market, deeper than Business One and smaller than S/4 Public Edition. Help: Business ByDesign and Cloud Applications Studio (PDI).',
    paraQueServe: 'Mid-market companies already on ByDesign, or groups using it in subsidiaries.',
    exemploReal: 'ByDesign is SAP\u2019s historical mid-market SaaS line, predating the GROW push.',
    nesteCenario: {
      onprem: 'Not relevant.',
      cloud: 'Optional. Not the GROW default.',
      rise: 'Not relevant as the core. Possible satellite.'
    }
  },
  successfactors: {
    nome: 'SAP SuccessFactors',
    tipo: 'SaaS HCM',
    oQueFaz: 'HR suite in the cloud. Help documents Employee Central, Recruiting / Applicant Management / Candidate Pipeline / E-Recruiting for S/4HANA, Career and Talent Development, Opportunity Marketplace, employee Work Zone, Enterprise Service Management, Learning Solution, Performance & Goals, Compensation, Succession, 360 Reviews, Analytics, Time and Attendance / Absence by WorkForce Software, Deskless Worker Experience, U.S. Benefits Administration by Benefitfocus. Strategic destination for on-premise HCM. Includes SmartRecruiters in recruiting.',
    paraQueServe: 'Hiring, onboarding, training, evaluating, paying and managing talent. Mix: Employee Central is the person master; S/4 receives cost, org and time; IAS authenticates; Joule serves the employee; Fieldglass covers the non-employee worker.',
    exemploReal: 'Alto: HR live in 6 months with S/4 Public. Darussalam Assets: ~75% less recruitment time. Gerdau: 50% faster onboarding. Southwest Gas: LMS + BTP to validate field technician compliance via phone QR code.',
    nesteCenario: {
      onprem: 'Dimmed. The classic default is SAP HCM in ECC/S/4.',
      cloud: "Active. GROW's HCM.",
      rise: 'Active.'
    }
  },
  'hcm-onprem': {
    nome: 'SAP HCM (on-premise)',
    tipo: 'On-prem HR',
    oQueFaz: 'Classic HR module in ECC / S/4 any-premise: PA, OM, Time, Payroll. Help: ERP HCM HR Support Package Versions, HR Renewal, Best Practices For HCM. Strategic destination: SuccessFactors.',
    paraQueServe: 'Paying salaries and managing time while talent may already be in SuccessFactors.',
    exemploReal: 'The coexistence of on-premise HCM (payroll) + SuccessFactors (Employee Central / Talent) is one of the most common hybrids in Europe.',
    nesteCenario: {
      onprem: 'Active.',
      cloud: 'Hidden / legacy.',
      rise: 'Dimmed. Residual on-premise payroll is a real RISE mix pattern.'
    }
  },
  ariba: {
    nome: 'SAP Ariba',
    tipo: 'SaaS Procurement',
    oQueFaz: 'Source-to-pay suite in the cloud. Help: Ariba, Buying, Invoicing, Intake Management, Category Management, Strategic Sourcing, Procurement, Mobile, Contract Price Renegotiation. Works alongside Business Network and S/4 MM. Help still lists SRM Server, SLC, Sourcing and CLM as ancestors.',
    paraQueServe: 'Indirect procurement and supplier collaboration. Full spend mix: Ariba + Business Network + Managed Gateway + S/4 MM + Concur + Fieldglass + Taulia + Spend Control Tower + VIM.',
    exemploReal: 'NEOM: Ariba in P2P, supplier registration down ~80%. Ferrara: Ariba Business Network + GTS. Sonae Arauco: +25% productivity. SKF: global procurement with Ariba.',
    nesteCenario: {
      onprem: 'Dimmed (classic MM / legacy SRM).',
      cloud: 'Active, especially with the spend profile.',
      rise: 'Active.'
    }
  },
  'business-network': {
    nome: 'SAP Business Network',
    tipo: 'Network',
    oQueFaz: 'Multi-company network. Help: Business Network, Business Network for Supply Chain, Asset Collaboration, Logistics Provider, Supply Chain Collaboration clinical trials add-on, project44 Add-Ons, Ariba Network.',
    paraQueServe: 'Getting off email and PDF. Mix: S/4 or Ariba publish the document \u2192 Business Network \u2192 the partner responds without owning SAP.',
    exemploReal: 'RISE typically includes a Business Network starter. Ferrara used the network for supplier onboarding and compliance.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Active with the spend profile.',
      rise: 'Active. A starter usually comes in the RISE envelope.'
    }
  },
  concur: {
    nome: 'SAP Concur',
    tipo: 'SaaS T&E',
    oQueFaz: 'Travel, Expense and Invoice in the cloud. Help: Concur, Concur Invoice, Concur Travel & Expense.',
    paraQueServe: 'Getting T&E off paper. Spend mix: Concur for the traveling employee, Ariba for the buyer, S/4 for the accountant.',
    exemploReal: "NEOM: expenses reimbursed in two days instead of three or four months. H.B. Fuller's publicly described RISE envelope includes Concur.",
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional in base GROW, recommended with the spend profile.',
      rise: 'Optional in the minimum envelope, very common in the real mix.'
    }
  },
  fieldglass: {
    nome: 'SAP Fieldglass',
    tipo: 'SaaS VMS',
    oQueFaz: 'Vendor Management System for external workforce: temps, SOW, services. Not SuccessFactors.',
    paraQueServe: 'Onboarding, timesheets, compliance and payment for external workers.',
    exemploReal: 'Amdocs published a case with SuccessFactors + Fieldglass + S/4HANA, with SOX compliance gains.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional, recommended with the workforce profile.',
      rise: 'Optional, recommended with the workforce profile.'
    }
  },
  taulia: {
    nome: 'SAP Taulia',
    tipo: 'Working capital',
    oQueFaz: 'Working capital and supply-chain finance: early payment, dynamic discounting. Help also lists SAP Supplier Financing. SAP has reported over $980 billion managed per year.',
    paraQueServe: 'Freeing up cash without changing the source-to-pay process.',
    exemploReal: 'Public SAP figure: Taulia manages over $980 billion per year.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional with the spend profile.',
      rise: 'Optional with the spend profile.'
    }
  },
  'spend-control-tower': {
    nome: 'SAP Spend Control Tower',
    tipo: 'Spend analytics',
    oQueFaz: 'Spend visibility tower. Aggregates Ariba, S/4 MM, Fieldglass, Concur. Doesn\u2019t replace Ariba or generic SAC.',
    paraQueServe: 'CFO / CPO seeing total spend.',
    exemploReal: 'Standalone entry in All Products, Source-to-Pay family.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional with the spend profile.',
      rise: 'Optional with the spend profile.'
    }
  },
  vim: {
    nome: 'SAP Invoice Management by OpenText',
    tipo: 'AP Invoice',
    oQueFaz: 'Capture and workflow for supplier invoices (VIM). Help: Invoice Management by OpenText, Information Capture by OpenText, Invoice and Goods Receipt Reconciliation. In the cloud the destination blends with Ariba Invoice + S/4 Central Invoice Management.',
    paraQueServe: 'Getting the invoice off paper/PDF for accounting. On-premise spend mix: OpenText OCR \u2192 VIM \u2192 S/4 FI-AP.',
    exemploReal: 'VIM by OpenText is the de facto AP invoice standard in on-premise European SAP groups.',
    nesteCenario: {
      onprem: 'Active in classic AP.',
      cloud: 'Dimmed. Target = Ariba Invoice / CIM.',
      rise: 'Optional. Many RISE customers keep VIM on the Private Edition.'
    }
  },
  signavio: {
    nome: 'SAP Signavio',
    tipo: 'Process Intelligence',
    oQueFaz: 'Process transformation suite. Help: Process Transformation Suite, Process Manager, Process Modeler, Process Intelligence, Process Governance, Process Collaboration Hub, Journey Modeler, Process Transformation Manager. Older family: Business Process Intelligence and Process Mining by Celonis. Process Navigator brings S/4 best practices. The controlled rollout of the to-be is where the Deploy with Confidence card comes in.',
    paraQueServe: 'An honest fit-gap. As-is mined, to-be designed, gap turned into Cloud ALM requirements.',
    exemploReal: 'Vodafone Procurement: 11,000 models migrated from ARIS; 284 million cases in Process Intelligence; 82 Celonis reports migrated to SAC. Alto: Process Navigator cut documentation by around 30%.',
    nesteCenario: {
      onprem: 'Active as a preparation tool.',
      cloud: "Active. GROW's fit-to-standard.",
      rise: 'Active. Process toolchain for the RISE methodology.'
    }
  },
  sac: {
    nome: 'SAP Analytics Cloud',
    tipo: 'Analytics + Planning',
    oQueFaz: 'BI, predictive and enterprise planning in the cloud. Help also lists Analytics Hub and the PowerPoint add-in. Analytical face of Business Data Cloud. Strategic destination for the BusinessObjects estate.',
    paraQueServe: 'Closing comments, forecasting, executive dashboards, integrated planning.',
    exemploReal: 'Vodafone migrated 82 reports to SAC. NEOM used BW/4 + SAC. Shanxi Antai: BTP + SAC for carbon management.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Active.',
      rise: 'Active.'
    }
  },
  joule: {
    nome: 'Joule + SAP Business AI',
    tipo: 'AI / Assistant',
    oQueFaz: 'Copilot and agents with SAP process context. Help: Joule and Joule for Developers ABAP AI Capabilities. CoPilot is the ancestor. Domains: Autonomous Finance, Spend, SCM, HCM, CX. Joule Studio to build agents; AI Agent Hub to govern them.',
    paraQueServe: 'Asking about a PO status, triggering an action in SuccessFactors, explaining a variance in SAC.',
    exemploReal: 'H&M: Store Intelligence Agent on RISE + Business Data Cloud + Commerce Cloud + SuccessFactors. SAP announced a contractual commitment to activate Joule assistants in RISE year one.',
    nesteCenario: {
      onprem: 'Not relevant by default.',
      cloud: 'Active.',
      rise: 'Active.'
    }
  },
  ibp: {
    nome: 'SAP Integrated Business Planning',
    tipo: 'SaaS Planning',
    oQueFaz: 'Cloud supply chain planning: S&OP, demand, inventory, response & supply. Conceptual successor of APO. Help lists IBP Integration Enhancements, Advanced Planning and Optimization and Sales and Operations Planning.',
    paraQueServe: 'Aligning sales, operations and finance around one plan.',
    exemploReal: 'Ferrara included IBP in its published RISE landscape.',
    nesteCenario: {
      onprem: 'Dimmed (legacy APO / classic PP).',
      cloud: 'Optional. Recommended with the industry profile.',
      rise: 'Optional. Recommended with the industry profile.'
    }
  },
  ewm: {
    nome: 'SAP EWM',
    tipo: 'Warehouse',
    oQueFaz: 'Extended Warehouse Management. Help: Digital Supply Chain Management edition for S/4HANA and S/4HANA Supply Chain. Not the classic ECC WM.',
    paraQueServe: 'Operating complex warehouses.',
    exemploReal: 'Embedded EWM is a standard piece of industrial S/4 go-lives (Ferrara referenced EWM/MDG/GTS in the big-bang).',
    nesteCenario: {
      onprem: 'Active when on-premise has an advanced warehouse.',
      cloud: 'Optional (shorter Public scope).',
      rise: 'Optional in the minimum envelope, common with the industry profile.'
    }
  },
  tm: {
    nome: 'SAP Transportation Management',
    tipo: 'Transportation',
    oQueFaz: 'Transportation planning and execution. Help: S/4HANA Supply Chain for transportation management and Transportation Resource Planning.',
    paraQueServe: 'Getting off the dispatcher\u2019s spreadsheet.',
    exemploReal: 'RISE Digital Supply Chain packages position TM alongside EWM and IBP.',
    nesteCenario: {
      onprem: 'Active in logistics-heavy landscapes.',
      cloud: 'Optional.',
      rise: 'Optional, recommended with the industry profile.'
    }
  },
  'digital-manufacturing': {
    nome: 'SAP Digital Manufacturing',
    tipo: 'Cloud MES',
    oQueFaz: 'MES in the cloud. Help: Digital Manufacturing, Production Connector, Shop Floor Manager, Complex Assembly Manufacturing, Complex Manufacturing Accelerator.',
    paraQueServe: 'The shop floor. Classic hybrid mix: S/4 Private Edition + DM + Cloud Connector / EIC + APM + EWM.',
    exemploReal: 'SAP\u2019s RISE Production packages are built on Digital Manufacturing.',
    nesteCenario: {
      onprem: 'Dimmed (legacy MES / ME / MII).',
      cloud: 'Optional with the industry profile.',
      rise: 'Recommended with the industry profile.'
    }
  },
  apm: {
    nome: 'SAP Asset Performance Management',
    tipo: 'SaaS Asset',
    oQueFaz: 'Asset strategy and performance. Help: Asset Performance Management, Enterprise Asset Management, Enhanced Maintenance and Service Planning, Asset Manager.',
    paraQueServe: 'Moving from calendar-based to condition-based maintenance.',
    exemploReal: 'RISE Asset Management packages combine APM + Field Service + S/4 EAM.',
    nesteCenario: {
      onprem: 'Dimmed (classic PM).',
      cloud: 'Optional with the industry profile.',
      rise: 'Optional with the industry profile.'
    }
  },
  'yard-logistics': {
    nome: 'SAP Yard Logistics',
    tipo: 'Yard',
    oQueFaz: 'Yard management: truck check-in, docks, yard movement. Sits between TM and EWM.',
    paraQueServe: 'Heavy docks and yards.',
    exemploReal: 'Standalone product in All Products, Digital Supply Chain family.',
    nesteCenario: {
      onprem: 'Optional in heavy logistics.',
      cloud: 'Rare in Public Edition.',
      rise: 'Optional with an industry / logistics profile.'
    }
  },
  'warehouse-insights': {
    nome: 'SAP Warehouse Insights / Robotics',
    tipo: 'Warehouse add-on',
    oQueFaz: 'Help: Warehouse Insights, Warehouse Robotics, Warehouse Operator. Optimization and robotics on top of EWM.',
    paraQueServe: 'Warehouse OEE and robotic fleets.',
    exemploReal: 'Three distinct entries in All Products, around EWM.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional.',
      rise: 'Optional with the industry profile and an automated warehouse.'
    }
  },
  ipd: {
    nome: 'SAP Integrated Product Development',
    tipo: 'Cloud PLM',
    oQueFaz: 'PLM / engineering in the cloud. Help: IPD, PLM, Product Lifecycle Costing, PLM system integration for S/4 / ERP / 3DEXPERIENCE / Autodesk Vault / Windchill, Teamcenter by Siemens, 3D Visual Enterprise.',
    paraQueServe: 'Designing the product and target cost before the production order.',
    exemploReal: 'H.B. Fuller listed PLM in the RISE scope.',
    nesteCenario: {
      onprem: 'Dimmed (classic on-premise PLM).',
      cloud: 'Optional.',
      rise: 'Optional with a product-focused industry profile.'
    }
  },
  gbt: {
    nome: 'SAP Global Batch Traceability',
    tipo: 'Traceability',
    oQueFaz: 'End-to-end batch traceability. Help: Global Batch Traceability and GBT on S/4HANA. Critical in pharma, food, chemicals. Help also lists Advanced Track and Trace for Pharmaceuticals.',
    paraQueServe: 'Recalling in minutes, not weeks. Regulated mix: S/4 batch \u2192 GBT \u2192 EHS / quality.',
    exemploReal: 'GBT and ATTP are standalone products in All Products, Life Sciences / quality family.',
    nesteCenario: {
      onprem: 'Optional / active in pharma and food.',
      cloud: 'Optional.',
      rise: 'Optional with the industry / regulated profile.'
    }
  },
  'event-management': {
    nome: 'SAP Event Management',
    tipo: 'Logistics visibility',
    oQueFaz: 'End-to-end supply chain event tracking (shipment, delay, proof of delivery). Help: Event Management and Event Management on S/4HANA. Cloud destination blends with Business Network and TM.',
    paraQueServe: 'Knowing where the goods are. Mix: TM plans \u2192 Event Management / Network sees the event.',
    exemploReal: 'A classic product in All Products, SCM family.',
    nesteCenario: {
      onprem: 'Optional in logistics.',
      cloud: 'Dimmed.',
      rise: 'Optional.'
    }
  },
  fnr: {
    nome: 'SAP Forecasting and Replenishment',
    tipo: 'Retail replenishment',
    oQueFaz: 'Help: Forecasting and Replenishment for Retail and Predictive Replenishment. Store and DC replenishment in retail. Complements IBP (which plans the network) at the last mile of the shelf.',
    paraQueServe: 'Not running out of milk on the shelf. Retail mix: IBP + F&R / Predictive Replenishment + EWM + Customer Checkout.',
    exemploReal: 'Two entries in All Products, Retail family.',
    nesteCenario: {
      onprem: 'Optional in retail.',
      cloud: 'Optional.',
      rise: 'Optional in retail.'
    }
  },
  'returns-management': {
    nome: 'SAP Intelligent Returns Management',
    tipo: 'Returns',
    oQueFaz: 'Intelligent omnichannel returns. Help: Intelligent Returns Management and Recommerce. Closes the commerce / retail loop.',
    paraQueServe: 'Reverse logistics. CX+supply mix: Commerce / Checkout \u2192 Returns \u2192 EWM \u2192 S/4 credit.',
    exemploReal: 'Intelligent Returns and Recommerce listed in All Products.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional in commerce.',
      rise: 'Optional in commerce.'
    }
  },
  'commerce-cloud': {
    nome: 'SAP Commerce Cloud',
    tipo: 'SaaS CX',
    oQueFaz: 'Commerce platform (ex-Hybris). Help: composable storefront and accelerators, Search Service, Open Payment Framework, localization for China, Marketplace Management by Mirakl.',
    paraQueServe: 'The digital channel. CX mix: Commerce + Emarsys + Sales Cloud + Service Cloud + Customer Data Cloud + S/4 + Joule.',
    exemploReal: 'H&M used Commerce Cloud in the Sapphire 2026 InStore Concierge demo. Cintas published BTP + Commerce Cloud + Concur + CX + SuccessFactors.',
    nesteCenario: {
      onprem: 'Dimmed (legacy on-premise hybris).',
      cloud: 'Optional.',
      rise: 'Optional.'
    }
  },
  'sales-cloud': {
    nome: 'SAP Sales Cloud',
    tipo: 'SaaS CX',
    oQueFaz: 'Sales CRM. Help documents Sales Cloud Version 2 and the Sales Cloud and Service Cloud Version 2 bundle. Ancestor: Hybris Cloud for Customer.',
    paraQueServe: 'The salesperson. Mix: Sales Cloud wins the opportunity \u2192 CPQ configures \u2192 S/4 invoices \u2192 Service Cloud handles after-sales.',
    exemploReal: 'The SAP CX suite is the destination of the former C/4HANA.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional.',
      rise: 'Optional.'
    }
  },
  'service-cloud': {
    nome: 'SAP Service Cloud',
    tipo: 'SaaS CX',
    oQueFaz: 'Service CRM. Help: Service Cloud, Service Cloud Version 2, Self-Service Accelerator for Utilities by SEW.',
    paraQueServe: 'After-sales and assistance.',
    exemploReal: 'SAP positions Service Cloud + FSM in its Asset Management and Autonomous CX packages.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional.',
      rise: 'Optional, recommended with the industry profile.'
    }
  },
  emarsys: {
    nome: 'SAP Emarsys (Engagement Cloud)',
    tipo: 'SaaS CX',
    oQueFaz: 'Marketing automation. Help: Emarsys, Emarsys Account Engagement, Engagement Cloud. Marketing / Marketing Cloud is the earlier line.',
    paraQueServe: 'Campaigns and personalization.',
    exemploReal: 'SAP positions Emarsys as the Marketing pillar of the CX suite in its official index.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional.',
      rise: 'Optional.'
    }
  },
  'customer-data-cloud': {
    nome: 'SAP Customer Data Cloud',
    tipo: 'SaaS CX',
    oQueFaz: 'CIAM and consumer profile. Distinct from IAS and Business Data Cloud.',
    paraQueServe: 'Store login, GDPR consent, unified profile.',
    exemploReal: 'Help groups Customer experience > Customer data as its own area of the CX suite.',
    naoConfundir: 'Not SAP Cloud Identity Services (IAS/IPS). Not Business Data Cloud.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional if there\u2019s a digital consumer channel.',
      rise: 'Optional if there\u2019s a digital consumer channel.'
    }
  },
  cpq: {
    nome: 'SAP CPQ',
    tipo: 'SaaS CX',
    oQueFaz: 'Configure, Price and Quote. Help: CPQ and Solution Sales Configuration (cloud / S/4 / Commerce).',
    paraQueServe: 'Configurable sales.',
    exemploReal: 'Help lists CPQ and Solution Sales Configuration as products distinct from Sales Cloud.',
    nesteCenario: {
      onprem: 'Dimmed (on-premise VC / SSC).',
      cloud: 'Optional.',
      rise: 'Optional.'
    }
  },
  fsm: {
    nome: 'SAP Field Service Management',
    tipo: 'SaaS CX',
    oQueFaz: 'Field technician dispatch. Help: Field Service Management and Field Service and Asset Management.',
    paraQueServe: 'Assistance on the asset. Mix: APM or S/4 EAM \u2192 FSM \u2192 Service and Asset Manager \u2192 S/4.',
    exemploReal: 'Coresystems was absorbed into this family. RISE Asset Management packages combine FSM + APM + EAM.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional.',
      rise: 'Optional with the industry profile.'
    }
  },
  'service-asset-manager': {
    nome: 'SAP Service and Asset Manager',
    tipo: 'Mobile app',
    oQueFaz: 'Mobile maintenance and service app. Conceptually replaces Work Manager, Inventory Manager, Rounds Manager and Maintenance Assistant.',
    paraQueServe: 'Hands on the asset.',
    exemploReal: 'Help still documents Work Manager / Inventory Manager / Rounds Manager / Maintenance Assistant as the classic line.',
    nesteCenario: {
      onprem: 'Active in asset maintenance.',
      cloud: 'Optional.',
      rise: 'Optional with the industry profile.'
    }
  },
  'order-management': {
    nome: 'SAP Order Management',
    tipo: 'SaaS CX',
    oQueFaz: 'Help: Order Management Foundation, Order Management for Sourcing and Availability, Order and Delivery Scheduling.',
    paraQueServe: 'Omnichannel orchestration before S/4.',
    exemploReal: 'Help separates Order Management from Commerce Cloud and S/4 SD.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional in omnichannel retail.',
      rise: 'Optional in omnichannel retail.'
    }
  },
  'customer-checkout': {
    nome: 'SAP Customer Checkout',
    tipo: 'POS',
    oQueFaz: 'Point of sale. Help: Customer Checkout and cloud editions. Adjacent line: Omnichannel POS by GK, Enterprise POS, Offline Mobile Store by GK, Store Management by GK, Dynamic Pricing by GK.',
    paraQueServe: 'The physical store.',
    exemploReal: 'Several POS generations in All Products. Customer Checkout cloud is the SAP-native SMB/retail target.',
    nesteCenario: {
      onprem: 'Optional in retail.',
      cloud: 'Optional in retail.',
      rise: 'Optional in retail.'
    }
  },
  'entitlement-management': {
    nome: 'SAP Entitlement Management',
    tipo: 'SaaS CX',
    oQueFaz: "Customer entitlements over subscriptions, licenses and usage.",
    paraQueServe: 'Software and recurring services. Mix: S/4 or BRIM bills \u2192 Entitlement authorizes usage.',
    exemploReal: 'Standalone product in All Products, next to the CX family and BRIM.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional in subscription models.',
      rise: 'Optional in subscription models.'
    }
  },
  sustainability: {
    nome: 'SAP Sustainability Control Tower',
    tipo: 'Sustainability',
    oQueFaz: 'ESG control tower. Help: Control Tower, Sustainability Solutions, Sustainability Performance Management.',
    paraQueServe: 'Group-level CSRD / emissions reporting.',
    exemploReal: 'Shanxi Antai published end-to-end carbon management with BTP and SAC.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional with the regulated profile.',
      rise: 'Optional with the regulated / industry profile.'
    }
  },
  'footprint-management': {
    nome: 'SAP Sustainability Footprint Management',
    tipo: 'Sustainability',
    oQueFaz: 'Footprint calculation. Help: Footprint Management, Sustainability Data Exchange, Responsible Design and Production.',
    paraQueServe: 'Knowing an article\u2019s footprint and sharing it.',
    exemploReal: 'Four distinct entries in All Products under Sustainability Solutions.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional.',
      rise: 'Optional.'
    }
  },
  'green-ledger': {
    nome: 'SAP Green Ledger',
    tipo: 'Sustainability',
    oQueFaz: "Emissions accounting in S/4's ledger. Help: Green Ledger and Green Token.",
    paraQueServe: 'CSRD with an accounting trail.',
    exemploReal: 'SAC has Green Ledger Reporting for S/4HANA and S/4HANA Cloud content.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional.',
      rise: 'Optional.'
    }
  },
  ehs: {
    nome: 'SAP EHS',
    tipo: 'Environment & safety',
    oQueFaz: 'Environment, Health and Safety. Help: EHS Management, EHS Regulatory Content, Environmental Compliance, Management of Change.',
    paraQueServe: 'Operational safety and environmental auditing.',
    exemploReal: "H.B. Fuller's published RISE scope included EHS Management.",
    nesteCenario: {
      onprem: 'Active in regulated industries.',
      cloud: 'Optional.',
      rise: 'Optional with the industry / regulated profile.'
    }
  },
  grc: {
    nome: 'SAP GRC / Access Control',
    tipo: 'Risk & control',
    oQueFaz: 'Governance, Risk and Compliance. Help: GRC, Access Control, Process Control, Risk Management, GRC for HANA, Financial Compliance Management, Access Violation Management by Greenlight.',
    paraQueServe: 'Audit, SOX, SoD.',
    exemploReal: 'Ferrara referenced GRC in the RISE big-bang. Amdocs published 100% SOX compliance.',
    nesteCenario: {
      onprem: 'Active in audited landscapes.',
      cloud: 'Optional with the regulated profile.',
      rise: 'Optional with the regulated profile.'
    }
  },
  gts: {
    nome: 'SAP GTS (Global Trade)',
    tipo: 'Foreign trade',
    oQueFaz: 'Global Trade Services: sanctioned party screening, embargo, customs classification, declarations.',
    paraQueServe: 'Not selling to the wrong destination and not failing customs.',
    exemploReal: 'Ferrara Candy: Ariba Business Network + GTS co-hosted for sanctioned parties.',
    nesteCenario: {
      onprem: 'Active in exporters.',
      cloud: 'Optional.',
      rise: 'Optional with the regulated / international-spend profile.'
    }
  },
  'document-compliance': {
    nome: 'SAP Document and Reporting Compliance',
    tipo: 'Tax compliance',
    oQueFaz: 'E-invoicing and statutory reporting. Help: DRC Cloud Edition, Document Compliance, Digital Compliance India, Electronic Invoicing Brazil, Peppol guides, Tax Declaration Framework Brazil.',
    paraQueServe: 'E-invoice, SAF-T, Peppol. The card is the platform, not each country localization.',
    exemploReal: 'A huge family in All Products because every country has its own connector.',
    nesteCenario: {
      onprem: 'Active in countries with an e-document mandate.',
      cloud: "Active. Part of GROW's honest minimum.",
      rise: 'Active.'
    }
  },
  brim: {
    nome: 'SAP BRIM',
    tipo: 'Subscription billing',
    oQueFaz: 'Billing and Revenue Innovation Management. Help: BRIM, Convergent Mediation by DigitalRoute, Contract Accounts Receivable and Payable.',
    paraQueServe: 'Monetizing usage and subscription (telco, utilities, software).',
    exemploReal: 'All Products lists BRIM as its own family, distinct from classic SD billing.',
    nesteCenario: {
      onprem: 'Active in on-premise telco/utilities/subscription.',
      cloud: 'Optional.',
      rise: 'Optional. Private Edition fits heavy BRIM.'
    }
  },
  iot: {
    nome: 'SAP Internet of Things',
    tipo: 'IoT',
    oQueFaz: "SAP's IoT layer. Help: SAP Internet of Things (SAP IoT), Auto-ID Infrastructure. Feeds APM, Digital Manufacturing and Event Mesh with telemetry. Many new scenarios go through BTP Kyma + Event Mesh instead of the classic IoT product.",
    paraQueServe: 'Connecting sensors to the process. Industry mix: IoT / Auto-ID \u2192 Event Mesh \u2192 APM or DM \u2192 S/4.',
    exemploReal: 'IoT and Auto-ID Infrastructure listed in All Products. Auto-ID is the classic RFID line.',
    nesteCenario: {
      onprem: 'Dimmed (Auto-ID / MII).',
      cloud: 'Optional.',
      rise: 'Optional with the industry profile.'
    }
  },
  'real-estate': {
    nome: 'SAP Cloud for Real Estate / RE-FX',
    tipo: 'Real estate',
    oQueFaz: 'Real estate. Help: Cloud for Real Estate, Real Estate Management and the Tenant Relationship Management add-on.',
    paraQueServe: 'Lease contracts, space, IFRS 16. Mix: RE-FX / Cloud for Real Estate + S/4 FI + SAC.',
    exemploReal: 'Two generations in All Products: classic RE-FX and Cloud for Real Estate.',
    nesteCenario: {
      onprem: 'Optional (RE-FX).',
      cloud: 'Optional.',
      rise: 'Optional.'
    }
  },
  'industry-cloud': {
    nome: 'SAP Industry Cloud',
    tipo: 'Vertical',
    oQueFaz: 'Umbrella layer of vertical solutions. Help: Industry Cloud Enterprise Agreement, Industry Process Framework, SAP for Banking, Insurance, Healthcare, Utilities, Waste and Recycling, Intelligent Agriculture, Batch Release Hub for Life Sciences, Intelligent Clinical Supply Management, Sports One. Umbrella card. Cloud for Energy, Digital Vehicle and Fashion have their own cards because they change the mix.',
    paraQueServe: 'Remembering that S/4 + BTP isn\u2019t enough in utilities, auto, life sciences, agriculture.',
    exemploReal: 'All Products has SAP for Banking, Insurance, Healthcare, Utilities, Waste and Recycling sections.',
    nesteCenario: {
      onprem: 'Dimmed (classic IS-*).',
      cloud: 'Optional vertical.',
      rise: 'Optional vertical.'
    }
  },
  'cloud-for-energy': {
    nome: 'SAP Cloud for Energy',
    tipo: 'Utilities',
    oQueFaz: 'Cloud energy suite. Help: Cloud for Energy, Market Communication, Market Process Management, Energy Data Management, Energy Portfolio Management, Intelligent Metering DE, Pricing and Costing for Utilities, Multichannel Foundation for Utilities.',
    paraQueServe: 'Market, metering, market communication.',
    exemploReal: 'Utilities family in All Products. DE/AT customers use Market Communication + EDM.',
    nesteCenario: {
      onprem: 'Dimmed (IS-U).',
      cloud: 'Optional vertical.',
      rise: 'Optional vertical, recommended in utilities.'
    }
  },
  'digital-vehicle': {
    nome: 'SAP Digital Vehicle Hub / Suite',
    tipo: 'Automotive',
    oQueFaz: 'Help: Digital Vehicle Hub, Operations, Suite, E-Mobility. Digital twin and vehicle operations.',
    paraQueServe: 'OEMs and fleets.',
    exemploReal: 'Three entries in All Products + E-Mobility.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional vertical.',
      rise: 'Optional automotive vertical.'
    }
  },
  fashion: {
    nome: 'SAP Fashion / Apparel and Footwear',
    tipo: 'Fashion retail',
    oQueFaz: 'Help: Fashion Management, Apparel and Footwear, MDG retail and fashion extension by Prometheus Group.',
    paraQueServe: 'Variants, seasons, size grids.',
    exemploReal: 'AFS / Fashion Management often decide Private Edition vs Public.',
    nesteCenario: {
      onprem: 'Active in AFS/Fashion customers.',
      cloud: 'Optional \u2014 Public may fall short.',
      rise: 'Optional, often the reason for Private Edition.'
    }
  },
  'cloud-alm': {
    nome: 'SAP Cloud ALM',
    tipo: 'ALM SaaS',
    oQueFaz: "Cloud-native Application Lifecycle Management. Four planes: Implementation (Activate, sprints, requirements, testing, features, quality gates); Operations (health, integration/exception, job monitoring, BPM); landscape Analytics; Joule agent observability. Includes the RISE Methodology / System View clean-core dashboard. Included in RISE and GROW via Enterprise Support, Cloud Editions \u2014 the tenant is requested in SAP for Me.",
    paraQueServe: "Mission control for the GROW or RISE mix. Translates Signavio's to-be into requirements and tests; measures clean core. The visible face of the Deploy with Confidence discipline.",
    exemploReal: "SAP describes Cloud ALM as the backbone of the RISE methodology's agent-led toolchain. Cloud ALM itself is built internally with Deploy with Confidence.",
    nesteCenario: {
      onprem: 'Available with Enterprise Support, but the default is Solution Manager. Card dimmed.',
      cloud: "GROW's default ALM.",
      rise: "RISE's default ALM. RISE Methodology / System View dashboard."
    }
  },
  solman: {
    nome: 'SAP Solution Manager',
    tipo: 'On-prem ALM',
    oQueFaz: 'Classic ALM: ChaRM, ITSM, documentation, Test Suite, monitoring, Custom Code Management. End of mainstream maintenance: end of 2027. Pure RISE does NOT include SolMan usage rights.',
    paraQueServe: "On-premise mission control. Strategic destination: Cloud ALM (Readiness Check, note 3236443).",
    exemploReal: 'SAP has scheduled Solution Manager\u2019s mainstream EoM for the end of 2027.',
    nesteCenario: {
      onprem: 'Main L6 card.',
      cloud: 'Hidden.',
      rise: 'Dimmed. Default is Cloud ALM.'
    }
  },
  'focused-run': {
    nome: 'SAP Focused Run',
    tipo: 'Advanced ops',
    oQueFaz: 'High-volume monitoring for service providers and very large landscapes.',
    paraQueServe: 'For those operating dozens or hundreds of SAP systems.',
    exemploReal: 'SAP lists three strategic ALM tools: Cloud ALM, Solution Manager, Focused Run. There is no parity between the three.',
    nesteCenario: {
      onprem: 'Optional for very large operators and groups.',
      cloud: 'Not relevant in typical GROW.',
      rise: 'Optional.'
    }
  },
  leanix: {
    nome: 'SAP LeanIX',
    tipo: 'Enterprise Architecture',
    oQueFaz: 'Living inventory of applications, interfaces and capabilities. Help: LeanIX, Enterprise Architecture Designer, Enterprise Architecture Framework.',
    paraQueServe: 'Knowing what exists before mixing.',
    exemploReal: 'SAP transformation toolchain: LeanIX + Signavio + WalkMe + Cloud ALM.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Active in multi-app GROW transformations.',
      rise: 'Active.'
    }
  },
  walkme: {
    nome: 'WalkMe',
    tipo: 'Digital adoption',
    oQueFaz: 'Digital adoption. Help: WalkMe Digital Adoption. In-app guides over Fiori, SuccessFactors, Ariba.',
    paraQueServe: 'Stopping a flawless S/4 Fiori rollout from dying at adoption.',
    exemploReal: 'RISE fact sheets list Signavio + LeanIX + WalkMe as the transformation toolchain.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Optional, useful in GROW.',
      rise: 'Optional, common in the transformation envelope.'
    }
  },
  'enable-now': {
    nome: 'SAP Enable Now',
    tipo: 'Training',
    oQueFaz: 'Authoring and delivery of in-app training. Help: Enable Now and Knowledge Acceleration. Different from WalkMe and SuccessFactors Learning.',
    paraQueServe: 'Go-live enablement.',
    exemploReal: 'Classic Activate programs include Enable Now as the enablement standard.',
    nesteCenario: {
      onprem: 'Active.',
      cloud: 'Active / optional.',
      rise: 'Active / optional.'
    }
  },
  dwc: {
    nome: 'Deploy with Confidence (DwC)',
    tipo: 'Method',
    oQueFaz: "SAP engineering's internal paved road for delivering SaaS software daily with quality: trunk-based development, automated testing, feature toggles, daily deploy, zero-downtime from the tenant's perspective. Started as an Operational Excellence initiative (finalist for the 2020 Hasso Plattner Founders' Award). NOT a SKU, NOT on the customer contract, NOT the old Data Warehouse Cloud.",
    paraQueServe: "Two roles. First: explaining the cadence of Cloud ALM, Signavio, SuccessFactors and Public Edition. Second: the mental pattern for how a Signavio to-be process gets rolled out with confidence \u2014 quality gates in Cloud ALM, clean core on BTP, feature toggles, Tricentis tests, audit evidence.",
    exemploReal: 'The SAP Cloud ALM team has described the product itself running on Deploy with Confidence: daily deploys, feature toggles, change lead time under a day. Vodafone didn\u2019t win 11,000 Signavio models just to leave them in a repository.',
    naoConfundir: 'It is NOT SAP Data Warehouse Cloud (today Datasphere, id datasphere). It is NOT the partner offering "Delivery Confidence for SAP" from KPMG. It cannot be licensed.',
    nesteCenario: {
      onprem: 'Dimmed. Classic on-premise deploys with SolMan/ChaRM \u2014 the cultural opposite of DwC.',
      cloud: 'Active as a method.',
      rise: 'Active as a method. Connects Signavio to Cloud ALM and BTP.'
    }
  },
  btc: {
    nome: 'SAP Business Transformation Center',
    tipo: 'Data migration',
    oQueFaz: 'Selective transformation and assessment of ECC/S/4 data \u2192 Cloud ERP. Help: Business Transformation Center, Landscape Transformation, Test Data Migration Server.',
    paraQueServe: 'Selective data transition. Signavio picks the process \u2192 BTC picks the data \u2192 Cloud ALM runs the project.',
    exemploReal: '2026 Cloud ALM documentation references BTC under Data Management.',
    nesteCenario: {
      onprem: 'Dimmed.',
      cloud: 'Rare (GROW is mostly greenfield).',
      rise: 'Recommended with the brownfield profile.'
    }
  },
  tricentis: {
    nome: 'SAP Test Automation by Tricentis',
    tipo: 'Testing',
    oQueFaz: 'Help: Test Automation by Tricentis, Tricentis Test Automation for SAP, Enterprise Continuous Testing, Enterprise Performance Testing, Change Impact Analysis, Quality Center by Micro Focus, Test Acceleration and Optimization.',
    paraQueServe: 'Regression testing on every S/4 Cloud upgrade. Cloud ALM holds the plan \u2192 Tricentis executes \u2192 DwC-style quality gate.',
    exemploReal: 'Cloud ALM for Implementation integrates automated test scenarios.',
    nesteCenario: {
      onprem: 'Optional.',
      cloud: 'Recommended.',
      rise: 'Recommended.'
    }
  },
  'sap-for-me': {
    nome: 'SAP for Me',
    tipo: 'Customer portal',
    oQueFaz: 'SAP customer portal: contracts, systems, licenses, Cloud ALM tenant requests. Help: SAP for Me. Built-In Support and Support Content live in this orbit.',
    paraQueServe: "Requesting the Cloud ALM tenant and seeing what's contracted. SAP for Me (contract) \u2192 Cloud ALM (execution).",
    exemploReal: 'Most RISE/GROW customers provision Cloud ALM from here.',
    nesteCenario: {
      onprem: 'Active.',
      cloud: 'Active.',
      rise: 'Active.'
    }
  },
  etd: {
    nome: 'SAP Enterprise Threat Detection',
    tipo: 'Security',
    oQueFaz: 'SIEM focused on threats to SAP systems (logs, anomalies, attacks). Help: Enterprise Threat Detection. Complements GRC (SoD) and IAG (access): ETD sees the attack, not just the profile.',
    paraQueServe: 'Detecting abuse and attacks on the SAP stack. Regulated mix: ETD + GRC + IAG + Cloud ALM.',
    exemploReal: 'Standalone product in All Products, Security family, distinct from Access Control.',
    nesteCenario: {
      onprem: 'Optional / recommended with the regulated profile.',
      cloud: 'Optional.',
      rise: 'Optional with the regulated profile.'
    }
  },
  powerbuilder: {
    nome: 'SAP PowerBuilder',
    tipo: 'Legacy IDE',
    oQueFaz: 'Classic IDE for client-server applications (DataWindows). Help: PowerBuilder. Not part of BTP or the clean core.',
    paraQueServe: 'Keeping PowerBuilder apps running while migrating to Fiori/Build.',
    exemploReal: 'Entry in All Products. A tooling line, not LoB.',
    nesteCenario: { onprem: 'Optional legacy.', cloud: 'Hidden.', rise: 'Hidden.' }
  },
  powerdesigner: {
    nome: 'SAP PowerDesigner',
    tipo: 'Modeling',
    oQueFaz: 'Enterprise modeling tool (data, processes, architecture). Help: PowerDesigner. Conceptual destination: LeanIX + Signavio + Datasphere.',
    paraQueServe: 'Documenting data models and architecture in classic landscapes.',
    exemploReal: 'Standalone product in All Products, EA/modeling family.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  infomaker: {
    nome: 'SAP InfoMaker',
    tipo: 'Legacy reporting',
    oQueFaz: 'Classic reporting tool tied to the PowerBuilder ecosystem.',
    paraQueServe: 'Desktop reports in older landscapes.',
    exemploReal: 'All Products. Destination = SAC / Analysis for Office.',
    nesteCenario: { onprem: 'Legacy.', cloud: 'Hidden.', rise: 'Hidden.' }
  },
  'open-server': {
    nome: 'SAP Open Server',
    tipo: 'Legacy DB middleware',
    oQueFaz: 'Open server layer from the Sybase / ASE family for DB protocols.',
    paraQueServe: 'Compatibility with classic Sybase stacks.',
    exemploReal: 'All Products, ASE/SQL Anywhere family.',
    nesteCenario: { onprem: 'Legacy.', cloud: 'Hidden.', rise: 'Hidden.' }
  },
  orientdb: {
    nome: 'SAP Enterprise OrientDB',
    tipo: 'Legacy graph',
    oQueFaz: 'OrientDB enterprise edition referenced in the Help index. New graph workloads go to HANA Cloud multi-model / Knowledge Graph.',
    paraQueServe: 'Graphs in landscapes still using it.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Legacy.', cloud: 'Dimmed.', rise: 'Dimmed.' }
  },
  'replication-server': {
    nome: 'SAP Replication Server',
    tipo: 'Replication',
    oQueFaz: 'Classic Sybase/SAP replication between databases. Help: Replication Server. In S/4/Central Finance the modern pattern is SLT / BTC / Datasphere replication.',
    paraQueServe: 'Replicating data between classic engines.',
    exemploReal: 'All Products, data family.',
    nesteCenario: { onprem: 'Optional legacy.', cloud: 'Dimmed.', rise: 'Dimmed.' }
  },
  'sql-anywhere': {
    nome: 'SAP SQL Anywhere',
    tipo: 'Embedded DB',
    oQueFaz: 'Embedded / edge database. Help: SQL Anywhere. Distinct from HANA.',
    paraQueServe: 'Occasionally-connected apps, POS, edge.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Dimmed.', rise: 'Dimmed.' }
  },
  'sql-analyzer': {
    nome: 'SQL Analyzer Tool for SAP HANA',
    tipo: 'Tool',
    oQueFaz: 'SQL/plan analyzer for HANA. Help: SQL Analyzer Tool for SAP HANA.',
    paraQueServe: 'Tuning HANA queries.',
    exemploReal: 'All Products, HANA tools family.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'event-ticketing': {
    nome: 'SAP Event Ticketing',
    tipo: 'Ticketing',
    oQueFaz: 'Ticketing / events. Help: Event Ticketing. A leisure vertical, not Event Mesh.',
    paraQueServe: 'Selling tickets and event access.',
    exemploReal: 'All Products. Not to be confused with logistics Event Management.',
    naoConfundir: 'Not SAP Event Management (track-and-trace) nor Event Mesh.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'event-stream-processor': {
    nome: 'SAP Event Stream Processor',
    tipo: 'Legacy streaming',
    oQueFaz: 'Classic CEP/streaming. Help: Event Stream Processor. Destination: Event Mesh / Advanced Event Mesh / AI Core streaming.',
    paraQueServe: 'Processing streams in older landscapes.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Legacy.', cloud: 'Dimmed.', rise: 'Dimmed.' }
  },
  'event-insight': {
    nome: 'SAP Event Insight',
    tipo: 'Legacy events',
    oQueFaz: 'Insight into business events, a historical Help line.',
    paraQueServe: 'Event visibility before Event Mesh.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'innovation-management': {
    nome: 'SAP Innovation Management',
    tipo: 'Innovation',
    oQueFaz: 'Idea and innovation portfolio. Help: Innovation Management.',
    paraQueServe: 'Idea funnel through to project (links to PPM).',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'knowledge-acceleration': {
    nome: 'SAP Knowledge Acceleration',
    tipo: 'Enablement',
    oQueFaz: 'Knowledge acceleration content. Help: Knowledge Acceleration. Sibling of Enable Now.',
    paraQueServe: 'Accelerated training on SAP modules.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'micro-app-hub': {
    nome: 'SAP Micro-App Hub',
    tipo: 'Micro-app hub',
    oQueFaz: 'Micro-app catalog. Help: Micro-App Hub.',
    paraQueServe: 'Distributing mini-apps in the workplace.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'collaboration-manager': {
    nome: 'SAP Collaboration Manager',
    tipo: 'Collaboration',
    oQueFaz: 'Collaboration around processes/documents. Help: Collaboration Manager.',
    paraQueServe: 'Workrooms around SAP objects.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'content-to-go': {
    nome: 'SAP Content to Go',
    tipo: 'Mobile content',
    oQueFaz: 'Distributing Enable Now / help content to devices. Help: Content to Go.',
    paraQueServe: 'Getting simulations and help onto the phone.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'employee-lookup': {
    nome: 'SAP Employee Lookup',
    tipo: 'HR app',
    oQueFaz: 'Employee lookup app. Help: Employee Lookup 2.3.',
    paraQueServe: 'Finding colleagues. UX destination: Work Zone / Mobile Start.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'candidate-pipeline': {
    nome: 'Candidate Pipeline',
    tipo: 'Recruiting',
    oQueFaz: 'Candidate pipeline in the SuccessFactors / recruiting universe. Help: Candidate Pipeline.',
    paraQueServe: 'Tracking candidates through to hire.',
    exemploReal: 'All Products, SuccessFactors family.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'agent-compliance': {
    nome: 'Agent Compliance',
    tipo: 'HR compliance',
    oQueFaz: 'Agent / sales force compliance in the Help index.',
    paraQueServe: 'Agent certifications and rules.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  questionmark: {
    nome: 'Assessment Management by Questionmark',
    tipo: 'Assessment',
    oQueFaz: 'Assessments and testing by Questionmark. Help: Assessment Management by Questionmark.',
    paraQueServe: 'Exams and certifications tied to Learning.',
    exemploReal: 'All Products, partner offering.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'behavioral-insights': {
    nome: 'Behavioral Insights',
    tipo: 'People analytics',
    oQueFaz: 'Behavioral insights in the Help portfolio.',
    paraQueServe: 'Behavioral patterns of employees/customers.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'budget-benefits': {
    nome: 'Budget-Based Benefits Selection',
    tipo: 'Benefits',
    oQueFaz: 'Budget-based benefits selection. Help: Budget-Based Benefits Selection.',
    paraQueServe: 'Open enrollment within a budget envelope.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'workforce-forecast': {
    nome: 'SAP Workforce Forecasting and Scheduling',
    tipo: 'WFM',
    oQueFaz: 'Workforce forecasting and scheduling. Help: Workforce Forecasting and Scheduling by Workforce Software.',
    paraQueServe: 'Shifts and operational forecasting.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'public-budgeting': {
    nome: 'Budgeting and Planning for Public Sector',
    tipo: 'Public sector',
    oQueFaz: 'Public-sector budgeting and planning. Help: Budgeting and Planning for Public Sector.',
    paraQueServe: 'Public-sector budget on top of S/4 / SAC.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'financial-closing': {
    nome: 'SAP Financial Closing Cockpit',
    tipo: 'Close',
    oQueFaz: 'Financial close orchestration. Help: Financial Closing Cockpit Add-On.',
    paraQueServe: 'Month-end checklist and tasks.',
    exemploReal: 'All Products, Finance family.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'financial-consolidation': {
    nome: 'SAP Financial Consolidation',
    tipo: 'Legacy consolidation',
    oQueFaz: 'Classic consolidation (BFC). Help: Financial Consolidation. Destination: Group Reporting.',
    paraQueServe: 'Group accounts in pre-S/4 landscapes.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Legacy.', cloud: 'Hidden.', rise: 'Legacy.' }
  },
  'funding-management': {
    nome: 'SAP Funding Management',
    tipo: 'Funds',
    oQueFaz: 'Funds / grants management. Help: Funding Management.',
    paraQueServe: 'Public sector and education: funds and availability control.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'green-token': {
    nome: 'SAP Green Token',
    tipo: 'Sustainability',
    oQueFaz: 'Chain of custody for environmental attributes. Help: Green Token. Sibling of Green Ledger.',
    paraQueServe: 'Proving the green origin of a batch / certificate.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  rdp: {
    nome: 'SAP Responsible Design and Production',
    tipo: 'EPR / circular',
    oQueFaz: 'Responsible design and EPR (plastics, extended producer responsibility). Help: Responsible Design and Production.',
    paraQueServe: 'Packaging and eco-design obligations.',
    exemploReal: 'All Products, Sustainability family.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'sus-data-exchange': {
    nome: 'SAP Sustainability Data Exchange',
    tipo: 'ESG sharing',
    oQueFaz: 'Sharing ESG data with partners. Help: Sustainability Data Exchange.',
    paraQueServe: 'Exchanging footprints and attributes across the network.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'sus-performance': {
    nome: 'SAP Sustainability Performance Management',
    tipo: 'ESG performance',
    oQueFaz: 'Sustainability performance. Help: Sustainability Performance Management.',
    paraQueServe: 'Operational ESG KPIs, upstream of the Control Tower.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  ltc: {
    nome: 'Lead-to-Cash',
    tipo: 'Process chain',
    oQueFaz: 'End-to-end commercial chain (lead \u2192 contract \u2192 invoice \u2192 cash). Help lists Lead-to-Cash Business Process. Not an executable \u2014 it\u2019s the process that Signavio models and S/4+Sales+Commerce execute.',
    paraQueServe: 'Seeing the commercial mix as a flow, not isolated products.',
    exemploReal: 'All Products, as a business process.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  's2p-process': {
    nome: 'Source-to-Pay (chain)',
    tipo: 'Process chain',
    oQueFaz: 'End-to-end procurement chain. Help: Source-to-Pay Business Process.',
    paraQueServe: 'Reading Ariba + S/4 MM + Network as one flow.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  p2f: {
    nome: 'Plan-to-Fulfill',
    tipo: 'Process chain',
    oQueFaz: 'Planning-to-delivery chain. Help: Plan-to-Fulfill Business Process.',
    paraQueServe: 'IBP \u2192 S/4 \u2192 EWM/TM as one flow.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'r2r-hr': {
    nome: 'Recruit-to-Retire',
    tipo: 'Process chain',
    oQueFaz: "Employee lifecycle chain. Help: Recruit-to-Retire Business Process.",
    paraQueServe: 'SuccessFactors + Payroll + Fieldglass as one flow.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  i2m: {
    nome: 'Idea-to-Market',
    tipo: 'Process chain',
    oQueFaz: 'Innovation-to-product chain. Help: Idea to Market Business Process.',
    paraQueServe: 'Innovation Management + IPD + S/4 as one flow.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'trade-claims': {
    nome: 'SAP Intelligent Trade Claims Management',
    tipo: 'Trade promo',
    oQueFaz: 'Trade promotion claims. Help: Intelligent Trade Claims Management.',
    paraQueServe: 'Deducting and settling retailer claims.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'trade-management': {
    nome: 'SAP Trade Management',
    tipo: 'Trade',
    oQueFaz: 'Trade promotion management. Help: Trade Management.',
    paraQueServe: 'Planning channel promotions.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'intercompany-exchange': {
    nome: 'Intercompany data exchange',
    tipo: 'Utilities intercompany',
    oQueFaz: 'Intercompany exchange for Swiss electricity/gas utilities in S/4. Help: Intercompany Data Exchange for Swiss Electric and Gas Utilities.',
    paraQueServe: 'Market communication between group companies.',
    exemploReal: 'All Products, utilities vertical.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  igr: {
    nome: 'SAP Invoice and Goods Receipt Reconciliation',
    tipo: 'MM/FI',
    oQueFaz: 'Invoice vs goods-receipt reconciliation. Help: Invoice and Goods Receipt Reconciliation.',
    paraQueServe: 'Residual 3-way match when there\u2019s no VIM/Ariba Invoice.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'landscape-portal': {
    nome: 'Landscape Portal (ABAP environment)',
    tipo: 'ABAP Cloud ops',
    oQueFaz: 'Landscape portal for the S/4 Cloud ABAP environment. Help: Landscape Portal for SAP S/4HANA Cloud ABAP environment.',
    paraQueServe: 'Operating ABAP Cloud tenants.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  moc: {
    nome: 'SAP Management of Change',
    tipo: 'EHS / change',
    oQueFaz: 'Operational change management (plant, EHS). Help: Management of Change.',
    paraQueServe: 'Permit-to-work and facility changes.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'mdg-prometheus': {
    nome: 'MDG extensions by Prometheus Group',
    tipo: 'MDG add-on',
    oQueFaz: 'MDG EAM and retail/fashion extensions by Prometheus Group. Help lists several lines.',
    paraQueServe: 'Asset and fashion master data beyond standard MDG.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'metadata-management': {
    nome: 'SAP Metadata Management',
    tipo: 'Metadata',
    oQueFaz: 'Metadata management in the classic EIM estate. Help: Metadata Management.',
    paraQueServe: 'A metadata catalog alongside Information Steward.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'notes-management': {
    nome: 'SAP Notes Management',
    tipo: 'Notes',
    oQueFaz: 'Managing SAP Notes across the landscape. Help: Notes Management.',
    paraQueServe: 'Applying and tracking notes. Ops destination: Cloud ALM / LaMa.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'notification-social': {
    nome: 'Notification Integration for Social Media',
    tipo: 'Notifications',
    oQueFaz: 'Notification integration with social apps. Help: Notification Integration Service for Social Media Apps.',
    paraQueServe: 'Alerts on social channels.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  oasm: {
    nome: 'Online Application Submission Management',
    tipo: 'Online submission',
    oQueFaz: 'Online submission of applications / requests. Help: Online Application Submission Management.',
    paraQueServe: 'Public-sector / utilities submission portals.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  ods: {
    nome: 'SAP Order and Delivery Scheduling',
    tipo: 'Omnichannel scheduling',
    oQueFaz: 'Order and delivery scheduling. Help: Order and Delivery Scheduling. Satellite of the Order Management family.',
    paraQueServe: 'Promising and scheduling omnichannel deliveries.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'plm-recipe': {
    nome: 'SAP PLM Recipe Management',
    tipo: 'Recipes',
    oQueFaz: 'Product recipes (process / CPG). Help: PLM Recipe Management.',
    paraQueServe: 'Formulas and recipes before the process order.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'pos-classic': {
    nome: 'SAP Point-of-Sale (classic)',
    tipo: 'Legacy POS',
    oQueFaz: 'Classic Enterprise Point-of-Sale. Help: Point-of-Sale / Enterprise POS. Destination: Customer Checkout / Omnichannel POS by GK.',
    paraQueServe: 'Checkout in older landscapes.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Legacy.', cloud: 'Dimmed.', rise: 'Dimmed.' }
  },
  'process-object-builder': {
    nome: 'SAP Process Object Builder',
    tipo: 'Legacy A2A',
    oQueFaz: 'Process object builder in classic integration. Help: Process Object Builder.',
    paraQueServe: 'A2A process objects in PI/PO.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'workflow-mgmt': {
    nome: 'SAP Workflow Management / Process Visibility',
    tipo: 'Legacy workflow',
    oQueFaz: 'Workflow Management and Process Visibility on BTP (the line preceding Build Process Automation). Help: Process Visibility Capability Within Workflow Management.',
    paraQueServe: 'Older BTP workflows. Destination: Build Process Automation.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'product-model-viewer': {
    nome: 'SAP Product Model Viewer',
    tipo: 'PLM viewer',
    oQueFaz: 'Product model viewer. Help: Product Model Viewer / 3D Visual Enterprise.',
    paraQueServe: 'Viewing the 3D twin during engineering.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'product-transition': {
    nome: 'Product Transition Process',
    tipo: 'Product transition',
    oQueFaz: 'Product phase-in / phase-out transition process. Help: Product Transition Process.',
    paraQueServe: 'Replacing articles without breaking MRP.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'ppg-bdf': {
    nome: 'Product and Process Governance by BDF',
    tipo: 'PLM governance',
    oQueFaz: 'Product and process governance by BDF. Help: Product and Process Governance by BDF (and on S/4HANA).',
    paraQueServe: 'Governing product changes in regulated industry.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  pra: {
    nome: 'SAP Production and Revenue Accounting',
    tipo: 'Upstream oil',
    oQueFaz: 'Production and revenue accounting (oil & gas upstream). Help: Production and Revenue Accounting.',
    paraQueServe: 'Splitting well and joint-venture revenue.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  qir: {
    nome: 'SAP Quality Issue Resolution',
    tipo: 'Quality',
    oQueFaz: 'Collaborative quality-issue resolution. Help: Quality Issue Resolution and Quality Issue Management.',
    paraQueServe: '8D / CAPA with suppliers.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  're-tenant': {
    nome: 'RE-FX Tenant Relationship add-on',
    tipo: 'Real estate',
    oQueFaz: 'Tenant relationship add-on for Real Estate. Help: Real Estate Management add-on for Tenant Relationship Management.',
    paraQueServe: 'Contracts and service to the tenant.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  resolve: {
    nome: 'SAP Resolve',
    tipo: 'Support',
    oQueFaz: 'Resolution / supportability offering in the Help index.',
    paraQueServe: 'Routing product issues.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'revenue-growth': {
    nome: 'SAP Revenue Growth Management',
    tipo: 'Revenue growth',
    oQueFaz: 'Revenue growth management and optimization. Help: Revenue Growth Management / Revenue Growth Optimization.',
    paraQueServe: 'Price, mix and commercial growth.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'self-billing': {
    nome: 'SAP Self-Billing Cockpit',
    tipo: 'Self-billing',
    oQueFaz: 'Self-billing cockpit with customers/suppliers. Help: Self-Billing Cockpit.',
    paraQueServe: 'The customer bills itself based on deliveries.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'service-tax-br': {
    nome: 'Service Taxation Enhancements for Brazil',
    tipo: 'BR localization',
    oQueFaz: 'Brazil service taxation enhancements. Help: Service Taxation Enhancements for Brazil.',
    paraQueServe: 'BR service taxes in S/4.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'sso-classic': {
    nome: 'SAP Single Sign-On',
    tipo: 'Legacy SSO',
    oQueFaz: 'Classic SSO (Secure Login, Kerberos, X.509). Help: SAP Single Sign-On. Destination: IAS.',
    paraQueServe: 'On-premise SSO before IAS.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Active in many data centers.', cloud: 'Dimmed (IAS).', rise: 'Dimmed (IAS).' }
  },
  'social-media-int': {
    nome: 'Social Media Integration',
    tipo: 'Social',
    oQueFaz: 'Social integrations (China ESS, SuccessFactors Recruiting, LINE, SAC). Help lists several lines.',
    paraQueServe: 'Publishing and capturing social events.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  ssc: {
    nome: 'SAP Solution Sales Configuration',
    tipo: 'CPQ on-prem/cloud',
    oQueFaz: 'Solution configurator. Help: Solution Sales Configuration cloud edition, for S/4HANA, for Commerce Cloud. Sibling of CPQ.',
    paraQueServe: 'Configuring complex bundles in the ERP or the storefront.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  slc: {
    nome: 'SAP Supplier Lifecycle Management',
    tipo: 'Legacy suppliers',
    oQueFaz: 'On-premise supplier lifecycle. Help: SLC. Destination: Ariba + Network + MDG.',
    paraQueServe: 'Qualifying suppliers in classic ECC/S/4.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Legacy.', cloud: 'Dimmed.', rise: 'Dimmed.' }
  },
  srm: {
    nome: 'SAP Supplier Relationship Management',
    tipo: 'Legacy SRM',
    oQueFaz: 'Classic SRM. Help: SRM Server and add-ons. Destination: Ariba.',
    paraQueServe: 'Procurement in the Business Suite 7 world.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Legacy.', cloud: 'Hidden.', rise: 'Hidden.' }
  },
  'tank-planning': {
    nome: 'Tank Planning Cockpit',
    tipo: 'Oil tank farm',
    oQueFaz: 'Tank planning. Help: Tank Planning Cockpit.',
    paraQueServe: 'Moving product across tank farms.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'task-center': {
    nome: 'SAP Task Center',
    tipo: 'Unified inbox',
    oQueFaz: 'Single approvals inbox for S/4 + SuccessFactors + Build. Help: Task Center. Satellite of SAP Start / Work Zone.',
    paraQueServe: 'A single task queue for the user.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'tax-declaration-br': {
    nome: 'SAP Tax Declaration Framework for Brazil',
    tipo: 'BR tax',
    oQueFaz: 'Brazil tax declaration framework. Help: Tax Declaration Framework for Brazil and Tax Intelligence by All Tax.',
    paraQueServe: 'BR ancillary tax obligations.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'teamcenter-gw': {
    nome: 'Teamcenter gateway for PLM si',
    tipo: 'PLM connector',
    oQueFaz: 'Teamcenter by Siemens gateway for PLM system integration. Help: Teamcenter by Siemens gateway.',
    paraQueServe: 'Connecting Siemens PLM to S/4.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'translation-hub': {
    nome: 'SAP Translation Hub',
    tipo: 'Translation',
    oQueFaz: 'BTP translation service. Help: Translation Hub.',
    paraQueServe: 'Translating UI text and master data.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  tlc: {
    nome: 'Transport Load Consolidation',
    tipo: 'TM load',
    oQueFaz: 'Load consolidation. Help: Transport Load Consolidation.',
    paraQueServe: 'Filling trucks / containers in TM.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'print-forms': {
    nome: 'Print Forms Service',
    tipo: 'Forms',
    oQueFaz: 'BTP print forms service. Help: Print Forms Service.',
    paraQueServe: 'Document output without an on-premise ADS.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'private-link': {
    nome: 'SAP Private Link Service',
    tipo: 'Private network',
    oQueFaz: 'Private Link on BTP to reach hyperscaler resources without the public internet. Help: Private Link Service. Item \u2461\u2460 in the Azure diagram.',
    paraQueServe: 'BTP \u2194 RISE spoke without leaving the internet.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'process-control': {
    nome: 'SAP Process Control',
    tipo: 'GRC controls',
    oQueFaz: 'Process controls within GRC. Help: Process Control.',
    paraQueServe: 'Testing SOX / internal controls.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'celonis-mining': {
    nome: 'SAP Process Mining by Celonis',
    tipo: 'Legacy process mining',
    oQueFaz: 'Process mining by Celonis in the Help index. Destination: Signavio Process Intelligence.',
    paraQueServe: 'Mining processes in landscapes that still have the Celonis bundle.',
    exemploReal: 'All Products.',
    naoConfundir: 'Not the Signavio Process Intelligence (current target).',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  plc: {
    nome: 'SAP Product Lifecycle Costing',
    tipo: 'Target costing',
    oQueFaz: 'Lifecycle costing / target cost. Help: Product Lifecycle Costing and PCE.',
    paraQueServe: 'Target cost in engineering, before S/4 CO.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'plm-onprem': {
    nome: 'SAP Product Lifecycle Management',
    tipo: 'Classic PLM',
    oQueFaz: 'On-premise PLM / digital products. Help: Product Lifecycle Management. Cloud destination: IPD.',
    paraQueServe: 'Engineering in classic landscapes.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Active if PLM already exists.', cloud: 'Dimmed (IPD).', rise: 'Optional.' }
  },
  'promotion-mgmt': {
    nome: 'SAP Promotion Management for Retail',
    tipo: 'Retail promotions',
    oQueFaz: 'Retail promotion management. Help: Promotion Management for Retail and Omnichannel Promotion Pricing.',
    paraQueServe: 'Flyers and promotional pricing in-store.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'quality-center': {
    nome: 'SAP Quality Center by Micro Focus',
    tipo: 'Legacy testing',
    oQueFaz: 'Quality Center by Micro Focus. Help. Destination: Tricentis + Cloud ALM.',
    paraQueServe: 'Classic test repository.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'insurance-underwriting': {
    nome: 'SAP Quotation and Underwriting',
    tipo: 'Insurance',
    oQueFaz: 'Insurance quotation and underwriting. Help: Quotation and Underwriting / Product Quotation and Underwriting Management / Underwriting for Insurance.',
    paraQueServe: 'Underwriting risk in the insurance core.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  r3: {
    nome: 'SAP R/3',
    tipo: 'Ancestor ERP',
    oQueFaz: "ECC's ancestor. Help: SAP R/3. Purely educational / extreme legacy.",
    paraQueServe: 'Explaining where ECC came from.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Historical legacy.', cloud: 'Hidden.', rise: 'Hidden.' }
  },
  'rabbitmq-btp': {
    nome: 'RabbitMQ on SAP BTP',
    tipo: 'Messaging',
    oQueFaz: 'RabbitMQ as a managed service on BTP. Help: RabbitMQ on SAP BTP.',
    paraQueServe: 'Polyglot messaging for extensions.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Absent.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'redis-btp': {
    nome: 'Redis on SAP BTP',
    tipo: 'Cache',
    oQueFaz: 'Managed Redis on BTP. Help: Redis on SAP BTP.',
    paraQueServe: 'Cache and sessions for extensions.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Absent.', cloud: 'Optional.', rise: 'Optional.' }
  },
  rto: {
    nome: 'SAP Real-Time Offer Management',
    tipo: 'Real-time offers',
    oQueFaz: 'Real-time offers. Help: Real-Time Offer Management.',
    paraQueServe: 'Next-best-offer on the channel.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  recommerce: {
    nome: 'SAP Recommerce',
    tipo: 'Secondhand',
    oQueFaz: 'Recommerce / secondhand. Help: Recommerce.',
    paraQueServe: 'Returns that go back on sale.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'regulation-mgmt': {
    nome: 'SAP Regulation Management by Greenlight',
    tipo: 'GRC regulation',
    oQueFaz: 'Regulation and mitigation AVM by Greenlight. Help: Regulation Management.',
    paraQueServe: 'Mapping regulations to controls.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'regulatory-change': {
    nome: 'Regulatory Change Manager',
    tipo: 'Regulation',
    oQueFaz: 'Regulatory change manager. Help: Regulatory Change Manager.',
    paraQueServe: 'Tracking changes in the law.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  rbsc: {
    nome: 'Repository Based Shipment Channel',
    tipo: 'Software delivery',
    oQueFaz: 'Repository-based shipment channel. Help: Repository Based Shipment Channel.',
    paraQueServe: 'Receiving SAP stacks.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'retail-execution': {
    nome: 'SAP Retail Execution',
    tipo: 'Retail field force',
    oQueFaz: 'Retail field execution (visits, planogram). Help: Retail Execution and mobile app.',
    paraQueServe: "Merchandisers in the customer's store.",
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  rpm: {
    nome: 'SAP Returnable Packaging Management',
    tipo: 'Returnable packaging',
    oQueFaz: 'Returnable packaging / pallets. Help: Returnable Packaging Management.',
    paraQueServe: 'Pallet accounts with suppliers and customers.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'risk-mgmt': {
    nome: 'SAP Risk Management',
    tipo: 'GRC risk',
    oQueFaz: 'Enterprise risk management. Help: Risk Management.',
    paraQueServe: 'Risk register and KRIs.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'rounds-manager': {
    nome: 'SAP Rounds Manager',
    tipo: 'Legacy rounds',
    oQueFaz: 'Classic maintenance rounds. Help: Rounds Manager. Destination: Service and Asset Manager.',
    paraQueServe: 'Asset rounds in older landscapes.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'rural-sourcing': {
    nome: 'SAP Rural Sourcing Management',
    tipo: 'Agro sourcing',
    oQueFaz: 'Rural sourcing / agricultural origination. Help: Rural Sourcing Management.',
    paraQueServe: 'Buying crops from smallholder producers.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'sales-insights-retail': {
    nome: 'SAP Sales Insights for Retail',
    tipo: 'Retail analytics',
    oQueFaz: 'Retail sales insights. Help: Sales Insights for Retail.',
    paraQueServe: 'Store sell-through and margin.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'sop-classic': {
    nome: 'SAP Sales and Operations Planning',
    tipo: 'Legacy S&OP',
    oQueFaz: 'Classic S&OP. Help: Sales and Operations Planning. Destination: IBP.',
    paraQueServe: 'S&OP on ECC/APO.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Legacy.', cloud: 'Dimmed.', rise: 'Dimmed.' }
  },
  'screen-personas': {
    nome: 'SAP Screen Personas',
    tipo: 'Classic UX',
    oQueFaz: 'Simplifying SAP GUI screens. Help: Screen Personas.',
    paraQueServe: 'Giving the GUI an acceptable face before Fiori.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'secondary-distribution': {
    nome: 'SAP Secondary Distribution for Oil and Gas',
    tipo: 'Downstream oil',
    oQueFaz: 'Oil & gas secondary distribution. Help: Secondary Distribution for Oil and Gas / S/4 Supply Chain for secondary distribution.',
    paraQueServe: 'Terminals and deliveries to stations.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'security-dd': {
    nome: 'Security Due Diligence Service',
    tipo: 'Security review',
    oQueFaz: 'Security due diligence service. Help: Security Due Diligence Service.',
    paraQueServe: "Reviewing the landscape's security posture.",
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'shop-floor-mgr': {
    nome: 'SAP Shop Floor Manager',
    tipo: 'Classic MES',
    oQueFaz: 'Classic shop-floor manager. Help: Shop Floor Manager. Destination: Digital Manufacturing.',
    paraQueServe: 'Order execution in older MES.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'smart-business': {
    nome: 'SAP Smart Business',
    tipo: 'Fiori KPI',
    oQueFaz: 'Classic Fiori KPI tiles. Help: Smart Business.',
    paraQueServe: 'KPI tiles on the launchpad. Destination: SAC / Work Zone cards.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'slt-toolset': {
    nome: 'Software Logistics Toolset',
    tipo: 'SUM / SL',
    oQueFaz: 'Software Logistics Toolset (SUM, SPAM, etc.). Help: Software Logistics Toolset.',
    paraQueServe: 'On-premise upgrades and patches.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'solution-hub': {
    nome: 'SAP Solution Hub',
    tipo: 'Solution catalog',
    oQueFaz: 'Solution hub. Help: Solution Hub.',
    paraQueServe: 'Discovering solutions and packages.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'sourcing-clm': {
    nome: 'SAP Sourcing and CLM',
    tipo: 'Legacy sourcing',
    oQueFaz: 'Classic Sourcing and Contract Lifecycle Management. Help: Sourcing and SAP Contract Lifecycle Management. Destination: Ariba.',
    paraQueServe: 'RFx and contracts in the pre-Ariba-cloud world.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'sports-one': {
    nome: 'SAP Sports One',
    tipo: 'Sports',
    oQueFaz: 'Suite for clubs and federations. Help: Sports One.',
    paraQueServe: 'Roster, medical, sports training.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'store-mgmt-gk': {
    nome: 'SAP Store Management by GK',
    tipo: 'GK store',
    oQueFaz: 'Store management by GK. Help: Store Management by GK.',
    paraQueServe: 'Store back-office alongside the GK POS.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'strategy-mgmt': {
    nome: 'SAP Strategy Management',
    tipo: 'Strategy',
    oQueFaz: 'Strategy Management (BSC). Help: Strategy Management.',
    paraQueServe: 'Strategy maps and initiatives.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'scm-classic': {
    nome: 'SAP Supply Chain Management',
    tipo: 'Legacy SCM suite',
    oQueFaz: 'Classic SCM suite (APO, older EWM, older TM, SNC). Help: Supply Chain Management.',
    paraQueServe: "Explaining IBP/EWM/TM's ancestor.",
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  scpm: {
    nome: 'SAP Supply Chain Performance Management',
    tipo: 'Supply KPI',
    oQueFaz: 'Supply chain performance. Help: Supply Chain Performance Management.',
    paraQueServe: 'Chain KPIs. Destination: SAC + IBP analytics.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'support-content': {
    nome: 'Support Content',
    tipo: 'Support',
    oQueFaz: 'Support content in Help. Help: Support Content / Built-In Support.',
    paraQueServe: 'In-product support articles.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'hana-supportability': {
    nome: 'Supportability Tools for SAP HANA',
    tipo: 'HANA ops',
    oQueFaz: 'HANA supportability tools. Help: Supportability Tools for SAP HANA.',
    paraQueServe: 'Diagnosing on-premise HANA.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  tao: {
    nome: 'SAP Test Acceleration and Optimization',
    tipo: 'Legacy testing',
    oQueFaz: 'TAO. Help: Test Acceleration and Optimization. Destination: Tricentis.',
    paraQueServe: 'Speeding up tests in SolMan.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  tdms: {
    nome: 'SAP Test Data Migration Server',
    tipo: 'Test data',
    oQueFaz: 'TDMS. Help: Test Data Migration Server.',
    paraQueServe: 'Trimming and masking data from PRD for QA.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  toc: {
    nome: 'Theory of Constraints',
    tipo: 'Planning add-on',
    oQueFaz: 'Theory of Constraints in planning. Help: Theory of Constraints.',
    paraQueServe: 'Bottlenecks in planning.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  tpi: {
    nome: 'SAP Trading Platform Integration',
    tipo: 'Treasury',
    oQueFaz: 'Integration with trading platforms. Help: Trading Platform Integration.',
    paraQueServe: 'Treasury deals entering the TRM.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'transactional-banking': {
    nome: 'SAP Transactional Banking',
    tipo: 'Banking core',
    oQueFaz: 'Transactional banking core. Help: Transactional Banking for S/4HANA.',
    paraQueServe: 'Accounts and payments at the bank.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  trp: {
    nome: 'SAP Transportation Resource Planning',
    tipo: 'TM resources',
    oQueFaz: 'Transportation resource planning. Help: Transportation Resource Planning.',
    paraQueServe: 'Tractors, trailers, crews.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  transportplaner: {
    nome: 'Transportplaner',
    tipo: 'Transport planning',
    oQueFaz: 'Transportplaner in the Help index (tactical planning).',
    paraQueServe: 'Tactical transport plan.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'ui-masking': {
    nome: 'UI Data Protection Masking',
    tipo: 'UI masking',
    oQueFaz: 'Masking sensitive data in the UI. Help: UI Data Protection Masking.',
    paraQueServe: 'Hiding tax IDs/IBANs on screens.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  upc: {
    nome: 'Unified Planning Center',
    tipo: 'Planning hub',
    oQueFaz: 'Unified planning center. Help: Unified Planning Center.',
    paraQueServe: 'A hub for plans (SAC/IBP/PPM).',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'utilities-css': {
    nome: 'Utilities Customer Self-Service',
    tipo: 'Utilities self-service',
    oQueFaz: 'Utilities customer self-service. Help: Utilities Customer Self-Service Agent / Multichannel Foundation.',
    paraQueServe: 'The energy customer portal.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'work-manager': {
    nome: 'SAP Work Manager',
    tipo: 'Legacy mobile',
    oQueFaz: 'Classic Work Manager. Help: Work Manager. Destination: Service and Asset Manager.',
    paraQueServe: 'Technicians in Agentry-based landscapes.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  cproject: {
    nome: 'SAP cProject Suite',
    tipo: 'Legacy projects',
    oQueFaz: 'Classic cProjects. Help: cProject Suite. Destination: PPM / S/4 PS.',
    paraQueServe: 'Projects in Business Suite 7.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  cpm: {
    nome: 'SAP Commercial Project Management',
    tipo: 'Commercial projects',
    oQueFaz: 'CPM \u2014 customer projects (billing, forecast). Help: Commercial Project Management.',
    paraQueServe: 'Professional services and project manufacturing.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  eis: {
    nome: 'SAP Enterprise Inventory and Service-Level Optimization',
    tipo: 'Multi-echelon inventory',
    oQueFaz: 'EIS \u2014 inventory and service-level optimization. Help: Enterprise Inventory and Service-Level Optimization.',
    paraQueServe: 'Multi-echelon stock. Conceptual destination: IBP inventory.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'enterprise-chatbot': {
    nome: 'SAP Enterprise Chatbot',
    tipo: 'Legacy chatbot',
    oQueFaz: 'Classic enterprise chatbot. Help: Enterprise Chatbot. Destination: Joule.',
    paraQueServe: 'FAQs and tickets before Joule.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'edm-digital': {
    nome: 'SAP Enterprise Digital Management',
    tipo: 'Digital ops',
    oQueFaz: 'Enterprise Digital Management in the Help index.',
    paraQueServe: 'Operating digital channels.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  esm: {
    nome: 'SAP Enterprise Service Management',
    tipo: 'ESM',
    oQueFaz: 'Enterprise service management (also a SuccessFactors ESM line). Help: Enterprise Service Management.',
    paraQueServe: 'Internal services / shared services.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'big-data-services': {
    nome: 'SAP Big Data Services',
    tipo: 'Legacy big data',
    oQueFaz: 'Big data services from 2022 in Help. Destination: BDC / Datasphere / native hyperscaler.',
    paraQueServe: 'Classic SAP lakes.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'margin-assurance': {
    nome: 'Big Data Margin Assurance',
    tipo: 'Margin',
    oQueFaz: 'Margin assurance with big data. Help: Big Data Margin Assurance.',
    paraQueServe: 'Detecting margin leakage.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'forecast-opt-hana': {
    nome: 'Forecast Optimization on HANA',
    tipo: 'Forecast',
    oQueFaz: 'Forecast optimization on HANA. Help: Forecast Optimization on HANA.',
    paraQueServe: 'Classic statistical forecasting. Destination: IBP / Predictive Replenishment.',
    exemploReal: 'All Products.',
    nesteCenario: { onprem: 'Optional / dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'business-suite': {
    nome: 'SAP Business Suite (cloud)',
    tipo: 'Commercial suite',
    oQueFaz: "Current commercial name on sap.com/products.html: the cloud portfolio joining Cloud ERP (applications), Business AI (Joule and agents), Business Data Cloud and BTP. Not the on-premise Business Suite 7 (ECC). The official page describes it as an autonomous suite: finance, spend, supply chain, HCM, CX and industry, with Joule agents executing over SAP data and processes.",
    paraQueServe: "Reading the map the way SAP sells in 2026, not just as a SKU list. Mix: Business Suite = s4hana cloud + LoB + bdc + joule + btp. RISE and GROW are the contract routes into this suite.",
    exemploReal: 'sap.com/products.html and sap.com/products/business-suite.html position Business Suite as a flagship product, powered by Business AI + BDC + applications, on top of BTP.',
    naoConfundir: 'NOT SAP Business Suite 7 / ECC. That ancestor is the ecc card.',
    nesteCenario: {
      onprem: 'Not relevant (the cloud suite). The on-premise ancestor is ECC / Business Suite 7.',
      cloud: 'Active as the commercial umbrella of GROW.',
      rise: 'Active as the commercial umbrella of RISE.'
    }
  },
  'cloud-erp': {
    nome: 'SAP Cloud ERP',
    tipo: 'Cloud ERP (brand)',
    oQueFaz: 'Commercial name on sap.com/products.html and /erp.html for the ERP in the cloud. In practice this is S/4HANA Cloud (Public Edition on GROW, Private Edition on RISE). The page talks about a ready-to-run ERP with embedded AI in finance, supply chain and procurement.',
    paraQueServe: "When the customer hears 'Cloud ERP' rather than 'S/4'. This card points to s4hana. It doesn't duplicate the digital core: it's the marketing label.",
    exemploReal: 'Featured product on sap.com/products.html linking to /products/erp/s4hana.html.',
    naoConfundir: 'Not a third ERP alongside S/4 Cloud. Same engine, different commercial name.',
    nesteCenario: {
      onprem: 'Not relevant.',
      cloud: 'Active. Commercial synonym for Public Edition.',
      rise: 'Active. Commercial synonym for Private Edition / RISE Cloud ERP.'
    }
  },
  'visual-enterprise': {
    nome: 'SAP 3D Visual Enterprise',
    tipo: 'PLM 3D',
    oQueFaz: '3D visualization tied to business data. A-Z: SAP 3D Visual Enterprise. Sibling of Product Model Viewer.',
    paraQueServe: 'Viewing the 3D twin on the shop floor and in service.',
    exemploReal: 'sap.com/products/a-z.html entry.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'absence-wfs': {
    nome: 'SAP Absence and Leave Management by WorkForce Software',
    tipo: 'Absence',
    oQueFaz: 'Absence requests by WorkForce Software. A-Z HCM.',
    paraQueServe: 'Vacation and leave when WFS is in the landscape (beyond SF Time).',
    exemploReal: 'A-Z: Absence and Leave Management.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'access-control': {
    nome: 'SAP Access Control',
    tipo: 'GRC SoD',
    oQueFaz: 'On-premise SoD and provisioning. A-Z: Access Control. GRC family; IAG is the cloud sibling.',
    paraQueServe: 'Approving access and detecting conflicts in on-premise ECC/S/4.',
    exemploReal: 'A-Z Financial management / Access Control.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'avm-pathlock': {
    nome: 'SAP Access Violation Management by Pathlock',
    tipo: 'Partner SoD',
    oQueFaz: 'Access violations by Pathlock. A-Z.',
    paraQueServe: 'Analyzing SoD violations in hybrid landscapes.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'blackline-asa': {
    nome: 'SAP Account Substantiation and Automation by BlackLine',
    tipo: 'Partner close',
    oQueFaz: 'Account substantiation and automation by BlackLine. A-Z.',
    paraQueServe: 'Reconciling accounts at close, alongside the Closing Cockpit.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  ase: {
    nome: 'SAP Adaptive Server Enterprise',
    tipo: 'OLTP DB',
    oQueFaz: 'ASE / Sybase SQL Server. A-Z. Distinct from HANA and SQL Anywhere.',
    paraQueServe: 'Classic OLTP still running at many customers.',
    exemploReal: 'A-Z: Adaptive Server Enterprise.',
    nesteCenario: { onprem: 'Optional legacy.', cloud: 'Hidden.', rise: 'Hidden.' }
  },
  'syniti-adm': {
    nome: 'SAP Advanced Data Migration by Syniti',
    tipo: 'Migration',
    oQueFaz: 'Data migration and quality by Syniti. A-Z.',
    paraQueServe: 'Brownfield loads / S/4 conversion.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  afc: {
    nome: 'SAP Advanced Financial Closing',
    tipo: 'Cloud close',
    oQueFaz: 'Advanced financial close in the cloud. A-Z. Evolution of the Closing Cockpit.',
    paraQueServe: 'Orchestrating the close in S/4 Cloud / RISE.',
    exemploReal: 'A-Z: Advanced Financial Closing.',
    nesteCenario: { onprem: 'Dimmed (use FCC).', cloud: 'Recommended.', rise: 'Recommended.' }
  },
  apo: {
    nome: 'SAP Advanced Planning and Optimization',
    tipo: 'Legacy APO',
    oQueFaz: 'Classic APO. A-Z. Destination: IBP + S/4 PP/DS + eATP.',
    paraQueServe: 'SNP/DP/PP-DS in Business Suite 7.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Legacy.', cloud: 'Hidden.', rise: 'Dimmed.' }
  },
  'att-pharma': {
    nome: 'SAP Advanced Track and Trace for Pharmaceuticals',
    tipo: 'Pharma T&T',
    oQueFaz: 'Pharmaceutical track and trace in S/4. A-Z.',
    paraQueServe: 'Serialization and DSCSA/EU-FMD compliance.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'agent-lm': {
    nome: 'SAP Agent Lifecycle Management',
    tipo: 'Agents',
    oQueFaz: 'Agent lifecycle (insurance / channel). A-Z.',
    paraQueServe: 'Agent onboarding and compliance.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'agent-pm': {
    nome: 'SAP Agent Performance Management',
    tipo: 'Agents',
    oQueFaz: 'Agent performance and commissions. A-Z.',
    paraQueServe: 'Channel incentives.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  acm: {
    nome: 'SAP Agricultural Contract Management',
    tipo: 'Agro contracts',
    oQueFaz: 'Agricultural contracts. A-Z.',
    paraQueServe: 'Buying crops and positions.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'ai-agent-hub': {
    nome: 'SAP AI Agent Hub',
    tipo: 'AI agents',
    oQueFaz: 'AI agent hub. A-Z: SAP AI Agent Hub. Where Joule agents are published and governed.',
    paraQueServe: 'Catalog and governance of agents on BTP.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Absent.', cloud: 'Recommended with Joule.', rise: 'Recommended with Joule.' }
  },
  aif: {
    nome: 'SAP Application Interface Framework',
    tipo: 'AIF',
    oQueFaz: 'Interface framework in ECC/S/4. A-Z. Complements PI/PO and Integration Suite on the application side.',
    paraQueServe: 'Monitoring and mapping IDocs/proxies in the ERP.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'opentext-archive': {
    nome: 'SAP Archiving and Document Access by OpenText',
    tipo: 'Archiving',
    oQueFaz: 'Archiving and document access by OpenText. A-Z.',
    paraQueServe: 'Archiving business documents outside HANA.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'asset-workbench': {
    nome: 'SAP Asset Information Workbench',
    tipo: 'Assets',
    oQueFaz: 'Asset information workbench. A-Z.',
    paraQueServe: 'Technical asset data for APM/EAM.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'audit-mgmt': {
    nome: 'SAP Audit Management',
    tipo: 'GRC audit',
    oQueFaz: 'Internal audit. A-Z. GRC family.',
    paraQueServe: 'Audit plan and working papers.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'batch-release-ls': {
    nome: 'SAP Batch Release Hub for Life Sciences',
    tipo: 'Life sciences',
    oQueFaz: 'Pharmaceutical batch release. A-Z.',
    paraQueServe: 'Batch release with quality data and compliance.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'broker-reconciliation': {
    nome: 'SAP Broker Reconciliation for Commodity Derivatives',
    tipo: 'Commodities',
    oQueFaz: 'Broker reconciliation in derivatives. A-Z.',
    paraQueServe: 'Commodity treasury.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  bas: {
    nome: 'SAP Business Application Studio',
    tipo: 'Cloud IDE',
    oQueFaz: "BTP's cloud IDE. A-Z. Successor to Web IDE.",
    paraQueServe: 'Developing CAP, Fiori, clean-core extensions.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Absent.', cloud: 'Active with BTP.', rise: 'Active with BTP.' }
  },
  'integrity-screening': {
    nome: 'SAP Business Integrity Screening',
    tipo: 'Fraud',
    oQueFaz: 'Integrity / fraud screening. A-Z.',
    paraQueServe: 'Detecting suspicious payments and partners.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'bn-asset': {
    nome: 'SAP Business Network Asset Collaboration',
    tipo: 'Network assets',
    oQueFaz: 'Asset collaboration on the Business Network. A-Z.',
    paraQueServe: 'OEM and operator share the asset twin.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'bn-commerce': {
    nome: 'SAP Business Network Commerce Automation',
    tipo: 'Network procurement',
    oQueFaz: 'Commercial automation on the Network (PO, ASN, invoice). A-Z.',
    paraQueServe: 'Transacting with suppliers on the network.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'bn-freight': {
    nome: 'SAP Business Network Freight Collaboration',
    tipo: 'Network freight',
    oQueFaz: 'Collaboration with carriers. A-Z.',
    paraQueServe: 'Freight tendering and tracking.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'bn-gtt': {
    nome: 'SAP Business Network Global Track and Trace',
    tipo: 'GTT',
    oQueFaz: 'Global track and trace on the Network. A-Z.',
    paraQueServe: 'Multi-modal shipment visibility.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'bn-traceability': {
    nome: 'SAP Business Network Material Traceability',
    tipo: 'Material traceability',
    oQueFaz: 'Material traceability on the Network. A-Z.',
    paraQueServe: 'Batch origin across the network.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'bn-planning': {
    nome: 'SAP Business Network Planning Collaboration',
    tipo: 'Network planning',
    oQueFaz: 'Plan collaboration with partners. A-Z.',
    paraQueServe: 'Sharing IBP forecasts with suppliers.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'bn-scc': {
    nome: 'SAP Business Network Supply Chain Collaboration',
    tipo: 'SCC',
    oQueFaz: 'Supply Chain Collaboration on the Network. A-Z.',
    paraQueServe: 'Forecast, inventory and orders with the supplier.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'vistex-channel': {
    nome: 'SAP Channel Program Management by Vistex',
    tipo: 'Vistex channel',
    oQueFaz: 'Channel programs by Vistex. A-Z.',
    paraQueServe: 'Incentives and reseller programs.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  mirakl: {
    nome: 'SAP Commerce Marketplace Management by Mirakl',
    tipo: 'Marketplace',
    oQueFaz: 'Marketplace on Commerce Cloud by Mirakl. A-Z.',
    paraQueServe: 'Multi-seller storefront.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'commodity-mgmt': {
    nome: 'SAP Commodity Management',
    tipo: 'Commodities',
    oQueFaz: 'Commodity management in S/4. A-Z.',
    paraQueServe: 'Commodity contracts and risk.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'complaint-handling': {
    nome: 'SAP Complaint Handling',
    tipo: 'Complaints',
    oQueFaz: 'Complaint handling. A-Z.',
    paraQueServe: 'Quality / customer complaints.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'opentext-cms': {
    nome: 'SAP Content Management Core by OpenText',
    tipo: 'ECM',
    oQueFaz: 'Content management core by OpenText. A-Z.',
    paraQueServe: 'ECM repository alongside S/4.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  skillsoft: {
    nome: 'SAP Content Stream by Skillsoft',
    tipo: 'Learning content',
    oQueFaz: 'Skillsoft content in Learning. A-Z.',
    paraQueServe: 'Training catalog.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  serialization: {
    nome: 'SAP Corporate Serialization',
    tipo: 'Serialization',
    oQueFaz: 'Corporate serialization. A-Z.',
    paraQueServe: 'End-to-end serial numbers.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  crystal: {
    nome: 'SAP Crystal Reports',
    tipo: 'Reporting',
    oQueFaz: 'Crystal Reports / Crystal Server / Crystal Solutions. A-Z. Distinct from SAC.',
    paraQueServe: 'Classic pixel-perfect reports.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  car: {
    nome: 'SAP Customer Activity Repository',
    tipo: 'Retail CAR',
    oQueFaz: 'CAR — retail customer activity repository. A-Z.',
    paraQueServe: 'POS, stock and demand in one view.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  cdp: {
    nome: 'SAP Customer Data Platform',
    tipo: 'CDP',
    oQueFaz: 'CDP. A-Z. Sibling of Customer Data Cloud (CIAM); the CDP profiles the customer 360.',
    paraQueServe: 'Unifying customer events for CX.',
    exemploReal: 'A-Z.',
    naoConfundir: 'Not Customer Data Cloud (that is CIAM/Gigya).',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'dairy-msg': {
    nome: 'SAP Dairy Management by msg',
    tipo: 'Dairy',
    oQueFaz: 'Dairy by msg. A-Z.',
    paraQueServe: 'Milk intake and yield.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'vistex-data': {
    nome: 'SAP Data Maintenance by Vistex',
    tipo: 'Vistex master data',
    oQueFaz: 'Data maintenance by Vistex. A-Z.',
    paraQueServe: 'Vistex pricing and master data.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'dqm-location': {
    nome: 'SAP Data Quality Management, location microservices',
    tipo: 'Address DQ',
    oQueFaz: 'Address quality microservices. A-Z.',
    paraQueServe: 'Validating addresses in BTP/S/4 apps.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'opentext-dam': {
    nome: 'SAP Digital Asset Management Cloud by OpenText',
    tipo: 'DAM',
    oQueFaz: 'Cloud DAM by OpenText. A-Z.',
    paraQueServe: 'Digital assets (images, video) for CX/PLM.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'document-ai': {
    nome: 'SAP Document AI',
    tipo: 'Document AI',
    oQueFaz: 'Document AI on BTP (ex-Document Information Extraction). A-Z.',
    paraQueServe: 'Extracting invoices, orders and IDs with AI.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Dimmed.', cloud: 'Recommended.', rise: 'Recommended.' }
  },
  'opentext-presentment': {
    nome: 'SAP Document Presentment by OpenText',
    tipo: 'Presentment',
    oQueFaz: 'Document presentment by OpenText. A-Z.',
    paraQueServe: 'Sending invoices/statements to the customer.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'e-mobility': {
    nome: 'SAP E-Mobility',
    tipo: 'Electric mobility',
    oQueFaz: 'E-Mobility. A-Z.',
    paraQueServe: 'Charging and electric fleet.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  ectr: {
    nome: 'SAP Engineering Control Center',
    tipo: 'ECTR',
    oQueFaz: 'Engineering Control Center (CAD integration into SAP). A-Z.',
    paraQueServe: 'Engineer saves the model into S/4/PLM.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'vistex-excise': {
    nome: 'SAP Excise Tax Management by Vistex',
    tipo: 'Excise tax',
    oQueFaz: 'Excise duties by Vistex. A-Z.',
    paraQueServe: 'Excise on beverages, tobacco, fuel.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'opentext-xecm': {
    nome: 'SAP Extended ECM by OpenText',
    tipo: 'xECM',
    oQueFaz: 'Extended ECM by OpenText. A-Z.',
    paraQueServe: 'Extended ECM linked to SAP objects.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'vistex-price': {
    nome: 'SAP Extended Price Management by Vistex',
    tipo: 'Vistex pricing',
    oQueFaz: 'Extended pricing by Vistex. A-Z.',
    paraQueServe: 'Complex price lists and channel price.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'vistex-grower': {
    nome: 'SAP Grower Management for Perishables by Vistex',
    tipo: 'Growers',
    oQueFaz: 'Perishables growers by Vistex. A-Z.',
    paraQueServe: 'Contracts with farmers.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'incentive-mgmt': {
    nome: 'SAP Incentive Management',
    tipo: 'Incentives',
    oQueFaz: 'Incentive Management (and Vistex Incentive Administration). A-Z.',
    paraQueServe: 'Sales force commissions.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'information-steward': {
    nome: 'SAP Information Steward',
    tipo: 'Classic DQ',
    oQueFaz: 'Information Steward. A-Z. EIM family with Data Services.',
    paraQueServe: 'Profiling and validating data quality on-premise.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'intelligent-agriculture': {
    nome: 'SAP Intelligent Agriculture',
    tipo: 'Agro',
    oQueFaz: 'Intelligent agriculture. A-Z.',
    paraQueServe: 'Plots, harvests and agricultural compliance.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  icsm: {
    nome: 'SAP Intelligent Clinical Supply Management',
    tipo: 'Clinical trials',
    oQueFaz: 'Clinical trial supply. A-Z.',
    paraQueServe: 'Clinical kits and blinding.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'blackline-ic': {
    nome: 'SAP Intercompany Governance by BlackLine',
    tipo: 'Intercompany',
    oQueFaz: 'Intercompany governance by BlackLine. A-Z.',
    paraQueServe: 'Reconciling IC across the group.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  iq: {
    nome: 'SAP IQ',
    tipo: 'Classic columnar',
    oQueFaz: 'Sybase IQ, columnar warehouse. A-Z. Destination: HANA Cloud / Datasphere / BDC.',
    paraQueServe: 'Classic SAP Sybase DWH.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Legacy.', cloud: 'Dimmed.', rise: 'Dimmed.' }
  },
  'joule-studio': {
    nome: 'SAP Joule Studio',
    tipo: 'Agent studio',
    oQueFaz: 'Studio for building Joule skills and agents. A-Z and the Alok post. SCH-JOULE-STUDIO schematic.',
    paraQueServe: 'Extending Joule without touching the core.',
    exemploReal: 'A-Z: Joule Studio.',
    nesteCenario: { onprem: 'Absent.', cloud: 'Recommended with Joule.', rise: 'Recommended.' }
  },
  'joule-consultants': {
    nome: 'SAP Joule for Consultants',
    tipo: 'AI for consultants',
    oQueFaz: 'Joule for consultants (activate, configure, explore). A-Z.',
    paraQueServe: 'Accelerating Activate / RISE projects.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'joule-developers': {
    nome: 'Joule for developers',
    tipo: 'AI for dev',
    oQueFaz: 'Joule in BAS / ABAP / Build Code. A-Z.',
    paraQueServe: 'Generating and explaining code in extensions.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Dimmed.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'knowledge-central': {
    nome: 'SAP Knowledge Central by NICE',
    tipo: 'CX knowledge',
    oQueFaz: 'Knowledge central by NICE. A-Z.',
    paraQueServe: 'Knowledge base in the service desk.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'knowledge-graph': {
    nome: 'SAP Knowledge Graph',
    tipo: 'Graph',
    oQueFaz: 'Knowledge Graph (HANA Cloud / BDC). A-Z.',
    paraQueServe: 'Semantic relationships for Joule grounding.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  slt: {
    nome: 'SAP Landscape Transformation Replication Server',
    tipo: 'SLT',
    oQueFaz: 'SLT — trigger-based replication to HANA / CFIN / Datasphere. A-Z. Distinct from the Sybase Replication Server.',
    paraQueServe: 'Replicating ECC/S/4 to HANA, BW, CFIN, BTC.',
    exemploReal: 'A-Z.',
    naoConfundir: 'Not the Sybase Replication Server (replication-server card).',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  lt: {
    nome: 'SAP Landscape Transformation',
    tipo: 'Landscape conversion',
    oQueFaz: 'LT — landscape transformations (carve-out, merge). A-Z.',
    paraQueServe: 'M&A and carve-out of SAP customers.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'learning-hub': {
    nome: 'SAP Learning Hub',
    tipo: 'Training',
    oQueFaz: 'Learning Hub. A-Z.',
    paraQueServe: 'Official SAP training for the project.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'linear-asset': {
    nome: 'SAP Linear Asset Management',
    tipo: 'Linear assets',
    oQueFaz: 'Linear assets (pipeline, rail, network). A-Z.',
    paraQueServe: 'EAM for linear infrastructure.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'market-rates': {
    nome: 'SAP Market Rates Management',
    tipo: 'Treasury',
    oQueFaz: 'Market Rates Management. A-Z.',
    paraQueServe: 'FX and curves for TRM.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'meat-msg': {
    nome: 'SAP Meat and Fish Management by msg',
    tipo: 'Meat and fish',
    oQueFaz: 'Meat and Fish by msg. A-Z.',
    paraQueServe: 'Deboning, yield and catch weight.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  osta: {
    nome: 'SAP Omnichannel Sales Transfer and Audit',
    tipo: 'Retail audit',
    oQueFaz: 'Omnichannel sales transfer and audit. A-Z.',
    paraQueServe: "Closing the store's day against CAR/S/4.",
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'vistex-paybacks': {
    nome: 'SAP Paybacks and Chargebacks by Vistex',
    tipo: 'Chargebacks',
    oQueFaz: 'Paybacks and chargebacks by Vistex. A-Z.',
    paraQueServe: 'Settling channel programs.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'postgres-btp': {
    nome: 'PostgreSQL on SAP BTP',
    tipo: 'BTP DB',
    oQueFaz: 'PostgreSQL hyperscaler option on BTP. A-Z.',
    paraQueServe: 'Relational DB for CAP extensions.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Absent.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'vistex-price-hub': {
    nome: 'SAP Price Staging Hub by Vistex',
    tipo: 'Pricing',
    oQueFaz: 'Price staging hub by Vistex. A-Z.',
    paraQueServe: 'Staging prices before S/4.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  prm: {
    nome: 'SAP Project and Resource Management',
    tipo: 'Cloud projects',
    oQueFaz: 'Project and Resource Management. A-Z. Cloud sibling of PPM.',
    paraQueServe: 'Staffing and projects without on-premise PPM.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'digitalroute-rdo': {
    nome: 'SAP Revenue Data Orchestration by DigitalRoute',
    tipo: 'Usage / revenue',
    oQueFaz: 'Revenue data orchestration by DigitalRoute. A-Z. Feeds BRIM.',
    paraQueServe: 'Mediating usage events through to the invoice.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'vistex-rights': {
    nome: 'SAP Rights and Royalty Management by Vistex',
    tipo: 'Royalties',
    oQueFaz: 'Rights and royalties by Vistex. A-Z.',
    paraQueServe: 'Media, pharma and IP royalties.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'risk-assurance': {
    nome: 'SAP Risk and Assurance Management',
    tipo: 'Cloud GRC',
    oQueFaz: 'Risk and Assurance Management (cloud GRC). A-Z.',
    paraQueServe: 'Risk and assurance in S/4 Cloud.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Dimmed.', cloud: 'Recommended vs on-premise GRC.', rise: 'Recommended.' }
  },
  'secure-login': {
    nome: 'SAP Secure Login Service for SAP GUI',
    tipo: 'GUI SSO',
    oQueFaz: 'Secure Login for SAP GUI. A-Z. Cloud sibling of classic SSO.',
    paraQueServe: 'Modern SSO in the GUI under RISE.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  smartrecruiters: {
    nome: 'SmartRecruiters for SAP SuccessFactors',
    tipo: 'Recruiting',
    oQueFaz: 'SmartRecruiters bundled with SuccessFactors. A-Z.',
    paraQueServe: 'Modern recruiting linked to SF.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'spend-analytics': {
    nome: 'SAP Spend Analytics',
    tipo: 'Spend analytics',
    oQueFaz: 'Spend analytics. A-Z.',
    paraQueServe: 'Seeing spend beyond Ariba reporting.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'student-lm': {
    nome: 'SAP Student Lifecycle Management',
    tipo: 'Education',
    oQueFaz: 'Student Lifecycle on S/4 Private. A-Z.',
    paraQueServe: 'Universities: enrollment through to degree.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'territory-quota': {
    nome: 'SAP Territory and Quota',
    tipo: 'Territories',
    oQueFaz: 'Sales territories and quotas. A-Z.',
    paraQueServe: 'Designing territories in Sales Cloud.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'time-attendance': {
    nome: 'SAP Time and Attendance Management by WorkForce Software',
    tipo: 'Timekeeping',
    oQueFaz: 'Time and Attendance by WFS. A-Z.',
    paraQueServe: 'Time clock and shifts.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  twm: {
    nome: 'SAP Total Workforce Management',
    tipo: 'Total workforce',
    oQueFaz: 'Total Workforce (employees + contingent). A-Z.',
    paraQueServe: 'Reading SF + Fieldglass as one workforce.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'us-benefits': {
    nome: 'SAP U.S. Benefits Administration by Benefitfocus',
    tipo: 'US benefits',
    oQueFaz: 'US benefits by Benefitfocus. A-Z.',
    paraQueServe: 'US open enrollment.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'ui-logging': {
    nome: 'UI data protection logging',
    tipo: 'UI audit',
    oQueFaz: 'Logging of data access in the UI. A-Z. Sibling of masking.',
    paraQueServe: 'Who viewed the IBAN.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  knoa: {
    nome: 'SAP User Experience Management by Knoa',
    tipo: 'UX analytics',
    oQueFaz: 'UX management by Knoa. A-Z.',
    paraQueServe: 'Measuring friction in GUI/Fiori.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'utilities-core': {
    nome: 'SAP Utilities Core foundation',
    tipo: 'IS-U core',
    oQueFaz: 'Utilities foundation in S/4. A-Z.',
    paraQueServe: 'IS-U core (contract, metering) beyond Cloud for Energy.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'vc-pricing': {
    nome: 'SAP Variant Configuration and Pricing',
    tipo: 'VC / pricing',
    oQueFaz: 'Variant configuration and pricing (CPS). A-Z. Sibling of SSC/CPQ.',
    paraQueServe: 'Configuring product + price at runtime.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'vistex-vendor': {
    nome: 'SAP Vendor Program Management by Vistex',
    tipo: 'Vendor programs',
    oQueFaz: 'Vendor programs by Vistex. A-Z.',
    paraQueServe: 'Billbacks and buy-side programs.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
  'watch-list': {
    nome: 'SAP Watch List Screening',
    tipo: 'Screening',
    oQueFaz: 'Watch list screening (sanctions). A-Z.',
    paraQueServe: 'Screening partners against official lists.',
    exemploReal: 'A-Z.',
    nesteCenario: { onprem: 'Optional.', cloud: 'Optional.', rise: 'Optional.' }
  },
}

export default {
  meta: { code: 'en', label: 'English', dir: 'ltr' },
  ui: {
    title: 'SAP Ecosystem Map',
    subtitle: 'The SAP portfolio: what exists, how it connects, and how to mix a landscape to fit the customer.',
    searchPlaceholder: 'Search (name, acronym, SCI, SAP for Me...)',
    searchEmpty: 'No service found. Try the acronym (SCI, BTP, ALM) or the commercial name (SAP for Me).',
    showLegacy: 'Show legacy',
    language: 'Language',
    layers: 'Layers',
    edgeNative: 'Native',
    edgeCleanCore: 'Clean core (BTP)',
    edgeNetwork: 'Network',
    edgeGov: 'Governs',
    stateActive: 'Active',
    stateRecommended: 'Recommended',
    stateOptional: 'Optional',
    stateLegacy: 'Legacy',
    stateIrrelevant: 'Not relevant',
    drawerWhat: 'What it does',
    drawerUsedFor: 'What it is used for',
    drawerMix: 'How it fits into the mix',
    drawerExample: 'Real example',
    drawerRelated: 'Related to',
    drawerDontConfuse: "Don't confuse with",
    drawerSatellites: 'Satellites in the Help index',
    drawerFeatures: 'Features of this product: help.sap.com and Feature Documentation.',
    drawerScenario: 'Layer, type and state in this scenario',
    resetView: 'Reset view',
    selectedEdges: 'connections',
    hiddenEdgesSuffix: 'connections in the drawer',
    clearSelection: 'Clear selection',
    spineOnly: 'Scenario spine only',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    closeDrawer: 'Close',
    back: 'Back',
    viewMap: 'Map',
    viewSchema: 'Schema',
    esquemaFocusLegend: 'Focus components for this scenario',
    profiles: {
      greenfield: 'Mid-market greenfield',
      brownfield: 'Complex ECC brownfield',
      industria: 'Industry / shop floor',
      regulado: 'Regulated / data sovereignty',
      spend: 'Heavy spend / supplier network',
      workforce: 'Heavy external workforce',
    },
    infraSelector: { aws: 'AWS', azure: 'Azure', gcp: 'GCP', sci: 'SCI' },
    footerDisclaimer: 'Educational content based on public SAP offerings and the help.sap.com/docs/all-products index. Cases summarised from public stories. Deploy with Confidence is an internal SAP engineering methodology, not a SKU. The All Products index has ~1,248 documentation entries; this map shows the architecture pieces.',
  },
  presets: {
    onprem: {
      title: 'Traditional On-Premise',
      hero: 'The customer runs the data center, NetWeaver, HANA, ECC or S/4 any-premise, PI/PO and Solution Manager. Full control, TCO and upgrades sit with IT. Cloud LoB apps (SuccessFactors, Ariba, Concur) may already exist as islands — hybrid by accident. Exit path: RISE or GROW, with PI/PO and SolMan phasing out by 2027.',
    },
    cloud: {
      title: 'Public Cloud — GROW',
      hero: 'S/4HANA Cloud Public Edition on the hyperscaler, standard processes, BTP for extensions, Integration Suite as the iPaaS, à la carte SaaS LoB, Cloud ALM included. DRC and Multi-Bank belong in the honest Finance minimum. Signavio drives the fit-to-standard. Deploy with Confidence, on SAP\u2019s side, is what lets Public Edition and Signavio receive innovation on a short cycle; on the customer side, it means not customising the core.',
    },
    rise: {
      title: 'Hybrid — RISE with SAP',
      hero: 'One contract: software + BTP + infrastructure managed by SAP on the hyperscaler (or CDC). S/4 Private Edition \u2248 on-premise scope with SAP operating it. Signavio decides the process, LeanIX the landscape, BTC the data, Tricentis the regression testing, Cloud ALM runs and measures clean core, and Deploy with Confidence is the discipline for rolling out the to-be without breaking the next upgrade. Residual on-premise systems connect via Cloud Connector / Edge Integration Cell. PI/PO and SolMan phase out by 2027. Multi-ECC groups can use Central Finance as an intermediate step.',
    },
  },
  layers: {
    infra: 'Infrastructure',
    dados: 'Data',
    plataforma: 'Platform (SAP BTP)',
    integracao: 'Integration',
    core: 'Core ERP / Digital Core',
    lob: 'LoB / SaaS / Industry / Experience / AI',
    alm: 'Lifecycle, Architecture & Transformation',
  },
  services: servicesEN,
}
