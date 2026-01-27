'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';
import { WhatsappIcon } from '@/components/icons';

const whatsappUrl = 'https://wa.me/5583991180251?text=Ola! Quero falar com a Cícero Joias.';

const services = [
  { name: 'Alianças personalizadas', href: '/servicos/aliancas-personalizadas' },
  { name: 'Restauração de joias', href: '/servicos/consertos' },
  { name: 'Banho de ouro', href: '/servicos/banho-de-ouro' },
  { name: 'Anéis de formatura', href: '/servicos/joias-sob-medida' },
];

const socials = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com', external: true },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com', external: true },
  { icon: WhatsappIcon, label: 'WhatsApp', href: whatsappUrl, external: true },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-esmeralda-dark text-text-on-dark pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr,1fr] md:gap-16">

          {/* Coluna 1: Marca e Navegação */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 transition-colors group-hover:border-action-strong/50">
                  <Image
                    src="/assets/logos/circle-monogram.webp"
                    alt="Cícero Joias"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-philosopher text-xl font-bold tracking-wide">Cícero Joias</span>
                  <span className="font-jost text-xs font-semibold uppercase tracking-[0.3em] text-text-on-dark/60">Desde 1985</span>
                </div>
              </Link>

              <p className="font-montserrat text-sm leading-relaxed text-text-on-dark/70 max-w-md">
                Mais de quatro décadas criando joias sob medida, com atendimento direto do ourives e acompanhamento após a entrega. Nosso atelier em João Pessoa mantém o padrão artesanal que nos trouxe até aqui.
              </p>
            </div>

            <div className="h-px w-full max-w-md bg-gradient-to-r from-white/10 to-transparent" />

            <div>
              <h3 className="font-jost text-sm font-semibold uppercase tracking-[0.25em] text-text-on-dark/60 mb-4">Serviços</h3>
              <ul className="space-y-3">
                {services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="font-montserrat text-sm text-text-on-dark/75 transition-colors hover:text-action-strong block w-max"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coluna 2: Contato e Social */}
          <div className="space-y-8 md:pl-8 md:border-l md:border-white/5">
            <div>
              <h3 className="font-jost text-xs font-medium uppercase tracking-[0.3em] text-text-on-dark/50 mb-8">Contato</h3>
              <div className="space-y-6 font-montserrat text-sm text-text-on-dark/60">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-action-strong/70" />
                  <p className="leading-relaxed">
                    Galeria Jardim · Rua Duque de Caxias, 516<br />
                    Centro · João Pessoa – PB<br />
                    CEP 58010-821
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="h-4 w-4 flex-shrink-0 text-action-strong/70" />
                  <Link href="tel:+5583991180251" className="hover:text-white transition-colors duration-300">
                    (83) 99118-0251
                  </Link>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="h-4 w-4 flex-shrink-0 text-action-strong/70" />
                  <Link href="mailto:contato@cicerojoias.com.br" className="hover:text-white transition-colors duration-300">
                    contato@cicerojoias.com.br
                  </Link>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="mt-1 h-4 w-4 flex-shrink-0 text-action-strong/70" />
                  <p className="leading-relaxed">
                    Seg a Sex · 10h às 17h<br />
                    Sábado · 10h às 14h
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              {socials.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-on-dark/60 transition-all duration-300 hover:border-action-strong/50 hover:bg-action-strong/10 hover:text-action-strong"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright e Links Legais */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="font-montserrat text-xs text-text-on-dark/50">
            © {year} Cícero Joias. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 font-montserrat text-xs text-text-on-dark/50">
            <Link href="/termos-uso" className="hover:text-action-strong transition-colors">
              Termos de Uso
            </Link>
            <Link href="/politica-privacidade" className="hover:text-action-strong transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
