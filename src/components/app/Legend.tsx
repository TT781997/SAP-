import { useRef, useState } from "react";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { t } from "@/i18n";
import type { Lang } from "@/data/types";
import { cn } from "@/lib/utils";

export function Legend({ lang }: { lang: Lang }) {
  const [collapsed, setCollapsed] = useState(true);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const drag = useRef<{
    pointerX: number;
    pointerY: number;
    left: number;
    top: number;
  } | null>(null);

  function clamp(nextX: number, nextY: number) {
    const el = panelRef.current;
    const parent = el?.offsetParent as HTMLElement | null;
    if (!el || !parent) return { x: Math.max(8, nextX), y: Math.max(8, nextY) };
    const maxX = Math.max(8, parent.clientWidth - el.offsetWidth - 8);
    const maxY = Math.max(8, parent.clientHeight - el.offsetHeight - 8);
    return {
      x: Math.min(maxX, Math.max(8, nextX)),
      y: Math.min(maxY, Math.max(8, nextY)),
    };
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button[data-legend-toggle]")) return;
    const el = panelRef.current;
    if (!el) return;
    const parent = el.offsetParent as HTMLElement | null;
    const pr = parent?.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const left = r.left - (pr?.left ?? 0);
    const top = r.top - (pr?.top ?? 0);
    drag.current = { pointerX: e.clientX, pointerY: e.clientY, left, top };
    setPos({ x: left, y: top });
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.pointerX;
    const dy = e.clientY - drag.current.pointerY;
    setPos(clamp(drag.current.left + dx, drag.current.top + dy));
  }

  function onPointerUp() {
    drag.current = null;
  }

  const states = [
    ["stateActive", "bg-layer-lob"],
    ["stateRecommended", "bg-accent"],
    ["stateOptional", "bg-fg-muted"],
    ["stateLegacy", "bg-fg-subtle"],
    ["stateIrrelevant", "bg-fg-subtle/40"],
  ] as const;
  const edges = [
    ["edgeNative", "border-solid border-layer-core"],
    ["edgeCleanCore", "border-dashed border-layer-plataforma"],
    ["edgeNetwork", "border-dotted border-layer-infra"],
    ["edgeGov", "border-dashed border-layer-alm"],
  ] as const;

  return (
    <aside
      ref={panelRef}
      className="pointer-events-auto absolute z-30 w-56 rounded-lg border border-border bg-bg-elevated/95 shadow-[var(--shadow-border)]"
      style={
        pos
          ? { left: pos.x, top: pos.y }
          : { left: 16, bottom: 16 }
      }
    >
      <div
        className="flex touch-none items-center gap-1 border-b border-border px-2 py-1"
        style={{ cursor: "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <span className="inline-flex size-8 items-center justify-center text-fg-subtle" aria-hidden>
          <GripVertical className="size-4" />
        </span>
        <p className="min-w-0 flex-1 text-[11px] font-medium uppercase tracking-wide text-fg-subtle">
          {t(lang, "legend")}
        </p>
        <button
          type="button"
          data-legend-toggle
          className="inline-flex size-8 items-center justify-center rounded-sm text-fg-muted"
          aria-label={collapsed ? t(lang, "legend") : t(lang, "legendMin")}
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
      </div>
      {collapsed ? null : (
        <div className="max-h-64 overflow-auto p-2.5 text-[11px] text-fg-muted">
          <p className="mb-2 text-[10px] text-fg-subtle">{t(lang, "legendDrag")}</p>
          <ul className="space-y-1.5">
            {states.map(([key, cls]) => (
              <li key={key} className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", cls)} />
                {t(lang, key)}
              </li>
            ))}
          </ul>
          <ul className="mt-3 space-y-1.5 border-t border-border pt-2">
            {edges.map(([key, cls]) => (
              <li key={key} className="flex items-center gap-2">
                <span className={cn("w-6 border-t-2", cls)} />
                {t(lang, key)}
              </li>
            ))}
          </ul>
          <ul className="mt-3 space-y-1.5 border-t border-border pt-2">
            <li className="flex items-center gap-2">
              <svg width="28" height="10" aria-hidden>
                <defs>
                  <marker id="leg-uni" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
                  </marker>
                </defs>
                <line x1="2" y1="5" x2="22" y2="5" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#leg-uni)" />
              </svg>
              {t(lang, "edgeUni")}
            </li>
            <li className="flex items-center gap-2">
              <svg width="28" height="10" aria-hidden>
                <defs>
                  <marker id="leg-bi-s" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto-start-reverse">
                    <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
                  </marker>
                  <marker id="leg-bi-e" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
                  </marker>
                </defs>
                <line
                  x1="6"
                  y1="5"
                  x2="22"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  markerStart="url(#leg-bi-s)"
                  markerEnd="url(#leg-bi-e)"
                />
              </svg>
              {t(lang, "edgeBi")}
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
}
