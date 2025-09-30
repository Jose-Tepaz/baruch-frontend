"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";
import "@/public/assets/css/propertyDetails.css";
import "swiper/css/navigation";

interface Property {
    gallery: string[];
    main_image?: string;
}

export default function Properties2Details({ property }: { property: Property }) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

    // Crear un array de imágenes que comienza con main_image (si existe) y luego la galería, evitando duplicados
    const images = [
        ...(property.main_image ? [property.main_image] : []),
        ...property.gallery.filter(img => img !== property.main_image)
    ];

    return (
        <>
            {/*===== PROPERTIES AREA STARTS =======*/}
            <div className="properties2-others sp1">

                <div className="padding-global">
                    <div className="container-large">
                    <div className="space100"></div>
                        <div className="col-lg-12 ">
                            <Swiper
                                modules={[Navigation, Thumbs]}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                spaceBetween={0}
                                freeMode={true}
                                slidesPerView={1}
                                className="all-galler-images"
                                autoplay={false}
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index} className="big-img">
                                        <img src={image} alt={`Imagen ${index + 1}`} className="main-img-property" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                modules={[Thumbs]}
                                spaceBetween={10}
                                freeMode={true}
                                slidesPerView={5}
                                watchSlidesProgress={true}
                                className="bottom-galler-images"
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index} className="small-img">
                                        <img src={image} alt={`Miniatura ${index + 1}`} className="thumb-img-property" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>


                
               
            </div>
            {/*===== PROPERTIES AREA ENDS =======*/}
        </>
    );
}