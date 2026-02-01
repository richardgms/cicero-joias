---
name: clean-code-principles
description: Use when writing or refactoring code in any language. Defines universal standards for naming, function size, modularity, and comments. Trigger when starting new implementation or reviewing code quality.
---

# Clean Code Principles

## Overview
Universal coding standards to ensure readability, maintainability, and portability. Code is read more often than it is written.

## When to Use
- **Always** when writing new code.
- **Refactoring** legacy systems.
- **Code Reviews** and PRs.

## Core Rules

### 1. Naming Conventions
**Rule**: Names must reveal intent.
- **Bad**: `const d; // elapsed time in days`
- **Good**: `const elapsedTimeInDays;`
- **Bad**: `function getThem() { ... }`
- **Good**: `function getActiveUsers() { ... }`

### 2. Functions
**Rule**: Functions should do one thing, do it well, and do it only.
- **Limit**: Ideal < 20 lines. Hard limit 50 lines.
- **Arguments**: Max 3. If more, use a configuration object.
- **Side Effects**: Avoid hidden side effects (e.g., updating a global state in a "get" function).

### 3. DRY (Don't Repeat Yourself) & SOLID
- **DRY**: Logic duplicated > 2 times must be extracted to a helper/utility.
- **Single Responsibility**: A class/module should have one reason to change.

### 4. Comments
**Rule**: Comments explain *WHY*, not *WHAT*.
- **Bad**: `x = x + 1; // Increment x`
- **Good**: `// Retrying connection because unstable network in region`

## Examples (TypeScript/React)

### ❌ Anti-Pattern: The God Component
```typescript
// UserProfile.tsx
// Fetches data, handles validation, parses dates, and renders UI
const UserProfile = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(data => {
      // Logic mixed with UI
      if (data.age > 18) { ... }
    })
  }, []);

  return <div>...</div>
}
```

### ✅ Clean Pattern: Separation of Concerns
```typescript
// hooks/useUser.ts
const useUser = () => { /* fetching logic */ }

// utils/validation.ts
const isAdult = (user: User) => user.age >= 18;

// UserProfile.tsx
const UserProfile = () => {
  const { user } = useUser();
  if (!user) return <Loading />;
  
  return <div>{isAdult(user) ? <AdultContent /> : <ChildContent />}</div>;
}
```

## Common Rationalizations (Don't Do This)
- "I'll clean this up later" -> You won't.
- "It's just a small script" -> Small scripts grow.
- "Long variable names take too long to type" -> We have autocomplete.
