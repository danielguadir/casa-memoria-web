'use client';

import { Menu, X, LogOut, ChevronDown, ShieldCheck, LayoutDashboard, User } from 'lucide-react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth, SectionType } from '@/context/AuthContext';
import { Button, Badge } from '@/components/design-system';
import InDevelopmentModal from '@/components/InDevelopmentModal';
import BrandIdentity from '@/components/BrandIdentity';
import SocialHeaderBar from '@/components/SocialHeaderBar';

const navLinks: { name: string; key: SectionType; path: string; dropdown?: { name: string; path: string }[] }[] = [
  { name: 'Inicio', key: 'inicio', path: '/' },
  { name: 'Nosotros', key: 'sobre-el-proceso', path: '/nosotros' },
  {
    name: 'Tejidos de formación',
    key: 'convocatoria',
    path: '/tejidos-de-formacion',
    dropdown: [
      { name: 'Escuela de formación renacientes del gran Cumbal', path: '/tejidos-de-formacion' },
      { name: 'Seminario en comunicación comunitaria', path: '/tejidos-de-formacion' }
    ]
  },
  {
    name: 'Centro de documentación CMGC',
    key: 'centro-documentacion',
    path: '/centro-documentacion',
    dropdown: [
      { name: 'Biblioteca especializada de pueblos indígenas', path: '/centro-documentacion/biblioteca' },
      { name: 'Archivo de Memoria Audiovisual', path: '/centro-documentacion/audiovisual' },
      { name: 'Archivos digitales', path: '/centro-documentacion/archivos-digitales' }
    ]
  },
  { name: 'Contacto', key: 'inicio', path: '/contacto' },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [devModalItem, setDevModalItem] = useState<string | null>(null);

  const { 
    user, isLoggedIn, openLoginModal,
    logout, activeView, setActiveView, setActiveSection 
  } = useAuth();

  const handleNavClick = (sectionKey: SectionType, path: string = '/') => {
    setActiveSection(sectionKey);
    if (activeView === 'admin') {
      setActiveView('public');
    }

    if (path === '/contacto') {
      const footerEl = document.getElementById('contacto');
      if (footerEl) {
        footerEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/#contacto');
      }
    } else {
      router.push(path);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    setActiveSection('inicio');
    if (activeView === 'admin') {
      setActiveView('public');
    }
    router.push('/');
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLinkActive = (linkPath: string) => {
    if (activeView !== 'public') return false;
    if (linkPath === '/contacto') return false;
    if (linkPath === '/') return pathname === '/';
    return pathname === linkPath || pathname.startsWith(linkPath + '/');
  };


  const handleSubItemClick = (sectionKey: SectionType, subItemName: string, path: string) => {
    handleNavClick(sectionKey, path);
    setOpenDropdown(null);
    setExpandedMobileMenu(null);
    setIsOpen(false);
  };

  const toggleMobileDropdown = (linkName: string) => {
    setExpandedMobileMenu(prev => (prev === linkName ? null : linkName));
  };

  const handleMobileMenuToggle = () => {
    setIsOpen(prev => {
      if (!prev) setExpandedMobileMenu(null);
      return !prev;
    });
  };

  return (
    <>
      <nav className="bg-verde-profundo text-crema sticky top-0 z-50 shadow-md border-b-2 border-[#a69cac]">
        {/* Superior Social Bar (Solo redes sociales) */}
        <div className="hidden sm:block border-b border-crema/10 bg-black/20 py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-end items-center">
            <SocialHeaderBar variant="header" />
          </div>
        </div>



        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            
            {/* Logo & Brand Name */}
            <div className="flex items-center">
              <BrandIdentity onLogoClick={handleLogoClick} />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.path);
                const isDropdownOpen = openDropdown === link.name;

                return (
                  <div
                    key={link.name}
                    className="relative group h-full flex items-center"
                    onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                    onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
                  >
                    {link.dropdown ? (
                      <div className="relative flex items-center">
                        <button
                          onClick={() => handleNavClick(link.key, link.path)}
                          className={`
                            flex items-center space-x-1 transition-colors duration-300 font-medium text-xs lg:text-sm tracking-wide py-2 px-1 rounded-md cursor-pointer
                            ${isActive ? 'text-[#a69cac] font-bold border-b-2 border-[#a69cac]' : 'hover:text-[#a69cac]'}
                          `}
                        >
                          <span>{link.name}</span>
                          <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#a69cac]' : ''}`} />
                        </button>

                        {/* Dropdown Desktop */}
                        {isDropdownOpen && (
                          <div className="absolute top-full left-0 min-w-[280px] bg-crema text-cafe rounded-b-xl shadow-xl border-t-2 border-[#a69cac] py-2 animate-in fade-in slide-in-from-top-2 z-[60]">
                            {link.dropdown.map((item) => (
                              <button
                                key={item.name}
                                onClick={() => handleSubItemClick(link.key, item.name, item.path)}
                                className="w-full text-left px-4 py-2.5 hover:bg-crema-dark hover:text-terracota transition-colors text-xs font-semibold leading-snug flex items-center justify-between group/sub cursor-pointer"
                              >
                                <span>{item.name}</span>
                                <span className="text-[10px] text-[#a69cac] group-hover/sub:text-terracota">↗</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleNavClick(link.key, link.path)}
                        className={`
                          transition-colors duration-300 font-medium text-xs lg:text-sm tracking-wide py-1 px-1 rounded-md cursor-pointer
                          ${isActive ? 'text-[#a69cac] font-bold border-b-2 border-[#a69cac]' : 'hover:text-[#a69cac]'}
                        `}
                      >
                        {link.name}
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Auth Buttons / Profile Menu */}
              {!isLoggedIn ? (
                <button
                  onClick={openLoginModal}
                  className="p-2 sm:p-2.5 rounded-full bg-terracota hover:bg-terracota/80 text-crema transition-all duration-300 shadow-md hover:scale-105 border border-crema/20 cursor-pointer focus:outline-none flex items-center justify-center shrink-0"
                  title="Ingresar / Iniciar sesión"
                  aria-label="Ingresar / Iniciar sesión"
                >
                  <User size={18} className="text-crema sm:w-5 sm:h-5" />
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant={activeView === 'admin' ? 'mostaza' : 'secondary'}
                    size="sm"
                    onClick={() => {
                      if (activeView !== 'admin') {
                        setActiveView('admin');
                        router.push('/');
                      } else {
                        setActiveView('public');
                      }
                    }}
                    leftIcon={<LayoutDashboard size={14} />}
                    className="text-xs"
                  >
                    {activeView === 'admin' ? 'Ver Sitio' : 'Panel Admin'}
                  </Button>

                  {/* Profile Avatar & Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 bg-terracota/30 hover:bg-terracota/50 p-1.5 pr-3 rounded-full transition-all duration-300 border border-crema/30 cursor-pointer"
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
                            router.push('/');
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-crema-dark hover:text-terracota transition-colors text-sm flex items-center space-x-2 font-medium cursor-pointer"
                        >
                          <ShieldCheck size={16} />
                          <span>Panel Administración</span>
                        </button>

                        <button 
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors text-sm flex items-center space-x-2 border-t border-crema-dark font-medium cursor-pointer"
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

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden space-x-2">
              {!isLoggedIn ? (
                <button
                  onClick={openLoginModal}
                  className="p-2 rounded-full bg-terracota text-crema transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center shrink-0"
                  title="Ingresar / Iniciar sesión"
                  aria-label="Ingresar / Iniciar sesión"
                >
                  <User size={18} className="text-crema" />
                </button>
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
                onClick={handleMobileMenuToggle}
                className="text-crema hover:text-[#a69cac] focus:outline-none p-1 cursor-pointer"
                aria-label="Abrir menú de navegación"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Accordion */}
        {isOpen && (
          <div className="md:hidden bg-verde-profundo border-t border-verde-profundo/80 animate-in fade-in duration-200 max-h-[80vh] overflow-y-auto">
            <div className="px-3 pt-2 pb-4 space-y-1.5">
              {navLinks.map((link) => {
                const isMobileExpanded = expandedMobileMenu === link.name;
                const isActive = isLinkActive(link.path);

                return (
                  <div key={link.name} className="space-y-1">
                    {link.dropdown ? (
                      <button
                        onClick={() => toggleMobileDropdown(link.name)}
                        className={`
                          w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-crema flex items-center justify-between cursor-pointer
                          ${isActive ? 'bg-terracota/30 text-[#a69cac] font-bold' : 'hover:bg-terracota/20'}
                        `}
                      >
                        <span>{link.name}</span>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-300 ${isMobileExpanded ? 'rotate-180 text-[#a69cac]' : 'text-crema/70'}`} 
                        />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleNavClick(link.key, link.path);
                          setIsOpen(false);
                        }}
                        className={`
                          w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-crema block cursor-pointer
                          ${isActive ? 'bg-terracota/30 text-[#a69cac] font-bold' : 'hover:bg-terracota/20'}
                        `}
                      >
                        {link.name}
                      </button>
                    )}

                    {/* Desplegable en Móvil */}
                    {link.dropdown && isMobileExpanded && (
                      <div className="ml-3 pl-3 border-l-2 border-[#a69cac]/50 space-y-1 my-1 py-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        {link.dropdown.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={() => handleSubItemClick(link.key, subItem.name, subItem.path)}
                            className="w-full text-left px-3 py-2 text-xs text-crema/90 hover:bg-terracota/40 hover:text-[#a69cac] rounded-md block font-medium transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <span>{subItem.name}</span>
                            <span className="text-[10px] text-[#a69cac]">↗</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoggedIn && (
                <div className="border-t border-crema/10 mt-3 pt-3 space-y-2">
                  <div className="px-3 py-1">
                    <p className="text-xs text-[#a69cac] font-bold">Conectado como: {user?.name}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-base font-medium flex items-center space-x-3 text-red-300 hover:bg-red-950/40 cursor-pointer"
                  >
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}

              {/* Redes Sociales en vista móvil */}
              <div className="border-t border-crema/10 mt-3 pt-3 px-2 flex flex-col items-center space-y-2">
                <p className="text-[11px] text-[#a69cac] font-semibold uppercase tracking-wider">Redes Sociales</p>
                <SocialHeaderBar variant="mobile" className="justify-center" />
              </div>

            </div>
          </div>
        )}

      </nav>

      {/* Modal interactivo para ítems adicionales en desarrollo */}
      <InDevelopmentModal
        isOpen={!!devModalItem}
        onClose={() => setDevModalItem(null)}
        itemName={devModalItem || undefined}
      />
    </>
  );
}
