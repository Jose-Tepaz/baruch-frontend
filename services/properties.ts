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
