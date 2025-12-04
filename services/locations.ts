import { query } from './strapi';

export interface Location {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export async function getLocations(locale: string = 'en'): Promise<Location[]> {
  try {
    // La colección locations no está localizada, no usar locale
    const queryString = `locations?fields[0]=name&fields[1]=slug`;
    
    const response = await query(queryString);
    
    if (response && response.data && Array.isArray(response.data)) {
      return response.data.map((location: any) => ({
        id: location.id,
        documentId: location.documentId,
        name: location.name,
        slug: location.slug
      }));
    }
    
    return [];
  } catch (error) {
    // Error silencioso en producción - devolver array vacío
    return [];
  }
}
