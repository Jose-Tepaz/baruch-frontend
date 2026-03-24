"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";
import { useState, useEffect } from "react";
import LocationMultiSelect from "@/components/elements/LocationMultiSelect";
import CategoryMultiSelect from "@/components/elements/CategoryMultiSelect";
import PropertyStatusMultiSelect from "@/components/elements/PropertyStatusMultiSelect";
import AmenitiesMultiSelect from "@/components/elements/AmenitiesMultiSelect";
import SingleSelect from "@/components/elements/SingleSelect";

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

interface SearchBoxProps {
    categories?: Category[];
    propertyStatuses?: PropertyStatus[];
    amenities?: Amenity[];
    locations?: Location[];
}

// Categorías de fallback en caso de que no se pasen props
const fallbackCategories: Category[] = [
    { name: "Houses", slug: "houses", description: "Single family houses" },
    { name: "Apartments", slug: "apartments", description: "Apartment units" },
    { name: "Condos", slug: "condos", description: "Condominiums" },
    { name: "Villas", slug: "villas", description: "Luxury villas" },
    { name: "Townhouses", slug: "townhouses", description: "Townhouses" },
    { name: "Penthouses", slug: "penthouses", description: "Luxury penthouses" },
    { name: "Lofts", slug: "lofts", description: "Industrial lofts" },
    { name: "Cottages", slug: "cottages", description: "Cozy cottages" },
];

export default function SearchBox({ categories = fallbackCategories, propertyStatuses = [], amenities = [], locations = [] }: SearchBoxProps) {
    const router = useRouter();
    const params = useParams();
    const { t, i18n } = useTranslation('common');
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    
    // Detectar el idioma actual - si no hay params.lang, estamos en la raíz (inglés)
    const lang = (params.lang as string) || 'en';
    
    // Estados para filtros multi-select
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    // Estados para filtros single-select
    const [selectedBedrooms, setSelectedBedrooms] = useState('');
    const [selectedBathrooms, setSelectedBathrooms] = useState('');
    const [selectedMinPrice, setSelectedMinPrice] = useState('');
    const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
    // Handle form submission
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        // Get search criteria from form and states
        const searchCriteria = {
            keyword: formData.get("keyword") as string,
            bedrooms: selectedBedrooms,
            bathrooms: selectedBathrooms,
            min_price: selectedMinPrice,
            max_price: selectedMaxPrice,
        };

        // Build query string
        const params = new URLSearchParams();

        // Add non-empty parameters to URL
        Object.entries(searchCriteria).forEach(([key, value]) => {
            if (value && value.trim() !== '') {
                params.append(key, value);
            }
        });

        // Add multi-select parameters
        if (selectedLocations.length > 0) {
            selectedLocations.forEach(location => {
                params.append('location', location);
            });
        }
        if (selectedCategories.length > 0) {
            selectedCategories.forEach(category => {
                params.append('category', category);
            });
        }
        if (selectedStatuses.length > 0) {
            selectedStatuses.forEach(status => {
                params.append('property_status', status);
            });
        }
        if (selectedAmenities.length > 0) {
            selectedAmenities.forEach(amenity => {
                params.append('amenities', amenity);
            });
        }

        // Construir URL correctamente - sin prefijo para inglés, con prefijo para otros idiomas
        const finalUrl = lang === 'en' 
            ? `/properties?${params.toString()}`
            : `/${lang}/properties?${params.toString()}`;
        // Navigate to properties page with query parameters
        router.push(finalUrl);
    };

    return (
        <>
            <style jsx>{`
                
                /* Estilos para componentes multi-select */
                .filter-group .location-multi-select,
                .filter-group .category-multi-select,
                .filter-group .property-status-multi-select,
                .filter-group .amenities-multi-select {
                    width: 100%;
                    position: relative;
                }

                .filter-group .location-dropdown-button,
                .filter-group .category-dropdown-button,
                .filter-group .property-status-dropdown-button,
                .filter-group .amenities-dropdown-button {
                    width: 100%;
                    height: 48px;
                    padding: 0 16px;
                    border: 1px solid #E7E7E7;
                    border-radius: 8px;
                    background-color: #fff;
                    font-size: 14px;
                    color: #1B1B1B;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    text-align: left;
                }

                .filter-group .location-dropdown-button:hover,
                .filter-group .category-dropdown-button:hover,
                .filter-group .property-status-dropdown-button:hover,
                .filter-group .amenities-dropdown-button:hover {
                    border-color: #D1D1D1;
                }

                .filter-group .location-dropdown-menu,
                .filter-group .category-dropdown-menu,
                .filter-group .property-status-dropdown-menu,
                .filter-group .amenities-dropdown-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: #fff;
                    border: 1px solid #E7E7E7;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                    max-height: 300px;
                    overflow-y: auto;
                    margin-top: 4px;
                }

                .filter-group {
                    margin-bottom: 16px;
                }

                .filter-group input {
                    width: 100%;
                  
                }

                .filter-group input[type="text"] {
                    width: 100%;
                    height: 52px;
                    padding: 0 16px;
                    border-radius: 80px;
                    border: 1px solid #E7E7E7;
                    background-color: #fff;
                    font-size: 14px;
                    color: #1B1B1B;
                    transition: all 0.3s ease;
                }

                .filter-group input[type="text"]::placeholder {
                    color: #888;
                    font-size: 14px;
                }

                .filter-group input[type="text"]:hover {
                    border-color: #D1D1D1;
                }

                .filter-group input[type="text"]:focus {
                    outline: none;
                    border-color: var(--ztc-bg-bg-3);
                    box-shadow: 0 0 0 1px var(--ztc-bg-bg-3);
                }

                .api-error-notice {
                    background-color: #fff3cd;
                    border: 1px solid #ffeaa7;
                    color: #856404;
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    margin-bottom: 10px;
                }

                .search-button button {
                    background: var(--ztc-bg-bg-3);
                    border: 0;
                    color: white;
                    padding: 12px 32px;
                    border-radius: 80px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .search-button button:hover {
                    background: #2980b9;
                    transform: translateY(-2px);
                }

                /* Estilos para el nuevo layout */
                .location-input {
                    width: 100%;
                    height: 52px;
                    padding: 0 16px;
                    border-radius: 80px;
                    border: 1px solid #1b1b1b;
                    background-color: #fff;
                    font-size: 14px;
                    color: #1B1B1B;
                    transition: all 0.3s ease;
                }

                .location-input::placeholder {
                    color: #888;
                    font-size: 14px;
                }

                .location-input:hover {
                    border-color: #D1D1D1;
                }

                .location-input:focus {
                    outline: none;
                    border-color: var(--ztc-bg-bg-3);
                    box-shadow: 0 0 0 1px var(--ztc-bg-bg-3);
                }

                /* Responsive adjustments */
                @media (max-width: 991px) {
                    .filter-group {
                        flex: 1 1 calc(50% - 8px);
                        min-width: 150px;
                    }
                    
                    .search-button {
                        flex: 1 1 100%;
                        margin-top: 8px;
                    }
                    
                    .search-button button {
                        width: 100%;
                        justify-content: center;
                    }
                }

                @media (max-width: 767px) {
                    .filter-group {
                        flex: 1 1 100%;
                    }
                    
                    .search-button {
                        order: 1;
                    }
                    
                    .d-flex.align-items-center {
                        order: 2;
                        justify-content: center;
                        margin-top: 8px;
                    }
                }
            `}</style>
            <div className="section-search-box">
                <div className="padding-global padding-section-medium">
                    <div className="container-large">
                        <div className="others-section-area-filters ">

                            <div className="property-tab-section ">
                                <form onSubmit={handleSearch} noValidate>
                                    <div className="">
                                        <div className=" mb-4 is-center">
                                            <h3 className="text-align-center size-32">{t('home.title-filter')}</h3>
                                        </div>



                                        {/* Primera fila: Location, categoría y estatus multi-select */}
                                        <div className="filters z-1 position-relative mb-3">
                                            <div className="grid-filters-properties">
                                                <div className="filter-group flex-grow-1">
                                                   
                                                    <LocationMultiSelect
                                                        locations={locations}
                                                        selectedLocations={selectedLocations}
                                                        onChange={setSelectedLocations}
                                                        placeholder={t('home.location-filter') || t('home.location-filter')}
                                                        name="location"
                                                    />
                                                </div>
                                                <div className="filter-group">
                                                    <CategoryMultiSelect
                                                        categories={categories}
                                                        selectedCategories={selectedCategories}
                                                        onChange={setSelectedCategories}
                                                        placeholder={t('home.title-filter-2') || t('home.title-filter-2')}
                                                        name="category"
                                                    />
                                                </div>
                                                <div className="filter-group">
                                                    <PropertyStatusMultiSelect
                                                        propertyStatuses={propertyStatuses}
                                                        selectedStatuses={selectedStatuses}
                                                        onChange={setSelectedStatuses}
                                                        placeholder={t('home.title-filter-1') || "Select property status"}
                                                        name="property_status"
                                                    />
                                                </div>
                                         

                                       

                                                {/* Filtros siempre visibles en mobile */}
                                                <div className="filter-group">
                                                    <SingleSelect
                                                        name="bedrooms"
                                                        value={selectedBedrooms}
                                                        onChange={setSelectedBedrooms}
                                                        placeholder={t('home.bedrooms-filter') || 'Bedrooms'}
                                                        options={[
                                                            { value: '1', label: 'Min 1' },
                                                            { value: '2', label: 'Min 2' },
                                                            { value: '3', label: 'Min 3' },
                                                            { value: '4', label: 'Min 4' },
                                                        ]}
                                                    />
                                                </div>

                                                {/* Filtros ocultos en mobile */}
                                                <div className={`filter-group ${!showMoreFilters ? 'd-none d-lg-block' : ''}`}>
                                                    <SingleSelect
                                                        name="bathrooms"
                                                        value={selectedBathrooms}
                                                        onChange={setSelectedBathrooms}
                                                        placeholder={t('home.bathrooms-filter') || 'Bathrooms'}
                                                        options={[
                                                            { value: '1', label: 'Min 1' },
                                                            { value: '2', label: 'Min 2' },
                                                            { value: '3', label: 'Min 3' },
                                                        ]}
                                                    />
                                                </div>

                                                <div className={`filter-group ${!showMoreFilters ? 'd-none d-lg-block' : ''}`}>
                                                    <SingleSelect
                                                        name="min_price"
                                                        value={selectedMinPrice}
                                                        onChange={setSelectedMinPrice}
                                                        placeholder={t('home.min-price-filter') || 'Min Price'}
                                                        options={[
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
                                                        ]}
                                                    />
                                                </div>

                                                <div className={`filter-group ${!showMoreFilters ? 'd-none d-lg-block' : ''}`}>
                                                    <SingleSelect
                                                        name="max_price"
                                                        value={selectedMaxPrice}
                                                        onChange={setSelectedMaxPrice}
                                                        placeholder={t('home.max-price-filter') || 'Max Price'}
                                                        options={[
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
                                                        ]}
                                                    />
                                                </div>

                                                <div className={`filter-group ${!showMoreFilters ? 'd-none d-lg-block' : ''}`}>
                                                    <AmenitiesMultiSelect
                                                        amenities={amenities}
                                                        selectedAmenities={selectedAmenities}
                                                        onChange={setSelectedAmenities}
                                                        placeholder={t('home.amenities-filter') || "Select amenities"}
                                                        name="amenities"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Botón Show More/Less para mobile */}
                                        <div className="filters pt-2 d-lg-none">
                                            <div className="d-flex justify-content-center w-100">
                                                <button
                                                    type="button"
                                                    className="btn-show-more"
                                                    onClick={() => setShowMoreFilters(!showMoreFilters)}
                                                >
                                                    {showMoreFilters ? t('home.show-less') : t('home.show-more')}
                                                    <i className={`fa-solid fa-chevron-${showMoreFilters ? 'up' : 'down'} ms-2`} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Tercera fila: Botones de acción */}
                                        <div className="btns-actions-filters">

                                            
                                                <button type="submit" className="vl-btn1 mt-auto mb-auto mobile-mr-auto mobile-ml-0">
                                                    {t('home.btn-filter')}
                                                    <span className="arrow1 ms-2">
                                                        <i className="fa-solid fa-arrow-right" />
                                                    </span>
                                                    <span className="arrow2 ms-2">
                                                    <i className="fa-solid fa-arrow-right" />
                                                </span>



                                                </button>

                                                

                                            

                                           

                                            <div className="d-flex align-items-center">
                                                <Link href={`/${lang}/properties`} className="show-all-properties-filters">
                                                    {t('home.btn-all-properties')}
                                                </Link>



                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>




        </>
    );
}
