'use client';
import Link from "next/link";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useTranslation } from "@/utils/i18n-simple";
import img_1 from '@/public/assets/img/all-images/home/hp-1.webp'

// Este componente ya no recibe datos de la API, solo usa traducciones de common.json
export default function About2() {
    const { t } = useTranslation('common');
    const getLocalizedPath = useLocalizedPath();

    return (
        <>
            {/*===== ABOUT AREA STARTS =======*/}
            <div className="about2 sp1" id="more-info">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="">
                               
                                <div className="space16" />
                                <h2 className="font-weight-400 size-20 uppercase">{t('home.title-2-about-us')}</h2>
                                <h3 className="font-weight-400 size-32 uppercase">{t('home.title-3-about-us')}</h3>
                                <div className="space16" />
                                <p>{t('home.paragraph-about-us')}</p>
                                <div className="space30" />
                                <div className="btn-area1">
                                    <Link href={getLocalizedPath('/properties')} className="vl-btn1">
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
                        
                        <div className="col-lg-6">
                            <div className="img2">
                                <img src={img_1.src} alt="housa" />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            {/*===== ABOUT AREA ENDS =======*/}
        </>
    );
}