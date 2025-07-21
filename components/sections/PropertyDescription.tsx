"use client";
import "@/public/assets/css/propertyDetails.css";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface PropertyData {
    description: string | any;
    [key: string]: any;
}

export default function PropertyDetails({ property }: { property: PropertyData }) {
    console.log(property);
    
    // Formatear el precio con separadores de miles
    const formatPrice = (price: number | undefined) => {
        if (!price) return '';
        return `$${price.toLocaleString()}`;
    };

    return (
        <div className="property-details-hero">
            
                        <div className="property-hero-content">
                            <div className="d-flex flex-column gap-2">
                                {/* Details */}
                                <div className="property-description">
                                    <BlocksRenderer blocks={property.description} content={property.description} />
                                </div>
                                

                            </div>
                           
                           
                        </div>
                
            
           
        </div>
    );
}

