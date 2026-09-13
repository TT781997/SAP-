import { useState, useMemo, useEffect, useCallback } from 'react'
import { ReactFlow, ReactFlowProvider, Background, Controls, MiniMap, Panel, MarkerType, useNodesState, useEdgesState, useReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Map as MapIcon, Play, Pause, X } from 'lucide-react'
import { TIPOS_NO, TIPOS_ARESTA, COR_DOMINIO } from '../schematics/nodes.jsx'
import onprem from '../schematics/onprem.js'
import grow from '../schematics/grow.js'
import riseAzure from '../schematics/rise-azure.js'
import s4Public from '../schematics/s4-public-simple.js'
import genaiBtp from '../schematics/genai-btp.js'
import jouleStack from '../schematics/joule-stack.js'
import eventsActions from '../schematics/events-actions.js'
import safetyInspection from '../schematics/safety-inspection.js'

// Ordem: 3 cenários (a "aula" de cada preset) + aprofundamentos.
export const ESQUEMAS = [onprem, grow, riseAzure, s4Public, genaiBtp, jouleStack, eventsActions, safetyInspection]
const DOMINIOS = [
  { id: 'todos', pt: 'Todos os domínios', en: 'All domains' },
  { id: 'ai', pt: 'AI & Machine Learning', en: 'AI & Machine Learning' },
  { id: 'appdev', pt: 'Application Dev. & Automation', en: 'Application Dev. & Automation' },
  { id: 'data', pt: 'Data & Analytics', en: 'Data & Analytics' },
  { id: 'integration', pt: 'Integration', en: 'Integration' },
  { id: 'opsec', pt: 'Operation & Security', en: 'Operation & Security' },
]
const CHIPS = [
  { id: 'joule-stack', pt: 'North Star AI', en: 'North Star AI' },
  { id: 'genai-btp', pt: 'Prompting BTP', en: 'Prompting BTP' },
  { id: 'events-actions', pt: 'Events → Actions', en: 'Events → Actions' },
]
const LEGENDA_EDGES = [
  ['nativa', '#38bdf8', 'dados / nativa'], ['extensao', '#a78bfa', 'clean core / BTP'], ['rede', '#94a3b8', 'rede'],
  ['governa', '#fb7185', 'governa'], ['auth', '#22c55e', 'trust / auth'], ['dr', '#f97316', 'replicação DR'],
]
const MAX_ANIMADAS = 8

export function esquemaPorPreset(preset, hyperscaler) {
  if (preset === 'onprem') return 'onprem'
  if (preset === 'cloud') return 'grow'
  return hyperscaler === 'sci' ? 'rise-azure' : 'rise-azure'
}

function EsquemaInner({ t, idioma, cenario, hyperscaler, onAbrirServico, onVerNoMapa }) {
  const [esquemaId, setEsquemaId] = useState(() => esquemaPorPreset(cenario, hyperscaler))
  const [dominio, setDominio] = useState('todos')
  const [fluxoActivo, setFluxoActivo] = useState(true)
  const [noHover, setNoHover] = useState(null)
  const [arestaSel, setArestaSel] = useState(null)
  const { fitView } = useReactFlow()

  // O preset activo pré-selecciona o esquema (secção 12): RISE → Azure, GROW → grow, on-prem → onprem.
  useEffect(() => { setEsquemaId(esquemaPorPreset(cenario, hyperscaler)) }, [cenario, hyperscaler])

  const esquema = ESQUEMAS.find((e) => e.id === esquemaId) ?? ESQUEMAS[0]
  const [cenarioLocal, setCenarioLocal] = useState(esquema.cenarios[0].id)
  useEffect(() => { setCenarioLocal(esquema.cenarios[0].id); setArestaSel(null); setNoHover(null) }, [esquema])

  const reduzMovimento = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const nosBase = useMemo(() => esquema.nodes.map((n) => {
    const estilo = esquema.computarEstiloNo(n.id, cenarioLocal)
    return { ...n, data: { ...n.data, ...estilo }, draggable: false }
  }), [esquema, cenarioLocal])

  const nosAcesos = useMemo(() => new Set(nosBase.filter((n) => !n.data.dimmed).map((n) => n.id)), [nosBase])

  const arestasBase = useMemo(() => {
    let animadasRestantes = MAX_ANIMADAS
    return esquema.edges.map((a) => {
      const dimmedCenario = !(nosAcesos.has(a.source) && nosAcesos.has(a.target)) || a.data?.dimmed
      const incidente = noHover ? (a.source === noHover || a.target === noHover) : true
      const dimmed = dimmedCenario || !incidente
      let animado = !!a.data?.animado && fluxoActivo && !reduzMovimento && !dimmed
      if (animado && animadasRestantes > 0) animadasRestantes -= 1
      else animado = false
      return {
        ...a,
        type: 'sapEdge',
        markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14, color: dimmed ? '#475569' : undefined },
        data: { ...a.data, dimmed, animado },
      }
    })
  }, [esquema, nosAcesos, noHover, fluxoActivo, reduzMovimento])

  const [nos, setNos] = useNodesState(nosBase)
  const [arestas, setArestas] = useEdgesState(arestasBase)
  useEffect(() => { setNos(nosBase); setArestas(arestasBase); const id = setTimeout(() => fitView({ padding: 0.15, duration: 400 }), 60); return () => clearTimeout(id) }, [nosBase, arestasBase, setNos, setArestas, fitView])

  const aoClicarNo = useCallback((_, no) => { if (no.data?.cardId) onAbrirServico(no.data.cardId) }, [onAbrirServico])
  const aoClicarAresta = useCallback((_, a) => setArestaSel(a), [])
  const lang = idioma === 'pt' ? 'pt' : 'en'
  const listaEsquemas = ESQUEMAS.filter((e) => dominio === 'todos' || e.dominio === dominio)

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nos}
        edges={arestas}
        nodeTypes={TIPOS_NO}
        edgeTypes={TIPOS_ARESTA}
        colorMode="dark"
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.3}
        maxZoom={1.6}
        nodesConnectable={false}
        nodesDraggable={false}
        elementsSelectable={true}
        onNodeClick={aoClicarNo}
        onEdgeClick={aoClicarAresta}
        onNodeMouseEnter={(_, n) => setNoHover(n.id)}
        onNodeMouseLeave={() => setNoHover(null)}
        onPaneClick={() => { setArestaSel(null); setNoHover(null) }}
        proOptions={{ hideAttribution: false }}
      >
        <Background variant="dots" gap={24} color="#1e293b" />
        <MiniMap pannable zoomable nodeColor={(n) => COR_DOMINIO[n.data?.dominio] ?? '#334155'} maskColor="rgba(7,11,20,0.75)" style={{ background: '#0c1220' }} />
        <Controls showInteractive={false} />

        <Panel position="top-left">
          <div className="vidro max-w-[520px] rounded-2xl p-3">
            <h2 className="text-[15px] font-extrabold text-gray-100">{esquema.titulo[idioma] ?? esquema.titulo.pt}</h2>
            <p className="mt-0.5 text-[11px] leading-snug text-gray-400">{esquema.hero?.[lang] ?? esquema.hero?.pt}</p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <select value={dominio} onChange={(e) => setDominio(e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-gray-200 [&>option]:bg-[#0c1220]" aria-label="Domínio">
                {DOMINIOS.map((d) => <option key={d.id} value={d.id}>{d[lang]}</option>)}
              </select>
              <select value={esquemaId} onChange={(e) => setEsquemaId(e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-gray-200 [&>option]:bg-[#0c1220]" aria-label={t('viewSchema')}>
                {listaEsquemas.map((e) => <option key={e.id} value={e.id}>{e.titulo[idioma] ?? e.titulo.pt}</option>)}
              </select>
              {esquema.cenarios.length > 1 && esquema.cenarios.map((c) => (
                <button key={c.id} type="button" onClick={() => setCenarioLocal(c.id)} aria-pressed={cenarioLocal === c.id}
                  className={`rounded-lg px-2 py-1 text-[11px] font-medium ${cenarioLocal === c.id ? 'bg-fuchsia-500/25 text-fuchsia-200' : 'text-gray-400 hover:bg-white/10'}`}>
                  {c.nome[lang] ?? c.nome.pt}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-gray-500">{t('esquemaInstrucoes')}</p>
          </div>
        </Panel>

        <Panel position="top-right">
          <div className="flex flex-wrap justify-end gap-1.5">
            {CHIPS.map((c) => (
              <button key={c.id} type="button" onClick={() => setEsquemaId(c.id)} aria-pressed={esquemaId === c.id}
                className={`vidro rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${esquemaId === c.id ? 'bg-fuchsia-500/30 text-fuchsia-100' : 'text-gray-300 hover:bg-white/10'}`}>
                {c[lang]}
              </button>
            ))}
          </div>
        </Panel>

        <Panel position="bottom-left">
          <div className="vidro flex flex-col gap-2 rounded-xl p-2.5 text-[10px] text-gray-300">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {LEGENDA_EDGES.map(([id, cor, nome]) => (
                <span key={id} className="flex items-center gap-1"><span className="inline-block h-0.5 w-4" style={{ background: cor }} aria-hidden="true" />{nome}</span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setFluxoActivo((v) => !v)} className="flex items-center gap-1 rounded-lg bg-sky-500/20 px-2 py-1 font-semibold text-sky-200 hover:bg-sky-500/30">
                {fluxoActivo ? <Pause size={11} aria-hidden="true" /> : <Play size={11} aria-hidden="true" />} {fluxoActivo ? t('esquemaPausarFluxo') : t('esquemaExplorarFluxo')}
              </button>
              <button type="button" onClick={onVerNoMapa} className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 font-semibold text-gray-200 hover:bg-white/10">
                <MapIcon size={11} aria-hidden="true" /> {t('esquemaVerPortefolio')}
              </button>
            </div>
            <p className="text-gray-500">{t('esquemaRodape')}</p>
          </div>
        </Panel>

        <Panel position="bottom-right">
          <div className="vidro max-w-[320px] rounded-lg px-2 py-1 text-[9px] text-gray-500">{esquema.fonte}</div>
        </Panel>

        {arestaSel && (
          <Panel position="bottom-center">
            <div className="vidro flex max-w-md items-start gap-2 rounded-xl p-3 text-[11px]">
              <div>
                <p className="font-semibold text-gray-100">{arestaSel.source} → {arestaSel.target}{arestaSel.label ? ` — ${arestaSel.label}` : ''}</p>
                <p className="mt-0.5 text-gray-400">{arestaSel.data?.frase}</p>
              </div>
              <button type="button" onClick={() => setArestaSel(null)} aria-label={t('closeDrawer')} className="text-gray-400 hover:text-gray-200"><X size={14} aria-hidden="true" /></button>
            </div>
          </Panel>
        )}
      </ReactFlow>

      {esquema.northStar && (
        <aside className="vidro absolute right-3 top-16 z-10 w-[260px] rounded-2xl p-3 text-[11px] leading-snug text-gray-300">
          <h3 className="mb-1.5 text-[12px] font-bold text-gray-100">{t('northStarTitulo')}</h3>
          <ol className="space-y-1.5">
            <li><strong className="text-gray-100">1. User experience</strong> — Joule como engagement layer: intenção, não ecrãs.</li>
            <li><strong className="text-gray-100">2. Process</strong> — apps como capability providers de agentes; gateway governado.</li>
            <li><strong className="text-gray-100">3. Foundation (AI & data)</strong> — BDC + Knowledge Graph = system of context.</li>
            <li><strong className="text-gray-100">4. Platform</strong> — runtime, sandbox, identidade, observabilidade dos agentes.</li>
          </ol>
          <p className="mt-2 text-[9px] text-gray-500">Paper AI-native North Star, cap. 3–6 (SAP Architecture Center, Mai 2026). Modo de leitura sobre os cards existentes — não cria produtos novos.</p>
        </aside>
      )}
    </div>
  )
}

export default function EsquemaView(props) {
  return (
    <div className="relative min-h-[calc(100vh-190px)] flex-1 overflow-hidden rounded-2xl border border-white/10">
      <ReactFlowProvider>
        <EsquemaInner {...props} />
      </ReactFlowProvider>
    </div>
  )
}
