/**
 * Observability utilities for logging, tracing, and error tracking
 */

import * as Sentry from '@sentry/nextjs';

import { logger } from '@/core/observability/logger';

/**
 * Log an info message
 */
export function logInfo(message: string, data?: Record<string, unknown>) {
  logger.info(data, message);
}

/**
 * Log an error message
 */
export function logError(message: string, error?: unknown, data?: Record<string, unknown>) {
  logger.error({ err: error, ...data }, message);

  if (error instanceof Error) {
    Sentry.captureException(error, { extra: data });
  }
}

/**
 * Log a warning message
 */
export function logWarn(message: string, data?: Record<string, unknown>) {
  logger.warn(data, message);
}

/**
 * Log a debug message
 */
export function logDebug(message: string, data?: Record<string, unknown>) {
  logger.debug(data, message);
}

/**
 * Create a child logger with additional context
 */
export function createLogger(context: Record<string, unknown>) {
  return logger.child(context);
}

/**
 * Capture an exception in Sentry and log it
 */
export function captureException(error: Error, context?: Record<string, unknown>) {
  logError('Exception captured', error, context);
}

/**
 * Capture a message in Sentry
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  Sentry.captureMessage(message, level);

  switch (level) {
    case 'error': {
      logError(message);
      break;
    }
    case 'warning': {
      logWarn(message);
      break;
    }
    default: {
      logInfo(message);
    }
  }
}

/**
 * Set user context for Sentry
 */
export function setUser(user: { id: string; email?: string; username?: string }) {
  Sentry.setUser(user);
}

/**
 * Clear user context
 */
export function clearUser() {
  // eslint-disable-next-line unicorn/no-null
  Sentry.setUser(null);
}
