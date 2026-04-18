import 'dotenv/config';

import * as p from '@clack/prompts';
import { PgTable } from 'drizzle-orm/pg-core';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import colors from 'picocolors';

import { db } from '@/core/db';
import { getErrorMessage } from '@/helpers';
import { config, schemas } from '@/seed/config';
import { exit } from '@/seed/helpers/exit';
import { ExecutableSeedTask } from '@/seed/types';

/**
 * Main entrance.
 */
export async function main() {
  try {
    console.clear();
    p.intro(colors.bgBlue(colors.black(' nexaas seed ')));

    const shouldContinue = await p.confirm({
      message:
        'This will clean the whole database. Are you sure you want to continue?',
    });

    if (p.isCancel(shouldContinue) || !shouldContinue) {
      p.outro(`${colors.red('✖')} Seeding cancelled by user.`);
      return exit(false);
    }

    await dbClean(db, schemas);

    for (const item of config) {
      await runSeed(item);
    }

    p.outro(`${colors.green('✓')} Database populated successfully!`);
    return exit(false);
  } catch (error) {
    p.outro(`${colors.red('✖')} ${getErrorMessage(error)}`);
    return exit(true);
  }
}

async function dbClean(db: PostgresJsDatabase, schemas: PgTable[]) {
  const spinner = p.spinner();
  spinner.start('Cleaning database');

  try {
    await db.transaction(async (tx) => {
      for (const table of schemas) {
        await tx.delete(table);
      }
    });
    spinner.stop(colors.dim('Database cleaned.'));
  } catch (error) {
    spinner.stop('Failed to clean database');
    p.log.error(getErrorMessage(error));
    exit(true);
  }
}

async function runSeed(item: ExecutableSeedTask) {
  const { singular, plural: configPlural } = item;
  const plural = configPlural ?? `${singular}s`;

  const spinner = p.spinner();
  spinner.start(`Creating ${plural}...`);

  try {
    const result = await item.execute(db);
    const length = Array.isArray(result) ? result.length : 1;
    const label = `${length} ${length > 1 ? plural : singular} added`;
    spinner.stop(colors.dim(label));

    return result;
  } catch (error) {
    spinner.clear();
    p.outro(`${colors.red('✖')} ${getErrorMessage(error)}`);
    return exit(true);
  }
}

await main();
