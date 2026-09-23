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

  // Parámetros derivados: espesor/grosor vertical reducido al 50% (height 2.5px) para evitar franjas gruesas
  const segmentCount = 7;
  const segmentWidth = 31.5;
  const gap = 4;
  const totalWidth = segmentCount * segmentWidth + (segmentCount - 1) * gap; // 248.5

  useEffect(() => {
    // Respect prefers-reduced-motion settings
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) return;
    }

    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % segmentCount);
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
      {/* Isotipo circular a la izquierda */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full overflow-hidden border border-[#a69cac]/60 group-hover:border-[#a69cac] bg-crema flex items-center justify-center shadow-md group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(166,156,172,0.6)] transition-all shrink-0">
        <Image
          src="/images/hero-logo.png"
          alt="Isotipo Casa de la Memoria del Gran Cumbal"
          width={48}
          height={48}
          className="w-full h-full object-cover p-0"
          priority
        />
      </div>

      {/* Bloque de Texto Institucional + Franja Multicolor Fina */}
      <div className="inline-flex flex-col justify-center w-fit">
        {/* Renglón 1: CASA DE LA MEMORIA (Tolerancia natural y tamaño contenido) */}
        <div className="font-oswald font-medium uppercase text-crema tracking-wide leading-none text-[10.5px] xs:text-[11.5px] sm:text-xs md:text-[13px] lg:text-[14px] group-hover:text-mostaza transition-colors whitespace-nowrap">
          CASA DE LA MEMORIA
        </div>

        {/* Renglón 2: DEL GRAN CUMBAL (Mayor tamaño y peso para alineación óptica natural) */}
        <div className="font-oswald font-bold uppercase text-crema tracking-wider leading-none text-[11.5px] xs:text-[12.5px] sm:text-[13.5px] md:text-[15px] lg:text-[16.5px] group-hover:text-mostaza transition-colors whitespace-nowrap mt-0.5 sm:mt-1">
          DEL GRAN CUMBAL
        </div>

        {/* Franja decorativa de 7 segmentos SVG delgada (espesor reducido un 50% a 2.5px sin estirarse hacia abajo) */}
        <div className="w-full mt-1 overflow-hidden">
          <svg
            viewBox={`0 0 ${totalWidth} 2.5`}
            className="w-full h-[2.5px] sm:h-[3px] block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {Array.from({ length: segmentCount }).map((_, i) => {
              const colorIndex = (i - offset + segmentCount) % segmentCount;
              const color = SEGMENT_COLORS[colorIndex];
              const xPos = i * (segmentWidth + gap);

              return (
                <rect
                  key={i}
                  x={xPos}
                  y={0}
                  width={segmentWidth}
                  height={2.5}
                  rx={0.75}
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
