'use client';

import React, { useRef } from 'react';
import { 
  CheckCircle, AlertCircle, Calendar, Clock, MapPin, Target, 
  Upload, Image as ImageIcon, Trash2
} from 'lucide-react';
import Image from 'next/image';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { useAuth } from '@/context/AuthContext';

export default function Convocatoria() {
  const { siteContent, updatePageContent } = useSiteSettings();
  const { isLoggedIn, user, activeView } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = isLoggedIn && (activeView === 'admin' || user?.role === 'Administrador');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|png|jpg|svg\+xml|webp)$/)) {
      alert('Por favor selecciona una imagen válida (.jpg, .jpeg, .png, .svg).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updatePageContent({ convocatoriaImageSrc: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    updatePageContent({ convocatoriaImageSrc: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const infoGeneral = [
    { label: 'Inscripciones', value: siteContent.convocatoriaInfoInscripciones, icon: AlertCircle },
    { label: 'Modalidad', value: siteContent.convocatoriaInfoModalidad, icon: MapPin },
    { label: 'Inicio', value: siteContent.convocatoriaInfoInicio, icon: Calendar },
    { label: 'Cierre', value: siteContent.convocatoriaInfoCierre, icon: CheckCircle },
    { label: 'Horarios', value: siteContent.convocatoriaInfoHorarios, icon: Clock },
    { label: 'Inscripción', value: siteContent.convocatoriaInfoInscripcion, icon: Target },
  ];

  const requisitos = [
    siteContent.convocatoriaRequisito1,
    siteContent.convocatoriaRequisito2,
    siteContent.convocatoriaRequisito3,
    siteContent.convocatoriaRequisito4,
  ];

  // Escala de tamaños de letra dinámicos para los contenedores
  const textSizeClasses = {
    sm: 'text-sm font-normal',
    md: 'text-base font-medium',
    lg: 'text-lg font-semibold',
    xl: 'text-xl font-bold',
  }[siteContent.convocatoriaTextSize || 'md'];

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
        <div className="absolute inset-0 bg-gradient-to-t from-crema via-crema/60 to-crema/80 z-10" />
        <div className="absolute inset-0 bg-verde-profundo/5 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          
          {/* Contenedor de la Imagen (Lado Izquierdo) */}
          <div className="relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-8 border-crema-dark bg-crema-dark/50 flex items-center justify-center group">
            
            {/* Input oculto de archivos para Administrador */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/jpeg,image/png,image/jpg,image/svg+xml,image/webp"
              className="hidden"
            />

            {siteContent.convocatoriaImageSrc ? (
              <>
                <Image
                  src={siteContent.convocatoriaImageSrc}
                  alt="Imagen de Convocatoria"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-terracota/10 pointer-events-none" />

                {/* Botones de control flotante solo para Administrador */}
                {isAdmin && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 p-4 z-30">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-verde-profundo hover:bg-terracota text-crema text-xs font-bold rounded-xl shadow-lg flex items-center space-x-2 transition-colors cursor-pointer"
                    >
                      <Upload size={16} />
                      <span>Cambiar Imagen (JPG/PNG/SVG)</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-3 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl shadow-lg flex items-center space-x-1 transition-colors cursor-pointer"
                      title="Eliminar imagen"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-verde-profundo/10 text-verde-profundo flex items-center justify-center mx-auto shadow-inner">
                  <ImageIcon size={32} />
                </div>
                {isAdmin ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-terracota hover:bg-verde-profundo text-crema font-bold text-xs rounded-2xl shadow-xl transition-all flex items-center space-x-2.5 mx-auto cursor-pointer border-2 border-crema/30"
                  >
                    <Upload size={18} />
                    <span>Agregar Imagen (JPG / PNG / SVG)</span>
                  </button>
                ) : (
                  <p className="text-xs text-cafe/50 font-medium">Contenedor de Imagen</p>
                )}
              </div>
            )}
          </div>

          {/* Encabezado / Contenido (Lado Derecho) */}
          <div className="space-y-6">
            {siteContent.convocatoriaTag && (
              <span className="text-mostaza font-bold text-sm tracking-widest uppercase block">
                {siteContent.convocatoriaTag}
              </span>
            )}

            {siteContent.convocatoriaTitle ? (
              <h2 className="font-serif font-bold text-4xl lg:text-5xl text-verde-profundo leading-tight">
                {siteContent.convocatoriaTitle}
              </h2>
            ) : isAdmin ? (
              <div className="p-5 rounded-2xl border-2 border-dashed border-terracota/40 bg-crema-dark/30 text-center space-y-1">
                <p className="text-xs font-bold text-verde-profundo uppercase tracking-wider">Recuadro de Título Principal</p>
                <p className="text-[11.5px] text-cafe/60">Disponible para agregar título desde el Panel Admin</p>
              </div>
            ) : null}

            <div className="w-24 h-1 bg-terracota rounded-full"></div>

            {siteContent.convocatoriaDesc ? (
              <p className={`font-sans text-cafe/90 leading-relaxed ${textSizeClasses} mt-6`}>
                {siteContent.convocatoriaDesc}
              </p>
            ) : isAdmin ? (
              <div className="p-4 rounded-xl border border-dashed border-crema-dark bg-white/50 text-center">
                <p className="text-[11.5px] text-cafe/50 italic">Recuadro de Descripción Principal (Editable desde Panel Admin)</p>
              </div>
            ) : null}

            {siteContent.convocatoriaBodyText && (
              <p className={`font-sans text-cafe/80 ${textSizeClasses}`}>
                {siteContent.convocatoriaBodyText}
              </p>
            )}

            {siteContent.convocatoriaBadgeText && (
              <div className="inline-block bg-terracota text-crema px-8 py-3 rounded-full font-bold shadow-lg transform -rotate-1">
                {siteContent.convocatoriaBadgeText}
              </div>
            )}
          </div>
        </div>

        {/* Cajas / Divs de Información General y Requisitos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-sm mt-8">

          {/* Div / Cuadro 1: Info General */}
          <div className="bg-crema-dark/85 backdrop-blur-md rounded-3xl p-8 border border-crema-dark/50 relative shadow-sm">
            <h3 className="font-serif font-bold text-2xl text-verde-profundo mb-8 border-b border-verde-profundo/20 pb-4">
              Información General
            </h3>

            <div className="space-y-6">
              {infoGeneral.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center space-x-4 bg-crema p-4 rounded-xl border border-crema-dark/30 shadow-sm min-h-[64px]">
                    <div className="bg-verde-profundo/10 p-2 rounded-lg shrink-0">
                      <Icon className="text-verde-profundo" size={24} />
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-verde-profundo text-xs uppercase tracking-wider">{item.label}</p>
                      <p className={`text-cafe/90 ${textSizeClasses}`}>
                        {item.value || <span className="text-cafe/30 italic text-xs">Sin información cargada</span>}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Div / Cuadro 2: Requisitos */}
          <div className="bg-verde-profundo/90 backdrop-blur-md text-crema rounded-3xl p-8 border hover:border-mostaza/50 transition-colors shadow-lg shadow-verde-profundo/20 flex flex-col justify-between">
            <div>
              <h3 className="font-serif font-bold text-2xl text-mostaza mb-8 border-b border-mostaza/30 pb-4">
                Requisitos
              </h3>

              <ul className="space-y-6 text-crema/90">
                {requisitos.map((req, idx) => (
                  <li key={idx} className="flex items-start space-x-4">
                    <span className="bg-mostaza text-verde-profundo rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1 shadow">
                      {idx + 1}
                    </span>
                    <p className={`pt-1 ${textSizeClasses}`}>
                      {req || <span className="text-crema/40 italic text-xs">Requisito disponible</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cuadro de Cita / Quote */}
            <div className="mt-12 bg-black/20 p-6 rounded-2xl border-l-4 border-terracota">
              <p className="font-serif italic text-mostaza leading-relaxed text-lg text-balance">
                {siteContent.convocatoriaQuote || <span className="text-mostaza/50 text-sm">Espacio para cita o reflexión comunitaria</span>}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
