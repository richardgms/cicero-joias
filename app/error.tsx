'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section tone="light" spacing="none" className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <Container size="sm">
        <Card variant="light" className="mx-auto w-full max-w-lg p-8 text-center shadow-card-hover">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-error/10">
            <AlertTriangle className="h-10 w-10 text-error" aria-hidden="true" />
          </div>

          <h1 className="font-heading text-3xl font-bold text-text-primary mb-4">
            Algo deu errado!
          </h1>

          <p className="font-sans text-text-secondary mb-8">
            Ocorreu um erro inesperado. Tente novamente ou volte mais tarde.
          </p>

          <Button variant="secondary" className="w-full" onClick={() => reset()}>
            <RotateCw className="h-4 w-4 mr-2" aria-hidden="true" />
            Tentar novamente
          </Button>
        </Card>
      </Container>
    </Section>
  );
}
