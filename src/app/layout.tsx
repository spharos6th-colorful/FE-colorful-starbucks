import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { ModalProvider } from '@/context/ModalContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
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
      <body className={`${inter.style} antialiased bg-gray-100`}>
        <div className='w-full max-w-3xl mx-auto h-dvh bg-white relative overflow-x-hidden overflow-y-scroll scrollbar-hidden'>
          <ModalProvider>{children}</ModalProvider>
        </div>
      </body>
    </html>
  );
}
