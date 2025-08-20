import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Agenda/',
  server: {
    host: true, // permite acessar pelo IP ou domínio
    port: 4000, // opcional, se quiser mudar a porta
    allowedHosts: ['andreailtondev.tech'] // libera seu domínio
    // ou allowedHosts: 'all' para liberar qualquer host
  }
})
