import { useCallback, useState } from 'react'

const PASSO = 0.1
const MIN = 0.6
const MAX = 1.4

export default function useZoom() {
  const [zoom, setZoom] = useState(1)
  const aumentar = useCallback(() => setZoom((z) => Math.min(MAX, +(z + PASSO).toFixed(2))), [])
  const diminuir = useCallback(() => setZoom((z) => Math.max(MIN, +(z - PASSO).toFixed(2))), [])
  const repor = useCallback(() => setZoom(1), [])
  return { zoom, aumentar, diminuir, repor }
}
