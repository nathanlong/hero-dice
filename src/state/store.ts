import { reactive } from 'vue'

export interface Preferences {
  theme?: string
  instructions?: string
  system: string
  dicePool: number
  useModifier?: boolean
  useDescription?: boolean
  useCrits?: boolean
  useResultSounds?: boolean
  useSounds?: boolean
  useSystemSounds?: boolean
  preserveNumberDie?: boolean
  isModalActive?: boolean
  displayResults?: string
  setModalActive?: Function
  merge?: Function
  rollType: string
}

export const store: Preferences = reactive<Preferences>({
  theme: 'light',
  instructions: 'Default instructions',
  system: '',
  dicePool: 4,
  useModifier: false,
  useDescription: false,
  useCrits: true,
  useSounds: true,
  useResultSounds: true,
  useSystemSounds: true,
  preserveNumberDie: false,
  isModalActive: false,
  displayResults: 'highest',
  rollType: 'over',

  setModalActive(state: boolean) {
    this.isModalActive = state
  },

  merge(newValues: object) {
    Object.assign(this, newValues)
  }
})
