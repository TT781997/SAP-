import { Search, Layers, History } from 'lucide-react'
import { SCENARIOS, ORDEM_CENARIOS, HYPERSCALER_IDS } from '../data.js'

const NOME_HYPERSCALER = { aws: 'AWS', azure: 'Azure', gcp: 'GCP' }

export default function Header({
  cenario,
  onMudarCenario,
  hyperscaler,
  onMudarHyperscaler,
  mostrarLegado,
  onAlternarLegado,
  searchQuery,
  onMudarSearch,
}) {
  const scenarioAtual = SCENARIOS[cenario]
  const hyperscalerDesabilitado = cenario === 'onprem'

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-[#070b14]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/25 to-emerald-500/20 text-sky-300"
            >
              <Layers size={18} />
            </span>
            <div>
              <h1 className="text-base font-semibold leading-tight text-gray-50 md:text-lg">Mapa do Ecossistema SAP</h1>
              <p className="text-xs leading-snug text-gray-400">{scenarioAtual.chip}</p>
            </div>
          </div>

          <label className="relative flex items-center">
            <Search size={15} className="pointer-events-none absolute left-3 text-gray-500" aria-hidden="true" />
            <span className="sr-only">Pesquisar serviço por nome</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onMudarSearch(e.target.value)}
              placeholder="Pesquisar serviço…"
              className="w-40 rounded-full border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-gray-100 placeholder:text-gray-500 transition-all focus:w-56 focus:border-sky-400/50 focus:outline-none sm:w-52 sm:focus:w-64"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Escolher cenário" className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {ORDEM_CENARIOS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => onMudarCenario(id)}
                aria-pressed={cenario === id}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  cenario === id ? 'bg-sky-500 text-white' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                {SCENARIOS[id].nome}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onAlternarLegado}
            aria-pressed={mostrarLegado}
            title="Mostra sistemas legados mesmo quando não fazem parte do cenário activo, para referência"
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              mostrarLegado
                ? 'border-amber-400/40 bg-amber-500/15 text-amber-300'
                : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <History size={13} aria-hidden="true" />
            Mostrar legado
          </button>

          <div
            role="group"
            aria-label="Escolher hyperscaler"
            className={`flex gap-1 rounded-full border border-white/10 bg-white/5 p-1 transition-opacity ${
              hyperscalerDesabilitado ? 'pointer-events-none opacity-40' : ''
            }`}
          >
            {HYPERSCALER_IDS.map((id) => (
              <button
                key={id}
                type="button"
                disabled={hyperscalerDesabilitado}
                onClick={() => onMudarHyperscaler(id)}
                aria-pressed={hyperscaler === id}
                className={`rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  hyperscaler === id ? 'bg-white/15 text-gray-50' : 'text-gray-400 hover:bg-white/10'
                }`}
              >
                {NOME_HYPERSCALER[id]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
