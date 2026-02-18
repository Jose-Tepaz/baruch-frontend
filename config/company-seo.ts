/**
 * Configuración de datos de empresa para SEO (Schema.org, Open Graph, etc.)
 */
import { WHATSAPP_CONFIG } from './whatsapp';

export const COMPANY_SEO = {
  name: 'Baruch Real Estate',
  url: 'https://www.baruchrealestate.com',
  description:
    'Find your dream property with Baruch Real Estate. We offer the best houses, apartments, and commercial properties.',
  logo: 'https://www.baruchrealestate.com/assets/img/logo/logo.png',
  phone: WHATSAPP_CONFIG.phoneNumber,
  address: {
    streetAddress: 'C. Cam. Viejo de Málaga 28',
    postalCode: '29700',
    addressLocality: 'Vélez-Málaga',
    addressCountry: 'ES',
  },
  // sameAs: omitir por ahora hasta tener URLs reales de redes sociales
} as const;
