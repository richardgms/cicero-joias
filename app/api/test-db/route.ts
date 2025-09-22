import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Teste simples de conexão
    await prisma.$connect();

    // Tenta buscar dados de uma tabela
    const portfolioCount = await prisma.portfolioItem.count();

    return NextResponse.json({
      status: 'success',
      message: 'Banco conectado com sucesso',
      portfolioCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro de conexão:', error);

    return NextResponse.json({
      status: 'error',
      message: 'Erro ao conectar com banco',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}