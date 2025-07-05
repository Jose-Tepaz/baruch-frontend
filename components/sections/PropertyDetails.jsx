"use client";
import "@/public/assets/css/propertyDetails.css";
import Link from "next/link";

export default function PropertyDetails({ property }) {
    console.log(property);
    
    // Formatear el precio con separadores de miles
    const formatPrice = (price) => {
        if (!price) return '';
        return `$${price.toLocaleString()}`;
    };

    return (
        <div className="property-details-hero">
            
                        <div className="property-hero-content">
                            <div className="d-flex flex-column gap-2">
                                {/* Etiqueta de estado */}
                                <div className="property-status-tag">
                                <span className="status-badge for-sale">En Venta</span>
                                </div>
                                {/* Título principal */}
                                <h1 className="text-anime-style-3 heading-style-h1">{property.title}</h1>
                            
                                {/* Dirección con icono */}
                                <div className="property-location d-flex align-items-center gap-2">
                                    <i className="fas fa-map-marker-alt text-color-blue"></i>
                                    <span className="">{property.address}</span>
                                </div>
                                 {/* Información de la propiedad */}
                                 <div className="property-features">
                                    <div className="feature-item">
                                        <i className="fas fa-expand-arrows-alt"></i>
                                        <span>{property.area || '2150'} sqft</span>
                                    </div>
                                    <div className="feature-item">
                                        <i className="fas fa-bed"></i>
                                        <span>{property.bedrooms} Bedrooms</span>
                                    </div>
                                    <div className="feature-item">
                                        <i className="fas fa-bath"></i>
                                        <span>{property.bathrooms} Bathrooms</span>
                                    </div>
                                </div>

                            </div>
                           
                            {/* Contenedor principal con información y precio */}
                            <div className="property-main-info">
                                {/* Precio y botón de contacto */}
                                <div className="property-price-section">
                                    <div className="property-price">
                                        {formatPrice(property.price)}
                                    </div>
                                    <Link className="contact-btn"  href="#contact">
                                    Contáctanos
                                    <i className="fas fa-arrow-right"></i>
                                    </Link>
                                    
                                </div>
                            </div>
                        </div>
                
            
           
        </div>
    );
}

