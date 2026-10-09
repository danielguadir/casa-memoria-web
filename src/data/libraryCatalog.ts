import catalogJson from './json/libraryCatalog.json';

export interface LibraryCopy {
  inventoryCode: string;
  order?: number;
  entryDate?: string;
  coverType?: string;
  acquisitionType?: string;
  donor?: string;
  condition?: string;
  notes?: string | null;
}

export interface EditHistoryEntry {
  timestamp: string;
  editedBy?: string;
  oldTitle: string;
  newTitle: string;
  oldCode?: string;
  newCode?: string;
}

export interface LibraryItem {
  id: string;
  code: string;
  title: string;
  subtitle?: string | null;
  authors: string[];
  publisher?: string | null;
  year?: number | null;
  pages?: number | null;
  isbn?: string | null;
  collection?: string | null;
  keywords?: string[];
  tags?: string[];
  category?: string | null;
  copiesCount: number;
  copies: LibraryCopy[];
  sourceUrl?: string | null;
  history?: EditHistoryEntry[];
}

const STORAGE_KEY = 'bepimp_custom_catalog_v1';

/**
 * Get current library catalog (from localStorage if available, or static JSON fallback)
 */
export const getLibraryCatalog = (): LibraryItem[] => {
  if (typeof window === 'undefined') {
    return catalogJson as LibraryItem[];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as LibraryItem[];
      }
    }
  } catch (e) {
    console.error('Error reading library catalog from localStorage:', e);
  }

  return catalogJson as LibraryItem[];
};

export const libraryCatalog: LibraryItem[] = (catalogJson as LibraryItem[]);

/**
 * Save catalog state to localStorage and notify listeners
 */
const saveCatalogAndNotify = (items: LibraryItem[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('libraryCatalogUpdated', { detail: items }));
    } catch (e) {
      console.error('Error saving library catalog to localStorage:', e);
    }
  }
};

/**
 * Add a new book item to the library catalog
 */
export const addLibraryItem = (newItemData: Partial<LibraryItem>): LibraryItem => {
  const currentCatalog = getLibraryCatalog();
  const nextNum = currentCatalog.length + 1;
  const newId = `bepimp_${Date.now()}`;
  const code = newItemData.code || `BEPI${String(nextNum).padStart(5, '0')}`;
  
  const copiesCount = newItemData.copiesCount && newItemData.copiesCount > 0 ? newItemData.copiesCount : 1;
  const copies: LibraryCopy[] = [];
  for (let i = 1; i <= copiesCount; i++) {
    copies.push({
      inventoryCode: `${code}-${i}`,
      order: i,
      entryDate: new Date().toLocaleDateString('es-CO'),
      coverType: 'Rústica',
      acquisitionType: 'Donación / Registro Admin',
      donor: 'Casa de la Memoria',
      condition: 'Excelente',
      notes: null,
    });
  }

  const initialHistoryEntry: EditHistoryEntry = {
    timestamp: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }),
    editedBy: 'Administrador',
    oldTitle: 'Registro Inicial',
    newTitle: newItemData.title || 'Título sin especificar',
    oldCode: code,
    newCode: code,
  };

  const newItem: LibraryItem = {
    id: newId,
    code,
    title: newItemData.title || 'Título sin especificar',
    subtitle: newItemData.subtitle || null,
    authors: newItemData.authors && newItemData.authors.length > 0 ? newItemData.authors : ['Autor Desconocido'],
    publisher: newItemData.publisher || 'Ediciones Casa de la Memoria',
    year: newItemData.year ? Number(newItemData.year) : new Date().getFullYear(),
    pages: newItemData.pages ? Number(newItemData.pages) : null,
    isbn: newItemData.isbn || null,
    collection: newItemData.collection || 'Colección General',
    keywords: newItemData.keywords || ['Memoria', 'Pueblos Indígenas'],
    tags: newItemData.tags || ['Nuevo'],
    category: newItemData.category || 'General',
    copiesCount,
    copies,
    sourceUrl: newItemData.sourceUrl || null,
    history: [initialHistoryEntry],
  };

  const updatedCatalog = [newItem, ...currentCatalog];
  saveCatalogAndNotify(updatedCatalog);
  return newItem;
};

/**
 * Update an existing book item by ID and append edit history
 */
export const updateLibraryItem = (id: string, updatedData: Partial<LibraryItem>): LibraryItem | null => {
  const currentCatalog = getLibraryCatalog();
  const index = currentCatalog.findIndex(item => item.id === id);
  if (index === -1) return null;

  const existing = currentCatalog[index];
  const copiesCount = updatedData.copiesCount ? Number(updatedData.copiesCount) : existing.copiesCount;

  // Re-generate copies if count changed
  let copies = existing.copies;
  if (copiesCount !== existing.copiesCount) {
    copies = [];
    for (let i = 1; i <= copiesCount; i++) {
      copies.push({
        inventoryCode: `${existing.code}-${i}`,
        order: i,
        entryDate: existing.copies[0]?.entryDate || new Date().toLocaleDateString('es-CO'),
        coverType: existing.copies[0]?.coverType || 'Rústica',
        acquisitionType: existing.copies[0]?.acquisitionType || 'Donación / Registro Admin',
        donor: existing.copies[0]?.donor || 'Casa de la Memoria',
        condition: 'Bueno',
        notes: null,
      });
    }
  }

  // Record audit history entry if title or code changed
  let history = existing.history || [];
  const titleChanged = updatedData.title && updatedData.title.trim() !== existing.title;
  const codeChanged = updatedData.code && updatedData.code.trim() !== existing.code;

  if (titleChanged || codeChanged) {
    const newHistoryEntry: EditHistoryEntry = {
      timestamp: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }),
      editedBy: 'Administrador',
      oldTitle: existing.title,
      newTitle: updatedData.title ? updatedData.title.trim() : existing.title,
      oldCode: existing.code,
      newCode: updatedData.code ? updatedData.code.trim() : existing.code,
    };
    history = [newHistoryEntry, ...history];
  }

  const updatedItem: LibraryItem = {
    ...existing,
    ...updatedData,
    year: updatedData.year ? Number(updatedData.year) : existing.year,
    pages: updatedData.pages ? Number(updatedData.pages) : existing.pages,
    copiesCount,
    copies,
    history,
  };

  currentCatalog[index] = updatedItem;
  saveCatalogAndNotify(currentCatalog);
  return updatedItem;
};

/**
 * Delete a book item from the catalog by ID
 */
export const deleteLibraryItem = (id: string): boolean => {
  const currentCatalog = getLibraryCatalog();
  const filtered = currentCatalog.filter(item => item.id !== id);
  if (filtered.length === currentCatalog.length) return false;

  saveCatalogAndNotify(filtered);
  return true;
};

/**
 * Helper to remove accents / diacritics from a string for accent-insensitive search
 */
export const removeAccents = (str: string): string => {
  if (!str) return '';
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

/**
 * Get item by unique ID
 */
export const getLibraryItemById = (id: string): LibraryItem | undefined => {
  return getLibraryCatalog().find(item => item.id === id);
};

/**
 * Get item by general code OR by copy inventory code (e.g. 'BEPI00002' or 'BEPI00002-1')
 */
export const getLibraryItemByCode = (code: string): LibraryItem | undefined => {
  const normalizedCode = removeAccents(code.trim());
  return getLibraryCatalog().find(
    item =>
      removeAccents(item.code) === normalizedCode ||
      item.copies?.some(copy => removeAccents(copy.inventoryCode) === normalizedCode)
  );
};

/**
 * Filter books by category (accent-insensitive)
 */
export const getBooksByCategory = (category: string): LibraryItem[] => {
  const catalog = getLibraryCatalog();
  if (!category || category === 'Todas') return catalog;
  const normCat = removeAccents(category);
  return catalog.filter(item => item.category && removeAccents(item.category) === normCat);
};

/**
 * Get all unique categories dynamically sorted alphabetically
 */
export const getAllLibraryCategories = (): string[] => {
  const set = new Set<string>();
  getLibraryCatalog().forEach(item => {
    if (item.category && item.category.trim()) {
      set.add(item.category.trim());
    }
  });
  return Array.from(set).sort();
};

/**
 * Get total physical copies count across all titles
 */
export const getTotalCopiesCount = (): number => {
  return getLibraryCatalog().reduce((sum, item) => sum + (item.copiesCount || item.copies?.length || 1), 0);
};

/**
 * Advanced multi-field search (accent-insensitive & case-insensitive)
 */
export const searchLibrary = (query: string, category: string = 'Todas'): LibraryItem[] => {
  let results = getLibraryCatalog();

  if (category && category !== 'Todas') {
    const normCategory = removeAccents(category);
    results = results.filter(item => item.category && removeAccents(item.category) === normCategory);
  }

  if (!query || !query.trim()) {
    return results;
  }

  const q = removeAccents(query.trim());

  return results.filter(item => {
    const matchTitle = removeAccents(item.title).includes(q);
    const matchSubtitle = item.subtitle ? removeAccents(item.subtitle).includes(q) : false;
    const matchCode = removeAccents(item.code).includes(q);
    const matchAuthors = item.authors ? item.authors.some(author => removeAccents(author).includes(q)) : false;
    const matchPublisher = item.publisher ? removeAccents(item.publisher).includes(q) : false;
    const matchCollection = item.collection ? removeAccents(item.collection).includes(q) : false;
    const matchIsbn = item.isbn ? removeAccents(item.isbn).includes(q) : false;
    const matchKeywords = item.keywords ? item.keywords.some(kw => removeAccents(kw).includes(q)) : false;
    const matchTags = item.tags ? item.tags.some(tag => removeAccents(tag).includes(q)) : false;
    const matchCopyCode = item.copies ? item.copies.some(copy => removeAccents(copy.inventoryCode).includes(q)) : false;
    const matchDonor = item.copies ? item.copies.some(copy => copy.donor && removeAccents(copy.donor).includes(q)) : false;

    return (
      matchTitle ||
      matchSubtitle ||
      matchCode ||
      matchAuthors ||
      matchPublisher ||
      matchCollection ||
      matchIsbn ||
      matchKeywords ||
      matchTags ||
      matchCopyCode ||
      matchDonor
    );
  });
};
