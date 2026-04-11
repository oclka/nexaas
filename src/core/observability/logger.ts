import { context, trace } from '@opentelemetry/api';
import pino from 'pino';

import { env } from '@/core/config/env';

const getTransport = () => {
  const targets = [];

  // Console output (pretty in dev, raw in prod via standard stdout)
  if (env.NODE_ENV !== 'production') {
    targets.push({
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    });
  }

  // Loki persistent logging
  if (env.LOKI_URL) {
    targets.push({
      target: 'pino-loki',
      options: {
        batching: true,
        interval: 5, // Send logs every 5 seconds
        host: env.LOKI_URL,
        labels: { 
          project: env.LOKI_PROJECT_NAME,
          env: env.NODE_ENV
        },
      },
    });
  }

  return targets.length > 0 ? { targets } : undefined;
};

export const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',

  browser: {
    asObject: true,
  },

  mixin() {
    const span = trace.getSpan(context.active());
    if (!span) return {};
    const { traceId, spanId } = span.spanContext();
    return { trace_id: traceId, span_id: spanId };
  },

  transport: getTransport(),

  base: {
    env: env.NODE_ENV,
    service: env.OTEL_SERVICE_NAME || 'nexaas',
  },
});

export type Logger = typeof logger;
