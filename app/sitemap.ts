import { MetadataRoute } from 'next'
import { getProperties } from '@/services/get-properties'
import { getCategories } from '@/services/categories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://baruchrealestate.com'
  const locales = ['en', 'es', 'fr', 'de', 'pl', 'sv', 'nl']
  
  const sitemap: MetadataRoute.Sitemap = []

  // Páginas estáticas principales
  const staticPages = [
    '',
    '/properties',
    '/about-us',
    '/services',
    '/contact'
  ]

  // Agregar páginas estáticas para todos los idiomas
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      })
    }
  }

  // Agregar propiedades dinámicas
  try {
    for (const locale of locales) {
      const result = await getProperties({ locale })
      const properties = result?.properties || []
      
      for (const property of properties) {
        sitemap.push({
          url: `${baseUrl}/${locale}/property/${property.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }
  } catch (error) {
    console.error('Error generating property sitemap:', error)
  }

  // Agregar categorías dinámicas
  try {
    for (const locale of locales) {
      const categories = await getCategories(locale)
      
      for (const category of categories) {
        sitemap.push({
          url: `${baseUrl}/${locale}/categories/${category.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    }
  } catch (error) {
    console.error('Error generating category sitemap:', error)
  }

  return sitemap
} 