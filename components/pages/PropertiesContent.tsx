"use client";

import { useState, useEffect } from 'react'
import PropertyFilterStatic from "@/components/elements/property-filter-static";
import PropertieCardV1 from "@/components/sections/PropertieCardV1";
import LanguageDebug from "@/components/debug/LanguageDebug";
import StrapiApiTest from "@/components/debug/StrapiApiTest";
import Pagination from "@/components/elements/Pagination";
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
    amenities?: string[];
    documentId: string;
    description?: string;
    is_private?: boolean;
    location?: string;
}

interface PropertiesContentProps {
    initialProperties: Property[];
    categories: Category[];
    propertyStatuses?: PropertyStatus[];
    searchParams: {
        category?: string;
        property_status?: string;
        bedrooms?: string;
        bathrooms?: string;
        min_price?: string;
        max_price?: string;
        location?: string;
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
    searchParams,
    pagination,
    lang
}: PropertiesContentProps) {

    // Filtros adicionales (los que no se pueden hacer en el servidor)
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

    useEffect(() => {
        console.log('=== PropertiesContent: Filtering properties ===');
        console.log('Raw properties:', initialProperties);
        console.log('Properties length:', initialProperties?.length || 0);

        if (!initialProperties || !Array.isArray(initialProperties) || initialProperties.length === 0) {
            console.log('=== PropertiesContent: No properties to filter ===');
            setFilteredProperties([]);
            return;
        }

        let filtered = [...initialProperties];

        // Aplicar filtros locales
        const { keyword, city, state, amenities } = searchParams;

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

        if (amenities) {
            const amenityArray = Array.isArray(amenities) ? amenities : [amenities];
            if (amenityArray.length > 0) {
                // Nota: necesitarías implementar la lógica de amenities según tu estructura de datos
                // filtered = filtered.filter(property => /* lógica de amenities */);
            }
        }

        console.log('=== PropertiesContent: Filtered properties count:', filtered.length);
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
                        />
                    </div>

                    {/* Lista de propiedades */}
                    <div className="col-lg-9 wrapp-content--properties-list" >


                        {isLoading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p className="mt-3">Cargando propiedades...</p>
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
                                            propertyStatus={property.propertyStatus || property.status}
                                            isNew={property.status === 'new'}
                                            location={property.location || ''}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <h4>No se encontraron propiedades</h4>
                                <p>Intenta cambiar los filtros de búsqueda</p>
                                <small className="text-muted">
                                    Debug: Properties={initialProperties?.length || 0},
                                    Filtered={filteredProperties?.length || 0},
                                    Loading={isLoading ? 'Yes' : 'No'}
                                </small>
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