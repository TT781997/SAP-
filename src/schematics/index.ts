import type { Schematic } from "@/data/types";
import { EXPERT_BY_ID, EXPERT_SCHEMATICS } from "./expert";
import { buildJourney, type JourneyInput } from "./journey";

export { buildJourney, EXPERT_SCHEMATICS, EXPERT_BY_ID };
export type { JourneyInput };

export const SCHEMATICS: Schematic[] = EXPERT_SCHEMATICS;

export const SCHEMATIC_BY_ID: Record<string, Schematic> = {
  ...EXPERT_BY_ID,
};

/** One canvas: laptop → wiring inside → floor. No family switch. */
export function schematicFor(input: JourneyInput & { family?: string; schematicId?: string }): Schematic {
  return buildJourney(input);
}
