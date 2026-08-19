import React from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { LoadingScreen } from '@/components/ui/loading-screen';

// Priority 1: Critical rendering path - Above the fold (immediate load)
import { HeroSection } from '@/components/home/hero-section';
import { TrustSection } from '@/components/home/trust-section';
import { ServicesGridSection } from '@/components/home/services-grid-section';
import { AlliancesSection } from '@/components/home/alliances-section';

// Priority 2: Below fold - Viewport threshold (lazy load with high priority)
const PortfolioPreviewSection = dynamic(
  () => import('@/components/home/portfolio-preview-section').then(mod => mod.PortfolioPreviewSection),
  { ssr: true, loading: () => <div className="flex min-h-96 items-center justify-center bg-surface-dark text-text-on-dark"><LoadingScreen variant="inline" message="Carregando portfólio..." /></div> }
);

const TestimonialsSection = dynamic(
  () => import('@/components/home/testimonials-section').then(mod => mod.TestimonialsSection),
  { ssr: true, loading: () => <div className="flex min-h-96 items-center justify-center bg-surface-page text-text-body"><LoadingScreen variant="inline" message="Carregando depoimentos..." /></div> }
);

const FinalCTASection = dynamic(
  () => import('@/components/home/final-cta-section').then(mod => mod.FinalCTASection),
  { ssr: true, loading: () => <div className="flex min-h-80 items-center justify-center bg-surface-dark text-text-on-dark"><LoadingScreen variant="inline" message="Carregando..." /></div> }
);

export const metadata: Metadata = {
  title: 'Cicero Joias - Joalheria Completa com 40 Anos de Tradição | João Pessoa',
  description: 'Joalheria completa atendendo João Pessoa e região: alianças personalizadas, banho de ouro profissional, consertos especializados e joias sob medida. 40 anos de experiência e expertise artesanal.',
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
    description: 'Alianças personalizadas, banho de ouro e consertos especializados. 40 anos de tradição, atendendo João Pessoa e região.',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero - Apresentação inicial com proposta de valor */}
      <div id="hero">
        <HeroSection />
      </div>

      {/* 2. Trust - Indicadores de experiência e autoridade */}
      <div id="confianca" className="scroll-mt-20">
        <TrustSection />
      </div>

      {/* 3. Services - Catálogo completo de serviços */}
      <div id="servicos" className="scroll-mt-20">
        <ServicesGridSection />
      </div>

      {/* 4. Alliances - Especialidade em alianças sob medida */}
      <div id="aliancas" className="scroll-mt-20">
        <AlliancesSection />
      </div>

      {/* 5. Portfolio - Trabalhos em destaque */}
      <div id="portfolio" className="scroll-mt-20">
        <PortfolioPreviewSection appearance="home-dark" />
      </div>

      {/* 6. Testimonials - Depoimentos de clientes */}
      <div id="depoimentos" className="scroll-mt-20">
        <TestimonialsSection />
      </div>

      {/* 7. Final CTA - Chamada final para ação */}
      <div id="contato" className="scroll-mt-20">
        <FinalCTASection appearance="home-dark" />
      </div>
    </main>
  );
}
