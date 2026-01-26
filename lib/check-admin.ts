import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

export interface AdminAuthSuccess {
  userId: string;
  user: any; // Returning full user object for logging needs
}



export interface AdminAuthError {
  error: string;
  status: number;
  details?: string;
}

const isDevelopment = process.env.NODE_ENV === 'development';

// Função reutilizável para verificar se o usuário logado é admin
export async function checkAdminAuth(): Promise<AdminAuthSuccess | AdminAuthError> {
  try {
    // Step 1: Check if user is authenticated
    const { userId } = await auth();
    if (!userId) {
      console.warn('🚫 [Auth Check] No userId found - user not authenticated');
      return {
        error: 'Não autorizado - faça login para continuar',
        status: 401
      };
    }

    // Step 2: Fetch user from Clerk
    let user;
    try {
      const clerk = await clerkClient();
      user = await clerk.users.getUser(userId);
    } catch (clerkError: any) {
      console.error('❌ [Auth Check] Failed to fetch user from Clerk:', {
        userId,
        error: clerkError?.message || String(clerkError),
        status: clerkError?.status,
        stack: isDevelopment ? clerkError?.stack : undefined
      });

      return {
        error: 'Erro ao buscar dados do usuário',
        status: 500,
        details: isDevelopment ? clerkError?.message : undefined
      };
    }

    // Step 3: Check if user has admin role
    const role = (user.publicMetadata?.role as string)?.toLowerCase();

    if (role !== 'admin') {
      console.warn(`🚫 [Auth Check] Access denied for user ${userId} - role: ${role || 'none'}`);
      return {
        error: 'Acesso negado - apenas administradores podem acessar',
        status: 403,
        details: isDevelopment ? `Role encontrada: ${role || 'none'}, esperada: admin` : undefined
      };
    }

    return { userId, user };

  } catch (error: any) {
    // This catch should only trigger for unexpected errors
    console.error('❌ [Auth Check] Unexpected error during authentication:', {
      error: error?.message || String(error),
      name: error?.name,
      stack: isDevelopment ? error?.stack : undefined,
      timestamp: new Date().toISOString()
    });

    return {
      error: 'Erro interno durante autenticação',
      status: 500,
      details: isDevelopment ? error?.message : undefined
    };
  }
}
