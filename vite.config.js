import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Vite bakes every env var matching this prefix into the client bundle.
  // Vercel, with "Automatically expose System Environment Variables" on,
  // creates VITE_-prefixed copies of all of its system variables, so the
  // default "VITE_" prefix shipped the full git commit message, the project
  // and deployment ids, the repo owner and the commit author to every
  // visitor (~2.3 KB of the bundle). Narrowing the prefix makes that
  // impossible regardless of the dashboard setting.
  //
  // Consequence: a new browser-visible variable has to be named
  // VITE_WEB3FORMS_* or added to this list. Anything secret belongs on a
  // server, never here.
  envPrefix: ['VITE_WEB3FORMS_'],

  server: {
    // Some setups (sync folders, certain FS setups) miss file events; polling fixes HMR.
    watch: { usePolling: true },
    strictPort: true,
    port: 5173,
  },
})
