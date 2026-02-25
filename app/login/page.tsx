import LoginPage from "../[lang]/login/page";
import { Metadata } from "next";

// Metadata específica para Login en inglés
export const metadata: Metadata = {
  title: "Login - Baruch Real Estate",
  description:
    "Login to your Baruch Real Estate account to access exclusive features and manage your property listings.",
  keywords: "login, sign in, account, Baruch, user login",
  openGraph: {
    title: "Login - Baruch Real Estate",
    description: "Login to your Baruch Real Estate account.",
    type: "website",
    locale: "en_US",
    url: "https://www.baruchrealestate.com/login/",
    siteName: "Baruch Real Estate",
  },
  robots: {
    index: false, // No indexar páginas de login
    follow: true,
  },
  alternates: {
    canonical: "https://www.baruchrealestate.com/login/",
    languages: {
      en: "/login/",
      es: "/es/login/",
      fr: "/fr/login/",
      de: "/de/login/",
      pl: "/pl/login/",
      sv: "/sv/login/",
      nl: "/nl/login/",
      "x-default": "/login/",
    },
  },
};

// Wrapper que pasa lang='en'
// LoginPage es un componente cliente, así que lo renderizamos directamente
export default function RootLoginPage() {
  return <LoginPage params={Promise.resolve({ lang: "en" })} />;
}
