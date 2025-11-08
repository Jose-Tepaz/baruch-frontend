'use client'
import Link from "next/link";
import logoWhite from '@/public/assets/img/logo/logo-baruch-white.svg';
import { useTranslation } from "@/utils/i18n-simple";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Category {
    id?: number;
    slug: string;
    name: string;
    description?: string;
    image?: string;
}

export default function Footer1() {
    const { t } = useTranslation('common')
    const params = useParams();
    const locale = params.lang as string;
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                console.log('Footer1: Iniciando fetch de categorías...');
                const response = await fetch('/api/categories');
                const categoriesData = await response.json();


                // Asegurar que categoriesData sea un array
                if (categoriesData && Array.isArray(categoriesData)) {
                    setCategories(categoriesData);
                } else {
                    console.warn('Footer1: categoriesData no es un array válido:', categoriesData);
                    setCategories([]);
                }
            } catch (error) {
                console.error('Footer1: Error fetching categories:', error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);
    return (
        <>
            <div className="wrapper-footer">
                <div className="footer-cta-bg-area container-home1">
                    <div className="cta1-section-area">
                        <div className="wrapp-float-component-footer">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-10 m-auto">
                                        <div className="heading1 text-center">
                                            <h2 className=" text-color-blue">{t('footer.title-cta')}</h2>
                                            <div className="space16" />
                                            <p className="text-white">
                                                {t('footer.description-cta')}
                                            </p>
                                            <div className="space32" />
                                            <div data-aos="fade-up" data-aos-duration={1000}>
                                                <Link href="/properties" className="vl-btn1 is-primary">
                                                    {t('footer.btn-cta')}
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
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="vl-footer1-section-area">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="footer-time-area">
                                        <img style={{ width: '200px', height: 'auto ' }} src={logoWhite.src} alt="housa" />
                                        <div className="space24" />
                                        <p className="text-white">{t('footer.description-footer')}</p>
                                        <div className="space16" />
                                        

                                        <div className="space32" />
                                        <ul>
                                            <li>
                                                <Link href="https://www.facebook.com/baruchrealestate.com" target="_blank">
                                                    <i className="fa-brands fa-facebook-f" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.linkedin.com/company/baruch-real-estate/about" target="_blank">
                                                    <i className="fa-brands fa-linkedin-in" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://www.instagram.com/baruchrealestate" target="_blank">
                                                    <i className="fa-brands fa-instagram" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="" style={{ pointerEvents: 'none', cursor: 'not-allowed' }}>
                                                    <i className="fa-brands fa-youtube" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg col-md-6">
                                    <div className="space30 d-md-none d-block" />
                                    <div className="footer-widget-area foot-padding1">
                                        <p className="text-white text-size-large text-weight-medium" style={{ marginBottom: '16px' }}>{t('footer.head-title-1')}</p>
                                        <ul className="text-white">
                                            <li>
                                                <Link href="/" className="text-white">{t('footer.title-1-footer')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/about-us" className="text-white">{t('footer.title-2-footer')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/testimonials" className="text-white">{t('footer.title-3-footer')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/contact" className="text-white">{t('footer.title-4-footer')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/privacy-policy" className="text-white">{t('footer.title-5-footer')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/privacy-policy" className="text-white">{t('footer.title-6-footer')}</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg col-md-6">
                                    <div className="space30 d-md-none d-block" />
                                    <div className="footer-widget-area foot-padding1">
                                        <p className="text-white text-size-large text-weight-medium" style={{ marginBottom: '16px' }}>{t('footer.title-services')}</p>
                                        <ul className="text-white">
                                            <li>
                                                <Link href="/" className="text-white" style={{ pointerEvents: 'none', cursor: 'not-allowed' }}>{t('footer.title-services-1')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/" className="text-white" style={{ pointerEvents: 'none', cursor: 'not-allowed' }}>{t('footer.title-services-2')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/" className="text-white" style={{ pointerEvents: 'none', cursor: 'not-allowed' }}>{t('footer.title-services-3')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/" className="text-white" style={{ pointerEvents: 'none', cursor: 'not-allowed' }}>{t('footer.title-services-4')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/" className="text-white" style={{ pointerEvents: 'none', cursor: 'not-allowed' }}>{t('footer.title-services-5')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/" className="text-white" style={{ pointerEvents: 'none', cursor: 'not-allowed' }}>{t('footer.title-services-6')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/" className="text-white" style={{ pointerEvents: 'none', cursor: 'not-allowed' }}>{t('footer.title-services-7')}</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-4">
                                    <div className="space30 d-lg-none d-block" />
                                    <div className="footer-widget-area foot-padding1">
                                        <p className="text-white text-size-large text-weight-medium" style={{ marginBottom: '16px' }}>{t('footer.head-title-3')}</p>
                                        <ul className="text-white">
                                            <li>
                                                <Link href="/en/properties?location=Marbella" className="text-white">{t('footer.title-popular-locations-1')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/en/properties?location=Mijas" className="text-white">{t('footer.title-popular-locations-2')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/en/properties?location=Estepona" className="text-white">{t('footer.title-popular-locations-3')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/en/properties?location=Sotogrande" className="text-white">{t('footer.title-popular-locations-4')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/en/properties?location=The Golden Mile" className="text-white">{t('footer.title-popular-locations-5')}</Link>
                                            </li>

                                            <li>
                                                <Link href="/en/properties?location=Rincon" className="text-white">{t('footer.title-popular-locations-7')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/en/properties?location=Torox" className="text-white">{t('footer.title-popular-locations-8')}</Link>
                                            </li>
                                            <li>
                                                <Link href="/en/properties?location=Malaga" className="text-white">{t('footer.title-popular-locations-9')}</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                                <div className="col-lg col-md-4">
                                    <div className="space30 d-lg-none d-block" />
                                    <div className="footer-widget-area foot-padding2">
                                        <p className="text-white text-size-large text-weight-medium" style={{ marginBottom: '16px' }}>{t('footer.head-title-2')}</p>
                                        <ul className="text-white">

                                            <li>
                                                <Link href={`/${locale}/properties?category=villas`} className="text-white">{t('footer.category-1')}</Link>
                                            </li>
                                            <li>
                                                <Link href={`/${locale}/properties?category=apartaments`} className="text-white">{t('footer.category-2')}</Link>
                                            </li>
                                            <li>
                                                <Link href={`/${locale}/properties?category=new-developments`} className="text-white">{t('footer.category-3')}</Link>
                                            </li>
                                            <li>
                                                <Link href={`/${locale}/properties?category=golf-properties`} className="text-white">{t('footer.category-4')}</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>



                            </div>
                            <div className="space24" />
                            <div >
                                <div className="copyright-area" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <p className="text-white">© 2025 Baruch Real Estate All Rights Reserved.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
