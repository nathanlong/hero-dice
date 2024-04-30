<script setup lang="ts">
import { ref, watchEffect } from 'vue'

// state
import { store } from './state/store'
import { log } from './state/log'

// systems
import FreeformFig from './system/FreeformFig.vue'
import PbtA from './system/PbtA.vue'
import D20System from './system/D20System.vue'
import RisusSystem from './system/RisusSystem.vue'
import BladesInTheDark from './system/BladesInTheDark.vue'
const systems: any = { FreeformFig, BladesInTheDark, PbtA, D20System, RisusSystem }

import ModalResults from './components/ModalResults.vue'

// grab settings
const STORAGE_KEY = 'preferences'
const LOCAL_PREFS = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
if (store.merge) store.merge(LOCAL_PREFS.value)

// persist state
watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
})
</script>

<template>
  <header class="header">
    <div class="select-wrapper">
      <select v-model="store.system" id="system" name="system" class="system-select">
        <option value="FreeformFig">FFU / FIG</option>
        <option value="BladesInTheDark">BitD</option>
        <option value="PbtA">PbtA</option>
        <option value="RisusSystem">Risus</option>
        <option value="D20System">d20</option>
      </select>
    </div>
    <p class="instructions">{{ store.instructions }}</p>
  </header>

  <main class="main">
    <div class="controls">
      <component :is="systems[store.system]"></component>
    </div>

    <aside class="log">
      <div v-for="(result, index) in log.results" class="log__results" :key="index">
        <p>
          <span>{{ result.roll }}</span
          ><span v-if="result.modifier !== 0"> + ({{ result.modifier }})</span
          ><span> = {{ result.display }}</span>
        </p>
        <p class="log__time">{{ result.time }}</p>
      </div>
    </aside>
  </main>

  <ModalResults />
</template>

<style scoped></style>
