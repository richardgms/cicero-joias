'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { QueryProvider } from '@/lib/query-provider';

// Verificação temporária das variáveis de ambiente no client-side
console.log("CLERK PUBLISHABLE KEY (client):", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 10) + "...");
console.log("CLERK SIGN IN URL (client):", process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryProvider>{children}</QueryProvider>
    </ClerkProvider>
  );
} 