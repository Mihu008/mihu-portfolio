import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
    modulePreload: {
      resolveDependencies(_filename, deps) {
        return deps.filter((dep) => !dep.includes('spline-vendor'));
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@splinetool')) {
            return 'spline-vendor';
          }
          if (id.includes('@emailjs')) {
            return 'emailjs';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
