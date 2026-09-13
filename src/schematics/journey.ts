import { floorTitle, growInternetCard, l0CardsFor, type L0Band, type L0Card } from "@/data/l0";
import { HOPS, ROLES, TEMPLATE_BY_ID } from "@/data/templates";
import type {
  Camada,
  EdgeKind,
  InfraChoice,
  Lang,
  Preset,
  Profile,
  Schematic,
  SchematicEdge,
  SchematicFocus,
  SchematicNode,
  TemplateId,
} from "@/data/types";
import { loc, pick } from "@/i18n/loc";

export interface JourneyInput {
  lang: Lang;
  preset: Preset;
  infra: InfraChoice;
  template: TemplateId;
  caminhoMinimo: boolean;
  profiles: Profile[];
  focus: SchematicFocus;
}

function group(
  id: string,
  label: string,
  x: number,
  y: number,
  w: number,
  h: number,
  camada: Camada,
  zoomTarget?: SchematicFocus,
): SchematicNode {
  return {
    id,
    type: "group",
    position: { x, y },
    style: { width: w, height: h },
    data: { label, camada, kind: "group", zoomTarget },
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

function card(opts: {
  id: string;
  label: string;
  sub?: string;
  sapTerm?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  serviceId?: string;
  camada: Camada;
  parentId?: string;
  kind?: SchematicNode["data"]["kind"];
  icon?: string;
  muted?: boolean;
  badge?: string;
  hopId?: string;
}): SchematicNode {
  return {
    id: opts.id,
    type: "sapCard",
    parentId: opts.parentId,
    extent: opts.parentId ? "parent" : undefined,
    position: { x: opts.x, y: opts.y },
    style: { width: opts.w, height: opts.h },
    data: {
      label: opts.label,
      sub: opts.sub,
      sapTerm: opts.sapTerm,
      serviceId: opts.serviceId,
      camada: opts.camada,
      kind: opts.kind ?? "product",
      icon: opts.icon,
      muted: opts.muted,
      badge: opts.badge,
      hopId: opts.hopId,
    },
  };
}

function edge(
  source: string,
  target: string,
  label: string,
  kind: EdgeKind,
  extra?: {
    animated?: boolean;
    dashed?: boolean;
    number?: number;
    sh?: string;
    th?: string;
    dy?: number;
    dx?: number;
  },
): SchematicEdge {
  return {
    id: `${source}->${target}`,
    source,
    target,
    label,
    kind,
    animated: extra?.animated,
    dashed: extra?.dashed,
    number: extra?.number,
    sourceHandle: extra?.sh,
    targetHandle: extra?.th,
    labelOffset: extra?.dy,
    labelDx: extra?.dx,
  };
}

function coreCopy(preset: Preset) {
  if (preset === "cloud") {
    return {
      label: loc(
        "O programa de facturas e stock",
        "The invoicing and stock program",
        "Le programme de factures et de stock",
        "Das Programm für Rechnungen und Bestand",
        "El programa de facturas y stock",
      ),
      sub: loc(
        "S/4 Cloud Public — a SAP opera, tu usas o standard.",
        "S/4 Cloud Public — SAP operates it, you use the standard.",
        "S/4 Cloud Public — SAP l'opère, tu utilises le standard.",
        "S/4 Cloud Public — SAP betreibt, du nutzt den Standard.",
        "S/4 Cloud Public — SAP opera, tú usas el estándar.",
      ),
      sapTerm: "S/4HANA Cloud Public Edition",
      serviceId: "s4hana",
    };
  }
  if (preset === "onprem") {
    return {
      label: loc(
        "O programa em casa",
        "The program at home",
        "Le programme à la maison",
        "Das Programm zu Hause",
        "El programa en casa",
      ),
      sub: loc(
        "ECC ou S/4 no quarto dos servidores da empresa.",
        "ECC or S/4 in the company’s server room.",
        "ECC ou S/4 dans la salle des serveurs de l'entreprise.",
        "ECC oder S/4 im Serverraum der Firma.",
        "ECC o S/4 en el cuarto de servidores de la empresa.",
      ),
      sapTerm: "ECC / S/4 any-premise",
      serviceId: "s4-any",
    };
  }
  return {
    label: loc(
      "O mesmo programa, operado pela SAP",
      "The same program, operated by SAP",
      "Le même programme, opéré par SAP",
      "Dasselbe Programm, von SAP betrieben",
      "El mismo programa, operado por SAP",
    ),
    sub: loc(
      "S/4 Private — o âmbito de casa, com operação SAP.",
      "S/4 Private — home scope, with SAP operations.",
      "S/4 Private — le périmètre de la maison, avec opération SAP.",
      "S/4 Private — der Haus-Umfang, mit SAP-Betrieb.",
      "S/4 Private — el ámbito de casa, con operación SAP.",
    ),
    sapTerm: "S/4HANA Cloud Private Edition",
    serviceId: "s4hana",
  };
}

function presetWord(preset: Preset, lang: Lang): string {
  if (preset === "cloud") return { pt: "GROW", en: "GROW", fr: "GROW", de: "GROW", es: "GROW" }[lang];
  if (preset === "onprem") {
    return { pt: "On-prem", en: "On-prem", fr: "On-prem", de: "On-Prem", es: "On-prem" }[lang];
  }
  return "RISE";
}

function infraWord(infra: InfraChoice, preset: Preset): string {
  if (preset === "onprem") return "DC";
  if (infra === "sci") return "SCI";
  if (infra === "aws") return "AWS";
  if (infra === "gcp") return "GCP";
  return "Azure";
}

function idpName(infra: InfraChoice, lang: Lang): { label: string; sub: string; sapTerm: string } {
  if (infra === "aws") {
    return {
      label: pick(
        loc("IAM Identity Center", "IAM Identity Center", "IAM Identity Center", "IAM Identity Center", "IAM Identity Center"),
        lang,
      ),
      sub: pick(
        loc(
          "Quem a empresa diz que tu és (AWS).",
          "Who the company says you are (AWS).",
          "Qui l'entreprise dit que tu es (AWS).",
          "Wen die Firma sagt, dass du bist (AWS).",
          "Quién dice la empresa que eres (AWS).",
        ),
        lang,
      ),
      sapTerm: "Corporate IdP",
    };
  }
  if (infra === "gcp") {
    return {
      label: pick(
        loc("Cloud Identity", "Cloud Identity", "Cloud Identity", "Cloud Identity", "Cloud Identity"),
        lang,
      ),
      sub: pick(
        loc(
          "Quem a empresa diz que tu és (Google).",
          "Who the company says you are (Google).",
          "Qui l'entreprise dit que tu es (Google).",
          "Wen die Firma sagt, dass du bist (Google).",
          "Quién dice la empresa que eres (Google).",
        ),
        lang,
      ),
      sapTerm: "Corporate IdP",
    };
  }
  return {
    label: pick(
      loc("Microsoft Entra ID", "Microsoft Entra ID", "Microsoft Entra ID", "Microsoft Entra ID", "Microsoft Entra ID"),
      lang,
    ),
    sub: pick(
      loc(
        "Quem a empresa diz que tu és. Não substitui o porteiro.",
        "Who the company says you are. Does not replace the porter.",
        "Qui l'entreprise dit que tu es. Ne remplace pas le portier.",
        "Wen die Firma sagt, dass du bist. Ersetzt den Pförtner nicht.",
        "Quién dice la empresa que eres. No sustituye al portero.",
      ),
      lang,
    ),
    sapTerm: "Corporate IdP",
  };
}

export function buildJourney(input: JourneyInput): Schematic {
  const { lang, preset, infra, template, caminhoMinimo, profiles } = input;
  const tpl = TEMPLATE_BY_ID[template];
  const nodes: SchematicNode[] = [];
  const edges: SchematicEdge[] = [];
  const regulado = profiles.includes("regulado") || template === "J";

  const peopleW = 184;
  const porterW = 256;
  const workW = 500;
  const sideW = 220;
  const colGap = 16;
  const peopleX = 16;
  const porterX = peopleX + peopleW + colGap;
  const workX = porterX + porterW + colGap;
  const sideX = workX + workW + colGap;
  const topY = 72;
  const boxH = 400;
  const insideH = 210;
  const insideY = topY + boxH + 18;
  const floorY = insideY + insideH + 18;
  const canvasW = sideX + sideW + 20;

  const peopleLabel = pick(
    loc("Quem trabalha", "Who works", "Qui travaille", "Wer arbeitet", "Quién trabaja"),
    lang,
  );
  const porterLabel = pick(
    loc("O porteiro", "The porter", "Le portier", "Der Pförtner", "El portero"),
    lang,
  );
  const workLabel = pick(
    loc(
      "CORE · ERP (o núcleo)",
      "CORE · ERP (the core)",
      "CORE · ERP (le noyau)",
      "CORE · ERP (der Kern)",
      "CORE · ERP (el núcleo)",
    ),
    lang,
  );
  const legalLabel = pick(
    loc("Factura legal", "Legal invoice", "Facture légale", "Legale Rechnung", "Factura legal"),
    lang,
  );
  const mailLabel = pick(
    loc("O correio entre sistemas", "Mail between systems", "Le courrier entre systèmes", "Die Post zwischen Systemen", "El correo entre sistemas"),
    lang,
  );
  const towerLabel = pick(
    loc("A torre de controlo", "The control tower", "La tour de contrôle", "Der Kontrollturm", "La torre de control"),
    lang,
  );
  const insideLabel = pick(
    loc(
      "Como está ligado por dentro",
      "How it is wired inside",
      "Comment c'est branché dedans",
      "Wie es innen verdrahtet ist",
      "Cómo está cableado por dentro",
    ),
    lang,
  );

  nodes.push(group("g-people", peopleLabel, peopleX, topY, peopleW, boxH, "lob"));
  nodes.push(title("t-people", peopleLabel, "g-people", peopleW));
  nodes.push(group("g-porter", porterLabel, porterX, topY, porterW, boxH, "plataforma", "porter"));
  nodes.push(title("t-porter", porterLabel, "g-porter", porterW));
  nodes.push(group("g-work", workLabel, workX, topY, workW, boxH, "core"));
  nodes.push(title("t-work", workLabel, "g-work", workW));
  nodes.push(group("g-tower", towerLabel, workX, 12, workW, 64, "alm"));

  const showLegal = tpl.needsDrc;
  if (showLegal) {
    nodes.push(group("g-legal", legalLabel, sideX, topY, sideW, 140, "core"));
    nodes.push(title("t-legal", legalLabel, "g-legal", sideW));
  }
  nodes.push(group("g-mail", mailLabel, sideX, showLegal ? topY + 148 : topY, sideW, showLegal ? boxH - 148 : boxH, "integracao", "mail"));
  nodes.push(title("t-mail", mailLabel, "g-mail", sideW));

  nodes.push(group("g-inside", insideLabel, peopleX, insideY, canvasW - 40, insideH, "plataforma"));
  nodes.push(title("t-inside", insideLabel, "g-inside", canvasW - 40));

  const floorLoc = floorTitle(preset, infra);

  // Actors
  const roleIds = tpl.roles;
  roleIds.forEach((rid, i) => {
    const r = ROLES[rid];
    if (!r) return;
    nodes.push(
      card({
        id: `actor-${rid}`,
        label: pick(r.label, lang),
        sub: pick(r.sub, lang),
        x: 12,
        y: 48 + i * 76,
        w: peopleW - 24,
        h: 66,
        camada: "lob",
        parentId: "g-people",
        kind: "actor",
        icon: r.icon,
        serviceId: rid === "ti" ? "ias" : "sap-start",
      }),
    );
  });

  // Porter interior
  const menuId = preset === "onprem" ? "fiori" : "sap-start";
  const menuLabel =
    preset === "onprem"
      ? pick(loc("O menu (Fiori / GUI)", "The menu (Fiori / GUI)", "Le menu (Fiori / GUI)", "Das Menü (Fiori / GUI)", "El menú (Fiori / GUI)"), lang)
      : pick(loc("O menu (SAP Start)", "The menu (SAP Start)", "Le menu (SAP Start)", "Das Menü (SAP Start)", "El menú (SAP Start)"), lang);
  nodes.push(
    card({
      id: "n-menu",
      label: menuLabel,
      sub: pick(
        loc("Por onde a pessoa entra no trabalho.", "Where the person enters the work.", "Par où la personne entre dans le travail.", "Wo die Person in die Arbeit eintritt.", "Por donde la persona entra al trabajo."),
        lang,
      ),
      sapTerm: preset === "onprem" ? "SAP Fiori / SAP GUI" : "SAP Start / Fiori",
      x: 12,
      y: 40,
      w: porterW - 24,
      h: 58,
      serviceId: menuId,
      camada: "plataforma",
      parentId: "g-porter",
      kind: "porter",
    }),
  );

  if (preset === "onprem") {
    nodes.push(
      card({
        id: "n-auth",
        label: pick(
          loc("Login local / Gateway", "Local login / Gateway", "Login local / Gateway", "Lokales Login / Gateway", "Login local / Gateway"),
          lang,
        ),
        sub: pick(
          loc("Destino = o porteiro cloud (IAS), quando saíres.", "Destination = the cloud porter (IAS), when you leave.", "Destination = le portier cloud (IAS), quand tu sors.", "Ziel = der Cloud-Pförtner (IAS), wenn du gehst.", "Destino = el portero cloud (IAS), cuando salgas."),
          lang,
        ),
        sapTerm: "SAP Gateway",
        x: 12,
        y: 108,
        w: porterW - 24,
        h: 62,
        serviceId: "netweaver",
        camada: "core",
        parentId: "g-porter",
        kind: "porter",
      }),
    );
  } else {
    nodes.push(
      card({
        id: "n-auth",
        label: pick(
          loc("Autenticação", "Authentication", "Authentification", "Authentifizierung", "Autenticación"),
          lang,
        ),
        sub: pick(
          loc("Quem entra e com que chave.", "Who comes in and with which key.", "Qui entre et avec quelle clé.", "Wer kommt rein und mit welchem Schlüssel.", "Quién entra y con qué clave."),
          lang,
        ),
        sapTerm: "Identity Authentication",
        x: 12,
        y: 108,
        w: porterW - 24,
        h: 58,
        serviceId: "ias",
        camada: "plataforma",
        parentId: "g-porter",
        kind: "porter",
      }),
    );
  }

  nodes.push(
    card({
      id: "n-dir",
      label: pick(loc("Lista de pessoas", "People list", "Liste des personnes", "Personenliste", "Lista de personas"), lang),
      sub: pick(
        loc("O directório: quem existe neste programa.", "The directory: who exists in this program.", "L'annuaire : qui existe dans ce programme.", "Das Verzeichnis: wer in diesem Programm existiert.", "El directorio: quién existe en este programa."),
        lang,
      ),
      sapTerm: "Identity Directory",
      x: 14,
      y: 176,
      w: porterW - 28,
      h: 70,
      serviceId: "ias",
      camada: "plataforma",
      parentId: "g-porter",
      kind: "porter",
    }),
  );
  nodes.push(
    card({
      id: "n-prov",
      label: pick(loc("Provisão de contas", "Account provisioning", "Provision des comptes", "Kontenbereitstellung", "Provisión de cuentas"), lang),
      sub: pick(
        loc("Cria e desliga contas nos programas.", "Creates and disables accounts in the programs.", "Crée et désactive les comptes dans les programmes.", "Legt Konten in den Programmen an und sperrt sie.", "Crea y desactiva cuentas en los programas."),
        lang,
      ),
      sapTerm: "Identity Provisioning",
      x: 14,
      y: 244,
      w: porterW - 28,
      h: 70,
      serviceId: "ias",
      camada: "plataforma",
      parentId: "g-porter",
      kind: "porter",
    }),
  );

  const idp = idpName(infra, lang);
  nodes.push(
    card({
      id: "n-idp",
      label: idp.label,
      sub: idp.sub,
      sapTerm: idp.sapTerm,
      x: 14,
      y: 312,
      w: porterW - 28,
      h: 70,
      serviceId: "ias",
      camada: "infra",
      parentId: "g-porter",
      kind: "porter",
    }),
  );

  // Work core + hops
  const core = coreCopy(preset);
  nodes.push(
    card({
      id: "n-core",
      label: pick(core.label, lang),
      sub: pick(core.sub, lang),
      sapTerm: core.sapTerm,
      x: 12,
      y: 38,
      w: workW - 24,
      h: 58,
      serviceId: core.serviceId,
      camada: "core",
      parentId: "g-work",
      kind: "product",
      badge: pick(
        loc("CORE · ERP", "CORE · ERP", "CORE · ERP", "CORE · ERP", "CORE · ERP"),
        lang,
      ),
    }),
  );

  const hopIds = tpl.hops.filter((id) => HOPS[id]);
  const hopCols = hopIds.length > 6 ? 3 : 2;
  const hopGap = 8;
  const hopW = (workW - 24 - hopGap * (hopCols - 1)) / hopCols;
  hopIds.forEach((hid, i) => {
    const h = HOPS[hid];
    const col = i % hopCols;
    const row = Math.floor(i / hopCols);
    nodes.push(
      card({
        id: `hop-${hid}`,
        label: pick(h.label, lang),
        sub: pick(h.sub, lang),
        x: 12 + col * (hopW + hopGap),
        y: 106 + row * 56,
        w: hopW,
        h: 50,
        serviceId: h.serviceId,
        camada: h.serviceId === "document-compliance" ? "core" : h.serviceId === "s4hana" || h.serviceId === "s4-any" ? "core" : "lob",
        parentId: "g-work",
        kind: "hop",
        hopId: hid,
      }),
    );
  });

  if (tpl.needsPeople && !hopIds.includes("folha")) {
    const h = HOPS.folha;
    nodes.push(
      card({
        id: "hop-folha",
        label: pick(h.label, lang),
        sub: pick(h.sub, lang),
        x: 14,
        y: 126,
        w: hopW,
        h: 62,
        serviceId: "successfactors",
        camada: "lob",
        parentId: "g-work",
        kind: "hop",
        hopId: "folha",
      }),
    );
  }

  // Tower
  const towerA = preset === "onprem" ? "solman" : "cloud-alm";
  const towerALabel =
    preset === "onprem"
      ? pick(loc("Solution Manager", "Solution Manager", "Solution Manager", "Solution Manager", "Solution Manager"), lang)
      : pick(loc("A torre de controlo", "The control tower", "La tour de contrôle", "Der Kontrollturm", "La torre de control"), lang);
  nodes.push(
    card({
      id: "n-alm",
      label: towerALabel,
      sapTerm: preset === "onprem" ? "SAP Solution Manager" : "SAP Cloud ALM",
      x: 14,
      y: 16,
      w: 250,
      h: 36,
      serviceId: towerA,
      camada: "alm",
      parentId: "g-tower",
      kind: "product",
    }),
  );
  nodes.push(
    card({
      id: "n-forme",
      label: pick(loc("SAP for Me", "SAP for Me", "SAP for Me", "SAP for Me", "SAP for Me"), lang),
      sapTerm: "SAP for Me",
      x: 276,
      y: 16,
      w: 250,
      h: 36,
      serviceId: "sap-for-me",
      camada: "alm",
      parentId: "g-tower",
      kind: "product",
    }),
  );

  // Legal DRC
  if (showLegal) {
    nodes.push(
      card({
        id: "n-drc",
        label: pick(
          loc("Factura legal em Portugal", "Legal invoice in Portugal", "Facture légale au Portugal", "Legale Rechnung in Portugal", "Factura legal en Portugal"),
          lang,
        ),
        sub: pick(
          loc("ATCUD, QR, SAF-T. A factura não é um PDF solto.", "ATCUD, QR, SAF-T. The invoice is not a loose PDF.", "ATCUD, QR, SAF-T. La facture n'est pas un PDF isolé.", "ATCUD, QR, SAF-T. Die Rechnung ist kein loses PDF.", "ATCUD, QR, SAF-T. La factura no es un PDF suelto."),
          lang,
        ),
        sapTerm: "Document and Reporting Compliance",
        x: 14,
        y: 36,
        w: sideW - 24,
        h: 90,
        serviceId: "document-compliance",
        camada: "core",
        parentId: "g-legal",
        kind: "product",
      }),
    );
  }

  // Mail / extras
  const mailY0 = 42;
  let mailI = 0;
  const pushMail = (id: string, label: string, sub: string, sapTerm: string, serviceId: string, muted = false) => {
    nodes.push(
      card({
        id,
        label,
        sub,
        sapTerm,
        x: 14,
        y: mailY0 + mailI * 86,
        w: sideW - 28,
        h: 78,
        serviceId,
        camada: "integracao",
        parentId: "g-mail",
        kind: "product",
        muted,
      }),
    );
    mailI += 1;
  };

  const showMail =
    tpl.needsMail ||
    tpl.needsCommerce ||
    tpl.needsFsm ||
    tpl.needsAriba ||
    (preset === "rise" && !caminhoMinimo) ||
    template === "H" ||
    template === "L";

  if (!showMail && preset === "cloud") {
    pushMail(
      "n-mail-empty",
      pick(loc("Ainda não precisas", "You don’t need this yet", "Pas encore besoin", "Noch nicht nötig", "Aún no lo necesitas"), lang),
      pick(
        loc("GROW limpo: o correio entra quando houver dor (loja online, 3PL, bancos).", "Clean GROW: mail arrives when there is pain (webshop, 3PL, banks).", "GROW propre : le courrier arrive quand ça fait mal (boutique, 3PL, banques).", "Sauberes GROW: Post kommt, wenn es weh tut (Webshop, 3PL, Banken).", "GROW limpio: el correo entra cuando hay dolor (tienda, 3PL, bancos)."),
        lang,
      ),
      "Integration Suite",
      "integration-suite",
      true,
    );
  } else if (preset === "onprem") {
    pushMail(
      "n-pipo",
      pick(loc("O correio clássico", "Classic mail", "Le courrier classique", "Die klassische Post", "El correo clásico"), lang),
      pick(loc("PI/PO. Destino: Integration Suite.", "PI/PO. Destination: Integration Suite.", "PI/PO. Destination : Integration Suite.", "PI/PO. Ziel: Integration Suite.", "PI/PO. Destino: Integration Suite."), lang),
      "Process Integration / Process Orchestration",
      "pipo",
    );
  } else if (showMail) {
    pushMail(
      "n-is",
      pick(loc("O correio entre sistemas", "Mail between systems", "Le courrier entre systèmes", "Die Post zwischen Systemen", "El correo entre sistemas"), lang),
      pick(loc("Fala com a loja online, o banco, o 3PL.", "Talks to the webshop, the bank, the 3PL.", "Parle à la boutique, à la banque, au 3PL.", "Spricht mit Webshop, Bank, 3PL.", "Habla con la tienda, el banco, el 3PL."), lang),
      "Integration Suite",
      "integration-suite",
    );
  }

  if (tpl.needsCommerce) {
    pushMail(
      "n-commerce",
      pick(loc("Loja online", "Webshop", "Boutique en ligne", "Webshop", "Tienda online"), lang),
      pick(loc("O cliente encomenda aqui.", "The customer orders here.", "Le client commande ici.", "Der Kunde bestellt hier.", "El cliente pide aquí."), lang),
      "SAP Commerce Cloud",
      "commerce-cloud",
    );
  }
  if (tpl.needsFsm) {
    pushMail(
      "n-fsm",
      pick(loc("Técnico no terreno", "Field technician", "Technicien terrain", "Außendienst", "Técnico en campo"), lang),
      pick(loc("O trabalho abre no telemóvel, em casa do cliente.", "The job opens on the phone, at the customer site.", "L'intervention s'ouvre sur le téléphone, chez le client.", "Der Auftrag öffnet sich am Telefon, beim Kunden.", "El trabajo se abre en el móvil, en casa del cliente."), lang),
      "Field Service Management",
      "fsm",
    );
  }
  if (tpl.needsAriba) {
    pushMail(
      "n-ariba",
      pick(loc("Rede de fornecedores", "Supplier network", "Réseau fournisseurs", "Lieferantennetz", "Red de proveedores"), lang),
      pick(loc("O fornecedor confirma na rede, não por e-mail.", "The supplier confirms on the network, not by email.", "Le fournisseur confirme sur le réseau, pas par e-mail.", "Der Lieferant bestätigt im Netz, nicht per E-Mail.", "El proveedor confirma en la red, no por correo."), lang),
      "SAP Business Network / Ariba",
      "ariba",
    );
  }
  if (profiles.includes("spend") && !nodes.some((n) => n.id === "n-ariba")) {
    pushMail(
      "n-ariba",
      pick(loc("Rede de fornecedores", "Supplier network", "Réseau fournisseurs", "Lieferantennetz", "Red de proveedores"), lang),
      pick(loc("Este perfil (muitas compras) acrescenta Ariba ao caminho.", "This profile (lots of buying) adds Ariba to the path.", "Ce profil (beaucoup d'achats) ajoute Ariba au chemin.", "Dieses Profil (viel Einkauf) ergänzt Ariba.", "Este perfil (muchas compras) añade Ariba al camino."), lang),
      "SAP Business Network / Ariba",
      "ariba",
    );
  }
  if (profiles.includes("workforce") && !nodes.some((n) => n.id === "n-fg")) {
    pushMail(
      "n-fg",
      pick(loc("Gente externa", "External people", "Gens externes", "Externe Leute", "Gente externa"), lang),
      pick(loc("Fieldglass: quem entra a recibos, com datas e contrato.", "Fieldglass: contractors in, with dates and a contract.", "Fieldglass : les externes, avec dates et contrat.", "Fieldglass: Externe rein, mit Datum und Vertrag.", "Fieldglass: externos, con fechas y contrato."), lang),
      "SAP Fieldglass",
      "fieldglass",
    );
  }
  if (profiles.includes("industria") && !nodes.some((n) => n.id === "n-dm")) {
    pushMail(
      "n-dm",
      pick(loc("Chão de fábrica", "Shop floor", "Atelier", "Shopfloor", "Taller"), lang),
      pick(loc("Digital Manufacturing fala com as máquinas.", "Digital Manufacturing talks to the machines.", "Digital Manufacturing parle aux machines.", "Digital Manufacturing spricht mit den Maschinen.", "Digital Manufacturing habla con las máquinas."), lang),
      "SAP Digital Manufacturing",
      "digital-manufacturing",
    );
  }
  if (profiles.includes("brownfield") && !nodes.some((n) => n.id === "n-cc")) {
    pushMail(
      "n-cc",
      pick(loc("O que ficou em casa", "What stayed at home", "Ce qui est resté à la maison", "Was zu Hause blieb", "Lo que quedó en casa"), lang),
      pick(loc("Brownfield: o Connector liga o ECC que ainda corre.", "Brownfield: Connector ties in the ECC that still runs.", "Brownfield : le Connector relie l'ECC qui tourne encore.", "Brownfield: der Connector bindet das noch laufende ECC an.", "Brownfield: el Connector une el ECC que aún corre."), lang),
      "Cloud Connector",
      "cloud-connector",
    );
  }
  if (profiles.includes("regulado") && infra !== "sci") {
    pushMail(
      "n-sov",
      pick(loc("Soberania de dados", "Data sovereignty", "Souveraineté des données", "Datensouveränität", "Soberanía de datos"), lang),
      pick(loc("Este perfil aponta SCI / Sovereign Cloud no chão.", "This profile points SCI / Sovereign Cloud on the floor.", "Ce profil pointe SCI / Sovereign Cloud au sol.", "Dieses Profil zeigt SCI / Sovereign Cloud auf dem Boden.", "Este perfil apunta SCI / Sovereign Cloud en el suelo."), lang),
      "SAP Sovereign Cloud / SCI",
      "sci",
    );
  }
  if (preset === "rise" && !caminhoMinimo && !nodes.some((n) => n.id === "n-cc")) {
    pushMail(
      "n-cc",
      pick(loc("Cloud Connector", "Cloud Connector", "Cloud Connector", "Cloud Connector", "Cloud Connector"), lang),
      pick(loc("Só se ficar algo a correr em casa.", "Only if something still runs at home.", "Seulement s'il reste quelque chose à la maison.", "Nur wenn noch etwas zu Hause läuft.", "Solo si queda algo corriendo en casa."), lang),
      "Cloud Connector",
      "cloud-connector",
      true,
    );
  }
  if (tpl.needsSignavio && !caminhoMinimo) {
    pushMail(
      "n-signavio",
      pick(loc("Desenhar o processo", "Draw the process", "Dessiner le processus", "Den Prozess zeichnen", "Dibujar el proceso"), lang),
      pick(loc("Decide o to-be antes de mexer no programa.", "Decide the to-be before touching the program.", "Décide le to-be avant de toucher au programme.", "Entscheidet das To-be, bevor das Programm angefasst wird.", "Decide el to-be antes de tocar el programa."), lang),
      "Signavio",
      "signavio",
      true,
    );
  }

  // Inside — BTP, events, Joule (always on the same canvas)
  const insideInner = canvasW - 64;
  const insideCards: Array<{
    id: string;
    label: string;
    sub: string;
    sapTerm: string;
    serviceId: string;
    camada: Camada;
  }> = [
    {
      id: "n-btp",
      label: pick(loc("A caixa de extensões", "The extensions box", "La boîte d'extensions", "Die Erweiterungsbox", "La caja de extensiones"), lang),
      sub: pick(loc("À volta do ERP, sem mexer no programa de facturas.", "Around the ERP, without touching the invoicing program.", "Autour de l'ERP, sans toucher au programme de factures.", "Um das ERP, ohne das Rechnungsprogramm anzufassen.", "Alrededor del ERP, sin tocar el programa de facturas."), lang),
      sapTerm: "SAP BTP",
      serviceId: "btp",
      camada: "plataforma",
    },
    {
      id: "n-build",
      label: pick(loc("Construir à volta", "Build around it", "Construire autour", "Darum bauen", "Construir alrededor"), lang),
      sub: pick(loc("Apps e automações que não abrem o cofre.", "Apps and automations that do not open the vault.", "Apps et automatisations qui n'ouvrent pas le coffre.", "Apps und Automatisierung, die den Tresor nicht öffnen.", "Apps y automatizaciones que no abren la caja."), lang),
      sapTerm: "SAP Build",
      serviceId: "build",
      camada: "plataforma",
    },
    {
      id: "n-abap",
      label: pick(loc("ABAP na nuvem", "ABAP in the cloud", "ABAP dans le cloud", "ABAP in der Cloud", "ABAP en la nube"), lang),
      sub: pick(loc("Código clássico, sítio novo.", "Classic code, new place.", "Code classique, nouvel endroit.", "Klassischer Code, neuer Ort.", "Código clásico, sitio nuevo."), lang),
      sapTerm: "ABAP Environment",
      serviceId: "abap-env",
      camada: "plataforma",
    },
    {
      id: "n-dest",
      label: pick(loc("A porta da API", "The API door", "La porte API", "Die API-Tür", "La puerta de la API"), lang),
      sub: pick(loc("A extensão bate à porta, não entra no cofre.", "The extension knocks; it does not enter the vault.", "L'extension frappe à la porte, elle n'entre pas dans le coffre.", "Die Erweiterung klopft; sie geht nicht in den Tresor.", "La extensión llama a la puerta, no entra en la caja."), lang),
      sapTerm: "Destination / API S/4",
      serviceId: "s4hana",
      camada: "core",
    },
    {
      id: "n-mesh",
      label: pick(loc("Central de avisos", "Notice board", "Tableau d'avis", "Anschlagbrett", "Central de avisos"), lang),
      sub: pick(loc("Quando nasce uma encomenda, avisa os outros.", "When an order is born, it tells the others.", "Quand une commande naît, elle prévient les autres.", "Wenn ein Auftrag entsteht, sagt er es den anderen.", "Cuando nace un pedido, avisa a los otros."), lang),
      sapTerm: "Event Mesh",
      serviceId: "event-mesh",
      camada: "integracao",
    },
    {
      id: "n-joule",
      label: pick(loc("Perguntar em linguagem natural", "Ask in plain language", "Demander en langage naturel", "In Alltagssprache fragen", "Preguntar en lenguaje natural"), lang),
      sub: pick(loc("Joule lê o contexto da pessoa e só mostra o que ela pode ver.", "Joule reads the person’s context and only shows what they may see.", "Joule lit le contexte de la personne et ne montre que ce qu'elle peut voir.", "Joule liest den Kontext und zeigt nur, was sie sehen darf.", "Joule lee el contexto de la persona y solo muestra lo que puede ver."), lang),
      sapTerm: "Joule / AI Foundation",
      serviceId: "joule",
      camada: "plataforma",
    },
  ];
  const iCols = insideCards.length;
  const iGap = 8;
  const iW = Math.floor((insideInner - iGap * (iCols - 1)) / iCols);
  insideCards.forEach((c, i) => {
    nodes.push(
      card({
        id: c.id,
        label: c.label,
        sub: c.sub,
        sapTerm: c.sapTerm,
        x: 14 + i * (iW + iGap),
        y: 44,
        w: iW,
        h: 148,
        serviceId: c.serviceId,
        camada: c.camada,
        parentId: "g-inside",
        kind: "product",
      }),
    );
  });

  // L0 floor — always the full floor for this mix (no hidden family)
  let l0list: L0Card[] = l0CardsFor(preset, infra, false, regulado);
  if (preset === "cloud") {
    l0list = [growInternetCard(), ...l0list.filter((c) => c.grow !== false && !c.id.includes("spoke") && !c.id.includes("hana"))];
  }
  const BANDS: { id: L0Band; title: ReturnType<typeof loc> }[] = [
    {
      id: "bridge",
      title: loc("A ponte — do escritório", "The bridge — from the office", "Le pont — du bureau", "Die Brücke — vom Büro", "El puente — de la oficina"),
    },
    {
      id: "hub",
      title: loc("A rotunda", "The roundabout", "Le rond-point", "Der Kreisverkehr", "La rotonda"),
    },
    {
      id: "spoke",
      title: loc("O sítio SAP", "The SAP place", "L'endroit SAP", "Der SAP-Ort", "El sitio SAP"),
    },
    {
      id: "guard",
      title: loc("Quem vigia a nuvem", "Who watches the cloud", "Qui surveille le cloud", "Wer die Cloud bewacht", "Quién vigila la nube"),
    },
  ];
  const grouped = BANDS.map((b) => ({ ...b, cards: l0list.filter((c) => c.band === b.id) })).filter((b) => b.cards.length > 0);
  const rows = Math.max(1, ...grouped.map((b) => b.cards.length));
  const floorH = 40 + 22 + rows * 78 + 16;
  nodes.push(group("g-floor", pick(floorLoc, lang), peopleX, floorY, canvasW - 40, floorH, "infra", "floor"));
  nodes.push(title("t-floor", pick(floorLoc, lang), "g-floor", canvasW - 40));
  const colW = grouped.length ? Math.floor((canvasW - 64 - (grouped.length - 1) * 10) / grouped.length) : canvasW - 64;
  grouped.forEach((band, bi) => {
    const x0 = 14 + bi * (colW + 10);
    nodes.push({
      id: `l0-band-${band.id}`,
      type: "sapLabel",
      parentId: "g-floor",
      extent: "parent",
      position: { x: x0, y: 38 },
      style: { width: colW, height: 20 },
      data: { label: pick(band.title, lang), kind: "groupTitle" },
    });
    band.cards.forEach((c, i) => {
      nodes.push(
        card({
          id: `l0-${c.id}`,
          label: pick(c.product, lang),
          sub: pick(c.human, lang),
          sapTerm: pick(c.product, lang),
          x: x0,
          y: 60 + i * 78,
          w: colW,
          h: 72,
          serviceId: c.serviceId,
          camada: "infra",
          parentId: "g-floor",
          kind: "l0",
          badge: c.id.includes("spoke")
            ? pick(loc("gerido pela SAP", "SAP-managed", "géré par SAP", "von SAP betrieben", "gestionado por SAP"), lang)
            : undefined,
        }),
      );
    });
  });
  const canvasH = floorY + floorH + 24;

  // Numbered journey
  const firstActor = `actor-${roleIds[0]}`;
  const runsHere = pick(
    loc("isto corre aqui", "this runs here", "ça tourne ici", "das läuft hier", "esto corre aquí"),
    lang,
  );
  edges.push(edge(firstActor, "n-menu", pick(loc("abre o menu", "opens the menu", "ouvre le menu", "öffnet das Menü", "abre el menú"), lang), "nativo", { animated: true, number: 1, sh: "sr", th: "tl" }));
  edges.push(edge("n-menu", "n-auth", "SSO", "nativo", { animated: true, number: 2, sh: "b", th: "t" }));
  edges.push(edge("n-idp", "n-auth", pick(loc("login delegado", "delegated login", "login délégué", "delegiertes Login", "login delegado"), lang), "cleancore", { dashed: true, sh: "st", th: "tb" }));
  edges.push(edge("n-auth", "n-dir", pick(loc("persistir dados", "persist data", "persister les données", "Daten halten", "persistir datos"), lang), "nativo", { sh: "b", th: "t" }));
  edges.push(edge("n-dir", "n-prov", pick(loc("cria / desliga contas", "creates / disables accounts", "crée / désactive les comptes", "legt an / sperrt Konten", "crea / desactiva cuentas"), lang), "nativo", { sh: "b", th: "t" }));
  edges.push(edge("n-auth", "n-core", pick(loc("entra reconhecido", "enters recognised", "entre reconnu", "tritt erkannt ein", "entra reconocido"), lang), "nativo", { animated: true, number: 3, sh: "sr", th: "tl" }));

  const hopFactura = hopIds.includes("factura") ? "hop-factura" : hopIds[0] ? `hop-${hopIds[0]}` : "n-core";
  if (hopIds[0]) {
    edges.push(edge("n-core", `hop-${hopIds[0]}`, pick(loc("trabalho do dia", "the day’s work", "le travail du jour", "die Tagesarbeit", "el trabajo del día"), lang), "nativo", { animated: true, number: 4, sh: "b", th: "t" }));
  }
  if (showLegal && hopIds.includes("factura")) {
    edges.push(edge("hop-factura", "n-drc", pick(loc("torna a factura legal", "makes the invoice legal", "rend la facture légale", "macht die Rechnung legal", "hace legal la factura"), lang), "nativo", { animated: true, number: 5, sh: "sr", th: "tl" }));
  } else if (showLegal) {
    edges.push(edge("n-core", "n-drc", pick(loc("torna a factura legal", "makes the invoice legal", "rend la facture légale", "macht die Rechnung legal", "hace legal la factura"), lang), "nativo", { animated: true, number: 5, sh: "sr", th: "tl" }));
  }
  edges.push(edge("n-core", "n-alm", pick(loc("vigia o sistema", "watches the system", "surveille le système", "überwacht das System", "vigila el sistema"), lang), "governa", { animated: true, number: 6, sh: "st", th: "tb" }));

  const spoke = nodes.find((n) => n.id.startsWith("l0-") && (n.id.includes("spoke") || n.id.includes("sci-net") || n.id.includes("op-dc") || n.id.includes("grow-net")));
  const floorTarget = spoke?.id ?? nodes.find((n) => n.id.startsWith("l0-"))?.id;
  if (floorTarget) {
    edges.push(edge("n-core", floorTarget, runsHere, "rede", { animated: true, number: 7, sh: "b", th: "t" }));
  }

  const otherActors = roleIds.slice(1);
  otherActors.forEach((rid) => {
    edges.push(edge(`actor-${rid}`, "n-menu", "", "nativo", { sh: "sr", th: "tl" }));
  });

  if (nodes.some((n) => n.id === "n-is")) {
    edges.push(edge("n-core", "n-is", pick(loc("avisar os outros", "tell the others", "prévenir les autres", "die anderen informieren", "avisar a los otros"), lang), "cleancore", { sh: "sr", th: "tl" }));
  }
  if (nodes.some((n) => n.id === "n-cc")) {
    const ccTarget = floorTarget ?? "n-core";
    edges.push(edge("n-cc", ccTarget, pick(loc("o que ficou em casa", "what stayed at home", "ce qui est resté à la maison", "was zu Hause blieb", "lo que quedó en casa"), lang), "rede"));
  }
  edges.push(edge("n-core", "n-btp", pick(loc("extensões à volta", "extensions around", "extensions autour", "Erweiterungen darum", "extensiones alrededor"), lang), "cleancore", { sh: "b", th: "t" }));
  edges.push(edge("n-build", "n-dest", pick(loc("pede, não altera", "asks, does not change", "demande, ne change pas", "fragt, ändert nicht", "pide, no cambia"), lang), "cleancore", { sh: "sr", th: "tl" }));
  edges.push(edge("n-dest", "n-core", pick(loc("bate à porta do cofre", "knocks on the vault door", "frappe à la porte du coffre", "klopft an die Tresor-Tür", "llama a la puerta de la caja"), lang), "cleancore", { sh: "st", th: "tb" }));
  edges.push(edge("n-core", "n-mesh", pick(loc("aviso", "notice", "avis", "Hinweis", "aviso"), lang), "cleancore", { sh: "b", th: "t" }));
  edges.push(edge("n-joule", "n-menu", pick(loc("pergunta no menu", "asks in the menu", "demande dans le menu", "fragt im Menü", "pregunta en el menú"), lang), "nativo", { sh: "st", th: "tb" }));

  const mixName = `${presetWord(preset, lang)} · ${infraWord(infra, preset)} · ${pick(tpl.nome, lang)}`;
  const titleMap = loc(
    `Do portátil ao chão · por dentro · onde corre — ${mixName}`,
    `Laptop to the floor · inside · where it runs — ${mixName}`,
    `Du portable au sol · dedans · où ça tourne — ${mixName}`,
    `Vom Laptop zum Boden · innen · wo es läuft — ${mixName}`,
    `Del portátil al suelo · por dentro · dónde corre — ${mixName}`,
  );
  const subtitleMap = loc(
    "Tudo no mesmo desenho: quem trabalha, o porteiro, o núcleo, como está ligado por dentro, e o chão onde corre. Setas numeradas = ordem.",
    "All in one drawing: who works, the porter, the core, how it is wired inside, and the floor where it runs. Numbered arrows = order.",
    "Tout dans le même dessin : qui travaille, le portier, le noyau, le câblage intérieur, et le sol où ça tourne. Flèches numérotées = ordre.",
    "Alles in einer Zeichnung: wer arbeitet, der Pförtner, der Kern, die Innenverdrahtung und der Boden. Nummerierte Pfeile = Reihenfolge.",
    "Todo en el mismo dibujo: quién trabaja, el portero, el núcleo, cómo está cableado por dentro, y el suelo donde corre. Flechas numeradas = orden.",
  );
  const foot = loc(
    "Clica num contentor para o pormenor. Clica num cartão para o significado. Sem logótipo SAP — desenho pedagógico.",
    "Click a container for detail. Click a card for meaning. No SAP logo — a teaching drawing.",
    "Cliquez un conteneur pour le détail. Cliquez une carte pour le sens. Pas de logo SAP — dessin pédagogique.",
    "Klicken Sie einen Behälter für das Detail. Klicken Sie eine Karte für die Bedeutung. Kein SAP-Logo — Lehrzeichnung.",
    "Pulsa un contenedor para el detalle. Pulsa una tarjeta para el significado. Sin logotipo SAP — dibujo pedagógico.",
  );

  void hopFactura;

  return {
    id: "journey",
    domain: "journey",
    hyperscaler: preset === "onprem" ? "onprem" : infra,
    title: titleMap,
    subtitle: subtitleMap,
    footnote: foot,
    nodes,
    edges,
    width: canvasW,
    height: canvasH,
  };
}
