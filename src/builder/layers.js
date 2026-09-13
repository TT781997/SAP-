import { SERVICOS_POR_ID } from '../data.js'

// Modelo de 11 camadas (L0..L10) para o Construtor. É uma vista mais fina que
// as 7 camadas do Mapa: separa Identidade/Segurança, IA, Agentes e UX, que no
// catálogo estão espalhados por 'plataforma' e 'lob'. Esta separação segue a
// forma como a própria SAP estratifica os diagramas do Architecture Center
// (Data Layer → AI Layer → Agent Layer → Joule → clientes).
export const NIVEIS = [
  { n: 0, id: 'L0', nome: { pt: 'Infraestrutura', en: 'Infrastructure' }, cor: '#64748b' },
  { n: 1, id: 'L1', nome: { pt: 'Dados e Persistência', en: 'Data & Persistence' }, cor: '#06b6d4' },
  { n: 2, id: 'L2', nome: { pt: 'Plataforma (BTP)', en: 'Platform (BTP)' }, cor: '#6366f1' },
  { n: 3, id: 'L3', nome: { pt: 'Integração', en: 'Integration' }, cor: '#8b5cf6' },
  { n: 4, id: 'L4', nome: { pt: 'Core ERP', en: 'Core ERP' }, cor: '#0ea5e9' },
  { n: 5, id: 'L5', nome: { pt: 'LoB e SaaS', en: 'LoB & SaaS' }, cor: '#10b981' },
  { n: 6, id: 'L6', nome: { pt: 'Identidade e Segurança', en: 'Identity & Security' }, cor: '#f97316' },
  { n: 7, id: 'L7', nome: { pt: 'IA e Fundação', en: 'AI & Foundation' }, cor: '#f59e0b' },
  { n: 8, id: 'L8', nome: { pt: 'Agentes', en: 'Agents' }, cor: '#eab308' },
  { n: 9, id: 'L9', nome: { pt: 'Experiência (UX)', en: 'Experience (UX)' }, cor: '#ec4899' },
  { n: 10, id: 'L10', nome: { pt: 'Ciclo de Vida (ALM)', en: 'Lifecycle (ALM)' }, cor: '#f43f5e' },
]

export const NIVEL_POR_ID = Object.fromEntries(NIVEIS.map((l) => [l.id, l]))

// Base: as 7 camadas do catálogo mapeiam directamente.
const BASE = { infra: 0, dados: 1, plataforma: 2, integracao: 3, core: 4, lob: 5, alm: 10 }

// Excepções: serviços que pertencem a uma camada mais fina do modelo L0..L10.
const OVERRIDE = {
  // L6 — Identidade e Segurança
  ias: 6, iag: 6, 'sso-classic': 6, 'secure-login': 6, 'ui-masking': 6, 'ui-logging': 6,
  grc: 6, 'access-control': 6, 'avm-pathlock': 6, etd: 6, 'audit-mgmt': 6, 'risk-mgmt': 6,
  'process-control': 6, 'risk-assurance': 6, 'integrity-screening': 6, 'watch-list': 6,
  'regulation-mgmt': 6, 'regulatory-change': 6, 'security-dd': 6, 'customer-data-cloud': 6,
  // L7 — IA e Fundação
  'ai-foundation': 7, 'knowledge-graph': 7, 'document-ai': 7,
  // L8 — Agentes
  joule: 8, 'joule-studio': 8, 'ai-agent-hub': 8, 'joule-consultants': 8,
  'joule-developers': 8, 'enterprise-chatbot': 8,
  // L9 — Experiência
  fiori: 9, workzone: 9, 'sap-start': 9, 'enterprise-portal': 9, 'screen-personas': 9,
  'task-center': 9, 'micro-app-hub': 9,
}

export function nivelDoServico(servicoId) {
  if (OVERRIDE[servicoId] !== undefined) return OVERRIDE[servicoId]
  const s = SERVICOS_POR_ID[servicoId]
  return s ? BASE[s.camada] ?? 5 : 5
}

export function servicosDoNivel(n) {
  return Object.keys(SERVICOS_POR_ID).filter((id) => nivelDoServico(id) === n)
}
