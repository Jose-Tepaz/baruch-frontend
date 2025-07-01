import SimpleLayout from "@/components/layout/SimpleLayout"
import { getProperties, getPropertiesByCategory } from "@/services/properties"
import InnerHeader from "@/components/layout/InnerHeader";
import { getCategories } from "@/services/categories";
import PropertiesContent from "@/components/pages/PropertiesContent";

interface PropertiesPageProps {
    searchParams: {
        category?: string;
        status?: string;
        keyword?: string;
        city?: string;
        state?: string;
        amenities?: string | string[];
    };
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
    const { category, status, keyword, city, state, amenities } = searchParams;
    
    // Obtener datos del servidor con manejo de errores
    let properties = [];
    let categories = [];
    
    try {
        // Obtener propiedades según el filtro
        if (category) {
            properties = await getPropertiesByCategory(category);
        } else {
            properties = await getProperties({ categorySlug: '' });
        }
        
        // Filtrar propiedades localmente por otros criterios si es necesario
        if (properties && (status || keyword || city || state || amenities)) {
            properties = properties.filter((property: any) => {
                // Filtrar por status
                if (status && property.status !== status) {
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
    
    console.log('Properties loaded:', properties?.length || 0, 'properties');
    console.log('Categories loaded:', categories?.length || 0, 'categories');
    console.log('Filter params:', { category, status, keyword, city, state, amenities });
    
    return (
        <SimpleLayout>
            <InnerHeader title="Our Properties" currentpage="Our Properties" />
            <div className="space30" />
            
            <PropertiesContent 
                initialProperties={properties}
                categories={categories}
                searchParams={searchParams}
            />
        </SimpleLayout>
    )
}

