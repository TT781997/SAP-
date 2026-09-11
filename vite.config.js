import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Sem backend, sem APIs externas: build 100% estático e client-side.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
