import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, //  exposes to network
    port: 3000, //  override default 5173
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'build',
  },
})
