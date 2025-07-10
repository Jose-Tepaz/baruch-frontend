import "/public/assets/css/plugins/aos.css";
import "/public/assets/css/plugins/bootstrap.min.css";
import "/public/assets/css/plugins/fontawesome.css";
import "/public/assets/css/plugins/magnific-popup.css";
import "/public/assets/css/plugins/mobile.css";
import "/public/assets/css/plugins/odometer.css";
import "/public/assets/css/plugins/nice-select.css";
import "/public/assets/css/plugins/owlcarousel.min.css";
import "/public/assets/css/plugins/sidebar.css";
import "/public/assets/css/plugins/slick-slider.css";
import "/public/assets/css/plugins/swiper-slider.css";
import "/public/assets/css/main.css";
import "/public/assets/css/custom-fonts.css";

import StoreProvider from "@/features/StoreProvider";
import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import { Work_Sans, Libre_Baskerville } from 'next/font/google';

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
    title: "Housa - Real Esate Next.js Template",
    description: "Made by AliThemes",
    icons: {
        icon: [
            { url: '/assets/img/logo/favicon.png' },
            { url: '/assets/img/logo/favicon.png', sizes: '16x16', type: 'image/png' },
            { url: '/assets/img/logo/favicon.png', sizes: '32x32', type: 'image/png' },
            { url: '/assets/img/logo/favicon.png', sizes: '192x192', type: 'image/png' },
            { url: '/assets/img/logo/favicon.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [
            { url: '/assets/img/logo/favicon.png' },
        ],
        shortcut: ['/assets/img/logo/favicon.png'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
           
            <body className={`${workSans.variable} ${libreBaskerville.variable} ${workSans.className} homepage1-body body1`}>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
