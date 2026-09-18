export interface Chapter {
  number: number | string;
  title: string;
}

export interface DigitalDocument {
  id: string;
  code: string;
  title: string;
  author: string;
  affiliation?: string;
  translator?: string;
  publisher: string;
  year?: number;
  category: string;
  format: string;
  viewsCount: number;
  description: string;
  synopsis?: string;
  chapters?: Chapter[];
  fileAvailable: boolean;
  pdfUrl?: string;
  driveUrl?: string;
  coverImage?: string;
  tags?: string[];
  locationInArchive?: string;
}

export const digitalArchiveData: DigitalDocument[] = [
  {
    id: 'dig_001',
    code: 'AGN-DIG-001',
    title: 'Cumbe renaciente. Una historia etnográfica andina',
    author: 'Joanne Rappaport',
    affiliation: 'Georgetown University',
    translator: 'MARKA, Instituto de Historia y Antropología Andinas, Quito',
    publisher: 'Instituto Colombiano de Antropología e Historia ICANH',
    year: 2005,
    category: 'Etnografía e Historia Andina / Trabajo de Investigación',
    format: 'Documento Digital PDF (Texto Completo - 12 Capítulos)',
    viewsCount: 342,
    description: 'De acuerdo con la ley en la época de la invasión española el cacique Cumbe gobernaba sobre la comunidad de Cumbal. En este libro, Joanne Rappaport examina cómo los cumbales se apropian de la historia e inventan de nuevo la tradición.',
    synopsis: `De acuerdo con la ley en la época de la invasión española el cacique Cumbe gobernaba sobre la comunidad de Cumbal. Aun cuando no existen documentos que comprueben su existencia, en la actualidad los habitantes de Cumbal lo consideran el vínculo ancestral con sus antepasados pastos. Su imagen reaparece con frecuencia en la música y el teatro popular, en la organización comunitaria y en el combate político de los cumbales cuando intentan darle nuevo vigor a su herencia indígena y recuperar las tierras que dicha herencia define como suyas.

En este libro, Joanne Rappaport examina cómo los cumbales se apropian de la historia e inventan de nuevo la tradición, y explora la forma en que las memorias personales se interpretan mediante las expresiones no verbales, tales como la cultura material y ritual, así como en las comunicaciones orales y escritas. Esta aproximación novedosa a la conciencia histórica se basa en la combinación del análisis histórico y etnográfico. En este sentido, Cumbe renaciente es una contribución importante para comprender mejor la militancia étnica en las Américas y en términos de las discusiones metodológicas más amplias sobre el estudio de la conciencia histórica no-occidental bajo la dominación colonial.

Los argumentos aquí desarrollados serán de interés para antropólogos, historiadores, especialistas en estudios latinoamericanos y especialistas en folklore interesados en los discursos subalternos.`,
    chapters: [
      { number: 1, title: 'Introducción' },
      { number: 2, title: 'UNO. La ley y la identidad indígena' },
      { number: 3, title: 'DOS. El camino de los tres bastones de mando' },
      { number: 4, title: 'TRES. Los que hacen la historia' },
      { number: 5, title: 'CUATRO. Historia y vida cotidiana' },
      { number: 6, title: 'CINCO. Escribiendo la historia' },
      { number: 7, title: 'SEIS. Toretes y bramaderos' },
      { number: 8, title: 'SIETE. El arte de la militancia étnica' },
      { number: 9, title: 'Fotografías' },
      { number: 10, title: 'Conclusiones' },
      { number: 11, title: 'Lista de entrevistados' },
      { number: 12, title: 'Bibliografía' }
    ],
    fileAvailable: true,
    pdfUrl: '/docs/cumbe-renaciente.pdf',
    driveUrl: 'https://drive.google.com/file/d/1cumbe-renaciente-demo/view',
    tags: ['Pastos', 'Cumbal', 'Cacique Cumbe', 'ICANH', 'Etnografía', 'MARKA', 'Militancia Étnica', 'Georgetown'],
    locationInArchive: 'Sección Archivos Digitales / Serie Monografías e Historias Etnográficas (Nodo CMGC)'
  }
];
