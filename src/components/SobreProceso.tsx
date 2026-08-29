import { Target, Lightbulb, Sprout, Handshake } from 'lucide-react';
import Image from 'next/image';

export default function SobreProceso() {
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
            title: 'Enfoque',
            icon: <Sprout size={32} className="text-mostaza" />,
            content: 'Centrado en el territorio, la formación comunitaria, el diálogo de saberes y la integración de las artes escénicas.',
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
                            Sobre el Proceso
                        </h2>
                        <div className="w-24 h-1 bg-terracota mx-auto lg:mx-0 rounded-full shadow-md"></div>
                        <p className="text-lg font-sans text-cafe leading-relaxed pt-4 font-semibold italic">
                            Construyendo memoria a través de la comunidad, el territorio y nuestras raíces ancestrales. Un proceso colectivo que valora la palabra y el encuentro.
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

                {/* Highlight Section */}
                <div className="mt-24 bg-verde-profundo/95 backdrop-blur-md text-crema rounded-3xl p-8 md:p-12 overflow-hidden relative shadow-2xl border border-crema/20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-terracota/30 rounded-bl-full"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">

                        <div className="space-y-6">
                            <span className="text-mostaza font-bold text-sm tracking-widest uppercase bg-mostaza/20 px-3 py-1 rounded-full border border-mostaza/30">Próximo Evento</span>
                            <h3 className="font-serif font-bold text-3xl text-crema tracking-wide drop-shadow">Actualización y formulación del PMGRD</h3>
                            <p className="font-sans text-crema/90 text-sm leading-relaxed max-w-md italic">
                                Plan Municipal de Gestión del Riesgo de Desastres y la Estrategia Municipal de Respuesta a Emergencias (EMRE).
                            </p>

                            <ul className="space-y-3 pt-4 text-sm bg-crema/5 p-6 rounded-xl border border-crema/10 shadow-inner backdrop-blur-sm">
                                <li className="flex items-center space-x-3"><span className="text-mostaza font-bold min-w-16 opacity-90 underline decoration-mostaza/30">Fecha:</span> <span>Martes, 11 de noviembre de 2025</span></li>
                                <li className="flex items-center space-x-3"><span className="text-mostaza font-bold min-w-16 opacity-90 underline decoration-mostaza/30">Hora:</span> <span>2:00pm</span></li>
                                <li className="flex items-start space-x-3"><span className="text-mostaza font-bold min-w-16 opacity-90 underline decoration-mostaza/30">Lugar:</span> <span>Casa de la Memoria del Gran Cumbal, Cabildo de Cumbal, 3 piso.</span></li>
                            </ul>
                        </div>

                        <div className="space-y-6 lg:border-l border-crema/20 lg:pl-12">
                            <span className="text-terracota-light font-bold text-sm tracking-widest uppercase bg-terracota/30 px-3 py-1 rounded-full border border-terracota/30">Hito</span>
                            <h3 className="font-serif font-bold text-2xl tracking-tight text-crema drop-shadow">IV Congreso Pedagógico Internacional</h3>
                            <div className="w-12 h-1 bg-mostaza/60 rounded-full"></div>

                            <p className="text-mostaza italic font-serif text-lg leading-relaxed drop-shadow-sm font-medium">
                                &ldquo;Raíces pedagógicas para la diversidad y las comunidades de vida&rdquo;
                            </p>

                            <div className="font-sans text-sm space-y-4 text-crema/90 p-6 border border-crema/20 rounded-xl bg-black/20 backdrop-blur shadow-2xl">
                                <p className="font-bold tracking-wide">Naciones invitadas: Colombia, México, Perú, Bolivia, Argentina, Ecuador y Uruguay</p>
                                <div className="pt-2 flex flex-col space-y-2 font-semibold bg-verde-profundo/90 border border-mostaza/40 p-4 rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <span className="mr-2 filter drop-shadow-lg">📅</span> 1, 2 y 3 de febrero de 2026
                                    </div>
                                    <div className="flex items-start">
                                        <span className="mr-2 pt-1 filter drop-shadow-lg">📍</span>
                                        <span className="leading-tight">Territorio de Cumbal y Guachucal,<br />Departamento de Nariño – Colombia</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
