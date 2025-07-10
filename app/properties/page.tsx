import SimpleLayout from "@/components/layout/SimpleLayout"
import { getProperties, getPropertiesByCategory } from "@/services/properties"
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
        // Obtener propiedades según el filtro
        if (category) {
            properties = await getPropertiesByCategory(category, property_status);
        } else {
            // Solo pasar los filtros que tienen valor
            const filters: any = {};
            if (property_status && property_status.trim() !== '') {
                filters.propertyStatus = property_status;
            }
            
            console.log('=== Properties Page DEBUG ===');
            console.log('Search params:', searchParams);
            console.log('Filters to pass:', filters);
            
            properties = await getProperties(filters);
        }
        
        // Filtrar propiedades localmente por otros criterios si es necesario
        if (properties && (property_status || keyword || city || state || amenities)) {
            properties = properties.filter((property: any) => {
                // Filtrar por property_status
                if (property_status && property.propertyStatus !== property_status) {
                    return false;
                }
                
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
                if (city && property.city !== city) {
                    return false;
                }
                
                // Filtrar por state
                if (state && property.state !== state) {
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
    } catch (error) {
        console.error('Error loading properties:', error);
        properties = [];
    }
    
    try {
        categories = await getCategories();
    } catch (error) {
        console.error('Error loading categories:', error);
        categories = [];
    }

    try {
        propertyStatuses = await getPropertyStatuses();
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

