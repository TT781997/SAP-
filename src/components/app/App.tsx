import { useEffect } from "react";
import { t } from "@/i18n";
import { DARK_KEY, LANG_KEY, useMapStore } from "@/store/useMapStore";
import type { Lang } from "@/data/types";
import type { MixState } from "@/data/status";
import { Header } from "./Header";
import { MapView } from "./MapView";
import { SchematicView } from "./SchematicView";
import { Drawer } from "./Drawer";

export function App() {
  const lang = useMapStore((s) => s.lang);
  const setLang = useMapStore((s) => s.setLang);
  const setDarkMode = useMapStore((s) => s.setDarkMode);
  const preset = useMapStore((s) => s.preset);
  const infra = useMapStore((s) => s.infra);
  const profiles = useMapStore((s) => s.profiles);
  const showLegacy = useMapStore((s) => s.showLegacy);
  const caminhoMinimo = useMapStore((s) => s.caminhoMinimo);
  const showRest = useMapStore((s) => s.showRest);
  const template = useMapStore((s) => s.template);
  const view = useMapStore((s) => s.view);
  const clearSelection = useMapStore((s) => s.clearSelection);

  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_KEY) as Lang | null;
    if (stored && stored !== lang) setLang(stored);
    document.documentElement.lang = (stored ?? lang) === "pt" ? "pt-PT" : stored ?? lang;
    const dark = window.localStorage.getItem(DARK_KEY) === "1";
    if (dark) setDarkMode(true);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") clearSelection();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clearSelection]);

  const mix: MixState = {
    preset,
    infra,
    showLegacy,
    profiles,
    caminhoMinimo,
    showRest,
    template,
  };

  const pathLine =
    preset === "cloud" ? t(lang, "pathCloud") : preset === "rise" ? t(lang, "pathRise") : t(lang, "pathOnprem");

  return (
    <div className="app-grid flex h-dvh flex-col overflow-hidden">
      <Header pathLine={pathLine} />
      <div className="relative flex min-h-0 flex-1">
        <main className="flex min-w-0 flex-1 flex-col">
          {view === "schematic" ? (
            <div className="relative flex min-h-0 flex-1 flex-col">
              <SchematicView />
            </div>
          ) : (
            <MapView mix={mix} />
          )}
        </main>
        <Drawer mix={mix} />
      </div>
      <footer className="border-t border-border px-4 py-2 text-[10px] leading-snug text-fg-subtle">
        {t(lang, "footerDisclaimer")}
      </footer>
    </div>
  );
}
