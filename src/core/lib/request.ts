import { headers } from 'next/headers';

import { supportedLocales } from '@/core/i18n/routing';

export async function getRequestSource(): Promise<{
  url: string;
  language: string;
}> {
  const headersList = await headers();
  const referer = headersList.get('referer');

  if (!referer) {
    return { url: 'unknown', language: 'unknown' };
  }
  try {
    const url = new URL(referer);
    const pathname = url.pathname;

    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];

    const locale = supportedLocales.find((l) => l.code === firstSegment);
    const language = locale ? locale.code : 'en';

    let urlWithoutLocale: string;
    if (locale && segments.length > 1) {
      urlWithoutLocale = `/${segments.slice(1).join('/')}`;
    } else if (pathname === `/${language}`) {
      urlWithoutLocale = '/';
    } else {
      urlWithoutLocale = pathname;
    }

    return {
      url: urlWithoutLocale === '' ? '/' : urlWithoutLocale,
      language,
    };
  } catch {
    return { url: 'invalid_referer', language: 'unknown' };
  }
}

export async function getBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';

  if (!host) {
    return 'http://localhost:3000';
  }

  return `${protocol}://${host}`;
}
