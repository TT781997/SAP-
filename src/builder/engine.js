import { SERVICOS_POR_ID, obterEstado, classificarLigacao, LABELS_TIPO_LIGACAO } from '../data.js'
import { nivelDoServico } from './layers.js'
import mined from './mined.js'

// Co-ocorrência extraída dos ficheiros .drawio oficiais do repositório
// SAP/architecture-center (Apache-2.0): quantos diagramas de referência da SAP
// desenham estes dois serviços na mesma tela. É a base das sugestões — não é
// opinião nossa, é o que a SAP efectivamente publica.
const COOC = new Map()
for (const [a, b, n] of mined.coocorrencia) {
  COOC.set(`${a}|${b}`, n)
  COOC.set(`${b}|${a}`, n)
}
export function coocorrencia(a, b) {
  return COOC.get(`${a}|${b}`) ?? 0
}

export const TEMPLATES = mined.templates

// --- ligações -------------------------------------------------------------
// Duas peças ligam-se se o catálogo as declara vizinhas (ligaA em qualquer
// sentido). Devolve também o tipo (nativa/extensao/rede/governa) para o
// traço, e se a SAP desenha o par junto.
export function podeLigar(aId, bId) {
  if (aId === bId) return null
  const a = SERVICOS_POR_ID[aId]
  const b = SERVICOS_POR_ID[bId]
  if (!a || !b) return null
  const declarada = a.ligaA.includes(bId) || b.ligaA.includes(aId)
  if (!declarada) return null
  return { tipo: classificarLigacao(aId, bId), label: LABELS_TIPO_LIGACAO[classificarLigacao(aId, bId)], diagramas: coocorrencia(aId, bId) }
}

export function ligacoesEntre(ids) {
  const lista = []
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const r = podeLigar(ids[i], ids[j])
      if (r) lista.push({ de: ids[i], para: ids[j], ...r })
    }
  }
  return lista
}

// --- requisitos -----------------------------------------------------------
// Regras explícitas e explicáveis; cada uma diz porquê em vez de só falhar.
const REGRAS = [
  {
    id: 'infra',
    aplica: (id) => nivelDoServico(id) > 0,
    satisfeita: (ids) => ids.some((x) => nivelDoServico(x) === 0),
    mensagem: { pt: 'precisa de uma infraestrutura em L0 (hyperscaler, SCI ou data center)', en: 'needs an L0 infrastructure (hyperscaler, SCI or data center)' },
  },
  {
    id: 'btp',
    aplica: (id) => {
      const s = SERVICOS_POR_ID[id]
      return id !== 'btp' && s?.ligaA.includes('btp') && [2, 7, 8].includes(nivelDoServico(id))
    },
    satisfeita: (ids) => ids.includes('btp'),
    mensagem: { pt: 'corre sobre o SAP BTP — acrescenta o BTP (L2)', en: 'runs on SAP BTP — add BTP (L2)' },
  },
]

// --- validação ------------------------------------------------------------
export function validar(ids, { cenario, mostrarLegado = true, perfisActivos = [] }) {
  const avisos = []
  const ctx = { cenario, mostrarLegado, perfisActivos }

  for (const id of ids) {
    for (const regra of REGRAS) {
      if (regra.aplica(id) && !regra.satisfeita(ids)) {
        avisos.push({ nivel: 'erro', servicoId: id, regra: regra.id, mensagem: regra.mensagem })
      }
    }
  }

  // Peças que o preset escolhido considera fora de cenário.
  for (const id of ids) {
    const estado = obterEstado(id, ctx)
    if (estado === 'irrelevante') {
      avisos.push({ nivel: 'aviso', servicoId: id, regra: 'preset', mensagem: { pt: 'não faz parte deste cenário', en: 'is not part of this scenario' } })
    } else if (estado === 'legado') {
      avisos.push({ nivel: 'info', servicoId: id, regra: 'legado', mensagem: { pt: 'é legado — planeia a saída', en: 'is legacy — plan the exit' } })
    }
  }

  // Peças sem qualquer ligação ao resto do desenho.
  if (ids.length > 1) {
    const ligadas = new Set()
    for (const l of ligacoesEntre(ids)) { ligadas.add(l.de); ligadas.add(l.para) }
    for (const id of ids) {
      if (!ligadas.has(id)) {
        avisos.push({ nivel: 'aviso', servicoId: id, regra: 'orfao', mensagem: { pt: 'está isolado — não liga a nada do que já colocaste', en: 'is isolated — it connects to nothing you have placed' } })
      }
    }
  }

  return avisos
}

// --- sugestões ------------------------------------------------------------
// Ordena candidatos por quantos diagramas oficiais da SAP os desenham junto
// do que já está na tela; desempata pelas ligações declaradas no catálogo.
export function sugerir(ids, { cenario, mostrarLegado = true, perfisActivos = [] }, limite = 8) {
  if (ids.length === 0) return []
  const colocados = new Set(ids)
  const ctx = { cenario, mostrarLegado, perfisActivos }
  const pontos = new Map()

  for (const id of ids) {
    for (const [a, b, n] of mined.coocorrencia) {
      const outro = a === id ? b : b === id ? a : null
      if (!outro || colocados.has(outro) || !SERVICOS_POR_ID[outro]) continue
      const p = pontos.get(outro) ?? { diagramas: 0, ligacoes: 0 }
      p.diagramas += n
      pontos.set(outro, p)
    }
    const s = SERVICOS_POR_ID[id]
    for (const alvo of s?.ligaA ?? []) {
      if (colocados.has(alvo) || !SERVICOS_POR_ID[alvo]) continue
      const p = pontos.get(alvo) ?? { diagramas: 0, ligacoes: 0 }
      p.ligacoes += 1
      pontos.set(alvo, p)
    }
  }

  return [...pontos.entries()]
    .filter(([id]) => obterEstado(id, ctx) !== 'irrelevante')
    .map(([id, p]) => ({ id, ...p, pontuacao: p.diagramas * 10 + p.ligacoes }))
    .sort((a, b) => b.pontuacao - a.pontuacao)
    .slice(0, limite)
}

// Completude: quantas das 11 camadas estão preenchidas.
export function cobertura(ids) {
  const niveis = new Set(ids.map(nivelDoServico))
  return { preenchidos: niveis.size, total: 11, niveis }
}
