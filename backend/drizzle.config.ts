/// <reference types="node" />
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

if(!process.env.DATABASE_URL){
  throw new Error('DATABASE_URL is not set up in .env file')
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // Connexion directe (session pooler 5432) pour les migrations / push / pull.
    url: process.env.DATABASE_URL!,
  },
});
