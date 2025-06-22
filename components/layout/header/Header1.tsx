import Link from "next/link";

export default function Header1({ scroll, isMobileMenu, handleMobileMenu }: any) {
    return (
        <header className="homepage1-body">
            <div id="vl-header-sticky" className={`vl-header-area vl-transparent-header  ${scroll ? "header-sticky top-0 position-fixed w-100" : ""}`}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="vl-logo">
                                <Link href="/">
                                    <img src="/assets/img/logo/logo1.png" alt="housa" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-8 d-none d-lg-block">
                            <div className="vl-main-menu text-center">
                                <nav className="vl-mobile-menu-active">
                                    <ul>
                                        <li className="has-dropdown">
                                            <Link href="/">Home</Link>
                                          
                                        </li>
                                        <li>
                                            <Link href="/properties">Properties</Link>
                                        </li>
                                        <li className="has-dropdown">
                                            <Link href="#">
                                                Pages
                                                <span>
                                                    <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                                </span>
                                            </Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/about-us">About Us</Link>
                                                </li>
                                                <li>
                                                    <Link href="/our-service">Our Services</Link>
                                                </li>
                                                <li>
                                                    <Link href="/pricing">Pricing</Link>
                                                </li>
                                                <li>
                                                    <Link href="/contact">Contact Us</Link>
                                                </li>
                                                <li>
                                                    <Link href="/faq">FAQ's</Link>
                                                </li>
                                                <li>
                                                    <Link href="/privacy-policy">Privacy Policy</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                Listing
                                                <span>
                                                    <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                                </span>
                                            </Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/property-halfmap-grid">Property Half Grid</Link>
                                                </li>
                                                <li>
                                                    <Link href="/property-halfmap-list">Property Half Map List</Link>
                                                </li>
                                                <li>
                                                    <Link href="/topmap-grid">Property Top Map Grid</Link>
                                                </li>
                                                <li>
                                                    <Link href="/topmap-list">Property Top Map List</Link>
                                                </li>
                                                <li>
                                                    <Link href="/sidebar-grid">Find Sidebar Grid</Link>
                                                </li>
                                                <li>
                                                    <Link href="/sidebar-list">Find Sidebar List</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                Properties
                                                <span>
                                                    <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                                </span>
                                            </Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/property-details-v1">Property Details 01</Link>
                                                </li>
                                                <li>
                                                    <Link href="/property-details-v2">Property Details 02</Link>
                                                </li>
                                                <li>
                                                    <Link href="/property-details-v3">Property Details 03</Link>
                                                </li>
                                                <li>
                                                    <Link href="/property-details-v4">Property Details 04</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                Dashboard
                                                <span>
                                                    <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                                </span>
                                            </Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/dashboard">Dashboard</Link>
                                                </li>
                                                <li>
                                                    <Link href="/my-property">My Properties</Link>
                                                </li>
                                                <li>
                                                    <Link href="/message">Message</Link>
                                                </li>
                                                <li>
                                                    <Link href="/my-favorites">My Favourites</Link>
                                                </li>
                                                <li>
                                                    <Link href="/reviews">Reviews</Link>
                                                </li>
                                                <li>
                                                    <Link href="/my-profile">My Propfile</Link>
                                                </li>
                                                <li>
                                                    <Link href="/add-property">Add Property</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                Blogs
                                                <span>
                                                    <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                                </span>
                                            </Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/blog">Blog Default</Link>
                                                </li>
                                                <li>
                                                    <Link href="/blog-grid">Blog Grid</Link>
                                                </li>
                                                <li>
                                                    <Link href="/blog-detail">Blog Post Details</Link>
                                                </li>
                                                <li>
                                                    <Link href="/blog-detail-2">Blog Post Details 2</Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="vl-hero-btn d-none d-lg-block text-end">
                                <div className="btn-area1 mt-0">
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
                            </div>
                            <div className="vl-header-action-item d-block d-lg-none">
                                <button type="button" className="vl-offcanvas-toggle px-1">
                                    <i className="fa-solid fa-bars-staggered" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
