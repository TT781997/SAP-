export type Camada =
  | "infra"
  | "dados"
  | "plataforma"
  | "integracao"
  | "core"
  | "lob"
  | "alm";

export type Preset = "onprem" | "cloud" | "rise";
export type InfraChoice = "aws" | "azure" | "gcp" | "sci";
export type Profile =
  | "greenfield"
  | "brownfield"
  | "industria"
  | "regulado"
  | "spend"
  | "workforce";

export type Status =
  | "activo"
  | "recomendado"
  | "opcional"
  | "legado"
  | "irrelevante";

export type EdgeKind = "nativo" | "cleancore" | "rede" | "governa";
export type Lang = "pt" | "en" | "fr" | "de" | "es";
export type ViewMode = "map" | "schematic";

export type TemplateId =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L";

export type SchematicFamily = "journey" | "inside" | "floor";
export type SchematicFocus = "overview" | "porter" | "floor" | "mail";

export interface Servico {
  id: string;
  nome: string;
  camada: Camada;
  tipo: string;
  cluster: string | null;
  cenarios: Preset[];
  perfisRecomendados: Profile[];
  oQueFaz: string;
  paraQueServe: string;
  exemploReal: string;
  ligaA: string[];
  nesteCenario: Record<Preset, string>;
  naoConfundir?: string;
  satelitesHelp?: string;
  aliases: string[];
}

export interface ServiceCopy {
  nome: string;
  tipo: string;
  oQueFaz: string;
  paraQueServe: string;
  exemploReal: string;
  nesteCenario: Record<Preset, string>;
  naoConfundir?: string;
}

export type NodeKind =
  | "group"
  | "groupTitle"
  | "actor"
  | "hop"
  | "product"
  | "porter"
  | "l0"
  | "note";

export interface SchematicNode {
  id: string;
  type?: "group" | "sapCard" | "sapLabel";
  parentId?: string;
  extent?: "parent";
  position: { x: number; y: number };
  style?: Record<string, string | number>;
  data: {
    label: string;
    sub?: string;
    sapTerm?: string;
    serviceId?: string;
    camada?: Camada;
    number?: string;
    kind?: NodeKind;
    icon?: string;
    muted?: boolean;
    badge?: string;
    hopId?: string;
    zoomTarget?: SchematicFocus;
  };
}

export interface SchematicEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  kind: EdgeKind;
  animated?: boolean;
  dashed?: boolean;
  number?: number;
  sourceHandle?: string;
  targetHandle?: string;
  labelOffset?: number;
  labelDx?: number;
}

export interface Schematic {
  id: string;
  domain: "infra" | "ai" | "integration" | "appdev" | "data" | "ops" | "journey";
  hyperscaler?: InfraChoice | "onprem";
  title: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  footnote: Record<Lang, string>;
  nodes: SchematicNode[];
  edges: SchematicEdge[];
  width: number;
  height: number;
}
