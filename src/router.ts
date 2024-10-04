import { createRouter, createWebHashHistory } from 'vue-router'

import NoSystem from './system/NoSystem.vue'
import FreeformFig from './system/FreeformFig.vue'
import PbtA from './system/PbtA.vue'
import D20System from './system/D20System.vue'
import RisusSystem from './system/RisusSystem.vue'
import BladesInTheDark from './system/BladesInTheDark.vue'

const routes = [
  { path: '/', component: NoSystem },
  { path: '/d20', component: D20System },
  { path: '/ffu', component: FreeformFig },
  { path: '/pbta', component: PbtA },
  { path: '/risus', component: RisusSystem },
  { path: '/bitd', component: BladesInTheDark }
]

// NOTE: Github Pages doesn't allow proper createWebHistory routing, so use hashes
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
