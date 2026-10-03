'use client';

import React from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import TemasDeInteres from '@/components/TemasDeInteres';

export default function Hero() {
    return (
        <section id="inicio" className="relative bg-crema text-verde-profundo overflow-hidden pb-14">
            
            {/* 1. Carrusel de Banners a Ancho Completo */}
            <HeroCarousel />

            {/* 2. Sección de Temas de Interés (Noticias estilo lista institucional desplegable inline) */}
            <TemasDeInteres />

        </section>
    );
}
