'use client';

import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Archivista' | 'Historiador';
  avatar?: string;
}

export type SectionType = 'inicio' | 'sobre-el-proceso' | 'convocatoria' | 'centro-documentacion';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoginModalOpen: boolean;
  isKioskOpen: boolean;
  activeView: 'public' | 'admin';
  activeSection: SectionType;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openKioskModal: () => void;
  closeKioskModal: () => void;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  setActiveView: (view: 'public' | 'admin') => void;
  setActiveSection: (section: SectionType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isKioskOpen, setIsKioskOpen] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'public' | 'admin'>('public');
  const [activeSection, setActiveSection] = useState<SectionType>('inicio');

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openKioskModal = () => setIsKioskOpen(true);
  const closeKioskModal = () => setIsKioskOpen(false);

  const login = (email: string, password: string) => {
    const trimmedEmail = email ? email.trim().toLowerCase() : '';
    
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      return { success: false, error: 'Por favor ingresa un correo electrónico válido.' };
    }

    // Support cmgcpw@gmail.com with admincmgc2026, or legacy demo password 123
    const isValid = 
      (trimmedEmail === 'cmgcpw@gmail.com' && password === 'admincmgc2026') ||
      (password === 'admincmgc2026') ||
      (password === '123');

    if (!isValid) {
      return { success: false, error: 'Correo o clave de acceso incorrectos.' };
    }

    const mockUser: User = {
      id: 'usr_001',
      name: trimmedEmail === 'cmgcpw@gmail.com' ? 'Casa de la Memoria Admin' : trimmedEmail.split('@')[0].replace('.', ' ').toUpperCase(),
      email: trimmedEmail,
      role: 'Administrador',
    };

    setUser(mockUser);
    setIsLoginModalOpen(false);
    setActiveView('admin');

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setActiveView('public');
    setActiveSection('inicio');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoginModalOpen,
        isKioskOpen,
        activeView,
        activeSection,
        openLoginModal,
        closeLoginModal,
        openKioskModal,
        closeKioskModal,
        login,
        logout,
        setActiveView,
        setActiveSection,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
