import { useEffect, useState } from 'react'

export default function useWindowWidth() {
  const [largura, setLargura] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280)

  useEffect(() => {
    const aoRedimensionar = () => setLargura(window.innerWidth)
    window.addEventListener('resize', aoRedimensionar)
    return () => window.removeEventListener('resize', aoRedimensionar)
  }, [])

  return largura
}
