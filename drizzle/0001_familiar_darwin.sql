ALTER TABLE "newsletter_daily_stats" DROP CONSTRAINT "newsletter_daily_stats_date_source_pk";--> statement-breakpoint
ALTER TABLE "newsletter_daily_stats" ADD CONSTRAINT "newsletter_daily_stats_date_source_language_pk" PRIMARY KEY("date","source","language");--> statement-breakpoint
ALTER TABLE "newsletter_daily_stats" ADD COLUMN "language" varchar(3) NOT NULL;--> statement-breakpoint
ALTER TABLE "newsletter_subscription" ADD COLUMN "language" varchar(3) DEFAULT 'en';