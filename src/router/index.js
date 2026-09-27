import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/login.vue'
import Manufacturing from '@/pages/manufacturing.vue'
import Machine from '@/pages/machine.vue'
import Appearance from '@/pages/appearance.vue'
import DailySheet from '@/pages/dailysheet.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/manufacturing', component: Manufacturing },
  { path: '/machine', component: Machine },
  { path: '/appearance', component: Appearance },
  { path: '/dailysheet', component: DailySheet },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router