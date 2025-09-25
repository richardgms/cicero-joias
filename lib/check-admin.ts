import { auth, clerkClient } from '@clerk/nextjs/server';

export interface AdminAuthSuccess {
  userId: string;
}

export interface AdminAuthError {
  error: string;
  status: number;
}

// Função reutilizável para verificar se o usuário logado é admin
export async function checkAdminAuth(): Promise<AdminAuthSuccess | AdminAuthError> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: 'Não autorizado', status: 401 };
    }

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const role = (user.publicMetadata?.role as string)?.toLowerCase();

    if (role !== 'admin') {
      return { error: 'Acesso negado', status: 403 };
    }

    return { userId };
  } catch (error) {
    console.error('Erro de autenticação:', error);
    return { error: 'Erro de autenticação', status: 500 };
  }
}
