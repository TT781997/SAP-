import { cn } from "@/lib/utils";
import { Monogram } from "./Monogram";
import type { Camada, Status } from "@/data/types";

const STATUS_CLASS: Record<Status, string> = {
  activo: "text-layer-lob",
  recomendado: "text-accent",
  opcional: "text-fg-muted",
  legado: "text-fg-subtle",
  irrelevante: "text-fg-subtle",
};

export function ServiceCard({
  id,
  nome,
  tipo,
  camada,
  status,
  step,
  gold,
  goldLabel,
  dim,
  selected,
  highlighted,
  statusLabel,
  onSelect,
  onHover,
}: {
  id: string;
  nome: string;
  tipo: string;
  camada: Camada;
  status: Status;
  step?: number | null;
  gold?: boolean;
  goldLabel?: string;
  dim?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  statusLabel: string;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <button
      type="button"
      data-card-id={id}
      aria-label={`${nome}, ${tipo}`}
      onClick={() => onSelect(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
      className={cn(
        "glass-card relative flex min-h-[88px] w-full items-start gap-2.5 rounded-2xl p-3 text-left",
        "transition-[transform,box-shadow,opacity,filter] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "active:scale-[0.96]",
        selected && "ring-2 ring-accent",
        gold && !selected && "ring-2 ring-gold",
        highlighted && "ring-1 ring-accent/70",
        dim && "opacity-35 grayscale",
        status === "irrelevante" && "opacity-[0.22] grayscale",
        status === "legado" && "scale-[0.98]",
      )}
    >
      {step ? (
        <span className="absolute -left-1.5 -top-1.5 z-10 inline-flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-fg tabular-nums">
          {step}
        </span>
      ) : null}
      <Monogram name={nome} camada={camada} />
      <span className="min-w-0 flex-1">
        <span className="hyph block text-[13px] font-medium leading-snug text-fg line-clamp-2">
          {nome}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className="rounded-sm bg-bg-subtle px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-fg-muted">
            {tipo}
          </span>
          <span className={cn("text-[10px] font-medium", STATUS_CLASS[status])}>{statusLabel}</span>
          {gold && goldLabel ? (
            <span className="rounded-sm bg-gold/20 px-1.5 py-0.5 text-[10px] font-medium text-gold">
              {goldLabel}
            </span>
          ) : null}
        </span>
      </span>
    </button>
  );
}

export function ClusterCard({
  label,
  count,
  camada,
  onOpen,
  countLabel,
}: {
  label: string;
  count: number;
  camada: Camada;
  onOpen: () => void;
  countLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="glass-card flex min-h-[88px] w-full flex-col items-start justify-center gap-1 rounded-2xl p-3 text-left transition-transform duration-150 active:scale-[0.96]"
    >
      <Monogram name={label} camada={camada} />
      <span className="mt-1 text-[13px] font-medium text-fg">{label}</span>
      <span className="rounded-sm bg-bg-subtle px-1.5 py-0.5 text-[10px] text-fg-muted">
        {count} {countLabel}
      </span>
    </button>
  );
}
