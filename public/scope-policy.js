/* Shared, side-effect-free filtering rules for the graph, tree and tests. */
window.createAtlasScope = function (data) {
  const nodes = new Map(data.nodes.map(n => [n.id, n]));
  function lineage(node) { const ids = []; const seen = new Set(); while (node && !seen.has(node.id)) { ids.push(node.id); seen.add(node.id); node = nodes.get(node.parent); } return ids; }
  function rule(node) { const ids = lineage(node); return (data.hostingRules || []).find(r => ids.includes(r.nodeId)); }
  function provider(node) { return node?.infrastructureProvider || (node?.infrastructure ? node.provider : null); }
  function allowedNode(state, node) {
    if (!node || node.hiddenInTree) return false;
    const ids = lineage(node);
    if (state.model === 'onprem' || state.provider === 'On-premise') {
      if (ids.includes('s4-public') || ids.includes('s4-private')) return false;
      if (node.infrastructure) return provider(node) === 'On-premise';
      return ids.includes('sap-core') || ['root', 's4hana', 's4-onprem'].includes(node.id) || ids.includes('ops');
    }
    if (node.infrastructure) return provider(node) === state.provider;
    // A managed SAP product may remain visible as an explicitly documented exception.
    // Its foreign-provider infrastructure is still filtered out; it is not moved into the selected cloud.
    return true;
  }
  function allowedEdge(state, edge) { return allowedNode(state, nodes.get(edge.from)) && allowedNode(state, nodes.get(edge.to)); }
  function exception(state, node) { const r = rule(node); return r && !r.providers.includes(state.provider) ? r : null; }
  return { allowedNode, allowedEdge, provider, rule, exception, lineage };
};
