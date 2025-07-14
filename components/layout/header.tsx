'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Gem, Phone, Mail, User, Clock, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HeaderAuth } from './header-auth';
import { useUser } from '@clerk/nextjs';
import { usePageVisibility } from '@/hooks/use-page-visibility';

// Todas as páginas possíveis do site
const allNavigation = [
  { name: 'Início', href: '/', slug: 'home' },
  { name: 'Sobre Nós', href: '/sobre', slug: 'sobre' },
  { name: 'Portfólio', href: '/portfolio', slug: 'portfolio' },
  { name: 'Pronta Entrega', href: '/pronta-entrega', slug: 'pronta-entrega' },
  { name: 'Orçamento', href: '/orcamento', slug: 'orcamento' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useUser();
  const { visiblePages, loading } = usePageVisibility();

  // Filtrar navegação baseado nas páginas visíveis
  const navigation = React.useMemo(() => {
    if (loading) {
      // Enquanto carrega, não mostrar nada para evitar flash visual
      return []
    }
    
    // Sempre incluir "Início" (página home)
    const visibleNavigation = [allNavigation[0]] // Início sempre visível
    
    // Adicionar outras páginas se estão visíveis
    const visibleSlugs = visiblePages.map(page => page.slug)
    
    allNavigation.slice(1).forEach(navItem => {
      if (visibleSlugs.includes(navItem.slug)) {
        visibleNavigation.push(navItem)
      }
    })
    
    return visibleNavigation
  }, [visiblePages, loading])

  // Verificar se página de orçamento está visível para mostrar o botão CTA
  const isOrcamentoVisible = React.useMemo(() => {
    if (loading) return false // Não mostrar enquanto carrega para evitar flash
    return visiblePages.some(page => page.slug === 'orcamento')
  }, [visiblePages, loading])

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-marfim/95 backdrop-blur-md border-b border-marfim-dark shadow-sm'
          : 'bg-transparent'
      )}
    >
      {/* Enhanced Top bar with contact info and features */}
      <div className="relative bg-gradient-to-r from-esmeralda via-esmeralda-dark to-esmeralda text-marfim overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="flex space-x-8 animate-pulse">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-full bg-ouro transform rotate-12"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 py-2 md:py-3 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden md:flex justify-between items-center">
              {/* Left Side - Contact & Hours */}
              <div className="flex items-center space-x-6">
                {/* Phone */}
                <div className="flex items-center space-x-2 group">
                  <div className="relative">
                    <Phone className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-ouro rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="font-medium hover:text-ouro transition-colors">(83) 98807-3784</span>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-2 group">
                  <div className="relative">
                    <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-ouro rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="font-medium hover:text-ouro transition-colors">contato@cicerojoias.com.br</span>
                </div>

                {/* Business Hours */}
                <div className="flex items-center space-x-2 border-l border-marfim/20 pl-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Seg-Sex: 8h-18h | Sáb: 8h-12h</span>
                </div>
              </div>

              {/* Center - Features */}
              <div className="flex items-center space-x-6 text-xs">
                <div className="flex items-center space-x-1 bg-marfim/10 px-3 py-1 rounded-full">
                  <Shield className="w-3 h-3 text-ouro" />
                  <span>Garantia Total</span>
                </div>
                <div className="flex items-center space-x-1 bg-marfim/10 px-3 py-1 rounded-full">
                  <Gem className="w-3 h-3 text-ouro" />
                  <span>40+ Anos</span>
                </div>
                <div className="flex items-center space-x-1 bg-marfim/10 px-3 py-1 rounded-full">
                  <Star className="w-3 h-3 text-ouro" />
                  <span>Atendimento VIP</span>
                </div>
              </div>

              {/* Right Side - Auth */}
          <div className="flex items-center space-x-4">
                <HeaderAuth />
              </div>
            </div>

            {/* Mobile Layout - Compact */}
            <div className="md:hidden">
              <div className="flex items-center justify-between">
                {/* Left - Contact (simplified) */}
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>(83) 98807-3784</span>
                  </div>
                </div>

                {/* Right - Key Features (compact) */}
            <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-marfim/10 px-2 py-0.5 rounded-full">
                    <Gem className="w-3 h-3 text-ouro" />
                    <span className="text-xs">40+ Anos</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-marfim/10 px-2 py-0.5 rounded-full">
                    <Shield className="w-3 h-3 text-ouro" />
                    <span className="text-xs">Garantia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border with shine effect */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ouro to-transparent opacity-50" />
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Image
                  src="/assets/logos/circle-monogram.png"
                  alt="Cícero Joias - Monograma"
                  width={40}
                  height={40}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                {/* Shine effect decorativo */}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src="/assets/brand/shine.png"
                    alt=""
                    width={12}
                    height={12}
                    className="animate-pulse"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-playfair text-xl font-bold text-esmeralda group-hover:text-ouro transition-colors duration-300">
                  Cícero Joias
                </span>
                <span className="text-xs text-esmeralda/70 -mt-1">
                  Tradição que se renova
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Centralizada */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              {!loading && navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-esmeralda hover:text-ouro transition-colors duration-200 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ouro transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              {!loading && isSignedIn && (
                <Link
                  href="/minha-area"
                  className="text-esmeralda hover:text-ouro transition-colors duration-200 font-medium flex items-center relative group"
                >
                  <User className="w-4 h-4 mr-1" />
                  <span>Minha Área</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ouro transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}
            </div>
          </div>

          {/* CTA Button e Mobile Button - lado direito */}
          <div className="flex-shrink-0 flex items-center">
            {!loading && isOrcamentoVisible && (
              <div className="hidden md:flex items-center space-x-3 mr-4">
                <div className="relative">
                  <Image
                    src="/assets/brand/shine.png"
                    alt=""
                    width={16}
                    height={16}
                    className="animate-pulse opacity-70"
                  />
                </div>
                <Button asChild className="bg-ouro text-grafite hover:bg-ouro-light shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <Link href="/orcamento">
                    Solicitar Orçamento
                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Image
                        src="/assets/brand/shine.png"
                        alt=""
                        width={12}
                        height={12}
                      />
                    </div>
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="text-esmeralda hover:text-ouro hover:bg-marfim-dark"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-marfim-dark">
            <div className="flex flex-col space-y-4">
              {!loading && navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-esmeralda hover:text-ouro transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!loading && isSignedIn && (
                <Link
                  href="/minha-area"
                  className="text-esmeralda hover:text-ouro transition-colors font-medium py-2 flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4 mr-2" />
                  <span>Minha Área</span>
                </Link>
              )}
              {/* Botão de orçamento mobile - só mostra se página estiver visível */}
              {!loading && isOrcamentoVisible && (
                <div className="pt-4 border-t border-marfim-dark">
                  <Button asChild className="w-full bg-ouro text-grafite hover:bg-ouro-light">
                    <Link href="/orcamento" onClick={() => setMobileMenuOpen(false)}>
                      Solicitar Orçamento
                    </Link>
                  </Button>
                </div>
              )}
              <div className="flex flex-col space-y-2 pt-2">
                <HeaderAuth />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}