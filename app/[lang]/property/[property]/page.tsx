import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import Properties2Details from "@/components/sections/Properties2Details";
import PropertyInner from "@/components/sections/PropertyInner";
import PropertyBottom from "@/components/sections/PropertyBottom";
import getPropertyById from "@/services/property";
import PropertyDetails from "@/components/sections/PropertyDetails";




export default async function PropertyPage({ params }: { params: { property: string } }) {
    const { property } = await params;
    const propertyData = await getPropertyById(property);
    console.log(propertyData);
    return (
        <>
            <Layout>
                <Properties2Details property={propertyData} />
                <PropertyInner property={propertyData} />
                <div className="space30"></div>
            </Layout>
        </>
    );
}
