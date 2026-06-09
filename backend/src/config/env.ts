import 'dotenv/config';

// Variables d'environnement exposées à l'app au runtime.
// DIRECT_URL est exclue : elle n'est lue que par drizzle-kit via drizzle.config.ts.
const {
  NODE_ENV = 'development',
  PORT = '8000',
  DATABASE_URL,
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  ARCJET_KEY,
  FRONTEND_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;

if (!DATABASE_URL) throw new Error('DATABASE_URL manquante');
if (!BETTER_AUTH_SECRET) throw new Error('BETTER_AUTH_SECRET manquante');
if (!BETTER_AUTH_URL) throw new Error('BETTER_AUTH_URL manquante');
if (!FRONTEND_URL) throw new Error('FRONTEND_URL manquante');

export const env = {
  NODE_ENV,
  PORT: Number(PORT),
  DATABASE_URL,
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  ARCJET_KEY: ARCJET_KEY ?? '',
  FRONTEND_URL,
  // Optionnels : si absents, le provider Google n'est pas activé (cf. lib/auth.ts).
  GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID ?? '',
  GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET ?? '',
} as const;
