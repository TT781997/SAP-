import { SERVICOS_POR_ID, obterEstado } from '../data.js'
import { CAPACIDADES_POR_ID, BASE_SEMPRE, PAIS_PT } from './capacidades.js'
import { PAPEIS_POR_ID } from './papeis.js'

// Traduz capacidades de negócio escolhidas num landscape + numa folha por
// papel. As razões saem sempre da capacidade que pediu a peça — nada aqui
// é opinião solta: se uma peça aparece, há uma linha a dizer porquê.

const ORDEM_CAMADAS = ['infra', 'dados', 'plataforma', 'integracao', 'core', 'lob', 'alm']

export function calcular(capacidadeIds, opcoes = {}) {
  const { via = 'cloud', pais = 'PT', apoiosLigados = [], extras = [] } = opcoes
  const capacidades = capacidadeIds.map((id) => CAPACIDADES_POR_ID[id]).filter(Boolean)

  // porquê[servicoId] = [{ capacidade, motivo, classe }]
  const porque = new Map()
  const registar = (id, entrada) => {
    if (!SERVICOS_POR_ID[id]) return
    if (!porque.has(id)) porque.set(id, [])
    porque.get(id).push(entrada)
  }

  for (const id of BASE_SEMPRE) {
    registar(id, { classe: 'base', motivo: { pt: 'Base de qualquer landscape S/4 cloud — sem isto não há dia 1.', en: 'Base of any S/4 cloud landscape — without it there is no day 1.' } })
  }

  for (const c of capacidades) {
    for (const id of c.nucleo) registar(id, { classe: 'nucleo', capacidade: c, motivo: { pt: `Sem isto não consegue ${c.nome.pt.toLowerCase()}.`, en: `Without this you cannot ${c.nome.en.toLowerCase()}.` } })
    if (pais === 'PT') {
      for (const id of c.conformidade) registar(id, { classe: 'conformidade', capacidade: c, motivo: PAIS_PT.porque })
    }
    for (const a of c.apoio ?? []) {
      if (apoiosLigados.includes(a.id)) registar(a.id, { classe: 'apoio', capacidade: c, motivo: a.quando })
    }
  }

  for (const id of extras) {
    registar(id, { classe: 'extra', motivo: { pt: 'Peça do pacote de transformação (brownfield).', en: 'Part of the transformation package (brownfield).' } })
  }

  // Fecho de dependências: se uma peça vive no BTP, o BTP tem de existir.
  const ids = new Set(porque.keys())
  const precisaBtp = [...ids].some((id) => {
    const s = SERVICOS_POR_ID[id]
    return s && s.id !== 'btp' && ['plataforma', 'integracao'].includes(s.camada) && s.ligaA.includes('btp')
  })
  if (precisaBtp && !ids.has('btp')) {
    registar('btp', { classe: 'dependencia', motivo: { pt: 'Peças que escolheu correm sobre o SAP BTP.', en: 'Pieces you chose run on SAP BTP.' } })
    ids.add('btp')
  }

  // Infraestrutura: no cloud/rise é o hyperscaler; no on-prem é o DC.
  const infraId = via === 'onprem' ? 'dc-onprem' : (opcoes.hyperscaler ?? 'azure')
  if (!ids.has(infraId)) {
    registar(infraId, { classe: 'base', motivo: via === 'onprem'
      ? { pt: 'Tudo assenta no seu data center.', en: 'Everything sits on your data center.' }
      : { pt: 'A infraestrutura onde a SAP opera o seu sistema.', en: 'The infrastructure where SAP operates your system.' } })
    ids.add(infraId)
  }

  // Agrupar por camada, com estado no cenário escolhido.
  const ctx = { cenario: via, mostrarLegado: false, perfisActivos: [] }
  const porCamada = ORDEM_CAMADAS.map((camada) => ({
    camada,
    pecas: [...ids]
      .filter((id) => SERVICOS_POR_ID[id]?.camada === camada)
      .map((id) => ({ id, servico: SERVICOS_POR_ID[id], razoes: porque.get(id), estado: obterEstado(id, ctx) }))
      .sort((a, b) => a.servico.nome.localeCompare(b.servico.nome)),
  })).filter((g) => g.pecas.length > 0)

  // Papéis envolvidos e as apps que cada um abre — só as que o landscape suporta.
  const papelIds = [...new Set(capacidades.flatMap((c) => c.papeis ?? []))]
  const papeis = papelIds.map((pid) => {
    const p = PAPEIS_POR_ID[pid]
    if (!p) return null
    const apps = p.apps.filter((a) => !a.requer || ids.has(a.requer))
    const capacidadesDoPapel = capacidades.filter((c) => (c.papeis ?? []).includes(pid))
    return { ...p, apps, capacidades: capacidadesDoPapel, appsEmFalta: p.apps.filter((a) => a.requer && !ids.has(a.requer)) }
  }).filter(Boolean)

  // Decisões por tomar e notas honestas.
  const decisoes = capacidades.filter((c) => c.decisao).map((c) => ({ capacidade: c, texto: c.decisao }))
  const notas = capacidades.filter((c) => c.nota).map((c) => ({ capacidade: c, texto: c.nota }))

  // Apoios ainda por decidir (mostrados como perguntas, não como carrinho).
  const apoiosDisponiveis = []
  for (const c of capacidades) {
    for (const a of c.apoio ?? []) {
      if (apoiosLigados.includes(a.id) || !SERVICOS_POR_ID[a.id]) continue
      apoiosDisponiveis.push({ id: a.id, servico: SERVICOS_POR_ID[a.id], quando: a.quando, capacidade: c })
    }
  }

  return {
    ids: [...ids],
    porCamada,
    papeis,
    decisoes,
    notas,
    apoiosDisponiveis,
    total: ids.size,
    via,
  }
}

// Via de contrato sugerida. Regra explicável, não caixa preta.
export function sugerirVia({ capacidadeIds, pessoas = 50, temSapAntigo = false, muitoCodigoAMedida = false }) {
  if (temSapAntigo && muitoCodigoAMedida) {
    return { via: 'rise', chave: 'riseBrownfield' }
  }
  if (pessoas < 15 && capacidadeIds.length <= 6) {
    return { via: 'cloud', chave: 'microB1' }
  }
  if (temSapAntigo) {
    return { via: 'rise', chave: 'riseExistente' }
  }
  return { via: 'cloud', chave: 'growStandard' }
}

export const RAZOES_VIA = {
  growStandard: {
    pt: 'Processo standard e sem SAP antigo para preservar: GROW / S/4HANA Cloud Public Edition. Actualizações vêm da SAP, o custom code sai para o BTP.',
    en: 'Standard process and no legacy SAP to preserve: GROW / S/4HANA Cloud Public Edition. Upgrades come from SAP, custom code moves to BTP.',
  },
  riseExistente: {
    pt: 'Já tem SAP: RISE / S/4HANA Cloud Private Edition mantém o âmbito que tem hoje com operação SAP.',
    en: 'You already run SAP: RISE / S/4HANA Cloud Private Edition keeps today’s scope with SAP operating it.',
  },
  riseBrownfield: {
    pt: 'SAP antigo com muito código à medida: RISE / Private Edition, mais Signavio para decidir o processo, BTC para os dados e Tricentis para a regressão.',
    en: 'Legacy SAP with heavy custom code: RISE / Private Edition, plus Signavio to decide the process, BTC for data and Tricentis for regression.',
  },
  microB1: {
    pt: 'Muito pequena e com âmbito curto: vale a pena comparar o GROW com o SAP Business One antes de decidir — o Business One é outro produto, com outro roadmap, mas para esta dimensão pode chegar.',
    en: 'Very small with narrow scope: worth comparing GROW against SAP Business One before deciding — Business One is a different product with its own roadmap, but at this size it may be enough.',
  },
}
