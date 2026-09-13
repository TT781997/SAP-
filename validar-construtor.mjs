// Validação do Construtor contra o motor actual (src/builder/*).
import { SERVICOS, SERVICOS_POR_ID } from './src/data.js'
import { NIVEIS, nivelDoServico } from './src/builder/layers.js'
import { podeLigar, ligacoesEntre, validar, sugerir, cobertura, TEMPLATES } from './src/builder/engine.js'
import mined from './src/builder/mined.js'

let erros = 0
const falha = (m) => { console.error('ERRO:', m); erros++ }

// 1. todos os 340 serviços têm nível 0..10
for (const s of SERVICOS) {
  const n = nivelDoServico(s.id)
  if (!Number.isInteger(n) || n < 0 || n > 10) falha(`${s.id}: nível inválido ${n}`)
}
console.log(`Níveis: ${NIVEIS.length} (L0..L10), serviços com nível: ${SERVICOS.length}`)

// 2. co-ocorrências mineradas só referem ids do catálogo
for (const [a, b, n] of mined.coocorrencia) {
  if (!SERVICOS_POR_ID[a] || !SERVICOS_POR_ID[b]) falha(`coocorrencia ${a}-${b}: id desconhecido`)
  if (!(n >= 2)) falha(`coocorrencia ${a}-${b}: n=${n} < 2`)
}
console.log(`Co-ocorrências: ${mined.coocorrencia.length} pares`)

// 3. templates: ids válidos, sem duplicados
for (const t of TEMPLATES) {
  const ids = t.servicos ?? t.ids ?? []
  if (ids.length === 0) falha(`template ${t.id}: sem serviços`)
  if (new Set(ids).size !== ids.length) falha(`template ${t.id}: ids duplicados`)
  for (const id of ids) if (!SERVICOS_POR_ID[id]) falha(`template ${t.id}: id desconhecido ${id}`)
}
console.log(`Templates: ${TEMPLATES.length}`)

// 4. podeLigar respeita ligaA em ambos os sentidos, e nunca liga a si próprio
if (podeLigar('s4hana', 's4hana') !== null) falha('podeLigar(x,x) devia ser null')
if (!podeLigar('s4hana', 'btp')) falha('s4hana↔btp devia ligar (ligaA)')
if (!podeLigar('btp', 's4hana')) falha('btp↔s4hana devia ligar no sentido inverso')
if (podeLigar('r3', 'joule-studio')) falha('r3↔joule-studio não devia ligar')

// 5. validar(): landscape sem infra dá erro 'infra'; com infra não dá
const semInfra = validar(['s4hana', 'btp'], { cenario: 'rise' })
if (!semInfra.some((a) => a.regra === 'infra')) falha('sem L0 devia avisar falta de infra')
const comInfra = validar(['azure', 's4hana', 'btp'], { cenario: 'rise' })
if (comInfra.some((a) => a.regra === 'infra')) falha('com azure não devia avisar falta de infra')
if (comInfra.some((a) => a.regra === 'orfao')) falha('azure/s4hana/btp estão todos ligados — não devia haver órfãos')
const foraCenario = validar(['dc-onprem', 'ecc'], { cenario: 'cloud' })
if (!foraCenario.some((a) => a.regra === 'preset')) falha('ecc no GROW devia ser marcado fora de cenário')

// 6. sugerir(): nunca repete colocados, respeita o limite, exclui irrelevantes
const colocados = ['azure', 's4hana', 'btp']
const sug = sugerir(colocados, { cenario: 'rise' }, 5)
if (sug.length > 5) falha(`sugerir devolveu ${sug.length} > 5`)
if (sug.some((s) => colocados.includes(s.id))) falha('sugerir repetiu peça já colocada')
console.log(`Sugestões p/ [${colocados.join(', ')}] em RISE: ${sug.map((s) => `${s.id}(${s.diagramas})`).join(', ')}`)

// 7. templates validam sem erros 'infra'/'btp' no preset que o template sugere (se tiver)
let templatesComErro = 0
for (const t of TEMPLATES) {
  const ids = t.servicos ?? t.ids ?? []
  const av = validar(ids, { cenario: t.cenario ?? 'rise' })
  if (av.some((a) => a.nivel === 'erro')) templatesComErro++
}
console.log(`Templates com erro 'nivel: erro' no preset por defeito: ${templatesComErro}/${TEMPLATES.length} (informativo — os templates são diagramas BTP que muitas vezes não desenham L0)`)

// 8. ligacoesEntre e cobertura
const l = ligacoesEntre(['azure', 's4hana', 'btp', 'integration-suite'])
if (l.length < 3) falha(`ligacoesEntre devia dar ≥3, deu ${l.length}`)
const c = cobertura(['azure', 'hana-cloud', 'btp', 'integration-suite', 's4hana', 'successfactors', 'ias', 'ai-foundation', 'joule', 'fiori', 'cloud-alm'])
if (c.preenchidos !== 11) falha(`cobertura devia ser 11/11, deu ${c.preenchidos}`)

console.log(erros === 0 ? '\nCONSTRUTOR OK — zero erros' : `\n${erros} ERRO(S)`)
process.exit(erros ? 1 : 0)
