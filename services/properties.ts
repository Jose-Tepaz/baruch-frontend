// services/properties.ts
import { stringify } from 'querystring'
import { query } from './strapi'
const { STRAPI_HOST } = process.env

interface PropertyStatus {
  id: number
  documentId: string
  Title: string
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
}




export type getPropertiesFilter = {
  categorySlug?: string
  propertyStatus?: string
  [key: string]: any
}

//URL que obiten todos los datos para la lista de propiedades
///properties?populate[main_image][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[property_status][fields][0]=Title&filters[category][slug][$contains]=apartaments 

// Función para obtener propiedades filtradas por categoría
export function getPropertiesByCategory(categorySlug: string, propertyStatus?: string) { //properties?populate[main_image][fields][0]=url&
  let qs = 'properties?populate[main_image][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[property_status][fields][0]=Title&pagination[limit]=100'

  if (categorySlug) {
    qs += `&filters[category][slug][$eq]=${encodeURIComponent(categorySlug)}`
  }

  if (propertyStatus) {
    qs += `&filters[property_status][Title][$eq]=${encodeURIComponent(propertyStatus)}`
  }

  console.log('=== getPropertiesByCategory Final Query ===');
  console.log('Query string:', qs);
  
  return query(`${qs}`)
    .then(res => {
      console.log('=== getPropertiesByCategory API Response ===');
      console.log('Response:', res);
      console.log('Data count:', res.data?.length || 0);
      
      if (!res.data || res.data.length === 0) {
        console.log('No properties found in getPropertiesByCategory response');
        return [];
      }
      
      return res.data.map((property: PropertyData) => {
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

        const image = rawimage ? `${STRAPI_HOST}${rawimage.url}` : ''
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
    })
}

export function getProperties( filter: getPropertiesFilter = {}) {

  let queryString = 'properties?populate=main_image&populate=property_status&populate=category&pagination[limit]=100'
  console.log('=== getProperties DEBUG ===');
  console.log('Filter:', filter);
  console.log('Initial queryString:', queryString);

  if (filter.categorySlug && filter.categorySlug.trim() !== '') {
    queryString += `&filters[category][slug][$contains]=${filter.categorySlug}`
    console.log('Added category filter:', filter.categorySlug);
  }

  if (filter.propertyStatus && filter.propertyStatus.trim() !== '') {
    queryString += `&filters[property_status][Title][$eq]=${encodeURIComponent(filter.propertyStatus)}`
    console.log('Added property status filter:', filter.propertyStatus);
  }
  
  console.log('Final queryString:', queryString);

  return query(`${queryString}`)
    .then(res => {
      console.log('=== getProperties API Response ===');
      console.log('Response:', res);
      console.log('Data count:', res.data?.length || 0);
      
      if (!res.data || res.data.length === 0) {
        console.log('No properties found in response');
        return [];
      }
      
      return res.data.map((property: PropertyData) => {
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
          category
        } = property

        const image = rawimage ? `${STRAPI_HOST}${rawimage.url}` : ''
        const propertyStatus = property_status ? property_status.Title : ''
        
        console.log('=== getProperties Property Mapping ===');
        console.log('Property title:', title);
        console.log('Property status:', propertyStatus);
        console.log('Category:', category);
        
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
          
        }
      })
      
    })
}



// Función para obtener una propiedad específica por documentId
export function getPropertyByDocumentId(documentId: string) {
  const queryString = `properties/${documentId}?populate=*`
  
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
        is_new
      } = property

      const main_image = rawMainImage ? `${STRAPI_HOST}${rawMainImage.url}` : ''
      const gallery = rawGallery ? rawGallery.map((img: any) => `${STRAPI_HOST}${img.url}`) : []
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
        propertyStatus,
      }
    })
}
