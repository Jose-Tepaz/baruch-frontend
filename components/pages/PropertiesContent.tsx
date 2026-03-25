"use client";

import PropertyFilterStatic from "@/components/elements/property-filter-static";
import PropertieCardV1 from "@/components/sections/PropertieCardV1";
import Pagination from "@/components/elements/Pagination";
import { t } from "@/utils/i18n-simple"; 

interface Category {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

interface PropertyStatus {
    id: number;
    documentId: string;
    Title: string;
}

interface Property {
    id: number;
    title: string;
    address: string;
    price: number;
    image: string;
    slug: string;
    status: string;
    propertyStatus?: string;
    category?: any;
    type?: string;
    city?: string;
    state?: string;
    amenities?: Array<{
        id: number;
        Name: string;
        slug: string;
    }>;
    documentId: string;
    description?: string;
    highlight?: string;
    is_private?: boolean;
    location?: string | { name: string; slug: string };
    sold?: boolean;
    unitPrices?: number[];
}

interface Amenity {
    id: number;
    documentId: string;
    Name: string;
    slug: string;
}

interface Location {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string;
}

interface PropertiesContentProps {
    initialProperties: Property[];
    categories: Category[];
    propertyStatuses?: PropertyStatus[];
    amenities?: Amenity[];
    locations?: Location[];
    searchParams: {
        category?: string | string[];
        property_status?: string | string[];
        bedrooms?: string;
        bathrooms?: string;
        min_price?: string;
        max_price?: string;
        location?: string | string[];
        keyword?: string;
        city?: string;
        state?: string;
        amenities?: string | string[];
    };
    pagination: { page: number; pageSize: number; pageCount: number; total: number };
    lang?: string;
}

export default function PropertiesContent({
    initialProperties,
    categories,
    propertyStatuses,
    amenities = [],
    locations = [],
    searchParams,
    pagination,
    lang
}: PropertiesContentProps) {

    return (
        <div className="property-inner-section-find">

            <div className="container">
                <div className="col-12 d-flex flex-column gap-4">
                    <div className="col-lg-12">
                        <PropertyFilterStatic
                            categories={categories}
                            propertyStatuses={propertyStatuses}
                            amenities={amenities}
                            locations={locations}
                        />
                    </div>

                    <div className="col-lg-12 wrapp-content--properties-list">
                        {initialProperties && initialProperties.length > 0 ? (
                            <div className="wrapp-list-properties">
                                {initialProperties.map((property: Property) => (
                                    <div key={property.slug} className=" ">
                                        <PropertieCardV1
                                            title={property.title}
                                            address={property.address}
                                            price={property.price}
                                            imageUrl={property.image}
                                            documentId={property.documentId}
                                            slug={property.slug}
                                            propertyStatus={property.propertyStatus || property.status}
                                            isNew={property.status === 'new'}
                                            location={typeof property.location === 'string' ? property.location : property.location?.name || ''}
                                            highlight={property.highlight}
                                            sold={property.sold}
                                            unitPrices={property.unitPrices}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <h4>{t('properties.no_properties')}</h4>
                                <p>{t('properties.no_properties_description')}</p>
                            </div>
                        )}
                        <div className="mt-5 col-12 mt-4 d-flex justify-content-center">
                            <Pagination
                                page={pagination.page}
                                pageCount={pagination.pageCount}
                                searchParams={searchParams}
                                basePath={lang === 'en' ? '/properties' : `/${lang}/properties`}
                            />
                        </div>
                        <div className="space30"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}