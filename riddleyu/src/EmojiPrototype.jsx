import { useState } from 'react'

// Prototype: Emoji anchor integration
// Shows: story canvas with emoji placeholders, witness box with big emoji, archive

const PUZZLE = {
  chengyu: ['马', '到', '成', '功'],
  pinyin: 'mǎ dào chéng gōng',
  meaning: 'Immediate success upon arrival',
  story: [
    { before: '将军骑着', char: '马', after: '，一路疾驰，' },
    { before: '', char: '到', after: '达前线，敌军闻风丧胆，' },
    { before: '大获全', char: '成', after: '，凯旋而归，' },
    { before: '此乃盖世之', char: '功', after: '。' },
  ],
  riddles: [
    {
      emoji: '🐎',
      char: '马',
      witnesses: [
        {
          speaker: '将军 · General Wei',
          text: '「凡我出征，必携此物。无它，如虎无翼。」',
          translation: 'Every time I rode to battle, I brought this. Without it, I was a tiger with no wings.',
        },
        {
          speaker: '史书 · The Chronicle',
          text: '「四蹄踏破云烟，一声嘶鸣破敌胆。」',
          translation: 'Four hooves tore through the morning mist. One cry shattered the enemy\'s will.',
        },
        {
          speaker: '将士们 · The Soldiers',
          text: '「将军的战🐎来了！冲啊！」',
          translation: 'The general\'s 🐎 has arrived! Charge!',
        },
      ],
    },
    {
      emoji: '🏁',
      char: '到',
      witnesses: [
        {
          speaker: '信使 · The Messenger',
          text: '「三日三夜，未曾歇息，终于……」',
          translation: 'Three days and three nights, without rest, until finally…',
        },
        {
          speaker: '城门守卫 · Gate Guard',
          text: '「将军的旗帜出现在地平线上——他🏁了！」',
          translation: 'The general\'s banner appeared on the horizon — he has 🏁!',
        },
      ],
    },
    {
      emoji: '⚔️',
      char: '成',
      witnesses: [
        {
          speaker: '皇帝 · The Emperor',
          text: '「百战百胜，此乃真英雄也。」',
          translation: 'A hundred battles, a hundred victories — this is a true hero.',
        },
      ],
    },
    {
      emoji: '🌟',
      char: '功',
      witnesses: [
        {
          speaker: '百姓 · The People',
          text: '「将军之名，千古流传。」',
          translation: 'The general\'s name will echo through the ages.',
        },
      ],
    },
  ],
}

const ARCHIVE = [
  { date: 'Mar 16', emojis: ['🪨', '🐦', '✌️', '💡'], idiom: '一石二鸟', condition: '略有磨损' },
  { date: 'Mar 15', emojis: ['🌊', '🐟', '🎣', '🍽️'], idiom: '如鱼得水', condition: '完好如初' },
  { date: 'Mar 14', emojis: ['🌸', '🌿', '🦋', '☁️'], idiom: '春风得意', condition: '严重破损' },
]

const colors = {
  paper: '#f5f0e8',
  paper2: '#ede8dc',
  paper3: '#d4c9b0',
  ink: '#2c1810',
  seal: '#c0392b',
  gold: '#b8960c',
  active: '#1a3a5c',
  grey: '#8a8a8a',
}

export default function EmojiPrototype() {
  const [solved, setSolved] = useState([false, false, false, false])
  const [activeChar, setActiveChar] = useState(0)
  const [witnessIndex, setWitnessIndex] = useState(0)
  const [showArchive, setShowArchive] = useState(false)

  const riddle = PUZZLE.riddles[activeChar]
  const witness = riddle.witnesses[witnessIndex]
  const allSolved = solved.every(Boolean)

  function solveChar(i) {
    const next = [...solved]
    next[i] = true
    setSolved(next)
    setWitnessIndex(0)
    if (i < 3) {
      setActiveChar(i + 1)
    }
  }

  function reset() {
    setSolved([false, false, false, false])
    setActiveChar(0)
    setWitnessIndex(0)
    setShowArchive(false)
  }

  return (
    <div style={{ background: colors.paper, minHeight: '100vh', fontFamily: "'Noto Sans SC', sans-serif", color: colors.ink }}>
      <div style={{ maxWidth: 420, margin: '0 auto', padding: '16px 16px 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700 }}>
            谜语 <span style={{ color: colors.grey, fontSize: 14, fontWeight: 400 }}>RiddleYu</span>
          </div>
          <button
            onClick={() => setShowArchive(!showArchive)}
            style={{ background: 'none', border: `1px solid ${colors.paper3}`, borderRadius: 8, padding: '4px 10px', fontSize: 13, color: colors.grey, cursor: 'pointer' }}
          >
            {showArchive ? '← game' : '📜 archive'}
          </button>
        </div>

        {showArchive ? (
          <Archive />
        ) : (
          <>
            {/* Story Canvas */}
            <StoryCanvas story={PUZZLE.story} riddles={PUZZLE.riddles} solved={solved} activeChar={activeChar} allSolved={allSolved} chengyu={PUZZLE.chengyu} pinyin={PUZZLE.pinyin} meaning={PUZZLE.meaning} />

            {!allSolved && (
              <>
                {/* Witness Box */}
                <WitnessBox
                  riddle={riddle}
                  witness={witness}
                  witnessIndex={witnessIndex}
                  totalWitnesses={riddle.witnesses.length}
                  onNextWitness={() => setWitnessIndex(Math.min(witnessIndex + 1, riddle.witnesses.length - 1))}
                  onSolve={() => solveChar(activeChar)}
                />

                {/* Char indicator */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
                  {PUZZLE.riddles.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => { setActiveChar(i); setWitnessIndex(0) }}
                      style={{
                        width: 36, height: 36, borderRadius: 8,
                        background: solved[i] ? colors.gold : i === activeChar ? colors.active : colors.paper2,
                        color: solved[i] || i === activeChar ? '#fff' : colors.grey,
                        border: 'none', fontSize: 18, cursor: 'pointer',
                        opacity: solved[i] ? 0.7 : 1,
                      }}
                    >
                      {solved[i] ? PUZZLE.chengyu[i] : r.emoji}
                    </button>
                  ))}
                </div>
              </>
            )}

            {allSolved && (
              <button
                onClick={reset}
                style={{ display: 'block', margin: '16px auto 0', background: 'none', border: `1px solid ${colors.paper3}`, borderRadius: 8, padding: '8px 20px', color: colors.grey, cursor: 'pointer', fontSize: 13 }}
              >
                ↺ reset prototype
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function StoryCanvas({ story, riddles, solved, activeChar, allSolved, chengyu, pinyin, meaning }) {
  return (
    <div style={{
      background: colors.paper2,
      border: `1px solid ${colors.paper3}`,
      borderRadius: 12,
      padding: '16px 20px',
      marginBottom: 16,
      position: 'relative',
    }}>
      {/* Parchment texture effect */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.02) 28px, rgba(0,0,0,0.02) 29px)', pointerEvents: 'none' }} />

      <div style={{ fontSize: 11, color: colors.grey, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Playfair Display, serif' }}>
        Origin Story
      </div>

      {story.map((line, i) => (
        <div key={i} style={{ fontSize: 17, lineHeight: 2, color: solved[i] ? colors.ink : colors.grey, transition: 'color 0.4s' }}>
          {line.before}
          <CharSlot
            char={line.char}
            emoji={riddles[i].emoji}
            solved={solved[i]}
            isActive={i === activeChar && !solved[i]}
          />
          {line.after}
        </div>
      ))}

      {allSolved && (
        <div style={{ marginTop: 16, textAlign: 'center', borderTop: `1px solid ${colors.paper3}`, paddingTop: 12 }}>
          <div style={{ fontSize: 28, letterSpacing: 6, fontFamily: 'Noto Serif SC, serif', color: colors.seal, marginBottom: 4 }}>
            {chengyu.join('')}
          </div>
          <div style={{ fontSize: 13, color: colors.grey, marginBottom: 2 }}>{pinyin}</div>
          <div style={{ fontSize: 13, color: colors.ink }}>{meaning}</div>
        </div>
      )}
    </div>
  )
}

function CharSlot({ char, emoji, solved, isActive }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32, height: 32,
      borderRadius: 6,
      border: `1.5px solid ${solved ? colors.gold : isActive ? colors.active : colors.paper3}`,
      background: solved ? `${colors.gold}18` : isActive ? `${colors.active}10` : 'transparent',
      fontSize: solved ? 18 : 16,
      margin: '0 1px',
      verticalAlign: 'middle',
      fontFamily: solved ? 'Noto Serif SC, serif' : 'inherit',
      color: solved ? colors.ink : colors.grey,
      transition: 'all 0.35s',
      position: 'relative',
      top: -1,
    }}>
      {solved ? char : emoji}
    </span>
  )
}

function WitnessBox({ riddle, witness, witnessIndex, totalWitnesses, onNextWitness, onSolve }) {
  const canAddWitness = witnessIndex < totalWitnesses - 1

  return (
    <div style={{
      background: colors.paper2,
      border: `1px solid ${colors.paper3}`,
      borderRadius: 12,
      padding: '20px',
      marginBottom: 12,
    }}>
      {/* Big emoji anchor */}
      <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12, lineHeight: 1 }}>
        {riddle.emoji}
      </div>

      {/* Witness testimonies — stacked as they accumulate */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {Array.from({ length: witnessIndex + 1 }).map((_, i) => (
          <div key={i} style={{
            borderLeft: `2px solid ${colors.paper3}`,
            paddingLeft: 12,
            opacity: i < witnessIndex ? 0.6 : 1,
          }}>
            <div style={{ fontSize: 11, color: colors.grey, marginBottom: 4, fontFamily: 'Playfair Display, serif' }}>
              {riddle.witnesses[i].speaker}
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 3 }}>
              {riddle.witnesses[i].text}
            </div>
            <div style={{ fontSize: 12, color: colors.grey, fontStyle: 'italic' }}>
              {riddle.witnesses[i].translation}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        {canAddWitness && (
          <button
            onClick={onNextWitness}
            style={{
              flex: 1, padding: '10px', borderRadius: 8,
              background: 'none', border: `1px solid ${colors.paper3}`,
              color: colors.grey, fontSize: 13, cursor: 'pointer',
            }}
          >
            + another witness
          </button>
        )}
        <button
          onClick={onSolve}
          style={{
            flex: 2, padding: '10px', borderRadius: 8,
            background: colors.active, border: 'none',
            color: '#fff', fontSize: 14, cursor: 'pointer', fontWeight: 600,
          }}
        >
          {riddle.emoji} = {riddle.char} &nbsp;→ solve
        </button>
      </div>
    </div>
  )
}

function Archive() {
  // Today's puzzle (unsolved state for demo)
  const today = { date: 'Mar 17', emojis: ['🐎', '🏁', '⚔️', '🌟'], idiom: '马到成功', condition: '今天' }
  const all = [today, ...ARCHIVE]

  return (
    <div>
      <div style={{ fontSize: 11, color: colors.grey, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Playfair Display, serif' }}>
        Your Collection
      </div>

      {all.map((entry, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          borderRadius: 10,
          background: i === 0 ? `${colors.active}08` : 'transparent',
          border: `1px solid ${i === 0 ? colors.active + '30' : colors.paper3}`,
          marginBottom: 8,
          cursor: 'pointer',
        }}>
          <div style={{ fontSize: 11, color: colors.grey, width: 40, flexShrink: 0, fontFamily: 'Playfair Display, serif' }}>
            {entry.date}
          </div>
          <div style={{ fontSize: 22, letterSpacing: 2, flexShrink: 0 }}>
            {entry.emojis.join('')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontFamily: 'Noto Serif SC, serif', letterSpacing: 2 }}>
              {entry.idiom}
            </div>
          </div>
          <div style={{ fontSize: 11, color: i === 0 ? colors.active : colors.grey }}>
            {entry.condition}
          </div>
        </div>
      ))}

      <div style={{ marginTop: 20, padding: '12px 16px', borderRadius: 10, background: colors.paper2, border: `1px dashed ${colors.paper3}` }}>
        <div style={{ fontSize: 11, color: colors.grey, marginBottom: 8, fontFamily: 'Playfair Display, serif' }}>
          Echo — spaced recall
        </div>
        <div style={{ textAlign: 'center', fontSize: 32, letterSpacing: 4, marginBottom: 10 }}>
          🪨 🐦 ✌️ 💡
        </div>
        <div style={{ fontSize: 13, color: colors.grey, textAlign: 'center' }}>
          Do you remember this idiom from Mar 16?
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {['一石二鸟', '马到成功', '如鱼得水', '春风得意'].map((opt, i) => (
            <button key={i} style={{
              flex: 1, padding: '8px 4px', borderRadius: 8, fontSize: 12,
              background: 'none', border: `1px solid ${colors.paper3}`,
              color: colors.ink, cursor: 'pointer',
              fontFamily: 'Noto Serif SC, serif',
            }}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
