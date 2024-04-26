import { reactive } from 'vue'

export interface Preferences {
  theme?: string,
  instructions?: string,
  system: string,
  dicePool: number,
  criticalFail?: number,
  criticalSuccess?: number,
  useModifier?: boolean,
  useDescription?: boolean,
  preserveNumberDie?: boolean,
  displayResults?: string,
  merge?: Function,
}

export const store: Preferences = reactive({
  theme: "light",
  instructions: "Default instructions",
  system: "FreeformFig",
  dicePool: 4,
  criticalFail: 1,
  criticalSuccess: 6,
  useModifier: false,
  useDescription: false,
  preserveNumberDie: false,
  displayResults: "highest",

  merge(newValues:object) {
    Object.assign(this, newValues)
  }
})
