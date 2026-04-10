import '@/ui/globals.css';

import type { Metadata } from 'next';

import { ThemeProvider } from '@/app/_components/theme-provider';
import { app } from '@/core/config';
import { inter } from '@/ui/fonts';
import { cn } from '@/ui/helpers/utils';

export const metadata: Metadata = {
  title: app.name,
  description: app.description,
  icons: {
    icon: app.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn('h-full', 'antialiased', inter.variable, 'font-sans')}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
