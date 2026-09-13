import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SERVICOS, SERVICO_BY_ID } from "@/data/catalog";
import {
  CLUSTER_META,
  COLLAPSED_CLUSTERS,
  EDGE_KIND_FOR_PAIR,
  LAYER_ORDER,
} from "@/data/constants";
import {
  computeStatus,
  isArchiveRow,
  isVisible,
  pathwayIds,
  pathwayStep,
  type MixState,
} from "@/data/status";
import { serviceCopy, t } from "@/i18n";
import { cn } from "@/lib/utils";
import { useMapStore } from "@/store/useMapStore";
import { ClusterCard, ServiceCard } from "./ServiceCard";
import { Legend } from "./Legend";
import type { Camada, EdgeKind, Lang, Servico, Status } from "@/data/types";

const LAYER_TINT: Record<Camada, string> = {
  alm: "bg-layer-alm/10",
  lob: "bg-layer-lob/10",
  core: "bg-layer-core/10",
  integracao: "bg-layer-integracao/10",
  plataforma: "bg-layer-plataforma/10",
  dados: "bg-layer-dados/10",
  infra: "bg-layer-infra/10",
};

const EDGE_COLOR: Record<EdgeKind, string> = {
  nativo: "#0ea5e9",
  cleancore: "#059669",
  rede: "#64748b",
  governa: "#f43f5e",
};

export function MapView({ mix }: { mix: MixState }) {
  const lang = useMapStore((s) => s.lang);
  const collapsed = useMapStore((s) => s.collapsed);
  const toggleCluster = useMapStore((s) => s.toggleCluster);
  const selectedId = useMapStore((s) => s.selectedId);
  const hoverId = useMapStore((s) => s.hoverId);
  const select = useMapStore((s) => s.select);
  const setHover = useMapStore((s) => s.setHover);
  const zoom = useMapStore((s) => s.zoom);
  const setZoom = useMapStore((s) => s.setZoom);
  const profiles = useMapStore((s) => s.profiles);
  const search = useMapStore((s) => s.search);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState<DrawnEdge[]>([]);

  const byLayer = useMemo(() => {
    const map = new Map<Camada, Servico[]>();
    for (const c of LAYER_ORDER) map.set(c, []);
    for (const s of SERVICOS) {
      const status = computeStatus(s, mix);
      if (!isVisible(s, mix, status)) continue;
      map.get(s.camada)?.push(s);
    }
    return map;
  }, [mix]);

  const focusId = selectedId ?? hoverId;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setEdges(measureEdges(canvasRef.current, focusId, mix, Boolean(selectedId)));
    });
    return () => cancelAnimationFrame(frame);
  }, [focusId, selectedId, mix, byLayer, zoom]);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="pointer-events-auto absolute bottom-3 right-3 z-20 flex gap-1">
        <IconBtn label="−" onClick={() => setZoom(zoom - 0.1)} />
        <IconBtn label="+" onClick={() => setZoom(zoom + 0.1)} />
        <IconBtn label="1:1" onClick={() => setZoom(1)} />
      </div>
      <div
        ref={canvasRef}
        className="relative min-h-0 flex-1 overflow-auto"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (!target.closest("[data-card-id]")) select(null);
        }}
      >
        <div
          className="origin-top-left"
          style={{ transform: `scale(${zoom})`, width: `${100 / zoom}%` }}
        >
          {LAYER_ORDER.map((camada) => {
            const all = byLayer.get(camada) ?? [];
            const live: Servico[] = [];
            const archive: Servico[] = [];
            for (const s of all) {
              const st = computeStatus(s, mix);
              if (isArchiveRow(s, st, mix)) archive.push(s);
              else live.push(s);
            }
            return (
              <section
                key={camada}
                className={cn("relative border-b border-border/80", LAYER_TINT[camada])}
              >
                <div className="sticky top-0 z-10 bg-bg/70 px-3 py-2 backdrop-blur-sm lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-44 lg:flex-col lg:justify-center lg:bg-transparent lg:px-3 lg:py-3 lg:backdrop-blur-none">
                  <h2 className="text-[12px] font-semibold text-fg">
                    {t(lang, `layers.${camada}`)}
                  </h2>
                  <p className="text-[10px] leading-snug text-fg-muted">
                    {t(lang, `layers.${camada}Sub`)}
                  </p>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-3 lg:pl-48">
                  {renderLayerCards({
                    items: live,
                    camada,
                    collapsed,
                    toggleCluster,
                    lang,
                    mix,
                    profiles,
                    selectedId,
                    hoverId,
                    search,
                    onSelect: select,
                    onHover: setHover,
                  })}
                </div>
                {archive.length > 0 ? (
                  <div className="border-t border-border/50 px-3 pb-3 lg:pl-48">
                    <p className="mb-2 text-[10px] uppercase tracking-wide text-fg-subtle">
                      {t(lang, "archive")}
                    </p>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2 opacity-80">
                      {archive.map((s) => {
                        const st = computeStatus(s, mix);
                        const copy = serviceCopy(lang, s.id);
                        return (
                          <ServiceCard
                            key={s.id}
                            id={s.id}
                            nome={copy?.nome ?? s.nome}
                            tipo={copy?.tipo ?? s.tipo}
                            camada={s.camada}
                            status={st}
                            gold={s.perfisRecomendados.some((p) => profiles.includes(p))}
                            goldLabel={
                              s.perfisRecomendados.some((p) => profiles.includes(p))
                                ? t(lang, "profileTag")
                                : undefined
                            }
                            selected={selectedId === s.id}
                            highlighted={hoverId === s.id}
                            dim={Boolean(selectedId) && selectedId !== s.id}
                            statusLabel={statusLabel(lang, st)}
                            onSelect={select}
                            onHover={setHover}
                          />
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          <defs>
            {(Object.keys(EDGE_COLOR) as EdgeKind[]).map((kind) => (
              <g key={kind}>
                <marker
                  id={`map-arrow-${kind}`}
                  markerWidth="10"
                  markerHeight="8"
                  refX="9"
                  refY="4"
                  orient="auto"
                  markerUnits="userSpaceOnUse"
                >
                  <polygon points="0 0, 10 4, 0 8" fill={EDGE_COLOR[kind]} />
                </marker>
                <marker
                  id={`map-arrow-rev-${kind}`}
                  markerWidth="10"
                  markerHeight="8"
                  refX="9"
                  refY="4"
                  orient="auto-start-reverse"
                  markerUnits="userSpaceOnUse"
                >
                  <polygon points="0 0, 10 4, 0 8" fill={EDGE_COLOR[kind]} />
                </marker>
              </g>
            ))}
          </defs>
          {edges.map((e) => (
            <g key={e.key}>
              <path
                d={e.d}
                fill="none"
                stroke={EDGE_COLOR[e.kind]}
                strokeWidth={selectedId ? 1.8 : 1.4}
                strokeOpacity={selectedId ? 0.95 : 0.7}
                strokeDasharray={
                  e.kind === "cleancore"
                    ? "7 6"
                    : e.kind === "rede"
                      ? "2 5"
                      : e.kind === "governa"
                        ? "10 5 2 5"
                        : undefined
                }
                markerEnd={`url(#map-arrow-${e.kind})`}
                markerStart={e.bidirectional ? `url(#map-arrow-rev-${e.kind})` : undefined}
              />
              {e.label ? (
                <text
                  x={e.lx}
                  y={e.ly}
                  textAnchor="middle"
                  className="fill-fg-muted"
                  style={{ fontSize: 10 }}
                >
                  {e.label}
                </text>
              ) : null}
            </g>
          ))}
        </svg>
      </div>
      <Legend lang={lang} />
    </div>
  );
}

function statusLabel(lang: Lang, st: Status): string {
  const keys: Record<Status, string> = {
    activo: "stateActive",
    recomendado: "stateRecommended",
    opcional: "stateOptional",
    legado: "stateLegacy",
    irrelevante: "stateIrrelevant",
  };
  return t(lang, keys[st]);
}

function renderLayerCards(args: {
  items: Servico[];
  camada: Camada;
  collapsed: Set<string>;
  toggleCluster: (id: string) => void;
  lang: Lang;
  mix: MixState;
  profiles: MixState["profiles"];
  selectedId: string | null;
  hoverId: string | null;
  search: string;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}): ReactNode[] {
  const shown = new Set<string>();
  const nodes: ReactNode[] = [];
  const clusterIds = Object.keys(CLUSTER_META);
  const related = new Set(
    args.selectedId ? (SERVICO_BY_ID[args.selectedId]?.ligaA ?? []) : [],
  );

  for (const s of args.items) {
    if (shown.has(s.id)) continue;
    const cid = s.cluster && clusterIds.includes(s.cluster) ? s.cluster : null;
    const collapsedHere =
      cid &&
      args.collapsed.has(cid) &&
      (COLLAPSED_CLUSTERS as readonly string[]).includes(cid);
    if (collapsedHere && cid) {
      const members = args.items.filter((x) => x.cluster === cid);
      members.forEach((m) => shown.add(m.id));
      const meta = CLUSTER_META[cid];
      nodes.push(
        <ClusterCard
          key={`cluster-${cid}`}
          label={meta.label[args.lang]}
          count={members.length}
          camada={args.camada}
          countLabel={t(args.lang, "clusterServices")}
          onOpen={() => args.toggleCluster(cid)}
        />,
      );
      continue;
    }
    shown.add(s.id);
    const st = computeStatus(s, args.mix);
    const copy = serviceCopy(args.lang, s.id);
    const step = pathwayStep(s.id, args.mix);
    nodes.push(
      <ServiceCard
        key={s.id}
        id={s.id}
        nome={copy?.nome ?? s.nome}
        tipo={copy?.tipo ?? s.tipo}
        camada={s.camada}
        status={st}
        step={args.mix.caminhoMinimo ? step : null}
        gold={s.perfisRecomendados.some((p) => args.profiles.includes(p))}
        goldLabel={
          s.perfisRecomendados.some((p) => args.profiles.includes(p))
            ? t(args.lang, "profileTag")
            : undefined
        }
        selected={args.selectedId === s.id}
        highlighted={args.hoverId === s.id}
        dim={Boolean(args.selectedId) && args.selectedId !== s.id && !related.has(s.id)}
        statusLabel={statusLabel(args.lang, st)}
        onSelect={args.onSelect}
        onHover={args.onHover}
      />,
    );
  }
  return nodes;
}

interface DrawnEdge {
  key: string;
  d: string;
  kind: EdgeKind;
  label?: string;
  lx: number;
  ly: number;
  bidirectional: boolean;
}

function measureEdges(
  root: HTMLElement | null,
  focusId: string | null,
  mix: MixState,
  selected: boolean,
): DrawnEdge[] {
  if (!root) return [];
  const canvas = root;
  const origin = canvas.getBoundingClientRect();
  function box(id: string) {
    const el = canvas.querySelector(`[data-card-id="${id}"]`) as HTMLElement | null;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x: r.left - origin.left + canvas.scrollLeft + r.width / 2,
      y: r.top - origin.top + canvas.scrollTop + r.height / 2,
      hw: r.width / 2,
      hh: r.height / 2,
    };
  }

  const pairs: Array<{ a: string; b: string; kind: EdgeKind; bidirectional: boolean }> = [];
  const seen = new Set<string>();
  function pushPair(a: string, b: string, kind: EdgeKind, bidirectional: boolean) {
    const key = a < b ? `${a}|${b}` : `${b}|${a}`;
    if (seen.has(key)) return;
    seen.add(key);
    pairs.push({ a, b, kind, bidirectional });
  }

  if (mix.caminhoMinimo) {
    const spine = pathwayIds(mix);
    for (let i = 0; i < spine.length - 1; i++) {
      const a = SERVICO_BY_ID[spine[i]];
      const b = SERVICO_BY_ID[spine[i + 1]];
      if (!a || !b) continue;
      pushPair(a.id, b.id, EDGE_KIND_FOR_PAIR(a.camada, b.camada, a.id, b.id), false);
    }
  }
  if (focusId) {
    const s = SERVICO_BY_ID[focusId];
    if (s) {
      for (const b of s.ligaA.slice(0, 8)) {
        if (!SERVICO_BY_ID[b]) continue;
        const back = SERVICO_BY_ID[b].ligaA.includes(focusId);
        pushPair(
          focusId,
          b,
          EDGE_KIND_FOR_PAIR(s.camada, SERVICO_BY_ID[b].camada, s.id, b),
          back,
        );
      }
    }
  }

  const out: DrawnEdge[] = [];
  for (const p of pairs) {
    const A = box(p.a);
    const B = box(p.b);
    if (!A || !B) continue;
    const midX = (A.x + B.x) / 2;
    const startX = A.x + (midX >= A.x ? A.hw - 4 : -(A.hw - 4));
    const endX = B.x + (midX >= B.x ? B.hw - 4 : -(B.hw - 4));
    const d = `M ${startX} ${A.y} L ${midX} ${A.y} L ${midX} ${B.y} L ${endX} ${B.y}`;
    out.push({
      key: `${p.a}-${p.b}-${p.kind}`,
      d,
      kind: p.kind,
      label: selected ? (p.bidirectional ? "↔" : "→") : undefined,
      lx: midX,
      ly: (A.y + B.y) / 2 - 4,
      bidirectional: p.bidirectional,
    });
  }
  return out;
}

function IconBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-border bg-bg-elevated px-2 text-[12px] text-fg"
    >
      {label}
    </button>
  );
}
