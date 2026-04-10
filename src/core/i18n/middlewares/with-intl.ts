import createMiddleware from 'next-intl/middleware';

import { routing } from '@/core/i18n/routing';
import { CustomMiddleware } from '@/core/middlewares/types';

export const withIntl: CustomMiddleware = async (request, _event, next) => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api') || pathname.startsWith('/trpc')) {
    return next();
  }

  const handleIntl = createMiddleware(routing);
  return handleIntl(request);
};
