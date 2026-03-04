import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

console.log(" Guardex is running...");

export default defineConfig({
  logLevel: 'error',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
