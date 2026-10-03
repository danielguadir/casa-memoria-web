'use client';

import React, { useState, useMemo } from 'react';
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
  FolderOpen,
  ChevronRight,
  X
} from 'lucide-react';
import { digitalArchiveData, DigitalDocument } from '@/data/digitalArchiveCatalog';
import { Badge, Button } from '@/components/design-system';
import { useAuth } from '@/context/AuthContext';

/**
 * Normalizes text removing accents for scalable accent-insensitive search
 */
const removeAccents = (str: string): string => {
  if (!str) return '';
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export default function ArchivosDigitales() {
  const [digitalDocs, setDigitalDocs] = useState<DigitalDocument[]>(digitalArchiveData);
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'sinopsis' | 'capitulos' | 'autores' | 'ficha'>>({
    dig_001: 'sinopsis'
  });
  const [expandedDocId, setExpandedDocId] = useState<string | null>('dig_001');

  // Scalable category selection and search filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Scalable synopsis truncation state (tracks expanded synopsis per document)
  const [expandedSynopsisMap, setExpandedSynopsisMap] = useState<Record<string, boolean>>({});

  const { openKioskModal } = useAuth();

  const toggleExpand = (docId: string) => {
    setExpandedDocId(prev => (prev === docId ? null : docId));
  };

  const toggleSynopsis = (docId: string) => {
    setExpandedSynopsisMap(prev => ({ ...prev, [docId]: !prev[docId] }));
  };

  const handleReadDocument = (doc: DigitalDocument) => {
    // Incrementar el contador de vistas / lecturas
    setDigitalDocs(prevDocs => 
      prevDocs.map(d => d.id === doc.id ? { ...d, viewsCount: d.viewsCount + 1 } : d)
    );
  };

  const setDocTab = (docId: string, tab: 'sinopsis' | 'capitulos' | 'autores' | 'ficha') => {
    setActiveTabMap(prev => ({ ...prev, [docId]: tab }));
    if (expandedDocId !== docId) {
      setExpandedDocId(docId);
    }
  };

  // Dynamic categories list starting with 'Todas'
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    digitalDocs.forEach(doc => {
      if (doc.category && doc.category.trim()) {
        set.add(doc.category.trim());
      }
    });
    return ['Todas', ...Array.from(set).sort()];
  }, [digitalDocs]);

  // Compute item counts per category for scalable sidebar metrics
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Todas: digitalDocs.length,
    };
    digitalDocs.forEach((doc) => {
      if (doc.category) {
        counts[doc.category] = (counts[doc.category] || 0) + 1;
      }
    });
    return counts;
  }, [digitalDocs]);

  // Filter digital documents by category and search query
  const filteredDocs = useMemo(() => {
    return digitalDocs.filter(doc => {
      // 1. Category filter
      if (selectedCategory !== 'Todas') {
        if (!doc.category || removeAccents(doc.category) !== removeAccents(selectedCategory)) {
          return false;
        }
      }

      // 2. Search query filter
      if (!searchQuery.trim()) return true;
      const queryNorm = removeAccents(searchQuery.trim());

      const titleNorm = removeAccents(doc.title || '');
      const authorNorm = removeAccents(doc.author || '');
      const codeNorm = removeAccents(doc.code || '');
      const catNorm = removeAccents(doc.category || '');
      const descNorm = removeAccents(doc.description || '');
      const publisherNorm = removeAccents(doc.publisher || '');
      const tagsNorm = doc.tags ? doc.tags.map(removeAccents).join(' ') : '';

      return (
        titleNorm.includes(queryNorm) ||
        authorNorm.includes(queryNorm) ||
        codeNorm.includes(queryNorm) ||
        catNorm.includes(queryNorm) ||
        descNorm.includes(queryNorm) ||
        publisherNorm.includes(queryNorm) ||
        tagsNorm.includes(queryNorm)
      );
    });
  }, [digitalDocs, selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todas');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* Cabecera Estilo Repositorio Institucional / Repositorios Académicos */}
      <div className="bg-crema/90 border border-crema-dark/80 rounded-3xl p-6 sm:p-8 shadow-lg backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracota/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <span className="px-3.5 py-1 bg-verde-profundo text-crema font-bold text-xs rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <GraduationCap className="w-3.5 h-3.5 text-mostaza" />
                Repositorio
              </span>
              <span className="text-xs text-cafe/70 font-mono font-semibold bg-crema-dark/60 px-2.5 py-0.5 rounded-full border border-crema-dark">
                Casa de la Memoria del Gran Cumbal
              </span>
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-verde-profundo tracking-tight">
              Archivos Digitales
            </h3>

            <p className="text-sm sm:text-base text-cafe/85 leading-relaxed font-sans font-medium">
              Colección digitalizada
            </p>
          </div>
        </div>
      </div>

      {/* Main Scalable Layout: Left Sidebar (Categories Menu) + Right Main Body (Search & Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* LEFT SIDEBAR: Categories Menu */}
        <aside className="lg:col-span-1 bg-crema/90 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-crema-dark space-y-5 lg:sticky lg:top-24">
          <div className="flex items-center justify-between pb-3 border-b border-crema-dark">
            <div className="flex items-center space-x-2.5 text-verde-profundo font-serif font-bold text-lg">
              <FolderOpen size={20} className="text-terracota shrink-0" />
              <span>Categorías</span>
            </div>
            {(selectedCategory !== 'Todas' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-xs font-bold text-terracota hover:underline flex items-center space-x-1 cursor-pointer"
                title="Restablecer filtros"
              >
                <X size={14} />
                <span>Limpiar</span>
              </button>
            )}
          </div>

          <nav className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-verde-profundo text-crema shadow-md scale-[1.02]'
                      : 'bg-crema-dark/40 text-cafe/80 hover:bg-crema-dark hover:text-verde-profundo border border-crema-dark/50'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <ChevronRight 
                      size={14} 
                      className={`transition-transform duration-200 shrink-0 ${
                        isActive ? 'text-mostaza translate-x-0.5' : 'text-cafe/40 group-hover:text-verde-profundo group-hover:translate-x-0.5'
                      }`} 
                    />
                    <span className="truncate tracking-wide">{cat}</span>
                  </div>
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                      isActive 
                        ? 'bg-mostaza text-verde-profundo font-extrabold' 
                        : 'bg-crema-dark text-cafe/70 group-hover:bg-crema group-hover:text-verde-profundo'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* RIGHT MAIN BODY: Search Input & Document Cards */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Top Search Bar */}
          <div className="bg-crema/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg border border-crema-dark">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-terracota">
                <Search size={22} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar documento por título, autor, código, categoría o palabra clave..."
                className="w-full pl-12 pr-10 py-3.5 bg-crema text-cafe font-medium text-sm sm:text-base rounded-xl border-2 border-crema-dark/80 focus:border-verde-profundo focus:outline-none focus:ring-2 focus:ring-verde-profundo/20 transition-all shadow-inner placeholder-cafe/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-cafe/50 hover:text-terracota transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Results Counter / Filter Indicator */}
          <div className="flex flex-wrap items-center justify-between text-xs font-bold text-cafe/70 px-1 gap-2">
            <span>
              Mostrando <strong className="text-verde-profundo font-mono">{filteredDocs.length}</strong> de {digitalDocs.length} documentos digitales
            </span>
            {selectedCategory !== 'Todas' && (
              <span className="bg-terracota/10 text-terracota px-2.5 py-0.5 rounded-full border border-terracota/20 font-semibold">
                Categoría: {selectedCategory}
              </span>
            )}
          </div>

          {/* Documents Grid / Empty State */}
          {filteredDocs.length === 0 ? (
            <div className="bg-crema/90 backdrop-blur-md rounded-3xl p-12 text-center border border-crema-dark space-y-4">
              <FolderOpen size={48} className="mx-auto text-cafe/40" />
              <h4 className="font-serif font-bold text-xl text-verde-profundo">
                No se encontraron documentos
              </h4>
              <p className="text-sm text-cafe/70 max-w-md mx-auto">
                No se hallaron archivos digitales que coincidan con la categoría o término buscado.
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-verde-profundo text-crema font-bold text-xs rounded-xl shadow-md hover:bg-verde-profundo/90 transition-colors cursor-pointer"
              >
                Restablecer búsqueda
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {filteredDocs.map((doc) => {
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

                        {/* Ficha Rápida de Autoría y Filiación */}
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
                          
                          {/* TAB 1: SINOPSIS (Truncado al primer párrafo con botón Mostrar más / Mostrar menos) */}
                          {currentTab === 'sinopsis' && (
                            <div className="space-y-4 font-sans text-sm text-cafe/90 leading-relaxed">
                              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-terracota border-b border-crema-dark pb-2">
                                <FileText className="w-4 h-4" />
                                <span>Resumen del Estudio Etnográfico</span>
                              </div>

                              {doc.synopsis ? (
                                <div className="space-y-3 bg-white/80 p-5 rounded-xl border border-crema-dark/60 text-cafe leading-relaxed">
                                  {(() => {
                                    const paragraphs = doc.synopsis.split('\n\n').filter(p => p.trim());
                                    const isSynopsisExpanded = !!expandedSynopsisMap[doc.id];
                                    const hasMultiple = paragraphs.length > 1;

                                    const displayedParagraphs = (isSynopsisExpanded || !hasMultiple) 
                                      ? paragraphs 
                                      : [paragraphs[0]];

                                    return (
                                      <>
                                        {displayedParagraphs.map((para, idx) => (
                                          <p key={idx}>{para}</p>
                                        ))}

                                        {hasMultiple && (
                                          <div className="pt-2 border-t border-crema-dark/40 mt-3">
                                            <button
                                              onClick={() => toggleSynopsis(doc.id)}
                                              className="inline-flex items-center space-x-1.5 text-xs font-bold text-terracota hover:text-verde-profundo transition-colors cursor-pointer focus:outline-none"
                                            >
                                              <span>{isSynopsisExpanded ? 'Mostrar menos' : 'Mostrar más'}</span>
                                              {isSynopsisExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                            </button>
                                          </div>
                                        )}
                                      </>
                                    );
                                  })()}
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
                                  <p className="text-emerald-800 font-bold">Disponible para lectura en lector PDF nativo del navegador</p>
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

                      {/* Acciones Principales: Ver Documento en Lector PDF Nativo del Navegador & Consulta Pública */}
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
                            className="w-full sm:w-auto px-5 py-2.5 font-semibold text-xs cursor-pointer"
                          >
                            Abrir Consulta Pública
                          </Button>

                          <a
                            href={doc.pdfUrl || '/docs/cumbe-renaciente.pdf'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleReadDocument(doc)}
                            className="inline-flex items-center justify-center space-x-2 bg-terracota hover:bg-terracota-light text-crema font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer w-full sm:w-auto text-center"
                          >
                            <BookOpen size={18} />
                            <span>Ver documento</span>
                            <ExternalLink size={16} className="opacity-75 ml-1" />
                          </a>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

    </div>
  );
}
