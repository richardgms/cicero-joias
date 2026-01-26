'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import { usePageVisibility } from '@/hooks/use-page-visibility';

// Link essencial que sempre aparece na navegação
const essentialLinks = [
  { name: 'Início', href: '/' },
];

export function AdminHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { visiblePages, loading, isAdmin } = usePageVisibility();

  const navigation = useMemo(() => {
    // Começar com link de Início
    const nav = [essentialLinks[0]]; // { name: 'Início', href: '/' }

    // Adicionar páginas visíveis do banco de dados
    if (!loading && visiblePages.length > 0) {
      const dynamicPages = visiblePages.map(page => ({
        name: page.title,
        href: page.href
      }));
      nav.push(...dynamicPages);
    }

    // Deduplicar por href para evitar chaves duplicadas
    return Array.from(new Map(nav.map(item => [item.href, item])).values());
  }, [visiblePages, loading]);


  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="flex items-center justify-between px-4 py-4 border-b border-gray-200" style={{ height: '73px' }}>
        {/* Desktop navigation - centralizada */}
        <div className="flex-1 flex justify-center">
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
        </div>

        {/* User / Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {isSignedIn ? (
            <>
              <span className="text-sm text-esmeralda/80">
                Olá, {user.firstName ?? 'Admin'}
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
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4">
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

            <div className="border-t border-gray-200 pt-4">
              {isSignedIn ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-esmeralda/80">
                    Olá, {user.firstName ?? 'Admin'}
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