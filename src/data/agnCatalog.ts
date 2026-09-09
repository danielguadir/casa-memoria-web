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
}
export const agnCatalogData: AgnItem[] = [];
