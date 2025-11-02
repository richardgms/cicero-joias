import React from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// Priority 1: Critical rendering path - Above the fold (immediate load)
import { HeroSection } from '@/components/home/hero-section';
import { ServicesGridSection } from '@/components/home/services-grid-section';

// Priority 2: Below fold - Viewport threshold (lazy load with high priority)
const PortfolioPreviewSection = dynamic(
  () => import('@/components/home/portfolio-preview-section').then(mod => mod.PortfolioPreviewSection),
  { ssr: true, loading: () => <div className="min-h-[600px]" /> }
);

const TestimonialsSection = dynamic(
  () => import('@/components/home/testimonials-section').then(mod => mod.TestimonialsSection),
  { ssr: true, loading: () => <div className="min-h-[500px]" /> }
);

const FinalCTASection = dynamic(
  () => import('@/components/home/final-cta-section').then(mod => mod.FinalCTASection),
  { ssr: true, loading: () => <div className="min-h-[300px]" /> }
);

export const metadata: Metadata = {
  title: 'Cicero Joias - Joalheria Completa com 40 Anos de Tradição | João Pessoa',
  description: 'Joalheria completa em João Pessoa: alianças personalizadas, banho de ouro profissional, consertos especializados e joias sob medida. 40 anos de experiência e expertise artesanal.',
  keywords: ['joalheria joão pessoa', 'alianças personalizadas', 'banho de ouro', 'consertos de joias', 'joias sob medida', 'ourives especializado'],
  openGraph: {
    title: 'Cicero Joias - Joalheria Completa com 40 Anos de Tradição',
    description: 'Da criação ao cuidado das suas joias: alianças personalizadas, banho de ouro, consertos e muito mais. Tradição e qualidade há 40 anos.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Cicero Joias',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cicero Joias - Joalheria Completa',
    description: 'Alianças personalizadas, banho de ouro e consertos especializados. 40 anos de tradição em João Pessoa.',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero - Apresentação inicial com proposta de valor */}
      <HeroSection />

      {/* 2. Services - Catálogo completo de serviços */}
      <div id="servicos">
        <ServicesGridSection />
      </div>

      {/* 3. Portfolio - Trabalhos em destaque */}
      <PortfolioPreviewSection />

      {/* 4. Testimonials - Depoimentos de clientes */}
      <TestimonialsSection />

      {/* 5. Final CTA - Chamada final para ação */}
      <FinalCTASection />
    </main>
  );
}
