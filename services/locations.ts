import { query } from './strapi';

export interface Location {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export async function getLocations(locale: string = 'en'): Promise<Location[]> {
  try {
    console.log('=== getLocations DEBUG ===');
    console.log('Locale:', locale);
    
    // La colección locations no está localizada, no usar locale
    const queryString = `locations?fields[0]=name&fields[1]=slug`;
    console.log('Query string:', queryString);
    
    const response = await query(queryString);
    console.log('Raw response:', response);
    
    if (response && response.data && Array.isArray(response.data)) {
      console.log('Locations API Response:', response.data);
      console.log('Locations count:', response.data.length);
      return response.data.map((location: any) => ({
        id: location.id,
        documentId: location.documentId,
        name: location.name,
        slug: location.slug
      }));
    }
    
    console.log('No locations found or invalid response structure:', response);
    console.log('Response type:', typeof response);
    console.log('Response.data:', response?.data);
    console.log('Response.data type:', typeof response?.data);
    console.log('Is array:', Array.isArray(response?.data));
    
    return [];
  } catch (error) {
    console.error('Error in getLocations:', error);
    return [];
  }
}
