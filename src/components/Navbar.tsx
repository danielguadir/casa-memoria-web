'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Sobre el proceso', href: '#sobre-el-proceso' },
    { name: 'Convocatoria', href: '#convocatoria' },
    {
        name: 'Memoria',
        href: '#memoria',
        dropdown: [
            { name: 'Documentales', href: '#' },
            { name: 'Hallazgos', href: '#' }
        ]
    },
    { name: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMemoriaOpen, setIsMemoriaOpen] = useState(false);

    return (
        <nav className="bg-verde-profundo text-crema sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center space-x-3">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-mostaza bg-crema flex items-center justify-center">
                                <Image
                                    src="/images/hero-logo.png"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="w-auto h-10 object-contain p-1"
                                />
                            </div>
                            <span className="font-serif font-bold text-xl tracking-wide hidden sm:block">Casa de la Memoria</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative group h-full flex items-center"
                                onMouseEnter={() => link.dropdown && setIsMemoriaOpen(true)}
                                onMouseLeave={() => link.dropdown && setIsMemoriaOpen(false)}
                            >
                                {link.dropdown ? (
                                    <div className="relative flex items-center">
                                        <Link
                                            href={link.href}
                                            className="flex items-center space-x-1 hover:text-mostaza transition-colors duration-300 font-medium text-sm lg:text-base tracking-wide py-2"
                                            onClick={() => setIsMemoriaOpen(false)}
                                        >
                                            <span>{link.name}</span>
                                            <ChevronDown size={14} className={`transition-transform duration-300 ${isMemoriaOpen ? 'rotate-180' : ''}`} />
                                        </Link>

                                        {/* Dropdown Desktop */}
                                        {isMemoriaOpen && (
                                            <div className="absolute top-full left-0 w-48 bg-crema text-cafe rounded-b-xl shadow-xl border-t-2 border-terracota py-2 animate-in fade-in slide-in-from-top-2 z-[60]">
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="block px-4 py-2 hover:bg-crema-dark hover:text-terracota transition-colors text-sm font-medium"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="hover:text-mostaza transition-colors duration-300 font-medium text-sm lg:text-base tracking-wide"
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* User Profile / Login Placeholder */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 bg-terracota/20 hover:bg-terracota/40 p-2 rounded-full transition-all duration-300 border border-crema/20"
                            >
                                <div className="w-8 h-8 rounded-full bg-terracota flex items-center justify-center">
                                    <User size={18} className="text-crema" />
                                </div>
                                <ChevronDown size={14} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-crema text-cafe rounded-xl shadow-2xl border border-crema-dark py-2 z-50 animate-in fade-in zoom-in-95">
                                    <div className="px-4 py-2 border-b border-crema-dark bg-crema-dark/30">
                                        <p className="text-xs text-cafe/50 uppercase tracking-widest font-bold">Sesión</p>
                                        <p className="text-sm font-bold text-verde-profundo">Usuario Invitado</p>
                                    </div>
                                    <button className="w-full text-left px-4 py-2 hover:bg-crema-dark hover:text-terracota transition-colors text-sm flex items-center space-x-2">
                                        <User size={16} />
                                        <span>Mi Perfil</span>
                                    </button>
                                    <button className="w-full text-left px-4 py-2 hover:bg-crema-dark text-red-600 transition-colors text-sm flex items-center space-x-2 border-t border-crema-dark">
                                        <LogOut size={16} />
                                        <span>Salir</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-crema hover:text-mostaza focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-verde-profundo border-t border-verde-profundo/80">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                {link.dropdown ? (
                                    <div className="space-y-1">
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-3 py-2 rounded-md text-base font-bold text-mostaza hover:bg-terracota hover:text-crema transition-colors"
                                        >
                                            {link.name} (Ir a sección)
                                        </Link>
                                        {link.dropdown.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-6 py-2 rounded-md text-base font-medium hover:bg-terracota hover:text-crema transition-colors pl-8 text-crema/70"
                                            >
                                                {item.name} (Próximamente)
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-terracota hover:text-crema transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="border-t border-crema/10 mt-4 pt-4 pb-2">
                            <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3 text-red-300">
                                <LogOut size={20} />
                                <span>Salir</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
