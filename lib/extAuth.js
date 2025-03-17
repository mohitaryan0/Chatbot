// lib/extAuth.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the NEXT_PUBLIC_ prefixed env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found in environment variables. Make sure to add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const auth = {
  // Register a new user
  register: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    return { data, error };
  },
  
  // Login an existing user
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { data, error };
  },
  
  // Log out the current user
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },
  
  // Reset password (send reset email)
  resetPassword: async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    return { data, error };
  },
  
  // Get the current user
  getCurrentUser: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return { user: null };
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    return { user };
  },
  
  // Check if the user is authenticated (for page protection)
  isAuthenticated: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  }
};

export default auth;
