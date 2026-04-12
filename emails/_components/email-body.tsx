import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
} from '@react-email/components';
import { ReactNode } from 'react';

import EmailFooter from '@/emails/_components/email-footer';
import EmailHeader from '@/emails/_components/email-header';

interface Properties {
  children: ReactNode;
  preview: string;
  title: string;
  footnote?: string;
  locale?: string;
}

export default function EmailBody({
  children,
  preview,
  title,
  footnote,
  locale = 'en',
}: Readonly<Properties>) {
  return (
    <Html lang={locale}>
      <Head />
      <Preview data-testid="preview">{preview}</Preview>
      <Body>
        <Section data-testid="main" style={main}>
          <Container data-testid="container" style={container}>
            <EmailHeader title={title ?? 'Title'} />
            {children}
            <EmailFooter
              note={
                footnote ??
                'A scalable, production-ready SaaS boilerplate built for high performance and rapid prototyping in Next.js 16.'
              }
            />
          </Container>
        </Section>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '40px auto',
  padding: '40px 20px',
  borderRadius: '12px',
  maxWidth: '500px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
};
