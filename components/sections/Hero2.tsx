'use client';
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';

import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

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

const SLIDES = [
    "/assets/img/home/img-1.png",
    "/assets/img/home/img-2.png"
];

const Hero2 = ({ homeInfo }: Hero2Props) => {
    const { t } = useTranslation('common');

    return (
        <>
            {/*===== HERO AREA STARTS =======*/}
            <div className="hero2-section-area" style={{ position: 'relative', minHeight: 500 }}>
                <Swiper
                    modules={[ EffectFade, Navigation]}
                    effect="fade"
                    // autoplay={{ delay: 5000, disableOnInteraction: false }}
                    
                    navigation
                    loop
                    className="hero2-swiper"
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 2 // Cambiado de 1 a 2 para que las flechas estén por encima del overlay
                    }}
                >
                    {SLIDES.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    minHeight: 500,
                                    backgroundImage: `url(${img})`,
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div
                    className="container"
                    style={{
                        position: "relative",
                        zIndex: 3,
                        height: "100%",
                        display: "flex",
                        alignItems: "flex-end",
                        paddingBottom: "62px"
                    }}
                >
                    <div className="row">
                        <div className="row ">
                            <div className="hero-heading heading1" style={{ maxWidth: '860px' }}>
                                <h1 className="heading-style-h1 ">{homeInfo?.Title}</h1>
                                <h3 className="text-white size-32">{homeInfo?.Subtitle}</h3>
                                
                            </div>
                        </div>
                    </div>
                    <div className="space100" />
                    <div className="space16" />
                </div>
                {/* Overlay para oscurecer la imagen si se desea */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.35)",
                        zIndex: 1 // El overlay ahora está debajo del Swiper y sus flechas
                    }}
                />
            </div>
            {/*===== HERO AREA ENDS =======*/}
        </>
    );
}

export default Hero2;
