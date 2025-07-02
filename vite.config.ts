import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Para habilitar salida LAN
  server: {
    host: true, // <- Esto permite acceso desde LAN
    port: 5173, // <- Puerto por defecto
  },
})
