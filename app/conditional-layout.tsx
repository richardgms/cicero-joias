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
  const isHomeRoute = normalizedPath === '/';
  const showEngagementWidgets =
    isHomeRoute ||
    normalizedPath.startsWith('/servicos');

  if (isAdminRoute) {
    // Layout para páginas admin (sem header/footer público)
    return <main className="min-h-screen">{children}</main>;
  }

  // Layout para páginas públicas (com header/footer)
  return (
    <div className="public-theme">
      {showEngagementWidgets && (
        <>
          <ScrollProgress />
          <FloatingWhatsAppButton threshold={15} />
        </>
      )}
      <div className="flex min-h-screen flex-col">
        <Header variant={isHomeRoute ? 'home' : 'legacy'} />
        <main className="flex-1">{children}</main>
        {/* Conector físico para evitar linhas brancas (gap fix) */}
        <div
          className={`relative z-20 -mb-1 h-1 w-full ${
            isHomeRoute ? 'bg-brand-emerald-950' : 'bg-esmeralda-dark'
          }`}
          aria-hidden="true"
        />
        <div
          className={`relative z-10 ${
            isHomeRoute ? 'bg-brand-emerald-950' : 'bg-esmeralda-dark'
          }`}
        >
          <Footer appearance={isHomeRoute ? 'home-dark' : 'legacy'} />
        </div>
      </div>
    </div>
  );
}
