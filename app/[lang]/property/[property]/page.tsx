import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Properties2Details from "@/components/sections/Properties2Details";
import PropertyInner from "@/components/sections/PropertyInner";
import PropertyBottom from "@/components/sections/PropertyBottom";
import { getPropertyBySlug } from "@/services/property";
import PropertyDetails from "@/components/sections/PropertyDetails";
import { Metadata } from 'next';



interface PropertyPageProps {
    params: Promise<{ 
        lang: string;
        property: string;
    }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { lang, property } = await params;
  // Obtener datos de la propiedad para metadata dinámica
  const propertyData = await getPropertyBySlug(property, lang);
  
  if (!propertyData) {
    return {
      title: 'Property Not Found - Baruch Real Estate',
      description: 'The requested property could not be found.',
    };
  }

  const titles = {
    en: `${propertyData.title} - Baruch Real Estate`,
    es: `${propertyData.title} - Baruch Bienes Raíces`,
    fr: `${propertyData.title} - Baruch Immobilier`,
    de: `${propertyData.title} - Baruch Immobilien`,
    it: `${propertyData.title} - Baruch Immobiliare`,
    pt: `${propertyData.title} - Baruch Imobiliária`
  };

  const descriptions = {
    en: propertyData.description,
    es: propertyData.description,
    fr: propertyData.description,
    de: propertyData.description,
    it: propertyData.description,
    pt: propertyData.description
  };

  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
    keywords: `${propertyData.title}, ${propertyData.address}, real estate, property, Baruch`,
    openGraph: {
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      type: 'website',
      locale: lang,
      url: `https://baruchrealestate.com/${lang}/property/${property}`,
      siteName: 'Baruch Real Estate',
      images: propertyData.main_image ? [
        {
          url: propertyData.main_image,
          width: 1200,
          height: 630,
          alt: propertyData.title
        }
      ] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      images: propertyData.main_image ? [propertyData.main_image] : undefined
    },
    alternates: {
      canonical: `https://baruchrealestate.com/${lang}/property/${property}`,
      languages: {
        'en': `/en/property/${property}`,
        'es': `/es/property/${property}`,
        'fr': `/fr/property/${property}`,
        'de': `/de/property/${property}`,
        'it': `/it/property/${property}`,
        'pt': `/pt/property/${property}`
      }
    }
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
    const { lang, property } = await params;
  
    

    
    const propertyData = await getPropertyBySlug(property, lang);
    
    if (!propertyData) {
        return (
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center py-5">
                            <h2>Property not found</h2>
                            <p>The property you're looking for doesn't exist.</p>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
    
    console.log('Property data loaded:', propertyData);
    
    return (
        <>
            <Layout>
                <Properties2Details property={propertyData} />
                <PropertyInner property={propertyData} block_extend="d-none" />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
