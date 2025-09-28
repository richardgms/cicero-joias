import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('🧪 DEBUG: Starting portfolio debug endpoint...');

  try {
    // Teste 1: Consegue receber o request?
    console.log('🧪 TEST 1: Receiving request...');
    const body = await request.json();
    console.log('✅ TEST 1: Success - body keys:', Object.keys(body));

    // Teste 2: Consegue importar e usar os módulos?
    console.log('🧪 TEST 2: Testing imports...');

    try {
      const { auth } = await import('@clerk/nextjs/server');
      console.log('✅ TEST 2a: Clerk auth imported');

      const { userId } = await auth();
      console.log('✅ TEST 2b: Auth called, userId:', userId ? 'present' : 'missing');
    } catch (authError) {
      console.error('❌ TEST 2: Auth error:', authError);
      return NextResponse.json({
        error: 'Auth test failed',
        details: authError instanceof Error ? authError.message : String(authError)
      }, { status: 500 });
    }

    // Teste 3: Consegue conectar com Prisma?
    console.log('🧪 TEST 3: Testing Prisma...');

    try {
      const prisma = (await import('@/lib/prisma')).default;
      await prisma.$connect();
      console.log('✅ TEST 3: Prisma connection successful');

      // Teste simples de query
      const count = await prisma.portfolioItem.count();
      console.log('✅ TEST 3b: Portfolio count:', count);
    } catch (prismaError) {
      console.error('❌ TEST 3: Prisma error:', prismaError);
      return NextResponse.json({
        error: 'Prisma test failed',
        details: prismaError instanceof Error ? prismaError.message : String(prismaError)
      }, { status: 500 });
    }

    // Se chegou aqui, tudo funcionou
    return NextResponse.json({
      success: true,
      message: 'Todos os testes passaram!',
      tests: {
        request: 'OK',
        auth: 'OK',
        prisma: 'OK'
      }
    });

  } catch (error) {
    console.error('💥 DEBUG: Unexpected error:', error);
    return NextResponse.json({
      error: 'Unexpected error in debug endpoint',
      details: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : String(error)
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Portfolio debug endpoint - use POST to run tests',
    timestamp: new Date().toISOString()
  });
}