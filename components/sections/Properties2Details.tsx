"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";
import "@/public/assets/css/propertyDetails.css";

interface Property {
    
    gallery: string[];
 
}

export default function Properties2Details({ property }: { property: Property }) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  
    return (
        <>
            {/*===== PROPERTIES AREA STARTS =======*/}
            
            <div className="properties2-others sp1">
                <div className="space100"></div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <Swiper modules={[Autoplay, Thumbs]} thumbs={{ swiper: thumbsSwiper }} spaceBetween={0} autoplay={{ delay: 2500 }} freeMode={true} slidesPerView={1} className="all-galler-images" >
                                {property.gallery.map((image, index) => (
                                    <SwiperSlide key={index} className="big-img">
                                        <img src={image} alt={`Imagen ${index + 1}`} className="main-img-property"/>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Swiper onSwiper={setThumbsSwiper} modules={[Thumbs]} spaceBetween={10} freeMode={true} slidesPerView={5} watchSlidesProgress={true} className="bottom-galler-images" >
                                {property.gallery.map((image, index) => (
                                    <SwiperSlide key={index} className="small-img">
                                        <img src={image} alt={`Miniatura ${index + 1}`} className="thumb-img-property"/>
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
