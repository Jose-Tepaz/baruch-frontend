import Link from "next/link";

export default function About3() {
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
                                            <img src="/assets/img/all-images/about/about-img5.png" alt="baruch" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="space100" />
                                        <div className="img1  reveal">
                                            <img src="/assets/img/all-images/about/about-img6.png" alt="baruch" />
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <div className="col-lg-1" />
                        <div className="col-lg-5">
                            <div className="about-heading " >
                                
                                <h5 data-aos="fade-left" data-aos-duration={800} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(189, 189, 189, 0.1)', width: 'auto', padding: '6px', borderRadius: '10px', color: '#D7CCC3'}}>
                                Why Choose Us
                                </h5>
                                
                                
                                <div className="space26" />
                                <h3 className="text-anime-style-3 text-white size-32 text-color-cream">Why Baruch Stands Out</h3>
                                <div className="space18" />
                                <p className="text-white size-20 text-color-cream">Experts Agents</p>
                                <p className="text-white size-20 text-color-cream">Extensive Listings</p>
                                <p className="text-white size-20 text-color-cream">Customer Satisfaction</p>
                                <div className="space18" />
                                <p data-aos="fade-left" data-aos-duration={900} className="text-white">
                                At Baruch, we believe that finding a home goes beyond just a roof over your head – it’s about discovering an place that fits your unique lifestyle. Whether you're searching for cozy.
                                </p>
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
