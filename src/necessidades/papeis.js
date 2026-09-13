// PAPÉIS — "o que dar aos empregados para trabalharem".
//
// Cada papel é uma pessoa real na empresa, com as aplicações que abre no
// dia-a-dia. As apps são apps Fiori standard do S/4HANA Cloud (ou a UI do
// produto LoB indicado); os nomes estão na forma em que aparecem no
// launchpad e na SAP Fiori Apps Reference Library — é aí que se confirma
// o app ID e o business role exacto da release contratada.
//
//   servicoId   a peça do catálogo que fornece a app (valida contra data.js)
//   dispositivo onde é que a pessoa usa isto na prática
//   requer      só aparece se este id estiver no landscape (ex.: EWM)

export const PAPEIS = [
  {
    id: 'facturacao',
    nome: { pt: 'Administrativo de facturação', en: 'Billing clerk' },
    oQueFaz: { pt: 'Emite as facturas do dia e resolve o que ficou retido.', en: 'Issues the day’s invoices and clears what got stuck.' },
    apps: [
      { nome: 'Create Billing Documents', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Factura as entregas do dia em lote.', en: 'Bills the day’s deliveries in a batch.' } },
      { nome: 'Manage Billing Documents', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Procura, corrige, estorna e reenvia facturas.', en: 'Finds, fixes, reverses and resends invoices.' } },
      { nome: 'Billing Document Requests', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Trata o que ficou pendente de facturar.', en: 'Handles what is waiting to be billed.' } },
      { nome: 'eDocument Cockpit', servicoId: 'document-compliance', dispositivo: 'browser', faz: { pt: 'Vê o estado de cada factura junto da AT e reprocessa falhas.', en: 'Shows each invoice’s status with the tax authority and reprocesses failures.' } },
    ],
  },
  {
    id: 'contabilista',
    nome: { pt: 'Contabilista', en: 'Accountant' },
    oQueFaz: { pt: 'Lança, concilia, fecha o mês e responde ao TOC/auditor.', en: 'Posts, reconciles, closes the month and answers the auditor.' },
    apps: [
      { nome: 'Post General Journal Entries', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Lançamentos manuais.', en: 'Manual postings.' } },
      { nome: 'Manage Journal Entries', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Procura e corrige documentos.', en: 'Finds and corrects documents.' } },
      { nome: 'Trial Balance / Display Financial Statements', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Balancete e demonstrações.', en: 'Trial balance and statements.' } },
      { nome: 'Manage Supplier Line Items', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Conta-corrente de fornecedores.', en: 'Supplier open items.' } },
      { nome: 'Run Compliance Reports', servicoId: 'document-compliance', dispositivo: 'browser', faz: { pt: 'SAF-T (PT) e declarações periódicas.', en: 'SAF-T (PT) and periodic declarations.' } },
      { nome: 'Close Task Overview', servicoId: 'afc', dispositivo: 'browser', requer: 'afc', faz: { pt: 'A lista do fecho com prazos e responsáveis.', en: 'The close checklist with deadlines and owners.' } },
    ],
  },
  {
    id: 'tesouraria',
    nome: { pt: 'Tesouraria', en: 'Treasury / cash' },
    oQueFaz: { pt: 'Vê o saldo, paga fornecedores e concilia o extracto.', en: 'Watches the balance, pays suppliers and reconciles statements.' },
    apps: [
      { nome: 'Cash Position', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Quanto há, em que banco, hoje.', en: 'How much, in which bank, today.' } },
      { nome: 'Manage Bank Statements', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Importa e concilia o extracto.', en: 'Imports and reconciles the statement.' } },
      { nome: 'Manage Automatic Payments', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Corre o pagamento automático a fornecedores.', en: 'Runs the automatic supplier payment.' } },
      { nome: 'Bank Connectivity monitor', servicoId: 'multi-bank', dispositivo: 'browser', requer: 'multi-bank', faz: { pt: 'Estado dos ficheiros trocados com cada banco.', en: 'Status of files exchanged with each bank.' } },
    ],
  },
  {
    id: 'operador-armazem',
    nome: { pt: 'Operador de armazém', en: 'Warehouse operator' },
    oQueFaz: { pt: 'Recebe, arruma, separa e carrega. De pé, com um aparelho na mão.', en: 'Receives, puts away, picks and loads. On foot, device in hand.' },
    apps: [
      { nome: 'Post Goods Receipt for Purchase Order', servicoId: 's4hana', dispositivo: 'telemóvel / tablet', faz: { pt: 'Dá entrada da mercadoria que chega.', en: 'Receives incoming goods.' } },
      { nome: 'Transfer Stock / Post Goods Movement', servicoId: 's4hana', dispositivo: 'telemóvel / tablet', faz: { pt: 'Move stock entre depósitos.', en: 'Moves stock between storage locations.' } },
      { nome: 'Warehouse Operator (EWM)', servicoId: 'ewm', dispositivo: 'terminal RF / telemóvel', requer: 'ewm', faz: { pt: 'Recebe as tarefas uma a uma e confirma por leitura de código.', en: 'Gets tasks one by one and confirms by scanning.' } },
      { nome: 'Confirm Warehouse Tasks', servicoId: 'ewm', dispositivo: 'terminal RF', requer: 'ewm', faz: { pt: 'Confirma picking e arrumação.', en: 'Confirms picking and put-away.' } },
    ],
    nota: {
      pt: 'Sem EWM o operador trabalha nas apps de inventário do S/4 — funciona, mas não há tarefa dirigida nem localização. É aqui que se sente a diferença entre ter e não ter EWM.',
      en: 'Without EWM the operator works in S/4 inventory apps — it works, but there is no directed task and no bin. This is where having or not having EWM is actually felt.',
    },
  },
  {
    id: 'chefe-armazem',
    nome: { pt: 'Chefe de armazém', en: 'Warehouse supervisor' },
    oQueFaz: { pt: 'Distribui trabalho, resolve rupturas e responde pelo inventário.', en: 'Assigns work, solves shortages and owns the inventory.' },
    apps: [
      { nome: 'Stock — Multiple Materials', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'O que há e onde está.', en: 'What is in stock and where.' } },
      { nome: 'Manage Physical Inventory', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Contagens e acertos.', en: 'Counts and adjustments.' } },
      { nome: 'Warehouse Monitor (EWM)', servicoId: 'ewm', dispositivo: 'browser', requer: 'ewm', faz: { pt: 'A torre de controlo: filas, atrasos, operadores.', en: 'The control tower: queues, delays, operators.' } },
      { nome: 'Manage Outbound Deliveries', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'O que sai hoje.', en: 'What ships today.' } },
    ],
  },
  {
    id: 'expedicao',
    nome: { pt: 'Expedição', en: 'Shipping' },
    oQueFaz: { pt: 'Fecha a carga, emite documentos e entrega ao transportador.', en: 'Closes the load, issues documents and hands over to the carrier.' },
    apps: [
      { nome: 'Manage Outbound Deliveries', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Guias de remessa e picking.', en: 'Delivery notes and picking.' } },
      { nome: 'eDocument Cockpit — documento de transporte', servicoId: 'document-compliance', dispositivo: 'browser', faz: { pt: 'Comunica o documento de transporte à AT antes de a mercadoria sair.', en: 'Reports the transport document to the tax authority before goods move.' } },
      { nome: 'Manage Freight Orders', servicoId: 'tm', dispositivo: 'browser', requer: 'tm', faz: { pt: 'Ordens de transporte e transportadores.', en: 'Freight orders and carriers.' } },
    ],
  },
  {
    id: 'comercial',
    nome: { pt: 'Comercial / vendedor', en: 'Sales rep' },
    oQueFaz: { pt: 'Faz propostas, regista encomendas e diz ao cliente quando chega.', en: 'Quotes, enters orders and tells the customer when it arrives.' },
    apps: [
      { nome: 'Create Sales Orders', servicoId: 's4hana', dispositivo: 'browser / tablet', faz: { pt: 'Regista a encomenda com preço e disponibilidade.', en: 'Enters the order with price and availability.' } },
      { nome: 'Manage Sales Orders', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Acompanha e altera encomendas.', en: 'Tracks and changes orders.' } },
      { nome: 'Customer 360 View', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Tudo sobre o cliente numa página.', en: 'Everything about the customer on one page.' } },
      { nome: 'Sales Cloud', servicoId: 'sales-cloud', dispositivo: 'browser / telemóvel', requer: 'sales-cloud', faz: { pt: 'Oportunidades e visitas antes de haver encomenda.', en: 'Opportunities and visits before there is an order.' } },
    ],
  },
  {
    id: 'apoio-cliente',
    nome: { pt: 'Apoio ao cliente', en: 'Customer service' },
    oQueFaz: { pt: 'Responde a “onde vai a minha encomenda” e trata devoluções.', en: 'Answers “where is my order” and handles returns.' },
    apps: [
      { nome: 'Track Sales Orders', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Estado da encomenda ponta a ponta.', en: 'End-to-end order status.' } },
      { nome: 'Manage Customer Returns', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Devoluções e notas de crédito.', en: 'Returns and credit notes.' } },
    ],
  },
  {
    id: 'comprador',
    nome: { pt: 'Comprador', en: 'Buyer' },
    oQueFaz: { pt: 'Encomenda ao fornecedor e persegue prazos.', en: 'Orders from suppliers and chases dates.' },
    apps: [
      { nome: 'Manage Purchase Requisitions', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Pedidos internos por aprovar.', en: 'Internal requests awaiting approval.' } },
      { nome: 'Manage Purchase Orders', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Encomendas ao fornecedor.', en: 'Purchase orders to suppliers.' } },
      { nome: 'Monitor Purchase Order Items', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'O que está atrasado.', en: 'What is late.' } },
      { nome: 'Ariba guided buying', servicoId: 'ariba', dispositivo: 'browser', requer: 'ariba', faz: { pt: 'Compra guiada por catálogo para quem não é comprador.', en: 'Catalogue-guided buying for non-buyers.' } },
    ],
  },
  {
    id: 'planeador',
    nome: { pt: 'Planeador', en: 'Planner' },
    oQueFaz: { pt: 'Decide o que produzir e o que comprar, e quando.', en: 'Decides what to make and what to buy, and when.' },
    apps: [
      { nome: 'Monitor Material Coverage', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Onde vai faltar material.', en: 'Where material will run short.' } },
      { nome: 'Schedule MRP Runs', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Corre o planeamento de necessidades.', en: 'Runs material requirements planning.' } },
      { nome: 'IBP Excel add-in / planning views', servicoId: 'ibp', dispositivo: 'Excel / browser', requer: 'ibp', faz: { pt: 'Plano a meses, com cenários.', en: 'Months-ahead plan, with scenarios.' } },
    ],
  },
  {
    id: 'operador-producao',
    nome: { pt: 'Operador de produção', en: 'Production operator' },
    oQueFaz: { pt: 'Executa a ordem de fabrico e regista o que produziu.', en: 'Runs the production order and confirms output.' },
    apps: [
      { nome: 'Confirm Production Operation', servicoId: 's4hana', dispositivo: 'tablet no posto', faz: { pt: 'Regista quantidade e tempo.', en: 'Confirms quantity and time.' } },
      { nome: 'Manage Production Orders', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'A lista de ordens do turno.', en: 'The shift’s order list.' } },
      { nome: 'Production Operator Dashboard', servicoId: 'digital-manufacturing', dispositivo: 'tablet no posto', requer: 'digital-manufacturing', faz: { pt: 'Instruções, máquinas e OEE no posto.', en: 'Instructions, machines and OEE at the station.' } },
    ],
  },
  {
    id: 'rh',
    nome: { pt: 'Recursos humanos', en: 'HR' },
    oQueFaz: { pt: 'Admite, altera contratos, trata férias e ausências.', en: 'Hires, changes contracts, handles leave and absence.' },
    apps: [
      { nome: 'Employee Central — People Profile', servicoId: 'successfactors', dispositivo: 'browser', faz: { pt: 'A ficha de cada colaborador.', en: 'Each employee’s record.' } },
      { nome: 'Employee Central — Manage Employment', servicoId: 'successfactors', dispositivo: 'browser', faz: { pt: 'Admissões, alterações e saídas.', en: 'Hires, changes and exits.' } },
      { nome: 'Time Off / Time Sheet', servicoId: 'successfactors', dispositivo: 'browser / telemóvel', faz: { pt: 'Férias, faltas e horas.', en: 'Leave, absence and hours.' } },
    ],
  },
  {
    id: 'controller',
    nome: { pt: 'Controller', en: 'Controller' },
    oQueFaz: { pt: 'Margem, desvios, orçamento — e explicá-los à direcção.', en: 'Margin, variances, budget — and explaining them to management.' },
    apps: [
      { nome: 'Product Profitability', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Margem por produto e cliente.', en: 'Margin by product and customer.' } },
      { nome: 'Manage Cost Centers', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Centros de custo e imputações.', en: 'Cost centres and allocations.' } },
      { nome: 'SAC — histórias e planeamento', servicoId: 'sac', dispositivo: 'browser', requer: 'sac', faz: { pt: 'Painéis próprios e orçamento.', en: 'Own dashboards and budgeting.' } },
    ],
  },
  {
    id: 'gestor',
    nome: { pt: 'Gerente / direcção', en: 'Manager / owner' },
    oQueFaz: { pt: 'Aprova, vê os números e não quer aprender o ERP.', en: 'Approves, watches the numbers and does not want to learn the ERP.' },
    apps: [
      { nome: 'SAP Start (ou Work Zone)', servicoId: 'sap-start', dispositivo: 'telemóvel / browser', faz: { pt: 'Uma entrada só, com o que lhe compete.', en: 'One entry point with only what concerns them.' } },
      { nome: 'My Inbox', servicoId: 's4hana', dispositivo: 'telemóvel', faz: { pt: 'Aprovações (encomendas, facturas, férias).', en: 'Approvals (orders, invoices, leave).' } },
      { nome: 'Overview pages (vendas, tesouraria, stock)', servicoId: 's4hana', dispositivo: 'telemóvel / browser', faz: { pt: 'Os números do dia sem pedir relatório.', en: 'Today’s numbers without asking for a report.' } },
      { nome: 'Joule', servicoId: 'joule', dispositivo: 'telemóvel / browser', requer: 'joule', faz: { pt: 'Perguntar em linguagem natural.', en: 'Ask in plain language.' } },
    ],
  },
  {
    id: 'ti',
    nome: { pt: 'Responsável de TI', en: 'IT lead' },
    oQueFaz: { pt: 'Dá acessos, vigia integrações e fala com a SAP.', en: 'Grants access, watches integrations and talks to SAP.' },
    apps: [
      { nome: 'Maintain Business Users / Business Roles', servicoId: 's4hana', dispositivo: 'browser', faz: { pt: 'Criar utilizadores e atribuir papéis.', en: 'Create users and assign roles.' } },
      { nome: 'Identity Authentication — admin', servicoId: 'ias', dispositivo: 'browser', faz: { pt: 'Federar o login da empresa e gerir contas.', en: 'Federate company login and manage accounts.' } },
      { nome: 'SAP Cloud ALM', servicoId: 'cloud-alm', dispositivo: 'browser', faz: { pt: 'Projecto, testes e monitorização do run.', en: 'Project, testing and run monitoring.' } },
      { nome: 'SAP for Me', servicoId: 'sap-for-me', dispositivo: 'browser', faz: { pt: 'Contratos, sistemas e pedidos de suporte.', en: 'Contracts, systems and support tickets.' } },
      { nome: 'Integration Suite — monitor', servicoId: 'integration-suite', dispositivo: 'browser', requer: 'integration-suite', faz: { pt: 'Ver as integrações e o que falhou.', en: 'See integrations and what failed.' } },
    ],
  },
]

export const PAPEIS_POR_ID = Object.fromEntries(PAPEIS.map((p) => [p.id, p]))
