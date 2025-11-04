"use client";
import Link from "next/link";
import { useState } from "react";
import AuthButtons from "@/components/auth/AuthButtons";
import { useTranslation } from "@/utils/i18n-simple";


export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
    const [isAccordion, setIsAccordion] = useState(0);
    const { t } = useTranslation('common');
    const handleAccordion = (key: any) => {
        setIsAccordion((prevState) => (prevState === key ? null : key));
    };
    return (
        <>
            {/*===== MOBILE HEADER STARTS =======*/}
            <div className="homepage1-body">
                <div className={`vl-offcanvas transition-mobile-menu${isMobileMenu ? ' vl-offcanvas-open' : ''}`}>
                    <div className="vl-offcanvas-wrapper">
                        <div className="vl-offcanvas-header d-flex justify-content-between align-items-center mb-90">
                            <div className="vl-offcanvas-logo">
                                <Link href="/">
                                    <img src="/assets/img/logo/logo1.png" alt="housa" />
                                </Link>
                            </div>
                            <div className="vl-offcanvas-close">
                                <button className="vl-offcanvas-close-toggle text-color-white" onClick={handleMobileMenu}>
                                    <i className="fa-solid fa-xmark" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Botones de autenticación móviles */}
                        <div className="mb-4 d-flex justify-content-start">
                            <AuthButtons />
                        </div>
                        
                        <div className="vl-offcanvas-menu d-lg-none mb-40 text-color-white">
                            <nav>
                                <ul>
                                    
                                    
                                    <li>
                                        <Link href="/properties" className="options-mobile-menu" >
                                            {t('navigation.properties')}
                                        </Link>
                                    </li>
                                    <li>
                                        <div className={`mobile-dropdown ${isAccordion === 1 ? 'open' : ''}`}>
                                            <Link href="/about-us" className="options-mobile-menu">
                                                {t('navigation.about')}
                                            </Link>
                                            <Link href="/magazine" className="options-mobile-menu">
                                                {t('footer.title-2-footer')}
                                            </Link>
                                            <Link href="/testimonials" className="options-mobile-menu">
                                                {t('footer.title-3-footer')}
                                            </Link>
                                            
                                        </div>
                                        </li>
                                    <li>
                                        <Link href="/services" className="options-mobile-menu">
                                            {t('navigation.services')}
                                        </Link>
                                    </li>
                                    
                                </ul>
                            </nav>
                        </div>
                        <div className="space20" />
                        <div className="vl-offcanvas-info text-color-white">
                            <h3 className="vl-offcanvas-sm-title">Contact Us</h3>
                            <div className="space20" />
                            <span>
                                <Link href="mailto:info@baruchrealestate.com">
                                    <i className="fa-regular fa-envelope" /> info@baruchrealestate.com
                                </Link>
                            </span>
                            <span>
                                <Link href="tel:+34951651123">
                                    <i className="fa-solid fa-phone" /> +34 951 651 123
                                </Link>
                            </span>
                            <span>
                                <Link href="#">
                                    <i className="fa-solid fa-location-dot" /> C. Cam. Viejo de Málaga 28, 29700 Vélez-Málaga
                                </Link>
                            </span>
                        </div>
                        <div className="space20" />
                        <div className="vl-offcanvas-social text-color-white">
                            <h3 className="vl-offcanvas-sm-title">Follow Us</h3>
                            <div className="space20" />
                            <Link href="https://www.facebook.com/baruchrealestate.com" target="_blank">
                                <i className="fab fa-facebook-f" />
                            </Link>
                        
                            <Link href="https://www.linkedin.com/company/baruch-real-estate/about" target="_blank">
                                <i className="fab fa-linkedin-in" />
                            </Link>
                            <Link href="https://www.instagram.com/baruchrealestate" target="_blank">
                                <i className="fab fa-instagram" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="vl-offcanvas-overlay" />
            </div>
            {/*===== MOBILE HEADER STARTS =======*/}
        </>
    );
}
