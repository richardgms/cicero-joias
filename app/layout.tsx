import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter, Jost, Marcellus, Playfair_Display } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';
import { ConditionalLayout } from './conditional-layout';

// Fontes do painel admin (tema padrão). Sem preload: o site público não as usa,
// então só são baixadas quando o admin é aberto.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
});

// Fontes do site público (.public-theme em globals.css):
// Jost = texto, Libre Caslon = títulos, Marcellus = números.
const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
});

// woff2 com subconjunto latino (mesmo recorte do Google Fonts), gerado a partir
// dos TTF variáveis oficiais (OFL) com fonttools.
const libreCaslon = localFont({
  src: [
    {
      path: './fonts/libre-caslon/LibreCaslonText-Variable.woff2',
      weight: '400 700',
      style: 'normal',
    },
    {
      path: './fonts/libre-caslon/LibreCaslonText-Italic-Variable.woff2',
      weight: '400 700',
      style: 'italic',
    },
  ],
  variable: '--font-libre-caslon',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-marcellus',
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
    icon: '/assets/logos/favicon-48.png',
    shortcut: '/assets/logos/favicon-48.png',
    apple: '/assets/logos/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Cícero Joias - Tradição que se Renova',
    description: 'Joalheria familiar com mais de 40 anos de tradição. Especializados em alianças sob encomenda, consertos e joias personalizadas.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Cícero Joias',
    images: [
      {
        url: '/assets/logos/og-image.jpg',
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
    images: ['/assets/logos/og-image.jpg'],
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
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} ${jost.variable} ${libreCaslon.variable} ${marcellus.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-[#04160f] font-inter antialiased">
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
