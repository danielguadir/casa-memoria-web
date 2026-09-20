'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const SEGMENT_COLORS = [
  '#F4C400', // amarillo
  '#E30613', // rojo
  '#17639B', // azul
  '#EDEDED', // blanco/gris muy claro
  '#F47A20', // naranja
  '#7030A0', // morado
  '#008C45', // verde oscuro
  '#00C875', // verde claro
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
      setOffset((prev) => (prev + 1) % 8);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center space-x-2.5 sm:space-x-3.5 group select-none ${className}`}>
      
      {/* Logo container preserving aspect ratio */}
      <button
        type="button"
        onClick={onLogoClick}
        className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full overflow-hidden border border-[#a69cac]/60 hover:border-[#a69cac] bg-crema flex items-center justify-center shadow-md group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(166,156,172,0.6)] transition-all shrink-0 focus:outline-none cursor-pointer"
        title="Casa de la Memoria del Gran Cumbal"
      >
        <Image
          src="/images/hero-logo.png"
          alt="Logo Casa de la Memoria del Gran Cumbal"
          width={48}
          height={48}
          className="w-full h-full object-cover p-0"
          priority
        />
      </button>

      {/* Brand Text + 8-Segment Animated SVG Bar */}
      <button
        type="button"
        onClick={onLogoClick}
        className="flex flex-col justify-center text-left focus:outline-none cursor-pointer group"
      >
        {/* Two-line Institutional Name in Oswald Font */}
        <div className="font-oswald font-medium uppercase text-crema tracking-[1.8px] leading-[1.08] text-[10px] xs:text-[11px] sm:text-xs md:text-[14px] lg:text-[15px] group-hover:text-mostaza transition-colors">
          <span className="block whitespace-nowrap">CASA DE LA MEMORIA</span>
          <span className="block whitespace-nowrap">DEL GRAN CUMBAL</span>
        </div>

        {/* 8-Segment Animated SVG Bar */}
        <div className="w-full mt-1 sm:mt-1.5 overflow-hidden">
          <svg
            viewBox="0 0 240 4"
            className="w-full h-[3px] sm:h-[4px] block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {Array.from({ length: 8 }).map((_, i) => {
              // Cyclically shift color array so amarillo moves to rojo's position, etc.
              const colorIndex = (i - offset + 8) % 8;
              const color = SEGMENT_COLORS[colorIndex];
              const rectWidth = 26.5;
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
      </button>

    </div>
  );
}
