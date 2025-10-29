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

interface Location {
  id: number
  documentId: string
  name: string
  slug: string
}
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
}

// Función para verificar si el usuario está autenticado (lado servidor)
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

export type getPropertiesFilter = {
  categorySlug?: string
  categories?: string[]
  propertyStatus?: string
  statuses?: string[]
  bedrooms?: string
  bathrooms?: string
  min_price?: string
  max_price?: string
  location?: string
  locations?: string[]
  locationSlug?: string
  amenities?: string
  amenitiesArray?: string[]
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
          highlight,
          slug,
          property_status,
          category,
          location,
          type,
          city,
          state,
          amenities
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
          amenities: amenities || []
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
  let queryString = 'properties?populate[main_image][fields][0]=url&populate[property_status][fields][0]=Title&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[amenities][fields][0]=Name&populate[amenities][fields][1]=slug&populate[location][fields][0]=name&populate[location][fields][1]=slug'

  // Agregar parámetro locale
  queryString += `&locale=${encodeURIComponent(currentLocale)}`

  // paginación
  queryString += `&pagination[page]=${encodeURIComponent(String(page))}&pagination[pageSize]=${encodeURIComponent(String(pageSize))}`


  // Aplicar filtro de categoría solo si no hay múltiples categorías seleccionadas
  if (filter.categories && filter.categories.length > 0) {
    // Para múltiples categorías, usar $or para cada categoría
    filter.categories.forEach((slug, index) => {
      queryString += `&filters[\$or][${index}][category][slug][\$eq]=${encodeURIComponent(slug)}`;
    });
    console.log('Added multiple categories filter:', filter.categories);
  } else if (filter.categorySlug && filter.categorySlug.trim() !== '') {
    // Solo aplicar filtro de texto si no hay múltiples categorías
    queryString += `&filters[category][slug][$contains]=${filter.categorySlug}`
    console.log('Added category filter:', filter.categorySlug);
  }

  // Aplicar filtro de status solo si no hay múltiples status seleccionados
  if (filter.statuses && filter.statuses.length > 0) {
    // Para múltiples status, usar $or para cada status
    filter.statuses.forEach((status, index) => {
      queryString += `&filters[\$or][${index}][property_status][Title][\$eq]=${encodeURIComponent(status)}`;
    });
    console.log('Added multiple statuses filter:', filter.statuses);
  } else if (filter.propertyStatus && filter.propertyStatus.trim() !== '') {
    // Solo aplicar filtro de texto si no hay múltiples status
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

  // Aplicar filtro de location solo si no hay múltiples locations seleccionadas
  if (filter.locations && filter.locations.length > 0) {
    // Para múltiples locations, usar $or para cada location
    filter.locations.forEach((slug, index) => {
      queryString += `&filters[\$or][${index}][location][slug][\$eq]=${encodeURIComponent(slug)}`;
    });
    console.log('Added multiple locations filter:', filter.locations);
  } else if (filter.location && filter.location.trim() !== '') {
    // Solo aplicar filtro de texto si no hay múltiples locations
    queryString += `&filters[location][name][$containsi]=${encodeURIComponent(filter.location)}`
    console.log('Added location filter:', filter.location);
  }

  if (filter.locationSlug && filter.locationSlug.trim() !== '') {
    queryString += `&filters[location][slug][$eq]=${encodeURIComponent(filter.locationSlug)}`
    console.log('Added location slug filter:', filter.locationSlug);
  }

  // Aplicar filtro de amenities solo si no hay múltiples amenities seleccionadas
  if (filter.amenitiesArray && filter.amenitiesArray.length > 0) {
    // Para múltiples amenities, usar $or para cada amenity
    filter.amenitiesArray.forEach((amenity, index) => {
      queryString += `&filters[\$or][${index}][amenities][Name][\$eq]=${encodeURIComponent(amenity)}`;
    });
    console.log('Added multiple amenities filter:', filter.amenitiesArray);
  } else if (filter.amenities && filter.amenities.trim() !== '') {
    // Solo aplicar filtro de texto si no hay múltiples amenities
    queryString += `&filters[amenities][Name][$contains]=${encodeURIComponent(filter.amenities)}`
    console.log('Added amenities filter:', filter.amenities);
    console.log('Full query string with amenities:', queryString);
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
          highlight,
          slug,
          property_status,
          category,
          location,
          amenities,
          is_private

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
          console.log('Location:', location);
          console.log('Amenities:', amenities);
          console.log('Is Private:', is_private);
        }

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
        highlight,
        slug,
        category,
        location,
        is_new,
        is_private,
        propertyStatus,
      }
    })
}
