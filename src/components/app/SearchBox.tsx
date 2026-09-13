import { Search } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { SERVICOS, SERVICO_BY_ID } from "@/data/catalog";
import { searchServices } from "@/data/search";
import { allCopies, t, serviceCopy } from "@/i18n";
import { useCurrentSchematic } from "@/hooks/useCurrentSchematic";
import { useMapStore } from "@/store/useMapStore";

export function SearchBox() {
  const lang = useMapStore((s) => s.lang);
  const query = useMapStore((s) => s.search);
  const open = useMapStore((s) => s.searchOpen);
  const setSearch = useMapStore((s) => s.setSearch);
  const setSearchOpen = useMapStore((s) => s.setSearchOpen);
  const select = useMapStore((s) => s.select);
  const setView = useMapStore((s) => s.setView);
  const view = useMapStore((s) => s.view);
  const sch = useCurrentSchematic();
  const boxRef = useRef<HTMLDivElement>(null);

  const hits = useMemo(
    () => searchServices(query, SERVICOS, allCopies(lang), lang),
    [query, lang],
  );

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setSearchOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [setSearchOpen]);

  function pick(id: string) {
    select(id);
    setSearchOpen(false);
    const onSchema = sch.nodes.some((n) => n.data.serviceId === id);
    if (view === "schematic" && onSchema) return;
    setView("map");
    requestAnimationFrame(() => {
      document.querySelector(`[data-card-id="${id}"]`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }

  return (
    <div ref={boxRef} className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
      <input
        type="search"
        value={query}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => query && setSearchOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && hits[0]) pick(hits[0].id);
          if (e.key === "Escape") setSearchOpen(false);
        }}
        placeholder={t(lang, "searchPlaceholder")}
        aria-label={t(lang, "searchPlaceholder")}
        className="h-10 w-full rounded-md border border-border bg-bg-subtle pl-8 pr-3 text-[13px] text-fg placeholder:text-fg-subtle"
        suppressHydrationWarning
      />
      {open && query ? (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-md border border-border bg-bg-elevated py-1 shadow-[var(--shadow-border-hover)]"
        >
          {hits.length === 0 ? (
            <li className="px-3 py-2 text-[12px] text-fg-muted">{t(lang, "searchEmpty")}</li>
          ) : (
            hits.map((h) => {
              const s = SERVICO_BY_ID[h.id];
              const copy = serviceCopy(lang, h.id);
              const extra =
                query.trim().toLowerCase() === "sci" && h.id === "integration-suite"
                  ? t(lang, "alsoKnown")
                  : null;
              return (
                <li key={h.id}>
                  <button
                    type="button"
                    className="flex w-full items-start gap-2 px-3 py-2 text-left hover:bg-bg-subtle"
                    onClick={() => pick(h.id)}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-fg">
                        {copy?.nome ?? s?.nome ?? h.id}
                      </span>
                      <span className="block text-[11px] text-fg-muted">
                        {copy?.tipo ?? s?.tipo}
                        {extra ? ` · ${extra}` : ""}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      ) : null}
    </div>
  );
}
