import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import ScrollToTopButton from '@/components/ui/common/ScrollToTopButton';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Starbucks',
  description: 'Starbucks Rebuild Project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased bg-gray-100`}>
        <div className='min-w-xs max-w-3xl w-full mx-auto h-dvh bg-white relative overflow-x-hidden overflow-y-scroll scrollbar-hidden'>
          {children}
          <ScrollToTopButton />
        </div>
      </body>
    </html>
  );
}
