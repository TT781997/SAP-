import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Factory, Globe, Laptop, MonitorSmartphone, Store, UserCog, Warehouse } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Camada } from "@/data/types";

const LAYER_BAR: Record<string, string> = {
  infra: "bg-layer-infra",
  dados: "bg-layer-dados",
  plataforma: "bg-layer-plataforma",
  integracao: "bg-layer-integracao",
  core: "bg-layer-core",
  lob: "bg-layer-lob",
  alm: "bg-layer-alm",
};

const ICONS: Record<string, typeof Laptop> = {
  laptop: Laptop,
  warehouse: Warehouse,
  ops: UserCog,
  till: Store,
  tablet: MonitorSmartphone,
  factory: Factory,
  globe: Globe,
};

export function SapCardNode({ data, selected }: NodeProps) {
  const camada = (data.camada as Camada) || "core";
  const muted = Boolean(data.muted);
  const Icon = data.icon ? ICONS[String(data.icon)] : null;
  return (
    <div
      className={cn(
        "relative h-full w-full cursor-pointer rounded-lg border border-border-strong bg-card px-2.5 py-1.5",
        "shadow-[var(--shadow-border)] transition-[box-shadow,transform,opacity] duration-150",
        selected
          ? "border-accent shadow-[var(--shadow-border-hover)]"
          : "border-border hover:shadow-[var(--shadow-border-hover)]",
        muted && "opacity-55",
      )}
    >
      <span
        className={cn(
          "absolute inset-y-0 left-0 w-0.5 rounded-l-lg",
          LAYER_BAR[camada] ?? "bg-layer-core",
        )}
      />
      <Handle type="target" position={Position.Left} id="tl" className="!pointer-events-none opacity-0" />
      <Handle type="source" position={Position.Right} id="sr" className="!pointer-events-none opacity-0" />
      <Handle type="target" position={Position.Left} className="!pointer-events-none opacity-0" />
      <Handle type="source" position={Position.Right} className="!pointer-events-none opacity-0" />
      <Handle type="target" position={Position.Top} id="t" className="!pointer-events-none opacity-0" />
      <Handle type="source" position={Position.Bottom} id="b" className="!pointer-events-none opacity-0" />
      <Handle type="source" position={Position.Top} id="st" className="!pointer-events-none opacity-0" />
      <Handle type="target" position={Position.Bottom} id="tb" className="!pointer-events-none opacity-0" />
      <div className="flex h-full items-start gap-2 pl-1">
        {Icon ? (
          <Icon className="mt-0.5 size-3.5 shrink-0 text-fg-muted" strokeWidth={1.75} />
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="hyph text-[12px] font-semibold leading-snug text-fg">{String(data.label)}</p>
          {data.sub ? (
            <p className="mt-0.5 line-clamp-2 text-[10px] leading-tight text-fg-muted">
              {String(data.sub)}
            </p>
          ) : null}
          {data.sapTerm ? (
            <p className="mt-0.5 truncate text-[9px] leading-tight text-fg-subtle">{String(data.sapTerm)}</p>
          ) : null}
          {data.badge ? (
            <span className="mt-1 inline-block rounded-sm bg-bg-subtle px-1 py-px text-[9px] font-medium text-fg-muted">
              {String(data.badge)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function SapLabelNode({ data }: NodeProps) {
  return (
    <div className="pointer-events-none flex h-full w-full items-center px-0.5">
      <p className="truncate text-[12px] font-semibold tracking-wide text-fg">
        {String(data.label)}
      </p>
    </div>
  );
}
