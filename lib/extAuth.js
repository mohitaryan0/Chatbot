// lib/extAuth.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the NEXT_PUBLIC_ prefixed env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found in environment variables. Make sure to add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file.');
}

// Create a dummy client or real client based on available credentials
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        signUp: async () => ({ data: null, error: new Error('Supabase not configured') }),
        signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null }),
        resetPasswordForEmail: async () => ({ data: null, error: new Error('Supabase not configured') }),
        getSession: async () => ({ data: { session: null } }),
        getUser: async () => ({ data: { user: null } }),
        onAuthStateChange: async (callback) => {}
      }
    };

export const auth = {
  // Register a new user
  async register(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },
  
  // Login an existing user
  async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },
  
  // Log out the current user
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  },
  
  // Reset password (send reset email)
  async resetPassword(email) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },
  
  // Get the current user
  async getCurrentUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return { data: { user: null }, error: null };
      }
      
      const { data: { user } } = await supabase.auth.getUser();
      return { data: { user }, error: null };
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      return { data: { user: null }, error };
    }
  },
  
  // Check if the user is authenticated (for page protection)
  async isAuthenticated() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session;
    } catch (error) {
      return false;
    }
  },
  
  // Confirm email with token from confirmation email
  async confirmEmail(token, type = 'signup') {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: type === 'recovery' ? 'recovery' : 'email',
      });
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },
  
  // Listen for auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};
