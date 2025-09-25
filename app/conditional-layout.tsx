'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isServicosPage = pathname === '/servicos';

  if (isAdminRoute) {
    // Layout para páginas admin (sem header/footer público)
    return <main className="min-h-screen">{children}</main>;
  }

  // Layout para páginas públicas (com header/footer)
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer hideCtaSection={isServicosPage} />
    </div>
  );
}