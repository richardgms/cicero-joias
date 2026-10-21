'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';

// Estrutura do painel: no desktop (lg+) o menu lateral fica fixo; abaixo disso
// vira uma gaveta aberta pelo botão ☰ do cabeçalho.
export function AdminShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fecha a gaveta ao trocar de tela
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Esc fecha a gaveta e a página não rola por trás dela
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-w-0 flex-col lg:ml-64">
        <AdminHeader menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((v) => !v)} />
        <main className="flex-1 overflow-x-hidden bg-gray-50 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
