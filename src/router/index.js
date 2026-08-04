import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/login.vue'
import MBX from '@/pages/mbx.vue'
import Machine from '@/pages/machine.vue'
import Appearance from '@/pages/appearance.vue'
import DailySheet from '@/pages/dailysheet.vue'
import Approval from '@/pages/approval.vue'
import Rework from '@/pages/rework.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/mbx', component: MBX },
  { path: '/machine', component: Machine },
  { path: '/appearance', component: Appearance },
  { path: '/dailysheet', component: DailySheet },
  { path: '/approval', component: Approval},  
  { path: '/rework', component: Rework }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router