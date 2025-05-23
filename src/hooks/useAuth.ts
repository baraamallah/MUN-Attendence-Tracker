
// This hook can be used in client components to get the current auth state.
// For route protection, middleware or server-side checks are more robust.
// However, for UI changes based on auth state (e.g., show/hide logout button), this is useful.

"use client";

import { useState, useEffect } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { observeAuthState } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { toast } from "@/hooks/use-toast"; // Ensure toast is imported

interface AuthState {
  user: FirebaseUser | null;
  loading: boolean;
  isAdmin: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuthState((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Any authenticated user is now considered an admin for client-side purposes.
  const isAdmin = !!user;

  return { user, loading, isAdmin };
}

// Hook for protecting client-side routes or components
export function useRequireAuth(redirectUrl: string = "/admin/login") {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in, redirect to login
        router.push(redirectUrl);
      } else if (!isAdmin) {
        // This condition will now only be met if 'user' is null, which is handled above.
        // Kept for logical structure, but effectively means 'user' exists but is not considered admin.
        // With isAdmin = !!user, this branch should not be hit if user exists.
        toast({ title: 'Access Denied', description: 'You are not authorized to view this page.', variant: 'destructive' });
        router.push('/');
      }
      // If user is logged in, isAdmin will be true, and they can stay.
    }
  }, [user, loading, isAdmin, router, redirectUrl]);

  return { user, loading, isAdmin };
}
