import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/check-admin';
import prisma from '@/lib/prisma';

export async function GET() {
  const healthCheck = {
    timestamp: new Date().toISOString(),
    status: 'checking...',
    checks: {} as Record<string, any>
  };

  try {
    // Teste 1: Autenticação
    try {
      const authResult = await checkAdminAuth();
      if ('error' in authResult) {
        healthCheck.checks.auth = {
          status: 'FAIL',
          error: authResult.error,
          statusCode: authResult.status
        };
      } else {
        healthCheck.checks.auth = {
          status: 'PASS',
          userId: authResult.userId
        };
      }
    } catch (authError) {
      healthCheck.checks.auth = {
        status: 'ERROR',
        error: authError instanceof Error ? authError.message : String(authError)
      };
    }

    // Teste 2: Conexão com banco de dados
    try {
      await prisma.$connect();
      healthCheck.checks.database = { status: 'PASS', connection: 'OK' };
    } catch (dbError) {
      healthCheck.checks.database = {
        status: 'FAIL',
        error: dbError instanceof Error ? dbError.message : String(dbError)
      };
    }

    // Teste 3: Query de contagem no portfólio
    try {
      const portfolioCount = await prisma.portfolioItem.count();
      healthCheck.checks.portfolioQuery = {
        status: 'PASS',
        count: portfolioCount
      };
    } catch (queryError) {
      healthCheck.checks.portfolioQuery = {
        status: 'FAIL',
        error: queryError instanceof Error ? queryError.message : String(queryError)
      };
    }

    // Teste 4: Schema do banco
    try {
      const tableInfo = await prisma.$queryRaw`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name IN ('portfolio_items', 'activity_logs')
      `;
      healthCheck.checks.schema = {
        status: 'PASS',
        tables: tableInfo
      };
    } catch (schemaError) {
      healthCheck.checks.schema = {
        status: 'FAIL',
        error: schemaError instanceof Error ? schemaError.message : String(schemaError)
      };
    }

    // Teste 5: Verificar foreign keys que podem causar problemas
    try {
      const fkConstraints = await prisma.$queryRaw`
        SELECT
          tc.table_name,
          kcu.column_name,
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE constraint_type = 'FOREIGN KEY'
        AND tc.table_name = 'portfolio_items'
      `;
      healthCheck.checks.foreignKeys = {
        status: 'PASS',
        constraints: fkConstraints
      };
    } catch (fkError) {
      healthCheck.checks.foreignKeys = {
        status: 'FAIL',
        error: fkError instanceof Error ? fkError.message : String(fkError)
      };
    }

    // Determinar status geral
    const allChecks = Object.values(healthCheck.checks);
    const hasFailures = allChecks.some(check => check.status === 'FAIL' || check.status === 'ERROR');

    healthCheck.status = hasFailures ? 'UNHEALTHY' : 'HEALTHY';

    return NextResponse.json(healthCheck, {
      status: hasFailures ? 500 : 200,
      headers: {
        'X-Health-Status': healthCheck.status,
        'X-Timestamp': healthCheck.timestamp
      }
    });

  } catch (error) {
    healthCheck.status = 'ERROR';
    healthCheck.checks.unexpected = {
      status: 'ERROR',
      error: error instanceof Error ? error.message : String(error)
    };

    return NextResponse.json(healthCheck, {
      status: 500,
      headers: {
        'X-Health-Status': 'ERROR',
        'X-Timestamp': healthCheck.timestamp
      }
    });
  }
}