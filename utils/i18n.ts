import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'es', // Idioma por defecto
    fallbackLng: 'es',
    debug: process.env.NODE_ENV === 'development',
    supportedLngs: ['es', 'en', 'fr', 'de', 'it', 'pt'],
    
    // Namespace por defecto
    defaultNS: 'common',
    ns: ['common'],
    
    interpolation: {
      escapeValue: false,
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Asegurar que las traducciones se carguen inmediatamente
    initImmediate: false,
  });

export default i18n; 