"use client";

import { useState } from "react";

export default function RiddleyuSunset() {
  const [revealed, setRevealed] = useState(false);
  const toggle = () => setRevealed((v) => !v);

  return (
    <main style={s.root}>
      <style>{floatCss}</style>

      {/* floating mementos */}
      <div style={s.decor} aria-hidden="true">
        {mementos.map((m, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: m.top,
              left: m.left,
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

        {/* one last puzzle to solve */}
        <div
          style={s.charRow}
          onClick={toggle}
          role="button"
          tabIndex={0}
          aria-label="曲终人散"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
        >
          {["曲", "终", "人", "散"].map((c, i) => (
            <div key={i} style={s.chengyuChar}>
              {c}
            </div>
          ))}
        </div>
        <div style={s.pinyin}>qǔ zhōng rén sàn</div>
        <p style={s.meaning}>
          The song ends, the crowd drifts home.
          <br />
          Every good thing has its final day.
        </p>

        {/* easter egg: ask for one more round, her voice answers */}
        <div
          style={{
            opacity: revealed ? 1 : 0,
            maxHeight: revealed ? 90 : 0,
            marginTop: revealed ? 14 : 0,
            overflow: "hidden",
            transition:
              "opacity 0.5s ease, max-height 0.5s ease, margin-top 0.5s ease",
          }}
          aria-hidden={!revealed}
        >
          <p style={s.eggPrompt}>one more round?</p>
          <p style={s.egg}>
            “I’m down. Let’s <span style={s.doooo}>doooo</span> it.”
          </p>
        </div>

        <div style={s.divider} />

        <p style={s.storyZh}>谜语日的这一章，翻篇了。舍不得，却心怀感激。</p>
        <p style={s.story}>
          The riddleyu chapter has closed. As hard as it is to let go of this,
          it meant something dear to me, and I am grateful for everything it
          taught me. <span style={s.heart}>♥</span>
        </p>

        <div style={s.divider} />

        <p style={s.countdown}>谜语日 · riddleyu · Jan 2026 – July 2026</p>
      </div>
    </main>
  );
}

const mementos = [
  { icon: "🏂", top: "13%", left: "9%", size: 30, rot: -10, dur: 4.0, delay: 0, opacity: 0.3 },
  { icon: "🐻", top: "22%", left: "83%", size: 26, rot: 12, dur: 5.0, delay: 0.6, opacity: 0.32 },
  { icon: "📺", top: "68%", left: "11%", size: 28, rot: 8, dur: 4.5, delay: 1.2, opacity: 0.28 },
  { icon: "🐻", top: "79%", left: "82%", size: 24, rot: -8, dur: 5.5, delay: 0.3, opacity: 0.3 },
  { icon: "🏂", top: "84%", left: "44%", size: 22, rot: 6, dur: 4.2, delay: 0.9, opacity: 0.24 },
  { icon: "📺", top: "8%", left: "60%", size: 22, rot: -6, dur: 5.2, delay: 1.5, opacity: 0.22 },
];

const floatCss = `
@keyframes riddleyu-float {
  from { transform: translateY(0); }
  to   { transform: translateY(-16px); }
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
  pinyin: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 14,
    color: "#7a7570",
    fontStyle: "italic",
    marginBottom: 12,
  },
  meaning: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 15,
    color: "#2c2416",
    lineHeight: 1.8,
  },
  eggPrompt: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 13,
    color: "#a09880",
    marginBottom: 4,
  },
  egg: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 15,
    fontStyle: "normal",
    color: "#c0392b",
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
