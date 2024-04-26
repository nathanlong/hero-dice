<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { store, type Preferences } from '@/state/store'
import { results } from '@/state/results'
import { rollX } from '@/methods/dice'
import ModalMultiDice from '@/components/ModalMultiDice.vue';
import ModalSettings from '@/components/ModalSettings.vue';

// Settings
const systemPrefs: Preferences = {
  system: "FreeformFig",
  instructions: 'Choose how many dice to roll',
  dicePool: 4,
  criticalFail: 1,
  criticalSuccess: 6,
  useModifier: false,
  useDescription: true,
  displayResults: 'highest'
}

if (store.merge) store.merge(systemPrefs)

// Roll Descriptions
const rollDescription: ComputedRef<string> = computed(() => {
  let description: string = ''
  switch (results.highest) {
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
const diceRange: Array<number> = [4,5,6,7,8,9]
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
