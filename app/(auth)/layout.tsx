import { ClerkScope } from '@/components/auth/clerk-scope';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <ClerkScope>{children}</ClerkScope>;
}
