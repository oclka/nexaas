import '@/ui/globals.css';

import type { Metadata } from 'next';

import { app } from '@/core/config';
import { inter } from '@/ui/fonts';

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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
