'use client';

import { ReactNode } from 'react';
import { usePageVisibility } from '@/hooks/use-page-visibility';
import { Eye, Shield } from 'lucide-react';

interface PageVisibilityGuardProps {
  pageSlug: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PageVisibilityGuard({ 
  pageSlug, 
  children, 
  fallback 
}: PageVisibilityGuardProps) {
  const { loading, isVisible, isAdmin, error } = usePageVisibility(pageSlug);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-marfim via-gray-50 to-esmeralda/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-esmeralda mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando disponibilidade...</p>
        </div>
      </div>
    );
  }

  // Error state (fail-safe: show content)
  if (error) {
    console.error('PageVisibilityGuard error:', error);
    return <div className="w-full">{children}</div>;
  }

  // Admin preview mode
  if (isAdmin && !isVisible) {
    return (
      <div className="relative">
        {/* Admin preview banner */}
        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-4">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-amber-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-amber-800">
                Modo Preview - Página Oculta
              </p>
              <p className="text-xs text-amber-700">
                Esta página está oculta para o público. Apenas admins podem visualizá-la.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    );
  }

  // Page is visible or user is admin
  if (isVisible || isAdmin) {
    return <div className="w-full">{children}</div>;
  }

  // Page is hidden - this shouldn't happen due to redirect in hook, but just in case
  if (fallback) {
    return <div className="w-full">{fallback}</div>;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-marfim via-gray-50 to-esmeralda/5">
      <div className="text-center">
        <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Página Indisponível
        </h2>
        <p className="text-gray-600">
          Esta página não está disponível no momento.
        </p>
      </div>
    </div>
  );
} 