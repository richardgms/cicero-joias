import { AdminGuard } from '@/components/auth/admin-guard';
import { ClerkScope } from '@/components/auth/clerk-scope';
import { Toaster } from 'sonner';
import { AdminShell } from '@/components/admin/admin-shell';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkScope>
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
    {/* Avisos do sonner (toast.success/error) usados nas telas do admin */}
    <Toaster richColors position="top-right" />
    </ClerkScope>
  );
}
