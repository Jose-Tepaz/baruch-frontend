import Link from "next/link";
import { getHomeInfo } from "@/services/get-home-info";

const Hero2 = async () => {
   const {data} = await getHomeInfo();
   const {Title} = data;
    return (
        <>
            {/*===== HERO AREA STARTS =======*/}
            <div
                className="hero2-section-area"
                style={{
                    backgroundImage: "url(assets/img/all-images/hero/hero-img2.png)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="hero-heading heading1">
                                <h1 className="text-anime-style-3">{Title}</h1>
                                <h2 className="text-anime-style-3 text-white">In costa del Sol Spain</h2>
                              <div className="d-flex justify-content-start align-items-center gap-4 mt-4">
                                <div className="">
                                
                                <Link href="/add-property" className="vl-btn1 mt-0">
                                        Add Listing
                                        <span className="arrow1 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                        <span className="arrow2 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                    </Link>
                                </div>
                                <div className="">
                                <Link href="/add-property" className="vl-btn1 is-secondary mt-0">
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
                    <div className="space100" />
                    <div className="space16" />
                    
                </div>
            </div>
            {/*===== HERO AREA ENDS =======*/}
        </>
    );
}

export default Hero2;
