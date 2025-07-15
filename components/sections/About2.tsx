'use client';
import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

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

    console.log('=== About2 Final Values ===');
    console.log('Title used:', title);
    console.log('Subtitle used:', subtitle);
    console.log('Description used:', description);
    console.log('Image used:', image);
    console.log('Available data paths:');
    console.log('  - homeInfo?.about2?.title:', homeInfo?.about2?.title);
    console.log('  - homeInfo?.abouttitle?.about_title?.Title:', homeInfo?.abouttitle?.about_title?.Title);
    console.log('  - homeInfo?.Title:', homeInfo?.Title);
    console.log('  - homeInfo?.title:', homeInfo?.title);

    // Función para renderizar el contenido de description de manera segura
    const renderDescription = () => {
        if (!description) return null;
        
        console.log('=== About2 Description Debug ===');
        console.log('Description type:', typeof description);
        console.log('Description value:', description);
        console.log('Is array:', Array.isArray(description));
        
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
                                <h5 className="text-color-black-blue">About Company</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">{title}</h2>
                                <h3>{subtitle}</h3>
                                <div className="space50" />
                                <div className="img1 image-anime reveal">
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
                                <div className="arrow-btnarea" data-aos="fade-left" data-aos-duration={900}>
                                    <Link href="/about-us">
                                        <div className="content keyframe5">
                                            <h6 className="circle rotateme">
                                                <span style={{ transform: "rotate(0deg)" }}>A</span>
                                                <span style={{ transform: "rotate(17deg)" }}>S</span>
                                                <span style={{ transform: "rotate(34deg)" }}>u</span>
                                                <span style={{ transform: "rotate(51deg)" }}>c</span>
                                                <span style={{ transform: "rotate(51deg)" }}>c</span>
                                                <span style={{ transform: "rotate(68deg)" }}>e</span>
                                                <span style={{ transform: "rotate(85deg)" }}>s</span>
                                                <span style={{ transform: "rotate(102deg)" }}>s</span>
                                                <span style={{ transform: "rotate(119deg)" }}>b</span>
                                                <span style={{ transform: "rotate(136deg)" }}>r</span>
                                                <span style={{ transform: "rotate(153deg)" }}>a</span>
                                                <span style={{ transform: "rotate(170deg)" }}>n</span>
                                                <span style={{ transform: "rotate(187deg)" }}>w</span>
                                                <span style={{ transform: "rotate(204deg)" }}>i</span>
                                                <span style={{ transform: "rotate(221deg)" }}>t</span>
                                                <span style={{ transform: "rotate(238deg)" }}>h</span>
                                                <span style={{ transform: "rotate(255deg)" }}>d</span>
                                                <span style={{ transform: "rotate(272deg)" }}>e</span>
                                                <span style={{ transform: "rotate(289deg)" }}>m</span>
                                                <span style={{ transform: "rotate(306deg)" }}>o</span>
                                                <span style={{ transform: "rotate(323deg)" }}>u</span>
                                                <span style={{ transform: "rotate(340deg)" }}>i</span>
                                                <span style={{ transform: "rotate(340deg)" }}>b</span>
                                                <span style={{ transform: "rotate(340deg)" }}>u</span>
                                                <span style={{ transform: "rotate(340deg)" }}>i</span>
                                                <span style={{ transform: "rotate(340deg)" }}>l</span>
                                                <span style={{ transform: "rotate(340deg)" }}>d</span>
                                            </h6>
                                        </div>
                                        <img src="/assets/img/icons/arrow1.svg" alt="housa" className="arrow1" />
                                    </Link>
                                </div>
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