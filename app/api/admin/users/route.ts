import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkAdminAuth } from '@/lib/check-admin';
import { clerkClient } from '@clerk/nextjs/server';

async function getClerkUsersWithClientData() {
  try {
    console.log('[API] Fetching users from Clerk with client data integration');
    const clerk = await clerkClient();
    const clerkUsers = await clerk.users.getUserList({ limit: 100 });

    // Get all client data keyed by clerkUserId
    let clientMap = new Map();
    try {
      const clients = await prisma.client.findMany({
        select: {
          id: true,
          name: true,
          phone: true,
          whatsapp: true,
          loyaltyLevel: true,
          loyaltyPoints: true,
          createdAt: true,
          clerkUserId: true,
          userId: true, // Keep both for backward compatibility during migration
          _count: {
            select: {
              quoteRequests: true,
              orders: true,
            },
          },
        },
      });

      // Map clients by their clerkUserId first, then fallback to userId
      clients.forEach(client => {
        const clerkId = client.clerkUserId || client.userId;
        if (clerkId) {
          clientMap.set(clerkId, client);
        }
      });

      console.log(`[API] Found ${clients.length} clients in database`);
    } catch (dbError: any) {
      console.warn('[API] Could not fetch client data from database:', dbError?.message || dbError);
    }

    const users = clerkUsers.data.map((user: any) => {
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
          loyaltyLevel: clientData.loyaltyLevel,
          loyaltyPoints: clientData.loyaltyPoints,
          createdAt: clientData.createdAt.toISOString(),
          ordersCount: clientData._count?.orders || 0,
          quotesCount: clientData._count?.quoteRequests || 0,
        } : null,
      };
    });

    const stats = {
      total: users.length,
      admins: users.filter((user: any) => user.role === 'ADMIN').length,
      clients: users.filter((user: any) => user.role === 'CLIENT').length,
      withClientProfile: users.filter((user: any) => Boolean(user.client)).length,
    };

    console.log(`[API] Returning ${users.length} users with ${stats.withClientProfile} client profiles`);
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
