import 'dotenv/config';
import { sql } from 'drizzle-orm';
import { db } from './index.js';

const result = await db.execute(sql`SELECT current_database(), current_user, version()`);
console.log('✅ Connecté à Supabase');
console.log(result[0]);
process.exit(0);
