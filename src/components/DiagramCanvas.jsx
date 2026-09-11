import { useState, useRef, useLayoutEffect, useCallback, useMemo } from 'react'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { LAYERS, SERVICOS, TODAS_LIGACOES, obterEstado, SERVICOS_POR_ID } from '../data.js'
import ServiceCard from './ServiceCard.jsx'

const TRACO_POR_TIPO = { nativa: 'none', extensao: '7 5', rede: '2 5' }

export default function DiagramCanvas({ cenario, hyperscaler, mostrarLegado, searchQuery, servicoAbertoId, onAbrirServico, largura, isStack }) {
  const containerRef = useRef(null)
  const cardRefs = useRef({})
  const [arestas, setArestas] = useState([])
  const [arestaAtiva, setArestaAtiva] = useState(null)
  const reduzirMovimento = useReducedMotion()

  const servicosComEstado = useMemo(
    () => SERVICOS.map((s) => ({ ...s, estado: obterEstado(s.id, { cenario, hyperscaler, mostrarLegado }) })),
    [cenario, hyperscaler, mostrarLegado],
  )

  const consulta = searchQuery.trim().toLowerCase()
  const pesquisaAtiva = consulta.length > 0
  const idsCorrespondentes = useMemo(() => {
    if (!pesquisaAtiva) return null
    return new Set(servicosComEstado.filter((s) => s.nome.toLowerCase().includes(consulta)).map((s) => s.id))
  }, [pesquisaAtiva, consulta, servicosComEstado])

  const registarCardRef = useCallback((id, node) => {
    if (node) cardRefs.current[id] = node
    else delete cardRefs.current[id]
  }, [])

  const recalcularArestas = useCallback(() => {
    const container = containerRef.current
    if (!container || isStack) {
      setArestas([])
      return
    }
    const rectContainer = container.getBoundingClientRect()
    const estadoPorId = Object.fromEntries(servicosComEstado.map((s) => [s.id, s.estado]))

    const novas = []
    for (const lig of TODAS_LIGACOES) {
      const eA = estadoPorId[lig.de]
      const eB = estadoPorId[lig.para]
      if (!eA || !eB || eA === 'escondido' || eB === 'escondido') continue
      const elA = cardRefs.current[lig.de]
      const elB = cardRefs.current[lig.para]
      if (!elA || !elB) continue
      const rA = elA.getBoundingClientRect()
      const rB = elB.getBoundingClientRect()
      const ativa = eA === 'ativo' && eB === 'ativo'
      novas.push({
        ...lig,
        x1: rA.left + rA.width / 2 - rectContainer.left,
        y1: rA.top + rA.height / 2 - rectContainer.top,
        x2: rB.left + rB.width / 2 - rectContainer.left,
        y2: rB.top + rB.height / 2 - rectContainer.top,
        ativa,
      })
    }
    setArestas(novas)
  }, [servicosComEstado, isStack])

  useLayoutEffect(() => {
    recalcularArestas()
    // recalcula outra vez após a transição de morph (Framer Motion, ~350-450ms)
    const t = setTimeout(recalcularArestas, 480)
    return () => clearTimeout(t)
  }, [recalcularArestas, largura])

  const camadasParaRender = [...LAYERS].reverse() // L5 (topo) -> L0 (fundo)

  return (
    <div
      ref={containerRef}
      onClick={() => setArestaAtiva(null)}
      className="relative mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 md:gap-4 md:px-8"
    >
      {!isStack && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {arestas.map((a) => (
            <g key={a.id}>
              <line
                x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
                stroke="transparent"
                strokeWidth={14}
                className="pointer-events-auto cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  setArestaAtiva({ ...a, mx: (a.x1 + a.x2) / 2, my: (a.y1 + a.y2) / 2 })
                }}
              />
              <line
                x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
                stroke={a.ativa ? '#94a3b8' : '#475569'}
                strokeOpacity={a.ativa ? 0.8 : 0.28}
                strokeWidth={a.ativa ? 1.75 : 1.1}
                strokeDasharray={TRACO_POR_TIPO[a.tipo]}
                className={a.ativa && !reduzirMovimento ? 'ligacao-animada' : undefined}
              />
            </g>
          ))}
        </svg>
      )}

      {arestaAtiva && !isStack && (
        <div
          role="status"
          className="vidro pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-xl px-3 py-2 text-xs text-gray-100"
          style={{ left: arestaAtiva.mx, top: arestaAtiva.my - 10 }}
        >
          <p className="font-medium">
            {SERVICOS_POR_ID[arestaAtiva.de]?.nome} → {SERVICOS_POR_ID[arestaAtiva.para]?.nome}
          </p>
          <p className="text-gray-400">{arestaAtiva.padrao}</p>
        </div>
      )}

      {camadasParaRender.map((camada) => {
        const servicosDaCamada = servicosComEstado.filter((s) => s.camada === camada.id)
        return (
          <section
            key={camada.id}
            aria-label={`Camada: ${camada.nome}`}
            className="relative z-10 rounded-2xl border border-white/5 p-3 md:p-4"
            style={{ background: `linear-gradient(90deg, color-mix(in srgb, ${camada.corVar} 8%, transparent), transparent 65%)` }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: camada.corVar }} aria-hidden="true" />
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{camada.nome}</h3>
            </div>
            <div className="flex flex-wrap gap-3 lg:flex-nowrap lg:overflow-x-auto lg:pb-1">
              <AnimatePresence initial={false}>
                {servicosDaCamada
                  // Uma pesquisa que acerte num serviço escondido traz-o de volta
                  // (visualmente atenuado) em vez de o manter fora do diagrama —
                  // pesquisar por nome deve sempre encontrar o serviço.
                  .filter((s) => s.estado !== 'escondido' || (pesquisaAtiva && idsCorrespondentes.has(s.id)))
                  .map((s) => {
                    const estadoEfetivo = s.estado === 'escondido' ? 'atenuado' : s.estado
                    return (
                      <div key={s.id} ref={(node) => registarCardRef(s.id, node)}>
                        <ServiceCard
                          servico={s}
                          estado={estadoEfetivo}
                          corCamada={camada.corVar}
                          cenario={cenario}
                          mostrarLegado={mostrarLegado}
                          aberto={servicoAbertoId === s.id}
                          destaque={pesquisaAtiva && idsCorrespondentes.has(s.id)}
                          apagado={pesquisaAtiva && !idsCorrespondentes.has(s.id)}
                          onAbrir={onAbrirServico}
                        />
                      </div>
                    )
                  })}
              </AnimatePresence>
              {servicosDaCamada.every((s) => s.estado === 'escondido' && !(pesquisaAtiva && idsCorrespondentes.has(s.id))) && (
                <p className="py-2 text-xs italic text-gray-600">Sem serviços nesta camada, neste cenário.</p>
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
