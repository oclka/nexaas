import '@/ui/globals.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

import { ThemeProvider } from '@/app/[locale]/_components/theme-provider';
import { app } from '@/core/config';
import { routing } from '@/core/i18n/routing';
import { inter } from '@/ui/fonts';
import { cn } from '@/ui/helpers/utils';

export const dynamic = 'force-static';
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: `${app.name} | ${t('baseline')}`,
    description: t('description'),
    keywords: t('keywords'),
    icons: {
      icon: app.logo,
    },
  };
}

interface Properties {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}


export default async function RootLayout({
  children,
  params,
}: Readonly<Properties>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={cn('h-full', 'antialiased', 'font-sans', inter.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
