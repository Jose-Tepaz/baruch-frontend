import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { getProperties } from "@/services/get-properties";
import { getCategories } from "@/services/categories";
import { getPropertyStatuses } from "@/services/property-status";
import { getAmenities } from "@/services/amenities";
import { getLocations } from "@/services/locations";
import imgLandscape from "@/public/assets/img/all-images/home/hp-6.webp";
import { Metadata } from "next";
import { getTestimonials } from "@/services/testimonials";
import HeroHome from "@/components/sections/HeroHome";
import JsonLd from "@/components/elements/JsonLd";
import { Organization } from "schema-dts";

// Importar componentes del cliente dinámicamente
const Layout = dynamic(() => import("@/components/layout/Layout"), {
  ssr: true,
});
const SearchBox = dynamic(() => import("@/components/sections/SearchBox"), {
  ssr: true,
});
const About2 = dynamic(() => import("@/components/sections/About2"), {
  ssr: true,
});
const PropertyList1 = dynamic(
  () => import("@/components/sections/PropertieList1"),
  { ssr: true },
);
const Category1 = dynamic(() => import("@/components/sections/Category1"), {
  ssr: true,
});
const About3 = dynamic(() => import("@/components/sections/About3"), {
  ssr: true,
});

interface Props {
  params: Promise<{
    lang: string;
  }>;
}

const allowedLocales = ["en", "es", "fr", "de", "pl", "sv", "nl"];

// Configuración de metadata para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const titles = {
    en: "Baruch Real Estate - Find Your Dream Property",
    es: "Baruch Bienes Raíces - Encuentra tu Propiedad Ideal",
    fr: "Baruch Immobilier - Trouvez votre Propriété de Rêve",
    de: "Baruch Immobilien - Finden Sie Ihre Traumimmobilie",
    it: "Baruch Immobiliare - Trova la Tua Proprietà dei Sogni",
    pt: "Baruch Imobiliária - Encontre sua Propriedade dos Sonhos",
  };

  const descriptions = {
    en: "Discover the best properties in your area. Browse houses, apartments, and commercial properties with Baruch Real Estate.",
    es: "Descubre las mejores propiedades en tu área. Explora casas, apartamentos y propiedades comerciales con Baruch Bienes Raíces.",
    fr: "Découvrez les meilleures propriétés dans votre région. Parcourez maisons, appartements et propriétés commerciales avec Baruch Immobilier.",
    de: "Entdecken Sie die besten Immobilien in Ihrer Region. Durchsuchen Sie Häuser, Wohnungen und Gewerbeimmobilien mit Baruch Immobilien.",
    it: "Scopri le migliori proprietà nella tua zona. Sfoglia case, appartamenti e proprietà commerciali con Baruch Immobiliare.",
    pt: "Descubra as melhores propriedades na sua área. Navegue por casas, apartamentos e propriedades comerciais com Baruch Imobiliária.",
  };

  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description:
      descriptions[lang as keyof typeof descriptions] || descriptions.en,
    keywords:
      "real estate, properties, houses, apartments, commercial properties, Baruch",
    openGraph: {
      title: titles[lang as keyof typeof titles] || titles.en,
      description:
        descriptions[lang as keyof typeof descriptions] || descriptions.en,
      type: "website",
      locale: lang,
      url: `https://www.baruchrealestate.com/${lang}/`,
      siteName: "Baruch Real Estate",
      images: [
        {
          url: "https://www.baruchrealestate.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Baruch Real Estate",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[lang as keyof typeof titles] || titles.en,
      description:
        descriptions[lang as keyof typeof descriptions] || descriptions.en,
      images: ["https://www.baruchrealestate.com/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical:
        lang === "en"
          ? "https://www.baruchrealestate.com/"
          : `https://www.baruchrealestate.com/${lang}/`,
      languages: {
        en: "/",
        es: "/es/",
        fr: "/fr/",
        de: "/de/",
        pl: "/pl/",
        sv: "/sv/",
        nl: "/nl/",
        "x-default": "/",
      },
    },
  };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  // Validar que el idioma sea permitido
  if (!allowedLocales.includes(lang)) {
    redirect("/en");
  }

  // Este bloque de código está intentando cargar datos para la página principal del sitio utilizando varias llamadas asíncronas a servicios:
  // - Realiza múltiples consultas a la vez mediante Promise.all, trayendo propiedades, categorías, estatus de propiedades, amenidades, ubicaciones y testimoniales para el idioma seleccionado.
  // - Si la petición de ubicaciones o testimoniales falla, simplemente asigna un array vacío para evitar que se rompa la página.
  // - Una vez recibidos los resultados, obtiene el arreglo de propiedades desde el objeto devuelto por getProperties.
  try {
    const [
      propertiesResult,
      categories,
      propertyStatuses,
      amenities,
      locations,
    ] = await Promise.all([
      getProperties({ locale: lang, onlyPrivate: false }),
      getCategories(lang),
      getPropertyStatuses(lang),
      getAmenities(lang),
      getLocations(lang).catch(() => []), // Si falla, regresa array vacío
      getTestimonials(lang).catch(() => []), // Si falla, regresa array vacío
    ]);

    const properties = propertiesResult?.properties || [];

    return (
      <Layout>
        <JsonLd<Organization>
          data={{
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Baruch Real Estate",
            url: "https://www.baruchrealestate.com",
            logo: "https://www.baruchrealestate.com/assets/img/logo/logo.png",
            description:
              "Find your dream property with Baruch Real Estate. We offer the best houses, apartments, and commercial properties.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Your City",
              addressRegion: "Your Region",
              addressCountry: "Your Country",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-234-567-8900",
              contactType: "customer service",
            },
            sameAs: [
              "https://www.facebook.com/baruchrealestate",
              "https://www.instagram.com/baruchrealestate",
              "https://twitter.com/baruchrealestate",
            ],
          }}
        />
        <HeroHome properties={properties || []} />
        <SearchBox
          categories={categories || []}
          propertyStatuses={propertyStatuses || []}
          amenities={amenities || []}
          locations={locations || []}
        />
        <About2 />
        <PropertyList1 properties={properties || []} />

        <img
          className="img-landscape"
          src={imgLandscape.src}
          alt="baruch"
          style={{ width: "100%", height: "auto" }}
        />
        <Category1 categories={categories || []} />
        <About3 />
      </Layout>
    );
  } catch (error) {
    // Error silencioso en producción - la página se renderiza con datos vacíos
    return (
      <Layout>
        <HeroHome properties={[]} />
        <SearchBox
          categories={[]}
          propertyStatuses={[]}
          amenities={[]}
          locations={[]}
        />
        <About2 />
        <PropertyList1 properties={[]} />

        <img className="img-landscape" src={imgLandscape.src} alt="baruch" />
        <Category1 categories={[]} />
        <About3 />
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
