import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema/index.js'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error("DATABASE_URL manquante dans les variables d'environnement")
}

// `prepare: false` est obligatoire avec le pooler Neon en mode transaction (PgBouncer),
// qui ne supporte pas les prepared statements.
const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client, { schema })
export type DB = typeof db
