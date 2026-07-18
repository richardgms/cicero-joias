'use client';

import { useMemo, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons';

import { usePageVisibility } from '@/hooks/use-page-visibility';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';

const whatsappMessage =
  'Olá! Gostaria de conversar com o ourives sobre uma joia.';

export function HomeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { visiblePages, loading, isAdmin } = usePageVisibility();

  const navigation = useMemo(() => {
    const nav = [{ name: 'Início', href: '/' }];

    if (!loading && visiblePages.length > 0) {
      nav.push(
        ...visiblePages.map((page) => ({
          name: page.title,
          href: page.href,
        }))
      );
    }

    if (isAdmin) {
      nav.push({ name: 'Painel Administrativo', href: '/admin' });
    }

    return nav;
  }, [visiblePages, loading, isAdmin]);

  return (
    <header className="sticky top-0 z-50 border-b border-border-on-dark bg-surface-dark text-text-on-dark">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-control shrink-0 items-center gap-3 rounded-control"
          aria-label="Cícero Joias — início"
        >
          <Image
            src="/assets/logos/circle-monogram.webp"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="flex flex-col gap-1 leading-none">
            <span className="font-heading text-lg font-medium text-text-on-dark">
              Cícero Joias
            </span>
            <span className="font-sans text-[0.5625rem] font-semibold uppercase tracking-eyebrow text-action-on-dark">
              Desde 1985
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-stretch gap-5 lg:flex xl:gap-7"
          aria-label="Navegação principal"
        >
          {navigation.map((item) => {
            const isActive = item.href === '/';

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex min-h-control items-center border-b-2 border-transparent font-sans text-xs font-medium uppercase tracking-label text-text-on-dark/80 transition-colors hover:text-action-on-dark',
                  isActive &&
                    'border-action-on-dark font-semibold text-action-on-dark'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {isSignedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden font-sans text-xs text-text-on-dark/75 2xl:inline">
                Olá, {user.firstName ?? 'Cícero'}
              </span>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox:
                      'h-9 w-9 border border-border-on-dark',
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          ) : (
            <Button asChild variant="ghostDark" size="sm">
              <Link href="/sign-in">Entrar</Link>
            </Button>
          )}

          <Button asChild variant="goldOnDark" size="sm">
            <WhatsAppLink message={whatsappMessage}>
              <WhatsappIcon className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </WhatsAppLink>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghostDark"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-controls="home-mobile-navigation"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </Container>

      {mobileMenuOpen && (
        <div
          id="home-mobile-navigation"
          className="border-t border-border-on-dark bg-surface-dark lg:hidden"
        >
          <Container className="py-4">
            <nav
              className="flex flex-col"
              aria-label="Navegação principal mobile"
            >
              {navigation.map((item) => {
                const isActive = item.href === '/';

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'flex min-h-control items-center border-l-2 border-transparent px-4 font-sans text-xs font-medium uppercase tracking-label text-text-on-dark/80 transition-colors hover:bg-brand-white/5 hover:text-action-on-dark',
                      isActive &&
                        'border-action-on-dark bg-brand-white/5 font-semibold text-action-on-dark'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 flex flex-col gap-3 border-t border-border-on-dark pt-4">
              {isSignedIn ? (
                <div className="flex min-h-control items-center justify-between gap-3">
                  <span className="font-sans text-sm text-text-on-dark/80">
                    Olá, {user.firstName ?? 'Cícero'}
                  </span>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox:
                          'h-9 w-9 border border-border-on-dark',
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
              ) : (
                <Button asChild variant="outlineDark" className="w-full">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                </Button>
              )}

              <Button asChild variant="goldOnDark" className="w-full">
                <WhatsAppLink message={whatsappMessage}>
                  <WhatsappIcon className="h-4 w-4" aria-hidden="true" />
                  Falar no WhatsApp
                </WhatsAppLink>
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
