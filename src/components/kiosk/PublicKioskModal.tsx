'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Monitor, FileText, Laptop, Mic, 
  MapPin, Calendar, Tag, Info, X, ChevronRight, CheckCircle2,
  Sparkles, Layers, BookOpen, Compass, ExternalLink, Eye, User
} from 'lucide-react';
import { Modal, Button, Badge, Card, Dropdown } from '@/components/design-system';
import { agnCatalogData, AgnItem, AssetType } from '@/data/agnCatalog';

export interface PublicKioskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: AssetType | 'Todos';
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

export const PublicKioskModal: React.FC<PublicKioskModalProps> = ({ 
  isOpen, 
  onClose,
  initialType = 'Todos'
}) => {
  const [catalogItems, setCatalogItems] = useState<AgnItem[]>(agnCatalogData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<AssetType | 'Todos'>(initialType);
  const [selectedYearRange, setSelectedYearRange] = useState('all');
  const [selectedItem, setSelectedItem] = useState<AgnItem | null>(null);
  const [itemsToShow, setItemsToShow] = useState(12);

  // Sync initial type if provided
  React.useEffect(() => {
    if (initialType) setSelectedType(initialType);
  }, [initialType]);

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

  // Filter dataset dynamically for active tab and search query
  const filteredCatalog = useMemo(() => {
    return catalogItems.filter((item) => {
      // Type match
      const matchesType = selectedType === 'Todos' || item.type === selectedType;

      // Year range match
      let matchesYear = true;
      if (selectedYearRange === 'colonial') matchesYear = item.year < 1800;
      else if (selectedYearRange === '1800-1950') matchesYear = item.year >= 1800 && item.year <= 1950;
      else if (selectedYearRange === '1951-2000') matchesYear = item.year >= 1951 && item.year <= 2000;
      else if (selectedYearRange === '2001-2026') matchesYear = item.year >= 2001;

      // Search match
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

  const visibleItems = filteredCatalog.slice(0, itemsToShow);

  const handleInspectItem = (item: AgnItem) => {
    // Increment view counter
    setCatalogItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, viewsCount: (i.viewsCount || 0) + 1 } : i))
    );
    setSelectedItem(item);
  };

  const handleOpenPdf = (item: AgnItem) => {
    setCatalogItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, viewsCount: (i.viewsCount || 0) + 1 } : i))
    );
    if (item.pdfUrl) {
      window.open(item.pdfUrl, '_blank');
    } else if (item.driveUrl) {
      window.open(item.driveUrl, '_blank');
    } else {
      alert(`Consultando documento ${item.code} en servidor de Casa de la Memoria.`);
    }
  };

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

        {/* Search Bar & Dynamic Asset Type Tabs */}
        <div className="bg-crema-dark/50 p-4 sm:p-6 rounded-2xl border border-crema-dark space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-3">
            
            {/* Search Input */}
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

          {/* Dynamic Tabs: Todos, Físico, Virtual, Audiovisual, Artefacto */}
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
        </div>

        {/* Quick Stats Banner */}
        <div className="flex items-center justify-between text-xs text-cafe/70 px-1 font-medium">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-mostaza shrink-0" />
            <span>
              Mostrando <strong className="text-verde-profundo font-bold">{filteredCatalog.length}</strong> registros en categoría <strong>&quot;{selectedType}&quot;</strong>.
            </span>
          </div>
          {(searchQuery || selectedType !== 'Todos' || selectedYearRange !== 'all') && (
            <button 
              onClick={() => { setSearchQuery(''); setSelectedType('Todos'); setSelectedYearRange('all'); }}
              className="text-terracota font-bold hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Catalog Grid */}
        {filteredCatalog.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-crema-dark space-y-3 shadow-sm">
            <Info className="w-10 h-10 text-terracota/60 mx-auto" />
            <p className="font-bold text-base text-verde-profundo">No se encontraron registros en esta categoría.</p>
            <p className="text-xs text-cafe/60 max-w-md mx-auto">
              Prueba buscando por palabras clave como <em>&quot;Cumbal&quot;</em>, <em>&quot;Rappaport&quot;</em>, <em>&quot;Bastón&quot;</em> o restablezca los filtros.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setSelectedType('Todos'); setSelectedYearRange('all'); }}>
              Ver Todos los Registros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleItems.map((item) => (
              <Card
                key={item.id}
                variant="default"
                hoverEffect
                onClick={() => handleInspectItem(item)}
                className="cursor-pointer border-crema-dark/80 flex flex-col justify-between group bg-white/95 rounded-2xl overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  {/* Top Badges & Eye Counter */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-terracota bg-terracota/10 px-2.5 py-0.5 rounded-lg border border-terracota/20">
                        {item.code}
                      </span>
                      <Badge variant={item.type === 'Virtual' ? 'blue' : item.type === 'Artefacto' ? 'mostaza' : 'verde'}>
                        {item.type}
                      </Badge>
                    </div>

                    {/* Eye Counter */}
                    <div className="flex items-center space-x-1.5 text-xs text-cafe/70 font-mono bg-crema-dark/50 px-2 py-0.5 rounded-full border border-crema-dark">
                      <Eye className="w-3.5 h-3.5 text-terracota" />
                      <span>{item.viewsCount || 0}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-serif font-bold text-lg text-verde-profundo group-hover:text-terracota transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-cafe/75 mt-1.5 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Location & Year info */}
                  <div className="pt-3 border-t border-crema-dark/40 space-y-1.5 text-xs text-cafe/80">
                    <div className="flex items-center space-x-1.5 truncate">
                      <User className="w-3.5 h-3.5 text-terracota shrink-0" />
                      <span className="truncate font-semibold text-verde-profundo">{item.author}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-cafe/60">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-verde-profundo" />
                        <span>Año: <strong>{item.year}</strong></span>
                      </span>
                      <span className="font-semibold text-terracota truncate max-w-[140px]">{item.category}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 py-3 bg-crema-dark/40 border-t border-crema-dark/40 flex items-center justify-between text-xs text-verde-profundo font-bold group-hover:bg-verde-profundo group-hover:text-crema transition-colors">
                  <span>Consultar Ficha Técnica</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-terracota group-hover:text-mostaza" />
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
              <span>Ficha Técnica: {selectedItem.code}</span>
            </div>
          }
          subtitle={`Consulta Pública de Registro en Casa de la Memoria (${selectedItem.type})`}
          size="lg"
        >
          <div className="space-y-5">
            {/* Header info */}
            <div className="p-4 bg-verde-profundo/5 border border-verde-profundo/20 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-terracota bg-terracota/10 px-2.5 py-1 rounded-lg">
                  {selectedItem.code}
                </span>
                <div className="flex items-center space-x-2">
                  <Badge variant="verde">{selectedItem.status}</Badge>
                  <span className="flex items-center space-x-1 text-xs font-mono bg-crema-dark/60 px-2 py-0.5 rounded-full border border-crema-dark text-verde-profundo">
                    <Eye className="w-3.5 h-3.5 text-terracota" />
                    <span>{selectedItem.viewsCount || 0} lecturas</span>
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold font-serif text-verde-profundo">
                {selectedItem.title}
              </h3>
              <p className="text-xs text-cafe/80">
                Autor / Origen: <strong className="text-verde-profundo">{selectedItem.author}</strong> ({selectedItem.year})
              </p>
            </div>

            {/* Location highlight box */}
            <div className="p-4 bg-mostaza/15 border border-mostaza/40 rounded-xl space-y-1">
              <div className="flex items-center space-x-2 text-verde-profundo font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-terracota shrink-0" />
                <span>Ubicación en Casa de la Memoria:</span>
              </div>
              <p className="text-sm font-semibold text-cafe pl-6">
                {selectedItem.location}
              </p>
              <p className="text-[11px] text-cafe/70 pl-6">
                Formato: {selectedItem.formatDetails}
              </p>
            </div>

            {/* Full description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-cafe uppercase tracking-wider">Resumen & Valor Patrimonial:</h4>
              <p className="text-sm text-cafe/90 leading-relaxed bg-white p-4 rounded-xl border border-crema-dark font-sans">
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

            {/* Actions: Download / View PDF or Close */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-crema-dark">
              <Button variant="ghost" onClick={() => setSelectedItem(null)}>
                Volver al Catálogo
              </Button>
              
              {selectedItem.type === 'Virtual' ? (
                <Button 
                  variant="terracota"
                  onClick={() => handleOpenPdf(selectedItem)}
                  leftIcon={<ExternalLink className="w-4 h-4" />}
                >
                  Consultar / Leer Documento
                </Button>
              ) : (
                <Button 
                  variant="terracota"
                  onClick={() => {
                    alert(`Ficha de consulta física ${selectedItem.code} enviada al módulo de atención.`);
                    setSelectedItem(null);
                  }}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Solicitar Ficha de Consulta
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
};
