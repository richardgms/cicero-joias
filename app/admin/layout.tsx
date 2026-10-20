import { AdminGuard } from '@/components/auth/admin-guard';
import { ClerkScope } from '@/components/auth/clerk-scope';
import { Toaster } from 'sonner';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkScope>
    <AdminGuard>
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="ml-64 flex flex-col">
          {/* Header */}
          <AdminHeader />

          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden bg-gray-50 p-6">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
    {/* Avisos do sonner (toast.success/error) usados nas telas do admin */}
    <Toaster richColors position="top-right" />
    </ClerkScope>
  );
} 