import SimpleLayout from "@/components/layout/SimpleLayout"
import { getProperties } from "@/services/properties"
import InnerHeader from "@/components/layout/InnerHeader";
import { getCategories } from "@/services/categories";
import { getPropertyStatuses } from "@/services/property-status";
import PropertiesContent from "@/components/pages/PropertiesContent";
import { Metadata } from 'next';

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
    const { category, property_status, bedrooms, bathrooms, min_price, max_price, location, keyword, city, state, amenities } = await searchParams;
    
    // Obtener datos del servidor con manejo de errores
    let properties = [];
    let categories = [];
    let propertyStatuses: any[] = [];
    
    try {
       
        
        const result = await getProperties({ 
            categorySlug: category, 
            propertyStatus: property_status,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            min_price: min_price,
            max_price: max_price,
            location: location,
            locale: lang, // Usar el locale dinámico
        });
        
        properties = result || [];
        
       
        
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
        categories = await getCategories(lang); // Usar el locale dinámico
    } catch (error) {
        console.error('Error loading categories:', error);
        categories = [];
    }

    try {
        propertyStatuses = await getPropertyStatuses(lang); // Usar el locale dinámico
    } catch (error) {
        console.error('Error loading property statuses:', error);
        propertyStatuses = [];
    }
    
    return (
        <SimpleLayout>
            
            <div className="space30" />
            
            <PropertiesContent 
                initialProperties={properties}
                categories={categories}
                propertyStatuses={propertyStatuses}
                searchParams={{ category, property_status, bedrooms, bathrooms, min_price, max_price, location, keyword, city, state, amenities }}
            />
        </SimpleLayout>
    )
}

