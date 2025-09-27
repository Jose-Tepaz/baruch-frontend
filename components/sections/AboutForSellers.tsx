'use client';
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";
import Iconcheck from '@/public/assets/img/icons/rounded-check.svg';


export default function Others3() {
    const { t, i18n } = useTranslation('common');

    return (
        <>
            
            {/*===== OTHERS AREA STARTS =======*/}
            <div className="bg-color-white">
                <div className="space30" />
                <div className="padding-global">

                    <div className="container-large">
                    

                    <div className="wrapp-content-mission d-flex reverse-mobile">
                        <div className="col-lg-6">
                            <div className="mission-heading ">
                                
                                <div className="space20" />
                                <div className="wrapp-card-mission" >
                                <h3 className="size-32">{t('about.others3.forseellers')}</h3>
                                <div className="space16" />
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px', marginTop: '10px' }}>
                                
                                    <p>-{t('about.others3.forseellersDescription.list1')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px', marginTop: '10px' }}>
                                
                                    <p>-{t('about.others3.forseellersDescription.list2')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px', marginTop: '10px' }}>
                                
                                    <p>-{t('about.others3.forseellersDescription.list3')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px', marginTop: '10px' }}>
                                
                                    <p>-{t('about.others3.forseellersDescription.list4')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px', marginTop: '10px' }}>
                                
                                    <p>-{t('about.others3.forseellersDescription.list5')}</p>
                                </div>
                                </div>                 
                                
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="img-side-about">
                                <img src="/assets/img/all-images/about/about-hero.webp" alt="housa" />
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


