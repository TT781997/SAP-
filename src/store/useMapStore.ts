import { create } from "zustand";
import { COLLAPSED_CLUSTERS, PROFILE_CLUSTER } from "@/data/constants";
import { TEMPLATE_BY_ID } from "@/data/templates";
import type {
  InfraChoice,
  Lang,
  Preset,
  Profile,
  SchematicFamily,
  SchematicFocus,
  TemplateId,
  ViewMode,
} from "@/data/types";

const LANG_KEY = "sap-map-lang";
const DARK_KEY = "sap-map-dark";

export interface MapStore {
  lang: Lang;
  preset: Preset;
  infra: InfraChoice;
  profiles: Profile[];
  showLegacy: boolean;
  view: ViewMode;
  schematicId: string;
  family: SchematicFamily;
  focus: SchematicFocus;
  template: TemplateId;
  caminhoMinimo: boolean;
  showRest: boolean;
  collapsed: Set<string>;
  selectedId: string | null;
  hoverId: string | null;
  history: string[];
  search: string;
  searchOpen: boolean;
  zoom: number;
  filtersOpen: boolean;
  darkMode: boolean;
  setLang: (lang: Lang) => void;
  setPreset: (preset: Preset) => void;
  setInfra: (infra: InfraChoice) => void;
  toggleProfile: (p: Profile) => void;
  setShowLegacy: (v: boolean) => void;
  setView: (v: ViewMode) => void;
  setSchematicId: (id: string) => void;
  setFamily: (f: SchematicFamily) => void;
  setFocus: (f: SchematicFocus) => void;
  setTemplate: (id: TemplateId) => void;
  setCaminho: (v: boolean) => void;
  setShowRest: (v: boolean) => void;
  toggleCluster: (id: string) => void;
  select: (id: string | null) => void;
  pushSelect: (id: string) => void;
  goBack: () => void;
  setHover: (id: string | null) => void;
  setSearch: (q: string) => void;
  setSearchOpen: (v: boolean) => void;
  setZoom: (z: number) => void;
  setFiltersOpen: (v: boolean) => void;
  setDarkMode: (v: boolean) => void;
  clearSelection: () => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
  lang: "pt",
  preset: "rise",
  infra: "azure",
  profiles: [],
  showLegacy: false,
  view: "home",
  schematicId: "journey",
  family: "journey",
  focus: "overview",
  template: "A",
  caminhoMinimo: true,
  showRest: false,
  collapsed: new Set(COLLAPSED_CLUSTERS),
  selectedId: null,
  hoverId: null,
  history: [],
  search: "",
  searchOpen: false,
  zoom: 1,
  filtersOpen: false,
  darkMode: false,
  setLang: (lang) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANG_KEY, lang);
      document.documentElement.lang = lang === "pt" ? "pt-PT" : lang;
    }
    set({ lang });
  },
  setPreset: (preset) => {
    set({
      preset,
      selectedId: null,
      history: [],
      showRest: false,
      focus: "overview",
    });
  },
  setInfra: (infra) => {
    set({ infra, focus: "overview" });
  },
  toggleProfile: (p) => {
    const cur = get().profiles;
    const next = cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p];
    const collapsed = new Set(get().collapsed);
    for (const profile of next) {
      const cluster = PROFILE_CLUSTER[profile];
      if (cluster) collapsed.delete(cluster);
    }
    set({
      profiles: next,
      collapsed,
    });
  },
  setShowLegacy: (v) => set({ showLegacy: v }),
  setView: (v) => set({ view: v }),
  setSchematicId: (id) => set({ schematicId: id, view: "schematic", family: "inside" }),
  setFamily: (family) =>
    set({
      family,
      view: "schematic",
      focus: family === "floor" ? "floor" : "overview",
      schematicId: family === "inside" ? get().schematicId === "journey" ? "btp-interior" : get().schematicId : "journey",
    }),
  setFocus: (focus) => set({ focus, family: focus === "floor" ? "floor" : "journey" }),
  setTemplate: (id) => {
    const tpl = TEMPLATE_BY_ID[id];
    set({
      template: id,
      preset: tpl.suggestedPreset ?? get().preset,
      infra: tpl.suggestedInfra ?? get().infra,
      family: "journey",
      focus: "overview",
      schematicId: "journey",
      selectedId: null,
      history: [],
    });
  },
  setCaminho: (v) => set({ caminhoMinimo: v, showRest: v ? false : true }),
  setShowRest: (v) => set({ showRest: v, caminhoMinimo: v ? false : true }),
  toggleCluster: (id) => {
    const next = new Set(get().collapsed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    set({ collapsed: next });
  },
  select: (id) => set({ selectedId: id, history: id ? [id] : [] }),
  pushSelect: (id) => {
    const { selectedId, history } = get();
    set({
      selectedId: id,
      history: selectedId ? [...history, selectedId] : [id],
    });
  },
  goBack: () => {
    const history = [...get().history];
    const prev = history.pop();
    set({ selectedId: prev ?? null, history });
  },
  setHover: (id) => set({ hoverId: id }),
  setSearch: (q) => set({ search: q, searchOpen: q.length > 0 }),
  setSearchOpen: (v) => set({ searchOpen: v }),
  setZoom: (z) => set({ zoom: Math.min(1.4, Math.max(0.6, z)) }),
  setFiltersOpen: (v) => set({ filtersOpen: v }),
  setDarkMode: (v) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DARK_KEY, v ? "1" : "0");
      document.documentElement.classList.toggle("dark", v);
    }
    set({ darkMode: v });
  },
  clearSelection: () => set({ selectedId: null, history: [], hoverId: null }),
}));

export { LANG_KEY, DARK_KEY };
