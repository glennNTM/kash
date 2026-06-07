/**
 * Session utilisateur — MOCK temporaire.
 *
 * La forme du retour imite `authClient.useSession()` de Better Auth
 * (`{ data: { user }, isPending }`) pour qu'au branchement réel on remplace
 * uniquement le corps de ce fichier, sans toucher les composants consommateurs.
 */

export interface SessionUser {
  name: string
  email: string
  image?: string
}

interface SessionData {
  user: SessionUser
}

interface UseSessionResult {
  data: SessionData | null
  isPending: boolean
}

// TODO(better-auth): remplacer par authClient.useSession()
const MOCK_USER: SessionUser = {
  name: 'Glenn Ntoutoume',
  email: 'glenn.ntoutoume.dev@gmail.com',
}

export function useSession(): UseSessionResult {
  return { data: { user: MOCK_USER }, isPending: false }
}

/**
 * Déconnexion — MOCK. Better Auth fera `await authClient.signOut()`
 * puis redirigera. Ici on se contente de la redirection.
 */
export function signOut(): Promise<void> {
  // TODO(better-auth): await authClient.signOut()
  return Promise.resolve()
}
