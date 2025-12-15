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
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const categoriesData = await response.json();

                // Asegurar que categoriesData sea un array
                if (categoriesData && Array.isArray(categoriesData)) {
                    setCategories(categoriesData);
                } else {
                    setCategories([]);
                }
            } catch (error) {
                // Error silencioso en producción - usar array vacío
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Inicializar Mailchimp después de que el componente se monte
    useEffect(() => {
        // Verificar si ya existe el link de CSS
        let link = document.querySelector('link[href*="mailchimp.com/embedcode"]') as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.href = '//cdn-images.mailchimp.com/embedcode/classic-061523.css';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            document.head.appendChild(link);
        }

        // Cargar jQuery primero si no existe
        const loadMailchimpScript = () => {
            // Verificar si ya existe el script
            const existingScript = document.querySelector('script[src*="mailchimp.com/js/mc-validate"]');
            if (existingScript) {
                return;
            }

            const script = document.createElement('script');
            script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
            script.async = true;
            script.onload = () => {
                // Configurar Mailchimp después de que el script se cargue
                if (typeof window !== 'undefined') {
                    // Esperar a que jQuery esté disponible
                    const checkJQuery = setInterval(() => {
                        if ((window as any).jQuery) {
                            clearInterval(checkJQuery);
                            const $ = (window as any).jQuery;
                            (window as any).fnames = new Array();
                            (window as any).ftypes = new Array();
                            (window as any).fnames[0] = 'EMAIL';
                            (window as any).ftypes[0] = 'email';
                            (window as any).fnames[1] = 'FNAME';
                            (window as any).ftypes[1] = 'text';
                            (window as any).fnames[2] = 'LNAME';
                            (window as any).ftypes[2] = 'text';
                            (window as any).fnames[3] = 'ADDRESS';
                            (window as any).ftypes[3] = 'address';
                            (window as any).fnames[4] = 'PHONE';
                            (window as any).ftypes[4] = 'phone';
                            (window as any).fnames[5] = 'BIRTHDAY';
                            (window as any).ftypes[5] = 'birthday';
                            (window as any).fnames[6] = 'COMPANY';
                            (window as any).ftypes[6] = 'text';
                            (window as any).$mcj = $.noConflict(true);
                        }
                    }, 100);
                    // Timeout después de 5 segundos
                    setTimeout(() => clearInterval(checkJQuery), 5000);
                }
            };
            document.body.appendChild(script);
        };

        // Cargar jQuery si no existe
        if (typeof window !== 'undefined' && !(window as any).jQuery) {
            const jqueryScript = document.createElement('script');
            jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
            jqueryScript.async = true;
            jqueryScript.onload = loadMailchimpScript;
            document.body.appendChild(jqueryScript);
        } else {
            loadMailchimpScript();
        }
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
                                            
                                            {/* Formulario de Mailchimp */}
                                            <div id="mc_embed_signup" style={{ background: 'transparent', clear: 'left', font: '14px Helvetica,Arial,sans-serif', width: '100%', maxWidth: '600px', margin: '0 auto', padding: '0px' }}>
                                                <form 
                                                    action="https://gmail.us20.list-manage.com/subscribe/post?u=801951f17b12d427872e2ac56&amp;id=ce8812881a&amp;f_id=004162eef0" 
                                                    method="post" 
                                                    id="mc-embedded-subscribe-form" 
                                                    name="mc-embedded-subscribe-form" 
                                                    className="validate" 
                                                    target="_blank"
                                                    noValidate
                                                >
                                                    <div id="mc_embed_signup_scroll">
                                                        
                                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                                                            <div className="" style={{ flex: '1', minWidth: '200px' }}>
                                                                <input 
                                                                    type="email" 
                                                                    name="EMAIL" 
                                                                    className="required email" 
                                                                    id="mce-EMAIL" 
                                                                    required 
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    placeholder={t('footer.placeholder-text')}
                                                                    style={{ 
                                                                        width: '100%', 
                                                                        padding: '12px 16px', 
                                                                        borderRadius: '4px', 
                                                                        border: '1px solid #ddd',
                                                                        fontSize: '14px',
                                                                        boxSizing: 'border-box',
                                                                        color: '#000',
                                                                        backgroundColor: '#fff',
                                                                        height: '100%'
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="optionalParent" style={{ flexShrink: 0 }}>
                                                                <input 
                                                                    type="submit" 
                                                                    name="subscribe" 
                                                                    id="mc-embedded-subscribe" 
                                                                  
                                                                    value={t('footer.subscribe-text')}
                                                                    style={{ 
                                                                        margin: '0',
                                                                        backgroundColor: 'var(--ztc-bg-bg-3)',
                                                                        color: '#fff',
                                                                        border: 'none',
                                                                        borderRadius: '4px',
                                                                        fontSize: '14px',
                                                                        fontWeight: 'bold',
                                                                        textTransform: 'uppercase',
                                                                        letterSpacing: '1px',
                                                                        transition: 'all 0.3s ease',
                                                                        cursor: 'pointer',
                                                                        whiteSpace: 'nowrap',
                                                                        padding: '12px 24px',
                                                                        height: 'auto'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div id="mce-responses"  style={{ marginTop: '12px' }}>
                                                            <div className="response" id="mce-error-response" style={{ display: 'none', color: '#ff6b6b', textAlign: 'center' }}> {t('footer.error-text')}</div>
                                                            <div className="response" id="mce-success-response" style={{ width: '100%', display: 'none', color: '#51cf66', textAlign: 'center' }}> {t('footer.success-text')}</div>
                                                        </div>
                                                        <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                                                            <input 
                                                                type="text" 
                                                                name="b_801951f17b12d427872e2ac56_ce8812881a" 
                                                                tabIndex={-1} 
                                                                value=""
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
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
                                                <Link href={`/${locale}/properties?category=apartments`} className="text-white">{t('footer.category-2')}</Link>
                                            </li>
                                            <li>
                                                <Link href={`/${locale}/properties?property_status=New+Developments`} className="text-white">{t('footer.category-3')}</Link>
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
