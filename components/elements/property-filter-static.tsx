"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useTranslation } from "@/utils/i18n-simple";
import styles from './property-filter-static.module.css';
import LocationMultiSelect from './LocationMultiSelect';
import CategoryMultiSelect from './CategoryMultiSelect';
import PropertyStatusMultiSelect from './PropertyStatusMultiSelect';
import AmenitiesMultiSelect from './AmenitiesMultiSelect';

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

interface Amenity {
    id: number;
    documentId: string;
    Name: string;
    slug: string;
}

interface Location {
    id: number;
    documentId: string;
    name: string;
    slug: string;
}

interface PropertyFilterStaticProps {
    categories: Category[];
    propertyStatuses?: PropertyStatus[];
    amenities?: Amenity[];
    locations?: Location[];
}

interface CustomDropdownProps {
    value: string;
    options: { value: string; label: string }[];
    placeholder: string;
    onChange: (value: string) => void;
    name: string;
    id?: string;
}

function CustomDropdown({ value, options, placeholder, onChange, name, id }: CustomDropdownProps) {
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
                id={id}
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

export default function PropertyFilterStatic({ categories, propertyStatuses = [], amenities = [], locations = [] }: PropertyFilterStaticProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const lang = params.lang as string;
    const { t } = useTranslation('common');
    
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '');
    const [bathrooms, setBathrooms] = useState(searchParams.get('bathrooms') || '');
    const [minPrice, setMinPrice] = useState(searchParams.get('min_price') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') || '');
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    
    // Ref para manejar el timeout del keyword search
    const keywordTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const locationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // Parse location parameter from URL on component mount
    useEffect(() => {
        const locationParam = searchParams.get('location');
        if (locationParam) {
            // Handle both single location and comma-separated multiple locations
            const locationsFromUrl = locationParam.split(',').map(loc => loc.trim()).filter(Boolean);
            setSelectedLocations(locationsFromUrl);
        }
    }, [searchParams]);

    // Parse category parameter from URL on component mount
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            const categoriesFromUrl = categoryParam.split(',').map(cat => cat.trim()).filter(Boolean);
            setSelectedCategories(categoriesFromUrl);
        }
    }, [searchParams]);

    // Parse property_status parameter from URL on component mount
    useEffect(() => {
        const statusParam = searchParams.get('property_status');
        if (statusParam) {
            const statusesFromUrl = statusParam.split(',').map(status => status.trim()).filter(Boolean);
            setSelectedStatuses(statusesFromUrl);
        }
    }, [searchParams]);

    // Parse amenities parameter from URL on component mount
    useEffect(() => {
        const amenitiesParam = searchParams.get('amenities');
        if (amenitiesParam) {
            const amenitiesFromUrl = amenitiesParam.split(',').map(amenity => amenity.trim()).filter(Boolean);
            setSelectedAmenities(amenitiesFromUrl);
        }
    }, [searchParams]);

    // Cleanup del timeout al desmontar el componente
    useEffect(() => {
        return () => {
            if (keywordTimeoutRef.current) {
                clearTimeout(keywordTimeoutRef.current);
            }
            if (locationTimeoutRef.current) {
                clearTimeout(locationTimeoutRef.current);
            }
        };
    }, []);
    
    const categoryOptions = [
        { value: '', label: t('home.title-filter-2') || 'All Types' },
        ...categories.map(cat => ({ value: cat.slug, label: cat.name }))
    ];
    
    const statusOptions = [
        { value: '', label: t('home.title-filter-1') || 'All Status' },
        ...propertyStatuses.map(status => ({ value: status.Title, label: status.Title }))
    ];

    const amenitiesOptions = [
        { value: '', label: t('home.amenities-filter') || 'All Amenities' },
        ...amenities.map(amenity => ({ value: amenity.Name, label: amenity.Name }))
    ];

    // Debug log para verificar que las amenities se están cargando
    console.log('=== PropertyFilterStatic Amenities Debug ===');
    console.log('Amenities received:', amenities);
    console.log('Amenities options:', amenitiesOptions);

    const bedroomOptions = [
        { value: '', label: t('home.bedrooms-filter') || 'Bedrooms' },
        { value: '1', label: 'Min 1' },
        { value: '2', label: 'Min 2' },
        { value: '3', label: 'Min 3' },
        { value: '4', label: 'Min 4' },
        
    ];

    const bathroomOptions = [
        { value: '', label: t('home.bathrooms-filter') || 'Bathrooms' },
        { value: '1', label: 'Min 1' },
        { value: '2', label: 'Min 2' },
        { value: '3', label: 'Min 3' },
      
    ];

    const minPriceOptions = [
        { value: '', label: t('home.min-price-filter') || 'Min Price' },
        { value: '100000', label: '€100.000' },
        { value: '150000', label: '€150.000' },
        { value: '200000', label: '€200.000' },
        { value: '250000', label: '€250.000' },
        { value: '300000', label: '€300.000' },
        { value: '400000', label: '€400.000' },
        { value: '500000', label: '€500.000' },
        { value: '750000', label: '€750.000' },
        { value: '1000000', label: '€1,000.000' },
        { value: '1500000', label: '€1,500.000' },
        { value: '2000000', label: '€2,000.000' },
    ];

    const maxPriceOptions = [
        { value: '', label: t('home.max-price-filter') || 'Max Price' },
        
        { value: '150000', label: '€150.000' },
        { value: '200000', label: '€200.000' },
        { value: '250000', label: '€250.000' },
        { value: '300000', label: '€300.000' },
        { value: '400000', label: '€400.000' },
        { value: '500000', label: '€500.000' },
        { value: '750000', label: '€750.000' },
        { value: '1000000', label: '€1,000.000' },
        { value: '1500000', label: '€1,500.000' },
        { value: '2000000', label: '€2,000.000' },
        { value: '5000000', label: '€5,000.000' },
        { value: '10000000', label: '€10,000.000' },
    ];
    
    // Función para actualizar la URL y aplicar filtros
    const updateFilters = (newFilters: {
        keyword?: string;
        locations?: string[];
        categories?: string[];
        statuses?: string[];
        amenities?: string[];
        bedrooms?: string;
        bathrooms?: string;
        minPrice?: string;
        maxPrice?: string;
    }) => {
        const params = new URLSearchParams();
        
        const finalKeyword = newFilters.keyword !== undefined ? newFilters.keyword : keyword;
        const finalLocations = newFilters.locations !== undefined ? newFilters.locations : selectedLocations;
        const finalCategories = newFilters.categories !== undefined ? newFilters.categories : selectedCategories;
        const finalStatuses = newFilters.statuses !== undefined ? newFilters.statuses : selectedStatuses;
        const finalAmenities = newFilters.amenities !== undefined ? newFilters.amenities : selectedAmenities;
        const finalBedrooms = newFilters.bedrooms !== undefined ? newFilters.bedrooms : bedrooms;
        const finalBathrooms = newFilters.bathrooms !== undefined ? newFilters.bathrooms : bathrooms;
        const finalMinPrice = newFilters.minPrice !== undefined ? newFilters.minPrice : minPrice;
        const finalMaxPrice = newFilters.maxPrice !== undefined ? newFilters.maxPrice : maxPrice;
        
        if (finalKeyword.trim()) params.set('keyword', finalKeyword.trim());
        if (finalLocations.length > 0) params.set('location', finalLocations.join(','));
        if (finalCategories.length > 0) params.set('category', finalCategories.join(','));
        if (finalStatuses.length > 0) params.set('property_status', finalStatuses.join(','));
        if (finalAmenities.length > 0) params.set('amenities', finalAmenities.join(','));
        if (finalBedrooms) params.set('bedrooms', finalBedrooms);
        if (finalBathrooms) params.set('bathrooms', finalBathrooms);
        if (finalMinPrice) params.set('min_price', finalMinPrice);
        if (finalMaxPrice) params.set('max_price', finalMaxPrice);
        
        const queryString = params.toString();
        const newUrl = `/${lang}/properties${queryString ? `?${queryString}` : ''}`;
        
        router.push(newUrl);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters({});
    };
    
    const handleReset = () => {
        setKeyword('');
        setSelectedLocations([]);
        setSelectedCategories([]);
        setSelectedStatuses([]);
        setSelectedAmenities([]);
        setBedrooms('');
        setBathrooms('');
        setMinPrice('');
        setMaxPrice('');
        router.push(`/${lang}/properties`);
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
            updateFilters({ keyword: value });
        }, 500);
    };

    const handleLocationsChange = (locations: string[]) => {
        setSelectedLocations(locations);
        
        // Limpiar timeout anterior si existe
        if (locationTimeoutRef.current) {
            clearTimeout(locationTimeoutRef.current);
        }
        
        // Aplicar filtro automáticamente después de 300ms de inactividad
        locationTimeoutRef.current = setTimeout(() => {
            updateFilters({ locations });
        }, 300);
    };
    
    const handleCategoriesChange = (categories: string[]) => {
        setSelectedCategories(categories);
        updateFilters({ categories });
    };
    
    const handleStatusesChange = (statuses: string[]) => {
        setSelectedStatuses(statuses);
        updateFilters({ statuses });
    };

    const handleAmenitiesChange = (amenities: string[]) => {
        setSelectedAmenities(amenities);
        updateFilters({ amenities });
    };

    const handleBedroomsChange = (value: string) => {
        setBedrooms(value);
        updateFilters({ bedrooms: value });
    };

    const handleBathroomsChange = (value: string) => {
        setBathrooms(value);
        updateFilters({ bathrooms: value });
    };

    const handleMinPriceChange = (value: string) => {
        setMinPrice(value);
        updateFilters({ minPrice: value });
    };

    const handleMaxPriceChange = (value: string) => {
        setMaxPrice(value);
        updateFilters({ maxPrice: value });
    };
    
    return (
        <>
            <style jsx>{`
                .filter-label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #1B1B1B;
                    line-height: 1.2;
                }

                .filter-label:hover {
                    color: var(--ztc-bg-bg-3);
                }

                .input-area.filter-group {
                    margin-bottom: 16px;
                }

                .input-area.filter-group input,
                .input-area.filter-group .customDropdown {
                    margin-top: 4px;
                }
            `}</style>
            <div className="sidebar1-area">
                <div className="tab-content" id="pills-tabContent">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-12">
                                

                                {/* Location multi-select */}
                                <div className="input-area filter-group mb-3" style={{ position: 'relative' }}>
                                    <label htmlFor="location-multi-select" className="filter-label">
                                        {t('home.location-filter') || 'Location'}
                                    </label>
                                    <LocationMultiSelect
                                        id="location-multi-select"
                                        locations={locations}
                                        selectedLocations={selectedLocations}
                                        onChange={handleLocationsChange}
                                        placeholder={t('home.location-filter') || "Select locations"}
                                        name="location"
                                    />
                                </div>

                                {/* Category multi-select */}
                                <div className="input-area filter-group mb-3" style={{ position: 'relative' }}>
                                    <label htmlFor="category-multi-select" className="filter-label">
                                        {t('home.title-filter-2') || 'Property Type'}
                                    </label>
                                    <CategoryMultiSelect
                                        id="category-multi-select"
                                        categories={categories}
                                        selectedCategories={selectedCategories}
                                        onChange={handleCategoriesChange}
                                        placeholder={t('home.title-filter-2') || "Select property types"}
                                        name="category"
                                    />
                                </div>

                                {/* Status multi-select */}
                                <div className="input-area filter-group mb-3" style={{ position: 'relative' }}>
                                    <label htmlFor="status-multi-select" className="filter-label">
                                        {t('home.title-filter-1') || 'Property Status'}
                                    </label>
                                    <PropertyStatusMultiSelect
                                        id="status-multi-select"
                                        propertyStatuses={propertyStatuses}
                                        selectedStatuses={selectedStatuses}
                                        onChange={handleStatusesChange}
                                        placeholder={t('home.title-filter-1') || "Select property status"}
                                        name="property_status"
                                    />
                                </div>

                                {/* Amenities multi-select */}
                                <div className="input-area filter-group mb-3" style={{ position: 'relative' }}>
                                    <label htmlFor="amenities-multi-select" className="filter-label">
                                        {t('home.amenities-filter') || 'Amenities'}
                                    </label>
                                    <AmenitiesMultiSelect
                                        id="amenities-multi-select"
                                        amenities={amenities}
                                        selectedAmenities={selectedAmenities}
                                        onChange={handleAmenitiesChange}
                                        placeholder={t('home.amenities-filter') || "Select amenities"}
                                        name="amenities"
                                    />
                                </div>

                                {/* Bedrooms dropdown */}
                                <div className="input-area filter-group mb-3">
                                    <label htmlFor="bedrooms-dropdown" className="filter-label">
                                        {t('home.bedrooms-filter') || 'Bedrooms'}
                                    </label>
                                    <CustomDropdown
                                        id="bedrooms-dropdown"
                                        value={bedrooms}
                                        options={bedroomOptions}
                                        placeholder={t('home.bedrooms-filter') || "Bedrooms"}
                                        onChange={handleBedroomsChange}
                                        name="bedrooms"
                                    />
                                </div>

                                {/* Bathrooms dropdown - hidden on mobile unless showMoreFilters is true */}
                                <div className={`input-area filter-group mb-3 ${!showMoreFilters ? 'd-none d-lg-block' : ''}`}>
                                    <label htmlFor="bathrooms-dropdown" className="filter-label">
                                        {t('home.bathrooms-filter') || 'Bathrooms'}
                                    </label>
                                    <CustomDropdown
                                        id="bathrooms-dropdown"
                                        value={bathrooms}
                                        options={bathroomOptions}
                                        placeholder={t('home.bathrooms-filter') || "Bathrooms"}
                                        onChange={handleBathroomsChange}
                                        name="bathrooms"
                                    />
                                </div>

                                {/* Min Price dropdown - hidden on mobile unless showMoreFilters is true */}
                                <div className={`input-area filter-group mb-3 ${!showMoreFilters ? 'd-none d-lg-block' : ''}`}>
                                    <label htmlFor="min-price-dropdown" className="filter-label">
                                        {t('home.min-price-filter') || 'Min Price'}
                                    </label>
                                    <CustomDropdown
                                        id="min-price-dropdown"
                                        value={minPrice}
                                        options={minPriceOptions}
                                        placeholder={t('home.min-price-filter') || "Min Price"}
                                        onChange={handleMinPriceChange}
                                        name="min_price"
                                    />
                                </div>

                                {/* Max Price dropdown - hidden on mobile unless showMoreFilters is true */}
                                <div className={`input-area filter-group mb-3 ${!showMoreFilters ? 'd-none d-lg-block' : ''}`}>
                                    <label htmlFor="max-price-dropdown" className="filter-label">
                                        {t('home.max-price-filter') || 'Max Price'}
                                    </label>
                                    <CustomDropdown
                                        id="max-price-dropdown"
                                        value={maxPrice}
                                        options={maxPriceOptions}
                                        placeholder={t('home.max-price-filter') || "Max Price"}
                                        onChange={handleMaxPriceChange}
                                        name="max_price"
                                    />
                                </div>

                                {/* Show More/Less button for mobile */}
                                <div className="d-lg-none mb-3">
                                    <button 
                                        type="button"
                                        className="btn-show-more"
                                        onClick={() => setShowMoreFilters(!showMoreFilters)}
                                    >
                                        {showMoreFilters ? t('home.show-less') || 'Show Less' : t('home.show-more') || 'Show More'}
                                        <i className={`fa-solid fa-chevron-${showMoreFilters ? 'up' : 'down'} ms-2`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space32" />
                        <button type="submit" className="vl-btn1">
                            {t('home.btn-filter') || 'Search Property'}
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
        </>
    );
} 