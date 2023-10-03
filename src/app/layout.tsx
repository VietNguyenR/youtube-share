import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ContextStore from '@/components/context/ContextStore';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { TopHeader } from '@/components/TopHeader';

import Provider from '../components/context/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Youtube Sharing App',
  description: 'Example project for interview',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <ContextStore>
            <GlobalStyles
              styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
            />
            <CssBaseline />
            <TopHeader />
            <Hero />
            {children}
            <Footer />
          </ContextStore>
        </Provider>
      </body>
    </html>
  );
}
