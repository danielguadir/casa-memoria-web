export interface DigitalDocument {
  id: string;
  code: string;
  title: string;
  author: string;
  publisher: string;
  year?: number;
  category: string;
  format: string;
  viewsCount: number;
  description: string;
  synopsis?: string;
  fileAvailable: boolean;
  coverImage?: string;
  tags?: string[];
  locationInArchive?: string;
}

export const digitalArchiveData: DigitalDocument[] = [
  {
    id: 'dig_001',
    code: 'AGN-DIG-001',
    title: 'CUMBE RENACIENTE. Una historia Etnográfica Andina',
    author: 'Rappaport',
    publisher: 'Instituto Colombiano de Antropología e Historia ICANH',
    year: 2005,
    category: 'Etnografía e Historia Andina',
    format: 'Documento Digital PDF',
    viewsCount: 342,
    description: 'Investigación etnográfica y socio-histórica sobre los procesos de identidad, memoria territorial y resistencia indígena en los Andes. Registrado en el Fondo de Archivos Digitales de la Casa de la Memoria del Gran Cumbal.',
    synopsis: undefined, // Por ahora sin sinopsis según requerimiento
    fileAvailable: false, // El libro no se ha adjuntado aún
    tags: ['Pastos', 'Cumbal', 'Etnografía', 'ICANH', 'Memoria Ancestral'],
    locationInArchive: 'Sección Archivos Digitales / Serie Monografías e Historias Etnográficas'
  }
];
