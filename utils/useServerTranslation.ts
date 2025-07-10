import { resources } from './i18n-static';

interface UseServerTranslationReturn {
  t: (key: string, options?: any) => string;
  i18n: {
    language: string;
    changeLanguage: (lng: string) => void;
  };
}

export function useServerTranslation(namespace = 'common'): UseServerTranslationReturn {
  const currentLanguage = 'es'; // Por defecto español
  
  const t = (key: string, options?: any): string => {
    try {
      const keys = key.split('.');
      let value: any = resources[currentLanguage as keyof typeof resources][namespace as keyof typeof resources['es']];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      if (typeof value === 'string') {
        return value;
      }
      
      // Fallback al español si no se encuentra
      if (currentLanguage !== 'es') {
        let fallbackValue: any = resources.es[namespace as keyof typeof resources['es']];
        for (const k of keys) {
          fallbackValue = fallbackValue?.[k];
        }
        if (typeof fallbackValue === 'string') {
          return fallbackValue;
        }
      }
      
      return key; // Retornar la key si no se encuentra traducción
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  };
  
  const i18n = {
    language: currentLanguage,
    changeLanguage: (lng: string) => {
      // En el servidor, esto no hace nada
      // En el cliente, se implementaría la lógica
      console.log(`Language change requested: ${lng}`);
    }
  };
  
  return { t, i18n };
} 