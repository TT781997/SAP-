import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Factory, Globe, Laptop, MonitorSmartphone, Store, UserCog, Warehouse } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Camada } from "@/data/types";

const LAYER_HEX: Record<string, string> = {
  infra: "#64748b",
  dados: "#0891b2",
  plataforma: "#0070F2",
  integracao: "#7c3aed",
  core: "#0070F2",
  lob: "#0f7a54",
  alm: "#0070F2",
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

function Handles() {
  return (
    <>
      <Handle type="target" position={Position.Left} id="tl" className="!pointer-events-none opacity-0" />
      <Handle type="source" position={Position.Right} id="sr" className="!pointer-events-none opacity-0" />
      <Handle type="source" position={Position.Left} id="sl" className="!pointer-events-none opacity-0" />
      <Handle type="target" position={Position.Right} id="tr" className="!pointer-events-none opacity-0" />
      <Handle type="target" position={Position.Left} className="!pointer-events-none opacity-0" />
      <Handle type="source" position={Position.Right} className="!pointer-events-none opacity-0" />
      <Handle type="target" position={Position.Top} id="t" className="!pointer-events-none opacity-0" />
      <Handle type="source" position={Position.Bottom} id="b" className="!pointer-events-none opacity-0" />
      <Handle type="source" position={Position.Top} id="st" className="!pointer-events-none opacity-0" />
      <Handle type="target" position={Position.Bottom} id="tb" className="!pointer-events-none opacity-0" />
    </>
  );
}

export function SapCardNode({ data, selected }: NodeProps) {
  const camada = (data.camada as Camada) || "core";
  const muted = Boolean(data.muted);
  const kind = String(data.kind ?? "product");
  const Icon = data.icon ? ICONS[String(data.icon)] : null;
  const hex = LAYER_HEX[camada] ?? "#0070F2";
  const hop = kind === "hop";

  return (
    <div
      className={cn(
        "relative h-full w-full cursor-pointer px-2.5 py-1.5",
        hop ? "rounded-full border bg-[#eaf3ff]" : "rounded-xl border bg-white shadow-[0_1px_2px_rgba(15,42,80,0.06)]",
        selected ? "border-[#0070F2] ring-2 ring-[#0070F2]/25" : "border-[#c5d4e8]",
        muted && "opacity-55",
      )}
      style={hop ? { borderColor: "#9ec4f0" } : undefined}
    >
      <Handles />
      <div className="flex h-full items-start gap-2">
        {Icon || !hop ? (
          <span
            className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-white"
            style={{ background: hex }}
          >
            {Icon ? <Icon className="size-3.5" strokeWidth={2} /> : <span className="size-1.5 rounded-full bg-white" />}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="hyph text-[12px] font-semibold leading-snug text-[#16324f]">{String(data.label)}</p>
          {data.sub && !hop ? (
            <p className="mt-0.5 line-clamp-2 text-[10px] leading-tight text-[#4a6584]">{String(data.sub)}</p>
          ) : null}
          {data.sapTerm ? (
            <p className="mt-0.5 truncate text-[9px] leading-tight text-[#7b93ab]">{String(data.sapTerm)}</p>
          ) : null}
          {data.badge ? (
            <span className="mt-1 inline-block rounded-full bg-[#eaf3ff] px-1.5 py-px text-[9px] font-medium text-[#0070F2]">
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
      <p className="truncate text-[13px] font-semibold tracking-tight text-[#16324f]">{String(data.label)}</p>
    </div>
  );
}
