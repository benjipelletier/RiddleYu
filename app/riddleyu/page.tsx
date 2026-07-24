import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "谜语日 · riddleyu — 谢幕",
  description: "riddleyu has reached its sunset. Thank you for playing.",
};

export default function RiddleyuPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />

      <main style={s.root}>
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
          <div style={s.pinyin}>qǔ zhōng rén sàn</div>
          <p style={s.meaning}>
            The song ends and the crowd drifts home.
            <br />
            Every good thing keeps its own hour.
          </p>

          <div style={s.divider} />

          <p style={s.storyZh}>谜语日就到这里了。谜底，其实我们一直都懂。</p>
          <p style={s.story}>
            riddleyu is closing its doors. It was made in a season that
            mattered — four characters at a time, by two people who liked the
            same puzzles. The answer was always easy to see; I just liked
            playing the game with you. Thank you for every round.
          </p>

          <div style={s.divider} />

          <p style={s.countdown}>谜语日 · riddleyu · 谢幕</p>
        </div>
      </main>
    </>
  );
}

const s: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    background: "#e2dcd0",
  },
  banner: {
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
  countdown: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 12,
    color: "#c8bfaa",
    fontStyle: "italic",
    letterSpacing: 1,
  },
};
