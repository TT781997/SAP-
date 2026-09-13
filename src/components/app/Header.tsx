import type { ReactNode } from "react";
import { Moon, SlidersHorizontal, Sun } from "lucide-react";
import { LANG_META, t } from "@/i18n";
import { cn } from "@/lib/utils";
import { useMapStore } from "@/store/useMapStore";
import { SearchBox } from "./SearchBox";
import { TEMPLATES } from "@/data/templates";
import type { InfraChoice, Lang, Preset, Profile, TemplateId } from "@/data/types";

const PRESETS: Preset[] = ["onprem", "cloud", "rise"];
const INFRAS: InfraChoice[] = ["aws", "azure", "gcp", "sci"];
const PROFILES: Profile[] = [
  "greenfield",
  "brownfield",
  "industria",
  "regulado",
  "spend",
  "workforce",
];

export function Header({ pathLine }: { pathLine: string }) {
  const lang = useMapStore((s) => s.lang);
  const preset = useMapStore((s) => s.preset);
  const infra = useMapStore((s) => s.infra);
  const profiles = useMapStore((s) => s.profiles);
  const showLegacy = useMapStore((s) => s.showLegacy);
  const view = useMapStore((s) => s.view);
  const caminho = useMapStore((s) => s.caminhoMinimo);
  const showRest = useMapStore((s) => s.showRest);
  const filtersOpen = useMapStore((s) => s.filtersOpen);
  const template = useMapStore((s) => s.template);
  const darkMode = useMapStore((s) => s.darkMode);
  const setLang = useMapStore((s) => s.setLang);
  const setPreset = useMapStore((s) => s.setPreset);
  const setInfra = useMapStore((s) => s.setInfra);
  const toggleProfile = useMapStore((s) => s.toggleProfile);
  const setShowLegacy = useMapStore((s) => s.setShowLegacy);
  const setView = useMapStore((s) => s.setView);
  const setCaminho = useMapStore((s) => s.setCaminho);
  const setShowRest = useMapStore((s) => s.setShowRest);
  const setFiltersOpen = useMapStore((s) => s.setFiltersOpen);
  const setTemplate = useMapStore((s) => s.setTemplate);
  const setDarkMode = useMapStore((s) => s.setDarkMode);

  const tpl = TEMPLATES.find((x) => x.id === template);
  const presetTitle =
    preset === "onprem"
      ? t(lang, "presetOnprem")
      : preset === "cloud"
        ? t(lang, "presetCloud")
        : t(lang, "presetRise");

  return (
    <header className="pointer-events-auto border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-2 px-3 py-1.5 lg:px-4">
        <div className="min-w-0 flex-[1_1_180px]">
          <h1 className="truncate text-[15px] font-semibold tracking-tight text-fg">
            {t(lang, "title")}
          </h1>
          <p className="truncate text-[11px] text-fg-muted">
            {presetTitle} · {infra.toUpperCase()}
            {tpl ? ` · ${tpl.nome[lang]}` : ""}
          </p>
        </div>
        <div className="min-w-0 flex-[2_1_240px]">
          <SearchBox />
        </div>
        <div className="flex items-center gap-1">
          <Seg
            value={view}
            onChange={setView}
            options={[
              ["schematic", t(lang, "schematic")],
              ["map", t(lang, "map")],
            ]}
          />
          <label className="sr-only" htmlFor="lang">
            {t(lang, "language")}
          </label>
          <select
            id="lang"
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="h-10 rounded-md border border-border bg-bg-subtle px-2 text-[12px] text-fg"
          >
            {(Object.keys(LANG_META) as Lang[]).map((code) => (
              <option key={code} value={code}>
                {LANG_META[code].label}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-border text-fg-muted"
            aria-label={t(lang, "darkMode")}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-border"
            aria-label={t(lang, "filters")}
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal className="size-4" />
          </button>
        </div>
      </div>

      <div className="px-3 pb-1.5 lg:px-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {PRESETS.map((p) => (
            <Chip key={p} active={preset === p} onClick={() => setPreset(p)}>
              {p === "onprem"
                ? t(lang, "presetOnprem")
                : p === "cloud"
                  ? t(lang, "presetCloud")
                  : t(lang, "presetRise")}
            </Chip>
          ))}
          <span className="mx-1 hidden h-4 w-px bg-border sm:block" />
          {INFRAS.map((i) => (
            <Chip key={i} active={infra === i} onClick={() => setInfra(i)}>
              {t(lang, `infra.${i}`)}
            </Chip>
          ))}
          <span className="mx-1 hidden h-4 w-px bg-border sm:block" />
          <label className="sr-only" htmlFor="template">
            {t(lang, "whatCompanyNeeds")}
          </label>
          <select
            id="template"
            value={template}
            onChange={(e) => setTemplate(e.target.value as TemplateId)}
            className="h-8 max-w-[280px] rounded-full border border-border bg-bg-subtle px-2.5 text-[11px] font-medium text-fg"
          >
            {TEMPLATES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.letter} · {item.nome[lang]}
              </option>
            ))}
          </select>
          <Chip active={showLegacy} onClick={() => setShowLegacy(!showLegacy)}>
            {t(lang, "showLegacy")}
          </Chip>
          <Chip active={caminho} onClick={() => setCaminho(!caminho)}>
            {t(lang, "minPath")}
          </Chip>
          <Chip active={showRest} onClick={() => setShowRest(!showRest)}>
            {t(lang, "showRest")}
          </Chip>
        </div>
        <div className={cn("mt-1.5", filtersOpen ? "block" : "hidden")}>
          <div className="flex flex-wrap items-center gap-1.5">
            {PROFILES.map((p) => (
              <Chip key={p} active={profiles.includes(p)} onClick={() => toggleProfile(p)} gold>
                {t(lang, `profiles.${p}`)}
              </Chip>
            ))}
          </div>
          {profiles.length > 0 ? (
            <p className="mt-1.5 text-[11px] leading-snug text-gold">
              {profiles.map((p) => t(lang, `profileHint.${p}`)).join(" · ")}
            </p>
          ) : (
            <p className="mt-1.5 text-[11px] leading-snug text-fg-subtle">{t(lang, "profileHelp")}</p>
          )}
        </div>
        <p className="mt-1 hidden text-[11px] text-fg-muted sm:block">{pathLine}</p>
      </div>
    </header>
  );
}

function Chip({
  active,
  onClick,
  children,
  gold,
}: {
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
  gold?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 rounded-full border px-2.5 text-[11px] font-medium transition-colors duration-150",
        active
          ? gold
            ? "border-accent bg-accent/10 text-fg"
            : "border-accent bg-accent/15 text-fg"
          : "border-border bg-transparent text-fg-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function Seg<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Array<[T, string]>;
}) {
  return (
    <div className="inline-flex h-10 rounded-md border border-border p-0.5">
      {options.map(([v, label]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            "rounded-sm px-2.5 text-[12px] font-medium",
            value === v ? "bg-bg-subtle text-fg" : "text-fg-muted",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
