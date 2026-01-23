import ServicesPage from '../[lang]/services/page';
import { Metadata } from 'next';

// Metadata específica para Services en inglés
export const metadata: Metadata = {
  title: 'Our Services - Baruch Real Estate',
  description: 'Discover our comprehensive real estate services. From buying and selling to property management, we offer everything you need.',
  keywords: 'real estate services, property services, buying, selling, property management, Baruch',
  openGraph: {
    title: 'Our Services - Baruch Real Estate',
    description: 'Discover our comprehensive real estate services. From buying and selling to property management.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.baruchrealestate.com/services',
    siteName: 'Baruch Real Estate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services - Baruch Real Estate',
    description: 'Discover our comprehensive real estate services.',
  },
  alternates: {
    canonical: 'https://www.baruchrealestate.com/services',
    languages: {
      'en': '/services',
      'es': '/es/services',
      'fr': '/fr/services',
      'de': '/de/services',
      'pl': '/pl/services',
      'sv': '/sv/services',
      'nl': '/nl/services',
      'x-default': '/services'
    }
  }
};

// Wrapper que pasa lang='en'
export default async function RootServicesPage() {
  return ServicesPage({ 
    params: Promise.resolve({ lang: 'en' }) 
  });
}
