import { subMonths } from 'date-fns';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { NewsletterInsert, newslettersTable } from '@/domains/newsletter/db/schemas';
import { generateNewsletterSubscriptions } from '@/scripts/generators/newsletter';
import { SeedError } from '@/seed/errors/seed-error';

interface SeedNewsletterSubscriptionsOptions {
  nb: number;
  fromDate?: Date;
}

export async function seedNewsletterSubscriptions({
  db,
  nb,
  fromDate = subMonths(new Date(), 6),
}: SeedNewsletterSubscriptionsOptions & { db: PostgresJsDatabase }): Promise<NewsletterInsert[]> {
  const subscriptions = generateNewsletterSubscriptions(nb, { fromDate });

  try {
    const res = await db.insert(newslettersTable).values(subscriptions).returning();

    return res;
  } catch (error) {
    throw new SeedError('Failed to seed newsletter subscriptions.', { cause: error });
  }
}
