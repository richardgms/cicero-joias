import { PrismaClient } from '@prisma/client'

// Prevenindo múltiplas instâncias do Prisma em desenvolvimento
declare global {
  var prisma: PrismaClient | undefined
}

// Configuração otimizada para evitar conflitos de prepared statements
const createPrismaClient = () => {
  // Configurar URL do banco com parâmetros de connection pooling para produção
  const databaseUrl = process.env.DATABASE_URL || ''
  const isProduction = process.env.NODE_ENV === 'production'
  const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME

  // Configurações específicas para ambiente serverless
  let optimizedUrl = databaseUrl
  if (isProduction && databaseUrl && isServerless) {
    // Para ambientes serverless, usar configurações mais conservadoras
    const urlParams = new URLSearchParams()

    // Configurações para Netlify/serverless
    if (!databaseUrl.includes('connection_limit')) {
      urlParams.append('connection_limit', '3') // Limite baixo para serverless
    }
    if (!databaseUrl.includes('pool_timeout')) {
      urlParams.append('pool_timeout', '10') // Timeout mais baixo
    }
    if (!databaseUrl.includes('connect_timeout')) {
      urlParams.append('connect_timeout', '30') // Timeout de conexão mais baixo
    }
    if (!databaseUrl.includes('prepared_statement_cache_size')) {
      urlParams.append('prepared_statement_cache_size', '50') // Cache menor
    }
    // Configurações específicas para PostgreSQL serverless
    if (!databaseUrl.includes('schema_search_path')) {
      urlParams.append('schema_search_path', 'public')
    }
    if (!databaseUrl.includes('sslmode')) {
      urlParams.append('sslmode', 'require')
    }

    const separator = databaseUrl.includes('?') ? '&' : '?'
    optimizedUrl = `${databaseUrl}${separator}${urlParams.toString()}`
  }

  const clientConfig: any = {
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    datasources: {
      db: {
        url: optimizedUrl,
      },
    },
  }

  // Configurações específicas para ambiente serverless
  if (isServerless) {
    clientConfig.transactionOptions = {
      maxWait: 3000, // 3 segundos para serverless
      timeout: 8000, // 8 segundos para serverless
      isolationLevel: 'ReadCommitted',
    }

    // Configurações específicas do Prisma para serverless
    clientConfig.errorFormat = 'minimal'

    // Log mais verboso em caso de problemas
    if (process.env.DEBUG_PRISMA === 'true') {
      clientConfig.log = ['query', 'info', 'warn', 'error']
    }
  } else {
    // Configurações para desenvolvimento/ambiente não-serverless
    clientConfig.transactionOptions = {
      maxWait: 5000,
      timeout: 10000,
      isolationLevel: 'ReadCommitted',
    }
  }

  console.log(`🔧 Prisma: Creating client for ${isServerless ? 'serverless' : 'traditional'} environment`);
  console.log(`🔧 Prisma: URL parameters - ${optimizedUrl.split('?')[1] || 'none'}`);

  return new PrismaClient(clientConfig)
}

export const prisma = globalThis.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

// Graceful shutdown para limpeza adequada de conexões
if (process.env.NODE_ENV === 'production') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
  })
}

// Função utilitária para executar operações com retry em caso de conflito de prepared statement
export async function executeWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 100
): Promise<T> {
  const requestId = Math.random().toString(36).substring(7);
  const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
  let lastError: Error | undefined;

  // Ajustar retries para ambiente serverless
  const actualMaxRetries = isServerless ? Math.min(maxRetries, 2) : maxRetries;
  const actualBaseDelay = isServerless ? Math.max(baseDelay, 200) : baseDelay;

  console.log(`🔄 [${requestId}] executeWithRetry: Starting operation (${actualMaxRetries} max retries, ${actualBaseDelay}ms base delay)`);

  for (let attempt = 1; attempt <= actualMaxRetries; attempt++) {
    const attemptStart = Date.now();

    try {
      // Para ambientes serverless, sempre conectar antes da operação
      if (isServerless || attempt === 1) {
        console.log(`🔌 [${requestId}] Attempt ${attempt}: Ensuring connection...`);
        await prisma.$connect();
      }

      console.log(`⚡ [${requestId}] Attempt ${attempt}: Executing operation...`);
      const result = await operation();
      const attemptDuration = Date.now() - attemptStart;

      console.log(`✅ [${requestId}] Attempt ${attempt}: Success in ${attemptDuration}ms`);
      return result;

    } catch (error) {
      lastError = error as Error;
      const attemptDuration = Date.now() - attemptStart;
      const errorMessage = lastError.message.toLowerCase();

      console.warn(`❌ [${requestId}] Attempt ${attempt}: Failed in ${attemptDuration}ms - ${lastError.message}`);

      // Verificar diferentes tipos de erro que justificam retry
      const isPreparedStatementError =
        errorMessage.includes('prepared statement') && errorMessage.includes('already exists');

      const isConnectionError =
        errorMessage.includes('connection') ||
        errorMessage.includes('econnreset') ||
        errorMessage.includes('econnrefused') ||
        errorMessage.includes('server closed the connection unexpectedly') ||
        errorMessage.includes('connection terminated unexpectedly');

      const isTimeoutError =
        errorMessage.includes('timeout') ||
        errorMessage.includes('query timeout') ||
        errorMessage.includes('server timeout');

      const isPoolError =
        errorMessage.includes('pool') ||
        errorMessage.includes('too many connections') ||
        errorMessage.includes('connection pool');

      const isServerlessSpecificError =
        errorMessage.includes('function timeout') ||
        errorMessage.includes('lambda timeout') ||
        errorMessage.includes('execution time limit');

      const shouldRetry = isPreparedStatementError || isConnectionError || isTimeoutError ||
                         isPoolError || isServerlessSpecificError;

      // Log detalhado do tipo de erro
      if (isPreparedStatementError) {
        console.warn(`🔄 [${requestId}] Detected prepared statement error on attempt ${attempt}`);
      } else if (isConnectionError) {
        console.warn(`🔌 [${requestId}] Detected connection error on attempt ${attempt}`);
      } else if (isTimeoutError) {
        console.warn(`⏰ [${requestId}] Detected timeout error on attempt ${attempt}`);
      } else if (isPoolError) {
        console.warn(`🏊 [${requestId}] Detected pool error on attempt ${attempt}`);
      } else if (isServerlessSpecificError) {
        console.warn(`☁️ [${requestId}] Detected serverless error on attempt ${attempt}`);
      }

      // Se não é um erro que justifica retry ou é a última tentativa, lançar o erro
      if (!shouldRetry || attempt === actualMaxRetries) {
        console.error(`💥 [${requestId}] Operation failed definitively after ${attempt} attempts:`, {
          error: errorMessage,
          errorType: lastError.name,
          attempt,
          maxRetries: actualMaxRetries,
          totalDuration: Date.now() - attemptStart,
          shouldRetry,
          isLastAttempt: attempt === actualMaxRetries,
          timestamp: new Date().toISOString()
        });
        throw error;
      }

      // Calcular delay com jitter para evitar thundering herd
      const jitter = Math.random() * 0.3; // 30% de variação aleatória
      const delay = Math.floor((actualBaseDelay * Math.pow(2, attempt - 1)) * (1 + jitter));

      console.warn(`⏳ [${requestId}] Retrying in ${delay}ms (attempt ${attempt + 1}/${actualMaxRetries})`);

      // Aguardar antes de tentar novamente
      await new Promise(resolve => setTimeout(resolve, delay));

      // Estratégia de reconexão específica para cada tipo de erro
      try {
        if (isPreparedStatementError || isConnectionError || isPoolError) {
          console.log(`🔌 [${requestId}] Force disconnecting due to ${isPreparedStatementError ? 'prepared statement' : 'connection/pool'} error`);
          await prisma.$disconnect();

          // Pausa adicional para prepared statement errors
          const reconnectDelay = isPreparedStatementError ? 100 : 50;
          await new Promise(resolve => setTimeout(resolve, reconnectDelay));

          console.log(`🔌 [${requestId}] Force reconnecting...`);
          await prisma.$connect();
          console.log(`✅ [${requestId}] Reconnection successful`);
        }
      } catch (reconnectError) {
        console.warn(`⚠️ [${requestId}] Reconnection failed (will continue anyway):`, reconnectError);
        // Continuar mesmo se a reconexão falhar - o Prisma pode se recuperar sozinho
      }
    }
  }

  // Este ponto nunca deve ser alcançado devido à lógica acima, mas incluído por segurança
  throw lastError || new Error(`[${requestId}] Operation failed after ${actualMaxRetries} attempts`);
}

// Função de health check para verificar conexão com o banco
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await executeWithRetry(async () => {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    }, 2, 50);
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

export default prisma 