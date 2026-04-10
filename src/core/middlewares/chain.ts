import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { CustomMiddleware } from '@/core/middlewares/types';

export function chain(middlewares: CustomMiddleware[]) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    let index = -1;

    const dispatch = async (
      index_: number,
    ): Promise<Response | NextResponse | null | undefined> => {
      if (index_ <= index) throw new Error('next() called multiple times');
      index = index_;

      const middleware = middlewares[index_];
      if (!middleware) return NextResponse.next();

      try {
        return await middleware(request, event, () => dispatch(index_ + 1));
      } catch (error) {
        // TODO: Replace with a logger
        console.error('Middleware execution error:', error);
        throw error;
      }
    };

    return dispatch(0);
  };
}
