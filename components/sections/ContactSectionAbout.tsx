"use client";
import ContactForm from "./contactForm";
import { useTranslation } from "@/utils/i18n-simple";
import Link from "next/link";

export default function ContactSectionAbout({ imgContact }: { imgContact: string }) {
    const { t } = useTranslation('common');
    return (
        <div className="padding-global">
            <div className="container-large">
                <div className="row gap-4 align-items-start">
                    <div className="col-lg-6  justify-content-center  align-items-start d-flex flex-column">
                        <div className="space30"></div>
                        <img src={imgContact} style={{ width: '100%', height: '550px', objectFit: 'cover' }} alt="Contact section" />
                        <div className="space30"></div>
                        <h2 className="text-color-black text-size-32">{t('about.conatct-section.title')}</h2>
                        <div className="space16"></div>
                        <p className="text-color-black text-size-medium">{t('about.conatct-section.description')}</p>
                        <div className="space30"></div>
                        <Link href="services" className="vl-btn1 is-primary">
                            {t('about.conatct-section.btn_text')}
                            <span className="arrow1 ms-2">
                                <i className="fa-solid fa-arrow-right" />
                            </span>
                            <span className="arrow2 ms-2">
                                <i className="fa-solid fa-arrow-right" />
                            </span>
                        </Link>
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
        </div>
    );
}