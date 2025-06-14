import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cícero Joias - Tradição que se Renova',
  description: 'Joalheria familiar com mais de 40 anos de tradição. Especializados em alianças sob encomenda, consertos e joias personalizadas.',
  keywords: 'joalheria, alianças, consertos, joias personalizadas, banho de ouro, anel de formatura, portfólio',
  authors: [{ name: 'Cícero Joias' }],
  creator: 'Cícero Joias',
  icons: {
    icon: '/assets/logos/circle-monogram.png',
    shortcut: '/assets/logos/circle-monogram.png',
    apple: '/assets/logos/circle-monogram.png',
  },
  openGraph: {
    title: 'Cícero Joias - Tradição que se Renova',
    description: 'Joalheria familiar com mais de 40 anos de tradição. Especializados em alianças sob encomenda, consertos e joias personalizadas.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Cícero Joias',
    images: [
      {
        url: '/assets/logos/circle-monogram.png',
        width: 800,
        height: 800,
        alt: 'Cícero Joias - Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cícero Joias - Tradição que se Renova',
    description: 'Joalheria familiar com mais de 40 anos de tradição.',
    images: ['/assets/logos/circle-monogram.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}