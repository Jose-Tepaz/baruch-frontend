import SimpleLayout from "@/components/layout/SimpleLayout"
import { getProperties } from "@/services/get-properties"
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
        keyword?: string;
        city?: string;
        state?: string;
        amenities?: string | string[];
    }>;
}

export async function generateMetadata({ params }: PropertiesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const titles = {
    en: 'Private Properties - Baruch Real Estate',
    es: 'Propiedades Privadas - Baruch Bienes Raíces',
    fr: 'Propriétés Privées - Baruch Immobilier',
    de: 'Private Immobilien - Baruch Immobilien',
    it: 'Proprietà Private - Baruch Immobiliare',
    pt: 'Propriedades Privadas - Baruch Imobiliária'
  };

  const descriptions = {
    en: 'Browse our exclusive collection of private properties for authorized users.',
    es: 'Explora nuestra colección exclusiva de propiedades privadas para usuarios autorizados.',
    fr: 'Parcourez notre collection exclusive de propriétés privées pour les utilisateurs autorisés.',
    de: 'Durchsuchen Sie unsere exklusive Sammlung privater Immobilien für autorisierte Benutzer.',
    it: 'Sfoglia la nostra collezione esclusiva di proprietà private per utenti autorizzati.',
    pt: 'Navegue pela nossa coleção exclusiva de propriedades privadas para usuários autorizados.'
  };

  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
    keywords: 'private properties, real estate, Baruch',
    openGraph: {
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      type: 'website',
      locale: lang,
      url: lang === 'en' ? 'https://www.baruchrealestate.com/private-properties/' : `https://www.baruchrealestate.com/${lang}/private-properties/`,
      siteName: 'Baruch Real Estate',
    },
    alternates: {
      canonical: lang === 'en' ? 'https://www.baruchrealestate.com/private-properties/' : `https://www.baruchrealestate.com/${lang}/private-properties/`,
      languages: {
        'en': '/private-properties/',
        'es': '/es/private-properties/',
        'fr': '/fr/private-properties/',
        'de': '/de/private-properties/',
        'pl': '/pl/private-properties/',
        'sv': '/sv/private-properties/',
        'nl': '/nl/private-properties/',
        'x-default': '/private-properties/'
      }
    }
  };
}

export default async function PrivatePropertiesPage({ params, searchParams }: PropertiesPageProps) {
    const { lang } = await params;
    const { category, property_status, keyword, city, state, amenities } = await searchParams;
    
    // Obtener datos del servidor con manejo de errores
    let properties = [];
    let categories = [];
    let propertyStatuses: any[] = [];
    let pagination = { page: 1, pageSize: 100, pageCount: 1, total: 0 };
    
    try {
        // Obtener propiedades según el filtro usando el servicio get-properties
        const result = await getProperties({ 
            categoryId: category, 
            locale: lang,
            onlyPrivate: true // Filtro para solo propiedades privadas
        });
        properties = result?.properties || [];
        pagination = result?.pagination || { page: 1, pageSize: 100, pageCount: 1, total: 0 };
        
        // Filtrar por property_status si está presente
        if (property_status && property_status.trim() !== '') {
            properties = properties.filter((property: any) => {
                return property.propertyStatus === property_status;
            });
        }
        // Filtrar propiedades localmente por otros criterios si es necesario
        if (properties && (keyword || city || state || amenities)) {
            properties = properties.filter((property: any) => {
                if (keyword) {
                    const searchTerm = keyword.toLowerCase();
                    const title = property.title?.toLowerCase() || '';
                    const description = property.description?.toLowerCase() || '';
                    if (!title.includes(searchTerm) && !description.includes(searchTerm)) {
                        return false;
                    }
                }
                if (city && !property.address?.toLowerCase().includes(city.toLowerCase())) {
                    return false;
                }
                if (state && !property.address?.toLowerCase().includes(state.toLowerCase())) {
                    return false;
                }
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
        properties = [];
        pagination = { page: 1, pageSize: 100, pageCount: 1, total: 0 };
    }
    try {
        categories = await getCategories(lang);
    } catch (error) {
        categories = [];
    }
    try {
        propertyStatuses = await getPropertyStatuses(lang);
    } catch (error) {
        propertyStatuses = [];
    }
    return (
        <SimpleLayout>
           
            <div className="space30" />
            <PropertiesContent 
                initialProperties={properties}
                categories={categories}
                propertyStatuses={propertyStatuses}
                searchParams={{ category, property_status, keyword, city, state, amenities }}
                pagination={pagination}
                lang={lang}
            />
        </SimpleLayout>
    )
} 