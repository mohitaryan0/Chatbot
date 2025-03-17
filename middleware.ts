import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware handles Supabase auth session management and redirects for auth callbacks
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });
  
  // Refresh session if expired
  await supabase.auth.getSession();
  
  return res;
}

// Only run the middleware on auth-related routes 
export const config = {
  matcher: [
    '/auth/callback',
    '/auth/confirm',
    '/auth/login',
    '/auth/register'
  ],
};
