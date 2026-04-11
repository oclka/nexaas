CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE "newsletter_daily_stats" (
	"date" date NOT NULL,
	"source" text NOT NULL,
	"new_subs" integer DEFAULT 0 NOT NULL,
	"unsubs" integer DEFAULT 0 NOT NULL,
	"total_active_count" integer NOT NULL,
	CONSTRAINT "newsletter_daily_stats_date_source_pk" PRIMARY KEY("date","source")
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"verified_at" timestamp,
	"token" uuid DEFAULT gen_random_uuid(),
	"token_expires_at" timestamp,
	"source" text,
	"subscribed_at" timestamp DEFAULT now() NOT NULL,
	"unsubscribed_at" timestamp,
	CONSTRAINT "newsletter_subscription_email_unique" UNIQUE("email"),
	CONSTRAINT "newsletter_subscription_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE INDEX "newsletter_subscription_email_idx" ON "newsletter_subscription" USING btree ("email");--> statement-breakpoint
CREATE INDEX "newsletter_subscription_token_idx" ON "newsletter_subscription" USING btree ("token");--> statement-breakpoint
CREATE INDEX "newsletter_subscription_status_idx" ON "newsletter_subscription" USING btree ("status");--> statement-breakpoint
CREATE INDEX "newsletter_subscription_subscribed_at_idx" ON "newsletter_subscription" USING btree ("subscribed_at");--> statement-breakpoint
CREATE INDEX "newsletter_subscription_unsubscribed_at_idx" ON "newsletter_subscription" USING btree ("unsubscribed_at");
