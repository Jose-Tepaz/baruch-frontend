import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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

// Crear una instancia específica para el servidor
const createI18nInstance = () => {
  const instance = i18n.createInstance();
  
  instance
    .use(initReactI18next)
    .init({
      lng: 'es',
      fallbackLng: 'es',
      debug: false,
      resources,
      defaultNS: 'common',
      ns: ['common'],
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      initImmediate: false,
    });
    
  return instance;
};

// Instancia para el servidor
const serverI18n = createI18nInstance();

export default serverI18n;
export { createI18nInstance, resources }; 