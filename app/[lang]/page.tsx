import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getProperties } from "@/services/get-properties";
import { getCategories } from "@/services/categories";
import { getPropertyStatuses } from "@/services/property-status";
import { getAmenities } from "@/services/amenities";
import { getLocations } from "@/services/locations";
import imgLandscape from "@/public/assets/img/all-images/home/hp-6.webp"
import { Metadata } from 'next';
import { getTestimonials } from "@/services/testimonials";
import HeroHome from "@/components/sections/HeroHome";

// Importar componentes del cliente dinámicamente
const Layout = dynamic(() => import("@/components/layout/Layout"), { ssr: true });
const Hero2 = dynamic(() => import("@/components/sections/Hero2"), { ssr: true });
const SearchBox = dynamic(() => import("@/components/sections/SearchBox"), { ssr: true });
const About2 = dynamic(() => import("@/components/sections/About2"), { ssr: true });
const PropertyList1 = dynamic(() => import("@/components/sections/PropertieList1"), { ssr: true });
const Category1 = dynamic(() => import("@/components/sections/Category1"), { ssr: true });
const About3 = dynamic(() => import("@/components/sections/About3"), { ssr: true });
const Testimonial2 = dynamic(() => import("@/components/sections/Testimonial2"), { ssr: true });

interface Props {
  params: Promise<{
    lang: string;
  }>;
}

const allowedLocales = ['en', 'es', 'fr', 'de', 'pl', 'sv', 'nl'];

// Configuración de metadata para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const titles = {
    en: 'Baruch Real Estate - Find Your Dream Property',
    es: 'Baruch Bienes Raíces - Encuentra tu Propiedad Ideal',
    fr: 'Baruch Immobilier - Trouvez votre Propriété de Rêve',
    de: 'Baruch Immobilien - Finden Sie Ihre Traumimmobilie',
    it: 'Baruch Immobiliare - Trova la Tua Proprietà dei Sogni',
    pt: 'Baruch Imobiliária - Encontre sua Propriedade dos Sonhos'
  };

  const descriptions = {
    en: 'Discover the best properties in your area. Browse houses, apartments, and commercial properties with Baruch Real Estate.',
    es: 'Descubre las mejores propiedades en tu área. Explora casas, apartamentos y propiedades comerciales con Baruch Bienes Raíces.',
    fr: 'Découvrez les meilleures propriétés dans votre région. Parcourez maisons, appartements et propriétés commerciales avec Baruch Immobilier.',
    de: 'Entdecken Sie die besten Immobilien in Ihrer Region. Durchsuchen Sie Häuser, Wohnungen und Gewerbeimmobilien mit Baruch Immobilien.',
    it: 'Scopri le migliori proprietà nella tua zona. Sfoglia case, appartamenti e proprietà commerciali con Baruch Immobiliare.',
    pt: 'Descubra as melhores propriedades na sua área. Navegue por casas, apartamentos e propriedades comerciais com Baruch Imobiliária.'
  };

  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
    keywords: 'real estate, properties, houses, apartments, commercial properties, Baruch',
    openGraph: {
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      type: 'website',
      locale: lang,
      url: `https://baruch.com/${lang}`,
      siteName: 'Baruch Real Estate',
      images: [
        {
          url: 'https://baruch.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Baruch Real Estate'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      images: ['https://baruch.com/og-image.jpg']
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://baruch.com/${lang}`,
      languages: {
        'en': '/en',
        'es': '/es',
        'fr': '/fr',
        'de': '/de',
        'pl': '/pl',
        'sv': '/sv',
        'nl': '/nl'
      }
    }
  };
}

export default async function Home({ params }: Props) {
    const { lang } = await params;
    // Validar que el idioma sea permitido
    if (!allowedLocales.includes(lang)) {
      redirect('/en');
    }

    // Este bloque de código está intentando cargar datos para la página principal del sitio utilizando varias llamadas asíncronas a servicios:
    // - Realiza múltiples consultas a la vez mediante Promise.all, trayendo propiedades, categorías, estatus de propiedades, amenidades, ubicaciones y testimoniales para el idioma seleccionado.
    // - Si la petición de ubicaciones o testimoniales falla, simplemente asigna un array vacío para evitar que se rompa la página.
    // - Una vez recibidos los resultados, obtiene el arreglo de propiedades desde el objeto devuelto por getProperties.
    try {
        const [propertiesResult, categories, propertyStatuses, amenities, locations] = await Promise.all([
            getProperties({ locale: lang, onlyPrivate: false }),
            getCategories(lang),
            getPropertyStatuses(lang),
            getAmenities(lang),
            getLocations(lang).catch(() => []), // Si falla, regresa array vacío
            getTestimonials(lang).catch(() => []) // Si falla, regresa array vacío
        ]);

        const properties = propertiesResult?.properties || [];

       

        return (
            <Layout>
                <HeroHome properties={properties || []} />
                <SearchBox 
                    categories={categories || []}
                    propertyStatuses={propertyStatuses || []}
                    amenities={amenities || []}
                    locations={locations || []}
                />
                <About2  />
                <PropertyList1 properties={properties || []} />
                
                
                <img className="img-landscape" src={imgLandscape.src} alt="baruch" style={{width: '100%', height: 'auto'}} />
                <Category1 categories={categories || []} />
                  <About3  />
                
            </Layout>
        );
    } catch (error) {
        console.error('=== Home Page: Error loading data ===', error);
        
        return (
            <Layout>
                <HeroHome properties={[]} />
                <SearchBox 
                    categories={[]}
                    propertyStatuses={[]}
                    amenities={[]}
                    locations={[]}
                />
                <About2  />
                <PropertyList1 properties={[]} />
                
                
                <img className="img-landscape" src={imgLandscape.src} alt="baruch"  />
                <Category1 categories={[]} />
                <About3  />
                
            </Layout>
        );
    }
}

// Generar rutas estáticas para todos los idiomas soportados
export async function generateStaticParams() {
  return allowedLocales.map((lang) => ({
    lang,
  }));
} 