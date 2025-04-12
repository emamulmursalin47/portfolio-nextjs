import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/Navigation';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio | Mursalin',
  description: 'Professional portfolio showcasing projects and skills'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="portfolio-theme"
        >
          <SmoothScroll>
            <Navigation />
            <main>{children}</main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}