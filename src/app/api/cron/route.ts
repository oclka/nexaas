import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@/core/observability/logger';
import { getErrorMessage } from '@/helpers';

import { runNewsletterStatsJob } from './jobs/newsletter-stats';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const JOBS = [
  { name: 'newsletter-stats', run: runNewsletterStatsJob },
] as const;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const appSecret = process.env.APP_SECRET;

  if (!appSecret) {
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 },
    );
  }

  if (authHeader !== `Bearer ${appSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = [];
  const startTime = Date.now();

  for (const job of JOBS) {
    try {
      const jobStartTime = Date.now();
      const result = await job.run();
      const duration = Date.now() - jobStartTime;

      results.push({
        job: job.name,
        success: true,
        result,
        duration,
      });

      logger.info({ job: job.name, duration }, 'Job completed successfully');
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error({ job: job.name, error, duration }, 'Job failed');

      results.push({
        job: job.name,
        success: false,
        error: getErrorMessage(error),
        duration,
      });
    }
  }

  const totalDuration = Date.now() - startTime;
  const successCount = results.filter((r) => r.success).length;
  const failureCount = results.length - successCount;

  return NextResponse.json({
    success: failureCount === 0,
    executedAt: new Date().toISOString(),
    totalDuration,
    summary: {
      total: results.length,
      success: successCount,
      failed: failureCount,
    },
    results,
  });
}
