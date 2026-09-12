import { LAYERS, LABELS_TIPO_LIGACAO } from '../data.js'

const TRACOS_SVG = {
  nativa: null,
  extensao: '6,4',
  rede: '2,3',
  governa: '7,3,1,3',
}

export default function Legend({ t, tCamada }) {
  const ESTADOS = [
    { id: 'activo', nome: t('stateActive'), amostra: { opacity: 1, dashed: false } },
    { id: 'recomendado', nome: `${t('stateRecommended')} ★`, amostra: { opacity: 0.9, dashed: false } },
    { id: 'opcional', nome: t('stateOptional'), amostra: { opacity: 0.55, dashed: false } },
    { id: 'legado', nome: t('stateLegacy'), amostra: { opacity: 0.35, dashed: true } },
    { id: 'irrelevante', nome: t('stateIrrelevant'), amostra: { opacity: 0.22, dashed: false } },
  ]
  const LABELS_EDGE = {
    nativa: t('edgeNative'),
    extensao: t('edgeCleanCore'),
    rede: t('edgeNetwork'),
    governa: t('edgeGov'),
  }

  return (
    <div className="vidro flex flex-wrap gap-x-6 gap-y-3 rounded-2xl p-3 text-[11px] text-gray-300">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {LAYERS.map((l) => (
          <span key={l.id} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.corVar }} aria-hidden="true" />
            {tCamada(l.id)}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-l border-white/10 pl-4">
        {Object.keys(LABELS_TIPO_LIGACAO).map((tipo) => (
          <span key={tipo} className="flex items-center gap-1.5">
            <svg width="20" height="8" aria-hidden="true">
              <line x1="0" y1="4" x2="20" y2="4" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray={TRACOS_SVG[tipo]} />
            </svg>
            {LABELS_EDGE[tipo]}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-l border-white/10 pl-4">
        {ESTADOS.map((e) => (
          <span key={e.id} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full border border-gray-400"
              style={{ opacity: e.amostra.opacity, borderStyle: e.amostra.dashed ? 'dashed' : 'solid' }}
              aria-hidden="true"
            />
            {e.nome}
          </span>
        ))}
      </div>
    </div>
  )
}
