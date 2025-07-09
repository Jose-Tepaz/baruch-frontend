import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones estáticas
import esCommon from '../public/locales/es/common.json';
import enCommon from '../public/locales/en/common.json';
import frCommon from '../public/locales/fr/common.json';
import deCommon from '../public/locales/de/common.json';
import itCommon from '../public/locales/it/common.json';
import ptCommon from '../public/locales/pt/common.json';

const resources = {
  es: {
    common: esCommon,
  },
  en: {
    common: enCommon,
  },
  fr: {
    common: frCommon,
  },
  de: {
    common: deCommon,
  },
  it: {
    common: itCommon,
  },
  pt: {
    common: ptCommon,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'es', // Idioma por defecto
    fallbackLng: 'es',
    debug: process.env.NODE_ENV === 'development',
    
    // Recursos estáticos
    resources,
    
    // Namespace por defecto
    defaultNS: 'common',
    ns: ['common'],
    
    interpolation: {
      escapeValue: false,
    },

    // Opciones para mejorar la carga
    load: 'languageOnly',
    cleanCode: true,
    
    // Detección de idioma
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n; 