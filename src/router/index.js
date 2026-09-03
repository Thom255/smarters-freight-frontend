import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/login', name: 'login', component: () => import('../views/Login.vue'), meta: { public: true } },
  {
    path: '/',
    component: () => import('../views/AdminLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('../views/Dashboard.vue') },
      { path: 'users', name: 'users', component: () => import('../views/Users.vue') },
      { path: 'trucks', name: 'trucks', component: () => import('../views/Trucks.vue') },
      { path: 'drivers', name: 'drivers', component: () => import('../views/Drivers.vue') },
      { path: 'cargo', name: 'cargo', component: () => import('../views/Cargo.vue') },
      { path: 'matches', name: 'matches', component: () => import('../views/Matches.vue') },
      { path: 'bookings', name: 'bookings', component: () => import('../views/Bookings.vue') },
      { path: 'shipments', name: 'shipments', component: () => import('../views/Shipments.vue') },
      { path: 'commissions', name: 'commissions', component: () => import('../views/Commissions.vue') },
      { path: 'reports', name: 'reports', component: () => import('../views/Reports.vue') }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!to.meta.public && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
