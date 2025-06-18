import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    console.log('User object:', user);
    
    const email = user.emailAddresses?.[0]?.emailAddress || user.primaryEmailAddress?.emailAddress;
    
    if (!email) {
      console.error('Email não encontrado para o usuário:', user.id);
      return NextResponse.json({ error: 'Email do usuário não encontrado' }, { status: 400 });
    }

    console.log('Email do usuário:', email);

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