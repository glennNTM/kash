// Étend `expect` avec les matchers DOM (toBeInTheDocument, etc.).
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// `globals` n'est pas activé → on enregistre nous-mêmes le nettoyage du DOM
// entre chaque test (sinon les rendus s'accumulent dans le même document).
afterEach(() => {
  cleanup()
})
