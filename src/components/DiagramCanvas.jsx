import { useState, useRef, useLayoutEffect, useCallback, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ZoomIn, ZoomOut, RotateCcw, XCircle, Route } from 'lucide-react'
import {
  LAYERS, SERVICOS, SERVICOS_POR_ID, CLUSTERS, HYPERSCALER_IDS,
  obterEstado, temDestaquePerfil, LABELS_TIPO_LIGACAO, getLigacoesDoServico, ESPINHAS_PRESET,
} from '../data.js'
import ServiceCard from './ServiceCard.jsx'
import ClusterTile from './ClusterTile.jsx'
import useZoom from '../hooks/useZoom.js'

const LAYERS_TOPO_A_BASE = [...LAYERS].sort((a, b) => b.nivel - a.nivel)
const TRACO_POR_TIPO = { extensao: '6 4', rede: '2 3', governa: '7 3 1 3', nativa: undefined }
const LABEL_ESTADO_UI = { activo: 'stateActive', recomendado: 'stateRecommended', opcional: 'stateOptional', legado: 'stateLegacy', irrelevante: 'stateIrrelevant' }

function contarMembrosClusterNaCamada(clusterId, camadaId) {
  return SERVICOS.filter((s) => s.cluster === clusterId && s.camada === camadaId).length
}

// Caminho ortogonal de 3 segmentos (elbow), nunca diagonal a atravessar
// camadas — ver secção 1/10 do brief. O label fica no ponto médio do
// segmento horizontal do meio.
function caminhoOrtogonal(x1, y1, x2, y2) {
  const my = (y1 + y2) / 2
  return { d: `M ${x1} ${y1} L ${x1} ${my} L ${x2} ${my} L ${x2} ${y2}`, labelX: (x1 + x2) / 2, labelY: my }
}

export default function DiagramCanvas({
  cenario, hyperscaler, mostrarLegado, perfisActivos, servicoDestacadoId, servicoAbertoId, onAbrirServico, t, tCamada, tServico,
}) {
  const [clustersColapsados, setClustersColapsados] = useState(() =>
    Object.fromEntries(Object.entries(CLUSTERS).map(([id, c]) => [id, c.colapsadoPorDefeito])),
  )
  const [servicoHover, setServicoHover] = useState(null)
  const [ligacaoSeleccionada, setLigacaoSeleccionada] = useState(null)
  const [soEspinha, setSoEspinha] = useState(false)
  const { zoom, aumentar, diminuir, repor } = useZoom()
  const [arestas, setArestas] = useState([])
  const [ligacoesOcultasCount, setLigacoesOcultasCount] = useState(0)

  const scrollRef = useRef(null)
  const innerRef = useRef(null)
  const cardRefs = useRef({})
  const clusterRefs = useRef({})

  const alternarCluster = useCallback((id) => {
    setClustersColapsados((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const ctx = useMemo(() => ({ cenario, mostrarLegado, perfisActivos }), [cenario, mostrarLegado, perfisActivos])

  // Só o hyperscaler seleccionado representa a infra L0 activa; os outros
  // três (incl. SCI) tornam-se irrelevantes (dimmed, nunca escondidos) fora do on-prem.
  const estadoDoServico = useCallback((id) => {
    if (HYPERSCALER_IDS.includes(id) && id !== hyperscaler && cenario !== 'onprem') {
      return 'irrelevante'
    }
    return obterEstado(id, ctx)
  }, [hyperscaler, cenario, ctx])

  function resolverRef(id) {
    const s = SERVICOS_POR_ID[id]
    if (s.cluster && contarMembrosClusterNaCamada(s.cluster, s.camada) > 1 && clustersColapsados[s.cluster]) {
      return clusterRefs.current[s.cluster]
    }
    return cardRefs.current[id]
  }

  const recalcularArestas = useCallback(() => {
    const inner = innerRef.current
    if (!inner) { setArestas([]); return }
    const innerRect = inner.getBoundingClientRect()

    function posicaoLocal(node) {
      const r = node.getBoundingClientRect()
      return {
        x: (r.left - innerRect.left + r.width / 2) / zoom,
        y: (r.top - innerRect.top + r.height / 2) / zoom,
      }
    }

    const alvo = servicoAbertoId || servicoHover
    const novas = []
    let ocultas = 0

    if (soEspinha) {
      const espinha = ESPINHAS_PRESET[cenario] ?? []
      for (let i = 0; i < espinha.length - 1; i++) {
        const nodeDe = resolverRef(espinha[i])
        const nodePara = resolverRef(espinha[i + 1])
        if (!nodeDe || !nodePara || nodeDe === nodePara) continue
        const pDe = posicaoLocal(nodeDe)
        const pPara = posicaoLocal(nodePara)
        const { d, labelX, labelY } = caminhoOrtogonal(pDe.x, pDe.y, pPara.x, pPara.y)
        novas.push({ id: `espinha-${i}`, d, labelX, labelY, tipo: 'governa', label: null, destaque: true })
      }
    } else if (alvo) {
      const { visiveis, ocultas: n } = getLigacoesDoServico(alvo, ctx)
      ocultas = n
      for (const l of visiveis) {
        const nodeDe = resolverRef(l.de)
        const nodePara = resolverRef(l.para)
        if (!nodeDe || !nodePara || nodeDe === nodePara) continue
        const pDe = posicaoLocal(nodeDe)
        const pPara = posicaoLocal(nodePara)
        const { d, labelX, labelY } = caminhoOrtogonal(pDe.x, pDe.y, pPara.x, pPara.y)
        novas.push({ id: l.id, d, labelX, labelY, tipo: l.tipo, ligacao: l, label: LABELS_TIPO_LIGACAO[l.tipo], destaque: true })
      }
    }

    setArestas(novas)
    setLigacoesOcultasCount(ocultas)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, cenario, hyperscaler, mostrarLegado, perfisActivos, servicoHover, servicoAbertoId, clustersColapsados, soEspinha])

  useLayoutEffect(() => {
    recalcularArestas()
    const t = setTimeout(recalcularArestas, 480) // deixa a animação de layout do Framer Motion assentar
    window.addEventListener('resize', recalcularArestas)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', recalcularArestas)
    }
  }, [recalcularArestas])

  // Resultado de busca seleccionado no Header: expande o cluster se preciso,
  // faz scroll até ao card e acende o anel de destaque.
  useLayoutEffect(() => {
    if (!servicoDestacadoId) return
    const s = SERVICOS_POR_ID[servicoDestacadoId]
    if (!s) return
    const precisaExpandir = s.cluster && clustersColapsados[s.cluster] && contarMembrosClusterNaCamada(s.cluster, s.camada) > 1
    if (precisaExpandir) {
      setClustersColapsados((prev) => ({ ...prev, [s.cluster]: false }))
    }
    const t = setTimeout(
      () => cardRefs.current[s.id]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }),
      precisaExpandir ? 60 : 0,
    )
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicoDestacadoId])

  function itensPorCamada(camadaId) {
    const servicosDaCamada = SERVICOS.filter((s) => s.camada === camadaId)
    const tileJaEmitido = new Set() // só rastreia clusters já mostrados COLAPSADOS
    const itens = []
    for (const s of servicosDaCamada) {
      const clusterAgrupavel = s.cluster && contarMembrosClusterNaCamada(s.cluster, camadaId) > 1
      if (clusterAgrupavel && clustersColapsados[s.cluster]) {
        if (tileJaEmitido.has(s.cluster)) continue
        tileJaEmitido.add(s.cluster)
        itens.push({ tipo: 'cluster', clusterId: s.cluster, membros: SERVICOS.filter((x) => x.cluster === s.cluster && x.camada === camadaId) })
        continue
      }
      itens.push({ tipo: 'card', servico: s })
    }
    return itens
  }

  const temSeleccao = !!(servicoAbertoId || servicoHover) || soEspinha

  return (
    <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10">
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-1">
        <button type="button" onClick={aumentar} aria-label={t('zoomIn')} className="vidro rounded-lg p-2 text-gray-200 hover:bg-white/10">
          <ZoomIn size={16} aria-hidden="true" />
        </button>
        <button type="button" onClick={diminuir} aria-label={t('zoomOut')} className="vidro rounded-lg p-2 text-gray-200 hover:bg-white/10">
          <ZoomOut size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => { repor(); scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }}
          aria-label={t('resetView')}
          className="vidro rounded-lg p-2 text-gray-200 hover:bg-white/10"
        >
          <RotateCcw size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setSoEspinha((v) => !v)}
          aria-pressed={soEspinha}
          className={`vidro flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors ${soEspinha ? 'bg-sky-500/25 text-sky-200' : 'text-gray-300 hover:bg-white/10'}`}
        >
          <Route size={13} aria-hidden="true" /> {t('spineOnly')}
        </button>
        {temSeleccao && !soEspinha && (
          <button
            type="button"
            onClick={() => { setServicoHover(null); onAbrirServico(null) }}
            className="vidro flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-gray-300 hover:bg-white/10"
          >
            <XCircle size={13} aria-hidden="true" /> {t('clearSelection')}
          </button>
        )}
        {ligacoesOcultasCount > 0 && (
          <span className="vidro rounded-lg px-2.5 py-1.5 text-[11px] text-gray-400">
            +{ligacoesOcultasCount} {t('hiddenEdgesSuffix')}
          </span>
        )}
      </div>

      {ligacaoSeleccionada && (
        <div className="vidro absolute bottom-3 left-3 right-3 z-20 flex items-start justify-between gap-3 rounded-xl p-3 text-[12px] sm:right-auto sm:max-w-md">
          <div>
            <p className="font-semibold text-gray-100">
              {tServico(ligacaoSeleccionada.de, 'nome') ?? SERVICOS_POR_ID[ligacaoSeleccionada.de].nome} → {tServico(ligacaoSeleccionada.para, 'nome') ?? SERVICOS_POR_ID[ligacaoSeleccionada.para].nome}
            </p>
            <p className="mt-0.5 text-gray-400">{LABELS_TIPO_LIGACAO[ligacaoSeleccionada.tipo]} · {ligacaoSeleccionada.padrao}</p>
          </div>
          <button type="button" onClick={() => setLigacaoSeleccionada(null)} aria-label={t('closeDrawer')} className="shrink-0 text-gray-400 hover:text-gray-200">✕</button>
        </div>
      )}

      <div ref={scrollRef} className="fundo-mapa h-full overflow-auto p-6">
        <div ref={innerRef} style={{ transform: `scale(${zoom})`, transformOrigin: '0 0', position: 'relative', width: 'max-content', minWidth: '100%' }}>
          <svg className="absolute left-0 top-0 overflow-visible" style={{ width: 1, height: 1 }} aria-hidden="true">
            {arestas.map((a) => (
              <g key={a.id}>
                <path
                  d={a.d}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  strokeDasharray={TRACO_POR_TIPO[a.tipo]}
                  className="ligacao-animada"
                />
                <path d={a.d} fill="none" stroke="transparent" strokeWidth={14} style={{ cursor: a.ligacao ? 'pointer' : 'default', pointerEvents: a.ligacao ? 'stroke' : 'none' }} onClick={() => a.ligacao && setLigacaoSeleccionada(a.ligacao)} />
                {a.label && (
                  <g transform={`translate(${a.labelX}, ${a.labelY})`}>
                    <rect x={-30} y={-8} width={60} height={16} rx={4} fill="#0c1220" opacity={0.9} />
                    <text x={0} y={4} textAnchor="middle" fontSize="9" fill="#93c5fd" fontWeight="600">{a.label}</text>
                  </g>
                )}
              </g>
            ))}
          </svg>

          <div className="relative flex flex-col gap-3">
            {LAYERS_TOPO_A_BASE.map((layer) => (
              <section
                key={layer.id}
                className="rounded-xl p-3"
                style={{ background: `color-mix(in srgb, ${layer.corVar} 7%, transparent)`, borderLeft: `3px solid ${layer.corVar}` }}
              >
                <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wide" style={{ color: layer.corVar }}>
                  {tCamada(layer.id)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence initial={false}>
                    {itensPorCamada(layer.id).map((item) =>
                      item.tipo === 'cluster' ? (
                        <ClusterTile
                          key={item.clusterId}
                          ref={(el) => { clusterRefs.current[item.clusterId] = el }}
                          nome={CLUSTERS[item.clusterId].nome}
                          corCamada={layer.corVar}
                          membros={item.membros}
                          aColapsado={clustersColapsados[item.clusterId]}
                          onAlternar={() => alternarCluster(item.clusterId)}
                        />
                      ) : (
                        <ServiceCard
                          key={item.servico.id}
                          ref={(el) => { cardRefs.current[item.servico.id] = el }}
                          servico={item.servico}
                          nome={tServico(item.servico.id, 'nome') ?? item.servico.nome}
                          tipo={item.servico.tipo}
                          oQueFaz={tServico(item.servico.id, 'oQueFaz') ?? item.servico.oQueFaz}
                          estado={estadoDoServico(item.servico.id)}
                          labelEstado={t(LABEL_ESTADO_UI[estadoDoServico(item.servico.id)])}
                          corCamada={layer.corVar}
                          destaqueBusca={servicoDestacadoId === item.servico.id}
                          destaquePerfil={temDestaquePerfil(item.servico.id, perfisActivos)}
                          aberto={servicoAbertoId === item.servico.id}
                          onAbrir={onAbrirServico}
                          onMouseEnter={() => setServicoHover(item.servico.id)}
                          onMouseLeave={() => setServicoHover(null)}
                        />
                      ),
                    )}
                  </AnimatePresence>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
