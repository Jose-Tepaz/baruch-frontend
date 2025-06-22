import { getProperties } from "@/services/get-properties";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import PropertieCardV1 from "@/components/sections/PropertieCardV1";
import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";

export default async function CategoryPage(
    { params }: { params: { categoryId: string } }
) { 
    const { categoryId } = await params
    const { properties } = await getProperties({ categoryId })
    console.log(properties)
    return (
        <Layout>
            <InnerHeader title="Our Properties" currentpage="Our Properties" />
            <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 m-auto d-flex justify-content-center align-items-center">
                        <div className="heading1">
                            <h2>{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}</h2>
                            <p>Discover Our Latest Properties</p>
                        </div>
                    </div>
                </div>
                <div className="space30"></div>
                <div className="row g-4">
                    {properties.map((property: any) => (
                <div key={property.slug} className="col-md-4">
                    <PropertieCardV1
                        title={property.title}
                        address={property.address}
                        price={property.price}
                        imageUrl={property.image}
                        url={property.slug}
                        isNew={property.status === 'new'}
                        isForRent={property.status === 'rent'}
                    />
                </div>
            ))}
            </div>
        </div>
        </section>
        </Layout>
    )
}




