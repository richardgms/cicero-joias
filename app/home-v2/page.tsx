import React from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { LoadingScreen } from '@/components/ui/loading-screen';

// Above the fold — carregamento imediato
import { HeroSectionV2 } from '@/components/home/v2/hero-section-v2';
import { TrustFlowSectionV2 } from '@/components/home/v2/trust-flow-section-v2';
import { ServicesGridSectionV2 } from '@/components/home/v2/services-grid-section-v2';
import { CustomRingsSectionV2 } from '@/components/home/v2/custom-rings-section-v2';

// Below the fold — lazy load (mesmo padrão da home v1)
const PortfolioPreviewSectionV2 = dynamic(
  () => import('@/components/home/v2/portfolio-preview-section-v2').then(mod => mod.PortfolioPreviewSectionV2),
  { ssr: true, loading: () => <div className="min-h-[600px] flex items-center justify-center"><LoadingScreen variant="inline" message="Carregando portfólio..." /></div> }
);

const TestimonialsSectionV2 = dynamic(
  () => import('@/components/home/v2/testimonials-section-v2').then(mod => mod.TestimonialsSectionV2),
  { ssr: true, loading: () => <div className="min-h-[500px] flex items-center justify-center"><LoadingScreen variant="inline" message="Carregando depoimentos..." /></div> }
);

const FinalCTASectionV2 = dynamic(
  () => import('@/components/home/v2/final-cta-section-v2').then(mod => mod.FinalCTASectionV2),
  { ssr: true, loading: () => <div className="min-h-[300px] flex items-center justify-center"><LoadingScreen variant="inline" message="Carregando..." /></div> }
);

export const metadata: Metadata = {
  title: 'Cícero Joias v2 - Nova Home (Preview)',
  description: 'Preview da nova versão da página inicial da Cícero Joias - Design refinado com esmeralda e ouro.',
  // Página de preview: não deve ser indexada junto com a home real
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function HomeV2Page() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero - Nova versão com design esmeralda/ouro */}
      <section id="hero-v2">
        <HeroSectionV2 />
      </section>

      {/* 2. Trust Flow - Processo de atendimento em 4 passos */}
      <section id="trust-flow-v2">
        <TrustFlowSectionV2 />
      </section>

      {/* 3. Services - Grid de serviços com novo design */}
      <section id="servicos-v2">
        <ServicesGridSectionV2 />
      </section>

      {/* 4. Custom Rings - Diferenciais das alianças sob medida */}
      <section id="aliancas-v2">
        <CustomRingsSectionV2 />
      </section>

      {/* 5. Portfolio - Preview do portfólio */}
      <section id="portfolio-v2">
        <PortfolioPreviewSectionV2 />
      </section>

      {/* 6. Testimonials - Depoimentos com novo design */}
      <section id="depoimentos-v2">
        <TestimonialsSectionV2 />
      </section>

      {/* 7. Final CTA - Chamada final para ação */}
      <section id="contato-v2">
        <FinalCTASectionV2 />
      </section>
    </main>
  );
}
