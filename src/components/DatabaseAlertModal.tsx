'use client';

import React from 'react';
import { AlertTriangle, Database, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';
import { Modal, Button, Badge } from '@/components/design-system';

interface DatabaseAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle?: string;
}

export default function DatabaseAlertModal({
  isOpen,
  onClose,
  documentTitle = 'CUMBE RENACIENTE. Una historia Etnográfica Andina'
}: DatabaseAlertModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center space-x-2 text-terracota font-serif">
          <Database className="w-6 h-6 text-terracota animate-pulse" />
          <span>Base de datos en Desarrollo</span>
        </div>
      }
      subtitle="Casa de la Memoria del Gran Cumbal — Repositorio Digital"
      size="md"
    >
      <div className="space-y-6 py-2">
        {/* Banner de Estado de Alerta */}
        <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-4 sm:p-5 flex items-start space-x-4 shadow-sm">
          <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-700 shrink-0 mt-0.5">
            <AlertTriangle className="w-6 h-6 animate-bounce" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="font-serif font-bold text-lg text-verde-profundo">
                Estado de Alerta del Sistema
              </h4>
              <Badge variant="terracota" className="text-[11px] font-mono tracking-wider uppercase">
                EN DESARROLLO
              </Badge>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-amber-900 leading-relaxed">
              Base de datos de Casa de la Memoria en desarrollo.
            </p>
          </div>
        </div>

        {/* Detalle explicativo sobre el libro solicitado */}
        <div className="bg-crema-dark/50 rounded-2xl p-4 border border-crema-dark space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cafe/70">
            <Lock className="w-4 h-4 text-terracota" />
            <span>Documento Consultado</span>
          </div>
          <p className="font-serif font-bold text-base text-verde-profundo border-l-3 border-terracota pl-3">
            {documentTitle}
          </p>
          <p className="text-xs text-cafe/80 leading-relaxed font-sans">
            El archivo PDF y los nodos de almacenamiento en la nube para este texto de la colección etnográfica están siendo configurados dentro de la arquitectura de datos relacional de la Casa de la Memoria.
          </p>
        </div>

        {/* Pasos / Hoja de ruta técnica */}
        <div className="space-y-2 text-xs font-medium text-cafe/90 bg-crema/40 p-4 rounded-xl border border-crema-dark/60">
          <div className="flex items-center space-x-2 font-bold text-verde-profundo text-xs uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-terracota" />
            <span>Acciones en Proceso Técnico</span>
          </div>
          <div className="flex items-center space-x-2 text-cafe/90">
            <CheckCircle2 className="w-4 h-4 text-verde-profundo shrink-0" />
            <span>Ficha de catalogación y metadatos etnográficos verificados (ICANH).</span>
          </div>
          <div className="flex items-center space-x-2 text-cafe/90">
            <CheckCircle2 className="w-4 h-4 text-verde-profundo shrink-0" />
            <span>Esquema de base de datos relacional (Supabase / PostgreSQL) estructurado.</span>
          </div>
          <div className="flex items-center space-x-2 text-cafe/60 italic">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0 ml-1 mr-1" />
            <span>Vinculación de visor seguro de archivos PDF en curso.</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="pt-2 flex justify-end space-x-3">
          <Button
            variant="terracota"
            onClick={onClose}
            className="w-full sm:w-auto px-6 font-semibold shadow-md"
          >
            Entendido
          </Button>
        </div>
      </div>
    </Modal>
  );
}
