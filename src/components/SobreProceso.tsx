'use client';

import { Target, Lightbulb, Handshake } from 'lucide-react';
import Image from 'next/image';
import { useSiteSettings } from '@/context/SiteSettingsContext';

export default function SobreProceso() {
    const { siteContent } = useSiteSettings();

    const cards = [
        {
            title: 'Qué es',
            icon: <Lightbulb size={32} className="text-mostaza" />,
            content: 'Un espacio cultural enfocado en el fortalecimiento de la identidad de los pueblos indígenas del sur de Colombia.',
        },
        {
            title: 'Propósito',
            icon: <Target size={32} className="text-mostaza" />,
            content: 'Salvaguardar y proteger la memoria, el patrimonio cultural y la historia audiovisual del Gran Cumbal.',
        },
        {
            title: 'Origen',
            icon: <Handshake size={32} className="text-mostaza" />,
            content: 'Nace del tejido colectivo de la comunidad, impulsado por el respeto a lo ancestral y la necesidad de dejar un legado.',
        },
    ];

    return (
        <section id="sobre-el-proceso" className="py-24 bg-crema-dark text-cafe relative overflow-hidden">

            {/* Background Image - piedra-m.jpg con relieve marcado */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/piedra-m.jpg"
                    alt="Textura piedra ancestral"
                    fill
                    className="object-cover object-center grayscale contrast-125 brightness-90 opacity-40 mix-blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-crema-dark via-transparent/50 to-crema-dark z-10"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

                <div className="flex flex-col lg:flex-row items-center gap-16 mb-20 text-center lg:text-left">
                    <div className="max-w-3xl space-y-6">
                        <h2 className="font-serif font-bold text-4xl lg:text-5xl text-verde-profundo drop-shadow-sm">
                            {siteContent.sobreProcesoTitle}
                        </h2>
                        <div className="w-24 h-1 bg-terracota mx-auto lg:mx-0 rounded-full shadow-md"></div>
                        <p className="text-lg font-sans text-cafe leading-relaxed pt-4 font-semibold italic">
                            {siteContent.sobreProcesoDesc}
                        </p>
                    </div>

                    {/* Professional UX Senior Design: Organic Shape Mask with Background Accents */}
                    <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end py-10">
                        {/* Decorative background shape - Terracota accent */}
                        <div className="absolute top-4 right-4 w-full h-full bg-terracota/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-pulse blur-2xl"></div>

                        <div className="relative group overflow-visible">
                            {/* Frame 1: Geometric offset border (Verde Profundo) */}
                            <div className="absolute -inset-4 border-2 border-verde-profundo/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] transform group-hover:-rotate-3 transition-transform duration-700"></div>

                            {/* Frame 2: Masked Organic Shape Image */}
                            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] overflow-hidden shadow-2xl border-4 border-crema transform group-hover:rotate-2 transition-transform duration-700 bg-verde-profundo">
                                <Image
                                    src="/images/grupo-gente.png"
                                    alt="Grupo de gente en la Casa de la Memoria"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-verde-profundo/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                            </div>

                            {/* Frame 3: Gold accent label (Mostaza) */}
                            <div className="absolute -bottom-4 right-0 bg-mostaza text-verde-profundo px-4 py-2 rounded-lg font-serif font-bold text-sm shadow-xl transform rotate-3 flex items-center space-x-2">
                                <span className="w-2 h-2 bg-verde-profundo rounded-full animate-bounce"></span>
                                <span>Comunidad Viviendo la Memoria</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, idx) => (
                        <div key={idx} className="bg-crema/95 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-crema-dark/50 group">
                            <div className="w-16 h-16 bg-verde-profundo rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 shadow-lg transition-transform duration-300">
                                {card.icon}
                            </div>
                            <h3 className="font-serif font-semibold text-xl text-verde-profundo mb-4">{card.title}</h3>
                            <p className="text-cafe font-sans text-sm leading-relaxed font-medium">
                                {card.content}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
