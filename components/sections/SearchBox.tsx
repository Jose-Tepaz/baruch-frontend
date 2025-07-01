"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "@/services/categories";

interface Category {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

interface Property {
    id: number;
    keyword: string;
    status: string;
    type: string;
    city: string;
    state: string;
    amenities: string[];
    // ... other properties
}


// Categorías de fallback en caso de que la API no esté disponible
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



export default function SearchBox() {
    const router = useRouter();
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [categories, setCategories] = useState<Category[]>(fallbackCategories);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [apiError, setApiError] = useState(false);

    // Cargar categorías desde la API
    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoadingCategories(true);
                setApiError(false);
                const categoriesData = await getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error cargando categorías:', error);
                setApiError(true);
                // Usar categorías de fallback
                setCategories(fallbackCategories);
            } finally {
                setLoadingCategories(false);
            }
        };

        loadCategories();
    }, []);

    // Handle amenity selection
    const handleAmenityChange = (amenity: string) => {
        setSelectedAmenities(prev => {
            if (prev.includes(amenity)) {
                return prev.filter(item => item !== amenity);
            } else {
                return [...prev, amenity];
            }
        });
    };

    // Get unique amenities from property data (usando datos estáticos por ahora)
    const amenities = [
        "Air Conditioning", "Parking", "Swimming Pool", "Garden", "Wifi", 
        "Elevator", "Intercom", "Furnishing", "Cable TV", "Balcony", 
        "Pet Friendly", "Fireplace", "Heating", "Garage", "Disabled Access", 
        "Gym", "Sauna", "Outdoor Shower", "Barbeque", "Lawn"
    ].sort();

    // Handle form submission
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        // Get search criteria
        const searchCriteria = {
            keyword: formData.get("keyword") as string,
            status: formData.get("status") as string,
            category: formData.get("propertyType") as string, // Cambiado de propertyType a category
            city: formData.get("city") as string,
            state: formData.get("state") as string,
            amenities: selectedAmenities
        };

        // Build query string
        const params = new URLSearchParams();

        // Add non-empty parameters to URL
        Object.entries(searchCriteria).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                // Handle array values (amenities)
                value.forEach(item => {
                    if (item) params.append(key, item);
                });
            } else {
                // Handle single values
                if (value) params.append(key, value);
            }
        });

        // Navigate to properties page with query parameters
        router.push(`/properties?${params.toString()}`);
    };

    return (
        <>
            <style jsx>{`
                .filter-group select {
                    width: 100%;
                    height: 48px;
                    padding: 0 16px;
                    border: 1px solid #E7E7E7;
                    border-radius: 8px;
                    background-color: #fff;
                    font-size: 14px;
                    color: #1B1B1B;
                    cursor: pointer;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%231B1B1B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 16px center;
                }

                .filter-group select:hover {
                    border-color: #D1D1D1;
                }

                .filter-group select:focus {
                    outline: none;
                    border-color: #1B1B1B;
                }

                .filter-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #1B1B1B;
                }

                .filter-group {
                    margin-bottom: 16px;
                }

                .filter-group select option {
                    padding: 8px 16px;
                    font-size: 14px;
                }

                .filter-group select option:checked {
                    background-color: #F5F5F5;
                }

                .filter-group input {
                    width: 100%;
                    min-width: 248px;
                }

                .amenities-container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                    max-height: 200px;
                    overflow-y: auto;
                    padding: 10px;
                    border: 1px solid #E7E7E7;
                    border-radius: 8px;
                    background-color: #fff;
                }

                .amenity-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                }

                .amenity-item:hover {
                    background-color: #F5F5F5;
                    border-radius: 4px;
                }

                .amenity-item input[type="checkbox"] {
                    width: 16px;
                    height: 16px;
                    cursor: pointer;
                    appearance: none;
                    -webkit-appearance: none;
                    border: 2px solid #aaa;
                    border-radius: 4px;
                    position: relative;
                    outline: none;
                    transition: all 0.2s ease;
                }

                .amenity-item input[type="checkbox"]:checked {
                    background-color: var(--ztc-bg-bg-3);
                    border-color: var(--ztc-bg-bg-3);
                }

                .amenity-item input[type="checkbox"]:checked::after {
                    content: '';
                    position: absolute;
                    left: 4px;
                    top: 1px;
                    width: 5px;
                    height: 9px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }

                .amenity-item input[type="checkbox"]:hover {
                    border-color: var(--ztc-bg-bg-3);
                }

                .amenity-item label {
                    margin: 0;
                    cursor: pointer;
                    font-weight: normal;
                    font-size: 14px;
                }

                .filter-group input[type="text"] {
                    width: 100%;
                    height: 52px;
                    padding: 0 16px;
                    border-radius: 80px;
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

                .advance-button {
                    background: #d9d9d9;
                    border: 0;
                    color: #1B1B1B;
                    padding: 10px 28px;
                    border-radius: 80px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    height: 56px;
                    font-size: var(--ztc-font-size-font-s14);
                    font-style: normal;
                    font-weight: var(--ztc-weight-bold);
                }

                .advance-button:hover {
                    background: var(--ztc-bg-bg-3) !important;
                    color: white;
                }

                .advance-button.active {
                    background: var(--ztc-bg-bg-3);
                    color: white;
                }

                .amenities-section {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease-out;
                }

                .amenities-section.show {
                    max-height: 500px;
                    transition: max-height 0.5s ease-in;
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
            `}</style>

<div className="space30"></div>
            <div className="others-section-area container-home1">
            
                <div className="container-fluid">
                
                    <div className="row">
                    
                        <div className="col-lg-12">
                            <div className="property-tab-section b-bg1">
                               
                                <form onSubmit={handleSearch}>
                                    <div className="tab-content1">
                                        <div className="filters mb-2 is-center">
                                            <h3 className="text-align-center size-32">Find your dream property</h3>
                                        </div>
                                        <div className="filters z-1 position-relative">
                                            <div className="d-flex flex-lg-nowrap flex-wrap gap-2 justify-content-between w-100">
                                                <div className="filter-group">
                                                    {/* <label>Keyword</label> */}
                                                    <input type="text" name="keyword" placeholder="Keyword" />
                                                </div>

                                                <div className="filter-group">
                                                    {/* <label>Status</label> */}
                                                    <select name="status" defaultValue="">
                                                        <option value="">All Status</option>
                                                        <option value="sale">For Sale</option>
                                                        <option value="rent">For Rent</option>
                                                    </select>
                                                </div>

                                                <div className="filter-group">
                                                    {/* <label>Types</label> */}
                                                    <select name="propertyType" disabled={loadingCategories}>
                                                        <option value="">
                                                            
                                                            {loadingCategories ? "Loading categories..." : "All Types"}
                                                        </option>
                                                        {categories.map((category: Category) => (
                                                            <option key={category.slug} value={category.slug}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="filter-group">
                                                    {/* <label>City</label> */}
                                                    <select name="city">
                                                        <option value="">All Cities</option>
                                                        <option value="los-angeles">Los Angeles</option>
                                                        <option value="new-york">New York</option>
                                                        <option value="miami">Miami</option>
                                                        <option value="austin">Austin</option>
                                                        <option value="chicago">Chicago</option>
                                                        <option value="atlanta">Atlanta</option>
                                                        <option value="denver">Denver</option>
                                                        <option value="seattle">Seattle</option>
                                                        <option value="nashville">Nashville</option>
                                                        <option value="newark">Newark</option>
                                                        <option value="dallas">Dallas</option>
                                                        <option value="bridgaport">Bridgaport</option>
                                                        <option value="aspen">Aspen</option>
                                                        <option value="boston">Boston</option>
                                                        <option value="phoenix">Phoenix</option>
                                                        <option value="portland">Portland</option>
                                                        <option value="san-diego">San Diego</option>
                                                        <option value="bozeman">Bozeman</option>
                                                    </select>
                                                </div>

                                                <div className="filter-group">
                                                    {/* <label>State</label> */}
                                                    <select name="state">
                                                        <option value="">All States</option>
                                                        <option value="california">California</option>
                                                        <option value="new-york">New York</option>
                                                        <option value="florida">Florida</option>
                                                        <option value="texas">Texas</option>
                                                        <option value="illinois">Illinois</option>
                                                        <option value="georgia">Georgia</option>
                                                        <option value="colorado">Colorado</option>
                                                        <option value="washington">Washington</option>
                                                        <option value="tennessee">Tennessee</option>
                                                        <option value="new-jersey">New Jersey</option>
                                                        <option value="arizona">Arizona</option>
                                                        <option value="massachusetts">Massachusetts</option>
                                                        <option value="oregon">Oregon</option>
                                                        <option value="montana">Montana</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`amenities-section ${showAdvanced ? 'show' : ''}`}>
                                            <div className="filters mb-4">
                                                <label>Amenities</label>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {amenities.map((amenity, index) => (
                                                        <div key={index} className="amenity-item">
                                                            <input
                                                                type="checkbox"
                                                                id={`amenity-${index}`}
                                                                checked={selectedAmenities.includes(amenity)}
                                                                onChange={() => handleAmenityChange(amenity)}
                                                            />
                                                            <label htmlFor={`amenity-${index}`}>
                                                                {amenity}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="filters pt-2">
                                            <div className="d-flex justify-content-between w-100">
                                                <div className="d-flex flex-wrap gap-2 align-items-center">
                                                    <div className="search-button d-flex align-items-center">
                                                        <button type="submit" >
                                                            Search Property
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <span
                                                        className={`d-flex align-items-center gap-2 advance-button ${showAdvanced ? 'active' : ''}`}
                                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                                    >
                                                        {showAdvanced ? 'Hide Advance' : 'Show Advance'}
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                                            <path d="M6.17071 18C6.58254 16.8348 7.69378 16 9 16C10.3062 16 11.4175 16.8348 11.8293 18H22V20H11.8293C11.4175 21.1652 10.3062 22 9 22C7.69378 22 6.58254 21.1652 6.17071 20H2V18H6.17071ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H22V13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H2V11H12.1707ZM6.17071 4C6.58254 2.83481 7.69378 2 9 2C10.3062 2 11.4175 2.83481 11.8293 4H22V6H11.8293C11.4175 7.16519 10.3062 8 9 8C7.69378 8 6.58254 7.16519 6.17071 6H2V4H6.17071Z" />
                                                        </svg>
                                                    </span>
                                                    <Link href="/properties" className="text-decoration-none text-primary ms-2">
                                                        Show all properties
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space30"></div>
        </>
    );
}
