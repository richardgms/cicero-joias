---
name: security-hardening
description: Use when implementing API endpoints, database queries, authentication flows, or handling user input. Trigger for ANY data entry point.
---

# Security Hardening Standards

## Overview
Security is not an add-on; it is a fundamental part of the development lifecycle.

## When to Use
- **Input Handling**: Forms, API params, URL queries.
- **Data Access**: Database queries, File system access.
- **Authentication/Authorization**: Login, Protected routes, RBAC.

## Core Rules

### 1. Never Trust User Input
**Rule**: Validate ALL input at the boundary (Zod/Yup).
- **Front-end validation is for UX**.
- **Back-end validation is for Security**.

### 2. SQL Injection Prevention
**Rule**: Never concatenate strings into queries. Always use ORM methods or parameterized queries.
- **Context**: Prisma/PostgreSQL.

### 3. Least Privilege
**Rule**: API keys and Database users should only have permissions they strictly need.

### 4. XSS & CSRF
**Rule**: React escapes content by default, but be careful with `dangerouslySetInnerHTML`. Use CSRF tokens for mutations.

## Examples

### ❌ Anti-Pattern: Direct Query with Input
```typescript
// 💀 DANGER
const users = await db.query(`SELECT * FROM users WHERE name = '${req.body.name}'`);
```

### ✅ Secure Pattern: Validation + ORM
```typescript
// 1. Validate Input
const schema = z.object({ name: z.string().min(1) });
const { name } = schema.parse(req.body);

// 2. Safe Query
const users = await prisma.user.findMany({
  where: { name: name } // ORM handles parameterization
});
```

### ❌ Anti-Pattern: Secrets in Code
```typescript
const API_KEY = "12345-secret"; // Committing this leaks it
```

### ✅ Secure Pattern: Environment Variables
```typescript
const API_KEY = process.env.API_KEY; // Loaded from server env
if (!API_KEY) throw new Error("Missing API Key");
```
