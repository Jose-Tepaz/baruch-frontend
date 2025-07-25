"use client";
import "@/public/assets/css/propertyDetails.css";
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";

export default function PropertyDetails({ property }) {
  
    const { t } = useTranslation('common');
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
                                <span className="status-badge for-sale">{property.propertyStatus}</span>
                                </div>
                                {/* Título principal */}
                                <h1 className="heading-style-h1">{property.title}</h1>
                            
                                {/* Dirección con icono */}
                                <div className="property-location d-flex align-items-center gap-2">
                                    <i className="fas fa-map-marker-alt text-color-blue"></i>
                                    <span className="">{property.address}</span>
                                </div>
                                 {/* Información de la propiedad */}
                                 <div className="property-features">
                                    <div className="feature-item">
                                        <i className="fas fa-expand-arrows-alt"></i>
                                        <span>{property.built_area.toLocaleString()  || '2150'} sqft {t("propertyDetails.built_area-text")}</span>
                                       
                                    </div>
                                    <div className="feature-item">
                                       
                                        <i className="fas fa-expand-arrows-alt"></i>
                                        <span>{property.lot_area.toLocaleString()  || '2150'} sqft {t("propertyDetails.lot_area-text")}</span>
                                        
                                    </div>
                                    <div className="feature-item">
                                        <i className="fas fa-car"></i>
                                        <span>{property.parking_spaces} {t("propertyDetails.parking_spaces-text")}</span>
                                    </div>
                                    
                                    <div className="feature-item">
                                        <i className="fas fa-bed"></i>
                                        <span>{property.bedrooms} {t("propertyDetails.bedrooms-text")}</span>
                                    </div>
                                    <div className="feature-item">
                                        <i className="fas fa-bath"></i>
                                        <span>{property.bathrooms} {t("propertyDetails.bathrooms-text")}</span>
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
                                    <Link className="vl-btn1"  href="#contact">
                                    {t("propertyDetails.contact-text")}
                                    <span className="arrow1 ms-2">
                            <i className="fa-solid fa-arrow-right" />
                        </span>
                        <span className="arrow2 ms-2">
                            <i className="fa-solid fa-arrow-right" />
                        </span>
                                    </Link>

                                    
                                </div>
                            </div>
                        </div>
                
            
           
        </div>
    );
}

