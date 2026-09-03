'use client';

import React, { useState } from 'react';
import { 
  UserPlus, FilePlus, Image as ImageIcon, 
  Calendar, Search, Filter, FolderKanban, FileText, CheckCircle2,
  Download, Eye, Trash2, ShieldCheck, Menu, X, ChevronRight
} from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Dropdown } from '@/components/design-system';
import { useAuth } from '@/context/AuthContext';
import { AdminModals, AdminModalType } from './AdminModals';
import { AdminSidebar } from './AdminSidebar';

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
  { id: '2', title: 'Registro Fotográfico Encuentro de Sabedoras Ancestrales', code: 'FOTO-CUM-2026-09', type: 'Fotografía', year: '2026', author: 'Equipo de Memoria', status: 'Publicado', size: '18.5 MB' },
  { id: '3', title: 'Documental de Memorias Orales del Sur de Colombia', code: 'DOC-CUM-2025-14', type: 'Documento', year: '2025', author: 'Investigación Abierta', status: 'Publicado', size: '12.1 MB' },
  { id: '4', title: 'Plan de Manejo y Protección del Patrimonio Material', code: 'AGN-CUM-2024-03', type: 'Documento', year: '2024', author: 'Ministerio de Cultura', status: 'Publicado', size: '8.7 MB' },
  { id: '5', title: 'Fototeca Histórica: Primera Asambleas Comunitarias 1990', code: 'FOTO-CUM-1990-01', type: 'Fotografía', year: '1990', author: 'Archivo Histórico', status: 'Archivado', size: '45.0 MB' },
  { id: '6', title: 'Relatos de la Cordillera: Testimonios de Adultos Mayores', code: 'AUDIO-CUM-2023-02', type: 'Audio', year: '2023', author: 'Colectivo Memoria Viva', status: 'En Revisión', size: '25.3 MB' },
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
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [archives, setArchives] = useState<ArchiveItem[]>(initialArchives);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Navigation & Layout states
  const [activeTab, setActiveTab] = useState<string>('explorador');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
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
              Bienvenido, <strong className="text-terracota">{user?.name || 'Administrador'}</strong>. Control de patrimonio, archivo fotográfico, gestión de personal y edición de contenidos.
            </p>
          </div>

          {/* Quick Primary Trigger */}
          <div className="flex items-center space-x-3">
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

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <Card variant="default" className="hover:border-verde-profundo/40 transition-colors">
            <CardContent className="p-4 sm:p-5 flex items-center space-x-4">
              <div className="w-11 h-11 rounded-xl bg-verde-profundo/10 text-verde-profundo flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-cafe/60 uppercase tracking-wider font-sans">Documentos</p>
                <p className="text-xl sm:text-2xl font-bold font-serif text-verde-profundo">{archives.filter(a => a.type !== 'Fotografía').length}</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="default" className="hover:border-terracota/40 transition-colors">
            <CardContent className="p-4 sm:p-5 flex items-center space-x-4">
              <div className="w-11 h-11 rounded-xl bg-terracota/10 text-terracota flex items-center justify-center shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-cafe/60 uppercase tracking-wider font-sans">Fotografías</p>
                <p className="text-xl sm:text-2xl font-bold font-serif text-terracota">{archives.filter(a => a.type === 'Fotografía').length}</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="default" className="hover:border-mostaza/40 transition-colors">
            <CardContent className="p-4 sm:p-5 flex items-center space-x-4">
              <div className="w-11 h-11 rounded-xl bg-mostaza/20 text-cafe flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-cafe/60 uppercase tracking-wider font-sans">Años Registrados</p>
                <p className="text-xl sm:text-2xl font-bold font-serif text-cafe">1990 - 2026</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="default" className="hover:border-blue-300 transition-colors">
            <CardContent className="p-4 sm:p-5 flex items-center space-x-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-cafe/60 uppercase tracking-wider font-sans">Usuarios Activos</p>
                <p className="text-xl sm:text-2xl font-bold font-serif text-blue-800">3 Registrados</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Archive Explorer Card & Table */}
        <Card variant="default" className="shadow-md border border-crema-dark overflow-hidden">
          <CardHeader className="bg-white border-b border-crema-dark flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5">
            <div>
              <CardTitle className="text-verde-profundo flex items-center space-x-2 font-serif text-xl">
                <FolderKanban className="w-5 h-5 text-terracota" />
                <span>Explorador del Archivo General</span>
              </CardTitle>
              <p className="text-xs text-cafe/70 mt-0.5 font-sans">
                Consulta y gestiona actas, manuscritos, testimonios y registros fotográficos
              </p>
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

      </main>

      {/* Admin Action Modals */}
      <AdminModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onSuccessNotification={showNotification}
      />
    </div>
  );
}
