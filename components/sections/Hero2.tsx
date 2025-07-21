'use client';
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";

interface Hero2Props {
    homeInfo?: {
        Title?: string;
        Subtitle?: string;
        banner_img?: string;
       
        hero?: {
            title?: string;
            subtitle?: string;
            description?: string;
            image?: string;
        };
    };
}

const Hero2 = ({ homeInfo }: Hero2Props) => {
    const { t, i18n } = useTranslation('common');
   console.log(homeInfo);
   

    return (
        <>
            {/*===== HERO AREA STARTS =======*/}
            <div
                className="hero2-section-area"
                style={{
                    backgroundImage: `url(${homeInfo?.banner_img})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="row ">
                            <div className="hero-heading heading1" style={{maxWidth: '860px'}}>
                                <h1 className="text-anime-style-3 heading-style-h1 ">{homeInfo?.Title}</h1>
                                <h3 className="text-anime-style-3 text-white size-32">{homeInfo?.Subtitle}</h3>
                              <div className="d-flex justify-content-start align-items-center gap-4 mt-4">
                                <div className="">
                                <Link href="/properties" className="vl-btn1 mt-0">
                                        {t('home.btn-1-hero')}
                                        <span className="arrow1 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                        <span className="arrow2 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                    </Link>
                                </div>
                                <div className="">
                                <Link href="/#more-info" className="vl-btn1 is-secondary mt-0">
                                        {t('home.btn-2-hero')}
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
                    <div className="space100" />
                    <div className="space16" />
                </div>
            </div>
            {/*===== HERO AREA ENDS =======*/}
        </>
    );
}

export default Hero2;
