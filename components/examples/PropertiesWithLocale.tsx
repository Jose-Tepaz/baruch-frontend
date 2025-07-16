'use client';

import React, { useState, useEffect } from 'react';
import { getProperties, getPropertiesByCategory, getPropertyByDocumentId } from '@/services/properties';
import { getCategories } from '@/services/categories';
import { getPropertyStatuses } from '@/services/property-status';
import { useLanguage } from '@/hooks/useLanguage';

interface Property {
    id: number;
    documentId: string;
    title: string;
    description: string;
    price: number;
    address: string;
    image: string;
    slug: string;
    propertyStatus: string;
    category: any;
    is_private?: boolean;
}

interface Category {
    name: string;
    slug: string;
    description?: string;
    image: string;
}

export default function PropertiesWithLocale() {
    const { currentLanguage } = useLanguage();
    const [properties, setProperties] = useState<Property[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [propertyStatuses, setPropertyStatuses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar datos cuando cambie el idioma
    useEffect(() => {
        loadData();
    }, [currentLanguage]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Llamar a los servicios - ahora usan automáticamente el idioma seleccionado
            const [propertiesData, categoriesData, statusesData] = await Promise.all([
                getProperties({}), // Sin especificar locale - usa el idioma actual del selector
                getCategories(), // Sin especificar locale - usa el idioma actual del selector
                getPropertyStatuses() // Sin especificar locale - usa el idioma actual del selector
            ]);

            setProperties(propertiesData || []);
            setCategories(categoriesData || []);
            setPropertyStatuses(statusesData || []);

            console.log('=== Datos cargados con idioma:', currentLanguage, '===');
            console.log('Properties:', propertiesData);
            console.log('Categories:', categoriesData);
            console.log('Statuses:', statusesData);

        } catch (err) {
            console.error('Error cargando datos:', err);
            setError('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener propiedades por categoría
    const handleCategoryFilter = async (categorySlug: string) => {
        try {
            setLoading(true);
            const filteredProperties = await getPropertiesByCategory(
                categorySlug, 
                undefined
                // Sin especificar locale - usa automáticamente el idioma seleccionado
            );
            setProperties(filteredProperties || []);
        } catch (err) {
            console.error('Error filtrando por categoría:', err);
            setError('Error al filtrar propiedades');
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener una propiedad específica
    const handlePropertyDetail = async (documentId: string) => {
        try {
            const property = await getPropertyByDocumentId(documentId);
            // Sin especificar locale - usa automáticamente el idioma seleccionado
            console.log('Property detail:', property);
            // Aquí podrías abrir un modal o navegar a la página de detalle
        } catch (err) {
            console.error('Error obteniendo detalle de propiedad:', err);
        }
    };

    if (loading) {
        return <div className="loading">Cargando propiedades...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="properties-with-locale">
            <h2>Propiedades (Idioma: {currentLanguage})</h2>
            
            {/* Filtros por categoría */}
            <div className="category-filters">
                <h3>Filtrar por categoría:</h3>
                <button onClick={() => loadData()}>Todas</button>
                {categories.map((category) => (
                    <button
                        key={category.slug}
                        onClick={() => handleCategoryFilter(category.slug)}
                        className="category-filter-btn"
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Lista de propiedades */}
            <div className="properties-grid">
                {properties.map((property) => (
                    <div key={property.id} className="property-card">
                        <img src={property.image} alt={property.title} />
                        <h3>{property.title}</h3>
                        <p>{property.description}</p>
                        <p className="price">${property.price}</p>
                        <p className="address">{property.address}</p>
                        <p className="status">{property.propertyStatus}</p>
                        <button 
                            onClick={() => handlePropertyDetail(property.documentId)}
                            className="view-detail-btn"
                        >
                            Ver detalle
                        </button>
                    </div>
                ))}
            </div>

            {/* Información de debug */}
            <div className="debug-info">
                <h4>Debug Info:</h4>
                <p>Idioma actual: {currentLanguage}</p>
                <p>Propiedades encontradas: {properties.length}</p>
                <p>Categorías encontradas: {categories.length}</p>
                <p>Estados encontrados: {propertyStatuses.length}</p>
            </div>

            <style jsx>{`
                .properties-with-locale {
                    padding: 20px;
                }

                .category-filters {
                    margin-bottom: 20px;
                }

                .category-filter-btn {
                    margin-right: 10px;
                    padding: 8px 16px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .category-filter-btn:hover {
                    background: #0056b3;
                }

                .properties-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                }

                .property-card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 16px;
                    background: white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .property-card img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 4px;
                }

                .property-card h3 {
                    margin: 10px 0;
                    color: #333;
                }

                .price {
                    font-size: 1.2em;
                    font-weight: bold;
                    color: #007bff;
                }

                .address {
                    color: #666;
                    font-size: 0.9em;
                }

                .status {
                    background: #e9ecef;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.8em;
                    display: inline-block;
                    margin: 8px 0;
                }

                .view-detail-btn {
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    width: 100%;
                }

                .view-detail-btn:hover {
                    background: #218838;
                }

                .debug-info {
                    margin-top: 20px;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 4px;
                    border-left: 4px solid #007bff;
                }

                .loading, .error {
                    padding: 20px;
                    text-align: center;
                    font-size: 1.1em;
                }

                .error {
                    color: #dc3545;
                    background: #f8d7da;
                    border: 1px solid #f5c6cb;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
} 