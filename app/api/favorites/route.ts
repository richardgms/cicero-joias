import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const email = user.emailAddresses[0].emailAddress;

    // Buscar cliente pelo email
    const client = await prisma.client.findUnique({
      where: { email },
      include: {
        favorites: {
          include: {
            portfolioItem: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!client) {
      return NextResponse.json({ favorites: [] });
    }

    return NextResponse.json({ favorites: client.favorites });
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 