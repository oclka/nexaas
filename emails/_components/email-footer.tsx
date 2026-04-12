import { Hr, Text } from '@react-email/components';

interface Properties {
  note?: string;
}

export default function EmailFooter({
  note = 'A scalable, production-ready SaaS boilerplate built for high performance and rapid prototyping in Next.js 16.',
}: Readonly<Properties>) {
  return (
    <>
      <Hr data-testid="hr" style={hr} />

      <Text data-testid="footer" style={footer}>
        © {new Date().getFullYear()} &middot;{' '}
        <a href="https://oclka.dev" target="_blank">
          OCLKA
        </a>
        {note ? ` · ${note}` : ''}
      </Text>
    </>
  );
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '40px 0 20px',
};

const footer = {
  color: '#9ca3af',
  fontSize: '12px',
  textAlign: 'center' as const,
};
