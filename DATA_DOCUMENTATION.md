# 📊 Guía de Gestión de Datos - Casa de la Memoria Cumbal

Esta documentación explica cómo están organizados los datos de la aplicación web, dónde se ubican los archivos de catálogo y cómo agregar, editar o eliminar registros de forma mantenible y escalable.

---

## 📂 1. Ubicación de los Datos

Toda la información y catálogos de la plataforma se encuentran centralizados en el directorio:
👉 `src/data/`

| Archivo | Sección que Alimenta | Descripción |
| :--- | :--- | :--- |
| `bepimpCatalog.ts` | **Biblioteca Especializada** | Catálogo del Fondo Bibliográfico BEPIMP (30 títulos, 83 ejemplares físicos registrados). |
| `digitalArchiveCatalog.ts` | **Archivos Digitales** | Colecciones digitales, libros completos en PDF, capítulos y enlaces de Google Drive. |
| `agnCatalog.ts` | **Archivo General / Kiosco** | Registros patrimoniales, artefactos y archivos históricos de consulta pública. |
| `socialLinks.tsx` | **Navbar & Footer** | Configuración centralizada de redes sociales (YouTube, Instagram, Facebook, WhatsApp, TikTok). |

---

## 📚 2. Estructura del Catálogo BEPIMP (`src/data/bepimpCatalog.ts`)

Los datos están definidos mediante una interfaz TypeScript (`BepimpItem`) que garantiza la integridad de los registros.

### Esquema del Objeto `BepimpItem`:

```typescript
export interface BepimpItem {
  id: string;                 // Identificador único interno (ej: 'bepimp_031')
  code: string;               // Código físico de inventario (ej: 'BEPIMP00031')
  title: string;              // Título del libro o documento
  author: string;             // Autor o institución emisora
  year: number;               // Año de edición
  publisher: string;          // Editorial
  pages?: number;             // Número de páginas (opcional)
  isbn?: string;              // ISBN (opcional)
  entryDate: string;          // Fecha de ingreso (YYYY-MM-DD)
  collection: string;         // Nombre de la colección patrimonial
  keywords: string[];         // Palabras clave asociadas
  category: string;           // Categoría principal (ej: 'HISTORIA', 'MEMORIA', etc.)
  coverType: 'Pasta dura' | 'Pasta blanda';
  copies: number;             // Ejemplares registrados
  acquisitionType: 'Compra' | 'Donación';
  donorName?: string;         // Nombre del donante (opcional)
  physicalCondition: 'Bueno' | 'Regular' | 'Malo';
  observations?: string;      // Observaciones de conservación
}
```

---

## ➕ 3. Cómo Agregar un Nuevo Libro al Catálogo BEPIMP

Para agregar un nuevo registro al catálogo de la **Biblioteca Especializada**:

1. Abre el archivo `src/data/bepimpCatalog.ts`.
2. Busca el arreglo `bepimpCatalogData`.
3. Añade un nuevo objeto al final del arreglo siguiendo este formato:

```typescript
{
  id: 'bepimp_031',
  code: 'BEPIMP00031',
  title: 'Título de la Nueva Investigación Ancestral',
  author: 'Nombre del Autor',
  year: 2026,
  publisher: 'Editorial Cumbal',
  pages: 150,
  isbn: '978-958-0000-00-0',
  entryDate: '2026-10-01',
  collection: 'HISTORIA CUMBALEÑA',
  keywords: ['CUMBAL', 'MEMORIA', 'PASTOS'],
  category: 'HISTORIA',
  coverType: 'Pasta blanda',
  copies: 1,
  acquisitionType: 'Donación',
  donorName: 'Comunidad de Cumbal',
  physicalCondition: 'Bueno'
}
```

> 💡 **Cálculo Automático de Categorías:**  
> No necesitas modificar el menú lateral de la interfaz. La aplicación usa la función helper `getAllBepimpCategories()`, la cual escanea el campo `category` de cada item y **crea la categoría y calcula la cantidad de libros automáticamente** en el menú izquierdo.

---

## 📄 4. Gestión de Archivos Digitales (`src/data/digitalArchiveCatalog.ts`)

Para documentos con lectura en PDF o visores interactivos:

```typescript
{
  id: 'dig_002',
  code: 'AGN-DIG-002',
  title: 'Nombre del Documento Digital',
  author: 'Nombre del Autor',
  publisher: 'ICANH / Casa de la Memoria',
  year: 2024,
  category: 'Archivos Digitales',
  format: 'Documento Digital PDF',
  viewsCount: 120,
  description: 'Resumen descriptivo del contenido...',
  fileAvailable: true,
  pdfUrl: '/docs/mi-documento.pdf', // Ubicado en public/docs/
  driveUrl: 'https://drive.google.com/file/d/.../view',
  tags: ['Pastos', 'Cumbal', 'Memoria']
}
```

---

## 🌐 5. Configuración de Redes Sociales (`src/data/socialLinks.tsx`)

Para actualizar o cambiar los enlaces de redes sociales:

```typescript
{
  id: 'youtube',
  name: 'YouTube',
  href: 'https://www.youtube.com/@CASADELAMEMORIAGRANCUMBAL',
  ariaLabel: 'Visitar canal de YouTube',
  brandBg: '#FF0000',                            // Color de fondo en hover
  brandShadow: 'rgba(255, 0, 0, 0.5)',           // Resplandor en hover
  icon: ( ... )                                  // Icono SVG
}
```

---

## 🔧 6. Migración Futura a Base de Datos (Backend Scalability)

Actualmente, los catálogos se almacenan en archivos estructurados TypeScript (`.ts`) para lograr una velocidad de carga instantánea, costo de servidor $0 en Vercel y máximo rendimiento SEO.

Si en el futuro deseas conectar una **Base de Datos SQL (ej: PostgreSQL con Prisma ORM)** o un **CMS Administrable**, la estructura de tipos ya está lista en `src/types/` y `src/data/` para convertirse directamente en tablas de base de datos sin alterar los componentes visuales de la interfaz.
