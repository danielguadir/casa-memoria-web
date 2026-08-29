import Image from 'next/image';
import { Instagram, MapPin, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contacto" className="bg-cafe text-crema py-12 border-t-4 border-terracota">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Image src="/images/hero-logo.png" alt="Logo Casa de la Memoria" width={60} height={60} className="w-auto h-16 object-contain filter brightness-110" />
                            <h3 className="font-serif font-bold text-2xl text-mostaza">
                                Casa de la Memoria<br /><span className="text-lg font-medium text-crema">Gran Cumbal</span>
                            </h3>
                        </div>
                        <p className="text-sm font-sans leading-relaxed text-crema/80">
                            Desarrollamos estrategias de salvaguarda y protección de las memorias y el patrimonio cultural de los pueblos indígenas del sur de Colombia.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-serif font-semibold text-xl text-mostaza border-b border-mostaza/30 pb-2">Contacto y Ubicación</h4>
                        <div className="flex items-start space-x-3 text-sm">
                            <MapPin className="text-terracota flex-shrink-0 mt-1" size={20} />
                            <p className="font-sans leading-relaxed">
                                Cabildo de Cumbal. Barrio los prados,<br />
                                carrera 13/calle 19 esquina. Tercer piso,<br />
                                Cumbal, Nariño – Colombia.
                            </p>
                        </div>

                        <div className="flex space-x-4 pt-2">
                            <a href="https://www.instagram.com/casadelamemoriagrancumbal" target="_blank" rel="noopener noreferrer" className="bg-verde-profundo p-2 rounded-full hover:bg-terracota transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="bg-verde-profundo p-2 rounded-full hover:bg-terracota transition-colors">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-serif font-semibold text-xl text-mostaza border-b border-mostaza/30 pb-2">Redes de Apoyo</h4>
                        <div className="space-y-2 text-sm">
                            <p><span className="font-semibold text-terracota">Organiza:</span><br /> @casadelamemoriagrancumbal</p>
                            <p className="pt-2"><span className="font-semibold text-terracota">Con el apoyo de:</span><br />
                                <span className="text-crema/80 inline-block mt-1 space-y-1">
                                    • @direccion.de.cultura.narino<br />
                                    • @gobnarino<br />
                                    • @aicoporlapachamama
                                </span>
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-12 pt-6 border-t border-crema/10 text-center text-sm font-sans text-crema/60 flex flex-col sm:flex-row justify-between items-center">
                    <p>© {new Date().getFullYear()} Casa de la Memoria Gran Cumbal. Todos los derechos reservados.</p>
                    <p className="mt-2 sm:mt-0">Territorio, Memoria y Formación</p>
                </div>
            </div>
        </footer>
    );
}
