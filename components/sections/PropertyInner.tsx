import Link from "next/link";
import ContactSeller from "@/components/elements/ContactSeller";
import PropertyDetails from "@/components/sections/PropertyDetails";
import PropertyDescription from "@/components/sections/PropertyDescription";


interface Property {
    title: string;
    description: string;
    price: number;
    address: string;
    bedrooms: number;
    bathrooms: number;
    parking_spaces: number;
    main_image: string;
    gallery: string[];
    category: any;
    is_new: boolean;
    slug: string;
    documentId: string;
    Map_link: string;
    propertyStatus: string;
    is_private?: boolean;
}

export default function PropertyInner({ block_extend, property }: { block_extend: string, property: Property }) {
    console.log(property);
    return (
        <>
            {/*===== PROPERTY AREA STARTS =======*/}
            <div className="property-inner-section-find">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="property-mapgrid-area">
                                <div className="space32" />
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="sidebar1-area">
                                            <ContactSeller
                                                agentName="Shagor Ahmed"
                                                agentImage="/assets/img/all-images/others/others-img7.png"
                                                agentEmail="housa@.com"
                                                agentPhone="(234) 345-4574"
                                            />
                                            <div className="space30" />


                                            <div className="space30" />
                                            
                                            <div className="space30 d-lg-none d-block" />
                                        </div>
                                    </div>

                                    <div className="col-lg-9">
                                        <div className="property-widget-sidebar">
                                           
                                               
                                            <PropertyDetails property={property} />
                                            <div className="space30" />
                                            <PropertyDescription property={property} />

                                                <div className="space30" />
                                                
                                                    <div className="wrapp-card-details-propertie">
                                                        <h3>Map Locations</h3>
                                                      
                                                        
                                                            <iframe src={property.Map_link} width={800}  height={450} style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                                          
                                                            <div className="list-property-details">
                                                            <ul>
                                                                <li>
                                                                    <span>Address:</span>
                                                                    <div>CA, USA</div>
                                                                </li>
                                                                <li>
                                                                    <span>City:</span>
                                                                    <div>Los Angeles</div>
                                                                </li>
                                                            </ul>
                                                            <ul className="m-0 ">
                                                                <li>
                                                                    <span>Postal Code:</span>
                                                                    <div>CA, USA</div>
                                                                </li>
                                                                <li>
                                                                    <span>Area Name:</span>
                                                                    <div>Los Angeles</div>
                                                                </li>
                                                            </ul>
                                                            </div>
                                                        
                                                    </div>
                                                    
                                                    
                                               
                                                    <div className="space30" />
                                               
                                              
                                                <div className="wrapp-card-details-propertie" id="contact">
                                                    <div className="bg-area">
                                                        <h3>Send Us A Message</h3>
                                                        <div className="space8" />
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <div className="input-area">
                                                                    <input type="text" placeholder="Your Name" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="input-area">
                                                                    <input type="text" placeholder="Last Name*" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="input-area">
                                                                    <input type="number" placeholder="Phone Number " />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="input-area">
                                                                    <input type="email" placeholder="Email Address*" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="input-area">
                                                                    <textarea placeholder="Write message" defaultValue={""} />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="space16" />
                                                                <div className="input-area">
                                                                    <button type="submit" className="vl-btn1">
                                                                        Reply Now
                                                                        <span className="arrow1 ms-2">
                                                                            <i className="fa-solid fa-arrow-right" />
                                                                        </span>
                                                                        <span className="arrow2 ms-2">
                                                                            <i className="fa-solid fa-arrow-right" />
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                       
                                                
                                        </div>    
                                            
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== PROPERTY AREA ENDS =======*/}
        </> 
    );
}
