import PrivatePropertiesPage from '../[lang]/private-properties/page';
import { Metadata } from 'next';

interface RootPrivatePropertiesPageProps {
  searchParams?: Promise<{
    category?: string;
    property_status?: string;
    keyword?: string;
    city?: string;
    state?: string;
    amenities?: string | string[];
  }>;
}

// Metadata específica para Private Properties en inglés
export const metadata: Metadata = {
  title: 'Private Properties - Baruch Real Estate',
  description: 'Explore our exclusive collection of private properties. Premium real estate listings for discerning clients.',
  keywords: 'private properties, exclusive listings, premium real estate, luxury properties, Baruch',
  openGraph: {
    title: 'Private Properties - Baruch Real Estate',
    description: 'Explore our exclusive collection of private properties.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.baruchrealestate.com/private-properties',
    siteName: 'Baruch Real Estate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Properties - Baruch Real Estate',
    description: 'Explore our exclusive collection of private properties.',
  },
  alternates: {
    canonical: 'https://www.baruchrealestate.com/private-properties',
    languages: {
      'en': '/private-properties',
      'es': '/es/private-properties',
      'fr': '/fr/private-properties',
      'de': '/de/private-properties',
      'pl': '/pl/private-properties',
      'sv': '/sv/private-properties',
      'nl': '/nl/private-properties',
      'x-default': '/private-properties'
    }
  }
};

// Wrapper que pasa lang='en' y searchParams
export default async function RootPrivatePropertiesPage({ searchParams }: RootPrivatePropertiesPageProps) {
  return PrivatePropertiesPage({ 
    params: Promise.resolve({ lang: 'en' }),
    searchParams: searchParams || Promise.resolve({})
  });
}
