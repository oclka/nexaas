import { Heading, Img, Section, Text } from '@react-email/components';

interface Properties {
  title: string;
}

export default function EmailHeader({ title }: Readonly<Properties>) {
  return (
    <>
      <Section data-testid="logo-section" style={logoSection}>
        <Img
          data-testid="logo-img"
          src="https://oclka.dev/images/oclka_logo.svg"
          width="60"
          height="60"
          alt="Logo"
          style={logo}
        />
        <Text data-testid="logo-text" style={logoText}>
          nexaas
        </Text>
      </Section>

      <Heading data-testid="h1" style={h1}>
        {title}
      </Heading>
    </>
  );
}

const logoSection = {
  paddingBottom: '20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto 20px auto',
};

const logoText = {
  fontSize: '24px',
  color: '#2563eb', // Bleu vibrant Nexaas
  margin: '0',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#111827',
  fontSize: '24px',
  fontWeight: '700',
  textAlign: 'center' as const,
  margin: '30px 0',
};
