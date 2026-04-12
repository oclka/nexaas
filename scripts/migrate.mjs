import 'dotenv/config';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL is not defined');
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }

  console.log('⏳ Running migrations...');

  const sql = postgres(databaseUrl, { max: 1 });
  const db = drizzle(sql);

  try {
    // Path to your migrations folder (relative to this script in Docker)
    await migrate(db, {
      migrationsFolder: path.join(__dirname, '../drizzle'),
    });
    console.log('✅ Migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  } finally {
    await sql.end();
  }
}

void runMigration();
