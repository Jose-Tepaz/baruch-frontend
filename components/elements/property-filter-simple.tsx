"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Category {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

interface PropertyFilterSimpleProps {
    categories: Category[];
}

export default function PropertyFilterSimple({ categories }: PropertyFilterSimpleProps) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [filters, setFilters] = useState({
        keyword: '',
        propertyType: '',
        status: ''
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!mounted) return;
        
        const formData = new FormData(e.currentTarget);
        const params = new URLSearchParams();
        
        const keyword = formData.get('keyword') as string;
        const propertyType = formData.get('propertyType') as string;
        const status = formData.get('status') as string;
        
        if (keyword) params.set('keyword', keyword);
        if (propertyType) params.set('category', propertyType);
        if (status) params.set('status', status);
        
        const queryString = params.toString();
        router.push(`/properties${queryString ? `?${queryString}` : ''}`);
    };

    const handleInputChange = (field: string, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="sidebar1-area">
            <div className="tab-content" id="pills-tabContent">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="input-area filter-group mb-0">
                                <input 
                                    className="mb-0" 
                                    type="text" 
                                    name="keyword"
                                    placeholder="Types keyword" 
                                    value={filters.keyword}
                                    onChange={(e) => handleInputChange('keyword', e.target.value)}
                                />
                            </div>

                            <div className="input-area filter-group">
                                <select 
                                    name="propertyType" 
                                    className="form-select"
                                    value={filters.propertyType}
                                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
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
                                    className="form-select"
                                    value={filters.status}
                                    onChange={(e) => handleInputChange('status', e.target.value)}
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