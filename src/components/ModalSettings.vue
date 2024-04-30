<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { store } from '@/state/store'
import { log } from '@/state/log'
import { results } from '@/state/results'
import { rollX } from '@/methods/dice'

const active: Ref<Boolean> = ref(false)

function clearData() {
  localStorage.removeItem('preferences')
  log.results = []
}
</script>

<template>
  <button class="btn btn--offset btn--settings" @click="active = true">
    <span class="btn__label">⚙︎</span>
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
              <select v-model="store.theme" id="theme-setting" name="theme">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div class="settings__item">
              <label for="system-setting">System</label>
              <select v-model="store.system" id="system-setting" name="system">
                <option value="FreeformFig">Freeform Universal / FIG</option>
                <option value="BladesInTheDark">Blades in the Dark (BitD)</option>
                <option value="PbtA">Powered by the Apocalpse (PbtA)</option>
                <option value="RisusSystem">Risus</option>
                <option value="D20System">d20 (D&D, and many others)</option>
              </select>
            </div>
            <div class="settings__item settings__item--inline">
              <label for="sound-setting">Play Dice Sounds?</label>
              <input type="checkbox" id="sound-setting" v-model="store.useSounds" />
            </div>
            <div class="settings__item settings__item--inline">
              <label for="result-setting">Play Result Sounds?</label>
              <input type="checkbox" id="result-setting" v-model="store.useSystemSounds" />
            </div>
            <div class="settings__item">
              <label for="clear-data">Clear local data and preferences?</label>
              <button id="clear-data" class="btn btn--offset btn--clear" @click="clearData()">
                Clear Data
              </button>
            </div>
          </div>
        </div>
        <button class="btn btn--results btn--clear" @click="active = false">Close</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.settings {
  flex-grow: 1;
  width: 100%;
  padding-inline: 2rem;
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
