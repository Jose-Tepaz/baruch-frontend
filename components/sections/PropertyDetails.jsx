

    export default function PropertyDetails({ property }) {
    console.log(property);
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="property-details-area">
                            <div className="property-details-content">
                               
                                <h1>{property.title}</h1>
                                
                                <p>{property.price}</p>
                                <p>{property.address}</p>
                                <p>{property.bedrooms}</p>
                                <p>{property.bathrooms}</p>
                                <p>{property.parking_spaces}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
}

