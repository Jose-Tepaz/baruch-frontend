import { query } from './strapi'
import { getLocaleWithFallback } from '@/utils/get-current-locale'

const { STRAPI_HOST } = process.env

/**
 * Representa el estado de una propiedad.
 */
interface PropertyStatus {
  id: number
  documentId: string
  Title: string
}

/**
 * Representa la estructura de los datos de una propiedad.
 */
interface PropertyData {
  id: number
  title: string
  description: string
  price: number
  address: string
  main_image?: {
    url: string
  }
  slug: string
  documentId: string
  property_status: PropertyStatus
  category: any
  is_private?: boolean,
  location?: string,
  is_featured?: boolean
}

/**
 * Obtiene una lista de propiedades desde la API de Strapi, permitiendo filtrar por categoría,
 * idioma y visibilidad (privada/pública).
 * 
 * @param {Object} params - Parámetros de búsqueda.
 * @param {string} [params.categoryId] - ID de la categoría para filtrar propiedades.
 * @param {string} [params.locale] - Idioma/localización para la consulta.
 * @param {boolean} [params.onlyPrivate] - Si es true, solo trae propiedades privadas; si es false, solo públicas.
 * @returns {Promise<{properties: any[], pagination: any}>} - Propiedades y datos de paginación.
 */
export function getProperties(
    { categoryId, locale, onlyPrivate }: 
    { categoryId?: string; locale?: string; onlyPrivate?: boolean }
) {
    // Obtiene el locale actual, usando fallback si es necesario
    const currentLocale = getLocaleWithFallback(locale);
   
    // Construye el query string base para la consulta a Strapi
    let queryString = `properties?populate[main_image][fields][0]=url&populate[property_status][fields][0]=Title&populate[category][fields][0]=name&populate[category][fields][1]=slug&pagination[limit]=100&locale=${encodeURIComponent(currentLocale)}`;
    
    // Agrega filtro de categoría si se proporciona categoryId
    if (categoryId && categoryId.trim() !== '') {
        queryString += `&filters[category][slug][$contains]=${categoryId}`;
    }
    // Agrega filtro para propiedades privadas si onlyPrivate es true
    if (onlyPrivate) {
        queryString += `&filters[is_private][$eq]=true`;
    }
    // Agrega filtro para solo públicas si onlyPrivate es false
    if (onlyPrivate === false) {
        queryString += `&filters[$or][0][is_private][$eq]=false&filters[$or][1][is_private][$null]=true`;
    }
    
    // Realiza la consulta a la API y procesa la respuesta
    return query(queryString)
    .then(res => {
        // Manejo de respuesta inválida o vacía
        if (!res || !res.data) {
            if (process.env.NODE_ENV === 'development') {
                console.log('Invalid response structure:', res);
            }
            return { properties: [], pagination: res?.meta?.pagination || {} };
        }
        
        // Verifica que la respuesta sea un array
        if (!Array.isArray(res.data)) {
            if (process.env.NODE_ENV === 'development') {
                console.log('Response data is not an array:', res.data);
            }
            return { properties: [], pagination: res?.meta?.pagination || {} };
        }
        
        // Si no hay propiedades, retorna array vacío
        if (res.data.length === 0) {
            if (process.env.NODE_ENV === 'development') {
                console.log('No properties found in response');
            }
            return { properties: [], pagination: res?.meta?.pagination || {} };
        }
        
        // Extrae datos y metadatos de la respuesta
        const { data, meta } = res
        const properties = data.map((property: PropertyData) => {
            const {
                id,
                title,
                description,
                price,
                address,
                main_image: rawimage,
                slug,
                documentId,
                property_status,
                category,
                is_private,
                location,
                is_featured
            } = property

            // Procesa la URL de la imagen principal
            const image = rawimage
                ? (rawimage.url.startsWith('http') ? rawimage.url : `${STRAPI_HOST}${rawimage.url}`)
                : ''
            // Obtiene el título del estado de la propiedad
            const propertyStatus = property_status?.Title || ''
            
           

            // Retorna el objeto propiedad procesado
            return {
                id,
                title,
                description,
                price,
                address,
                image,
                slug,
                documentId,
                propertyStatus,
                category,
                is_private,
                location,
                is_featured
            }
        })

        // Retorna las propiedades y la paginación
        return {
            properties,
            pagination: meta.pagination
        }
    })
    .catch(error => {
        // Manejo de errores en la consulta
        console.error('=== get-properties.ts Error ===', error);
        return { properties: [], pagination: {} };
    })
}
