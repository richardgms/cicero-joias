import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Jost, Philosopher, Montserrat } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';
import { ConditionalLayout } from './conditional-layout';

// Fonte sans-serif para corpo de texto
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

// Fonte serifada para títulos (h1, h2, h3)
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

// Fonte Jost para Hero Section
const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
});

// Fonte Philosopher para títulos principais e textos importantes
const philosopher = Philosopher({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-philosopher',
  display: 'swap',
});

// Fonte Montserrat para parágrafos e textos menores
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://cicerojoias.com' : 'http://localhost:3000'),
  title: 'Cícero Joias - Tradição que se Renova',
  description: 'Joalheria familiar com mais de 40 anos de tradição. Especializados em alianças sob encomenda, consertos e joias personalizadas.',
  keywords: 'joalheria, alianças, consertos, joias personalizadas, banho de ouro, anel de formatura, portfólio',
  authors: [{ name: 'Cícero Joias' }],
  creator: 'Cícero Joias',
  icons: {
    icon: '/assets/logos/circle-monogram.webp',
    shortcut: '/assets/logos/circle-monogram.webp',
    apple: '/assets/logos/circle-monogram.webp',
  },
  openGraph: {
    title: 'Cícero Joias - Tradição que se Renova',
    description: 'Joalheria familiar com mais de 40 anos de tradição. Especializados em alianças sob encomenda, consertos e joias personalizadas.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Cícero Joias',
    images: [
      {
        url: '/assets/logos/circle-monogram.webp',
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
    images: ['/assets/logos/circle-monogram.webp'],
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
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} ${jost.variable} ${philosopher.variable} ${montserrat.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-[#04160f] font-inter antialiased">
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
