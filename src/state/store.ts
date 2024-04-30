import { reactive } from 'vue'

export interface Preferences {
  theme?: string,
  instructions?: string,
  system: string,
  dicePool: number,
  useModifier?: boolean,
  useDescription?: boolean,
  useCrits?: boolean,
  useSounds?: boolean,
  useSystemSounds?: boolean,
  preserveNumberDie?: boolean,
  displayResults?: string,
  merge?: Function,
}

export const store: Preferences = reactive({
  theme: "light",
  instructions: "Default instructions",
  system: "FreeformFig",
  dicePool: 4,
  useModifier: false,
  useDescription: false,
  useCrits: true,
  useSounds: true,
  useSystemSounds: true,
  preserveNumberDie: false,
  displayResults: "highest",

  merge(newValues:object) {
    Object.assign(this, newValues)
  }
})
