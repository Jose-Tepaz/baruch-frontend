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
                                            <button
                                                className="mobile-dropdown-toggle options-mobile-menu"
                                                onClick={() => handleAccordion(1)}
                                            >
                                                {t('navigation.about')}
                                                <span style={{ float: "right" }}>
                                                    <i className={`fa-solid fa-chevron-${isAccordion === 1 ? 'up' : 'down'}`}></i>
                                                </span>
                                            </button>
                                            {isAccordion === 1 && (
                                                <ul className="mobile-dropdown-menu" style={{ listStyle: "none", paddingLeft: "1.5rem", marginTop: "0px", paddingBottom: "16px" }}>
                                                    <li>
                                                        <Link href="/about-us">
                                                            {t('footer.title-1-footer')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/magazine">
                                                            {t('footer.title-2-footer')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/testimonials">
                                                            {t('footer.title-3-footer')}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                        </li>
                                    <li>
                                        <div className={`mobile-dropdown ${isAccordion === 2 ? 'open' : ''}`}>
                                            <button
                                                className="mobile-dropdown-toggle options-mobile-menu"
                                                
                                                onClick={() => handleAccordion(2)}
                                                
                                            >
                                                {t('navigation.services')}
                                                <span style={{ float: "right" }}>
                                                    <i className={`fa-solid fa-chevron-${isAccordion === 2 ? 'up' : 'down'}`}></i>
                                                </span>
                                            </button>
                                            {isAccordion === 2 && (
                                                <ul className="mobile-dropdown-menu" style={{ listStyle: "none", paddingLeft: "1.5rem", marginTop: "0px", paddingBottom: "16px" }}>
                                                    <li>
                                                        <Link href="/about-us">
                                                            {t('footer.title-services-1')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/magazine">
                                                            {t('footer.title-services-2')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/testimonials">
                                                            {t('footer.title-services-3')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/contact">
                                                            {t('footer.title-services-4')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/privacy-policy">
                                                            {t('footer.title-services-5')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/privacy-policy">
                                                            {t('footer.title-services-6')}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/privacy-policy">
                                                            {t('footer.title-services-7')}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                    </li>
                                    
                                </ul>
                            </nav>
                        </div>
                        <div className="space20" />
                        <div className="vl-offcanvas-info text-color-white">
                            <h3 className="vl-offcanvas-sm-title">Contact Us</h3>
                            <div className="space20" />
                            <span>
                                <Link href="#">
                                    <i className="fa-regular fa-envelope" /> +57 9954 6476
                                </Link>
                            </span>
                            <span>
                                <Link href="#">
                                    <i className="fa-solid fa-phone" /> hello@baruch.com
                                </Link>
                            </span>
                            <span>
                                <Link href="#">
                                    <i className="fa-solid fa-location-dot" /> Bhemeara,Kushtia
                                </Link>
                            </span>
                        </div>
                        <div className="space20" />
                        <div className="vl-offcanvas-social text-color-white">
                            <h3 className="vl-offcanvas-sm-title">Follow Us</h3>
                            <div className="space20" />
                            <Link href="#">
                                <i className="fab fa-facebook-f" />
                            </Link>
                            <Link href="#">
                                <i className="fab fa-twitter" />
                            </Link>
                            <Link href="#">
                                <i className="fab fa-linkedin-in" />
                            </Link>
                            <Link href="#">
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
