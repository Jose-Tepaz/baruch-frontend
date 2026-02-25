import { ReactNode } from "react";
import type { Metadata } from "next";

// Metadata dinámica basada en el idioma
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const canonicalPath = lang === "en" ? "/" : `/${lang}/`;

  return {
    title: {
      template: "%s | Baruch Real Estate",
      default: "Baruch Real Estate - Find Your Dream Property",
    },
    description:
      "Discover the best properties in your area. Browse houses, apartments, and commercial properties with Baruch Real Estate.",
    keywords:
      "real estate, properties, houses, apartments, commercial properties, Baruch",
    authors: [{ name: "Baruch Real Estate" }],
    creator: "Baruch Real Estate",
    publisher: "Baruch Real Estate",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://www.baruchrealestate.com"),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/",
        es: "/es/",
        fr: "/fr/",
        de: "/de/",
        pl: "/pl/",
        sv: "/sv/",
        nl: "/nl/",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "en" ? "en_US" : `${lang}_${lang.toUpperCase()}`,
      url: `https://www.baruchrealestate.com${canonicalPath}`,
      siteName: "Baruch Real Estate",
      title: "Baruch Real Estate - Find Your Dream Property",
      description:
        "Discover the best properties in your area. Browse houses, apartments, and commercial properties with Baruch Real Estate.",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Baruch Real Estate",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Baruch Real Estate - Find Your Dream Property",
      description:
        "Discover the best properties in your area. Browse houses, apartments, and commercial properties with Baruch Real Estate.",
      images: ["/og-image.jpg"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        {
          rel: "mask-icon",
          url: "/safari-pinned-tab.svg",
          color: "#5bbad5",
        },
      ],
    },
    manifest: "/site.webmanifest",
    other: {
      "msapplication-TileColor": "#da532c",
      "msapplication-config": "/browserconfig.xml",
      "theme-color": "#ffffff",
    },
  };
}

interface Props {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export default async function LocaleLayout({ children }: Props) {
  return <>{children}</>;
}
