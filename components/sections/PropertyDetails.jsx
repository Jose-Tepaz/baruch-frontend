"use client";
import "@/public/assets/css/propertyDetails.css";
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";

export default function PropertyDetails({ property }) {

    const { t } = useTranslation('common');
    // Formatear el precio con separadores de miles
    const formatPrice = (price) => {
        if (price === 0) return t('propertyDetails.on_request');
        if (!price) return '';
        return `€ ${price.toLocaleString('es-ES')}`;
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
                        

                        {/* Dirección con icono */}
                        <div className="property-location d-flex align-items-center gap-2">
                            <i className="fas fa-map-marker-alt text-color-blue"></i>
                            <span className="">
                                
                                {property.location?.name && `${property.location.name}`}
                            </span>
                        </div> 

                        

                    </div>


                    {/* Información de la propiedad */}
                    <div className="property-features">
                        <div className="feature-item">
                            <i className="fas fa-minimize"></i>

                            <span>{property.built_area ? property.built_area.toLocaleString('de-DE') : '2150'} m²  {t("propertyDetails.built_area-text")}</span>

                        </div>
                        <div className="feature-item">

                            <i className="fas fa-expand-arrows-alt"></i>
                            <span>{property.lot_area ? property.lot_area.toLocaleString('de-DE') : '2150'} m² {t("propertyDetails.lot_area-text")}</span>

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
                            <i className="fas fa-flag-checkered"></i>
                            <span>
                                {property.estimated_completion == 'Ready' ? t("propertyDetails.completion-text") : ''}
                                {property.estimated_completion != 'Ready' ? property.estimated_completion : ''} </span>
                        </div>} 
                    </div>

                </div>

                {/* Contenedor principal con información y precio */}
                <div className="wrapp-price-and-btn">
                     {/* Precio con icono */}
                     <div className="property-price">
                            {property.sold ? (
                                <div className="text-property-price">
                                    <span style={{ textDecoration: 'line-through', color: '#999' }}>
                                        {formatPrice(property.price)}
                                    </span>
                                    <span className="text-danger fw-bold" style={{ color: '#ff0000' }}>SOLD</span>
                                </div>
                            ) : (
                                formatPrice(property.price)
                            )}
                        </div>
                    {/* Precio y botón de contacto */}
                    <div className="property-price-section d-flex justify-content-end align-items-soace-between mobile-justify-content-left mobile-align-items-left" >
                       

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

