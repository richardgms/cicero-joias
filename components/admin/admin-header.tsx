'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import { usePageVisibility } from '@/hooks/use-page-visibility';

// Link essencial que sempre aparece na navegação
const essentialLinks = [
  { name: 'Início', href: '/' },
];

interface AdminHeaderProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
}

export function AdminHeader({ menuOpen, onMenuToggle }: AdminHeaderProps) {
  const { isSignedIn, user } = useUser();
  const { visiblePages, loading } = usePageVisibility();

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
    <header className="sticky top-0 z-30 bg-white">
      <nav className="flex h-[73px] items-center justify-between gap-3 border-b border-gray-200 px-2 sm:px-4">
        {/* Celular/tablet: botão do menu do admin */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-esmeralda hover:bg-esmeralda/10"
            onClick={onMenuToggle}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="admin-menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <span className="text-lg font-bold text-esmeralda">Admin</span>
        </div>

        {/* Links do site público - centralizados (a partir de md) */}
        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex gap-6">
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

        {/* Usuário */}
        <div className="flex items-center gap-3 pr-2 sm:pr-0">
          {isSignedIn ? (
            <>
              <span className="hidden text-sm text-esmeralda/80 sm:inline">
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
      </nav>
    </header>
  );
}
