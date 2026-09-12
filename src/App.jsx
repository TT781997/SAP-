import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header.jsx'
import DiagramCanvas from './components/DiagramCanvas.jsx'
import EsquemaView from './components/EsquemaView.jsx'
import ServiceDrawer from './components/ServiceDrawer.jsx'
import Legend from './components/Legend.jsx'
import useWindowWidth from './hooks/useWindowWidth.js'
import { useIdioma } from './i18n/index.js'

export default function App() {
  const [cenario, setCenario] = useState('rise')
  const [hyperscaler, setHyperscaler] = useState('azure')
  const [mostrarLegado, setMostrarLegado] = useState(false)
  const [perfisActivos, setPerfisActivos] = useState([])
  const [servicoAbertoId, setServicoAbertoId] = useState(null)
  const [servicoDestacadoId, setServicoDestacadoId] = useState(null)
  const [historicoDrawer, setHistoricoDrawer] = useState([])
  const [modoVista, setModoVista] = useState('mapa')
  const destaqueTimeoutRef = useRef(null)

  const { idioma, mudarIdioma, t, tCamada, tPreset, tServico } = useIdioma()
  const largura = useWindowWidth()
  const isStack = largura < 1024

  useEffect(() => () => clearTimeout(destaqueTimeoutRef.current), [])

  function alternarPerfil(id) {
    setPerfisActivos((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  function abrirServico(id) {
    setHistoricoDrawer([])
    setServicoAbertoId(id)
  }

  function abrirRelacionado(id) {
    setHistoricoDrawer((prev) => [...prev, servicoAbertoId])
    setServicoAbertoId(id)
  }

  function voltarDrawer() {
    setHistoricoDrawer((prev) => {
      const anterior = prev[prev.length - 1]
      setServicoAbertoId(anterior)
      return prev.slice(0, -1)
    })
  }

  function fecharDrawer() {
    setServicoAbertoId(null)
    setHistoricoDrawer([])
  }

  // Selecção de um resultado de busca: abre o drawer + acende o destaque no
  // canvas (scroll + anel amarelo), que se apaga sozinho ao fim de alguns segundos.
  function seleccionarResultadoBusca(id) {
    abrirServico(id)
    setServicoDestacadoId(id)
    clearTimeout(destaqueTimeoutRef.current)
    destaqueTimeoutRef.current = setTimeout(() => setServicoDestacadoId(null), 4000)
  }

  return (
    <div className="fundo-mapa flex min-h-screen flex-col gap-3 p-3 sm:p-4">
      <Header
        cenario={cenario} onCenario={setCenario}
        hyperscaler={hyperscaler} onHyperscaler={setHyperscaler}
        mostrarLegado={mostrarLegado} onMostrarLegado={setMostrarLegado}
        perfisActivos={perfisActivos} onAlternarPerfil={alternarPerfil}
        onSeleccionarResultado={seleccionarResultadoBusca}
        idioma={idioma} onIdioma={mudarIdioma}
        t={t} tCamada={tCamada} tPreset={tPreset}
        modoVista={modoVista} onModoVista={setModoVista}
      />

      {modoVista === 'mapa' ? (
        <DiagramCanvas
          cenario={cenario}
          hyperscaler={hyperscaler}
          mostrarLegado={mostrarLegado}
          perfisActivos={perfisActivos}
          servicoDestacadoId={servicoDestacadoId}
          servicoAbertoId={servicoAbertoId}
          onAbrirServico={abrirServico}
          t={t} tCamada={tCamada} tServico={tServico}
        />
      ) : (
        <EsquemaView t={t} idioma={idioma} />
      )}

      {modoVista === 'mapa' && <Legend t={t} tCamada={tCamada} />}

      <footer className="px-2 text-center text-[10px] leading-relaxed text-gray-500">
        {t('footerDisclaimer')}
      </footer>

      <AnimatePresence>
        {servicoAbertoId && (
          <ServiceDrawer
            servicoId={servicoAbertoId}
            cenario={cenario}
            temHistorico={historicoDrawer.length > 0}
            onFechar={fecharDrawer}
            onVoltar={voltarDrawer}
            onAbrirRelacionado={abrirRelacionado}
            isStack={isStack}
            t={t} tCamada={tCamada} tServico={tServico}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
