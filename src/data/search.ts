import { compactKey, normalizeSearch } from "@/lib/utils";
import type { Lang, Servico } from "./types";
import type { ServiceCopy } from "./types";

const HELP_REDIRECTS: Array<{ test: (q: string) => boolean; id: string; label: string }> = [
  {
    test: (q) => /edifact|ansi\s*x12|eancom|peppol|oagis|pidx|gusi/.test(q),
    id: "integration-suite",
    label: "EDI / B2B guides",
  },
  {
    test: (q) => /sybase|maxdb|sql anywhere|db2|sql server/.test(q),
    id: "hana-onprem",
    label: "AnyDB",
  },
  {
    test: (q) => /webi|crystal server|live office|design studio/.test(q),
    id: "businessobjects",
    label: "BusinessObjects",
  },
];

export interface SearchHit {
  id: string;
  score: number;
  reason: string;
}

function haystack(s: Servico, copy: ServiceCopy | undefined, lang: Lang): string[] {
  const fields = [
    s.id,
    s.nome,
    copy?.nome ?? "",
    s.tipo,
    copy?.tipo ?? "",
    s.camada,
    ...(s.aliases || []),
    s.satelitesHelp ?? "",
    (copy?.oQueFaz ?? s.oQueFaz).slice(0, 200),
  ];
  return fields.filter(Boolean);
}

export function searchServices(
  query: string,
  services: Servico[],
  copies: Record<string, ServiceCopy>,
  lang: Lang,
): SearchHit[] {
  const raw = query.trim();
  if (!raw) return [];
  const nq = normalizeSearch(raw);
  const cq = compactKey(raw);
  if (!cq) return [];

  const hits: SearchHit[] = [];

  for (const hint of HELP_REDIRECTS) {
    if (hint.test(nq) || hint.test(cq)) {
      hits.push({ id: hint.id, score: 80, reason: hint.label });
    }
  }

  for (const s of services) {
    const copy = copies[s.id];
    const fields = haystack(s, copy, lang);
    let score = 0;
    let reason = "";

    const idKey = compactKey(s.id);
    if (cq === idKey) {
      score = 100;
      reason = "id";
    }

    for (const f of fields) {
      const nf = normalizeSearch(f);
      const cf = compactKey(f);
      if (!cf) continue;
      if (cq === cf) {
        if (score < 96) {
          score = 96;
          reason = "alias";
        }
      } else if (cf.startsWith(cq) || nf.startsWith(nq)) {
        if (score < 70) {
          score = 70;
          reason = "prefix";
        }
      } else if (cf.includes(cq) || nf.includes(nq)) {
        if (score < 40) {
          score = 40;
          reason = "contains";
        }
      }
    }

    if (cq === "sci") {
      if (s.id === "sci") score = 100;
      else if (s.id === "integration-suite") score = Math.max(score, 60);
    }

    if (score > 0) hits.push({ id: s.id, score, reason });
  }

  const best = new Map<string, SearchHit>();
  for (const h of hits) {
    const prev = best.get(h.id);
    if (!prev || h.score > prev.score) best.set(h.id, h);
  }

  return [...best.values()].sort((a, b) => b.score - a.score).slice(0, 10);
}
