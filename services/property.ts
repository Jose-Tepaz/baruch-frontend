import { query } from './strapi'
const { STRAPI_HOST } = process.env

//http://localhost:1337/api/properties/tm87lmuqeg9bkros3zfm3e9m?populate=main_image&populate=gallery&populate=category

interface PropertyStatus {
    id: number
    documentId: string
    Title: string
  }

const getPropertyById = async (documentId: string) => {
    try {
        // Usar documentId en lugar de id y agregar populate=* para obtener todas las relaciones
        const response = await query(`properties/${documentId}?populate=main_image&populate=gallery&populate=category&populate=property_status`)
        console.log(response.data);
        if (!response.data) {
            return null
        }
        
        const property = response.data

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
            main_image,
            gallery,
            slug,
            category,
            is_new,
            Map_link,
            property_status,
        } = property
        
        // Procesar las imágenes
        const processedMainImage = main_image ? `${STRAPI_HOST}${main_image.url}` : ''
        const processedGallery = gallery ? gallery.map((img: any) => `${STRAPI_HOST}${img.url}`) : []
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
            main_image: processedMainImage,
            gallery: processedGallery,
            slug,
            category,
            is_new,
            Map_link,
            propertyStatus
        }
        
    } catch (error) {
        console.error('Error al obtener la propiedad:', error)
        return null
    }
    
}

export default getPropertyById