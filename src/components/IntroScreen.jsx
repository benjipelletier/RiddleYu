import React from 'react'

export default function IntroScreen({ onStart }) {
  return (
    <div style={s.root}>
      <div style={s.card}>
        <div style={s.seal}>谜</div>
        <div style={s.logoZh}>谜语</div>
        <div style={s.logoEn}>RiddleYu</div>
        <div style={s.divider} />
        <p style={s.tagline}>每天一个成语。<br />四道谜题，四个汉字。</p>
        <p style={s.sub}>
          A new 成语 every day. Solve 4 riddles, pick characters from the grid, 
          chain them together, and uncover the idiom.
        </p>
        <div style={s.legend}>
          <div style={s.legendRow}>
            <span style={{...s.dot, background:'#2d7a4f'}} />
            <span style={s.legendText}>correct character, correct position</span>
          </div>
          <div style={s.legendRow}>
            <span style={{...s.dot, background:'#c97d10'}} />
            <span style={s.legendText}>correct character, wrong position</span>
          </div>
          <div style={s.legendRow}>
            <span style={{...s.dot, background:'#7a7570'}} />
            <span style={s.legendText}>not in today's 成语</span>
          </div>
        </div>
        <div style={s.lives}>You have <strong>5 lives</strong>. 加油！</div>
        <button style={s.btn} onClick={onStart}>开始 · Start</button>
        <p style={s.vibe}>Vibecoded with ♥ by <a href="https://instagram.com/benjipelletier" target="_blank" rel="noreferrer" style={s.vibeLink}>笨鸡</a></p>
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
    padding: '40px 32px',
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
  logoZh: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 48,
    fontWeight: 900,
    color: 'var(--ink)',
    lineHeight: 1,
  },
  logoEn: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 13,
    letterSpacing: 4,
    color: 'var(--grey)',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  divider: {
    width: 40,
    height: 2,
    background: 'var(--paper3)',
    margin: '20px auto',
  },
  tagline: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 18,
    lineHeight: 1.8,
    color: 'var(--ink)',
    marginBottom: 12,
  },
  sub: {
    fontSize: 13,
    lineHeight: 1.7,
    color: 'var(--grey)',
    marginBottom: 20,
  },
  legend: {
    background: 'var(--paper2)',
    borderRadius: 10,
    padding: '12px 16px',
    marginBottom: 16,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  legendRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    flexShrink: 0,
  },
  legendText: {
    fontSize: 12,
    color: 'var(--grey)',
  },
  lives: {
    fontSize: 13,
    color: 'var(--grey)',
    marginBottom: 24,
  },
  vibe: {
    marginTop: 16,
    fontSize: 11,
    color: '#c8bfaa',
    fontStyle: 'normal',
  },
  vibeLink: {
    color: '#c8bfaa',
    textDecoration: 'underline',
  },
  btn: {
    width: '100%',
    padding: '14px 0',
    background: 'var(--ink)',
    color: 'var(--paper)',
    border: 'none',
    borderRadius: 12,
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 2,
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  },
}
