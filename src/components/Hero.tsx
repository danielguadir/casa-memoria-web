'use client';

import Image from 'next/image';
import { ArrowDown, Monitor } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/design-system';

export default function Hero() {
    const { openKioskModal } = useAuth();

    return (
        <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center bg-crema text-verde-profundo overflow-hidden">

            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/tesoros.png"
                    alt="Territorio de Cumbal"
                    fill
                    className="object-cover object-center opacity-40 brightness-75"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-crema via-transparent to-transparent z-10"></div>
                <div className="absolute inset-0 bg-verde-profundo/20 z-10"></div>
            </div>

            <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 mb-20 space-y-12 animate-fade-in">
                <div className="flex justify-center mb-10">
                    <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-mostaza shadow-2xl bg-crema/20 backdrop-blur-sm flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                        <div className="relative w-full h-full flex items-center justify-center transform scale-110">
                            <Image
                                src="/images/hero-logo.png"
                                alt="Logo Hero"
                                width={190}
                                height={190}
                                className="w-auto h-48 object-contain drop-shadow-md"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6 max-w-4xl mx-auto">
                    <h1 className="font-serif font-extrabold text-5xl md:text-7xl !leading-[1.1] text-verde-profundo drop-shadow-md text-balance">
                        Casa de la <span className="text-terracota inline-block">Memoria</span> <br />
                        Gran Cumbal
                    </h1>

                    <h2 className="text-xl md:text-3xl font-medium text-cafe max-w-3xl mx-auto">
                        Centro Cultural & Archivo General (AGN)
                    </h2>

                    <p className="text-lg md:text-2xl font-sans text-cafe/90 max-w-3xl mx-auto leading-relaxed border-t border-b border-verde-profundo/20 py-6 my-8">
                        Desarrollamos estrategias de salvaguarda y protección de las memorias y el patrimonio cultural de los pueblos indígenas del sur de Colombia
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                    <Button
                        variant="mostaza"
                        size="lg"
                        onClick={openKioskModal}
                        leftIcon={<Monitor className="w-5 h-5" />}
                        className="shadow-lg font-bold text-base px-8 py-4 rounded-full w-full sm:w-auto"
                    >
                        Consulta Pública - Casa de la Memoria
                    </Button>
                    <a href="#sobre-el-proceso" className="bg-terracota hover:bg-verde-profundo text-crema px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 transform hover:-translate-y-1 shadow-md w-full sm:w-auto text-center">
                        Conoce el proceso
                    </a>
                    <a href="#convocatoria" className="border-2 border-verde-profundo text-verde-profundo hover:bg-verde-profundo hover:text-crema px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 w-full sm:w-auto text-center">
                        Convocatoria
                    </a>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                <a href="#sobre-el-proceso" className="text-terracota hover:text-verde-profundo transition-colors">
                    <ArrowDown size={36} />
                </a>
            </div>

        </section>
    );
}
