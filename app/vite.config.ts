import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@sessions': path.resolve(__dirname, '../sessions'),
      '@root': path.resolve(__dirname, '..'),
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root for markdown imports
      allow: ['..']
    }
  }
})
