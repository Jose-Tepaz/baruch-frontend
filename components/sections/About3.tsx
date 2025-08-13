'use client';
import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useTranslation } from "@/utils/i18n-simple";
interface About3Props {
    homeInfo?: any;
}

export default function About3({ homeInfo }: About3Props) {
    const { t } = useTranslation('common')
    if (!homeInfo?.why_choose_us) {
        return null;
    }
    
    const { why_choose_us } = homeInfo;
    const { Title, Description, img_1, img_2} = why_choose_us;
    

    return (
        <>
            {/*===== ABOUT AREA STARTS =======*/}
            <div className="about3-section-area sp1 ">
                
                <div className="padding-global">
                <div className="container-large">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-images-area">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="img2  reveal img-about-3" >
                                            <img src= {img_1} alt="baruch" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 img-about-3-sectiond">
                                        <div className="space100" />
                                        <div className="img1  reveal img-about-3" >
                                            <img src="/assets/img/home/img-1.png" alt="baruch" />
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <div className="col-lg-1" />
                        <div className="col-lg-5">
                            <div className="about-heading"   >
                                <h3 style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(189, 189, 189, 0.1)', width: 'auto', padding: '6px', borderRadius: '10px'}}>
                                {Title}
                                </h3>
                                
                                <div className="space26" />
                                
                                
                                <div  className="text-white text-size-large text-color-blue">
                                <BlocksRenderer content={[Description[0]] } />
                                <BlocksRenderer content={[Description[1]]} />
                                <BlocksRenderer content={[Description[2]]} />
                                <br />
                                <BlocksRenderer content={[Description[3]]} />
                                </div>
                                <div className="space32" />
                                <div className="btn-area1" >
                                    <Link href="/properties" className="vl-btn1 ">
                                        {t('home.btn-about-section-2')}
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
                <div className="space26" />
            </div>
            {/*===== ABOUT AREA ENDS =======*/}
        </>
    );
}
