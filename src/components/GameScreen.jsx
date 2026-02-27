import React, { useState } from 'react'

const FB_COLOR = { green: '#2d7a4f', yellow: '#c97d10', grey: '#7a7570' }
const FB_BG = { green: '#d4edda', yellow: '#fef3cd', grey: '#e8e4dc' }

export default function GameScreen({
  puzzle,
  currentSlot,
  chain,
  lives,
  maxLives,
  attempts,
  chainComplete,
  selectChar,
  resetChain,
  submitChain,
  isSelectable,
  isSelected,
  getCharSlot,
}) {
  const [showHint, setShowHint] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Reset hint when slot changes
  React.useEffect(() => { setShowHint(false) }, [currentSlot])

  function handleSubmit() {
    setSubmitting(true)
    submitChain()
    setTimeout(() => setSubmitting(false), 600)
  }

  const lastAttempt = attempts[attempts.length - 1]

  return (
    <div style={s.root}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.logoWrap}>
          <span style={s.logoZh}>谜语</span>
          <span style={s.logoEn}>RiddleYu</span>
        </div>
        <div style={s.hearts}>
          {Array.from({ length: maxLives }).map((_, i) => (
            <span key={i} style={{ ...s.heart, opacity: i < lives ? 1 : 0.2 }}>♥</span>
          ))}
        </div>
      </div>

      {/* Attempt history */}
      {attempts.length > 0 && (
        <div style={s.history}>
          <div style={s.historyLabel}>Previous attempts</div>
          {attempts.map((a, ai) => (
            <div key={ai} style={s.attemptRow}>
              {a.chain.map((char, ci) => (
                <React.Fragment key={ci}>
                  <div style={{
                    ...s.histChip,
                    background: FB_BG[a.feedback[ci]],
                    color: FB_COLOR[a.feedback[ci]],
                    border: `1.5px solid ${FB_COLOR[a.feedback[ci]]}`,
                  }}>
                    {char}
                  </div>
                  {ci < 3 && <span style={s.histArrow}>›</span>}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Chain */}
      <div style={s.chainSection}>
        <div style={s.chainLabel}>Your chain</div>
        <div style={s.chain}>
          {Array.from({ length: 4 }).map((_, i) => {
            const char = chain[i]
            const fb = lastAttempt?.feedback[i]
            const isActive = i === currentSlot && !chainComplete
            return (
              <React.Fragment key={i}>
                <div style={{
                  ...s.slot,
                  ...(char
                    ? fb
                      ? { background: FB_BG[fb], borderColor: FB_COLOR[fb], color: FB_COLOR[fb], borderStyle: 'solid' }
                      : { background: 'white', borderColor: '#1a3a5c', color: 'var(--ink)', borderStyle: 'solid' }
                    : isActive
                      ? { background: '#dce8f5', borderColor: '#1a3a5c', borderStyle: 'dashed', color: '#1a3a5c' }
                      : { background: 'transparent', borderColor: '#d4cabb', borderStyle: 'dashed', color: '#d4cabb' }
                  ),
                }}>
                  {char
                    ? <span style={s.slotChar}>{char}</span>
                    : <span style={s.slotNum}>{i + 1}</span>
                  }
                </div>
                {i < 3 && (
                  <div style={s.connector}>
                    <span style={s.connectorArrow}>›</span>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Riddle */}
      {!chainComplete && (
        <div style={s.riddleBox}>
          <div style={s.riddleTag}>字 {currentSlot + 1} / 4</div>
          <p style={s.riddleText}>{puzzle.riddles[currentSlot].text}</p>
          {showHint
            ? <p style={s.hint}>💡 {puzzle.riddles[currentSlot].hint}</p>
            : <button style={s.hintBtn} onClick={() => setShowHint(true)}>提示 · hint</button>
          }
        </div>
      )}

      {chainComplete && (
        <div style={s.riddleBox}>
          <p style={s.riddleText}>链已完成。准备好了吗？</p>
          <p style={s.hint}>Chain complete — review your picks, then submit.</p>
        </div>
      )}

      {/* Grid */}
      <div style={s.gridWrap}>
        <div style={s.grid}>
          {puzzle.grid.map((char, gi) => {
            const selectable = isSelectable(gi)
            const selected = isSelected(gi)
            const slot = getCharSlot(gi)
            const fb = lastAttempt?.feedback[slot]

            let btnStyle = { ...s.charBtn }
            if (selected) {
              btnStyle = {
                ...btnStyle,
                background: fb ? FB_BG[fb] : '#e8f0f8',
                borderColor: fb ? FB_COLOR[fb] : '#1a3a5c',
                color: fb ? FB_COLOR[fb] : '#1a3a5c',
                opacity: 0.7,
                cursor: 'default',
                transform: 'scale(0.95)',
              }
            } else if (selectable) {
              btnStyle = {
                ...btnStyle,
                background: 'white',
                borderColor: '#aab8c8',
                color: 'var(--ink)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                cursor: 'pointer',
              }
            } else {
              btnStyle = {
                ...btnStyle,
                background: 'var(--paper2)',
                borderColor: '#e0d9ce',
                color: '#c0b8ae',
                cursor: 'default',
              }
            }

            return (
              <button
                key={gi}
                style={btnStyle}
                onClick={() => selectChar(gi)}
                disabled={!selectable}
              >
                {char}
              </button>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div style={s.actions}>
        {chain.some(c => c !== null) && (
          <button style={s.resetBtn} onClick={resetChain}>重选 · Reset</button>
        )}
        {chainComplete && (
          <button
            style={{ ...s.submitBtn, opacity: submitting ? 0.6 : 1 }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            提交 · Submit
          </button>
        )}
      </div>
    </div>
  )
}

const s = {
  root: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 420,
    margin: '0 auto',
    background: 'var(--paper)',
    borderLeft: '1px solid #d4cabb',
    borderRight: '1px solid #d4cabb',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px 14px',
    borderBottom: '1.5px solid #d4cabb',
    background: 'var(--paper)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  logoWrap: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1,
  },
  logoZh: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 20,
    fontWeight: 900,
    color: 'var(--ink)',
  },
  logoEn: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 9,
    color: 'var(--grey)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  hearts: {
    display: 'flex',
    gap: 4,
  },
  heart: {
    fontSize: 14,
    color: 'var(--red)',
  },
  history: {
    padding: '10px 20px',
    background: 'var(--paper2)',
    borderBottom: '1px solid #e0d9ce',
  },
  historyLabel: {
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: 'var(--grey)',
    marginBottom: 8,
  },
  attemptRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  histChip: {
    width: 34,
    height: 34,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 16,
    fontWeight: 700,
  },
  histArrow: {
    color: '#c8bfaa',
    fontSize: 12,
  },
  chainSection: {
    padding: '14px 24px 12px',
    borderBottom: '1px solid #e8e4dc',
  },
  chainLabel: {
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: 'var(--grey)',
    marginBottom: 10,
  },
  chain: {
    display: 'flex',
    alignItems: 'center',
  },
  slot: {
    width: 60,
    height: 60,
    borderRadius: 10,
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  slotChar: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 26,
    fontWeight: 700,
  },
  slotNum: {
    fontFamily: "'Noto Sans SC', sans-serif",
    fontSize: 14,
    fontWeight: 300,
  },
  connector: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectorArrow: {
    color: '#c8bfaa',
    fontSize: 18,
  },
  riddleBox: {
    margin: '0 20px 12px',
    marginTop: 14,
    background: 'white',
    border: '1.5px solid #d4cabb',
    borderRadius: 12,
    padding: '16px 16px 12px',
    position: 'relative',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  riddleTag: {
    position: 'absolute',
    top: -10,
    left: 14,
    background: 'var(--active)',
    color: 'white',
    fontSize: 9,
    letterSpacing: 1,
    padding: '2px 10px',
    borderRadius: 20,
    fontFamily: "'Noto Sans SC', sans-serif",
    fontWeight: 500,
  },
  riddleText: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 15,
    lineHeight: 1.8,
    color: 'var(--ink)',
    marginTop: 4,
  },
  hint: {
    marginTop: 10,
    fontSize: 11,
    color: 'var(--grey)',
    fontStyle: 'italic',
    borderTop: '1px solid #e8e4dc',
    paddingTop: 8,
    lineHeight: 1.6,
  },
  hintBtn: {
    marginTop: 10,
    background: 'none',
    border: '1px solid #d4cabb',
    borderRadius: 20,
    padding: '3px 12px',
    fontSize: 11,
    color: 'var(--grey)',
    cursor: 'pointer',
    fontFamily: "'Noto Sans SC', sans-serif",
  },
  gridWrap: {
    padding: '0 20px',
    flex: 1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 8,
  },
  charBtn: {
    aspectRatio: '1',
    borderRadius: 10,
    border: '1.5px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 22,
    fontWeight: 700,
    transition: 'all 0.12s ease',
    background: 'var(--paper2)',
    borderColor: '#e0d9ce',
    color: '#c0b8ae',
  },
  actions: {
    display: 'flex',
    gap: 10,
    padding: '16px 20px 24px',
  },
  resetBtn: {
    flex: 1,
    padding: '12px 0',
    background: 'transparent',
    border: '1.5px solid #d4cabb',
    borderRadius: 10,
    color: 'var(--grey)',
    fontSize: 13,
    fontFamily: "'Noto Sans SC', sans-serif",
    fontWeight: 500,
    letterSpacing: 0.5,
    cursor: 'pointer',
  },
  submitBtn: {
    flex: 2,
    padding: '12px 0',
    background: 'var(--ink)',
    border: 'none',
    borderRadius: 10,
    color: 'var(--paper)',
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 1,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
}
