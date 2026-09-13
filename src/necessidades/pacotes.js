// PACOTES — situações de empresa que já existem, prontas a carregar.
// O primeiro é literalmente o exemplo pedido: "só facturar e gerir a
// logística". Cada pacote é um ponto de partida honesto, não um orçamento.

export const PACOTES = [
  {
    id: 'facturar-logistica',
    nome: { pt: 'Só facturar e gerir a logística', en: 'Just invoicing and logistics' },
    perfil: { pt: 'Empresa que compra, armazena, vende e expede — e quer o mínimo que funcione.', en: 'A company that buys, stocks, sells and ships — and wants the minimum that works.' },
    dimensao: { pt: '10 a 80 pessoas, um armazém', en: '10 to 80 people, one warehouse' },
    capacidades: ['facturar-clientes', 'gerir-armazem', 'expedir-transportar', 'vender-encomendas', 'comprar', 'receber-conciliar', 'contabilidade-fecho', 'login-acessos', 'ver-numeros'],
    via: 'cloud',
    porque: {
      pt: 'Processo standard, sem código à medida: é o caso típico do GROW / S/4HANA Cloud Public Edition. O armazém entra primeiro sem EWM — só se avança para EWM quando as localizações e o RF forem mesmo precisos.',
      en: 'Standard process, no custom code: the typical GROW / S/4HANA Cloud Public Edition case. The warehouse starts without EWM — you only move to EWM when bins and RF are genuinely needed.',
    },
  },
  {
    id: 'distribuidor',
    nome: { pt: 'Distribuidor / comércio por grosso', en: 'Distributor / wholesale' },
    perfil: { pt: 'Compra para revender, muitas referências, margem fina, entrega rápida.', en: 'Buys to resell, many SKUs, thin margin, fast delivery.' },
    dimensao: { pt: '30 a 250 pessoas, um ou dois armazéns', en: '30 to 250 people, one or two warehouses' },
    capacidades: ['facturar-clientes', 'gerir-armazem', 'expedir-transportar', 'planear-stock', 'vender-encomendas', 'comprar', 'receber-conciliar', 'pagar-fornecedores', 'contabilidade-fecho', 'login-acessos', 'ver-numeros', 'integrar-sistemas'],
    via: 'cloud',
    porque: {
      pt: 'Aqui o EWM começa a justificar-se (localizações, ondas de picking) e o planeamento de stock deixa de caber na cabeça de uma pessoa.',
      en: 'Here EWM starts to pay for itself (bins, picking waves) and stock planning no longer fits in one person’s head.',
    },
  },
  {
    id: 'fabricante-pme',
    nome: { pt: 'PME industrial', en: 'Industrial SME' },
    perfil: { pt: 'Produz por encomenda ou para stock, com matéria-prima e lotes.', en: 'Makes to order or to stock, with raw materials and batches.' },
    dimensao: { pt: '50 a 300 pessoas, uma fábrica', en: '50 to 300 people, one plant' },
    capacidades: ['produzir', 'planear-stock', 'gerir-armazem', 'comprar', 'vender-encomendas', 'facturar-clientes', 'expedir-transportar', 'pagar-fornecedores', 'contabilidade-fecho', 'login-acessos', 'ver-numeros'],
    via: 'cloud',
    porque: {
      pt: 'O S/4 traz produção, custo de produto e MRP de base. O Digital Manufacturing só entra quando quiser ligar máquinas e postos — é um segundo projecto, não o primeiro.',
      en: 'S/4 brings production, product costing and MRP out of the box. Digital Manufacturing only comes in when you want machines and stations connected — that is a second project, not the first.',
    },
  },
  {
    id: 'servicos-profissionais',
    nome: { pt: 'Serviços profissionais', en: 'Professional services' },
    perfil: { pt: 'Vende horas e projectos: consultoria, engenharia, arquitectura, TI.', en: 'Sells hours and projects: consulting, engineering, architecture, IT.' },
    dimensao: { pt: '20 a 200 pessoas, sem armazém', en: '20 to 200 people, no warehouse' },
    capacidades: ['facturar-clientes', 'vender-encomendas', 'contabilidade-fecho', 'receber-conciliar', 'pagar-fornecedores', 'gerir-pessoas', 'login-acessos', 'ver-numeros'],
    via: 'cloud',
    porque: {
      pt: 'Sem logística. O peso está em projectos, tempos e facturação por projecto — e nas pessoas, que aqui são o produto.',
      en: 'No logistics. The weight is on projects, time and project billing — and on people, who here are the product.',
    },
  },
  {
    id: 'retalho-omni',
    nome: { pt: 'Retalho com loja e online', en: 'Retail with store and online' },
    perfil: { pt: 'Vende ao consumidor final em loja física e por canal digital.', en: 'Sells to end consumers in physical stores and online.' },
    dimensao: { pt: '50 a 500 pessoas, várias lojas', en: '50 to 500 people, several stores' },
    capacidades: ['vender-encomendas', 'facturar-clientes', 'gerir-armazem', 'expedir-transportar', 'planear-stock', 'comprar', 'receber-conciliar', 'contabilidade-fecho', 'login-acessos', 'ver-numeros', 'integrar-sistemas'],
    via: 'cloud',
    porque: {
      pt: 'O canal digital e o POS trazem volume de documentos e devoluções. A integração deixa de ser opcional no dia em que a loja online existe.',
      en: 'The digital channel and POS bring document volume and returns. Integration stops being optional the day the webshop exists.',
    },
  },
  {
    id: 'grupo-brownfield',
    nome: { pt: 'Grupo com ECC a modernizar', en: 'Group modernising from ECC' },
    perfil: { pt: 'Já tem SAP há anos, com customizações e várias sociedades.', en: 'Has had SAP for years, with customisations and several legal entities.' },
    dimensao: { pt: '200+ pessoas, várias empresas do grupo', en: '200+ people, several group companies' },
    capacidades: ['facturar-clientes', 'contabilidade-fecho', 'pagar-fornecedores', 'receber-conciliar', 'comprar', 'vender-encomendas', 'gerir-armazem', 'gerir-pessoas', 'login-acessos', 'ver-numeros', 'integrar-sistemas'],
    via: 'rise',
    porque: {
      pt: 'Aqui a conversa não é “que módulos” — é o que fazer ao código à medida que existe. RISE / S/4 Private Edition preserva o âmbito; o Signavio decide o processo, o Cloud ALM mede o clean core.',
      en: 'Here the conversation is not “which modules” — it is what to do with the custom code you already have. RISE / S/4 Private Edition preserves scope; Signavio decides the process, Cloud ALM measures clean core.',
    },
    extras: ['signavio', 'btc', 'tricentis', 'leanix'],
  },
]

export const PACOTES_POR_ID = Object.fromEntries(PACOTES.map((p) => [p.id, p]))
