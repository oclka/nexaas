import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

import Footer from '@/app/[locale]/(main)/_components/footer/footer';
import Navbar from '@/app/[locale]/(main)/_components/navbar';

interface Properties {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function MainLayout({
  children,
  params,
}: Readonly<Properties>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-5xl px-6">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
