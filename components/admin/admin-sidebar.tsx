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
  Settings, 
  BarChart3,
  FileText,
  Gem
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
    name: 'Usuários',
    href: '/admin/usuarios',
    icon: Users,
  },
  {
    name: 'Orçamentos',
    href: '/admin/orcamentos',
    icon: FileText,
  },
  {
    name: 'Relatórios',
    href: '/admin/relatorios',
    icon: BarChart3,
  },
  {
    name: 'Configurações',
    href: '/admin/configuracoes',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Image
              src="/assets/logos/circle-monogram.png"
              alt="Cícero Joias - Monograma"
              width={32}
              height={32}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            {/* Shine effect decorativo */}
            <div className="absolute -top-0.5 -right-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/assets/brand/shine.png"
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

      {/* Quick Actions */}
      <div className="mt-8 px-3">
        <div className="bg-gradient-to-br from-esmeralda/5 to-ouro/5 rounded-lg p-4 border border-esmeralda/10">
          <div className="flex items-center space-x-2 mb-3">
            <Image
              src="/assets/brand/shine.png"
              alt=""
              width={12}
              height={12}
              className="animate-pulse"
            />
            <h3 className="text-sm font-medium text-esmeralda">
              Ações Rápidas
            </h3>
          </div>
          <div className="space-y-2">
            <Link
              href="/admin/portfolio/new"
              className="block w-full text-left px-3 py-2 text-sm text-esmeralda hover:bg-esmeralda/10 hover:shadow-sm rounded-md transition-all duration-300"
            >
              + Novo Projeto
            </Link>
            <Link
              href="/admin/produtos/new"
              className="block w-full text-left px-3 py-2 text-sm text-esmeralda hover:bg-esmeralda/10 hover:shadow-sm rounded-md transition-all duration-300"
            >
              + Novo Produto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 