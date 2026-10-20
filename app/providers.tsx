'use client';

import { QueryProvider } from '@/lib/query-provider';

// O ClerkProvider fica só no admin e nas telas de login (components/auth/clerk-scope.tsx)
export function Providers({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
