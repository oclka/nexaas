import { subMonths } from 'date-fns';

import { newslettersTable, newsletterStatsTable } from '@/domains/newsletter/db/schemas';
import { ExecutableSeedTask } from '@/seed/types';

import { seedNewsletterStats } from '../handlers/newsletter-stats.seed';
import { seedNewsletterSubscriptions } from '../handlers/newsletter-subscriptions.seed';
import { createSeedTask } from '../helpers/factory';

/**
 * Schema deletion order is critical due to Foreign Key constraints.
 * Rule: DELETE children before parents.
 *
 * Example: 'sessionsTable' and 'accountsTable' reference 'usersTable'.
 * Therefore, they MUST be deleted BEFORE 'usersTable'.
 */
export const schemas = [
  newslettersTable,
  newsletterStatsTable
];

/**
 * Main seeding configuration.
 * Each item in this array is a seeding task representing a domain.
 */
export const config: ExecutableSeedTask[] = [
  createSeedTask({
    handler: seedNewsletterSubscriptions,
    config: {
      nb: 600,
      fromDate: subMonths(new Date(), 6),
    },
    singular: 'newsletter subscription',
  }),
  createSeedTask({
    handler: seedNewsletterStats,
    singular: 'newsletter stat',
  }),
];

