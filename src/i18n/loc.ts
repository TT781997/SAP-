import type { Lang } from "@/data/types";

export type Loc = Record<Lang, string>;

export function loc(pt: string, en: string, fr: string, de: string, es: string): Loc {
  return { pt, en, fr, de, es };
}

export function pick(text: Loc | undefined, lang: Lang, fallback = ""): string {
  if (!text) return fallback;
  return text[lang] || text.pt || fallback;
}
