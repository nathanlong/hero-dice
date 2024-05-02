<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { store, type Preferences } from '@/state/store'
import { results } from '@/state/results'
import { rollX } from '@/methods/dice'
import ModalMultiDice from '@/components/ModalMultiDice.vue'
import ModalSettings from '@/components/ModalSettings.vue'
import IconUp from '@/icons/IconUp.vue'
import IconDown from '@/icons/IconDown.vue'

// Settings
const systemPrefs: Preferences = {
  system: 'FreeformFig',
  instructions: 'Choose how many dice to roll',
  dicePool: 4,
  useModifier: false,
  useDescription: true,
  useCrits: true,
  displayResults: 'highest'
}

if (store.merge) store.merge(systemPrefs)

function toggleResultType() {
  if (store.displayResults === 'highest') {
    store.displayResults = 'lowest'
  } else if (store.displayResults === 'lowest') {
    store.displayResults = 'highest'
  }
}

// Roll Descriptions
const rollDescription: ComputedRef<string> = computed(() => {
  let description: string = ''
  let resultType = store.displayResults === 'highest' ? results.highest : results.lowest
  switch (resultType) {
    case 6:
      description = '<p>👍 + 😃</p> Success + Something Good!'
      break
    case 5:
      description = '<p>👍</p> Success!'
      break
    case 4:
      description = '<p>👍 + 😧</p> Success + Something Bad!'
      break
    case 3:
      description = '<p>👎 + 😃</p> Failure + Something Good!'
      break
    case 2:
      description = '<p>👎</p> Failure!'
      break
    default:
      description = '<p>👎 + 😧</p> Failure + Something Bad!'
  }
  return description
})

results.setDescription(rollDescription)

// Control Ranges
const diceDescriptions: Array<String> = ['ok', 'good', 'excellent', 'superhuman!']
const diceRange: Array<number> = [5, 6, 7, 8, 9, 10]
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
    <button class="btn btn--other" @click="toggleResultType">
      <span v-if="store.displayResults === 'highest'" class="btn__label text-success"><IconUp class="w-2" /></span>
      <span v-if="store.displayResults === 'lowest'" class="btn__label text-fail"><IconDown class="w-2" /></span>
      <span class="btn__description">
        {{ store.displayResults }}
      </span>
    </button>
    <ModalSettings />
  </div>
</template>

<style scoped>
.btn--dice {
  width: 50%;
  height: 25dvh;
}

.options {
  --local-options-height: 25dvh;
}

@media (orientation: landscape) {
  .btn--dice {
    height: 31dvh;
  }

  .options {
    --local-options-height: 30dvh;
  }
}
</style>
