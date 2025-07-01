"use client";

import { useEffect, useState } from 'react';
import PropertyFilter from './property-filter';

interface Category {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

interface PropertyFilterWrapperProps {
    categories: Category[];
}

export default function PropertyFilterWrapper({ categories }: PropertyFilterWrapperProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Renderizar un skeleton idéntico al componente real para evitar diferencias de hidratación
    if (!isClient) {
        return (
            <div className="sidebar1-area">
                <div className="tab-content" id="pills-tabContent">
                    <form>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="input-area filter-group mb-0">
                                    <input 
                                        className="mb-0" 
                                        type="text" 
                                        placeholder="Types keyword" 
                                        value=""
                                        readOnly
                                        style={{ opacity: 0.6 }}
                                    />
                                </div>

                                <div className="input-area filter-group">
                                    <select 
                                        name="propertyType" 
                                        className="nice-select" 
                                        value=""
                                        style={{ opacity: 0.6 }}
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
                                        value=""
                                        style={{ opacity: 0.6 }}
                                    >
                                        <option value="">All Status</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="amenities-section mt-4">
                            <h5>Amenities</h5>
                            <div className="space12" />
                            <div className="d-flex flex-wrap gap-3">
                                <div style={{ opacity: 0.6, fontSize: '14px' }}>
                                    Loading amenities...
                                </div>
                            </div>
                        </div>

                        <div className="space32" />
                        <button 
                            type="submit" 
                            className="vl-btn1" 
                            style={{ opacity: 0.6 }}
                        >
                            Search Property
                            <span className="arrow1 ms-2">
                                <i className="fa-solid fa-arrow-right" />
                            </span>
                            <span className="arrow2 ms-2">
                                <i className="fa-solid fa-arrow-right" />
                            </span>
                        </button>
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <a href="/sidebar-grid" className="text-decoration-none text-primary">
                                Show all properties
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return <PropertyFilter categories={categories} />;
} 