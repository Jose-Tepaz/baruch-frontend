import SimpleLayout from "@/components/layout/SimpleLayout"
import { getProperties } from "@/services/properties"
import InnerHeader from "@/components/layout/InnerHeader";
import { getCategories } from "@/services/categories";
import { getPropertyStatuses } from "@/services/property-status";
import { getAmenities } from "@/services/amenities";
import { getLocations } from "@/services/locations";
import PropertiesContent from "@/components/pages/PropertiesContent";
import { Metadata } from 'next';
import { cookies } from 'next/headers';

interface PropertiesPageProps {
    params: Promise<{
        lang: string;
    }>;
    searchParams: Promise<{
        category?: string;
        property_status?: string;
        bedrooms?: string;
        bathrooms?: string;
        min_price?: string;
        max_price?: string;
        location?: string;
        keyword?: string;
        city?: string;
        state?: string;
        amenities?: string | string[];
        page?: string;
    }>;
}

export async function generateMetadata({ params }: PropertiesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const titles = {
    en: 'Properties - Baruch Real Estate',
    es: 'Propiedades - Baruch Bienes Raíces',
    fr: 'Propriétés - Baruch Immobilier',
    de: 'Immobilien - Baruch Immobilien',
    it: 'Proprietà - Baruch Immobiliare',
    pt: 'Propriedades - Baruch Imobiliária'
  };

  const descriptions = {
    en: 'Browse our extensive collection of properties. Find houses, apartments, and commercial properties that match your needs.',
    es: 'Explora nuestra extensa colección de propiedades. Encuentra casas, apartamentos y propiedades comerciales que se adapten a tus necesidades.',
    fr: 'Parcourez notre vaste collection de propriétés. Trouvez maisons, appartements et propriétés commerciales qui correspondent à vos besoins.',
    de: 'Durchsuchen Sie unsere umfangreiche Immobiliensammlung. Finden Sie Häuser, Wohnungen und Gewerbeimmobilien, die Ihren Bedürfnissen entsprechen.',
    it: 'Sfoglia la nostra vasta collezione di proprietà. Trova case, appartamenti e proprietà commerciali che si adattano alle tue esigenze.',
    pt: 'Navegue pela nossa extensa coleção de propriedades. Encontre casas, apartamentos e propriedades comerciais que atendam às suas necessidades.'
  };

  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
    keywords: 'properties, real estate, houses, apartments, commercial properties, Baruch',
    openGraph: {
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      type: 'website',
      locale: lang,
      url: `https://baruch.com/${lang}/properties`,
      siteName: 'Baruch Real Estate',
    },
    alternates: {
      canonical: `https://baruch.com/${lang}/properties`,
      languages: {
        'en': '/en/properties',
        'es': '/es/properties',
        'fr': '/fr/properties',
        'de': '/de/properties',
        'it': '/it/properties',
        'pt': '/pt/properties'
      }
    }
  };
}

export default async function PropertiesPage({ params, searchParams }: PropertiesPageProps) {
    const { lang } = await params;
    const { category, property_status, bedrooms, bathrooms, min_price, max_price, location, keyword, city, state, amenities: searchAmenities } = await searchParams;
    
    // Parse parameters to handle multiple selections
    const locationParam = location;
    const locationSlugs = locationParam ? locationParam.split(',').map(loc => loc.trim()).filter(Boolean) : [];
    
    const categoryParam = category;
    const categorySlugs = categoryParam ? categoryParam.split(',').map(cat => cat.trim()).filter(Boolean) : [];
    
    const statusParam = property_status;
    const statusTitles = statusParam ? statusParam.split(',').map(status => status.trim()).filter(Boolean) : [];
    
    const amenitiesParam = Array.isArray(searchAmenities) ? searchAmenities[0] : searchAmenities;
    const amenitiesArray = amenitiesParam ? amenitiesParam.split(',').map(amenity => amenity.trim()).filter(Boolean) : [];
    const sp = await searchParams;
    
    // Verificar autenticación del usuario
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token')?.value;
    const isAuthenticated = !!authToken;
    
    // Obtener datos del servidor con manejo de errores
    let categories = [];
    let properties: any[] = [];
    let propertyStatuses: any[] = [];
    const currentPage = sp.page ? Math.max(1, Number(sp.page)) : 1;
    let pagination = { page: 1, pageSize: 9, pageCount: 0, total: 0 };
    try {
       
        
        const { data, meta } = await getProperties({
            categorySlug: category, // Mantener para compatibilidad
            categories: categorySlugs, // Array de slugs para filtrado múltiple
            propertyStatus: property_status, // Mantener para compatibilidad
            statuses: statusTitles, // Array de títulos para filtrado múltiple
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            min_price: min_price,
            max_price: max_price,
            location: location, // Mantener para compatibilidad con filtros de texto
            locations: locationSlugs, // Array de slugs para filtrado múltiple
            amenities: Array.isArray(searchAmenities) ? searchAmenities[0] : searchAmenities, // Mantener para compatibilidad
            amenitiesArray: amenitiesArray, // Array de nombres para filtrado múltiple
            locale: lang, // Usar el locale dinámico
            page: currentPage, 
            pageSize: 9  
        });
        properties = data;
        pagination = meta.pagination;
        
        // Filtrar propiedades privadas si el usuario no está autenticado
        if (!isAuthenticated && properties) {
            properties = properties.filter((property: any) => {
                // Solo mostrar propiedades que NO sean privadas o que is_private sea undefined/null/false
                return !property.is_private;
            });
            console.log(`Filtered ${data.length - properties.length} private properties (user not authenticated)`);
        }
        
        // Filtrar propiedades localmente por otros criterios si es necesario
        if (properties && (keyword || city || state || searchAmenities)) {
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
                
                // Filtrar por amenities (OR)
                if (searchAmenities) {
                    const amenityArray = Array.isArray(searchAmenities) ? searchAmenities : [searchAmenities];
                    if (amenityArray.length > 0) {
                        const propertyAmenities = property.amenities || [];
                        const propertyAmenityNames = propertyAmenities.map((amenity: any) => amenity.Name);
                        const hasAnyAmenity = amenityArray.some(amenity => 
                            propertyAmenityNames.includes(amenity)
                        );
                        console.log('=== Amenities Filter Debug ===');
                        console.log('Search amenities:', amenityArray);
                        console.log('Property amenities:', propertyAmenities);
                        console.log('Property amenity names:', propertyAmenityNames);
                        console.log('Has any amenity:', hasAnyAmenity);
                        if (!hasAnyAmenity) {
                            return false;
                        }
                    }
                }
                
                return true;
            });
        }
        

        
    } catch (error) {
     
        properties = [];
    }
    
    try {
        categories = await getCategories(lang); // Usar el locale dinámico
    } catch (error) {
        
        categories = [];
    }

    try {
        propertyStatuses = await getPropertyStatuses(lang); // Usar el locale dinámico
    } catch (error) {
        
        propertyStatuses = [];
    }

    let amenities: any[] = [];
    try {
        amenities = await getAmenities(lang); // Usar el locale dinámico
        console.log('=== Properties Page Amenities Debug ===');
        console.log('Amenities loaded:', amenities);
        console.log('Amenities count:', amenities.length);
    } catch (error) {
        console.error('Error loading amenities:', error);
        amenities = [];
    }

    let locations: any[] = [];
    try {
        locations = await getLocations(lang); // Usar el locale dinámico
        console.log('=== Properties Page Locations Debug ===');
        console.log('Locations loaded:', locations);
        console.log('Locations count:', locations.length);
    } catch (error) {
        console.error('Error loading locations:', error);
        locations = [];
    }
    
    return (
        <SimpleLayout>
            
            <div className="space30" />
            
            <PropertiesContent 
                initialProperties={properties}
                categories={categories}
                propertyStatuses={propertyStatuses}
                amenities={amenities}
                locations={locations}
                searchParams={{ category, property_status, bedrooms, bathrooms, min_price, max_price, location, keyword, city, state, amenities: searchAmenities }}
                pagination={pagination}   
                lang={lang}
            />
        </SimpleLayout>
    )
}

