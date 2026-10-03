'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export interface CarouselSlide {
  id: number;
  tag: string;
  category: string;
  title: string;
  bulletPoints: string[];
  ctaText: string;
  imageSrc: string;
  actionKey?: string;
}

const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    tag: 'Imagen 1',
    category: 'Memoria',
    title: 'Territorio',
    bulletPoints: [
      'Preservación del Patrimonio y Cosmovisión Ancestral',
      'Recuperación de Memorias Territoriales',
      'Archivo Histórico del Pueblo Indígena de los Pastos'
    ],
    ctaText: '¡Más información aquí!',
    imageSrc: '/images/tesoros.png',
  },
  {
    id: 2,
    tag: 'Imagen 2',
    category: 'Comunidad',
    title: 'Escuela Renacientes del Gran Cumbal',
    bulletPoints: [
      'Círculos de Palabreo y Diálogo',
      'Seminario en Comunicación Comunitaria y Medios Propios'
    ],
    ctaText: '¡Conoce Tejidos de Formación!',
    imageSrc: '/images/grupo-gente.png',
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
  const { openKioskModal, setActiveSection } = useAuth();

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
    if (slide.id === 1) {
      openKioskModal();
    } else if (slide.id === 2) {
      setActiveSection('convocatoria');
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

        {/* Multi-layered Gradients focused on text legibility while revealing top-right & bottom-right natural photo colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-verde-profundo via-verde-profundo/90 via-40% sm:via-35% to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-verde-profundo/60 via-transparent to-transparent max-w-2xl z-10"></div>

        {/* Full-width Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-12 flex flex-col justify-between min-h-[440px] sm:min-h-[480px]">
          
          {/* Top Row: Category Badge (sin rótulo 'Imagen X' ni marca de agua a la derecha) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-4 py-1.5 rounded-full bg-[#a69cac] text-verde-profundo font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md">
                {currentSlide.category}
              </span>
            </div>
          </div>

          {/* Main Slide Content Layout: Left Title & Bullets, Pill CTA */}
          <div className="max-w-3xl space-y-5 my-auto text-left pt-4">
            <h2 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-crema tracking-tight drop-shadow-lg !leading-tight">
              {currentSlide.title}
            </h2>

            {/* Institutional Bullet Points */}
            <div className="space-y-2 pt-2">
              {currentSlide.bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-sm sm:text-base md:text-lg font-sans text-crema/90 font-medium drop-shadow-sm">
                  <CheckCircle2 size={20} className="text-[#a69cac] shrink-0 mt-1" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Pill Call To Action Button */}
            <div className="pt-4">
              <button
                onClick={() => handleCtaClick(currentSlide)}
                className="inline-flex items-center space-x-3 bg-terracota hover:bg-[#a69cac] hover:text-verde-profundo text-crema font-extrabold text-base sm:text-lg px-8 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-crema/30 group/btn"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Bottom Bar: Indicator Dots sin texto 'Espacio X de Y' */}
          <div className="flex items-center justify-end pt-4 border-t border-crema/20">
            {/* Indicator Dots - #a69cac al pasar o cambiar de imagen */}
            <div className="flex items-center space-x-2">
              {DEFAULT_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`
                    h-2.5 rounded-full transition-all duration-300 focus:outline-none
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
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-[#a69cac] text-crema hover:text-verde-profundo transition-all duration-300 shadow-2xl border border-white/20 focus:outline-none"
        aria-label="Anterior"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Extreme Right Arrow Button */}
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-[#a69cac] text-crema hover:text-verde-profundo transition-all duration-300 shadow-2xl border border-white/20 focus:outline-none"
        aria-label="Siguiente"
      >
        <ChevronRight size={28} />
      </button>

    </div>
  );
}
