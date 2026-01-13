import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/agencia-viajes-oeste-frontend-react-vite-auth/',
  server: {
    proxy: {
      '/api': {
        target: 'https://reqres.in',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
