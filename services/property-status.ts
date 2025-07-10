import { query } from './strapi'
import { checkStrapiConfig } from './config'

interface PropertyStatus {
  id: number
  documentId: string
  Title: string
}

export async function getPropertyStatuses(): Promise<PropertyStatus[]> {
  try {
    // Verificar configuración antes de hacer la llamada
    if (!checkStrapiConfig()) {
      throw new Error('Strapi configuration is missing. Please check your environment variables.');
    }

    console.log('Making request to: statuses?fields[0]=Title&fields[1]=id&fields[2]=documentId');
    const response = await query('statuses?fields[0]=Title&fields[1]=id&fields[2]=documentId')
    
    console.log('=== Property Statuses Response ===');
    console.log('Response:', response);
    console.log('Data:', response.data);
    console.log('Data length:', response.data?.length || 0);
    
    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid response format:', response);
      return [];
    }
    
    return response.data.map((status: any) => ({
      id: status.id,
      documentId: status.documentId,
      Title: status.Title
    }))
  } catch (error) {
    console.error('Error fetching property statuses:', error)
    throw error; // Re-throw para que el componente maneje el error
  }
} 