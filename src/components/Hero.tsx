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
        <section id="inicio" className="relative min-h-[90vh] flex flex-col items-center justify-center bg-crema text-verde-profundo overflow-hidden py-12">

            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/tesoros.png"
                    alt="Territorio de Cumbal"
                    fill
                    className="object-cover object-center opacity-35 brightness-75"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-crema via-crema/40 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-verde-profundo/15 z-10"></div>
            </div>

            <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 my-auto w-full">
                
                {/* 1. Logo Principal */}
                <div className="flex justify-center pt-4">
                    <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-mostaza shadow-2xl bg-crema/30 backdrop-blur-sm flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                        <div className="relative w-full h-full flex items-center justify-center transform scale-110">
                            <Image
                                src="/images/hero-logo.png"
                                alt="Logo Casa de la Memoria"
                                width={190}
                                height={190}
                                className="w-auto h-36 sm:h-44 object-contain drop-shadow-md"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Título, Subtítulo y Descripción */}
                <div className="space-y-4 max-w-4xl mx-auto">
                    <h1 className="font-serif font-extrabold text-4xl sm:text-6xl md:text-7xl !leading-[1.1] text-verde-profundo drop-shadow-md text-balance">
                        {siteContent.heroTitle}
                    </h1>

                    {siteContent.heroSubtitle && (
                        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-terracota font-sans">
                            {siteContent.heroSubtitle}
                        </p>
                    )}

                    <p className="text-base sm:text-lg md:text-xl font-sans text-cafe/90 max-w-3xl mx-auto leading-relaxed border-t border-b border-verde-profundo/20 py-4 my-4 font-medium">
                        {siteContent.heroDesc}
                    </p>
                </div>

                {/* 3. Carrusel Interactivo de Espacios (Imagen 1, Imagen 2, Imagen 3) */}
                <HeroCarousel />

                {/* 4. Botón de Acción Principal */}
                <div className="flex justify-center pt-2">
                    <Button
                        variant="mostaza"
                        size="lg"
                        onClick={openKioskModal}
                        leftIcon={<Monitor className="w-6 h-6" />}
                        className="shadow-xl font-bold text-lg px-10 py-5 rounded-full hover:scale-105 transition-transform"
                    >
                        Consulta Pública - Casa de la Memoria
                    </Button>
                </div>
            </div>

        </section>
    );
}
