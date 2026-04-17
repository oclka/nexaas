import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { addDays, subMonths } from 'date-fns';

import { NewsletterInsert } from '@/domains/newsletter/db/schemas';
import { InvalidGeneratorArgumentError } from '@/scripts/generators/errors/invalid-generator-argument';

export interface GeneratorNewsletterOptions {
  subscriptions?: Partial<
    Omit<
      NewsletterInsert,
      | 'id'
      | 'email'
      | 'status'
      | 'language'
      | 'verifiedAt'
      | 'token'
      | 'tokenExpiresAt'
      | 'subscribedAt'
      | 'unsubscribedAt'
    >
  >;
  statusesDistribution?: {
    active?: number;
    pending?: number;
    unsubscribed?: number;
  };
  languageDistribution?: {
    fr?: number;
    en?: number;
  };
  fromDate?: Date;
  toDate?: Date;
}

export function generateNewsletterSubscriptions(
  count = 100,
  options: GeneratorNewsletterOptions = {},
): NewsletterInsert[] {
  const { nbActive, nbPending, nbFr, fromDate, toDate } = checkOptions(
    count,
    options,
  );

  // Générer des emails uniques
  const emails = new Set<string>();
  while (emails.size < count) {
    emails.add(faker.internet.email().toLowerCase());
  }
  const emailArray = [...emails];

  const subscriptions: NewsletterInsert[] = [];
  const baseSubscription = options.subscriptions || {};

  for (let index = 0; index < count; index++) {
    // Déterminer le statut
    let status: 'active' | 'pending' | 'unsubscribed';
    if (index < nbActive) {
      status = 'active';
    } else if (index < nbActive + nbPending) {
      status = 'pending';
    } else {
      status = 'unsubscribed';
    }

    // Déterminer la langue
    const language = index < nbFr ? 'fr' : 'en';

    // Générer les dates
    const subscribedAt = faker.date.between({ from: fromDate, to: toDate });
    const verifiedAt =
      status === 'active'
        ? faker.date.between({
            from: subscribedAt,
            to: addDays(subscribedAt, 7),
          })
        : undefined;
    const unsubscribedAt =
      status === 'unsubscribed'
        ? faker.date.between({
            from: verifiedAt || subscribedAt,
            to: toDate,
          })
        : undefined;

    subscriptions.push({
      email: emailArray[index],
      status,
      language,
      source:
        baseSubscription.source ||
        faker.helpers.arrayElement(['/', '/pricing', '/blog', '/features']),
      token: randomUUID(),
      tokenExpiresAt: addDays(subscribedAt, 1),
      subscribedAt,
      verifiedAt,
      unsubscribedAt,
      ...baseSubscription, // Override final avec les valeurs fournies
    });
  }

  // Trier par date de création (chronologique)
  return subscriptions.toSorted((a, b) => {
    const dateA = a.subscribedAt?.getTime() ?? 0;
    const dateB = b.subscribedAt?.getTime() ?? 0;
    return dateA - dateB;
  });
}

function checkOptions(count: number, options: GeneratorNewsletterOptions) {
  // ────────── COUNT ──────────
  if (count <= 0) {
    throw new InvalidGeneratorArgumentError('The count must be greater than 0');
  }

  // ────────── STATUSES ──────────
  const {
    active: activeRatio = 0.5,
    pending: pendingRatio = 0.3,
    unsubscribed: unsubscribedRatio = 0.2,
  } = options.statusesDistribution || {};

  if (activeRatio < 0 || pendingRatio < 0 || unsubscribedRatio < 0) {
    throw new InvalidGeneratorArgumentError('The ratios cannot be negative');
  }

  const totalStatusRatio = activeRatio + pendingRatio + unsubscribedRatio;
  if (totalStatusRatio > 1) {
    throw new InvalidGeneratorArgumentError(
      'The sum of statuses distribution cannot be more than 1',
    );
  }

  // ────────── LANGUAGES ──────────
  const { fr: frRatio = 0.5, en: enRatio = 0.5 } =
    options.languageDistribution || {};

  if (frRatio < 0 || enRatio < 0) {
    throw new InvalidGeneratorArgumentError('The ratios cannot be negative');
  }

  const totalLanguageRatio = frRatio + enRatio;
  if (Math.abs(totalLanguageRatio - 1) > 0.001) {
    throw new InvalidGeneratorArgumentError(
      'The sum of language distribution must equal 1',
    );
  }

  // ────────── DATES ──────────
  const today = new Date();
  const fromDate = options.fromDate || subMonths(today, 1);
  const toDate = options.toDate || today;
  if (fromDate > toDate) {
    throw new InvalidGeneratorArgumentError(
      'The fromDate must be before the toDate',
    );
  }

  // Calculer les nombres exacts (éviter les arrondis qui créent des totaux incorrects)
  const nbActive = Math.floor(count * activeRatio);
  const nbPending = Math.floor(count * pendingRatio);
  const nbUnsubscribed = count - nbActive - nbPending;

  const nbFr = Math.floor(count * frRatio);
  const nbEn = count - nbFr;

  return {
    nbActive,
    nbPending,
    nbUnsubscribed,
    nbFr,
    nbEn,
    fromDate,
    toDate,
  };
}
