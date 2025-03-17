"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EmailConfirmPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    // Get URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    const errorParam = searchParams.get('error');
    const successParam = searchParams.get('success');
    
    if (errorParam) {
      setStatus('error');
      if (errorParam === 'missing_token') {
        setMessage('No confirmation token found. Please check your email link.');
      } else if (errorParam === 'unexpected_error') {
        setMessage('An unexpected error occurred while confirming your email. Please try again later.');
      } else {
        setMessage(`There was a problem confirming your email: ${errorParam}`);
      }
    } else if (successParam === 'true') {
      setStatus('success');
      setMessage('Your email has been successfully confirmed! You can now login to your account.');
    } else {
      // No params means this page was visited directly without going through the callback
      setStatus('loading');
      // Automatically redirect to home after a short delay if visited directly
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6">
          Email Confirmation
        </h1>
        
        {status === 'loading' && (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 text-center">{message}</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="text-center space-y-4">
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p>{message}</p>
            </div>
            <Link href="/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md inline-block transition-colors">
              Go to Login
            </Link>
          </div>
        )}
        
        {status === 'error' && (
          <div className="text-center space-y-4">
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <p>{message}</p>
            </div>
            <div className="space-x-4">
              <Link href="/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md inline-block transition-colors">
                Go to Login
              </Link>
              <Link href="/auth/register" className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md inline-block transition-colors">
                Register Again
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
