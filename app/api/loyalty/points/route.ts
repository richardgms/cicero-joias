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

    // Buscar cliente
    const client = await prisma.client.findUnique({
      where: { email },
      include: {
        loyaltyTransactions: {
          orderBy: { createdAt: 'desc' },
          take: 10 // Últimas 10 transações
        }
      }
    });

    if (!client) {
      return NextResponse.json({ 
        loyaltyPoints: 0,
        pointsToNextCoupon: 10,
        transactions: []
      });
    }

    const pointsToNextCoupon = 10 - (client.loyaltyPoints % 10);

    return NextResponse.json({
      loyaltyPoints: client.loyaltyPoints,
      pointsToNextCoupon: pointsToNextCoupon === 10 ? 0 : pointsToNextCoupon,
      transactions: client.loyaltyTransactions
    });
  } catch (error) {
    console.error('Erro ao buscar pontos de fidelidade:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 