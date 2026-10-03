'use client';

import React from 'react';
import CasaMemoriaMark from './CasaMemoriaMark';

export default function FloatingBrandMark() {
  return (
    <div
      className="fixed bottom-6 right-6 z-30 pointer-events-none select-none text-verde-profundo transition-opacity duration-300 overflow-hidden"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
      aria-hidden="true"
    >
      <div className="w-[60px] h-[60px] sm:w-[85px] sm:h-[85px] md:w-[105px] md:h-[105px] opacity-80 sm:opacity-100">
        <CasaMemoriaMark animation="pulse" decorative />
      </div>
    </div>
  );
}
