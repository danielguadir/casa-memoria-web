'use client';

import Image from 'next/image';
import { Menu, X, LogOut, ChevronDown, ShieldCheck, LayoutDashboard, LogIn, Monitor } from 'lucide-react';
import { useState } from 'react';
import { useAuth, SectionType } from '@/context/AuthContext';
import { Button, Badge } from '@/components/design-system';

const navLinks: { name: string; key: SectionType; href: string; dropdown?: { name: string; href: string }[] }[] = [
  { name: 'Inicio', key: 'inicio', href: '#' },
  { name: 'Nosotros', key: 'sobre-el-proceso', href: '#' },
  { name: 'Convocatoria', key: 'convocatoria', href: '#' },
  {
    name: 'Memoria',
    key: 'memoria',
    href: '#',
    dropdown: [
      { name: 'Documentales', href: '#' },
      { name: 'Hallazgos', href: '#' }
    ]
  },
  { name: 'Contacto', key: 'inicio', href: '#contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMemoriaOpen, setIsMemoriaOpen] = useState(false);

  const { 
    user, isLoggedIn, openLoginModal, openKioskModal, 
    logout, activeView, setActiveView, activeSection, setActiveSection 
  } = useAuth();

  const handleNavClick = (sectionKey: SectionType, href?: string) => {
    setActiveSection(sectionKey);
    if (activeView === 'admin') {
      setActiveView('public');
    }
    if (href === '#contacto') {
      const footerEl = document.getElementById('contacto');
      if (footerEl) {
        footerEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-verde-profundo text-crema sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavClick('inicio')}
              className="flex-shrink-0 flex items-center space-x-3 group text-left focus:outline-none"
            >
              <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-mostaza bg-crema flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                <Image
                  src="/images/hero-logo.png"
                  alt="Logo Casa de la Memoria"
                  width={52}
                  height={52}
                  className="w-auto h-11 sm:h-12 object-contain p-0.5 scale-110"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-serif font-bold text-xl tracking-wide block leading-none">
                  Casa de la Memoria
                </span>
                <span className="text-[10px] text-mostaza uppercase tracking-widest block mt-0.5 font-medium">
                  Archivo & Salvaguarda
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.key && activeView === 'public' && link.href !== '#contacto';
              return (
                <div
                  key={link.name}
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => link.dropdown && setIsMemoriaOpen(true)}
                  onMouseLeave={() => link.dropdown && setIsMemoriaOpen(false)}
                >
                  {link.dropdown ? (
                    <div className="relative flex items-center">
                      <button
                        onClick={() => handleNavClick(link.key)}
                        className={`
                          flex items-center space-x-1 transition-colors duration-300 font-medium text-sm lg:text-base tracking-wide py-2
                          ${isActive ? 'text-mostaza font-bold border-b-2 border-mostaza' : 'hover:text-mostaza'}
                        `}
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isMemoriaOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Desktop */}
                      {isMemoriaOpen && (
                        <div className="absolute top-full left-0 w-48 bg-crema text-cafe rounded-b-xl shadow-xl border-t-2 border-terracota py-2 animate-in fade-in slide-in-from-top-2 z-[60]">
                          {link.dropdown.map((item) => (
                            <button
                              key={item.name}
                              onClick={() => {
                                handleNavClick('memoria');
                                setIsMemoriaOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-crema-dark hover:text-terracota transition-colors text-sm font-medium"
                            >
                              {item.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.key, link.href)}
                      className={`
                        transition-colors duration-300 font-medium text-sm lg:text-base tracking-wide py-1 px-1 rounded-md
                        ${isActive ? 'text-mostaza font-bold border-b-2 border-mostaza' : 'hover:text-mostaza'}
                      `}
                    >
                      {link.name}
                    </button>
                  )}
                </div>
              );
            })}

            {/* Public Kiosk Terminal Button */}
            <Button
              variant="mostaza"
              size="sm"
              onClick={openKioskModal}
              leftIcon={<Monitor size={16} />}
              className="shadow-sm font-bold animate-pulse hover:animate-none"
              title="Abrir la Consulta Pública - Casa de la Memoria Cumbal"
            >
              Consulta Pública
            </Button>

            {/* Auth Buttons / Profile Menu */}
            {!isLoggedIn ? (
              <Button
                variant="terracota"
                size="sm"
                onClick={openLoginModal}
                leftIcon={<LogIn size={16} />}
                className="shadow-sm font-semibold"
              >
                Ingresar
              </Button>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Switch view button */}
                <Button
                  variant={activeView === 'admin' ? 'mostaza' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveView(activeView === 'admin' ? 'public' : 'admin')}
                  leftIcon={<LayoutDashboard size={16} />}
                >
                  {activeView === 'admin' ? 'Ver Sitio Web' : 'Panel Admin'}
                </Button>

                {/* Profile Avatar & Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 bg-terracota/30 hover:bg-terracota/50 p-1.5 pr-3 rounded-full transition-all duration-300 border border-crema/30"
                  >
                    <div className="w-7 h-7 rounded-full bg-terracota flex items-center justify-center text-crema font-bold text-xs">
                      {user?.name?.charAt(0) || 'A'}
                    </div>
                    <span className="text-xs font-semibold text-crema hidden lg:inline max-w-[100px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-crema text-cafe rounded-xl shadow-2xl border border-crema-dark py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2 border-b border-crema-dark bg-crema-dark/30">
                        <p className="text-xs text-cafe/50 uppercase tracking-widest font-bold">Sesión Activa</p>
                        <p className="text-sm font-bold text-verde-profundo truncate">{user?.name}</p>
                        <Badge variant="terracota" className="mt-1">
                          {user?.role}
                        </Badge>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setActiveView('admin');
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-crema-dark hover:text-terracota transition-colors text-sm flex items-center space-x-2 font-medium"
                      >
                        <ShieldCheck size={16} />
                        <span>Panel Administración</span>
                      </button>

                      <button 
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors text-sm flex items-center space-x-2 border-t border-crema-dark font-medium"
                      >
                        <LogOut size={16} />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button & Mobile Kiosk trigger */}
          <div className="flex items-center md:hidden space-x-2">
            <Button
              variant="mostaza"
              size="sm"
              onClick={openKioskModal}
              leftIcon={<Monitor size={14} />}
              className="text-xs px-2.5"
            >
              Consultar
            </Button>

            {!isLoggedIn ? (
              <Button
                variant="terracota"
                size="sm"
                onClick={openLoginModal}
                leftIcon={<LogIn size={14} />}
                className="text-xs px-2.5"
              >
                Ingresar
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveView(activeView === 'admin' ? 'public' : 'admin')}
                className="text-xs px-2.5"
              >
                {activeView === 'admin' ? 'Sitio' : 'Admin'}
              </Button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-crema hover:text-mostaza focus:outline-none p-1"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-verde-profundo border-t border-verde-profundo/80 animate-in fade-in duration-200">
          <div className="px-3 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                <button
                  onClick={() => {
                    handleNavClick(link.key, link.href);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-base font-medium hover:bg-terracota hover:text-crema transition-colors text-crema"
                >
                  {link.name}
                </button>
              </div>
            ))}

            <div className="pt-2 border-t border-crema/10">
              <Button
                variant="mostaza"
                size="md"
                onClick={() => {
                  openKioskModal();
                  setIsOpen(false);
                }}
                leftIcon={<Monitor size={18} />}
                fullWidth
              >
                Abrir Consulta Pública
              </Button>
            </div>

            {isLoggedIn && (
              <div className="border-t border-crema/10 mt-3 pt-3 space-y-2">
                <div className="px-3 py-1">
                  <p className="text-xs text-mostaza font-bold">Conectado como: {user?.name}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-base font-medium flex items-center space-x-3 text-red-300 hover:bg-red-950/40"
                >
                  <LogOut size={20} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
