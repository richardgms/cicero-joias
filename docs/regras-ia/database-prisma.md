---
name: database-prisma
description: Use when defining data models (schema.prisma), running migrations, or writing database queries.
---

# Database & Prisma Guidelines (Cicero Joias)

## Overview
PostgreSQL via Prisma ORM. We prioritize data integrity and type safety.

## When to Use
- **Modifying Schema**: `prisma/schema.prisma`.
- **Querying**: `await prisma.model...`.
- **Seeds**: `prisma/seed.ts`.

## Core Rules

### 1. Migration Discipline
**Rule**: Never edit the DB directly in production.
- **Flow**:
  1. Edit `schema.prisma`.
  2. `npx prisma migrate dev --name describe_change` (Local).
  3. `npx prisma migrate deploy` (Production).

### 2. Schema Naming
- **Models**: PascalCase, Singular (`User`, `Post`).
- **Fields**: camelCase (`firstName`, `isActive`).
- **Map**: Map models to lowercase plural tables (`@@map("users")`).

### 3. Safe Querying
**Rule**: Use `select` to fetch only what you need (Prevents over-fetching).
- **Bad**: `findMany()` (selects *all* fields, including huge JSON blobs).
- **Good**: `findMany({ select: { id: true, name: true } })`.

### 4. Connections
**Rule**: Use the global singleton instance of PrismaClient in `lib/prisma.ts`.
- **Why**: Prevents "Too many database connections" error in serverless environments (Next.js hot reload).

## Examples

### ❌ Anti-Pattern: New Client Every Time
```typescript
// 💀 Crashes Next.js in dev mode
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); // Creates new connection pool on every file load
```

### ✅ Safe Pattern: Global Singleton
```typescript
// @/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
```

### ❌ Anti-Pattern: N+1 Query Problem
```typescript
const users = await db.user.findMany();
// Loops triggering 100 queries
for (const user of users) {
  const posts = await db.post.findMany({ where: { userId: user.id } });
}
```

### ✅ Safe Pattern: Include/Relation
```typescript
// 1 Query total
const usersWithPosts = await db.user.findMany({
  include: { posts: true }
});
```
