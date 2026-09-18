export type AssetType = 'Físico' | 'Virtual' | 'Audiovisual' | 'Artefacto';

export interface AgnItem {
  id: string; // Internal unique ID, e.g. 'agn_001'
  code: string; // Public AGN Code, e.g. 'AGN-FIS-001'
  title: string;
  type: AssetType;
  year: number;
  category: string;
  description: string;
  location: string; // Physical location or digital server node
  status: 'Disponible Consulta' | 'Exposición Sala Principal' | 'Digitalizado HD' | 'Restauración / Reserva';
  author: string;
  keywords: string[];
  formatDetails: string;
  pdfUrl?: string;
  driveUrl?: string;
  viewsCount?: number;
}

export const agnCatalogData: AgnItem[] = [
  {
    id: 'agn_001',
    code: 'AGN-VIR-001',
    title: 'Cumbe renaciente. Una historia etnográfica andina',
    type: 'Virtual',
    year: 2005,
    category: 'Etnografía e Historia Andina',
    author: 'Joanne Rappaport (Georgetown University) - Ed. ICANH / Trad. MARKA',
    description: 'Investigación etnográfica sobre la memoria del cacique Cumbe, la reestructuración de la tradición ancestral y la militancia étnica del Pueblo de los Pastos en Cumbal.',
    location: 'Servidor Digital Casa de la Memoria / Fondo ICANH',
    status: 'Digitalizado HD',
    keywords: ['Cumbal', 'Pastos', 'Cacique Cumbe', 'ICANH', 'Etnografía', 'Militancia Étnica'],
    formatDetails: 'Documento PDF Digitalizado (Texto Completo - 12 Capítulos)',
    pdfUrl: '/docs/cumbe-renaciente.pdf',
    driveUrl: 'https://drive.google.com/drive/folders/casa-memoria-cumbal',
    viewsCount: 342
  },
  {
    id: 'agn_002',
    code: 'AGN-FIS-001',
    title: 'Título de Resguardo Colonial del Gran Cumbal (Copia Manuscrita S. XVIII)',
    type: 'Físico',
    year: 1758,
    category: 'Manuscritos e Históricos',
    author: 'Caciques Principales y Escribano Real',
    description: 'Documento pergamino con los linderos ancestrales del Resguardo Indígena de Cumbal, delimitando los páramos, ríos y sitios sagrados de la comunidad.',
    location: 'Bóveda de Reserva Histórica - Estante A1 (Fondo Archivo Colonial)',
    status: 'Restauración / Reserva',
    keywords: ['Resguardo', 'Titulación', 'Colonial', 'Pastos', 'Linderos'],
    formatDetails: 'Manuscrito original en tinta ferrogálica sobre papel sellado colonial',
    viewsCount: 189
  },
  {
    id: 'agn_003',
    code: 'AGN-AUD-001',
    title: 'Ecos del Gran Cumbal — Corto Documental y Testimonios Orales',
    type: 'Audiovisual',
    year: 2024,
    category: 'Memoria Sonora y Registros Vivos',
    author: 'Colectivo de Comunicación Casa de la Memoria & Cabildo de Cumbal',
    description: 'Registro audiovisual de relatos de los sabedores y taitas de Cumbal sobre los senderos de memoria, el tejido comunitario y el territorio sagrado.',
    location: 'Repositorio Audiovisual - Servidor Multimedia CMGC',
    status: 'Disponible Consulta',
    keywords: ['Documental', 'Cumbal', 'Taitas', 'Relatos Orales', 'Humboldt'],
    formatDetails: 'Video 4K Master H.264 / Duración 18 min / Facebook Video Master',
    viewsCount: 512
  },
  {
    id: 'agn_004',
    code: 'AGN-ART-001',
    title: 'Bastón de Mando Tradicional de Autoridad Indígena Pasto',
    type: 'Artefacto',
    year: 1942,
    category: 'Objetos Rituales y Simbolismo Ancestral',
    author: 'Talladores y Maestros Artesanos de Cumbal',
    description: 'Bastón ceremonial tallado en madera sagrada con chonta y aro de plata, insignia de mando y dignidad del Gobernador del Cabildo Indígena.',
    location: 'Exposición Sala Principal - Vitrina Cultural 03',
    status: 'Exposición Sala Principal',
    keywords: ['Bastón de Mando', 'Cabildo', 'Autoridad Ancestral', 'Chonta', 'Cumbal'],
    formatDetails: 'Madera de chonta, incrustaciones en plata tallada y cinta ceremonial',
    viewsCount: 275
  }
];
