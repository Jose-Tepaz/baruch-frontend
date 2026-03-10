import dynamic from "next/dynamic";
import { getProperties } from "@/services/get-properties";
import { getCategories } from "@/services/categories";
import { getPropertyStatuses } from "@/services/property-status";
import { getAmenities } from "@/services/amenities";
import { getLocations } from "@/services/locations";
import imgLandscape from "@/public/assets/img/all-images/home/hp-6.webp";
import HeroHome from "@/components/sections/HeroHome";
import JsonLd from "@/components/elements/JsonLd";
import { Organization } from "schema-dts";
import { COMPANY_SEO } from "@/config/company-seo";

const Layout = dynamic(() => import("@/components/layout/Layout"), {
  ssr: true,
});
const SearchBox = dynamic(() => import("@/components/sections/SearchBox"), {
  ssr: true,
});
const About2 = dynamic(() => import("@/components/sections/About2"), {
  ssr: true,
});
const PropertyList1 = dynamic(
  () => import("@/components/sections/PropertieList1"),
  { ssr: true },
);
const Category1 = dynamic(() => import("@/components/sections/Category1"), {
  ssr: true,
});
const About3 = dynamic(() => import("@/components/sections/About3"), {
  ssr: true,
});

export default async function HomeContent() {
  const [propertiesResult, categories, propertyStatuses, amenities, locations] =
    await Promise.all([
      getProperties({ locale: "en", onlyPrivate: false }),
      getCategories("en"),
      getPropertyStatuses("en"),
      getAmenities("en"),
      getLocations("en").catch(() => []),
    ]);

  const properties = propertiesResult?.properties || [];

  return (
    <Layout>
      <JsonLd<Organization>
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: COMPANY_SEO.name,
          url: COMPANY_SEO.url,
          logo: COMPANY_SEO.logo,
          description: COMPANY_SEO.description,
          address: {
            "@type": "PostalAddress",
            streetAddress: COMPANY_SEO.address.streetAddress,
            postalCode: COMPANY_SEO.address.postalCode,
            addressLocality: COMPANY_SEO.address.addressLocality,
            addressCountry: COMPANY_SEO.address.addressCountry,
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: COMPANY_SEO.phone,
            contactType: "customer service",
          },
        }}
      />
      <HeroHome properties={properties || []} />
      <SearchBox
        categories={categories || []}
        propertyStatuses={propertyStatuses || []}
        amenities={amenities || []}
        locations={locations || []}
      />
      <About2 />
      <PropertyList1 properties={properties || []} />
      <img
        className="img-landscape"
        src={imgLandscape.src}
        alt="baruch"
        style={{ width: "100%", height: "auto" }}
      />
      <Category1 categories={categories || []} />
      <About3 />
    </Layout>
  );
}
