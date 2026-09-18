'use client';

import Home from '@/app/page';
import { useEffect } from 'react';

export default function TejidosPage() {
  useEffect(() => {
    const el = document.getElementById('convocatoria');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return <Home />;
}
