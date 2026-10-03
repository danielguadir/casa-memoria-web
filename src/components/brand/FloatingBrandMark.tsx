'use client';

import React from 'react';
import Image from 'next/image';

export default function FloatingBrandMark() {
  return (
    <div
      className="fixed bottom-6 right-6 z-30 pointer-events-none select-none transition-opacity duration-300 overflow-hidden"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
      aria-hidden="true"
    >
      <div className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[85px] md:h-[85px] opacity-80 sm:opacity-90 animate-pulse drop-shadow-lg">
        <Image
          src="/images/logotipo-origina/Isotipo-casamemoriaCumbal-4x.png"
          alt="Símbolo Casa de la Memoria"
          width={85}
          height={85}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
