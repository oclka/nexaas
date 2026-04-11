import { createEnv } from '@t3-oss/env-nextjs';
import slugify from 'slugify';
import * as z from 'zod';

import { app } from '@/core/config';

export const env = createEnv({
  server: {
    // Environment
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),

    // Database
    DATABASE_URL: z.url(),
    DATABASE_POOL_MAX: z.coerce.number().int().min(1).default(10),
    DATABASE_IDLE_TIMEOUT: z.coerce.number().int().min(0).default(30),
    DATABASE_CONNECT_TIMEOUT: z.coerce.number().int().min(0).default(10),

    // Observability
    SENTRY_DSN: z.url().optional(),
    OTEL_EXPORTER_OTLP_ENDPOINT: z.url({ protocol: /^https?/ }).optional(),
    OTEL_SERVICE_NAME: z.string().optional(),
    LOKI_URL: z.url().optional(),
    LOKI_PROJECT_NAME: z
      .string()
      .default(slugify(app.name, { lower: true, strict: true })),

    // Security
    REDIS_URL: z.url().default('redis://localhost:6379'),
  },
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.url().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
});
