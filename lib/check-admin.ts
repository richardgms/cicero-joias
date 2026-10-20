import { auth } from '@clerk/nextjs/server';

export interface AdminAuthSuccess {
  userId: string;
}

export interface AdminAuthError {
  error: string;
  status: number;
  details?: string;
}

// Verificação usada por todas as rotas /api/admin.
// Antes só checava se havia sessão: qualquer usuário logado (não admin) passava,
// porque o AdminGuard só protege a interface, não a API. Agora exige o mesmo
// role ADMIN (publicMetadata.role) que o AdminGuard exige na tela.
export async function checkAdminAuth(): Promise<AdminAuthSuccess | AdminAuthError> {
  return checkAdminAuthStrict();
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
