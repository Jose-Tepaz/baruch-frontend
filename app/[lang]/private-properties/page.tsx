import SimpleLayout from "@/components/layout/SimpleLayout"
import { getProperties } from "@/services/get-properties"
import InnerHeader from "@/components/layout/InnerHeader";
import { getCategories } from "@/services/categories";
import { getPropertyStatuses } from "@/services/property-status";
import PropertiesContent from "@/components/pages/PropertiesContent";
import { Metadata } from 'next';

interface PropertiesPageProps {
    params: {
        lang: string;
    };
    searchParams: {
        category?: string;
        property_status?: string;
        keyword?: string;
        city?: string;
        state?: string;
        amenities?: string | string[];
    };
}

export async function generateMetadata({ params: { lang } }: PropertiesPageProps): Promise<Metadata> {
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
      url: `https://baruch.com/${lang}/private-properties`,
      siteName: 'Baruch Real Estate',
    },
    alternates: {
      canonical: `https://baruch.com/${lang}/private-properties`,
      languages: {
        'en': '/en/private-properties',
        'es': '/es/private-properties',
        'fr': '/fr/private-properties',
        'de': '/de/private-properties',
        'it': '/it/private-properties',
        'pt': '/pt/private-properties'
      }
    }
  };
}

export default async function PrivatePropertiesPage({ params, searchParams }: PropertiesPageProps) {
    const { lang } = params;
    const { category, property_status, keyword, city, state, amenities } = searchParams;
    
    // Obtener datos del servidor con manejo de errores
    let properties = [];
    let categories = [];
    let propertyStatuses: any[] = [];
    
    try {
        // Obtener propiedades según el filtro usando el servicio get-properties
        const result = await getProperties({ 
            categoryId: category, 
            locale: lang,
            onlyPrivate: true // Filtro para solo propiedades privadas
        });
        properties = result?.properties || [];
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
            <InnerHeader title="Private Properties" currentpage="Private Properties" />
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