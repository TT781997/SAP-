import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import { prefersReducedMotion } from "@/lib/utils";
import { SapCardNode, SapLabelNode } from "@/components/flow/SapCardNode";
import { SapEdge } from "@/components/flow/SapEdge";
import { t } from "@/i18n";
import { useCurrentSchematic } from "@/hooks/useCurrentSchematic";
import { useMapStore } from "@/store/useMapStore";
import type { Lang, Schematic } from "@/data/types";

const nodeTypes = { sapCard: SapCardNode, sapLabel: SapLabelNode };
const edgeTypes = { sapEdge: SapEdge };

const LAYER_COLOR: Record<string, string> = {
  infra: "#64748b",
  dados: "#06b6d4",
  plataforma: "#0070F2",
  integracao: "#8b5cf6",
  core: "#0070F2",
  lob: "#0f7a54",
  alm: "#0070F2",
};

function groupSkin(camada: string | undefined, dark: boolean): Record<string, string | number> {
  const border = LAYER_COLOR[camada ?? "core"] ?? "#0070F2";
  const dashed = camada === "infra";
  const fill = dark
    ? `color-mix(in oklab, ${border} 14%, #10161f)`
    : `color-mix(in oklab, ${border} 7%, #ffffff)`;
  return {
    width: 0,
    height: 0,
    background: fill,
    border: dashed ? `2px dashed ${border}` : `2px solid ${border}`,
    borderRadius: 16,
    padding: 10,
    boxShadow: dark ? "none" : "0 1px 0 rgba(15, 42, 80, 0.04)",
  };
}

function toFlow(
  sch: Schematic,
  lang: Lang,
  reduced: boolean,
  selectedId: string | null,
  dark: boolean,
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = sch.nodes.map((n) => {
    const isGroup = n.type === "group";
    const w = Number(n.style?.width ?? 180);
    const h = Number(n.style?.height ?? (isGroup ? 120 : 56));
    const serviceId = n.data.serviceId as string | undefined;
    return {
      id: n.id,
      type: isGroup ? "group" : n.type === "sapLabel" ? "sapLabel" : "sapCard",
      position: n.position,
      parentId: n.parentId,
      extent: n.extent,
      style: isGroup
        ? { ...groupSkin(n.data.camada, dark), width: w, height: h }
        : { width: w, height: h },
      data: { ...n.data, lang },
      selectable: !isGroup && n.type !== "sapLabel" && Boolean(serviceId),
      selected: Boolean(serviceId && serviceId === selectedId),
      draggable: false,
      connectable: false,
    };
  });
  const edges: Edge[] = sch.edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    sourceHandle: e.sourceHandle,
    targetHandle: e.targetHandle,
    type: "sapEdge",
    animated: reduced ? false : Boolean(e.animated),
    label: e.label,
    zIndex: 1000,
    data: {
      kind: e.kind,
      labelOffset: e.labelOffset ?? 0,
      labelDx: e.labelDx ?? 0,
      number: e.number,
      dashed: e.dashed,
      pathOffset: e.pathOffset ?? 22,
      dark,
    },
  }));
  return { nodes, edges };
}

function Inner({ sch }: { sch: Schematic }) {
  const lang = useMapStore((s) => s.lang);
  const selectedId = useMapStore((s) => s.selectedId);
  const select = useMapStore((s) => s.select);
  const darkMode = useMapStore((s) => s.darkMode);
  const reduced = prefersReducedMotion();
  const initial = useMemo(
    () => toFlow(sch, lang, reduced, selectedId, darkMode),
    [sch, lang, reduced, selectedId, darkMode],
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(initial.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initial.edges);
  const { fitView } = useReactFlow();

  useEffect(() => {
    const next = toFlow(sch, lang, reduced, useMapStore.getState().selectedId, darkMode);
    setNodes(next.nodes);
    setEdges(next.edges);
  }, [sch, lang, reduced, darkMode, setNodes, setEdges]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        selected: Boolean(n.data?.serviceId && n.data.serviceId === selectedId),
      })),
    );
  }, [selectedId, setNodes]);

  useEffect(() => {
    const tmr = window.setTimeout(() => fitView({ padding: 0.04, minZoom: 0.28, maxZoom: 1.15 }), 80);
    return () => window.clearTimeout(tmr);
  }, [sch, lang, fitView]);

  const onNodeClick = useCallback(
    (_: unknown, node: Node) => {
      const sid = node.data?.serviceId as string | undefined;
      if (sid) select(sid);
    },
    [select],
  );

  return (
    <ReactFlow
      colorMode={darkMode ? "dark" : "light"}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onPaneClick={() => select(null)}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodesConnectable={false}
      nodesDraggable={false}
      elementsSelectable
      panOnDrag={false}
      panOnScroll
      zoomOnScroll
      zoomOnPinch
      selectionOnDrag={false}
      fitView
      proOptions={{ hideAttribution: true }}
      minZoom={0.25}
      maxZoom={1.7}
      defaultEdgeOptions={{ type: "sapEdge" }}
    >
      <Background gap={24} color={darkMode ? "#1e293b" : "#d5e3f0"} />
      <MiniMap
        pannable
        zoomable
        nodeColor={(n) => LAYER_COLOR[String(n.data?.camada ?? "infra")] ?? "#64748b"}
      />
      <Controls showInteractive={false} />
      <Panel
        position="bottom-center"
        className="rounded-md bg-bg/80 px-3 py-1 text-[11px] text-fg-subtle"
      >
        {sch.footnote[lang]}
      </Panel>
    </ReactFlow>
  );
}

function exportSvg(title: string) {
  const el = document.querySelector(".react-flow__viewport") as HTMLElement | null;
  if (!el) return;
  const svgNodes = el.querySelectorAll("svg");
  const parts = [...svgNodes].map((s) => s.outerHTML).join("");
  const blob = new Blob(
    [
      `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800">${parts}</svg>`,
    ],
    { type: "image/svg+xml" },
  );
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.svg`;
  a.click();
}

export function SchematicView() {
  const [mounted, setMounted] = useState(false);
  const lang = useMapStore((s) => s.lang);
  const setView = useMapStore((s) => s.setView);
  const sch = useCurrentSchematic();

  useEffect(() => setMounted(true), []);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-1.5">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[13px] font-semibold text-fg">{sch.title[lang]}</h2>
          <p className="truncate text-[11px] text-fg-muted">{sch.subtitle[lang]}</p>
        </div>
        <button
          type="button"
          className="h-8 rounded-sm border border-border px-2 text-[12px] text-fg-muted"
          onClick={() => setView("map")}
        >
          {t(lang, "seePortfolio")}
        </button>
        <button
          type="button"
          className="h-8 rounded-sm border border-border px-2 text-[12px] text-fg-muted"
          onClick={() => exportSvg(sch.title[lang])}
        >
          {t(lang, "exportSvg")}
        </button>
      </div>
      {mounted ? (
        <div className="min-h-[280px] min-w-0 flex-1">
          <ReactFlowProvider key={`${sch.id}-${sch.width}-${sch.height}-${lang}-${sch.title[lang]}`}>
            <Inner sch={sch} />
          </ReactFlowProvider>
        </div>
      ) : (
        <div className="min-h-[280px] min-w-0 flex-1 bg-bg" />
      )}
    </div>
  );
}
