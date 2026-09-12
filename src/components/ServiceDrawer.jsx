import { motion } from 'framer-motion'
import { X, ArrowLeft } from 'lucide-react'
import { SERVICOS_POR_ID, LAYERS, obterEstado } from '../data.js'
import { obterIcone } from '../icons.js'

// paraQueServe mistura, no mesmo parágrafo, "para que serve" e "como se
// mistura" (ex.: "...Mistura típica: X + Y + Z."). Separa as frases pela
// palavra "mistura" para preencher as duas secções exigidas sem inventar
// texto novo; nos casos sem essa palavra, mostra o parágrafo inteiro nas
// duas secções.
function dividirParaQueServe(texto) {
  const frases = texto.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ú])/)
  const comMistura = frases.filter((f) => /mistura|mix|mezcla|melange|mischt/i.test(f))
  const semMistura = frases.filter((f) => !/mistura|mix|mezcla|melange|mischt/i.test(f))
  if (comMistura.length === 0) return { paraQueUsado: texto, comoMistura: texto }
  return {
    paraQueUsado: semMistura.join(' ') || texto,
    comoMistura: comMistura.join(' '),
  }
}

export default function ServiceDrawer({ servicoId, cenario, temHistorico, onFechar, onVoltar, onAbrirRelacionado, isStack, t, tCamada, tServico }) {
  const servico = SERVICOS_POR_ID[servicoId]
  const layer = LAYERS.find((l) => l.id === servico.camada)
  const estado = obterEstado(servicoId, { cenario, mostrarLegado: true, perfisActivos: [] })
  const Icone = obterIcone(servico.tipo)

  const nome = tServico(servicoId, 'nome') ?? servico.nome
  const oQueFaz = tServico(servicoId, 'oQueFaz') ?? servico.oQueFaz
  const paraQueServe = tServico(servicoId, 'paraQueServe') ?? servico.paraQueServe
  const exemploReal = tServico(servicoId, 'exemploReal') ?? servico.exemploReal
  const naoConfundir = tServico(servicoId, 'naoConfundir') ?? servico.naoConfundir
  const { paraQueUsado, comoMistura } = dividirParaQueServe(paraQueServe)

  const NOME_ESTADO = {
    activo: t('stateActive'), recomendado: t('stateRecommended'), opcional: t('stateOptional'),
    legado: t('stateLegacy'), irrelevante: t('stateIrrelevant'),
  }

  const variantesPainel = isStack
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
    : { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onFechar}
        className="fixed inset-0 z-30 bg-black/50"
        aria-hidden="true"
      />
      <motion.div
        {...variantesPainel}
        transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
        role="dialog"
        aria-modal="true"
        aria-label={nome}
        className={
          isStack
            ? 'vidro fixed inset-x-0 bottom-0 z-40 flex max-h-[70vh] flex-col rounded-t-2xl'
            : 'vidro fixed inset-y-0 right-0 z-40 flex w-full max-w-[440px] flex-col'
        }
      >
        {/* 1. Nome do Serviço */}
        <div className="flex items-center gap-2 border-b border-white/10 p-4">
          {temHistorico && (
            <button type="button" onClick={onVoltar} aria-label={t('back')} className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-gray-200">
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
          )}
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ background: `color-mix(in srgb, ${servico.corAcento || layer.corVar} 18%, transparent)`, color: servico.corAcento || layer.corVar }}
          >
            <Icone size={18} aria-hidden="true" />
          </div>
          <h2 className="flex-1 text-[15px] font-bold text-gray-100">{nome}</h2>
          <button type="button" onClick={onFechar} aria-label={t('closeDrawer')} className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-gray-200">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 text-[13px] leading-relaxed text-gray-300">
          {/* 2. Camada + Tipo + Estados neste cenário */}
          <div className="mb-4 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px]" style={{ color: layer.corVar }}>{tCamada(servico.camada)}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-gray-300">{servico.tipo}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-gray-300">{t('drawerScenario')}: {NOME_ESTADO[estado]}</span>
          </div>

          {/* 3. O que faz */}
          <Seccao titulo={t('drawerWhat')}>{oQueFaz}</Seccao>
          {/* 4. Para que é usado */}
          <Seccao titulo={t('drawerUsedFor')}>{paraQueUsado}</Seccao>
          {/* 5. Como se mistura */}
          <Seccao titulo={t('drawerMix')}>{comoMistura}</Seccao>
          {/* 6. Exemplo Real */}
          <Seccao titulo={t('drawerExample')}>{exemploReal}</Seccao>

          {/* 7. Relaciona-se com */}
          <Seccao titulo={t('drawerRelated')}>
            <div className="flex flex-wrap gap-1.5">
              {servico.ligaA.map((id) => {
                const alvo = SERVICOS_POR_ID[id]
                if (!alvo) return null
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onAbrirRelacionado(id)}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-200 transition-colors hover:bg-white/10"
                  >
                    {tServico(id, 'nome') ?? alvo.nome}
                  </button>
                )
              })}
            </div>
          </Seccao>

          {/* 8. Não confundir com (condicional) */}
          {naoConfundir && <Seccao titulo={t('drawerDontConfuse')}>{naoConfundir}</Seccao>}

          {/* 9. Satélites no índice Help (condicional) */}
          {servico.satelitesHelp && (
            <Seccao titulo={t('drawerSatellites')}>
              <ul className="list-inside list-disc space-y-0.5">
                {servico.satelitesHelp.split(';').map((item) => (
                  <li key={item}>{item.trim()}</li>
                ))}
              </ul>
            </Seccao>
          )}
        </div>

        {/* 10. Rodapé fixo */}
        <div className="border-t border-white/10 p-3 text-center text-[11px] text-gray-500">
          {t('drawerFeatures')}
        </div>
      </motion.div>
    </>
  )
}

function Seccao({ titulo, children }) {
  return (
    <div className="mb-4">
      <h3 className="mb-1 text-[11px] font-bold uppercase tracking-wide text-gray-500">{titulo}</h3>
      <div className="text-gray-300">{children}</div>
    </div>
  )
}
