"use client";

import { useState, useEffect } from 'react'
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

    // Filtros adicionales (los que no se pueden hacer en el servidor)
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

    useEffect(() => {

        if (!initialProperties || !Array.isArray(initialProperties) || initialProperties.length === 0) {
            setFilteredProperties([]);
            return;
        }

        let filtered = [...initialProperties];

        // Aplicar filtros locales
        const { keyword, city, state, amenities, category, property_status, location } = searchParams;

        if (keyword) {
            const searchTerm = keyword.toLowerCase();
            filtered = filtered.filter(property => {
                const title = property.title?.toLowerCase() || '';
                const description = property.description?.toLowerCase() || '';
                return title.includes(searchTerm) || description.includes(searchTerm);
            });
        }

        if (city) {
            filtered = filtered.filter(property => property.address?.toLowerCase().includes(city.toLowerCase()));
        }

        if (state) {
            filtered = filtered.filter(property => property.address?.toLowerCase().includes(state.toLowerCase()));
        }

        // Filtro por categorías (OR)
        if (category) {
            const categoryArray = Array.isArray(category) ? category : [category];
            if (categoryArray.length > 0) {
                filtered = filtered.filter(property => {
                    const propertyCategory = property.category;
                    if (!propertyCategory) return false;
                    
                    const categorySlug = propertyCategory.slug || propertyCategory.name?.toLowerCase();
                    return categoryArray.some(cat => 
                        categorySlug === cat.toLowerCase() || 
                        propertyCategory.name?.toLowerCase() === cat.toLowerCase()
                    );
                });
            }
        }

        // Filtro por ubicaciones (OR)
        if (location) {
            const locationArray = Array.isArray(location) ? location : [location];
            if (locationArray.length > 0) {
                filtered = filtered.filter(property => {
                    const propertyLocation = property.location;
                    if (!propertyLocation) return false;
                    
                    const locationName = typeof propertyLocation === 'string' 
                        ? propertyLocation 
                        : propertyLocation.name;
                    
                    return locationArray.some(loc => 
                        locationName?.toLowerCase().includes(loc.toLowerCase())
                    );
                });
            }
        }

        // Filtro por estados de propiedad (OR)
        if (property_status) {
            const statusArray = Array.isArray(property_status) ? property_status : [property_status];
            if (statusArray.length > 0) {
                filtered = filtered.filter(property => {
                    const propertyStatus = property.propertyStatus || property.status;
                    if (!propertyStatus) return false;
                    
                    return statusArray.some(status => 
                        propertyStatus.toLowerCase() === status.toLowerCase()
                    );
                });
            }
        }

        // Filtro por amenities (OR)
        if (amenities) {
            const amenityArray = Array.isArray(amenities) ? amenities : [amenities];
            if (amenityArray.length > 0) {
                filtered = filtered.filter(property => {
                    const propertyAmenities = property.amenities || [];
                    const propertyAmenityNames = propertyAmenities.map((amenity: any) => amenity.Name);
                    return amenityArray.some(amenity => 
                        propertyAmenityNames.includes(amenity)
                    );
                });
            }
        }

        setFilteredProperties(filtered);
    }, [initialProperties, searchParams]);

    const isLoading = false; // Ya no hay loading porque usamos datos del servidor

    return (
        <div className="property-inner-section-find">


            <div className="container">
                <div className="row">
                    {/* Sidebar con filtros */}
                    <div className="col-lg-3">
                        <PropertyFilterStatic
                            categories={categories}
                            propertyStatuses={propertyStatuses}
                            amenities={amenities}
                            locations={locations}
                        />
                    </div>

                    {/* Lista de propiedades */}
                    <div className="col-lg-9 wrapp-content--properties-list" >


                        {isLoading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">{t('properties.loading')}</span>
                                </div>
                                <p className="mt-3">{t('properties.loading')}</p>
                            </div>
                        ) : (filteredProperties && filteredProperties.length > 0) ? (
                            <div className="row g-4">
                                {filteredProperties.map((property: Property) => (
                                    <div key={property.slug} className="col-md-6 col-lg-4">
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
                                basePath={`/${(lang || 'en')}/properties`}
                            />
                        </div>
                        <div className="space30"></div>
                    </div>
                </div>
            </div>
        </div>
    );
} 