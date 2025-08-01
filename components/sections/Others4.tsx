"use client"
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";

export default function Others4() {
    const { t, i18n } = useTranslation('common');

    return (
        <>
            {/*===== OTHERS AREA STARTS =======*/}
            <div className="section-choose">
                <div className="padding-global padding-section-medium">
                        <div className="choose1">
                            <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-5 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5 className="text-color-white">{t('about.others4.subtitle')}</h5>
                                <div className="space16" /> 
                                <h2 className="text-color-white">{t('about.others4.title')}</h2>
                            </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                            <div className="">
                                <p className="text-size-medium text-color-cream text-weight-normal">{t('about.others4.description')}</p>
                                <div className="space24" />
                                
                                <div className="btn-area1 aos-init aos-animate ">
                                    <Link href="/contact" className="vl-btn1 is-secondary">
                                        {t('about.others4.btn_text')}
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
                            <div className="chosse-images">
                              
                                <div className="img1 text-end">
                                    <img src="/assets/img/all-images/others/others-img9.png" alt="housa" />
                                </div>
                                <div className="img2">
                                    <img src="/assets/img/all-images/others/others-img10.png" alt="housa" />
                                </div>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                    {/*===== OTHERS AREA ENDS =======*/}
               
            </div>
            
        </>
    );
}
