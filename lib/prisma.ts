import { PrismaClient } from '@prisma/client'

// Prevenindo múltiplas instâncias do Prisma em desenvolvimento
declare global {
  var prisma: PrismaClient | undefined
}

// Configuração otimizada para evitar conflitos de prepared statements
const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
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
      return await operation();
    } catch (error) {
      lastError = error as Error;
      const errorMessage = lastError.message;

      // Verificar se é um erro de prepared statement
      const isPreparedStatementError =
        errorMessage.includes('prepared statement') &&
        errorMessage.includes('already exists');

      // Se não é um erro de prepared statement ou é a última tentativa, lançar o erro
      if (!isPreparedStatementError || attempt === maxRetries) {
        throw error;
      }

      // Aguardar com backoff exponencial antes de tentar novamente
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));

      // Forçar uma nova conexão para limpar prepared statements
      try {
        await prisma.$disconnect();
        await prisma.$connect();
      } catch (reconnectError) {
        // Se falhar ao reconectar, continuar com a próxima tentativa
        console.warn(`Falha ao reconectar na tentativa ${attempt}:`, reconnectError);
      }
    }
  }

  throw lastError;
}

export default prisma 