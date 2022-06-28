import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/interess',
    name: 'Interess',
    component: () => import('@/views/Interess.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
