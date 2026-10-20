---
name: nextjs-15-app-router
description: Use when creating pages, layouts, API routes, or data fetching logic in the Cicero Joias project.
---

# Next.js 15 App Router Guidelines (Cicero Joias)

## Overview
We use Next.js 15 with App Router. This requires a mental shift from "Client by Default" to "Server by Default".

## When to Use
- **Routing**: Creating new pages in `app/`.
- **Interactivity**: Adding `onClick` handlers (requires `'use client'`).
- **Data**: Fetching from Prisma.

## Core Rules

### 1. Server Components by Default
**Rule**: Components are Server Components unless explicitly marked `'use client'`.
- **Benefit**: No bundle size, direct DB access, SEO friendly.
- **When to add 'use client'**:
  - `useState`, `useEffect`.
  - Event listeners (`onClick`).
  - Browser APIs (`window`, `localStorage`).

### 2. Async Server Components
**Rule**: Fetch data directly in the component using `await`.
- **No**: `useEffect(() => fetch...)`
- **Yes**: `const data = await prisma.model.findMany()`

### 3. Server Actions for Mutations
**Rule**: Use Server Actions (`'use server'`) for form submissions and mutations instead of API Routes (`app/api/...`) where possible.
- **Why**: Type safety, no explicit fetch code, integrated validation.

## Examples

### ❌ Anti-Pattern: Client-Side Fetching (The Old Way)
```tsx
'use client';
import { useState, useEffect } from 'react';

export default function Page() {
  const [data, setData] = useState(null);
  // 🐢 Waterfall, SEO hostile, Large bundle
  useEffect(() => fetch('/api/data').then(...), []); 
  if (!data) return <Spinner />;
  return <div>{data.title}</div>;
}
```

### ✅ Modern Pattern: Server Component
```tsx
// app/page.tsx
import { db } from '@/lib/prisma'; // Direct DB access

export default async function Page() {
  // ⚡ Fast, No bundle, SEO ready
  const data = await db.post.findFirst(); 
  return <div>{data?.title}</div>;
}
```

### ✅ Modern Pattern: Interactivity Island
```tsx
// app/page.tsx (Server)
import InteractiveButton from './InteractiveButton';

export default async function Page() {
  return (
    <div>
      <h1>Static Content (Server)</h1>
      <InteractiveButton /> {/* Client Island */}
    </div>
  )
}

// InteractiveButton.tsx (Client)
'use client';
export default function InteractiveButton() {
  return <button onClick={() => alert('Hi')}>Click Me</button>;
}
```
