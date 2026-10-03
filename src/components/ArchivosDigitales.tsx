'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { 
  BookOpen, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Tag, 
  ExternalLink,
  Search,
  FolderOpen,
  X
} from 'lucide-react';
import { digitalArchiveData, DigitalDocument } from '@/data/digitalArchiveCatalog';
import { Button } from '@/components/design-system';
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
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'sinopsis' | 'capitulos' | 'ficha'>>({});
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);

  // Search filter & Category state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const { openKioskModal } = useAuth();

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

  // Compute item counts per category for metrics
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

  // AUTO-EXPAND FIRST DOCUMENT AUTOMATICALLY
  useEffect(() => {
    if (filteredDocs.length > 0) {
      if (!expandedDocId || !filteredDocs.some(d => d.id === expandedDocId)) {
        setExpandedDocId(filteredDocs[0].id);
      }
    } else {
      setExpandedDocId(null);
    }
  }, [filteredDocs, expandedDocId]);

  const toggleExpand = (docId: string) => {
    setExpandedDocId(prev => (prev === docId ? null : docId));
  };

  const setDocTab = (docId: string, tab: 'sinopsis' | 'capitulos' | 'ficha') => {
    setActiveTabMap(prev => ({ ...prev, [docId]: tab }));
  };

  const handleReadDocument = (doc: DigitalDocument) => {
    setDigitalDocs(prevDocs => 
      prevDocs.map(d => d.id === doc.id ? { ...d, viewsCount: d.viewsCount + 1 } : d)
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todas');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 px-4 sm:px-6 animate-in fade-in duration-300">

      {/* 1. ENCABEZADO COMPACTO INSTITUCIONAL (~90px height) */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-crema-dark/70 gap-2">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-verde-profundo tracking-tight">
            Archivos Digitales
          </h1>
          <p className="text-xs sm:text-sm text-cafe/75 font-medium mt-0.5">
            Repositorio · Casa de la Memoria del Gran Cumbal · <span className="font-mono font-bold text-verde-profundo">{digitalDocs.length} {digitalDocs.length === 1 ? 'documento' : 'documentos'}</span>
          </p>
        </div>
      </header>

      {/* 2. BARRA DE BÚSQUEDA Y CATEGORÍAS EN UNA SOLA FILA */}
      <section className="space-y-2">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
          {/* Input de Búsqueda */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-terracota">
              <Search size={17} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, autor, código o palabra clave..."
              className="w-full pl-9 pr-8 py-2 bg-crema text-cafe font-medium text-xs sm:text-sm rounded-lg border border-crema-dark focus:border-verde-profundo focus:outline-none focus:ring-1 focus:ring-verde-profundo/30 transition-all placeholder-cafe/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-cafe/50 hover:text-terracota transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Chips de Categorías en Scroll Horizontal */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none shrink-0">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    isActive
                      ? 'bg-verde-profundo text-crema border-verde-profundo shadow-xs'
                      : 'bg-crema-dark/40 text-cafe/80 border-crema-dark/60 hover:bg-crema-dark hover:text-verde-profundo'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isActive ? 'bg-mostaza text-verde-profundo font-extrabold' : 'bg-crema-dark text-cafe/70'}`}>
                    {count}
                  </span>
                </button>
              );
            })}

            {(selectedCategory !== 'Todas' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="px-2 py-1 text-xs font-bold text-terracota hover:underline flex items-center gap-0.5 cursor-pointer shrink-0"
                title="Limpiar filtros"
              >
                <X size={13} />
                <span>Limpiar</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. RESULTADOS / LISTA DE DOCUMENTOS DIGITALES */}
      {filteredDocs.length === 0 ? (
        <div className="py-12 text-center border-t border-b border-crema-dark/60 space-y-3">
          <FolderOpen size={40} className="mx-auto text-cafe/40" />
          <h3 className="font-serif font-bold text-lg text-verde-profundo">
            No se encontraron documentos
          </h3>
          <p className="text-xs text-cafe/70 max-w-sm mx-auto">
            No hay archivos digitales que coincidan con la categoría o término buscado.
          </p>
          <button
            onClick={clearFilters}
            className="px-3.5 py-1.5 bg-verde-profundo text-crema font-bold text-xs rounded-lg hover:bg-verde-profundo/90 transition-colors cursor-pointer"
          >
            Restablecer búsqueda
          </button>
        </div>
      ) : (
        <div className="divide-y divide-crema-dark/60 border-t border-b border-crema-dark/60">
          {filteredDocs.map((doc) => {
            const isExpanded = expandedDocId === doc.id;
            const currentTab = activeTabMap[doc.id] || 'sinopsis';

            return (
              <article key={doc.id} className="py-5 space-y-3">
                
                {/* BLOQUE PRINCIPAL: Portada (160px) + Datos Esenciales */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  
                  {/* PORTADA PEQUEÑA Y PROPORCIONADA (~160px) */}
                  <div className="shrink-0 w-36 sm:w-40 md:w-44 mx-auto sm:mx-0">
                    <div className="relative rounded-lg overflow-hidden border border-crema-dark/80 bg-white shadow-md aspect-[3/4]">
                      <Image
                        src={doc.coverImage || '/images/portada-libro-digital/Imagen1.png'}
                        alt={`Portada de ${doc.title}`}
                        width={180}
                        height={240}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* INFORMACIÓN DEL DOCUMENTO SIEMPRE VISIBLE */}
                  <div className="flex-1 space-y-2.5 w-full">
                    
                    {/* Metadatos superiores: Categoría, Año, Código y Lecturas */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[11px] text-terracota uppercase tracking-wider">
                          {doc.category}
                        </span>
                        <span className="text-cafe/40">•</span>
                        <span className="font-bold text-cafe/70">{doc.year || 2005}</span>
                        <span className="text-cafe/40">•</span>
                        <span className="font-mono text-cafe/70 bg-crema-dark/60 px-2 py-0.5 rounded text-[11px] font-bold border border-crema-dark/50">
                          {doc.code}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5 text-cafe/70 font-mono text-[11px]" title="Consultas registradas">
                        <Eye size={14} className="text-terracota" />
                        <span className="font-bold text-verde-profundo">{doc.viewsCount}</span>
                        <span>lecturas</span>
                      </div>
                    </div>

                    {/* Título y Autor */}
                    <div>
                      <h2 className="font-serif font-bold text-xl sm:text-2xl text-verde-profundo leading-snug">
                        {doc.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-cafe/80 flex items-center gap-1.5 mt-1">
                        <User size={14} className="text-terracota shrink-0" />
                        <span>{doc.author}</span>
                        {doc.affiliation && (
                          <span className="text-xs text-cafe/60 font-normal">({doc.affiliation})</span>
                        )}
                      </p>
                    </div>

                    {/* Descripción corta de máximo 2–3 líneas */}
                    <p className="text-xs sm:text-sm text-cafe/85 leading-relaxed line-clamp-3">
                      {doc.description || (doc.synopsis ? doc.synopsis.split('\n\n')[0] : '')}
                    </p>

                    {/* Metadatos rápidos: Formato, Capítulos, Editorial */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-cafe/75 pt-0.5">
                      <span className="font-semibold bg-crema-dark/50 px-2 py-0.5 rounded border border-crema-dark/40">
                        {doc.format || 'PDF Digital'}
                      </span>
                      {doc.chapters && (
                        <span className="font-semibold">
                          {doc.chapters.length} capítulos
                        </span>
                      )}
                      <span className="text-cafe/40">•</span>
                      <span className="font-medium truncate max-w-[200px]" title={doc.publisher}>
                        {doc.publisher}
                      </span>
                    </div>

                    {/* Botones de acción principal (Ver documento + Consulta pública) */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2">
                      <div className="flex items-center gap-2">
                        <a
                          href={doc.pdfUrl || '/docs/cumbe-renaciente.pdf'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleReadDocument(doc)}
                          className="inline-flex items-center space-x-1.5 bg-terracota hover:bg-terracota-light text-crema font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
                        >
                          <BookOpen size={15} />
                          <span>Ver documento</span>
                          <ExternalLink size={13} className="opacity-75" />
                        </a>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={openKioskModal}
                          leftIcon={<Search size={14} />}
                          className="text-xs px-3 py-1.5 font-semibold cursor-pointer"
                        >
                          Consulta Pública
                        </Button>
                      </div>

                      {/* Botón Ver más información */}
                      <button
                        onClick={() => toggleExpand(doc.id)}
                        className="inline-flex items-center space-x-1 text-xs font-bold text-terracota hover:text-verde-profundo transition-colors cursor-pointer py-1"
                      >
                        <span>{isExpanded ? 'Plegar información' : 'Ver más información'}</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>

                  </div>

                </div>

                {/* 6. ÁREA DESPLEGABLE "VER MÁS INFORMACIÓN" */}
                {isExpanded && (
                  <div className="pt-3 border-t border-crema-dark/60 space-y-3 text-xs animate-in fade-in duration-200">
                    
                    {/* Pestañas sencillas para navegación secundaria */}
                    <div className="flex items-center gap-2 border-b border-crema-dark/50 pb-2 overflow-x-auto scrollbar-none">
                      <button
                        onClick={() => setDocTab(doc.id, 'sinopsis')}
                        className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                          currentTab === 'sinopsis'
                            ? 'bg-verde-profundo text-crema'
                            : 'bg-crema-dark/50 text-cafe/80 hover:bg-crema-dark'
                        }`}
                      >
                        Sinopsis Completa
                      </button>

                      {doc.chapters && doc.chapters.length > 0 && (
                        <button
                          onClick={() => setDocTab(doc.id, 'capitulos')}
                          className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                            currentTab === 'capitulos'
                              ? 'bg-verde-profundo text-crema'
                              : 'bg-crema-dark/50 text-cafe/80 hover:bg-crema-dark'
                          }`}
                        >
                          Índice de Capítulos ({doc.chapters.length})
                        </button>
                      )}

                      <button
                        onClick={() => setDocTab(doc.id, 'ficha')}
                        className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                          currentTab === 'ficha'
                            ? 'bg-verde-profundo text-crema'
                            : 'bg-crema-dark/50 text-cafe/80 hover:bg-crema-dark'
                        }`}
                      >
                        Ficha Técnica & AGN
                      </button>
                    </div>

                    {/* CONTENIDO PESTAÑA 1: SINOPSIS COMPLETA */}
                    {currentTab === 'sinopsis' && (
                      <div className="space-y-2 leading-relaxed text-cafe/90 font-sans">
                        {doc.synopsis ? (
                          doc.synopsis.split('\n\n').map((para, idx) => (
                            <p key={idx}>{para}</p>
                          ))
                        ) : (
                          <p>{doc.description}</p>
                        )}
                      </div>
                    )}

                    {/* CONTENIDO PESTAÑA 2: CAPÍTULOS */}
                    {currentTab === 'capitulos' && doc.chapters && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {doc.chapters.map((ch) => (
                          <div key={ch.number} className="flex items-center space-x-2 py-1.5 px-2.5 bg-crema-dark/30 rounded border border-crema-dark/40">
                            <span className="w-5 h-5 rounded bg-verde-profundo/10 text-verde-profundo font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                              {ch.number}
                            </span>
                            <span className="font-semibold text-cafe truncate text-xs">{ch.title}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CONTENIDO PESTAÑA 3: FICHA TÉCNICA COMPLETA & AGN */}
                    {currentTab === 'ficha' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
                          <div className="py-1">
                            <span className="text-[10px] uppercase font-bold text-cafe/60 block">Traducción</span>
                            <span className="font-bold text-verde-profundo">{doc.translator || 'MARKA, Instituto de Historia y Antropología Andinas'}</span>
                          </div>
                          <div className="py-1">
                            <span className="text-[10px] uppercase font-bold text-cafe/60 block">Edición / Sello</span>
                            <span className="font-bold text-verde-profundo">{doc.publisher}</span>
                          </div>
                          <div className="py-1">
                            <span className="text-[10px] uppercase font-bold text-cafe/60 block">Año de Publicación</span>
                            <span className="font-bold text-verde-profundo">{doc.year || 2005}</span>
                          </div>
                          <div className="py-1">
                            <span className="text-[10px] uppercase font-bold text-cafe/60 block">Presentación</span>
                            <span className="font-bold text-verde-profundo">Tapa Blanda</span>
                          </div>
                          <div className="py-1">
                            <span className="text-[10px] uppercase font-bold text-cafe/60 block">Formato</span>
                            <span className="font-bold text-verde-profundo">{doc.format}</span>
                          </div>
                          <div className="py-1">
                            <span className="text-[10px] uppercase font-bold text-cafe/60 block">Ubicación Archivo</span>
                            <span className="font-medium text-cafe/80">{doc.locationInArchive || 'Nodo CMGC / Serie Monografías'}</span>
                          </div>
                        </div>

                        {doc.tags && doc.tags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 pt-1">
                            <Tag size={12} className="text-terracota mr-1" />
                            {doc.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-mono bg-crema-dark/50 px-2 py-0.5 rounded text-cafe/80 border border-crema-dark/40">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}

              </article>
            );
          })}
        </div>
      )}

    </div>
  );
}
