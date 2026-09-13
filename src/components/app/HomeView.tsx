import { TEMPLATES } from "@/data/templates";
import { loc, pick } from "@/i18n/loc";
import { t } from "@/i18n";
import { useMapStore } from "@/store/useMapStore";
import type { Preset, TemplateId } from "@/data/types";

export function HomeView() {
  const lang = useMapStore((s) => s.lang);
  const setView = useMapStore((s) => s.setView);
  const setTemplate = useMapStore((s) => s.setTemplate);
  const setPreset = useMapStore((s) => s.setPreset);

  const go = (preset: Preset, template: TemplateId = "A") => {
    setTemplate(template);
    setPreset(preset);
    setView("schematic");
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-bg">
      <div className="mx-auto max-w-5xl px-4 py-8 pb-16">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
          {pick(loc("Como a SAP faz negócio", "How SAP does business", "Comment SAP fait affaire", "Wie SAP Geschäfte macht", "Cómo hace negocio SAP"), lang)}
        </p>
        <h2 className="mt-1 max-w-3xl text-[28px] font-semibold leading-tight tracking-tight text-fg">
          {pick(
            loc(
              "Não vendem um programa. Vendem um pacote: o programa de facturas, quem o opera, e a jornada até estar a trabalhar.",
              "They don’t sell a program. They sell a package: the invoicing program, who operates it, and the journey until you are working.",
              "Ils ne vendent pas un programme. Ils vendent un paquet : le programme de factures, qui l'opère, et le chemin jusqu'au travail.",
              "Sie verkaufen kein Programm. Sie verkaufen ein Paket: das Rechnungsprogramm, wer es betreibt, und den Weg bis zur Arbeit.",
              "No venden un programa. Venden un paquete: el programa de facturas, quién lo opera, y el camino hasta estar trabajando.",
            ),
            lang,
          )}
        </h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-fg-muted">
          {pick(
            loc(
              "GROW e RISE não são o programa de facturas. São dois pacotes comerciais à volta do mesmo produto (SAP S/4HANA Cloud / «SAP Cloud ERP»). O que muda é quem opera o computador, o grau de standard, e o que vem no contrato. Depois escolhes o que a tua empresa faz — e o desenho mostra do portátil até ao chão.",
              "GROW and RISE are not the invoicing program. They are two commercial packages around the same product (SAP S/4HANA Cloud / “SAP Cloud ERP”). What changes is who operates the computer, how standard it is, and what is in the contract. Then you pick what your company does — and the drawing shows from the laptop to the floor.",
              "GROW et RISE ne sont pas le programme de factures. Ce sont deux paquets commerciaux autour du même produit. Ce qui change : qui opère l'ordinateur, le degré de standard, le contrat. Ensuite tu choisis ce que fait l'entreprise — et le dessin montre du portable jusqu'au sol.",
              "GROW und RISE sind nicht das Rechnungsprogramm. Es sind zwei kommerzielle Pakete um dasselbe Produkt. Was sich ändert: wer den Rechner betreibt, wie standard es ist, der Vertrag. Dann wählst du, was die Firma tut — und die Zeichnung zeigt vom Laptop bis zum Boden.",
              "GROW y RISE no son el programa de facturas. Son dos paquetes comerciales alrededor del mismo producto. Lo que cambia es quién opera el ordenador, el grado de estándar, y el contrato. Luego eliges lo que hace tu empresa — y el dibujo muestra del portátil al suelo.",
            ),
            lang,
          )}
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <PackageCard
            kicker="GROW with SAP"
            title={pick(loc("Nuvem pública, standard", "Public cloud, standard", "Cloud public, standard", "Public Cloud, Standard", "Nube pública, estándar"), lang)}
            product="SAP Cloud ERP · S/4HANA Cloud Public Edition"
            points={[
              pick(loc("A SAP opera. Tu usas o standard.", "SAP operates it. You use the standard.", "SAP l'opère. Tu utilises le standard.", "SAP betreibt. Du nutzt den Standard.", "SAP opera. Tú usas el estándar"), lang),
              pick(loc("Vários clientes no mesmo computador (multi-tenant).", "Several customers on the same computer (multi-tenant).", "Plusieurs clients sur le même ordinateur.", "Mehrere Kunden auf demselben Rechner.", "Varios clientes en el mismo ordenador."), lang),
              pick(loc("Quase sem código à medida. Fit-to-standard.", "Almost no custom code. Fit-to-standard.", "Presque pas de code spécifique.", "Kaum Custom Code.", "Casi sin código a medida."), lang),
              pick(loc("No chão não há VPC tua do S/4. Corre na nuvem da SAP.", "On the floor you have no S/4 VPC of your own. It runs in SAP’s cloud.", "Pas de VPC S/4 à toi. Ça tourne dans le cloud SAP.", "Kein eigenes S/4-VPC. Läuft in der SAP-Cloud.", "No hay VPC S/4 tuya. Corre en la nube de SAP."), lang),
            ]}
            cta={pick(loc("Ver o desenho GROW", "See the GROW drawing", "Voir le dessin GROW", "GROW-Zeichnung sehen", "Ver el dibujo GROW"), lang)}
            onClick={() => go("cloud", "I")}
          />
          <PackageCard
            kicker="RISE with SAP"
            title={pick(loc("O mesmo programa, operado pela SAP", "The same program, operated by SAP", "Le même programme, opéré par SAP", "Dasselbe Programm, von SAP betrieben", "El mismo programa, operado por SAP"), lang)}
            product="SAP Cloud ERP Private · S/4HANA Cloud Private Edition"
            points={[
              pick(loc("Um inquilino só teu. Âmbito de casa, operação SAP.", "A tenant of your own. Home scope, SAP operations.", "Un locataire rien qu'à toi. Périmètre maison, opération SAP.", "Ein Mandant nur für dich. Haus-Umfang, SAP-Betrieb.", "Un inquilino solo tuyo. Ámbito de casa, operación SAP."), lang),
              pick(loc("Podes trazer código clássico (brownfield / ECC).", "You can bring classic code (brownfield / ECC).", "Tu peux apporter du code classique (ECC).", "Klassischer Code möglich (ECC).", "Puedes traer código clásico (ECC)."), lang),
              pick(loc("O chão é Azure, AWS, GCP ou SCI. O spoke SAP é da SAP.", "The floor is Azure, AWS, GCP or SCI. The SAP spoke is SAP’s.", "Le sol est Azure, AWS, GCP ou SCI. Le spoke SAP est à SAP.", "Boden: Azure, AWS, GCP oder SCI. Der SAP-Spoke gehört SAP.", "El suelo es Azure, AWS, GCP o SCI. El spoke SAP es de SAP."), lang),
              pick(loc("A tua rede até ao hub é tua; dentro do spoke, a SAP gere.", "Your network up to the hub is yours; inside the spoke, SAP runs it.", "Ton réseau jusqu'au hub est à toi ; dans le spoke, SAP gère.", "Dein Netz bis zum Hub ist deins; im Spoke betreibt SAP.", "Tu red hasta el hub es tuya; dentro del spoke, SAP gestiona."), lang),
            ]}
            cta={pick(loc("Ver o desenho RISE", "See the RISE drawing", "Voir le dessin RISE", "RISE-Zeichnung sehen", "Ver el dibujo RISE"), lang)}
            onClick={() => go("rise", "A")}
            featured
          />
          <PackageCard
            kicker={pick(loc("On-prem / any-premise", "On-prem / any-premise", "On-prem / any-premise", "On-Prem / any-premise", "On-prem / any-premise"), lang)}
            title={pick(loc("O programa em casa", "The program at home", "Le programme à la maison", "Das Programm zu Hause", "El programa en casa"), lang)}
            product="ECC ou S/4 no quarto dos servidores"
            points={[
              pick(loc("Tu compras, instalas, operas, actualizas.", "You buy, install, operate, patch.", "Tu achètes, installes, opères, patches.", "Du kaufst, installierst, betreibst, patchst.", "Tú compras, instalas, operas, actualizas."), lang),
              pick(loc("Código à medida à vontade. E o risco à vontade.", "Custom code at will. And the risk at will.", "Code spécifique à volonté. Et le risque.", "Custom Code nach Belieben. Und das Risiko.", "Código a medida a voluntad. Y el riesgo."), lang),
              pick(loc("O chão és tu: HANA, NetWeaver, o quarto, a rede.", "The floor is you: HANA, NetWeaver, the room, the network.", "Le sol, c'est toi : HANA, NetWeaver, la salle, le réseau.", "Der Boden bist du: HANA, NetWeaver, der Raum, das Netz.", "El suelo eres tú: HANA, NetWeaver, el cuarto, la red."), lang),
              pick(loc("Ainda é o sítio de muita empresa. Destino: RISE ou GROW.", "Still where many companies sit. Destination: RISE or GROW.", "Encore le lieu de beaucoup d'entreprises. Destination : RISE ou GROW.", "Noch der Ort vieler Firmen. Ziel: RISE oder GROW.", "Sigue siendo el sitio de mucha empresa. Destino: RISE o GROW."), lang),
            ]}
            cta={pick(loc("Ver o desenho em casa", "See the at-home drawing", "Voir le dessin à la maison", "Zeichnung zu Hause sehen", "Ver el dibujo en casa"), lang)}
            onClick={() => go("onprem", "H")}
          />
        </div>

        <h3 className="mt-12 text-[18px] font-semibold text-fg">
          {pick(loc("O que muda, em uma frase", "What changes, in one sentence", "Ce qui change, en une phrase", "Was sich ändert, in einem Satz", "Lo que cambia, en una frase"), lang)}
        </h3>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-left text-[13px]">
            <thead className="bg-bg-subtle text-[11px] uppercase tracking-wide text-fg-subtle">
              <tr>
                <th className="px-3 py-2 font-medium" />
                <th className="px-3 py-2 font-medium">GROW</th>
                <th className="px-3 py-2 font-medium">RISE</th>
                <th className="px-3 py-2 font-medium">On-prem</th>
              </tr>
            </thead>
            <tbody className="text-fg">
              {[
                [
                  pick(loc("Quem opera o computador", "Who operates the computer", "Qui opère l'ordinateur", "Wer den Rechner betreibt", "Quién opera el ordenador"), lang),
                  pick(loc("A SAP, partilhado", "SAP, shared", "SAP, partagé", "SAP, geteilt", "SAP, compartido"), lang),
                  pick(loc("A SAP, só teu", "SAP, yours alone", "SAP, rien qu'à toi", "SAP, nur deins", "SAP, solo tuyo"), lang),
                  pick(loc("Tu", "You", "Toi", "Du", "Tú"), lang),
                ],
                [
                  pick(loc("O produto", "The product", "Le produit", "Das Produkt", "El producto"), lang),
                  "S/4 Cloud Public",
                  "S/4 Cloud Private",
                  "ECC / S/4 any-premise",
                ],
                [
                  pick(loc("Código à medida", "Custom code", "Code spécifique", "Custom Code", "Código a medida"), lang),
                  pick(loc("Quase não", "Almost none", "Presque pas", "Kaum", "Casi no"), lang),
                  pick(loc("Sim, com regras", "Yes, with rules", "Oui, avec règles", "Ja, mit Regeln", "Sí, con reglas"), lang),
                  pick(loc("Tudo teu", "All yours", "Tout à toi", "Alles deins", "Todo tuyo"), lang),
                ],
                [
                  pick(loc("O chão (L0)", "The floor (L0)", "Le sol (L0)", "Der Boden (L0)", "El suelo (L0)"), lang),
                  pick(loc("Já tratado. Sem sub-rede HANA tua.", "Already handled. No HANA subnet of yours.", "Déjà traité. Pas de sous-réseau HANA à toi.", "Schon erledigt. Kein eigenes HANA-Subnetz.", "Ya tratado. Sin subred HANA tuya."), lang),
                  pick(loc("A tua rede + spoke SAP (Azure/AWS/GCP/SCI)", "Your network + SAP spoke (Azure/AWS/GCP/SCI)", "Ton réseau + spoke SAP", "Dein Netz + SAP-Spoke", "Tu red + spoke SAP"), lang),
                  pick(loc("O quarto dos servidores", "The server room", "La salle des serveurs", "Der Serverraum", "El cuarto de servidores"), lang),
                ],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  {row.map((cell, i) => (
                    <td key={i} className={`px-3 py-2.5 leading-snug ${i === 0 ? "font-medium text-fg-muted" : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-12 text-[18px] font-semibold text-fg">
          {pick(
            loc(
              "O que a tua empresa precisa no ecrã — não é jargão, é o trabalho",
              "What your company needs on screen — not jargon, it is the work",
              "Ce dont ton entreprise a besoin à l'écran — pas du jargon, c'est le travail",
              "Was deine Firma auf dem Bildschirm braucht — kein Jargon, die Arbeit",
              "Lo que tu empresa necesita en pantalla — no es jerga, es el trabajo",
            ),
            lang,
          )}
        </h3>
        <p className="mt-1 max-w-3xl text-[13px] text-fg-muted">
          {pick(
            loc(
              "Isto não é «arquitectar um landscape». É escolher a situação da empresa. O esquema muda os cartões, as pessoas e o chão. Clica num cartão.",
              "This is not “architecting a landscape”. It is picking the company’s situation. The drawing changes the cards, the people and the floor. Click a card.",
              "Ce n'est pas « architecturer un landscape ». C'est choisir la situation de l'entreprise. Clique une carte.",
              "Das ist kein Landscape-Architektieren. Du wählst die Situation der Firma. Klick eine Karte.",
              "Esto no es «arquitectar un landscape». Es elegir la situación de la empresa. Pulsa una tarjeta.",
            ),
            lang,
          )}
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {TEMPLATES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTemplate(item.id);
                setView("schematic");
              }}
              className="rounded-xl border border-border bg-card p-3 text-left transition-colors hover:border-accent"
            >
              <p className="text-[13px] font-semibold leading-snug text-fg">{item.nome[lang]}</p>
              <p className="mt-1 text-[12px] leading-snug text-fg-muted">{item.perfil[lang]}</p>
            </button>
          ))}
        </div>

        <h3 className="mt-12 text-[18px] font-semibold text-fg">
          {pick(loc("Ordem — o utilizador não sabe o que instalar primeiro", "Order — the user does not know what to install first", "Ordre — l'utilisateur ne sait pas quoi installer d'abord", "Reihenfolge — der Nutzer weiß nicht, was zuerst", "Orden — el usuario no sabe qué instalar primero"), lang)}
        </h3>
        <ol className="mt-3 space-y-2">
          {[
            pick(loc("0. Contrato: GROW, RISE ou on-prem. Isto decide quem opera.", "0. Contract: GROW, RISE or on-prem. This decides who operates.", "0. Contrat : GROW, RISE ou on-prem.", "0. Vertrag: GROW, RISE oder On-Prem.", "0. Contrato: GROW, RISE u on-prem."), lang),
            pick(loc("1. O porteiro (IAS): quem entra e com que chave. Antes do programa.", "1. The porter (IAS): who comes in and with which key. Before the program.", "1. Le portier (IAS) : avant le programme.", "1. Der Pförtner (IAS): vor dem Programm.", "1. El portero (IAS): antes del programa."), lang),
            pick(loc("2. A torre (Cloud ALM) e o CBC no GROW: para não voar às cegas.", "2. The tower (Cloud ALM) and CBC in GROW: so you are not flying blind.", "2. La tour (Cloud ALM) et CBC dans GROW.", "2. Der Turm (Cloud ALM) und CBC in GROW.", "2. La torre (Cloud ALM) y CBC en GROW."), lang),
            pick(loc("3. O núcleo: o programa de facturas (S/4). Sem isto, o resto é teatro.", "3. The core: the invoicing program (S/4). Without this, the rest is theatre.", "3. Le noyau : le programme de factures (S/4).", "3. Der Kern: das Rechnungsprogramm (S/4).", "3. El núcleo: el programa de facturas (S/4)."), lang),
            pick(loc("4. O trabalho do dia: encomenda → stock → picking → guia → factura.", "4. The day’s work: order → stock → picking → delivery note → invoice.", "4. Le travail du jour : commande → stock → picking → bon → facture.", "4. Die Tagesarbeit: Auftrag → Bestand → Picking → Lieferschein → Rechnung.", "4. El trabajo del día: pedido → stock → picking → guía → factura."), lang),
            pick(loc("5. A factura legal PT (DRC: ATCUD, QR, SAF-T) em cima do núcleo — não no sítio do núcleo.", "5. The PT legal invoice (DRC: ATCUD, QR, SAF-T) on top of the core — not in the core’s place.", "5. La facture légale PT (DRC) au-dessus du noyau.", "5. Die legale PT-Rechnung (DRC) auf dem Kern.", "5. La factura legal PT (DRC) encima del núcleo."), lang),
            pick(loc("6. O correio (Integration Suite) só se precisares: loja, banco, 3PL, ECC residual.", "6. The mail (Integration Suite) only if you need it: shop, bank, 3PL, leftover ECC.", "6. Le courrier (Integration Suite) seulement si besoin.", "6. Die Post (Integration Suite) nur wenn nötig.", "6. El correo (Integration Suite) solo si lo necesitas."), lang),
            pick(loc("7. Extensões (BTP) depois do núcleo estável. O chão (L0) é o fim da viagem, não o início.", "7. Extensions (BTP) after the core is stable. The floor (L0) is the end of the trip, not the start.", "7. Extensions (BTP) après un noyau stable. Le sol (L0) est la fin.", "7. Erweiterungen (BTP) nach stabilem Kern. Der Boden (L0) ist das Ende.", "7. Extensiones (BTP) después del núcleo estable. El suelo (L0) es el fin."), lang),
          ].map((line) => (
            <li key={line} className="rounded-lg border border-border bg-card px-3 py-2 text-[13px] leading-snug text-fg">
              {line}
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-2">
          <button
            type="button"
            className="h-11 rounded-md bg-accent px-4 text-[14px] font-semibold text-accent-fg"
            onClick={() => setView("schematic")}
          >
            {pick(loc("Ver o esquema desta mistura", "See the drawing for this mix", "Voir le schéma de ce mélange", "Die Zeichnung dieser Mischung sehen", "Ver el esquema de esta mezcla"), lang)}
          </button>
          <button
            type="button"
            className="h-11 rounded-md border border-border px-4 text-[14px] font-medium text-fg"
            onClick={() => setView("map")}
          >
            {t(lang, "seePortfolio")}
          </button>
        </div>
      </div>
    </div>
  );
}

function PackageCard({
  kicker,
  title,
  product,
  points,
  cta,
  onClick,
  featured,
}: {
  kicker: string;
  title: string;
  product: string;
  points: string[];
  cta: string;
  onClick: () => void;
  featured?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col rounded-2xl border p-4 text-left transition-colors ${
        featured ? "border-[#0070F2] bg-[color-mix(in_oklab,#0070F2_8%,white)] dark:bg-[color-mix(in_oklab,#0070F2_18%,#10161f)]" : "border-border bg-card hover:border-accent"
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0070F2]">{kicker}</p>
      <p className="mt-1 text-[16px] font-semibold leading-snug text-fg">{title}</p>
      <p className="mt-0.5 text-[11px] text-fg-subtle">{product}</p>
      <ul className="mt-3 flex-1 space-y-1.5">
        {points.map((p) => (
          <li key={p} className="text-[12px] leading-snug text-fg-muted">
            {p}
          </li>
        ))}
      </ul>
      <span className="mt-4 text-[12px] font-semibold text-[#0070F2]">{cta} →</span>
    </button>
  );
}
