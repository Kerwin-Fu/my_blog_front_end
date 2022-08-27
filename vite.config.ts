import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') }
    ]
  },
  server: {
    host: 'localhost',
    cors: true,
    open: true,
    hmr: true,
  },

  plugins: [vue()]
})
