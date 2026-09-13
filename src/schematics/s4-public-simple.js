// SCH-S4-PUBLIC — vista simples e DE PROPÓSITO curta (secção 12): três zonas.
export default {
  id: 's4-public-simple',
  titulo: { pt: 'S/4HANA Cloud Public Edition (vista simples)', en: 'S/4HANA Cloud Public Edition (simple view)', fr: 'S/4HANA Cloud Public Edition (vue simple)', de: 'S/4HANA Cloud Public Edition (einfache Sicht)', es: 'S/4HANA Cloud Public Edition (vista simple)' },
  hero: { pt: 'Business user e sistema remoto de um lado; IAS, Web Dispatcher, S/4HANA e HANA do outro. Três setas. Nada mais.', en: 'Business user and remote system on one side; IAS, Web Dispatcher, S/4HANA and HANA on the other. Three arrows. Nothing else.' },
  fonte: 'SAP Help — S/4HANA Cloud Public Edition, system landscape (simplificado)',
  dominio: 'appdev',
  cenarios: [{ id: 'completo', nome: { pt: 'Vista simples', en: 'Simple view' } }],
  computarEstiloNo: () => ({}),
  nodes: [
    { id: 'user', type: 'actor', position: { x: 10, y: 100 }, data: { label: 'Business user (browser)', icone: 'user' } },
    { id: 'remote', type: 'actor', position: { x: 10, y: 260 }, data: { label: 'Remote system', icone: 'server' } },
    { id: 'cloud', type: 'container', position: { x: 180, y: 30 }, style: { width: 520, height: 330, zIndex: 0 }, data: { titulo: 'SAP S/4HANA Cloud Public Edition', icone: 'cloud', dominio: 'sap', cardId: 's4hana' } },
    { id: 'ias', type: 'item', position: { x: 200, y: 90 }, style: { width: 200, height: 50, zIndex: 1 }, data: { label: 'SAP Cloud Identity Services', nota: 'IdP', cardId: 'ias', dominio: 'identidade' } },
    { id: 'wd', type: 'item', position: { x: 200, y: 160 }, style: { width: 200, height: 50, zIndex: 1 }, data: { label: 'SAP Web Dispatcher', nota: 'reverse proxy', dominio: 'sap' } },
    { id: 's4', type: 'item', position: { x: 450, y: 90 }, style: { width: 220, height: 50, zIndex: 1 }, data: { label: 'S/4HANA Server', cardId: 's4hana', dominio: 'sap' } },
    { id: 'hana', type: 'item', position: { x: 450, y: 160 }, style: { width: 220, height: 50, zIndex: 1 }, data: { label: 'SAP HANA', cardId: 'hana-cloud', dominio: 'dados' } },
    { id: 'integ', type: 'item', position: { x: 200, y: 270 }, style: { width: 470, height: 50, zIndex: 1 }, data: { label: 'Communication arrangements · APIs · Integration Suite', cardId: 'integration-suite', dominio: 'btp' } },
  ],
  edges: [
    { id: 'e1', source: 'user', target: 'ias', type: 'sapEdge', label: 'Authentication', data: { tipo: 'auth', animado: true, frase: 'Login federado no IAS.' } },
    { id: 'e2', source: 'user', target: 'wd', type: 'sapEdge', label: 'System access', data: { tipo: 'nativa', animado: true, frase: 'HTTPS ao Web Dispatcher, que encaminha para o S/4.' } },
    { id: 'e3', source: 'wd', target: 's4', type: 'sapEdge', label: 'HTTPS', data: { tipo: 'nativa', animado: true, frase: 'Fiori standard do S/4HANA Cloud.' } },
    { id: 'e4', source: 's4', target: 'hana', type: 'sapEdge', label: 'SQL', sourceHandle: 'b', targetHandle: 't', data: { tipo: 'nativa', animado: false, frase: 'HANA gerido pela SAP debaixo do Public Edition.' } },
    { id: 'e5', source: 'remote', target: 'integ', type: 'sapEdge', label: 'System-to-system integration (technical connection)', data: { tipo: 'extensao', animado: true, frase: 'Integração técnica por communication arrangements / APIs released.' } },
  ],
}
