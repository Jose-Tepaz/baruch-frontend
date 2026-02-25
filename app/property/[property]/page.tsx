import PropertyDetailPage from "../../[lang]/property/[property]/page";
import { Metadata } from "next";
import { getPropertyBySlug } from "@/services/property";

interface Props {
  params: Promise<{
    property: string;
  }>;
}

// Helper para extraer texto plano de bloques de Strapi
function extractTextFromBlocks(blocks: any): string {
  if (!blocks || !Array.isArray(blocks)) {
    return "";
  }

  return blocks
    .map((block: any) => {
      if (block.children && Array.isArray(block.children)) {
        return block.children.map((child: any) => child.text || "").join(" ");
      }
      return "";
    })
    .filter((text: string) => text.trim())
    .join(" ")
    .trim()
    .substring(0, 160); // Limitar a 160 caracteres para SEO
}

// Wrapper que pasa lang='en' junto con el parámetro property
export default async function RootPropertyDetailPage({ params }: Props) {
  const { property } = await params;

  return PropertyDetailPage({
    params: Promise.resolve({
      lang: "en",
      property: property,
    }),
  });
}

// generateMetadata específico para la ruta raíz (inglés)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { property } = await params;
  const lang = "en";

  // Obtener datos de la propiedad para metadata dinámica
  const propertyData = await getPropertyBySlug(property, lang);

  if (!propertyData) {
    return {
      title: "Property Not Found - Baruch Real Estate",
      description: "The requested property could not be found.",
      alternates: {
        canonical: `https://www.baruchrealestate.com/property/${property}/`,
      },
    };
  }

  // Extraer texto de la descripción (que es un array de bloques)
  const descriptionText = propertyData.description
    ? extractTextFromBlocks(propertyData.description)
    : `Discover ${propertyData.title} with Baruch Real Estate.`;

  return {
    title: `${propertyData.title} - Baruch Real Estate`,
    description: descriptionText,
    keywords: `${propertyData.title}, ${propertyData.address}, real estate, property, Baruch`,
    openGraph: {
      title: `${propertyData.title} - Baruch Real Estate`,
      description: descriptionText,
      type: "website",
      locale: "en_US",
      url: `https://www.baruchrealestate.com/property/${property}/`,
      siteName: "Baruch Real Estate",
      images: propertyData.main_image
        ? [
            {
              url: propertyData.main_image,
              width: 1200,
              height: 630,
              alt: propertyData.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${propertyData.title} - Baruch Real Estate`,
      description: descriptionText,
      images: propertyData.main_image ? [propertyData.main_image] : undefined,
    },
    alternates: {
      canonical: `https://www.baruchrealestate.com/property/${property}/`,
      languages: {
        en: `/property/${property}/`,
        es: `/es/property/${property}/`,
        fr: `/fr/property/${property}/`,
        de: `/de/property/${property}/`,
        pl: `/pl/property/${property}/`,
        sv: `/sv/property/${property}/`,
        nl: `/nl/property/${property}/`,
        "x-default": `/property/${property}/`,
      },
    },
  };
}
