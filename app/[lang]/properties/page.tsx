import SimpleLayout from "@/components/layout/SimpleLayout"
import { getProperties } from "@/services/get-properties"
import InnerHeader from "@/components/layout/InnerHeader";
import { getCategories } from "@/services/categories";
import { getPropertyStatuses } from "@/services/property-status";
import PropertiesContent from "@/components/pages/PropertiesContent";

interface PropertiesPageProps {
    searchParams: {
        category?: string;
        property_status?: string;
        keyword?: string;
        city?: string;
        state?: string;
        amenities?: string | string[];
    };
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
    const { category, property_status, keyword, city, state, amenities } = searchParams;
    
    // Obtener datos del servidor con manejo de errores
    let properties = [];
    let categories = [];
    let propertyStatuses: any[] = [];
    
    try {
        // Obtener propiedades según el filtro usando el servicio get-properties
        console.log('=== Properties Page DEBUG ===');
        console.log('Search params:', searchParams);
        console.log('Category filter:', category);
        console.log('Property status filter:', property_status);
        
        const result = await getProperties({ 
            categoryId: category, 
            locale: 'en' // Idioma por defecto del servidor
        });
        
        properties = result?.properties || [];
        
        // Filtrar por property_status si está presente
        if (property_status && property_status.trim() !== '') {
            properties = properties.filter((property: any) => {
                return property.propertyStatus === property_status;
            });
            console.log('Properties after status filter:', properties.length);
        }
        
        // Filtrar propiedades localmente por otros criterios si es necesario
        if (properties && (keyword || city || state || amenities)) {
            properties = properties.filter((property: any) => {
                // Filtrar por keyword (en título o descripción)
                if (keyword) {
                    const searchTerm = keyword.toLowerCase();
                    const title = property.title?.toLowerCase() || '';
                    const description = property.description?.toLowerCase() || '';
                    if (!title.includes(searchTerm) && !description.includes(searchTerm)) {
                        return false;
                    }
                }
                
                // Filtrar por city
                if (city && !property.address?.toLowerCase().includes(city.toLowerCase())) {
                    return false;
                }
                
                // Filtrar por state
                if (state && !property.address?.toLowerCase().includes(state.toLowerCase())) {
                    return false;
                }
                
                // Filtrar por amenities
                if (amenities) {
                    const amenityArray = Array.isArray(amenities) ? amenities : [amenities];
                    if (amenityArray.length > 0) {
                        const propertyAmenities = property.amenities || [];
                        const hasAllAmenities = amenityArray.every(amenity => 
                            propertyAmenities.includes(amenity)
                        );
                        if (!hasAllAmenities) {
                            return false;
                        }
                    }
                }
                
                return true;
            });
        }
        
        console.log('Final properties count:', properties.length);
        
    } catch (error) {
        console.error('Error loading properties:', error);
        properties = [];
    }
    
    try {
        categories = await getCategories('en');
    } catch (error) {
        console.error('Error loading categories:', error);
        categories = [];
    }

    try {
        propertyStatuses = await getPropertyStatuses('en');
    } catch (error) {
        console.error('Error loading property statuses:', error);
        propertyStatuses = [];
    }
    
    return (
        <SimpleLayout>
            <InnerHeader title="Our Properties" currentpage="Our Properties" />
            <div className="space30" />
            
            <PropertiesContent 
                initialProperties={properties}
                categories={categories}
                propertyStatuses={propertyStatuses}
                searchParams={searchParams}
            />
        </SimpleLayout>
    )
}

