import type { ReactNode } from "react";
import { ArrowLeft, X } from "lucide-react";
import { SERVICO_BY_ID } from "@/data/catalog";
import { computeStatus, pathwayStep } from "@/data/status";
import { t, serviceCopy } from "@/i18n";
import { cn } from "@/lib/utils";
import { useMapStore } from "@/store/useMapStore";
import { useCurrentSchematic } from "@/hooks/useCurrentSchematic";
import { Monogram } from "./Monogram";
import type { MixState } from "@/data/status";
import type { Status } from "@/data/types";
import { TEMPLATE_BY_ID } from "@/data/templates";

const STATUS_KEY: Record<Status, string> = {
  activo: "stateActive",
  recomendado: "stateRecommended",
  opcional: "stateOptional",
  legado: "stateLegacy",
  irrelevante: "stateIrrelevant",
};

function humanName(lang: ReturnType<typeof useMapStore.getState>["lang"], id: string, fallback: string) {
  const copy = serviceCopy(lang, id);
  const map: Record<string, Record<string, string>> = {
    ias: {
      pt: "O porteiro (IAS)",
      en: "The porter (IAS)",
      fr: "Le portier (IAS)",
      de: "Der Pförtner (IAS)",
      es: "El portero (IAS)",
    },
    "document-compliance": {
      pt: "O que torna a factura legal (DRC)",
      en: "What makes the invoice legal (DRC)",
      fr: "Ce qui rend la facture légale (DRC)",
      de: "Was die Rechnung legal macht (DRC)",
      es: "Lo que hace legal la factura (DRC)",
    },
    "cloud-alm": {
      pt: "A torre de controlo (Cloud ALM)",
      en: "The control tower (Cloud ALM)",
      fr: "La tour de contrôle (Cloud ALM)",
      de: "Der Kontrollturm (Cloud ALM)",
      es: "La torre de control (Cloud ALM)",
    },
    sci: {
      pt: "Os computadores da SAP (SCI)",
      en: "SAP’s computers (SCI)",
      fr: "Les ordinateurs de SAP (SCI)",
      de: "SAPs Rechner (SCI)",
      es: "Los ordenadores de SAP (SCI)",
    },
    "integration-suite": {
      pt: "O correio entre sistemas",
      en: "Mail between systems",
      fr: "Le courrier entre systèmes",
      de: "Die Post zwischen Systemen",
      es: "El correo entre sistemas",
    },
    btp: {
      pt: "A caixa de extensões (BTP)",
      en: "The extensions box (BTP)",
      fr: "La boîte d'extensions (BTP)",
      de: "Die Erweiterungsbox (BTP)",
      es: "La caja de extensiones (BTP)",
    },
    s4hana: {
      pt: "O programa de facturas (S/4)",
      en: "The invoicing program (S/4)",
      fr: "Le programme de factures (S/4)",
      de: "Das Rechnungsprogramm (S/4)",
      es: "El programa de facturas (S/4)",
    },
  };
  return map[id]?.[lang] ?? copy?.nome ?? fallback;
}

export function Drawer({ mix }: { mix: MixState }) {
  const lang = useMapStore((s) => s.lang);
  const selectedId = useMapStore((s) => s.selectedId);
  const history = useMapStore((s) => s.history);
  const clearSelection = useMapStore((s) => s.clearSelection);
  const goBack = useMapStore((s) => s.goBack);
  const pushSelect = useMapStore((s) => s.pushSelect);
  const setView = useMapStore((s) => s.setView);
  const view = useMapStore((s) => s.view);
  const template = useMapStore((s) => s.template);
  const sch = useCurrentSchematic();

  if (!selectedId) return null;
  const svc = SERVICO_BY_ID[selectedId];
  if (!svc) return null;
  const copy = serviceCopy(lang, svc.id);
  const status = computeStatus(svc, mix);
  const step = pathwayStep(svc.id, mix);
  const layerKey = `layers.${svc.camada}`;
  const related = (svc.ligaA || []).map((id) => SERVICO_BY_ID[id]).filter(Boolean);

  const whenInstall = step ? `${t(lang, "minPath")} · ${step}` : t(lang, "after");

  const schemaNode = view === "schematic" ? sch.nodes.find((n) => n.data.serviceId === svc.id) : undefined;
  const schemaParent = schemaNode ? sch.nodes.find((n) => n.id === schemaNode.parentId) : undefined;
  const schemaGroup = schemaParent
    ? schemaParent.data.label
    : schemaNode?.data.label;

  const tpl = TEMPLATE_BY_ID[template];
  const mixNote =
    mix.preset === "cloud"
      ? lang === "pt"
        ? "GROW: o programa é SaaS. Não há sub-rede HANA tua. O Connector some."
        : "GROW: the program is SaaS. You have no HANA subnet. Connector disappears."
      : mix.preset === "onprem"
        ? lang === "pt"
          ? "On-prem: o programa corre no quarto dos servidores. Destino = este desenho com porteiro cloud."
          : "On-prem: the program runs in the server room. Destination = this drawing with a cloud porter."
        : lang === "pt"
          ? "RISE: o bairro de produção é gerido pela SAP. Tu desenhas o hub e a ponte."
          : "RISE: the production neighbourhood is SAP-managed. You draw the hub and the bridge.";

  return (
    <>
      <button
        type="button"
        aria-label={t(lang, "close")}
        className="fixed inset-0 z-40 bg-bg/40 lg:hidden"
        onClick={clearSelection}
      />
      <aside
        role="dialog"
        aria-label={humanName(lang, svc.id, copy?.nome ?? svc.nome)}
        className={cn(
          "fixed z-50 flex flex-col border-border bg-bg-elevated shadow-[var(--shadow-border)]",
          "inset-x-0 bottom-0 h-[70vh] rounded-t-2xl border-t",
          "lg:inset-x-auto lg:inset-y-0 lg:right-0 lg:left-auto lg:h-full lg:w-[420px] lg:rounded-none lg:border-l lg:border-t-0",
        )}
      >
        <header className="flex items-start gap-3 border-b border-border px-4 py-3">
          {history.length > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="mt-1 rounded-sm p-1 text-fg-muted hover:text-fg"
              aria-label={t(lang, "back")}
            >
              <ArrowLeft className="size-4" />
            </button>
          ) : (
            <Monogram name={copy?.nome ?? svc.nome} camada={svc.camada} />
          )}
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold leading-snug text-fg">
              {humanName(lang, svc.id, copy?.nome ?? svc.nome)}
            </h2>
            <p className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-fg-muted">
              <span>{t(lang, layerKey)}</span>
              <span aria-hidden>·</span>
              <span>{copy?.tipo ?? svc.tipo}</span>
              <span aria-hidden>·</span>
              <span>{t(lang, STATUS_KEY[status])}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={clearSelection}
            className="rounded-sm p-1 text-fg-muted hover:text-fg"
            aria-label={t(lang, "close")}
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <Section title={t(lang, "drawerWhat")}>{copy?.oQueFaz ?? svc.oQueFaz}</Section>
          <Section title={t(lang, "drawerUsedFor")}>{copy?.paraQueServe ?? svc.paraQueServe}</Section>
          <Section title={t(lang, "drawerMix")}>
            {copy?.nesteCenario[mix.preset] ?? svc.nesteCenario[mix.preset]}
          </Section>
          {schemaGroup ? (
            <Section title={t(lang, "drawerInDrawing")}>
              {t(lang, "schemaHere").replace("{group}", schemaGroup)} {t(lang, "schemaIfPreset")}
            </Section>
          ) : null}
          <Section title={t(lang, "drawerIfChange")}>
            {mixNote} {tpl ? ` · ${tpl.nome[lang]}` : ""}
          </Section>
          <Section title={t(lang, "drawerWhen")}>{whenInstall}</Section>
          <Section title={t(lang, "drawerExample")}>{copy?.exemploReal ?? svc.exemploReal}</Section>
          {related.length > 0 ? (
            <div className="mb-4">
              <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-fg-subtle">
                {t(lang, "drawerRelated")}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {related.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => pushSelect(r.id)}
                    className="rounded-sm border border-border bg-bg-subtle px-2 py-1 text-[11px] text-fg hover:border-accent"
                  >
                    {humanName(lang, r.id, serviceCopy(lang, r.id)?.nome ?? r.nome)}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {(copy?.naoConfundir || svc.naoConfundir) && (
            <Section title={t(lang, "drawerDontConfuse")}>
              {copy?.naoConfundir ?? svc.naoConfundir}
            </Section>
          )}
          <p className="mt-6 text-[11px] text-fg-subtle">{t(lang, "drawerFeatures")}</p>
          <button
            type="button"
            className="mt-4 text-[12px] font-medium text-accent"
            onClick={() => {
              setView("map");
            }}
          >
            {t(lang, "seeOnMap")}
          </button>
        </div>
      </aside>
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-4">
      <h3 className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-fg-subtle">
        {title}
      </h3>
      <p className="text-[13px] leading-relaxed text-fg">{children}</p>
    </section>
  );
}
