import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Layers, ChevronDown } from 'lucide-react'

const ClusterTile = forwardRef(function ClusterTile({ nome, corCamada, membros, aColapsado, onAlternar }, ref) {
  return (
    <motion.button
      ref={ref}
      type="button"
      layout
      onClick={onAlternar}
      aria-expanded={!aColapsado}
      aria-label={`${aColapsado ? 'Expandir' : 'Colapsar'} cluster ${nome} (${membros.length} serviços)`}
      className="vidro flex w-[152px] shrink-0 flex-col items-start gap-1.5 rounded-2xl border-dashed p-2.5 text-left transition-colors hover:bg-white/[0.08]"
      style={{ borderColor: `color-mix(in srgb, ${corCamada} 45%, transparent)` }}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{ background: `color-mix(in srgb, ${corCamada} 16%, transparent)`, color: corCamada }}
        >
          <Layers size={15} strokeWidth={2} aria-hidden="true" />
        </div>
        <motion.span animate={{ rotate: aColapsado ? 0 : 180 }} className="text-gray-400">
          <ChevronDown size={14} aria-hidden="true" />
        </motion.span>
      </div>
      <p className="text-[12px] font-semibold leading-snug text-gray-100">{nome}</p>
      <span className="text-[10px] text-gray-400">{membros.length} serviços · clique para {aColapsado ? 'expandir' : 'colapsar'}</span>
    </motion.button>
  )
})

export default ClusterTile
