'use client';

import React from 'react';
import { Hammer, Sparkles, AlertTriangle } from 'lucide-react';
import { Modal, Button } from '@/components/design-system';

interface InDevelopmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName?: string;
}

export default function InDevelopmentModal({
  isOpen,
  onClose,
  itemName,
}: InDevelopmentModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center space-x-2">
          <Hammer className="w-6 h-6 text-mostaza animate-bounce" />
          <span>Acción en Desarrollo</span>
        </div>
      }
      subtitle="Casa de la Memoria del Gran Cumbal"
      size="md"
    >
      <div className="space-y-5 text-center py-2">
        <div className="mx-auto w-16 h-16 rounded-full bg-mostaza/20 border-2 border-mostaza flex items-center justify-center text-verde-profundo shadow-inner">
          <Sparkles className="w-8 h-8 text-terracota" />
        </div>

        <div className="space-y-2">
          <h4 className="text-2xl font-serif font-bold text-verde-profundo">
            Comando o acción en desarrollo
          </h4>
          {itemName ? (
            <p className="text-sm font-medium text-cafe leading-relaxed">
              La sección <span className="font-bold text-terracota">“{itemName}”</span> se encuentra actualmente en fase de estructuración y construcción participativa.
            </p>
          ) : (
            <p className="text-sm font-medium text-cafe leading-relaxed">
              Esta funcionalidad se encuentra en proceso de formulación e implementación técnica.
            </p>
          )}
        </div>

        <div className="p-3.5 bg-crema-dark/70 border border-mostaza/40 rounded-xl text-xs text-cafe/80 text-left flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-mostaza shrink-0 mt-0.5" />
          <span>
            Estamos trabajando para disponibilizar el catálogo digital y archivos comunitarios en una próxima actualización.
          </span>
        </div>

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
