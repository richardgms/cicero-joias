'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Package, 
  Image, 
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
    icon: Image,
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
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Gem className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Admin</h1>
            <p className="text-xs text-gray-500">Cícero Joias</p>
          </div>
        </div>
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
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-400 group-hover:text-gray-500'
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
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Ações Rápidas
          </h3>
          <div className="space-y-2">
            <Link
              href="/admin/portfolio/new"
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all"
            >
              + Novo Projeto
            </Link>
            <Link
              href="/admin/produtos/new"
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all"
            >
              + Novo Produto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 