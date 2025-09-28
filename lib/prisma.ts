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

export default prisma 