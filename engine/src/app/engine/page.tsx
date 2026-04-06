'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import OverviewStats from './components/OverviewStats';
import FrontierPanel from './components/FrontierPanel';
import PlateauPanel from './components/PlateauPanel';
import ConfidenceChart from './components/ConfidenceChart';
import GrammarChart from './components/GrammarChart';
import EncounterChart from './components/EncounterChart';
import UncertaintyMap from './components/UncertaintyMap';
import NodeDetail from './components/NodeDetail';

const KnowledgeMap = dynamic(() => import('./components/KnowledgeMap'), { ssr: false });

const GOLD = '#D4A853';
const TEXT = '#E8E4DC';
const TEXT_DIM = '#5c574e';
const SURFACE = '#131316';

export default function EngineDashboard() {
  const [overview, setOverview] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);
  const [frontier, setFrontier] = useState<any>(null);
  const [plateaus, setPlateaus] = useState<any>(null);
  const [encounters, setEncounters] = useState<any>(null);
  const [uncertainty, setUncertainty] = useState<any>(null);
  const [grammar, setGrammar] = useState<any>(null);

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/engine/overview').then(r => r.json()),
      fetch('/api/engine/graph').then(r => r.json()),
      fetch('/api/engine/frontier').then(r => r.json()),
      fetch('/api/engine/plateaus').then(r => r.json()),
      fetch('/api/engine/encounters').then(r => r.json()),
      fetch('/api/engine/uncertainty').then(r => r.json()),
      fetch('/api/engine/grammar').then(r => r.json()),
    ]).then(([ov, gr, fr, pl, en, un, gm]) => {
      setOverview(ov);
      setGraphData(gr);
      setFrontier(fr);
      setPlateaus(pl);
      setEncounters(en);
      setUncertainty(un);
      setGrammar(gm);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load dashboard data:', err);
      setLoading(false);
    });
  }, []);

  const handleFieldClick = useCallback((id: string | null) => {
    setSelectedField(id);
  }, []);

  const handleNodeClick = useCallback((surfaceForm: string) => {
    setSelectedNode(surfaceForm);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      setSelectedNode(search.trim());
    }
  };

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontFamily: "'Noto Serif SC', serif", color: GOLD, marginBottom: 8 }}>知识引擎</div>
          <div style={{ fontSize: 12, color: TEXT_DIM }}>Loading knowledge graph...</div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', padding: '24px 32px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: GOLD, fontFamily: "'Noto Serif SC', serif", margin: 0 }}>
            知识引擎
          </h1>
          <div style={{ fontSize: 11, color: TEXT_DIM, marginTop: 2 }}>Knowledge Engine Dashboard</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search word..."
            style={{
              background: SURFACE, border: `1px solid ${GOLD}20`, borderRadius: 8,
              padding: '6px 12px', color: TEXT, fontSize: 13,
              fontFamily: "'Noto Serif SC', serif",
              outline: 'none', width: 180,
            }}
          />
        </div>
      </div>

      {/* Knowledge Map (hero) */}
      <div style={{
        background: SURFACE, borderRadius: 12, padding: 16,
        border: `1px solid ${GOLD}10`, marginBottom: 16,
      }}>
        {graphData && frontier && (
          <KnowledgeMap
            fields={graphData.fields}
            connections={graphData.connections}
            frontierItems={frontier.items}
            selectedField={selectedField}
            onFieldClick={handleFieldClick}
          />
        )}
      </div>

      {/* Node Detail (if selected) */}
      {selectedNode && (
        <div style={{ marginBottom: 16 }}>
          <NodeDetail surfaceForm={selectedNode} onClose={() => setSelectedNode(null)} />
        </div>
      )}

      {/* Overview Stats */}
      {overview && (
        <div style={{ marginBottom: 16 }}>
          <OverviewStats data={overview} />
        </div>
      )}

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {uncertainty && <ConfidenceChart nodes={uncertainty.nodes} />}
          {encounters && <EncounterChart days={encounters.days} />}
          {grammar && <GrammarChart constructions={grammar.constructions} />}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {frontier && <FrontierPanel items={frontier.items} />}
          {plateaus && <PlateauPanel signals={plateaus.signals} />}
        </div>
      </div>

      {/* Uncertainty Map (full width) */}
      {uncertainty && (
        <div style={{ marginBottom: 16 }}>
          <UncertaintyMap nodes={uncertainty.nodes} onNodeClick={handleNodeClick} />
        </div>
      )}
    </main>
  );
}
