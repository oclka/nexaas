import { subMonths } from 'date-fns';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { NewsletterStatsInsert, newsletterStatsTable } from '@/domains/newsletter/db/schemas';
import { generateNewsletterStats } from '@/scripts/generators/newsletter/newsletter-stats';
import { SeedError } from '@/seed/errors/seed-error';

interface SeedNewsletterStatsOptions {
  fromDate?: Date;
  toDate?: Date;
  sources?: string[];
  languages?: string[];
}

export async function seedNewsletterStats({
  db,
  fromDate = subMonths(new Date(), 6),
  toDate,
  sources,
  languages,
}: SeedNewsletterStatsOptions & { db: PostgresJsDatabase }): Promise<NewsletterStatsInsert[]> {
  const stats = generateNewsletterStats({ fromDate, toDate, sources, languages });

  try {
    const res = await db.insert(newsletterStatsTable).values(stats).returning();

    return res;
  } catch (error) {
    throw new SeedError('Failed to seed newsletter stats.', { cause: error });
  }
}
