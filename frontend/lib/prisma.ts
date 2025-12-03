import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  adapter: PrismaLibSql | undefined
}

const createPrismaClient = () => {
  const url = process.env.DATABASE_URL || 'file:./dev.db'
  
  // Reuse adapter instance
  if (!globalForPrisma.adapter) {
    globalForPrisma.adapter = new PrismaLibSql({ url })
  }
  
  return new PrismaClient({
    adapter: globalForPrisma.adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
