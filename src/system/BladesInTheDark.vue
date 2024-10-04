<script setup lang="ts">
import { computed, watchEffect, type ComputedRef } from 'vue'
import { store, type Preferences } from '@/state/store'
import { results } from '@/state/results'
import { rollX } from '@/methods/dice'
import ModalMultiDice from '@/components/ModalMultiDice.vue'
import ModalSettings from '@/components/ModalSettings.vue'

// Settings
const systemPrefs: Preferences = {
  system: 'bitd',
  instructions: 'Choose how many dice to roll',
  dicePool: 4,
  useModifier: false,
  useDescription: true,
  useCrits: true,
  useSystemSounds: true,
  preserveNumberDie: false,
  displayResults: 'highest'
}

if (store.merge) store.merge(systemPrefs)

function countSixes(results: Array<number>) {
  let amount: number = 0
  results.forEach((result) => {
    if (result === 6) amount++
  })
  return amount
}

// Roll Descriptions
const rollDescription: ComputedRef<string> = computed(() => {
  let description: string = ''
  let sixes = countSixes(results.roll)
  if (sixes >= 2) {
    description = 'Critical Success!'
    return description
  } else if (results.highest === 6) {
    description = 'Full Success'
    return description
  } else if (results.highest >= 4) {
    description = 'Partial Success'
    return description
  } else {
    description = 'Failure'
    return description
  }
})

results.setDescription(rollDescription)

// Sounds
const fail = new Audio('/hero-dice/audio/generic-fail.mp3')
const mixed = new Audio('/hero-dice/audio/generic-mixed.mp3')
const success = new Audio('/hero-dice/audio/generic-success.mp3')
const crit = new Audio('/hero-dice/audio/generic-crit.mp3')

watchEffect(() => {
  let sixes = countSixes(results.roll)
  if (sixes >= 2) {
    playSound(crit)
    return
  }

  if (results.highest === 6) {
    playSound(success)
  } else if (results.highest >= 4) {
    playSound(mixed)
  } else if (results.highest > 0) {
    playSound(fail)
  }
})

function playSound(sound: HTMLAudioElement) {
  if (store.useResultSounds && store.useSystemSounds) {
    setTimeout(() => {
      sound.load()
      sound.play()
    }, 500)
  }
}

// Control Ranges
const diceRange: Array<number> = [4, 5, 6, 7, 8, 9]
</script>

<template>
  <button v-for="n in store.dicePool" @click="rollX(n, 6)" :key="n" class="btn btn--dice">
    <span class="btn__label">
      {{ n }}
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
