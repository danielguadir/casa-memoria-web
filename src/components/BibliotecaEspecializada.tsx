'use client';

import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Tag, Filter, User, Info, CheckCircle2, FileSpreadsheet, X, Hash } from 'lucide-react';
import { bepimpCatalogData, BepimpItem, getAllBepimpKeywords, getAllBepimpCategories } from '@/data/bepimpCatalog';

export default function BibliotecaEspecializada() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [selectedItemModal, setSelectedItemModal] = useState<BepimpItem | null>(null);

  const keywordsList = useMemo(() => getAllBepimpKeywords(), []);
  const categoriesList = useMemo(() => ['Todas', ...getAllBepimpCategories()], []);

  // Filter items dynamically
  const filteredCatalog = useMemo(() => {
    return bepimpCatalogData.filter((item) => {
      // Filter by category
      if (selectedCategory !== 'Todas' && item.category !== selectedCategory) {
        return false;
      }

      // Filter by keyword chip
      if (selectedKeyword && !item.keywords.some(k => k.toUpperCase() === selectedKeyword.toUpperCase())) {
        return false;
      }

      // Filter by search query
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchCode = item.code.toLowerCase().includes(q);
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchAuthor = item.author.toLowerCase().includes(q);
      const matchPublisher = item.publisher.toLowerCase().includes(q);
      const matchCollection = item.collection.toLowerCase().includes(q);
      const matchIsbn = item.isbn?.toLowerCase().includes(q) || false;
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(q));

      return matchCode || matchTitle || matchAuthor || matchPublisher || matchCollection || matchIsbn || matchKeywords;
    });
  }, [searchQuery, selectedCategory, selectedKeyword]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todas');
    setSelectedKeyword(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Target Inventory Banner */}
      <div className="bg-crema/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-crema-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-mostaza/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-verde-profundo/10 text-verde-profundo text-xs font-bold tracking-wider uppercase border border-verde-profundo/20">
              <FileSpreadsheet size={14} className="text-terracota" />
              <span>Inventario Físico BEPIMP</span>
            </div>
            <h3 className="font-serif font-bold text-3xl sm:text-4xl text-verde-profundo">
              Biblioteca Especializada en Pueblos Indígenas, Memoria y Paz
            </h3>
            <p className="text-cafe/80 text-sm sm:text-base max-w-3xl leading-relaxed">
              Catálogo físico bibliográfico custodiado en la Casa de la Memoria del Gran Cumbal. Consulta las fichas de los ejemplares por palabra clave, código, título o autor.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-crema-dark/80 p-4 rounded-2xl border border-crema-dark shadow-inner shrink-0">
            <div className="text-center px-3 border-r border-cafe/20">
              <span className="block font-serif font-extrabold text-2xl text-verde-profundo">
                {bepimpCatalogData.length}
              </span>
              <span className="text-[11px] font-bold text-cafe/70 uppercase">Ejemplares</span>
            </div>
            <div className="text-center px-3 border-r border-cafe/20">
              <span className="block font-serif font-extrabold text-2xl text-terracota">
                30
              </span>
              <span className="text-[11px] font-bold text-cafe/70 uppercase">Títulos</span>
            </div>
            <div className="text-center px-3">
              <span className="block font-serif font-extrabold text-2xl text-mostaza-dark">
                100%
              </span>
              <span className="text-[11px] font-bold text-cafe/70 uppercase">Catalogado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buscador y Filtros por Palabras Clave */}
      <div className="bg-crema/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-crema-dark space-y-6">
        
        {/* Search Input Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-terracota">
            <Search size={22} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por código (ej: BEPIMP00030-1), palabra clave (ej: CUMBAL, HISTORIA), título o autor..."
            className="w-full pl-12 pr-10 py-4 bg-crema text-cafe font-medium text-sm sm:text-base rounded-xl border-2 border-crema-dark/80 focus:border-verde-profundo focus:outline-none focus:ring-2 focus:ring-verde-profundo/20 transition-all shadow-inner placeholder-cafe/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-cafe/50 hover:text-terracota transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-verde-profundo uppercase tracking-wider">
            <Filter size={14} className="text-terracota" />
            <span>Filtrar por Categoría:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-verde-profundo text-crema shadow-md scale-[1.03]'
                      : 'bg-crema-dark/60 text-cafe/80 hover:bg-crema-dark hover:text-verde-profundo'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Keywords Chips */}
        <div className="space-y-3 pt-2 border-t border-crema-dark/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-verde-profundo uppercase tracking-wider">
              <Tag size={14} className="text-mostaza-dark" />
              <span>Palabras Clave Frecuentes:</span>
            </div>
            {(selectedKeyword || selectedCategory !== 'Todas' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-xs font-bold text-terracota hover:underline flex items-center space-x-1"
              >
                <X size={12} />
                <span>Limpiar filtros</span>
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
            {keywordsList.map((kw) => {
              const isSelected = selectedKeyword === kw;
              return (
                <button
                  key={kw}
                  onClick={() => {
                    setSelectedKeyword(isSelected ? null : kw);
                  }}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all border ${
                    isSelected
                      ? 'bg-terracota text-crema border-terracota shadow-sm scale-105'
                      : 'bg-crema border-crema-dark text-cafe/80 hover:border-mostaza hover:text-verde-profundo'
                  }`}
                >
                  #{kw}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm font-bold text-cafe/80">
          Mostrando <span className="text-verde-profundo font-extrabold">{filteredCatalog.length}</span> registros en la Biblioteca Especializada.
        </p>
        {selectedKeyword && (
          <span className="text-xs bg-terracota/10 text-terracota font-bold px-3 py-1 rounded-full border border-terracota/20">
            Filtro palabra clave: #{selectedKeyword}
          </span>
        )}
      </div>

      {/* Catalog Grid */}
      {filteredCatalog.length === 0 ? (
        <div className="bg-crema/90 rounded-3xl p-12 text-center border border-crema-dark space-y-4">
          <BookOpen size={48} className="text-cafe/40 mx-auto" />
          <h4 className="font-serif font-bold text-2xl text-verde-profundo">No se encontraron registros</h4>
          <p className="text-cafe/70 text-sm max-w-md mx-auto">
            No se hallaron items que coincidan con la búsqueda. Intenta limpiar los filtros o buscar con otro término clave.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2.5 bg-verde-profundo text-crema text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-terracota transition-colors"
          >
            Restablecer Buscador
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCatalog.map((item) => (
            <div
              key={item.id}
              className="bg-crema/95 backdrop-blur-md rounded-2xl p-6 border border-crema-dark shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                
                {/* Header Badge & Code */}
                <div className="flex items-center justify-between border-b border-crema-dark/60 pb-3">
                  <span className="px-3 py-1 bg-verde-profundo text-crema font-mono font-bold text-xs rounded-lg shadow-sm flex items-center space-x-1">
                    <Hash size={12} className="text-mostaza" />
                    <span>{item.code}</span>
                  </span>
                  <span className="px-2.5 py-1 bg-terracota/10 text-terracota font-bold text-[11px] rounded-full border border-terracota/20">
                    {item.category}
                  </span>
                </div>

                {/* Title & Author */}
                <div className="space-y-1.5">
                  <h4 className="font-serif font-bold text-lg text-verde-profundo group-hover:text-terracota transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-cafe/80">
                    <User size={13} className="text-terracota shrink-0" />
                    <span className="truncate">{item.author}</span>
                  </div>
                </div>

                {/* Details Badges */}
                <div className="bg-crema-dark/50 p-3 rounded-xl space-y-2 text-xs text-cafe/80 border border-crema-dark/60">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Colección:</span>
                    <span className="font-bold text-verde-profundo truncate max-w-[160px]">{item.collection}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Año / Edición:</span>
                    <span className="font-bold text-cafe">{item.year} ({item.publisher})</span>
                  </div>
                  {item.isbn && item.isbn !== 'No contiene' && (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold">ISBN:</span>
                      <span className="font-mono text-cafe/90">{item.isbn}</span>
                    </div>
                  )}
                  {item.pages && (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold">Páginas:</span>
                      <span className="font-bold text-cafe">{item.pages} págs.</span>
                    </div>
                  )}
                </div>

                {/* Keyword Chips preview */}
                <div className="flex flex-wrap gap-1">
                  {item.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] font-bold text-verde-profundo bg-crema-dark/80 px-2 py-0.5 rounded border border-crema-dark">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-crema-dark/60 mt-4">
                <button
                  onClick={() => setSelectedItemModal(item)}
                  className="w-full flex items-center justify-center space-x-2 bg-verde-profundo/90 hover:bg-verde-profundo text-crema text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all shadow-md group-hover:bg-terracota"
                >
                  <Info size={14} />
                  <span>Ver Ficha de Inventario</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Modal de Ficha Técnica de Inventario */}
      {selectedItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-crema rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-crema-dark relative overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header Modal */}
            <div className="flex items-start justify-between border-b border-crema-dark pb-4">
              <div className="space-y-1 pr-6">
                <span className="px-3 py-1 bg-verde-profundo text-crema font-mono font-bold text-xs rounded-lg inline-block mb-1">
                  {selectedItemModal.code}
                </span>
                <h3 className="font-serif font-bold text-2xl text-verde-profundo">
                  {selectedItemModal.title}
                </h3>
                <p className="text-xs font-bold text-terracota">
                  Autor(es): {selectedItemModal.author}
                </p>
              </div>
              <button
                onClick={() => setSelectedItemModal(null)}
                className="p-2 rounded-full hover:bg-crema-dark text-cafe/70 hover:text-terracota transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* General Inventory Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-crema-dark/60 p-4 rounded-2xl border border-crema-dark space-y-2">
                <span className="font-bold text-verde-profundo text-sm block border-b border-cafe/10 pb-1">
                  Datos de Publicación
                </span>
                <p><strong className="text-cafe">Año de Edición:</strong> {selectedItemModal.year}</p>
                <p><strong className="text-cafe">Editorial:</strong> {selectedItemModal.publisher}</p>
                <p><strong className="text-cafe">No. Páginas:</strong> {selectedItemModal.pages || 'No registrado'}</p>
                <p><strong className="text-cafe">ISBN:</strong> {selectedItemModal.isbn || 'No contiene'}</p>
                <p><strong className="text-cafe">Colección:</strong> {selectedItemModal.collection}</p>
              </div>

              <div className="bg-crema-dark/60 p-4 rounded-2xl border border-crema-dark space-y-2">
                <span className="font-bold text-verde-profundo text-sm block border-b border-cafe/10 pb-1">
                  Registro de Ingreso BEPIMP
                </span>
                <p><strong className="text-cafe">Fecha de Ingreso:</strong> {selectedItemModal.entryDate}</p>
                <p><strong className="text-cafe">Forma de Llegada:</strong> {selectedItemModal.acquisitionType}</p>
                <p><strong className="text-cafe">Donante:</strong> {selectedItemModal.donorName || 'N/A'}</p>
                <p><strong className="text-cafe">Ejemplares Registrados:</strong> {selectedItemModal.copies}</p>
                <p><strong className="text-cafe">Tipo Cubierta:</strong> {selectedItemModal.coverType}</p>
                <p><strong className="text-cafe">Estado Físico:</strong> <span className="text-verde-profundo font-bold">{selectedItemModal.physicalCondition}</span></p>
              </div>
            </div>

            {/* Keywords in Modal */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-verde-profundo uppercase tracking-wider">
                Palabras Clave Asociadas:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedItemModal.keywords.map((kw, idx) => (
                  <span key={idx} className="px-3 py-1 bg-verde-profundo text-crema font-bold text-xs rounded-lg">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Location & Custody Note */}
            <div className="p-4 bg-verde-profundo/10 rounded-2xl border border-verde-profundo/20 text-xs text-verde-profundo space-y-1">
              <div className="flex items-center space-x-2 font-bold">
                <CheckCircle2 size={16} className="text-verde-profundo" />
                <span>Ubicación Física en la Casa de la Memoria del Gran Cumbal:</span>
              </div>
              <p className="text-cafe/80 pl-6">
                Este volumen forma parte del Fondo Bibliográfico BEPIMP. Disponible para consulta presencial en sala o investigación comunitaria.
              </p>
            </div>

            {/* Footer Modal */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedItemModal(null)}
                className="px-6 py-2.5 bg-verde-profundo text-crema text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-terracota transition-colors"
              >
                Cerrar Ficha
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
