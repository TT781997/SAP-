import { loc, type Loc } from "@/i18n/loc";
import type { InfraChoice, Preset } from "./types";

export type L0Band = "bridge" | "hub" | "spoke" | "guard";

export interface L0Card {
  id: string;
  band: L0Band;
  product: Loc;
  human: Loc;
  serviceId: string;
  minPath: boolean;
  grow?: boolean;
  rise?: boolean;
  onprem?: boolean;
  regulado?: boolean;
}

const azure: L0Card[] = [
  {
    id: "az-er",
    band: "bridge",
    product: loc("Azure ExpressRoute", "Azure ExpressRoute", "Azure ExpressRoute", "Azure ExpressRoute", "Azure ExpressRoute"),
    human: loc(
      "O fio dedicado do escritório até à Azure. Primeira escolha.",
      "The dedicated wire from the office to Azure. First choice.",
      "Le fil dédié du bureau jusqu'à Azure. Premier choix.",
      "Die dedizierte Leitung vom Büro nach Azure. Erste Wahl.",
      "El cable dedicado de la oficina a Azure. Primera elección.",
    ),
    serviceId: "azure",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "az-vpn",
    band: "bridge",
    product: loc("VPN Gateway", "VPN Gateway", "VPN Gateway", "VPN Gateway", "VPN Gateway"),
    human: loc(
      "Túnel de reserva. Plano B se o fio cair.",
      "Backup tunnel. Plan B if the wire drops.",
      "Tunnel de secours. Plan B si le fil tombe.",
      "Reservetunnel. Plan B, wenn die Leitung ausfällt.",
      "Túnel de reserva. Plan B si el cable cae.",
    ),
    serviceId: "azure",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "az-hub",
    band: "hub",
    product: loc("Virtual Network (hub)", "Virtual Network (hub)", "Virtual Network (hub)", "Virtual Network (Hub)", "Virtual Network (hub)"),
    human: loc(
      "A rotunda. Tudo passa aqui antes do SAP.",
      "The roundabout. Everything passes here before SAP.",
      "Le rond-point. Tout passe ici avant SAP.",
      "Der Kreisverkehr. Alles läuft hier vor SAP durch.",
      "La rotonda. Todo pasa aquí antes de SAP.",
    ),
    serviceId: "azure",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "az-fw",
    band: "hub",
    product: loc("Azure Firewall", "Azure Firewall", "Azure Firewall", "Azure Firewall", "Azure Firewall"),
    human: loc(
      "Olha para o trânsito entre casa, hub e spoke.",
      "Watches traffic between home, hub and spoke.",
      "Regarde le trafic entre maison, hub et spoke.",
      "Schaut auf den Verkehr zwischen Haus, Hub und Spoke.",
      "Mira el tráfico entre casa, hub y spoke.",
    ),
    serviceId: "azure",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "az-agw",
    band: "hub",
    product: loc(
      "Application Gateway + WAF",
      "Application Gateway + WAF",
      "Application Gateway + WAF",
      "Application Gateway + WAF",
      "Application Gateway + WAF",
    ),
    human: loc(
      "Por onde o browser entra no menu, com escudo.",
      "Where the browser enters the menu, with a shield.",
      "Là où le navigateur entre dans le menu, avec bouclier.",
      "Wo der Browser ins Menü kommt, mit Schild.",
      "Por donde el navegador entra en el menú, con escudo.",
    ),
    serviceId: "azure",
    minPath: true,
    rise: true,
    grow: true,
  },
  {
    id: "az-spoke",
    band: "spoke",
    product: loc(
      "Bairro SAP (conta RISE)",
      "SAP neighbourhood (RISE account)",
      "Quartier SAP (compte RISE)",
      "SAP-Viertel (RISE-Konto)",
      "Barrio SAP (cuenta RISE)",
    ),
    human: loc(
      "Gerido pela SAP. Perímetro, aplicações e HANA.",
      "SAP-managed. Perimeter, apps and HANA.",
      "Géré par SAP. Périmètre, applications et HANA.",
      "Von SAP betrieben. Perimeter, Apps und HANA.",
      "Gestionado por SAP. Perímetro, aplicaciones y HANA.",
    ),
    serviceId: "azure",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "az-pl",
    band: "spoke",
    product: loc("Private Link", "Private Link", "Private Link", "Private Link", "Private Link"),
    human: loc(
      "O programa de facturas fala com as extensões sem internet pública.",
      "The invoicing program talks to extensions without the public internet.",
      "Le programme de factures parle aux extensions sans internet public.",
      "Das Rechnungsprogramm spricht mit Erweiterungen ohne öffentliches Internet.",
      "El programa de facturas habla con las extensiones sin internet pública.",
    ),
    serviceId: "private-link",
    minPath: true,
    rise: true,
    grow: true,
  },
  {
    id: "az-dns",
    band: "guard",
    product: loc("Azure DNS / Private DNS", "Azure DNS / Private DNS", "Azure DNS / Private DNS", "Azure DNS / Private DNS", "Azure DNS / Private DNS"),
    human: loc(
      "Como se chama cada máquina por dentro.",
      "What each machine is called on the inside.",
      "Comment chaque machine s'appelle à l'intérieur.",
      "Wie jede Maschine innen heißt.",
      "Cómo se llama cada máquina por dentro.",
    ),
    serviceId: "azure",
    minPath: false,
    rise: true,
    grow: false,
  },
  {
    id: "az-bak",
    band: "guard",
    product: loc(
      "Azure Backup + Site Recovery",
      "Azure Backup + Site Recovery",
      "Azure Backup + Site Recovery",
      "Azure Backup + Site Recovery",
      "Azure Backup + Site Recovery",
    ),
    human: loc(
      "Cópia e o quarto de reserva noutra região.",
      "Copy and the spare room in another region.",
      "Copie et la chambre de réserve dans une autre région.",
      "Kopie und das Ersatzzimmer in einer anderen Region.",
      "Copia y el cuarto de reserva en otra región.",
    ),
    serviceId: "azure",
    minPath: false,
    rise: true,
    grow: false,
  },
  {
    id: "az-entra",
    band: "guard",
    product: loc("Microsoft Entra ID", "Microsoft Entra ID", "Microsoft Entra ID", "Microsoft Entra ID", "Microsoft Entra ID"),
    human: loc(
      "Quem a empresa diz que tu és. Liga-se ao porteiro, não o substitui.",
      "Who the company says you are. Connects to the porter, does not replace it.",
      "Qui l'entreprise dit que tu es. Se lie au portier, ne le remplace pas.",
      "Wen die Firma sagt, dass du bist. Verbindet sich mit dem Pförtner, ersetzt ihn nicht.",
      "Quién dice la empresa que eres. Se liga al portero, no lo sustituye.",
    ),
    serviceId: "ias",
    minPath: true,
    rise: true,
    grow: true,
  },
];

const aws: L0Card[] = [
  {
    id: "aw-dx",
    band: "bridge",
    product: loc("AWS Direct Connect", "AWS Direct Connect", "AWS Direct Connect", "AWS Direct Connect", "AWS Direct Connect"),
    human: loc("O fio dedicado.", "The dedicated wire.", "Le fil dédié.", "Die dedizierte Leitung.", "El cable dedicado."),
    serviceId: "aws",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "aw-vpn",
    band: "bridge",
    product: loc("AWS Site-to-Site VPN", "AWS Site-to-Site VPN", "AWS Site-to-Site VPN", "AWS Site-to-Site VPN", "AWS Site-to-Site VPN"),
    human: loc(
      "Plano B. Os dois juntos = failover.",
      "Plan B. Both together = failover.",
      "Plan B. Les deux ensemble = bascule.",
      "Plan B. Beide zusammen = Failover.",
      "Plan B. Los dos juntos = failover.",
    ),
    serviceId: "aws",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "aw-tgw",
    band: "hub",
    product: loc("AWS Transit Gateway", "AWS Transit Gateway", "AWS Transit Gateway", "AWS Transit Gateway", "AWS Transit Gateway"),
    human: loc(
      "A rotunda entre as tuas redes e a VPC RISE da SAP.",
      "The roundabout between your networks and SAP’s RISE VPC.",
      "Le rond-point entre tes réseaux et le VPC RISE de SAP.",
      "Der Kreisverkehr zwischen deinen Netzen und der RISE-VPC von SAP.",
      "La rotonda entre tus redes y la VPC RISE de SAP.",
    ),
    serviceId: "aws",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "aw-vpc",
    band: "hub",
    product: loc("Amazon VPC", "Amazon VPC", "Amazon VPC", "Amazon VPC", "Amazon VPC"),
    human: loc("O bairro teu.", "Your neighbourhood.", "Ton quartier.", "Dein Viertel.", "Tu barrio."),
    serviceId: "aws",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "aw-spoke",
    band: "spoke",
    product: loc(
      "VPC RISE (conta SAP)",
      "RISE VPC (SAP account)",
      "VPC RISE (compte SAP)",
      "RISE-VPC (SAP-Konto)",
      "VPC RISE (cuenta SAP)",
    ),
    human: loc(
      "Gerido pela SAP. O programa de facturas corre aqui.",
      "SAP-managed. The invoicing program runs here.",
      "Géré par SAP. Le programme de factures tourne ici.",
      "Von SAP betrieben. Das Rechnungsprogramm läuft hier.",
      "Gestionado por SAP. El programa de facturas corre aquí.",
    ),
    serviceId: "aws",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "aw-pl",
    band: "spoke",
    product: loc("AWS PrivateLink", "AWS PrivateLink", "AWS PrivateLink", "AWS PrivateLink", "AWS PrivateLink"),
    human: loc(
      "Falar com S3, chaves e extensões sem internet pública.",
      "Talk to S3, keys and extensions without the public internet.",
      "Parler à S3, clés et extensions sans internet public.",
      "Mit S3, Schlüsseln und Erweiterungen ohne öffentliches Internet sprechen.",
      "Hablar con S3, claves y extensiones sin internet pública.",
    ),
    serviceId: "private-link",
    minPath: true,
    rise: true,
    grow: true,
  },
  {
    id: "aw-r53",
    band: "guard",
    product: loc("Amazon Route 53", "Amazon Route 53", "Amazon Route 53", "Amazon Route 53", "Amazon Route 53"),
    human: loc("Nomes das máquinas.", "Machine names.", "Noms des machines.", "Namen der Maschinen.", "Nombres de las máquinas."),
    serviceId: "aws",
    minPath: false,
    rise: true,
    grow: false,
  },
  {
    id: "aw-iam",
    band: "guard",
    product: loc("AWS IAM + KMS", "AWS IAM + KMS", "AWS IAM + KMS", "AWS IAM + KMS", "AWS IAM + KMS"),
    human: loc(
      "Quem pode ligar à nuvem e com que chave.",
      "Who can connect to the cloud and with which key.",
      "Qui peut se connecter au cloud et avec quelle clé.",
      "Wer sich mit welcher Schlüssel in die Cloud verbinden darf.",
      "Quién puede conectar a la nube y con qué clave.",
    ),
    serviceId: "aws",
    minPath: true,
    rise: true,
    grow: true,
  },
  {
    id: "aw-cw",
    band: "guard",
    product: loc("Amazon CloudWatch", "Amazon CloudWatch", "Amazon CloudWatch", "Amazon CloudWatch", "Amazon CloudWatch"),
    human: loc(
      "O olho na nuvem. Sem isto a torre de controlo vê o SAP, não a nuvem.",
      "The eye on the cloud. Without this the control tower sees SAP, not the cloud.",
      "L'œil sur le cloud. Sans ça la tour de contrôle voit SAP, pas le cloud.",
      "Das Auge auf die Cloud. Ohne das sieht der Kontrollturm SAP, nicht die Cloud.",
      "El ojo en la nube. Sin esto la torre de control ve SAP, no la nube.",
    ),
    serviceId: "aws",
    minPath: false,
    rise: true,
    grow: false,
  },
];

const gcp: L0Card[] = [
  {
    id: "gc-ix",
    band: "bridge",
    product: loc("Cloud Interconnect", "Cloud Interconnect", "Cloud Interconnect", "Cloud Interconnect", "Cloud Interconnect"),
    human: loc(
      "O fio. Preferido pela Google para RISE.",
      "The wire. Google’s preferred path for RISE.",
      "Le fil. Préféré par Google pour RISE.",
      "Die Leitung. Von Google für RISE bevorzugt.",
      "El cable. Preferido por Google para RISE.",
    ),
    serviceId: "gcp",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "gc-vpn",
    band: "bridge",
    product: loc("Cloud VPN + Cloud Router", "Cloud VPN + Cloud Router", "Cloud VPN + Cloud Router", "Cloud VPN + Cloud Router", "Cloud VPN + Cloud Router"),
    human: loc(
      "Plano B, com routing dinâmico.",
      "Plan B, with dynamic routing.",
      "Plan B, avec routage dynamique.",
      "Plan B, mit dynamischem Routing.",
      "Plan B, con routing dinámico.",
    ),
    serviceId: "gcp",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "gc-vpc",
    band: "hub",
    product: loc("VPC (Shared VPC)", "VPC (Shared VPC)", "VPC (Shared VPC)", "VPC (Shared VPC)", "VPC (Shared VPC)"),
    human: loc(
      "O bairro. O projecto RISE é da SAP; o teu faz peering.",
      "The neighbourhood. The RISE project is SAP’s; yours peers into it.",
      "Le quartier. Le projet RISE est à SAP ; le tien fait peering.",
      "Das Viertel. Das RISE-Projekt gehört SAP; deins peered hinein.",
      "El barrio. El proyecto RISE es de SAP; el tuyo hace peering.",
    ),
    serviceId: "gcp",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "gc-spoke",
    band: "spoke",
    product: loc(
      "Projecto RISE (SAP)",
      "RISE project (SAP)",
      "Projet RISE (SAP)",
      "RISE-Projekt (SAP)",
      "Proyecto RISE (SAP)",
    ),
    human: loc(
      "Gerido pela SAP. Compute certificado e disco do HANA.",
      "SAP-managed. Certified compute and HANA disk.",
      "Géré par SAP. Compute certifié et disque HANA.",
      "Von SAP betrieben. Zertifiziertes Compute und HANA-Platte.",
      "Gestionado por SAP. Compute certificado y disco de HANA.",
    ),
    serviceId: "gcp",
    minPath: true,
    rise: true,
    grow: false,
  },
  {
    id: "gc-psc",
    band: "spoke",
    product: loc("Private Service Connect", "Private Service Connect", "Private Service Connect", "Private Service Connect", "Private Service Connect"),
    human: loc(
      "Equivalente ao Private Link: falar sem internet pública.",
      "Private Link equivalent: talk without the public internet.",
      "Équivalent du Private Link : parler sans internet public.",
      "Entsprechung zu Private Link: sprechen ohne öffentliches Internet.",
      "Equivalente al Private Link: hablar sin internet pública.",
    ),
    serviceId: "private-link",
    minPath: true,
    rise: true,
    grow: true,
  },
  {
    id: "gc-dns",
    band: "guard",
    product: loc("Cloud DNS", "Cloud DNS", "Cloud DNS", "Cloud DNS", "Cloud DNS"),
    human: loc("Nomes das máquinas.", "Machine names.", "Noms des machines.", "Namen der Maschinen.", "Nombres de las máquinas."),
    serviceId: "gcp",
    minPath: false,
    rise: true,
    grow: false,
  },
  {
    id: "gc-iam",
    band: "guard",
    product: loc("Cloud IAM + Cloud KMS", "Cloud IAM + Cloud KMS", "Cloud IAM + Cloud KMS", "Cloud IAM + Cloud KMS", "Cloud IAM + Cloud KMS"),
    human: loc(
      "Quem entra na nuvem e com que chave.",
      "Who enters the cloud and with which key.",
      "Qui entre dans le cloud et avec quelle clé.",
      "Wer in die Cloud kommt und mit welchem Schlüssel.",
      "Quién entra en la nube y con qué clave.",
    ),
    serviceId: "gcp",
    minPath: true,
    rise: true,
    grow: true,
  },
  {
    id: "gc-log",
    band: "guard",
    product: loc("Cloud Logging / Monitoring", "Cloud Logging / Monitoring", "Cloud Logging / Monitoring", "Cloud Logging / Monitoring", "Cloud Logging / Monitoring"),
    human: loc("O olho na nuvem.", "The eye on the cloud.", "L'œil sur le cloud.", "Das Auge auf die Cloud.", "El ojo en la nube."),
    serviceId: "gcp",
    minPath: false,
    rise: true,
    grow: false,
  },
];

const sci: L0Card[] = [
  {
    id: "sci-net",
    band: "hub",
    product: loc("Redes SCI", "SCI networks", "Réseaux SCI", "SCI-Netze", "Redes SCI"),
    human: loc(
      "Os computadores da própria SAP, não a Amazon nem a Azure.",
      "SAP’s own computers, not Amazon or Azure.",
      "Les ordinateurs de SAP elle-même, pas Amazon ni Azure.",
      "SAPs eigene Rechner, nicht Amazon oder Azure.",
      "Los ordenadores de la propia SAP, no Amazon ni Azure.",
    ),
    serviceId: "sci",
    minPath: true,
    rise: true,
    grow: true,
  },
  {
    id: "sci-sg",
    band: "hub",
    product: loc("Security groups", "Security groups", "Security groups", "Security groups", "Security groups"),
    human: loc(
      "Quem pode falar com quem, dentro da nuvem da SAP.",
      "Who may talk to whom, inside SAP’s cloud.",
      "Qui peut parler à qui, dans le cloud de SAP.",
      "Wer mit wem sprechen darf, in der SAP-Cloud.",
      "Quién puede hablar con quién, dentro de la nube de SAP.",
    ),
    serviceId: "sci",
    minPath: true,
    rise: true,
    grow: true,
  },
  {
    id: "sci-sov",
    band: "spoke",
    product: loc("Sovereign Cloud / NS2", "Sovereign Cloud / NS2", "Sovereign Cloud / NS2", "Sovereign Cloud / NS2", "Sovereign Cloud / NS2"),
    human: loc(
      "Para quem a lei manda os dados ficarem no sítio.",
      "For when the law says the data must stay put.",
      "Pour quand la loi exige que les données restent sur place.",
      "Wenn das Gesetz sagt, die Daten müssen bleiben.",
      "Para cuando la ley manda que los datos se queden.",
    ),
    serviceId: "sovereign-cloud",
    minPath: false,
    rise: true,
    grow: true,
    regulado: true,
  },
  {
    id: "sci-eic",
    band: "spoke",
    product: loc("Edge Integration Cell", "Edge Integration Cell", "Edge Integration Cell", "Edge Integration Cell", "Edge Integration Cell"),
    human: loc(
      "O correio que corre em casa, se não puder sair.",
      "The mail that runs at home, if it cannot leave.",
      "Le courrier qui tourne à la maison, s'il ne peut pas sortir.",
      "Die Post, die zu Hause läuft, wenn sie nicht raus darf.",
      "El correo que corre en casa, si no puede salir.",
    ),
    serviceId: "eic",
    minPath: false,
    rise: true,
    grow: false,
    regulado: true,
  },
  {
    id: "sci-pe",
    band: "guard",
    product: loc(
      "Private endpoint para o BTP",
      "Private endpoint to BTP",
      "Private endpoint vers le BTP",
      "Private Endpoint zum BTP",
      "Private endpoint hacia el BTP",
    ),
    human: loc(
      "As extensões falam sem internet pública.",
      "Extensions talk without the public internet.",
      "Les extensions parlent sans internet public.",
      "Erweiterungen sprechen ohne öffentliches Internet.",
      "Las extensiones hablan sin internet pública.",
    ),
    serviceId: "private-link",
    minPath: true,
    rise: true,
    grow: true,
  },
];

const onprem: L0Card[] = [
  {
    id: "op-dc",
    band: "hub",
    product: loc(
      "O quarto dos servidores",
      "The server room",
      "La salle des serveurs",
      "Der Serverraum",
      "El cuarto de servidores",
    ),
    human: loc(
      "Em casa da empresa. Tu operas as máquinas.",
      "At the company’s house. You operate the machines.",
      "Chez l'entreprise. Tu opères les machines.",
      "Im Haus der Firma. Du betreibst die Maschinen.",
      "En casa de la empresa. Tú operas las máquinas.",
    ),
    serviceId: "dc-onprem",
    minPath: true,
    onprem: true,
  },
  {
    id: "op-nw",
    band: "spoke",
    product: loc("NetWeaver", "NetWeaver", "NetWeaver", "NetWeaver", "NetWeaver"),
    human: loc(
      "A plataforma antiga em que o programa assenta.",
      "The old platform the program sits on.",
      "La vieille plateforme sur laquelle le programme repose.",
      "Die alte Plattform, auf der das Programm sitzt.",
      "La plataforma antigua sobre la que asienta el programa.",
    ),
    serviceId: "netweaver",
    minPath: true,
    onprem: true,
  },
  {
    id: "op-hana",
    band: "spoke",
    product: loc("HANA (em casa)", "HANA (on-prem)", "HANA (sur site)", "HANA (vor Ort)", "HANA (en casa)"),
    human: loc(
      "A base onde vivem as facturas e o stock.",
      "The database where invoices and stock live.",
      "La base où vivent les factures et le stock.",
      "Die Datenbank, in der Rechnungen und Bestand leben.",
      "La base donde viven las facturas y el stock.",
    ),
    serviceId: "hana-onprem",
    minPath: true,
    onprem: true,
  },
];

const CATALOG: Record<InfraChoice, L0Card[]> = { azure, aws, gcp, sci };

export const BAND_LABEL: Record<L0Band, Loc> = {
  bridge: loc("A ponte com a casa", "The bridge home", "Le pont vers la maison", "Die Brücke nach Hause", "El puente con casa"),
  hub: loc("O cruzamento", "The crossing", "Le carrefour", "Die Kreuzung", "El cruce"),
  spoke: loc("O bairro do SAP", "The SAP neighbourhood", "Le quartier SAP", "Das SAP-Viertel", "El barrio de SAP"),
  guard: loc("Guarda, nomes e cópia", "Guard, names and copy", "Garde, noms et copie", "Wache, Namen und Kopie", "Guarda, nombres y copia"),
};

export function l0CardsFor(
  preset: Preset,
  infra: InfraChoice,
  caminhoMinimo: boolean,
  regulado: boolean,
): L0Card[] {
  if (preset === "onprem") {
    return onprem.filter((c) => (caminhoMinimo ? c.minPath : true));
  }
  const source = CATALOG[infra] ?? azure;
  return source.filter((c) => {
    if (preset === "cloud" && c.grow === false) return false;
    if (preset === "rise" && c.rise === false) return false;
    if (c.regulado && !regulado && caminhoMinimo) return false;
    if (caminhoMinimo && !c.minPath) return false;
    if (preset === "cloud" && c.band === "spoke" && (c.id.includes("spoke") || c.id.includes("hana"))) {
      return false;
    }
    return true;
  });
}

export function floorTitle(preset: Preset, infra: InfraChoice): Loc {
  if (preset === "onprem") {
    return loc(
      "O chão — o quarto dos servidores da empresa",
      "The floor — the company’s server room",
      "Le sol — la salle des serveurs de l'entreprise",
      "Der Boden — der Serverraum der Firma",
      "El suelo — el cuarto de servidores de la empresa",
    );
  }
  if (infra === "sci") {
    return loc(
      "O chão — computadores da SAP (SCI)",
      "The floor — SAP’s computers (SCI)",
      "Le sol — ordinateurs de SAP (SCI)",
      "Der Boden — Rechner von SAP (SCI)",
      "El suelo — ordenadores de SAP (SCI)",
    );
  }
  const name = infra === "azure" ? "Azure" : infra === "aws" ? "AWS" : "Google Cloud";
  return loc(`O chão — ${name}`, `The floor — ${name}`, `Le sol — ${name}`, `Der Boden — ${name}`, `El suelo — ${name}`);
}

export function growInternetCard(): L0Card {
  return {
    id: "grow-net",
    band: "bridge",
    product: loc(
      "Browser → internet cifrada",
      "Browser → encrypted internet",
      "Navigateur → internet chiffré",
      "Browser → verschlüsseltes Internet",
      "Navegador → internet cifrada",
    ),
    human: loc(
      "O programa de facturas é SaaS. Não há sub-rede HANA tua.",
      "The invoicing program is SaaS. You have no HANA subnet of your own.",
      "Le programme de factures est du SaaS. Pas de sous-réseau HANA à toi.",
      "Das Rechnungsprogramm ist SaaS. Kein eigenes HANA-Subnetz.",
      "El programa de facturas es SaaS. No hay subred HANA tuya.",
    ),
    serviceId: "s4hana",
    minPath: true,
    grow: true,
  };
}
