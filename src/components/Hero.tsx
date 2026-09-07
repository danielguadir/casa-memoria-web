'use client';

import Image from 'next/image';
import { Monitor } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { Button } from '@/components/design-system';
import HeroCarousel from '@/components/HeroCarousel';

export default function Hero() {
    const { openKioskModal } = useAuth();
    const { siteContent } = useSiteSettings();

    return (
        <section id="inicio" className="relative bg-crema text-verde-profundo overflow-hidden">
            
            {/* 1. Carrusel de Banners a Ancho Completo (Estilo Portal Univalle) */}
            <HeroCarousel />

            {/* 2. Sección Institucional: Logo, Título, Subtítulo y Descripción */}
            <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-14">
                
                {/* Logo Principal */}
                <div className="flex justify-center">
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-mostaza shadow-2xl bg-crema flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                        <Image
                            src="/images/hero-logo.png"
                            alt="Logo Casa de la Memoria"
                            width={160}
                            height={160}
                            className="w-auto h-32 sm:h-36 object-contain p-1"
                            priority
                        />
                    </div>
                </div>

                {/* Título, Subtítulo y Descripción */}
                <div className="space-y-4 max-w-4xl mx-auto">
                    <h1 className="font-serif font-extrabold text-3xl sm:text-5xl md:text-6xl text-verde-profundo drop-shadow-sm">
                        {siteContent.heroTitle}
                    </h1>

                    {siteContent.heroSubtitle && (
                        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-terracota font-sans">
                            {siteContent.heroSubtitle}
                        </p>
                    )}

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
