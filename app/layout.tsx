import "../public/assets/css/plugins/aos.css";
import "../public/assets/css/plugins/bootstrap.min.css";
import "../public/assets/css/plugins/fontawesome.css";
import "../public/assets/css/plugins/magnific-popup.css";
import "../public/assets/css/plugins/mobile.css";
import "../public/assets/css/plugins/odometer.css";
// import "../public/assets/css/plugins/nice-select.css";
import "../public/assets/css/plugins/owlcarousel.min.css";
import "../public/assets/css/plugins/sidebar.css";
import "../public/assets/css/plugins/slick-slider.css";
import "../public/assets/css/plugins/swiper-slider.css";
import "../public/assets/css/main.css";
import "../public/assets/css/custom-fonts.css";
import "../public/assets/css/whatsapp-button.css";
import "intl-tel-input/build/css/intlTelInput.css";

import StoreProvider from "@/features/StoreProvider";
import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Work_Sans, Libre_Baskerville } from 'next/font/google';
//import './globals.css' 

const inter = Inter({ subsets: ['latin'] })

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
    metadataBase: new URL('https://baruch.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://baruch.com',
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
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                {/* Favicon links */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                
                {/* Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-3T8ZDQF1LN"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-3T8ZDQF1LN');
                        `,
                    }}
                />
                
                {/* Meta Pixel Code */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            !function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', '2279246495831999');
                            fbq('track', 'PageView');
                        `,
                    }}
                />
                <noscript>
                    <img 
                        height="1" 
                        width="1" 
                        style={{display: 'none'}}
                        src="https://www.facebook.com/tr?id=2279246495831999&ev=PageView&noscript=1"
                        alt=""
                    />
                </noscript>
                
            </head>
            <body className={`${workSans.variable} ${libreBaskerville.variable} ${workSans.className} homepage1-body body1`}>
                <StoreProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
