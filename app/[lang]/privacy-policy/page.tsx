import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import PrivacyPolicy from "@/components/sections/PrivacyPolicy";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const path = 'privacy-policy';
  const canonicalPath = lang === 'en' ? `/${path}/` : `/${lang}/${path}/`;
  const ogUrl = `https://www.baruchrealestate.com${canonicalPath}`;

  return {
    title: 'Privacy Policy - Baruch Real Estate',
    description: 'Read our privacy policy to understand how Baruch Real Estate collects, uses, and protects your personal information.',
    keywords: 'privacy policy, data protection, personal information, Baruch, privacy',
    openGraph: {
      title: 'Privacy Policy - Baruch Real Estate',
      description: 'Read our privacy policy to understand how we protect your personal information.',
      type: 'website',
      locale: lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`,
      url: ogUrl,
      siteName: 'Baruch Real Estate',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Privacy Policy - Baruch Real Estate',
      description: 'Read our privacy policy to understand how we protect your personal information.',
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

export default function PrivacyPolicyPage() {
    return (
        <>
            <Layout>
                
                <PrivacyPolicy />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
