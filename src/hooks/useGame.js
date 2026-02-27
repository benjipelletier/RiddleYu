import { useState, useEffect } from 'react'
import { getPuzzleForDate, getTodayString } from '../puzzles'

const MAX_LIVES = 5

export function useGame() {
  const [puzzle, setPuzzle] = useState(null)
  const [phase, setPhase] = useState('intro') // intro | game | result
  const [currentSlot, setCurrentSlot] = useState(0)
  const [chain, setChain] = useState([null, null, null, null]) // char or null per slot
  const [lives, setLives] = useState(MAX_LIVES)
  const [attempts, setAttempts] = useState([]) // [{chain: [...], feedback: [...]}]
  const [won, setWon] = useState(false)

  useEffect(() => {
    getPuzzleForDate(getTodayString()).then(setPuzzle)
  }, [])

  function startGame() {
    setPhase('game')
  }

  // Returns which slot this grid char belongs to
  function getCharSlot(gridIndex) {
    return puzzle.slotMap[gridIndex]
  }

  // Is this grid char selectable right now?
  function isSelectable(gridIndex) {
    if (phase !== 'game') return false
    const slot = getCharSlot(gridIndex)
    return slot === currentSlot && chain[currentSlot] === null
  }

  // Is this char already selected (locked into chain)?
  function isSelected(gridIndex) {
    const slot = getCharSlot(gridIndex)
    return chain[slot] === puzzle.grid[gridIndex]
  }

  function selectChar(gridIndex) {
    if (!isSelectable(gridIndex)) return
    const char = puzzle.grid[gridIndex]
    const newChain = [...chain]
    newChain[currentSlot] = char

    setChain(newChain)

    // advance to next empty slot
    const nextSlot = currentSlot + 1
    if (nextSlot < 4) {
      setCurrentSlot(nextSlot)
    }
    // if all 4 filled, stay — user must submit
  }

  function resetChain() {
    setChain([null, null, null, null])
    setCurrentSlot(0)
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
    submitChain,
    isSelectable,
    isSelected,
    getCharSlot,
  }
}
