import type { Metadata } from "next";
import "@/ui/globals.css";
import { inter } from "@/ui/fonts";
import { app } from "@/core/config";

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
