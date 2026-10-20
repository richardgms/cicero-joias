import Link from 'next/link';
import { ArrowLeft, Home, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

// Mapeamento de páginas para títulos amigáveis
const pageNames: Record<string, string> = {
  'pronta-entrega': 'Pronta Entrega',
  'portfolio': 'Portfólio',
  'sobre': 'Sobre Nós',

};

export default async function AcessoNegadoPage({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams;
  const pageSlug = params.page;
  const pageName = pageSlug ? pageNames[pageSlug] || pageSlug : null;

  return (
    <Section tone="light" spacing="none" className="flex min-h-screen items-center justify-center">
      <Container size="sm">
        <Card variant="light" className="mx-auto w-full max-w-lg p-8 text-center shadow-card-hover">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-action-strong/10">
            <Eye className="h-10 w-10 text-action-strong" aria-hidden="true" />
          </div>

          <h1 className="font-heading text-3xl font-bold text-text-primary mb-4">
            Página Temporariamente Indisponível
          </h1>

          <div className="font-sans text-text-secondary mb-6 space-y-3">
            <p>
              {pageName ? (
                <>A página <strong className="text-action-strong">{pageName}</strong> está</>
              ) : (
                'Esta página está'
              )}{' '}
              temporariamente indisponível enquanto fazemos melhorias.
            </p>
            <div className="flex items-center justify-center gap-2 rounded-lg bg-action-strong/10 p-3 text-sm text-action-strong">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Em breve esta seção estará disponível com novidades incríveis!
            </div>
          </div>

          <div className="space-y-3">
            <Button asChild variant="secondary" className="w-full">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" aria-hidden="true" />
                Voltar ao Início
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/portfolio">
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                Ver Nosso Portfólio
              </Link>
            </Button>
          </div>

          <div className="mt-8 border-t border-border-default pt-6">
            <p className="font-sans text-sm text-text-secondary">
              Quer saber quando estará disponível?{' '}
              <a
                href="https://wa.me/5583991180251?text=Olá! Gostaria de saber quando a página estará disponível."
                className="font-medium text-action-strong hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Entre em contato
              </a>
            </p>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
