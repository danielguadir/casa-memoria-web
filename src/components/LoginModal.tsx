'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Key, AlertCircle, ShieldCheck } from 'lucide-react';
import { Modal, Input, Button } from '@/components/design-system';
import { useAuth } from '@/context/AuthContext';

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      setIsLoading(false);
      if (!result.success) {
        setError(result.error || 'Error al iniciar sesión');
      } else {
        // Reset state on success
        setEmail('');
        setPassword('');
      }
    }, 400);
  };

  return (
    <Modal
      isOpen={isLoginModalOpen}
      onClose={closeLoginModal}
      title={
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6 text-mostaza" />
          <span>Acceso al Archivo & Panel Admin</span>
        </div>
      }
      subtitle="Ingrese sus credenciales de administrador o archivista"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Demo Credential Notice */}
        <div className="p-3.5 bg-mostaza/15 border border-mostaza/40 rounded-xl text-xs text-cafe flex items-start space-x-3">
          <Key className="w-5 h-5 text-terracota shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-verde-profundo">Credenciales para Pruebas:</p>
            <p className="text-cafe/80 mt-0.5">
              Puedes ingresar cualquier correo válido (ej: <code className="bg-crema px-1.5 py-0.5 rounded font-mono font-bold">admin@casamemoria.gov.co</code>) y la clave demo <code className="bg-crema px-1.5 py-0.5 rounded font-mono font-bold text-terracota">123</code>.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center space-x-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="ejemplo@casamemoria.gov.co"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />

        <Input
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          placeholder="Ingresa tu clave (123)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-cafe/50 hover:text-cafe transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          required
        />

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={closeLoginModal}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="terracota"
            isLoading={isLoading}
            className="shadow-md"
          >
            Ingresar al Panel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
