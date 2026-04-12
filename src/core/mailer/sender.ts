import { render } from '@react-email/render';
import type { SendMailOptions } from 'nodemailer';
import type { ReactElement } from 'react';

import { env } from '@/core/config/env';
import { getTransport } from '@/core/mailer/transport';

export interface BaseSendEmailOptions {
  to: string | string[];
  subject: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: SendMailOptions['attachments'];
  replyTo?: string;
}

export interface SendEmail extends BaseSendEmailOptions {
  content: string;
  asPlainText?: boolean;
}

export async function sendEmail({
  to,
  cc,
  bcc,
  subject,
  content,
  attachments,
  replyTo,
  asPlainText = false,
}: SendEmail): Promise<void> {
  const transport = getTransport();

  await transport.sendMail({
    from: env.MAIL_FROM,
    to,
    cc,
    bcc,
    subject,
    html: asPlainText ? undefined : content,
    text: asPlainText ? content : undefined,
    attachments,
    ...(replyTo && { replyTo }),
  });
}

export interface SendEmailOptions extends BaseSendEmailOptions {
  template: ReactElement;
  renderOptions?: {
    pretty?: boolean;
  };
}

export async function sendEmailFromTemplate({
  to,
  cc,
  bcc,
  subject,
  attachments,
  template,
  replyTo,
  renderOptions,
}: SendEmailOptions): Promise<void> {
  const html = await render(template, {
    pretty: renderOptions?.pretty,
  });
  const text = await render(template, {
    plainText: true,
  });
  const transport = getTransport();

  await transport.sendMail({
    from: env.MAIL_FROM,
    to,
    cc,
    bcc,
    subject,
    html,
    text,
    attachments,
    ...(replyTo && { replyTo }),
  });
}
