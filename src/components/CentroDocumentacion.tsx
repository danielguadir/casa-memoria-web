'use client';

import React from 'react';
import { PenTool } from 'lucide-react';
import Image from 'next/image';

export default function CentroDocumentacion() {
  return (
    <section id="centro-documentacion" className="py-20 sm:py-24 bg-crema-dark text-cafe relative overflow-hidden min-h-[60vh] flex items-center justify-center">

      {/* Background Image - Estilo ancestral */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/piedra-m.jpg"
          alt="Textura piedra ancestral"
          fill
          className="object-cover object-center grayscale contrast-125 brightness-90 opacity-40 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-crema-dark via-transparent/50 to-crema-dark z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

        {/* Único contenido del body: Mensaje principal */}
        <div className="text-center max-w-3xl mx-auto space-y-6 py-8">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-crema/80 rounded-full backdrop-blur-sm border border-crema-dark shadow-md">
              <PenTool className="text-mostaza" size={32} />
            </div>
          </div>
          <span className="text-mostaza font-bold text-sm tracking-widest uppercase">Patrimonio Vivo</span>
          <h2 className="font-serif font-bold text-4xl lg:text-5xl text-verde-profundo drop-shadow-sm">
            Centro de Documentación CMGC
          </h2>
          <div className="w-24 h-1 bg-terracota mx-auto rounded-full shadow-md"></div>

          <p className="text-lg md:text-xl font-sans text-cafe/90 leading-relaxed max-w-2xl mx-auto font-semibold italic">
            Aquí encontrarás toda la documentación, archivos, relatos, literatura etnográfica y tejido audiovisual que documentan la historia y el sentir del Pueblo Indígena de los Pastos.
          </p>
        </div>

      </div>
    </section>
  );
}
