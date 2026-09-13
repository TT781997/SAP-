import type { Schematic } from "@/data/types";
import { EXPERT_BY_ID, EXPERT_SCHEMATICS } from "./expert";
import { buildJourney, type JourneyInput } from "./journey";

export { buildJourney, EXPERT_SCHEMATICS, EXPERT_BY_ID };
export type { JourneyInput };

export const SCHEMATICS: Schematic[] = EXPERT_SCHEMATICS;

export const SCHEMATIC_BY_ID: Record<string, Schematic> = {
  ...EXPERT_BY_ID,
};

export function schematicFor(input: JourneyInput & { family: "journey" | "inside" | "floor"; schematicId: string }): Schematic {
  if (input.family === "inside") {
    return EXPERT_BY_ID[input.schematicId] ?? EXPERT_SCHEMATICS[0];
  }
  return buildJourney({
    ...input,
    focus: input.family === "floor" ? "floor" : input.focus,
  });
}
