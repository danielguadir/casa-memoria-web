'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Monitor, FileText, Laptop, Mic, 
  Info, X, ChevronRight,
  Sparkles, BookOpen, Compass, ExternalLink, Eye, User, GraduationCap, ListOrdered
} from 'lucide-react';
import { Modal, Button, Badge, Card, Dropdown } from '@/components/design-system';
import { agnCatalogData, AgnItem, AssetType } from '@/data/agnCatalog';
import { digitalArchiveData, DigitalDocument } from '@/data/digitalArchiveCatalog';

const typeIcons: Record<AssetType, React.ReactNode> = {
  Físico: <FileText className="w-4 h-4 text-terracota" />,
  Virtual: <Laptop className="w-4 h-4 text-blue-600" />,
  Audiovisual: <Mic className="w-4 h-4 text-purple-600" />,
  Artefacto: <Compass className="w-4 h-4 text-mostaza" />,
};

const yearRangeOptions = [
  { label: 'Todos los Periodos', value: 'all' },
  { label: 'Colonial (Pre-1800)', value: 'colonial' },
  { label: 'Siglos XIX - XX (1800-1950)', value: '1800-1950' },
  { label: 'Segunda Mitad S. XX (1951-2000)', value: '1951-2000' },
  { label: 'Época Contemporánea (2001-2026)', value: '2001-2026' },
];

export default function ArchivosDigitales() {
  const [catalogItems, setCatalogItems] = useState<AgnItem[]>(agnCatalogData);
  const [digitalDocs, setDigitalDocs] = useState<DigitalDocument[]>(digitalArchiveData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<AssetType | 'Todos'>('Virtual');
  const [selectedYearRange, setSelectedYearRange] = useState('all');
  const [selectedItem, setSelectedItem] = useState<AgnItem | null>(null);
  const [activeUnivalleTab, setActiveUnivalleTab] = useState<'sinopsis' | 'capitulos' | 'autores' | 'ficha'>('sinopsis');

  const mainDoc = digitalDocs[0];

  // Compute counts per type
  const typeCounts = useMemo(() => {
    return {
      Todos: catalogItems.length,
      Físico: catalogItems.filter((i) => i.type === 'Físico').length,
      Virtual: catalogItems.filter((i) => i.type === 'Virtual').length,
      Audiovisual: catalogItems.filter((i) => i.type === 'Audiovisual').length,
      Artefacto: catalogItems.filter((i) => i.type === 'Artefacto').length,
    };
  }, [catalogItems]);

  // Filter catalog items
  const filteredCatalog = useMemo(() => {
    return catalogItems.filter((item) => {
      const matchesType = selectedType === 'Todos' || item.type === selectedType;

      let matchesYear = true;
      if (selectedYearRange === 'colonial') matchesYear = item.year < 1800;
      else if (selectedYearRange === '1800-1950') matchesYear = item.year >= 1800 && item.year <= 1950;
      else if (selectedYearRange === '1951-2000') matchesYear = item.year >= 1951 && item.year <= 2000;
      else if (selectedYearRange === '2001-2026') matchesYear = item.year >= 2001;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !q ||
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q));

      return matchesType && matchesYear && matchesQuery;
    });
  }, [catalogItems, searchQuery, selectedType, selectedYearRange]);

  const handleOpenDocDetail = (item: AgnItem) => {
    // Increment eye view counter
    setCatalogItems(prev =>
      prev.map(i => i.id === item.id ? { ...i, viewsCount: (i.viewsCount || 0) + 1 } : i)
    );
    setDigitalDocs(prev =>
      prev.map(d => ({ ...d, viewsCount: d.viewsCount + 1 }))
    );
    setSelectedItem(item);
    setActiveUnivalleTab('sinopsis');
  };

  const handleReadPdf = () => {
    setCatalogItems(prev =>
      prev.map(i => ({ ...i, viewsCount: (i.viewsCount || 0) + 1 }))
    );
    setDigitalDocs(prev =>
      prev.map(d => ({ ...d, viewsCount: d.viewsCount + 1 }))
    );

    if (mainDoc.pdfUrl) {
      window.open(mainDoc.pdfUrl, '_blank');
    } else if (mainDoc.driveUrl) {
      window.open(mainDoc.driveUrl, '_blank');
    } else {
      alert(`Consultando documento digital: ${mainDoc.title}`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* MÓDULO VISUAL EXACTO A LA FOTO: Consulta Pública - Casa de la Memoria Cumbal */}
      <div className="bg-verde-profundo text-crema rounded-3xl overflow-hidden shadow-2xl border border-crema-dark/40">
        
        {/* Encabezado Principal del Módulo de Consulta */}
        <div className="p-5 sm:p-6 bg-verde-profundo border-b border-crema/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-mostaza/20 border border-mostaza/40 flex items-center justify-center text-mostaza shrink-0">
              <Monitor className="w-6 h-6 text-mostaza" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-crema tracking-wide">
                Consulta Pública - Casa de la Memoria Cumbal
              </h3>
              <p className="text-xs text-crema/70 font-sans">
                Consulta por nombre, ID o palabra clave
              </p>
            </div>
          </div>
        </div>

        {/* Cuerpo del Catálogo: Barra de búsqueda y Filtros */}
        <div className="p-5 sm:p-6 bg-crema-dark/20 space-y-5">
          
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Input de Búsqueda */}
            <div className="relative w-full flex-grow">
              <input
                type="text"
                placeholder="Buscar por ID (ej: AGN-VIR-001), palabra clave, título o autor (ej: Rappaport)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full pl-11 pr-10 py-3 bg-white text-cafe border border-crema-dark rounded-xl 
                  shadow-xs placeholder:text-cafe/40 text-sm font-medium focus:outline-none 
                  focus:ring-2 focus:ring-verde-profundo/30 focus:border-verde-profundo
                "
              />
              <Search className="w-5 h-5 text-terracota absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-cafe/40 hover:text-cafe p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdown Rango de Años */}
            <div className="w-full md:w-auto shrink-0">
              <Dropdown
                options={yearRangeOptions}
                selectedValue={selectedYearRange}
                onSelect={(val) => setSelectedYearRange(val)}
                className="w-full"
              />
            </div>
          </div>

          {/* Pestañas de Activos (Todos 1, Físico 0, Virtual 1, Audiovisual 0, Artefacto 0) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {(['Todos', 'Físico', 'Virtual', 'Audiovisual', 'Artefacto'] as const).map((type) => {
              const isActive = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`
                    px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 
                    flex items-center space-x-2 shrink-0 border shadow-2xs cursor-pointer
                    ${isActive 
                      ? 'bg-verde-profundo text-crema border-verde-profundo shadow-sm scale-[1.02]' 
                      : 'bg-white text-cafe/80 border-crema-dark hover:bg-crema hover:text-verde-profundo'
                    }
                  `}
                >
                  {type !== 'Todos' && typeIcons[type]}
                  <span>{type}</span>
                  <span 
                    className={`
                      px-2 py-0.5 rounded-full text-[10px] font-mono font-bold
                      ${isActive ? 'bg-mostaza text-cafe' : 'bg-crema-dark text-cafe/70'}
                    `}
                  >
                    {typeCounts[type]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Estado de Resultados */}
          <div className="flex items-center justify-between text-xs text-crema/80 font-medium pt-1">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-mostaza shrink-0" />
              <span>
                Mostrando <strong className="text-mostaza font-bold">{filteredCatalog.length}</strong> registros en categoría <strong>&quot;{selectedType}&quot;</strong>.
              </span>
            </div>
            {(searchQuery || selectedType !== 'Virtual' || selectedYearRange !== 'all') && (
              <button 
                onClick={() => { setSearchQuery(''); setSelectedType('Virtual'); setSelectedYearRange('all'); }}
                className="text-mostaza font-bold hover:underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Tarjeta de Documento Digital (IDÉNTICO A LA FOTO PUBLICADA) */}
          {filteredCatalog.length === 0 ? (
            <div className="p-10 text-center bg-white rounded-2xl border border-crema-dark text-cafe space-y-3">
              <Info className="w-10 h-10 text-terracota/60 mx-auto" />
              <p className="font-bold text-base text-verde-profundo">No se encontraron archivos en esta categoría.</p>
              <p className="text-xs text-cafe/60">
                Selecciona la pestaña <strong>Virtual</strong> o <strong>Todos</strong> para ver el libro registrado.
              </p>
              <Button variant="outline" size="sm" onClick={() => setSelectedType('Virtual')}>
                Ver CUMBE RENACIENTE (Virtual)
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {filteredCatalog.map((item) => (
                <Card
                  key={item.id}
                  variant="default"
                  hoverEffect
                  onClick={() => handleOpenDocDetail(item)}
                  className="cursor-pointer border-crema-dark/80 flex flex-col justify-between group bg-white text-cafe rounded-2xl overflow-hidden shadow-md"
                >
                  <div className="p-5 space-y-3">
                    {/* Metadatos Superiores (AGN-VIR-001, Virtual, Ojito) */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-terracota bg-terracota/10 px-2.5 py-0.5 rounded-lg border border-terracota/20">
                          {item.code}
                        </span>
                        <Badge variant="blue">
                          {item.type}
                        </Badge>
                      </div>

                      {/* Contador de Ojito */}
                      <div className="flex items-center space-x-1.5 text-xs text-cafe/70 font-mono bg-crema-dark/50 px-2.5 py-0.5 rounded-full border border-crema-dark">
                        <Eye className="w-3.5 h-3.5 text-terracota" />
                        <span>{item.viewsCount || mainDoc.viewsCount}</span>
                      </div>
                    </div>

                    {/* Título & Descripción Corta */}
                    <div>
                      <h4 className="font-serif font-bold text-lg text-verde-profundo group-hover:text-terracota transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-cafe/75 mt-2 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Autoría */}
                    <div className="pt-3 border-t border-crema-dark/40 flex items-center space-x-2 text-xs text-cafe/80 truncate">
                      <User className="w-3.5 h-3.5 text-terracota shrink-0" />
                      <span className="truncate font-semibold text-verde-profundo">{item.author}</span>
                    </div>
                  </div>

                  {/* Footer Acción: Consultar Ficha Técnica */}
                  <div className="px-5 py-3 bg-crema-dark/40 border-t border-crema-dark/40 flex items-center justify-between text-xs text-verde-profundo font-bold group-hover:bg-verde-profundo group-hover:text-crema transition-colors">
                    <span>Consultar Ficha Técnica & Capítulos</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-terracota group-hover:text-mostaza" />
                  </div>
                </Card>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* MODAL DETALLADO ESTILO REPOSITORIO UNIVERSIDAD (UNIVALLE) AL DAR CLIC EN EL LIBRO */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={
            <div className="flex items-center space-x-2 font-serif text-crema">
              <GraduationCap className="w-6 h-6 text-mostaza" />
              <span>Ficha Técnica Etnográfica & Repositorio Académico</span>
            </div>
          }
          subtitle="Casa de la Memoria del Gran Cumbal — Instituto Colombiano de Antropología e Historia (ICANH)"
          size="lg"
        >
          <div className="space-y-6 py-1">
            
            {/* Encabezado Ficha Etnográfica (Univalle Format) */}
            <div className="p-5 bg-verde-profundo/5 border border-verde-profundo/20 rounded-2xl space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-mono font-bold text-xs text-terracota bg-terracota/10 px-3 py-1 rounded-lg border border-terracota/20">
                  {selectedItem.code}
                </span>
                
                <div className="flex items-center space-x-2">
                  <Badge variant="verde">Digitalizado HD</Badge>
                  <span className="flex items-center space-x-1 text-xs font-mono bg-crema-dark px-2.5 py-1 rounded-full border border-crema-dark text-verde-profundo font-bold">
                    <Eye className="w-3.5 h-3.5 text-terracota" />
                    <span>{mainDoc.viewsCount} lecturas</span>
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-terracota uppercase tracking-widest block">
                  Monografía / Historia Etnográfica Andina
                </span>
                <h3 className="font-serif font-bold text-2xl text-verde-profundo leading-snug">
                  {mainDoc.title}
                </h3>
              </div>

              {/* Ficha de Crédito Rápido */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/80 p-3 rounded-xl border border-crema-dark space-y-0.5">
                  <span className="text-[10px] font-bold text-cafe/60 uppercase tracking-wider block">Autores/as</span>
                  <p className="text-xs font-bold text-verde-profundo">{mainDoc.author}</p>
                  <p className="text-[10px] text-cafe/70">{mainDoc.affiliation}</p>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-crema-dark space-y-0.5">
                  <span className="text-[10px] font-bold text-cafe/60 uppercase tracking-wider block">Traducción</span>
                  <p className="text-xs font-bold text-cafe">{mainDoc.translator}</p>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-crema-dark space-y-0.5">
                  <span className="text-[10px] font-bold text-cafe/60 uppercase tracking-wider block">Edición / Sello</span>
                  <p className="text-xs font-bold text-verde-profundo">{mainDoc.publisher}</p>
                  <p className="text-[10px] text-cafe/70">Año: {mainDoc.year}</p>
                </div>
              </div>
            </div>

            {/* Pestañas estilo Univalle (Sinopsis Etnográfica, Capítulos, Autores & Filiación, Ficha) */}
            <div className="border-b border-crema-dark flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              
              <button
                onClick={() => setActiveUnivalleTab('sinopsis')}
                className={`
                  px-4 py-2 rounded-t-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 border-b-2 cursor-pointer
                  ${activeUnivalleTab === 'sinopsis' 
                    ? 'border-terracota text-terracota bg-terracota/10 font-bold' 
                    : 'border-transparent text-cafe/70 hover:text-verde-profundo'
                  }
                `}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Sinopsis Etnográfica</span>
              </button>

              <button
                onClick={() => setActiveUnivalleTab('capitulos')}
                className={`
                  px-4 py-2 rounded-t-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 border-b-2 cursor-pointer
                  ${activeUnivalleTab === 'capitulos' 
                    ? 'border-terracota text-terracota bg-terracota/10 font-bold' 
                    : 'border-transparent text-cafe/70 hover:text-verde-profundo'
                  }
                `}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Capítulos (12)</span>
              </button>

              <button
                onClick={() => setActiveUnivalleTab('autores')}
                className={`
                  px-4 py-2 rounded-t-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 border-b-2 cursor-pointer
                  ${activeUnivalleTab === 'autores' 
                    ? 'border-terracota text-terracota bg-terracota/10 font-bold' 
                    : 'border-transparent text-cafe/70 hover:text-verde-profundo'
                  }
                `}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Autores & Filiación</span>
              </button>

              <button
                onClick={() => setActiveUnivalleTab('ficha')}
                className={`
                  px-4 py-2 rounded-t-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 border-b-2 cursor-pointer
                  ${activeUnivalleTab === 'ficha' 
                    ? 'border-terracota text-terracota bg-terracota/10 font-bold' 
                    : 'border-transparent text-cafe/70 hover:text-verde-profundo'
                  }
                `}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ficha de Catalogación</span>
              </button>

            </div>

            {/* CONTENIDO PESTAÑAS DETALLE UNIVALLE */}
            <div className="bg-crema-dark/30 rounded-2xl p-5 border border-crema-dark min-h-[220px]">
              
              {/* SINOPSIS COMPLETA SOLICITADA POR EL USUARIO */}
              {activeUnivalleTab === 'sinopsis' && (
                <div className="space-y-3 font-sans text-xs sm:text-sm text-cafe leading-relaxed">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-terracota border-b border-crema-dark pb-2 mb-3">
                    <FileText className="w-4 h-4" />
                    <span>Resumen del Estudio Etnográfico</span>
                  </div>
                  <div className="whitespace-pre-line bg-white p-4 rounded-xl border border-crema-dark/70 text-cafe space-y-3">
                    {mainDoc.synopsis}
                  </div>
                </div>
              )}

              {/* TABLA DE CAPÍTULOS */}
              {activeUnivalleTab === 'capitulos' && mainDoc.chapters && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-verde-profundo border-b border-crema-dark pb-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <ListOrdered className="w-4 h-4 text-terracota" />
                      <span>Estructura de Capítulos del Libro</span>
                    </div>
                    <span className="text-terracota font-mono">{mainDoc.chapters.length} secciones</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {mainDoc.chapters.map((ch) => (
                      <div 
                        key={ch.number}
                        className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-crema-dark/70 shadow-2xs"
                      >
                        <span className="w-6 h-6 rounded-md bg-verde-profundo text-crema font-bold font-mono text-[11px] flex items-center justify-center shrink-0">
                          {ch.number}
                        </span>
                        <span className="text-xs font-bold text-cafe truncate">
                          {ch.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AUTORES & FILIACIÓN */}
              {activeUnivalleTab === 'autores' && (
                <div className="space-y-3 text-xs bg-white p-4 rounded-xl border border-crema-dark">
                  <div>
                    <span className="font-bold text-verde-profundo block text-sm">Autora Principal:</span>
                    <p className="text-cafe font-bold text-xs">{mainDoc.author}</p>
                    <p className="text-cafe/70 font-mono text-[11px]">{mainDoc.affiliation}</p>
                  </div>
                  <div className="border-t border-crema-dark/60 pt-2">
                    <span className="font-bold text-verde-profundo block text-xs">Traducción Oficial:</span>
                    <p className="text-cafe font-medium">{mainDoc.translator}</p>
                  </div>
                  <div className="border-t border-crema-dark/60 pt-2">
                    <span className="font-bold text-verde-profundo block text-xs">Sello Editorial:</span>
                    <p className="text-cafe font-medium">{mainDoc.publisher}</p>
                  </div>
                </div>
              )}

              {/* FICHA DE CATALOGACIÓN */}
              {activeUnivalleTab === 'ficha' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium bg-white p-4 rounded-xl border border-crema-dark">
                  <div>
                    <span className="font-bold text-verde-profundo block mb-0.5">Ubicación en Servidor:</span>
                    <p className="text-cafe/80">{mainDoc.locationInArchive}</p>
                  </div>
                  <div>
                    <span className="font-bold text-verde-profundo block mb-0.5">Formato Digital:</span>
                    <p className="text-cafe/80">{mainDoc.format}</p>
                  </div>
                  <div>
                    <span className="font-bold text-verde-profundo block mb-0.5">Total Lecturas:</span>
                    <p className="text-verde-profundo font-bold font-mono">{mainDoc.viewsCount} lecturas acumuladas</p>
                  </div>
                  <div>
                    <span className="font-bold text-verde-profundo block mb-0.5">Estado:</span>
                    <p className="text-emerald-800 font-bold">Disponible para consulta y lectura en línea</p>
                  </div>
                </div>
              )}

            </div>

            {/* Botones de Acción */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-crema-dark">
              <Button variant="ghost" onClick={() => setSelectedItem(null)}>
                Volver a la Consulta
              </Button>

              <Button
                variant="terracota"
                size="md"
                onClick={handleReadPdf}
                leftIcon={<BookOpen size={18} />}
                rightIcon={<ExternalLink size={16} className="opacity-75" />}
                className="w-full sm:w-auto px-6 py-3 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg"
              >
                Leer Documento PDF
              </Button>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
}
