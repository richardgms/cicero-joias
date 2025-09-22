import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    console.log('Criando tabelas em falta...');

    // Criar tabela activity_logs
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "activity_logs" (
        "id" TEXT NOT NULL,
        "action" TEXT NOT NULL,
        "entity" TEXT NOT NULL,
        "entityId" TEXT NOT NULL,
        "description" TEXT,
        "userId" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
      );
    `;

    // Criar outras tabelas importantes que podem estar faltando
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,

        CONSTRAINT "users_pkey" PRIMARY KEY ("id")
      );
    `;

    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "clients" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT,
        "whatsapp" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "loyaltyPoints" INTEGER NOT NULL DEFAULT 0,
        "loyaltyLevel" "LoyaltyLevel" NOT NULL DEFAULT 'CLIENT',
        "userId" TEXT,

        CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
      );
    `;

    console.log('Tabelas em falta criadas com sucesso!');

    return NextResponse.json({
      status: 'success',
      message: 'Tabelas em falta criadas com sucesso',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro ao criar tabelas em falta:', error);

    return NextResponse.json({
      status: 'error',
      message: 'Erro ao criar tabelas em falta',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}