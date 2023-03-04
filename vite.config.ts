import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://cinema-rest.nodehill.se',
        changeOrigin: true,
        secure: true
      }
    },
    port: 8080
  }
})
