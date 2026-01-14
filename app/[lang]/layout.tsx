import { ReactNode } from 'react';
import WhatsAppButton from '@/components/elements/WhatsAppButton';
import { WHATSAPP_CONFIG } from '@/config/whatsapp';
import StoreProvider from "@/features/StoreProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import { Work_Sans, Libre_Baskerville } from 'next/font/google';
import CookieConsent from "@/components/elements/CookieConsent";
import TrackingScripts from "@/components/elements/TrackingScripts";
import type { Metadata } from 'next';

// Styles
import "../../public/assets/css/plugins/aos.css";
import "../../public/assets/css/plugins/bootstrap.min.css";
import "../../public/assets/css/plugins/fontawesome.css";
import "../../public/assets/css/plugins/magnific-popup.css";
import "../../public/assets/css/plugins/mobile.css";
import "../../public/assets/css/plugins/odometer.css";
import "../../public/assets/css/plugins/owlcarousel.min.css";
import "../../public/assets/css/plugins/sidebar.css";
import "../../public/assets/css/plugins/slick-slider.css";
import "../../public/assets/css/plugins/swiper-slider.css";
import "../../public/assets/css/main.css";
import "../../public/assets/css/custom-fonts.css";
import "../../public/assets/css/whatsapp-button.css";
import "intl-tel-input/build/css/intlTelInput.css";

const workSans = Work_Sans({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-work-sans',
});

const libreBaskerville = Libre_Baskerville({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap', 
    variable: '--font-libre-baskerville',
});

export const metadata: Metadata = {
    title: {
        template: '%s | Baruch Real Estate',
        default: 'Baruch Real Estate - Find Your Dream Property',
    },
    description: 'Discover the best properties in your area. Browse houses, apartments, and commercial properties with Baruch Real Estate.',
    keywords: 'real estate, properties, houses, apartments, commercial properties, Baruch',
    authors: [{ name: 'Baruch Real Estate' }],
    creator: 'Baruch Real Estate',
    publisher: 'Baruch Real Estate',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://www.baruchrealestate.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.baruchrealestate.com',
        siteName: 'Baruch Real Estate',
        title: 'Baruch Real Estate - Find Your Dream Property',
        description: 'Discover the best properties in your area. Browse houses, apartments, and commercial properties with Baruch Real Estate.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Baruch Real Estate',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Baruch Real Estate - Find Your Dream Property',
        description: 'Discover the best properties in your area. Browse houses, apartments, and commercial properties with Baruch Real Estate.',
        images: ['/og-image.jpg'],
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            {
                rel: 'mask-icon',
                url: '/safari-pinned-tab.svg',
                color: '#5bbad5',
            },
        ],
    },
    manifest: '/site.webmanifest',
    other: {
        'msapplication-TileColor': '#da532c',
        'msapplication-config': '/browserconfig.xml',
        'theme-color': '#ffffff',
    },
};

interface Props {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
          {/* Favicon links */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${workSans.variable} ${libreBaskerville.variable} ${workSans.className} homepage1-body body1`}>
          <StoreProvider>
              <AuthProvider>
                  {children}
              </AuthProvider>
          </StoreProvider>
          <WhatsAppButton 
            phoneNumber={WHATSAPP_CONFIG.phoneNumber}
          />
          {/* Tracking Scripts - Solo se cargan si hay consentimiento */}
          <TrackingScripts />
          <CookieConsent />
      </body>
    </html>
  );
} 