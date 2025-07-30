"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "@/utils/i18n-simple";
 

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
};

interface Testimonial {
    testimonial_content: string;
    name_of_client: string;
    position_of_client: string;
}

interface Testimonial2Props {
    testimonials?: Testimonial[];
}

// Datos hardcodeados como fallback
const fallbackTestimonials: Testimonial[] = [
    {
        testimonial_content: '"Baruch made our home-buying experience smooth and stress-free. Highly recommend their services!"',
        name_of_client: 'Santiago Towne',
        position_of_client: 'Home Owner'
    },
    {
        testimonial_content: '"Excellent service and professional team. Found our dream home through Baruch!"',
        name_of_client: 'Maria Rodriguez',
        position_of_client: 'Property Buyer'
    },
    {
        testimonial_content: '"The best real estate agency I have worked with. Highly recommended!"',
        name_of_client: 'John Smith',
        position_of_client: 'Investor'
    }
];

export default function Testimonial2({ testimonials }: Testimonial2Props = {}) {
    const { t } = useTranslation('common');
    
    // Usar testimonials de props o fallback
    const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;

    // Función para renderizar blocks de contenido
    const renderBlocks = (content: string) => {
        try {
            // Si el contenido es un string JSON, parsearlo
            const blocks = typeof content === 'string' ? JSON.parse(content) : content;
            
            if (Array.isArray(blocks)) {
                return blocks.map((block, index) => {
                    if (block.type === 'paragraph') {
                        return (
                            <p key={index} className="testimonial-text">
                                {block.children?.map((child: any, childIndex: number) => 
                                    child.text || ''
                                ).join('')}
                            </p>
                        );
                    }
                    return null;
                });
            }
            
            // Si no es un array, mostrar como texto simple
            return <p className="testimonial-text">{content}</p>;
        } catch (error) {
            // Si hay error al parsear, mostrar como texto simple
            return <p className="testimonial-text">{content}</p>;
        }
    };

    return (
        <>
            {/*===== TESTIMONIAL AREA STARTS =======*/}
            <div className="testi2 sp1 py-5">
                <div className="padding-global">
                    <div className="container-large">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="testi-img image-anime reveal">
                                <img className="imgage-landscape" src="/assets/img/all-images//testimonial/testimonial-img1.png" alt="housa" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="heading1">
                                <h5 className="text-color-blue">{t('home.subtitle-testimonials')}</h5>
                                <div className="space16" />
                                <h2 className="">{t('home.title-testimonials')}</h2>
                                <div className="space50" />
                                <div className="testimonial-container">
                                    <Swiper {...swiperOptions} className="swiper mySwiper">
                                        <div className="swiper-wrapper">
                                            {displayTestimonials.map((testimonial, index) => (
                                                <SwiperSlide key={index} className="swiper-slide">
                                                    <div className="testimonial-card">
                                                        <div className="stars">
                                                            <ul>
                                                                <li>
                                                                    <i className="fa-solid fa-star" />
                                                                </li>
                                                                <li>
                                                                    <i className="fa-solid fa-star" />
                                                                </li>
                                                                <li>
                                                                    <i className="fa-solid fa-star" />
                                                                </li>
                                                                <li>
                                                                    <i className="fa-solid fa-star" />
                                                                </li>
                                                                <li>
                                                                    <i className="fa-solid fa-star" />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="space20" />
                                                        {renderBlocks(testimonial.testimonial_content)}
                                                        <div className="space32" />
                                                        <div className="profile-quito">
                                                            <div className="profile">
                                                                
                                                                <div className="name">
                                                                    <h4>{testimonial.name_of_client}</h4>
                                                                    <span>{testimonial.position_of_client}</span>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </div>
                                        {/* Navigation Buttons */}
                                        <div className="swiper-button-prev custom-prev" />
                                        <div className="swiper-button-next custom-next" />
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                    
            </div>
            {/*===== TESTIMONIAL AREA ENDS =======*/}
        </>
    );
}
