import AboutUsPage from '../[lang]/about-us/page';
import { Metadata } from 'next';

// Metadata específica para About Us en inglés
export const metadata: Metadata = {
  title: 'About Us - Baruch Real Estate',
  description: 'Learn about Baruch Real Estate, our mission, values, and commitment to helping you find your perfect property. Meet our experienced team of real estate professionals.',
  keywords: 'about us, real estate company, Baruch, property professionals, team, mission, values',
  openGraph: {
    title: 'About Us - Baruch Real Estate',
    description: 'Learn about Baruch Real Estate, our mission, values, and commitment to helping you find your perfect property.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.baruchrealestate.com/about-us',
    siteName: 'Baruch Real Estate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Baruch Real Estate',
    description: 'Learn about Baruch Real Estate, our mission, values, and commitment to helping you find your perfect property.',
  },
  alternates: {
    canonical: 'https://www.baruchrealestate.com/about-us',
    languages: {
      'en': '/about-us',
      'es': '/es/about-us',
      'fr': '/fr/about-us',
      'de': '/de/about-us',
      'pl': '/pl/about-us',
      'sv': '/sv/about-us',
      'nl': '/nl/about-us',
      'x-default': '/about-us'
    }
  }
};

// Wrapper que pasa lang='en'
export default async function RootAboutUsPage() {
  return AboutUsPage({ 
    params: Promise.resolve({ lang: 'en' }) 
  });
}
