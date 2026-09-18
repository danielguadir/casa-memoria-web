'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  User, 
  FileText, 
  Sparkles, 
  Tag, 
  AlertCircle,
  Database,
  ExternalLink
} from 'lucide-react';
import { digitalArchiveData, DigitalDocument } from '@/data/digitalArchiveCatalog';
import { Badge, Button } from '@/components/design-system';
import DatabaseAlertModal from '@/components/DatabaseAlertModal';

export default function ArchivosDigitales() {
  const [documents, setDocuments] = useState<DigitalDocument[]>(digitalArchiveData);
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [selectedDocTitle, setSelectedDocTitle] = useState<string>('');

  const toggleExpand = (docId: string) => {
    setExpandedDocId(prev => (prev === docId ? null : docId));
  };

  const handleOpenBook = (doc: DigitalDocument) => {
    // Incrementar contador de vistas al interactuar
    setDocuments(prevDocs => 
      prevDocs.map(d => d.id === doc.id ? { ...d, viewsCount: d.viewsCount + 1 } : d)
    );
    setSelectedDocTitle(doc.title);
    setAlertModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Cabecera de la Subsección de Archivos Digitales */}
      <div className="bg-crema/90 border border-crema-dark/80 rounded-3xl p-6 sm:p-8 shadow-lg backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-terracota/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-terracota/15 text-terracota font-bold text-xs rounded-full uppercase tracking-wider border border-terracota/30 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Colección Digital Activa
              </span>
              <span className="text-xs text-cafe/60 font-semibold">• 1 Documento Registrado</span>
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-verde-profundo">
              Archivos Digitales e Historias Etnográficas
            </h3>

            <p className="text-sm text-cafe/80 leading-relaxed font-sans">
              Repositorio de documentos digitales, libros, investigaciones y manuscritos históricos sobre la memoria territorial y etnográfica del Pueblo Indígena de los Pastos.
            </p>
          </div>

          {/* Indicador de Estado de la Base de Datos */}
          <div className="bg-crema-dark/80 p-4 rounded-2xl border border-crema-dark flex items-center space-x-3 shrink-0 shadow-inner">
            <div className="p-2.5 bg-amber-500/20 text-amber-700 rounded-xl">
              <Database className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-terracota">
                Estado del Servidor
              </p>
              <p className="text-xs font-bold text-verde-profundo">
                Base de Datos en Desarrollo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Listado / Grid de Documentos Digitales */}
      <div className="grid grid-cols-1 gap-8">
        {documents.map((doc) => {
          const isExpanded = expandedDocId === doc.id;

          return (
            <div 
              key={doc.id}
              className="bg-crema/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-crema-dark/70 transition-all duration-300 hover:shadow-2xl hover:border-terracota/40 group relative"
            >
              {/* Barra superior de acento */}
              <div className="h-2 bg-gradient-to-r from-verde-profundo via-terracota to-mostaza" />

              <div className="p-6 sm:p-8 lg:p-10 space-y-6">
                
                {/* Metadatos superiores (Categoría, Código y Vistas con Ojito) */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-crema-dark/60 pb-4">
                  <div className="flex items-center space-x-2 flex-wrap gap-2">
                    <Badge variant="verde" className="font-semibold text-xs py-1 px-3">
                      {doc.category}
                    </Badge>
                    <span className="text-xs font-mono text-cafe/60 bg-crema-dark/50 px-2.5 py-1 rounded-md border border-crema-dark">
                      {doc.code}
                    </span>
                  </div>

                  {/* Ojito con Contador de Vistas */}
                  <div 
                    className="flex items-center space-x-2 bg-crema-dark/70 hover:bg-crema-dark px-3.5 py-1.5 rounded-full border border-crema-dark text-verde-profundo transition-colors shadow-sm group/eye"
                    title="Número de personas que han consultado este libro"
                  >
                    <Eye className="w-4 h-4 text-terracota group-hover/eye:scale-110 transition-transform" />
                    <span className="font-mono font-bold text-xs text-verde-profundo">
                      {doc.viewsCount}
                    </span>
                    <span className="text-[11px] text-cafe/70 font-sans hidden sm:inline">
                      vistas
                    </span>
                  </div>
                </div>

                {/* Título e Información Principal */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-terracota uppercase tracking-widest block mb-1">
                        Libro / Historia Etnográfica
                      </span>
                      <h4 className="font-serif font-bold text-2xl sm:text-3xl text-verde-profundo tracking-tight leading-snug">
                        {doc.title}
                      </h4>
                    </div>

                    <div className="p-3 bg-verde-profundo/10 rounded-2xl text-verde-profundo shrink-0 hidden sm:block border border-verde-profundo/20">
                      <BookOpen className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Ficha rápida de Autor e Institución */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center space-x-3 bg-crema-dark/40 p-3 rounded-xl border border-crema-dark/50">
                      <div className="p-2 bg-terracota/10 text-terracota rounded-lg shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-cafe/60 font-bold block">
                          Autor
                        </span>
                        <span className="text-sm font-bold text-verde-profundo">
                          {doc.author}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-crema-dark/40 p-3 rounded-xl border border-crema-dark/50">
                      <div className="p-2 bg-verde-profundo/10 text-verde-profundo rounded-lg shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-cafe/60 font-bold block">
                          Editorial / Institución
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-verde-profundo truncate block" title={doc.publisher}>
                          {doc.publisher}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Descripción Corta */}
                  <p className="text-sm text-cafe/85 leading-relaxed font-sans border-l-4 border-terracota/40 pl-4 py-1 italic">
                    &ldquo;{doc.description}&rdquo;
                  </p>
                </div>

                {/* Sección Desplegable: Ver Más Información */}
                {isExpanded && (
                  <div className="bg-crema-dark/60 rounded-2xl p-5 border border-crema-dark space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-terracota border-b border-crema-dark pb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Detalles de Ficha Etnográfica y Catalogación</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-cafe/90">
                      <div>
                        <span className="font-bold text-verde-profundo block mb-0.5">Ubicación en Archivo:</span>
                        <p className="text-cafe/80">{doc.locationInArchive}</p>
                      </div>

                      <div>
                        <span className="font-bold text-verde-profundo block mb-0.5">Formato de Registro:</span>
                        <p className="text-cafe/80">{doc.format}</p>
                      </div>

                      <div>
                        <span className="font-bold text-verde-profundo block mb-0.5">Año de Edición:</span>
                        <p className="text-cafe/80">{doc.year || 'No especificado'}</p>
                      </div>

                      <div>
                        <span className="font-bold text-verde-profundo block mb-0.5">Estado de Sinopsis:</span>
                        <p className="text-amber-800 font-semibold italic flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 inline shrink-0" />
                          Sinopsis por ahora no disponible (en catalogación)
                        </p>
                      </div>
                    </div>

                    {doc.tags && doc.tags.length > 0 && (
                      <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-crema-dark/60">
                        <Tag className="w-3.5 h-3.5 text-terracota mr-1" />
                        {doc.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="bg-crema text-cafe/80 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-crema-dark"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Acciones principales: Ver Más / Ver Libro */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-crema-dark/60">
                  
                  {/* Botón Ver Más Descripción */}
                  <button
                    onClick={() => toggleExpand(doc.id)}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-terracota hover:text-verde-profundo transition-colors py-2 px-1 focus:outline-none"
                  >
                    <span>{isExpanded ? 'Ver menos detalles' : 'Ver más detalles en la descripción'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {/* Botón Principal: Ver Libro (Dispara alerta de base de datos) */}
                  <Button
                    variant="terracota"
                    size="md"
                    onClick={() => handleOpenBook(doc)}
                    leftIcon={<BookOpen size={18} />}
                    rightIcon={<ExternalLink size={16} className="opacity-75" />}
                    className="w-full sm:w-auto px-6 py-3 font-bold text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    Ver Libro
                  </Button>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Alerta de Base de Datos en Desarrollo */}
      <DatabaseAlertModal 
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        documentTitle={selectedDocTitle}
      />
    </div>
  );
}
