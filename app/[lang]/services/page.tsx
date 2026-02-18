import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import ServicesWithModal from "@/components/sections/ServicesWithModal";
import Service1 from "@/components/sections/Service1";
import Faq1 from "@/components/sections/Faq1";
import { Metadata } from 'next';

import ContactForm from "@/components/sections/contactForm";
import Link from "next/link";
import ContactSectionServices from "@/components/sections/ContactSectionServices";
import ContactModuleServices from "@/components/sections/ContactModuleServices";

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
      url: lang === 'en' ? 'https://www.baruchrealestate.com/services/' : `https://www.baruchrealestate.com/${lang}/services/`,
      siteName: 'Baruch Real Estate',
      images: [
        {
          url: 'https://www.baruchrealestate.com/services-og.jpg',
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
      images: ['https://www.baruchrealestate.com/services-og.jpg']
    },
    alternates: {
      canonical: lang === 'en' ? 'https://www.baruchrealestate.com/services/' : `https://www.baruchrealestate.com/${lang}/services/`,
      languages: {
        'en': '/services/',
        'es': '/es/services/',
        'fr': '/fr/services/',
        'de': '/de/services/',
        'pl': '/pl/services/',
        'sv': '/sv/services/',
        'nl': '/nl/services/',
        'x-default': '/services/'
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
            <ContactModuleServices />
        </div>
      </Layout>
    </>
  );
}
