import axios from 'axios'

// Base URL for the Laravel backend. Configure via .env as VITE_API_BASE_URL.
// Laravel Sanctum-style token auth is assumed (Bearer token in Authorization header).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { Accept: 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sf_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sf_token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// Resource endpoints — match the SRS entity list (users, trucks, drivers,
// cargo, matches, bookings, shipments, commissions, notifications, reports).
export const AuthAPI = {
  login: (payload) => api.post('/auth/login', payload),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me')
}

export const DashboardAPI = {
  summary: () => api.get('/admin/dashboard/summary')
}

export const UsersAPI = {
  list: (params) => api.get('/admin/users', { params }),
  update: (id, payload) => api.put(`/admin/users/${id}`, payload),
  suspend: (id) => api.post(`/admin/users/${id}/suspend`)
}

export const TrucksAPI = {
  list: (params) => api.get('/admin/trucks', { params }),
  verify: (id) => api.post(`/admin/trucks/${id}/verify`),
  reject: (id) => api.post(`/admin/trucks/${id}/reject`)
}

export const DriversAPI = {
  list: (params) => api.get('/admin/drivers', { params })
}

export const CargoAPI = {
  list: (params) => api.get('/admin/cargo', { params })
}

export const MatchesAPI = {
  list: (params) => api.get('/admin/matches', { params })
}

export const BookingsAPI = {
  list: (params) => api.get('/admin/bookings', { params })
}

export const ShipmentsAPI = {
  list: (params) => api.get('/admin/shipments', { params }),
  updateStatus: (id, status) => api.post(`/admin/shipments/${id}/status`, { status })
}

export const CommissionsAPI = {
  list: (params) => api.get('/admin/commissions', { params }),
  updateRate: (payload) => api.put('/admin/settings/commission-rate', payload)
}

export const ReportsAPI = {
  overview: (params) => api.get('/admin/reports/overview', { params })
}

export default api
