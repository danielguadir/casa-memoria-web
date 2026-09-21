'use client';

import Hero from '@/components/Hero';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { activeView } = useAuth();

  if (activeView === 'admin') {
    return (
      <div className="animate-in fade-in duration-300">
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 space-y-0">
      <Hero />
    </div>
  );
}

