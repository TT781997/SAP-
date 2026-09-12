// Esquema "Generative AI on SAP BTP", replicado a partir do diagrama oficial
// do SAP Architecture Center (arquitectura real, não inventada). O cenário
// 'basic-prompting' replica o segundo diagrama de referência: mesma tela,
// só o caminho realmente usado por um prompt simples fica a cores — o resto
// esbate-se a cinzento (nunca desaparece).

const IDS_BASIC_PROMPTING_ACESAS = new Set([
  'actor-user', 'actor-clients', 'app-router',
  'sap-build', 'build-code', 'item-use-case', 'item-data-mgmt', 'item-llm-sdks', 'item-cloud-sdk-ai',
  'genai-hub', 'ai-launchpad', 'ai-core', 'item-prompt-registry',
  'orchestration', 'item-grounding', 'item-templating', 'item-data-masking', 'item-io-filtering', 'item-translation', 'item-orch-etc',
  'fm-access', 'item-partner-built', 'item-sap-built', 'item-fm-sap-hosted',
  'ext-fm-partner',
])

export default {
  id: 'genai-btp',
  titulo: { pt: 'IA Generativa no SAP BTP', en: 'Generative AI on SAP BTP' },
  fonte: 'SAP Architecture Center',
  cenarios: [
    { id: 'completo', nome: { pt: 'Arquitectura completa', en: 'Full architecture' } },
    { id: 'basic-prompting', nome: { pt: 'Cenário: Basic Prompting', en: 'Scenario: Basic Prompting' } },
  ],
  computarEstiloNo: (id, cenarioId) => {
    if (cenarioId !== 'basic-prompting') return {}
    return { dimmed: !IDS_BASIC_PROMPTING_ACESAS.has(id) }
  },
  nodes: [
    { id: 'actor-user', type: 'actor', position: { x: 10, y: 150 }, data: { label: 'User', icone: 'user' } },
    { id: 'actor-clients', type: 'actor', position: { x: 10, y: 250 }, data: { label: 'Mobile/Desktop Application Clients', icone: 'smartphone' } },

    { id: 'btp', type: 'container', position: { x: 170, y: 20 }, style: { width: 1180, height: 740, zIndex: 0 }, data: { titulo: 'SAP BTP', icone: 'cloud', corBase: '#2563eb' } },

    { id: 'subaccount', type: 'container', position: { x: 190, y: 90 }, style: { width: 430, height: 640, zIndex: 1 }, data: { titulo: 'Subaccount · Multi-Cloud', corBase: '#64748b' } },
    { id: 'ui-box', type: 'container', position: { x: 395, y: 130 }, style: { width: 200, height: 80, zIndex: 2 }, data: { titulo: 'User Interface', corBase: '#2563eb' } },
    { id: 'item-sapui5', type: 'item', position: { x: 405, y: 160 }, style: { width: 85, height: 32, zIndex: 3 }, data: { label: 'SAPUI5' } },
    { id: 'item-ui5-web', type: 'item', position: { x: 500, y: 160 }, style: { width: 85, height: 32, zIndex: 3 }, data: { label: 'UI5 Web Components' } },
    { id: 'html5-repo', type: 'item', position: { x: 210, y: 140 }, style: { width: 150, height: 55, zIndex: 2 }, data: { label: 'HTML5 App Repository' } },
    { id: 'app-router', type: 'item', position: { x: 210, y: 260 }, style: { width: 150, height: 55, zIndex: 2 }, data: { label: 'Application Router' } },
    { id: 'auth-trust', type: 'item', position: { x: 395, y: 260 }, style: { width: 200, height: 65, zIndex: 2 }, data: { label: 'SAP Authorization and Trust Management', nota: 'Application Plan' } },
    { id: 'cicd', type: 'item', position: { x: 210, y: 440 }, style: { width: 150, height: 55, zIndex: 2 }, data: { label: 'SAP Continuous Integration and Delivery' } },
    { id: 'bas', type: 'item', position: { x: 210, y: 555 }, style: { width: 150, height: 55, zIndex: 2 }, data: { label: 'SAP Business Application Studio' } },

    { id: 'sap-build', type: 'container', position: { x: 650, y: 110 }, style: { width: 210, height: 280, zIndex: 1 }, data: { titulo: 'SAP Build', icone: 'wrench', corBase: '#2563eb' } },
    { id: 'build-code', type: 'container', position: { x: 660, y: 155 }, style: { width: 190, height: 225, zIndex: 2 }, data: { titulo: 'SAP Build Code · CAP', corBase: '#c026d3' } },
    { id: 'item-use-case', type: 'item', position: { x: 670, y: 190 }, style: { width: 170, height: 32, zIndex: 3 }, data: { label: 'Use Case Logic' } },
    { id: 'item-data-mgmt', type: 'item', position: { x: 670, y: 228 }, style: { width: 170, height: 32, zIndex: 3 }, data: { label: 'Data Management' } },
    { id: 'item-llm-sdks', type: 'item', position: { x: 670, y: 266 }, style: { width: 170, height: 32, zIndex: 3 }, data: { label: 'LLM Plugins & SDKs' } },
    { id: 'item-cloud-sdk-ai', type: 'item', position: { x: 670, y: 304 }, style: { width: 170, height: 32, zIndex: 3 }, data: { label: 'SAP Cloud SDK for AI' } },

    { id: 'hana-cloud', type: 'container', position: { x: 650, y: 560 }, style: { width: 210, height: 140, zIndex: 1 }, data: { titulo: 'SAP HANA Cloud', corBase: '#2563eb' } },
    { id: 'item-vector-engine', type: 'item', position: { x: 665, y: 600 }, style: { width: 180, height: 32, zIndex: 2 }, data: { label: 'Vector Engine' } },
    { id: 'item-kg-engine', type: 'item', position: { x: 665, y: 638 }, style: { width: 180, height: 32, zIndex: 2 }, data: { label: 'Knowledge Graph Engine' } },

    { id: 'destination-svc', type: 'item', position: { x: 900, y: 200 }, style: { width: 110, height: 55, zIndex: 1 }, data: { label: 'SAP Destination Service' } },
    { id: 'connectivity-svc', type: 'item', position: { x: 900, y: 110 }, style: { width: 110, height: 55, zIndex: 1 }, data: { label: 'SAP Connectivity Service' } },

    { id: 'genai-hub', type: 'container', position: { x: 1050, y: 140 }, style: { width: 290, height: 590, zIndex: 1 }, data: { titulo: 'Generative AI Hub', corBase: '#c026d3' } },
    { id: 'ai-launchpad', type: 'item', position: { x: 1065, y: 175 }, style: { width: 260, height: 38, zIndex: 2 }, data: { label: 'SAP AI Launchpad' } },
    { id: 'ai-core', type: 'container', position: { x: 1065, y: 228 }, style: { width: 260, height: 480, zIndex: 2 }, data: { titulo: 'SAP AI Core', corBase: '#c026d3' } },
    { id: 'item-prompt-registry', type: 'item', position: { x: 1080, y: 263 }, style: { width: 230, height: 32, zIndex: 3 }, data: { label: 'Prompt Registry & Optimization' } },
    { id: 'orchestration', type: 'container', position: { x: 1080, y: 308 }, style: { width: 230, height: 145, zIndex: 3 }, data: { titulo: 'Orchestration', corBase: '#c026d3' } },
    { id: 'item-grounding', type: 'item', position: { x: 1090, y: 340 }, style: { width: 100, height: 30, zIndex: 4 }, data: { label: 'Grounding' } },
    { id: 'item-templating', type: 'item', position: { x: 1200, y: 340 }, style: { width: 100, height: 30, zIndex: 4 }, data: { label: 'Templating' } },
    { id: 'item-data-masking', type: 'item', position: { x: 1090, y: 375 }, style: { width: 100, height: 30, zIndex: 4 }, data: { label: 'Data Masking' } },
    { id: 'item-io-filtering', type: 'item', position: { x: 1200, y: 375 }, style: { width: 100, height: 30, zIndex: 4 }, data: { label: 'I/O Filtering' } },
    { id: 'item-translation', type: 'item', position: { x: 1090, y: 410 }, style: { width: 100, height: 30, zIndex: 4 }, data: { label: 'Translation' } },
    { id: 'item-orch-etc', type: 'item', position: { x: 1200, y: 410 }, style: { width: 100, height: 30, zIndex: 4 }, data: { label: '...' } },
    { id: 'fm-access', type: 'container', position: { x: 1080, y: 465 }, style: { width: 230, height: 92, zIndex: 3 }, data: { titulo: 'Foundation Model Access', corBase: '#c026d3' } },
    { id: 'item-partner-built', type: 'item', position: { x: 1090, y: 497 }, style: { width: 100, height: 32, zIndex: 4 }, data: { label: 'Partner built' } },
    { id: 'item-sap-built', type: 'item', position: { x: 1200, y: 497 }, style: { width: 100, height: 32, zIndex: 4 }, data: { label: 'SAP built' } },
    { id: 'item-fm-sap-hosted', type: 'item', position: { x: 1080, y: 570 }, style: { width: 230, height: 38, zIndex: 3 }, data: { label: 'Foundation Models', nota: 'SAP hosted' } },

    { id: 'network', type: 'network', position: { x: 1358, y: 20 }, style: { width: 30, height: 740, zIndex: 1 }, data: { label: 'NETWORK' } },

    { id: 'ext-onprem', type: 'container', position: { x: 1410, y: 100 }, style: { width: 230, height: 95, zIndex: 1 }, data: { titulo: 'SAP On-Premise Solutions', dashed: true, corBase: '#334155' } },
    { id: 'item-cloud-connector', type: 'item', position: { x: 1425, y: 138 }, style: { width: 200, height: 34, zIndex: 2 }, data: { label: 'Cloud Connector' } },
    { id: 'ext-3rdparty', type: 'container', position: { x: 1410, y: 215 }, style: { width: 230, height: 65, zIndex: 1 }, data: { titulo: '3rd Party Applications', dashed: true, corBase: '#334155' } },
    { id: 'ext-cloud-solutions', type: 'container', position: { x: 1410, y: 300 }, style: { width: 230, height: 65, zIndex: 1 }, data: { titulo: 'SAP Cloud Solutions', dashed: true, corBase: '#334155' } },
    { id: 'ext-fm-partner', type: 'item', position: { x: 1410, y: 600 }, style: { width: 230, height: 50, zIndex: 1 }, data: { label: 'Foundation Models', nota: 'Partner hosted' } },
  ],
  edges: [
    { id: 'e1', source: 'actor-clients', target: 'app-router' },
    { id: 'e2', source: 'app-router', target: 'auth-trust', label: 'Trust' },
    { id: 'e3', source: 'app-router', target: 'build-code', label: 'Destination' },
    { id: 'e4', source: 'build-code', target: 'hana-cloud' },
    { id: 'e5', source: 'build-code', target: 'orchestration', label: 'Harmonized API', tipo: 'destaque' },
    { id: 'e6', source: 'sap-build', target: 'destination-svc' },
    { id: 'e7', source: 'destination-svc', target: 'connectivity-svc' },
    { id: 'e8', source: 'connectivity-svc', target: 'ext-onprem', label: 'HTTPS' },
    { id: 'e9', source: 'destination-svc', target: 'ext-3rdparty', label: 'HTTPS' },
    { id: 'e10', source: 'destination-svc', target: 'ext-cloud-solutions', label: 'HTTPS' },
    { id: 'e11', source: 'fm-access', target: 'ext-fm-partner', label: 'HTTPS' },
  ],
}
