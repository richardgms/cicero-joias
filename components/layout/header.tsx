'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Gem, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Sobre Nós', href: '/sobre' },
  { name: 'Portfólio', href: '/portfolio' },
  { name: 'Pronta Entrega', href: '/pronta-entrega' },
  { name: 'Orçamento', href: '/orcamento' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-transparent'
      )}
    >
      {/* Top bar with contact info */}
      <div className="bg-slate-900 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>(83) 98807-3784</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>contato@cicerojoias.com.br</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cliente" className="text-sm hover:text-primary transition-colors">
              Portal do Cliente
            </Link>
            <Link href="/admin" className="text-sm hover:text-primary transition-colors">
              Área Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Gem className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-xl font-bold text-slate-900">
                Cícero Joias
              </span>
              <span className="text-xs text-slate-600 -mt-1">
                Tradição que se renova
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button asChild>
              <Link href="/orcamento">Solicitar Orçamento</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-700 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-200">
                <Button asChild className="w-full">
                  <Link href="/orcamento" onClick={() => setMobileMenuOpen(false)}>
                    Solicitar Orçamento
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col space-y-2 pt-2">
                <Link
                  href="/cliente"
                  className="text-sm text-slate-600 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portal do Cliente
                </Link>
                <Link
                  href="/admin"
                  className="text-sm text-slate-600 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Área Admin
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}