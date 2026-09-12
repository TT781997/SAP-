// NOTA: los textos de cada servicio (services[id]) todavía no están
// traducidos al español — quedan ausentes y useIdioma() aplica un
// fallback a PT-PT, registrando un aviso en la consola. Todo el chrome
// de la interfaz, los presets y los nombres de capa están traducidos al
// 100%. Ver el README para el plan de traducción del contenido de los
// 248 servicios.
export default {
  meta: { code: 'es', label: 'Español', dir: 'ltr' },
  ui: {
    title: 'Mapa del Ecosistema SAP',
    subtitle: 'El portafolio SAP: qué existe, cómo se conecta, y cómo combinar un landscape a medida del cliente.',
    searchPlaceholder: 'Buscar (nombre, acrónimo, SCI, SAP for Me...)',
    searchEmpty: 'No se encontró ningún servicio. Prueba el acrónimo (SCI, BTP, ALM) o el nombre comercial (SAP for Me).',
    showLegacy: 'Mostrar legado',
    language: 'Idioma',
    layers: 'Capas',
    edgeNative: 'Nativa',
    edgeCleanCore: 'Clean core (BTP)',
    edgeNetwork: 'Red',
    edgeGov: 'Gobierna',
    stateActive: 'Activo',
    stateRecommended: 'Recomendado',
    stateOptional: 'Opcional',
    stateLegacy: 'Legado',
    stateIrrelevant: 'No relevante',
    drawerWhat: 'Qué hace',
    drawerUsedFor: 'Para qué se usa',
    drawerMix: 'Cómo encaja en la mezcla',
    drawerExample: 'Ejemplo real',
    drawerRelated: 'Se relaciona con',
    drawerDontConfuse: 'No confundir con',
    drawerSatellites: 'Satélites en el índice Help',
    drawerFeatures: 'Funcionalidades de este producto: help.sap.com y Feature Documentation.',
    drawerScenario: 'Capa, tipo y estado en este escenario',
    resetView: 'Restablecer vista',
    selectedEdges: 'conexiones',
    hiddenEdgesSuffix: 'conexiones en el panel',
    clearSelection: 'Limpiar selección',
    spineOnly: 'Solo espina del escenario',
    zoomIn: 'Acercar',
    zoomOut: 'Alejar',
    closeDrawer: 'Cerrar',
    back: 'Volver',
    profiles: {
      greenfield: 'Mid-market greenfield',
      brownfield: 'Brownfield ECC complejo',
      industria: 'Industria / planta de producción',
      regulado: 'Regulado / soberanía de datos',
      spend: 'Alto gasto / red de proveedores',
      workforce: 'Alta fuerza laboral externa',
    },
    infraSelector: { aws: 'AWS', azure: 'Azure', gcp: 'GCP', sci: 'SCI' },
    footerDisclaimer: 'Contenido educativo basado en ofertas públicas de SAP y en el índice help.sap.com/docs/all-products. Casos resumidos a partir de historias públicas. Deploy with Confidence es una metodología interna de ingeniería de SAP, no un SKU. El índice All Products tiene ~1248 entradas documentales; este mapa muestra las piezas de arquitectura.',
  },
  presets: {
    onprem: {
      title: 'On-Premise Tradicional',
      hero: 'El cliente opera el centro de datos, NetWeaver, HANA, ECC o S/4 any-premise, PI/PO y Solution Manager. Control total, TCO y actualizaciones a cargo de TI. Las LoB en la nube (SuccessFactors, Ariba, Concur) pueden existir ya como islas — híbrido por accidente. Ruta de salida: RISE o GROW, con PI/PO y SolMan en retirada gradual hasta 2027.',
    },
    cloud: {
      title: 'Nube Pública — GROW',
      hero: 'S/4HANA Cloud Public Edition en el hyperscaler, procesos estándar, BTP para extensiones, Integration Suite como iPaaS, LoB SaaS a la carta, Cloud ALM incluido. DRC y Multi-Bank forman parte del mínimo honesto de Finance. Signavio conduce el fit-to-standard. Deploy with Confidence, del lado de SAP, es lo que permite a Public Edition y a Signavio recibir innovación en ciclos cortos; del lado del cliente, se traduce en no personalizar el core.',
    },
    rise: {
      title: 'Híbrido — RISE with SAP',
      hero: 'Un solo contrato: software + BTP + infraestructura gestionada por SAP en el hyperscaler (o CDC). S/4 Private Edition \u2248 alcance on-premise con operación de SAP. Signavio decide el proceso, LeanIX el landscape, BTC los datos, Tricentis la regresión, Cloud ALM ejecuta y mide el clean core, y Deploy with Confidence es la disciplina para implantar el to-be sin romper la siguiente actualización. Los sistemas on-premise residuales se conectan mediante Cloud Connector / Edge Integration Cell. PI/PO y SolMan en retirada gradual hasta 2027. Los grupos con múltiples ECC pueden usar Central Finance como paso intermedio.',
    },
  },
  layers: {
    infra: 'Infraestructura',
    dados: 'Datos',
    plataforma: 'Plataforma (SAP BTP)',
    integracao: 'Integración',
    core: 'Core ERP / Digital Core',
    lob: 'LoB / SaaS / Industria / Experiencia / IA',
    alm: 'Ciclo de Vida, Arquitectura y Transformación',
  },
  services: {},
}
