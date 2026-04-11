import * as Sentry from '@sentry/nextjs';
import slugify from 'slugify';

import { app } from '@/core/config';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');

    // Initialize OpenTelemetry for Node.js runtime
    if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
      const { NodeSDK } = await import('@opentelemetry/sdk-node');
      const { OTLPTraceExporter } =
        await import('@opentelemetry/exporter-trace-otlp-http');
      const { resourceFromAttributes } =
        await import('@opentelemetry/resources');
      const { getNodeAutoInstrumentations } =
        await import('@opentelemetry/auto-instrumentations-node');
      const { logger } = await import('@/core/observability/logger');

      const sdk = new NodeSDK({
        resource: resourceFromAttributes({
          'service.name':
            process.env.OTEL_SERVICE_NAME ||
            slugify(app.name, { lower: true, strict: true }),
          'deployment.environment': process.env.NODE_ENV || 'development',
        }),
        traceExporter: new OTLPTraceExporter({
          url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
        }),
        instrumentations: [
          getNodeAutoInstrumentations({
            // Disable noisy or unnecessary instrumentations if needed
            '@opentelemetry/instrumentation-fs': { enabled: false },
          }),
        ],
      });

      sdk.start();

      // Graceful shutdown
      process.on('SIGTERM', () => {
        sdk
          .shutdown()
          .then(() => logger.info('Tracing terminated'))
          .catch((error) =>
            logger.error({ error }, 'Error terminating tracing'),
          );
      });
    }
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
