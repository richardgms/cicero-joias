import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('🧪 Portfolio Test POST: Starting...');

    // Teste 1: Verificar se consegue receber o request
    const body = await request.json();
    console.log('✅ Test 1: Request body received:', Object.keys(body));

    // Teste 2: Verificar imports
    console.log('✅ Test 2: Basic imports working');

    return NextResponse.json({
      success: true,
      message: 'API está funcionando',
      receivedFields: Object.keys(body)
    });

  } catch (error) {
    console.error('❌ Portfolio Test POST Error:', error);
    return NextResponse.json(
      {
        error: 'Erro no teste',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Portfolio test endpoint working',
    timestamp: new Date().toISOString()
  });
}