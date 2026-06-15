import { createAuthClient } from 'better-auth/react'

// URL de l'API backend (jamais la base directement — cf. archi sécurité).
// Surchargeable via VITE_API_URL ; fallback sur le backend local.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export const authClient = createAuthClient({
  baseURL: API_URL,
})

export const { signIn, signUp, signOut, useSession } = authClient
