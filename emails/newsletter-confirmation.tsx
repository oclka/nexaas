import { Button, Link, Section, Text } from '@react-email/components';

import EmailBody from '@/emails/_components/email-body';

interface Properties {
  url: string;
  token: string;
  locale?: string;
  labels?: {
    preview?: string;
    title?: string;
    greeting?: string;
    content?: string;
    button?: string;
    disclaimer?: string;
    footnote?: string;
  };
}

export default function NewsletterConfirmation({
  url = 'http://localhost:3000/newsletter/confirm?token=123',
  locale = 'en',
  labels = {},
}: Readonly<Properties>) {
  return (
    <EmailBody
      locale={locale}
      preview={labels.preview ?? 'Your nexaas verification code'}
      title={labels.title ?? 'Verification code'}
      footnote={
        labels.footnote ??
        'A scalable, production-ready SaaS boilerplate built for high performance and rapid prototyping in Next.js 16.'
      }
    >
      <Text data-testid="greeting" style={text}>
        {labels.greeting ?? 'Hello,'}
      </Text>
      <Text data-testid="content" style={text}>
        {labels.content ??
          'Thank you for subscribing to our newsletter! Please click the button below to confirm your subscription.'}
      </Text>

      <Section style={buttonContainer}>
        <Button data-testid="confirm-button" style={button} href={url}>
          {labels.button ?? 'Confirm my subscription'}
        </Button>
      </Section>

      <Text data-testid="token-info" style={fallbackText}>
        {labels.footnote ??
          'If the button above does not work, you can also copy and paste this link into your browser:'}
      </Text>

      <Section data-testid="url-box" style={urlBox}>
        <Link href={url} style={urlLink}>
          {url}
        </Link>
      </Section>

      <Text data-testid="disclaimer" style={fallbackText}>
        {labels.disclaimer ??
          "If you didn't request this subscription, you can safely ignore this email."}
      </Text>
    </EmailBody>
  );
}

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px 0',
  boxSizing: 'border-box' as const,
};

const urlBox = {
  background: '#f3f4f6',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
  textAlign: 'center' as const,
};

const urlLink = {
  color: '#2563eb',
  fontSize: '14px',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
};

const fallbackText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  marginTop: '20px',
};
