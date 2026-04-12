import nodemailer from 'nodemailer';

import { env } from '@/core/config/env';
import { SMTPError } from '@/core/mailer/errors/smtp.error';

/**
 * Creates and returns a Nodemailer transport instance
 * based on the SMTP_URL environment variable.
 */
export const createTransport = () => {
  if (!env.SMTP_URL) {
    throw new SMTPError('SMTP_URL is not defined in environment variables');
  }

  try {
    const url = new URL(env.SMTP_URL);

    const transport = nodemailer.createTransport({
      host: url.hostname,
      port: url.port ? Number.parseInt(url.port, 10) : undefined,
      secure: url.protocol === 'smtps:',
      auth: (url.username || url.password)
        ? {
            user: decodeURIComponent(url.username),
            pass: decodeURIComponent(url.password),
          }
        : undefined,
    });

    return transport;
  } catch (error) {
    throw new SMTPError('Failed to initialize SMTP transport', error);
  }
};

/**
 * Singleton instance of the mailer transport
 */
let transport: nodemailer.Transporter | undefined;

export const getTransport = () => {
  if (!transport) {
    transport = createTransport();
  }
  return transport;
};
