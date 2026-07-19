import React from 'react';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';

const metals = [
  {
    id: 'prata-990',
    name: 'Prata 990',
    description: 'Pureza elevada e brilho intenso. A escolha ideal para alianças de compromisso ou para quem prefere a elegância discreta da prata.',
    ringClass: 'from-surface-subtle via-surface-card to-text-secondary/40',
  },
  {
    id: 'ouro-16k',
    name: 'Ouro 16k',
    description: 'Uma tonalidade exclusiva, levemente mais avermelhada. Oferece excelente durabilidade e um custo-benefício surpreendente.',
    ringClass: 'from-action-on-dark/60 via-action-strong/70 to-action-primary/60',
  },
  {
    id: 'ouro-18k',
    name: 'Ouro 18k',
    description: 'O padrão clássico da alta joalheria. O equilíbrio perfeito entre pureza, valor e a cor dourada inconfundível que atravessa gerações.',
    ringClass: 'from-action-on-dark via-action-strong to-action-strong-hover',
  },
];

export function MetalOptionsSection() {
  return (
    <Section
      tone="light"
      spacing="lg"
      aria-labelledby="metal-options-heading"
      className="overflow-hidden"
    >
      <Container className="space-y-12 md:space-y-16">
        <SectionHeading
          align="center"
          tone="light"
          titleId="metal-options-heading"
          title={
            <>
              Escolha o Metal <em className="font-normal text-action-strong">Perfeito</em>
            </>
          }
          description="Trabalhamos com diferentes metais para que você encontre a aliança que melhor se adapta ao seu estilo e orçamento."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {metals.map((metal) => (
            <Card
              key={metal.id}
              variant="light"
              interactive
              className="group flex h-full flex-col items-center p-8 text-center hover:border-action-strong"
            >
              <div className="mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-surface-subtle">
                <div className={`h-32 w-32 rounded-full bg-gradient-to-br p-3 shadow-card-sm ${metal.ringClass}`}>
                  <div className="h-full w-full rounded-full border border-border-default bg-surface-card" />
                </div>
              </div>

              <h3 className="font-heading text-3xl font-semibold text-text-primary">
                {metal.name}
              </h3>
              <p className="mt-4 flex-1 leading-relaxed text-text-secondary">
                {metal.description}
              </p>
              <div
                className={`mt-8 h-1 w-16 rounded-full bg-gradient-to-r transition-[width] duration-200 group-hover:w-24 ${metal.ringClass}`}
                aria-hidden="true"
              />
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
