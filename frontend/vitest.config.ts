import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Config Vitest séparée du build Vite : on ne charge ici que ce qui sert aux tests.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // Découverte cantonnée au dossier de tests dédié.
    include: ['tests/**/*.test.{ts,tsx}'],
    setupFiles: ['./tests/setup.ts'],
  },
})
