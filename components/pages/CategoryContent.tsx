'use client';

import PropertieCardV1 from '@/components/sections/PropertieCardV1';
import { useTranslation } from '@/utils/i18n-simple';

interface CategoryContentProps {
    categoryId: string;
    initialProperties: any[];
}

export default function CategoryContent({ categoryId, initialProperties }: CategoryContentProps) {
    const { t } = useTranslation('common');
    const properties = initialProperties || [];

    // Debug: Log properties data (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
        console.log('=== CategoryContent Component DEBUG ===');
        console.log('Category ID:', categoryId);
        console.log('Properties count:', properties?.length || 0);
        console.log('First property:', properties?.[0]);
    }

    if (!properties || properties.length === 0) {
        return (
            <section className="container-result-category">
                <div className="container ">
                    <div className="row">
                        <div className="col-lg-7 m-auto d-flex justify-content-center align-items-center">
                            <div className="heading1">
                                <h2>{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}</h2>
                                
                            </div>
                        </div>
                    </div>
                    <div className="space30"></div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="alert alert-info">
                                {t("categories.noPropertiesAvailable")}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="container-result-category">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 m-auto d-flex justify-content-center align-items-center">
                        <div className="heading1">
                            <h2>{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}</h2>
                            
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
                                slug={property.slug}
                                propertyStatus={property.propertyStatus}
                                isNew={property.is_new}
                                highlight={property.highlight}
                                location={typeof property.location === 'string' ? property.location : property.location?.name || ''}
                                sold={property.sold}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 