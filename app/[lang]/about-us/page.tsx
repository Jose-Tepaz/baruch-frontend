import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import AboutHero from "@/components/sections/AboutHero";
import Others4 from "@/components/sections/Others4";
import AboutForSellers from "@/components/sections/AboutForSellers"; 
import AboutForBuyers from "@/components/sections/AboutForBuyers";

import ContactForm from "@/components/sections/contactForm";


import PropertyList1 from "@/components/sections/PropertieList1";
import { getProperties } from "@/services/get-properties";
import { Metadata } from 'next';
import Link from "next/link";

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
      url: `https://baruch.com/${lang}/about-us`,
      siteName: 'Baruch Real Estate',
      images: [
        {
          url: 'https://baruch.com/about-us-og.jpg',
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
      images: ['https://baruch.com/about-us-og.jpg']
    },
    alternates: {
      canonical: `https://baruch.com/${lang}/about-us`,
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
    
    return (
        <>
            <Layout>
                <AboutHero /> {/* Hero Section */}
               
               <AboutForBuyers /> {/* About For Sellers Section */}
                <AboutForSellers /> {/* About Section */}
                
               
                <div className="padding-global">
                  <div className="container-large">
                    <div className="row">
                      <div className="col-lg-6  justify-content-center  align-items-start d-flex flex-column">
                        <div className="space30"></div>
                        <img src="/assets/img/all-images/about/about-hero.webp" style={{width: '100%', height: '250px', objectFit: 'cover' }} />
                        <div className="space30"></div>
                        <h2 className="text-color-black text-size-32">Our Services</h2>
                        <div className="space16"></div>
                        <p className="text-color-black text-size-medium">At Baruch Real Estate, we believe in building lasting relationships based on trust, transparency, and personal contact. For us, real estate is not just about properties, it’s about people. We guide you through the process step by step. With care, clarity,</p>
                        <div className="space30"></div>
                        <Link href="services" className="vl-btn1 is-primary">
                          See all services
                          <span className="arrow1 ms-2">
                            <i className="fa-solid fa-arrow-right" />
                          </span>
                          <span className="arrow2 ms-2">
                            <i className="fa-solid fa-arrow-right" />
                          </span>
                        </Link>
                      </div>
                      <div className="col-lg-6 m-auto">
                        <div className="space30"></div>
                        <div className="bg-color-white" style={{padding: '20px'}}>
                          <h2 className="text-color-black  size-20 uppercase">Reay for the next step?</h2>
                          <h3 className="text-color-black size-42 uppercase">Let’s connect</h3>
                          <p className="text-color-black size-16">Please fill in your details below so we can contact you.</p>
                          
                          <div className="space16"></div>
                          <ContactForm/>  
                          <div className="space30"></div>
                        </div>
                                       
                      </div>
                    </div>
                  </div>
                </div>
                

                
               
            </Layout>
        </>
    );
}

