import { store } from '@/state/store'
import { results } from '@/state/results'
import { log } from '@/state/log'

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
      results.display = results.total
      break
    case 'highest':
      results.display = results.highest
      break
    case 'lowest':
      results.display = results.lowest
      break;
    default:
      results.display = results.total
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
  computeResults()
}
