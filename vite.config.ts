import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // En desarrollo usa "/", en producción usa el path del repo para GitHub Pages
  base: mode === 'production' ? '/agencia-viajes-oeste-frontend-react-vite-auth/' : '/',
  server: {
    proxy: {
      '/api': {
        target: 'https://reqres.in',
        changeOrigin: true,
        secure: false,
      }
    }
  }
}))
