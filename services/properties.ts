// services/properties.ts
import { stringify } from 'querystring'
import { query } from './strapi'
const { STRAPI_HOST } = process.env

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
  status: string
  category: any
  type?: string
  city?: string
  state?: string
  amenities?: string[]
}

export type getPropertiesFilter = {
  categorySlug?: string
  [key: string]: any
}

// Función para obtener propiedades filtradas por categoría
export function getPropertiesByCategory(categorySlug: string) {
  let qs = 'properties?populate=main_image'

  if (categorySlug) {
    qs += `&filters[category][slug][$eq]=${encodeURIComponent(categorySlug)}`
  }

  return query(`properties?populate=main_image&${qs}`)
    .then(res => {
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
          status,
          category,
          type,
          city,
          state,
          amenities
        } = property

        const image = rawimage ? `${STRAPI_HOST}${rawimage.url}` : ''

        return {
          id,
          documentId,
          title,
          description,
          price,
          address,
          image,
          slug,
          status,
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

  let queryString = 'properties?populate=main_image'

  if (filter.categorySlug) {
    queryString += `&filters[category][slug][$contains]=${filter.categorySlug}`
  }

  return query(`${queryString}`)
    .then(res => {
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
          status,
          category
        } = property

        const image = rawimage ? `${STRAPI_HOST}${rawimage.url}` : ''

        return {
          id,
          documentId,
          title,
          description,
          price,
          address,
          image,
          slug,
          status,
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
        category,
        is_new
      } = property

      const main_image = rawMainImage ? `${STRAPI_HOST}${rawMainImage.url}` : ''
      const gallery = rawGallery ? rawGallery.map((img: any) => `${STRAPI_HOST}${img.url}`) : []

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
        is_new
      }
    })
}
