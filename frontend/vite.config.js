import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    proxy: {
      '/auth': 'http://127.0.0.1:5000',
      '/properties': 'http://127.0.0.1:5000',
      '/leads': 'http://127.0.0.1:5000',
      '/admin': 'http://127.0.0.1:5000'
    }
  }
})
