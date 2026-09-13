import type { Camada, EdgeKind, Lang, Schematic, SchematicEdge, SchematicNode } from "@/data/types";
import { loc } from "@/i18n/loc";

function g(
  id: string,
  label: string,
  x: number,
  y: number,
  w: number,
  h: number,
  camada: Camada,
): SchematicNode {
  return {
    id,
    type: "group",
    position: { x, y },
    style: { width: w, height: h },
    data: { label, camada, kind: "group" },
  };
}

function title(id: string, label: string, parentId: string, w: number): SchematicNode {
  return {
    id,
    type: "sapLabel",
    parentId,
    extent: "parent",
    position: { x: 12, y: 8 },
    style: { width: w - 24, height: 28 },
    data: { label, kind: "groupTitle" },
  };
}

function card(
  id: string,
  label: string,
  x: number,
  y: number,
  serviceId: string,
  camada: Camada,
  opts?: { parentId?: string; sub?: string; sapTerm?: string; w?: number; h?: number },
): SchematicNode {
  return {
    id,
    type: "sapCard",
    parentId: opts?.parentId,
    extent: opts?.parentId ? "parent" : undefined,
    position: { x, y },
    style: { width: opts?.w ?? 200, height: opts?.h ?? 64 },
    data: { label, sub: opts?.sub, sapTerm: opts?.sapTerm, serviceId, camada, kind: "product" },
  };
}

function e(
  source: string,
  target: string,
  label: string,
  kind: EdgeKind,
  extra?: { animated?: boolean; number?: number; sh?: string; th?: string },
): SchematicEdge {
  return {
    id: `${source}->${target}`,
    source,
    target,
    label,
    kind,
    animated: extra?.animated,
    number: extra?.number,
    sourceHandle: extra?.sh,
    targetHandle: extra?.th,
  };
}

const foot = loc(
  "Baseado no Architecture Center, redesenhado. Não é o poster oficial.",
  "Based on Architecture Center, redrawn. Not the official poster.",
  "D'après Architecture Center, redessiné. Ce n'est pas l'affiche officielle.",
  "Nach Architecture Center, neu gezeichnet. Nicht das offizielle Poster.",
  "Según Architecture Center, redibujado. No es el póster oficial.",
);

export const EXPERT_SCHEMATICS: Schematic[] = [
  {
    id: "btp-interior",
    domain: "appdev",
    title: loc(
      "Como uma extensão fala com o programa de facturas",
      "How an extension talks to the invoicing program",
      "Comment une extension parle au programme de factures",
      "Wie eine Erweiterung mit dem Rechnungsprogramm spricht",
      "Cómo una extensión habla con el programa de facturas",
    ),
    subtitle: loc(
      "A caixa de extensões à volta do ERP, sem mexer no programa de facturas.",
      "The extensions box around the ERP, without touching the invoicing program.",
      "La boîte d'extensions autour de l'ERP, sans toucher au programme de factures.",
      "Die Erweiterungsbox um das ERP, ohne das Rechnungsprogramm anzufassen.",
      "La caja de extensiones alrededor del ERP, sin tocar el programa de facturas.",
    ),
    footnote: foot,
    width: 1100,
    height: 640,
    nodes: [
      g("g-person", "A pessoa", 24, 80, 200, 200, "lob"),
      title("t-person", "A pessoa", "g-person", 200),
      card("n-lap", "Portátil desta pessoa", 16, 44, "sap-start", "lob", {
        parentId: "g-person",
        sub: "Abre o menu, não o cofre.",
        w: 168,
        h: 80,
      }),
      g("g-btp", "Canto das extensões (BTP)", 250, 40, 420, 520, "plataforma"),
      title("t-btp", "Canto das extensões (BTP)", "g-btp", 420),
      card("n-btp", "A caixa de extensões", 16, 44, "btp", "plataforma", {
        parentId: "g-btp",
        sub: "Programas à volta das facturas, sem abrir o cofre.",
        sapTerm: "SAP BTP",
        w: 388,
        h: 72,
      }),
      card("n-build", "Construir à volta", 16, 132, "build", "plataforma", {
        parentId: "g-btp",
        sub: "Apps e automações que não mexem no core.",
        sapTerm: "SAP Build",
        w: 388,
        h: 64,
      }),
      card("n-abap", "ABAP na nuvem", 16, 212, "abap-env", "plataforma", {
        parentId: "g-btp",
        sub: "Código clássico, sítio novo.",
        sapTerm: "ABAP Environment",
        w: 388,
        h: 64,
      }),
      card("n-ias2", "O porteiro", 16, 292, "ias", "plataforma", {
        parentId: "g-btp",
        sub: "Quem entra e com que chave.",
        sapTerm: "IAS",
        w: 388,
        h: 64,
      }),
      card("n-is2", "O correio", 16, 372, "integration-suite", "integracao", {
        parentId: "g-btp",
        sub: "Fala com o programa de facturas.",
        sapTerm: "Integration Suite",
        w: 388,
        h: 64,
      }),
      g("g-core", "O programa de facturas", 700, 80, 340, 280, "core"),
      title("t-core", "O programa de facturas", "g-core", 340),
      card("n-s4", "S/4 — o cofre", 16, 44, "s4hana", "core", {
        parentId: "g-core",
        sub: "Facturas e stock. Não se customiza.",
        sapTerm: "S/4HANA",
        w: 308,
        h: 80,
      }),
      card("n-api", "API do programa", 16, 140, "s4hana", "core", {
        parentId: "g-core",
        sub: "A extensão bate à porta, não entra no cofre.",
        w: 308,
        h: 72,
      }),
    ],
    edges: [
      e("n-lap", "n-ias2", "entra", "nativo", { animated: true, number: 1, sh: "sr", th: "tl" }),
      e("n-ias2", "n-s4", "reconhecido", "nativo", { animated: true, number: 2, sh: "sr", th: "tl" }),
      e("n-build", "n-api", "pede, não altera", "cleancore", { animated: true, number: 3, sh: "sr", th: "tl" }),
      e("n-is2", "n-s4", "correio", "cleancore", { sh: "sr", th: "tl" }),
    ],
  },
  {
    id: "events",
    domain: "integration",
    title: loc(
      "Quando uma encomenda nasce, avisa os outros",
      "When an order is born, it tells the others",
      "Quand une commande naît, elle prévient les autres",
      "Wenn ein Auftrag entsteht, sagt er es den anderen",
      "Cuando nace un pedido, avisa a los otros",
    ),
    subtitle: loc(
      "Central de avisos — reagir a acontecimentos em vez de perguntar de hora a hora.",
      "Notice board — react to events instead of asking every hour.",
      "Tableau d'avis — réagir aux événements au lieu de demander toutes les heures.",
      "Anschlagbrett — auf Ereignisse reagieren statt stündlich zu fragen.",
      "Central de avisos — reaccionar a sucesos en vez de preguntar cada hora.",
    ),
    footnote: foot,
    width: 1080,
    height: 560,
    nodes: [
      g("g-src", "O sítio de trabalho", 40, 80, 280, 280, "core"),
      title("t-src", "O sítio de trabalho", "g-src", 280),
      card("n-so", "Nasce uma encomenda", 16, 48, "s4hana", "core", {
        parentId: "g-src",
        sub: "Alguém gravou o pedido do cliente.",
        w: 248,
        h: 80,
      }),
      g("g-mesh", "Central de avisos", 360, 80, 300, 280, "integracao"),
      title("t-mesh", "Central de avisos", "g-mesh", 300),
      card("n-mesh", "Event Mesh", 16, 48, "event-mesh", "integracao", {
        parentId: "g-mesh",
        sub: "Guarda o aviso e entrega-o a quem subscreveu.",
        sapTerm: "Event Mesh",
        w: 268,
        h: 80,
      }),
      g("g-act", "Quem escuta", 700, 60, 320, 360, "lob"),
      title("t-act", "Quem escuta", "g-act", 320),
      card("n-wh", "O armazém prepara", 16, 44, "s4hana", "core", {
        parentId: "g-act",
        sub: "Stock e picking.",
        w: 288,
        h: 70,
      }),
      card("n-bill", "A facturação espera a entrega", 16, 128, "s4hana", "core", {
        parentId: "g-act",
        sub: "A factura nasce depois.",
        w: 288,
        h: 70,
      }),
      card("n-ext", "Uma extensão reage", 16, 212, "build", "plataforma", {
        parentId: "g-act",
        sub: "Sem abrir o cofre.",
        w: 288,
        h: 70,
      }),
    ],
    edges: [
      e("n-so", "n-mesh", "aviso", "nativo", { animated: true, number: 1, sh: "sr", th: "tl" }),
      e("n-mesh", "n-wh", "entrega o aviso", "cleancore", { animated: true, number: 2, sh: "sr", th: "tl" }),
      e("n-mesh", "n-bill", "", "cleancore", { sh: "sr", th: "tl" }),
      e("n-mesh", "n-ext", "", "cleancore", { sh: "sr", th: "tl" }),
    ],
  },
  {
    id: "joule-stack",
    domain: "ai",
    title: loc(
      "Como se pergunta em linguagem natural",
      "How you ask in plain language",
      "Comment on demande en langage naturel",
      "Wie man in Alltagssprache fragt",
      "Cómo se pregunta en lenguaje natural",
    ),
    subtitle: loc(
      "Joule lê o contexto da pessoa e responde com o que ela pode ver.",
      "Joule reads the person’s context and answers with what they may see.",
      "Joule lit le contexte de la personne et répond avec ce qu'elle peut voir.",
      "Joule liest den Kontext der Person und antwortet mit dem, was sie sehen darf.",
      "Joule lee el contexto de la persona y responde con lo que puede ver.",
    ),
    footnote: foot,
    width: 1000,
    height: 520,
    nodes: [
      card("n-p", "A pessoa pergunta", 40, 180, "sap-start", "lob", {
        sub: "«Quanto facturámos ontem?»",
        w: 200,
        h: 80,
        sapTerm: "SAP Start + Joule",
      }),
      g("g-j", "O assistente", 280, 80, 300, 340, "plataforma"),
      title("t-j", "O assistente", "g-j", 300),
      card("n-j", "Joule", 16, 48, "joule", "plataforma", {
        parentId: "g-j",
        sub: "Perguntar em linguagem natural.",
        w: 268,
        h: 72,
      }),
      card("n-ai", "A inteligência por baixo", 16, 140, "ai-foundation", "plataforma", {
        parentId: "g-j",
        sub: "Modelos e ferramentas, na caixa BTP.",
        sapTerm: "AI Foundation",
        w: 268,
        h: 72,
      }),
      card("n-g", "Grounding — só o que podes ver", 16, 232, "ias", "plataforma", {
        parentId: "g-j",
        sub: "O porteiro limita a resposta.",
        w: 268,
        h: 72,
      }),
      card("n-s4j", "O programa de facturas", 640, 180, "s4hana", "core", {
        sub: "A fonte dos números.",
        w: 260,
        h: 80,
      }),
    ],
    edges: [
      e("n-p", "n-j", "pergunta", "nativo", { animated: true, number: 1, sh: "sr", th: "tl" }),
      e("n-j", "n-s4j", "lê números", "cleancore", { animated: true, number: 2, sh: "sr", th: "tl" }),
      e("n-g", "n-j", "autoriza", "governa", { sh: "st", th: "tb" }),
    ],
  },
  {
    id: "genai",
    domain: "ai",
    title: loc(
      "Onde mora a inteligência",
      "Where the intelligence lives",
      "Où vit l'intelligence",
      "Wo die Intelligenz wohnt",
      "Dónde vive la inteligencia",
    ),
    subtitle: loc(
      "A inteligência não substitui o programa de facturas. Senta-se ao lado, na caixa de extensões.",
      "Intelligence does not replace the invoicing program. It sits beside it, in the extensions box.",
      "L'intelligence ne remplace pas le programme de factures. Elle s'assoit à côté, dans la boîte d'extensions.",
      "Intelligenz ersetzt das Rechnungsprogramm nicht. Sie sitzt daneben, in der Erweiterungsbox.",
      "La inteligencia no sustituye el programa de facturas. Se sienta al lado, en la caja de extensiones.",
    ),
    footnote: foot,
    width: 980,
    height: 480,
    nodes: [
      card("n-user", "A pessoa", 40, 180, "sap-start", "lob", { w: 160, h: 64 }),
      g("g-ai", "Caixa de extensões", 240, 60, 340, 340, "plataforma"),
      title("t-ai", "Caixa de extensões (BTP)", "g-ai", 340),
      card("n-aif", "AI Foundation", 16, 48, "ai-foundation", "plataforma", {
        parentId: "g-ai",
        sub: "O sítio dos modelos.",
        w: 308,
        h: 70,
      }),
      card("n-js", "Joule Studio", 16, 136, "joule-studio", "plataforma", {
        parentId: "g-ai",
        sub: "Montar assistentes à medida.",
        w: 308,
        h: 70,
      }),
      card("n-kg", "Grafo de conhecimento", 16, 224, "knowledge-graph", "dados", {
        parentId: "g-ai",
        sub: "O mapa do que a empresa sabe.",
        w: 308,
        h: 70,
      }),
      card("n-erp", "O programa de facturas", 640, 180, "s4hana", "core", { w: 260, h: 72 }),
    ],
    edges: [
      e("n-user", "n-aif", "pergunta", "nativo", { animated: true, number: 1, sh: "sr", th: "tl" }),
      e("n-aif", "n-erp", "consulta", "cleancore", { animated: true, number: 2, sh: "sr", th: "tl" }),
    ],
  },
  {
    id: "bpa",
    domain: "appdev",
    title: loc(
      "Como um processo corre sozinho",
      "How a process runs on its own",
      "Comment un processus tourne tout seul",
      "Wie ein Prozess von allein läuft",
      "Cómo un proceso corre solo",
    ),
    subtitle: loc(
      "Uma aprovação, um aviso, uma factura — sem a pessoa clicar em tudo.",
      "An approval, a notice, an invoice — without the person clicking everything.",
      "Une approbation, un avis, une facture — sans que la personne clique partout.",
      "Eine Freigabe, ein Hinweis, eine Rechnung — ohne dass die Person alles klickt.",
      "Una aprobación, un aviso, una factura — sin que la persona pulse todo.",
    ),
    footnote: foot,
    width: 1000,
    height: 500,
    nodes: [
      card("n-trig", "Acontece uma coisa", 40, 180, "s4hana", "core", {
        sub: "Chegou uma factura de fornecedor.",
        w: 210,
        h: 80,
      }),
      g("g-auto", "Automação (Build)", 290, 70, 320, 320, "plataforma"),
      title("t-auto", "Automação (Build)", "g-auto", 320),
      card("n-bpa", "O fluxo", 16, 48, "build", "plataforma", {
        parentId: "g-auto",
        sub: "Passos, aprovações, prazos.",
        sapTerm: "SAP Build Process Automation",
        w: 288,
        h: 80,
      }),
      card("n-inbox", "A caixa da pessoa", 16, 148, "sap-start", "plataforma", {
        parentId: "g-auto",
        sub: "«Aprova ou recusa.»",
        w: 288,
        h: 70,
      }),
      card("n-pay", "O pagamento corre", 680, 180, "s4hana", "core", {
        sub: "Depois da aprovação.",
        w: 240,
        h: 80,
      }),
    ],
    edges: [
      e("n-trig", "n-bpa", "dispara", "nativo", { animated: true, number: 1, sh: "sr", th: "tl" }),
      e("n-bpa", "n-inbox", "pede aprovação", "nativo", { animated: true, number: 2, sh: "b", th: "t" }),
      e("n-bpa", "n-pay", "depois, paga", "cleancore", { animated: true, number: 3, sh: "sr", th: "tl" }),
    ],
  },
];

export const EXPERT_BY_ID: Record<string, Schematic> = Object.fromEntries(
  EXPERT_SCHEMATICS.map((s) => [s.id, s]),
);
