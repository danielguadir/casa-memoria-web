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
  ExternalLink,
  GraduationCap,
  Languages,
  ListOrdered,
  Search,
  Monitor
} from 'lucide-react';
import { digitalArchiveData, DigitalDocument } from '@/data/digitalArchiveCatalog';
import { Badge, Button } from '@/components/design-system';
import { useAuth } from '@/context/AuthContext';

export default function ArchivosDigitales() {
  const [digitalDocs, setDigitalDocs] = useState<DigitalDocument[]>(digitalArchiveData);
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'sinopsis' | 'capitulos' | 'autores' | 'ficha'>>({
    dig_001: 'sinopsis'
  });
  const [expandedDocId, setExpandedDocId] = useState<string | null>('dig_001');

  const { openKioskModal } = useAuth();

  const toggleExpand = (docId: string) => {
    setExpandedDocId(prev => (prev === docId ? null : docId));
  };

  const handleReadDocument = (doc: DigitalDocument) => {
    // Incrementar el contador de vistas / lecturas
    setDigitalDocs(prevDocs => 
      prevDocs.map(d => d.id === doc.id ? { ...d, viewsCount: d.viewsCount + 1 } : d)
    );

    if (doc.pdfUrl) {
      window.open(doc.pdfUrl, '_blank');
    } else if (doc.driveUrl) {
      window.open(doc.driveUrl, '_blank');
    } else {
      alert(`Accediendo a documento digital: ${doc.title}`);
    }
  };

  const setDocTab = (docId: string, tab: 'sinopsis' | 'capitulos' | 'autores' | 'ficha') => {
    setActiveTabMap(prev => ({ ...prev, [docId]: tab }));
    if (expandedDocId !== docId) {
      setExpandedDocId(docId);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Cabecera Estilo Repositorio Institucional (Univalle / Repositorios Académicos) */}
      <div className="bg-crema/90 border border-crema-dark/80 rounded-3xl p-6 sm:p-8 shadow-lg backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracota/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <span className="px-3.5 py-1 bg-verde-profundo text-crema font-bold text-xs rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <GraduationCap className="w-3.5 h-3.5 text-mostaza" />
                Repositorio Académico & Archivo Digital
              </span>
              <span className="text-xs text-cafe/70 font-mono font-semibold bg-crema-dark/60 px-2.5 py-0.5 rounded-full border border-crema-dark">
                Casa de la Memoria del Gran Cumbal
              </span>
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-verde-profundo tracking-tight">
              Archivos Digitales e Historias Etnográficas
            </h3>

            <p className="text-sm sm:text-base text-cafe/85 leading-relaxed font-sans">
              Colección digitalizada de monografías, textos de investigación etnográfica y archivos históricos del Pueblo Indígena de los Pastos.
            </p>
          </div>

          {/* Acceso a Consulta Pública en Kiosco */}
          <div className="bg-crema-dark/90 p-4 rounded-2xl border border-crema-dark space-y-2 shrink-0 shadow-inner max-w-xs text-center sm:text-left">
            <div className="flex items-center space-x-2 text-terracota font-bold text-xs uppercase tracking-wider">
              <Monitor className="w-4 h-4 text-terracota" />
              <span>Consulta de Catálogo</span>
            </div>
            <p className="text-xs text-cafe/70 leading-snug">
              Búsqueda por nombre, ID o palabra clave en el fondo documental.
            </p>
            <Button
              variant="mostaza"
              size="sm"
              onClick={openKioskModal}
              leftIcon={<Search className="w-4 h-4" />}
              className="w-full shadow-md font-bold text-xs py-2 mt-1"
            >
              Abrir Consulta Pública
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de Documentos Digitales (Presentación Principal Univalle en la Página) */}
      <div className="grid grid-cols-1 gap-8">
        {digitalDocs.map((doc) => {
          const isExpanded = expandedDocId === doc.id;
          const currentTab = activeTabMap[doc.id] || 'sinopsis';

          return (
            <div 
              key={doc.id}
              className="bg-crema/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-crema-dark/80 transition-all duration-300 hover:border-terracota/50 relative"
            >
              {/* Barra superior estilo franja de graduación institucional */}
              <div className="h-2.5 bg-gradient-to-r from-verde-profundo via-terracota to-mostaza" />

              <div className="p-6 sm:p-8 lg:p-10 space-y-6">
                
                {/* Metadatos superiores (Categoría, Código y Ojito de Vistas) */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-crema-dark/60 pb-4">
                  <div className="flex items-center space-x-2 flex-wrap gap-2">
                    <Badge variant="verde" className="font-semibold text-xs py-1 px-3">
                      {doc.category}
                    </Badge>
                    <span className="text-xs font-mono text-cafe/70 bg-crema-dark/60 px-2.5 py-1 rounded-md border border-crema-dark font-bold">
                      {doc.code}
                    </span>
                  </div>

                  {/* Contador de Lecturas con Ojito */}
                  <div 
                    className="flex items-center space-x-2 bg-crema-dark/80 px-3.5 py-1.5 rounded-full border border-crema-dark text-verde-profundo shadow-xs"
                    title="Número de personas que han consultado o leído este documento"
                  >
                    <Eye className="w-4 h-4 text-terracota" />
                    <span className="font-mono font-bold text-xs text-verde-profundo">
                      {doc.viewsCount}
                    </span>
                    <span className="text-[11px] text-cafe/70 font-sans hidden sm:inline">
                      lecturas
                    </span>
                  </div>
                </div>

                {/* Título Principal y Ficha Académica */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-terracota uppercase tracking-widest block">
                        Monografía / Etnografía Andina
                      </span>
                      <h4 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-verde-profundo tracking-tight leading-snug">
                        {doc.title}
                      </h4>
                    </div>

                    <div className="p-3 bg-verde-profundo/10 rounded-2xl text-verde-profundo shrink-0 hidden md:block border border-verde-profundo/20 shadow-xs">
                      <BookOpen className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Ficha Rápida de Autoría y Filiación (Estilo Univalle) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    
                    {/* Autor */}
                    <div className="bg-crema-dark/50 p-3.5 rounded-2xl border border-crema-dark/60 space-y-1">
                      <div className="flex items-center space-x-2 text-xs font-bold text-terracota uppercase tracking-wider">
                        <User className="w-4 h-4 text-terracota" />
                        <span>Autores/as</span>
                      </div>
                      <p className="text-sm font-bold text-verde-profundo">
                        {doc.author}
                      </p>
                      {doc.affiliation && (
                        <p className="text-[11px] text-cafe/70 font-medium">
                          {doc.affiliation}
                        </p>
                      )}
                    </div>

                    {/* Traducción */}
                    {doc.translator && (
                      <div className="bg-crema-dark/50 p-3.5 rounded-2xl border border-crema-dark/60 space-y-1">
                        <div className="flex items-center space-x-2 text-xs font-bold text-verde-profundo uppercase tracking-wider">
                          <Languages className="w-4 h-4 text-verde-profundo" />
                          <span>Traducción</span>
                        </div>
                        <p className="text-xs font-bold text-cafe">
                          {doc.translator}
                        </p>
                      </div>
                    )}

                    {/* Editorial / Publicador */}
                    <div className="bg-crema-dark/50 p-3.5 rounded-2xl border border-crema-dark/60 space-y-1">
                      <div className="flex items-center space-x-2 text-xs font-bold text-terracota uppercase tracking-wider">
                        <Building2 className="w-4 h-4 text-terracota" />
                        <span>Edición / Sello</span>
                      </div>
                      <p className="text-xs font-bold text-verde-profundo truncate" title={doc.publisher}>
                        {doc.publisher}
                      </p>
                      <p className="text-[11px] text-cafe/70 font-medium">
                        Año de Publicación: {doc.year || '2005'}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Pestañas de Navegación del Documento (Sinopsis, Capítulos, Autores, Ficha) */}
                <div className="border-t border-crema-dark/60 pt-4">
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    
                    <button
                      onClick={() => setDocTab(doc.id, 'sinopsis')}
                      className={`
                        px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 border cursor-pointer
                        ${currentTab === 'sinopsis' 
                          ? 'bg-verde-profundo text-crema border-verde-profundo shadow-sm' 
                          : 'bg-crema-dark/60 text-cafe/80 border-crema-dark hover:bg-crema-dark'
                        }
                      `}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Sinopsis Etnográfica</span>
                    </button>

                    {doc.chapters && doc.chapters.length > 0 && (
                      <button
                        onClick={() => setDocTab(doc.id, 'capitulos')}
                        className={`
                          px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 border cursor-pointer
                          ${currentTab === 'capitulos' 
                            ? 'bg-verde-profundo text-crema border-verde-profundo shadow-sm' 
                            : 'bg-crema-dark/60 text-cafe/80 border-crema-dark hover:bg-crema-dark'
                          }
                        `}
                      >
                        <ListOrdered className="w-3.5 h-3.5" />
                        <span>Capítulos ({doc.chapters.length})</span>
                      </button>
                    )}

                    <button
                      onClick={() => setDocTab(doc.id, 'autores')}
                      className={`
                        px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 border cursor-pointer
                        ${currentTab === 'autores' 
                          ? 'bg-verde-profundo text-crema border-verde-profundo shadow-sm' 
                          : 'bg-crema-dark/60 text-cafe/80 border-crema-dark hover:bg-crema-dark'
                        }
                      `}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Autores & Filiación</span>
                    </button>

                    <button
                      onClick={() => setDocTab(doc.id, 'ficha')}
                      className={`
                        px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 border cursor-pointer
                        ${currentTab === 'ficha' 
                          ? 'bg-verde-profundo text-crema border-verde-profundo shadow-sm' 
                          : 'bg-crema-dark/60 text-cafe/80 border-crema-dark hover:bg-crema-dark'
                        }
                      `}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ficha de Catalogación</span>
                    </button>

                  </div>
                </div>

                {/* CONTENIDO DE LA PESTAÑA SELECCIONADA */}
                {isExpanded && (
                  <div className="bg-crema-dark/40 rounded-2xl p-6 border border-crema-dark space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    
                    {/* TAB 1: SINOPSIS */}
                    {currentTab === 'sinopsis' && (
                      <div className="space-y-4 font-sans text-sm text-cafe/90 leading-relaxed">
                        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-terracota border-b border-crema-dark pb-2">
                          <FileText className="w-4 h-4" />
                          <span>Resumen del Estudio Etnográfico</span>
                        </div>

                        {doc.synopsis ? (
                          <div className="space-y-3 whitespace-pre-line bg-white/80 p-5 rounded-xl border border-crema-dark/60 text-cafe leading-relaxed">
                            {doc.synopsis}
                          </div>
                        ) : (
                          <p className="italic text-cafe/70">Sinopsis en proceso de catalogación.</p>
                        )}
                      </div>
                    )}

                    {/* TAB 2: CAPÍTULOS */}
                    {currentTab === 'capitulos' && doc.chapters && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-verde-profundo border-b border-crema-dark pb-2">
                          <div className="flex items-center space-x-2">
                            <ListOrdered className="w-4 h-4 text-terracota" />
                            <span>Tabla de Contenido / Estructura de la Obra</span>
                          </div>
                          <span className="text-terracota font-mono">{doc.chapters.length} secciones</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {doc.chapters.map((ch) => (
                            <div 
                              key={ch.number}
                              className="flex items-start space-x-3 bg-white/90 p-3.5 rounded-xl border border-crema-dark/60 hover:border-terracota/40 transition-colors shadow-2xs"
                            >
                              <span className="w-7 h-7 rounded-lg bg-verde-profundo/10 text-verde-profundo font-bold font-mono text-xs flex items-center justify-center shrink-0">
                                {ch.number}
                              </span>
                              <span className="text-xs font-bold text-cafe leading-snug pt-1">
                                {ch.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 3: AUTORES */}
                    {currentTab === 'autores' && (
                      <div className="space-y-4 text-xs">
                        <div className="flex items-center space-x-2 font-bold uppercase tracking-wider text-terracota border-b border-crema-dark pb-2">
                          <GraduationCap className="w-4 h-4" />
                          <span>Información Institucional & Créditos de Investigación</span>
                        </div>

                        <div className="space-y-3 bg-white/90 p-5 rounded-xl border border-crema-dark/60">
                          <div>
                            <span className="font-bold text-verde-profundo block text-sm">Autora Principal:</span>
                            <p className="text-cafe font-semibold">{doc.author}</p>
                            <p className="text-cafe/70 font-mono text-[11px]">{doc.affiliation || 'Georgetown University'}</p>
                          </div>

                          {doc.translator && (
                            <div className="border-t border-crema-dark/60 pt-2">
                              <span className="font-bold text-verde-profundo block text-xs">Traducción Oficial:</span>
                              <p className="text-cafe font-medium">{doc.translator}</p>
                            </div>
                          )}

                          <div className="border-t border-crema-dark/60 pt-2">
                            <span className="font-bold text-verde-profundo block text-xs">Editorial / Institución Custodia:</span>
                            <p className="text-cafe font-medium">{doc.publisher}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 4: FICHA DE CATALOGACIÓN */}
                    {currentTab === 'ficha' && (
                      <div className="space-y-4 text-xs font-medium text-cafe/90">
                        <div className="flex items-center space-x-2 font-bold uppercase tracking-wider text-terracota border-b border-crema-dark pb-2">
                          <Sparkles className="w-4 h-4" />
                          <span>Metadatos Estándar AGN / Casa de la Memoria</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/90 p-5 rounded-xl border border-crema-dark/60">
                          <div>
                            <span className="font-bold text-verde-profundo block mb-0.5">Ubicación en Servidor:</span>
                            <p className="text-cafe/80">{doc.locationInArchive}</p>
                          </div>

                          <div>
                            <span className="font-bold text-verde-profundo block mb-0.5">Formato de Registro:</span>
                            <p className="text-cafe/80">{doc.format}</p>
                          </div>

                          <div>
                            <span className="font-bold text-verde-profundo block mb-0.5">Número de Lecturas:</span>
                            <p className="text-verde-profundo font-bold font-mono">{doc.viewsCount} lecturas registradas</p>
                          </div>

                          <div>
                            <span className="font-bold text-verde-profundo block mb-0.5">Disponibilidad:</span>
                            <p className="text-emerald-800 font-bold">Disponible para consulta digital y descarga PDF</p>
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

                  </div>
                )}

                {/* Acciones Principales: Leer Documento PDF & Consulta en Kiosco Modal */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-crema-dark/60">
                  
                  {/* Toggle Ver Más / Ver Menos */}
                  <button
                    onClick={() => toggleExpand(doc.id)}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-terracota hover:text-verde-profundo transition-colors py-2 px-1 focus:outline-none cursor-pointer"
                  >
                    <span>{isExpanded ? 'Plegar detalles' : 'Desplegar ficha completa y capítulos'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {/* Botones Principales */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={openKioskModal}
                      leftIcon={<Search size={16} />}
                      className="w-full sm:w-auto px-5 py-2.5 font-semibold text-xs"
                    >
                      Abrir Consulta Pública
                    </Button>

                    <Button
                      variant="terracota"
                      size="md"
                      onClick={() => handleReadDocument(doc)}
                      leftIcon={<BookOpen size={18} />}
                      rightIcon={<ExternalLink size={16} className="opacity-75" />}
                      className="w-full sm:w-auto px-6 py-3 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
                    >
                      Leer Documento PDF
                    </Button>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
