"use client";
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";   
import { useState, useEffect, useRef } from "react";


                
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
    const phoneInputRef = useRef<HTMLInputElement | null>(null);
    const itiRef = useRef<any>(null);

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
                setFormData(prev => ({ ...prev, phoneNumber: e164 }));
                return;
            }
            const raw = inputEl.value || '';
            const digits = raw.replace(/\D/g, '');
            const data = (itiRef.current as any).getSelectedCountryData?.();
            const dial = data?.dialCode ? `+${data.dialCode}` : '';
            const fallback = dial && digits ? `${dial}${digits}` : (digits ? `+${digits}` : '');
            setFormData(prev => ({ ...prev, phoneNumber: fallback }));
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

            // Sync hidden on init and changes
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
                    interested_in: property?.title || 'Contacto general',
                    client_name: formData.fullName,
                    email_address: formData.email,
                    phone: phoneWithDialCode || formData.phoneNumber,
                    message: formData.message
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                    throw new Error(errorData.error || t('contact.error-message'));
            }
            
            setSubmitMessage(t('contact.success-message'));
            setFormData({
                fullName: '',
                phoneNumber: '',
                email: '',
                message: ''
            });
            try { if (phoneInputRef.current) phoneInputRef.current.value = ''; } catch (_) {}
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            setSubmitMessage(t('contact.error-message'));
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
                        name="phoneNumber_visible" 
                        ref={phoneInputRef}
                        placeholder={t("propertyDetails.phoneNumber-text")} 
                        autoComplete="tel"
                        required 
                        style={{marginBottom: '10px!important', width: '100%'}}
                    />
                    <input type="hidden" name="phoneNumber" value={formData.phoneNumber} />
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