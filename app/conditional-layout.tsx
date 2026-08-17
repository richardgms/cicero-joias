'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { FloatingWhatsAppButton } from '@/components/ui/floating-whatsapp-button';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const normalizedPath = pathname ?? '/';
  const isPersonalizedRingsRoute =
    normalizedPath === '/servicos/aliancas-personalizadas';
  const isCustomJewelryRoute =
    normalizedPath === '/servicos/joias-sob-medida';
  // Every cataloged public route (services, portfolio, sobre, pronta-entrega,
  // legal pages, auth) has been migrated to the public design system, so it's
  // now the default for anything that isn't /admin — including 404s and
  // unmatched paths, which should still show the current brand, not the
  // legacy one.
  const usesPublicDesignSystem = !isAdminRoute;
  const showEngagementWidgets = usesPublicDesignSystem;

  if (isAdminRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="public-theme">
      {showEngagementWidgets && (
        <>
          <ScrollProgress />
          <FloatingWhatsAppButton threshold={15} />
        </>
      )}
      <div className="flex min-h-screen flex-col">
        <Header variant={usesPublicDesignSystem ? 'home' : 'legacy'} />
        <main className="flex-1">{children}</main>
        <div
          className={`relative z-20 -mb-1 h-1 w-full ${
            usesPublicDesignSystem
              ? 'bg-brand-emerald-950'
              : 'bg-esmeralda-dark'
          }`}
          aria-hidden="true"
        />
        <div
          className={`relative z-10 ${
            usesPublicDesignSystem
              ? 'bg-brand-emerald-950'
              : 'bg-esmeralda-dark'
          }`}
        >
          <Footer
            appearance={
              isPersonalizedRingsRoute || isCustomJewelryRoute
                ? 'service-compact'
                : usesPublicDesignSystem
                  ? 'home-dark'
                  : 'legacy'
            }
          />
        </div>
      </div>
    </div>
  );
}
