import { useState } from 'react'
import Header from './components/Header.jsx'
import DiagramCanvas from './components/DiagramCanvas.jsx'
import ServiceDrawer from './components/ServiceDrawer.jsx'
import Legend from './components/Legend.jsx'
import useWindowWidth from './hooks/useWindowWidth.js'

const LARGURA_STACK = 1024 // abaixo disto: diagrama em stack vertical, drawer em bottom-sheet

// Estado inicial pedido: cenário Híbrido (RISE), hyperscaler Azure, sem drawer aberto.
export default function App() {
  const [cenario, setCenario] = useState('rise')
  const [hyperscaler, setHyperscaler] = useState('azure')
  const [mostrarLegado, setMostrarLegado] = useState(false)
  const [servicoAbertoId, setServicoAbertoId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const largura = useWindowWidth()
  const isStack = largura < LARGURA_STACK

  return (
    <div className="fundo-mapa relative min-h-screen">
      <Header
        cenario={cenario}
        onMudarCenario={setCenario}
        hyperscaler={hyperscaler}
        onMudarHyperscaler={setHyperscaler}
        mostrarLegado={mostrarLegado}
        onAlternarLegado={() => setMostrarLegado((v) => !v)}
        searchQuery={searchQuery}
        onMudarSearch={setSearchQuery}
      />

      <main className="relative z-10">
        <DiagramCanvas
          cenario={cenario}
          hyperscaler={hyperscaler}
          mostrarLegado={mostrarLegado}
          searchQuery={searchQuery}
          servicoAbertoId={servicoAbertoId}
          onAbrirServico={setServicoAbertoId}
          largura={largura}
          isStack={isStack}
        />
      </main>

      <footer className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-2 text-center text-[11px] leading-relaxed text-gray-600 md:px-8">
        Conteúdo pedagógico com base em ofertas públicas SAP. Cases resumidos a partir de histórias públicas.
      </footer>

      <Legend />

      <ServiceDrawer
        servicoId={servicoAbertoId}
        cenario={cenario}
        onFechar={() => setServicoAbertoId(null)}
        onAbrirServico={setServicoAbertoId}
        isStack={isStack}
      />
    </div>
  )
}
