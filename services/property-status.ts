import { query } from './strapi'
import { checkStrapiConfig } from './config'
import { getLocaleWithFallback } from '@/utils/get-current-locale'

interface PropertyStatus {
  id: number
  documentId: string
  Title: string
}

export async function getPropertyStatuses(locale?: string): Promise<PropertyStatus[]> {
  try {
    // Verificar configuración antes de hacer la llamada
    if (!checkStrapiConfig()) {
      throw new Error('Strapi configuration is missing. Please check your environment variables.');
    }

    const currentLocale = getLocaleWithFallback(locale);
    const queryString = `statuses?fields[0]=Title&fields[1]=id&fields[2]=documentId&locale=${encodeURIComponent(currentLocale)}`;
    
    const response = await query(queryString)
    
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    
    return response.data.map((status: any) => ({
      id: status.id,
      documentId: status.documentId,
      Title: status.Title
    }))
  } catch (error) {
    // Error silencioso en producción - devolver array vacío
    return [];
  }
} 