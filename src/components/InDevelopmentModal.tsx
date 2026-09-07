'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal, Button } from '@/components/design-system';

interface InDevelopmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName?: string;
}

export default function InDevelopmentModal({
  isOpen,
  onClose,
}: InDevelopmentModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-terracota" />
          <span>Estado del Sistema</span>
        </div>
      }
      subtitle="Casa de la Memoria del Gran Cumbal"
      size="sm"
    >
      <div className="space-y-6 text-center py-4">
        {/* Alerta Visual Simple */}
        <div className="mx-auto w-16 h-16 rounded-full bg-[#a69cac]/20 border-2 border-[#a69cac] flex items-center justify-center text-verde-profundo shadow-sm">
          <AlertTriangle className="w-8 h-8 text-terracota animate-pulse" />
        </div>

        {/* Mensaje Conciso: Comando en Desarrollo */}
        <div className="space-y-2">
          <h4 className="text-2xl font-serif font-bold text-verde-profundo">
            Comando en desarrollo
          </h4>
          <p className="text-xs font-semibold uppercase tracking-wider text-terracota">
            Estado de alerta / En proceso técnico
          </p>
        </div>

        {/* Botón Entendido */}
        <div className="pt-2 flex justify-center">
          <Button
            variant="terracota"
            onClick={onClose}
            className="px-8 shadow-md font-semibold"
          >
            Entendido
          </Button>
        </div>
      </div>
    </Modal>
  );
}
