---
name: ui-ux-design-system
description: Use when styling components, creating layouts, or choosing colors/icons for Cicero Joias.
---

# UI/UX & Design System (Cicero Joias)

## Overview
We aim for a "Premium, State-of-the-Art" aesthetic. Glassmorphism, smooth animations, and refined typography.

## Tech Stack
- **Tailwind CSS**: Utility-first styling.
- **Shadcn/UI**: Headless accessible components.
- **Lucide React**: Iconography.
- **Framer Motion**: Animations (optional but recommended for "Wow" factor).

## Core Rules

### 1. No Arbitrary Values
**Rule**: Don't use magic numbers like `w-[325px]` or `bg-[#123456]`.
- **Use**: Tailwind tokens (`w-1/3`, `bg-primary`, `p-4`).
- **Why**: Consistency. Arbitrary values break the design system curve.

### 2. Shadcn First
**Rule**: Check `components/ui` before building from scratch.
- Need a button? use `<Button>`.
- Need a modal? use `<Dialog>`.
- **Customize**: Override styles via `className`, don't reinvent logic.

### 3. Responsive by Design
**Rule**: Mobile-first approach.
- **Base**: Mobile styles (default).
- **md/lg**: Tablet/Desktop overrides.
- **Example**: `grid-cols-1 md:grid-cols-3` (1 column on mobile, 3 on desktop).

### 4. Interactive Feedback
**Rule**: Every interactive element must provide feedback.
- **Hover**: `hover:bg-accent/80`.
- **Active**: `active:scale-95`.
- **Focus**: `focus-visible:ring`.

## Examples

### ❌ Anti-Pattern: Helper Classes Mixed with Styles
```tsx
// Hard to maintain, ignores theme
<div className="custom-card" style={{ backgroundColor: '#fff', padding: '20px' }}>
  <h2 className="text-[22px] bold">Title</h2>
</div>
```

### ✅ Design System Pattern
```tsx
// Uses theme tokens, responsive, and composable utils
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export function FeatureCard({ className, title }: Props) {
  return (
    <Card className={cn("hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-serif text-primary">
          {title}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
```
