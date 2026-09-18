export type AssetType = 'Físico' | 'Virtual' | 'Audiovisual' | 'Artefacto';

export interface AgnItem {
  id: string; // Internal unique ID, e.g. 'agn_001'
  code: string; // Public AGN Code, e.g. 'AGN-VIR-001'
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
    category: 'Etnografía e Historia Andina / Trabajo de Investigación',
    author: 'Joanne Rappaport (Georgetown University) - Ed. ICANH / Trad. MARKA',
    description: 'Investigación etnográfica sobre la memoria del cacique Cumbe, la reestructuración de la tradición ancestral y la militancia étnica del Pueblo de los Pastos en Cumbal.',
    location: 'Servidor Digital Casa de la Memoria / Fondo ICANH',
    status: 'Digitalizado HD',
    keywords: ['Cumbal', 'Pastos', 'Cacique Cumbe', 'ICANH', 'Etnografía', 'MARKA', 'Georgetown', 'Militancia Étnica'],
    formatDetails: 'Documento PDF Digitalizado (Texto Completo - 12 Capítulos)',
    pdfUrl: '/docs/cumbe-renaciente.pdf',
    driveUrl: 'https://drive.google.com/drive/folders/casa-memoria-cumbal',
    viewsCount: 348
  }
];
