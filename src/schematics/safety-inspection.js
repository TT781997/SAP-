// Esquema "Safety Inspection", replicado a partir do diagrama oficial do SAP
// Architecture Center — agentes Joule embutidos (Embodied AI) a inspeccionar
// segurança física via robôs, com Digital Twin em S/4 EHS. Ao contrário do
// genai-btp (que esbate o que não é usado), aqui a técnica é a legenda
// "Focus Components": as peças centrais deste cenário ficam com borda
// magenta sobre o resto do diagrama em tom normal — ambas as técnicas
// vêm directamente dos diagramas de referência que me mandaste.

const IDS_FOCO = new Set([
  'joule-agents', 'item-embodied-agents',
  'embodied-ai-btp', 'item-task-enrichment', 'item-autonomy-guardrails', 'item-sandbox', 'item-embodied-etc',
  'sap-solutions',
])

export default {
  id: 'safety-inspection',
  titulo: { pt: 'Inspecção de Segurança (Joule Embodied AI)', en: 'Safety Inspection (Joule Embodied AI)', fr: 'Inspection de sécurité (Joule Embodied AI)', de: 'Sicherheitsinspektion (Joule Embodied AI)', es: 'Inspección de seguridad (Joule Embodied AI)' },
  hero: { pt: 'Agentes Joule embutidos comandam robôs (quadrúpedes, humanoides) por HTTPS/MCP/A2A para inspecções físicas; o resultado volta ao S/4 EHS e à Business Data Cloud.', en: 'Embodied Joule agents drive robots (quadrupeds, humanoids) over HTTPS/MCP/A2A for physical inspections; results flow back to S/4 EHS and Business Data Cloud.' },
  fonte: 'SAP Architecture Center 9ca181 — Safety Inspection (Mai 2026)',
  dominio: 'ai',
  cenarios: [{ id: 'completo', nome: { pt: 'Arquitectura completa', en: 'Full architecture' } }],
  computarEstiloNo: (id) => ({ focus: IDS_FOCO.has(id) }),
  nodes: [
    { id: 'actor-user', type: 'actor', position: { x: 10, y: 250 }, data: { label: 'User', icone: 'user' } },
    { id: 'actor-clients', type: 'actor', position: { x: 10, y: 150 }, data: { label: 'Mobile/Desktop Application Clients', icone: 'smartphone' } },
    { id: 'actor-trigger', type: 'actor', position: { x: 10, y: 340 }, data: { label: 'System Trigger', destaque: true } },

    { id: 'btp', type: 'container', position: { x: 170, y: 20 }, style: { width: 650, height: 610, zIndex: 0 }, data: { cardId: 'btp',  titulo: 'SAP BTP', icone: 'cloud', dominio: 'btp' } },

    { id: 'joule', type: 'container', position: { x: 190, y: 70 }, style: { width: 280, height: 270, zIndex: 1 }, data: { cardId: 'joule',  titulo: 'SAP Joule', icone: 'zap', dominio: 'btp' } },
    { id: 'item-joule-ui', type: 'item', position: { x: 205, y: 100 }, style: { width: 250, height: 32, zIndex: 2 }, data: { cardId: 'joule',  label: 'SAP Joule User Interface' } },
    { id: 'item-joule-assistants', type: 'item', position: { x: 205, y: 138 }, style: { width: 250, height: 32, zIndex: 2 }, data: { label: 'Joule Assistants' } },
    { id: 'joule-agents', type: 'container', position: { x: 205, y: 178 }, style: { width: 250, height: 140, zIndex: 2 }, data: { cardId: 'ai-agent-hub',  titulo: 'Joule Agents', dominio: 'btp' } },
    { id: 'item-digital-agents', type: 'item', position: { x: 215, y: 210 }, style: { width: 225, height: 32, zIndex: 3 }, data: { label: 'Digital AI Agents' } },
    { id: 'item-embodied-agents', type: 'item', position: { x: 215, y: 250 }, style: { width: 225, height: 32, zIndex: 3 }, data: { label: 'Embodied AI Agents' } },

    { id: 'business-ai-platform', type: 'container', position: { x: 190, y: 360 }, style: { width: 280, height: 210, zIndex: 1 }, data: { cardId: 'ai-foundation',  titulo: 'SAP Business AI Platform', dominio: 'btp' } },
    { id: 'fm-access', type: 'container', position: { x: 205, y: 392 }, style: { width: 250, height: 92, zIndex: 2 }, data: { titulo: 'Foundation Model Access', dominio: 'btp' } },
    { id: 'item-partner-built', type: 'item', position: { x: 215, y: 424 }, style: { width: 110, height: 32, zIndex: 3 }, data: { label: 'Partner built' } },
    { id: 'item-sap-built', type: 'item', position: { x: 335, y: 424 }, style: { width: 110, height: 32, zIndex: 3 }, data: { label: 'SAP built' } },
    { id: 'item-fm-sap-hosted', type: 'item', position: { x: 205, y: 498 }, style: { width: 250, height: 42, zIndex: 2 }, data: { label: 'Foundation Models', nota: 'SAP hosted' } },

    { id: 'embodied-ai-btp', type: 'container', position: { x: 500, y: 90 }, style: { width: 300, height: 430, zIndex: 1 }, data: { cardId: 'joule-studio',  titulo: 'Embodied AI on BTP', dashed: true, dominio: 'btp' } },
    { id: 'item-task-enrichment', type: 'item', position: { x: 515, y: 122 }, style: { width: 270, height: 32, zIndex: 2 }, data: { label: 'Task Enrichment' } },
    { id: 'item-autonomy-guardrails', type: 'item', position: { x: 515, y: 160 }, style: { width: 270, height: 32, zIndex: 2 }, data: { label: 'Autonomy Guardrails' } },
    { id: 'item-sandbox', type: 'item', position: { x: 515, y: 198 }, style: { width: 270, height: 32, zIndex: 2 }, data: { label: 'Sandbox' } },
    { id: 'item-embodied-etc', type: 'item', position: { x: 515, y: 236 }, style: { width: 270, height: 28, zIndex: 2 }, data: { label: '...' } },
    { id: 'consumer-account', type: 'container', position: { x: 515, y: 278 }, style: { width: 270, height: 175, zIndex: 2 }, data: { titulo: 'Consumer Account', dominio: 'btp' } },
    { id: 'item-custom-agent', type: 'item', position: { x: 525, y: 310 }, style: { width: 250, height: 42, zIndex: 3 }, data: { label: 'Custom Agent / App', nota: 'Optional' } },
    { id: 'item-fleet-connector', type: 'item', position: { x: 525, y: 362 }, style: { width: 250, height: 32, zIndex: 3 }, data: { label: 'Fleet Connector' } },

    { id: 'destination-icon', type: 'item', position: { x: 850, y: 250 }, style: { width: 90, height: 50, zIndex: 1 }, data: { cardId: 'btp',  label: 'Destination' } },
    { id: 'connectivity-icon', type: 'item', position: { x: 850, y: 320 }, style: { width: 90, height: 50, zIndex: 1 }, data: { cardId: 'cloud-connector',  label: 'Connectivity' } },

    { id: 'network', type: 'network', position: { x: 990, y: 20 }, style: { width: 30, height: 610, zIndex: 1 }, data: { label: 'NETWORK' } },

    { id: 'sap-solutions', type: 'container', position: { x: 1040, y: 50 }, style: { width: 300, height: 230, zIndex: 1 }, data: { titulo: 'SAP Solutions', dominio: 'btp' } },
    { id: 'item-s4-ehs', type: 'item', position: { x: 1055, y: 88 }, style: { width: 270, height: 55, zIndex: 2 }, data: { cardId: 'ehs',  label: 'S/4 Enterprise Health and Safety (EHS)' } },
    { id: 'bdc', type: 'container', position: { x: 1055, y: 158 }, style: { width: 270, height: 92, zIndex: 2 }, data: { cardId: 'bdc',  titulo: 'SAP Business Data Cloud', dominio: 'btp' } },
    { id: 'item-digital-data-products', type: 'item', position: { x: 1065, y: 190 }, style: { width: 120, height: 34, zIndex: 3 }, data: { label: 'Digital Data Products' } },
    { id: 'item-physical-data-products', type: 'item', position: { x: 1195, y: 190 }, style: { width: 120, height: 34, zIndex: 3 }, data: { label: 'Physical Data Products' } },

    { id: '3rdparty', type: 'container', position: { x: 1040, y: 300 }, style: { width: 300, height: 330, zIndex: 1 }, data: { titulo: '3rd Party', dominio: 'nonsap' } },
    { id: 'robot-orch', type: 'container', position: { x: 1055, y: 332 }, style: { width: 270, height: 110, zIndex: 2 }, data: { titulo: 'Robot Orchestration Platforms', dominio: 'nonsap' } },
    { id: 'item-robot-apis', type: 'item', position: { x: 1065, y: 362 }, style: { width: 78, height: 30, zIndex: 3 }, data: { label: 'APIs' } },
    { id: 'item-robot-mcp', type: 'item', position: { x: 1150, y: 362 }, style: { width: 78, height: 30, zIndex: 3 }, data: { label: 'MCP Servers' } },
    { id: 'item-robot-agents', type: 'item', position: { x: 1235, y: 362 }, style: { width: 78, height: 30, zIndex: 3 }, data: { label: 'AI Agents' } },
    { id: 'cognitive-robots', type: 'container', position: { x: 1055, y: 450 }, style: { width: 270, height: 92, zIndex: 2 }, data: { titulo: 'Cognitive Robots', dominio: 'nonsap' } },
    { id: 'item-quadrupeds', type: 'item', position: { x: 1065, y: 482 }, style: { width: 120, height: 34, zIndex: 3 }, data: { label: 'Quadrupeds' } },
    { id: 'item-humanoids', type: 'item', position: { x: 1195, y: 482 }, style: { width: 120, height: 34, zIndex: 3 }, data: { label: 'Humanoids' } },
    { id: 'physical-ai-models', type: 'container', position: { x: 1055, y: 552 }, style: { width: 270, height: 55, zIndex: 2 }, data: { titulo: 'Physical AI Models', dominio: 'nonsap' } },
  ],
  edges: [
    { id: 'e1', source: 'actor-clients', target: 'item-joule-ui', type: 'sapEdge', label: 'HTTPS', data: { tipo: 'nativa', animado: true, frase: 'O inspector pede a inspecção ao Joule.' } },
    { id: 'e2', source: 'actor-trigger', target: 'joule-agents', type: 'sapEdge', label: 'trigger', data: { tipo: 'nativa', animado: true, frase: 'Ou um evento do sistema dispara o agente sem humano.' } },
    { id: 'e3', source: 'joule-agents', target: 'embodied-ai-btp', type: 'sapEdge', label: 'HTTPS / MCP / A2A', data: { tipo: 'destaque', animado: true, frase: 'Task Enrichment, Autonomy Guardrails e Sandbox antes de tocar num robô.' } },
    { id: 'e4', source: 'embodied-ai-btp', target: 'destination-icon', type: 'sapEdge', data: { tipo: 'nativa', animado: true, frase: 'Sai por Destination + Connectivity.' } },
    { id: 'e5', source: 'destination-icon', target: 'connectivity-icon', type: 'sapEdge', sourceHandle: 'b', targetHandle: 't', data: { tipo: 'rede', animado: false, frase: 'Connectivity para o exterior.' } },
    { id: 'e6', source: 'connectivity-icon', target: 'robot-orch', type: 'sapEdge', label: 'HTTPS / MCP / A2A', data: { tipo: 'destaque', animado: true, frase: 'Plataformas de orquestração de robôs (fleet management) expõem APIs, MCP servers e agentes.' } },
    { id: 'e7', source: 'business-ai-platform', target: 'destination-icon', type: 'sapEdge', data: { tipo: 'nativa', animado: false, frase: 'Modelos SAP-hosted por baixo dos agentes.' } },
    { id: 'e8', source: 'destination-icon', target: 'sap-solutions', type: 'sapEdge', label: 'HTTPS', data: { tipo: 'nativa', animado: true, frase: 'Resultado da inspecção grava em S/4 EHS; dados físicos e digitais entram na Business Data Cloud.' } },
  ],
}
