<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { results } from '@/state/results'
import { rollX } from '@/methods/dice'
const props = defineProps({
  stepper: Boolean,
  immediateRoll: Boolean,
  closeOnSelect: Boolean,
  rollFromModal: Boolean,
  maxResult: Number,
  range: Array<number>
})

const maxResult: Ref<number> = ref(props.maxResult ?? 6);
const useStepper: Ref<Boolean> = ref(props.stepper ?? false);
const active: Ref<Boolean> = ref(false)

function handleRoll(num: number, max: number) {
  if (props.immediateRoll) {
    rollX(num, max)
    active.value = false
  } else if (props.closeOnSelect) {
    results.numberDie = num
    active.value = false
  } else {
    results.numberDie = num
  }
}

function handleTotalRoll() {
  if (props.maxResult) {
    rollX(results.numberDie, props.maxResult)
    active.value = false
  }
}
</script>

<template>
  <div v-if="useStepper" class="stepper stepper--control">
    <button class="btn btn--offset btn--stepper" @click="results.numberDie--">-</button>
    <button class="btn btn--other" @click="active = true">
      <span class="btn__label">{{ results.numberDie }}</span>
      <span class="btn__description"># of Die</span>
    </button>
    <button class="btn btn--offset btn--stepper" @click="results.numberDie++">+</button>
  </div>
  <button v-if="!useStepper" class="btn btn--other" @click="active = true">
    <span class="btn__label">#</span>
    <span class="btn__description">Dice</span>
  </button>
  <Teleport to="body">
    <Transition>
      <div v-if="active" class="modal">
        <p class="directions">
          Choose amount of dice to roll <span v-if="!immediateRoll">or use input at bottom</span>
        </p>
        <div class="grid">
          <button
            v-for="n in props.range"
            class="btn"
            :class="{ active: results.numberDie === n }"
            :key="n"
            @click="handleRoll(n, maxResult)"
          >
            <span class="btn__label">
              {{ n }}
            </span>
          </button>
        </div>
        <div v-if="!immediateRoll" class="stepper">
          <button class="btn btn--offset btn--stepper" @click="results.numberDie--">-</button>
          <input class="stepper__input" type="number" v-model="results.numberDie" />
          <button class="btn btn--offset btn--stepper" @click="results.numberDie++">+</button>
        </div>
        <button v-if="!props.immediateRoll && props.maxResult" class="btn btn--results btn--roll" @click="handleTotalRoll">
          Roll
        </button>
        <button class="btn btn--results btn--clear" @click="active = false">Close</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-grow: 1;
}

@media (orientation: landscape) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stepper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10dvh;
  width: 100%;
}

.stepper--control {
  height: 100%;
}

.btn--results {
  height: 10vh;
  z-index: 1;
  width: 100%;
  font-weight: bold;
  background-color: #ffffff;
}

.btn--stepper {
  width: 25%;
  height: 100%;
}

.stepper__input {
  flex-grow: 1;
  height: 100%;
  text-align: center;
}

.directions {
  padding: 0.5rem;
  font-size: 0.75em;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid var(--btn-border-dark);
}
</style>
