import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { SERVICOS_POR_ID, LAYERS, SCENARIOS } from '../data.js'

function Seccao({ titulo, children }) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">{titulo}</p>
      <div className="text-sm leading-relaxed text-gray-200">{children}</div>
    </div>
  )
}

export default function ServiceDrawer({ servicoId, cenario, onFechar, onAbrirServico, isStack }) {
  const fecharBtnRef = useRef(null)
  const painelRef = useRef(null)
  const servico = servicoId ? SERVICOS_POR_ID[servicoId] : null

  useEffect(() => {
    if (servico) fecharBtnRef.current?.focus()
  }, [servico])

  useEffect(() => {
    function aoTeclar(e) {
      if (e.key === 'Escape') {
        onFechar()
        return
      }
      if (e.key === 'Tab' && painelRef.current) {
        const focaveis = painelRef.current.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')
        if (focaveis.length === 0) return
        const primeiro = focaveis[0]
        const ultimo = focaveis[focaveis.length - 1]
        if (e.shiftKey && document.activeElement === primeiro) {
          e.preventDefault()
          ultimo.focus()
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault()
          primeiro.focus()
        }
      }
    }
    if (servico) document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  }, [servico, onFechar])

  const camada = servico ? LAYERS.find((l) => l.id === servico.camada) : null
  const cenariosAtivos = servico ? servico.cenarios.map((c) => SCENARIOS[c].nome) : []

  return (
    <AnimatePresence>
      {servico && (
        <>
          <motion.div
            key="fundo-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onFechar}
            aria-hidden="true"
            className="fixed inset-0 z-30 bg-black/55 backdrop-blur-sm"
          />
          <motion.aside
            key="painel-drawer"
            ref={painelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-titulo"
            initial={isStack ? { y: '100%' } : { x: '100%' }}
            animate={isStack ? { y: 0 } : { x: 0 }}
            exit={isStack ? { y: '100%' } : { x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="vidro fixed right-0 top-0 z-40 flex h-full w-full flex-col gap-5 overflow-y-auto p-6 lg:w-[400px] max-lg:top-auto max-lg:bottom-0 max-lg:h-auto max-lg:max-h-[85vh] max-lg:rounded-t-3xl"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="drawer-titulo" className="text-lg font-semibold leading-snug text-gray-50">
                {servico.nome}
              </h2>
              <button
                ref={fecharBtnRef}
                type="button"
                onClick={onFechar}
                aria-label="Fechar painel de detalhes"
                className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-gray-100"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <Seccao titulo="Camada · Tipo · Cenários em que está activo">
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{ background: `color-mix(in srgb, ${camada.corVar} 15%, transparent)`, color: camada.corVar }}
                >
                  {camada.nome}
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-gray-300">{servico.tipo}</span>
                {cenariosAtivos.map((c) => (
                  <span key={c} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-400">
                    {c}
                  </span>
                ))}
              </div>
            </Seccao>

            <Seccao titulo="O que faz">{servico.oQueFaz}</Seccao>
            <Seccao titulo="Para que é usado">{servico.paraQueServe}</Seccao>
            <Seccao titulo="Exemplo Real">{servico.exemploReal}</Seccao>

            <Seccao titulo="Relaciona-se com">
              <div className="flex flex-wrap gap-2">
                {servico.ligaA.map((id) => {
                  const outro = SERVICOS_POR_ID[id]
                  if (!outro) return null
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onAbrirServico(id)}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-200 transition-colors hover:border-white/25 hover:bg-white/10"
                    >
                      {outro.nome}
                    </button>
                  )
                })}
              </div>
            </Seccao>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Neste cenário</p>
              <p className="text-sm leading-relaxed text-gray-200">{servico.contextoPorCenario[cenario]}</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
