'use client';

import BibliotecaEspecializada from '@/components/BibliotecaEspecializada';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useAuth } from '@/context/AuthContext';

export default function BibliotecaPage() {
  const { activeView } = useAuth();

  if (activeView === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="animate-in fade-in duration-300 py-12">
      <BibliotecaEspecializada />
    </div>
  );
}
