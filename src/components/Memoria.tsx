import { Film, Quote, Video, PenTool, Sprout, BookOpen, Save, HardDrive } from 'lucide-react';
import Image from 'next/image';

export default function Memoria() {
    return (
        <section id="memoria" className="py-24 bg-terracota text-crema relative overflow-hidden">

            {/* Background visual elements - Identical approach to "Sobre el Proceso" */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/piedra-m.jpg"
                    alt="Textura piedra ancestral"
                    fill
                    className="object-cover object-center grayscale contrast-125 brightness-75 opacity-30 mix-blend-multiply"
                    priority
                />
                {/* Soft fading to blend with section breaks */}
                <div className="absolute inset-0 bg-gradient-to-b from-terracota via-transparent to-terracota z-10"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

                <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-crema/10 rounded-full backdrop-blur-sm border border-crema/20 shadow-xl">
                            <PenTool className="text-mostaza" size={32} />
                        </div>
                    </div>
                    <span className="text-mostaza font-bold text-sm tracking-widest uppercase">Patrimonio Vivo</span>
                    <h2 className="font-serif font-bold text-4xl lg:text-5xl text-crema tracking-tight drop-shadow-lg">Memoria Visual y Sonora</h2>
                    <div className="w-24 h-1 bg-mostaza mx-auto rounded-full shadow-lg"></div>

                    <p className="text-lg md:text-xl font-sans text-crema/90 leading-relaxed max-w-2xl mx-auto font-semibold italic">
                        Archivos, relatos y tejido audiovisual que documentan la historia y el sentir del Pueblo Indígena de los Pastos.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 text-cafe items-center">

                    {/* Card Lanzamiento Documental - Enlace a Reel de Facebook */}
                    <a 
                        href="https://www.facebook.com/reel/818082714699399" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-crema/95 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative group transform hover:-translate-y-2 transition-all duration-500 border-b-8 border-mostaza cursor-pointer focus:outline-none focus:ring-4 focus:ring-mostaza/50"
                        title="Ver corto documental 'Ecos del Gran Cumbal' en Facebook Reel"
                    >
                        <div className="h-56 bg-verde-profundo relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                                <div className="w-20 h-20 bg-mostaza/90 group-hover:bg-terracota group-hover:scale-110 rounded-full flex items-center justify-center animate-pulse group-hover:animate-none shadow-2xl border-4 border-crema/30 transition-all duration-300">
                                    <Film size={40} className="text-verde-profundo group-hover:text-crema ml-1 transition-colors" />
                                </div>
                            </div>
                            <Image
                                src="/images/tesoros2.png"
                                alt="Documental Ecos del Gran Cumbal"
                                fill
                                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>

                        <div className="p-10">
                            <div className="flex items-center justify-between">
                                <span className="px-4 py-1.5 bg-terracota/10 text-terracota font-bold text-xs rounded-full uppercase tracking-widest border border-terracota/20">
                                    Estreno | Corto Documental
                                </span>
                                <span className="text-xs font-bold text-verde-profundo flex items-center gap-1 group-hover:text-terracota transition-colors">
                                    <span>Ver en Facebook</span>
                                    <span className="text-base">↗</span>
                                </span>
                            </div>

                            <h3 className="font-serif font-bold text-3xl text-verde-profundo mt-6 mb-3 tracking-tight group-hover:text-terracota transition-colors">
                                Ecos del Gran Cumbal
                            </h3>
                            <p className="font-sans text-cafe/80 text-base leading-relaxed italic mb-8 border-l-4 border-terracota/30 pl-4">
                                &ldquo;Senderos de Memoria y futuro&rdquo;, realizado por el Instituto Humboldt.
                            </p>

                            <div className="bg-crema-dark/50 p-6 rounded-2xl border border-crema-dark mb-6 text-sm font-bold shadow-inner">
                                <div className="flex justify-between items-center text-verde-profundo mb-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="w-8 h-8 rounded-full bg-verde-profundo/10 flex items-center justify-center text-mostaza">📍</span>
                                        <span>Lugar:</span>
                                    </div>
                                    <span className="bg-verde-profundo text-crema px-3 py-1 rounded-lg text-xs font-bold">Casa de la Memoria</span>
                                </div>
                                <div className="flex justify-between items-center text-verde-profundo">
                                    <div className="flex items-center space-x-3">
                                        <span className="w-8 h-8 rounded-full bg-verde-profundo/10 flex items-center justify-center text-mostaza">⏰</span>
                                        <span>Hora:</span>
                                    </div>
                                    <span className="text-terracota font-extrabold uppercase tracking-tighter">5:00pm | ¡Ver Reel!</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-center space-x-2 bg-terracota group-hover:bg-verde-profundo text-crema font-extrabold text-sm uppercase tracking-widest py-3 px-6 rounded-xl transition-colors shadow-md mt-4">
                                <span>Ver Corto Documental en Facebook ↗</span>
                            </div>
                        </div>
                    </a>

                    {/* Experiencia PACPI */}
                    <div className="bg-crema-dark/30 backdrop-blur-md rounded-[2.5rem] p-10 lg:p-14 border-4 border-crema shadow-2xl relative h-full flex flex-col justify-center overflow-hidden group">

                        {/* Design accents */}
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-mostaza/20 rounded-full blur-3xl"></div>
                        <div className="absolute top-8 right-8 w-24 h-24 bg-mostaza rounded-full flex items-center justify-center shadow-2xl border-4 border-crema z-10 transform group-hover:rotate-12 transition-transform duration-500">
                            <Video size={44} className="text-verde-profundo" />
                        </div>

                        <div className="space-y-8 text-crema relative z-10">
                            <h3 className="font-serif font-bold text-4xl text-crema drop-shadow-lg tracking-tight">
                                Proceso PACPI
                            </h3>

                            <div className="space-y-6">
                                <p className="font-sans text-crema/90 text-lg leading-relaxed border-l-4 border-mostaza pl-6 font-bold bg-black/20 p-6 rounded-r-2xl shadow-xl text-balance">
                                    En el marco de la construcción de la Política Pública de Patrimonio Audiovisual – Capítulo Pueblos Indígenas (PACPI), tuvimos el honor de compartir nuestra experiencia en gestión y salvaguardia.
                                </p>

                                <div className="font-sans text-cafe text-base leading-relaxed bg-crema/95 backdrop-blur-sm pt-8 pb-8 px-8 rounded-[2rem] border border-crema-dark shadow-2xl mt-8 relative">
                                    <Quote size={32} className="text-terracota/30 mb-4 rotate-180" />
                                    <p className="font-bold italic leading-relaxed text-lg text-verde-profundo">
                                        Este espacio permitió el diálogo de saberes, propuestas y el tejido colectivo en pro de la preservación de la Memoria audiovisual de nuestras comunidades.
                                    </p>

                                    {/* Elegant Icon Row replacing basic emojis */}
                                    <div className="flex space-x-6 mt-8 pt-6 border-t border-crema-dark/50">
                                        <div className="group/icon flex flex-col items-center">
                                            <Sprout size={24} className="text-verde-profundo group-hover/icon:text-terracota transition-colors" />
                                            <span className="text-[10px] mt-1 font-bold text-verde-profundo/50 uppercase tracking-tighter">Semilla</span>
                                        </div>
                                        <div className="group/icon flex flex-col items-center">
                                            <BookOpen size={24} className="text-verde-profundo group-hover/icon:text-terracota transition-colors" />
                                            <span className="text-[10px] mt-1 font-bold text-verde-profundo/50 uppercase tracking-tighter">Saberes</span>
                                        </div>
                                        <div className="group/icon flex flex-col items-center">
                                            <Save size={24} className="text-verde-profundo group-hover/icon:text-terracota transition-colors" />
                                            <span className="text-[10px] mt-1 font-bold text-verde-profundo/50 uppercase tracking-tighter">Memoria</span>
                                        </div>
                                        <div className="group/icon flex flex-col items-center">
                                            <HardDrive size={24} className="text-verde-profundo group-hover/icon:text-terracota transition-colors" />
                                            <span className="text-[10px] mt-1 font-bold text-verde-profundo/50 uppercase tracking-tighter">Archivo</span>
                                        </div>
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
