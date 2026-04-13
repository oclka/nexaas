import { headers } from 'next/headers';

export async function getRequestSource(): Promise<string> {
  const headersList = await headers();
  const referer = headersList.get('referer');

  if (!referer) {
    return 'unknown';
  }
  try {
    const url = new URL(referer);
    return url.pathname === '/' ? 'homepage' : url.pathname;
  } catch {
    return 'invalid_referer';
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
