'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen, User, Info, CheckCircle2, FileSpreadsheet, X, Hash, FolderOpen, ChevronRight, Layers, Edit, Trash2, Plus, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AdminModals, AdminModalType } from '@/components/admin/AdminModals';
import { 
  getLibraryCatalog,
  deleteLibraryItem,
  LibraryItem, 
  searchLibrary 
} from '@/data/libraryCatalog';

export default function BibliotecaEspecializada() {
  const { isLoggedIn, activeView } = useAuth();
  const isAdmin = isLoggedIn || activeView === 'admin';

  const [catalogItems, setCatalogItems] = useState<LibraryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedItemModal, setSelectedItemModal] = useState<LibraryItem | null>(null);

  // Admin interactive state on the page
  const [activeAdminModal, setActiveAdminModal] = useState<AdminModalType>(null);
  const [targetBookToEdit, setTargetBookToEdit] = useState<LibraryItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    setCatalogItems(getLibraryCatalog());

    const handleUpdate = () => {
      setCatalogItems(getLibraryCatalog());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('libraryCatalogUpdated', handleUpdate);
      return () => window.removeEventListener('libraryCatalogUpdated', handleUpdate);
    }
  }, []);

  // Dynamic categories list starting with 'Todas'
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    catalogItems.forEach(item => {
      if (item.category && item.category.trim()) {
        set.add(item.category.trim());
      }
    });
    return ['Todas', ...Array.from(set).sort()];
  }, [catalogItems]);

  // Compute item counts per category for scalable sidebar metrics
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Todas: catalogItems.length,
    };
    catalogItems.forEach((item) => {
      if (item.category) {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    });
    return counts;
  }, [catalogItems]);

  // Filter items dynamically by category and accent-insensitive search query
  const filteredCatalog = useMemo(() => {
    return searchLibrary(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todas');
  };

  const handleRequestBook = (item: LibraryItem) => {
    alert(`Solicitud registrada para "${item.title}". Módulo de préstamo presencial en sala.`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Toast Notification */}
      {notification && (
        <div className="p-4 bg-verde-profundo text-crema rounded-2xl shadow-xl flex items-center justify-between animate-in slide-in-from-top-4 duration-300 font-sans">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-mostaza shrink-0" />
            <span className="text-sm font-semibold">{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-xs text-crema/70 hover:text-crema">
            Descartar
          </button>
        </div>
      )}

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
              Catálogo físico bibliográfico custodiado en la Casa de la Memoria del Gran Cumbal.
            </p>
          </div>

          {/* Admin Control Actions Header */}
          {isAdmin && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-crema-dark/70 p-3.5 rounded-2xl border border-crema-dark shrink-0">
              <div className="flex items-center space-x-2 text-xs font-bold text-verde-profundo">
                <ShieldCheck size={16} className="text-terracota" />
                <span>Modo Administrador</span>
              </div>
              <button
                onClick={() => setActiveAdminModal('addLibraryBook')}
                className="px-4 py-2 bg-terracota hover:bg-terracota/90 text-crema font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
                title="Agregar nuevo libro o documento al catálogo"
              >
                <Plus size={15} />
                <span>Agregar Libro / Documento</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Scalable Layout: Left Sidebar (Categories) + Right Main Body */}
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

        {/* RIGHT MAIN BODY: Search Input, Metrics Header & Catalog Table */}
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
                placeholder="Buscar por título, autor, código (ej: BEPI00002 o BEPI00002-1), ISBN o tema..."
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

          {/* Results Header Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-2">
            <div className="flex items-center space-x-2 text-sm font-bold text-cafe/80">
              <span>Mostrando</span>
              <span className="text-verde-profundo font-extrabold text-base bg-verde-profundo/10 px-2.5 py-0.5 rounded-lg border border-verde-profundo/20">
                {filteredCatalog.length}
              </span>
              <span>obras</span>
              {selectedCategory !== 'Todas' && (
                <span className="text-xs bg-terracota/10 text-terracota font-bold px-3 py-1 rounded-full border border-terracota/20 ml-2">
                  Categoría: {selectedCategory}
                </span>
              )}
            </div>
            
            {searchQuery && (
              <span className="text-xs text-cafe/70 italic">
                Filtrado por término: &quot;{searchQuery}&quot;
              </span>
            )}
          </div>

          {/* Catalog Table */}
          {filteredCatalog.length === 0 ? (
            <div className="bg-crema/90 rounded-3xl p-12 text-center border border-crema-dark space-y-4 shadow-sm">
              <BookOpen size={48} className="text-cafe/40 mx-auto" />
              <h4 className="font-serif font-bold text-2xl text-verde-profundo">No se encontraron obras</h4>
              <p className="text-cafe/70 text-sm max-w-md mx-auto">
                No se hallaron ítems que coincidan con la búsqueda en la categoría <strong>{selectedCategory}</strong>.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 bg-verde-profundo text-crema text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-terracota transition-colors cursor-pointer"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="bg-crema/90 backdrop-blur-md rounded-2xl border border-crema-dark shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-verde-profundo text-crema text-xs font-serif font-bold tracking-wider uppercase border-b border-verde-profundo/80">
                      <th scope="col" className="py-3.5 px-4 w-32">Código</th>
                      <th scope="col" className="py-3.5 px-4">Título y Autor(es)</th>
                      <th scope="col" className="py-3.5 px-4 hidden sm:table-cell">Categoría / Colección</th>
                      <th scope="col" className="py-3.5 px-4 hidden md:table-cell">Año</th>
                      <th scope="col" className="py-3.5 px-4 text-right w-28">Ficha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-crema-dark/60 text-xs">
                    {filteredCatalog.map((item) => (
                      <tr 
                        key={item.id} 
                        className="hover:bg-crema-dark/40 transition-colors duration-150 group"
                      >
                        {/* Código */}
                        <td className="py-3.5 px-4 whitespace-nowrap align-top">
                          <div className="space-y-1">
                            <span className="inline-flex items-center space-x-1 font-mono font-bold text-verde-profundo bg-verde-profundo/10 px-2.5 py-1 rounded-lg border border-verde-profundo/20 text-[11px]">
                              <Hash size={11} className="text-terracota" />
                              <span>{item.code}</span>
                            </span>
                            {item.copiesCount > 1 && (
                              <span className="block text-[10px] font-bold text-terracota bg-terracota/10 px-2 py-0.5 rounded-full border border-terracota/20 w-fit">
                                {item.copiesCount} ejemplares
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Título & Autor(es) con truncado inteligente de autores múltiples */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="space-y-0.5 pr-2">
                            <h4 className="font-serif font-bold text-sm text-verde-profundo group-hover:text-terracota transition-colors leading-snug">
                              {item.title}
                            </h4>
                            {item.subtitle && (
                              <p className="text-[11px] italic text-cafe/70 leading-tight">
                                {item.subtitle}
                              </p>
                            )}
                            <div className="flex items-center space-x-1 text-[11px] font-semibold text-cafe/75 pt-0.5 flex-wrap gap-y-1">
                              <User size={12} className="text-terracota shrink-0" />
                              {item.authors && item.authors.length > 0 ? (
                                item.authors.length <= 2 ? (
                                  <span>{item.authors.join(', ')}</span>
                                ) : (
                                  <span className="inline-flex items-center space-x-1 flex-wrap gap-y-1">
                                    <span>{item.authors.slice(0, 2).join(', ')}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedItemModal(item);
                                      }}
                                      className="px-1.5 py-0.5 bg-terracota/10 text-terracota text-[10px] font-bold rounded-md border border-terracota/20 hover:bg-terracota hover:text-crema transition-colors cursor-pointer"
                                      title={`Autores completos: ${item.authors.join(', ')}`}
                                    >
                                      +{item.authors.length - 2} más
                                    </button>
                                  </span>
                                )
                              ) : (
                                <span>Autor no registrado</span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Categoría / Colección */}
                        <td className="py-3.5 px-4 align-top hidden sm:table-cell whitespace-nowrap">
                          <div className="space-y-1">
                            {item.category && (
                              <span className="inline-block px-2.5 py-0.5 bg-terracota/10 text-terracota font-bold text-[10px] rounded-full border border-terracota/20">
                                {item.category}
                              </span>
                            )}
                            {item.collection && (
                              <span className="text-[11px] text-cafe/80 block font-medium truncate max-w-[170px]">
                                {item.collection}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Año y Editorial */}
                        <td className="py-3.5 px-4 align-top hidden md:table-cell whitespace-nowrap">
                          <span className="font-bold text-cafe">
                            {item.year || 'N/A'}
                          </span>
                          {item.publisher && (
                            <span className="text-[10px] text-cafe/60 block truncate max-w-[140px]">
                              {item.publisher}
                            </span>
                          )}
                        </td>

                        {/* Acción / Botón Ver Ficha + Admin Controls */}
                        <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={() => setSelectedItemModal(item)}
                              className="inline-flex items-center space-x-1.5 bg-verde-profundo hover:bg-terracota text-crema font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer"
                              title="Ver Ficha Técnica"
                            >
                              <Info size={13} />
                              <span>Ver Ficha</span>
                            </button>

                            {isAdmin && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTargetBookToEdit(item);
                                    setActiveAdminModal('editLibraryBook');
                                  }}
                                  className="inline-flex items-center space-x-1 bg-verde-profundo/10 hover:bg-verde-profundo text-verde-profundo hover:text-crema font-bold text-[11px] px-2.5 py-1.5 rounded-lg transition-all border border-verde-profundo/20 cursor-pointer"
                                  title="Editar libro (Administrador)"
                                >
                                  <Edit size={12} />
                                  <span className="hidden sm:inline">Editar</span>
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm(`¿Estás seguro de eliminar "${item.title}" del catálogo?`)) {
                                      deleteLibraryItem(item.id);
                                      showNotification(`Libro "${item.title}" eliminado del catálogo.`);
                                    }
                                  }}
                                  className="inline-flex items-center space-x-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold text-[11px] p-1.5 rounded-lg transition-all border border-red-200 cursor-pointer"
                                  title="Eliminar libro (Administrador)"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal de Ficha Técnica de Inventario */}
      {selectedItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-crema rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border-2 border-crema-dark relative overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header Modal */}
            <div className="flex items-start justify-between border-b border-crema-dark pb-4">
              <div className="space-y-1.5 pr-6">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <span className="px-3 py-1 bg-verde-profundo text-crema font-mono font-bold text-xs rounded-lg inline-block">
                    {selectedItemModal.code}
                  </span>
                  {selectedItemModal.category && (
                    <span className="px-2.5 py-0.5 bg-terracota/10 text-terracota font-bold text-xs rounded-full border border-terracota/20">
                      {selectedItemModal.category}
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-2xl text-verde-profundo leading-snug">
                  {selectedItemModal.title}
                </h3>
                {selectedItemModal.subtitle && (
                  <p className="text-sm italic text-cafe/80 font-serif">
                    {selectedItemModal.subtitle}
                  </p>
                )}

                <p className="text-xs font-bold text-terracota leading-relaxed">
                  Autor(es): {selectedItemModal.authors && selectedItemModal.authors.length > 0 ? selectedItemModal.authors.join(', ') : 'No registrado'}
                </p>
              </div>
              <button
                onClick={() => setSelectedItemModal(null)}
                className="p-2 rounded-full hover:bg-crema-dark text-cafe/70 hover:text-terracota transition-colors cursor-pointer shrink-0"
              >
                <X size={24} />
              </button>
            </div>

            {/* General Metadata Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-crema-dark/60 p-4 rounded-2xl border border-crema-dark space-y-2">
                <span className="font-bold text-verde-profundo text-sm block border-b border-cafe/10 pb-1">
                  Datos de Edición & Publicación
                </span>
                <p><strong className="text-cafe">Año:</strong> {selectedItemModal.year || 'No registrado'}</p>
                <p><strong className="text-cafe">Editorial:</strong> {selectedItemModal.publisher || 'No registrada'}</p>
                <p><strong className="text-cafe">Páginas:</strong> {selectedItemModal.pages ? `${selectedItemModal.pages} págs.` : 'No registrado'}</p>
                <p><strong className="text-cafe">ISBN:</strong> {selectedItemModal.isbn || 'No contiene'}</p>
                <p><strong className="text-cafe">Colección:</strong> {selectedItemModal.collection || 'General'}</p>
              </div>

              <div className="bg-crema-dark/60 p-4 rounded-2xl border border-crema-dark space-y-2">
                <span className="font-bold text-verde-profundo text-sm block border-b border-cafe/10 pb-1">
                  Resumen de Inventario Físico
                </span>
                <p><strong className="text-cafe">Total Ejemplares:</strong> <span className="text-verde-profundo font-extrabold text-sm">{selectedItemModal.copiesCount}</span></p>
                <p><strong className="text-cafe">Categoría:</strong> {selectedItemModal.category || 'N/A'}</p>
              </div>
            </div>

            {/* List of Physical Copies (Ejemplares Físicos Registrados) */}
            {selectedItemModal.copies && selectedItemModal.copies.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-verde-profundo uppercase tracking-wider">
                  <Layers size={16} className="text-terracota" />
                  <span>Ejemplares Físicos Registrados ({selectedItemModal.copies.length})</span>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                  {selectedItemModal.copies.map((copy, idx) => (
                    <div 
                      key={idx}
                      className="bg-crema-dark/40 p-3.5 rounded-xl border border-crema-dark flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="font-mono font-bold text-verde-profundo bg-verde-profundo/10 px-2.5 py-0.5 rounded text-[11px] border border-verde-profundo/20">
                            {copy.inventoryCode}
                          </span>
                          {copy.condition && (
                            <span className="px-2 py-0.5 bg-verde-profundo/10 text-verde-profundo text-[10px] font-bold rounded-full border border-verde-profundo/20">
                              Estado: {copy.condition}
                            </span>
                          )}
                        </div>

                        <div className="text-cafe/80 text-[11px] space-x-3 pt-0.5">
                          {copy.donor && <span><strong>Donante:</strong> {copy.donor}</span>}
                          {copy.acquisitionType && <span><strong>Ingreso:</strong> {copy.acquisitionType}</span>}
                          {copy.coverType && <span><strong>Cubierta:</strong> {copy.coverType}</span>}
                          {copy.entryDate && <span><strong>Fecha:</strong> {copy.entryDate}</span>}
                        </div>

                        {copy.notes && (
                          <p className="text-[11px] italic text-cafe/70 pt-0.5">
                            Nota: {copy.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location & Custody Note */}
            <div className="p-4 bg-verde-profundo/10 rounded-2xl border border-verde-profundo/20 text-xs text-verde-profundo space-y-1">
              <div className="flex items-center space-x-2 font-bold">
                <CheckCircle2 size={16} className="text-verde-profundo" />
                <span>Ubicación Física en la Casa de la Memoria del Gran Cumbal:</span>
              </div>
              <p className="text-cafe/80 pl-6">
                Este fondo forma parte del inventario bibliográfico BEPIMP. Disponible para consulta presencial en sala o investigación comunitaria.
              </p>
            </div>

            {/* Footer Modal Actions (Solicitar + Cerrar + Admin Edit) */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-crema-dark/60">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleRequestBook(selectedItemModal)}
                  className="px-5 py-2.5 bg-terracota hover:bg-terracota/90 text-crema text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center space-x-2"
                >
                  <BookOpen size={15} />
                  <span>Solicitar</span>
                </button>

                {isAdmin && (
                  <button
                    onClick={() => {
                      const bookToEdit = selectedItemModal;
                      setSelectedItemModal(null);
                      setTargetBookToEdit(bookToEdit);
                      setActiveAdminModal('editLibraryBook');
                    }}
                    className="px-4 py-2.5 bg-verde-profundo/10 hover:bg-verde-profundo text-verde-profundo hover:text-crema text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 border border-verde-profundo/20"
                  >
                    <Edit size={14} />
                    <span>Editar Libro</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedItemModal(null)}
                className="px-6 py-2.5 bg-verde-profundo text-crema text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-terracota transition-colors cursor-pointer"
              >
                Cerrar Ficha
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Admin Action Modals for Direct Editing & Creation */}
      <AdminModals
        activeModal={activeAdminModal}
        targetBookToEdit={targetBookToEdit}
        onClose={() => {
          setActiveAdminModal(null);
          setTargetBookToEdit(null);
        }}
        onSuccessNotification={showNotification}
      />

    </div>
  );
}
