import { MetadataRoute } from 'next';
import { getProperties } from '@/services/get-properties';
import { getCategories } from '@/services/categories';

const BASE_URL = 'https://www.baruchrealestate.com';
const LOCALES = ['en', 'es', 'fr', 'de', 'pl', 'sv', 'nl'];

// Rutas estáticas del sitio
const STATIC_ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'daily' as const },
  { path: 'about-us', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: 'contact', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: 'properties', priority: 0.9, changeFrequency: 'daily' as const },
  { path: 'services', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: 'testimonials', priority: 0.6, changeFrequency: 'weekly' as const },
  { path: 'privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
];

// IDs de servicios estáticos (definidos en translations)
const SERVICE_IDS = [
  'buying-representation',
  'sell-your-house-in-costa-del-sol',
  'residency-nie',
  'finance',
  'insurance-services',
  'taxes',
  'legal-services'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  try {
    // 1. Agregar rutas estáticas para cada idioma
    STATIC_ROUTES.forEach(route => {
      LOCALES.forEach(locale => {
        let url: string;
        
        if (locale === 'en') {
          // Inglés va en la raíz sin prefijo
          url = route.path 
            ? `${BASE_URL}/${route.path}/`
            : `${BASE_URL}/`;
        } else {
          // Otros idiomas tienen prefijo
          url = route.path 
            ? `${BASE_URL}/${locale}/${route.path}/`
            : `${BASE_URL}/${locale}/`;
        }

        sitemapEntries.push({
          url,
          lastModified: new Date(),
          changeFrequency: route.changeFrequency,
          priority: route.priority,
        });
      });
    });

    // 2. Agregar propiedades dinámicas para cada idioma
    for (const locale of LOCALES) {
      try {
        const propertiesResult = await getProperties({ 
          locale, 
          onlyPrivate: false 
        });
        
        const properties = propertiesResult?.properties || [];
        
        properties.forEach((property: any) => {
          if (property.slug) {
            let url: string;
            
            if (locale === 'en') {
              url = `${BASE_URL}/property/${property.slug}/`;
            } else {
              url = `${BASE_URL}/${locale}/property/${property.slug}/`;
            }

            sitemapEntries.push({
              url,
              lastModified: property.updatedAt 
                ? new Date(property.updatedAt) 
                : new Date(),
              changeFrequency: 'weekly',
              priority: 0.7,
            });
          }
        });
      } catch (error) {
        console.error(`Error fetching properties for locale ${locale}:`, error);
      }
    }

    // 3. Agregar categorías dinámicas para cada idioma
    for (const locale of LOCALES) {
      try {
        const categories = await getCategories(locale);
        
        if (Array.isArray(categories)) {
          categories.forEach((category: any) => {
            if (category.slug) {
              let url: string;
              
              if (locale === 'en') {
                url = `${BASE_URL}/categories/${category.slug}/`;
              } else {
                url = `${BASE_URL}/${locale}/categories/${category.slug}/`;
              }

              sitemapEntries.push({
                url,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.6,
              });
            }
          });
        }
      } catch (error) {
        console.error(`Error fetching categories for locale ${locale}:`, error);
      }
    }

    // 4. Agregar servicios dinámicos para cada idioma
    for (const locale of LOCALES) {
      SERVICE_IDS.forEach((serviceId) => {
        let url: string;
        
        if (locale === 'en') {
          url = `${BASE_URL}/services/${serviceId}/`;
        } else {
          url = `${BASE_URL}/${locale}/services/${serviceId}/`;
        }

        sitemapEntries.push({
          url,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    }

  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  // Eliminar duplicados y ordenar por prioridad
  const uniqueUrls = new Map<string, MetadataRoute.Sitemap[0]>();
  sitemapEntries.forEach(entry => {
    if (!uniqueUrls.has(entry.url)) {
      uniqueUrls.set(entry.url, entry);
    }
  });

  return Array.from(uniqueUrls.values()).sort((a, b) => 
    (b.priority || 0) - (a.priority || 0)
  );
}
