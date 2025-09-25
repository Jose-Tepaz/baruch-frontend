"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import LanguageSelector from "@/components/elements/LanguageSelector";
import AuthButtons from "@/components/auth/AuthButtons";
import { useTranslation } from "@/utils/i18n-simple";
import styles from "./Header1.module.css";

export default function Header1({ scroll, isMobileMenu, handleMobileMenu }: any) {
    const { t } = useTranslation('common')
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const aboutDropdownRef = useRef<HTMLLIElement>(null);
    const servicesDropdownRef = useRef<HTMLLIElement>(null);

    // Cerrar dropdowns cuando se hace click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
                setAboutDropdownOpen(false);
            }
            if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
                setServicesDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Cerrar dropdowns con tecla Escape
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setAboutDropdownOpen(false);
                setServicesDropdownOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const toggleAboutDropdown = () => {
        setAboutDropdownOpen(!aboutDropdownOpen);
        setServicesDropdownOpen(false); // Cerrar el otro dropdown
    };

    const toggleServicesDropdown = () => {
        setServicesDropdownOpen(!servicesDropdownOpen);
        setAboutDropdownOpen(false); // Cerrar el otro dropdown
    };

    return (
        <header className="homepage1-body">
            <div id="vl-header-sticky" className={`vl-header-area vl-transparent-header  ${scroll ? "header-sticky top-0 position-fixed w-100" : ""}`}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-6 col-6">
                            <div className="vl-logo">
                                <Link href="/">
                                    <img src="/assets/img/logo/logo1.png" alt="housa" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-5 d-none d-lg-block">
                            <div className="vl-main-menu text-center">
                                <nav className="vl-mobile-menu-active">
                                    <ul>
                                        
                                            <li>
                                                <Link href="/properties">{t('navigation.properties')}</Link>
                                            </li>
                                            
                                            <li
                                                ref={aboutDropdownRef}
                                                className={`dropdown ${styles.headerDropdown}`}
                                                onMouseEnter={() => setAboutDropdownOpen(true)}
                                                onMouseLeave={() => setAboutDropdownOpen(false)}
                                            >
                                                <Link
                                                    href="/about-us"
                                                    className={`dropdown-toggle ${styles.dropdownToggle}`}
                                                    tabIndex={0}
                                                    onFocus={() => setAboutDropdownOpen(true)}
                                                    onBlur={() => setAboutDropdownOpen(false)}
                                                >
                                                    {t('navigation.about')}
                                                </Link>
                                                <ul className={`dropdown-menu ${styles.dropdownMenu} ${aboutDropdownOpen ? styles.show : ''}`}>
                                                    <li>
                                                        <Link className={`dropdown-item ${styles.dropdownItem}`} href="/about-us">{t('navigation.about')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link className={`dropdown-item ${styles.dropdownItem}`} href="/magazine">{t('navigation.magazine')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link className={`dropdown-item ${styles.dropdownItem}`} href="/testimonials">{t('navigation.testimonials')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link className={`dropdown-item ${styles.dropdownItem}`} href="/contact">{t('navigation.contact')}</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li
                                                ref={servicesDropdownRef}
                                                className={`dropdown ${styles.headerDropdown}`}
                                                onMouseEnter={() => setServicesDropdownOpen(true)}
                                                onMouseLeave={() => setServicesDropdownOpen(false)}
                                            >
                                                <Link
                                                    href="/about-us"
                                                    className={`dropdown-toggle ${styles.dropdownToggle}`}
                                                    tabIndex={0}
                                                    onFocus={() => setServicesDropdownOpen(true)}
                                                    onBlur={() => setServicesDropdownOpen(false)}
                                                >
                                                    {t('navigation.services')}
                                                </Link>
                                                <ul className={`dropdown-menu ${styles.dropdownMenu} ${servicesDropdownOpen ? styles.show : ''}`}>
                                                    <li>
                                                        <Link className={`dropdown-item ${styles.dropdownItem}`} href="/about-us">{t('footer.title-services-1')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link className={`dropdown-item ${styles.dropdownItem}`} href="/magazine">{t('footer.title-services-2')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link className={`dropdown-item ${styles.dropdownItem}`} href="/testimonials">{t('footer.title-services-3')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link className={`dropdown-item ${styles.dropdownItem}`} href="/contact">{t('footer.title-services-4')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link className={`dropdown-item ${styles.dropdownItem}`} href="/contact">{t('footer.title-services-5')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link className={`dropdown-item ${styles.dropdownItem}`} href="/contact">{t('footer.title-services-6')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link className={`dropdown-item ${styles.dropdownItem}`} href="/contact">{t('footer.title-services-7')}</Link>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li>    
                                                <Link href="/contact">{t('navigation.contact')}</Link>
                                            </li>
                                        
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="vl-hero-btn d-none d-lg-block text-end">
                                <div className="d-flex align-items-center justify-content-end gap-3">
                                    <LanguageSelector />
                                    <AuthButtons />

                                    <div className="btn-area1" style={{ marginTop: '0px' }}>
                                    <Link href="/contact" className="vl-btn1" style={{ padding: '12px 4px 12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {t('navigation.btn-header-1')}
                                        <span className="arrow1 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                        <span className="arrow2 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                    </Link>
                                </div>
                                    
                                </div>
                            </div>
                            <div className="vl-header-action-item d-block d-lg-none">
                                <div className="d-flex align-items-center gap-2">
                                    <LanguageSelector />
                                    <button type="button" className="vl-offcanvas-toggle px-1" onClick={handleMobileMenu}>
                                        <i className="fa-solid fa-bars-staggered" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
