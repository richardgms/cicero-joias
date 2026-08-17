import Link from 'next/link';
import { Compass, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

export default function NotFound() {
  return (
    <Section tone="light" spacing="none" className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <Container size="sm">
        <Card variant="light" className="mx-auto w-full max-w-lg p-8 text-center shadow-card-hover">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-action-strong/10">
            <Compass className="h-10 w-10 text-action-strong" aria-hidden="true" />
          </div>

          <h1 className="font-heading text-3xl font-bold text-text-primary mb-4">
            Página não encontrada
          </h1>

          <p className="font-sans text-text-secondary mb-8">
            Não foi possível encontrar a página que você está procurando.
          </p>

          <Button asChild variant="secondary" className="w-full">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" aria-hidden="true" />
              Voltar ao Início
            </Link>
          </Button>
        </Card>
      </Container>
    </Section>
  );
}
