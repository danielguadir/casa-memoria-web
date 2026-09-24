'use client';

import React, { useState, useEffect } from 'react';
import { Film, PenTool, MapPin, Clock, ExternalLink, FileText, Library } from 'lucide-react';
import Image from 'next/image';
import ArchivosDigitales from '@/components/ArchivosDigitales';
import BibliotecaEspecializada from '@/components/BibliotecaEspecializada';
import InDevelopmentModal from '@/components/InDevelopmentModal';

export type CentroTab = 'landing' | 'archivos-digitales' | 'audiovisual' | 'biblioteca';

interface CentroDocumentacionProps {
  initialTab?: CentroTab;
}

export default function CentroDocumentacion({ initialTab = 'landing' }: CentroDocumentacionProps) {
  const [activeTab, setActiveTab] = useState<CentroTab>(initialTab);
  const [devModalItem, setDevModalItem] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/biblioteca')) {
        setActiveTab('biblioteca');
      } else if (path.includes('/audiovisual')) {
        setActiveTab('audiovisual');
      } else if (path.includes('/archivos-digitales')) {
        setActiveTab('archivos-digitales');
      } else if (initialTab) {
        setActiveTab(initialTab);
      }
    }
  }, [initialTab]);

  const handleTabChange = (tab: CentroTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      let path = '/centro-documentacion';
      if (tab === 'archivos-digitales') path = '/centro-documentacion/archivos-digitales';
      if (tab === 'audiovisual') path = '/centro-documentacion/audiovisual';
      if (tab === 'biblioteca') path = '/centro-documentacion/biblioteca';
      window.history.pushState(null, '', path);
    }
  };

  return (
    <section id="centro-documentacion" className="py-20 sm:py-24 bg-crema-dark text-cafe relative overflow-hidden">

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

        {/* Encabezado Principal */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-12">
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

        {/* Pestañas de Navegación de Subsecciones (solo cuando se navega dentro) */}
        {activeTab !== 'landing' && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-crema/90 backdrop-blur-md rounded-2xl border border-crema-dark shadow-lg max-w-full overflow-x-auto gap-1">
              
              {/* Botón Inicio / Resumen */}
              <button
                onClick={() => handleTabChange('landing')}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all whitespace-nowrap text-cafe/80 hover:text-verde-profundo hover:bg-crema-dark/60"
              >
                <span>← Volver al Menú Principal</span>
              </button>

              {/* Pestaña: Archivos Digitales */}
              <button
                onClick={() => handleTabChange('archivos-digitales')}
                className={`
                  flex items-center space-x-2.5 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all whitespace-nowrap
                  ${activeTab === 'archivos-digitales' 
                    ? 'bg-verde-profundo text-crema shadow-md scale-[1.02]' 
                    : 'text-cafe/80 hover:text-verde-profundo hover:bg-crema-dark/60'
                  }
                `}
              >
                <FileText size={18} className={activeTab === 'archivos-digitales' ? 'text-mostaza' : 'text-terracota'} />
                <span>Archivos Digitales</span>
                <span className="ml-1 bg-terracota text-crema text-[10px] px-2 py-0.5 rounded-full font-mono">1</span>
              </button>

              {/* Pestaña: Archivo Audiovisual */}
              <button
                onClick={() => handleTabChange('audiovisual')}
                className={`
                  flex items-center space-x-2.5 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all whitespace-nowrap
                  ${activeTab === 'audiovisual' 
                    ? 'bg-verde-profundo text-crema shadow-md scale-[1.02]' 
                    : 'text-cafe/80 hover:text-verde-profundo hover:bg-crema-dark/60'
                  }
                `}
              >
                <Film size={18} className={activeTab === 'audiovisual' ? 'text-mostaza' : 'text-terracota'} />
                <span>Memoria Audiovisual</span>
              </button>

              {/* Pestaña: Biblioteca Especializada */}
              <button
                onClick={() => handleTabChange('biblioteca')}
                className={`
                  flex items-center space-x-2.5 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all whitespace-nowrap
                  ${activeTab === 'biblioteca' 
                    ? 'bg-verde-profundo text-crema shadow-md scale-[1.02]' 
                    : 'text-cafe/80 hover:text-verde-profundo hover:bg-crema-dark/60'
                  }
                `}
              >
                <Library size={18} className={activeTab === 'biblioteca' ? 'text-mostaza' : 'text-terracota'} />
                <span>Biblioteca Especializada</span>
                <span className="ml-1 bg-mostaza-dark text-verde-profundo text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">45</span>
              </button>

            </div>
          </div>
        )}

        {/* VISTA PORTADA LANDING: Tarjetas Interactivas de Accesos Directos */}
        {activeTab === 'landing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-in fade-in duration-300">
            
            {/* Tarjeta 1: Archivos Digitales */}
            <div
              onClick={() => handleTabChange('archivos-digitales')}
              className="bg-crema/90 backdrop-blur-md rounded-3xl p-8 border border-crema-dark shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 bg-terracota/10 rounded-2xl flex items-center justify-center mb-6 text-terracota group-hover:bg-terracota group-hover:text-crema transition-colors">
                  <FileText size={28} />
                </div>
                <span className="text-xs font-bold text-terracota uppercase tracking-wider block mb-1">
                  Monografías & Investigaciones
                </span>
                <h3 className="font-serif font-bold text-2xl text-verde-profundo mb-3 group-hover:text-terracota transition-colors">
                  Archivos Digitales
                </h3>
                <p className="text-cafe/80 text-sm leading-relaxed">
                  Colección digitalizada de monografías, textos de investigación etnográfica y archivos históricos del Pueblo Indígena de los Pastos.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-crema-dark/50 flex items-center justify-between text-terracota font-bold text-sm">
                <span>Explorar Archivos (1)</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            {/* Tarjeta 2: Memoria Audiovisual */}
            <div
              onClick={() => handleTabChange('audiovisual')}
              className="bg-crema/90 backdrop-blur-md rounded-3xl p-8 border border-crema-dark shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 bg-mostaza/20 rounded-2xl flex items-center justify-center mb-6 text-verde-profundo group-hover:bg-verde-profundo group-hover:text-mostaza transition-colors">
                  <Film size={28} />
                </div>
                <span className="text-xs font-bold text-terracota uppercase tracking-wider block mb-1">
                  Cortos & Tesoros Sonoros
                </span>
                <h3 className="font-serif font-bold text-2xl text-verde-profundo mb-3 group-hover:text-terracota transition-colors">
                  Memoria Audiovisual
                </h3>
                <p className="text-cafe/80 text-sm leading-relaxed">
                  Registros audiovisuales comunitarios, documentales y memoria oral realizados con la participación de la comunidad.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-crema-dark/50 flex items-center justify-between text-verde-profundo font-bold text-sm">
                <span>Ver Cortometrajes</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            {/* Tarjeta 3: Biblioteca Especializada */}
            <div
              onClick={() => handleTabChange('biblioteca')}
              className="bg-crema/90 backdrop-blur-md rounded-3xl p-8 border border-crema-dark shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 bg-verde-profundo/10 rounded-2xl flex items-center justify-center mb-6 text-verde-profundo group-hover:bg-verde-profundo group-hover:text-crema transition-colors">
                  <Library size={28} />
                </div>
                <span className="text-xs font-bold text-terracota uppercase tracking-wider block mb-1">
                  Acervo Físico Consultable
                </span>
                <h3 className="font-serif font-bold text-2xl text-verde-profundo mb-3 group-hover:text-terracota transition-colors">
                  Biblioteca Especializada
                </h3>
                <p className="text-cafe/80 text-sm leading-relaxed">
                  Catálogo bibliográfico físico disponible para lectura y consulta especializada en las instalaciones de la Casa de la Memoria.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-crema-dark/50 flex items-center justify-between text-verde-profundo font-bold text-sm">
                <span>Consultar Biblioteca (45)</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

          </div>
        )}

        {/* CONTENIDO 1: ARCHIVOS DIGITALES */}
        {activeTab === 'archivos-digitales' && (
          <ArchivosDigitales />
        )}

        {/* CONTENIDO 2: MEMORIA AUDIOVISUAL */}
        {activeTab === 'audiovisual' && (
          <div className="max-w-5xl mx-auto bg-crema/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-crema-dark/60 p-8 lg:p-12 animate-in fade-in duration-300">
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
        )}

        {/* CONTENIDO 3: BIBLIOTECA ESPECIALIZADA */}
        {activeTab === 'biblioteca' && (
          <BibliotecaEspecializada />
        )}

      </div>

      <InDevelopmentModal
        isOpen={!!devModalItem}
        onClose={() => setDevModalItem(null)}
        itemName={devModalItem || undefined}
      />
    </section>
  );
}
