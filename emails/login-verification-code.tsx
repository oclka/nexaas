import { Section, Text } from '@react-email/components';

import EmailBody from '@/emails/_components/email-body';

interface Properties {
  code: string;
  locale?: string;
  labels?: {
    preview?: string;
    title?: string;
    greeting?: string;
    content?: string;
    disclaimer?: string;
    footnote?: string;
  };
}

export default function LoginVerificationCode({
  code = '000000',
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
        {labels.greeting ?? 'Hello Bob,'}
      </Text>
      <Text data-testid="content" style={text}>
        {labels.content ??
          'Use the verification code below to complete your connection to your nexaas account.'}
      </Text>

      <Section data-testid="code-box" style={codeBox}>
        <Text data-testid="otp-code" style={otpCode}>
          {code}
        </Text>
      </Section>

      <Text data-testid="disclaimer" style={fallbackText}>
        {labels.disclaimer ??
          "Your verification code is valid for 1 day. If you didn't request this code, you can safely ignore this email."}
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

const codeBox = {
  background: '#f3f4f6',
  borderRadius: '8px',
  padding: '16px 0',
  margin: '32px 0',
  textAlign: 'center' as const,
};

const otpCode = {
  color: '#111827',
  fontSize: '36px',
  fontWeight: 'bold',
  letterSpacing: '8px',
  margin: '0',
};

const fallbackText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  marginTop: '20px',
};
