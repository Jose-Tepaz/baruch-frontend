"use client";
import ContactForm from "./contactForm";
import { useTranslation } from "@/utils/i18n-simple";

export default function ContactSectionServices() {
    const { t } = useTranslation('common');
    return (
        <>
            <div className="space30"></div>
            <div className="bg-color-white" style={{padding: '20px'}}>
                <h2 className="text-color-black  size-20 uppercase">{t('contact-form.subtitle')}</h2>
                <h3 className="text-color-black size-42 uppercase">{t('contact-form.title')}</h3>
                <p className="text-color-black size-16">{t('contact-form.description')}</p>
                
                <div className="space16"></div>
                <ContactForm/>  
                <div className="space30"></div>
            </div>
        </>
    );
}