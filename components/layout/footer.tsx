'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Instagram,
  Facebook,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const whatsappUrl = 'https://wa.me/5583988073784?text=Ola! Quero falar com a Cicero Joias.';

const services = [
  { name: 'Alianças personalizadas', href: '/orcamento?tipo=aliancas' },
  { name: 'Restauração de joias', href: '/orcamento?tipo=restauracao' },
  { name: 'Banho de ouro', href: '/orcamento?tipo=banho-ouro' },
  { name: 'Anéis de formatura', href: '/orcamento?tipo=anel-formatura' },
];

const socials = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com', external: true },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com', external: true },
  { icon: MessageCircle, label: 'WhatsApp', href: whatsappUrl, external: true },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#04160f] text-marfim">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-marfim/10">
                <Image
                  src="/assets/logos/circle-monogram.png"
                  alt="Cícero Joias"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-semibold">Cícero Joias</span>
                <span className="text-xs uppercase tracking-[0.3em] text-marfim/60">Desde 1980</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-marfim/70">
              Mais de quatro décadas criando joias sob medida, com atendimento direto do ourives e acompanhamento após a entrega. Nosso atelier em João Pessoa mantém o padrão artesanal que nos trouxe até aqui.
            </p>
            <div className="border-t border-marfim/10" />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-marfim/60">Serviços</h3>
              <ul className="mt-3 space-y-2" aria-label="Serviços">
                {services.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-marfim/75 transition-colors hover:text-ouro">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-marfim/60">Contato</h3>
            <div className="space-y-4 text-sm text-marfim/75">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-ouro" />
                <p>
                  Galeria Jardim · Rua Duque de Caxias, 516<br />
                  Centro · João Pessoa – PB · CEP 58010-821
                </p>
              </div>
              <div className="flex gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-ouro" />
                <Link href="tel:+5583988073784" className="hover:text-ouro">
                  (83) 98807-3784
                </Link>
              </div>
              <div className="flex gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-ouro" />
                <Link href="mailto:contato@cicerojoias.com.br" className="hover:text-ouro">
                  contato@cicerojoias.com.br
                </Link>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-1 h-4 w-4 flex-shrink-0 text-ouro" />
                <p>
                  Seg a Sex · 10h às 17h<br />
                  Sábado · 10h às 14h
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              {socials.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="rounded-full border border-marfim/10 p-2 text-marfim/70 transition-colors hover:border-ouro hover:text-ouro"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-marfim/10 pt-6 text-sm text-marfim/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Cícero Joias. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="/termos-uso" className="hover:text-ouro">
              Termos de Uso
            </Link>
            <Link href="/politica-privacidade" className="hover:text-ouro">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
