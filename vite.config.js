import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      // Laravel backend, e.g. http://localhost:8000/api
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
