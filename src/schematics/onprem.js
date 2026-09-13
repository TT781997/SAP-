// Cenário On-Premise Tradicional — fluxo animado (secção 13). Um diagrama
// vivo por preset: poucas caixas, ≤8 setas em movimento, labels sempre
// visíveis. Cada bloco tem cardId → clique abre o card no catálogo.
export default {
  id: 'onprem',
  titulo: { pt: 'On-Premise Tradicional', en: 'Traditional On-Premise', fr: 'On-Premise traditionnel', de: 'Klassisches On-Premise', es: 'On-Premise Tradicional' },
  hero: { pt: 'Data center próprio: NetWeaver, ECC ou S/4 any-premise, HANA on-prem, PI/PO. O Solution Manager observa tudo.', en: 'Own data center: NetWeaver, ECC or S/4 any-premise, on-prem HANA, PI/PO. Solution Manager watches everything.' },
  fonte: 'Mapa do ecossistema — cenário L1',
  dominio: 'opsec',
  presetDefault: 'onprem',
  cenarios: [{ id: 'completo', nome: { pt: 'Fluxo completo', en: 'Full flow' } }],
  computarEstiloNo: () => ({}),
  nodes: [
    { id: 'actor-user', type: 'actor', position: { x: 10, y: 250 }, data: { label: 'Utilizador SAP GUI / Fiori', icone: 'user' } },
    { id: 'dc', type: 'container', position: { x: 170, y: 20 }, style: { width: 700, height: 560, zIndex: 0 }, data: { titulo: 'Data Center do Cliente', numero: '①', icone: 'server', dominio: 'onprem', cardId: 'dc-onprem' } },
    { id: 'netweaver', type: 'item', position: { x: 200, y: 230 }, style: { width: 160, height: 55, zIndex: 2 }, data: { label: 'NetWeaver / Gateway', cardId: 'netweaver', dominio: 'onprem' } },
    { id: 'erp', type: 'container', position: { x: 400, y: 150 }, style: { width: 260, height: 220, zIndex: 1 }, data: { titulo: 'Core ERP', numero: '②', dominio: 'sap' } },
    { id: 'ecc', type: 'item', position: { x: 415, y: 190 }, style: { width: 230, height: 50, zIndex: 2 }, data: { label: 'ECC 6.0', nota: 'ou S/4HANA any-premise', cardId: 'ecc' } },
    { id: 's4any', type: 'item', position: { x: 415, y: 250 }, style: { width: 230, height: 50, zIndex: 2 }, data: { label: 'S/4HANA any-premise', nota: 'alternativa moderna', cardId: 's4-any' } },
    { id: 'hana', type: 'item', position: { x: 415, y: 310 }, style: { width: 230, height: 45, zIndex: 2 }, data: { label: 'SAP HANA on-prem', cardId: 'hana-onprem', dominio: 'dados' } },
    { id: 'pipo', type: 'item', position: { x: 700, y: 230 }, style: { width: 150, height: 55, zIndex: 2 }, data: { label: 'PI/PO', nota: 'middleware A2A', cardId: 'pipo' } },
    { id: 'solman', type: 'container', position: { x: 200, y: 420 }, style: { width: 650, height: 130, zIndex: 1 }, data: { titulo: 'Solution Manager', numero: '③', icone: 'shield', dominio: 'alm', subtitulo: 'ChaRM · ITSM · monitoring · Custom Code Mgmt', cardId: 'solman' } },
    { id: 'sat', type: 'container', position: { x: 920, y: 150 }, style: { width: 220, height: 220, zIndex: 0 }, data: { titulo: 'Sistemas satélite', numero: '④', dashed: true, dominio: 'nonsap' } },
    { id: 'sat-hcm', type: 'item', position: { x: 935, y: 190 }, style: { width: 190, height: 45, zIndex: 1 }, data: { label: 'HCM on-prem', cardId: 'hcm-onprem' } },
    { id: 'sat-bw', type: 'item', position: { x: 935, y: 245 }, style: { width: 190, height: 45, zIndex: 1 }, data: { label: 'BW/4HANA + BusinessObjects', cardId: 'bw4', dominio: 'dados' } },
    { id: 'sat-3rd', type: 'item', position: { x: 935, y: 300 }, style: { width: 190, height: 45, zIndex: 1 }, data: { label: '3rd party / EDI', dominio: 'nonsap' } },
    { id: 'btp-ilha', type: 'container', position: { x: 920, y: 420 }, style: { width: 220, height: 130, zIndex: 0 }, data: { titulo: 'BTP (ilha opcional)', dashed: true, dominio: 'btp', subtitulo: 'via Cloud Connector', cardId: 'btp', dimmed: true } },
  ],
  edges: [
    { id: 'e1', source: 'actor-user', target: 'netweaver', type: 'sapEdge', label: 'SAP GUI / Fiori', data: { tipo: 'nativa', animado: true, frase: 'O utilizador entra pelo NetWeaver Gateway / Fiori Launchpad on-prem.' } },
    { id: 'e2', source: 'netweaver', target: 'erp', type: 'sapEdge', label: 'ABAP', data: { tipo: 'nativa', animado: true, frase: 'ECC e S/4 any-premise correm sobre o NetWeaver AS ABAP.' } },
    { id: 'e3', source: 'erp', target: 'pipo', type: 'sapEdge', label: 'RFC / IDoc', data: { tipo: 'nativa', animado: true, frase: 'O ERP fala com o middleware por RFC e IDocs.' } },
    { id: 'e4', source: 'pipo', target: 'sat', type: 'sapEdge', label: 'A2A / B2B', data: { tipo: 'nativa', animado: true, frase: 'PI/PO distribui para satélites, HCM, BW e parceiros EDI.' } },
    { id: 'e5', source: 'solman', target: 'erp', type: 'sapEdge', label: 'ChaRM / monitoring', sourceHandle: undefined, targetHandle: 'b', data: { tipo: 'governa', animado: false, frase: 'O Solution Manager observa e governa o landscape (seta traço-ponto a pulsar, não a correr).' } },
    { id: 'e6', source: 'erp', target: 'btp-ilha', type: 'sapEdge', label: 'Cloud Connector', data: { tipo: 'rede', animado: false, dimmed: true, frase: 'Ilha BTP opcional, atenuada: só existe se já houver extensões cloud.' } },
  ],
}
