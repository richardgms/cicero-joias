---
name: performance-standards
description: Use when designing components, choosing libraries, or optimizing existing features. Trigger when page load is slow or CLS/LCP metrics are poor.
---

# Performance Standards

## Overview
Performance is a feature. A slow application is a broken application.

## When to Use
- **Component Design**: Avoiding unnecessary re-renders.
- **Data Fetching**: Avoiding waterfalls.
- **Assets**: Image optimization, font loading.

## Core Rules

### 1. Server-Side First (Next.js Context)
**Rule**: Fetch data on the server. Send valid HTML/JSON to the client. Minimize client-side JS bundles.

### 2. Image Optimization
**Rule**: Never use `<img>` directly unless absolutely necessary. Use `next/image` or Shadcn avatars which enforce sizing and lazy loading.
- **Must**: Explicit `width` and `height` to prevent layout shift (CLS).

### 3. Data Fetching
**Rule**: Parallelize requests. Avoid Serial Waterfalls.
- **Bad**: `await user(); await posts();` (Sequential)
- **Good**: `Promise.all([user(), posts()])` (Parallel)

### 4. Bundle Size
**Rule**: Import only what you need.
- **Bad**: `import * as _ from 'lodash'`
- **Good**: `import debounce from 'lodash/debounce'`

## Examples

### ❌ Anti-Pattern: Request Waterfall
```typescript
// Component waits for User, THEN waits for Posts
const user = await getUser();
const posts = await getPosts(user.id);
```

### ✅ Performant Pattern: Parallel + Streaming
```typescript
// Start both immediately
const userPromise = getUser();
const postsPromise = getPosts(userId);

// Or better: Use Suspense boundaries to stream parts of the UI
return (
  <>
    <Suspense fallback={<UserSkeleton />}>
      <UserDisplay promise={userPromise} />
    </Suspense>
    <Suspense fallback={<PostsSkeleton />}>
      <PostsDisplay promise={postsPromise} />
    </Suspense>
  </>
)
```

## Rationalizations to Ignore
- "Premature optimization is the root of all evil" -> Structured, performant patterns are not premature; they are baseline competence.
