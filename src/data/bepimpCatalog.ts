/**
 * DEPRECATED/COMPATIBILITY MODULE
 * 
 * La fuente principal de datos del catálogo es ahora `libraryCatalog.json`,
 * administrada a través de `libraryCatalog.ts`.
 * 
 * Este archivo se mantiene como re-exportación de compatibilidad para evitar
 * duplicación de datos y asegurar la escalabilidad del sistema.
 */

export * from './libraryCatalog';

import { libraryCatalog, LibraryItem } from './libraryCatalog';

export type BepimpItem = LibraryItem;
export const bepimpCatalogData = libraryCatalog;
