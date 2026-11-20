import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves a project site from /<repo>/, not from the domain
  // root. Local dev keeps base '/' so `npm run dev` still opens localhost:3000
  // as before; GITHUB_ACTIONS is set by the runner, which is what actually
  // produces the deployed build.
  base: process.env.GITHUB_ACTIONS ? '/Game4Ep/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
