'use client';
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";
import Iconcheck from '@/public/assets/img/icons/rounded-check.svg';


export default function Others3() {
    const { t, i18n } = useTranslation('common');

    return (
        <>
            <div className="space30" />
            {/*===== OTHERS AREA STARTS =======*/}
            <div className="miision1">
                <div className="padding-global">

                    <div className="container-large">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="heading1 text-center space-margin60">
                               
                                <div className="space16" />
                                <h2 className="text-color-blue">{t('about.others3.title')}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="wrapp-content-mission">
                        <div className="col-lg-6">
                            <div className="images1 h-100 w-100">
                                <img src="/assets/img/all-images/others/others-img8.png" alt="housa" />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="mission-heading heading1">
                                <div className="wrapp-card-mission" >
                                <h2>{t('about.others3.forbuyers')}</h2>
                                <div className="space16" />
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                    <img src={Iconcheck.src} alt="check" style={{ width: '18px', height: '18px', color: '#fff' }} />
                                    <p>{t('about.others3.forbuyersDescription.list1')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                <img src={Iconcheck.src} alt="check" style={{ width: '18px', height: '18px', color: '#fff' }} />
                                    <p>{t('about.others3.forbuyersDescription.list2')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                <img src={Iconcheck.src} alt="check" style={{ width: '18px', height: '18px', color: '#fff' }} />
                                    <p>{t('about.others3.forbuyersDescription.list3')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                <img src={Iconcheck.src} alt="check" style={{ width: '18px', height: '18px', color: '#fff' }} />
                                    <p>{t('about.others3.forbuyersDescription.list4')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                <img src={Iconcheck.src} alt="check" style={{ width: '18px', height: '18px', color: '#fff' }} />
                                    <p>{t('about.others3.forbuyersDescription.list5')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                <img src={Iconcheck.src} alt="check" style={{ width: '18px', height: '18px', color: '#fff' }} />
                                    <p>{t('about.others3.forbuyersDescription.list6')}</p>
                                </div>
                                <div className="space32" />
                                </div>
                                <div className="space20" />
                                <div className="wrapp-card-mission" >
                                <h2>{t('about.others3.forseellers')}</h2>
                                <div className="space16" />
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                <img src={Iconcheck.src} alt="check" style={{ width: '18px', height: '18px', color: '#fff' }} />
                                    <p>{t('about.others3.forseellersDescription.list1')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                <img src={Iconcheck.src} alt="check" style={{ width: '18px', height: '18px', color: '#fff' }} />
                                    <p>{t('about.others3.forseellersDescription.list2')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                <img src={Iconcheck.src} alt="check" style={{ width: '18px', height: '18px', color: '#fff' }} />
                                    <p>{t('about.others3.forseellersDescription.list3')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                <img src={Iconcheck.src} alt="check" style={{ width: '18px', height: '18px', color: '#fff' }} />
                                    <p>{t('about.others3.forseellersDescription.list4')}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                <img src={Iconcheck.src} alt="check" style={{ width: '18px', height: '18px', color: '#fff' }} />
                                    <p>{t('about.others3.forseellersDescription.list5')}</p>
                                </div>
                                </div>                 
                                <div className="btn-area1">
                                    <Link href="/properties" className="vl-btn1">
                                        {t('about.others3.btn_text')}
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
            
            <div className="space40" />
        </>
    );
}
