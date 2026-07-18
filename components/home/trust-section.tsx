'use client';

import { heroStats } from './home-data';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import CountUp from '@/components/ui/count-up';

export function TrustSection() {
  return (
    <section
      className="border-y border-border-subtle bg-surface-page py-8 sm:py-10"
      aria-labelledby="home-trust-title"
    >
      <Container size="lg">
        <h2 id="home-trust-title" className="sr-only">
          A confiança construída pela Cícero Joias
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {heroStats.map((stat, index) => (
            <Card
              key={stat.label}
              variant="light"
              className="border-border-default bg-surface-card text-center shadow-card"
            >
              <CardContent className="p-5 sm:p-6">
                <p className="font-numeric text-4xl text-text-primary">
                  <CountUp
                    to={stat.number}
                    duration={2.5}
                    delay={0.2 + index * 0.1}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-label text-text-primary">
                  {stat.label}
                </p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
