"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './property-filter-static.module.css';

interface Category {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

interface PropertyStatus {
    id: number;
    documentId: string;
    Title: string;
}

interface PropertyFilterStaticProps {
    categories: Category[];
    propertyStatuses?: PropertyStatus[];
}

interface CustomDropdownProps {
    value: string;
    options: { value: string; label: string }[];
    placeholder: string;
    onChange: (value: string) => void;
    name: string;
}

function CustomDropdown({ value, options, placeholder, onChange, name }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption ? selectedOption.label : placeholder;
    
    return (
        <div className={styles.customDropdown} ref={dropdownRef}>
            <button 
                type="button"
                className={`${styles.customDropdownButton} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={styles.dropdownText}>{displayValue}</span>
                <i className={`fa-solid fa-chevron-down ${styles.dropdownArrow} ${isOpen ? styles.rotated : ''}`}></i>
            </button>
            
            {isOpen && (
                <div className={styles.customDropdownMenu}>
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            className={`${styles.dropdownItem} ${value === option.value ? styles.selected : ''}`}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
            
            <input type="hidden" name={name} value={value} />
        </div>
    );
}

export default function PropertyFilterStatic({ categories, propertyStatuses = [] }: PropertyFilterStaticProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [selectedStatus, setSelectedStatus] = useState(searchParams.get('property_status') || '');
    
    // Ref para manejar el timeout del keyword search
    const keywordTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // Cleanup del timeout al desmontar el componente
    useEffect(() => {
        return () => {
            if (keywordTimeoutRef.current) {
                clearTimeout(keywordTimeoutRef.current);
            }
        };
    }, []);
    
    const categoryOptions = [
        { value: '', label: 'All Types' },
        ...categories.map(cat => ({ value: cat.slug, label: cat.name }))
    ];
    
    const statusOptions = [
        { value: '', label: 'All Status' },
        ...propertyStatuses.map(status => ({ value: status.Title, label: status.Title }))
    ];
    
    // Función para actualizar la URL y aplicar filtros
    const updateFilters = (newKeyword?: string, newCategory?: string, newStatus?: string) => {
        const params = new URLSearchParams();
        
        const finalKeyword = newKeyword !== undefined ? newKeyword : keyword;
        const finalCategory = newCategory !== undefined ? newCategory : selectedCategory;
        const finalStatus = newStatus !== undefined ? newStatus : selectedStatus;
        
        if (finalKeyword.trim()) params.set('keyword', finalKeyword.trim());
        if (finalCategory) params.set('category', finalCategory);
        if (finalStatus) params.set('property_status', finalStatus);
        
        const queryString = params.toString();
        const newUrl = `/properties${queryString ? `?${queryString}` : ''}`;
        
        console.log('=== Updating URL with filters ===');
        console.log('Keyword:', finalKeyword);
        console.log('Category:', finalCategory);
        console.log('Status:', finalStatus);
        console.log('Query string:', queryString);
        console.log('New URL:', newUrl);
        
        router.push(newUrl);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters();
    };
    
    const handleReset = () => {
        setKeyword('');
        setSelectedCategory('');
        setSelectedStatus('');
        router.push('/properties');
    };
    
    // Handlers para aplicar filtros inmediatamente
    const handleKeywordChange = (value: string) => {
        setKeyword(value);
        
        // Limpiar timeout anterior si existe
        if (keywordTimeoutRef.current) {
            clearTimeout(keywordTimeoutRef.current);
        }
        
        // Aplicar filtro automáticamente después de 500ms de inactividad
        keywordTimeoutRef.current = setTimeout(() => {
            updateFilters(value);
        }, 500);
    };
    
    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        updateFilters(undefined, value);
    };
    
    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
        updateFilters(undefined, undefined, value);
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
                                    value={keyword}
                                    onChange={(e) => handleKeywordChange(e.target.value)}
                                    placeholder="Types keyword" 
                                />
                            </div>

                            <div className="input-area filter-group">
                                <CustomDropdown
                                    value={selectedCategory}
                                    options={categoryOptions}
                                    placeholder="All Types"
                                    onChange={handleCategoryChange}
                                    name="category"
                                />
                            </div>

                            <div className="input-area filter-group">
                                <CustomDropdown
                                    value={selectedStatus}
                                    options={statusOptions}
                                    placeholder="All Status"
                                    onChange={handleStatusChange}
                                    name="property_status"
                                />
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
                        <button
                            type="button"
                            onClick={handleReset}
                            className={styles.resetButton}
                        >
                            <i className="fa-solid fa-rotate-left me-2"></i>
                            Reset filters
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 