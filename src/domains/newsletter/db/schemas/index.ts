import {
  date,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// ─── NEWSLETTER ──────────────────────────────────────────────────────────────

// ─── Tables ──────────────────────────────────────────────────────────────────
// ─── Subscriptions ───
export const newslettersTable = pgTable(
  'newsletter_subscription',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    email: text('email').notNull().unique(),
    status: text('status', { enum: ['pending', 'active', 'unsubscribed'] })
      .default('pending')
      .notNull(),
    verifiedAt: timestamp('verified_at'),
    token: uuid('token').defaultRandom().unique(),
    tokenExpiresAt: timestamp('token_expires_at'),
    source: text('source'),
    language: varchar('language', { length: 3 }).default('en'),

    subscribedAt: timestamp('subscribed_at').defaultNow().notNull(),
    unsubscribedAt: timestamp('unsubscribed_at'),
  },
  (table) => [
    index('newsletter_subscription_email_idx').on(table.email),
    index('newsletter_subscription_token_idx').on(table.token),
    index('newsletter_subscription_status_idx').on(table.status),
    index('newsletter_subscription_subscribed_at_idx').on(table.subscribedAt),
    index('newsletter_subscription_unsubscribed_at_idx').on(
      table.unsubscribedAt,
    ),
  ],
);

// ─── Stats ───
export const newsletterStatsTable = pgTable(
  'newsletter_daily_stats',
  {
    date: date('date').notNull(),
    source: text('source').notNull(),
    language: varchar('language', { length: 3 }).notNull(),

    newSubs: integer('new_subs').default(0).notNull(),
    unsubs: integer('unsubs').default(0).notNull(),
    totalActive: integer('total_active_count').notNull(),
  },
  (table) => [primaryKey({ columns: [table.date, table.source, table.language] })],
);

// ─── Types ───────────────────────────────────────────────────────────────────
export type Newsletter = typeof newslettersTable.$inferSelect;
export type NewsletterInsert = typeof newslettersTable.$inferInsert;
export type NewsletterStats = typeof newsletterStatsTable.$inferSelect;
export type NewsletterStatsInsert = typeof newsletterStatsTable.$inferInsert;

// ─── Schemas ─────────────────────────────────────────────────────────────────
export const newsletterSchema = createSelectSchema(newslettersTable);
export const newsletterInsertSchema = createInsertSchema(newslettersTable);
export const newsletterStatsSchema = createSelectSchema(newsletterStatsTable);
export const newsletterStatsInsertSchema =
  createInsertSchema(newsletterStatsTable);
