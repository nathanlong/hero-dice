import { createRouter, createWebHistory } from 'vue-router'

import NoSystem from './system/NoSystem.vue'
import FreeformFig from './system/FreeformFig.vue'
import PbtA from './system/PbtA.vue'
import D20System from './system/D20System.vue'
import RisusSystem from './system/RisusSystem.vue'
import BladesInTheDark from './system/BladesInTheDark.vue'

const routes = [
  { path: '/hero-dice/', component: NoSystem },
  { path: '/hero-dice/d20', component: D20System },
  { path: '/hero-dice/ffu', component: FreeformFig },
  { path: '/hero-dice/pbta', component: PbtA },
  { path: '/hero-dice/risus', component: RisusSystem },
  { path: '/hero-dice/bitd', component: BladesInTheDark },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
