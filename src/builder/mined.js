// Dados extraídos dos ficheiros .drawio do repositório oficial
// SAP/architecture-center (Apache-2.0), em github.com/SAP/architecture-center.
//   coocorrencia: [idA, idB, nDiagramas] — quantos diagramas de referência da
//     SAP desenham os dois serviços na mesma tela (>=2).
//   templates: arquitecturas de referência publicadas, com os serviços do
//     nosso catálogo que foram reconhecidos nos respectivos diagramas.
// Gerado por um passo de mineração; não editar à mão.
export const coocorrencia = [["ias", "integration-suite", 32], ["ias", "workzone", 31], ["cloud-connector", "ias", 26], ["datasphere", "sac", 26], ["cloud-connector", "integration-suite", 25], ["bdc", "datasphere", 25], ["hana-cloud", "ias", 23], ["cloud-connector", "workzone", 23], ["integration-suite", "workzone", 21], ["bdc", "sac", 21], ["cloud-connector", "hana-cloud", 20], ["hana-cloud", "integration-suite", 20], ["hana-cloud", "workzone", 19], ["datasphere", "knowledge-graph", 16], ["concur", "successfactors", 16], ["bdc", "successfactors", 15], ["ias", "s4hana", 14], ["bdc", "knowledge-graph", 14], ["bdc", "concur", 14], ["ias", "successfactors", 13], ["ias", "joule-studio", 13], ["knowledge-graph", "sac", 13], ["sac", "successfactors", 12], ["datasphere", "successfactors", 11], ["datasphere", "hana-cloud", 11], ["azure", "integration-suite", 10], ["cloud-connector", "s4hana", 10], ["s4hana", "workzone", 10], ["concur", "datasphere", 10], ["concur", "knowledge-graph", 10], ["concur", "sac", 10], ["knowledge-graph", "successfactors", 10], ["bw4", "datasphere", 10], ["advanced-event-mesh", "integration-suite", 9], ["azure", "ias", 9], ["integration-suite", "joule-studio", 9], ["bas", "hana-cloud", 8], ["bas", "cloud-connector", 7], ["integration-suite", "successfactors", 7], ["hana-cloud", "sac", 7], ["hana-cloud", "knowledge-graph", 7], ["ias", "knowledge-graph", 7], ["cloud-connector", "knowledge-graph", 7], ["azure", "joule-studio", 7], ["ias", "leanix", 7], ["cloud-connector", "eic", 6], ["eic", "integration-suite", 6], ["advanced-event-mesh", "cloud-connector", 6], ["advanced-event-mesh", "hana-cloud", 6], ["advanced-event-mesh", "ias", 6], ["advanced-event-mesh", "workzone", 6], ["bdc", "ias", 6], ["aif", "integration-suite", 6], ["private-link", "s4hana", 6], ["hana-cloud", "private-link", 6], ["ias", "private-link", 6], ["integration-suite", "private-link", 6], ["integration-suite", "s4hana", 6], ["private-link", "workzone", 6], ["integration-suite", "knowledge-graph", 6], ["business-suite", "ias", 6], ["business-suite", "leanix", 6], ["ias", "signavio", 6], ["integration-suite", "leanix", 6], ["integration-suite", "signavio", 6], ["joule-studio", "leanix", 6], ["joule-studio", "signavio", 6], ["leanix", "signavio", 6], ["bas", "knowledge-graph", 6], ["document-ai", "integration-suite", 5], ["bw4", "sac", 5], ["aif", "cloud-connector", 5], ["hana-cloud", "s4hana", 5], ["ai-agent-hub", "azure", 5], ["ai-agent-hub", "business-suite", 5], ["ai-agent-hub", "ias", 5], ["ai-agent-hub", "integration-suite", 5], ["ai-agent-hub", "joule-studio", 5], ["ai-agent-hub", "knowledge-graph", 5], ["ai-agent-hub", "leanix", 5], ["ai-agent-hub", "signavio", 5], ["azure", "business-suite", 5], ["azure", "knowledge-graph", 5], ["azure", "leanix", 5], ["azure", "signavio", 5], ["business-suite", "integration-suite", 5], ["business-suite", "joule-studio", 5], ["business-suite", "knowledge-graph", 5], ["business-suite", "signavio", 5], ["joule-studio", "knowledge-graph", 5], ["knowledge-graph", "leanix", 5], ["knowledge-graph", "signavio", 5], ["ias", "sac", 4], ["joule-studio", "workzone", 4], ["s4hana", "successfactors", 4], ["ariba", "successfactors", 4], ["ias", "task-center", 4], ["joule-studio", "successfactors", 4], ["bdc", "hana-cloud", 4], ["bdc", "bw4", 4], ["bw4", "hana-cloud", 4], ["event-mesh", "integration-suite", 4], ["aws", "hana-cloud", 4], ["aws", "ias", 4], ["aws", "integration-suite", 4], ["aws", "workzone", 4], ["concur", "integration-suite", 4], ["cloud-connector", "document-ai", 3], ["bdc", "cloud-connector", 3], ["ariba", "concur", 3], ["datasphere", "ias", 3], ["bdc", "netweaver", 3], ["datasphere", "gcp", 3], ["event-mesh", "hana-cloud", 3], ["event-mesh", "ias", 3], ["event-mesh", "workzone", 3], ["aws", "private-link", 3], ["cloud-connector", "task-center", 3], ["task-center", "workzone", 3], ["bas", "datasphere", 3], ["bdc", "integration-suite", 3], ["bdc", "joule-studio", 3], ["concur", "ias", 3], ["concur", "joule-studio", 3], ["cloud-connector", "replication-server", 2], ["btp", "integration-suite", 2], ["azure", "cloud-connector", 2], ["cloud-alm", "cloud-connector", 2], ["document-ai", "workzone", 2], ["document-ai", "ias", 2], ["cloud-connector", "joule-studio", 2], ["cloud-connector", "sap-for-me", 2], ["ias", "sap-for-me", 2], ["cloud-connector", "successfactors", 2], ["fieldglass", "ias", 2], ["fieldglass", "successfactors", 2], ["successfactors", "workzone", 2], ["joule-studio", "task-center", 2], ["hana-cloud", "successfactors", 2], ["datasphere", "netweaver", 2], ["bw4", "data-intelligence", 2], ["data-intelligence", "datasphere", 2], ["data-intelligence", "sac", 2], ["event-mesh", "s4hana", 2], ["azure", "hana-cloud", 2], ["azure", "workzone", 2], ["event-mesh", "successfactors", 2], ["hana-cloud", "order-management", 2], ["ias", "order-management", 2], ["aws", "cloud-connector", 2], ["aws", "s4hana", 2], ["cloud-connector", "private-link", 2], ["aif", "eic", 2], ["bdc", "gcp", 2], ["concur", "gcp", 2], ["gcp", "knowledge-graph", 2], ["gcp", "sac", 2], ["gcp", "successfactors", 2], ["azure", "bdc", 2], ["azure", "concur", 2], ["azure", "successfactors", 2], ["cloud-connector", "datasphere", 2]]

export const templates = [
 {
  "id": "196eba",
  "titulo": "Designing Event-Driven Applications",
  "descricao": "Guidance for developing applications based on Event-Driven Architecture (EDA) patterns and Cloud Application Programming (CAP) framework. EDA is a required architecture pattern for building loosely coupled, scalable, and resilient applications that react to real-time business events across distribut",
  "tags": [
   "azure",
   "aws",
   "integration",
   "appdev",
   "eda"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/196eba",
  "servicos": [
   "advanced-event-mesh",
   "event-mesh",
   "hana-cloud",
   "ias",
   "integration-suite",
   "order-management",
   "osta",
   "s4hana",
   "successfactors",
   "workzone"
  ]
 },
 {
  "id": "6de922",
  "titulo": "EDA Sample Use Cases",
  "descricao": "Event-driven architecture use cases to highlight real-world applications.",
  "tags": [
   "appdev",
   "integration",
   "eda"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/6de922",
  "servicos": [
   "advanced-event-mesh",
   "aif",
   "cloud-connector",
   "hana-cloud",
   "ias",
   "integration-suite",
   "order-management",
   "successfactors",
   "workzone"
  ]
 },
 {
  "id": "98efa0",
  "titulo": "Agentic AI & AI Agents",
  "descricao": "Build, integrate and orchestrate AI agents on the SAP Business AI Platform. This reference architecture covers the full spectrum — from Joule Work and Joule Assistants to Joule Studio, pro-code agents with SAP Cloud SDK for AI, A2A and MCP interoperability and integration with the SAP Autonomous Sui",
  "tags": [
   "genai",
   "agents",
   "appdev",
   "aws",
   "gcp",
   "azure",
   "ibm"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/98efa0",
  "servicos": [
   "ai-agent-hub",
   "azure",
   "business-suite",
   "ias",
   "integration-suite",
   "joule-studio",
   "knowledge-graph",
   "leanix",
   "signavio"
  ]
 },
 {
  "id": "76ec36",
  "titulo": "A2A and MCP for Interoperability",
  "descricao": "Learn how the Agent2Agent (A2A) and Model Context Protocol (MCP) enable a decoupled, interoperable and scalable AI agent ecosystem on SAP BTP.",
  "tags": [
   "agents",
   "genai",
   "cap",
   "aws",
   "gcp",
   "azure",
   "ibm"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/76ec36",
  "servicos": [
   "ai-agent-hub",
   "azure",
   "business-suite",
   "ias",
   "integration-suite",
   "joule-studio",
   "knowledge-graph",
   "leanix",
   "signavio"
  ]
 },
 {
  "id": "219c07",
  "titulo": "Building AI Agents with Joule Studio",
  "descricao": "Build, deploy and connect AI agents using Joule Studio — SAP's AI-native development environment. Covers both the browser-based Low-Code Flow and the CLI-driven Pro-Code Flow, both powered by Intent-Based Development (IBD).",
  "tags": [
   "agents",
   "genai",
   "appdev"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/219c07",
  "servicos": [
   "ai-agent-hub",
   "azure",
   "business-suite",
   "ias",
   "integration-suite",
   "joule-studio",
   "knowledge-graph",
   "leanix",
   "signavio"
  ]
 },
 {
  "id": "fe0d1d",
  "titulo": "Integrating Joule Agents into Your Ecosystem",
  "descricao": "Learn how to expose Joule agents for consumption by third-party applications and external systems using the Agent Gateway with the A2A protocol.",
  "tags": [
   "agents",
   "genai",
   "cap",
   "aws",
   "gcp",
   "azure",
   "ibm"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/fe0d1d",
  "servicos": [
   "ai-agent-hub",
   "azure",
   "business-suite",
   "ias",
   "integration-suite",
   "joule-studio",
   "knowledge-graph",
   "leanix",
   "signavio"
  ]
 },
 {
  "id": "ae6821",
  "titulo": "Integrating AI Agents with Joule",
  "descricao": "Learn the architectural patterns for integrating both low-code and pro-code AI agents with Joule, SAP's AI copilot, for a unified user experience.",
  "tags": [
   "agents",
   "genai",
   "cap",
   "aws",
   "gcp",
   "azure",
   "ibm"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/ae6821",
  "servicos": [
   "ai-agent-hub",
   "azure",
   "business-suite",
   "ias",
   "integration-suite",
   "joule-studio",
   "knowledge-graph",
   "leanix",
   "signavio"
  ]
 },
 {
  "id": "988fb1",
  "titulo": "Build Events-to-Business Actions Scenarios with SAP BTP and Microsoft Azure",
  "descricao": "Build event-driven applications with Azure IoT and SAP BTP for real-time business action processing in SAP S/4HANA.",
  "tags": [
   "cap",
   "azure",
   "appdev",
   "integration",
   "eda"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/988fb1",
  "servicos": [
   "azure",
   "cloud-connector",
   "hana-cloud",
   "ias",
   "integration-suite",
   "private-link",
   "s4hana",
   "workzone"
  ]
 },
 {
  "id": "448754",
  "titulo": "Build Events-to-Business Actions Scenarios with SAP BTP and AWS IoT SiteWise",
  "descricao": "Create event-driven architecture with AWS IoT SiteWise and SAP BTP for seamless business process integration.",
  "tags": [
   "cap",
   "aws",
   "appdev",
   "integration",
   "eda"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/448754",
  "servicos": [
   "aws",
   "cloud-connector",
   "hana-cloud",
   "ias",
   "integration-suite",
   "private-link",
   "s4hana",
   "workzone"
  ]
 },
 {
  "id": "3c8d50",
  "titulo": "Agent Behavior Mining",
  "descricao": "Learn how SAP Signavio enables organizations to observe, analyze, and optimize AI agent behavior through native agent mining capabilities—covering behavioral tracing, impact measurement, cost monitoring, data privacy, and multi-tenancy.",
  "tags": [
   "agents",
   "genai"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/3c8d50",
  "servicos": [
   "bdc",
   "concur",
   "ias",
   "integration-suite",
   "joule-studio",
   "leanix",
   "signavio",
   "successfactors"
  ]
 },
 {
  "id": "4ab8f2",
  "titulo": "Data Products in SAP Business Data Cloud",
  "descricao": "Standardize data sharing with SAP Data Products for efficient, high-quality metadata and seamless integration.",
  "tags": [
   "data",
   "aws",
   "azure",
   "gcp",
   "bdc"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/4ab8f2",
  "servicos": [
   "ariba",
   "bdc",
   "concur",
   "datasphere",
   "knowledge-graph",
   "sac",
   "successfactors"
  ]
 },
 {
  "id": "c16841",
  "titulo": "Secure connectivity with SAP Private Link service",
  "descricao": "Secure SAP BTP-hyperscaler connectivity with SAP Private Link service, protecting sensitive data within private networks.",
  "tags": [
   "appdev",
   "security",
   "azure",
   "aws"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/c16841",
  "servicos": [
   "event-mesh",
   "hana-cloud",
   "ias",
   "integration-suite",
   "private-link",
   "s4hana",
   "workzone"
  ]
 },
 {
  "id": "b27373",
  "titulo": "Explore your Hyperscaler data with SAP Business Data Cloud",
  "descricao": "Explore how SAP Business Data Cloud (BDC) acts as the business-centric integration layer for enterprises looking to harmonize SAP and non-SAP data across platforms like Snowflake, Azure, GCP, AWS, and Databricks.",
  "tags": [
   "azure",
   "aws",
   "gcp",
   "data",
   "snowflake",
   "databricks",
   "bdc"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/b27373",
  "servicos": [
   "bdc",
   "concur",
   "datasphere",
   "gcp",
   "knowledge-graph",
   "sac",
   "successfactors"
  ]
 },
 {
  "id": "bffef5",
  "titulo": "Integration with Google Cloud Platform sources",
  "descricao": "Integrate non-SAP data in Google Cloud Platform with business data from SAP using SAP Business Data Cloud's seamless data integration architectures to enable holistic AI/ML & Analytics use cases.",
  "tags": [
   "gcp",
   "data",
   "bdc"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/bffef5",
  "servicos": [
   "bdc",
   "concur",
   "datasphere",
   "gcp",
   "knowledge-graph",
   "sac",
   "successfactors"
  ]
 },
 {
  "id": "b86487",
  "titulo": "Integrate and Extend with SAP Build Process Automation",
  "descricao": "Automate processes with SAP Build Process Automation, integrating workflows across SAP and non-SAP systems.",
  "tags": [
   "build",
   "azure",
   "aws",
   "gcp",
   "appdev"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/b86487",
  "servicos": [
   "cloud-connector",
   "document-ai",
   "ias",
   "integration-suite",
   "joule-studio",
   "task-center",
   "workzone"
  ]
 },
 {
  "id": "137800",
  "titulo": "Third-Party MCP Access to SAP Solutions",
  "descricao": "Guidance on accessing SAP solutions via third-party MCP servers, covering governance guardrails, OWASP MCP Top 10 risks, and SAP's recommended managed MCP approach via SAP Integration Suite and Joule Studio.",
  "tags": [
   "agents",
   "genai",
   "security",
   "appdev"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/137800",
  "servicos": [
   "azure",
   "bdc",
   "concur",
   "ias",
   "integration-suite",
   "joule-studio",
   "successfactors"
  ]
 },
 {
  "id": "d2e34e",
  "titulo": "Microsoft Copilot Studio and the MCP Gateway in SAP Integration Suite",
  "descricao": "Learn how Microsoft Copilot Studio and other Microsoft MCP clients can be connected using the MCP Gateway in SAP Integration Suite.",
  "tags": [
   "agents",
   "genai",
   "azure"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/d2e34e",
  "servicos": [
   "azure",
   "bdc",
   "concur",
   "ias",
   "integration-suite",
   "joule-studio",
   "successfactors"
  ]
 },
 {
  "id": "140bdb",
  "titulo": "Agent Identity",
  "descricao": "The Agent Identity is the representation of the artifacts of an agent required to follow proper Identity Access Management and especially Agent Governance procedures. The Agent Identity allows enterprises to define and restrict how and what an agent can do within certain boundaries. The Agent Identi",
  "tags": [
   "agents",
   "genai"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/140bdb",
  "servicos": [
   "business-suite",
   "cloud-alm",
   "cloud-connector",
   "ias",
   "leanix",
   "s4hana",
   "sap-for-me"
  ]
 },
 {
  "id": "8566b4",
  "titulo": "Migrating from SAP Process Integration/Orchestration to SAP Integration Suite",
  "descricao": "Learn about the transition from SAP Process Integration (PI) and Process Orchestration (PO) to SAP Integration Suite, an iPaaS solution for modern integration needs. Discover benefits, migration tools, architectural shifts, and strategies for simplifying integration landscapes and reducing TCO.",
  "tags": [
   "community-contrib",
   "integration",
   "transition"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/8566b4",
  "servicos": [
   "ariba",
   "cloud-connector",
   "concur",
   "eic",
   "event-mesh",
   "integration-suite",
   "successfactors"
  ]
 },
 {
  "id": "ebe268",
  "titulo": "Joule in SAP S/4HANA Cloud Private Edition and SAP S/4HANA Cloud Public Edition",
  "descricao": "Reference Architectures for Joule and SAP S/4HANA(PCE and Public Cloud)",
  "tags": [
   "genai",
   "agents",
   "build",
   "appdev"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/ebe268",
  "servicos": [
   "central-finance",
   "cloud-connector",
   "ias",
   "joule-studio",
   "sap-for-me",
   "workzone"
  ]
 },
 {
  "id": "ea5d4f",
  "titulo": "Identity and Access Management for SAP Joule",
  "descricao": "This reference architecture describes the IAM related flows for SAP Joule with SAP Build Work Zone and via the SAP Cloud Identity Services.",
  "tags": [
   "genai",
   "agents",
   "build",
   "appdev",
   "security"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/ea5d4f",
  "servicos": [
   "cloud-connector",
   "fieldglass",
   "ias",
   "s4hana",
   "successfactors",
   "workzone"
  ]
 },
 {
  "id": "bbfc34",
  "titulo": "Architecting Multi-Region HA/DR resiliency patterns",
  "descricao": "Architect multi-region resiliency for SAP solutions with strategies for high availability and disaster recovery.",
  "tags": [
   "aws",
   "azure",
   "gcp",
   "appdev",
   "integration"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/bbfc34",
  "servicos": [
   "advanced-event-mesh",
   "cloud-connector",
   "hana-cloud",
   "ias",
   "integration-suite",
   "workzone"
  ]
 },
 {
  "id": "cbc081",
  "titulo": "Geographic Redundancy",
  "descricao": "Ensure continuous service with geographic redundancy for SAP BTP, distributing resources across multiple locations.",
  "tags": [
   "aws",
   "azure",
   "gcp",
   "appdev",
   "integration"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/cbc081",
  "servicos": [
   "advanced-event-mesh",
   "cloud-connector",
   "hana-cloud",
   "ias",
   "integration-suite",
   "workzone"
  ]
 },
 {
  "id": "b6ca4c",
  "titulo": "Events Synchronization",
  "descricao": "Enable resilient multi-region event processing with SAP Advanced Event Mesh, ensuring real-time synchronization and scalability.",
  "tags": [
   "aws",
   "azure",
   "gcp",
   "appdev",
   "integration",
   "eda"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/b6ca4c",
  "servicos": [
   "advanced-event-mesh",
   "cloud-connector",
   "hana-cloud",
   "ias",
   "integration-suite",
   "workzone"
  ]
 },
 {
  "id": "dd9a38",
  "titulo": "Data Synchronization",
  "descricao": "Ensure multi-region data consistency with SAP HANA Cloud's Smart Data Access for real-time updates, failover, and resilient data availability.",
  "tags": [
   "aws",
   "azure",
   "gcp",
   "appdev",
   "integration"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/dd9a38",
  "servicos": [
   "advanced-event-mesh",
   "cloud-connector",
   "hana-cloud",
   "ias",
   "integration-suite",
   "workzone"
  ]
 },
 {
  "id": "b66add",
  "titulo": "Load Balancers",
  "descricao": "Enhance SAP BTP setups with intelligent load balancing for optimal performance, fault tolerance, and seamless operations.",
  "tags": [
   "aws",
   "azure",
   "gcp",
   "appdev",
   "integration"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/b66add",
  "servicos": [
   "advanced-event-mesh",
   "cloud-connector",
   "hana-cloud",
   "ias",
   "integration-suite",
   "workzone"
  ]
 },
 {
  "id": "6cbe7d",
  "titulo": "Control Plane for Orchestration",
  "descricao": "Ensure business continuity with Multi-Region Manager (MRM), orchestrating failover, replication, and load balancing across regions.",
  "tags": [
   "aws",
   "azure",
   "gcp",
   "appdev",
   "integration"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/6cbe7d",
  "servicos": [
   "advanced-event-mesh",
   "cloud-connector",
   "hana-cloud",
   "ias",
   "integration-suite",
   "workzone"
  ]
 },
 {
  "id": "12d55f",
  "titulo": "SAP Databricks in SAP BDC",
  "descricao": "Leverage SAP Databricks for AI and analytics, integrating SAP data with Databricks for real-time insights and simplified data access.",
  "tags": [
   "data",
   "aws",
   "azure",
   "gcp",
   "databricks",
   "bdc"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/12d55f",
  "servicos": [
   "bdc",
   "concur",
   "datasphere",
   "knowledge-graph",
   "sac",
   "successfactors"
  ]
 },
 {
  "id": "4f7406",
  "titulo": "SAP Business Data Cloud powered by SAP AI Core",
  "descricao": "Architectural patterns for integrating SAP Business Data Cloud with SAP AI Core and Generative AI Hub. Covers AI-Enhanced Data Products, model training in Databricks and serving in AI Core, batch and real-time consumption patterns, and predictive insights.",
  "tags": [
   "data",
   "genai",
   "databricks",
   "bdc"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/4f7406",
  "servicos": [
   "bdc",
   "datasphere",
   "hana-cloud",
   "ias",
   "knowledge-graph",
   "sac"
  ]
 },
 {
  "id": "6550e4",
  "titulo": "Modernizing SAP BW with SAP Business Data Cloud",
  "descricao": "Modernize SAP BW with SAP BDC for real-time analytics, AI insights, and scalable cloud-native architecture.",
  "tags": [
   "data",
   "aws",
   "azure",
   "gcp",
   "bdc",
   "transition"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/6550e4",
  "servicos": [
   "bdc",
   "bw4",
   "datasphere",
   "hana-cloud",
   "netweaver",
   "sac"
  ]
 },
 {
  "id": "2a28bd",
  "titulo": "SAP CAP Framework for Events to Business Actions Integration",
  "descricao": "Custom CAP Application framework to build event-driven applications in SAP BTP",
  "tags": [
   "cap",
   "aws",
   "appdev",
   "integration",
   "eda"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/2a28bd",
  "servicos": [
   "cloud-connector",
   "hana-cloud",
   "ias",
   "integration-suite",
   "private-link",
   "workzone"
  ]
 },
 {
  "id": "b7629d",
  "titulo": "Integration with Databricks",
  "descricao": "Data from Databricks Lakehouse can be harmonized with SAP and non-sap data via SAP Datasphere's unified data models for use with richer analytics and other use cases.",
  "tags": [
   "databricks",
   "data",
   "bdc"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/b7629d",
  "servicos": [
   "bdc",
   "concur",
   "datasphere",
   "knowledge-graph",
   "sac",
   "successfactors"
  ]
 },
 {
  "id": "9ce2bd",
  "titulo": "Integration with Azure data sources",
  "descricao": "Unify Azure data with SAP Datasphere for comprehensive analytics, leveraging SAP's robust data fabric architecture.",
  "tags": [
   "azure",
   "data",
   "bdc"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/9ce2bd",
  "servicos": [
   "bdc",
   "concur",
   "datasphere",
   "knowledge-graph",
   "sac",
   "successfactors"
  ]
 },
 {
  "id": "053d2b",
  "titulo": "Integration with Snowflake",
  "descricao": "Integrate SAP data with Snowflake seamlessly using SAP BDC Connect and SAP Snowflake",
  "tags": [
   "snowflake",
   "data",
   "bdc"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/053d2b",
  "servicos": [
   "bdc",
   "concur",
   "datasphere",
   "knowledge-graph",
   "sac",
   "successfactors"
  ]
 },
 {
  "id": "af1cc6",
  "titulo": "Integration with AWS data sources",
  "descricao": "Data from AWS data sources can be harmonized with SAP and non-sap data via SAP Datasphere's data fabric architecture.",
  "tags": [
   "aws",
   "data",
   "bdc"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/af1cc6",
  "servicos": [
   "bdc",
   "concur",
   "datasphere",
   "knowledge-graph",
   "sac",
   "successfactors"
  ]
 },
 {
  "id": "b51e91",
  "titulo": "DevOps with SAP BTP",
  "descricao": "Adopt agile DevOps principles on SAP BTP with cloud services and tools for streamlined application lifecycle management.",
  "tags": [
   "appdev",
   "build",
   "cap",
   "aws",
   "azure",
   "gcp"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/b51e91",
  "servicos": [
   "bas",
   "cloud-alm",
   "cloud-connector",
   "focused-run",
   "solman"
  ]
 },
 {
  "id": "14d25a",
  "titulo": "SAP SuccessFactors Suite",
  "descricao": "Overview of the SAP SuccessFactors modules and how data flows between them",
  "tags": [
   "community-contrib",
   "successfactors"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/14d25a",
  "servicos": [
   "btp",
   "ias",
   "integration-suite",
   "sac",
   "successfactors"
  ]
 },
 {
  "id": "f5a3ef",
  "titulo": "Joule Studio",
  "descricao": "SAP’s AI-first low-code and pro-code development solution for generating and running custom AI agents, workflows and extensions.",
  "tags": [
   "genai",
   "agents",
   "build",
   "appdev"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/f5a3ef",
  "servicos": [
   "ariba",
   "ias",
   "joule-studio",
   "successfactors",
   "task-center"
  ]
 },
 {
  "id": "e1732d",
  "titulo": "Transforming Enterprise Data Strategy with SAP Business Data Cloud",
  "descricao": "Transform enterprise data strategies with SAP BDC, unifying SAP and non-SAP data for scalable AI and analytics.",
  "tags": [
   "data",
   "aws",
   "azure",
   "gcp",
   "databricks",
   "snowflake"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/e1732d",
  "servicos": [
   "bdc",
   "datasphere",
   "entitlement-management",
   "knowledge-graph",
   "sac"
  ]
 },
 {
  "id": "9efadc",
  "titulo": "Analytical Insights in Joule",
  "descricao": "Reference Architecture for bringing analytical insights in Joule for SAP BDC using SAP Analytics Cloud JustAsk AI Service.",
  "tags": [
   "data",
   "genai",
   "bdc"
  ],
  "url": "https://architecture.learning.sap.com/docs/ref-arch/9efadc",
  "servicos": [
   "bdc",
   "datasphere",
   "hana-cloud",
   "ias",
   "sac"
  ]
 }
]

export default { coocorrencia, templates }
