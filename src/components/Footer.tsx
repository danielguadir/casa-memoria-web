'use client';

import Image from 'next/image';
import { Instagram, MapPin, Facebook, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/casadelamemoriagrancumbal',
    icon: <Instagram size={20} />,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61565526674813',
    icon: <Facebook size={20} />,
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@casadelamemoriagrancumbal',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .56.04.82.1v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.6a6.34 6.34 0 0010.83 4.47V10.45a8.28 8.28 0 004.82 1.54V8.54a4.85 4.85 0 01-3.21-1.85z"/>
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/casamemoriacumbal',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

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
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-mostaza bg-crema flex items-center justify-center shadow-md shrink-0">
                <Image 
                  src="/images/hero-logo.png" 
                  alt="Logo Casa de la Memoria" 
                  width={50} 
                  height={50} 
                  className="w-auto h-12 object-contain p-0.5 scale-110" 
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
                    className="bg-verde-profundo p-2.5 rounded-full hover:bg-terracota hover:scale-110 transition-all duration-200 text-crema flex items-center justify-center border border-crema/10 shadow-sm"
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

            {/* Mapa de Google Maps optimizado (50% tamaño reducido) sin bloqueos de iframe */}
            <div className="pt-1 space-y-1.5">
              <div className="relative w-full h-24 rounded-lg overflow-hidden border border-mostaza/30 shadow-md hover:border-mostaza transition-all group">
                <iframe
                  title="Mapa Casa de la Memoria Cumbal"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.577!2d-77.7972746!3d0.9094342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e295d004579bb55%3A0xec54b6d43db56cd7!2sCasa%20de%20la%20Memoria%20del%20Gran%20Cumbal!5e0!3m2!1ses!2sco!4v1710000000000!5m2!1ses!2sco"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[20%] contrast-[105%] group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="flex justify-end">
                <a
                  href="https://maps.app.goo.gl/jditokbDdconzYET6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-mostaza hover:underline font-sans transition-all"
                  title="Abrir ubicación en Google Maps"
                >
                  <span>Abrir en Google Maps</span>
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
