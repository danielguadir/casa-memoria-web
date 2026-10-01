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
}

export const libraryCatalog: LibraryItem[] = catalogJson as LibraryItem[];

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
  return libraryCatalog.find(item => item.id === id);
};

/**
 * Get item by general code OR by copy inventory code (e.g. 'BEPI00002' or 'BEPI00002-1')
 */
export const getLibraryItemByCode = (code: string): LibraryItem | undefined => {
  const normalizedCode = removeAccents(code.trim());
  return libraryCatalog.find(
    item =>
      removeAccents(item.code) === normalizedCode ||
      item.copies?.some(copy => removeAccents(copy.inventoryCode) === normalizedCode)
  );
};

/**
 * Filter books by category (accent-insensitive)
 */
export const getBooksByCategory = (category: string): LibraryItem[] => {
  if (!category || category === 'Todas') return libraryCatalog;
  const normCat = removeAccents(category);
  return libraryCatalog.filter(item => item.category && removeAccents(item.category) === normCat);
};

/**
 * Get all unique categories dynamically sorted alphabetically
 */
export const getAllLibraryCategories = (): string[] => {
  const set = new Set<string>();
  libraryCatalog.forEach(item => {
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
  return libraryCatalog.reduce((sum, item) => sum + (item.copiesCount || item.copies?.length || 1), 0);
};

/**
 * Advanced multi-field search (accent-insensitive & case-insensitive)
 */
export const searchLibrary = (query: string, category: string = 'Todas'): LibraryItem[] => {
  let results = libraryCatalog;

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
