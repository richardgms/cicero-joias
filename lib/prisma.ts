import { PrismaClient } from '@prisma/client'

// Declaração para preservar o cliente Prisma entre hot-reloads em desenvolvimento
declare global {
  var prisma: PrismaClient | undefined
}

// Instância do PrismaClient (singleton)
const prisma = global.prisma || new PrismaClient()

// Atribui a instância para reutilização em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma 