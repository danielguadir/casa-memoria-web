'use client';

import { Monitor } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { Button } from '@/components/design-system';
import HeroCarousel from '@/components/HeroCarousel';
import TemasDeInteres from '@/components/TemasDeInteres';

export default function Hero() {
    const { openKioskModal } = useAuth();
    const { siteContent } = useSiteSettings();

    return (
        <section id="inicio" className="relative bg-crema text-verde-profundo overflow-hidden pb-14">
            
            {/* 1. Carrusel de Banners a Ancho Completo */}
            <HeroCarousel />

            {/* 2. Sección de Temas de Interés (Noticias estilo lista institucional desplegable inline) */}
            <TemasDeInteres />

            {/* 3. Sección Institucional: Título y Descripción */}
            <div id="inicio-presentacion" className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-6 pb-6">
                
                {/* Título y Descripción */}
                <div className="space-y-4 max-w-4xl mx-auto">
                    <h1 className="font-serif font-extrabold text-3xl sm:text-5xl md:text-6xl text-verde-profundo drop-shadow-sm">
                        {siteContent.heroTitle}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl font-sans text-cafe/90 max-w-3xl mx-auto leading-relaxed border-t border-b border-verde-profundo/20 py-4 font-medium">
                        {siteContent.heroDesc}
                    </p>
                </div>

                {/* Botón de Acción Principal */}
                <div className="flex justify-center pt-2">
                    <Button
                        variant="mostaza"
                        size="lg"
                        onClick={openKioskModal}
                        leftIcon={<Monitor className="w-5 h-5" />}
                        className="shadow-xl font-bold text-base sm:text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform"
                    >
                        Consulta Pública - Casa de la Memoria
                    </Button>
                </div>
            </div>

        </section>
    );
}
