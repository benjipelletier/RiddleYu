import React, { useState } from 'react'

const FB_COLOR = { green: '#2d7a4f', yellow: '#c97d10', grey: '#7a7570' }
const FB_BG = { green: '#d4edda', yellow: '#fef3cd', grey: '#e8e4dc' }
const FB_EMOJI = { green: '🟩', yellow: '🟨', grey: '⬜' }

function buildShareText(puzzle, won, attempts, lives, maxLives) {
  const date = puzzle.date
  const result = won ? `${maxLives - lives + 1}/${maxLives} ❤️` : `X/${maxLives}`
  const grid = attempts.map(a => a.feedback.map(f => FB_EMOJI[f]).join('')).join('\n')
  const theme = puzzle.theme ? `"${puzzle.theme}"` : ''
  return `谜语 RiddleYu · ${date}\n${theme} ${result}\n\n${grid}\n\nriddleyu.benji.codes`
}

export default function ResultScreen({ puzzle, won, attempts, lives, maxLives }) {
  const [copied, setCopied] = useState(false)

  function handleShare() {
    const text = buildShareText(puzzle, won, attempts, lives, maxLives)
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={s.root}>
      <div style={s.card}>
        <div style={s.seal}>谜</div>

        <div style={won ? s.badgeWon : s.badgeLost}>
          {won ? '成功' : '下次再来'}
        </div>

        <div style={s.chengyuRow}>
          {puzzle.chengyu.map((c, i) => (
            <div key={i} style={s.chengyuChar}>{c}</div>
          ))}
        </div>
        <div style={s.pinyin}>{puzzle.pinyin}</div>
        <p style={s.meaning}>{puzzle.meaning}</p>
        <p style={s.origin}>{puzzle.origin}</p>
        {puzzle.origin_zh && <p style={s.originZh}>{puzzle.origin_zh}</p>}

        <div style={s.divider} />

        <div style={s.historyLabel}>Your attempts</div>
        <div style={s.history}>
          {attempts.map((a, ai) => (
            <div key={ai} style={s.attemptRow}>
              {a.chain.map((char, ci) => (
                <React.Fragment key={ci}>
                  <div style={{
                    ...s.chip,
                    background: FB_BG[a.feedback[ci]],
                    color: FB_COLOR[a.feedback[ci]],
                    border: `1.5px solid ${FB_COLOR[a.feedback[ci]]}`,
                  }}>
                    {char}
                  </div>
                  {ci < 3 && <span style={s.arrow}>›</span>}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>

        <div style={s.livesLeft}>
          {won
            ? `Solved with ${lives} ${lives === 1 ? 'life' : 'lives'} remaining`
            : `Used all ${maxLives} lives`
          }
        </div>

        <button style={s.shareBtn} onClick={handleShare}>
          {copied ? '已复制 · Copied!' : '分享 · Share'}
        </button>

        <p style={s.comeback}>Come back tomorrow for a new 成语 ✦</p>
      </div>
    </div>
  )
}

const s = {
  root: {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    background: 'var(--paper3)',
  },
  card: {
    background: 'var(--paper)',
    border: '1.5px solid #c8bfaa',
    borderRadius: 24,
    padding: '36px 28px',
    maxWidth: 380,
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
    position: 'relative',
  },
  seal: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    border: '2px solid var(--seal)',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--seal)',
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 14,
    fontWeight: 900,
    opacity: 0.35,
    transform: 'rotate(-8deg)',
  },
  badgeWon: {
    display: 'inline-block',
    background: '#d4edda',
    color: '#2d7a4f',
    border: '1.5px solid #2d7a4f',
    borderRadius: 20,
    padding: '4px 16px',
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 20,
    letterSpacing: 1,
  },
  badgeLost: {
    display: 'inline-block',
    background: '#fdecea',
    color: '#c0392b',
    border: '1.5px solid #c0392b',
    borderRadius: 20,
    padding: '4px 16px',
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 20,
    letterSpacing: 1,
  },
  chengyuRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  chengyuChar: {
    width: 56,
    height: 56,
    background: 'var(--ink)',
    color: 'var(--paper)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 26,
    fontWeight: 700,
  },
  pinyin: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 14,
    color: 'var(--grey)',
    letterSpacing: 1,
    marginBottom: 14,
  },
  meaning: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 15,
    lineHeight: 1.7,
    color: 'var(--ink)',
    marginBottom: 10,
  },
  origin: {
    fontSize: 12,
    lineHeight: 1.7,
    color: 'var(--grey)',
    fontStyle: 'italic',
  },
  originZh: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 13,
    lineHeight: 1.8,
    color: 'var(--ink)',
    marginTop: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    background: 'var(--paper3)',
    margin: '20px 0',
  },
  historyLabel: {
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'var(--grey)',
    marginBottom: 10,
  },
  history: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 16,
  },
  attemptRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  chip: {
    width: 40,
    height: 40,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 18,
    fontWeight: 700,
  },
  arrow: {
    color: '#c8bfaa',
    fontSize: 14,
  },
  livesLeft: {
    fontSize: 12,
    color: 'var(--grey)',
    marginBottom: 16,
  },
  shareBtn: {
    width: '100%',
    padding: '12px 0',
    marginBottom: 16,
    background: 'var(--ink)',
    color: 'var(--paper)',
    border: 'none',
    borderRadius: 12,
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 1,
    cursor: 'pointer',
  },
  comeback: {
    fontSize: 12,
    color: '#c8bfaa',
    fontStyle: 'italic',
  },
}
