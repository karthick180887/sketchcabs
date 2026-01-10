import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Sketch Cabs | Premium One Way Drop Taxi',
  description: 'Reliable, affordable, and comfortable one-way drop taxi services. Book your ride today.',
  metadataBase: new URL('https://sketchcabs.com'),
  verification: {
    google: 'c-fBqRZ2UOACKFaKeYNf-JbV6jYO5NI679Isr63pq_w',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
