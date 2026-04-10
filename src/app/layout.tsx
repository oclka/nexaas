import '@/ui/globals.css';

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { ThemeProvider } from '@/app/_components/theme-provider';
import { app } from '@/core/config';
import { inter } from '@/ui/fonts';
import { cn } from '@/ui/helpers/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
      className={cn(
        'h-full',
        'antialiased',
        inter.variable,
        'font-sans',
        geist.variable,
      )}
      suppressHydrationWarning
    >
      <ThemeProvider>
        <body className="flex min-h-full flex-col">{children}</body>
      </ThemeProvider>
    </html>
  );
}
