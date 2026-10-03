'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  X,
  ListOrdered
} from 'lucide-react';
import { Modal, Button } from '@/components/design-system';
import { Chapter } from '@/data/digitalArchiveCatalog';

interface FlipbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  author?: string;
  publisher?: string;
  pdfUrl?: string;
  drivePreviewUrl?: string;
  viewsCount: number;
  chapters?: Chapter[];
}

export default function FlipbookModal({
  isOpen,
  onClose,
  title,
  drivePreviewUrl = 'https://drive.google.com/file/d/1k0QgJfFs3E65ASuHA7_lI5ZA8lAk_RlK/preview',
  viewsCount,
  chapters = []
}: FlipbookModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isChapterDrawerOpen, setIsChapterDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'flipbook' | 'scroll'>('flipbook');

  const totalPages = 280; // Total estimado de páginas para la obra

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 15, 75));
  const handleResetZoom = () => setZoomLevel(100);

  // Dynamic preview URL with page anchor parameter for PDF/Drive viewer page turns
  const getIframeUrl = () => {
    const baseUrl = drivePreviewUrl.replace(/#.*$/, '');
    return `${baseUrl}#page=${currentPage}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      title={
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-mostaza/20 border border-mostaza/40 flex items-center justify-center text-mostaza shrink-0">
            <BookOpen className="w-6 h-6 text-mostaza" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 bg-terracota/20 text-terracota text-[10px] font-bold uppercase rounded-md border border-terracota/30">
                Visor Flipbook Digital
              </span>
              <span className="text-xs text-crema/70 font-mono flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-mostaza" />
                <span>{viewsCount} lecturas</span>
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-serif text-crema tracking-wide truncate max-w-xl">
              {title}
            </h2>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        
        {/* Barra Superior de Control del Lector */}
        <div className="bg-verde-profundo text-crema p-3 sm:p-4 rounded-2xl border border-crema/10 flex flex-wrap items-center justify-between gap-3 shadow-md">
          
          {/* Selector de Modos y Capítulos */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsChapterDrawerOpen(!isChapterDrawerOpen)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-terracota hover:bg-mostaza hover:text-cafe text-crema font-bold text-xs rounded-xl transition-colors shadow-2xs cursor-pointer"
            >
              <ListOrdered className="w-4 h-4" />
              <span>Índice ({chapters.length})</span>
            </button>

            <div className="hidden sm:flex bg-crema-dark/20 p-1 rounded-xl border border-crema/10 text-xs font-bold">
              <button
                onClick={() => setViewMode('flipbook')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${viewMode === 'flipbook' ? 'bg-mostaza text-cafe shadow-xs' : 'text-crema/80 hover:text-crema'}`}
              >
                Modo Libro Flip
              </button>
              <button
                onClick={() => setViewMode('scroll')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${viewMode === 'scroll' ? 'bg-mostaza text-cafe shadow-xs' : 'text-crema/80 hover:text-crema'}`}
              >
                Modo Continuo
              </button>
            </div>
          </div>

          {/* Navegador de Páginas */}
          <div className="flex items-center space-x-2 bg-crema-dark/30 px-3 py-1.5 rounded-xl border border-crema/10">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-1 text-crema/80 hover:text-mostaza disabled:opacity-30 cursor-pointer"
              title="Página anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-1 font-mono text-xs text-crema">
              <span>Pág.</span>
              <input
                type="number"
                value={currentPage}
                onChange={(e) => setCurrentPage(Math.max(1, Math.min(totalPages, Number(e.target.value))))}
                className="w-12 text-center bg-white/10 text-mostaza font-bold rounded border border-crema/20 py-0.5"
              />
              <span className="text-crema/60">/ {totalPages}</span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-1 text-crema/80 hover:text-mostaza disabled:opacity-30 cursor-pointer"
              title="Página siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Controles de Zoom & Acciones */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-crema-dark/30 px-2 py-1 rounded-xl border border-crema/10 text-xs">
              <button onClick={handleZoomOut} className="p-1 hover:text-mostaza text-crema/80 cursor-pointer" title="Alejar">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] text-mostaza font-bold">{zoomLevel}%</span>
              <button onClick={handleZoomIn} className="p-1 hover:text-mostaza text-crema/80 cursor-pointer" title="Acercar">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={handleResetZoom} className="p-1 hover:text-mostaza text-crema/60 cursor-pointer" title="Restablecer">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <Button variant="ghost" size="sm" onClick={onClose} className="text-xs font-semibold text-crema/80 hover:text-crema">
              Cerrar
            </Button>
          </div>
        </div>

        {/* Panel Desplegable de Capítulos */}
        {isChapterDrawerOpen && chapters.length > 0 && (
          <div className="bg-white text-cafe p-4 rounded-2xl border border-crema-dark shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-crema-dark/60 pb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-verde-profundo flex items-center gap-1.5">
                <ListOrdered className="w-4 h-4 text-terracota" />
                Tabla de Contenido de la Obra ({chapters.length} Secciones)
              </span>
              <button onClick={() => setIsChapterDrawerOpen(false)} className="text-cafe/60 hover:text-cafe p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {chapters.map((ch) => (
                <button
                  key={ch.number}
                  onClick={() => {
                    setCurrentPage(typeof ch.number === 'number' ? Math.max(1, ch.number * 10) : 1);
                    setIsChapterDrawerOpen(false);
                  }}
                  className="text-left p-2 bg-crema-dark/40 hover:bg-terracota hover:text-crema text-xs rounded-xl font-medium transition-colors flex items-center space-x-2 truncate cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-md bg-verde-profundo text-crema text-[10px] font-bold font-mono flex items-center justify-center shrink-0">
                    {ch.number}
                  </span>
                  <span className="truncate">{ch.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ÁREA PRINCIPAL DEL LECTOR INTERACTIVO TIPO FLIPBOOK */}
        <div 
          className="w-full h-[74vh] rounded-3xl overflow-hidden border-2 border-crema-dark shadow-2xl bg-cafe/15 relative flex items-center justify-center transition-transform"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Iframe con Visor Integrado y Key por Página para recarga suave */}
          <iframe
            key={`flipbook_page_${currentPage}`}
            title={title}
            src={getIframeUrl()}
            width="100%"
            height="100%"
            allow="autoplay"
            style={{ border: 0 }}
            className="w-full h-full rounded-3xl"
          />

          {/* Overlay de navegación de páginas en laterales */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-verde-profundo/80 hover:bg-verde-profundo text-crema rounded-full shadow-2xl backdrop-blur-md border border-crema/20 transition-all opacity-80 hover:opacity-100 disabled:opacity-0 cursor-pointer hidden sm:flex"
            title="Página Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-verde-profundo/80 hover:bg-verde-profundo text-crema rounded-full shadow-2xl backdrop-blur-md border border-crema/20 transition-all opacity-80 hover:opacity-100 disabled:opacity-0 cursor-pointer hidden sm:flex"
            title="Página Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </Modal>
  );
}
