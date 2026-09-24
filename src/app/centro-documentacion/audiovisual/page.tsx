'use client';

import Image from 'next/image';
import { Film, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function AudiovisualPage() {
  return (
    <div className="animate-in fade-in duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-crema/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-crema-dark/60 p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Columna Izquierda: Miniatura de Video / Documental */}
          <a
            href="https://www.facebook.com/reel/818082714699399"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group block rounded-2xl overflow-hidden shadow-xl border-4 border-crema bg-verde-profundo h-72 lg:h-80 transform hover:-translate-y-1 transition-all duration-500 cursor-pointer"
            title="Ver corto documental 'Ecos del Gran Cumbal' en Facebook Reel"
          >
            <Image
              src="/images/tesoros2.png"
              alt="Documental Ecos del Gran Cumbal"
              fill
              className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-10"></div>
            
            {/* Play Button Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-20 h-20 bg-mostaza group-hover:bg-terracota group-hover:scale-110 rounded-full flex items-center justify-center shadow-2xl border-4 border-crema transition-all duration-300">
                <Film size={36} className="text-verde-profundo group-hover:text-crema ml-1 transition-colors" />
              </div>
            </div>

            <div className="absolute top-4 left-4 z-20">
              <span className="px-3.5 py-1.5 bg-terracota text-crema font-bold text-xs rounded-full uppercase tracking-wider shadow-md">
                Estreno | Corto Documental
              </span>
            </div>
          </a>

          {/* Columna Derecha: Información y Botón de Acción */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-terracota uppercase tracking-widest block mb-2">
                Registro Audiovisual Comunitario
              </span>
              <h3 className="font-serif font-bold text-3xl lg:text-4xl text-verde-profundo tracking-tight">
                Ecos del Gran Cumbal
              </h3>
              <p className="font-sans text-cafe/80 text-base leading-relaxed italic mt-3 border-l-4 border-terracota/40 pl-4">
                &ldquo;Senderos de Memoria y futuro&rdquo;, realizado con la participación del Instituto Humboldt y el Cabildo de Cumbal.
              </p>
            </div>

            <div className="bg-crema-dark/70 p-5 rounded-2xl border border-crema-dark space-y-3 text-sm font-bold text-verde-profundo shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-terracota w-4 h-4" />
                  <span>Lugar:</span>
                </div>
                <span className="bg-verde-profundo text-crema px-3 py-1 rounded-lg text-xs font-bold">
                  Casa de la Memoria
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="text-terracota w-4 h-4" />
                  <span>Transmisión / Reel:</span>
                </div>
                <span className="text-terracota font-extrabold">¡Disponible en Facebook!</span>
              </div>
            </div>

            <a
              href="https://www.facebook.com/reel/818082714699399"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-3 w-full bg-terracota hover:bg-verde-profundo text-crema font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl group"
            >
              <span>Ver Corto Documental en Facebook</span>
              <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
