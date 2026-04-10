import { getTranslations } from 'next-intl/server';

import { app } from '@/core/config';

interface Properties {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Properties) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t('pages.landing.title')} | ${app.name} | ${t('meta.baseline')}`,
    description: t('meta.description'),
    keywords: t('meta.keywords'),
  };
}

export default async function LandingPage({ params }: Properties) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.landing' });

  return (
    <div className="min-h-50">
      <h1 className="text-2xl" data-testid="title">
        {t('title')}
      </h1>
    </div>
  );
}
