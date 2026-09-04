'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDesc: string;
  convocatoriaTitle: string;
  convocatoriaDesc: string;
  sobreProcesoTitle: string;
  sobreProcesoDesc: string;
}

export interface FontOption {
  id: string;
  name: string;
  description: string;
  serifClass: string;
  sansClass: string;
  googleFontsUrl?: string;
}

export interface ThemeOption {
  id: string;
  name: string;
  description: string;
  crema: string;
  cremaDark: string;
  verdeProfundo: string;
  terracota: string;
  terracotaLight: string;
  cafe: string;
  mostaza: string;
  isDark?: boolean;
}

export const FONT_PRESETS: FontOption[] = [
  {
    id: 'ancestral',
    name: 'Ancestral / Editorial (Lora & Inter)',
    description: 'Combinación tradicional elegante con máxima legibilidad para archivos históricos.',
    serifClass: 'font-serif',
    sansClass: 'font-sans',
  },
  {
    id: 'moderno',
    name: 'Moderno / Contemporáneo (Outfit & Playfair)',
    description: 'Estilo limpio y estilizado con alta nitidez en pantallas digitales.',
    serifClass: 'font-serif',
    sansClass: 'font-sans',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;0,800;1,400&display=swap',
  },
  {
    id: 'clasico',
    name: 'Clásico / Documental (Merriweather & Roboto)',
    description: 'Sensación de documento impreso formal de archivo colonial.',
    serifClass: 'font-serif',
    sansClass: 'font-sans',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Roboto:wght@400;500;700&display=swap',
  },
  {
    id: 'andino',
    name: 'Monumental / Andino (Cinzel & Space Grotesk)',
    description: 'Diseño solemne y distintivo inspirado en inscripciones y piedras ancestrales.',
    serifClass: 'font-serif',
    sansClass: 'font-sans',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800&family=Space+Grotesk:wght@400;600&display=swap',
  },
];

export const THEME_PRESETS: ThemeOption[] = [
  {
    id: 'ancestral',
    name: 'Tierra Ancestral (Original)',
    description: 'Colores de la tierra, vasijas de barro y tejidos tradicionales de Cumbal.',
    crema: '#FDFBF7',
    cremaDark: '#F2EBE1',
    verdeProfundo: '#1C3F2B',
    terracota: '#A84522',
    terracotaLight: '#C95B36',
    cafe: '#4A3018',
    mostaza: '#DCA74E',
  },
  {
    id: 'verde-cumbal',
    name: 'Verde Cumbal & Volcán',
    description: 'Tonalidades inspiradas en el volcán Cumbal y la vegetación de páramo.',
    crema: '#F4F8F5',
    cremaDark: '#E3EDE6',
    verdeProfundo: '#0F3822',
    terracota: '#2D6A4F',
    terracotaLight: '#40916C',
    cafe: '#1B4332',
    mostaza: '#52B788',
  },
  {
    id: 'terracota-calido',
    name: 'Terracota Cálido',
    description: 'Paleta cálida basada en cerámicas artesanales y atardeceres andinos.',
    crema: '#FDF7F4',
    cremaDark: '#F7E7E0',
    verdeProfundo: '#5C1D0E',
    terracota: '#B83B19',
    terracotaLight: '#D9532F',
    cafe: '#3D130A',
    mostaza: '#E59866',
  },
  {
    id: 'noche-andina',
    name: 'Noche Andina (Modo Oscuro)',
    description: 'Tema nocturno de alto contraste ideal para lectura en ambientes de poca luz.',
    crema: '#141A17',
    cremaDark: '#1E2622',
    verdeProfundo: '#E3EDE6',
    terracota: '#E07A5F',
    terracotaLight: '#F28F3B',
    cafe: '#D8E2DC',
    mostaza: '#F4A261',
    isDark: true,
  },
];

const DEFAULT_CONTENT: SiteContent = {
  heroTitle: 'Casa de la Memoria Cumbal',
  heroSubtitle: 'Centro cultural y Archivo General',
  heroDesc: 'Desarrollamos estrategias de salvaguarda y protección de las memorias y el patrimonio cultural de los pueblos indígenas del sur de Colombia',
  convocatoriaTitle: 'Convocatoria Abierta 2026',
  convocatoriaDesc: 'Recepción de proyectos de investigación y materiales documentales para la salvaguarda territorial.',
  sobreProcesoTitle: 'Quiénes somos',
  sobreProcesoDesc: 'Iniciativa comunitaria para la preservación, ordenamiento y difusión del conocimiento ancestral y documental.',
};

interface SiteSettingsContextType {
  siteContent: SiteContent;
  selectedFontId: string;
  selectedThemeId: string;
  currentFont: FontOption;
  currentTheme: ThemeOption;
  updatePageContent: (newContent: Partial<SiteContent>) => void;
  setFont: (fontId: string) => void;
  setTheme: (themeId: string) => void;
  resetToDefaults: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'casa_memoria_settings_v1';

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [selectedFontId, setSelectedFontId] = useState<string>('ancestral');
  const [selectedThemeId, setSelectedThemeId] = useState<string>('ancestral');

  // Load persisted settings from localStorage on initial client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.siteContent) setSiteContent(parsed.siteContent);
        if (parsed.selectedFontId) setSelectedFontId(parsed.selectedFontId);
        if (parsed.selectedThemeId) setSelectedThemeId(parsed.selectedThemeId);
      }
    } catch (e) {
      console.warn('Could not read settings from localStorage', e);
    }
  }, []);

  // Save settings to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ siteContent, selectedFontId, selectedThemeId })
      );
    } catch (e) {
      console.warn('Could not save settings to localStorage', e);
    }
  }, [siteContent, selectedFontId, selectedThemeId]);

  // Dynamically apply Theme CSS Variables to root document
  useEffect(() => {
    const theme = THEME_PRESETS.find((t) => t.id === selectedThemeId) || THEME_PRESETS[0];
    const root = document.documentElement;

    root.style.setProperty('--color-crema', theme.crema);
    root.style.setProperty('--color-crema-dark', theme.cremaDark);
    root.style.setProperty('--color-verde-profundo', theme.verdeProfundo);
    root.style.setProperty('--color-terracota', theme.terracota);
    root.style.setProperty('--color-terracota-light', theme.terracotaLight);
    root.style.setProperty('--color-cafe', theme.cafe);
    root.style.setProperty('--color-mostaza', theme.mostaza);

    if (theme.isDark) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
  }, [selectedThemeId]);

  // Dynamically inject Font link tag if external Google font is required
  useEffect(() => {
    const font = FONT_PRESETS.find((f) => f.id === selectedFontId) || FONT_PRESETS[0];
    if (font.googleFontsUrl) {
      let linkElement = document.getElementById('dynamic-google-font') as HTMLLinkElement | null;
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.id = 'dynamic-google-font';
        linkElement.rel = 'stylesheet';
        document.head.appendChild(linkElement);
      }
      linkElement.href = font.googleFontsUrl;
    }
  }, [selectedFontId]);

  const updatePageContent = (newContent: Partial<SiteContent>) => {
    setSiteContent((prev) => ({ ...prev, ...newContent }));
  };

  const setFont = (fontId: string) => {
    setSelectedFontId(fontId);
  };

  const setTheme = (themeId: string) => {
    setSelectedThemeId(themeId);
  };

  const resetToDefaults = () => {
    setSiteContent(DEFAULT_CONTENT);
    setSelectedFontId('ancestral');
    setSelectedThemeId('ancestral');
  };

  const currentFont = FONT_PRESETS.find((f) => f.id === selectedFontId) || FONT_PRESETS[0];
  const currentTheme = THEME_PRESETS.find((t) => t.id === selectedThemeId) || THEME_PRESETS[0];

  return (
    <SiteSettingsContext.Provider
      value={{
        siteContent,
        selectedFontId,
        selectedThemeId,
        currentFont,
        currentTheme,
        updatePageContent,
        setFont,
        setTheme,
        resetToDefaults,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings debe ser usado dentro de un SiteSettingsProvider');
  }
  return context;
};
