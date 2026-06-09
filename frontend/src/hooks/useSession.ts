/**
 * Session utilisateur — branchée sur Better Auth.
 *
 * Ré-exporte `useSession` et `signOut` du client auth pour que les composants
 * consommateurs (DashboardLayout, Profil) gardent le même import qu'avant.
 * `useSession()` renvoie `{ data: { user, session } | null, isPending, ... }`.
 */
export { useSession, signOut } from '../lib/auth-client'
