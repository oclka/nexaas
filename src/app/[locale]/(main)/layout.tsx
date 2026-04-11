import { ReactNode } from 'react';

import Navbar from '@/app/[locale]/(main)/_components/navbar';

interface Properties {
  children: ReactNode;
}

export default async function MainLayout({ children }: Readonly<Properties>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-5xl px-6">{children}</div>
      </main>
    </div>
  );
}
