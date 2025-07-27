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
                                <button className="vl-offcanvas-close-toggle" onClick={handleMobileMenu}>
                                    <i className="fa-solid fa-xmark" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Botones de autenticación móviles */}
                        <div className="mb-4 d-flex justify-content-start">
                            <AuthButtons />
                        </div>
                        
                        <div className="vl-offcanvas-menu d-lg-none mb-40">
                            <nav>
                                <ul>
                                    <li className={`has-dropdown ${isAccordion == 1 ? "active" : ""}`} onClick={() => handleAccordion(1)}>
                                        <Link href="/">
                                            {t('navigation.home')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/properties">
                                            {t('navigation.properties')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about-us">
                                            {t('navigation.about')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services">
                                            {t('navigation.services')}
                                        </Link>
                                    </li>
                                    
                                </ul>
                            </nav>
                        </div>
                        <div className="space20" />
                        <div className="vl-offcanvas-info">
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
                        <div className="vl-offcanvas-social">
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
