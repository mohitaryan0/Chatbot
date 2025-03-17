import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the NEXT_PUBLIC_ prefixed env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const type = searchParams.get('type');
  
  if (!token) {
    // Redirect to error page if token is missing
    return NextResponse.redirect(new URL('/auth/confirm?error=missing_token', request.url));
  }
  
  try {
    // Process the authentication callback
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: type === 'recovery' ? 'recovery' : 'email',
    });
    
    if (error) {
      console.error('Error verifying token:', error);
      return NextResponse.redirect(
        new URL(`/auth/confirm?error=${encodeURIComponent(error.message)}`, request.url)
      );
    }
    
    // Successful verification, redirect to confirmation page
    return NextResponse.redirect(
      new URL(`/auth/confirm?success=true`, request.url)
    );
  } catch (err) {
    console.error('Exception during token verification:', err);
    return NextResponse.redirect(
      new URL('/auth/confirm?error=unexpected_error', request.url)
    );
  }
}
