import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkAdminAuth } from '@/lib/check-admin';
import { clerkClient, User } from '@clerk/nextjs/server';

async function getClerkUsersWithClientData() {
  try {
    const clerk = await clerkClient();
    const clerkUsers = await clerk.users.getUserList({ limit: 100 });

    // Get all client data keyed by clerkUserId
    let clientMap = new Map();
    try {
      const clients = await prisma.client.findMany({
        select: {
          id: true,
          phone: true,
          whatsapp: true,
          createdAt: true,
          clerkUserId: true,
          userId: true,
        },
      });

      // Map clients by their clerkUserId first, then fallback to userId
      clients.forEach(client => {
        const clerkId = client.clerkUserId || client.userId;
        if (clerkId) {
          clientMap.set(clerkId, client);
        }
      });

    } catch (dbError) {
      console.warn('[API] Could not fetch client data from database:', dbError instanceof Error ? dbError.message : String(dbError));
    }

    const users = clerkUsers.data.map((user: User) => {
      const role = (user.publicMetadata?.role as string)?.toUpperCase() || 'CLIENT';
      const isAdmin = role === 'ADMIN';
      const clientData = clientMap.get(user.id);

      return {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || 'No email',
        role: isAdmin ? 'ADMIN' : 'CLIENT',
        createdAt: new Date(user.createdAt).toISOString(),
        updatedAt: new Date(user.updatedAt).toISOString(),
        client: clientData ? {
          id: clientData.id,
          name: clientData.name,
          phone: clientData.phone,
          whatsapp: clientData.whatsapp,
          createdAt: clientData.createdAt.toISOString(),
        } : null,
      };
    });

    const stats = {
      total: users.length,
      admins: users.filter((user) => user.role === 'ADMIN').length,
      clients: users.filter((user) => user.role === 'CLIENT').length,
      withClientProfile: users.filter((user) => Boolean(user.client)).length,
    };

    return { users, stats };
  } catch (clerkError) {
    console.error('[CLERK] Failed to fetch from Clerk API:', clerkError);
    throw clerkError;
  }
}

export async function GET() {
  try {
    // Check authentication
    const authResult = await checkAdminAuth();
    if ('error' in authResult) {
      console.error('[AUTH] Authentication failed:', authResult.error);
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Use Clerk as primary source with client data integration
    const userData = await getClerkUsersWithClientData();
    return NextResponse.json(userData);

  } catch (error: any) {
    console.error('[ERROR] Erro ao listar usuários:', error);

    // Return meaningful error message
    if (error?.message && error.message.includes('Clerk')) {
      return NextResponse.json(
        { error: 'Erro de autenticação com o Clerk' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 },
    );
  }
}
