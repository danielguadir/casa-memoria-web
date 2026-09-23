'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const SEGMENT_COLORS = [
  '#E5A800', // amarillo
  '#E30613', // rojo
  '#0055A5', // azul
  '#EDEDED', // blanco / gris claro
  '#D96B27', // naranja
  '#7030A0', // morado
  '#008C45', // verde
];

interface BrandIdentityProps {
  onLogoClick?: () => void;
  className?: string;
}

export default function BrandIdentity({ onLogoClick, className = '' }: BrandIdentityProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion settings
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) return;
    }

    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 7);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <button
      type="button"
      onClick={onLogoClick}
      className={`flex items-center space-x-2.5 sm:space-x-3.5 group select-none text-left focus:outline-none cursor-pointer ${className}`}
      title="Casa de la Memoria del Gran Cumbal"
    >
      {/* Símbolo circular Isotipo a la izquierda */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full overflow-hidden border border-crema/40 group-hover:border-crema bg-crema flex items-center justify-center shadow-md group-hover:scale-105 transition-all shrink-0">
        <Image
          src="/images/hero-logo.png"
          alt="Isotipo Casa de la Memoria del Gran Cumbal"
          width={48}
          height={48}
          className="w-full h-full object-cover p-0"
          priority
        />
      </div>

      {/* Bloque de Texto Institucional Serif + Franja Multicolor de 7 Segmentos */}
      <div className="flex flex-col justify-center">
        {/* Nombre Institucional en 2 renglones con tipografía Serif oficial */}
        <div className="font-serif tracking-wider uppercase leading-none select-none">
          <span className="block font-semibold text-crema text-[11px] xs:text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] tracking-[0.08em] whitespace-nowrap">
            CASA DE LA MEMORIA
          </span>
          <span className="block font-medium text-crema/80 text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] tracking-[0.12em] whitespace-nowrap mt-0.5">
            DEL GRAN CUMBAL
          </span>
        </div>

        {/* Franja decorativa de 7 segmentos rectangulares alineada al ancho del texto */}
        <div className="w-full mt-1 sm:mt-1.5 overflow-hidden">
          <svg
            viewBox="0 0 280 4"
            className="w-full h-[3px] sm:h-[4px] block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {Array.from({ length: 7 }).map((_, i) => {
              const colorIndex = (i - offset + 7) % 7;
              const color = SEGMENT_COLORS[colorIndex];
              const rectWidth = 36.5;
              const gap = 4;
              const xPos = i * (rectWidth + gap);

              return (
                <rect
                  key={i}
                  x={xPos}
                  y={0}
                  width={rectWidth}
                  height={4}
                  rx={1}
                  fill={color}
                  style={{
                    transition: 'fill 1000ms ease-in-out',
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </button>
  );
}
