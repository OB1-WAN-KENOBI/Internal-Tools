import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Use /Internal-Tools/ for production (GitHub Pages), / for development
  const basePath = mode === 'production' ? '/Internal-Tools/' : '/'
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
    },
    base: basePath,
  }
})
