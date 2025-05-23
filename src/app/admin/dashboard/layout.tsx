"use client"; // This must be a client component to use hooks like useRequireAuth

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAuth, useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import { Loader2 } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { signOut } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useRequireAuth('/admin/login'); // Protects route client-side
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({ title: 'Logged Out', description: 'Redirecting to login...' });
      router.push('/admin/login');
    } catch (error) {
      toast({ title: 'Logout Failed', description: 'Could not log out.', variant: 'destructive' });
    }
  };
  
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarRail />
      <SidebarInset className="flex flex-col">
        <Header title="Admin Dashboard" showSidebarToggle={true} onLogout={handleLogout} isAdmin={true} />
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-background">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
