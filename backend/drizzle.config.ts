import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // Connexion directe (session pooler 5432) pour les migrations / push / pull.
    url: process.env.DIRECT_URL!,
  },
});
