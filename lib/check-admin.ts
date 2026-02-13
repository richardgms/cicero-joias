import { auth } from '@clerk/nextjs/server';

export interface AdminAuthSuccess {
  userId: string;
}

export interface AdminAuthError {
  error: string;
  status: number;
  details?: string;
}

// Função para verificar se o usuário está autenticado.
// A verificação de role ADMIN é feita pelo AdminGuard (client-side) no layout.
// 
// Para rotas de API, use checkAdminAuthStrict() que verifica o role via Clerk API.
export async function checkAdminAuth(): Promise<AdminAuthSuccess | AdminAuthError> {
  try {
    // auth() usa a sessão local — NÃO faz chamada HTTP ao Clerk API
    const { userId } = await auth();

    if (!userId) {
      return {
        error: 'Não autorizado - faça login para continuar',
        status: 401
      };
    }

    return { userId };
  } catch (error: any) {
    console.error('❌ [Auth Check] Unexpected error:', error?.message);
    return {
      error: 'Erro interno durante autenticação',
      status: 500,
    };
  }
}

// Versão rigorosa que verifica role ADMIN via Clerk API.
// Usar apenas para rotas de API que precisam de verificação forte.
export async function checkAdminAuthStrict(): Promise<AdminAuthSuccess | AdminAuthError> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        error: 'Não autorizado - faça login para continuar',
        status: 401
      };
    }

    // Verificar role via Clerk API (faz chamada HTTP)
    const { clerkClient } = await import('@clerk/nextjs/server');
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const role = (user.publicMetadata?.role as string)?.toLowerCase();

    if (role !== 'admin') {
      return {
        error: 'Acesso negado - apenas administradores podem acessar',
        status: 403,
      };
    }

    return { userId };
  } catch (error: any) {
    console.error('❌ [Auth Check Strict] Unexpected error:', error?.message);
    return {
      error: 'Erro interno durante autenticação',
      status: 500,
    };
  }
}
