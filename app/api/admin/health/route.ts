import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { checkAdminAuth } from '@/lib/check-admin';
import prisma, { executeWithRetry } from '@/lib/prisma';

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

    // Teste 5: executeWithRetry function
    try {
      const retryStart = Date.now();
      await executeWithRetry(async () => {
        return await prisma.$queryRaw`SELECT 1 as retry_test`;
      });
      const retryDuration = Date.now() - retryStart;
      healthCheck.checks.executeWithRetry = {
        status: 'PASS',
        duration: retryDuration,
        working: true
      };
    } catch (retryError) {
      healthCheck.checks.executeWithRetry = {
        status: 'FAIL',
        error: retryError instanceof Error ? retryError.message : String(retryError)
      };
    }

    // Teste 6: Teste da query exata da API portfolio
    try {
      const portfolioQueryStart = Date.now();
      const portfolioItems = await executeWithRetry(async () => {
        return await prisma.portfolioItem.findMany({
          include: {
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: [
            { order: 'asc' },
            { createdAt: 'desc' },
          ],
          take: 1, // Limitar para teste
        });
      });
      const portfolioQueryDuration = Date.now() - portfolioQueryStart;

      healthCheck.checks.portfolioApiQuery = {
        status: 'PASS',
        duration: portfolioQueryDuration,
        itemsFound: portfolioItems.length,
        hasIncludes: true
      };
    } catch (portfolioApiError) {
      healthCheck.checks.portfolioApiQuery = {
        status: 'FAIL',
        error: portfolioApiError instanceof Error ? portfolioApiError.message : String(portfolioApiError)
      };
    }

    // Teste 7: Verificar variáveis de ambiente críticas
    try {
      const envVars = {
        DATABASE_URL: !!process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      };

      const missingVars = Object.entries(envVars)
        .filter(([key, value]) => key !== 'NODE_ENV' && !value)
        .map(([key]) => key);

      healthCheck.checks.environmentVariables = {
        status: missingVars.length === 0 ? 'PASS' : 'FAIL',
        variables: envVars,
        missing: missingVars,
        databaseUrlFormat: process.env.DATABASE_URL ?
          (process.env.DATABASE_URL.startsWith('postgresql://') ? 'valid' : 'invalid') : 'missing'
      };
    } catch (envError) {
      healthCheck.checks.environmentVariables = {
        status: 'ERROR',
        error: envError instanceof Error ? envError.message : String(envError)
      };
    }

    // Teste 8: Verificar Clerk authentication mais detalhadamente
    try {
      const clerkStart = Date.now();
      const { userId } = await auth();
      const clerkDuration = Date.now() - clerkStart;

      if (userId) {
        try {
          const clerk = await clerkClient();
          const user = await clerk.users.getUser(userId);
          const role = (user.publicMetadata?.role as string)?.toLowerCase();

          healthCheck.checks.clerkDetailed = {
            status: 'PASS',
            duration: clerkDuration,
            hasUserId: true,
            userRole: role,
            isAdmin: role === 'admin'
          };
        } catch (userError) {
          healthCheck.checks.clerkDetailed = {
            status: 'FAIL',
            duration: clerkDuration,
            hasUserId: true,
            error: userError instanceof Error ? userError.message : String(userError)
          };
        }
      } else {
        healthCheck.checks.clerkDetailed = {
          status: 'FAIL',
          duration: clerkDuration,
          hasUserId: false,
          error: 'No user ID found in auth'
        };
      }
    } catch (clerkError) {
      healthCheck.checks.clerkDetailed = {
        status: 'ERROR',
        error: clerkError instanceof Error ? clerkError.message : String(clerkError)
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