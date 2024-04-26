<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { results } from '@/state/results'
import { store } from '@/state/store'
import { clearRoll, freezeIndex, reRoll } from '@/methods/dice'
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div class="modal" v-if="results.roll.length > 0" @keyup.esc="clearRoll">
        <p class="directions">Tap a die to freeze it for rerolling.</p>
        <div class="results">
          <div class="results-wrapper">
            <button
              v-for="(result, index) in results.roll"
              :key="index"
              :class="{
                freeze: results.frozenDie.includes(index),
                'critical-fail': result === store.criticalFail,
                'critical-success': result === store.criticalSuccess
              }"
              class="result"
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
          <div
            v-if="
              results.numberDie >= 2 && store.system === 'D20System' && results.maxResult === 20
            "
            class="advantage result-description"
          >
            <p>
              Advantage: {{ results.highest }} + {{ results.modifier }} =
              <strong>{{ results.highest + results.modifier }}</strong>
            </p>
            <p>
              Disadvantage: {{ results.lowest }} + {{ results.modifier }} =
              <strong>{{ results.lowest + results.modifier }}</strong>
            </p>
          </div>
        </div>

        <button class="btn btn--results btn-reroll" @click="reRoll">Reroll</button>
        <button class="btn btn--results btn--clear" @click="clearRoll">Clear</button>
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

.result {
  width: 4.5rem;
  height: 4rem;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 1.75rem;
  border-radius: 0.5rem;
  background-color: #333333;
  color: #ffffff;
  border: 0;
  border-top: 2px #444444 solid;
  border-bottom: 2px #383838 solid;
  position: relative;
  z-index: 2;
  transition-property: background-color, color, border-color, box-shadow;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;
  box-shadow:
    0 0.4rem 0 rgba(0, 0, 0, 1),
    0 0.55rem 0 -1px rgba(0, 0, 0, 1),
    0 0.75rem 0 -3px rgba(0, 0, 0, 1),
    0 0.8rem 0.125rem -3px rgba(0, 0, 0, 0.5),
    0 0.82rem 0.5rem rgba(0, 0, 0, 0.15);
}

.critical-fail {
  background-color: #d00000;
  color: #ffffff;
  border-color: #dc2f02;
  box-shadow:
    0 0.4rem 0 #d00000,
    0 0.55rem 0 -1px #d00000,
    0 0.75rem 0 -3px #d00000,
    0 0.8rem 0.125rem -3px rgba(0, 0, 0, 0.5),
    0 0.82rem 0.5rem rgba(0, 0, 0, 0.15);
  animation: shake 200ms 3 linear;
}

@keyframes shake {
  0% {
    transform: translate(3px, 0);
  }
  50% {
    transform: translate(-3px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

.critical-success {
  background-color: #52b788;
  color: #ffffff;
  border-color: #74c69d;
  box-shadow:
    0 0.4rem 0 #52b788,
    0 0.55rem 0 -1px #52b788,
    0 0.75rem 0 -3px #52b788,
    0 0.8rem 0.125rem -3px rgba(0, 0, 0, 0.5),
    0 0.82rem 0.5rem rgba(0, 0, 0, 0.15);
  animation: jump 1200ms 1 ease-out;
}

@keyframes jump {
  0% {
    transform: translate(0, 0px) scale(1) rotateZ(0);
  }
  25% {
    transform: translate(0, -5px) scale(1) rotateZ(0);
  }
  50% {
    transform: translate(0, -5px) scale(1.1) rotateZ(3deg);
  }
  60% {
    transform: translate(0, -5px) scale(1.1) rotateZ(-3deg);
  }
  70% {
    transform: translate(0, -5px) scale(1.1) rotateZ(3deg);
  }
  90% {
    transform: translate(0, -5px) scale(1) rotateZ(0);
  }
  100% {
    transform: translate(0, 0px) scale(1) rotateZ(0);
  }
}

.dark .result {
  background-color: #f0f0f0;
  border: 0;
  border-top: 2px #e9ebeb solid;
  border-bottom: 4px #f2f2f2 solid;
}

.freeze {
  background-color: #90e0ef;
  color: #03045e;
  border-color: #ade8f4;
  box-shadow:
    0 0.4rem 0 #48cae4,
    0 0.55rem 0 -1px #48cae4,
    0 0.75rem 0 -3px #48cae4,
    0 0.8rem 0.125rem -3px rgba(0, 0, 0, 0.5),
    0 0.82rem 0.5rem rgba(0, 0, 0, 0.15);
}

.btn--results {
  height: 10vh;
  z-index: 1;
  width: 100%;
  font-weight: bold;
  background-color: #ffffff;
}

.directions {
  padding: 0.5rem;
  font-size: 0.75em;
}

.modifier {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 100%;
  display: grid;
  place-items: center;
  background: #ddd;
  font-weight: 900;
  font-size: 1.75rem;
  box-shadow: inset 0 0.125rem 0.5rem rgba(0, 0, 0, 0.4);
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
