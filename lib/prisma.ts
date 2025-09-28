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

  // Adicionar parâmetros de connection pooling se não estiverem na URL
  let optimizedUrl = databaseUrl
  if (isProduction && databaseUrl && !databaseUrl.includes('connection_limit')) {
    const separator = databaseUrl.includes('?') ? '&' : '?'
    optimizedUrl = `${databaseUrl}${separator}connection_limit=10&pool_timeout=20&connect_timeout=60&prepared_statement_cache_size=100`
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    datasources: {
      db: {
        url: optimizedUrl,
      },
    },
    // Configurações específicas para conexão
    transactionOptions: {
      maxWait: 5000, // 5 segundos
      timeout: 10000, // 10 segundos
      isolationLevel: 'ReadCommitted', // Nível de isolamento mais permissivo
    },
  })
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
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Para a primeira tentativa, conectar explicitamente para garantir conexão limpa
      if (attempt === 1) {
        await prisma.$connect();
      }

      return await operation();
    } catch (error) {
      lastError = error as Error;
      const errorMessage = lastError.message.toLowerCase();

      // Verificar diferentes tipos de erro que justificam retry
      const shouldRetry =
        errorMessage.includes('prepared statement') ||
        errorMessage.includes('connection') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('pool') ||
        errorMessage.includes('econnreset') ||
        errorMessage.includes('econnrefused') ||
        errorMessage.includes('server closed the connection unexpectedly');

      // Se não é um erro que justifica retry ou é a última tentativa, lançar o erro
      if (!shouldRetry || attempt === maxRetries) {
        console.error(`Operation failed after ${attempt} attempts:`, {
          error: errorMessage,
          attempt,
          maxRetries,
          timestamp: new Date().toISOString()
        });
        throw error;
      }

      // Log do retry
      console.warn(`Retry attempt ${attempt}/${maxRetries} due to error:`, {
        error: errorMessage,
        attempt,
        timestamp: new Date().toISOString()
      });

      // Aguardar com backoff exponencial antes de tentar novamente
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));

      // Forçar uma nova conexão para limpar prepared statements e conexões órfãs
      try {
        await prisma.$disconnect();
        // Pequena pausa adicional antes de reconectar
        await new Promise(resolve => setTimeout(resolve, 50));
        await prisma.$connect();
      } catch (reconnectError) {
        // Se falhar ao reconectar, continuar com a próxima tentativa
        console.warn(`Failed to reconnect on attempt ${attempt}:`, reconnectError);
      }
    }
  }

  throw lastError;
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