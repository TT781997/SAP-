import { useState, useEffect } from 'react'

// Fonte única da largura da janela: DiagramCanvas usa-a para recalcular as
// ligações SVG, o App/ServiceDrawer usam-na só para o breakpoint de stack.
export default function useWindowWidth() {
  const [largura, setLargura] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280)

  useEffect(() => {
    function aoRedimensionar() {
      setLargura(window.innerWidth)
    }
    window.addEventListener('resize', aoRedimensionar)
    return () => window.removeEventListener('resize', aoRedimensionar)
  }, [])

  return largura
}
