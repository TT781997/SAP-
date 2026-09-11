import { motion } from 'framer-motion'
import { ICONES } from '../icons.js'

const ESTILO_POR_ESTADO = {
  ativo: { opacity: 1, saturate: 1, hoverRico: true },
  atenuado: { opacity: 0.5, saturate: 0.55, hoverRico: false },
  legado: { opacity: 0.25, saturate: 0, hoverRico: false },
}

export default function ServiceCard({ servico, estado, corCamada, destaque, apagado, mostrarLegado, cenario, aberto, onAbrir }) {
  if (estado === 'escondido') return null

  const { opacity, saturate, hoverRico } = ESTILO_POR_ESTADO[estado]
  const Icone = ICONES[servico.icone] ?? ICONES.btp
  const opacidadeFinal = apagado ? Math.min(opacity, 0.2) : opacity
  const mostrarAnotacaoLegado = servico.anotacaoLegado && cenario === 'onprem' && mostrarLegado
  // `corCamada` chega como var(--color-layer-x) — nunca concatenar sufixo hex
  // de alpha nele (ex.: `${cor}26`); usar sempre color-mix().
  const cor = servico.corAcento || corCamada

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: opacidadeFinal, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      whileHover={hoverRico ? { y: -4, scale: 1.02 } : { y: -1 }}
      onClick={() => onAbrir(servico.id)}
      aria-label={`Abrir detalhes de ${servico.nome}`}
      aria-pressed={aberto}
      className="vidro group relative flex w-[168px] shrink-0 flex-col gap-2 rounded-2xl p-3 text-left transition-shadow"
      style={{
        filter: saturate === 0 ? 'grayscale(1)' : saturate < 1 ? `grayscale(${1 - saturate})` : 'none',
        borderStyle: estado === 'legado' ? 'dashed' : 'solid',
        borderColor: estado === 'ativo' ? `color-mix(in srgb, ${cor} 55%, transparent)` : undefined,
        boxShadow: aberto ? `0 0 0 2px ${cor}` : undefined,
      }}
    >
      {hoverRico && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ boxShadow: `0 0 24px 2px color-mix(in srgb, ${cor} 33%, transparent)` }}
        />
      )}

      {destaque && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-sky-400"
        />
      )}

      <div className="flex items-start justify-between gap-2">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `color-mix(in srgb, ${cor} 15%, transparent)`, color: cor }}
        >
          <Icone size={17} strokeWidth={2} aria-hidden="true" />
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] leading-tight text-gray-300">
          {servico.tipo}
        </span>
      </div>

      <div>
        <p className="text-[13px] font-semibold leading-snug text-gray-100">{servico.nome}</p>
        {hoverRico && (
          <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-gray-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            {servico.oQueFaz}
          </p>
        )}
      </div>

      {(servico.notaMapa || estado === 'legado' || mostrarAnotacaoLegado) && (
        <div className="flex flex-wrap gap-1">
          {servico.notaMapa && (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] font-medium text-amber-300">
              {servico.notaMapa}
            </span>
          )}
          {estado === 'legado' && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-medium text-gray-300">legado</span>
          )}
          {mostrarAnotacaoLegado && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-medium text-gray-300">
              {servico.anotacaoLegado}
            </span>
          )}
        </div>
      )}
    </motion.button>
  )
}
