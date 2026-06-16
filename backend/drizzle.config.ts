/// <reference types="node" />
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

// Endpoint direct Neon (sans `-pooler`) pour les migrations / push / pull.
// Fallback sur DATABASE_URL pour le dev local (où les deux pointent sur le même Postgres).
const migrationUrl = process.env.DIRECT_URL || process.env.DATABASE_URL
if (!migrationUrl) {
  throw new Error('DIRECT_URL (ou DATABASE_URL) is not set up in .env file')
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: migrationUrl,
  },
})
