import { getLocale, getTranslations } from 'next-intl/server';

import { sendEmailFromTemplate } from '@/core/mailer/sender';
import NewsletterConfirmation from '@/emails/newsletter-confirmation';

interface SendNewsletterConfirmationEmailOptions {
  url: string;
  token: string;
}

export async function sendNewsletterConfirmationEmail(
  to: string,
  { url, token }: SendNewsletterConfirmationEmailOptions,
) {
  const locale = await getLocale();
  const t = await getTranslations('emails.newsletterConfirmation');

  return sendEmailFromTemplate({
    to,
    subject: t('title'),
    template: (
      <NewsletterConfirmation
        url={url}
        token={token}
        locale={locale}
        labels={{
          preview: t('preview'),
          title: t('title'),
          greeting: t('greeting'),
          content: t('content'),
          button: t('button'),
          footnote: t('footnote'),
          disclaimer: t('disclaimer'),
        }}
      />
    ),
  });
}
