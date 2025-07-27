"use client";
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";   
import { useState } from "react";


                
export default function ContactSeller({ property }: { property: any }) {
    const { t, i18n } = useTranslation('common');
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
                    property_of_interest: property?.title || 'Contacto general',
                    client_name: formData.fullName,
                    email_address: formData.email,
                    phone: formData.phoneNumber,
                    message: formData.message
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al enviar el mensaje');
            }
            
            setSubmitMessage('Mensaje enviado exitosamente!');
            setFormData({
                fullName: '',
                phoneNumber: '',
                email: '',
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
        <div className="details-siderbar2">
            <h3>{t("propertyDetails.contact-text")}</h3>
            <form onSubmit={handleSubmit}>
                {submitMessage && (
                    <div className="alert alert-info mb-3">
                        {submitMessage}
                    </div>
                )}
                <input type="hidden" name="property_id" value={property?.title || 'Contacto general'} />
                

                <div className="input-area">
                    <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={t("propertyDetails.fullName-text")} 
                        required 
                    />
                </div>
                <div className="input-area">
                    <input 
                        type="tel" 
                        name="phoneNumber" 
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder={t("propertyDetails.phoneNumber-text")} 
                        required 
                    />
                </div>
                <div className="input-area">
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("propertyDetails.email-text")} 
                        required 
                    />
                </div>
                <div className="input-area">
                    <textarea 
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t("propertyDetails.message-text")} 
                        required 
                    />
                </div>
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
            </form>
        </div>
    );
} 