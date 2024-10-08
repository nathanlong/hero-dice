<script setup lang="ts">
import { ref, watchEffect, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/state/store'
import { log } from '@/state/log'
import IconGear from '@/icons/IconGear.vue'
import IconChevronDown from '@/icons/IconChevronDown.vue'

const router = useRouter()
const active: Ref<boolean> = ref(false)

watchEffect(() => {
  if (store.setModalActive) store.setModalActive(active.value)
})

function changeSystem(e: Event) {
  const newSystem = e.currentTarget as HTMLSelectElement
  router.push('/' + newSystem.value)
}

function clearData() {
  localStorage.removeItem('preferences')
  log.results = []
}
</script>

<template>
  <button class="btn btn--offset btn--settings" @click="active = true">
    <span class="btn__label"><IconGear class="w-2" /></span>
    <span class="btn__description">Settings</span>
  </button>
  <Teleport to="body">
    <Transition>
      <div v-if="active" class="modal">
        <p class="directions">Settings</p>
        <div class="settings">
          <div class="settings__inner">
            <div class="settings__item">
              <label for="theme-setting">Theme</label>
              <div class="select-wrapper">
                <select v-model="store.theme" id="theme-setting" name="theme">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="catppuccin">Catppuccin Mocha</option>
                  <option value="rose">Rosé Pine Dawn</option>
                </select>
                <IconChevronDown class="select-wrapper__icon" />
              </div>
            </div>
            <div class="settings__item">
              <label for="system-setting">System</label>
              <div class="select-wrapper">
                <select :value="store.system" @change="changeSystem" id="system-setting" name="system">
                  <option value="d20">d20 (D&D, and many others)</option>
                  <option value="ffu">Freeform Universal / FIG</option>
                  <option value="bitd">Blades in the Dark (BitD)</option>
                  <option value="pbta">Powered by the Apocalpse (PbtA)</option>
                  <option value="risus">Risus</option>
                </select>
                <IconChevronDown class="select-wrapper__icon" />
              </div>
            </div>
            <div class="settings__item settings__item--inline">
              <label for="sound-setting">Play Dice Sounds?</label>
              <input type="checkbox" id="sound-setting" v-model="store.useSounds" />
            </div>
            <div class="settings__item settings__item--inline">
              <label for="result-setting">Play Result Sounds?</label>
              <input type="checkbox" id="result-setting" v-model="store.useResultSounds" />
            </div>
            <div class="settings__item">
              <label for="clear-data">Clear local data and preferences?</label>
              <button id="clear-data" class="btn btn--offset btn--clear" @click="clearData()">
                <span>Clear Data</span>
              </button>
            </div>
          </div>
        </div>
        <button class="btn btn--results btn--clear" @click="active = false">
          <span>Close</span>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.settings {
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
}

.btn--clear {
  padding: 1rem;
}

label {
  width: 100%;
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
  font-size: 1.25rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid var(--btn-border-dark);
}
</style>
