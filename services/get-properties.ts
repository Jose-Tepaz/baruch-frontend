import { query } from './strapi'

const { STRAPI_HOST } = process.env

interface PropertyStatus {
  id: number
  documentId: string
  Title: string
}

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
}

export function getProperties(
    { categoryId }: 
    { categoryId: string }
) {
    return query(`properties?filters[category][slug][$contains]=${categoryId}&populate=main_image&populate=property_status`)
    .then(res => {
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
            category
          } = property

          const image = rawimage ? `${STRAPI_HOST}${rawimage.url}` : ''
          const propertyStatus = property_status?.Title || ''
          
          console.log('=== get-properties.ts DEBUG ===');
          console.log('Property title:', title);
          console.log('Raw property_status:', property_status);
          console.log('Extracted propertyStatus:', propertyStatus);

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
            category
          }
        })

        return {
            properties,
            pagination: meta.pagination
        }
    })
}
