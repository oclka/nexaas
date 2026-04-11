import { Redis } from '@upstash/redis';

import { env } from '@/core/config/env';

/**
 * Universal Redis client.
 * 
 * Automatically switches between Upstash Redis (REST) for production/serverless
 * and a fallback (which can be configured to point to local Redis) for development.
 * 
 * Note: @upstash/redis is preferred in serverless environments like Vercel
 * as it uses HTTP and doesn't suffer from connection pool exhaustion.
 */
export const redis = env.KV_REST_API_URL && env.KV_REST_API_TOKEN
  ? new Redis({
      url: env.KV_REST_API_URL,
      token: env.KV_REST_API_TOKEN,
    })
  : // Fallback for local development
    new Redis({
      url: env.REDIS_URL,
      token: 'local-dev-token',
    });

export default redis;
