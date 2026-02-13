import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

// Simple retry wrapper — retries on error but NEVER calls prisma.$disconnect().
// The old version called $disconnect() on prepared statement errors, which killed
// ALL connections in the pool and caused cascading 50s+ timeouts.
export async function executeWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 2,
  baseDelay: number = 200
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === maxRetries) break;

      // Simple backoff without disconnecting
      const delay = baseDelay * attempt;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}
