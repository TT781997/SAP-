import { useState, useRef, useEffect } from 'react'
import { Search, Globe } from 'lucide-react'
import { ORDEM_CENARIOS, HYPERSCALER_IDS, PERFIS, pesquisarServicos } from '../data.js'
import { ORDEM_IDIOMAS, IDIOMAS } from '../i18n/index.js'

export default function Header({
  cenario, onCenario, hyperscaler, onHyperscaler, mostrarLegado, onMostrarLegado,
  perfisActivos, onAlternarPerfil, onSeleccionarResultado, idioma, onIdioma, t, tCamada, tPreset,
  modoVista, onModoVista,
}) {
  const [query, setQuery] = useState('')
  const [aberto, setAberto] = useState(false)
  const caixaRef = useRef(null)

  useEffect(() => {
    function aoClicarFora(e) {
      if (caixaRef.current && !caixaRef.current.contains(e.target)) setAberto(false)
    }
    document.addEventListener('mousedown', aoClicarFora)
    return () => document.removeEventListener('mousedown', aoClicarFora)
  }, [])

  const resultados = query.trim() ? pesquisarServicos(query) : []

  function seleccionar(servico) {
    onSeleccionarResultado(servico.id)
    setQuery('')
    setAberto(false)
  }

  const nomePerfil = (id) => t(`profiles.${id}`)

  const subtitulo = [
    tPreset(cenario).title,
    cenario !== 'onprem' ? t(`infraSelector.${hyperscaler}`) : null,
    perfisActivos.length > 0 ? perfisActivos.map(nomePerfil).join(' + ') : null,
  ].filter(Boolean).join(' · ')

  return (
    <header className="vidro flex flex-col gap-3 rounded-2xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-gray-100">{t('title')}</h1>
          <p className="text-[12px] text-gray-400">{subtitulo}</p>
        </div>
        <label className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-[12px] text-gray-300">
          <Globe size={13} aria-hidden="true" />
          <select
            value={idioma}
            onChange={(e) => onIdioma(e.target.value)}
            aria-label={t('language')}
            className="cursor-pointer bg-transparent text-gray-100 focus:outline-none [&>option]:bg-[#0c1220]"
          >
            {ORDEM_IDIOMAS.map((id) => (
              <option key={id} value={id}>{IDIOMAS[id].meta.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1" role="group" aria-label="Mapa / Esquema / Construtor">
          {['necessidades', 'mapa', 'esquema', 'construtor'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onModoVista(id)}
              aria-pressed={modoVista === id}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${modoVista === id ? 'bg-fuchsia-500/80 text-white' : 'text-gray-300 hover:bg-white/10'}`}
            >
              {t(id === 'necessidades' ? 'viewNeeds' : id === 'mapa' ? 'viewMap' : id === 'esquema' ? 'viewSchema' : 'viewBuilder')}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1 rounded-xl border border-white/10 bg-white/5 p-1" role="group" aria-label="Preset">
          {ORDEM_CENARIOS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onCenario(id)}
              aria-pressed={cenario === id}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                cenario === id ? 'bg-sky-500/90 text-white' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {tPreset(id).title}
            </button>
          ))}
        </div>

        <div
          className={`flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1 ${cenario === 'onprem' ? 'opacity-40' : ''}`}
          role="group"
          aria-label="Hyperscaler"
        >
          {HYPERSCALER_IDS.map((id) => (
            <button
              key={id}
              type="button"
              disabled={cenario === 'onprem'}
              onClick={() => onHyperscaler(id)}
              aria-pressed={hyperscaler === id}
              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors disabled:cursor-not-allowed ${
                hyperscaler === id && cenario !== 'onprem' ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-white/10'
              }`}
            >
              {t(`infraSelector.${id}`)}
            </button>
          ))}
        </div>
      </div>

      {modoVista === 'mapa' && (<>
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-gray-300">
          <input type="checkbox" checked={mostrarLegado} onChange={(e) => onMostrarLegado(e.target.checked)} className="accent-sky-500" />
          {t('showLegacy')}
        </label>

        <div ref={caixaRef} className="relative ml-auto min-w-[220px] flex-1 sm:flex-none">
          <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setAberto(true) }}
            onFocus={() => setAberto(true)}
            onKeyDown={(e) => { if (e.key === 'Enter' && resultados[0]) seleccionar(resultados[0]) }}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchPlaceholder')}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-1.5 pl-8 pr-3 text-[12px] text-gray-100 placeholder:text-gray-500 focus:outline-none"
          />
          {aberto && query.trim() && (
            <div className="vidro absolute left-0 right-0 top-[calc(100%+4px)] z-30 max-h-72 overflow-y-auto rounded-xl p-1 text-[12px]">
              {resultados.length === 0 ? (
                <p className="p-3 text-gray-400">{t('searchEmpty')}</p>
              ) : (
                resultados.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => seleccionar(s)}
                    className="flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-1.5 text-left hover:bg-white/10"
                  >
                    <span className="font-medium text-gray-100">{s.nome}</span>
                    <span className="text-[10px] text-gray-400">{tCamada(s.camada)} · {s.tipo}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Perfil de cliente">
        {PERFIS.map((p) => {
          const activo = perfisActivos.includes(p.id)
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onAlternarPerfil(p.id)}
              aria-pressed={activo}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                activo ? 'border-amber-400/60 bg-amber-400/15 text-amber-300' : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {nomePerfil(p.id)}
            </button>
          )
        })}
      </div>
      </>)}
    </header>
  )
}
