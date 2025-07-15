"use client";

import { useLanguageData } from '@/hooks/useLanguageData'
import { getProperties } from '@/services/get-properties'
import { getCategories } from '@/services/categories'
import { getPropertyStatuses } from '@/services/property-status'
import { useState, useEffect } from 'react'
import PropertyFilterStatic from "@/components/elements/property-filter-static";
import PropertieCardV1 from "@/components/sections/PropertieCardV1";
import LanguageDebug from "@/components/debug/LanguageDebug";
import StrapiApiTest from "@/components/debug/StrapiApiTest";

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
}

interface PropertiesContentProps {
    initialProperties: Property[];
    categories: Category[];
    propertyStatuses?: PropertyStatus[];
    searchParams: {
        category?: string;
        property_status?: string;
        keyword?: string;
        city?: string;
        state?: string;
        amenities?: string | string[];
    };
}

export default function PropertiesContent({ 
    initialProperties, 
    categories: initialCategories, 
    propertyStatuses: initialStatuses,
    searchParams 
}: PropertiesContentProps) {
    const { category, property_status } = searchParams;
    
    // Función para obtener propiedades según filtros
    const fetchProperties = async (locale: string) => {
        try {
            console.log('=== PropertiesContent: Fetching properties with locale:', locale);
            console.log('=== PropertiesContent: Category filter:', category);
            console.log('=== PropertiesContent: Property status filter:', property_status);
            
            const result = await getProperties({ 
                categoryId: category, 
                locale 
            });
            
            console.log('=== PropertiesContent: API Response:', result);
            console.log('=== PropertiesContent: Properties fetched:', result?.properties?.length || 0);
            
            // Filtrar por property_status si está presente
            let properties = result?.properties || [];
            console.log('=== PropertiesContent: Properties before status filter:', properties.length);
            
            if (property_status && property_status.trim() !== '') {
                properties = properties.filter((property: any) => {
                    return property.propertyStatus === property_status;
                });
                console.log('=== PropertiesContent: Properties after status filter:', properties.length);
            }
            
            console.log('=== PropertiesContent: Final properties to return:', properties.length);
            console.log('=== PropertiesContent: First property:', properties[0]);
            
            return properties; // Devolver solo el array de propiedades
        } catch (error) {
            console.error('=== PropertiesContent: Error fetching properties:', error);
            return [];
        }
    };
    
    // Hooks para manejar cambios de idioma
    const { data: properties, loading: propertiesLoading, error: propertiesError } = useLanguageData(
        fetchProperties,
        initialProperties || [], // Solo pasar el array de propiedades
        [category, property_status] // Recargar cuando cambien los filtros
    );
    
    const { data: categories, loading: categoriesLoading } = useLanguageData(
        (locale: string) => getCategories(locale),
        initialCategories || [],
        []
    );
    
    const { data: propertyStatuses, loading: statusesLoading } = useLanguageData(
        (locale: string) => getPropertyStatuses(locale),
        initialStatuses || [],
        []
    );
    
    // Filtros adicionales (los que no se pueden hacer en el servidor)
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    
    useEffect(() => {
        console.log('=== PropertiesContent: Filtering properties ===');
        console.log('Raw properties:', properties);
        console.log('Properties length:', properties?.length || 0);
        console.log('Properties loading:', propertiesLoading);
        console.log('Properties error:', propertiesError);
        
        if (!properties || !Array.isArray(properties) || properties.length === 0) {
            console.log('=== PropertiesContent: No properties to filter ===');
            setFilteredProperties([]);
            return;
        }
        
        let filtered = [...properties];
        
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
    }, [properties, searchParams, propertiesLoading, propertiesError]);
    
    const isLoading = propertiesLoading || categoriesLoading || statusesLoading;
    


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
                    <div className="col-lg-9">
                        
                        
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
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <h4>No se encontraron propiedades</h4>
                                <p>Intenta cambiar los filtros de búsqueda</p>
                                <small className="text-muted">
                                    Debug: Properties={properties?.length || 0}, 
                                    Filtered={filteredProperties?.length || 0}, 
                                    Loading={isLoading ? 'Yes' : 'No'}
                                </small>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 