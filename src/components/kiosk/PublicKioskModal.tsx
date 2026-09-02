'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Monitor, FileText, Laptop, Mic, 
  MapPin, Calendar, Tag, Info, X, ChevronRight, CheckCircle2,
  Sparkles, Layers, BookOpen, Compass
} from 'lucide-react';
import { Modal, Button, Badge, Card, Dropdown } from '@/components/design-system';
import { agnCatalogData, AgnItem, AssetType } from '@/data/agnCatalog';

export interface PublicKioskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export const PublicKioskModal: React.FC<PublicKioskModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<AssetType | 'Todos'>('Todos');
  const [selectedYearRange, setSelectedYearRange] = useState('all');
  const [selectedItem, setSelectedItem] = useState<AgnItem | null>(null);
  const [itemsToShow, setItemsToShow] = useState(12);

  // Compute counts per type
  const typeCounts = useMemo(() => {
    return {
      Todos: agnCatalogData.length,
      Físico: agnCatalogData.filter((i) => i.type === 'Físico').length,
      Virtual: agnCatalogData.filter((i) => i.type === 'Virtual').length,
      Audiovisual: agnCatalogData.filter((i) => i.type === 'Audiovisual').length,
      Artefacto: agnCatalogData.filter((i) => i.type === 'Artefacto').length,
    };
  }, []);

  // Check if user has entered a search query or selected a filter
  const isSearchActive = useMemo(() => {
    return searchQuery.trim().length > 0 || selectedType !== 'Todos' || selectedYearRange !== 'all';
  }, [searchQuery, selectedType, selectedYearRange]);

  // Filter dataset: Return empty array when no search/filter is active
  const filteredCatalog = useMemo(() => {
    if (!isSearchActive) return [];

    return agnCatalogData.filter((item) => {
      // Type match
      const matchesType = selectedType === 'Todos' || item.type === selectedType;

      // Year range match
      let matchesYear = true;
      if (selectedYearRange === 'colonial') matchesYear = item.year < 1800;
      else if (selectedYearRange === '1800-1950') matchesYear = item.year >= 1800 && item.year <= 1950;
      else if (selectedYearRange === '1951-2000') matchesYear = item.year >= 1951 && item.year <= 2000;
      else if (selectedYearRange === '2001-2026') matchesYear = item.year >= 2001;

      // Search match (by Code, Title, Author, Description, or Keywords)
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
  }, [searchQuery, selectedType, selectedYearRange, isSearchActive]);

  const visibleItems = filteredCatalog.slice(0, itemsToShow);

  const handleSelectKeyword = (kw: string) => {
    setSearchQuery(kw);
    if (selectedItem) setSelectedItem(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      title={
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-mostaza/20 border border-mostaza/40 flex items-center justify-center text-mostaza">
            <Monitor className="w-6 h-6 text-mostaza" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-crema tracking-wide">
              Consulta Pública - Casa de la Memoria Cumbal
            </h2>
            <p className="text-xs text-crema/70">
              Consulta por nombre, ID o palabra clave
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">

        {/* Search Bar & Primary Filters */}
        <div className="bg-crema-dark/50 p-4 sm:p-6 rounded-2xl border border-crema-dark space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative w-full flex-grow">
              <input
                type="text"
                placeholder="Buscar por ID (ej: AGN-ART-039), palabra clave, título o autor..."
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

            {/* Year Dropdown Filter */}
            <div className="w-full md:w-auto shrink-0">
              <Dropdown
                options={yearRangeOptions}
                selectedValue={selectedYearRange}
                onSelect={(val) => setSelectedYearRange(val)}
                className="w-full"
              />
            </div>
          </div>

          {/* Asset Type Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {(['Todos', 'Físico', 'Virtual', 'Audiovisual', 'Artefacto'] as const).map((type) => {
              const isActive = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setItemsToShow(12);
                  }}
                  className={`
                    px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 
                    flex items-center space-x-2 shrink-0 border shadow-2xs
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
        </div>

        {/* Quick Stats Banner */}
        <div className="flex items-center justify-between text-xs text-cafe/70 px-1 font-medium">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-mostaza shrink-0" />
            <span>
              {isSearchActive ? (
                <>Mostrando <strong className="text-verde-profundo">{filteredCatalog.length}</strong> registros encontrados.</>
              ) : (
                <>Ingrese un código ID, nombre o palabra clave para consultar el catálogo de {agnCatalogData.length} bienes.</>
              )}
            </span>
          </div>
          {isSearchActive && (
            <button 
              onClick={() => { setSearchQuery(''); setSelectedType('Todos'); setSelectedYearRange('all'); }}
              className="text-terracota font-bold hover:underline"
            >
              Limpiar consulta
            </button>
          )}
        </div>

        {/* Catalog Grid / Initial Empty Prompt */}
        {!isSearchActive ? (
          <div className="p-12 sm:p-16 text-center bg-white/80 rounded-3xl border-2 border-dashed border-crema-dark space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-mostaza/15 rounded-2xl flex items-center justify-center mx-auto text-terracota border border-mostaza/30">
              <Search className="w-8 h-8 text-terracota" />
            </div>
            <div className="space-y-1 max-w-lg mx-auto">
              <h3 className="font-serif font-bold text-xl text-verde-profundo">
                Consulta Pública de Archivos & Artefactos
              </h3>
              <p className="text-xs sm:text-sm text-cafe/70 leading-relaxed">
                Escriba un código ID (ej. <code className="bg-crema-dark px-1.5 py-0.5 rounded font-mono font-bold text-terracota">AGN-ART-039</code>), un nombre de documento o una palabra clave en la barra superior para explorar.
              </p>
            </div>

            {/* Suggested Searches Chips */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-cafe/60 uppercase tracking-wider mb-2">Búsquedas sugeridas:</p>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
                {['AGN-ART-039', 'AGN-FIS-001', 'Territorio', 'Cacique Juan Chiles', 'Sol de los Pastos', 'Fototeca Histórica', 'Inti Raymi'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setSearchQuery(chip)}
                    className="px-3 py-1.5 bg-crema hover:bg-terracota hover:text-crema text-cafe border border-crema-dark text-xs font-medium rounded-xl transition-all shadow-xs"
                  >
                    🔍 {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : filteredCatalog.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-crema-dark space-y-3">
            <Info className="w-10 h-10 text-terracota/60 mx-auto" />
            <p className="font-bold text-base text-verde-profundo">No se encontraron archivos con ese criterio.</p>
            <p className="text-xs text-cafe/60 max-w-md mx-auto">
              Prueba buscando por palabras clave como <em>&quot;cumbal&quot;</em>, <em>&quot;virrey&quot;</em>, <em>&quot;bastón&quot;</em>, <em>&quot;audio&quot;</em> o limpie los filtros.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setSelectedType('Todos'); setSelectedYearRange('all'); }}>
              Restablecer Filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleItems.map((item) => (
              <Card
                key={item.id}
                variant="default"
                hoverEffect
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer border-crema-dark/80 flex flex-col justify-between group"
              >
                <div className="p-5 space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-terracota bg-terracota/10 px-2 py-0.5 rounded-lg border border-terracota/20">
                      {item.code}
                    </span>
                    <Badge variant={item.type === 'Virtual' ? 'blue' : item.type === 'Artefacto' ? 'mostaza' : 'verde'}>
                      {item.type}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-serif font-bold text-base text-verde-profundo group-hover:text-terracota transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-cafe/70 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Location & Year info */}
                  <div className="pt-2 border-t border-crema-dark/40 space-y-1 text-xs text-cafe/80">
                    <div className="flex items-center space-x-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-terracota shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-cafe/60">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-verde-profundo" />
                        <span>Año: <strong>{item.year}</strong></span>
                      </span>
                      <span className="font-semibold text-verde-profundo">{item.category}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 py-3 bg-crema-dark/30 border-t border-crema-dark/40 flex items-center justify-between text-xs text-verde-profundo font-bold">
                  <span>Consultar Detalles</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-terracota" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleItems.length < filteredCatalog.length && (
          <div className="text-center pt-4">
            <Button
              variant="outline"
              onClick={() => setItemsToShow((prev) => prev + 12)}
              leftIcon={<Layers className="w-4 h-4" />}
            >
              Cargar más registros ({filteredCatalog.length - visibleItems.length} restantes)
            </Button>
          </div>
        )}

      </div>

      {/* ITEM DETAIL INSPECT MODAL */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-mostaza" />
              <span>Ficha Técnica del Registro: {selectedItem.code}</span>
            </div>
          }
          subtitle={`Ubicación y consulta en Casa de la Memoria (${selectedItem.type})`}
          size="lg"
        >
          <div className="space-y-5">
            {/* Header info */}
            <div className="p-4 bg-verde-profundo/5 border border-verde-profundo/20 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-terracota bg-terracota/10 px-2.5 py-1 rounded-lg">
                  {selectedItem.code}
                </span>
                <Badge variant="verde">{selectedItem.status}</Badge>
              </div>
              <h3 className="text-xl font-bold font-serif text-verde-profundo">
                {selectedItem.title}
              </h3>
              <p className="text-xs text-cafe/70">
                Autor/Origen: <strong>{selectedItem.author}</strong> ({selectedItem.year})
              </p>
            </div>

            {/* Location highlight box */}
            <div className="p-4 bg-mostaza/15 border border-mostaza/40 rounded-xl space-y-1">
              <div className="flex items-center space-x-2 text-verde-profundo font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-terracota shrink-0" />
                <span>Ubicación Física / Digital en Casa de la Memoria:</span>
              </div>
              <p className="text-sm font-semibold text-cafe pl-6">
                {selectedItem.location}
              </p>
              <p className="text-[11px] text-cafe/70 pl-6">
                Detalle del formato: {selectedItem.formatDetails}
              </p>
            </div>

            {/* Full description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-cafe uppercase tracking-wider">Resumen Histórico & Valor Patrimonial:</h4>
              <p className="text-sm text-cafe/90 leading-relaxed bg-white p-4 rounded-xl border border-crema-dark">
                {selectedItem.description}
              </p>
            </div>

            {/* Keywords */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-cafe uppercase tracking-wider">Palabras Clave Asociadas:</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedItem.keywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => handleSelectKeyword(kw)}
                    className="
                      px-2.5 py-1 bg-crema-dark hover:bg-terracota hover:text-crema 
                      text-cafe text-xs font-medium rounded-lg transition-colors flex items-center space-x-1
                    "
                  >
                    <Tag className="w-3 h-3 text-terracota opacity-70" />
                    <span>#{kw}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer action button */}
            <div className="pt-4 flex justify-end space-x-3 border-t border-crema-dark">
              <Button variant="ghost" onClick={() => setSelectedItem(null)}>
                Volver al Catálogo
              </Button>
              <Button 
                variant="terracota"
                onClick={() => {
                  alert(`Petición de ficha ${selectedItem.code} enviada al módulo de consulta.`);
                  setSelectedItem(null);
                }}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Solicitar Ficha de Consulta
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
};
