// services/properties.ts
import { stringify } from 'querystring'
import { query } from './strapi'
import { getLocaleWithFallback } from '@/utils/get-current-locale'
const { STRAPI_HOST } = process.env

interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

interface StrapiMeta {
  pagination: StrapiPagination
}

/**
 * Representa el estado de una propiedad (ej. Venta, Renta).
 */
interface PropertyStatus {
  id: number
  documentId: string
  Title: string
}

/**
 * Representa la ubicación geográfica de la propiedad.
 */
interface Location {
  id: number
  documentId: string
  name: string
  slug: string
}
/**
 * Estructura de una propiedad mapeada para uso en el frontend.
 * Esta es la versión "limpia" de los datos que usan los componentes.
 */
export interface MappedProperty {
  id: number
  documentId: string
  title: string
  description: string
  price: number
  address: string
  image: string
  highlight?: string
  slug: string
  propertyStatus: string
  category: any
  location: Location
  is_private?: boolean
  sold?: boolean
  amenities: Array<{
    id: number;
    Name: string;
    slug: string;
  }>
}

export interface PropertyListResponse {
  data: MappedProperty[]
  meta: StrapiMeta
}

// Definir la interfaz para la propiedad
// Definir la interfaz para la propiedad cruda que viene de Strapi
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
  highlight?: string
  documentId: string
  property_status: PropertyStatus
  category: any
  location: Location
  type?: string
  city?: string
  state?: string
  amenities?: Array<{
    id: number;
    Name: string;
    slug: string;
  }>
  is_private?: boolean
  sold?: boolean
}

// Función para verificar si el usuario está autenticado (lado servidor)
/**
 * Verifica si el usuario está autenticado.
 * Funciona tanto en el lado del servidor (revisando cookies) como en el cliente (revisando localStorage).
 * Utilizado para determinar si se deben mostrar propiedades privadas.
 */
function isUserAuthenticated(): boolean {
  // En servidor, verificar el token desde cookies o headers
  if (typeof window === 'undefined') {
    // Verificar cookies en el servidor usando next/headers
    try {
      const { cookies } = require('next/headers');
      const token = cookies().get('auth_token')?.value;
      return !!token;
    } catch {
      return false;
    }
  }
  // En cliente, verificar localStorage
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('auth_token');
  }
  return false;
}

/**
 * Tipos de filtros disponibles para la búsqueda de propiedades.
 * Permite filtrar por múltiples criterios simultáneamente.
 */
export type getPropertiesFilter = {
  categorySlug?: string      // Slug de una categoría única
  categories?: string[]      // Array de slugs de categorías (filtro múltiple)
  propertyStatus?: string    // Título de un estado único
  statuses?: string[]        // Array de títulos de estados (filtro múltiple)
  bedrooms?: string          // Número mínimo de habitaciones
  bathrooms?: string         // Número mínimo de baños
  min_price?: string         // Precio mínimo
  max_price?: string         // Precio máximo
  location?: string          // Nombre parcial de ubicación
  locations?: string[]       // Array de slugs de ubicación (filtro múltiple)
  locationSlug?: string      // Slug de ubicación única
  amenities?: string         // Nombre parcial de amenidad
  amenitiesArray?: string[]  // Array de nombres de amenidades (filtro múltiple)
  locale?: string           // Idioma
  page?: number             // Número de página
  pageSize?: number         // Tamaño de página
  [key: string]: any
}

//URL que obiten todos los datos para la lista de propiedades
///properties?populate[main_image][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[property_status][fields][0]=Title&filters[category][slug][$contains]=apartaments 

// Función para obtener propiedades filtradas por categoría
/**
 * Obtiene propiedades filtradas por una categoría específica.
 * Esta función es más simple y específica que getProperties.
 * 
 * @param categorySlug - El slug de la categoría a filtrar
 * @param propertyStatus - (Opcional) El estado de la propiedad (ej. Venta)
 * @param locale - Idioma actual
 * @param page - Número de página para paginación
 * @param pageSize - Cantidad de items por página
 */
export function getPropertiesByCategory(
  categorySlug: string,
  propertyStatus?: string,
  locale?: string,
  page: number = 1,
  pageSize: number = 9) {
  const currentLocale = getLocaleWithFallback(locale)
  let qs = 'properties?populate[main_image][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[property_status][fields][0]=Title&populate[amenities][fields][0]=Name&populate[amenities][fields][1]=slug&populate[location][fields][0]=name&populate[location][fields][1]=slug&pagination[limit]=100'

  // Agregar parámetro locale
  qs += `&locale=${encodeURIComponent(currentLocale)}`
  // Agregar paginación
  qs += `&pagination[page]=${encodeURIComponent(String(page))}&pagination[pageSize]=${encodeURIComponent(String(pageSize))}`

  if (categorySlug) {
    qs += `&filters[category][slug][$eq]=${encodeURIComponent(categorySlug)}`
  }

  if (propertyStatus) {
    qs += `&filters[property_status][Title][$eq]=${encodeURIComponent(propertyStatus)}`
  }



  return query(`${qs}`)
    .then(res => {
      if (!res.data || res.data.length === 0) {
        return [];
      }
      const meta: StrapiMeta | undefined = res?.meta
      const items = Array.isArray(res?.data) ? res.data : []

      const mapped = items.map((property: PropertyData) => {
        const {
          id,
          documentId,
          title,
          description,
          price,
          address,
          main_image: rawimage,
          highlight,
          slug,
          property_status,
          category,
          location,
          type,
          city,
          state,
          amenities,
          sold
        } = property

        const image = rawimage
          ? (rawimage.url.startsWith('http') ? rawimage.url : `${STRAPI_HOST}${rawimage.url}`)
          : ''
        const propertyStatus = property_status ? property_status.Title : ''

        return {
          id,
          documentId,
          title,
          description,
          price,
          address,
          image,
          highlight,
          slug,
          propertyStatus,
          category,
          location,
          type,
          city,
          state,
          amenities: amenities || [],
          sold
        }
      })
      return {
        data: mapped,
        meta: meta ?? { pagination: { page, pageSize, pageCount: Math.ceil(mapped.length / pageSize) || 1, total: mapped.length } }
      }

    })
}

/**
 * Función principal para obtener propiedades con filtros avanzados.
 * Soporta filtrado múltiple (OR dentro de la misma categoría, AND entre categorías distintas).
 * 
 * @param filter - Objeto con los criterios de filtrado
 * @returns Promise con la lista de propiedades y metadata de paginación
 */
export function getProperties(filter: getPropertiesFilter = {}): Promise<PropertyListResponse> {
  const currentLocale = getLocaleWithFallback(filter.locale)

  const page = typeof filter.page === 'number' && filter.page > 0 ? filter.page : 1
  const pageSize = typeof filter.pageSize === 'number' && filter.pageSize > 0 ? filter.pageSize : 9

  // Construcción de la query base: populamos todas las relaciones necesarias
  let queryString = 'properties?populate[main_image][fields][0]=url&populate[property_status][fields][0]=Title&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[amenities][fields][0]=Name&populate[amenities][fields][1]=slug&populate[location][fields][0]=name&populate[location][fields][1]=slug'

  // Agregar parámetro locale
  queryString += `&locale=${encodeURIComponent(currentLocale)}`

  // Agregar paginación
  queryString += `&pagination[page]=${encodeURIComponent(String(page))}&pagination[pageSize]=${encodeURIComponent(String(pageSize))}`

  // Contadores para agrupar filtros complejos en Strapi
  // AND se usa para combinar diferentes tipos de filtros (ej. Categoría Y Precio)
  // OR se usa dentro de un mismo tipo cuando hay múltiples selecciones (ej. Categoría A O Categoría B)
  let andIndex = 0;
  let categoryOrIndex = 0;
  let statusOrIndex = 0;
  let locationOrIndex = 0;
  let amenityOrIndex = 0;

  // 1. FILTRO DE CATEGORÍAS
  if (filter.categories && filter.categories.length > 0) {
    // Si hay múltiples categorías, usamos lógica OR entre ellas
    filter.categories.forEach((slug) => {
      queryString += `&filters[\$and][${andIndex}][\$or][${categoryOrIndex}][category][slug][\$eq]=${encodeURIComponent(slug)}`;
      categoryOrIndex++;
    });
    andIndex++;
  } else if (filter.categorySlug && filter.categorySlug.trim() !== '') {
    // Filtro simple por una sola categoría
    queryString += `&filters[category][slug][$contains]=${filter.categorySlug}`
  }

  // 2. FILTRO DE ESTADO (Venta/Renta)
  if (filter.statuses && filter.statuses.length > 0) {
    // Si hay múltiples estados, lógica OR entre ellos
    filter.statuses.forEach((status) => {
      queryString += `&filters[\$and][${andIndex}][\$or][${statusOrIndex}][property_status][Title][\$eq]=${encodeURIComponent(status)}`;
      statusOrIndex++;
    });
    andIndex++;
  } else if (filter.propertyStatus && filter.propertyStatus.trim() !== '') {
    // Filtro simple por un solo estado
    queryString += `&filters[property_status][Title][$eq]=${encodeURIComponent(filter.propertyStatus)}`
  }

  // 3. FILTROS NUMÉRICOS (Habitaciones, Baños, Precio)
  // 3. FILTROS NUMÉRICOS (Habitaciones, Baños, Precio) - AHORA CONSULTAN A LAS UNIDADES
  if (filter.bedrooms && filter.bedrooms.trim() !== '') {
    queryString += `&filters[units][bedrooms][$gte]=${encodeURIComponent(filter.bedrooms)}`
  }

  if (filter.bathrooms && filter.bathrooms.trim() !== '') {
    queryString += `&filters[units][bathrooms][$gte]=${encodeURIComponent(filter.bathrooms)}`
  }

  if (filter.min_price && filter.min_price.trim() !== '') {
    queryString += `&filters[units][price][$gte]=${encodeURIComponent(filter.min_price)}`
  }

  if (filter.max_price && filter.max_price.trim() !== '') {
    queryString += `&filters[units][price][$lte]=${encodeURIComponent(filter.max_price)}`
  }

  // 4. FILTRO DE UBICACIÓN
  if (filter.locations && filter.locations.length > 0) {
    // Múltiples ubicaciones: lógica OR
    filter.locations.forEach((slug) => {
      queryString += `&filters[\$and][${andIndex}][\$or][${locationOrIndex}][location][slug][\$eq]=${encodeURIComponent(slug)}`;
      locationOrIndex++;
    });
    andIndex++;
  } else if (filter.location && filter.location.trim() !== '') {
    // Búsqueda por nombre parcial
    queryString += `&filters[location][name][$containsi]=${encodeURIComponent(filter.location)}`
  }

  if (filter.locationSlug && filter.locationSlug.trim() !== '') {
    queryString += `&filters[location][slug][$eq]=${encodeURIComponent(filter.locationSlug)}`
  }

  // 5. FILTRO DE AMENIDADES
  if (filter.amenitiesArray && filter.amenitiesArray.length > 0) {
    // Múltiples amenidades: lógica OR (Trae propiedades que tengan AL MENOS UNA de las amenidades seleccionadas)
    filter.amenitiesArray.forEach((amenity) => {
      queryString += `&filters[\$and][${andIndex}][\$or][${amenityOrIndex}][amenities][Name][\$eq]=${encodeURIComponent(amenity)}`;
      amenityOrIndex++;
    });
    andIndex++;
  } else if (filter.amenities && filter.amenities.trim() !== '') {
    // Filtro simple por texto en amenidades
    queryString += `&filters[amenities][Name][$contains]=${encodeURIComponent(filter.amenities)}`
  }


  return query(`${queryString}`)
    .then(res => {
      const meta: StrapiMeta | undefined = res?.meta
      const items = Array.isArray(res?.data) ? res.data : []
      const page = typeof filter.page === 'number' && filter.page > 0 ? filter.page : 1
      const pageSize = typeof filter.pageSize === 'number' && filter.pageSize > 0 ? filter.pageSize : 9

      if (!res || !res.data) {
        return { data: [], meta: { pagination: { page, pageSize, pageCount: 1, total: 0 } } };
      }

      if (!Array.isArray(res.data)) {
        return { data: [], meta: { pagination: { page, pageSize, pageCount: 1, total: 0 } } };
      }

      if (res.data.length === 0) {
        return { data: [], meta: { pagination: { page, pageSize, pageCount: 1, total: 0 } } };
      }

      const mapped: MappedProperty[] = items.map((property: PropertyData) => {
        const {
          id,
          documentId,
          title,
          description,
          price,
          address,
          main_image: rawimage,
          highlight,
          slug,
          property_status,
          category,
          location,
          amenities,
          is_private,
          sold

        } = property

        const image = rawimage
          ? (rawimage.url.startsWith('http') ? rawimage.url : `${STRAPI_HOST}${rawimage.url}`)
          : ''
        const propertyStatus = property_status ? property_status.Title : ''

        return {
          id,
          documentId,
          title,
          description,
          price,
          address,
          image,
          highlight,
          slug,
          propertyStatus,
          category,
          location,
          is_private,
          sold,
          amenities: amenities || []
        }
      })


      // fallback si meta no viene
      const fallbackMeta: StrapiMeta = {
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(mapped.length / pageSize) || 1,
          total: mapped.length
        }
      }

      return {
        data: mapped,
        meta: meta ?? fallbackMeta
      }
    })
}

// Función para obtener una propiedad específica por documentId
/**
 * Busca una propiedad individual usando su ID de documento.
 * Popula todas las relaciones necesarias para la vista de detalle (galería, categoría, amenidades, etc).
 */
export function getPropertyByDocumentId(documentId: string, locale?: string) {
  const currentLocale = getLocaleWithFallback(locale)
  const queryString = `properties/${documentId}?populate[main_image][fields][0]=url&populate[gallery][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[property_status][fields][0]=Title&populate[location][fields][0]=name&populate[location][fields][1]=slug&populate[amenities][fields][0]=Name&populate[amenities][fields][1]=slug&locale=${encodeURIComponent(currentLocale)}`



  return query(queryString)
    .then(res => {
      if (!res.data) {
        return null
      }

      const property = res.data
      const {
        id,
        documentId: propDocumentId,
        title,
        description,
        price,
        address,
        bedrooms,
        bathrooms,
        parking_spaces,
        lot_area,
        built_area,
        main_image: rawMainImage,
        gallery: rawGallery,
        highlight,
        slug,
        property_status,
        category,
        location,
        is_new,
        is_private,
        sold
      } = property

      const main_image = rawMainImage
        ? (rawMainImage.url.startsWith('http') ? rawMainImage.url : `${STRAPI_HOST}${rawMainImage.url}`)
        : ''
      const gallery = rawGallery
        ? rawGallery.map((img: any) =>
          img.url.startsWith('http') ? img.url : `${STRAPI_HOST}${img.url}`
        )
        : []
      const propertyStatus = property_status ? property_status.Title : ''

      return {
        id,
        documentId: propDocumentId,
        title,
        description,
        price,
        address,
        bedrooms,
        bathrooms,
        parking_spaces,
        lot_area,
        built_area,
        main_image,
        gallery,
        highlight,
        slug,
        category,
        location,
        is_new,
        is_private,
        sold,
        propertyStatus,
      }
    })
}
