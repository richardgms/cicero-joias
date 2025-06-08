'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

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

      // Debug: ver o que está vindo do Clerk
      console.log('👤 User data:', {
        userId: user.id,
        publicMetadata: user.publicMetadata,
        role: user.publicMetadata?.role
      });

      // Verificar se o usuário tem role ADMIN (case insensitive)
      const userRole = (user.publicMetadata?.role as string)?.toLowerCase();
      console.log('🔍 Role verificado:', userRole);
      
      if (userRole !== 'admin') {
        console.log('❌ Acesso negado - role:', userRole);
        // Redirecionar para página de acesso negado
        router.push('/acesso-negado');
        return;
      }
      
      console.log('✅ Acesso permitido - role:', userRole);
    }
  }, [isLoaded, user, router]);

  // Mostrar loading enquanto carrega dados do usuário
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-gray-600">Verificando permissões...</p>
        </div>
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
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-gray-600">Redirecionando...</p>
        </div>
      </div>
    );
  }

  // Se chegou até aqui, usuário é ADMIN
  return <>{children}</>;
} 