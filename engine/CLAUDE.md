# 知识引擎 (Zhīshì Yǐnqíng) — Claude Code Handoff

## What This Is

A comprehensive dashboard that visualizes the internals of a Chinese language knowledge graph engine. The dashboard is the first buildable piece of a larger system — by implementing it with realistic mock data, we stand up the data model, rendering infrastructure, and UI patterns that the real engine will eventually populate.

The dashboard's primary job is: **show me everything the engine knows and is doing, so I can spot when something's wrong and iterate the engine design.**

---

## Reference Documents

- **Master Engine Spec**: `zhishi-yinqing-master-spec.md` — the full technical specification for the knowledge graph engine (data model, algorithms, scoring, content pipeline). This is the source of truth for all data structures and concepts.
- **Dashboard Prototype**: `knowledge-engine-dashboard.jsx` — a working React artifact showing the current UI direction. Use this for visual reference and data shape, but rebuild properly in the Next.js app.
- **注解 PRD**: `zhujie-prd.md` — the annotation tool that will be the engine's primary data source. Not in scope for this build, but referenced for integration context.

---

## Scope: What to Build

### 1. Database Schema (Neon Postgres)

Implement the full schema from the master spec. All tables:

- `lexical_units` — primary knowledge nodes with multi-dimensional confidence vectors, uncertainty per dimension, learning state
- `grammar_constructions` — tracked grammar patterns
- `characters` — lightweight derived sub-nodes
- `semantic_fields` — knowledge domain clusters
- `edges` — typed relationships between all node types
- `encounters` — append-only signal log
- `content_items`, `content_segments`, `content_tokens`, `content_grammar` — content pipeline storage
- `content_learner_overlay` — per-learner content matching cache

See Section 2 of the master spec for exact CREATE TABLE statements. Implement them verbatim — the column types, defaults, and indexes are all intentional.

### 2. Seed Data

Generate realistic mock data representing an intermediate-advanced Mandarin learner with this profile:

- **Strong**: everyday conversation, emotions/relationships vocabulary, CPop lyrics, casual spoken register
- **Medium**: food, nature, travel, history/culture
- **Weak**: formal written register, politics/law, medicine/health, business/technology
- **Grammar**: good comprehension on most patterns, but production significantly lags. Clear avoidance patterns on 把 constructions, 被 passives, 连...都

Target graph size:
- ~4000 lexical unit nodes across all learning states (new, acquired, decaying, forgotten)
- ~500 character sub-nodes
- ~12-15 grammar constructions
- ~12 semantic fields
- ~15-20k edges
- ~30 days of encounter history (~10-20 encounters/day)

The seed data should be actual Chinese words with correct pinyin and glosses — not placeholder text. Use real vocabulary at realistic frequency distributions. The confidence scores, uncertainty values, and learning states should follow the distributions defined in the master spec (e.g., production never exceeds recognition, uncertainty starts at 1.0 and decreases with encounters, learning state transitions based on peak recognition thresholds).

The seed script should be idempotent (can re-run without duplication).

### 3. In-Memory Graph Engine

Implement the `KnowledgeGraph` TypeScript class from the master spec appendix:

```typescript
class KnowledgeGraph {
  static async load(db): Promise<KnowledgeGraph>  // hydrate from Postgres
  getNeighbors(nodeId, edgeType?, maxHops?): NodeWithDistance[]
  isKnown(surfaceForm, threshold?): boolean
  getKnownNodes(threshold?): LexicalUnit[]
  getCharFamiliarity(char): number
  async flush(db): Promise<void>  // persist changes
}
```

Plus the computation functions:
- `effectiveConfidence()` — context-weighted decay
- `updateConfidence()` — encounter-based updates with uncertainty reduction
- `deriveLearningState()` — automatic state transitions
- `deriveCharacterFamiliarity()` — computed from containing words
- `masteryScore()` — weighted aggregate per goal profile

And the frontier detection:
- `scoreNearFrontier()`
- `scoreDepthFrontier()` 
- `scoreStructuralFrontier()`
- `scoreBridgeNode()`
- `computeFrontier()` — unified ranking

And plateau detection:
- `detectPlateaus()` — breadth stall, depth stall, field gap, avoidance pattern

All algorithm implementations are in the master spec. Implement them as written — the parameter values (decay lambdas, signal strengths, frontier weights) are intentional starting points we'll tune later.

### 4. API Routes

Next.js API routes that the dashboard consumes:

```
GET /api/engine/overview
  → total nodes, avg confidence, learning state distribution, register breakdown

GET /api/engine/graph
  → full graph data for map visualization (semantic fields with node counts, 
    confidence aggregates, coverage percentages, and inter-field connection strengths)

GET /api/engine/frontier
  → computed frontier items with rationale, type, acquisition probability, 
    unlock predictions

GET /api/engine/plateaus
  → detected plateau signals with severity, description, prescription

GET /api/engine/field/:fieldId
  → detailed view of a semantic field: node list, confidence distribution, 
    frontier items in this field, sub-field clusters

GET /api/engine/encounters
  → encounter history aggregated by day, by source type, new nodes per day

GET /api/engine/uncertainty
  → uncertainty map data: all nodes with recognition × uncertainty coordinates

GET /api/engine/grammar
  → all grammar constructions with comprehension/production scores, 
    avoidance detection

GET /api/engine/node/:surfaceForm
  → single node detail: full confidence vector, uncertainty, learning state, 
    encounter history, edges, "why this, now?" explanation if on frontier
```

Each route should hydrate the in-memory graph (with caching — don't reload from Postgres on every request), run the relevant computation, and return JSON.

### 5. Dashboard UI

A single-page dashboard at `/engine` (or `/dashboard`) in the benji.codes Next.js app. 

**Design system**: Use the benji.codes aesthetic consistently:
- Background: `#0A0A0B`
- Surface: `#131316`  
- Primary accent: Warm gold `#D4A853`
- Text: Warm off-white `#E8E4DC`
- Chinese text: Noto Serif SC, weight 500
- Monospace: JetBrains Mono
- Secondary colors: Steel blue `#5B8FB9`, Purple `#9B7EC8`, Green `#6B9E78`, Red `#C9544A`, Orange `#D4853A`

**Layout**: The dashboard should show the state of the world comprehensively. Key views:

**A. Knowledge Map (hero element)**
- D3 force-directed or positioned layout of semantic fields
- Bubbles sized by node count, opacity by coverage
- Frontier items visible as orbiting dots around their parent fields
- Connections between related fields, opacity = connection strength
- Click a field to expand detail panel
- Weak fields (< 30% coverage) visually distinct (dashed border, red tint)

**B. Overview Stats**
- Total nodes, avg recognition, avg production
- Learning state distribution bar (new/acquired/decaying/forgotten)
- Register coverage breakdown
- New nodes this month, encounter rate

**C. Frontier Panel**
- Ranked list of frontier items by acquisition probability
- Each item shows: word, pinyin, gloss, frontier type (near/depth/structural/bridge), probability score
- Expandable to show: engine's reasoning, what it unlocks (graph connections that become available)
- Color-coded by frontier type

**D. Plateau Signals**
- Active warnings with severity bars
- Each shows: type, title, description, what the engine is doing about it

**E. Confidence Distribution**
- Histogram of recognition vs production confidence across all nodes
- Makes the rec-prod gap immediately visible

**F. Grammar Constructions**
- Horizontal bar chart: comprehension vs production per construction
- Avoidance pattern detection (large comp-prod gap)

**G. Encounter History**
- 30-day stacked area chart by signal source (annotation, assessment, production)
- New nodes per day bar chart overlay

**H. Uncertainty Map**
- Scatter plot: recognition (x) × uncertainty (y) for all nodes
- Quadrant labels: solid knowledge (bottom-right), probe targets (top-right), frontier zone (middle), unknown (left)

**I. Node Detail (on click/search)**
- Search or click any node to see full detail
- Confidence vector with uncertainty per dimension
- Learning state and transitions
- Encounter history timeline
- Connected nodes (synonyms, collocations, etc.)
- If on frontier: "Why this, now?" explanation

The dashboard should use a combination of the knowledge map as the primary view with tabbed or scrollable sections for the other views. Don't bury things — the goal is to see the engine's full state at a glance and drill into any piece.

Use recharts for standard charts, D3 for the knowledge map and any custom visualizations. 

---

## Tech Stack

- **Framework**: Next.js (consistent with benji.codes)
- **Database**: Neon Postgres (connection string should be in env vars)
- **Charts**: recharts for standard charts, D3 for the knowledge map
- **Styling**: Tailwind + inline styles for chart/visualization components
- **Fonts**: Noto Serif SC (Chinese), JetBrains Mono (monospace), Inter or system sans for UI

---

## File Structure

```
/app/engine/
  page.tsx              — dashboard page
  /components/
    KnowledgeMap.tsx    — D3 semantic field map
    FrontierPanel.tsx   — frontier items list
    PlateauPanel.tsx    — plateau warnings
    OverviewStats.tsx   — top-level metrics
    ConfidenceChart.tsx — distribution histogram
    GrammarChart.tsx    — construction comparison
    EncounterChart.tsx  — signal history
    UncertaintyMap.tsx  — scatter plot
    NodeDetail.tsx      — single node inspector
    FieldDetail.tsx     — semantic field detail
  
/lib/engine/
  graph.ts              — KnowledgeGraph class
  scoring.ts            — confidence, decay, mastery functions
  frontier.ts           — frontier detection algorithm
  plateau.ts            — plateau detection
  types.ts              — TypeScript interfaces for all data structures

/app/api/engine/
  overview/route.ts
  graph/route.ts
  frontier/route.ts
  plateaus/route.ts
  field/[fieldId]/route.ts
  encounters/route.ts
  uncertainty/route.ts
  grammar/route.ts
  node/[surfaceForm]/route.ts

/scripts/
  seed-engine.ts        — seed script for mock data

/db/
  schema.sql            — all CREATE TABLE statements
```

---

## What NOT to Build (Yet)

- The calibration/bootstrapping flow (separate project)
- 注解 integration (separate project, after both are working independently)
- Content pipeline ingestion (no real content processing yet — just the storage schema)
- LLM integration layer (no API calls to Claude — all data is seeded or computed deterministically)
- User authentication / multi-user (single user, hardcoded learner_id)
- Production deployment concerns (this runs locally or on Vercel preview)

---

## Key Design Decisions to Preserve

These were deliberated carefully in the design process. Don't change them without good reason:

1. **Multi-dimensional confidence** (recognition, production, register_awareness, collocational_precision) — not a single score
2. **Uncertainty per dimension** — confidence in the confidence, starts at 1.0, reduces with signals
3. **Learning state** (new/acquired/decaying/forgotten) — derived from peak recognition, not manually set
4. **Context-weighted decay** — breadth of exposure slows forgetting
5. **Passive signal asymmetry** — "didn't tap" = 0.02, "tapped" = 0.25. Trust errors over silence.
6. **Character nodes are lightweight/derived** — familiarity computed from containing words, not independently assessed
7. **Semantic fields start predefined** (seeded) — not emergent clustering yet
8. **Frontier has four types** (near, depth, structural, bridge) with weighted unified ranking
9. **Content matching uses dispersion scoring** — penalizes clustered unknowns
10. **Postgres for storage, in-memory graph for computation** — hydrate on demand, cache between requests

---

## Success Criteria

The dashboard is working when:

1. The database has ~4000 lexical nodes with realistic Chinese vocabulary, confidence distributions, and encounter history
2. The in-memory graph hydrates from Postgres and all computation functions return plausible results
3. The knowledge map renders semantic fields with visible density differences between strong and weak areas
4. Frontier detection returns a ranked list of items with coherent rationale
5. Plateau detection identifies at least the depth stall, field gap, and avoidance patterns present in the seed data
6. Clicking any node shows its full state — confidence vector, uncertainty, learning state, edges, encounters
7. The encounter history chart shows the 30-day signal flow
8. The uncertainty scatter plot clearly shows the four quadrants

If I look at the dashboard and think "yeah, that's roughly what my Chinese knowledge looks like" and can drill into any piece to understand what the engine is doing — it's working.
