import { cn } from "@/lib/utils";
import type { Camada } from "@/data/types";

const FILL: Record<Camada, string> = {
  infra: "bg-layer-infra",
  dados: "bg-layer-dados",
  plataforma: "bg-layer-plataforma",
  integracao: "bg-layer-integracao",
  core: "bg-layer-core",
  lob: "bg-layer-lob",
  alm: "bg-layer-alm",
};

export function Monogram({
  name,
  camada,
  className,
}: {
  name: string;
  camada: Camada;
  className?: string;
}) {
  const letters = name
    .replace(/^SAP\s+/i, "")
    .split(/\s+/)
    .filter((w) => !/^(and|the|of|de|do|da|e|y|und)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-sm text-[11px] font-semibold text-bg",
        FILL[camada],
        className,
      )}
    >
      {letters || "S"}
    </span>
  );
}
