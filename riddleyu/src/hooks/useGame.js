import { useState, useEffect } from 'react'
import { getPuzzleForDate, getTodayString } from '../puzzles'

const MAX_LIVES = 5

export function useGame() {
  const [puzzle, setPuzzle] = useState(null)
  const [phase, setPhase] = useState('intro') // intro | connections | sliding | result
  const [currentChengyu, setCurrentChengyu] = useState(0) // 0–3
  const [selected, setSelected] = useState([]) // grid indices currently selected
  const [solvedGroups, setSolvedGroups] = useState([false, false, false, false])
  const [lives, setLives] = useState(MAX_LIVES)
  const [attempts, setAttempts] = useState([]) // { group, chars, correct }
  const [wrongFlash, setWrongFlash] = useState(false)
  const [flashCorrect, setFlashCorrect] = useState(false)
  const [solveOverlay, setSolveOverlay] = useState(null) // null | 0|1|2|3 (chengyu index)
  const [offsets, setOffsets] = useState([0, 0, 0, 0]) // sliding phase: active char index per row
  const [won, setWon] = useState(false)

  useEffect(() => {
    getPuzzleForDate(getTodayString()).then(setPuzzle)
  }, [])

  function startGame() {
    setPhase('connections')
  }

  // --- CONNECTIONS PHASE ---

  function toggleSelect(gridIndex) {
    const group = puzzle.gridGroups[gridIndex]
    if (solvedGroups[group]) return
    if (selected.includes(gridIndex)) {
      setSelected(selected.filter(i => i !== gridIndex))
    } else if (selected.length < 4) {
      setSelected([...selected, gridIndex])
    }
  }

  function submitGroup() {
    if (selected.length !== 4) return
    const selectedGroups = selected.map(i => puzzle.gridGroups[i])
    const correct = selectedGroups.every(g => g === currentChengyu)
    const selectedChars = selected.map(i => puzzle.grid[i])
    const targetChars = puzzle.chengyus[currentChengyu].chars
    const colors = selectedChars.map((ch, i) => {
      if (ch === targetChars[i]) return 'green'
      if (targetChars.includes(ch)) return 'yellow'
      return 'grey'
    })
    setAttempts(prev => [...prev, { group: currentChengyu, chars: selectedChars, correct, colors }])

    if (correct) {
      setFlashCorrect(true)
      setTimeout(() => {
        setFlashCorrect(false)
        const newSolved = [...solvedGroups]
        newSolved[currentChengyu] = true
        setSolvedGroups(newSolved)
        setSelected([])
        setSolveOverlay(currentChengyu) // show overlay AFTER grid updates
      }, 700)
    } else {
      setWrongFlash(true)
      setTimeout(() => {
        setWrongFlash(false)
        setSelected([])
        const newLives = lives - 1
        setLives(newLives)
        if (newLives === 0) setPhase('result')
      }, 600)
    }
  }

  function resetSelection() {
    setSelected([])
  }

  function dismissOverlay() {
    const solved = solveOverlay
    setSolveOverlay(null)
    if (solved === 3) {
      setPhase('sliding')
    } else {
      setCurrentChengyu(solved + 1)
    }
  }

  // --- SLIDING PHASE ---

  function updateOffset(rowIndex, newOffset) {
    const clamped = Math.max(0, Math.min(3, newOffset))
    const next = [...offsets]
    next[rowIndex] = clamped
    setOffsets(next)

    // Check win: each row's active char must match hidden.chars[rowIndex]
    const allCorrect = puzzle.chengyus.every((cy, i) => {
      return cy.chars[next[i]] === puzzle.hidden.chars[i]
    })
    if (allCorrect) {
      setWon(true)
      setTimeout(() => setPhase('result'), 1400)
    }
  }

  return {
    puzzle,
    phase,
    currentChengyu,
    selected,
    solvedGroups,
    lives,
    maxLives: MAX_LIVES,
    attempts,
    wrongFlash,
    flashCorrect,
    solveOverlay,
    offsets,
    won,
    startGame,
    toggleSelect,
    submitGroup,
    resetSelection,
    dismissOverlay,
    updateOffset,
  }
}
