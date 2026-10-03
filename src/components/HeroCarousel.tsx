'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Newspaper, 
  Award, 
  Building2, 
  Calendar 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export interface CarouselSlide {
  id: number;
  newsId: string;
  tag: string;
  category: string;
  dateBadge?: string;
  title: string;
  bulletPoints: string[];
  ctaText: string;
  imageSrc: string;
  frameImageSrc?: string; // Optional small frame image (only for Slide 2)
  actionKey?: string;
}

const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    newsId: 'noticia_1',
    tag: 'Noticia 1',
    category: 'Reconocimiento',
    dateBadge: 'Estímulos 2026',
    title: 'Colectivo Cumbal Renaciente y Casa de la Memoria, ganadores del Programa Nacional de Estímulos 2026',
    bulletPoints: [
      'Seleccionados en la convocatoria del Ministerio de las Culturas con la propuesta «Relatos de los abuelos Pastos en Historietas».',
      'Producción de un cómic histórico basado en entrevistas a mayores en torno a las tulpas, archivos documentales y relatos orales.'
    ],
    ctaText: 'Conoce el proyecto',
    imageSrc: '/images/noticia1.jpeg',
    frameImageSrc: undefined, // Sin recuadro
  },
  {
    id: 2,
    newsId: 'noticia_2',
    tag: 'Noticia 2',
    category: 'Visita Institucional',
    dateBadge: '19 - 20 de Agosto',
    title: 'El Archivo General de la Nación visitó la Casa de la Memoria del Gran Cumbal',
    bulletPoints: [
      'Jornadas de trabajo con el Archivo General de la Nación (AGN) enfocadas en la protección de acervos documentales.',
      'Revisión de custodia actual y definición de líneas de acción para fortalecer la conservación archivística territorial.'
    ],
    ctaText: 'Conoce más sobre la visita',
    imageSrc: '/images/noticia2.jpeg',
    frameImageSrc: '/images/noticia2recuadro.png', // Recuadro fotográfico exclusivo noticia 2
  },
  {
    id: 3,
    newsId: 'noticia_3',
    tag: 'Imagen 3',
    category: 'Documentación CMGC',
    dateBadge: 'Fondo Documental',
    title: 'Archivo',
    bulletPoints: [
      'Biblioteca Especializada de Pueblos Indígenas',
      'Archivo de Memoria'
    ],
    ctaText: '¡Explora el Centro de Documentación!',
    imageSrc: '/images/tesoros2.png',
    frameImageSrc: undefined, // Sin recuadro
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { setActiveSection } = useAuth();

  // Auto-play feature: Switch slide every 6 seconds if not hovered
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DEFAULT_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? DEFAULT_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DEFAULT_SLIDES.length);
  };

  const handleCtaClick = (slide: CarouselSlide) => {
    if (slide.id === 3) {
      setActiveSection('centro-documentacion');
      return;
    }

    // Dispatch event for TemasDeInteres to expand the corresponding news item
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('selectTemaDeInteres', { detail: { newsId: slide.newsId } }));
      const targetEl = document.getElementById('temas-de-interes');
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
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
          className="object-cover object-center opacity-95 transition-opacity duration-700 animate-in fade-in"
          priority
        />

        {/* Multi-layered Gradients starting from bottom-left fading smoothly towards top-right */}
        <div className="absolute inset-0 bg-gradient-to-tr from-verde-profundo via-verde-profundo/85 via-40% sm:via-35% to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-verde-profundo/70 via-transparent to-transparent max-w-2xl z-10" />

        {/* Full-width Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full py-10 lg:py-14 flex flex-col justify-between min-h-[460px] sm:min-h-[500px]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
            
            {/* LEFT / CENTER COLUMN: News Content & Bullet Points */}
            <div className={`space-y-5 text-left ${currentSlide.frameImageSrc ? 'lg:col-span-7' : 'lg:col-span-10 max-w-4xl'}`}>
              
              {/* Category & Date Badge Pills */}
              <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                {currentSlide.id !== 1 && (
                  <span className="px-4 py-1.5 rounded-full bg-[#a69cac] text-verde-profundo font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md inline-flex items-center gap-1.5">
                    {currentSlide.id === 2 && <Building2 size={16} className="text-terracota" />}
                    {currentSlide.id === 3 && <Newspaper size={16} className="text-terracota" />}
                    <span>{currentSlide.category}</span>
                  </span>
                )}

                {currentSlide.dateBadge && (
                  <span className="px-3.5 py-1 rounded-full bg-terracota/90 text-crema font-bold text-xs inline-flex items-center gap-1.5 shadow-md border border-crema/20">
                    <Calendar size={14} className="text-mostaza" />
                    <span>{currentSlide.dateBadge}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-crema tracking-tight drop-shadow-lg leading-tight sm:leading-snug">
                {currentSlide.title}
              </h2>

              {/* Bullet Points */}
              <div className="space-y-2.5 pt-1">
                {currentSlide.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm sm:text-base font-sans text-crema/95 font-medium drop-shadow-sm leading-relaxed">
                    <CheckCircle2 size={18} className="text-mostaza shrink-0 mt-1" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Pill Call To Action Button */}
              <div className="pt-3">
                <button
                  onClick={() => handleCtaClick(currentSlide)}
                  className="inline-flex items-center space-x-3 bg-terracota hover:bg-[#a69cac] hover:text-verde-profundo text-crema font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-crema/30 group/btn cursor-pointer"
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: Floating Media Card (Only rendered if frameImageSrc exists - Slide 2) */}
            {currentSlide.frameImageSrc && (
              <div className="hidden lg:flex lg:col-span-5 justify-center relative">
                
                {/* Decorative Concentric Rings background */}
                <div className="absolute -inset-4 rounded-full border border-mostaza/20 animate-pulse pointer-events-none" />
                <div className="absolute -inset-8 rounded-full border border-[#a69cac]/20 pointer-events-none" />

                {/* Main Card Frame */}
                <div 
                  className="relative w-full max-w-md h-72 sm:h-80 rounded-3xl overflow-hidden border-4 border-crema/20 shadow-2xl backdrop-blur-md group/frame transform hover:scale-[1.02] transition-all duration-500 cursor-pointer"
                  onClick={() => handleCtaClick(currentSlide)}
                >
                  <Image
                    key={`frame_${currentSlide.id}`}
                    src={currentSlide.frameImageSrc}
                    alt={currentSlide.title}
                    fill
                    className="object-cover object-center group-hover/frame:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-verde-profundo/85 via-verde-profundo/20 to-transparent" />
                  
                  {/* Overlay Badge at Bottom of Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-verde-profundo/90 backdrop-blur-md p-3.5 rounded-2xl border border-crema/20 text-xs font-bold text-crema flex items-center justify-between shadow-lg">
                    <span className="truncate pr-2 font-serif">{currentSlide.title}</span>
                    <span className="px-2.5 py-0.5 bg-mostaza text-verde-profundo rounded-full font-mono text-[10px] font-extrabold shrink-0">
                      {currentSlide.category}
                    </span>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Bottom Bar: Indicator Dots & Reconocimiento Badge on Bottom Right */}
          <div className="flex items-center justify-between pt-4 border-t border-crema/20 mt-4">
            <span className="text-xs font-mono text-crema/70 font-semibold hidden sm:inline">
              Noticia {currentIndex + 1} de {DEFAULT_SLIDES.length}
            </span>

            <div className="flex items-center space-x-4">
              {/* Badge ovalado 'Reconocimiento' posicionado en la parte inferior derecha para Noticia 1 */}
              {currentSlide.id === 1 && (
                <span className="px-4 py-1.5 rounded-full bg-[#a69cac] text-verde-profundo font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl border border-crema/30 inline-flex items-center gap-1.5 animate-in fade-in">
                  <Award size={16} className="text-terracota" />
                  <span>{currentSlide.category}</span>
                </span>
              )}

              {/* Indicator Dots */}
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

    </div>
  );
}
