import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('@/views/FeedPage.vue')
  },
  {
    path: '/interests',
    name: 'Interests',
    component: () => import('@/views/Interests.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
