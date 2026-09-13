import type { Lang, ServiceCopy } from "@/data/types";
import { CHROME, LANG_META } from "./chrome";
import { EXTRA } from "./extra";
import { services as ptServices } from "./copy/pt";
import { services as enServices } from "./copy/en";
import { services as frServices } from "./copy/fr";
import { services as deServices } from "./copy/de";
import { services as esServices } from "./copy/es";

const COPIES: Record<Lang, Record<string, ServiceCopy>> = {
  pt: ptServices,
  en: enServices,
  fr: frServices,
  de: deServices,
  es: esServices,
};

export function t(lang: Lang, key: string): string {
  const extra = EXTRA[lang]?.[key] ?? EXTRA.pt[key];
  if (extra) return extra;
  const table = CHROME[lang] ?? CHROME.pt;
  const value = table[key] ?? CHROME.pt[key];
  if (!value) {
    if (typeof console !== "undefined") {
      console.warn("[i18n] missing key", lang, key);
    }
    return CHROME.pt[key] ?? key;
  }
  return value;
}

export function serviceCopy(lang: Lang, id: string): ServiceCopy | undefined {
  return COPIES[lang]?.[id] ?? COPIES.pt[id];
}

export function allCopies(lang: Lang): Record<string, ServiceCopy> {
  return COPIES[lang] ?? COPIES.pt;
}

export { LANG_META, CHROME, COPIES };
