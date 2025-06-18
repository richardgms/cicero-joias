import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const email = user.emailAddresses?.[0]?.emailAddress || user.primaryEmailAddress?.emailAddress;
    
    if (!email) {
      return NextResponse.json({ error: 'Email não encontrado' }, { status: 400 });
    }

    // Teste simples sem Prisma
    return NextResponse.json({ 
      message: 'API funcionando!',
      email: email,
      userId: user.id,
      userObject: user
    });
  } catch (error) {
    console.error('Erro na API de teste:', error);
    return NextResponse.json({ 
      error: 'Erro interno do servidor', 
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
} 