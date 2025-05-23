import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for a hypothetical authentication token (e.g., a session cookie)
  // In a real Firebase setup, this cookie ('firebaseAuthToken' or similar)
  // would be set after client-side Firebase login, typically by an API route
  // that verifies the Firebase ID token and creates a secure, HttpOnly session cookie.
  const authToken = request.cookies.get('firebaseAuthToken')?.value;

  if (pathname.startsWith('/admin/dashboard')) {
    if (!authToken) {
      // If no auth token, redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirectedFrom', pathname); // Optional: pass redirect info
      return NextResponse.redirect(loginUrl);
    }
    // If token exists, allow access. Further token validation could happen here or server-side.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'], // Apply middleware to all routes under /admin/dashboard
};
