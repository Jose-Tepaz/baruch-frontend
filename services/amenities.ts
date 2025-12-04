import { query } from "./strapi";
import { checkStrapiConfig } from "./config";
import { getLocaleWithFallback } from '@/utils/get-current-locale';

// Definir la interfaz para Amenity basada en la estructura de Strapi
interface Amenity {
    id: number;
    documentId: string;
    Name: string;
    slug: string;
}

export async function getAmenities(locale?: string): Promise<Amenity[]> {
    try {
        // Verificar configuración antes de hacer la llamada
        if (!checkStrapiConfig()) {
            throw new Error('Strapi configuration is missing. Please check your environment variables.');
        }

        const currentLocale = getLocaleWithFallback(locale);
        const queryString = `amenities?fields[0]=Name&fields[1]=slug&locale=${encodeURIComponent(currentLocale)}`;
        
        const response = await query(queryString);
        
        if (!response.data || !Array.isArray(response.data)) {
            return [];
        }
        
        return response.data.map((amenity: any) => ({
            id: amenity.id,
            documentId: amenity.documentId,
            Name: amenity.Name,
            slug: amenity.slug
        }));
    } catch (error) {
        // Error silencioso en producción - devolver array vacío
        return [];
    }
}
