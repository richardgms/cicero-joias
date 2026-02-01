'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { LoadingScreen } from '@/components/ui/loading-screen';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      // Se não estiver logado, será redirecionado pelo middleware
      if (!user) {
        return;
      }

      // Verificar se o usuário tem role ADMIN (case insensitive)
      const userRole = (user.publicMetadata?.role as string)?.toLowerCase();

      if (userRole !== 'admin') {
        // Redirecionar para página de acesso negado
        router.push('/acesso-negado');
        return;
      }
    }
  }, [isLoaded, user, router]);

  // Mostrar loading enquanto carrega dados do usuário
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingScreen variant="fullscreen" message="Verificando permissões..." />
      </div>
    );
  }

  // Se não estiver logado, não renderizar nada (middleware cuida do redirect)
  if (!user) {
    return null;
  }

  // Verificar role (case insensitive)
  const userRole = (user.publicMetadata?.role as string)?.toLowerCase();

  if (userRole !== 'admin') {
    // Não renderizar enquanto redireciona
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingScreen variant="fullscreen" message="Redirecionando..." />
      </div>
    );
  }

  // Se chegou até aqui, usuário é ADMIN
  return <>{children}</>;
} 