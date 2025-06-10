import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const { portfolioItemId } = await request.json();

    if (!portfolioItemId) {
      return NextResponse.json({ error: 'ID do item do portfólio é obrigatório' }, { status: 400 });
    }

    const email = user.emailAddresses[0].emailAddress;

    // Buscar ou criar cliente
    let client = await prisma.client.findUnique({
      where: { email }
    });

    if (!client) {
      client = await prisma.client.create({
        data: {
          name: user.fullName || user.firstName || 'Cliente',
          email: email,
          phone: user.phoneNumbers[0]?.phoneNumber,
        }
      });
    }

    // Verificar se já é favorito
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        clientId_portfolioItemId: {
          clientId: client.id,
          portfolioItemId: portfolioItemId
        }
      }
    });

    if (existingFavorite) {
      // Remover dos favoritos
      await prisma.favorite.delete({
        where: { id: existingFavorite.id }
      });

      return NextResponse.json({ 
        message: 'Item removido dos favoritos',
        isFavorited: false 
      });
    } else {
      // Adicionar aos favoritos
      await prisma.favorite.create({
        data: {
          clientId: client.id,
          portfolioItemId: portfolioItemId
        }
      });

      return NextResponse.json({ 
        message: 'Item adicionado aos favoritos',
        isFavorited: true 
      });
    }
  } catch (error) {
    console.error('Erro ao alterar favorito:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 