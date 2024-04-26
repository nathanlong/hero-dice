<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { store } from '@/state/store'
import { results } from '@/state/results'
import { rollX } from '@/methods/dice'

const active: Ref<Boolean> = ref(false)
</script>

<template>
  <button class="btn btn--offset btn--settings" @click="active = true">
    <span class="btn__label">⚙︎</span>
    <span class="btn__description">Settings</span>
  </button>
  <Teleport to="body">
    <Transition>
      <div v-if="active" class="modal">
        <p class="directions">Future Settings</p>
        <button class="btn btn--results btn--clear" @click="active = false">Close</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
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
  width: 100%;
  text-align: center;
  border-bottom: 1px solid var(--btn-border-dark);
}
</style>
