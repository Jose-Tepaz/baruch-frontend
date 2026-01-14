
import esCommon from '../public/locales/es/common.json';
import enCommon from '../public/locales/en/common.json';
import frCommon from '../public/locales/fr/common.json';
import deCommon from '../public/locales/de/common.json';
import plCommon from '../public/locales/pl/common.json';
import svCommon from '../public/locales/sv/common.json';
import nlCommon from '../public/locales/nl/common.json';
import enLegal from '../public/locales/en/legal.json';
import esLegal from '../public/locales/es/legal.json';
import frLegal from '../public/locales/fr/legal.json';
import deLegal from '../public/locales/de/legal.json';
import plLegal from '../public/locales/pl/legal.json';
import svLegal from '../public/locales/sv/legal.json';
import nlLegal from '../public/locales/nl/legal.json';

export const translations = {
    es: { common: esCommon, legal: esLegal },
    en: { common: enCommon, legal: enLegal },
    fr: { common: frCommon, legal: frLegal },
    de: { common: deCommon, legal: deLegal },
    pl: { common: plCommon, legal: plLegal },
    sv: { common: svCommon, legal: svLegal },
    nl: { common: nlCommon, legal: nlLegal },
};

export type Language = 'es' | 'en' | 'fr' | 'de' | 'pl' | 'sv' | 'nl';
