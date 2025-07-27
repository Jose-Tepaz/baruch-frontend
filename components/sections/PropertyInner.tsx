"use client"

import Link from "next/link";
import ContactSeller from "@/components/elements/ContactSeller";
import PropertyDetails from "@/components/sections/PropertyDetails";
import PropertyDescription from "@/components/sections/PropertyDescription";
import { useTranslation } from "@/utils/i18n-simple";   
// import { postContact } from "@/services/post-contact";
import { useState } from "react";




interface Property {
    title: string;
    description: string;
    price: number;
    address: string;
    bedrooms: number;
    bathrooms: number;
    parking_spaces: number;
    main_image: string;
    gallery: string[];
    category: any;
    is_new: boolean;
    slug: string;
    documentId: string;
    Map_link: string;
    propertyStatus: string;
    is_private?: boolean;
}

export default function PropertyInner({ block_extend, property }: { block_extend: string, property: Property }) {
    const { t, i18n } = useTranslation('common');
    const [formData, setFormData] = useState({
        client_name: '',
        email_address: '',
        phone_number: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    
    console.log(property);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    property_of_interest: property.title,
                    client_name: formData.client_name,
                    email_address: formData.email_address,
                    phone: formData.phone_number,
                    message: formData.message
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al enviar el mensaje');
            }
            
            setSubmitMessage('Mensaje enviado exitosamente!');
            setFormData({
                client_name: '',
                email_address: '',
                phone_number: '',
                message: ''
            });
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            setSubmitMessage('Error al enviar el mensaje. Inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

  

    return (
        <>
            {/*===== PROPERTY AREA STARTS =======*/}
            <div className="property-inner-section-find details-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="property-mapgrid-area">
                                
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="sidebar1-area">
                                            <ContactSeller
                                                property={property}
                                                
                                            />
                                            
                                            
                                           
                                        </div>
                                    </div>

                                    <div className="col-lg-9">
                                        <div className="property-widget-sidebar">
                                           
                                               
                                            <PropertyDetails property={property} />
                                            <div className="space30" />
                                            <PropertyDescription property={property} />

                                                <div className="space30" />
                                                
                                                    <div className="wrapp-card-details-propertie">
                                                        <h3>{t("propertyDetails.map_locations-text")}</h3>
                                                      
                                                        
                                                            <iframe src={property.Map_link} width={800}  height={450} style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                                          
                                                           
                                                        
                                                    </div>
                                                    
                                                    
                                               
                                                    <div className="space30" />
                                               
                                              
                                                <div className="wrapp-card-details-propertie" id="contact">
                                                    <div className="bg-area">
                                                        <h3>{t("propertyDetails.send_message-text")}</h3>
                                                        <div className="space8" />
                                                        <form onSubmit={handleSubmit}>

                                                        <div className="row">
                                                            <input type="hidden" name="property_id" value={property.title} />
                                                            {submitMessage && (
                                                                <div className="col-12">
                                                                    <div className={`alert ${submitMessage.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                                                                        {submitMessage}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="col-lg-6">
                                                                <div className="input-area">
                                                                    <input 
                                                                        type="text" 
                                                                        name="client_name"
                                                                        value={formData.client_name}
                                                                        onChange={handleInputChange}
                                                                        placeholder={t("propertyDetails.fullName-text")} 
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>  
                                                            <div className="col-lg-6">
                                                                <div className="input-area">
                                                                    <input 
                                                                        type="text" 
                                                                        name="phone_number"
                                                                        value={formData.phone_number}
                                                                        onChange={handleInputChange}
                                                                        placeholder={t("propertyDetails.phoneNumber-text")} 
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="input-area">
                                                                    <input 
                                                                        type="email" 
                                                                        name="email_address"
                                                                        value={formData.email_address}
                                                                        onChange={handleInputChange}
                                                                        placeholder={t("propertyDetails.email-text")} 
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-lg-12">
                                                                <div className="input-area">
                                                                    <textarea 
                                                                        name="message"
                                                                        value={formData.message}
                                                                        onChange={handleInputChange}
                                                                        placeholder={t("propertyDetails.message-text")} 
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="space16" />
                                                                <div className="input-area">
                                                                    <button type="submit" className="vl-btn1" disabled={isSubmitting}>
                                                                        {isSubmitting ? 'Enviando...' : t("propertyDetails.send-btn")}
                                                                        <span className="arrow1 ms-2">
                                                                            <i className="fa-solid fa-arrow-right" />
                                                                        </span>
                                                                        <span className="arrow2 ms-2">
                                                                            <i className="fa-solid fa-arrow-right" />
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </form>
                                                    </div>
                                                </div>
                                           


                                       
                                                
                                        </div>    
                                            
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== PROPERTY AREA ENDS =======*/}
        </> 
    );
}
