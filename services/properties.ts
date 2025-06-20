// services/properties.ts
import { query } from './strapi'
const { STRAPI_HOST } = process.env

export function getProperties() {
  return query('properties?populate=main_image')
    .then(res => {
      return res.data.map(property => {
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
          category
        }
      })
    })
}
