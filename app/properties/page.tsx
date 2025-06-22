import PropertyFilter from "@/components/elements/property-filter"
import PropertieCardV1 from "@/components/sections/PropertieCardV1"
import Layout from "@/components/layout/Layout"
import { getProperties } from "@/services/properties"
import InnerHeader from "@/components/layout/InnerHeader";


export default async function PropertiesPage() {
    const properties = await getProperties();
    console.log(properties)
    return (
        <Layout>
            <InnerHeader title="Our Properties" currentpage="Our Properties" />
           <div className="space30" />
           
            <div className="property-inner-section-find ">
                <div className="container">
                <div className="row">
                {/* Sidebar con filtros */}
                <div className="col-lg-3">
                  <PropertyFilter />
                </div>

                {/* Lista de propiedades */}

                <div className="col-lg-9">
                    <div className="row g-4">
                        {properties?.map((property: any) => (
                            <div key={property.slug} className="col-md-6 col-lg-4">
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
            </div>
                </div>
            
        </div>

        </Layout>
        )
}

