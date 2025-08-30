"use client"
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";

export default function Others4() {
    const { t, i18n } = useTranslation('common');

    return (
        <>
            {/*===== OTHERS AREA STARTS =======*/}
            <div className="section-choose">
               
            
                    {/*===== OTHERS AREA ENDS =======*/}


                    <div className="space30" />
            {/*===== OTHERS AREA STARTS =======*/}
            <div className="">
                <div className="padding-global">

                    <div className="container-large">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className=" text-center space-margin60">
                               
                                <div className="space16" />
                                <h5 className="text-color-white">{t('about.others4.subtitle')}</h5>
                                <h2 className="text-color-white">{t('about.others4.title')}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="wrapp-content-mission">
                        <div className="col-lg-6">
                            <div className="img-side-about">
                                <img src="/assets/img/all-images/about/about-img6.png" alt="housa" />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="mission-heading ">
                                
                                <div className="space20" />
                                <div className="wrapp-card-mission" >
                                
                                    <p className="text-size-medium text-color-white text-weight-normal">{t('about.others4.description')}</p>
                                
                                
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
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            
            <div className="space40" />

                 
               
            </div>








            
        </>
    );
}
