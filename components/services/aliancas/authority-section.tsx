'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';
import { authorityGroups } from './data';

export function AuthoritySection() {

  return (
    <section className="relative overflow-hidden bg-white py-7 sm:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(24,68,52,0.05),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_100%,rgba(24,68,52,0.03),transparent_45%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="space-y-6 text-center" delay={0.05}>
          <span className="font-jost inline-flex items-center justify-center rounded-full border border-esmeralda/20 bg-esmeralda/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-esmeralda/80">
            Autoridade comprovada
          </span>
          <h2 className="font-philosopher text-3xl sm:text-4xl lg:text-5xl font-bold text-esmeralda">
            Credibilidade construída ao longo do tempo
          </h2>
          <p className="font-montserrat mx-auto max-w-3xl text-base sm:text-lg text-grafite/75">
            Nossa reputação não é acaso: são décadas de compromisso, transparência e a aprovação de milhares de casais que escolheram confiar em nosso trabalho.
          </p>
        </AnimatedSection>

        {/* Grouped Content */}
        <div className="space-y-12">
          {Object.entries(authorityGroups).map(([key, group], groupIndex) => (
            <AnimatedSection key={key} delay={0.12 + groupIndex * 0.1}>
              {/* Group Header */}
              <div className="mb-6 text-center">
                <h3 className="font-philosopher text-2xl sm:text-3xl font-bold text-esmeralda mb-2">
                  {group.title}
                </h3>
                <p className="font-jost text-sm text-grafite/60 uppercase tracking-[0.2em]">
                  {group.subtitle}
                </p>
              </div>

              {/* Group Cards */}
              <div className={`grid gap-4 ${
                group.items.length === 2 ? 'sm:grid-cols-2' :
                group.items.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' :
                'sm:grid-cols-2 xl:grid-cols-4'
              }`}>
                {group.items.map((item, index) => (
                  <motion.article
                    key={item.label}
                    className="group flex h-full flex-col gap-4 rounded-3xl border border-esmeralda/10 bg-white/90 p-5 shadow-[0_20px_45px_-32px_rgba(24,68,52,0.28)] backdrop-blur-sm"
                    whileHover={{ y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Header com ícone e título lado a lado */}
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-esmeralda/10 text-esmeralda">
                        {React.createElement(item.icon, { className: "h-4 w-4" })}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-philosopher text-xl sm:text-2xl font-bold text-esmeralda leading-tight">{item.value}</p>
                        <p className="font-jost text-xs uppercase tracking-[0.2em] text-esmeralda/80 mt-0.5">{item.label}</p>
                      </div>
                    </div>

                    {/* Descrição */}
                    <p className="font-montserrat text-sm leading-relaxed text-grafite/70">{item.description}</p>
                  </motion.article>
                ))}
              </div>

              {/* Elegant Separator (except for last group) */}
              {groupIndex < Object.keys(authorityGroups).length - 1 && (
                <div className="mt-12 flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-esmeralda/30"></div>
                    <div className="h-1 w-1 rounded-full bg-esmeralda/40"></div>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-esmeralda/30"></div>
                  </div>
                </div>
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
