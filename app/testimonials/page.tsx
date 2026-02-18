import TestimonialsPage from '../[lang]/testimonials/page';
import { Metadata } from 'next';

// Metadata específica para Testimonials en inglés
export const metadata: Metadata = {
  title: 'Client Testimonials - Baruch Real Estate',
  description: 'Read what our clients say about their experience with Baruch Real Estate. Discover why they trust us with their property needs.',
  keywords: 'testimonials, client reviews, real estate reviews, Baruch, customer feedback',
  openGraph: {
    title: 'Client Testimonials - Baruch Real Estate',
    description: 'Read what our clients say about their experience with Baruch Real Estate.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.baruchrealestate.com/testimonials/',
    siteName: 'Baruch Real Estate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Testimonials - Baruch Real Estate',
    description: 'Read what our clients say about their experience with Baruch Real Estate.',
  },
  alternates: {
    canonical: 'https://www.baruchrealestate.com/testimonials/',
    languages: {
      'en': '/testimonials/',
      'es': '/es/testimonials/',
      'fr': '/fr/testimonials/',
      'de': '/de/testimonials/',
      'pl': '/pl/testimonials/',
      'sv': '/sv/testimonials/',
      'nl': '/nl/testimonials/',
      'x-default': '/testimonials/'
    }
  }
};

interface Props {
  searchParams?: Promise<{ page?: string }>;
}

// Wrapper que pasa lang='en' y searchParams
export default async function RootTestimonialsPage({ searchParams }: Props) {
  return TestimonialsPage({ 
    params: Promise.resolve({ lang: 'en' }),
    searchParams: searchParams || Promise.resolve({})
  });
}
