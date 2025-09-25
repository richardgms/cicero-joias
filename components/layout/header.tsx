'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import { usePageVisibility } from '@/hooks/use-page-visibility';

const staticNavigation = [
  { name: 'Início', href: '/' },
  { name: 'Serviços', href: '/servicos' },
  { name: 'Minha Área', href: '/minha-area' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { visiblePages, loading, isAdmin } = usePageVisibility();

  const navigation = useMemo(() => {
    let nav = [...staticNavigation];

    // DEBUG: Log estado atual
    console.log('[HEADER DEBUG]', {
      loading,
      visiblePagesLength: visiblePages.length,
      visiblePages,
      isAdmin
    });

    // Adicionar páginas visíveis do sistema de controle de visibilidade
    if (!loading && visiblePages.length > 0) {
      console.log('[HEADER DEBUG] Adding dynamic pages to navigation');
      // Inserir as páginas dinâmicas entre 'Início' e 'Minha Área'
      const dynamicPages = visiblePages
        .filter(page => !nav.some(navItem => navItem.href === page.href)) // Evitar duplicatas
        .map(page => ({
          name: page.title,
          href: page.href
        }));

      if (dynamicPages.length > 0) {
        // Inserir após 'Início' (posição 1)
        nav.splice(1, 0, ...dynamicPages);
      }
    } else {
      console.log('[HEADER DEBUG] NOT adding dynamic pages - loading:', loading, 'length:', visiblePages.length);
    }

    // Adicionar painel admin se for admin
    if (isAdmin) {
      nav.push({ name: 'Painel Administrativo', href: '/admin' });
    }

    console.log('[HEADER DEBUG] Final navigation:', nav);
    return nav;
  }, [visiblePages, loading, isAdmin]);

  return (
    <header className="sticky top-0 z-50 bg-marfim/95 backdrop-blur-md border-b border-marfim-dark">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image src="/assets/logos/circle-monogram.png" alt="Cícero Joias" fill sizes="40px" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-esmeralda">Cícero Joias</span>
            <span className="text-xs text-esmeralda/70">Desde 1980</span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-esmeralda hover:text-ouro transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* User / Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {isSignedIn ? (
            <>
              <span className="text-sm text-esmeralda/80">
                Olá, {user.firstName ?? 'Cícero'}
              </span>
              <UserButton appearance={{ elements: { userButtonAvatarBox: 'h-8 w-8' } }} afterSignOutUrl="/" />
            </>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-full border border-esmeralda/30 px-4 py-2 text-sm font-medium text-esmeralda hover:bg-esmeralda hover:text-marfim transition-colors"
            >
              Entrar
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded-full border border-esmeralda/30 p-2 text-esmeralda"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-marfim-dark bg-marfim/95 px-4 py-4">
          <div className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-esmeralda hover:text-ouro transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="border-t border-marfim-dark pt-4">
              {isSignedIn ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-esmeralda/80">
                    Olá, {user.firstName ?? 'Cícero'}
                  </span>
                  <UserButton appearance={{ elements: { userButtonAvatarBox: 'h-8 w-8' } }} afterSignOutUrl="/" />
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="inline-flex w-full justify-center rounded-full border border-esmeralda/30 px-4 py-2 text-sm font-medium text-esmeralda hover:bg-esmeralda hover:text-marfim transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
