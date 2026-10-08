'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Calendar, X, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/design-system';

export default function VisitingHoursWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer on ESC key and prevent body scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Botón Flotante Creativo (Fijo en la esquina inferior derecha, encima del SVG de la marca) */}
      <div
        className="fixed bottom-[85px] sm:bottom-[110px] md:bottom-[125px] right-5 sm:right-6 z-40 flex items-center select-none"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
        }}
      >
        <div className="flex items-center space-x-2 group">
          {/* Pill Informativo a la izquierda del botón circular */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center space-x-2 bg-white text-cafe border border-crema-dark px-3.5 py-2 rounded-full shadow-lg hover:shadow-xl group-hover:border-terracota/60 transition-all duration-300 cursor-pointer text-xs font-semibold tracking-wide animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Visítanos</span>
            <span className="text-[#a69cac] text-[10px] font-bold">▶</span>
          </button>

          {/* Botón Circular Azul de Estilo Mensaje con Reloj */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-azul-logo hover:bg-[#0F172A] text-crema flex items-center justify-center shadow-2xl border-2 border-crema/40 group-hover:border-mostaza group-hover:scale-110 transition-all duration-300 cursor-pointer relative shrink-0"
            title="Ver Horarios de Atención"
            aria-label="Abrir Horarios de Atención"
          >
            <div className="relative flex items-center justify-center">
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-crema" />
              <Clock className="w-3.5 h-3.5 text-mostaza absolute -top-1 -right-1 bg-azul-logo rounded-full p-0.5 border border-crema/50" />
            </div>

            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-terracota rounded-full border-2 border-white animate-pulse"></span>
          </button>
        </div>
      </div>

      {/* Modal Lateral Derecho (Drawer que ocupa solo el lado derecho de la página) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Fondo Oscuro / Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel Lateral Deslizable (Ocupa solo el lado derecho) */}
          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-crema text-cafe shadow-2xl border-l-2 border-terracota flex flex-col z-50 animate-in slide-in-from-right duration-300 overflow-y-auto">
            {/* Encabezado del Modal */}
            <div className="bg-azul-logo text-crema p-6 border-b border-crema/10 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-terracota/30 border border-crema/20 flex items-center justify-center text-mostaza shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg leading-tight tracking-wide text-crema">
                    Horarios de Atención
                  </h3>
                  <p className="text-xs text-mostaza font-medium">Casa de la Memoria Cumbal</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-crema/80 hover:text-crema hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X size={22} />
              </button>
            </div>

            {/* Cuerpo del Modal */}
            <div className="p-6 space-y-6 flex-grow">
              {/* Tarjeta de Horarios de Atención */}
              <div className="bg-white rounded-2xl p-5 border border-crema-dark shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-crema-dark/60 pb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className="text-terracota" />
                    <span className="font-serif font-bold text-sm text-verde-profundo">Jornadas Abiertas</span>
                  </div>
                  <Badge variant="verde" className="text-[11px]">
                    Atención Presencial
                  </Badge>
                </div>

                {/* Lista de Horarios requeridos */}
                <div className="space-y-3 pt-1">
                  {/* Viernes */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-crema/60 border border-crema-dark/50 hover:border-terracota/40 transition-all">
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 rounded-full bg-terracota"></span>
                      <span className="font-bold text-sm text-cafe capitalize">Viernes</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-verde-profundo bg-white px-2.5 py-1 rounded-lg border border-crema-dark">
                      9:00 am - 4:00 pm
                    </span>
                  </div>

                  {/* Sábado */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-crema/60 border border-crema-dark/50 hover:border-terracota/40 transition-all">
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 rounded-full bg-mostaza"></span>
                      <span className="font-bold text-sm text-cafe capitalize">Sábado</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-verde-profundo bg-white px-2.5 py-1 rounded-lg border border-crema-dark">
                      8:00 am - 5:00 pm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
