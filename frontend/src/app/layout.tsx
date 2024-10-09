import type { Metadata } from "next";
import "../styles/globals.css";
import { inter, roboto_mono } from '@/styles/fonts'
import { Providers } from './providers'


export const metadata: Metadata = {
  title: "Friends App",
  description: "Application de rencontres amicales pour créer et rejoindre des événements à Montréal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${roboto_mono.variable} antialiased`}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
