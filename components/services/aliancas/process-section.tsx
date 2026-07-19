import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { processSteps, whatsappLinks } from './data';

export function ProcessSection() {
  return (
    <Section
      tone="light"
      spacing="lg"
      aria-labelledby="process-heading"
      className="overflow-hidden"
    >
      <Container className="space-y-12 md:space-y-16">
        <SectionHeading
          align="center"
          tone="light"
          titleId="process-heading"
          eyebrow={<Badge variant="sectionLight">Como Trabalhamos</Badge>}
          title="Do primeiro contato à entrega das alianças"
          description="Um processo pensado para sua tranquilidade: desde o primeiro contato até a entrega, cada etapa é acompanhada de perto, garantindo qualidade e beleza às suas joias."
        />

        <div className="grid gap-6 md:grid-cols-4">
          {processSteps.map((step) => (
            <Card
              key={step.title}
              variant="light"
              interactive
              className="group flex h-full gap-4 p-6 hover:border-action-strong md:flex-col"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary transition-colors duration-200 group-hover:border-action-strong group-hover:bg-action-strong group-hover:text-text-on-dark">
                <step.icon className="h-6 w-6" aria-hidden="true" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-xs font-bold uppercase tracking-label text-action-strong">
                  {step.time}
                </span>
                <h3 className="mt-2 font-heading text-xl font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
            Pronto para dar o proximo passo? Podemos combinar a visita na joalheria ou seguir à distancia com o mesmo cuidado artesanal.
          </p>
          <Button asChild variant="gold" size="lg" className="group">
            <a
              href={whatsappLinks}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com especialista
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
