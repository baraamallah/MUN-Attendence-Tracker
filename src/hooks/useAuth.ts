
// This hook can be used in client components to get the current auth state.
// For route protection, middleware or server-side checks are more robust.
// However, for UI changes based on auth state (e.g., show/hide logout button), this is useful.

"use client";

import { useState, useEffect } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { observeAuthState } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

// Define the UID of the sole administrator
const ADMIN_UID = "B4ZSELBHYFdyjlN5m0KwFnJwNr73";

interface AuthState {
  user: FirebaseUser | null;
  loading: boolean;
  isAdmin: boolean; 
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = observeAuthState((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Check if the logged-in user's UID matches the ADMIN_UID
  const isAdmin = user ? user.uid === ADMIN_UID : false; 

  return { user, loading, isAdmin };
}

// Hook for protecting client-side routes or components
export function useRequireAuth(redirectUrl: string = "/admin/login") {
  const { user, loading, isAdmin } = useAuth(); // Get isAdmin state as well
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in, redirect to login
        router.push(redirectUrl);
      } else if (!isAdmin) {
        // Logged in, but not the designated admin
        // Redirect to a public page or a "not authorized" page
        // For now, let's redirect to the homepage as an example
        toast({ title: 'Access Denied', description: 'You are not authorized to view this page.', variant: 'destructive' });
        router.push('/'); 
      }
      // If user is logged in AND isAdmin is true, they can stay.
    }
  }, [user, loading, isAdmin, router, redirectUrl]);

  return { user, loading, isAdmin };
}

// It's good practice to also import toast if it's used, assuming it's available
// If not used directly here but in components consuming this hook, it's fine.
// For the example redirection, we'd need toast.
import { toast } from "@/hooks/use-toast";
