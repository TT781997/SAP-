// CAPACIDADES DE NEGÓCIO — o ponto de entrada quando o cliente não sabe
// (nem tem de saber) nomes de produtos SAP. Cada capacidade é uma coisa que
// a empresa PRECISA DE FAZER; o motor traduz isso em peças do catálogo.
//
// Campos:
//   nucleo        ids sem os quais a capacidade não existe
//   conformidade  ids exigidos por lei/fisco no país (ver PAIS_PT abaixo)
//   apoio         [{ id, quando }] — só entra se a condição for verdadeira
//   papeis        quem faz este trabalho todos os dias
//   decisao       a bifurcação real que um arquitecto tem de perguntar
//
// Os ids referem SERVICOS de data.js — validados em validar-necessidades.mjs.

export const AREAS = [
  { id: 'financas', nome: { pt: 'Finanças e facturação', en: 'Finance & billing' }, cor: '#0ea5e9' },
  { id: 'logistica', nome: { pt: 'Logística e armazém', en: 'Logistics & warehouse' }, cor: '#10b981' },
  { id: 'comercial', nome: { pt: 'Vendas e compras', en: 'Sales & procurement' }, cor: '#f59e0b' },
  { id: 'producao', nome: { pt: 'Produção', en: 'Production' }, cor: '#8b5cf6' },
  { id: 'pessoas', nome: { pt: 'Pessoas', en: 'People' }, cor: '#ec4899' },
  { id: 'transversal', nome: { pt: 'Transversal (entra sempre)', en: 'Cross-cutting (always on)' }, cor: '#64748b' },
]

export const CAPACIDADES = [
  // ---------------------------------------------------------------- FINANÇAS
  {
    id: 'facturar-clientes',
    area: 'financas',
    nome: { pt: 'Emitir facturas a clientes', en: 'Invoice customers' },
    oQuee: {
      pt: 'Transformar uma entrega ou um serviço prestado numa factura legal, enviá-la ao cliente e comunicá-la ao fisco.',
      en: 'Turn a delivery or a service into a legal invoice, send it to the customer and report it to the tax authority.',
    },
    nucleo: ['s4hana'],
    conformidade: ['document-compliance'],
    apoio: [
      { id: 'brim', quando: { pt: 'se factura subscrições ou consumo (telco, SaaS, utilities)', en: 'if you bill subscriptions or usage' } },
      { id: 'rar', quando: { pt: 'se tem contratos plurianuais e precisa de IFRS 15', en: 'if you have multi-year contracts and need IFRS 15' } },
      { id: 'opentext-presentment', quando: { pt: 'se quer facturas com layout próprio enviadas em massa', en: 'if you want branded invoices sent at scale' } },
    ],
    papeis: ['facturacao', 'contabilista'],
    decisao: {
      pt: 'Factura contra entrega de mercadoria (SD billing) ou contra contrato/consumo (BRIM)? A primeira vem no S/4 standard; a segunda é um projecto à parte.',
      en: 'Do you bill against goods delivery (SD billing) or against contract/usage (BRIM)? The first comes standard in S/4; the second is its own project.',
    },
  },
  {
    id: 'receber-conciliar',
    area: 'financas',
    nome: { pt: 'Receber e conciliar pagamentos', en: 'Receive and reconcile payments' },
    oQuee: {
      pt: 'Saber quem pagou, dar baixa na factura certa sem trabalho manual, e perseguir quem não pagou.',
      en: 'Know who paid, clear the right invoice without manual work, and chase who did not.',
    },
    nucleo: ['s4hana'],
    conformidade: [],
    apoio: [
      { id: 'multi-bank', quando: { pt: 'se tem mais do que dois bancos', en: 'if you have more than two banks' } },
      { id: 'cash-application', quando: { pt: 'se recebe muitos pagamentos por dia e a compensação manual dói', en: 'if you get many payments a day and manual clearing hurts' } },
    ],
    papeis: ['contabilista', 'tesouraria'],
  },
  {
    id: 'contabilidade-fecho',
    area: 'financas',
    nome: { pt: 'Contabilidade e fecho de contas', en: 'Accounting and period close' },
    oQuee: {
      pt: 'Razão geral, IVA, amortizações, fechar o mês e produzir as demonstrações financeiras.',
      en: 'General ledger, VAT, depreciation, closing the month and producing financial statements.',
    },
    nucleo: ['s4hana'],
    conformidade: ['document-compliance'],
    apoio: [
      { id: 'afc', quando: { pt: 'se o fecho envolve várias pessoas e quer checklist com prazos', en: 'if the close involves several people and you want a deadline checklist' } },
      { id: 'group-reporting', quando: { pt: 'se tem mais do que uma sociedade a consolidar', en: 'if you consolidate more than one legal entity' } },
    ],
    papeis: ['contabilista', 'controller'],
  },
  {
    id: 'pagar-fornecedores',
    area: 'financas',
    nome: { pt: 'Receber e pagar facturas de fornecedor', en: 'Process and pay supplier invoices' },
    oQuee: {
      pt: 'Receber a factura do fornecedor, confrontá-la com a encomenda e a recepção, aprovar e pagar.',
      en: 'Receive the supplier invoice, match it against PO and goods receipt, approve and pay.',
    },
    nucleo: ['s4hana'],
    conformidade: [],
    apoio: [
      { id: 'vim', quando: { pt: 'se recebe facturas em papel/PDF e quer OCR + workflow', en: 'if you receive paper/PDF invoices and want OCR + workflow' } },
      { id: 'document-ai', quando: { pt: 'alternativa cloud ao OCR clássico, dentro do BTP', en: 'cloud alternative to classic OCR, inside BTP' } },
      { id: 'multi-bank', quando: { pt: 'se emite ficheiros de pagamento para vários bancos', en: 'if you issue payment files to several banks' } },
    ],
    papeis: ['contabilista', 'tesouraria'],
  },

  // --------------------------------------------------------------- LOGÍSTICA
  {
    id: 'gerir-armazem',
    area: 'logistica',
    nome: { pt: 'Gerir armazém e stock', en: 'Run the warehouse and stock' },
    oQuee: {
      pt: 'Saber o que há, onde está, receber mercadoria, arrumar, separar encomendas e contar inventário.',
      en: 'Know what you have and where, receive goods, put away, pick orders and count inventory.',
    },
    nucleo: ['s4hana'],
    conformidade: [],
    apoio: [
      { id: 'ewm', quando: { pt: 'se precisa de localizações, ondas de picking, RF e tarefas por operador', en: 'if you need bins, picking waves, RF and per-operator tasks' } },
      { id: 'warehouse-insights', quando: { pt: 'se já tem EWM e quer optimização/robótica', en: 'if you already run EWM and want optimisation/robotics' } },
      { id: 'yard-logistics', quando: { pt: 'se tem cais, pátio e camiões a marcar hora', en: 'if you have docks, a yard and truck slots' } },
    ],
    papeis: ['operador-armazem', 'chefe-armazem'],
    decisao: {
      pt: 'Stock por depósito chega, ou precisa de localizações e RF? O S/4 traz gestão de inventário (IM) de base; o EWM é um produto à parte e um projecto à parte — não o compre antes de precisar.',
      en: 'Is stock-per-plant enough, or do you need bins and RF? S/4 includes basic inventory management; EWM is a separate product and a separate project — do not buy it before you need it.',
    },
  },
  {
    id: 'expedir-transportar',
    area: 'logistica',
    nome: { pt: 'Expedir e transportar', en: 'Ship and transport' },
    oQuee: {
      pt: 'Criar a guia de remessa, agrupar cargas, escolher transportador e saber onde vai a mercadoria.',
      en: 'Create the delivery note, consolidate loads, pick a carrier and know where the goods are.',
    },
    nucleo: ['s4hana'],
    conformidade: ['document-compliance'],
    apoio: [
      { id: 'tm', quando: { pt: 'se planeia rotas, tem frota ou negoceia com transportadores', en: 'if you plan routes, run a fleet or negotiate with carriers' } },
      { id: 'bn-freight', quando: { pt: 'se quer pôr os transportadores a responder numa rede', en: 'if you want carriers responding on a network' } },
      { id: 'event-management', quando: { pt: 'se o cliente pergunta “onde vai a minha encomenda?”', en: 'if customers ask “where is my order?”' } },
    ],
    papeis: ['expedicao', 'chefe-armazem'],
    nota: {
      pt: 'Em Portugal o documento de transporte é comunicado à AT antes da circulação — isso vive no mesmo sítio que a factura electrónica (DRC).',
      en: 'In Portugal the transport document must be reported to the tax authority before the goods move — same place as e-invoicing (DRC).',
    },
  },
  {
    id: 'planear-stock',
    area: 'logistica',
    nome: { pt: 'Planear stock e reposição', en: 'Plan stock and replenishment' },
    oQuee: {
      pt: 'Não ficar sem produto nem encher o armazém de capital parado.',
      en: 'Neither run out of product nor fill the warehouse with idle capital.',
    },
    nucleo: ['s4hana'],
    conformidade: [],
    apoio: [
      { id: 'ibp', quando: { pt: 'se planeia a vários meses, com cenários e S&OP', en: 'if you plan months ahead, with scenarios and S&OP' } },
      { id: 'fnr', quando: { pt: 'se é retalho e repõe lojas', en: 'if you are retail and replenish stores' } },
    ],
    papeis: ['planeador', 'comprador'],
    decisao: {
      pt: 'O MRP do S/4 chega para reposição normal. O IBP é para quando o plano é uma conversa entre vendas, operações e finanças — não é um MRP melhor.',
      en: 'S/4 MRP is enough for normal replenishment. IBP is for when the plan is a conversation between sales, operations and finance — it is not a better MRP.',
    },
  },

  // --------------------------------------------------------------- COMERCIAL
  {
    id: 'vender-encomendas',
    area: 'comercial',
    nome: { pt: 'Receber e gerir encomendas de cliente', en: 'Take and manage customer orders' },
    oQuee: {
      pt: 'Do pedido do cliente à confirmação de prazo e preço, com disponibilidade verificada.',
      en: 'From customer request to confirmed date and price, with availability checked.',
    },
    nucleo: ['s4hana'],
    conformidade: [],
    apoio: [
      { id: 'sales-cloud', quando: { pt: 'se tem equipa comercial a trabalhar oportunidades antes da encomenda', en: 'if you have a sales team working opportunities before the order' } },
      { id: 'commerce-cloud', quando: { pt: 'se vende online (B2B ou B2C)', en: 'if you sell online (B2B or B2C)' } },
      { id: 'cpq', quando: { pt: 'se o produto é configurável e a proposta é complexa', en: 'if the product is configurable and quoting is complex' } },
    ],
    papeis: ['comercial', 'apoio-cliente'],
  },
  {
    id: 'comprar',
    area: 'comercial',
    nome: { pt: 'Comprar a fornecedores', en: 'Buy from suppliers' },
    oQuee: {
      pt: 'Pedido de compra, aprovação, encomenda ao fornecedor e recepção.',
      en: 'Requisition, approval, purchase order and goods receipt.',
    },
    nucleo: ['s4hana'],
    conformidade: [],
    apoio: [
      { id: 'ariba', quando: { pt: 'se tem muitos fornecedores, concursos ou compras indirectas dispersas', en: 'if you have many suppliers, tenders or scattered indirect spend' } },
      { id: 'business-network', quando: { pt: 'se quer o fornecedor a confirmar na rede em vez de por e-mail', en: 'if you want suppliers confirming on a network instead of by e-mail' } },
      { id: 'concur', quando: { pt: 'se tem despesas de deslocação a reembolsar', en: 'if you have travel expenses to reimburse' } },
    ],
    papeis: ['comprador', 'chefe-armazem'],
  },

  // ---------------------------------------------------------------- PRODUÇÃO
  {
    id: 'produzir',
    area: 'producao',
    nome: { pt: 'Produzir', en: 'Manufacture' },
    oQuee: {
      pt: 'Ordens de fabrico, consumo de matéria-prima, registo de produção e custo do produto.',
      en: 'Production orders, raw material consumption, production confirmation and product cost.',
    },
    nucleo: ['s4hana'],
    conformidade: [],
    apoio: [
      { id: 'digital-manufacturing', quando: { pt: 'se quer o chão de fábrica ligado (MES, máquinas, OEE)', en: 'if you want a connected shop floor (MES, machines, OEE)' } },
      { id: 'gbt', quando: { pt: 'se trabalha com lotes e precisa de recall em minutos (alimentar, farma, química)', en: 'if you work with batches and need recall in minutes (food, pharma, chemicals)' } },
      { id: 'plm-recipe', quando: { pt: 'se produz por receita/fórmula', en: 'if you produce by recipe/formula' } },
    ],
    papeis: ['operador-producao', 'planeador'],
  },

  // ----------------------------------------------------------------- PESSOAS
  {
    id: 'gerir-pessoas',
    area: 'pessoas',
    nome: { pt: 'Gerir pessoas e salários', en: 'Manage people and payroll' },
    oQuee: {
      pt: 'Ficha do colaborador, organigrama, férias, tempos e processamento salarial.',
      en: 'Employee record, org chart, absence, time and payroll.',
    },
    nucleo: ['successfactors'],
    conformidade: [],
    apoio: [
      { id: 'time-attendance', quando: { pt: 'se tem turnos e relógio de ponto', en: 'if you have shifts and a time clock' } },
      { id: 'fieldglass', quando: { pt: 'se usa muitos trabalhadores externos/temporários', en: 'if you use many external/temporary workers' } },
    ],
    papeis: ['rh', 'gestor'],
    nota: {
      pt: 'O processamento salarial português é o ponto a confirmar caso a caso: confirme a localização PT com a SAP ou com o parceiro antes de assumir que está incluída. Muitas PME portuguesas mantêm a folha num sistema local e integram só os custos no S/4.',
      en: 'Portuguese payroll is the point to confirm case by case: check the PT localisation with SAP or the partner before assuming it is included. Many Portuguese SMEs keep payroll in a local system and only integrate the cost postings into S/4.',
    },
  },

  // -------------------------------------------------------------- TRANSVERSAL
  {
    id: 'login-acessos',
    area: 'transversal',
    nome: { pt: 'Login único e controlo de acessos', en: 'Single sign-on and access control' },
    oQuee: {
      pt: 'Cada pessoa entra com a conta da empresa e vê apenas o que lhe compete.',
      en: 'Everyone signs in with the company account and sees only what their job requires.',
    },
    nucleo: ['ias'],
    conformidade: [],
    apoio: [
      { id: 'iag', quando: { pt: 'se precisa de segregação de funções auditável (SoD)', en: 'if you need auditable segregation of duties' } },
    ],
    papeis: ['ti'],
    sempre: true,
  },
  {
    id: 'ver-numeros',
    area: 'transversal',
    nome: { pt: 'Ver os números do negócio', en: 'See the business numbers' },
    oQuee: {
      pt: 'Painéis de vendas, margem, stock e tesouraria sem pedir um relatório à TI.',
      en: 'Sales, margin, stock and cash dashboards without asking IT for a report.',
    },
    nucleo: ['s4hana'],
    conformidade: [],
    apoio: [
      { id: 'sac', quando: { pt: 'se quer painéis próprios, planeamento e dados de fora do SAP', en: 'if you want your own dashboards, planning and non-SAP data' } },
      { id: 'datasphere', quando: { pt: 'se junta dados de vários sistemas', en: 'if you combine data from several systems' } },
    ],
    papeis: ['controller', 'gestor'],
    nota: {
      pt: 'O S/4 já traz analítica embutida nas próprias apps Fiori. Só precisa de SAC quando quer painéis próprios ou dados que não estão no ERP.',
      en: 'S/4 ships embedded analytics inside the Fiori apps. You only need SAC when you want your own dashboards or data that is not in the ERP.',
    },
  },
  {
    id: 'integrar-sistemas',
    area: 'transversal',
    nome: { pt: 'Ligar a outros sistemas', en: 'Connect to other systems' },
    oQuee: {
      pt: 'Falar com a loja online, o banco, o operador logístico, o software do contabilista.',
      en: 'Talk to the webshop, the bank, the 3PL, the accountant’s software.',
    },
    nucleo: ['integration-suite'],
    conformidade: [],
    apoio: [
      { id: 'cloud-connector', quando: { pt: 'se fica com algum sistema na sua casa/servidor', en: 'if you keep any system in your own house/server' } },
      { id: 'event-mesh', quando: { pt: 'se quer reagir a acontecimentos em vez de perguntar de hora a hora', en: 'if you want to react to events instead of polling' } },
    ],
    papeis: ['ti'],
  },
]

export const CAPACIDADES_POR_ID = Object.fromEntries(CAPACIDADES.map((c) => [c.id, c]))

// Base que entra em QUALQUER landscape S/4 cloud, escolha o cliente o que
// escolher. Não é opinião: sem infra, identidade e UX não há dia 1.
export const BASE_SEMPRE = ['s4hana', 'ias', 'fiori', 'cloud-alm', 'sap-for-me']

export const PAIS_PT = {
  nome: { pt: 'Portugal', en: 'Portugal' },
  obrigatorio: ['document-compliance'],
  porque: {
    pt: 'Factura electrónica, ATCUD + código QR, SAF-T (PT) e comunicação de documentos de transporte à AT. No portefólio SAP isto é o SAP Document and Reporting Compliance com a localização portuguesa — confirme sempre o âmbito da localização e a certificação do software junto da SAP ou do parceiro.',
    en: 'E-invoicing, ATCUD + QR code, SAF-T (PT) and transport document reporting. In the SAP portfolio this is SAP Document and Reporting Compliance with the Portuguese localisation — always confirm the localisation scope and software certification with SAP or the partner.',
  },
}
