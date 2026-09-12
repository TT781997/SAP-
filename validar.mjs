import { SERVICOS, SERVICOS_POR_ID, CLUSTERS, LEGADO_IDS, LAYERS, TODAS_LIGACOES, getLigacoesDoServico, pesquisarServicos, ESPINHAS_PRESET } from './src/data.js'

let erros = 0
function falha(msg) { console.error('ERRO:', msg); erros++ }

// 1. ids únicos
const ids = SERVICOS.map((s) => s.id)
const idsUnicos = new Set(ids)
if (idsUnicos.size !== ids.length) falha(`ids duplicados: ${ids.length - idsUnicos.size}`)
console.log(`Total de serviços: ${SERVICOS.length}`)
if (SERVICOS.length !== 340) falha(`esperados 340 serviços, encontrados ${SERVICOS.length}`)

// 2. campos obrigatórios
const obrigatorios = ['id', 'nome', 'camada', 'tipo', 'cenarios', 'oQueFaz', 'paraQueServe', 'exemploReal', 'ligaA', 'nesteCenario']
for (const s of SERVICOS) {
  for (const campo of obrigatorios) {
    if (s[campo] === undefined) falha(`${s.id}: falta campo obrigatório '${campo}'`)
  }
  for (const cen of ['onprem', 'cloud', 'rise']) {
    if (!s.nesteCenario[cen]) falha(`${s.id}: nesteCenario.${cen} em falta`)
  }
}

// 3. camada válida
const camadasValidas = new Set(LAYERS.map((l) => l.id))
for (const s of SERVICOS) {
  if (!camadasValidas.has(s.camada)) falha(`${s.id}: camada inválida '${s.camada}'`)
}

// 4. ligaA resolve
let totalLigacoes = 0
for (const s of SERVICOS) {
  totalLigacoes += s.ligaA.length
  for (const alvo of s.ligaA) {
    if (!SERVICOS_POR_ID[alvo]) falha(`${s.id}: ligaA aponta para id desconhecido '${alvo}'`)
  }
}
console.log(`Total de entradas ligaA: ${totalLigacoes}, arestas únicas: ${TODAS_LIGACOES.length}`)

// 5. clusters consistentes
for (const [clusterId, cluster] of Object.entries(CLUSTERS)) {
  for (const membroId of cluster.membros) {
    const s = SERVICOS_POR_ID[membroId]
    if (!s) { falha(`cluster ${clusterId}: membro desconhecido '${membroId}'`); continue }
    if (s.cluster !== clusterId) falha(`${membroId}: cluster do card ('${s.cluster}') não bate com CLUSTERS.${clusterId}`)
  }
}
// e o inverso: todo card com .cluster está listado no cluster certo
for (const s of SERVICOS) {
  if (s.cluster && !CLUSTERS[s.cluster]?.membros.includes(s.id)) {
    falha(`${s.id}: aponta cluster '${s.cluster}' mas não está nos membros desse cluster`)
  }
}
console.log(`Clusters: ${Object.keys(CLUSTERS).length}`)

// 6. LEGADO_IDS válidos
for (const id of LEGADO_IDS) {
  if (!SERVICOS_POR_ID[id]) falha(`LEGADO_IDS: id desconhecido '${id}'`)
}
console.log(`LEGADO_IDS: ${LEGADO_IDS.length}`)

// 7. espinhas válidas
for (const [preset, ids] of Object.entries(ESPINHAS_PRESET)) {
  for (const id of ids) {
    if (!SERVICOS_POR_ID[id]) falha(`ESPINHAS_PRESET.${preset}: id desconhecido '${id}'`)
  }
  if (ids.length > 6) falha(`ESPINHAS_PRESET.${preset}: ${ids.length} hops (máx 6)`)
}

// 8. sanity check getLigacoesDoServico num nó de alto grau (s4hana, btp)
for (const id of ['s4hana', 'btp', 'ariba']) {
  const ctx = { cenario: 'rise', mostrarLegado: false, perfisActivos: [] }
  const { visiveis, ocultas } = getLigacoesDoServico(id, ctx)
  console.log(`${id}: ${visiveis.length} ligações visíveis (máx 8), ${ocultas} ocultas`)
  if (visiveis.length > 8) falha(`${id}: getLigacoesDoServico devolveu mais de 8`)
}

// 9. busca: casos de teste explícitos do brief (secção 8)
const casosTeste = [
  ['SAP For me', 'sap-for-me'],
  ['sap for me', 'sap-for-me'],
  ['SCI', 'sci'],
  ['forme', 'sap-for-me'],
  ['S4', 's4hana'],
  ['BTP', 'btp'],
]
for (const [query, esperado] of casosTeste) {
  const resultados = pesquisarServicos(query)
  const primeiro = resultados[0]?.id
  if (primeiro !== esperado) {
    falha(`busca('${query}'): esperado '${esperado}' em 1º lugar, veio '${primeiro}' (${resultados.map(r=>r.id).join(', ')})`)
  } else {
    console.log(`busca('${query}') -> ${primeiro} OK`)
  }
}

// 10. aliases: nenhum obrigatório fabricado, mas confirmar que os 8 pedidos existem
for (const id of ['sap-for-me', 'sci', 'cloud-alm', 'datasphere', 'dwc', 'integration-suite', 's4hana', 'btp', 'ias', 'successfactors']) {
  if (!SERVICOS_POR_ID[id]?.aliases?.length) falha(`${id}: aliases[] em falta (obrigatório pela secção 8)`)
}

console.log(erros === 0 ? '\nVALIDAÇÃO OK — zero erros' : `\n${erros} ERRO(S)`)
process.exit(erros === 0 ? 0 : 1)
