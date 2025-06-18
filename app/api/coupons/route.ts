import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const email = user.emailAddresses?.[0]?.emailAddress || user.primaryEmailAddress?.emailAddress;
    
    if (!email) {
      return NextResponse.json({ error: 'Email do usuário não encontrado' }, { status: 400 });
    }

    // Buscar cliente pelo email do usuário
    const client = await prisma.client.findUnique({
      where: { email },
      include: {
        coupons: {
          where: {
            isActive: true,
            isUsed: false,
            OR: [
              { expiresAt: null },
              { expiresAt: { gt: new Date() } }
            ]
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!client) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ coupons: client.coupons });
  } catch (error) {
    console.error('Erro ao buscar cupons:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 