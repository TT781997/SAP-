import { useMemo } from "react";
import { schematicFor } from "@/schematics";
import { useMapStore } from "@/store/useMapStore";

export function useCurrentSchematic() {
  const lang = useMapStore((s) => s.lang);
  const preset = useMapStore((s) => s.preset);
  const infra = useMapStore((s) => s.infra);
  const template = useMapStore((s) => s.template);
  const caminhoMinimo = useMapStore((s) => s.caminhoMinimo);
  const profiles = useMapStore((s) => s.profiles);
  const focus = useMapStore((s) => s.focus);
  const family = useMapStore((s) => s.family);
  const schematicId = useMapStore((s) => s.schematicId);

  return useMemo(
    () =>
      schematicFor({
        lang,
        preset,
        infra,
        template,
        caminhoMinimo,
        profiles,
        focus,
        family,
        schematicId,
      }),
    [lang, preset, infra, template, caminhoMinimo, profiles, focus, family, schematicId],
  );
}
