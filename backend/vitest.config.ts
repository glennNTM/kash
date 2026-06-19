import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    // Découverte cantonnée au dossier de tests dédié.
    include: ['tests/**/*.test.ts'],
    // Posé AVANT l'import des modules sous test : env.ts throw sinon, et
    // securityMiddleware court-circuite Arcjet quand NODE_ENV === 'test'.
    setupFiles: ['tests/setup.ts'],
  },
})
