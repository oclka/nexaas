import { ReactNode } from 'react';

import { app } from '@/core/config';
import LocaleSwitcher from '@/core/i18n/components/locale-switcher';
import ThemeToggle from '@/ui/components/theme-toggle';

interface Properties {
  children: ReactNode;
}

export default async function MainLayout({ children }: Readonly<Properties>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-semibold">{app.name}</span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LocaleSwitcher />
        </div>
      </div>
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-5xl px-6">{children}</div>
      </main>
    </div>
  );
}
