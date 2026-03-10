import HomePage from "./[lang]/page";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Baruch Real Estate - Find Your Dream Property",
    description:
      "Discover the best properties in your area. Browse houses, apartments, and commercial properties with Baruch Real Estate.",
    keywords:
      "real estate, properties, houses, apartments, commercial properties, Baruch",
    metadataBase: new URL("https://www.baruchrealestate.com"),
    openGraph: {
      title: "Baruch Real Estate - Find Your Dream Property",
      description:
        "Discover the best properties in your area. Browse houses, apartments, and commercial properties with Baruch Real Estate.",
      type: "website",
      locale: "en_US",
      url: "https://www.baruchrealestate.com/",
      siteName: "Baruch Real Estate",
      images: [
        {
          url: "https://www.baruchrealestate.com/og-image.jpg",
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
      images: ["https://www.baruchrealestate.com/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://www.baruchrealestate.com/",
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
  };
}

// Wrapper que pasa lang='en' al componente HomePage
export default async function RootHomePage() {
  return HomePage({
    params: Promise.resolve({ lang: "en" }),
  });
}
