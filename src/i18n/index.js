import { useCallback, useEffect, useState } from 'react'
import pt from './pt.js'
import en from './en.js'
import fr from './fr.js'
import de from './de.js'
import es from './es.js'

export const IDIOMAS = { pt, en, fr, de, es }
export const ORDEM_IDIOMAS = ['pt', 'en', 'fr', 'de', 'es']
const CHAVE_LOCALSTORAGE = 'sap-map-lang'

function lerIdiomaGuardado() {
  if (typeof window === 'undefined') return 'pt'
  const guardado = window.localStorage.getItem(CHAVE_LOCALSTORAGE)
  return IDIOMAS[guardado] ? guardado : 'pt'
}

function obterEmProfundidade(obj, caminho) {
  return caminho.split('.').reduce((acc, chave) => (acc && acc[chave] !== undefined ? acc[chave] : undefined), obj)
}

// Hook de idioma: não remonta o layout ao mudar (é só estado React), guarda
// em localStorage, e t()/getServico() fazem sempre fallback para PT-PT com
// aviso na consola em vez de devolver string vazia.
export function useIdioma() {
  const [idioma, setIdiomaState] = useState(lerIdiomaGuardado)

  useEffect(() => {
    document.documentElement.lang = idioma === 'pt' ? 'pt-PT' : IDIOMAS[idioma].meta.code
  }, [idioma])

  const mudarIdioma = useCallback((novo) => {
    if (!IDIOMAS[novo]) return
    setIdiomaState(novo)
    window.localStorage.setItem(CHAVE_LOCALSTORAGE, novo)
  }, [])

  const t = useCallback((caminho) => {
    const dicionario = IDIOMAS[idioma]
    const valor = obterEmProfundidade(dicionario.ui, caminho)
    if (valor !== undefined) return valor
    const valorPT = obterEmProfundidade(pt.ui, caminho)
    if (valorPT !== undefined) {
      console.warn(`[i18n] chave 'ui.${caminho}' em falta para '${idioma}', a usar fallback PT-PT`)
      return valorPT
    }
    console.warn(`[i18n] chave 'ui.${caminho}' em falta em todos os idiomas`)
    return caminho
  }, [idioma])

  const tCamada = useCallback((camadaId) => {
    return IDIOMAS[idioma].layers[camadaId] ?? pt.layers[camadaId] ?? camadaId
  }, [idioma])

  const tPreset = useCallback((presetId) => {
    return IDIOMAS[idioma].presets[presetId] ?? pt.presets[presetId]
  }, [idioma])

  // Conteúdo de um serviço (nome/oQueFaz/...) no idioma activo, com
  // fallback campo-a-campo para PT-PT (nunca string vazia).
  const tServico = useCallback((servicoId, campo, cenario) => {
    const bloco = IDIOMAS[idioma].services[servicoId]
    const blocoPT = pt.services[servicoId]
    let valor = bloco ? (campo === 'nesteCenario' ? bloco.nesteCenario?.[cenario] : bloco[campo]) : undefined
    if (valor === undefined) {
      valor = campo === 'nesteCenario' ? blocoPT?.nesteCenario?.[cenario] : blocoPT?.[campo]
      if (idioma !== 'pt' && valor !== undefined) {
        console.warn(`[i18n] services.${servicoId}.${campo} em falta para '${idioma}', a usar fallback PT-PT`)
      }
    }
    return valor
  }, [idioma])

  return { idioma, mudarIdioma, t, tCamada, tPreset, tServico }
}
