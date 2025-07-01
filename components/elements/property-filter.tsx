"use client";

import { addAmenity, addKeyword, addStatus, addPropertyType, resetFilters } from "@/features/filter/filterSlice";
import { clearAmenityFilters, toggleAmenityCheck } from "@/features/property/propertySlice";
import type { RootState } from "@/features/store";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReducer } from "react";

// Define interfaces for our data structures
interface Category {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

interface Status {
    id?: number;
    name: string;
    value?: string;
}

interface Amenity {
    id: number;
    name: string;
    value?: string;
    checked?: boolean;
}

// Reducer and hook for filter state
const initialFilterState = {
    showAdvanced: false,
    keyword: "",
    address: "",
};

type FilterState = typeof initialFilterState;
type FilterAction =
    | { type: "SET_SHOW_ADVANCED"; payload: boolean }
    | { type: "SET_KEYWORD"; payload: string }
    | { type: "SET_ADDRESS"; payload: string }
    | { type: "RESET" };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
    switch (action.type) {
        case "SET_SHOW_ADVANCED":
            return { ...state, showAdvanced: action.payload };
        case "SET_KEYWORD":
            return { ...state, keyword: action.payload };
        case "SET_ADDRESS":
            return { ...state, address: action.payload };
        case "RESET":
            return initialFilterState;
        default:
            return state;
    }
}

function usePropertyFilter() {
    const [state, dispatch] = useReducer(filterReducer, initialFilterState);
    return {
        state,
        actions: {
            setShowAdvanced: (val: boolean) => dispatch({ type: "SET_SHOW_ADVANCED", payload: val }),
            setKeyword: (kw: string) => dispatch({ type: "SET_KEYWORD", payload: kw }),
            setAddress: (addr: string) => dispatch({ type: "SET_ADDRESS", payload: addr }),
            reset: () => dispatch({ type: "RESET" }),
        },
    };
}

export default function PropertyFilter({ categories }: { categories: Category[] }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { propertyFilter } = useSelector((state: RootState) => state.filter);
    const propertyState = useSelector((state: RootState) => state.property);
    const properties = propertyState.properties || [];

    // Estado para manejar la hidratación
    const [isHydrated, setIsHydrated] = useState(false);

    // Get unique statuses from actual properties
    const statuses: Status[] = React.useMemo(() => {
        const uniqueStatuses = new Set(properties.map(property => property.status));
        return Array.from(uniqueStatuses)
            .filter(status => status)
            .sort()
            .map((status, index) => ({
                id: index + 1,
                name: status,
                value: status
            }));
    }, [properties]);

    // Get unique amenities from actual properties
    const amenities: Amenity[] = React.useMemo(() => {
        // Flatten all amenities arrays and get unique values
        const uniqueAmenities = new Set(
            properties
                .flatMap(property => property.amenities || [])
                .filter(amenity => amenity) // Remove any null/undefined values
        );

        return Array.from(uniqueAmenities)
            .sort() // Sort alphabetically
            .map((amenity, index) => ({
                id: index + 1,
                name: amenity,
                value: amenity,
                checked: propertyFilter.amenities.includes(amenity)
            }));
    }, [properties, propertyFilter.amenities]);

    // Use reducer for filter state
    const { state: filterState, actions: filterActions } = usePropertyFilter();

    // Marcar como hidratado después del primer render
    useEffect(() => {
        setIsHydrated(true);
        
        // Inicializar filtros desde los parámetros de la URL
        const category = searchParams.get('category');
        const status = searchParams.get('status');
        const keyword = searchParams.get('keyword');
        
        if (category) {
            dispatch(addPropertyType(category));
        }
        if (status) {
            dispatch(addStatus(status));
        }
        if (keyword) {
            dispatch(addKeyword(keyword));
            filterActions.setKeyword(keyword);
        }
    }, [searchParams, dispatch, filterActions]);

    // Función para actualizar la URL con los filtros
    const updateURL = (newFilters: { category?: string; status?: string; keyword?: string }) => {
        if (!isHydrated) return; // No actualizar URL hasta que esté hidratado
        
        const params = new URLSearchParams(searchParams.toString());
        
        // Actualizar o remover parámetros
        if (newFilters.category) {
            params.set('category', newFilters.category);
        } else {
            params.delete('category');
        }
        
        if (newFilters.status) {
            params.set('status', newFilters.status);
        } else {
            params.delete('status');
        }
        
        if (newFilters.keyword) {
            params.set('keyword', newFilters.keyword);
        } else {
            params.delete('keyword');
        }
        
        // Navegar a la nueva URL
        const newURL = params.toString() ? `?${params.toString()}` : '';
        router.push(`/properties${newURL}`);
    };

    useEffect(() => {
        if (filterState.keyword !== (propertyFilter.keyword || "")) {
            filterActions.setKeyword(propertyFilter.keyword || "");
        }
    }, [propertyFilter, filterState]);

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        filterActions.setKeyword(keyword);
        dispatch(addKeyword(keyword));
        updateURL({ keyword });
    };

    const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        dispatch(addPropertyType(category));
        updateURL({ category });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value;
        dispatch(addStatus(status));
        updateURL({ status });
    };

    const handleAmenityToggle = (amenityId: number, amenityValue: string) => {
        dispatch(toggleAmenityCheck(amenityId));
        dispatch(addAmenity(amenityValue));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
        dispatch(clearAmenityFilters());
        filterActions.reset();
        // Limpiar URL
        if (isHydrated) {
            router.push('/properties');
        }
    };

    // Handle form submission
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
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

                .amenity-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
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

                .amenity-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .amenity-item input[type="checkbox"] {
                    width: 16px;
                    height: 16px;
                    cursor: pointer;
                }

                .amenity-item label {
                    margin: 0;
                    cursor: pointer;
                    font-size: 14px;
                }

              `}</style>
            <div className="sidebar1-area">
                <div className="tab-content" id="pills-tabContent">
                    <form onSubmit={handleSearch}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="input-area filter-group mb-0">
                                    <input 
                                        className="mb-0" 
                                        type="text" 
                                        placeholder="Types keyword" 
                                        value={filterState.keyword} 
                                        onChange={handleKeywordChange} 
                                    />
                                </div>

                                <div className="input-area filter-group">
                                    <select 
                                        name="propertyType" 
                                        className="nice-select" 
                                        onChange={handlePropertyTypeChange} 
                                        value={propertyFilter.propertyType}
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
                                    <select name="status" className="nice-select" onChange={handleStatusChange} value={propertyFilter.status}>
                                        <option value="">All Status</option>
                                        {statuses.map((status) => (
                                            <option key={status.id} value={status.value}>
                                                {status.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="amenities-section mt-4">
                            <h5>Amenities</h5>
                            <div className="space12" />
                            <div className="d-flex flex-wrap gap-3">
                                {amenities.map((amenity) => (
                                    <div key={amenity.id} className="amenity-item">
                                        <input
                                            type="checkbox"
                                            id={`amenity-${amenity.id}`}
                                            checked={amenity.checked}
                                            onChange={() => handleAmenityToggle(amenity.id, amenity.name)}
                                        />
                                        <label htmlFor={`amenity-${amenity.id}`}>
                                            {amenity.name}
                                        </label>
                                    </div>
                                ))}
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
                            <Link href="/sidebar-grid" className="text-decoration-none text-primary">
                                Show all properties
                            </Link>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}
