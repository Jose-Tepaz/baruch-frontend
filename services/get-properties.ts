import { query } from './strapi'

const { STRAPI_HOST } = process.env

export function getProperties(
    { categoryId }: 
    { categoryId: string }
) {
    return query(`properties?filters[category][slug][$contains]=${categoryId}&populate=main_image`)
    .then(res => {
        const { data, meta } = res
        const properties = data.map(property => {
        const {
            id,
            title,
            description,
            price,
            address,
            main_image: rawimage,
            slug,
            documentId,
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
            documentId,
            status,
            category
          }
        })

        return {
            properties,
            pagination: meta.pagination
        }
    })
}
