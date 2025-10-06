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
                        {/* <span className="status-badge for-sale">{property.propertyStatus}</span> */}
                    </div>
                    <div className="d-flex flex-column gap-2 mb-3" >
                        {/* Título principal */}
                        <h1 className="title-properties-single">{property.title}</h1>
                        {/* Precio con icono */}
                        <div className="property-price">
                            {property.price ? `€${property.price.toLocaleString('es-ES')}` : ''}
                        </div>

                        {/* Dirección con icono */}
                        <div className="property-location d-flex align-items-center gap-2">
                            <i className="fas fa-map-marker-alt text-color-blue"></i>
                            <span className="">{property.address}</span>
                        </div>

                        

                    </div>


                    {/* Información de la propiedad */}
                    <div className="property-features">
                        <div className="feature-item">
                            <i className="fas fa-minimize"></i>

                            <span>{property.built_area.toLocaleString() || '2150'}m²  {t("propertyDetails.built_area-text")}</span>

                        </div>
                        <div className="feature-item">

                            <i className="fas fa-expand-arrows-alt"></i>
                            <span>{property.lot_area.toLocaleString() || '2150'}m² {t("propertyDetails.lot_area-text")}</span>

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
                        
                        {property.estimated_completion && 
                        <div className="feature-item">
                            <i className="fas fa-calendar"></i>
                            <span>{property.estimated_completion} {t("propertyDetails.estimated_completion-text")}</span>
                        </div>} 
                    </div>

                </div>

                {/* Contenedor principal con información y precio */}
                <div style={{width: '250px', marginTop: 'autos'}} className="d-flex justify-content-end align-items-end mobile-justify-content-left mobile-align-items-leftr">
                    {/* Precio y botón de contacto */}
                    <div className="property-price-section d-flex justify-content-end align-items-end mobile-justify-content-left mobile-align-items-left" >

                        <Link className="vl-btn1 mt-auto mb-auto mobile-mr-auto mobile-ml-0" href="#contact">
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

