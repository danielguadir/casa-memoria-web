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
    category: 'Estrategias de Salvaguarda 2026',
    title: 'Territorio Sagrado del Gran Cumbal',
    bulletPoints: [
      'Preservación del Patrimonio y Cosmovisión Ancestral',
      'Cartografía y Recuperación de Memorias Territoriales',
      'Archivo Histórico del Pueblo Indígena de los Pastos'
    ],
    ctaText: '¡Más información aquí!',
    imageSrc: '/images/tesoros.png',
  },
  {
    id: 2,
    tag: 'Imagen 2',
    category: 'Formación Comunitaria y Saberes',
    title: 'Escuela Renacientes del Gran Cumbal',
    bulletPoints: [
      'Círculos de Palabreo y Diálogo Intergeneracional',
      'Seminario en Comunicación Comunitaria y Medios Propios',
      'Tejidos Pedagógicos para Comunidades de Vida'
    ],
    ctaText: '¡Conoce Tejidos de Formación!',
    imageSrc: '/images/grupo-gente.png',
  },
  {
    id: 3,
    tag: 'Imagen 3',
    category: 'Centro de Documentación CMGC',
    title: 'Archivo General & Repositorio Digital',
    bulletPoints: [
      'Biblioteca Especializada de Pueblos Indígenas',
      'Archivo de Memoria Audiovisual y Registros Sonoros',
      'Digitalización en Alta Resolución y Fondos del Cabildo'
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
          className="object-cover object-center opacity-40 transition-opacity duration-700 animate-in fade-in"
          priority
        />

        {/* Multi-layered Gradients for Univalle-style high readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-verde-profundo via-verde-profundo/90 sm:via-verde-profundo/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-verde-profundo via-transparent to-black/30 z-10"></div>

        {/* Full-width Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-12 flex flex-col justify-between min-h-[440px] sm:min-h-[480px]">
          
          {/* Top Row: Category Badge + Institutional Emblem Watermark */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-3.5 py-1 rounded-full bg-[#a69cac] text-verde-profundo font-extrabold text-xs uppercase tracking-wider shadow-md">
                {currentSlide.tag}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a69cac] hidden sm:inline-block">
                {currentSlide.category}
              </span>
            </div>

            {/* Institutional Seal Watermark */}
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/15">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#a69cac] bg-crema flex items-center justify-center shrink-0">
                <Image
                  src="/images/hero-logo.png"
                  alt="Sello Casa de la Memoria"
                  width={30}
                  height={30}
                  className="w-auto h-6 object-contain"
                />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[11px] font-bold font-serif leading-none text-crema">Casa de la Memoria</p>
                <p className="text-[9px] text-[#a69cac] uppercase font-medium tracking-tighter">Gran Cumbal</p>
              </div>
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

            {/* Univalle-style Pill Call To Action Button */}
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

          {/* Bottom Bar: Indicators & Slide Counter */}
          <div className="flex items-center justify-between pt-4 border-t border-crema/20">
            <span className="text-xs font-bold text-crema/70 uppercase tracking-widest">
              Espacio {currentIndex + 1} de {DEFAULT_SLIDES.length}
            </span>

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
                  aria-label={`Ir a ${slide.tag}`}
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
