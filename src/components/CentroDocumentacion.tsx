'use client';

import React from 'react';
import { BookOpen, Film, HardDrive, Quote, Video, Sprout, Save, Library, FileText, ArrowUpRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function CentroDocumentacion() {
  return (
    <section id="centro-documentacion" className="py-24 bg-crema-dark text-cafe relative overflow-hidden">

      {/* Background texture with subtle overlay for maximum contrast */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/piedra-m.jpg"
          alt="Textura ancestral"
          fill
          className="object-cover object-center grayscale opacity-15 mix-blend-multiply"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-crema-dark via-crema-dark/80 to-crema-dark z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-verde-profundo/10 border border-verde-profundo/20 text-verde-profundo text-xs font-bold uppercase tracking-widest">
            <Library className="w-4 h-4 text-terracota" />
            <span>Fondo Físico & Digital</span>
          </div>

          <h2 className="font-serif font-bold text-4xl lg:text-5xl text-verde-profundo tracking-tight drop-shadow-sm">
            Centro de Documentación CMGC
          </h2>

          <div className="w-24 h-1 bg-terracota mx-auto rounded-full shadow-sm"></div>

          <p className="text-lg font-sans text-cafe/90 leading-relaxed font-semibold italic max-w-2xl mx-auto">
            Espacio dedicado a la salvaguarda, conservación y consulta de la producción intelectual, audiovisual y comunitaria del Gran Cumbal y los Pueblos Indígenas de los Pastos.
          </p>
        </div>

        {/* 3 Main Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Biblioteca Especializada */}
          <div className="bg-crema/95 backdrop-blur-md rounded-3xl p-8 border border-crema-dark/70 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-verde-profundo rounded-2xl flex items-center justify-center text-mostaza shadow-md group-hover:scale-110 transition-transform">
                <BookOpen size={28} />
              </div>
              <span className="text-xs font-bold text-terracota uppercase tracking-wider block">Fondo Bibliográfico</span>
              <h3 className="font-serif font-bold text-2xl text-verde-profundo">
                Biblioteca Especializada de Pueblos Indígenas
              </h3>
              <p className="text-sm text-cafe/80 leading-relaxed font-medium">
                Colección de monografías, planes de salvaguardia, jurisprudencia indígena, investigaciones de la comunidad e historia territorial de los Andes del sur de Colombia.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-crema-dark/60 flex items-center justify-between text-xs font-bold text-verde-profundo">
              <span>Consulta de Catálogo</span>
              <span className="w-7 h-7 rounded-full bg-verde-profundo/10 flex items-center justify-center text-terracota group-hover:bg-terracota group-hover:text-crema transition-colors">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>

          {/* Pillar 2: Archivo Audiovisual */}
          <div className="bg-crema/95 backdrop-blur-md rounded-3xl p-8 border border-crema-dark/70 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-terracota rounded-2xl flex items-center justify-center text-crema shadow-md group-hover:scale-110 transition-transform">
                <Film size={28} />
              </div>
              <span className="text-xs font-bold text-terracota uppercase tracking-wider block">Registro Sonoro y Fílmico</span>
              <h3 className="font-serif font-bold text-2xl text-verde-profundo">
                Archivo de Memoria Audiovisual
              </h3>
              <p className="text-sm text-cafe/80 leading-relaxed font-medium">
                Acervo documental en video y audio que custodia relatos orales, registros de asambleas, procesos pedagógicos y piezas documentales de la Casa de la Memoria.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-crema-dark/60 flex items-center justify-between text-xs font-bold text-verde-profundo">
              <span>Repositorio Audiovisual</span>
              <span className="w-7 h-7 rounded-full bg-terracota/10 flex items-center justify-center text-terracota group-hover:bg-terracota group-hover:text-crema transition-colors">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>

          {/* Pillar 3: Archivos Digitales */}
          <div className="bg-crema/95 backdrop-blur-md rounded-3xl p-8 border border-crema-dark/70 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-mostaza/30 border border-mostaza rounded-2xl flex items-center justify-center text-verde-profundo shadow-md group-hover:scale-110 transition-transform">
                <HardDrive size={28} className="text-verde-profundo" />
              </div>
              <span className="text-xs font-bold text-terracota uppercase tracking-wider block">Preservación Digital</span>
              <h3 className="font-serif font-bold text-2xl text-verde-profundo">
                Archivos Digitales y Mapas Comunitarios
              </h3>
              <p className="text-sm text-cafe/80 leading-relaxed font-medium">
                Digitalización en alta resolución de fotografías históricas, mapas cartográficos ancestrales, documentos del Cabildo y archivos en proceso de catalogación.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-crema-dark/60 flex items-center justify-between text-xs font-bold text-verde-profundo">
              <span>Acceso a Repositorio</span>
              <span className="w-7 h-7 rounded-full bg-mostaza/20 flex items-center justify-center text-verde-profundo group-hover:bg-verde-profundo group-hover:text-mostaza transition-colors">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>

        </div>

        {/* Featured Content Display: Corto Documental & PACPI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch pt-4">

          {/* Card 1: Corto Documental - Facebook Reel */}
          <a
            href="https://www.facebook.com/reel/818082714699399"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-crema rounded-3xl overflow-hidden shadow-xl border border-crema-dark relative group transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            title="Ver corto documental 'Ecos del Gran Cumbal' en Facebook Reel"
          >
            <div className="h-60 bg-verde-profundo relative overflow-hidden">
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500 z-10"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-16 h-16 bg-mostaza group-hover:bg-terracota group-hover:scale-110 rounded-full flex items-center justify-center shadow-xl border-2 border-crema transition-all duration-300">
                  <Film size={32} className="text-verde-profundo group-hover:text-crema ml-1 transition-colors" />
                </div>
              </div>
              <Image
                src="/images/tesoros2.png"
                alt="Documental Ecos del Gran Cumbal"
                fill
                className="object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-terracota text-crema font-bold text-xs rounded-full uppercase tracking-wider shadow-md">
                  Estreno Audiovisual
                </span>
              </div>
            </div>

            <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-2xl text-verde-profundo group-hover:text-terracota transition-colors">
                  Ecos del Gran Cumbal
                </h3>
                <p className="font-sans text-cafe/80 text-sm leading-relaxed mt-2 italic border-l-2 border-terracota/40 pl-3">
                  &ldquo;Senderos de Memoria y futuro&rdquo;, realizado con la participación del Instituto Humboldt y el Cabildo de Cumbal.
                </p>
              </div>

              <div className="bg-crema-dark/60 p-4 rounded-xl text-xs font-bold text-verde-profundo space-y-2 border border-crema-dark">
                <div className="flex justify-between items-center">
                  <span>📍 Ubicación:</span>
                  <span className="text-cafe font-semibold">Casa de la Memoria del Gran Cumbal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>🎬 Formato:</span>
                  <span className="text-terracota font-bold">Corto Documental (Reel)</span>
                </div>
              </div>

              <div className="w-full bg-verde-profundo group-hover:bg-terracota text-crema font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors text-center flex items-center justify-center space-x-2">
                <span>Ver en Facebook Reel</span>
                <span>↗</span>
              </div>
            </div>
          </a>

          {/* Card 2: Proceso PACPI */}
          <div className="bg-verde-profundo text-crema rounded-3xl p-8 lg:p-10 border border-verde-profundo shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-mostaza/20 border border-mostaza/40 text-mostaza font-bold text-xs rounded-full uppercase tracking-wider">
                  Política Pública PACPI
                </span>
                <Video size={28} className="text-mostaza" />
              </div>

              <h3 className="font-serif font-bold text-3xl text-crema tracking-tight">
                Patrimonio Audiovisual Indígena
              </h3>

              <p className="font-sans text-crema/90 text-sm leading-relaxed border-l-4 border-mostaza pl-4 italic">
                Construcción participativa de la Política Pública de Patrimonio Audiovisual – Capítulo Pueblos Indígenas (PACPI).
              </p>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3 text-xs leading-relaxed">
                <Quote size={20} className="text-mostaza rotate-180" />
                <p className="font-serif italic text-sm text-crema/95 font-medium">
                  Este espacio fortalece el diálogo entre mayores, sabedores y jóvenes en pro de salvaguardar las voces ancestrales de las comunidades indígenas.
                </p>

                <div className="flex space-x-4 pt-4 border-t border-white/10 text-center">
                  <div className="flex-1">
                    <Sprout className="w-5 h-5 mx-auto text-mostaza" />
                    <span className="text-[10px] uppercase font-bold text-crema/70 mt-1 block">Semilla</span>
                  </div>
                  <div className="flex-1">
                    <FileText className="w-5 h-5 mx-auto text-mostaza" />
                    <span className="text-[10px] uppercase font-bold text-crema/70 mt-1 block">Saberes</span>
                  </div>
                  <div className="flex-1">
                    <Save className="w-5 h-5 mx-auto text-mostaza" />
                    <span className="text-[10px] uppercase font-bold text-crema/70 mt-1 block">Memoria</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-mostaza">
                <Sparkles className="w-4 h-4" />
                <span>Gestión y Salvaguarda del Gran Cumbal</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
