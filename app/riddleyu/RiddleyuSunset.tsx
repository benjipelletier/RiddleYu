"use client";

import { useState } from "react";

export default function RiddleyuSunset() {
  const [revealed, setRevealed] = useState(false);

  return (
    <main style={s.root}>
      <style>{floatCss}</style>

      {/* mementos scattered across the page background, behind the card */}
      <div style={s.decor} aria-hidden="true">
        {mementos.map((m, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              ...m.pos,
              transform: `rotate(${m.rot}deg)`,
              opacity: m.opacity,
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: m.size,
                animation: `riddleyu-float ${m.dur}s ease-in-out ${m.delay}s infinite alternate`,
              }}
            >
              {m.icon}
            </span>
          </span>
        ))}
      </div>

      {/* Sunset banner */}
      <div style={s.banner}>
        <span style={s.bannerDot} />
        This project has sunset · read-only
      </div>

      {/* Final reveal card */}
      <div style={s.card}>
        <div style={s.seal}>谜</div>
        <div style={s.badge}>谢幕 · Curtain call</div>

        <div style={s.charRow}>
          {["曲", "终", "人", "散"].map((c, i) => (
            <div key={i} style={s.chengyuChar}>
              {c}
            </div>
          ))}
        </div>

        <div style={s.divider} />

        <p style={s.storyZh}>谜语日的这一章，翻篇了。舍不得，却心怀感激。</p>
        <p style={s.story}>
          The riddleyu chapter has closed. As hard as it is to let go of this,
          it meant something dear to me, and I am grateful for everything it
          taught me. <span style={s.heart}>♥</span>
        </p>

        {/* easter egg: ask for one more round, her voice answers */}
        <div style={s.eggWrap}>
          {revealed ? (
            <p style={s.egg}>
              I’m down. Let’s <span style={s.doooo}>doooo</span> it.
            </p>
          ) : (
            <button
              type="button"
              style={s.eggBtn}
              onClick={() => setRevealed(true)}
            >
              one more round?
            </button>
          )}
        </div>

        <div style={s.divider} />

        <p style={s.countdown}>谜语日 · riddleyu · Jan 2026 – July 2026</p>
      </div>
    </main>
  );
}

const mementos = [
  { icon: "🏂", pos: { top: "4%", left: "6%" }, size: 32, rot: -14, dur: 4.0, delay: 0, opacity: 0.22 },
  { icon: "📺", pos: { top: "3%", left: "44%" }, size: 26, rot: 8, dur: 4.7, delay: 1.0, opacity: 0.2 },
  { icon: "🐻", pos: { top: "7%", left: "84%" }, size: 30, rot: 12, dur: 5.0, delay: 0.6, opacity: 0.22 },
  { icon: "📺", pos: { top: "15%", left: "24%" }, size: 26, rot: -10, dur: 4.4, delay: 1.6, opacity: 0.2 },
  { icon: "🐻", pos: { top: "18%", left: "66%" }, size: 28, rot: 6, dur: 5.3, delay: 0.3, opacity: 0.2 },
  { icon: "🏂", pos: { top: "27%", left: "8%" }, size: 30, rot: 10, dur: 4.6, delay: 0.9, opacity: 0.22 },
  { icon: "🐻", pos: { top: "30%", left: "50%" }, size: 26, rot: -8, dur: 5.1, delay: 1.3, opacity: 0.18 },
  { icon: "🏂", pos: { top: "33%", left: "88%" }, size: 30, rot: 8, dur: 5.2, delay: 0.4, opacity: 0.22 },
  { icon: "📺", pos: { top: "44%", left: "4%" }, size: 28, rot: -8, dur: 4.8, delay: 1.5, opacity: 0.2 },
  { icon: "🏂", pos: { top: "48%", left: "90%" }, size: 28, rot: 10, dur: 4.3, delay: 0.2, opacity: 0.2 },
  { icon: "🐻", pos: { top: "56%", left: "10%" }, size: 30, rot: 6, dur: 5.5, delay: 0.9, opacity: 0.22 },
  { icon: "📺", pos: { top: "58%", left: "84%" }, size: 28, rot: -12, dur: 4.9, delay: 1.1, opacity: 0.2 },
  { icon: "🏂", pos: { top: "67%", left: "40%" }, size: 26, rot: 8, dur: 5.0, delay: 0.5, opacity: 0.18 },
  { icon: "📺", pos: { top: "70%", left: "6%" }, size: 28, rot: 10, dur: 4.5, delay: 1.4, opacity: 0.2 },
  { icon: "🐻", pos: { top: "72%", left: "88%" }, size: 30, rot: -10, dur: 5.3, delay: 0.7, opacity: 0.22 },
  { icon: "📺", pos: { top: "82%", left: "50%" }, size: 28, rot: 6, dur: 5.1, delay: 1.1, opacity: 0.2 },
  { icon: "🐻", pos: { top: "86%", left: "20%" }, size: 28, rot: -8, dur: 4.7, delay: 0.3, opacity: 0.2 },
  { icon: "🏂", pos: { top: "88%", left: "82%" }, size: 30, rot: 12, dur: 4.8, delay: 0.8, opacity: 0.22 },
  { icon: "📺", pos: { top: "94%", left: "10%" }, size: 26, rot: -6, dur: 5.4, delay: 1.3, opacity: 0.2 },
  { icon: "🐻", pos: { top: "95%", left: "64%" }, size: 28, rot: 8, dur: 4.6, delay: 0.6, opacity: 0.2 },
];

const floatCss = `
@keyframes riddleyu-float {
  from { transform: translateY(0); }
  to   { transform: translateY(-16px); }
}
@keyframes riddleyu-fade {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  [style*="riddleyu-float"] { animation: none !important; }
}
`;

const s: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    background: "#e2dcd0",
    position: "relative",
    overflow: "hidden",
  },
  decor: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
  },
  banner: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#2c2416",
    color: "#f5f0e8",
    padding: "12px 22px",
    borderRadius: 999,
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 28,
    boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
  },
  bannerDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#c0392b",
    flexShrink: 0,
  },
  card: {
    background: "#f5f0e8",
    border: "1.5px solid #c8bfaa",
    borderRadius: 24,
    padding: "40px 28px",
    maxWidth: 420,
    width: "100%",
    textAlign: "center",
    boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
    position: "relative",
    zIndex: 1,
  },
  seal: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    border: "2px solid #c0392b",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#c0392b",
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 14,
    fontWeight: 900,
    opacity: 0.35,
    transform: "rotate(-8deg)",
  },
  badge: {
    display: "inline-block",
    background: "#efe6d6",
    color: "#8a6d3b",
    border: "1.5px solid #cdb98f",
    borderRadius: 20,
    padding: "4px 16px",
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 24,
    letterSpacing: 1,
  },
  charRow: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    marginBottom: 14,
    cursor: "pointer",
    userSelect: "none",
    outline: "none",
  },
  chengyuChar: {
    width: 60,
    height: 60,
    background: "#ede8de",
    color: "#2c2416",
    border: "1.5px solid #c8bfaa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 30,
    fontWeight: 700,
  },
  eggWrap: {
    marginTop: 18,
    minHeight: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  eggBtn: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 14,
    color: "#8a6d3b",
    background: "transparent",
    border: "1.5px solid #cdb98f",
    borderRadius: 999,
    padding: "9px 22px",
    cursor: "pointer",
    letterSpacing: 0.5,
  },
  egg: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 16,
    fontStyle: "normal",
    color: "#8a6d3b",
    animation: "riddleyu-fade 0.5s ease",
  },
  doooo: {
    fontStyle: "italic",
  },
  divider: {
    width: "100%",
    height: 1,
    background: "#e2dcd0",
    margin: "24px 0",
  },
  storyZh: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 15,
    color: "#2c2416",
    lineHeight: 1.9,
    marginBottom: 12,
  },
  story: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 13.5,
    color: "#7a7570",
    lineHeight: 1.9,
  },
  heart: {
    color: "#c0392b",
  },
  countdown: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 12,
    color: "#c8bfaa",
    fontStyle: "italic",
    letterSpacing: 1,
  },
};
