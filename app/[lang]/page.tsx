import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getProperties } from "@/services/properties";
import { getCategories } from "@/services/categories";
import { getPropertyStatuses } from "@/services/property-status";
import { getHomeInfo } from "@/services/get-home-info";
import imgLandscape from "@/public/assets/img/all-images/home/img-home.webp"

// Importar componentes del cliente dinámicamente
const Layout = dynamic(() => import("@/components/layout/Layout"), { ssr: true });
const Hero2 = dynamic(() => import("@/components/sections/Hero2"), { ssr: true });
const SearchBox = dynamic(() => import("@/components/sections/SearchBox"), { ssr: true });
const About2 = dynamic(() => import("@/components/sections/About2"), { ssr: true });
const PropertyList1 = dynamic(() => import("@/components/sections/PropertieList1"), { ssr: true });
const Category1 = dynamic(() => import("@/components/sections/Category1"), { ssr: true });
const About3 = dynamic(() => import("@/components/sections/About3"), { ssr: true });
const Testimonial2 = dynamic(() => import("@/components/sections/Testimonial2"), { ssr: true });

interface Props {
  params: {
    lang: string;
  };
}

const allowedLocales = ['en', 'es', 'fr', 'de', 'it', 'pt'];

export default async function Home({ params: { lang } }: Props) {
    // Validar que el idioma sea permitido
    if (!allowedLocales.includes(lang)) {
      redirect('/en');
    }

    try {
        const [properties, categories, propertyStatuses, homeInfo] = await Promise.all([
            getProperties({ locale: lang }),
            getCategories(lang),
            getPropertyStatuses(lang),
            getHomeInfo(lang)
        ]);

        console.log('=== Home Page Debug ===');
        console.log('Language:', lang);
        console.log('Home Info:', homeInfo);
        console.log('About2 Data:', homeInfo?.data?.about2);
        console.log('About3 Data:', homeInfo?.data?.about3);

        return (
            <Layout>
                <Hero2 homeInfo={homeInfo?.data} />
                <SearchBox 
                    categories={categories || []}
                    propertyStatuses={propertyStatuses || []}
                />
                <About2 homeInfo={homeInfo?.data} />
                <PropertyList1 properties={properties || []} />
                <Category1 categories={categories || []} />
                <About3 homeInfo={homeInfo?.data?.about3} />
                <img src={imgLandscape.src} alt="baruch" style={{width: '100%', height: 'auto'}} />
                <Testimonial2 />
            </Layout>
        );
    } catch (error) {
        console.error('=== Home Page: Error loading data ===', error);
        
        return (
            <Layout>
                <Hero2 />
                <SearchBox 
                    categories={[]}
                    propertyStatuses={[]}
                />
                <About2 homeInfo={undefined} />
                <PropertyList1 properties={[]} />
                <Category1 categories={[]} />
                <About3 homeInfo={undefined} />
                <img src={imgLandscape.src} alt="baruch" style={{width: '100%', height: 'auto'}} />
                <Testimonial2 />
            </Layout>
        );
    }
}

// Generar rutas estáticas para todos los idiomas soportados
export async function generateStaticParams() {
  return allowedLocales.map((lang) => ({
    lang,
  }));
} 