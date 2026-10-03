'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, X, Newspaper, Award, Building2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export interface CarouselSlide {
  id: number;
  tag: string;
  category: string;
  title: string;
  bulletPoints: string[];
  fullText?: string[];
  ctaText: string;
  imageSrc: string;
  actionKey?: string;
}

const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    tag: 'Noticia 1',
    category: 'Reconocimiento',
    title: 'Colectivo Cumbal Renaciente y Casa de la Memoria, ganadores del Programa Nacional de Estímulos 2026',
    bulletPoints: [
      'Seleccionados en la convocatoria del Ministerio de las Culturas con la propuesta «Relatos de los abuelos Pastos en Historietas».',
      'Producción de un cómic histórico basado en entrevistas a mayores en torno a las tulpas, archivos documentales y relatos orales.'
    ],
    fullText: [
      'La propuesta "Relatos de los abuelos Pastos en Historietas" del Colectivo Cumbal Renaciente y la Casa de la Memoria del Gran Cumbal fue seleccionada en la convocatoria del Programa Nacional de Estímulos del Ministerio de las Culturas 2026.',
      'Actualmente, los integrantes recorren el territorio realizando entrevistas a mayores en torno a las tulpas, revisan archivos documentales, registran y escuchan relatos orales de la comunidad. Con esta información, se encuentra en producción un cómic basado en las memorias recopiladas.',
      'Próximamente se divulgarán más detalles sobre el avance del proyecto y sus resultados.'
    ],
    ctaText: 'Conoce el proyecto',
    imageSrc: '/images/noticia1.jpeg',
  },
  {
    id: 2,
    tag: 'Noticia 2',
    category: 'Visita Institucional',
    title: 'El Archivo General de la Nación visitó la Casa de la Memoria del Gran Cumbal',
    bulletPoints: [
      'Jornadas de trabajo con el Archivo General de la Nación (AGN) enfocadas en la protección de acervos documentales.',
      'Revisión de custodia actual y definición de líneas de acción para fortalecer la conservación archivística territorial.'
    ],
    fullText: [
      'Los días 19 y 20 de agosto, la Casa de la Memoria del Gran Cumbal recibió la visita del Archivo General de la Nación (AGN).',
      'Durante la jornada, funcionarias del AGN y el equipo local sostuvieron mesas de trabajo enfocadas en la protección de los acervos documentales y el fortalecimiento de la gestión archivística del territorio. Se revisaron los procesos de custodia actuales y se plantearon líneas de acción conjuntas para mejorar la conservación de los fondos que resguardan la identidad del Gran Cumbal.',
      'Agradecemos la asistencia técnica y el acompañamiento del AGN en este proceso.'
    ],
    ctaText: 'Conoce más sobre la visita',
    imageSrc: '/images/noticia2.jpeg',
  },
  {
    id: 3,
    tag: 'Imagen 3',
    category: 'Documentación CMGC',
    title: 'Archivo',
    bulletPoints: [
      'Biblioteca Especializada de Pueblos Indígenas',
      'Archivo de Memoria'
    ],
    ctaText: '¡Explora el Centro de Documentación!',
    imageSrc: '/images/tesoros2.png',
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [newsModalSlide, setNewsModalSlide] = useState<CarouselSlide | null>(null);
  const { setActiveSection } = useAuth();

  // Auto-play feature: Switch slide every 6 seconds if not hovered or modal open
  useEffect(() => {
    if (isPaused || newsModalSlide !== null) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DEFAULT_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, newsModalSlide]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? DEFAULT_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DEFAULT_SLIDES.length);
  };

  const handleCtaClick = (slide: CarouselSlide) => {
    if (slide.fullText && slide.fullText.length > 0) {
      setNewsModalSlide(slide);
    } else if (slide.id === 3) {
      setActiveSection('centro-documentacion');
    }
  };

  const currentSlide = DEFAULT_SLIDES[currentIndex];

  return (
    <div 
      className="relative w-full overflow-hidden bg-verde-profundo text-crema group shadow-2xl border-y-4 border-[#a69cac]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Banner with full-bleed scale & fade */}
      <div className="relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex items-center">
        <Image
          key={currentSlide.id}
          src={currentSlide.imageSrc}
          alt={currentSlide.title}
          fill
          className="object-cover object-center opacity-90 transition-opacity duration-700 animate-in fade-in"
          priority
        />

        {/* Multi-layered Gradients focused on text legibility while revealing natural photo colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-verde-profundo/95 via-verde-profundo/85 via-45% sm:via-40% to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-verde-profundo/70 via-transparent to-transparent max-w-3xl z-10" />

        {/* Full-width Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-12 flex flex-col justify-between min-h-[440px] sm:min-h-[480px]">
          
          {/* Top Row: Category Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-4 py-1.5 rounded-full bg-[#a69cac] text-verde-profundo font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md inline-flex items-center gap-1.5">
                {currentSlide.id === 1 && <Award size={16} className="text-terracota" />}
                {currentSlide.id === 2 && <Building2 size={16} className="text-terracota" />}
                {currentSlide.id === 3 && <Newspaper size={16} className="text-terracota" />}
                <span>{currentSlide.category}</span>
              </span>
            </div>
          </div>

          {/* Main Slide Content Layout: Left Title & Bullets, Pill CTA */}
          <div className="max-w-3xl space-y-5 my-auto text-left pt-4">
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-crema tracking-tight drop-shadow-lg leading-tight sm:leading-snug">
              {currentSlide.title}
            </h2>

            {/* Institutional Bullet Points */}
            <div className="space-y-2.5 pt-2">
              {currentSlide.bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-sm sm:text-base md:text-lg font-sans text-crema/90 font-medium drop-shadow-sm leading-relaxed">
                  <CheckCircle2 size={20} className="text-[#a69cac] shrink-0 mt-1" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Pill Call To Action Button */}
            <div className="pt-4">
              <button
                onClick={() => handleCtaClick(currentSlide)}
                className="inline-flex items-center space-x-3 bg-terracota hover:bg-[#a69cac] hover:text-verde-profundo text-crema font-extrabold text-base sm:text-lg px-8 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-crema/30 group/btn cursor-pointer"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Bottom Bar: Indicator Dots */}
          <div className="flex items-center justify-end pt-4 border-t border-crema/20">
            <div className="flex items-center space-x-2">
              {DEFAULT_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`
                    h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer
                    ${currentIndex === idx ? 'w-10 bg-[#a69cac]' : 'w-2.5 bg-crema/40 hover:bg-[#a69cac]/70'}
                  `}
                  aria-label={`Ir a diapositiva ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Extreme Left Arrow Button */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-[#a69cac] text-crema hover:text-verde-profundo transition-all duration-300 shadow-2xl border border-white/20 focus:outline-none cursor-pointer"
        aria-label="Anterior"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Extreme Right Arrow Button */}
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-[#a69cac] text-crema hover:text-verde-profundo transition-all duration-300 shadow-2xl border border-white/20 focus:outline-none cursor-pointer"
        aria-label="Siguiente"
      >
        <ChevronRight size={28} />
      </button>

      {/* Modal de Noticia Completa */}
      {newsModalSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-crema text-verde-profundo rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-crema-dark relative overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header Modal */}
            <div className="flex items-start justify-between border-b border-crema-dark pb-4">
              <div className="space-y-2 pr-6">
                <span className="px-3.5 py-1 bg-terracota text-crema font-bold text-xs rounded-full uppercase tracking-wider inline-block">
                  {newsModalSlide.category}
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-verde-profundo leading-snug">
                  {newsModalSlide.title}
                </h3>
              </div>
              <button
                onClick={() => setNewsModalSlide(null)}
                className="p-2 rounded-full text-cafe/60 hover:text-terracota hover:bg-crema-dark transition-colors cursor-pointer shrink-0"
                title="Cerrar noticia"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cuerpos de texto de la noticia oficial */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-cafe/90 leading-relaxed">
              {newsModalSlide.fullText ? (
                newsModalSlide.fullText.map((paragraph, idx) => (
                  <p key={idx} className="bg-white/80 p-4 rounded-2xl border border-crema-dark/60 leading-relaxed text-cafe">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="bg-white/80 p-4 rounded-2xl border border-crema-dark/60 leading-relaxed text-cafe">
                  {newsModalSlide.bulletPoints.join(' ')}
                </p>
              )}
            </div>

            {/* Footer Modal */}
            <div className="pt-4 border-t border-crema-dark flex justify-end">
              <button
                onClick={() => setNewsModalSlide(null)}
                className="px-6 py-2.5 bg-verde-profundo hover:bg-terracota text-crema font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Cerrar Noticia
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
