'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export interface CarouselSlide {
  id: number;
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
}

const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    tag: 'Imagen 1',
    title: 'Territorio Sagrado del Gran Cumbal',
    description: 'Paisajes, volcanes y memoria viva del Pueblo Indígena de los Pastos.',
    imageSrc: '/images/tesoros.png',
  },
  {
    id: 2,
    tag: 'Imagen 2',
    title: 'Encuentro Comunitario y Tejido Social',
    description: 'Círculos de palabreo, diálogo de saberes e integración cultural.',
    imageSrc: '/images/grupo-gente.png',
  },
  {
    id: 3,
    tag: 'Imagen 3',
    title: 'Archivo General y Salvaguarda',
    description: 'Documentación histórica, acervo audiovisual y conservación del patrimonio.',
    imageSrc: '/images/tesoros2.png',
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play feature: Advance slide every 5 seconds if not hovered
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DEFAULT_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? DEFAULT_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DEFAULT_SLIDES.length);
  };

  const currentSlide = DEFAULT_SLIDES[currentIndex];

  return (
    <div 
      className="relative max-w-5xl mx-auto w-full my-8 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container Card */}
      <div className="relative h-72 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-mostaza/50 bg-verde-profundo">
        {/* Background Slide Image with smooth transition */}
        <Image
          key={currentSlide.id}
          src={currentSlide.imageSrc}
          alt={currentSlide.title}
          fill
          className="object-cover object-center opacity-60 transition-opacity duration-700 animate-in fade-in"
          priority
        />

        {/* Gradient Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-verde-profundo via-verde-profundo/40 to-transparent z-10"></div>

        {/* Content Box */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20 space-y-3 text-left">
          {/* Badge Label: Imagen 1, Imagen 2, Imagen 3 */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-mostaza text-verde-profundo text-xs font-extrabold uppercase tracking-wider shadow-lg">
            <ImageIcon size={14} />
            <span>{currentSlide.tag}</span>
          </div>

          <h3 className="font-serif font-bold text-2xl sm:text-4xl text-crema drop-shadow-md">
            {currentSlide.title}
          </h3>

          <p className="font-sans text-sm sm:text-base text-crema/90 max-w-2xl font-medium drop-shadow-sm">
            {currentSlide.description}
          </p>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-verde-profundo/80 text-crema hover:bg-mostaza hover:text-verde-profundo transition-all duration-300 shadow-xl border border-crema/20 focus:outline-none"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-verde-profundo/80 text-crema hover:bg-mostaza hover:text-verde-profundo transition-all duration-300 shadow-xl border border-crema/20 focus:outline-none"
          aria-label="Imagen siguiente"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 right-6 z-30 flex items-center space-x-2">
          {DEFAULT_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`
                h-2.5 rounded-full transition-all duration-300 focus:outline-none
                ${currentIndex === idx ? 'w-8 bg-mostaza' : 'w-2.5 bg-crema/50 hover:bg-crema'}
              `}
              aria-label={`Ir a ${slide.tag}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
