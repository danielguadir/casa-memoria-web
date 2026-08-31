'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { PublicKioskModal } from './PublicKioskModal';

export default function PublicKioskWrapper() {
  const { isKioskOpen, closeKioskModal } = useAuth();
  return <PublicKioskModal isOpen={isKioskOpen} onClose={closeKioskModal} />;
}
