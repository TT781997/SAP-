import { useState } from 'react'
import { Info, X } from 'lucide-react'
import { LAYERS, LABELS_TIPO_LIGACAO } from '../data.js'

const TRACO_AMOSTRA = { nativa: 'none', extensao: '6 4', rede: '2 4' }

export default function Legend() {
  const [aberta, setAberta] = useState(false)

  if (!aberta) {
    return (
      <button
        type="button"
        onClick={() => setAberta(true)}
        aria-label="Abrir legenda do mapa"
        className="vidro fixed bottom-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition-colors hover:text-gray-100"
      >
        <Info size={17} aria-hidden="true" />
      </button>
    )
  }

  return (
    <div role="dialog" aria-label="Legenda do mapa" className="vidro fixed bottom-4 left-4 z-20 w-64 rounded-2xl p-4 text-xs text-gray-300">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold text-gray-100">Legenda</p>
        <button
          type="button"
          onClick={() => setAberta(false)}
          aria-label="Fechar legenda"
          className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-gray-100"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-gray-500">Camadas</p>
      <ul className="mb-4 space-y-1">
        {LAYERS.map((l) => (
          <li key={l.id} className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: l.corVar }} aria-hidden="true" />
            {l.nome}
          </li>
        ))}
      </ul>

      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-gray-500">Ligações</p>
      <ul className="space-y-1.5">
        {Object.entries(LABELS_TIPO_LIGACAO).map(([tipo, label]) => (
          <li key={tipo} className="flex items-center gap-2">
            <svg width="26" height="8" aria-hidden="true" className="shrink-0">
              <line x1="0" y1="4" x2="26" y2="4" stroke="#94a3b8" strokeWidth="1.75" strokeDasharray={TRACO_AMOSTRA[tipo]} />
            </svg>
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
