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
        const queryString = `properties/${documentId}?populate=main_image&populate=gallery&populate=category&populate=property_status&populate=location&populate=units&populate=units.floor&locale=${encodeURIComponent(currentLocale)}`;
        
       
        
        const response = await query(queryString);
       
        
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
            highlight,
            property_status,
            location,
            units,
            estimated_completion,
        } = property
        
      
        
        // Procesar las imágenes
        const processedMainImage = main_image
            ? (main_image.url.startsWith('http') ? main_image.url : `${STRAPI_HOST}${main_image.url}`)
            : ''
        const processedGallery = gallery
            ? gallery.map((img: any) => img.url.startsWith('http') ? img.url : `${STRAPI_HOST}${img.url}`)
            : []
        const propertyStatus = property_status ? property_status.Title : ''
        
        // Procesar las unidades
        const processedUnits = units ? units.map((unit: any) => ({
            id: unit.id,
            housing_number: unit.housing_number,
            bedrooms: unit.bedrooms,
            bathrooms: unit.bathrooms,  
            built_area: unit.built_area,
            exterior_area: unit.exterior_area,
            storage_room: unit.storage_room,
            garage: unit.garage,
            price: unit.price,
            is_available: unit.is_available,
            floor: unit.floor ? {
                id: unit.floor.id,
                documentId: unit.floor.documentId,
                name: unit.floor.name,
                url: unit.floor.url.startsWith('http') ? unit.floor.url : `${STRAPI_HOST}${unit.floor.url}`,
                ext: unit.floor.ext,
                mime: unit.floor.mime,
                size: unit.floor.size
            } : null
        })) : []
        
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
            highlight,
            main_image: processedMainImage,
            gallery: processedGallery,
            slug,
            category,
            location,
            is_new,
            Map_link,
            propertyStatus,
            units: processedUnits,
            estimated_completion,
        }
        
    } catch (error) {
        // Error silencioso en producción - devolver null
        return null
    }
}

const getPropertyBySlug = async (slug: string, locale?: string) => {
    try {
        const currentLocale = getLocaleWithFallback(locale);
        const queryString = `properties?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=main_image&populate=gallery&populate=category&populate=property_status&populate=location&populate=units&populate=units.floor&locale=${encodeURIComponent(currentLocale)}`;
        
        const response = await query(queryString);
        
        if (!response.data || response.data.length === 0) {
            return null
        }
        
        // Tomar el primer resultado ya que el slug es único
        const property = response.data[0]

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
            slug: propSlug,
            category,
            is_new,
            Map_link,
            highlight,
            property_status,
            location,
            units,
            estimated_completion,
        } = property
        
        // Procesar las imágenes
        const processedMainImage = main_image
            ? (main_image.url.startsWith('http') ? main_image.url : `${STRAPI_HOST}${main_image.url}`)
            : ''
        const processedGallery = gallery
            ? gallery.map((img: any) => img.url.startsWith('http') ? img.url : `${STRAPI_HOST}${img.url}`)
            : []
        const propertyStatus = property_status ? property_status.Title : ''
        
        // Procesar las unidades
        const processedUnits = units ? units.map((unit: any) => ({
            id: unit.id,
            housing_number: unit.housing_number,
            bedrooms: unit.bedrooms,
            bathrooms: unit.bathrooms,  
            built_area: unit.built_area,
            exterior_area: unit.exterior_area,
            storage_room: unit.storage_room,
            garage: unit.garage,
            price: unit.price,
            is_available: unit.is_available,
            floor: unit.floor ? {
                id: unit.floor.id,
                documentId: unit.floor.documentId,
                name: unit.floor.name,
                url: unit.floor.url.startsWith('http') ? unit.floor.url : `${STRAPI_HOST}${unit.floor.url}`,
                ext: unit.floor.ext,
                mime: unit.floor.mime,
                size: unit.floor.size
            } : null
        })) : []
        
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
            highlight,
            main_image: processedMainImage,
            gallery: processedGallery,
            slug: propSlug,
            category,
            location,
            is_new,
            Map_link,
            propertyStatus,
            units: processedUnits,
            estimated_completion,
        }
        
    } catch (error) {
        // Error silencioso en producción - devolver null
        return null
    }
}

export default getPropertyById
export { getPropertyBySlug }