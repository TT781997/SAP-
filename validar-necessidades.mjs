import { SERVICOS_POR_ID } from './src/data.js'
import { CAPACIDADES, AREAS, BASE_SEMPRE, PAIS_PT } from './src/necessidades/capacidades.js'
import { PAPEIS } from './src/necessidades/papeis.js'
import { PACOTES } from './src/necessidades/pacotes.js'
import { calcular, sugerirVia, RAZOES_VIA } from './src/necessidades/motor.js'

let erros = 0
const falha = (m) => { console.error('ERRO:', m); erros++ }
const idsValidos = (lista, onde) => lista.forEach((id) => { if (!SERVICOS_POR_ID[id]) falha(`${onde}: id desconhecido '${id}'`) })

// 1. Todos os ids de serviço referidos existem no catálogo de 340
idsValidos(BASE_SEMPRE, 'BASE_SEMPRE')
idsValidos(PAIS_PT.obrigatorio, 'PAIS_PT')
const areaIds = new Set(AREAS.map((a) => a.id))
const papelIds = new Set(PAPEIS.map((p) => p.id))
for (const c of CAPACIDADES) {
  if (!areaIds.has(c.area)) falha(`${c.id}: área inválida '${c.area}'`)
  idsValidos(c.nucleo, `${c.id}.nucleo`)
  idsValidos(c.conformidade, `${c.id}.conformidade`)
  idsValidos((c.apoio ?? []).map((a) => a.id), `${c.id}.apoio`)
  for (const p of c.papeis ?? []) if (!papelIds.has(p)) falha(`${c.id}: papel desconhecido '${p}'`)
  for (const campo of ['nome', 'oQuee']) if (!c[campo]?.pt || !c[campo]?.en) falha(`${c.id}: ${campo} sem pt/en`)
}
console.log(`Capacidades: ${CAPACIDADES.length} em ${AREAS.length} áreas`)

// 2. Papéis: apps apontam para serviços reais; 'requer' também
for (const p of PAPEIS) {
  if (p.apps.length === 0) falha(`papel ${p.id}: sem apps`)
  for (const a of p.apps) {
    if (!SERVICOS_POR_ID[a.servicoId]) falha(`papel ${p.id}, app '${a.nome}': servicoId desconhecido '${a.servicoId}'`)
    if (a.requer && !SERVICOS_POR_ID[a.requer]) falha(`papel ${p.id}, app '${a.nome}': requer desconhecido '${a.requer}'`)
    if (!a.faz?.pt) falha(`papel ${p.id}, app '${a.nome}': sem descrição`)
  }
}
const totalApps = PAPEIS.reduce((n, p) => n + p.apps.length, 0)
console.log(`Papéis: ${PAPEIS.length}, apps mapeadas: ${totalApps}`)

// 3. Pacotes: capacidades existem, extras existem, via válida
const capIds = new Set(CAPACIDADES.map((c) => c.id))
for (const pk of PACOTES) {
  if (pk.capacidades.length === 0) falha(`pacote ${pk.id}: sem capacidades`)
  for (const c of pk.capacidades) if (!capIds.has(c)) falha(`pacote ${pk.id}: capacidade desconhecida '${c}'`)
  idsValidos(pk.extras ?? [], `pacote ${pk.id}.extras`)
  if (!['onprem', 'cloud', 'rise'].includes(pk.via)) falha(`pacote ${pk.id}: via inválida '${pk.via}'`)
}
console.log(`Pacotes: ${PACOTES.length}`)

// 4. O motor corre para todos os pacotes e produz algo utilizável
for (const pk of PACOTES) {
  const r = calcular(pk.capacidades, { via: pk.via, pais: 'PT', extras: pk.extras ?? [] })
  if (r.total < 4) falha(`pacote ${pk.id}: landscape pequeno demais (${r.total})`)
  if (r.papeis.length === 0) falha(`pacote ${pk.id}: nenhum papel`)
  for (const peca of r.porCamada.flatMap((g) => g.pecas)) {
    if (!peca.razoes?.length) falha(`pacote ${pk.id}: peça ${peca.id} sem razão`)
  }
  for (const p of r.papeis) if (p.apps.length === 0) falha(`pacote ${pk.id}: papel ${p.id} sem nenhuma app disponível`)
  const camadas = r.porCamada.map((g) => g.camada).join(' ')
  console.log(`  ${pk.id.padEnd(22)} ${String(r.total).padStart(2)} peças | ${r.papeis.length} papéis | ${r.apoiosDisponiveis.length} apoios por decidir | ${camadas}`)
}

// 5. O caso exacto do pedido: só facturar + logística
const exemplo = calcular(['facturar-clientes', 'gerir-armazem', 'expedir-transportar'], { via: 'cloud', pais: 'PT' })
const temDRC = exemplo.ids.includes('document-compliance')
if (!temDRC) falha('facturação em PT tem de puxar o Document and Reporting Compliance')
const papelFact = exemplo.papeis.find((p) => p.id === 'facturacao')
if (!papelFact || papelFact.apps.length < 3) falha('o administrativo de facturação devia ter ≥3 apps')
const opArmazem = exemplo.papeis.find((p) => p.id === 'operador-armazem')
if (opArmazem.apps.some((a) => a.requer === 'ewm')) falha('sem EWM no landscape, o operador não devia ver apps de EWM')
if (opArmazem.appsEmFalta.length === 0) falha('devia assinalar as apps de EWM como indisponíveis')
console.log(`\nExemplo "facturar + logística": ${exemplo.total} peças, ${exemplo.papeis.length} papéis`)
console.log(`  peças: ${exemplo.ids.join(', ')}`)
console.log(`  operador de armazém: ${opArmazem.apps.length} apps activas, ${opArmazem.appsEmFalta.length} bloqueadas por falta de EWM`)

// 6. Com EWM ligado, as apps de RF aparecem
const comEwm = calcular(['gerir-armazem'], { via: 'cloud', pais: 'PT', apoiosLigados: ['ewm'] })
const op2 = comEwm.papeis.find((p) => p.id === 'operador-armazem')
if (!op2.apps.some((a) => a.requer === 'ewm')) falha('com EWM ligado, as apps de RF deviam aparecer')
if (op2.appsEmFalta.length !== 0) falha('com EWM ligado não devia haver apps bloqueadas')
console.log(`  com EWM ligado: ${op2.apps.length} apps para o operador`)

// 7. sugerirVia cobre os quatro caminhos
const vias = [
  [{ capacidadeIds: ['facturar-clientes'], pessoas: 40 }, 'growStandard'],
  [{ capacidadeIds: ['facturar-clientes'], pessoas: 8 }, 'microB1'],
  [{ capacidadeIds: ['facturar-clientes'], pessoas: 300, temSapAntigo: true }, 'riseExistente'],
  [{ capacidadeIds: ['facturar-clientes'], pessoas: 300, temSapAntigo: true, muitoCodigoAMedida: true }, 'riseBrownfield'],
]
for (const [entrada, esperado] of vias) {
  const r = sugerirVia(entrada)
  if (r.chave !== esperado) falha(`sugerirVia: esperado '${esperado}', veio '${r.chave}'`)
  if (!RAZOES_VIA[r.chave]?.pt) falha(`sugerirVia: chave '${r.chave}' sem razão em PT`)
}
console.log(`Vias de contrato: 4/4 caminhos correctos`)

console.log(erros === 0 ? '\nNECESSIDADES OK — zero erros' : `\n${erros} ERRO(S)`)
process.exit(erros ? 1 : 0)
