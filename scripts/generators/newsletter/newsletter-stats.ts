import { faker } from '@faker-js/faker';
import { eachDayOfInterval, format, subMonths } from 'date-fns';

import { NewsletterStatsInsert } from '@/domains/newsletter/db/schemas';
import { InvalidGeneratorArgumentError } from '@/scripts/generators/errors/invalid-generator-argument';

export interface GeneratorNewsletterStatsOptions {
  stats?: Partial<
    Omit<NewsletterStatsInsert, 'date' | 'source' | 'language' | 'newSubs' | 'unsubs' | 'totalActive'>
  >;
  sources?: string[];
  languages?: string[];
  fromDate?: Date;
  toDate?: Date;
}

export function generateNewsletterStats(
  options: GeneratorNewsletterStatsOptions = {},
): NewsletterStatsInsert[] {
  const { sources, languages, fromDate, toDate } = checkOptions(options);

  const dates = eachDayOfInterval({ start: fromDate, end: toDate });
  const stats: NewsletterStatsInsert[] = [];
  const baseStats = options.stats || {};

  const cumulativeActive: Record<string, Record<string, number>> = {};

  for (const source of sources) {
    for (const language of languages) {
      cumulativeActive[source] = cumulativeActive[source] || {};
      cumulativeActive[source][language] = faker.number.int({ min: 0, max: 50 });
    }
  }

  for (const currentDate of dates) {
    for (const source of sources) {
      for (const language of languages) {
        const newSubs = faker.number.int({ min: 0, max: 20 });
        const unsubs = faker.number.int({ min: 0, max: 5 });

        cumulativeActive[source][language] += newSubs - unsubs;
        cumulativeActive[source][language] = Math.max(
          0,
          cumulativeActive[source][language],
        );

        stats.push({
          date: format(currentDate, 'yyyy-MM-dd'),
          source,
          language,
          newSubs,
          unsubs,
          totalActive: cumulativeActive[source][language],
          ...baseStats,
        });
      }
    }
  }

  return stats.toSorted((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });
}

function checkOptions(options: GeneratorNewsletterStatsOptions) {
  const sources = options.sources || ['/', '/pricing', '/blog', '/features'];
  const languages = options.languages || ['fr', 'en'];

  if (sources.length === 0) {
    throw new InvalidGeneratorArgumentError('At least one source is required');
  }

  if (languages.length === 0) {
    throw new InvalidGeneratorArgumentError('At least one language is required');
  }

  const today = new Date();
  const fromDate = options.fromDate || subMonths(today, 1);
  const toDate = options.toDate || today;

  if (fromDate > toDate) {
    throw new InvalidGeneratorArgumentError(
      'The fromDate must be before the toDate',
    );
  }

  return {
    sources,
    languages,
    fromDate,
    toDate,
  };
}
