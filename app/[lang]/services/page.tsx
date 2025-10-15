import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import ServicesWithModal from "@/components/sections/ServicesWithModal";
import Service1 from "@/components/sections/Service1";
import Faq1 from "@/components/sections/Faq1";
import { Metadata } from 'next';

import ContactForm from "@/components/sections/contactForm";
import Link from "next/link";

interface ServicesPageProps {
    params: Promise<{
        lang: string;
    }>;
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const titles = {
    en: 'Our Services - Baruch Real Estate',
    es: 'Nuestros Servicios - Baruch Bienes Raíces',
    fr: 'Nos Services - Baruch Immobilier',
    de: 'Unsere Dienstleistungen - Baruch Immobilien',
    it: 'I Nostri Servizi - Baruch Immobiliare',
    pt: 'Nossos Serviços - Baruch Imobiliária'
  };

  const descriptions = {
    en: 'Discover our comprehensive real estate services including property buying, selling, renting, and investment consulting. Expert guidance for all your real estate needs.',
    es: 'Descubre nuestros servicios inmobiliarios integrales incluyendo compra, venta, alquiler y consultoría de inversiones. Guía experta para todas tus necesidades inmobiliarias.',
    fr: 'Découvrez nos services immobiliers complets incluant l\'achat, la vente, la location et le conseil en investissement. Accompagnement expert pour tous vos besoins immobiliers.',
    de: 'Entdecken Sie unsere umfassenden Immobiliendienstleistungen einschließlich Kauf, Verkauf, Vermietung und Investmentberatung. Expertenberatung für alle Ihre Immobilienbedürfnisse.',
    it: 'Scopri i nostri servizi immobiliari completi inclusi acquisto, vendita, affitto e consulenza sugli investimenti. Guida esperta per tutte le tue esigenze immobiliari.',
    pt: 'Descubra nossos serviços imobiliários abrangentes incluindo compra, venda, aluguel e consultoria de investimentos. Orientação especializada para todas as suas necessidades imobiliárias.'
  };

  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
    keywords: 'real estate services, property buying, property selling, property renting, investment consulting, Baruch services',
    openGraph: {
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      type: 'website',
      locale: lang,
      url: `https://baruch.com/${lang}/services`,
      siteName: 'Baruch Real Estate',
      images: [
        {
          url: 'https://baruch.com/services-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Baruch Real Estate Services'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      images: ['https://baruch.com/services-og.jpg']
    },
    alternates: {
      canonical: `https://baruch.com/${lang}/services`,
      languages: {
        'en': '/en/services',
        'es': '/es/services',
        'fr': '/fr/services',
        'de': '/de/services',
        'it': '/it/services',
        'pt': '/pt/services'
      }
    }
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
    const { lang } = await params;
    return (
        <>
            <Layout>
                <ServicesWithModal />
                
               
                <div className="space30"></div>
                <div className="">
                <div className="padding-global" id="contact-form">
                  <div className="container-large">
                    <div className="row gap-4 align-items-start justify-content-between">
                      <div className="col-lg-6  justify-content-center  align-items-start d-flex flex-column">
                        <div className="space30"></div>
                        <img src="/assets/img/all-images/service/entrance.webp" style={{width: '100%', height: '450px', objectFit: 'cover' }} />
                        <div className="space30"></div>
                        <h2 className="text-color-black text-size-32">Property services</h2>
                        <div className="space16"></div>
                        <p className="text-color-black text-size-medium">By combining these services with our real estate expertise, we make the entire process of buying, owning, and living in Spain more transparent and less stressful. We always try to support you, even long after the purchase has been completed.</p>
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
                      <div className="col-lg-5 m-auto d-flex" style={{marginLeft: 'auto'}}>
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

                </div>
                
            </Layout>
        </>
    );
}
