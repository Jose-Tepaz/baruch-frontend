'use client';
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";
import img_1 from '@/public/assets/img/home/img-1.png'
import img_2 from '@/public/assets/img/home/img-2.png'

// Este componente ya no recibe datos de la API, solo usa traducciones de common.json
export default function About2() {
    const { t } = useTranslation('common');

    return (
        <>
            {/*===== ABOUT AREA STARTS =======*/}
            <div className="about2 sp1" id="more-info">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div className="heading1">
                                <h5 className="text-color-black-blue">{t('home.title-about-us')}</h5>
                                <div className="space16" />
                                <h2>{t('home.title-2-about-us')}</h2>
                                <h3>{t('home.title-3-about-us')}</h3>
                                <div className="space30" />
                                <div className="img1 image-anime reveal" style={{ width: '100%', height: '350px' }}>
                                    <img src={img_1.src} alt="housa" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="space30 d-lg-none d-block" />
                            <div className="img2 image-anime reveal">
                                <img src={img_2.src} alt="housa" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="heading1">
                                <div>
                                    <p>{t('home.paragraph-about-us')}</p>
                                </div>
                                <div className="space32" />
                                <div className="btn-area1">
                                    <Link href="/properties" className="vl-btn1">
                                        {t('home.btn-1-hero')}
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
            {/*===== ABOUT AREA ENDS =======*/}
        </>
    );
}