import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { authorityGroups } from './data';

export function AuthoritySection() {
  const primaryProofs = [
    authorityGroups.confianca.items[0],
    authorityGroups.confianca.items[1],
    authorityGroups.qualidade.items[0],
    authorityGroups.qualidade.items[1],
  ];

  const compactBenefits = [
    {
      ...authorityGroups.qualidade.items[2],
      text: 'Gravação personalizada grátis',
    },
    {
      ...authorityGroups.atendimento.items[0],
      text: 'Resposta em 24h',
    },
    {
      ...authorityGroups.atendimento.items[1],
      text: 'Produção média de 7 dias',
    },
    {
      ...authorityGroups.atendimento.items[2],
      text: 'Estojo Premium',
    },
  ];

  return (
    <Section
      tone="light"
      spacing="md"
      aria-labelledby="authority-heading"
      className="overflow-hidden"
    >
      <Container className="space-y-10 md:space-y-12">
        <SectionHeading
          align="center"
          tone="light"
          titleId="authority-heading"
          eyebrow={<Badge variant="sectionLight">Autoridade comprovada</Badge>}
          title="Credibilidade construída ao longo do tempo"
          description="Nossa reputação não é acaso: são décadas de compromisso, transparência e a aprovação de milhares de casais que escolheram confiar em nosso trabalho."
        />

        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
          {primaryProofs.map((proof) => (
            <Card
              key={proof.value}
              variant="light"
              interactive
              className="group flex min-h-40 flex-col items-center justify-center p-4 text-center hover:border-action-strong sm:p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-action-primary/30 bg-surface-subtle text-text-primary transition-colors duration-200 group-hover:border-action-strong group-hover:bg-action-strong group-hover:text-text-on-dark">
                <proof.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-4 font-heading text-xl font-semibold leading-tight text-text-primary sm:text-2xl">
                {proof.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-label text-text-secondary">
                {proof.label}
              </p>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {compactBenefits.map((benefit) => (
            <Badge
              key={benefit.text}
              variant="sectionLight"
              className="gap-2"
            >
              <benefit.icon className="h-4 w-4" aria-hidden="true" />
              {benefit.text}
            </Badge>
          ))}
        </div>
      </Container>
    </Section>
  );
}
