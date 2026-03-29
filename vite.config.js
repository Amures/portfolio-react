import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Some setups (sync folders, certain FS setups) miss file events; polling fixes HMR.
    watch: { usePolling: true },
    strictPort: true,
    port: 5173,
  },
})
