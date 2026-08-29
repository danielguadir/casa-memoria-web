import { CheckCircle, AlertCircle, Calendar, Clock, MapPin, Target } from 'lucide-react';
import Image from 'next/image';

export default function Convocatoria() {
    const infoGeneral = [
        { label: 'Inscripciones', value: 'Hasta el 10 de septiembre de 2025 o completar cupo', icon: AlertCircle },
        { label: 'Modalidad', value: 'Presencial', icon: MapPin },
        { label: 'Inicio', value: '13 de septiembre de 2025', icon: Calendar },
        { label: 'Cierre', value: '12 de octubre de 2025', icon: CheckCircle },
        { label: 'Horarios', value: 'Sábados (2pm-4pm) / Domingos (9am-11am)', icon: Clock },
        { label: 'Inscripción', value: 'Gratuita', icon: Target },
    ];

    return (
        <section id="convocatoria" className="py-24 bg-crema text-cafe relative overflow-hidden">

            {/* Background Image - piedra2 */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/piedra2.jpg"
                    alt="Piedra Ancestral"
                    fill
                    className="object-cover object-center opacity-30 brightness-90"
                    priority
                />
                {/* Gradients to blend and improve readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-crema via-crema/60 to-crema/80 z-10"></div>
                <div className="absolute inset-0 bg-verde-profundo/5 z-10"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                    <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-crema-dark lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                        <Image
                            src="/images/Captura de pantalla 2026-03-22 092339.png"
                            alt="Formación en comunicación"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-terracota/10"></div>
                    </div>

                    <div className="space-y-6">
                        <span className="text-mostaza font-bold text-sm tracking-widest uppercase">Formación Comunitaria</span>
                        <h2 className="font-serif font-bold text-4xl lg:text-5xl text-verde-profundo">Convocatoria</h2>
                        <div className="w-24 h-1 bg-terracota rounded-full"></div>

                        <p className="text-lg md:text-xl font-sans text-cafe/90 leading-relaxed font-medium mt-6">
                            Proceso de formación en comunicación asertiva y desarrollo de habilidades en expresión oral de la Casa de la Memoria del Gran Cumbal.
                        </p>
                        <p className="text-cafe/80 text-base">
                            A través del teatro y círculos de palabreo, fortalecerás tus habilidades integrando saberes ancestrales, artes escénicas y metodologías participativas.
                        </p>

                        <div className="inline-block bg-terracota text-crema px-8 py-3 rounded-full font-bold shadow-lg transform -rotate-1">
                            📍 CUPOS COMPLETOS (Cerrada)
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-sm mt-8">

                    {/* Info General */}
                    <div className="bg-crema-dark/85 backdrop-blur-md rounded-3xl p-8 border border-crema-dark/50 relative shadow-sm">
                        <h3 className="font-serif font-bold text-2xl text-verde-profundo mb-8 border-b border-verde-profundo/20 pb-4">
                            Información General
                        </h3>

                        <div className="space-y-6">
                            {infoGeneral.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="flex items-center space-x-4 bg-crema p-4 rounded-xl border border-crema-dark/30 shadow-sm">
                                        <div className="bg-verde-profundo/10 p-2 rounded-lg">
                                            <Icon className="text-verde-profundo" size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-verde-profundo">{item.label}</p>
                                            <p className="text-cafe/80">{item.value}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Requisitos */}
                    <div className="bg-verde-profundo/90 backdrop-blur-md text-crema rounded-3xl p-8 border hover:border-mostaza/50 transition-colors shadow-lg shadow-verde-profundo/20">
                        <h3 className="font-serif font-bold text-2xl text-mostaza mb-8 border-b border-mostaza/30 pb-4">
                            Requisitos
                        </h3>

                        <ul className="space-y-6 text-crema/90">
                            <li className="flex items-start space-x-4">
                                <span className="bg-mostaza text-verde-profundo rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1 shadow">1</span>
                                <p className="pt-1">Pertenecer a uno de los resguardos del Gran Cumbal (Cumbal, Panan, Chiles y Mayasquer)</p>
                            </li>
                            <li className="flex items-start space-x-4">
                                <span className="bg-mostaza text-verde-profundo rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1 shadow">2</span>
                                <p className="pt-1">Tener entre 14 y 30 años de edad</p>
                            </li>
                            <li className="flex items-start space-x-4">
                                <span className="bg-mostaza text-verde-profundo rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1 shadow">3</span>
                                <p className="pt-1">Tener disponibilidad de tiempo sábados y domingos</p>
                            </li>
                            <li className="flex items-start space-x-4">
                                <span className="bg-mostaza text-verde-profundo rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1 shadow">4</span>
                                <p className="pt-1">Poder trasladarse hasta el resguardo de Cumbal en el lugar determinado para la realización de las clases.</p>
                            </li>
                        </ul>

                        <div className="mt-12 bg-black/20 p-6 rounded-2xl border-l-4 border-terracota">
                            <p className="font-serif italic text-mostaza leading-relaxed text-lg text-balance">
                                &ldquo;La palabra teje comunidad y el teatro nos devuelve a nuestra raíz.&rdquo;
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
