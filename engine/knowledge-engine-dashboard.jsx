import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

// ============================================================
// DESIGN: The dashboard IS the knowledge map.
// Primary: interactive semantic field map with frontier items
// glowing at the edges. Secondary: action panel — what to work
// on next and why. Everything answers "what should I do?"
// ============================================================

const GOLD = "#D4A853";
const GOLD_BRIGHT = "#F0C75E";
const GOLD_DIM = "#6B5A2E";
const SURFACE = "#131316";
const SURFACE_2 = "#1a1a1f";
const SURFACE_3 = "#222228";
const BG = "#0A0A0B";
const TEXT = "#E8E4DC";
const TEXT_MID = "#a89e90";
const TEXT_DIM = "#5c574e";
const BLUE = "#5B8FB9";
const BLUE_BRIGHT = "#7BB4DD";
const PURPLE = "#9B7EC8";
const GREEN = "#6B9E78";
const GREEN_BRIGHT = "#8DC49A";
const RED = "#C9544A";
const ORANGE = "#D4853A";

const FIELDS = [
  { id: "emotions", zh: "情感", en: "Emotions", nodes: 340, rec: 0.78, prod: 0.42, cov: 0.72, x: 0.35, y: 0.3 },
  { id: "daily", zh: "日常", en: "Daily Life", nodes: 520, rec: 0.85, prod: 0.55, cov: 0.81, x: 0.5, y: 0.45 },
  { id: "relations", zh: "人际", en: "Relationships", nodes: 280, rec: 0.76, prod: 0.38, cov: 0.68, x: 0.3, y: 0.5 },
  { id: "music", zh: "音乐", en: "Music & Arts", nodes: 190, rec: 0.82, prod: 0.30, cov: 0.65, x: 0.2, y: 0.35 },
  { id: "food", zh: "饮食", en: "Food", nodes: 210, rec: 0.70, prod: 0.35, cov: 0.58, x: 0.6, y: 0.6 },
  { id: "nature", zh: "自然", en: "Nature", nodes: 160, rec: 0.65, prod: 0.20, cov: 0.52, x: 0.65, y: 0.3 },
  { id: "work", zh: "商务", en: "Business", nodes: 240, rec: 0.55, prod: 0.18, cov: 0.42, x: 0.75, y: 0.5 },
  { id: "tech", zh: "科技", en: "Technology", nodes: 130, rec: 0.50, prod: 0.15, cov: 0.38, x: 0.8, y: 0.35 },
  { id: "politics", zh: "政法", en: "Politics & Law", nodes: 80, rec: 0.30, prod: 0.05, cov: 0.18, x: 0.85, y: 0.65 },
  { id: "history", zh: "历史", en: "History", nodes: 170, rec: 0.60, prod: 0.12, cov: 0.45, x: 0.45, y: 0.2 },
  { id: "health", zh: "医疗", en: "Health", nodes: 90, rec: 0.35, prod: 0.08, cov: 0.22, x: 0.7, y: 0.7 },
  { id: "travel", zh: "旅行", en: "Travel", nodes: 150, rec: 0.62, prod: 0.25, cov: 0.50, x: 0.55, y: 0.25 },
];

const FRONTIER = [
  { word: "居然", py: "jūrán", gloss: "unexpectedly (with disbelief)", type: "near", prob: 0.89, field: "emotions", reason: "You know 竟然 and 突然 — this completes the surprise/disbelief cluster. It's the colloquial one, high CPop frequency.", unlock: "Opens: 没想到, 出乎意料, 想不到" },
  { word: "辜负", py: "gūfù", gloss: "to let down, to fail someone", type: "near", prob: 0.84, field: "relations", reason: "Both characters familiar from other words. Extremely common in CPop lyrics and relationship contexts you consume.", unlock: "Opens: 辜负期望, 不负 pattern" },
  { word: "何必", py: "hébì", gloss: "why bother, there's no need", type: "near", prob: 0.80, field: "emotions", reason: "何 already known from 如何. Rhetorical question pattern — very natural in emotional content.", unlock: "Opens: 何不, 何况, 何尝 cluster" },
  { word: "舍不得", py: "shěbude", gloss: "can't bear to part with", type: "depth", prob: 0.75, field: "emotions", reason: "Recognition at 0.8 but collocational precision only 0.2 — you know WHAT it means but not HOW it's naturally used.", unlock: "Deepens: 舍得/舍不得 pair, V不得 pattern" },
  { word: "反而", py: "fǎn'ér", gloss: "on the contrary, instead", type: "depth", prob: 0.72, field: "daily", reason: "You recognize it but can't distinguish register from 却/倒/反倒. Needs spoken vs. written clarity.", unlock: "Clarifies: the 5 flavors of 'but'" },
  { word: "恢复", py: "huīfù", gloss: "to recover, to restore", type: "near", prob: 0.70, field: "health", reason: "复 known from 重复, 回复. This bridges into health vocabulary — your weakest field.", unlock: "Opens: health/recovery cluster" },
  { word: "妥协", py: "tuǒxié", gloss: "to compromise", type: "bridge", prob: 0.58, field: "work", reason: "Bridges your strong relationship vocabulary into the weak business/negotiation domain.", unlock: "Bridges: relationships → business register" },
  { word: "把...V成", py: "—", gloss: "turn X into Y (construction)", type: "structural", prob: 0.62, field: null, reason: "You know 12 words that use this pattern but the construction itself scores 0.1 production. Classic avoidance.", unlock: "Activates: transformative 把 usage" },
  { word: "连...都", py: "—", gloss: "even... (emphatic construction)", type: "structural", prob: 0.65, field: null, reason: "Comprehension 0.7, production 0.18. You understand it every time but never reach for it.", unlock: "Activates: emphatic constructions" },
  { word: "维持", py: "wéichí", gloss: "to maintain, to sustain", type: "bridge", prob: 0.55, field: "work", reason: "Another relationship→business bridge. 维 from 维护 (if known), 持 from 坚持.", unlock: "Bridges: daily → formal register" },
];

const PLATEAUS = [
  { id: "depth", icon: "◆", label: "Depth Stall", severity: 0.72, color: ORANGE,
    title: "34 words recognized but not deeply known",
    desc: "You can understand these in context but don't know their natural collocations. The gap between recognition and real command is holding you back.",
    action: "The engine will prioritize these in content matching — you'll encounter them in varied collocational contexts." },
  { id: "field", icon: "◇", label: "Field Gap", severity: 0.58, color: RED,
    title: "Formal registers nearly empty",
    desc: "Politics, law, health, business — all below 40% coverage. Your spoken/emotional vocabulary is strong but the written world is a blind spot.",
    action: "Try one news article per week through 注解. Even 10 minutes of formal content per week would shift this." },
  { id: "avoidance", icon: "△", label: "Grammar Avoidance", severity: 0.55, color: PURPLE,
    title: "把 and 连...都: understood but never produced",
    desc: "These constructions are comprehension-ready but you systematically avoid them. This is the intermediate plateau.",
    action: "When you're ready for production work, these are the first targets. For now, the engine tracks exposure." },
];

const STATS = { totalNodes: 4130, avgRec: 0.67, avgProd: 0.28, newMonth: 47 };

// ============================================================
// KNOWLEDGE MAP
// ============================================================

function KnowledgeMap({ onFieldClick, selectedField }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 600, h: 380 });

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      setDims({ w: width, h: Math.max(300, Math.min(420, width * 0.6)) });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const { w, h } = dims;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const defs = svg.append("defs");
    const glow = defs.append("filter").attr("id", "glow").attr("x", "-80%").attr("y", "-80%").attr("width", "260%").attr("height", "260%");
    glow.append("feGaussianBlur").attr("stdDeviation", "5").attr("result", "b");
    glow.append("feMerge").selectAll("feMergeNode").data(["b", "SourceGraphic"]).enter().append("feMergeNode").attr("in", d => d);

    const g = svg.append("g");

    // connections
    const conns = [
      ["emotions","relations"],["emotions","music"],["daily","food"],
      ["daily","relations"],["daily","work"],["nature","travel"],
      ["work","tech"],["work","politics"],["history","politics"],
      ["health","food"],["travel","history"],["music","history"],
      ["relations","daily"],["emotions","daily"],
    ];
    conns.forEach(([a,b]) => {
      const fa = FIELDS.find(f=>f.id===a), fb = FIELDS.find(f=>f.id===b);
      if(!fa||!fb) return;
      g.append("line")
        .attr("x1",fa.x*w).attr("y1",fa.y*h)
        .attr("x2",fb.x*w).attr("y2",fb.y*h)
        .attr("stroke",GOLD).attr("stroke-opacity",(fa.cov+fb.cov)/2*0.12)
        .attr("stroke-width",(fa.cov+fb.cov)/2*2);
    });

    // field bubbles
    const groups = g.selectAll(".f").data(FIELDS).enter().append("g")
      .attr("transform", d=>`translate(${d.x*w},${d.y*h})`)
      .style("cursor","pointer")
      .on("click",(_,d)=>onFieldClick(d.id===selectedField?null:d.id));

    // pulse for weak fields
    groups.filter(d => d.cov < 0.3).append("circle")
      .attr("r", d => 24 + d.nodes/15)
      .attr("fill","none").attr("stroke",RED).attr("stroke-opacity",0.15)
      .attr("stroke-width",1).attr("stroke-dasharray","4,3");

    // outer ring
    groups.append("circle")
      .attr("r", d=>18+d.nodes/15)
      .attr("fill","none")
      .attr("stroke", d=>d.cov<0.3?RED:d.cov<0.5?ORANGE:GOLD)
      .attr("stroke-width",1.5)
      .attr("stroke-opacity", d=>0.15+d.cov*0.55);

    // inner fill
    groups.append("circle")
      .attr("r", d=>(18+d.nodes/15)*d.rec)
      .attr("fill", d=>d.cov<0.3?RED:GOLD)
      .attr("fill-opacity", d=>0.06+d.rec*0.1);

    // selected highlight
    groups.filter(d=>d.id===selectedField).append("circle")
      .attr("r", d=>24+d.nodes/15)
      .attr("fill","none").attr("stroke",GOLD_BRIGHT)
      .attr("stroke-width",2).attr("stroke-opacity",0.7)
      .attr("filter","url(#glow)");

    // labels
    groups.append("text").text(d=>d.zh)
      .attr("text-anchor","middle").attr("dy",-3)
      .attr("fill", d=>d.id===selectedField?GOLD_BRIGHT:TEXT)
      .attr("font-size", d=>d.nodes>300?14:12)
      .attr("font-weight",600).attr("font-family","'Noto Serif SC', serif");
    groups.append("text").text(d=>`${(d.cov*100).toFixed(0)}%`)
      .attr("text-anchor","middle").attr("dy",12)
      .attr("fill", d=>d.cov<0.3?RED:d.cov<0.5?ORANGE:GOLD_DIM)
      .attr("font-size",10).attr("font-family","monospace");

    // frontier dots orbiting fields
    const typeColor = { near: GOLD_BRIGHT, depth: BLUE_BRIGHT, bridge: GREEN_BRIGHT, structural: PURPLE };
    FRONTIER.filter(f=>f.field).forEach((item,idx) => {
      const field = FIELDS.find(f=>f.id===item.field);
      if(!field) return;
      const angle = (idx * 137.5 * Math.PI / 180); // golden angle spread
      const dist = 24 + field.nodes/15 + 10;
      const fx = field.x*w + Math.cos(angle)*dist;
      const fy = field.y*h + Math.sin(angle)*dist;
      const c = typeColor[item.type] || GOLD;

      // glow dot
      g.append("circle").attr("cx",fx).attr("cy",fy).attr("r",4)
        .attr("fill",c).attr("fill-opacity",0.8).attr("filter","url(#glow)");
      g.append("circle").attr("cx",fx).attr("cy",fy).attr("r",2.5)
        .attr("fill",c);

      // label
      g.append("text").text(item.word)
        .attr("x",fx).attr("y",fy-9).attr("text-anchor","middle")
        .attr("fill",c).attr("font-size",9).attr("font-weight",500)
        .attr("font-family","'Noto Serif SC', serif").attr("opacity",0.85);
    });

  }, [dims, selectedField, onFieldClick]);

  return (
    <div ref={containerRef} style={{ width: "100%", position: "relative" }}>
      <svg ref={svgRef} width={dims.w} height={dims.h} style={{ display: "block" }} />
    </div>
  );
}

// ============================================================
// ACTION COMPONENTS
// ============================================================

function FrontierCard({ item, index, expanded, onToggle }) {
  const tc = { near: GOLD, depth: BLUE, structural: PURPLE, bridge: GREEN };
  const tl = { near: "Ready to learn", depth: "Deepen", structural: "Activate", bridge: "Bridge" };
  const color = tc[item.type];

  return (
    <div onClick={onToggle} style={{
      background: expanded ? SURFACE_2 : SURFACE,
      borderRadius: 10, padding: expanded ? "14px 16px" : "10px 14px",
      border: `1px solid ${color}${expanded?"44":"15"}`,
      cursor: "pointer", transition: "all 0.15s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8,
            background: `${color}10`, border: `1px solid ${color}28`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: item.word.length > 3 ? 12 : 16, fontWeight: 600, color,
            fontFamily: "'Noto Serif SC', serif",
          }}>{item.word}</div>
          <div style={{
            position: "absolute", top: -3, right: -3,
            width: 14, height: 14, borderRadius: 7,
            background: color, color: BG,
            fontSize: 8, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{index + 1}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: TEXT, fontWeight: 500 }}>{item.py !== "—" ? item.py : ""}</span>
            <span style={{ fontSize: 11, color: TEXT_DIM }}>{item.gloss}</span>
          </div>
          <div style={{ fontSize: 10, color, marginTop: 2, fontWeight: 500 }}>{tl[item.type]}</div>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color, fontFamily: "monospace", flexShrink: 0 }}>
          {(item.prob * 100).toFixed(0)}%
        </div>
      </div>
      {expanded && (
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${TEXT}0a` }}>
          <div style={{ fontSize: 12, color: TEXT_MID, lineHeight: 1.65, marginBottom: 8 }}>{item.reason}</div>
          <div style={{
            fontSize: 11, color: GREEN, padding: "5px 10px", background: `${GREEN}08`,
            borderRadius: 5, border: `1px solid ${GREEN}15`, lineHeight: 1.5,
          }}>→ {item.unlock}</div>
        </div>
      )}
    </div>
  );
}

function PlateauCard({ p }) {
  return (
    <div style={{
      background: SURFACE, borderRadius: 10, padding: "14px 16px",
      border: `1px solid ${p.color}20`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ color: p.color, fontSize: 13 }}>{p.icon}</span>
        <span style={{ fontSize: 12, color: TEXT, fontWeight: 600, flex: 1 }}>{p.title}</span>
        <span style={{ fontSize: 10, color: p.color, fontFamily: "monospace" }}>{(p.severity*100).toFixed(0)}%</span>
      </div>
      <div style={{ width: "100%", height: 3, background: `${TEXT}08`, borderRadius: 2, overflow: "hidden", marginBottom: 8 }}>
        <div style={{ width: `${p.severity*100}%`, height: "100%", background: p.color, borderRadius: 2 }} />
      </div>
      <div style={{ fontSize: 11, color: TEXT_DIM, lineHeight: 1.55, marginBottom: 8 }}>{p.desc}</div>
      <div style={{ fontSize: 11, color: TEXT_MID, fontStyle: "italic", lineHeight: 1.5 }}>{p.action}</div>
    </div>
  );
}

function FieldDetail({ fieldId }) {
  const f = FIELDS.find(x => x.id === fieldId);
  if (!f) return null;
  const fItems = FRONTIER.filter(x => x.field === fieldId);
  const gap = f.rec - f.prod;

  return (
    <div style={{
      background: SURFACE_2, borderRadius: 10, padding: "14px 16px",
      border: `1px solid ${GOLD}20`, marginBottom: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: GOLD, fontFamily: "'Noto Serif SC', serif" }}>{f.zh}</span>
          <span style={{ fontSize: 12, color: TEXT_DIM }}>{f.en}</span>
        </div>
        <span style={{ fontSize: 11, color: TEXT_DIM, fontFamily: "monospace" }}>{f.nodes} nodes</span>
      </div>
      <div style={{ display: "flex", gap: 18, marginBottom: fItems.length ? 12 : 0, flexWrap: "wrap" }}>
        {[["Rec", f.rec, GOLD], ["Prod", f.prod, BLUE], ["Coverage", f.cov, f.cov<0.3?RED:f.cov<0.5?ORANGE:GREEN], ["Gap", gap, gap>0.4?RED:ORANGE]].map(([l,v,c]) => (
          <div key={l}>
            <div style={{ fontSize: 9, color: TEXT_DIM, marginBottom: 2 }}>{l}</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: c, fontFamily: "monospace" }}>{(v*100).toFixed(0)}</span>
            <span style={{ fontSize: 10, color: TEXT_DIM }}>%</span>
          </div>
        ))}
      </div>
      {fItems.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {fItems.map(fi => {
            const c = fi.type==="near"?GOLD:fi.type==="depth"?BLUE:fi.type==="bridge"?GREEN:PURPLE;
            return (
              <span key={fi.word} style={{
                padding: "2px 7px", borderRadius: 4,
                background: `${c}10`, border: `1px solid ${c}25`,
                fontSize: 11, color: c, fontFamily: "'Noto Serif SC', serif",
              }}>{fi.word}</span>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN
// ============================================================

export default function Dashboard() {
  const [selectedField, setSelectedField] = useState(null);
  const [expanded, setExpanded] = useState(0);
  const [view, setView] = useState("frontier");

  return (
    <div style={{
      background: BG, color: TEXT,
      fontFamily: "'Inter', -apple-system, sans-serif",
      minHeight: "100vh", display: "flex", flexDirection: "column",
    }}>
      {/* Compact header */}
      <div style={{ padding: "14px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: GOLD, fontFamily: "'Noto Serif SC', serif" }}>知识引擎</span>
          <span style={{ fontSize: 10, color: TEXT_DIM }}>Knowledge Engine</span>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 10, color: TEXT_DIM }}>
          <span><b style={{ color: GOLD, fontSize: 12, fontFamily: "monospace" }}>{STATS.totalNodes.toLocaleString()}</b> nodes</span>
          <span>rec <b style={{ color: GOLD }}>{(STATS.avgRec*100).toFixed(0)}%</b></span>
          <span>prod <b style={{ color: BLUE }}>{(STATS.avgProd*100).toFixed(0)}%</b></span>
          <span><b style={{ color: GREEN }}>+{STATS.newMonth}</b> /mo</span>
        </div>
      </div>

      {/* Map */}
      <div style={{ padding: "4px 8px 0" }}>
        <KnowledgeMap onFieldClick={useCallback(id => setSelectedField(id), [])} selectedField={selectedField} />
      </div>

      {/* Field detail */}
      <div style={{ padding: "0 20px" }}>
        {selectedField && <FieldDetail fieldId={selectedField} />}
      </div>

      {/* Action panel */}
      <div style={{ flex: 1, padding: "0 20px 24px" }}>
        <div style={{ display: "flex", gap: 3, marginBottom: 14, background: SURFACE, borderRadius: 7, padding: 2, width: "fit-content" }}>
          {[{ id: "frontier", label: "What's Next", n: FRONTIER.length }, { id: "plateaus", label: "Plateaus", n: PLATEAUS.length }].map(t => (
            <button key={t.id} onClick={() => setView(t.id)} style={{
              background: view===t.id ? SURFACE_3 : "transparent",
              border: "none", borderRadius: 5, padding: "5px 12px",
              color: view===t.id ? GOLD : TEXT_DIM,
              fontSize: 11, fontWeight: view===t.id ? 600 : 400,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              {t.label}
              <span style={{
                marginLeft: 5, fontSize: 9, padding: "1px 4px", borderRadius: 3,
                background: view===t.id ? `${GOLD}15` : `${TEXT}08`,
                color: view===t.id ? GOLD : TEXT_DIM,
              }}>{t.n}</span>
            </button>
          ))}
        </div>

        {view === "frontier" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 10, color: TEXT_DIM, marginBottom: 2, lineHeight: 1.5 }}>
              Ranked by acquisition probability — what the engine thinks will stick with the least effort. Tap to see why.
            </div>
            {FRONTIER.map((item, i) => (
              <FrontierCard key={item.word} item={item} index={i}
                expanded={expanded===i} onToggle={() => setExpanded(expanded===i?-1:i)} />
            ))}
          </div>
        )}

        {view === "plateaus" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 10, color: TEXT_DIM, marginBottom: 2, lineHeight: 1.5 }}>
              Structural imbalances and stagnation patterns. Each includes what the engine is doing about it.
            </div>
            {PLATEAUS.map(p => <PlateauCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
