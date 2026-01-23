import PrivacyPolicyPage from '../[lang]/privacy-policy/page';
import { Metadata } from 'next';

// Metadata específica para Privacy Policy en inglés
export const metadata: Metadata = {
  title: 'Privacy Policy - Baruch Real Estate',
  description: 'Read our privacy policy to understand how Baruch Real Estate collects, uses, and protects your personal information.',
  keywords: 'privacy policy, data protection, personal information, Baruch, privacy',
  openGraph: {
    title: 'Privacy Policy - Baruch Real Estate',
    description: 'Read our privacy policy to understand how we protect your personal information.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.baruchrealestate.com/privacy-policy',
    siteName: 'Baruch Real Estate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Baruch Real Estate',
    description: 'Read our privacy policy to understand how we protect your personal information.',
  },
  alternates: {
    canonical: 'https://www.baruchrealestate.com/privacy-policy',
    languages: {
      'en': '/privacy-policy',
      'es': '/es/privacy-policy',
      'fr': '/fr/privacy-policy',
      'de': '/de/privacy-policy',
      'pl': '/pl/privacy-policy',
      'sv': '/sv/privacy-policy',
      'nl': '/nl/privacy-policy',
      'x-default': '/privacy-policy'
    }
  }
};

// Wrapper que pasa lang='en'
// El componente PrivacyPolicyPage no recibe params, así que solo lo llamamos directamente
export default async function RootPrivacyPolicyPage() {
  return PrivacyPolicyPage();
}
