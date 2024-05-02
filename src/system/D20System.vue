<script setup lang="ts">
import { store, type Preferences } from '@/state/store'
import { rollX } from '@/methods/dice'
import { results } from '@/state/results'
import ModalSettings from '@/components/ModalSettings.vue'
import ModalMultiDice from '@/components/ModalMultiDice.vue'
import ModalModStepper from '@/components/ModalModStepper.vue'
import IconDown from '@/icons/IconDown.vue'
import IconUp from '@/icons/IconUp.vue'
import IconEquals from '@/icons/IconEquals.vue'
import IconClose from '@/icons/IconClose.vue'

const systemPrefs: Preferences = {
  system: 'D20System',
  instructions: 'Set amount, modifier, then type',
  dicePool: 6,
  useModifier: true,
  useDescription: false,
  useCrits: true,
  useSystemSounds: false,
  preserveNumberDie: true,
  displayResults: 'total'
}

if (store.merge) store.merge(systemPrefs)

function toggleResultType() {
  if (store.displayResults === 'highest') {
    store.displayResults = 'lowest'
  } else if (store.displayResults === 'lowest') {
    store.displayResults = 'total'
  } else if (store.displayResults === 'total') {
    store.displayResults = 'highest'
  }
}

const diceTypes = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20
}

const diceRange: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const modRange: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
</script>

<template>
  <div class="steppers">
    <ModalMultiDice
      :stepper="true"
      :closeOnSelect="true"
      :immediateRoll="false"
      :range="diceRange"
    />
    <ModalModStepper :stepper="true" :closeOnSelect="true" :range="modRange" />
  </div>
  <div class="grid">
    <button
      v-for="(value, key, index) in diceTypes"
      class="btn btn--dice"
      @click="rollX(results.numberDie, value)"
      :key="index"
    >
      <span class="btn__label">
        {{ key }}
      </span>
    </button>
  </div>

  <div class="options">
    <button class="btn btn--other" @click="(results.numberDie = 1), (results.modifier = 0)">
      <span class="btn__label"><IconClose class="w-2" /></span>
      <span class="btn__description">Clear</span>
    </button>

    <button class="btn btn--other" @click="toggleResultType">
      <span v-if="store.displayResults === 'highest'" class="btn__label text-success"
        ><IconUp class="w-2"
      /></span>
      <span v-if="store.displayResults === 'lowest'" class="btn__label text-fail"
        ><IconDown class="w-2"
      /></span>
      <span v-if="store.displayResults === 'total'" class="btn__label text-freeze"
        ><IconEquals class="w-2"
      /></span>
      <span class="btn__description">
        {{ store.displayResults }}
      </span>
    </button>
    <ModalSettings />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 37.5dvh;
}

.steppers {
  height: 20dvh;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
}

.options {
  height: 17.5dvh;
}

@media (orientation: landscape) {
  .steppers {
    height: 15dvh;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
  }

  .grid {
    height: 52dvh;
  }

  .options {
    height: 25dvh;
  }
}
</style>
