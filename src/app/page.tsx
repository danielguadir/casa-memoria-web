'use client';

import Hero from '@/components/Hero';
import SobreProceso from '@/components/SobreProceso';
import Convocatoria from '@/components/Convocatoria';
import Memoria from '@/components/Memoria';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { activeView, activeSection } = useAuth();

  if (activeView === 'admin') {
    return (
      <div className="animate-in fade-in duration-300">
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 space-y-0">
      {activeSection === 'inicio' && <Hero />}
      {activeSection === 'sobre-el-proceso' && <SobreProceso />}
      {activeSection === 'convocatoria' && <Convocatoria />}
      {activeSection === 'memoria' && <Memoria />}
    </div>
  );
}
