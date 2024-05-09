import { reactive } from 'vue'
import { store } from './store'

export interface Results {
  roll: Array<number>
  frozenDie: Array<number>
  numberDie: number
  maxResult: number
  display: number
  total: number
  highest: number
  lowest: number
  average: number
  modifier: number
  description: string
  reroll: boolean
  clearRoll: Function
  clearComputed: Function
  toggleFreeze: Function
  setModifier: Function
  setDescription: Function
}

export const results: Results = reactive({
  roll: [],
  frozenDie: [0],
  numberDie: 1,
  maxResult: 0,
  display: 0,
  total: 0,
  highest: 0,
  lowest: 0,
  average: 0,
  modifier: 0,
  description: '',
  reroll: false,

  clearRoll() {
    this.roll = []
    this.frozenDie = []
    this.maxResult = 0
    this.highest = 0
    this.lowest = 0
    this.total = 0

    if (!store.preserveNumberDie) {
      this.numberDie = 1
    }

    if (!store.useModifier) {
      this.modifier = 0
    }
  },

  clearComputed() {
    this.highest = 0
    this.lowest = 0
    this.total = 0
  },

  toggleFreeze(index: number) {
    this.frozenDie = this.frozenDie.includes(index)
      ? this.frozenDie.filter((i) => i !== index)
      : [...this.frozenDie, index]
  },

  setModifier(mod: number) {
    if (this.modifier === mod) {
      this.modifier = 0
    } else {
      this.modifier = mod
    }
  },

  setDescription(newDescription: string) {
    this.description = newDescription
  }
})
