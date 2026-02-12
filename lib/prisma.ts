import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

// Retry wrapper with special handling for PgBouncer prepared statement errors
export async function executeWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 100
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === maxRetries) break;

      // For prepared statement errors (PgBouncer conflict), disconnect to clear stale connections
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('prepared statement') && errorMessage.includes('already exists')) {
        console.warn(`[Prisma] Prepared statement conflict on attempt ${attempt}, reconnecting...`);
        try {
          await prisma.$disconnect();
        } catch {
          // Ignore disconnect errors
        }
      }

      // Calculate delay with simple exponential backoff
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}
