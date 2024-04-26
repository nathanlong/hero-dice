<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { results } from '@/state/results'
const props = defineProps({
  stepper: Boolean,
  closeOnSelect: Boolean,
  range: Array<number>
})

const useStepper: Ref<Boolean> = ref(props.stepper ?? false)
const active: Ref<Boolean> = ref(false)

function handleMod(num: number) {
  if (props.closeOnSelect) {
    results.setModifier(num)
    active.value = false
  } else {
    results.setModifier(num)
  }
}
</script>

<template>
  <div v-if="useStepper" class="stepper stepper--control">
    <button class="btn btn--offset btn--stepper" @click="results.modifier--">-</button>
    <button class="btn btn--other" @click="active = true">
      <span class="btn__label">{{ results.modifier }}</span>
      <span class="btn__description">Modifier</span>
    </button>
    <button class="btn btn--offset btn--stepper" @click="results.modifier++">+</button>
  </div>

  <button v-if="!useStepper" class="btn btn--other" @click="active = true">
    <span class="btn__label">{{ results.modifier }}</span>
    <span class="btn__description">Modifier</span>
  </button>

  <Teleport to="body">
    <Transition>
      <div v-if="active" class="modal">
        <p class="directions">Choose modifier number, or use bottom input</p>
        <div class="grid">
          <button
            v-for="n in props.range"
            class="btn"
            :class="{ active: results.modifier === n }"
            :key="n"
            @click="handleMod(n)"
          >
            <span class="btn__label">
              {{ n }}
            </span>
          </button>
        </div>
        <div class="stepper">
          <button class="btn btn--offset btn--stepper" @click="results.modifier--">-</button>
          <input class="stepper__input" type="number" v-model="results.modifier" />
          <button class="btn btn--offset btn--stepper" @click="results.modifier++">+</button>
        </div>
        <button class="btn btn--results btn--clear" @click="active = false">Close</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>

.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-grow: 1;
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
