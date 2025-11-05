"use client";
import ContactForm from "./contactForm";
import { useTranslation } from "@/utils/i18n-simple";
import Link from "next/link";
import Image from "next/image";


export default function ContactSectionContact({ imgContact }: { imgContact: string }) {
    const { t } = useTranslation('common');
    return (
        <div className="padding-global">
            <div className="container-large">
                <div className="row gap-4 align-items-start">
                    <div className="col-lg-6 justify-content-center  align-items-start d-flex flex-column">
                        <div className="space30"></div>
                        <img src={imgContact} style={{ width: '100%', height: '550px', objectFit: 'cover' }} alt="Contact section" />
                        <div className="space30"></div>
                        <h2 className="text-color-black text-size-32">{t('contact.title')}</h2>
                        <div className="space16"></div>
                        <p className="text-color-black" dangerouslySetInnerHTML={{ __html: t('contact.description') }} style={{ whiteSpace: 'pre-line' }} />
                        <div className="space30"></div>
                        <a href="https://maps.app.goo.gl/1234567890" target="_blank" className="d-flex gap-2 flex-row align-items-center text-color-black no-wrap">
                            <span className="text-color-black ms-2 w-auto">
                                <i className="fa-solid fa-location-dot" />
                            </span>
                            <span className="text-color-black ms-2">
                                C. Cam. Viejo de Málaga 28, 29700 Vélez-Málaga
                            </span>
                        </a>
                        <div className="space16"></div>
                        <a href="mailto:info@baruchrealestate.com" target="_blank" className="d-flex gap-2 flex-row align-items-center text-color-black no-wrap">
                            <span className="text-color-black ms-2">
                                <i className="fa-solid fa-phone" />
                            </span>
                            <span className="text-color-black">
                                +34 951 651 123
                            </span>
                        </a>


                    </div>
                    <div className="col-lg-5 m-auto">
                        <div className="space30"></div>
                        <div className="bg-color-white" style={{ padding: '20px' }}>
                            <h2 className="text-color-black  size-20 uppercase">{t('contact-form.subtitle')}</h2>
                            <h3 className="text-color-black size-42 uppercase">{t('contact-form.title')}</h3>
                            <p className="text-color-black size-16">{t('contact-form.description')}</p>

                            <div className="space16"></div>
                            <ContactForm />
                            <div className="space30"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

