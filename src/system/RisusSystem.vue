<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { store, type Preferences } from '@/state/store'
import { results } from '@/state/results'
import { rollX } from '@/methods/dice'
import ModalMultiDice from '@/components/ModalMultiDice.vue'
import ModalSettings from '@/components/ModalSettings.vue'

// Settings
const systemPrefs: Preferences = {
  system: 'RisusSystem',
  instructions: 'Choose how many dice to roll',
  dicePool: 6,
  useModifier: false,
  useDescription: false,
  useCrits: false,
  useSystemSounds: false,
  displayResults: 'total'
}

if (store.merge) store.merge(systemPrefs)

// Control Ranges
const diceDescriptions: Array<String> = [
  'ok',
  'good',
  'excellent',
  'superhuman!',
  'mastery!',
  'ultimate mastery!'
]
const diceRange: Array<number> = [7, 8, 9, 10, 11, 12]
</script>

<template>
  <button v-for="n in store.dicePool" @click="rollX(n, 6)" :key="n" class="btn btn--dice">
    <span class="btn__label">
      {{ n }}
    </span>
    <span class="btn__description">
      {{ diceDescriptions[n - 1] }}
    </span>
  </button>
  <div class="options">
    <ModalMultiDice :range="diceRange" :immediateRoll="true" :maxResult="6" />
    <ModalSettings />
  </div>
</template>

<style scoped>
.btn--dice {
  width: 50%;
  height: 18.75dvh;
}

.options {
  --local-options-height: 18.75dvh;
}

@media (orientation: landscape) {
  .btn--dice {
    height: 23dvh;
  }

  .options {
    --local-options-height: 23dvh;
  }
}
</style>
