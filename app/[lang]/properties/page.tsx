import SimpleLayout from "@/components/layout/SimpleLayout"
import { getProperties } from "@/services/properties"
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
        category?: string | string[];
        property_status?: string | string[];
        bedrooms?: string;
        bathrooms?: string;
        min_price?: string;
        max_price?: string;
        location?: string | string[];
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
      url: lang === 'en' ? 'https://www.baruchrealestate.com/properties/' : `https://www.baruchrealestate.com/${lang}/properties/`,
      siteName: 'Baruch Real Estate',
    },
    alternates: {
      canonical: lang === 'en' ? 'https://www.baruchrealestate.com/properties/' : `https://www.baruchrealestate.com/${lang}/properties/`,
      languages: {
        'en': '/properties/',
        'es': '/es/properties/',
        'fr': '/fr/properties/',
        'de': '/de/properties/',
        'pl': '/pl/properties/',
        'sv': '/sv/properties/',
        'nl': '/nl/properties/',
        'x-default': '/properties/'
      }
    }
  };
}

export default async function PropertiesPage({ params, searchParams }: PropertiesPageProps) {
    const { lang } = await params;
    const { category, property_status, bedrooms, bathrooms, min_price, max_price, location, keyword, city, state, amenities: searchAmenities, page } = await searchParams;
    
    // Parse parameters to handle multiple selections
    // Next.js 15 puede recibir arrays cuando hay múltiples parámetros con el mismo nombre
    const locationParam = Array.isArray(location) ? location : location;
    const locationSlugs = locationParam 
        ? (Array.isArray(locationParam) 
            ? locationParam.map(loc => String(loc).trim()).filter(Boolean)
            : String(locationParam).split(',').map(loc => loc.trim()).filter(Boolean))
        : [];
    
    const categoryParam = Array.isArray(category) ? category : category;
    const categorySlugs = categoryParam 
        ? (Array.isArray(categoryParam)
            ? categoryParam.map(cat => String(cat).trim()).filter(Boolean)
            : String(categoryParam).split(',').map(cat => cat.trim()).filter(Boolean))
        : [];
    
    const statusParam = Array.isArray(property_status) ? property_status : property_status;
    const statusTitles = statusParam 
        ? (Array.isArray(statusParam)
            ? statusParam.map(status => String(status).trim()).filter(Boolean)
            : String(statusParam).split(',').map(status => status.trim()).filter(Boolean))
        : [];
    
    const amenitiesParam = Array.isArray(searchAmenities) ? searchAmenities : searchAmenities;
    const amenitiesArray = amenitiesParam 
        ? (Array.isArray(amenitiesParam)
            ? amenitiesParam.map(amenity => String(amenity).trim()).filter(Boolean)
            : String(amenitiesParam).split(',').map(amenity => amenity.trim()).filter(Boolean))
        : [];
    // Verificar autenticación del usuario
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token')?.value;
    const isAuthenticated = !!authToken;
    
    // Obtener datos del servidor con manejo de errores
    let categories = [];
    let properties: any[] = [];
    let propertyStatuses: any[] = [];
    const currentPage = page ? Math.max(1, Number(page)) : 1;
    const PAGE_SIZE = 9;
    let pagination = { page: 1, pageSize: PAGE_SIZE, pageCount: 0, total: 0 };

    const hasPostStrapiFilters = !!(min_price || max_price || city || state);

    try {
        const { data, meta } = await getProperties({
            categorySlug: Array.isArray(category) ? category[0] : category,
            categories: categorySlugs,
            propertyStatus: Array.isArray(property_status) ? property_status[0] : property_status,
            statuses: statusTitles,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            min_price: min_price,
            max_price: max_price,
            location: Array.isArray(location) ? location[0] : location,
            locations: locationSlugs,
            amenities: Array.isArray(searchAmenities) ? searchAmenities[0] : searchAmenities,
            amenitiesArray: amenitiesArray,
            keyword: keyword,
            locale: lang,
            page: hasPostStrapiFilters ? 1 : currentPage,
            pageSize: hasPostStrapiFilters ? 1000 : PAGE_SIZE
        });
        properties = data;
        pagination = meta.pagination;
        
        if (!isAuthenticated && properties) {
            properties = properties.filter((property: any) => !property.is_private);
        }
        
        if (properties && (max_price || min_price)) {
            properties = properties.filter((property: any) => {
                const unitPrices: number[] = property.unitPrices && property.unitPrices.length > 0
                    ? property.unitPrices
                    : (typeof property.price === 'number' ? [property.price] : []);

                if (unitPrices.length === 0) return true;

                if (max_price) {
                    const maxNum = Number(max_price);
                    if (!unitPrices.every((p: number) => p <= maxNum)) return false;
                }
                if (min_price) {
                    const minNum = Number(min_price);
                    if (!unitPrices.some((p: number) => p >= minNum)) return false;
                }
                return true;
            });
        }

        if (properties && (city || state)) {
            properties = properties.filter((property: any) => {
                if (city && !property.address?.toLowerCase().includes(city.toLowerCase())) {
                    return false;
                }
                if (state && !property.address?.toLowerCase().includes(state.toLowerCase())) {
                    return false;
                }
                return true;
            });
        }

        if (hasPostStrapiFilters) {
            const totalFiltered = properties.length;
            const start = (currentPage - 1) * PAGE_SIZE;
            properties = properties.slice(start, start + PAGE_SIZE);
            pagination = {
                page: currentPage,
                pageSize: PAGE_SIZE,
                pageCount: Math.ceil(totalFiltered / PAGE_SIZE) || 1,
                total: totalFiltered
            };
        }
    } catch (error) {
        properties = [];
    }
    
    try {
        categories = await getCategories(lang); // Usar el locale dinámico
    } catch (error) {
        // Error silencioso en producción - se usa array vacío
        categories = [];
    }

    try {
        propertyStatuses = await getPropertyStatuses(lang); // Usar el locale dinámico
    } catch (error) {
        // Error silencioso en producción - se usa array vacío
        propertyStatuses = [];
    }

    let amenities: any[] = [];
    try {
        amenities = await getAmenities(lang); // Usar el locale dinámico
    } catch (error) {
        // Error silencioso en producción - se usa array vacío
        amenities = [];
    }

    let locations: any[] = [];
    try {
        locations = await getLocations(lang); // Usar el locale dinámico
    } catch (error) {
        // Error silencioso en producción - se usa array vacío
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

