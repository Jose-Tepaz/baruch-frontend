
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
import Testimonial2 from "@/components/sections/Testimonial2";
import Property1 from "@/components/sections/property1";
import Blog1 from "@/components/sections/Blog1";
import { getProperties } from "@/services/properties";
import PropertyList1 from "@/components/sections/PropertieList1";
import About3 from "@/components/sections/About3";
import imgLandscape from "@/public/assets/img/all-images/home/img-home.webp"



export default async function Home() {
    const properties = await getProperties();
    console.log(properties);
    return (
        <>
            <Layout>
                <Hero2 />
                <SearchBox />
                <About2 />
                <PropertyList1 properties={properties} />
                <Category1 />
                <About3/>
                <img src={imgLandscape.src} alt="baruch" style={{width: '100%', height: 'auto'}} />
                <Testimonial2 />
               
            </Layout>
            
        </>
    );
}
