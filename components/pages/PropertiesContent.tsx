"use client";

import PropertyFilterStatic from "@/components/elements/property-filter-static";
import PropertieCardV1 from "@/components/sections/PropertieCardV1";

interface Category {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

interface Property {
    id: number;
    title: string;
    address: string;
    price: number;
    image: string;
    slug: string;
    status: string;
    category?: any;
    type?: string;
    city?: string;
    state?: string;
    amenities?: string[];
}

interface PropertiesContentProps {
    initialProperties: Property[];
    categories: Category[];
    searchParams: {
        category?: string;
        status?: string;
        keyword?: string;
        city?: string;
        state?: string;
        amenities?: string | string[];
    };
}

export default function PropertiesContent({ 
    initialProperties, 
    categories, 
    searchParams 
}: PropertiesContentProps) {

    return (
        <div className="property-inner-section-find">
            <div className="container">
                <div className="row">
                    {/* Sidebar con filtros */}
                    <div className="col-lg-3">
                        <PropertyFilterStatic categories={categories} />
                    </div>

                    {/* Lista de propiedades */}
                    <div className="col-lg-9">
                        {initialProperties && initialProperties.length > 0 ? (
                            <div className="row g-4">
                                {initialProperties.map((property: Property) => (
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
                        ) : (
                            <div className="text-center py-5">
                                <h3>No properties found</h3>
                                <p>Try adjusting your search criteria or browse all properties.</p>
                                <a href="/properties" className="btn btn-primary">
                                    View All Properties
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 