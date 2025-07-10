import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import AboutHero from "@/components/sections/AboutHero";
import About1 from "@/components/sections/About1";
import Others4 from "@/components/sections/Others4";
import Others3 from "@/components/sections/Others3";
import Team1 from "@/components/sections/Team1";
import Testimonial1 from "@/components/sections/Testimonial1";
import Property1 from "@/components/sections/property1";
import PropertyList1 from "@/components/sections/PropertieList1";
import { getProperties } from "@/services/properties";

export default async function Home() {
    const properties = await getProperties();
    
    return (
        <>
            <Layout>
                
                <AboutHero />
               <div className="space30"></div>
                <Others3 />
                <Others4 />
                <PropertyList1 properties={properties} />
                
                <div className="space30"></div>
                <Team1 />
                
                <div className="space30"></div>
            </Layout>
        </>
    );
}
