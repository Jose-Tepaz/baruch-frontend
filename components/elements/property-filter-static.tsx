"use client";

import Link from 'next/link';

interface Category {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

interface PropertyFilterStaticProps {
    categories: Category[];
}

export default function PropertyFilterStatic({ categories }: PropertyFilterStaticProps) {
    return (
        <div className="sidebar1-area">
            <div className="tab-content" id="pills-tabContent">
                <form method="GET" action="/properties">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="input-area filter-group mb-0">
                                <input 
                                    className="mb-0" 
                                    type="text" 
                                    name="keyword"
                                    placeholder="Types keyword" 
                                    defaultValue=""
                                />
                            </div>

                            <div className="input-area filter-group">
                                <select 
                                    name="category" 
                                    className="nice-select"
                                    defaultValue=""
                                >
                                    <option value="">All Types</option>
                                    {categories.map((category) => (
                                        <option key={category.slug} value={category.slug}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-area filter-group">
                                <select 
                                    name="status" 
                                    className="nice-select"
                                    defaultValue=""
                                >
                                    <option value="">All Status</option>
                                    <option value="sale">For Sale</option>
                                    <option value="rent">For Rent</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space32" />
                    <button type="submit" className="vl-btn1">
                        Search Property
                        <span className="arrow1 ms-2">
                            <i className="fa-solid fa-arrow-right" />
                        </span>
                        <span className="arrow2 ms-2">
                            <i className="fa-solid fa-arrow-right" />
                        </span>
                    </button>
                    
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <Link href="/properties" className="text-decoration-none text-primary">
                            Show all properties
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
} 