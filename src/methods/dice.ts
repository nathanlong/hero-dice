import { store } from '@/state/store'
import { results } from '@/state/results'
import { log } from '@/state/log'

const diceOne = new Audio('/hero-dice/audio/dice-one.mp3')
const diceTwo = new Audio('/hero-dice/audio/dice-two.mp3')
const diceMulti = new Audio('/hero-dice/audio/dice-multi.mp3')
const diceMany = new Audio('/hero-dice/audio/dice-many.mp3')

export function roll(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function rollX(num: number, size: number) {
  const numberDie = num === 0 ? 1 : num;
  results.clearRoll()
  results.numberDie = num
  results.maxResult = size

  for (let i = 0; i < numberDie; i++) {
    results.roll.push(roll(1, size))
  }

  computeResults()
  playRollSound(numberDie)
}

function playRollSound(num: number) {
  if (!store.useSounds) {
    return
  }
  if (num >= 6) {
    diceMany.load()
    diceMany.play()
    return
  } else if (num >= 4) {
    diceMulti.load()
    diceMulti.play()
    return
  } else if (num >= 2) {
    diceTwo.load()
    diceTwo.play()
    return
  } else {
    diceOne.load()
    diceOne.play()
    return
  }
}

function computeResults() {
  const now = new Date()

  results.total =
    results.roll.reduce((a, b) => {
      return a + b
    }) + results.modifier
  results.lowest = Math.min(...results.roll)
  results.highest = Math.max(...results.roll)

  switch (store.displayResults) {
    case 'total':
      results.display = results.total + results.modifier
      break
    case 'highest':
      results.display = results.highest + results.modifier
      break
    case 'lowest':
      results.display = results.lowest + results.modifier
      break;
    default:
      results.display = results.total + results.modifier
  }

  log.results.unshift({
    roll: results.roll,
    display: results.display,
    modifier: results.modifier,
    time: now.toLocaleTimeString('en-US')
  })
}

export function clearRoll() {
  results.clearRoll()
}

export function freezeIndex(index: number) {
  results.toggleFreeze(index)
}

export function reRoll() {
  const newResults: Array<number> = []
  results.roll.forEach((result, index) => {
    if (results.frozenDie.includes(index)) {
      newResults[index] = results.roll[index]
    } else {
      newResults[index] = roll(1, results.maxResult)
    }
  })

  results.roll = newResults
  results.clearComputed()
  computeResults()
  playRollSound(results.roll.length)
}
