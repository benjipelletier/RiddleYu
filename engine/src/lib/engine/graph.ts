import type { LexicalUnit, GrammarConstruction, Character, SemanticField, Edge, Encounter, NodeWithDistance } from './types';

export class KnowledgeGraph {
  nodes: Map<string, LexicalUnit> = new Map();
  nodesBySurface: Map<string, LexicalUnit> = new Map();
  characters: Map<string, Character> = new Map();
  constructions: Map<string, GrammarConstruction> = new Map();
  fields: Map<string, SemanticField> = new Map();
  edges: Edge[] = [];
  edgesBySource: Map<string, Edge[]> = new Map();
  edgesByTarget: Map<string, Edge[]> = new Map();
  encounters: Encounter[] = [];

  static async load(sql: any): Promise<KnowledgeGraph> {
    const graph = new KnowledgeGraph();

    const [luRows, charRows, gcRows, fieldRows, edgeRows, encRows] = await Promise.all([
      sql.query('SELECT * FROM lexical_units'),
      sql.query('SELECT * FROM characters'),
      sql.query('SELECT * FROM grammar_constructions'),
      sql.query('SELECT * FROM semantic_fields'),
      sql.query('SELECT * FROM edges'),
      sql.query('SELECT * FROM encounters ORDER BY created_at DESC'),
    ]);

    for (const r of luRows) {
      const node: LexicalUnit = {
        id: r.id,
        surface_form: r.surface_form,
        pinyin: r.pinyin,
        primary_gloss: r.primary_gloss,
        unit_type: r.unit_type,
        recognition: Number(r.recognition),
        production: Number(r.production),
        register_awareness: Number(r.register_awareness),
        collocational_prec: Number(r.collocational_prec),
        recognition_uncertainty: Number(r.recognition_uncertainty),
        production_uncertainty: Number(r.production_uncertainty),
        register_uncertainty: Number(r.register_uncertainty),
        collocational_uncertainty: Number(r.collocational_uncertainty),
        learning_state: r.learning_state,
        last_reinforced_recognition: r.last_reinforced_recognition ? new Date(r.last_reinforced_recognition) : null,
        last_reinforced_production: r.last_reinforced_production ? new Date(r.last_reinforced_production) : null,
        peak_recognition: Number(r.peak_recognition),
        peak_production: Number(r.peak_production),
        frequency_rank: r.frequency_rank,
        registers: r.registers ?? [],
        complexity_tier: r.complexity_tier,
        component_chars: r.component_chars ?? [],
        context_breadth: r.context_breadth,
        encounter_count: r.encounter_count,
        created_at: new Date(r.created_at),
        updated_at: new Date(r.updated_at),
      };
      graph.nodes.set(node.id, node);
      graph.nodesBySurface.set(node.surface_form, node);
    }

    for (const r of charRows) {
      graph.characters.set(r.id, {
        id: r.id,
        character: r.character,
        pinyin_readings: r.pinyin_readings ?? [],
        radical: r.radical,
        stroke_count: r.stroke_count,
        node_type: r.node_type,
        familiarity: Number(r.familiarity),
        known_word_count: r.known_word_count,
        updated_at: new Date(r.updated_at),
      });
    }

    for (const r of gcRows) {
      graph.constructions.set(r.id, {
        id: r.id,
        pattern_name: r.pattern_name,
        pattern_template: r.pattern_template,
        description: r.description,
        comprehension: Number(r.comprehension),
        production: Number(r.production),
        complexity_tier: r.complexity_tier,
        common_errors: r.common_errors ?? {},
        last_reinforced: r.last_reinforced ? new Date(r.last_reinforced) : null,
        created_at: new Date(r.created_at),
      });
    }

    for (const r of fieldRows) {
      graph.fields.set(r.id, {
        id: r.id,
        name: r.name,
        name_zh: r.name_zh,
        description: r.description,
        node_count: r.node_count,
        avg_recognition: Number(r.avg_recognition),
        avg_production: Number(r.avg_production),
        coverage_pct: Number(r.coverage_pct),
        updated_at: new Date(r.updated_at),
      });
    }

    for (const r of edgeRows) {
      const edge: Edge = {
        id: r.id,
        source_id: r.source_id,
        target_id: r.target_id,
        source_type: r.source_type,
        target_type: r.target_type,
        edge_type: r.edge_type,
        metadata: r.metadata ?? {},
        weight: Number(r.weight),
        created_at: new Date(r.created_at),
      };
      graph.edges.push(edge);
      if (!graph.edgesBySource.has(edge.source_id)) graph.edgesBySource.set(edge.source_id, []);
      graph.edgesBySource.get(edge.source_id)!.push(edge);
      if (!graph.edgesByTarget.has(edge.target_id)) graph.edgesByTarget.set(edge.target_id, []);
      graph.edgesByTarget.get(edge.target_id)!.push(edge);
    }

    for (const r of encRows) {
      graph.encounters.push({
        id: r.id,
        node_id: r.node_id,
        node_type: r.node_type,
        signal_type: r.signal_type,
        signal_strength: Number(r.signal_strength),
        source_type: r.source_type,
        source_id: r.source_id,
        source_title: r.source_title,
        context_snippet: r.context_snippet,
        updates_recognition: r.updates_recognition,
        updates_production: r.updates_production,
        updates_register: r.updates_register,
        updates_collocation: r.updates_collocation,
        created_at: new Date(r.created_at),
      });
    }

    return graph;
  }

  // --- Query methods ---

  getNeighbors(nodeId: string, edgeType?: string, maxHops: number = 1): NodeWithDistance[] {
    const results: NodeWithDistance[] = [];
    const visited = new Set<string>([nodeId]);

    let frontier = [nodeId];
    for (let hop = 1; hop <= maxHops; hop++) {
      const nextFrontier: string[] = [];
      for (const id of frontier) {
        const forwardEdges = this.edgesBySource.get(id) ?? [];
        const reverseEdges = this.edgesByTarget.get(id) ?? [];
        const allEdges = [...forwardEdges, ...reverseEdges];

        for (const edge of allEdges) {
          if (edgeType && edge.edge_type !== edgeType) continue;
          const neighborId = edge.source_id === id ? edge.target_id : edge.source_id;
          if (visited.has(neighborId)) continue;
          visited.add(neighborId);

          const node = this.nodes.get(neighborId) ?? this.constructions.get(neighborId) ?? this.characters.get(neighborId);
          if (node) {
            results.push({ node: node as any, distance: hop, edgeType: edge.edge_type });
            nextFrontier.push(neighborId);
          }
        }
      }
      frontier = nextFrontier;
    }

    return results;
  }

  isKnown(surfaceForm: string, threshold: number = 0.5): boolean {
    const node = this.nodesBySurface.get(surfaceForm);
    return node ? node.recognition >= threshold : false;
  }

  getKnownNodes(threshold: number = 0.5): LexicalUnit[] {
    return Array.from(this.nodes.values()).filter(n => n.recognition >= threshold);
  }

  getCharFamiliarity(char: string): number {
    for (const c of this.characters.values()) {
      if (c.character === char) return c.familiarity;
    }
    return 0;
  }

  findBySurface(surfaceForm: string): LexicalUnit | undefined {
    return this.nodesBySurface.get(surfaceForm);
  }

  getSemanticFields(): SemanticField[] {
    return Array.from(this.fields.values());
  }

  getAllConstructions(): GrammarConstruction[] {
    return Array.from(this.constructions.values());
  }

  getFieldCoverage(fieldId: string): number {
    const field = this.fields.get(fieldId);
    return field?.coverage_pct ?? 0;
  }

  getFieldNodes(fieldId: string): LexicalUnit[] {
    const edges = this.edgesByTarget.get(fieldId) ?? [];
    return edges
      .filter(e => e.edge_type === 'belongs_to_field')
      .map(e => this.nodes.get(e.source_id))
      .filter((n): n is LexicalUnit => n !== undefined);
  }

  getEdges(nodeId: string, edgeType?: string, direction?: 'forward' | 'reverse'): Edge[] {
    let edges: Edge[] = [];
    if (!direction || direction === 'forward') {
      edges = edges.concat(this.edgesBySource.get(nodeId) ?? []);
    }
    if (!direction || direction === 'reverse') {
      edges = edges.concat(this.edgesByTarget.get(nodeId) ?? []);
    }
    if (edgeType) {
      edges = edges.filter(e => e.edge_type === edgeType);
    }
    return edges;
  }

  getSynonyms(surfaceForm: string): LexicalUnit[] {
    const node = this.nodesBySurface.get(surfaceForm);
    if (!node) return [];
    const edges = this.getEdges(node.id, 'synonym');
    return edges
      .map(e => {
        const otherId = e.source_id === node.id ? e.target_id : e.source_id;
        return this.nodes.get(otherId);
      })
      .filter((n): n is LexicalUnit => n !== undefined);
  }

  getCommonCollocates(surfaceForm: string): LexicalUnit[] {
    const node = this.nodesBySurface.get(surfaceForm);
    if (!node) return [];
    const edges = this.getEdges(node.id, 'collocation');
    return edges
      .map(e => {
        const otherId = e.source_id === node.id ? e.target_id : e.source_id;
        return this.nodes.get(otherId);
      })
      .filter((n): n is LexicalUnit => n !== undefined);
  }

  getRequiredConstructions(surfaceForm: string): GrammarConstruction[] {
    const node = this.nodesBySurface.get(surfaceForm);
    if (!node) return [];
    const edges = this.getEdges(node.id, 'requires_grammar', 'forward');
    return edges
      .map(e => this.constructions.get(e.target_id))
      .filter((g): g is GrammarConstruction => g !== undefined);
  }

  getFieldsForWord(surfaceForm: string): SemanticField[] {
    const node = this.nodesBySurface.get(surfaceForm);
    if (!node) return [];
    const edges = this.getEdges(node.id, 'belongs_to_field', 'forward');
    return edges
      .map(e => this.fields.get(e.target_id))
      .filter((f): f is SemanticField => f !== undefined);
  }

  getCrossFieldEdgeCount(nodeId: string): number {
    const nodeFields = new Set(
      (this.edgesBySource.get(nodeId) ?? [])
        .filter(e => e.edge_type === 'belongs_to_field')
        .map(e => e.target_id)
    );
    if (nodeFields.size <= 1) return 0;
    return nodeFields.size - 1;
  }

  getEncounterContextTypes(nodeId: string): string[] {
    return [...new Set(
      this.encounters
        .filter(e => e.node_id === nodeId)
        .map(e => e.source_type)
    )];
  }

  getEncountersByDay(windowDays: number = 30): Map<string, { total: number; bySource: Record<string, number>; newNodes: number }> {
    const now = new Date();
    const cutoff = new Date(now.getTime() - windowDays * 86400000);
    const dayMap = new Map<string, { total: number; bySource: Record<string, number>; newNodes: number }>();

    for (const enc of this.encounters) {
      if (enc.created_at < cutoff) continue;
      const dateStr = enc.created_at.toISOString().slice(0, 10);
      if (!dayMap.has(dateStr)) {
        dayMap.set(dateStr, { total: 0, bySource: {}, newNodes: 0 });
      }
      const day = dayMap.get(dateStr)!;
      day.total++;
      day.bySource[enc.source_type] = (day.bySource[enc.source_type] ?? 0) + 1;
    }

    // Count new nodes per day (approximation: nodes whose created_at falls in window)
    for (const node of this.nodes.values()) {
      if (node.created_at >= cutoff) {
        const dateStr = node.created_at.toISOString().slice(0, 10);
        if (!dayMap.has(dateStr)) {
          dayMap.set(dateStr, { total: 0, bySource: {}, newNodes: 0 });
        }
        dayMap.get(dateStr)!.newNodes++;
      }
    }

    return dayMap;
  }
}
