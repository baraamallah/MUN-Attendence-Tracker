
"use client"; // This must be a client component to use hooks like useRequireAuth

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { signOut } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button'; // Added for Access Denied case

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading, isAdmin } = useRequireAuth('/admin/login');
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
  
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Authenticating...</p>
      </div>
    );
  }

  // useRequireAuth should handle redirection if !user or !isAdmin.
  // These checks are defensive for the layout rendering itself.
  if (!user) {
    // This state should ideally not be reached if useRequireAuth redirects properly.
    // If it is, it might indicate an issue with the redirect logic or a race condition.
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Verifying user session...</p>
      </div>
    );
  }

  if (!isAdmin) {
    // This state should also ideally not be reached if useRequireAuth redirects.
    // It indicates the user is logged in but not the designated admin.
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background p-4 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">
          You are not authorized to view this page.
        </p>
        <Button onClick={() => router.push('/')} className="mt-6">
          Go to Homepage
        </Button>
      </div>
    );
  }

  // If we reach here, user is authenticated and is an admin.
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
