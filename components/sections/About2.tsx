'use client';
import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useTranslation } from "@/utils/i18n-simple";
interface About2Props {
    homeInfo?: {
        title?: string;
        subtitle?: string;
        description?: any;
        image?: string;
        // Campos adicionales que pueden venir de Strapi
        Title?: string;
        SubTitle?: string;
        Description?: any;
        about2?: {
            title?: string;
            subtitle?: string;
            description?: any;
            image?: string;
        };
        abouttitle?: {
            about_title?: {
                Title?: string;
                Sub_title?: string;
                Description?: any;
                img_1?: string;
                img_2?: string;
            };
        };
    };
}

const About2 = ({ homeInfo }: About2Props) => {
    const { t, i18n } = useTranslation('common');
    console.log('=== About2 Component Debug ===');
    console.log('Received homeInfo:', homeInfo);
    console.log('homeInfo keys:', homeInfo ? Object.keys(homeInfo) : 'No homeInfo');

    // Prioridad: about2 > abouttitle.about_title > datos principales > fallback
    const title = homeInfo?.about2?.title || 
                  homeInfo?.abouttitle?.about_title?.Title || 
                  homeInfo?.Title || 
                  homeInfo?.title || 
                  "About Our Company";
    
    const subtitle = homeInfo?.about2?.subtitle || 
                     homeInfo?.abouttitle?.about_title?.Sub_title || 
                     homeInfo?.SubTitle || 
                     homeInfo?.subtitle || 
                     "Your Trusted Real Estate Partner";
    
    const description = homeInfo?.about2?.description || 
                        homeInfo?.abouttitle?.about_title?.Description || 
                        homeInfo?.Description || 
                        homeInfo?.description || 
                        "We are dedicated to providing exceptional real estate services with a focus on client satisfaction and market expertise.";
    
    const image = homeInfo?.about2?.image || 
                  homeInfo?.abouttitle?.about_title?.img_1 || 
                  homeInfo?.image || 
                  "/assets/img/all-images/about/about-img1.png";

    const image2 = homeInfo?.about2?.image || 
                   homeInfo?.abouttitle?.about_title?.img_2 || 
                   homeInfo?.image || 
                   "/assets/img/all-images/about/about-img2.png";

  

    // Función para renderizar el contenido de description de manera segura
    const renderDescription = () => {
        if (!description) return null;
        
        
        
        // Si description es un array de bloques Strapi, usar BlocksRenderer
        if (Array.isArray(description)) {
            console.log('Using BlocksRenderer for array');
            return <BlocksRenderer content={description} />;
        }
        
        // Si description es un objeto que contiene bloques, usar BlocksRenderer
        if (typeof description === 'object' && description !== null) {
            console.log('Description is object, checking for blocks structure');
            
            // Si el objeto tiene una propiedad que es un array (típico de Strapi blocks)
            if (description.blocks && Array.isArray(description.blocks)) {
                console.log('Using BlocksRenderer for description.blocks');
                return <BlocksRenderer content={description.blocks} />;
            }
            
            // Si el objeto en sí parece ser un bloque de Strapi
            if (description.type || description.children) {
                console.log('Using BlocksRenderer for single block object');
                return <BlocksRenderer content={[description]} />;
            }
            
            // Si no es una estructura de bloques reconocida, intentar toString
            console.log('Object is not blocks structure, using toString');
            return <p>{description.toString()}</p>;
        }
        
        // Si description es un string, renderizarlo directamente
        if (typeof description === 'string') {
            console.log('Using string directly');
            return <p>{description}</p>;
        }
        
        console.log('Unknown description format, returning null');
        return null;
    };
   
    return (
        <>
            {/*===== ABOUT AREA STARTS =======*/}
            <div className="about2 sp1">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div className="heading1">
                                <h5 className="text-color-black-blue">{t('home.title-about-us')}</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">{title}</h2>
                                <h3>{subtitle}</h3>
                                <div className="space50" />
                                <div className="img1 image-anime reveal" style={{width: '100%', height: '350px'}}>
                                    <img src={image} alt="housa" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="space30 d-lg-none d-block" />
                            <div className="img2 image-anime reveal">
                                <img src={image2} alt="housa" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="heading1">
                            <div className="space30" />
                                <div className="space30" />
                                <div>
                                    {renderDescription()}
                                </div>
                                
                                <div className="space32" />
                                <div className="btn-area1" data-aos="fade-left" data-aos-duration={1200}>
                                    <Link href="/property-halfmap-grid" className="vl-btn1">
                                        Add Listing
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
            {/*===== ABOUT AREA ENDS =======*/}
        </>
    );
}

export default About2;