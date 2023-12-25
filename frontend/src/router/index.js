import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from '@auth0/auth0-vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/website/edit/:id',
      name: 'editWebsite',
      beforeEnter: authGuard,
      component: () => import('../views/EditWebSiteView.vue')
    },
    {
      path: '/website/new',
      name: 'addWebsite',
      beforeEnter: authGuard,
      component: () => import('../views/NewWebSiteView.vue')
    },
    {
      path: '/websites',
      name: 'websites',
      beforeEnter: authGuard,
      component: () => import('../views/WebSitesListView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      beforeEnter: authGuard,
      component: () => import('../views/UserProfileView.vue')
    },
    {
      path: '/website/detail/:id',
      name: 'siteDetail',
      beforeEnter: authGuard,
      component: () => import('../views/WebSiteView.vue')
    }
  ]
});

export default router;
