import Link from "next/link";
import { getHomeInfo } from "@/services/get-home-info";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const About2 = async () => {

    const {data} = await getHomeInfo();
    const {abouttitle} = data;
    const {about_title} = abouttitle;
    const {Title} = about_title;
    const {Sub_title} = about_title;
    const {Description} = about_title;
    const {img_1} = about_title;
    const {img_2} = about_title;
  
   
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
                                <h2 className="text-anime-style-3">{Title}</h2>
                                <h3>{Sub_title}</h3>
                                <div className="space50" />
                                <div className="img1 image-anime reveal">
                                    <img src={img_1} alt="housa" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="space30 d-lg-none d-block" />
                            <div className="img2 image-anime reveal">
                                <img src={img_2} alt="housa" />
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
                                    <BlocksRenderer content={Description} />
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