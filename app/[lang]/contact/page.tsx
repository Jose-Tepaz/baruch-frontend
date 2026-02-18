import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import ContactSectionContact from "@/components/sections/ContactSectionContact";
import ContactHero from "@/components/sections/ContactHero";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const path = 'contact';
  const canonicalPath = lang === 'en' ? `/${path}/` : `/${lang}/${path}/`;
  const ogUrl = `https://www.baruchrealestate.com${canonicalPath}`;

  return {
    title: 'Contact Us - Baruch Real Estate',
    description: 'Get in touch with Baruch Real Estate. Contact our team of professionals for inquiries about properties, services, or any real estate needs.',
    keywords: 'contact, contact us, real estate contact, Baruch, get in touch',
    openGraph: {
      title: 'Contact Us - Baruch Real Estate',
      description: 'Get in touch with Baruch Real Estate. Contact our team for inquiries about properties and services.',
      type: 'website',
      locale: lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`,
      url: ogUrl,
      siteName: 'Baruch Real Estate',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact Us - Baruch Real Estate',
      description: 'Get in touch with Baruch Real Estate. Contact our team for inquiries about properties and services.',
    },
    alternates: {
      canonical: ogUrl,
      languages: {
        en: `/${path}/`,
        es: `/es/${path}/`,
        fr: `/fr/${path}/`,
        de: `/de/${path}/`,
        pl: `/pl/${path}/`,
        sv: `/sv/${path}/`,
        nl: `/nl/${path}/`,
        'x-default': `/${path}/`,
      },
    },
  };
}

export default function ContactPage() {
    const imgContact = "/assets/img/all-images/contact/contact-1.webp";
    return (
        <>
            <Layout>
                <ContactHero />
                <ContactSectionContact
                    imgContact={imgContact}
                />

                <div className="space30"></div>

            </Layout>
        </>
    );
}
