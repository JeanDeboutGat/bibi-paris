import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageLoadWrapper from '@/components/layout/PageLoadWrapper';
import { Suspense } from 'react';

// Use Playfair Display for serif font (headings)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

// Use Inter for sans-serif font (body text)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bibi Paris | Luxury Wooden Furniture',
  description:
    'Discover our collection of high-end wooden furniture, featuring handmade pieces, second-hand items, paintings, and decorative objects.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Suspense fallback={<div className="min-h-screen flex flex-col"></div>}>
          <PageLoadWrapper>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </PageLoadWrapper>
        </Suspense>
      </body>
    </html>
  );
}
