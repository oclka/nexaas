'use server';

import { randomUUID } from 'node:crypto';

import { addDays } from 'date-fns';
import { eq } from 'drizzle-orm';
import { ActionResult } from 'next/dist/shared/lib/app-router-types';
import z from 'zod';

import { db } from '@/core/db';
import { CoreErrors } from '@/core/errors';
import { getBaseUrl, getRequestSource } from '@/core/lib/request';
import { logger } from '@/core/observability/logger';
import { ActionResponse } from '@/core/types';
import {
  NewsletterInsert,
  newslettersTable,
} from '@/domains/newsletter/db/schemas';
import { sendNewsletterConfirmationEmail } from '@/domains/newsletter/emails';
import { NewsletterErrors } from '@/domains/newsletter/errors';

export async function subscribeToNewsletter(
  email: string,
  source?: string,
  language?: string,
): Promise<ActionResult> {
  try {
    email = email.trim().toLowerCase();
    const schema = z.object({
      email: z.email(),
    });
    const result = schema.safeParse({ email });
    if (!result.success) {
      return ActionResponse.error(NewsletterErrors.InvalidEmail);
    }

    const [existing] = await db
      .select()
      .from(newslettersTable)
      .where(eq(newslettersTable.email, email))
      .limit(1);
    if (existing?.status === 'active') {
      return ActionResponse.success();
    }

    const now = new Date();
    const token = randomUUID();
    const tokenExpiresAt = addDays(now, 1);
    const baseUrl = await getBaseUrl();
    const { url, language: locale } = await getRequestSource();

    const registration: NewsletterInsert = {
      email,
      status: 'pending',
      token,
      tokenExpiresAt,
      source: source || url,
      language: language || locale,
      subscribedAt: now,
      verifiedAt: undefined,
      unsubscribedAt: undefined,
    };

    await db
      .insert(newslettersTable)
      .values(registration)
      .onConflictDoUpdate({
        target: newslettersTable.email,
        set: {
          token,
          tokenExpiresAt,
          status: 'pending',
          source: source || url,
          language: language || locale,
          subscribedAt: now,
          unsubscribedAt: undefined,
          verifiedAt: undefined,
        },
      });

    const confirmationUrl = `${baseUrl}/newsletter/confirm?token=${token}`;
    await sendNewsletterConfirmationEmail(email, {
      url: confirmationUrl,
      token,
    });

    return ActionResponse.success();
  } catch (error) {
    console.log(error);
    logger.error({ email, err: error }, 'Failed to subscribe to newsletter');
    return ActionResponse.error(CoreErrors.ServerError);
  }
}
