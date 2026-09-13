import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

/** Search normalizer: trim, NFD, lower, collapse spaces/hyphens, optional SAP prefix. */
export function normalizeSearch(raw: string): string {
  let s = stripDiacritics(raw).trim().toLowerCase();
  s = s.replace(/[-_./]+/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  if (s.startsWith("sap ")) s = s.slice(4);
  return s;
}

export function compactKey(raw: string): string {
  return normalizeSearch(raw).replace(/\s+/g, "");
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
