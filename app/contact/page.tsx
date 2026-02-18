import ContactPage from '../[lang]/contact/page';
import { Metadata } from 'next';

// Metadata específica para Contact en inglés
export const metadata: Metadata = {
  title: 'Contact Us - Baruch Real Estate',
  description: 'Get in touch with Baruch Real Estate. Contact our team of professionals for inquiries about properties, services, or any real estate needs.',
  keywords: 'contact, contact us, real estate contact, Baruch, get in touch',
  openGraph: {
    title: 'Contact Us - Baruch Real Estate',
    description: 'Get in touch with Baruch Real Estate. Contact our team for inquiries about properties and services.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.baruchrealestate.com/contact/',
    siteName: 'Baruch Real Estate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Baruch Real Estate',
    description: 'Get in touch with Baruch Real Estate. Contact our team for inquiries about properties and services.',
  },
  alternates: {
    canonical: 'https://www.baruchrealestate.com/contact/',
    languages: {
      'en': '/contact/',
      'es': '/es/contact/',
      'fr': '/fr/contact/',
      'de': '/de/contact/',
      'pl': '/pl/contact/',
      'sv': '/sv/contact/',
      'nl': '/nl/contact/',
      'x-default': '/contact/'
    }
  }
};

// Wrapper que pasa lang='en'
// El componente ContactPage no recibe params, así que solo lo llamamos directamente
export default async function RootContactPage() {
  return ContactPage();
}
