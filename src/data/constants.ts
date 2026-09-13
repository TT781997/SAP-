import type { Camada, EdgeKind, InfraChoice, Preset, Profile, Status } from "./types";

export const LAYER_ORDER: Camada[] = [
  "alm",
  "lob",
  "core",
  "integracao",
  "plataforma",
  "dados",
  "infra",
];

export const COLLAPSED_CLUSTERS = ["spend", "cx", "supply", "finance-ext"] as const;

export const CLUSTER_META: Record<
  string,
  { ids: string[]; label: Record<"pt" | "en" | "fr" | "de" | "es", string> }
> = {
  spend: {
    ids: [
      "ariba",
      "business-network",
      "concur",
      "fieldglass",
      "taulia",
      "managed-gateway",
      "spend-control-tower",
      "vim",
    ],
    label: {
      pt: "Spend (compras e rede)",
      en: "Spend (buying & network)",
      fr: "Spend (achats et réseau)",
      de: "Spend (Einkauf & Netzwerk)",
      es: "Spend (compras y red)",
    },
  },
  cx: {
    ids: [
      "commerce-cloud",
      "sales-cloud",
      "service-cloud",
      "emarsys",
      "customer-data-cloud",
      "cpq",
      "fsm",
      "order-management",
      "customer-checkout",
      "entitlement-management",
    ],
    label: {
      pt: "CX (experiência do cliente)",
      en: "CX (customer experience)",
      fr: "CX (expérience client)",
      de: "CX (Kundenerlebnis)",
      es: "CX (experiencia de cliente)",
    },
  },
  supply: {
    ids: [
      "ibp",
      "ewm",
      "tm",
      "digital-manufacturing",
      "apm",
      "yard-logistics",
      "warehouse-insights",
      "ipd",
      "service-asset-manager",
      "gbt",
      "event-management",
      "snc",
      "fnr",
      "returns-management",
    ],
    label: {
      pt: "Supply chain avançada",
      en: "Advanced supply chain",
      fr: "Supply chain avancée",
      de: "Erweiterte Supply Chain",
      es: "Cadena de suministro avanzada",
    },
  },
  "finance-ext": {
    ids: [
      "central-finance",
      "treasury",
      "cash-application",
      "rar",
      "disclosure-management",
    ],
    label: {
      pt: "Finanças alargadas",
      en: "Extended finance",
      fr: "Finance étendue",
      de: "Erweiterte Finanzen",
      es: "Finanzas ampliadas",
    },
  },
  pme: {
    ids: ["business-one", "bydesign"],
    label: {
      pt: "ERP PME",
      en: "SME ERP",
      fr: "ERP PME",
      de: "ERP für KMU",
      es: "ERP PYME",
    },
  },
  runtimes: {
    ids: ["abap-env", "runtimes-btp"],
    label: {
      pt: "Runtimes BTP",
      en: "BTP runtimes",
      fr: "Runtimes BTP",
      de: "BTP-Runtimes",
      es: "Runtimes BTP",
    },
  },
  "dados-ext": {
    ids: ["data-services", "data-intelligence", "ilm"],
    label: {
      pt: "Dados clássicos / arquivo",
      en: "Classic data / archiving",
      fr: "Données classiques / archivage",
      de: "Klassische Daten / Archiv",
      es: "Datos clásicos / archivo",
    },
  },
};

export const LEGACY_IDS = new Set([
  "ecc",
  "s4-any",
  "hana-onprem",
  "pipo",
  "solman",
  "netweaver",
  "hcm-onprem",
  "businessobjects",
  "enterprise-portal",
  "bpc",
  "data-services",
  "data-intelligence",
]);

export const SPINE: Record<Preset, string[]> = {
  cloud: ["azure", "hana-cloud", "btp", "integration-suite", "s4hana", "cloud-alm"],
  rise: ["azure", "s4hana", "btp", "integration-suite", "signavio", "cloud-alm"],
  onprem: ["dc-onprem", "hana-onprem", "s4-any", "pipo", "solman"],
};

export const PATHWAY: Record<Preset, string[]> = {
  cloud: ["infra", "ias", "s4hana", "cloud-alm", "integration-suite", "successfactors", "btp"],
  rise: [
    "infra",
    "ias",
    "s4hana",
    "cloud-connector",
    "cloud-alm",
    "integration-suite",
    "btp",
    "signavio",
  ],
  onprem: ["dc-onprem", "hana-onprem", "s4-any", "fiori", "pipo", "solman"],
};

export const PATHWAY_INFRA: Record<InfraChoice, string> = {
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  sci: "sci",
};

export const EDGE_KIND_FOR_PAIR = (
  fromCamada: Camada,
  toCamada: Camada,
  fromId: string,
  toId: string,
): EdgeKind => {
  const govIds = new Set([
    "cloud-alm",
    "solman",
    "leanix",
    "dwc",
    "btc",
    "tricentis",
    "walkme",
    "enable-now",
    "sap-for-me",
    "focused-run",
  ]);
  if (govIds.has(fromId) || govIds.has(toId) || fromCamada === "alm" || toCamada === "alm") {
    return "governa";
  }
  const netIds = new Set([
    "aws",
    "azure",
    "gcp",
    "sci",
    "dc-onprem",
    "cdc-option",
    "cloud-connector",
    "eic",
    "sovereign-cloud",
    "ns2",
  ]);
  if (netIds.has(fromId) || netIds.has(toId)) return "rede";
  const clean = new Set(["btp", "build", "abap-env", "runtimes-btp", "ai-foundation", "hana-cloud"]);
  if (clean.has(fromId) || clean.has(toId)) return "cleancore";
  return "nativo";
};

export const ACTIVE_BY_PRESET: Record<Preset, Set<string>> = {
  onprem: new Set([
    "dc-onprem",
    "hana-onprem",
    "netweaver",
    "ecc",
    "s4-any",
    "pipo",
    "solman",
    "fiori",
    "mdg",
    "ewm",
    "tm",
    "hcm-onprem",
    "businessobjects",
    "bw4",
    "group-reporting",
    "enterprise-portal",
    "enable-now",
    "sap-for-me",
    "treasury",
    "ppm",
  ]),
  cloud: new Set([
    "hana-cloud",
    "datasphere",
    "bdc",
    "btp",
    "build",
    "workzone",
    "ias",
    "runtimes-btp",
    "abap-env",
    "ai-foundation",
    "integration-suite",
    "event-mesh",
    "s4hana",
    "fiori",
    "mdg",
    "successfactors",
    "ariba",
    "signavio",
    "sac",
    "joule",
    "cloud-alm",
    "leanix",
    "sap-start",
    "sap-for-me",
    "document-compliance",
    "multi-bank",
    "cloud-erp",
    "business-suite",
  ]),
  rise: new Set([
    "s4hana",
    "btp",
    "integration-suite",
    "event-mesh",
    "ias",
    "build",
    "workzone",
    "cloud-alm",
    "signavio",
    "leanix",
    "dwc",
    "successfactors",
    "ariba",
    "sac",
    "joule",
    "bdc",
    "datasphere",
    "hana-cloud",
    "sap-for-me",
    "document-compliance",
    "fiori",
    "mdg",
    "cloud-erp",
    "business-suite",
  ]),
};

export const OPTIONAL_BY_PRESET: Record<Preset, Set<string>> = {
  onprem: new Set([
    "btp",
    "integration-suite",
    "successfactors",
    "ariba",
    "signavio",
    "sac",
    "leanix",
    "concur",
    "central-finance",
    "cloud-connector",
  ]),
  cloud: new Set([
    "concur",
    "fieldglass",
    "commerce-cloud",
    "sales-cloud",
    "service-cloud",
    "emarsys",
    "ibp",
    "ewm",
    "tm",
    "digital-manufacturing",
    "apm",
    "cloud-connector",
    "document-ai",
    "cash-application",
    "treasury",
    "group-reporting",
    "grc",
    "gts",
    "sustainability",
  ]),
  rise: new Set([
    "dc-onprem",
    "cloud-connector",
    "eic",
    "cdc-option",
    "btc",
    "tricentis",
    "central-finance",
    "concur",
    "fieldglass",
    "ibp",
    "ewm",
    "tm",
    "digital-manufacturing",
    "apm",
    "fsm",
    "cash-application",
    "treasury",
    "group-reporting",
    "grc",
    "gts",
    "pipo",
    "solman",
  ]),
};

export const IRRELEVANT_BY_PRESET: Record<Preset, Set<string>> = {
  onprem: new Set([
    "aws",
    "azure",
    "gcp",
    "s4hana",
    "cloud-alm",
    "joule",
    "bdc",
    "eic",
    "dwc",
    "sci",
    "cdc-option",
    "cloud-erp",
  ]),
  cloud: new Set([
    "dc-onprem",
    "ecc",
    "s4-any",
    "pipo",
    "solman",
    "hana-onprem",
    "netweaver",
    "hcm-onprem",
    "enterprise-portal",
    "bpc",
    "cdc-option",
  ]),
  rise: new Set(["ecc", "netweaver", "enterprise-portal", "bpc"]),
};

export const RECOMMENDED_WHEN: Array<{
  id: string;
  presets: Preset[];
  profiles?: Profile[];
}> = [
  { id: "cdc-option", presets: ["rise"], profiles: ["regulado"] },
  { id: "sci", presets: ["rise", "cloud"], profiles: ["regulado"] },
  { id: "eic", presets: ["rise"], profiles: ["industria", "regulado"] },
  { id: "btc", presets: ["rise"], profiles: ["brownfield"] },
  { id: "tricentis", presets: ["rise"], profiles: ["brownfield"] },
  { id: "central-finance", presets: ["rise", "onprem"], profiles: ["brownfield"] },
  { id: "iag", presets: ["rise", "cloud"], profiles: ["regulado"] },
  { id: "grc", presets: ["rise", "onprem"], profiles: ["regulado"] },
  { id: "document-compliance", presets: ["cloud", "rise"] },
  { id: "multi-bank", presets: ["cloud", "rise"] },
  { id: "fieldglass", presets: ["cloud", "rise"], profiles: ["workforce"] },
  { id: "ariba", presets: ["cloud", "rise"], profiles: ["spend"] },
  { id: "digital-manufacturing", presets: ["rise"], profiles: ["industria"] },
  { id: "signavio", presets: ["rise", "cloud"] },
  { id: "dwc", presets: ["rise", "cloud"], profiles: ["greenfield"] },
  { id: "workzone", presets: ["rise", "cloud"], profiles: ["greenfield"] },
  { id: "leanix", presets: ["rise"], profiles: ["brownfield"] },
  { id: "cloud-connector", presets: ["rise"], profiles: ["brownfield"] },
  { id: "ewm", presets: ["rise", "onprem"], profiles: ["industria"] },
  { id: "apm", presets: ["rise"], profiles: ["industria"] },
  { id: "ibp", presets: ["rise", "cloud"], profiles: ["industria"] },
  { id: "business-network", presets: ["cloud", "rise"], profiles: ["spend"] },
  { id: "concur", presets: ["cloud", "rise"], profiles: ["spend", "workforce"] },
  { id: "taulia", presets: ["cloud", "rise"], profiles: ["spend"] },
  { id: "successfactors", presets: ["cloud", "rise"], profiles: ["workforce"] },
  { id: "sovereign-cloud", presets: ["rise", "cloud"], profiles: ["regulado"] },
];

export const EDGE_LABEL: Record<EdgeKind, Record<"pt" | "en" | "fr" | "de" | "es", string>> = {
  nativo: { pt: "nativo", en: "native", fr: "natif", de: "nativ", es: "nativo" },
  cleancore: {
    pt: "clean core",
    en: "clean core",
    fr: "clean core",
    de: "Clean Core",
    es: "clean core",
  },
  rede: { pt: "rede", en: "network", fr: "réseau", de: "Netz", es: "red" },
  governa: { pt: "governa", en: "governs", fr: "gouverne", de: "steuert", es: "gobierna" },
};

export const STATUS_ORDER: Status[] = [
  "activo",
  "recomendado",
  "opcional",
  "legado",
  "irrelevante",
];

export const PROFILE_EXTRAS: Record<Profile, string[]> = {
  greenfield: ["signavio", "dwc", "workzone"],
  brownfield: ["btc", "tricentis", "central-finance", "cloud-connector", "leanix"],
  industria: ["digital-manufacturing", "ewm", "apm", "ibp"],
  regulado: ["sci", "sovereign-cloud", "iag", "grc", "eic", "cdc-option"],
  spend: ["ariba", "business-network", "concur", "taulia"],
  workforce: ["fieldglass", "successfactors"],
};

export const PROFILE_CLUSTER: Partial<Record<Profile, string>> = {
  spend: "spend",
  industria: "supply",
  workforce: "cx",
};
