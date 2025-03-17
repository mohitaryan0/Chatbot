// app/page.tsx
import Chatbot from './chatbot';
import ProtectedRoute from '../components/ProtectedRoute';
import Link from 'next/link';

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Fixed Navbar */}
        <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white py-4 px-6 flex justify-between items-center z-10">
          <div className="text-xl font-bold">AI Code Generator</div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm transition-colors">
            Logout
          </button>
        </nav>
        
        {/* Main Content with Fixed Header */}
        <div className="pt-20 pb-10 px-6 flex flex-col items-center">
          {/* Fixed heading below navbar */}
          <h1 className="text-3xl font-bold mb-8 text-black text-center">Chatbot for HTML & CSS Generation</h1>
          
          {/* Chatbot Component */}
          <Chatbot />
        </div>
      </div>
    </ProtectedRoute>
  );
}
