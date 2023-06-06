import { Nunito } from 'next/font/google';

import GraphQlProvider from '@/app/providers/GraphQlProvider';

import './globals.css';
import React from 'react';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
};

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <GraphQlProvider>{children}</GraphQlProvider>
        <Footer />
      </body>
    </html>
  );
}
