import { query } from './strapi'
import { getLocaleWithFallback } from '@/utils/get-current-locale'
const { STRAPI_HOST } = process.env

//http://localhost:1337/api/properties/tm87lmuqeg9bkros3zfm3e9m?populate=main_image&populate=gallery&populate=category

interface PropertyStatus {
    id: number
    documentId: string
    Title: string
  }

const getPropertyById = async (documentId: string, locale?: string) => {
    try {
        // Usar documentId en lugar de id y agregar populate=* para obtener todas las relaciones
        const currentLocale = getLocaleWithFallback(locale);
        const queryString = `properties/${documentId}?populate=main_image&populate=gallery&populate=category&populate=property_status&locale=${encodeURIComponent(currentLocale)}`;
        
        console.log('=== getPropertyById DEBUG ===');
        console.log('DocumentId:', documentId);
        console.log('Locale:', currentLocale);
        console.log('Query string:', queryString);
        
        const response = await query(queryString);
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
        const processedMainImage = main_image
            ? (main_image.url.startsWith('http') ? main_image.url : `${STRAPI_HOST}${main_image.url}`)
            : ''
        const processedGallery = gallery
            ? gallery.map((img: any) => img.url.startsWith('http') ? img.url : `${STRAPI_HOST}${img.url}`)
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