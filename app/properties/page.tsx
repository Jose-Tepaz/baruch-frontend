import PropertiesPage from '../[lang]/properties/page';
import { Metadata } from 'next';

interface RootPropertiesPageProps {
  searchParams?: Promise<{
    category?: string | string[];
    property_status?: string | string[];
    bedrooms?: string;
    bathrooms?: string;
    min_price?: string;
    max_price?: string;
    location?: string | string[];
    keyword?: string;
    city?: string;
    state?: string;
    amenities?: string | string[];
    page?: string;
  }>;
}

// Metadata específica para Properties en inglés
export const metadata: Metadata = {
  title: 'Properties for Sale - Baruch Real Estate',
  description: 'Browse our extensive collection of properties for sale. Find houses, apartments, and commercial properties with Baruch Real Estate.',
  keywords: 'properties for sale, real estate, houses, apartments, commercial properties, Baruch',
  openGraph: {
    title: 'Properties for Sale - Baruch Real Estate',
    description: 'Browse our extensive collection of properties for sale. Find your perfect property today.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.baruchrealestate.com/properties',
    siteName: 'Baruch Real Estate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Properties for Sale - Baruch Real Estate',
    description: 'Browse our extensive collection of properties for sale. Find your perfect property today.',
  },
  alternates: {
    canonical: 'https://www.baruchrealestate.com/properties',
    languages: {
      'en': '/properties',
      'es': '/es/properties',
      'fr': '/fr/properties',
      'de': '/de/properties',
      'pl': '/pl/properties',
      'sv': '/sv/properties',
      'nl': '/nl/properties',
      'x-default': '/properties'
    }
  }
};

// Wrapper que pasa lang='en' y searchParams
export default async function RootPropertiesPage({ searchParams }: RootPropertiesPageProps) {
  return PropertiesPage({ 
    params: Promise.resolve({ lang: 'en' }),
    searchParams: searchParams || Promise.resolve({})
  });
}
