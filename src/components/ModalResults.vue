<script setup lang="ts">
import { computed, watchEffect, type ComputedRef } from 'vue'
import { results } from '@/state/results'
import { store } from '@/state/store'
import { clearRoll, freezeIndex, reRoll } from '@/methods/dice'

const active: ComputedRef<boolean> = computed(() => {
  return results.roll.length > 0
})

watchEffect(() => {
  if (store.setModalActive) store.setModalActive(active.value)
})
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div class="modal" v-if="results.roll.length > 0" @keyup.esc="clearRoll">
        <p class="directions">Tap a die to freeze it for rerolling.</p>
        <div class="results">
          <div class="results-wrapper" :class="{
            'reroll': results.reroll
            }">
            <button
              v-for="(result, index) in results.roll"
              :key="index"
              :class="{
                freeze: results.frozenDie.includes(index),
                'critical-fail': store.useCrits && result === 1,
                'critical-success': store.useCrits && result === results.maxResult,
              }"
              class="result"
              :style="{ '--results-animation-delay': index * 50 + 'ms' }"
              @click="freezeIndex(index)"
              ref="resultDie"
            >
              {{ result }}
            </button>
            <div v-if="results.modifier !== 0" class="modifier">{{ results.modifier }}</div>
          </div>

          <p class="result-number">{{ results.display }}</p>
          <div
            v-if="store.useDescription && results.description !== ''"
            class="result-description"
            v-html="results.description"
          ></div>
        </div>

        <button class="btn btn--results btn--reroll" @click="reRoll"><span>Reroll</span></button>
        <button class="btn btn--results btn--clear" @click="clearRoll"><span>Clear</span></button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 1rem;
}

.results-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.btn--results {
  min-height: 3rem;
  height: 10vh;
  z-index: 1;
  width: 100%;
  font-weight: bold;
  background-color: #ffffff;
}

.directions {
  padding: 0.5rem;
  font-size: 0.75em;
  width: 100%;
  display: block;
  text-align: center;
}

.result-number {
  font-size: 3rem;
  font-weight: 900;
}

.result-description {
  font-size: 1.5rem;
  text-align: center;
}

.advantage {
  text-align: center;
}
</style>
