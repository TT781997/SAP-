import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";

const KIND_HEX: Record<string, { light: string; dark: string }> = {
  nativo: { light: "#16324f", dark: "#e2e8f0" },
  cleancore: { light: "#047857", dark: "#34d399" },
  rede: { light: "#334155", dark: "#94a3b8" },
  governa: { light: "#e11d48", dark: "#fb7185" },
};

const STEP_HEX = ["#d97706", "#c026d3", "#059669", "#0284c7"];

export function SapEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  label,
  selected,
}: EdgeProps) {
  const payload = data as
    | {
        kind?: string;
        labelOffset?: number;
        labelDx?: number;
        number?: number;
        dashed?: boolean;
        pathOffset?: number;
        dark?: boolean;
      }
    | undefined;
  const kind = String(payload?.kind ?? "nativo");
  const dy = Number(payload?.labelOffset ?? 0);
  const dx = Number(payload?.labelDx ?? 0);
  const number = payload?.number;
  const dark = Boolean(payload?.dark);
  const color = number
    ? STEP_HEX[(number - 1) % 4]
    : (KIND_HEX[kind] ?? KIND_HEX.nativo)[dark ? "dark" : "light"];
  const dash =
    payload?.dashed || kind === "cleancore"
      ? "7 6"
      : kind === "rede"
        ? "3 5"
        : kind === "governa"
          ? "10 5 2 5"
          : undefined;

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 16,
    offset: Number(payload?.pathOffset ?? 22),
  });

  const markerId = `sap-arrow-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const strokeW = selected || number ? 2.6 : 2.1;

  return (
    <>
      <defs>
        <marker
          id={markerId}
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M 1 1 L 11 6 L 1 11 z" fill={color} />
        </marker>
      </defs>
      <BaseEdge
        id={`${id}-halo`}
        path={edgePath}
        style={{
          stroke: dark ? "#0b1220" : "#ffffff",
          strokeWidth: strokeW + 5,
          fill: "none",
          opacity: 0.95,
        }}
      />
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={`url(#${markerId})`}
        style={{
          stroke: color,
          strokeWidth: strokeW,
          strokeDasharray: dash,
          fill: "none",
          opacity: 1,
        }}
      />
      {number || label ? (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan pointer-events-none absolute flex max-w-[200px] items-center gap-1"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX + dx}px, ${labelY + dy}px)`,
              zIndex: 50,
            }}
          >
            {number ? (
              <span
                className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white tabular-nums shadow-md ring-2 ring-white"
                style={{ background: STEP_HEX[(number - 1) % 4] }}
              >
                {number}
              </span>
            ) : null}
            {label ? (
              <span
                className="rounded-full px-2 py-0.5 text-center text-[10px] font-semibold leading-tight shadow-sm"
                style={{
                  background: dark ? "#0f172a" : "#ffffff",
                  color: dark ? "#f8fafc" : "#0f172a",
                  border: `1px solid ${dark ? "#64748b" : "#94a3b8"}`,
                }}
              >
                {String(label)}
              </span>
            ) : null}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}
