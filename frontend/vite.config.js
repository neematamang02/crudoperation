import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Make sure your frontend runs on this port
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
