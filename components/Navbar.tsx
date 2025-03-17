"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import auth from '../lib/extAuth';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on component mount
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const { user } = await auth.getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.logout();
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          AI Code Generator
        </Link>
        
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="w-4 h-4 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-300 text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded text-sm transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
