import { defineStore } from 'pinia'
import { AuthAPI } from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('sf_user') || 'null'),
    token: localStorage.getItem('sf_token') || null
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
    isAdmin: (s) => s.user?.role === 'ADMIN'
  },
  actions: {
    async login(email, password) {
      // Wire this to POST /api/auth/login on the Laravel backend.
      // Expected response: { token, user: { id, full_name, role, ... } }
      const { data } = await AuthAPI.login({ email, password })
      this.token = data.token
      this.user = data.user
      localStorage.setItem('sf_token', data.token)
      localStorage.setItem('sf_user', JSON.stringify(data.user))
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('sf_token')
      localStorage.removeItem('sf_user')
    }
  }
})
