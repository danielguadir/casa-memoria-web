'use client';

import React, { useState, useEffect } from 'react';
import { 
  FilePlus, Image as ImageIcon, 
  Calendar, Search, Filter, FolderKanban, FileText, CheckCircle2,
  Download, Eye, Trash2, ShieldCheck, Menu, X, ChevronRight, BookOpen, Edit, Plus
} from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Dropdown } from '@/components/design-system';
import { useAuth } from '@/context/AuthContext';
import { AdminModals, AdminModalType } from './AdminModals';
import { AdminSidebar } from './AdminSidebar';
import { getLibraryCatalog, deleteLibraryItem, LibraryItem } from '@/data/libraryCatalog';

// Mock initial data for Archivo General / Casa de la Memoria
interface ArchiveItem {
  id: string;
  title: string;
  code: string;
  type: 'Documento' | 'Fotografía' | 'Audio' | 'Acta';
  year: string;
  author: string;
  status: 'Publicado' | 'En Revisión' | 'Archivado';
  size: string;
}

const initialArchives: ArchiveItem[] = [
  { id: '1', title: 'Acta de Salvaguarda del Territorio Ancestral Cumbal', code: 'AGN-CUM-2026-01', type: 'Acta', year: '2026', author: 'Cabildo Gobernador', status: 'Publicado', size: '4.2 MB' },
];

const yearOptions = [
  { label: 'Todos los Años', value: 'all' },
  { label: 'Año 2026', value: '2026' },
  { label: 'Año 2025', value: '2025' },
  { label: 'Año 2024', value: '2024' },
  { label: 'Año 2023', value: '2023' },
  { label: 'Fondo Histórico 1990', value: '1990' },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState<AdminModalType>(null);
  const [targetBookToEdit, setTargetBookToEdit] = useState<LibraryItem | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [archives, setArchives] = useState<ArchiveItem[]>(initialArchives);
  const [libraryBooks, setLibraryBooks] = useState<LibraryItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Navigation & Layout states
  const [activeTab, setActiveTab] = useState<string>('biblioteca');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    setLibraryBooks(getLibraryCatalog());

    const handleUpdate = () => {
      setLibraryBooks(getLibraryCatalog());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('libraryCatalogUpdated', handleUpdate);
      return () => window.removeEventListener('libraryCatalogUpdated', handleUpdate);
    }
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Filter library books
  const filteredLibraryBooks = libraryBooks.filter((book) => {
    const q = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      book.code.toLowerCase().includes(q) ||
      (book.authors && book.authors.some(a => a.toLowerCase().includes(q))) ||
      (book.category && book.category.toLowerCase().includes(q))
    );
  });

  const handleDeleteBook = (id: string, title: string) => {
    if (confirm(`¿Estás seguro de eliminar el libro "${title}" del catálogo?`)) {
      deleteLibraryItem(id);
      showNotification(`Libro "${title}" eliminado del catálogo de la Biblioteca.`);
    }
  };

  // Filter archives by selected year dropdown & search input query
  const filteredArchives = archives.filter((item) => {
    const matchesYear = selectedYear === 'all' || item.year === selectedYear;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  const handleDeleteItem = (id: string, title: string) => {
    setArchives(archives.filter((item) => item.id !== id));
    showNotification(`Elemento "${title}" eliminado del archivo general.`);
  };

  return (
    <div className="min-h-screen bg-crema-dark/30 flex flex-col md:flex-row">
      
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden bg-verde-profundo text-crema px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-mostaza" />
          <span className="font-serif font-bold text-sm">Panel Admin</span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-1 text-crema hover:text-mostaza focus:outline-none"
        >
          {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex">
          <div className="w-72 bg-crema h-full shadow-2xl animate-in slide-in-from-left duration-200">
            <AdminSidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setIsMobileSidebarOpen(false);
              }}
              selectedYear={selectedYear}
              setSelectedYear={(yr) => {
                setSelectedYear(yr);
                setIsMobileSidebarOpen(false);
              }}
              onOpenModal={(modal) => {
                setActiveModal(modal);
                setIsMobileSidebarOpen(false);
              }}
              isCollapsed={false}
              setIsCollapsed={() => {}}
            />
          </div>
          <div className="flex-1" onClick={() => setIsMobileSidebarOpen(false)} />
        </div>
      )}

      {/* Desktop Left Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          onOpenModal={setActiveModal}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* Notification Toast */}
        {notification && (
          <div className="p-4 bg-verde-profundo text-crema rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-mostaza shrink-0" />
              <span className="text-sm font-semibold font-sans">{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-xs text-crema/70 hover:text-crema">
              Descartar
            </button>
          </div>
        )}

        {/* Top Breadcrumb & User Welcome Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-crema-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-cafe/60 font-medium">
              <span>Panel Admin</span>
              <ChevronRight size={12} />
              <span className="text-verde-profundo font-bold uppercase tracking-wider">Explorador & Salvaguarda</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-verde-profundo mt-1">
              Panel de Administración
            </h1>
            <p className="text-sm text-cafe/80 mt-1 max-w-2xl font-sans">
              Bienvenido, <strong className="text-terracota">{user?.name || user?.email || 'Administrador'}</strong>
            </p>
          </div>

          {/* Quick Primary Triggers */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              leftIcon={<BookOpen size={16} className="text-mostaza" />}
              onClick={() => setActiveModal('addLibraryBook')}
              className="shadow-sm font-semibold bg-verde-profundo hover:bg-verde-profundo/90 text-crema"
            >
              Registrar Libro (BEPIMP)
            </Button>

            <Button
              variant="terracota"
              size="md"
              leftIcon={<FilePlus size={16} />}
              onClick={() => setActiveModal('addDocument')}
              className="shadow-sm font-semibold"
            >
              Registrar Documento
            </Button>
          </div>
        </div>

        {/* Dynamic Tab 1: Biblioteca Especializada BEPIMP */}
        {activeTab === 'biblioteca' && (
          <Card variant="default" className="shadow-md border border-crema-dark overflow-hidden">
            <CardHeader className="bg-white border-b border-crema-dark flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5">
              <div>
                <CardTitle className="text-verde-profundo flex items-center space-x-2 font-serif text-xl">
                  <BookOpen className="w-5 h-5 text-terracota" />
                  <span>Catálogo de la Biblioteca Especializada (BEPIMP)</span>
                </CardTitle>
                <p className="text-xs text-cafe/70 mt-0.5 font-sans">
                  Gestión completa de ejemplares, autores, categorías y datos catalográficos ({libraryBooks.length} títulos).
                </p>
              </div>

              {/* Search Bar & Action */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto font-sans">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Buscar por código, título, autor o categoría..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-crema border border-crema-dark text-cafe focus:ring-2 focus:ring-verde-profundo/20 focus:border-verde-profundo font-medium"
                  />
                  <Search className="w-4 h-4 text-cafe/50 absolute left-3 top-2.5" />
                </div>

                <Button
                  variant="terracota"
                  size="sm"
                  leftIcon={<Plus size={14} />}
                  onClick={() => setActiveModal('addLibraryBook')}
                  className="w-full sm:w-auto text-xs"
                >
                  Nuevo Libro
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 font-sans">
              {filteredLibraryBooks.length === 0 ? (
                <div className="p-12 text-center text-cafe/60 space-y-2">
                  <Filter className="w-8 h-8 text-terracota/50 mx-auto" />
                  <p className="font-semibold text-sm">No se encontraron libros para la búsqueda ingresada.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm text-cafe">
                    <thead className="bg-crema-dark/50 border-b border-crema-dark text-cafe font-semibold tracking-wider uppercase text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Código</th>
                        <th className="py-3.5 px-4">Título del Libro</th>
                        <th className="py-3.5 px-4">Autores</th>
                        <th className="py-3.5 px-4">Categoría</th>
                        <th className="py-3.5 px-4 text-center">Ejemplares</th>
                        <th className="py-3.5 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-crema-dark/40 bg-white">
                      {filteredLibraryBooks.map((book) => (
                        <tr key={book.id} className="hover:bg-crema/40 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-terracota text-xs">
                            {book.code}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-verde-profundo block leading-snug">{book.title}</span>
                            {book.subtitle && (
                              <span className="text-xs text-cafe/70 block mt-0.5 font-sans">{book.subtitle}</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-xs font-medium text-cafe/90">
                            {book.authors && book.authors.length > 0 ? book.authors.join(', ') : 'N/A'}
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-crema-dark text-verde-profundo border border-crema-dark">
                              {book.category || 'General'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <Badge variant="neutral" className="font-mono text-xs">
                              {book.copiesCount || book.copies?.length || 1}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-right space-x-1 shrink-0">
                            <button
                              onClick={() => {
                                setTargetBookToEdit(book);
                                setActiveModal('editLibraryBook');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-verde-profundo/10 hover:bg-verde-profundo text-verde-profundo hover:text-crema transition-colors text-xs font-bold inline-flex items-center space-x-1 cursor-pointer"
                              title="Editar datos del libro"
                            >
                              <Edit size={12} />
                              <span>Editar</span>
                            </button>

                            <button
                              onClick={() => handleDeleteBook(book.id, book.title)}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors inline-flex items-center cursor-pointer"
                              title="Eliminar libro del catálogo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Dynamic Tab 2: Archivo General */}
        {activeTab === 'explorador' && (
          <Card variant="default" className="shadow-md border border-crema-dark overflow-hidden">
            <CardHeader className="bg-white border-b border-crema-dark flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5">
              <div>
                <CardTitle className="text-verde-profundo flex items-center space-x-2 font-serif text-xl">
                  <FolderKanban className="w-5 h-5 text-terracota" />
                  <span>Explorador del Archivo General</span>
                </CardTitle>
              </div>

              {/* Filters Row (Year Dropdown & Search Bar) */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto font-sans">
                <Dropdown
                  label="Año:"
                  options={yearOptions}
                  selectedValue={selectedYear}
                  onSelect={(val) => setSelectedYear(val)}
                />

                <div className="relative w-full sm:w-64 mt-2 sm:mt-0">
                  <input
                    type="text"
                    placeholder="Buscar por código o título..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-crema border border-crema-dark text-cafe focus:ring-2 focus:ring-verde-profundo/20 focus:border-verde-profundo font-medium"
                  />
                  <Search className="w-4 h-4 text-cafe/50 absolute left-3 top-2.5" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 font-sans">
              {filteredArchives.length === 0 ? (
                <div className="p-12 text-center text-cafe/60 space-y-2">
                  <Filter className="w-8 h-8 text-terracota/50 mx-auto" />
                  <p className="font-semibold text-sm">No se encontraron registros para la búsqueda o año seleccionado.</p>
                  <p className="text-xs text-cafe/50">Prueba cambiando el filtro de años o limpiando el texto de búsqueda.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm text-cafe">
                    <thead className="bg-crema-dark/50 border-b border-crema-dark text-cafe font-semibold tracking-wider uppercase text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4 sm:px-6">Título del Registro</th>
                        <th className="py-3.5 px-4">Código Ref.</th>
                        <th className="py-3.5 px-4">Tipo</th>
                        <th className="py-3.5 px-4">Año</th>
                        <th className="py-3.5 px-4">Estado</th>
                        <th className="py-3.5 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-crema-dark/40 bg-white">
                      {filteredArchives.map((item) => (
                        <tr key={item.id} className="hover:bg-crema/40 transition-colors">
                          <td className="py-4 px-4 sm:px-6 font-medium text-verde-profundo">
                            <div className="flex items-center space-x-2">
                              {item.type === 'Fotografía' ? (
                                <ImageIcon className="w-4 h-4 text-terracota shrink-0" />
                              ) : (
                                <FileText className="w-4 h-4 text-verde-profundo shrink-0" />
                              )}
                              <span className="font-semibold line-clamp-1">{item.title}</span>
                            </div>
                            <span className="text-[11px] text-cafe/50 block mt-0.5">Autor: {item.author} ({item.size})</span>
                          </td>

                          <td className="py-4 px-4 font-mono text-xs text-cafe/80">
                            {item.code}
                          </td>

                          <td className="py-4 px-4">
                            <Badge variant={item.type === 'Fotografía' ? 'mostaza' : 'verde'}>
                              {item.type}
                            </Badge>
                          </td>

                          <td className="py-4 px-4 font-bold text-cafe">
                            <Badge variant="cafe" icon={<Calendar className="w-3 h-3 text-terracota" />}>
                              {item.year}
                            </Badge>
                          </td>

                          <td className="py-4 px-4">
                            <Badge 
                              variant={
                                item.status === 'Publicado' ? 'verde' : item.status === 'En Revisión' ? 'mostaza' : 'neutral'
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>

                          <td className="py-4 px-4 text-right space-x-2 shrink-0">
                            <button
                              onClick={() => showNotification(`Previsualizando "${item.title}"...`)}
                              className="p-1.5 rounded-lg text-verde-profundo hover:bg-verde-profundo/10 transition-colors"
                              title="Ver detalle"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => showNotification(`Descargando copia digital de "${item.title}"...`)}
                              className="p-1.5 rounded-lg text-terracota hover:bg-terracota/10 transition-colors"
                              title="Descargar"
                            >
                              <Download className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteItem(item.id, item.title)}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

      </main>

      {/* Admin Action Modals */}
      <AdminModals
        activeModal={activeModal}
        targetBookToEdit={targetBookToEdit}
        onClose={() => {
          setActiveModal(null);
          setTargetBookToEdit(null);
        }}
        onSuccessNotification={showNotification}
      />
    </div>
  );
}
