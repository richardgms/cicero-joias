import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    console.log('Criando tabela activity_logs...');

    // Criar apenas a tabela activity_logs sem enums
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "activity_logs" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
        "action" TEXT NOT NULL,
        "entity" TEXT NOT NULL,
        "entityId" TEXT NOT NULL,
        "description" TEXT,
        "userId" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
      );
    `;

    console.log('Tabela activity_logs criada com sucesso!');

    return NextResponse.json({
      status: 'success',
      message: 'Tabela activity_logs criada com sucesso',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro ao criar tabela activity_logs:', error);

    return NextResponse.json({
      status: 'error',
      message: 'Erro ao criar tabela activity_logs',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}