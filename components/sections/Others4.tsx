import Link from "next/link";

export default function Others4() {
    return (
        <>
            {/*===== OTHERS AREA STARTS =======*/}
            <div className="section-choose">
                <div className="padding-global padding-section-medium">
                        <div className="choose1">
                            <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-5 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5 className="text-color-white">Why Choose Us</h5>
                                <div className="space16" />
                                <h2 className="text-color-white">Why Choose Baruch Real Estate?</h2>
                            </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                            <div className="">
                                <p className="text-size-medium text-color-cream text-weight-normal">At Baruch Real Estate, we believe that real estate is first and foremost about relationships. We don’t just sell houses.
                                <br /> <br />
                                We connect people with the right lifestyle, neighborhood, and future.
                                <br /> <br />
                                Our team consists of local residents who know the Costa del Sol not just as real estate professionals, but as proud members of the community. Whether you’re drawn to the energy of Marbella, the family-friendly charm of Fuengirola, or the peaceful elegance of Benahavís, we’ll help you find the perfect match. Not only for your needs, but for your way of life.</p>
                                <div className="space24" />
                                
                                <div className="btn-area1 aos-init aos-animate ">
                                    <Link href="/contact" className="vl-btn1 is-secondary">
                                        Contact Us
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
                                <div className="col-lg-6">
                            <div className="chosse-images">
                              
                                <div className="img1 text-end">
                                    <img src="/assets/img/all-images/others/others-img9.png" alt="housa" />
                                </div>
                                <div className="img2">
                                    <img src="/assets/img/all-images/others/others-img10.png" alt="housa" />
                                </div>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                    {/*===== OTHERS AREA ENDS =======*/}
               
            </div>
            
        </>
    );
}
