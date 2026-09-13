import { useState, useRef, useCallback, useMemo, useLayoutEffect, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Trash2, AlertTriangle, Info, CircleAlert, Sparkles, LayoutTemplate, Download, Search } from 'lucide-react'
import { SERVICOS, SERVICOS_POR_ID, obterEstado } from '../data.js'
import { NIVEIS, nivelDoServico } from '../builder/layers.js'
import { ligacoesEntre, validar, sugerir, cobertura, coocorrencia, TEMPLATES, podeLigar } from '../builder/engine.js'
import { obterIcone } from '../icons.js'

const NIVEIS_TOPO_A_BASE = [...NIVEIS].sort((a, b) => b.n - a.n)
const TRACO = { extensao: '6 4', rede: '2 3', governa: '7 3 1 3', nativa: undefined }

function caminhoOrtogonal(x1, y1, x2, y2) {
  const my = (y1 + y2) / 2
  return `M ${x1} ${y1} L ${x1} ${my} L ${x2} ${my} L ${x2} ${y2}`
}

export default function BuilderView({ cenario, perfisActivos, t, idioma, tServico }) {
  const [colocados, setColocados] = useState(['azure', 's4hana', 'btp'])
  const [arrasto, setArrasto] = useState(null)
  const [nivelAlvo, setNivelAlvo] = useState(null)
  const [recusado, setRecusado] = useState(null)
  const [seleccionado, setSeleccionado] = useState(null)
  const [busca, setBusca] = useState('')
  const [nivelPaleta, setNivelPaleta] = useState('todos')
  const [mostrarTemplates, setMostrarTemplates] = useState(false)
  const [arestas, setArestas] = useState([])

  const telaRef = useRef(null)
  const faixaRefs = useRef({})
  const cartaoRefs = useRef({})

  const ctx = useMemo(() => ({ cenario, mostrarLegado: true, perfisActivos }), [cenario, perfisActivos])
  const ligacoes = useMemo(() => ligacoesEntre(colocados), [colocados])
  const avisos = useMemo(() => validar(colocados, ctx), [colocados, ctx])
  const sugestoes = useMemo(() => sugerir(colocados, ctx), [colocados, ctx])
  const cob = useMemo(() => cobertura(colocados), [colocados])

  const acrescentar = useCallback((id) => {
    setColocados((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])
  const remover = useCallback((id) => {
    setColocados((prev) => prev.filter((x) => x !== id))
    setSeleccionado((s) => (s === id ? null : s))
  }, [])

  // --- arrasto por pointer events (funciona em rato e toque) ---------------
  function iniciarArrasto(e, servicoId) {
    e.preventDefault()
    setArrasto({ id: servicoId, x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    if (!arrasto) return
    function mover(e) {
      setArrasto((a) => (a ? { ...a, x: e.clientX, y: e.clientY } : a))
      const alvo = faixaSob(e.clientX, e.clientY)
      setNivelAlvo(alvo)
    }
    function largar(e) {
      const alvo = faixaSob(e.clientX, e.clientY)
      const correcto = nivelDoServico(arrasto.id)
      if (alvo !== null && alvo === correcto) {
        acrescentar(arrasto.id)
      } else if (alvo !== null) {
        setRecusado({ nivel: alvo, servicoId: arrasto.id, correcto })
        setTimeout(() => setRecusado(null), 1400)
      }
      setArrasto(null)
      setNivelAlvo(null)
    }
    window.addEventListener('pointermove', mover)
    window.addEventListener('pointerup', largar)
    return () => {
      window.removeEventListener('pointermove', mover)
      window.removeEventListener('pointerup', largar)
    }
  }, [arrasto, acrescentar])

  function faixaSob(x, y) {
    for (const l of NIVEIS) {
      const el = faixaRefs.current[l.n]
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return l.n
    }
    return null
  }

  // --- desenho das ligações ------------------------------------------------
  const recalcular = useCallback(() => {
    const tela = telaRef.current
    if (!tela) { setArestas([]); return }
    const base = tela.getBoundingClientRect()
    const pos = (id) => {
      const el = cartaoRefs.current[id]
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: r.left - base.left + r.width / 2 + tela.scrollLeft, y: r.top - base.top + r.height / 2 + tela.scrollTop }
    }
    const novas = []
    for (const l of ligacoes) {
      const a = pos(l.de); const b = pos(l.para)
      if (!a || !b) continue
      const activo = !seleccionado || seleccionado === l.de || seleccionado === l.para
      novas.push({ id: `${l.de}|${l.para}`, d: caminhoOrtogonal(a.x, a.y, b.x, b.y), tipo: l.tipo, activo, diagramas: l.diagramas })
    }
    setArestas(novas)
  }, [ligacoes, seleccionado])

  useLayoutEffect(() => {
    recalcular()
    const t1 = setTimeout(recalcular, 380)
    window.addEventListener('resize', recalcular)
    const tela = telaRef.current
    tela?.addEventListener('scroll', recalcular)
    return () => {
      clearTimeout(t1)
      window.removeEventListener('resize', recalcular)
      tela?.removeEventListener('scroll', recalcular)
    }
  }, [recalcular])

  // --- paleta --------------------------------------------------------------
  const paleta = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return SERVICOS.filter((s) => {
      if (colocados.includes(s.id)) return false
      if (nivelPaleta !== 'todos' && nivelDoServico(s.id) !== nivelPaleta) return false
      if (!q) return true
      return s.nome.toLowerCase().includes(q) || s.id.includes(q) || (s.tipo ?? '').toLowerCase().includes(q)
    }).slice(0, 60)
  }, [busca, nivelPaleta, colocados])

  function aplicarTemplate(tpl) {
    setColocados(tpl.servicos.filter((id) => SERVICOS_POR_ID[id]))
    setMostrarTemplates(false)
    setSeleccionado(null)
  }

  function exportar() {
    const dados = {
      cenario,
      servicos: colocados.map((id) => ({ id, nome: SERVICOS_POR_ID[id].nome, nivel: `L${nivelDoServico(id)}` })),
      ligacoes: ligacoes.map((l) => ({ de: l.de, para: l.para, tipo: l.tipo })),
      avisos: avisos.map((a) => ({ servico: a.servicoId, regra: a.regra, nivel: a.nivel })),
    }
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'landscape-sap.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const avisosPorServico = useMemo(() => {
    const m = {}
    for (const a of avisos) (m[a.servicoId] ??= []).push(a)
    return m
  }, [avisos])

  return (
    <div className="relative flex flex-1 gap-3 overflow-hidden">
      {/* ---------------- paleta ---------------- */}
      <aside className="vidro flex w-[236px] shrink-0 flex-col rounded-2xl p-3">
        <div className="relative mb-2">
          <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder={t('builderSearch')}
            aria-label={t('builderSearch')}
            className="w-full rounded-lg border border-white/10 bg-white/5 py-1.5 pl-8 pr-2 text-[12px] text-gray-100 placeholder:text-gray-500 focus:outline-none"
          />
        </div>

        <div className="mb-2 flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setNivelPaleta('todos')}
            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${nivelPaleta === 'todos' ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-white/10'}`}
          >
            {t('builderAll')}
          </button>
          {NIVEIS.map((l) => (
            <button
              key={l.n}
              type="button"
              onClick={() => setNivelPaleta(l.n)}
              className={`rounded px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${nivelPaleta === l.n ? 'text-white' : 'text-gray-400 hover:bg-white/10'}`}
              style={nivelPaleta === l.n ? { background: l.cor } : undefined}
            >
              {l.id}
            </button>
          ))}
        </div>

        <p className="mb-1.5 text-[10px] text-gray-500">{t('builderDragHint')}</p>

        <div className="flex-1 space-y-1 overflow-y-auto pr-1">
          {paleta.map((s) => {
            const n = nivelDoServico(s.id)
            const nivel = NIVEIS[n]
            const Icone = obterIcone(s.tipo)
            return (
              <div
                key={s.id}
                role="button"
                tabIndex={0}
                onPointerDown={(e) => iniciarArrasto(e, s.id)}
                onDoubleClick={() => acrescentar(s.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); acrescentar(s.id) } }}
                className="group flex cursor-grab touch-none items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-1.5 transition-colors hover:bg-white/10 active:cursor-grabbing"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded" style={{ background: `${nivel.cor}28`, color: nivel.cor }}>
                  <Icone size={12} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-medium text-gray-100">{tServico(s.id, 'nome') ?? s.nome}</span>
                  <span className="block text-[9px] text-gray-500">{nivel.id} · {s.tipo}</span>
                </span>
                <button
                  type="button"
                  onClick={() => acrescentar(s.id)}
                  aria-label={`${t('builderAdd')} ${s.nome}`}
                  className="shrink-0 rounded p-0.5 text-gray-500 opacity-0 transition-opacity hover:text-gray-200 group-hover:opacity-100"
                >
                  <Plus size={13} aria-hidden="true" />
                </button>
              </div>
            )
          })}
          {paleta.length === 0 && <p className="p-3 text-[11px] text-gray-500">{t('builderPaletteEmpty')}</p>}
        </div>
      </aside>

      {/* ---------------- tela ---------------- */}
      <div className="relative flex min-w-0 flex-1 flex-col gap-2">
        <div className="vidro flex flex-wrap items-center gap-2 rounded-xl px-3 py-2">
          <span className="text-[12px] font-semibold text-gray-100">{t('builderTitle')}</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-300">
            {colocados.length} {t('builderPieces')} · {ligacoes.length} {t('builderLinks')} · {cob.preenchidos}/11 {t('builderLayers')}
          </span>
          <div className="ml-auto flex gap-1.5">
            <button type="button" onClick={() => setMostrarTemplates((v) => !v)} className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-medium text-gray-200 hover:bg-white/20">
              <LayoutTemplate size={13} aria-hidden="true" /> {t('builderTemplates')}
            </button>
            <button type="button" onClick={exportar} className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-medium text-gray-200 hover:bg-white/20">
              <Download size={13} aria-hidden="true" /> {t('builderExport')}
            </button>
            <button type="button" onClick={() => { setColocados([]); setSeleccionado(null) }} className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-medium text-gray-200 hover:bg-white/20">
              <Trash2 size={13} aria-hidden="true" /> {t('builderClear')}
            </button>
          </div>
        </div>

        {/* superfície clara, a citar o grafismo dos diagramas do Architecture Center */}
        <div ref={telaRef} className="relative flex-1 overflow-auto rounded-2xl bg-slate-50 p-3">
          <svg className="pointer-events-none absolute left-0 top-0 overflow-visible" style={{ width: 1, height: 1 }} aria-hidden="true">
            {arestas.map((a) => (
              <path
                key={a.id}
                d={a.d}
                fill="none"
                stroke={a.activo ? '#0070f2' : '#cbd5e1'}
                strokeWidth={a.activo ? 1.8 : 1.2}
                strokeDasharray={TRACO[a.tipo]}
                opacity={a.activo ? 1 : 0.5}
              />
            ))}
          </svg>

          <div className="relative flex flex-col gap-2">
            {NIVEIS_TOPO_A_BASE.map((l) => {
              const doNivel = colocados.filter((id) => nivelDoServico(id) === l.n)
              const aReceber = arrasto && nivelAlvo === l.n
              const correcto = arrasto && nivelDoServico(arrasto.id) === l.n
              const aRecusar = recusado?.nivel === l.n
              return (
                <motion.section
                  key={l.n}
                  ref={(el) => { faixaRefs.current[l.n] = el }}
                  animate={aRecusar ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-lg border-l-4 px-2.5 py-2 transition-colors"
                  style={{
                    borderLeftColor: l.cor,
                    background: aReceber ? (correcto ? `${l.cor}1f` : '#fee2e2') : '#ffffff',
                    boxShadow: aReceber ? `0 0 0 2px ${correcto ? l.cor : '#ef4444'}` : '0 1px 2px rgba(15,23,42,0.06)',
                    minHeight: 62,
                  }}
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: l.cor }}>{l.id}</span>
                    <span className="text-[11px] font-semibold text-slate-700">{l.nome[idioma] ?? l.nome.pt}</span>
                    {aReceber && !correcto && (
                      <span className="text-[10px] font-semibold text-red-600">{t('builderWrongLayer')} L{nivelDoServico(arrasto.id)}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence mode="popLayout">
                      {doNivel.map((id) => {
                        const s = SERVICOS_POR_ID[id]
                        const Icone = obterIcone(s.tipo)
                        const meusAvisos = avisosPorServico[id] ?? []
                        const temErro = meusAvisos.some((a) => a.nivel === 'erro')
                        const temAviso = meusAvisos.some((a) => a.nivel === 'aviso')
                        const sel = seleccionado === id
                        return (
                          <motion.div
                            key={id}
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: -8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                            ref={(el) => { cartaoRefs.current[id] = el }}
                            onClick={() => setSeleccionado(sel ? null : id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter') setSeleccionado(sel ? null : id) }}
                            className="group relative w-[148px] cursor-pointer rounded-lg bg-white p-2 transition-shadow"
                            style={{
                              border: `1.5px solid ${temErro ? '#ef4444' : temAviso ? '#f59e0b' : sel ? '#0070f2' : '#cbd5e1'}`,
                              boxShadow: sel ? '0 0 0 2px rgba(0,112,242,0.35)' : undefined,
                            }}
                          >
                            <div className="flex items-start gap-1.5">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded" style={{ background: `${l.cor}22`, color: l.cor }}>
                                <Icone size={12} aria-hidden="true" />
                              </span>
                              <span className="min-w-0 flex-1 text-[10.5px] font-semibold leading-tight text-slate-800">
                                {tServico(id, 'nome') ?? s.nome}
                              </span>
                            </div>
                            <span className="mt-1 block truncate text-[9px] text-slate-500">{s.tipo}</span>
                            {temErro && <CircleAlert size={12} className="absolute -right-1.5 -top-1.5 rounded-full bg-white text-red-500" aria-hidden="true" />}
                            {!temErro && temAviso && <AlertTriangle size={12} className="absolute -right-1.5 -top-1.5 rounded-full bg-white text-amber-500" aria-hidden="true" />}
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); remover(id) }}
                              aria-label={`${t('builderRemove')} ${s.nome}`}
                              className="absolute -left-1.5 -top-1.5 rounded-full bg-white p-0.5 text-slate-400 opacity-0 shadow transition-opacity hover:text-red-500 group-hover:opacity-100"
                            >
                              <X size={11} aria-hidden="true" />
                            </button>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                    {doNivel.length === 0 && !aReceber && (
                      <span className="self-center text-[10px] italic text-slate-300">{t('builderEmptyLayer')}</span>
                    )}
                  </div>
                </motion.section>
              )
            })}
          </div>
        </div>
      </div>

      {/* ---------------- painel direito ---------------- */}
      <aside className="vidro flex w-[248px] shrink-0 flex-col gap-3 overflow-y-auto rounded-2xl p-3">
        <div>
          <h3 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-gray-400">
            <Sparkles size={12} aria-hidden="true" /> {t('builderSuggestions')}
          </h3>
          <p className="mb-2 text-[10px] leading-snug text-gray-500">{t('builderSuggestionsHint')}</p>
          <div className="space-y-1">
            {sugestoes.map((sg) => {
              const s = SERVICOS_POR_ID[sg.id]
              const nivel = NIVEIS[nivelDoServico(sg.id)]
              return (
                <button
                  key={sg.id}
                  type="button"
                  onClick={() => acrescentar(sg.id)}
                  className="flex w-full items-center gap-2 rounded-lg border border-dashed border-white/15 bg-white/5 p-1.5 text-left transition-colors hover:border-sky-400/50 hover:bg-white/10"
                >
                  <span className="rounded px-1 py-0.5 text-[9px] font-bold text-white" style={{ background: nivel.cor }}>{nivel.id}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] font-medium text-gray-100">{tServico(sg.id, 'nome') ?? s.nome}</span>
                    {sg.diagramas > 0 && (
                      <span className="block text-[9px] text-sky-300">{sg.diagramas} {t('builderInDiagrams')}</span>
                    )}
                  </span>
                  <Plus size={12} className="shrink-0 text-gray-400" aria-hidden="true" />
                </button>
              )
            })}
            {sugestoes.length === 0 && <p className="text-[11px] text-gray-500">{t('builderNoSuggestions')}</p>}
          </div>
        </div>

        <div>
          <h3 className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-gray-400">{t('builderChecks')}</h3>
          <div className="space-y-1">
            {avisos.length === 0 && (
              <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-2 text-[11px] text-emerald-300">{t('builderAllGood')}</p>
            )}
            {avisos.map((a, i) => {
              const s = SERVICOS_POR_ID[a.servicoId]
              const Icone = a.nivel === 'erro' ? CircleAlert : a.nivel === 'aviso' ? AlertTriangle : Info
              const cor = a.nivel === 'erro' ? 'text-red-300 border-red-400/30 bg-red-400/10' : a.nivel === 'aviso' ? 'text-amber-300 border-amber-400/30 bg-amber-400/10' : 'text-sky-300 border-sky-400/30 bg-sky-400/10'
              return (
                <button
                  key={`${a.servicoId}-${a.regra}-${i}`}
                  type="button"
                  onClick={() => setSeleccionado(a.servicoId)}
                  className={`flex w-full items-start gap-1.5 rounded-lg border p-1.5 text-left text-[10.5px] leading-snug ${cor}`}
                >
                  <Icone size={12} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span><b>{tServico(a.servicoId, 'nome') ?? s.nome}</b> {a.mensagem[idioma] ?? a.mensagem.pt}</span>
                </button>
              )
            })}
          </div>
        </div>

        {seleccionado && (
          <div>
            <h3 className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-gray-400">{t('builderConnections')}</h3>
            <div className="space-y-1">
              {ligacoes.filter((l) => l.de === seleccionado || l.para === seleccionado).map((l) => {
                const outro = l.de === seleccionado ? l.para : l.de
                return (
                  <div key={`${l.de}|${l.para}`} className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-[10.5px]">
                    <span className="block font-medium text-gray-100">{tServico(outro, 'nome') ?? SERVICOS_POR_ID[outro].nome}</span>
                    <span className="block text-[9px] text-gray-400">{l.label}</span>
                    {l.diagramas > 0 && <span className="block text-[9px] text-sky-300">{l.diagramas} {t('builderInDiagrams')}</span>}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </aside>

      {/* ---------------- templates ---------------- */}
      <AnimatePresence>
        {mostrarTemplates && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMostrarTemplates(false)} className="fixed inset-0 z-40 bg-black/60" aria-hidden="true" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              role="dialog" aria-modal="true" aria-label={t('builderTemplates')}
              className="vidro fixed left-1/2 top-1/2 z-50 max-h-[72vh] w-[min(760px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[14px] font-bold text-gray-100">{t('builderTemplates')}</h2>
                  <p className="text-[11px] text-gray-400">{t('builderTemplatesHint')}</p>
                </div>
                <button type="button" onClick={() => setMostrarTemplates(false)} aria-label={t('closeDrawer')} className="rounded p-1 text-gray-400 hover:text-gray-200"><X size={16} aria-hidden="true" /></button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => aplicarTemplate(tpl)}
                    className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-left transition-colors hover:border-sky-400/40 hover:bg-white/10"
                  >
                    <span className="block text-[12px] font-semibold text-gray-100">{tpl.titulo}</span>
                    <span className="mt-0.5 block text-[10px] leading-snug text-gray-400 line-clamp-2">{tpl.descricao}</span>
                    <span className="mt-1 block text-[9.5px] text-sky-300">{tpl.servicos.length} {t('builderPieces')}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ---------------- fantasma do arrasto ---------------- */}
      {arrasto && (
        <div
          className="pointer-events-none fixed z-[60] w-[148px] rounded-lg border-2 bg-white p-2 shadow-xl"
          style={{
            left: arrasto.x - 74, top: arrasto.y - 24,
            borderColor: nivelAlvo === null ? '#cbd5e1' : nivelAlvo === nivelDoServico(arrasto.id) ? NIVEIS[nivelDoServico(arrasto.id)].cor : '#ef4444',
          }}
        >
          <span className="block text-[10.5px] font-semibold leading-tight text-slate-800">
            {tServico(arrasto.id, 'nome') ?? SERVICOS_POR_ID[arrasto.id].nome}
          </span>
          <span className="mt-0.5 block text-[9px] font-bold" style={{ color: NIVEIS[nivelDoServico(arrasto.id)].cor }}>
            {NIVEIS[nivelDoServico(arrasto.id)].id}
          </span>
        </div>
      )}
    </div>
  )
}
