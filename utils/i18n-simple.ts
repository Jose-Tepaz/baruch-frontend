// Sistema de traducción simple con reactividad - sin errores de hidratación
import { useEffect, useState } from 'react';
import { getCurrentLocale, updateCurrentLocale } from './get-current-locale';
import esCommon from '../public/locales/es/common.json';
import enCommon from '../public/locales/en/common.json';
import frCommon from '../public/locales/fr/common.json';
import deCommon from '../public/locales/de/common.json';
import plCommon from '../public/locales/pl/common.json';
import svCommon from '../public/locales/sv/common.json';
import nlCommon from '../public/locales/nl/common.json';

export const translations = {
  es: { common: esCommon },
  en: { common: enCommon },
  fr: { common: frCommon },
  de: { common: deCommon },
  pl: { common: plCommon },
  sv: { common: svCommon },
  nl: { common: nlCommon },
};

export type Language = 'es' | 'en' | 'fr' | 'de' | 'pl' | 'sv' | 'nl';

let currentLanguage: Language = 'en';
let changeListeners: (() => void)[] = [];

// Función para detectar idioma desde URL
function detectLanguageFromURL(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const pathname = window.location.pathname;
  
  // Si la URL es solo "/" o no tiene código de idioma, es inglés (por defecto)
  if (pathname === '/' || !pathname.match(/^\/[a-z]{2}(\/|$)/)) {
    return 'en';
  }
  
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  
  if (localeMatch) {
    const locale = localeMatch[1] as Language;
    const supportedLocales: Language[] = ['en', 'es', 'fr', 'de', 'pl', 'sv', 'nl'];
    
    if (supportedLocales.includes(locale)) {
      return locale;
    }
  }
  
  return 'en'; // Fallback a inglés
}

// Inicializar idioma desde URL o localStorage
if (typeof window !== 'undefined') {
  const urlLanguage = detectLanguageFromURL();
  if (urlLanguage) {
    currentLanguage = urlLanguage;
  } else {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      currentLanguage = savedLanguage;
    }
  }
}

export function getCurrentLanguage(): Language {
  if (typeof window !== 'undefined') {
    // Verificar primero la URL
    const urlLanguage = detectLanguageFromURL();
    console.log('=== getCurrentLanguage: URL language detected:', urlLanguage);
    console.log('=== getCurrentLanguage: Current language before:', currentLanguage);
    
    if (urlLanguage && urlLanguage !== currentLanguage) {
      console.log('=== getCurrentLanguage: Updating language from URL:', urlLanguage);
      setLanguage(urlLanguage);
    }
    
    console.log('=== getCurrentLanguage: Final language:', currentLanguage);
  }
  
  return currentLanguage;
}

export function setLanguage(lang: Language) {
  if (currentLanguage !== lang) {
    currentLanguage = lang;
    updateCurrentLocale(lang);
    
    // Guardar en localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('language', lang);
      } catch (error) {
        console.warn('Error saving language:', error);
      }
    }
    
    // Notificar a los listeners
    changeListeners.forEach(listener => listener());
  }
}

export function subscribeToLanguageChange(listener: () => void): () => void {
  changeListeners.push(listener);
  return () => {
    changeListeners = changeListeners.filter(l => l !== listener);
  };
}

export function t(key: string, namespace = 'common'): string {
  try {
    const keys = key.split('.');
    let value: any = translations[currentLanguage]?.[namespace as keyof typeof translations['en']] || translations.en[namespace as keyof typeof translations['en']];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value === 'string') {
      return value;
    }
    
    // Fallback al inglés
    if (currentLanguage !== 'en') {
      let fallbackValue: any = translations.en[namespace as keyof typeof translations['en']];
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
  const [language, setLanguageState] = useState<Language>('en');
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    // Marcar como hidratado
    setIsHydrated(true);
    
    // Detectar idioma desde URL o localStorage
    const detectedLanguage = getCurrentLanguage();
    if (detectedLanguage !== language) {
      setLanguageState(detectedLanguage);
      forceUpdate({});
    }
    
    // Suscribirse a cambios
    const unsubscribe = subscribeToLanguageChange(() => {
      setLanguageState(getCurrentLanguage());
      forceUpdate({});
    });
    
    // Detectar cambios en la URL
    const handleLocationChange = () => {
      const newLanguage = detectLanguageFromURL();
      if (newLanguage !== currentLanguage) {
        setLanguage(newLanguage);
      }
    };
    
    // Escuchar cambios en la URL
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      unsubscribe();
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  
  return {
    t: (key: string) => t(key, namespace),
    i18n: {
      language: isHydrated ? language : 'en',
      changeLanguage: (lang: Language) => {
        setLanguage(lang);
        setLanguageState(lang);
      },
    }
  };
} 