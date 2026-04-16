import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export type SeedHandler<T> = (options: T & { db: PostgresJsDatabase }) => Promise<Record<string, unknown>[]>;

/**
 * Common execution contract for all seeding tasks.
 * This is what the launch engine (launch.ts) uses.
 */
export interface ExecutableSeedTask {
  execute: (db: PostgresJsDatabase) => Promise<Record<string, unknown>[]>;
  singular: string;
  plural?: string;
}

/**
 * Domain-specific seeding task definition.
 */
export interface SeedTask<T> extends ExecutableSeedTask {
  handler: SeedHandler<T>;
  config: T;
}
