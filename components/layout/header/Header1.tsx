import Link from "next/link";
import LanguageSelector from "@/components/elements/LanguageSelector";
import AuthButtons from "@/components/auth/AuthButtons";
import { useTranslation } from "@/utils/i18n-simple";

export default function Header1({ scroll, isMobileMenu, handleMobileMenu }: any) {
    const { t } = useTranslation('common')
    return (
        <header className="homepage1-body">
            <div id="vl-header-sticky" className={`vl-header-area vl-transparent-header  ${scroll ? "header-sticky top-0 position-fixed w-100" : ""}`}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="vl-logo">
                                <Link href="/">
                                    <img src="/assets/img/logo/logo1.png" alt="housa" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-8 d-none d-lg-block">
                            <div className="vl-main-menu text-center">
                                <nav className="vl-mobile-menu-active">
                                    <ul>
                                        
                                            <li>
                                                <Link href="/properties">{t('navigation.properties')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/about-us">{t('navigation.about')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/services">{t('navigation.services')}</Link>
                                            </li>
                                           
                                            <li>    
                                                <Link href="/contact">{t('navigation.contact')}</Link>
                                            </li>
                                        
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="vl-hero-btn d-none d-lg-block text-end">
                                <div className="d-flex align-items-center justify-content-end gap-3">
                                    <LanguageSelector />
                                    <AuthButtons />
                                    
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
