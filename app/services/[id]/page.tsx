import ServiceDetailPage from "../../[lang]/services/[id]/page";
import { Metadata } from "next";
import { translations, Language } from "@/utils/translations-data";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// Wrapper que pasa lang='en' junto con el parámetro id
export default async function RootServiceDetailPage({ params }: Props) {
  const { id } = await params;

  return ServiceDetailPage({
    params: Promise.resolve({
      lang: "en",
      id: id,
    }),
  });
}

// Función helper para obtener el servicio
function getService(lang: string, id: string) {
  const currentLang = (lang as Language) || "en";
  const servicesList =
    (translations[currentLang]?.common as any)?.["services-page"]?.[
      "services-list"
    ] || [];
  return servicesList.find((s: any) => s.id === id);
}

// generateMetadata específico para la ruta raíz (inglés)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const lang = "en";
  const service = getService(lang, id);

  if (!service) {
    return {
      title: "Service Not Found - Baruch Real Estate",
      alternates: {
        canonical: `https://www.baruchrealestate.com/services/${id}/`,
      },
    };
  }

  return {
    title: `${service.title} - Baruch Real Estate`,
    description: service.description?.substring(0, 160) || "",
    openGraph: {
      title: `${service.title} - Baruch Real Estate`,
      description: service.description?.substring(0, 160) || "",
      images: service.image ? [{ url: service.image }] : undefined,
      url: `https://www.baruchrealestate.com/services/${id}/`,
      locale: "en_US",
      type: "website",
      siteName: "Baruch Real Estate",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} - Baruch Real Estate`,
      description: service.description?.substring(0, 160) || "",
      images: service.image ? [service.image] : undefined,
    },
    alternates: {
      canonical: `https://www.baruchrealestate.com/services/${id}/`,
      languages: {
        en: `/services/${id}/`,
        es: `/es/services/${id}/`,
        fr: `/fr/services/${id}/`,
        de: `/de/services/${id}/`,
        pl: `/pl/services/${id}/`,
        sv: `/sv/services/${id}/`,
        nl: `/nl/services/${id}/`,
        "x-default": `/services/${id}/`,
      },
    },
  };
}
