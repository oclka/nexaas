import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '@/core/config/env';

export const client = postgres(env.DATABASE_URL, {
  max: env.DATABASE_POOL_MAX,
  idle_timeout: env.DATABASE_IDLE_TIMEOUT,
  connect_timeout: env.DATABASE_CONNECT_TIMEOUT,
});

export const db = drizzle(client); // TODO: Logger les opés en DB en mode dev
