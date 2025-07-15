'use client';

import { useLanguageData } from '@/hooks/useLanguageData';
import { getProperties } from '@/services/get-properties';
import PropertieCardV1 from '@/components/sections/PropertieCardV1';

interface CategoryContentProps {
    categoryId: string;
    initialProperties: any[];
}

export default function CategoryContent({ categoryId, initialProperties }: CategoryContentProps) {
    // Usar el hook personalizado para manejar cambios de idioma
    const { data: propertiesData, loading, error } = useLanguageData(
        (locale: string) => getProperties({ categoryId, locale }),
        { properties: initialProperties || [], pagination: {} },
        [categoryId] // Recargar cuando cambie la categoría
    );

    // Extraer las propiedades del objeto de respuesta
    const properties = propertiesData?.properties || [];

    // Debug: Log properties data (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
        console.log('=== CategoryContent Component DEBUG ===');
        console.log('Category ID:', categoryId);
        console.log('Initial properties:', initialProperties?.length || 0);
        console.log('Current properties:', properties?.length || 0);
        console.log('Loading:', loading);
        console.log('Error:', error);
    }

    if (loading) {
        return (
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 m-auto d-flex justify-content-center align-items-center">
                            <div className="heading1">
                                <h2>{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}</h2>
                                <p>Cargando propiedades...</p>
                            </div>
                        </div>
                    </div>
                    <div className="space30"></div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 m-auto d-flex justify-content-center align-items-center">
                            <div className="heading1">
                                <h2>{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}</h2>
                                <p>Error al cargar las propiedades</p>
                            </div>
                        </div>
                    </div>
                    <div className="space30"></div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="alert alert-danger">
                                Error: {error}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!properties || properties.length === 0) {
        return (
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 m-auto d-flex justify-content-center align-items-center">
                            <div className="heading1">
                                <h2>{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}</h2>
                                <p>No se encontraron propiedades en esta categoría</p>
                            </div>
                        </div>
                    </div>
                    <div className="space30"></div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="alert alert-info">
                                No hay propiedades disponibles en esta categoría.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
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
                                documentId={property.documentId}
                                propertyStatus={property.propertyStatus}
                                isNew={property.is_new}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 