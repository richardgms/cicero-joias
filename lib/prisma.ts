import { PrismaClient } from '@prisma/client'

// Prevenindo múltiplas instâncias do Prisma em desenvolvimento
declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export default prisma 