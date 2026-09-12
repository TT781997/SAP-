import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { obterIcone } from '../icons.js'

// Nenhum estado esconde o card (ver obterEstado() em data.js) — só muda
// opacidade/saturação. 'legado' é tracejado + cinza para leitura imediata
// de "isto está de saída".
const ESTILO_POR_ESTADO = {
  activo: { opacity: 1, saturate: 1, hoverRico: true },
  recomendado: { opacity: 0.9, saturate: 1, hoverRico: true },
  opcional: { opacity: 0.55, saturate: 0.6, hoverRico: false },
  legado: { opacity: 0.35, saturate: 0, hoverRico: false },
  irrelevante: { opacity: 0.22, saturate: 0, hoverRico: false },
}

const ServiceCard = forwardRef(function ServiceCard(
  { servico, nome, tipo, oQueFaz, estado, corCamada, destaqueBusca, destaquePerfil, aberto, labelEstado, onAbrir, onMouseEnter, onMouseLeave },
  ref,
) {
  const { opacity, saturate, hoverRico } = ESTILO_POR_ESTADO[estado]
  const Icone = obterIcone(servico.tipo)
  const cor = servico.corAcento || corCamada

  return (
    <motion.button
      ref={ref}
      type="button"
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      whileHover={hoverRico ? { y: -3, scale: 1.02 } : { y: -1 }}
      onClick={() => onAbrir(servico.id)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={onMouseLeave}
      aria-label={`Abrir detalhes de ${nome} — estado ${labelEstado}`}
      aria-pressed={aberto}
      data-servico-id={servico.id}
      className="vidro group relative flex w-[156px] min-h-[92px] shrink-0 flex-col gap-1.5 rounded-2xl p-2.5 text-left transition-shadow"
      style={{
        filter: saturate === 0 ? 'grayscale(1)' : saturate < 1 ? `grayscale(${1 - saturate})` : 'none',
        borderStyle: estado === 'legado' ? 'dashed' : 'solid',
        borderColor: estado === 'activo' || estado === 'recomendado' ? `color-mix(in srgb, ${cor} 55%, transparent)` : undefined,
        boxShadow: aberto ? `0 0 0 2px ${cor}` : undefined,
      }}
    >
      {hoverRico && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ boxShadow: `0 0 20px 2px color-mix(in srgb, ${cor} 30%, transparent)` }}
        />
      )}

      {destaqueBusca && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-yellow-300" />
      )}
      {destaquePerfil && (
        <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-2xl ring-2 ring-amber-400/80" />
      )}

      <div className="flex items-start justify-between gap-1.5">
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{ background: `color-mix(in srgb, ${cor} 16%, transparent)`, color: cor }}
        >
          <Icone size={15} strokeWidth={2} aria-hidden="true" />
        </div>
        {estado === 'recomendado' && <span aria-hidden="true" className="text-amber-400">★</span>}
      </div>

      <p className="line-clamp-2 break-words text-[12px] font-semibold leading-snug text-gray-100" style={{ hyphens: 'auto' }}>
        {nome}
      </p>
      <span className="w-fit rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] leading-tight text-gray-300">
        {tipo}
      </span>

      {hoverRico && (
        <p className="line-clamp-2 text-[10px] leading-snug text-gray-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          {oQueFaz}
        </p>
      )}
    </motion.button>
  )
})

export default ServiceCard
