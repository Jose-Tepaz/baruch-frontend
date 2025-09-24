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
        
        console.log('=== getAmenities DEBUG ===');
        console.log('Locale:', currentLocale);
        console.log('Making request to:', queryString);
        
        const response = await query(queryString);
        
        console.log('=== Amenities Response ===');
        console.log('Response:', response);
        console.log('Data:', response.data);
        console.log('Data length:', response.data?.length || 0);
        
        if (!response.data || !Array.isArray(response.data)) {
            console.error('Invalid response format:', response);
            return [];
        }
        
        return response.data.map((amenity: any) => ({
            id: amenity.id,
            documentId: amenity.documentId,
            Name: amenity.Name,
            slug: amenity.slug
        }));
    } catch (error) {
        console.error('Error fetching amenities:', error);
        throw error; // Re-throw para que el componente maneje el error
    }
}
