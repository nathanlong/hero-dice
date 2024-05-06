<script setup lang="ts">
import { computed, ref, watchEffect, type ComputedRef, type Ref } from 'vue'
import { store, type Preferences } from '@/state/store'
import { results } from '@/state/results'
import { rollX } from '@/methods/dice'
import ModalModStepper from '@/components/ModalModStepper.vue'
import ModalSettings from '@/components/ModalSettings.vue'

// Settings
const systemPrefs: Preferences = {
  system: 'PbtA',
  instructions: 'Set modifier then roll',
  dicePool: 1,
  useModifier: true,
  useDescription: true,
  useCrits: true,
  useSystemSounds: true,
  preserveNumberDie: false,
  displayResults: 'total'
}

if (store.merge) store.merge(systemPrefs)

// Roll Descriptions
const rollDescription: ComputedRef<string> = computed(() => {
  let description: string = ''
  if (results.total >= 10) {
    description = 'Success / Strong Hit'
    return description
  } else if (results.total >= 7) {
    description = 'Mixed / Weak Hit'
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

watchEffect(() => {
  if (results.total >= 10) {
    playSound(success)
  } else if (results.total >= 7) {
    playSound(mixed)
  } else if (results.highest !== 0) {
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
const modSteps: Array<number> = [-3, -2, -1, 1, 2, 3]
const stepperRange: Array<number> = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
</script>

<template>
  <div class="stepper">
    <button
      v-for="n in modSteps"
      class="btn btn--offset btn--stepper"
      :class="{ active: results.modifier === n }"
      @click="results.setModifier(n)"
      :key="n"
    >
    <span class="btn__label btn__label--small">
      {{ n }}
    </span>
    </button>
  </div>
  <button v-for="n in store.dicePool" @click="rollX(2, 6)" :key="n" class="btn btn--dice">
    <span class="btn__label"> Roll </span>
  </button>
  <div class="options">
    <ModalModStepper :range="stepperRange" />
    <ModalSettings />
  </div>
</template>

<style scoped>
.btn--dice {
  width: 100%;
  height: 30dvh;
}

.options {
  --local-options-height: 20dvh;
}

@media (orientation: landscape) {
  .btn--dice {
    height: 34dvh;
  }

  .options {
    --local-options-height: 29dvh;
  }
}

.btn--stepper {
  font-weight: 900;
  text-transform: uppercase;
}

.stepper {
  height: 25dvh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

@media (orientation: landscape) {
  .stepper {
    height: 29dvh;
  }
}

.btn__description {
  color: gray;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.btn--settings {
  width: 100%;
}
</style>
