'use client';

import Home from '@/app/page';
import { useEffect } from 'react';

export default function ContactoPage() {
  useEffect(() => {
    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return <Home />;
}
