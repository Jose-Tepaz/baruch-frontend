import Layout from "@/components/layout/Layout";
import AboutHero from "@/components/sections/AboutHero";
import AboutForSellers from "@/components/sections/AboutForSellers";
import AboutForBuyers from "@/components/sections/AboutForBuyers";

import ContactSectionAbout from "@/components/sections/ContactSectionAbout";

import { getProperties } from "@/services/get-properties";
import { Metadata } from 'next';


interface AboutUsPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: AboutUsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const titles = {
    en: 'About Us - Baruch Real Estate',
    es: 'Sobre Nosotros - Baruch Bienes Raíces',
    fr: 'À Propos de Nous - Baruch Immobilier',
    de: 'Über Uns - Baruch Immobilien',
    it: 'Chi Siamo - Baruch Immobiliare',
    pt: 'Sobre Nós - Baruch Imobiliária'
  };

  const descriptions = {
    en: 'Learn about Baruch Real Estate, our mission, values, and commitment to helping you find your perfect property. Meet our experienced team of real estate professionals.',
    es: 'Conoce sobre Baruch Bienes Raíces, nuestra misión, valores y compromiso para ayudarte a encontrar tu propiedad perfecta. Conoce a nuestro experimentado equipo de profesionales inmobiliarios.',
    fr: 'Découvrez Baruch Immobilier, notre mission, nos valeurs et notre engagement à vous aider à trouver votre propriété parfaite. Rencontrez notre équipe expérimentée de professionnels immobiliers.',
    de: 'Erfahren Sie mehr über Baruch Immobilien, unsere Mission, Werte und unser Engagement, Ihnen bei der Suche nach Ihrer perfekten Immobilie zu helfen. Lernen Sie unser erfahrenes Team von Immobilienprofis kennen.',
    it: 'Scopri Baruch Immobiliare, la nostra missione, i nostri valori e il nostro impegno per aiutarti a trovare la tua proprietà perfetta. Incontra il nostro team esperto di professionisti immobiliari.',
    pt: 'Saiba mais sobre a Baruch Imobiliária, nossa missão, valores e compromisso em ajudá-lo a encontrar sua propriedade perfeita. Conheça nossa equipe experiente de profissionais imobiliários.'
  };

  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
    keywords: 'about us, real estate company, Baruch, property professionals, team, mission, values',
    openGraph: {
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      type: 'website',
      locale: lang,
      url: `https://www.baruchrealestate.com/${lang}/about-us`,
      siteName: 'Baruch Real Estate',
      images: [
        {
          url: 'https://www.baruchrealestate.com/about-us-og.jpg',
          width: 1200,
          height: 630,
          alt: 'About Baruch Real Estate'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      images: ['https://www.baruchrealestate.com/about-us-og.jpg']
    },
    alternates: {
      canonical: `https://www.baruchrealestate.com/${lang}/about-us`, //eslint-disable-line
      languages: {
        'en': '/en/about-us',
        'es': '/es/about-us',
        'fr': '/fr/about-us',
        'de': '/de/about-us',
        'it': '/it/about-us',
        'pt': '/pt/about-us'
      }
    }
  };
}

export default async function AboutUsPage({ params }: AboutUsPageProps) {
  const { lang } = await params;
  const propertiesResult = await getProperties({ locale: lang, onlyPrivate: false });
  const properties = propertiesResult?.properties || [];

  const imgContact = "/assets/img/all-images/about/about-4.webp";
  
  return (
    <>
      <Layout>
        <AboutHero /> {/* Hero Section */}
       
        <AboutForBuyers /> {/* About For Sellers Section */}
        <AboutForSellers /> {/* About Section */}
        <ContactSectionAbout 
          imgContact={imgContact}
        /> {/* Contact Section */}

      </Layout>
    </>
  );
}

