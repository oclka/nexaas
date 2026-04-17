import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { SeedHandler, SeedTask } from '@/seed/types';

/**
 * Creates a seeding task with its specific options and
 * automatically binds its execution method.
 */
export function createSeedTask<T = Record<string, never>>(options: {
  handler: SeedHandler<T>;
  config?: T;
  singular: string;
  plural?: string;
}): SeedTask<T> {
  const { handler, config = {} as T, singular, plural } = options;

  return {
    handler,
    config,
    singular,
    plural,
    // Here we bind 'T' and 'db' together during creation,
    // avoiding parameter mismatch in 'launch.ts'.
    execute: (db: PostgresJsDatabase) => handler({ ...config, db }),
  };
}
