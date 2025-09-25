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
                                <h2 className="text-color-white">{t('about.others4.subtitle')}</h2>
                                <div className="space16" />
                                <h5  className="text-color-white">{t('about.others4.title')}</h5>
                                <div className="space16" />
                                <Link href="/about-us/#contact" className="vl-btn1 is-secondary">
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








            
        </>
    );
}
