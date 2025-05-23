// This hook can be used in client components to get the current auth state.
// For route protection, middleware or server-side checks are more robust.
// However, for UI changes based on auth state (e.g., show/hide logout button), this is useful.

"use client";

import { useState, useEffect } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { observeAuthState } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

interface AuthState {
  user: FirebaseUser | null;
  loading: boolean;
  isAdmin: boolean; // Simple check, could be enhanced with custom claims
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

  // A simple isAdmin check. In a real app, this might involve checking custom claims.
  const isAdmin = !!user; 

  return { user, loading, isAdmin };
}

// Hook for protecting client-side routes or components
export function useRequireAuth(redirectUrl: string = "/admin/login") {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectUrl);
    }
  }, [user, loading, router, redirectUrl]);

  return { user, loading };
}
