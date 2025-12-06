"use client"

import Link from "next/link";
import ContactSeller from "@/components/elements/ContactSeller";
import PropertyDetails from "@/components/sections/PropertyDetails";
import PropertyDescription from "@/components/sections/PropertyDescription";
import { useTranslation } from "@/utils/i18n-simple";
// import { postContact } from "@/services/post-contact";
import { useState, useEffect, useRef } from "react";
import Units from "@/components/sections/Units";
import { Unit } from "@/types/property";

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
    units?: Unit[];
    estimated_completion: string;
    location: any; 
}

export default function PropertyInner({ block_extend, property }: { block_extend: string, property: Property }) {
    const { t, i18n } = useTranslation('common');
    const [formData, setFormData] = useState({
        client_name: '',
        email_address: '',
        phone_number: '',
        message: '',
        city: '',
        preferred_contact_moment: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const phoneInputRef = useRef<HTMLInputElement | null>(null);
    const itiRef = useRef<any>(null);

    console.log('Property data:', property);
    console.log('Units data:', property.units);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updatePhoneFromIti = () => {
        try {
            const inputEl = phoneInputRef.current as HTMLInputElement | null;
            if (!itiRef.current || !inputEl) return;
            const w: any = typeof window !== 'undefined' ? (window as any) : undefined;
            const utils = w?.intlTelInputUtils;
            const e164: string = utils
                ? (itiRef.current as any).getNumber(utils.numberFormat?.E164 ?? 0) || ''
                : (itiRef.current as any).getNumber() || '';
            if (e164) {
                setFormData(prev => ({ ...prev, phone_number: e164 }));
                return;
            }
            const raw = inputEl.value || '';
            const digits = raw.replace(/\D/g, '');
            const data = (itiRef.current as any).getSelectedCountryData?.();
            const dial = data?.dialCode ? `+${data.dialCode}` : '';
            const fallback = dial && digits ? `${dial}${digits}` : (digits ? `+${digits}` : '');
            setFormData(prev => ({ ...prev, phone_number: fallback }));
        } catch (_) {
            // noop
        }
    };

    useEffect(() => {
        let isMounted = true;
        (async () => {
            if (!phoneInputRef.current) return;
            const mod = await import("intl-tel-input");
            if (!isMounted || !phoneInputRef.current) return;
            const options: any = {
                initialCountry: 'auto',
                geoIpLookup: (callback: (countryCode: string) => void) => {
                    fetch('https://ipapi.co/json/')
                        .then(res => res.json())
                        .then(data => {
                            const code = (data && data.country_code ? String(data.country_code).toLowerCase() : 'us');
                            callback(code);
                        })
                        .catch(() => callback('us'));
                },
                separateDialCode: true,
                nationalMode: false,
                autoPlaceholder: 'polite',
                formatOnDisplay: true,
                utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
            };
            itiRef.current = (mod as any).default(phoneInputRef.current, options);

            // Sync hidden input on init and on changes
            updatePhoneFromIti();
            const inputEl = phoneInputRef.current;
            const handler = () => updatePhoneFromIti();
            inputEl?.addEventListener('input', handler);
            inputEl?.addEventListener('change', handler);
            inputEl?.addEventListener('keyup', handler);
            inputEl?.addEventListener('countrychange', handler);

            return () => {
                inputEl?.removeEventListener('input', handler);
                inputEl?.removeEventListener('change', handler);
                inputEl?.removeEventListener('keyup', handler);
                inputEl?.removeEventListener('countrychange', handler);
            };
        })();

        return () => {
            isMounted = false;
            try { itiRef.current?.destroy(); } catch (_) { /* noop */ }
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const phoneWithDialCode = (() => {
                try {
                    if (itiRef.current) {
                        if (typeof (itiRef.current as any).getNumber === 'function') {
                            const w: any = typeof window !== 'undefined' ? (window as any) : undefined;
                            const utils = w?.intlTelInputUtils;
                            const num = utils
                                ? (itiRef.current as any).getNumber(utils.numberFormat?.E164 ?? 0)
                                : (itiRef.current as any).getNumber();
                            return num || "";
                        }
                        return "";
                    }
                } catch (_) {
                    // noop
                }
                return "";
            })();
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    interested_in: property.title,
                    client_name: formData.client_name,
                    email_address: formData.email_address,
                    phone: phoneWithDialCode || formData.phone_number,
                    message: formData.message,
                    city: formData.city,
                    preferred_contact_moment: formData.preferred_contact_moment
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || t('contact.error-message'));
            }

            setSubmitMessage(t('contact.success-message'));
            setFormData({
                client_name: '',
                email_address: '',
                phone_number: '',
                message: '',
                city: '',
                preferred_contact_moment: ''
            });
            try { if (phoneInputRef.current) phoneInputRef.current.value = ''; } catch (_) { }
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            setSubmitMessage(t('contact.error-message'));
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <>
            {/*===== PROPERTY AREA STARTS =======*/}
            <div className="property-inner-section-find details-section">
                <div className="padding-global">

                    <div className="container-large">
                        <div className="property-widget-sidebar">
                            <PropertyDetails property={property} />
                            <div className="space30" />

                            <PropertyDescription property={property} />
                            <div className="space30" />
                            {property.units && (
                            <Units units={property.units} />
                            )}
                            <div className="space30" />
                            {property.Map_link && (
                            <div className="wrapp-card-details-propertie">
                                <h3>{t("propertyDetails.map_locations-text")}</h3>
                                <iframe src={property.Map_link} width={800} height={450} style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                            </div>
                            )}
                            <div className="space30" />

                            <div className="wrapp-card-details-propertie" id="contact">
                                <div className="bg-area">
                                    <h3>{t("propertyDetails.send_message-text")} {property.title}</h3>
                                    <p>{t("propertyDetails.send_message-text-description")}</p>
                                    <div className="space30" />
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
                                            <div className="col-lg-12">
                                                <div className="input-area">
                                                    <input
                                                        type="text"
                                                        name="client_name"
                                                        value={formData.client_name}
                                                        onChange={handleInputChange}                
                                                        placeholder={t("contact-form.input-name")}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-area">
                                                    <input
                                                        type="tel"
                                                        name="phone_number_visible"
                                                        ref={phoneInputRef}
                                                        placeholder={t("contact-form.input-phone")}
                                                        autoComplete="tel"
                                                        required
                                                        style={{ marginBottom: '10px!important', width: '100%' }}
                                                    />
                                                    <input type="hidden" name="phone_number" value={formData.phone_number} />
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

                                            <div className="col-lg-6">
                                                <div className="input-area">
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        placeholder={t("contact-form.input-city")}
                                                        required
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input-area">
                                                    <input
                                                        type="text"
                                                        name="preferred_contact_moment"
                                                        value={formData.preferred_contact_moment}
                                                        onChange={handleInputChange}
                                                        placeholder={t("contact-form.input-preferred_contact_moment")}
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
                                                <div className=" row d-flex justify-content-between align-items-center">
                                                    <div className="col-lg-6">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required />
                                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                             {t("contact-form.privacy-statement")}
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="input-area col-lg-6 d-flex justify-content-end">
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
                                                <div className="space16" />
                                                <div style={{ borderTop: '1px solid #000' }}></div>
                                                <div className="space16" />
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <p className="text-color-black size-16">{t("contact-form.separator")}</p>
                                                    <div className="space16" />
                                                    <button className="vl-btn1" style={{ width: '100%', backgroundColor: '#25D366', color: '#fff' }} onClick={() => window.open('https://wa.me/34628621130', '_blank')}>
                                                        <i className="fa-brands fa-whatsapp" style={{ marginRight: '10px' }} />
                                                        {t("contact-form.input-click-to-whatsapp")}
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
            {/*===== PROPERTY AREA ENDS =======*/}
        </>
    );
}
