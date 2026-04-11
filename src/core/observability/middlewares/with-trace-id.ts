import { CustomMiddleware } from '@/core/middlewares/types';

/**
 * Observability middleware.
 * Extracts the W3C traceparent (version-traceId-spanId-flags)
 * and injects the traceId into the 'x-trace-id' response header.
 *
 * Domain: Observability
 */
export const withTraceId: CustomMiddleware = async (request, _event, next) => {
  // 1. Get the response from the rest of the chain
  const response = await next();

  // 2. Perform trace extraction and response modification
  if (response?.headers) {
    const traceParent = request.headers.get('traceparent');
    const parts = traceParent?.split('-');

    // Format: version-traceId-spanId-flags
    if (parts?.length === 4) {
      const traceId = parts[1];
      response.headers.set('x-trace-id', traceId);
    }
  }

  return response;
};
