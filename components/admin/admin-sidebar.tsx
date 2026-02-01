'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  Package,
  Image as ImageIcon,
  Users,
  BarChart3,
  FileText,
  Gem,
  Eye,
  Activity
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    name: 'Portfólio',
    href: '/admin/portfolio',
    icon: ImageIcon,
  },
  {
    name: 'Produtos',
    href: '/admin/products',
    icon: Package,
  },
  {
    name: 'Categorias',
    href: '/admin/categories',
    icon: Gem,
  },
  {
    name: 'Visibilidade da Página',
    href: '/admin/page-visibility',
    icon: Eye,
  },
  {
    name: 'Usuários',
    href: '/admin/usuarios',
    icon: Users,
  },
  {
    name: 'Health',
    href: '/admin/health',
    icon: Activity,
  },


];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg fixed top-0 left-0 h-screen flex flex-col z-50">
      {/* Logo - Header fixo */}
      <div className="flex items-center justify-center h-18 px-4 py-4 border-b border-gray-200 flex-shrink-0">
        <Link href="/" className="flex items-center space-x-3 group h-10">
          <div className="relative">
            <Image
              src="/assets/logos/circle-monogram.webp"
              alt="Cícero Joias - Monograma"
              width={32}
              height={32}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            {/* Shine effect decorativo */}
            <div className="absolute -top-0.5 -right-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/assets/brand/shine.webp"
                alt=""
                width={8}
                height={8}
                className="animate-pulse"
              />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-esmeralda group-hover:text-ouro transition-colors duration-300">Admin</h1>
            <p className="text-xs text-esmeralda/70 -mt-0.5">Cícero Joias</p>
          </div>
        </Link>
      </div>

      {/* Área de navegação com scroll */}
      <div className="flex-1 overflow-y-auto">
        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-esmeralda text-marfim shadow-md'
                      : 'text-gray-700 hover:bg-esmeralda/10 hover:text-esmeralda'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive
                        ? 'text-marfim'
                        : 'text-gray-400 group-hover:text-esmeralda'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
} 