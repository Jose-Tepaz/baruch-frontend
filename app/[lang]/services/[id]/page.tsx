import Layout from "@/components/layout/Layout";
import { translations, Language } from "@/utils/translations-data";
import ServiceDetailClient from "./ServiceDetailClient";
import Link from "next/link";
import { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

// Función helper para obtener el servicio
function getService(lang: string, id: string) {
    const currentLang = (lang as Language) || "en";
    const servicesList = (translations[currentLang]?.common as any)?.["services-page"]?.["services-list"] || [];
    return servicesList.find((s: any) => s.id === id);
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { lang, id } = await params;
    const service = getService(lang, id);

    if (!service) {
        return {
            title: 'Service Not Found - Baruch Real Estate'
        };
    }

    // Construir URLs según el idioma (inglés sin prefijo, otros con prefijo)
    const canonicalPath = lang === 'en' 
        ? `/services/${id}`
        : `/${lang}/services/${id}`;
    
    const ogUrl = lang === 'en'
        ? `https://www.baruchrealestate.com/services/${id}`
        : `https://www.baruchrealestate.com/${lang}/services/${id}`;

    return {
        title: `${service.title} - Baruch Real Estate`,
        description: service.description?.substring(0, 160) || '',
        openGraph: {
            title: `${service.title} - Baruch Real Estate`,
            description: service.description?.substring(0, 160) || '',
            images: service.image ? [{ url: service.image }] : undefined,
            url: ogUrl,
            locale: lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`,
            type: 'website',
            siteName: 'Baruch Real Estate',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${service.title} - Baruch Real Estate`,
            description: service.description?.substring(0, 160) || '',
            images: service.image ? [service.image] : undefined,
        },
        alternates: {
            canonical: `https://www.baruchrealestate.com${canonicalPath}`,
            languages: {
                'en': `/services/${id}`,
                'es': `/es/services/${id}`,
                'fr': `/fr/services/${id}`,
                'de': `/de/services/${id}`,
                'pl': `/pl/services/${id}`,
                'sv': `/sv/services/${id}`,
                'nl': `/nl/services/${id}`,
                'x-default': `/services/${id}`
            }
        }
    };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { lang, id } = await params;
  
  const service = getService(lang, id);

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto py-12 text-center">
            {/* Fallback simple si no hay servicio */}
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-700 text-lg">The service you are looking for does not exist.</p>
          <Link
            href={`/${lang}/services`}
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Back to Services
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
        <ServiceDetailClient service={service} lang={lang} />
    </Layout>
  );
}
