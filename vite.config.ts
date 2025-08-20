import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Agenda/', // 👈 importante!
    server: {
    allowedHosts: ['andreailtondev.tech'], // libera seu domínio
    host: true, // aceita conexões externas
    port: 5174, // porta do dev server
  },
})
