'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Newspaper, ChevronDown, ChevronUp, Calendar, Building2 } from 'lucide-react';

export interface TemaDeInteresItem {
  id: string;
  title: string;
  publishedDate: string;
  issuedBy: string;
  category: string;
  imageSrc?: string;
  paragraphs: string[];
}

export const TEMAS_DE_INTERES_DATA: TemaDeInteresItem[] = [
  {
    id: 'noticia_1',
    title: 'Colectivo Cumbal Renaciente y Casa de la Memoria del Gran Cumbal, ganadores del Programa Nacional de Estímulos 2026',
    publishedDate: 'Viernes, 2 de Octubre de 2026',
    issuedBy: 'Colectivo Cumbal Renaciente & Casa de la Memoria del Gran Cumbal',
    category: 'Reconocimiento',
    imageSrc: '/images/noticia1.jpeg',
    paragraphs: [
      'La propuesta "Relatos de los abuelos Pastos en Historietas" del Colectivo Cumbal Renaciente y la Casa de la Memoria del Gran Cumbal fue seleccionada en la convocatoria del Programa Nacional de Estímulos del Ministerio de las Culturas 2026.',
      'Actualmente, los integrantes recorren el territorio realizando entrevistas a mayores en torno a las tulpas, revisan archivos documentales, registran y escuchan relatos orales de la comunidad. Con esta información, se encuentra en producción un cómic basado en las memorias recopiladas.',
      'Próximamente se divulgarán más detalles sobre el avance del proyecto y sus resultados.'
    ]
  },
  {
    id: 'noticia_2',
    title: 'El Archivo General de la Nación visitó la Casa de la Memoria del Gran Cumbal',
    publishedDate: 'Miércoles, 20 de Agosto de 2026',
    issuedBy: 'Archivo General de la Nación (AGN) & Casa de la Memoria',
    category: 'Visita Institucional',
    imageSrc: '/images/noticia2recuadro.png',
    paragraphs: [
      'Los días 19 y 20 de agosto, la Casa de la Memoria del Gran Cumbal recibió la visita del Archivo General de la Nación (AGN).',
      'Durante la jornada, funcionarias del AGN y el equipo local sostuvieron mesas de trabajo enfocadas en la protección de los acervos documentales y el fortalecimiento de la gestión archivística del territorio. Se revisaron los procesos de custodia actuales y se plantearon líneas de acción conjuntas para mejorar la conservación de los fondos que resguardan la identidad del Gran Cumbal.',
      'Agradecemos la asistencia técnica y el acompañamiento del AGN en este proceso.'
    ]
  }
];

export default function TemasDeInteres() {
  const [expandedId, setExpandedId] = useState<string | null>('noticia_1');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleSelectEvent = (e: Event) => {
      const customEvt = e as CustomEvent<{ newsId: string }>;
      if (customEvt.detail && customEvt.detail.newsId) {
        setExpandedId(customEvt.detail.newsId);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('selectTemaDeInteres', handleSelectEvent);
      return () => window.removeEventListener('selectTemaDeInteres', handleSelectEvent);
    }
  }, []);

  return (
    <section id="temas-de-interes" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-crema/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-crema-dark space-y-8">
        
        {/* Header de Sección Temas de interés */}
        <div className="flex items-center space-x-3 border-b-2 border-verde-profundo/20 pb-4">
          <div className="p-2.5 bg-verde-profundo text-crema rounded-2xl shadow-md">
            <Newspaper size={24} className="text-mostaza" />
          </div>
          <div>
            <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-verde-profundo tracking-tight">
              Temas de interés
            </h3>
          </div>
        </div>

        {/* Listado de Noticias estilo Institucional (Acordeón Desplegable Inline) */}
        <div className="divide-y divide-crema-dark/80">
          {TEMAS_DE_INTERES_DATA.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div key={item.id} className="py-6 first:pt-2 last:pb-2 space-y-3">
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full text-left group cursor-pointer focus:outline-none space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-serif font-bold text-lg sm:text-xl text-verde-profundo group-hover:text-terracota transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <div className="p-1.5 bg-crema-dark/60 rounded-lg text-cafe/60 group-hover:text-terracota transition-colors shrink-0 mt-0.5">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-sans text-cafe/80">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <Calendar size={13} className="text-terracota" />
                      <span>Publicado:</span> {item.publishedDate}
                    </span>
                    <span className="hidden sm:inline text-cafe/40">•</span>
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <Building2 size={13} className="text-verde-profundo" />
                      <span>Emitido:</span> {item.issuedBy}
                    </span>
                  </div>
                </button>

                {/* Contenido desplegable inline con el texto oficial completo */}
                {isExpanded && (
                  <div className="mt-4 p-5 sm:p-7 bg-crema-dark/40 rounded-2xl border border-crema-dark space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    
                    {item.imageSrc && (
                      <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-crema-dark shadow-md">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    )}

                    <div className="space-y-3 font-sans text-sm sm:text-base text-cafe leading-relaxed">
                      {item.paragraphs.map((p, idx) => (
                        <p key={idx} className="bg-white/90 p-4 sm:p-5 rounded-xl border border-crema-dark/60 leading-relaxed shadow-2xs">
                          {p}
                        </p>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="px-5 py-2 bg-verde-profundo hover:bg-terracota text-crema font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                      >
                        Plegar noticia
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
