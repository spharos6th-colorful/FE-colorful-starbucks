import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import ScrollToTopButton from '@/components/ui/common/ScrollToTopButton';
import AuthContextProvider from '@/provider/AuthContextProvider';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'SPHAROS 6TH Rebuilding APP',
    template: '%s | SPHAROS 6TH Rebuilding APP',
  },
  description: '1차프로젝트 SPHAROS 6TH Rebuilding',
  icons: { icon: '/assets/images/icons/icon.png' },
  metadataBase: new URL('https://spharos5th.com'),
  openGraph: {
    url: 'https://spharos6th.com',
    title: 'SPHAROS 6TH',
    description: '1차프로젝트 SPHAROS 6TH',
    images: [{ url: '/assets/images/og/og_image.png' }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  const isAuth = !!session?.user as boolean;
  return (
    <html lang='ko-KR'>
      <body className={`${inter.className} antialiased bg-gray-100`}>
        <div className='min-w-xs max-w-3xl w-full mx-auto h-dvh bg-white relative overflow-x-hidden overflow-y-scroll scrollbar-hidden'>
          <AuthContextProvider isAuth={isAuth}>
            {children}
            <ScrollToTopButton />
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
