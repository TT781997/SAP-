import {
  ACTIVE_BY_PRESET,
  IRRELEVANT_BY_PRESET,
  LEGACY_IDS,
  OPTIONAL_BY_PRESET,
  PATHWAY_INFRA,
  PROFILE_EXTRAS,
  RECOMMENDED_WHEN,
} from "./constants";
import { TEMPLATE_PATHWAY } from "./templates";
import type { InfraChoice, Preset, Profile, Servico, Status, TemplateId } from "./types";

export interface MixState {
  preset: Preset;
  infra: InfraChoice;
  showLegacy: boolean;
  profiles: Profile[];
  caminhoMinimo: boolean;
  showRest: boolean;
  template: TemplateId;
}

export function isHyperscaler(id: string): boolean {
  return id === "aws" || id === "azure" || id === "gcp" || id === "sci";
}

export function computeStatus(s: Servico, mix: MixState): Status {
  const { preset, infra, showLegacy, profiles } = mix;

  if (isHyperscaler(s.id)) {
    if (preset === "onprem") return "irrelevante";
    return s.id === infra ? "activo" : "irrelevante";
  }

  for (const rule of RECOMMENDED_WHEN) {
    if (rule.id !== s.id) continue;
    if (!rule.presets.includes(preset)) continue;
    if (!rule.profiles || rule.profiles.some((p) => profiles.includes(p))) {
      return "recomendado";
    }
  }

  if (
    profiles.length &&
    profiles.some((p) => (PROFILE_EXTRAS[p] ?? []).includes(s.id)) &&
    !IRRELEVANT_BY_PRESET[preset].has(s.id) &&
    !isHyperscaler(s.id)
  ) {
    return "recomendado";
  }

  if (ACTIVE_BY_PRESET[preset].has(s.id)) return "activo";

  if (IRRELEVANT_BY_PRESET[preset].has(s.id)) {
    if (showLegacy && LEGACY_IDS.has(s.id)) return "legado";
    return "irrelevante";
  }

  if (OPTIONAL_BY_PRESET[preset].has(s.id)) {
    if (LEGACY_IDS.has(s.id) && !showLegacy && preset !== "onprem") {
      return "irrelevante";
    }
    return "opcional";
  }

  if (LEGACY_IDS.has(s.id)) {
    if (preset === "onprem") return "activo";
    return showLegacy ? "legado" : "irrelevante";
  }

  if (s.cenarios.includes(preset)) return "opcional";
  return showLegacy && LEGACY_IDS.has(s.id) ? "legado" : "irrelevante";
}

export function pathwayIds(mix: MixState): string[] {
  const spine = TEMPLATE_PATHWAY[mix.template] ?? TEMPLATE_PATHWAY.A;
  const infraId = mix.preset === "onprem" ? "dc-onprem" : PATHWAY_INFRA[mix.infra];
  const ids = [infraId, ...spine.filter((id) => id !== "sci" || mix.infra === "sci")];
  return [...new Set(ids)];
}

export function isOnPathway(id: string, mix: MixState): boolean {
  return pathwayIds(mix).includes(id);
}

export function isProfileExtra(id: string, mix: MixState): boolean {
  return mix.profiles.some((p) => (PROFILE_EXTRAS[p] ?? []).includes(id));
}

export function pathwayStep(id: string, mix: MixState): number | null {
  const i = pathwayIds(mix).indexOf(id);
  return i >= 0 ? i + 1 : null;
}

export function isVisible(s: Servico, mix: MixState, status: Status): boolean {
  if (mix.caminhoMinimo && !mix.showRest) {
    return isOnPathway(s.id, mix) || isProfileExtra(s.id, mix);
  }
  if (status === "irrelevante" && !mix.showLegacy) {
    if (LEGACY_IDS.has(s.id)) return false;
    if (isHyperscaler(s.id) && s.id !== mix.infra) return true;
    if (status === "irrelevante" && !s.cenarios.includes(mix.preset) && !mix.showRest) {
      return mix.showRest;
    }
  }
  if (LEGACY_IDS.has(s.id) && !mix.showLegacy && mix.preset !== "onprem") {
    return false;
  }
  return true;
}

export function isArchiveRow(s: Servico, status: Status, mix: MixState): boolean {
  if (!mix.showLegacy) return false;
  return status === "legado" || (LEGACY_IDS.has(s.id) && status !== "activo");
}
