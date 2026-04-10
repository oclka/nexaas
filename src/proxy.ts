import { withIntl } from '@/core/i18n/middlewares/with-intl';
import { chain } from '@/core/middlewares/chain';
import { CustomMiddleware } from '@/core/middlewares/types';

const proxies: CustomMiddleware[] = [withIntl];

export const proxy = chain(proxies);

export default proxy;

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!_next|_vercel|.*\\..*).*)',
    // Always run for API and tRPC routes (for trace ID, skip i18n inside middleware)
    '/(api|trpc)(.*)',
  ],
};
