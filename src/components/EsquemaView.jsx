import { useState, useMemo } from 'react'
import { ReactFlow, Background, Controls, MarkerType } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { TIPOS_NO } from '../schematics/nodes.jsx'
import genaiBtp from '../schematics/genai-btp.js'
import safetyInspection from '../schematics/safety-inspection.js'

const ESQUEMAS = [genaiBtp, safetyInspection]

function construirNos(esquema, cenarioId) {
  return esquema.nodes.map((no) => {
    const estilo = esquema.computarEstiloNo(no.id, cenarioId)
    return { ...no, data: { ...no.data, ...estilo }, draggable: false, selectable: false }
  })
}

function construirArestas(esquema, cenarioId, nosAcesos) {
  return esquema.edges.map((a) => {
    const destaque = a.tipo === 'destaque'
    const dimmed = nosAcesos ? !(nosAcesos.has(a.source) && nosAcesos.has(a.target)) : false
    return {
      ...a,
      type: 'smoothstep',
      animated: destaque && !dimmed,
      style: {
        stroke: dimmed ? '#cbd5e1' : destaque ? '#c026d3' : '#64748b',
        strokeWidth: destaque ? 2 : 1.5,
        opacity: dimmed ? 0.3 : 1,
      },
      markerEnd: { type: MarkerType.ArrowClosed, color: dimmed ? '#cbd5e1' : destaque ? '#c026d3' : '#64748b', width: 16, height: 16 },
      labelStyle: { fontSize: 9, fontWeight: 600, fill: dimmed ? '#94a3b8' : destaque ? '#a21caf' : '#475569' },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.92 },
      labelBgPadding: [4, 2],
      labelBgBorderRadius: 4,
    }
  })
}

export default function EsquemaView({ t, idioma }) {
  const [esquemaId, setEsquemaId] = useState(ESQUEMAS[0].id)
  const esquema = ESQUEMAS.find((e) => e.id === esquemaId)
  const [cenarioId, setCenarioId] = useState(esquema.cenarios[0].id)

  function seleccionarEsquema(id) {
    const novo = ESQUEMAS.find((e) => e.id === id)
    setEsquemaId(id)
    setCenarioId(novo.cenarios[0].id)
  }

  const nos = useMemo(() => construirNos(esquema, cenarioId), [esquema, cenarioId])
  const nosAcesos = useMemo(() => {
    if (!esquema.computarEstiloNo) return null
    const set = new Set(esquema.nodes.map((n) => n.id).filter((id) => !esquema.computarEstiloNo(id, cenarioId).dimmed))
    return set
  }, [esquema, cenarioId])
  const arestas = useMemo(() => construirArestas(esquema, cenarioId, nosAcesos), [esquema, cenarioId, nosAcesos])
  const usaFoco = esquema.nodes.some((n) => esquema.computarEstiloNo(n.id, cenarioId).focus)

  return (
    <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10">
      <div className="vidro absolute left-3 top-3 z-20 flex flex-wrap gap-2 rounded-xl p-2">
        {ESQUEMAS.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => seleccionarEsquema(e.id)}
            aria-pressed={esquemaId === e.id}
            className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors ${esquemaId === e.id ? 'bg-sky-500/90 text-white' : 'text-gray-300 hover:bg-white/10'}`}
          >
            {e.titulo[idioma] ?? e.titulo.pt}
          </button>
        ))}
        {esquema.cenarios.length > 1 && (
          <div className="ml-2 flex gap-1 border-l border-white/10 pl-2">
            {esquema.cenarios.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCenarioId(c.id)}
                aria-pressed={cenarioId === c.id}
                className={`rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors ${cenarioId === c.id ? 'bg-fuchsia-500/25 text-fuchsia-200' : 'text-gray-400 hover:bg-white/10'}`}
              >
                {c.nome[idioma] ?? c.nome.pt}
              </button>
            ))}
          </div>
        )}
      </div>

      {usaFoco && (
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-slate-700 shadow">
          <span className="h-3 w-5 rounded border-2 border-fuchsia-500 bg-fuchsia-50" aria-hidden="true" />
          {t('esquemaFocusLegend')}
        </div>
      )}

      <div className="absolute bottom-3 right-3 z-20 rounded-lg bg-white/90 px-2 py-1 text-[9px] text-slate-500 shadow">
        {esquema.fonte}
      </div>

      <ReactFlow
        key={esquemaId}
        nodes={nos}
        edges={arestas}
        nodeTypes={TIPOS_NO}
        fitView
        fitViewOptions={{ padding: 0.08 }}
        minZoom={0.3}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background color="#e2e8f0" gap={20} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  )
}
