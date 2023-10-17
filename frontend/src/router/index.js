import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/website/new',
      name: 'addWebsite',
      component: () => import('../views/NewWebSiteView.vue')
    }
  ]
})

export default router
