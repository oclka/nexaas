import { and, between, eq, sql } from 'drizzle-orm';

import { db } from '@/core/db';
import { newslettersTable, newsletterStatsTable } from '@/domains/newsletter/db/schemas';

export async function runNewsletterStatsJob() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateString = yesterday.toISOString().split('T')[0];

  const distinctCombinations = await db
    .selectDistinct({
      source: newslettersTable.source,
      language: newslettersTable.language,
    })
    .from(newslettersTable)
    .where(
      and(
        sql`${newslettersTable.source} IS NOT NULL`,
        sql`${newslettersTable.language} IS NOT NULL`,
      ),
    );

  const stats = [];

  for (const { source, language } of distinctCombinations) {
    if (!source || !language) continue;

    const newSubsResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(newslettersTable)
      .where(
        and(
          eq(newslettersTable.source, source),
          eq(newslettersTable.language, language),
          between(newslettersTable.subscribedAt, yesterday, today),
        ),
      );

    const unsubsResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(newslettersTable)
      .where(
        and(
          eq(newslettersTable.source, source),
          eq(newslettersTable.language, language),
          eq(newslettersTable.status, 'unsubscribed'),
          sql`${newslettersTable.unsubscribedAt} IS NOT NULL`,
          between(newslettersTable.unsubscribedAt, yesterday, today),
        ),
      );

    const totalActiveResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(newslettersTable)
      .where(
        and(
          eq(newslettersTable.source, source),
          eq(newslettersTable.language, language),
          eq(newslettersTable.status, 'active'),
        ),
      );

    const newSubs = newSubsResult[0]?.count ?? 0;
    const unsubs = unsubsResult[0]?.count ?? 0;
    const totalActive = totalActiveResult[0]?.count ?? 0;

    await db
      .insert(newsletterStatsTable)
      .values({
        date: dateString,
        source,
        language,
        newSubs,
        unsubs,
        totalActive,
      })
      .onConflictDoUpdate({
        target: [
          newsletterStatsTable.date,
          newsletterStatsTable.source,
          newsletterStatsTable.language,
        ],
        set: {
          newSubs,
          unsubs,
          totalActive,
        },
      });

    stats.push({ date: dateString, source, language, newSubs, unsubs, totalActive });
  }

  return {
    date: dateString,
    processed: stats.length,
    stats,
  };
}
