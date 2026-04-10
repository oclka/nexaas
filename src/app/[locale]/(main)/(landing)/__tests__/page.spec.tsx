import { render, screen } from '@testing-library/react';
import { getTranslations } from 'next-intl/server';

import LandingPage, {
  generateMetadata,
} from '@/app/[locale]/(main)/(landing)/page';
import { app } from '@/core/config';

describe('LandingPage', () => {
  it('renders', async () => {
    const LandingPageResolved = await LandingPage({
      params: Promise.resolve({ locale: 'en' }),
    });

    render(LandingPageResolved);

    expect(getTranslations).toHaveBeenCalledWith({
      locale: 'en',
      namespace: 'pages.landing',
    });
    expect(
      screen.getByRole('heading', { name: 'pages.landing.title' }),
    ).toBeInTheDocument();
  });
});

describe('generateMetadata', () => {
  it('should return correct metadata and call translations with locale', async () => {
    const parameters = Promise.resolve({ locale: 'en' });

    const metadata = await generateMetadata({ params: parameters });

    expect(getTranslations).toHaveBeenCalledWith({ locale: 'en' });
    expect(metadata).toEqual({
      title: `default.pages.landing.title | ${app.name} | default.meta.baseline`,
      description: 'default.meta.description',
      keywords: 'default.meta.keywords',
    });
  });
});
