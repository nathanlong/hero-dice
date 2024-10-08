<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// state
import { store } from './state/store'
import { log } from './state/log'

// components
import ModalResults from './components/ModalResults.vue'
import IconChevronDown from './icons/IconChevronDown.vue'

// grab settings
const STORAGE_KEY = 'preferences'
const LOCAL_PREFS = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
if (store.merge) store.merge(LOCAL_PREFS.value)

// persist state
watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
})

// set theme by preference and watch for changes
function getMediaPreference() {
  const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (hasDarkPreference) {
    return 'dark'
  } else {
    return 'light'
  }
}

const userTheme = ref<string>(LOCAL_PREFS.value.theme || getMediaPreference())
let startTime = new Date()

function changeSystem(e: Event) {
  const newSystem = e.currentTarget as HTMLSelectElement
  router.push('/' + newSystem.value)
}

onMounted(() => {
  store.theme = userTheme.value
})

watchEffect(() => {
  const theme = store.theme ?? 'light'
  document.documentElement.className = theme
  if (theme !== 'light') import(`./assets/themes/${theme}.css`)
})
</script>

<template>
  <header class="header" :inert="store.isModalActive">
    <div class="select-wrapper">
      <label for="system" class="sr-only">Select a system</label>
      <select
        :value="store.system"
        @change="changeSystem"
        id="system"
        name="system"
        class="system-select"
      >
        <option value="d20">D20</option>
        <option value="bitd">BitD</option>
        <option value="ffu">FFU / FIG</option>
        <option value="pbta">PbtA</option>
        <option value="risus">Risus</option>
      </select>
      <IconChevronDown class="select-wrapper__icon" />
    </div>
    <p class="instructions">
      {{ store.instructions }}
    </p>
  </header>

  <main class="main" :inert="store.isModalActive">
    <div class="controls">
      <RouterView />
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
      <div class="log__results">
        <p>Session Start →</p>
        <p class="log__time">{{ startTime.toLocaleTimeString('en-US') }}</p>
      </div>
    </aside>
  </main>

  <ModalResults />
</template>
