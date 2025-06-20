
import Layout from "@/components/layout/Layout";
import About1 from "@/components/sections/About1";
import About2 from "@/components/sections/About2";
import Hero1 from "@/components/sections/Hero1";
import Hero2 from "@/components/sections/Hero2";
import SearchBox from "@/components/sections/SearchBox";
import Category1 from "@/components/sections/Category1";
import Properties1 from "@/components/sections/Properties1";
import PropertyLocation1 from "@/components/sections/PropertyLocation1";
import Team1 from "@/components/sections/Team1";
import Testimonial1 from "@/components/sections/Testimonial1";
import Property1 from "@/components/sections/property1";
import Blog1 from "@/components/sections/Blog1";
import { getProperties } from "@/services/properties";
import PropertyList1 from "@/components/sections/PropertieList1";




export default async function Home() {
    const properties = await getProperties();
    console.log(properties);
    return (
        <>
            <Layout>
                <Hero2 />
                <SearchBox />
                <About2 />
                
                <Property1 />
                <Category1 />
                <PropertyList1 properties={properties} />
                <Testimonial1 />
               
            </Layout>
            
        </>
    );
}
