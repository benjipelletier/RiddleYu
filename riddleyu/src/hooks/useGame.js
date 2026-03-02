import { useState, useEffect } from 'react'
import { getPuzzleForDate, getTodayString } from '../puzzles'

const MAX_LIVES = 5

export function useGame() {
  const [puzzle, setPuzzle] = useState(null)
  const [phase, setPhase] = useState('intro') // intro | game | result
  const [currentSlot, setCurrentSlot] = useState(0)
  const [chain, setChain] = useState([null, null, null, null]) // char or null per slot
  const [selectedIndices, setSelectedIndices] = useState([null, null, null, null]) // grid index per slot
  const [lives, setLives] = useState(MAX_LIVES)
  const [attempts, setAttempts] = useState([]) // [{chain: [...], feedback: [...]}]
  const [won, setWon] = useState(false)

  useEffect(() => {
    getPuzzleForDate(getTodayString()).then(p => {
      const grid = [...p.grid].sort(() => Math.random() - 0.5)
      setPuzzle({ ...p, grid })
    })
  }, [])

  function startGame() {
    setPhase('game')
  }

  // Is this grid char selectable right now?
  function isSelectable(gridIndex) {
    if (phase !== 'game') return false
    if (chain[currentSlot] !== null) return false
    return !selectedIndices.includes(gridIndex)
  }

  // Is this grid char already locked into the chain?
  function isSelected(gridIndex) {
    return selectedIndices.includes(gridIndex)
  }

  // Returns 1-4 if this grid char is in the chain, null otherwise
  function getChainPosition(gridIndex) {
    const idx = selectedIndices.indexOf(gridIndex)
    return idx === -1 ? null : idx + 1
  }

  function selectChar(gridIndex) {
    if (!isSelectable(gridIndex)) return
    const char = puzzle.grid[gridIndex]
    const newChain = [...chain]
    newChain[currentSlot] = char
    setChain(newChain)

    const newIndices = [...selectedIndices]
    newIndices[currentSlot] = gridIndex
    setSelectedIndices(newIndices)

    const nextSlot = currentSlot + 1
    if (nextSlot < 4) setCurrentSlot(nextSlot)
  }

  function resetChain() {
    setChain([null, null, null, null])
    setSelectedIndices([null, null, null, null])
    setCurrentSlot(0)
  }

  function unselectSlot(slotIndex) {
    const newChain = [...chain]
    const newIndices = [...selectedIndices]
    for (let i = slotIndex; i < 4; i++) {
      newChain[i] = null
      newIndices[i] = null
    }
    setChain(newChain)
    setSelectedIndices(newIndices)
    setCurrentSlot(slotIndex)
  }

  function getFeedback(ch) {
    return ch.map((char, i) => {
      if (char === puzzle.chengyu[i]) return 'green'
      if (puzzle.chengyu.includes(char)) return 'yellow'
      return 'grey'
    })
  }

  function submitChain() {
    if (chain.some(c => c === null)) return
    const feedback = getFeedback(chain)
    const attempt = { chain: [...chain], feedback }
    const newAttempts = [...attempts, attempt]
    setAttempts(newAttempts)

    if (feedback.every(f => f === 'green')) {
      setWon(true)
      setTimeout(() => setPhase('result'), 800)
    } else {
      const newLives = lives - 1
      setLives(newLives)
      if (newLives === 0) {
        setTimeout(() => setPhase('result'), 800)
      } else {
        resetChain()
      }
    }
  }

  const chainComplete = chain.every(c => c !== null)

  return {
    puzzle,
    phase,
    currentSlot,
    chain,
    lives,
    maxLives: MAX_LIVES,
    attempts,
    won,
    chainComplete,
    startGame,
    selectChar,
    resetChain,
    unselectSlot,
    submitChain,
    isSelectable,
    isSelected,
    getChainPosition,
  }
}
