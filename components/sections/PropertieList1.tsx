'use client'
import PropertieCardV1 from '@/components/sections/PropertieCardV1'

export default function PropertyList1({ properties }: { properties: any[] }) {
  return (
    <section className="py-5">
        <div className="row">
            <div className="col-lg-7 m-auto d-flex justify-content-center align-items-center">
                <div className="heading1">
                    <h2>Our Properties</h2>
                    <p>Discover Our Latest Properties</p>
                </div>
            </div>
        </div>
        <div className="space30"></div>
      <div className="container">
        <div className="row g-4">
          {properties.map(property => (
            <div key={property.id} className="col-md-4">
              <PropertieCardV1
                title={property.title}
                address={property.address}
                price={property.price}
                imageUrl={property.image}
                isNew={true}
                isForRent={true}
                url={property.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
