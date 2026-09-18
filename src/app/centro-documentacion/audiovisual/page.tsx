'use client';

import Home from '@/app/page';
import { useEffect } from 'react';

export default function AudiovisualPage() {
  useEffect(() => {
    const el = document.getElementById('centro-documentacion');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return <Home />;
}
