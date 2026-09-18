'use client';

import Home from '@/app/page';
import { useEffect } from 'react';

export default function NosotrosPage() {
  useEffect(() => {
    const el = document.getElementById('sobre-el-proceso');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return <Home />;
}
