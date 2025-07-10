// Sistema de traducción simple con reactividad - sin errores de hidratación
import { useEffect, useState } from 'react';
import esCommon from '../public/locales/es/common.json';
import enCommon from '../public/locales/en/common.json';
import frCommon from '../public/locales/fr/common.json';
import deCommon from '../public/locales/de/common.json';
import itCommon from '../public/locales/it/common.json';
import ptCommon from '../public/locales/pt/common.json';

export const translations = {
  es: { common: esCommon },
  en: { common: enCommon },
  fr: { common: frCommon },
  de: { common: deCommon },
  it: { common: itCommon },
  pt: { common: ptCommon },
};

export type Language = keyof typeof translations;

let currentLanguage: Language = 'es';
const listeners = new Set<() => void>();

// Función para notificar cambios
function notifyLanguageChange() {
  listeners.forEach(listener => listener());
}

export function getCurrentLanguage(): Language {
  return currentLanguage;
}

export function setLanguage(lang: Language): void {
  if (currentLanguage !== lang) {
    currentLanguage = lang;
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    notifyLanguageChange();
  }
}

// Función para suscribirse a cambios de idioma
export function subscribeToLanguageChange(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function t(key: string, namespace = 'common'): string {
  try {
    const keys = key.split('.');
    let value: any = translations[currentLanguage]?.[namespace as keyof typeof translations['es']] || translations.es[namespace as keyof typeof translations['es']];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value === 'string') {
      return value;
    }
    
    // Fallback al español
    if (currentLanguage !== 'es') {
      let fallbackValue: any = translations.es[namespace as keyof typeof translations['es']];
      for (const k of keys) {
        fallbackValue = fallbackValue?.[k];
      }
      if (typeof fallbackValue === 'string') {
        return fallbackValue;
      }
    }
    
    return key;
  } catch (error) {
    console.warn(`Translation not found: ${key}`);
    return key;
  }
}

export function useTranslation(namespace = 'common') {
  const [, forceUpdate] = useState({});
  const [language, setLanguageState] = useState<Language>('es'); // Siempre español inicialmente
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    // Marcar como hidratado
    setIsHydrated(true);
    
    // Cargar idioma guardado solo después de la hidratación
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      currentLanguage = savedLanguage;
      setLanguageState(savedLanguage);
      forceUpdate({});
    }
    
    // Suscribirse a cambios
    const unsubscribe = subscribeToLanguageChange(() => {
      setLanguageState(getCurrentLanguage());
      forceUpdate({});
    });
    
    return unsubscribe;
  }, []);
  
  return {
    t: (key: string) => t(key, namespace),
    i18n: {
      language: isHydrated ? language : 'es', // Usar español hasta que se hidrate
      changeLanguage: (lang: Language) => {
        setLanguage(lang);
        setLanguageState(lang);
      },
    }
  };
} 