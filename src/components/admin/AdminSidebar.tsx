'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  FolderKanban, UserPlus, UserMinus, FileEdit, FilePlus, Image as ImageIcon, 
  ChevronLeft, ChevronRight, ChevronDown, LogOut, LayoutDashboard,
  Calendar, Users
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AdminModalType } from './AdminModals';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  onOpenModal: (modal: AdminModalType) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedYear,
  setSelectedYear,
  onOpenModal,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { user, logout, setActiveView } = useAuth();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>('usuarios');

  const toggleSubmenu = (menuKey: string) => {
    setOpenSubmenu(openSubmenu === menuKey ? null : menuKey);
  };

  return (
    <aside 
      className={`
        bg-crema border-r border-crema-dark flex flex-col justify-between transition-all duration-300 z-30 shrink-0
        ${isCollapsed ? 'w-20' : 'w-72'}
        min-h-[calc(100vh-5rem)] shadow-sm font-sans
      `}
    >
      {/* Top Header & Logo */}
      <div>
        <div className="p-4 border-b border-crema-dark/80 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full border-2 border-mostaza bg-crema flex items-center justify-center shrink-0 shadow-xs">
              <Image
                src="/images/hero-logo.png"
                alt="Casa de la Memoria"
                width={40}
                height={40}
                className="w-auto h-8 object-contain p-0.5"
              />
            </div>
            {!isCollapsed && (
              <div className="animate-in fade-in duration-200">
                <span className="font-serif font-bold text-base text-verde-profundo block leading-tight truncate">
                  Casa de la Memoria
                </span>
                <span className="text-[10px] text-terracota font-bold tracking-wider uppercase block mt-0.5">
                  Panel de Administración
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-cafe/70 hover:bg-crema-dark hover:text-verde-profundo transition-colors focus:outline-none"
            title={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Primary Action Button */}
        <div className="p-3">
          <button
            onClick={() => onOpenModal('addDocument')}
            className={`
              w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-terracota text-crema font-medium text-sm
              hover:bg-terracota-light active:scale-[0.98] transition-all shadow-sm
              ${isCollapsed ? 'px-0' : ''}
            `}
            title="Registrar Nuevo Documento"
          >
            <FilePlus size={18} className="shrink-0" />
            {!isCollapsed && <span className="font-semibold truncate">Registrar Documento</span>}
          </button>
        </div>

        {/* Sidebar Navigation Tree */}
        <nav className="p-3 space-y-1">
          
          {/* 1. Resumen / Explorador Archivo */}
          <button
            onClick={() => setActiveTab('explorador')}
            className={`
              w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left
              ${activeTab === 'explorador' 
                ? 'bg-verde-profundo text-crema font-semibold shadow-xs' 
                : 'text-cafe hover:bg-crema-dark/70 hover:text-verde-profundo'}
            `}
            title="Explorador del Archivo General"
          >
            <FolderKanban size={18} className="shrink-0" />
            {!isCollapsed && <span>Explorador de Archivo</span>}
          </button>

          {/* 2. Gestión de Usuarios (Con Submenú) */}
          <div>
            <button
              onClick={() => {
                if (isCollapsed) setIsCollapsed(false);
                toggleSubmenu('usuarios');
              }}
              className={`
                w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left
                ${openSubmenu === 'usuarios' ? 'text-verde-profundo font-semibold' : 'text-cafe hover:bg-crema-dark/70'}
              `}
              title="Gestión de Usuarios"
            >
              <div className="flex items-center space-x-3">
                <Users size={18} className="shrink-0" />
                {!isCollapsed && <span>Gestión de Usuarios</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${openSubmenu === 'usuarios' ? 'rotate-180' : ''}`} 
                />
              )}
            </button>

            {!isCollapsed && openSubmenu === 'usuarios' && (
              <div className="ml-7 mt-1 space-y-1 border-l-2 border-crema-dark pl-3">
                <button
                  onClick={() => onOpenModal('createUser')}
                  className="w-full flex items-center space-x-2 text-xs py-1.5 px-2 rounded-lg text-cafe/80 hover:text-terracota hover:bg-crema-dark/50 transition-colors text-left font-medium"
                >
                  <UserPlus size={14} className="text-mostaza shrink-0" />
                  <span>Crear Usuario</span>
                </button>
                <button
                  onClick={() => onOpenModal('deleteUser')}
                  className="w-full flex items-center space-x-2 text-xs py-1.5 px-2 rounded-lg text-cafe/80 hover:text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
                >
                  <UserMinus size={14} className="text-red-500 shrink-0" />
                  <span>Eliminar Usuario</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Edición de Textos de Página */}
          <button
            onClick={() => onOpenModal('editPage')}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-cafe hover:bg-crema-dark/70 hover:text-verde-profundo transition-colors text-left"
            title="Editar Textos de la Página Web"
          >
            <FileEdit size={18} className="shrink-0" />
            {!isCollapsed && <span>Editar Sitio Web</span>}
          </button>

          {/* 4. Fototeca & Multimedia */}
          <button
            onClick={() => onOpenModal('managePhotos')}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-cafe hover:bg-crema-dark/70 hover:text-verde-profundo transition-colors text-left"
            title="Administrar Archivos y Fototeca"
          >
            <ImageIcon size={18} className="shrink-0" />
            {!isCollapsed && <span>Archivos & Fototeca</span>}
          </button>

          {/* 5. Filtro por Años en Sidebar */}
          <div>
            <button
              onClick={() => {
                if (isCollapsed) setIsCollapsed(false);
                toggleSubmenu('anos');
              }}
              className={`
                w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left
                ${openSubmenu === 'anos' ? 'text-verde-profundo font-semibold' : 'text-cafe hover:bg-crema-dark/70'}
              `}
              title="Filtrar Archivo por Años"
            >
              <div className="flex items-center space-x-3">
                <Calendar size={18} className="shrink-0" />
                {!isCollapsed && <span>Fondos por Año</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${openSubmenu === 'anos' ? 'rotate-180' : ''}`} 
                />
              )}
            </button>

            {!isCollapsed && openSubmenu === 'anos' && (
              <div className="ml-7 mt-1 space-y-1 border-l-2 border-crema-dark pl-3">
                {[
                  { label: 'Todos los Años', value: 'all' },
                  { label: 'Año 2026', value: '2026' },
                  { label: 'Año 2025', value: '2025' },
                  { label: 'Año 2024', value: '2024' },
                  { label: 'Fondo Histórico 1990', value: '1990' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setSelectedYear(item.value);
                      setActiveTab('explorador');
                    }}
                    className={`
                      w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors font-medium block truncate
                      ${selectedYear === item.value 
                        ? 'bg-mostaza/20 text-verde-profundo font-bold' 
                        : 'text-cafe/70 hover:text-verde-profundo hover:bg-crema-dark/40'}
                    `}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Footer Profile & Actions */}
      <div className="p-3 border-t border-crema-dark space-y-2 bg-crema-dark/20">
        <button
          onClick={() => setActiveView('public')}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-verde-profundo hover:bg-crema-dark transition-colors"
          title="Ver Sitio Web Público"
        >
          <LayoutDashboard size={16} className="shrink-0" />
          {!isCollapsed && <span>Ver Sitio Web</span>}
        </button>

        <div className="flex items-center justify-between p-2 rounded-xl bg-crema border border-crema-dark">
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-terracota text-crema font-bold text-xs flex items-center justify-center shrink-0">
              {user?.name?.charAt(0) || 'A'}
            </div>
            {!isCollapsed && (
              <div className="truncate text-left">
                <p className="text-xs font-bold text-verde-profundo truncate leading-none">{user?.name || 'Admin'}</p>
                <p className="text-[10px] text-cafe/60 uppercase tracking-wider font-semibold mt-0.5 truncate">{user?.role || 'Administrador'}</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={logout}
              className="p-1 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
