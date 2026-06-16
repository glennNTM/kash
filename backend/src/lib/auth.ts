import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../db/index.js'
import * as schema from '../db/schema/index.js'
import { env } from '../config/env.js'

// Le provider Google n'est activé que si les deux secrets sont présents,
// pour ne pas bloquer le dev email/password tant que l'OAuth n'est pas configuré.
const googleProvider =
  env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
          // Force Google à renvoyer un refresh token à chaque connexion.
          accessType: 'offline' as const,
          prompt: 'select_account consent' as const,
        },
      }
    : undefined

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  // Autorise le front (cross-origin) à initier les requêtes d'auth.
  trustedOrigins: [env.FRONTEND_URL],
  database: drizzleAdapter(db, {
    provider: 'pg',
    // Nos tables sont au pluriel (users, sessions, accounts, verifications).
    usePlural: true,
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    // Connexion automatique juste après l'inscription.
    autoSignIn: true,
  },
  account: {
    accountLinking: {
      enabled: true,
      // Google confirme l'email → on autorise le lien automatique au compte existant.
      trustedProviders: ['google'],
      // Recopie name + image du profil Google sur l'utilisateur lors du lien,
      // pour récupérer l'avatar même si le compte avait été créé en email/password.
      updateUserInfoOnLink: true,
    },
  },
  ...(googleProvider ? { socialProviders: googleProvider } : {}),
})
