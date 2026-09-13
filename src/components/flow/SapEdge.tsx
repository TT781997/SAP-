import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";

const KIND_COLOR: Record<string, string> = {
  nativo: "var(--fg)",
  cleancore: "var(--identity)",
  rede: "var(--color-layer-infra)",
  governa: "var(--color-layer-alm)",
};

const STEP_COLOR = [
  "var(--step-1)",
  "var(--step-2)",
  "var(--step-3)",
  "var(--step-4)",
];

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
  markerEnd,
  style,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 12,
  });
  const payload = data as
    | { kind?: string; labelOffset?: number; labelDx?: number; number?: number; dashed?: boolean }
    | undefined;
  const kind = String(payload?.kind ?? "nativo");
  const dy = Number(payload?.labelOffset ?? 0);
  const dx = Number(payload?.labelDx ?? 0);
  const number = payload?.number;
  const color = number ? STEP_COLOR[(number - 1) % 4] : KIND_COLOR[kind] ?? KIND_COLOR.nativo;
  const dash =
    payload?.dashed || kind === "cleancore"
      ? "6 6"
      : kind === "rede"
        ? "2 5"
        : kind === "governa"
          ? "10 5 2 5"
          : undefined;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: color,
          strokeWidth: selected || number ? 1.8 : 1.25,
          strokeDasharray: dash,
          opacity: selected ? 0.95 : number ? 0.85 : 0.45,
        }}
      />
      {number || label ? (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan pointer-events-none absolute flex max-w-[180px] items-center gap-1"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX + dx}px, ${labelY + dy}px)`,
            }}
          >
            {number ? (
              <span
                className="inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white tabular-nums"
                style={{ background: STEP_COLOR[(number - 1) % 4] }}
              >
                {number}
              </span>
            ) : null}
            {label ? (
              <span className="rounded-sm bg-bg/92 px-1.5 py-0.5 text-center text-[10px] leading-tight text-fg-muted">
                {String(label)}
              </span>
            ) : null}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}
