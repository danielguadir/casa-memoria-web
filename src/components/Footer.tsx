'use client';

import Image from 'next/image';
import { MapPin, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { socialLinks } from '@/data/socialLinks';


export default function Footer() {
  const { activeView } = useAuth();

  // Hide footer completely when in Admin Panel view
  if (activeView === 'admin') {
    return null;
  }

  return (
    <footer id="contacto" className="bg-cafe text-crema py-12 border-t-4 border-terracota">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-mostaza bg-crema flex items-center justify-center shadow-md shrink-0">
                <Image 
                  src="/images/hero-logo.png" 
                  alt="Logo Casa de la Memoria" 
                  width={44} 
                  height={44} 
                  className="w-full h-full object-cover p-0" 
                />
              </div>
              <h3 className="font-serif font-bold text-2xl text-mostaza">
                Casa de la Memoria Cumbal
              </h3>
            </div>
            <p className="text-sm font-sans leading-relaxed text-crema/80">
              Desarrollamos estrategias de salvaguarda y protección de las memorias y el patrimonio cultural de los pueblos indígenas del sur de Colombia.
            </p>

            <div className="space-y-2 pt-2">
              <p className="text-xs font-semibold text-mostaza uppercase tracking-wider">Síguenos en Redes Sociales:</p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Síguenos en ${social.name}`}
                    aria-label={social.name}
                    className={`
                      w-9 h-9 rounded-full flex items-center justify-center 
                      transition-all duration-300 cursor-pointer hover:scale-115 shrink-0 shadow-md
                      bg-verde-profundo text-crema border border-crema/10
                      ${social.hoverColorClass}
                    `}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
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

            {/* Mapa Interactivo Libre de Bloqueos (OpenStreetMap) + Accesos Directos */}
            <div className="pt-1 space-y-2">
              <div className="relative w-full h-28 rounded-lg overflow-hidden border border-mostaza/30 shadow-md hover:border-mostaza transition-all group">
                <iframe
                  title="Mapa Casa de la Memoria Cumbal"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-77.8020%2C0.9030%2C-77.7870%2C0.9160&layer=mapnik&marker=0.9094288%2C-77.7946997"
                  width="100%"
                  height="145%"
                  style={{ border: 0, marginTop: '-2px' }}
                  loading="lazy"
                  className="w-full grayscale-[15%] contrast-[105%] group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="flex items-center justify-between text-xs font-sans pt-0.5">
                <a
                  href="https://maps.app.goo.gl/jditokbDdconzYET6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-mostaza hover:underline transition-all"
                  title="Abrir en Google Maps"
                >
                  <span>Google Maps</span>
                  <ExternalLink size={12} />
                </a>
                <a
                  href="https://earth.google.com/web/@0.9094288,-77.7946997,3050a,1000d,35y,0h,0t,0r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-crema/80 hover:text-mostaza hover:underline transition-all"
                  title="Explorar en Google Earth"
                >
                  <span>Google Earth</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-xl text-mostaza border-b border-mostaza/30 pb-2">Redes de Apoyo</h4>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-crema/10 text-center text-sm font-sans text-crema/60 flex flex-col sm:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Casa de la Memoria Cumbal. Todos los derechos reservados.</p>
          <p className="mt-2 sm:mt-0">Territorio, Memoria y Formación</p>
        </div>
      </div>
    </footer>
  );
}
