# Recomendación de Base de Datos — Casa de la Memoria del Gran Cumbal (CMGC)

## 🎯 Resumen Ejecutivo

Para la **Casa de la Memoria del Gran Cumbal**, se recomienda oficialmente implementar **Supabase (PostgreSQL + Supabase Storage)** administrado con **Prisma ORM**. 

Esta solución proporciona una arquitectura **altamente escalable, mantenible y de costo optimizado (Zero-Cost Tier para ONGs/Comunidades)**, ideal para la preservación de archivos digitales, libros etnográficos (como *Cumbe Renaciente* de Rappaport / ICANH), registros audiovisuales y el seguimiento interactivo de consultas por parte de los usuarios.

---

## 🏛️ ¿Por qué Supabase (PostgreSQL) es la opción ideal?

| Criterio | Supabase / PostgreSQL | MongoDB / NoSQL | Firebase Realtime DB |
| :--- | :--- | :--- | :--- |
| **Metadatos Etnográficos y Estándar AGN** | 🟢 **Excelente** (Esquemas relacionales strictly tipados para Dublin Core / AGN) | 🟡 Moderado (Sin esquema rígido) | 🔴 Débil (Estructura de árbol compleja) |
| **Búsqueda en Español y Lenguas Ancestrales** | 🟢 **Nativo** (`Full-Text Search` con stemming en español) | 🟡 Requiere servicio externo (Atlas Search) | 🔴 No disponible nativamente |
| **Almacenamiento de Libros y Archivos (PDFs/Videos)** | 🟢 **Integrado** (Supabase Storage con S3 API y CDN) | 🔴 Requiere AWS S3 separado | 🟡 Firebase Storage (Limitado en tier gratuito) |
| **Contador Atómico de Vistas (Ojito de lecturas)** | 🟢 **Función RPC Atómica** (`increment_views`) | 🟡 `findOneAndUpdate` con lock | 🔴 Competencia de escritura |
| **Seguridad de Datos y Roles (RLS)** | 🟢 **Row Level Security** (Políticas de lectura pública y edición para Archivistas) | 🟡 Reglas personalizadas | 🟡 Reglas JSON |

---

## 📐 Modelo de Esquema Recomendado (Prisma / SQL)

El siguiente modelo en Prisma ORM garantiza que agregar futuros libros o documentos sea tan sencillo como insertar una fila en la tabla `digital_documents`.

```prisma
// schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum DocumentCategory {
  ETNOGRAFIA_HISTORIA
  MEMORIA_COMMUNITARIA
  TEJIDO_AUDIOVISUAL
  ARCHIVOS_ANCESTRALES
}

enum DocumentFormat {
  PDF_DIGITAL
  AUDIO_MP3
  VIDEO_MP4
  MANUSCRITO_ESCANEO
}

model DigitalDocument {
  id                String           @id @default(cuid())
  code              String           @unique // Ej: "AGN-DIG-001"
  title             String
  author            String           // Ej: "Joanne Rappaport"
  publisher         String           // Ej: "Instituto Colombiano de Antropología e Historia ICANH"
  year              Int?             // Ej: 2005
  category          DocumentCategory @default(ETNOGRAFIA_HISTORIA)
  format            DocumentFormat   @default(PDF_DIGITAL)
  description       String           @db.Text
  synopsis          String?          @db.Text // Nullable por ahora
  fileAvailable     Boolean          @default(false)
  fileUrl           String?          // URL en Supabase Storage
  coverUrl          String?          // Imagen de portada
  viewsCount        Int              @default(0) // Contador para el ojito
  locationInArchive String?
  tags              String[]
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt

  @@index([category])
  @@index([author])
  @@map("digital_documents")
}
```

---

## ⚡ Contador Atómico de Vistas (Ojito de Lecturas)

Para incrementar el número de personas que han mirado cada libro (*ojito*) sin sufrir problemas de concurrencia cuando varios usuarios ingresan al tiempo, se recomienda crear la siguiente función RPC en PostgreSQL:

```sql
-- Función de incremento de vistas atómico
CREATE OR REPLACE FUNCTION increment_document_views(doc_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE digital_documents
  SET views_count = views_count + 1
  WHERE id = doc_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

Desde el cliente de Next.js / API Route:
```ts
// src/services/digitalArchiveService.ts
export async function trackDocumentView(documentId: string) {
  const { data, error } = await supabase.rpc('increment_document_views', { doc_id: documentId });
  if (error) console.error('Error incrementando vistas:', error);
  return data;
}
```

---

## 📁 Almacenamiento de Archivos Digitales (Bucket Configuration)

1. **Bucket `archivos-digitales-cmgc`**:
   - Acceso: Lectura pública previa verificación / Descarga restringida según políticas del Cabildo.
   - Formatos permitidos: `.pdf`, `.epub`, `.mp3`, `.mp4`.
   - Límite de tamaño por archivo: 50MB (ampliable a 5GB en tier pro).

---

## 🚀 Hoja de Ruta de Implementación de la Base de Datos

1. **Fase 1 (Actual - UI & Mock State)**:
   - Capa de datos desacoplada en `src/data/digitalArchiveCatalog.ts`.
   - Componentes de UI listos en `<ArchivosDigitales />` con la tarjeta de *Cumbe Renaciente* y estado de alerta interactivo.

2. **Fase 2 (Conexión Backend)**:
   - Configuración del proyecto en Supabase.
   - Ejecución de migraciones con Prisma ORM (`npx prisma db push`).
   - Reemplazo del arreglo mock por consulta a API Route `/api/archivos-digitales`.

3. **Fase 3 (Subida de Libros PDFs)**:
   - Carga de los archivos digitales en Supabase Storage desde el Panel de Administración de la Casa de la Memoria.
