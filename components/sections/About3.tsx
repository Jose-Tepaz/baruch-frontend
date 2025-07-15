'use client';
import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface About3Props {
    homeInfo?: {
        title?: string;
        subtitle?: string;
        description?: any;
        image?: string;
        // Campos adicionales que pueden venir de Strapi
        Title?: string;
        SubTitle?: string;
        Description?: any;
        about3?: {
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

export default function About3({ homeInfo }: About3Props) {
    console.log('=== About3 Component Debug ===');
    console.log('Received homeInfo:', homeInfo);
    console.log('homeInfo keys:', homeInfo ? Object.keys(homeInfo) : 'No homeInfo');

    // Prioridad: about3 > abouttitle.about_title > datos principales > fallback
    const title = homeInfo?.about3?.title || 
                  homeInfo?.abouttitle?.about_title?.Title || 
                  homeInfo?.Title || 
                  homeInfo?.title || 
                  "Why Choose Us";
    
    const subtitle = homeInfo?.about3?.subtitle || 
                     homeInfo?.abouttitle?.about_title?.Sub_title || 
                     homeInfo?.SubTitle || 
                     homeInfo?.subtitle || 
                     "Why Baruch Stands Out";
    
    const description = homeInfo?.about3?.description || 
                        homeInfo?.abouttitle?.about_title?.Description || 
                        homeInfo?.Description || 
                        homeInfo?.description || 
                        "At Baruch, we believe that finding a home goes beyond just a roof over your head – it's about discovering an place that fits your unique lifestyle. Whether you're searching for cozy.";
    
    const image1 = homeInfo?.about3?.image || 
                   homeInfo?.abouttitle?.about_title?.img_1 || 
                   homeInfo?.image || 
                   "/assets/img/all-images/about/about-img5.png";

    const image2 = homeInfo?.about3?.image || 
                   homeInfo?.abouttitle?.about_title?.img_2 || 
                   homeInfo?.image || 
                   "/assets/img/all-images/about/about-img6.png";

    console.log('=== About3 Final Values ===');
    console.log('Title used:', title);
    console.log('Subtitle used:', subtitle);
    console.log('Description used:', description);
    console.log('Image1 used:', image1);
    console.log('Image2 used:', image2);
    console.log('Available data paths:');
    console.log('  - homeInfo?.about3?.title:', homeInfo?.about3?.title);
    console.log('  - homeInfo?.abouttitle?.about_title?.Title:', homeInfo?.abouttitle?.about_title?.Title);
    console.log('  - homeInfo?.Title:', homeInfo?.Title);
    console.log('  - homeInfo?.title:', homeInfo?.title);

    // Función para renderizar el contenido de description de manera segura
    const renderDescription = () => {
        if (!description) return "At Baruch, we believe that finding a home goes beyond just a roof over your head – it's about discovering an place that fits your unique lifestyle. Whether you're searching for cozy.";
        
        // Si description es un string, renderizarlo directamente
        if (typeof description === 'string') {
            return description;
        }
        
        // Si description es un array de bloques Strapi, usar BlocksRenderer
        if (Array.isArray(description)) {
            return <BlocksRenderer content={description} />;
        }
        
        // Si es un objeto simple, intentar extraer el texto
        if (typeof description === 'object') {
            return description.toString();
        }
        
        return "At Baruch, we believe that finding a home goes beyond just a roof over your head – it's about discovering an place that fits your unique lifestyle. Whether you're searching for cozy.";
    };

    return (
        <>
            {/*===== ABOUT AREA STARTS =======*/}
            <div className="about3-section-area sp1 bg-blue">
                <div className="space26" />
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-images-area">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="img2  reveal">
                                            <img src={image1} alt="baruch" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="space100" />
                                        <div className="img1  reveal">
                                            <img src={image2} alt="baruch" />
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <div className="col-lg-1" />
                        <div className="col-lg-5">
                            <div className="about-heading">
                                <h5 data-aos="fade-left" data-aos-duration={800} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(189, 189, 189, 0.1)', width: 'auto', padding: '6px', borderRadius: '10px', color: '#D7CCC3'}}>
                                {title}
                                </h5>
                                
                                <div className="space26" />
                                <h3 className="text-anime-style-3 text-white size-32 text-color-cream">
                                    {subtitle}
                                </h3>
                                <div className="space18" />
                                <p className="text-white size-20 text-color-cream">Experts Agents</p>
                                <p className="text-white size-20 text-color-cream">Extensive Listings</p>
                                <p className="text-white size-20 text-color-cream">Customer Satisfaction</p>
                                <div className="space18" />
                                <div data-aos="fade-left" data-aos-duration={900} className="text-white">
                                    {renderDescription()}
                                </div>
                                <div className="space32" />
                                <div className="btn-area1" data-aos="fade-left" data-aos-duration={1200}>
                                    <Link href="/properties" className="vl-btn1 is-secondary mt-0">
                                        View Listing
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
                <div className="space26" />
            </div>
            {/*===== ABOUT AREA ENDS =======*/}
        </>
    );
}
