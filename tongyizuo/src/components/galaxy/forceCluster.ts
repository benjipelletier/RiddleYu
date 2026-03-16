// src/components/galaxy/forceCluster.ts

export interface ClusteredNode {
  cluster: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

/**
 * D3 force factory: attracts nodes toward their cluster centroid.
 * Strength 0.12 — enough to group clusters without fighting other forces.
 * Usage: simulation.force('cluster', forceCluster())
 */
export function forceCluster<N extends ClusteredNode>() {
  let nodes: N[] = [];

  function force(alpha: number) {
    // Compute centroid per cluster
    const centroids: Record<string, { x: number; y: number; n: number }> = {};
    for (const n of nodes) {
      const c =
        centroids[n.cluster] ?? (centroids[n.cluster] = { x: 0, y: 0, n: 0 });
      c.x += n.x ?? 0;
      c.y += n.y ?? 0;
      c.n++;
    }
    for (const c of Object.values(centroids)) {
      c.x /= c.n;
      c.y /= c.n;
    }

    // Nudge each node toward its cluster centroid
    const strength = 0.12 * alpha;
    for (const n of nodes) {
      const c = centroids[n.cluster];
      if (!c) continue;
      n.vx = (n.vx ?? 0) + (c.x - (n.x ?? 0)) * strength;
      n.vy = (n.vy ?? 0) + (c.y - (n.y ?? 0)) * strength;
    }
  }

  force.initialize = (n: N[]) => {
    nodes = n;
  };

  return force;
}
