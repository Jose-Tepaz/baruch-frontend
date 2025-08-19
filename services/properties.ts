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
interface PropertyStatus {
  id: number
  documentId: string
  Title: string
}
export interface MappedProperty {
  id: number
  documentId: string
  title: string
  description: string
  price: number
  address: string
  image: string
  slug: string
  propertyStatus: string
  category: any
  location: string
}

export interface PropertyListResponse {
  data: MappedProperty[]
  meta: StrapiMeta
}

// Definir la interfaz para la propiedad
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
  type?: string
  city?: string
  state?: string
  amenities?: string[]
  is_private?: boolean
  location: string
}

export type getPropertiesFilter = {
  categorySlug?: string
  propertyStatus?: string
  bedrooms?: string
  bathrooms?: string
  min_price?: string
  max_price?: string
  location?: string
  locale?: string
  page?: number
  pageSize?: number
  [key: string]: any
}

//URL que obiten todos los datos para la lista de propiedades
///properties?populate[main_image][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[property_status][fields][0]=Title&filters[category][slug][$contains]=apartaments 

// Función para obtener propiedades filtradas por categoría
export function getPropertiesByCategory(
  categorySlug: string,
  propertyStatus?: string,
  locale?: string,
  page: number = 1,
  pageSize: number = 9) {
  const currentLocale = getLocaleWithFallback(locale)
  let qs = 'properties?populate[main_image][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[property_status][fields][0]=Title&pagination[limit]=100'

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

  console.log('=== getPropertiesByCategory Final Query ===');
  console.log('Query string:', qs);
  console.log('Locale:', currentLocale);

  return query(`${qs}`)
    .then(res => {
      console.log('=== getPropertiesByCategory API Response ===');
      console.log('Response:', res);
      console.log('Data count:', res.data?.length || 0);

      if (!res.data || res.data.length === 0) {
        console.log('No properties found in getPropertiesByCategory response');
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
          slug,
          property_status,
          category,
          type,
          city,
          state,
          amenities
        } = property

        const image = rawimage
          ? (rawimage.url.startsWith('http') ? rawimage.url : `${STRAPI_HOST}${rawimage.url}`)
          : ''
        const propertyStatus = property_status ? property_status.Title : ''

        console.log('=== getPropertiesByCategory DEBUG ===');
        console.log('Property title:', title);
        console.log('Raw property_status:', property_status);
        console.log('Extracted propertyStatus:', propertyStatus);

        return {
          id,
          documentId,
          title,
          description,
          price,
          address,
          image,
          slug,
          propertyStatus,
          category,
          type,
          city,
          state,
          amenities
        }
      })
      return {
        data: mapped,
        meta: meta ?? { pagination: { page, pageSize, pageCount: Math.ceil(mapped.length / pageSize) || 1, total: mapped.length } }
      }
      
    })
}

export function getProperties(filter: getPropertiesFilter = {}): Promise<PropertyListResponse> {
  const currentLocale = getLocaleWithFallback(filter.locale)

  const page = typeof filter.page === 'number' && filter.page > 0 ? filter.page : 1
  const pageSize = typeof filter.pageSize === 'number' && filter.pageSize > 0 ? filter.pageSize : 9

  // Arreglar la query para populizar correctamente los campos
  let queryString = 'properties?populate[main_image][fields][0]=url&populate[property_status][fields][0]=Title&populate[category][fields][0]=name&populate[category][fields][1]=slug'

  // Agregar parámetro locale
  queryString += `&locale=${encodeURIComponent(currentLocale)}`

  // paginación
  queryString += `&pagination[page]=${encodeURIComponent(String(page))}&pagination[pageSize]=${encodeURIComponent(String(pageSize))}`


  if (filter.categorySlug && filter.categorySlug.trim() !== '') {
    queryString += `&filters[category][slug][$contains]=${filter.categorySlug}`
    console.log('Added category filter:', filter.categorySlug);
  }

  if (filter.propertyStatus && filter.propertyStatus.trim() !== '') {
    queryString += `&filters[property_status][Title][$eq]=${encodeURIComponent(filter.propertyStatus)}`
    console.log('Added property status filter:', filter.propertyStatus);
  }

  if (filter.bedrooms && filter.bedrooms.trim() !== '') {
    queryString += `&filters[bedrooms][$gte]=${encodeURIComponent(filter.bedrooms)}`
    console.log('Added bedrooms filter:', filter.bedrooms);
  }

  if (filter.bathrooms && filter.bathrooms.trim() !== '') {
    queryString += `&filters[bathrooms][$gte]=${encodeURIComponent(filter.bathrooms)}`
    console.log('Added bathrooms filter:', filter.bathrooms);
  }

  if (filter.min_price && filter.min_price.trim() !== '') {
    queryString += `&filters[price][$gte]=${encodeURIComponent(filter.min_price)}`
    console.log('Added min price filter:', filter.min_price);
  }

  if (filter.max_price && filter.max_price.trim() !== '') {
    queryString += `&filters[price][$lte]=${encodeURIComponent(filter.max_price)}`
    console.log('Added max price filter:', filter.max_price);
  }

  if (filter.location && filter.location.trim() !== '') {
    queryString += `&filters[location][$containsi]=${encodeURIComponent(filter.location)}`
    console.log('Added location filter:', filter.location);
  }


  return query(`${queryString}`)
    .then(res => {
      if (process.env.NODE_ENV === 'development') {
        console.log('=== getProperties API Response ===');
        console.log('Data count:', res.data?.length || 0);
        console.log('Sample property:', res.data?.[0]);
      }

      const meta: StrapiMeta | undefined = res?.meta
      const items = Array.isArray(res?.data) ? res.data : []
      const page = typeof filter.page === 'number' && filter.page > 0 ? filter.page : 1
      const pageSize = typeof filter.pageSize === 'number' && filter.pageSize > 0 ? filter.pageSize : 9

      if (!res || !res.data) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Invalid response structure:', res);
        }
        return { data: [], meta: { pagination: { page, pageSize, pageCount: 1, total: 0 } } };
      }

      if (!Array.isArray(res.data)) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Response data is not an array:', res.data);
        }
        return { data: [], meta: { pagination: { page, pageSize, pageCount: 1, total: 0 } } };
      }

      if (res.data.length === 0) {
        if (process.env.NODE_ENV === 'development') {
          console.log('No properties found in response');
        }
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
          slug,
          property_status,
          category,
          location

        } = property

        const image = rawimage
          ? (rawimage.url.startsWith('http') ? rawimage.url : `${STRAPI_HOST}${rawimage.url}`)
          : ''
        const propertyStatus = property_status ? property_status.Title : ''

        if (process.env.NODE_ENV === 'development') {
          console.log('=== getProperties Property Mapping ===');
          console.log('Property title:', title);
          console.log('Property status:', propertyStatus);
          console.log('Category:', category);
        }

        return {
          id,
          documentId,
          title,
          description,
          price,
          address,
          image,
          slug,
          propertyStatus,
          category,
          location
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
export function getPropertyByDocumentId(documentId: string, locale?: string) {
  const currentLocale = getLocaleWithFallback(locale)
  const queryString = `properties/${documentId}?populate=*&locale=${encodeURIComponent(currentLocale)}`



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
        slug,
        property_status,
        category,
        is_new,
        is_private
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
        slug,
        category,
        is_new,
        is_private,
        propertyStatus,
      }
    })
}
