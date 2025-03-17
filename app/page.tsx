// app/page.tsx
import Chatbot from './chatbot';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gray-100">
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
