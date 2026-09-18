'use client';

import React from 'react';
import { BookOpen, ExternalLink, Eye } from 'lucide-react';
import { Modal, Button, Badge } from '@/components/design-system';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  previewUrl: string;
  driveUrl?: string;
  viewsCount: number;
}

export default function PdfViewerModal({
  isOpen,
  onClose,
  title,
  previewUrl,
  driveUrl,
  viewsCount
}: PdfViewerModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      title={
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-terracota/20 border border-terracota/40 flex items-center justify-center text-terracota">
            <BookOpen className="w-6 h-6 text-terracota" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-crema tracking-wide truncate max-w-xl">
              Visor Digital — {title}
            </h2>
            <div className="flex items-center space-x-2 text-xs text-crema/70 font-mono">
              <Eye className="w-3.5 h-3.5 text-mostaza" />
              <span>{viewsCount} lecturas acumuladas</span>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        
        {/* Top Control Bar inside Viewer */}
        <div className="bg-crema-dark/60 p-3.5 rounded-2xl border border-crema-dark flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center space-x-2">
            <Badge variant="verde" className="font-bold text-xs py-1 px-3">
              Documento Completo PDF
            </Badge>
            <span className="text-xs text-cafe/70 font-medium hidden sm:inline">
              Lectura en línea segura de la Casa de la Memoria
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {driveUrl && (
              <a
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-crema text-cafe font-bold text-xs rounded-xl border border-crema-dark transition-all shadow-2xs"
                title="Abrir en pestaña de Google Drive"
              >
                <span>Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5 text-terracota" />
              </a>
            )}

            <Button variant="ghost" size="sm" onClick={onClose} className="text-xs font-semibold">
              Cerrar Visor
            </Button>
          </div>
        </div>

        {/* Embedded PDF Viewer Iframe */}
        <div className="w-full h-[75vh] rounded-2xl overflow-hidden border-2 border-crema-dark shadow-2xl bg-cafe/10">
          <iframe
            title={title}
            src={previewUrl}
            width="100%"
            height="100%"
            allow="autoplay"
            style={{ border: 0 }}
            className="w-full h-full rounded-2xl"
          />
        </div>

      </div>
    </Modal>
  );
}
