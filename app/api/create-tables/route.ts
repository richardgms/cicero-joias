import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    console.log('Criando tabelas via SQL...');

    // Criar enums primeiro
    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CLIENT');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "LoyaltyLevel" AS ENUM ('CLIENT', 'SPECIAL', 'VIP');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "QuoteType" AS ENUM ('REPAIRS', 'GRADUATION_RING', 'WEDDING_RINGS', 'CUSTOM_JEWELRY', 'GOLD_PLATING', 'GLASSES_LENS');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "QuoteStatus" AS ENUM ('NEW', 'CONTACTED', 'IN_NEGOTIATION', 'APPROVED', 'COMPLETED', 'CANCELLED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'DESIGN_APPROVED', 'IN_PRODUCTION', 'READY_FOR_PICKUP', 'COMPLETED', 'CANCELLED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "OrderCategory" AS ENUM ('JEWELRY_SALES', 'REPAIR_SERVICES', 'CUSTOM_SERVICES', 'GOLD_PLATING', 'GRADUATION_RINGS', 'WEDDING_RINGS');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "AttachmentType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "ProductCategory" AS ENUM ('JEWELRY', 'RINGS', 'NECKLACES', 'EARRINGS', 'BRACELETS', 'WATCHES', 'ACCESSORIES');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "PortfolioCategory" AS ENUM ('WEDDING_RINGS', 'REPAIRS_BEFORE_AFTER', 'GOLD_PLATING', 'CUSTOM_JEWELRY', 'GRADUATION_RINGS');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "SitePage" AS ENUM ('HOME', 'ABOUT', 'PORTFOLIO', 'CONTACT');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "CouponType" AS ENUM ('NEW_USER', 'LOYALTY', 'PROMOTIONAL');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "LoyaltyType" AS ENUM ('EARNED', 'REDEEMED', 'EXPIRED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    // Criar tabela portfolio_items
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "portfolio_items" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "description" TEXT,
        "category" "PortfolioCategory" NOT NULL,
        "mainImage" TEXT NOT NULL,
        "images" TEXT[],
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "order" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "detailedDescription" TEXT,
        "specifications" JSONB,
        "seoTitle" TEXT,
        "seoDescription" TEXT,
        "keywords" TEXT[],
        "status" TEXT NOT NULL DEFAULT 'DRAFT',
        "relatedProjects" TEXT[],
        "customCategory" TEXT,
        "productId" TEXT,

        CONSTRAINT "portfolio_items_pkey" PRIMARY KEY ("id")
      );
    `;

    console.log('Tabelas criadas com sucesso!');

    return NextResponse.json({
      status: 'success',
      message: 'Tabelas criadas com sucesso',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro ao criar tabelas:', error);

    return NextResponse.json({
      status: 'error',
      message: 'Erro ao criar tabelas',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}