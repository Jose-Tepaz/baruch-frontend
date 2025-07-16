"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";

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

interface SearchBoxProps {
    categories?: Category[];
    propertyStatuses?: PropertyStatus[];
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

export default function SearchBox({ categories = fallbackCategories, propertyStatuses = [] }: SearchBoxProps) {
    const router = useRouter();
    const params = useParams();
    const lang = params.lang as string;
    const { t, i18n } = useTranslation('common');
    // Handle form submission
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        // Get search criteria
        const searchCriteria = {
            keyword: formData.get("keyword") as string,
            property_status: formData.get("property_status") as string,
            category: formData.get("category") as string,
        };

        // Build query string
        const params = new URLSearchParams();

        console.log('=== SearchBox Form Submission ===');
        console.log('Language:', lang);
        console.log('Search criteria:', searchCriteria);

        // Add non-empty parameters to URL
        Object.entries(searchCriteria).forEach(([key, value]) => {
            if (value && value.trim() !== '') {
                params.append(key, value);
            }
        });

        const finalUrl = `/${lang}/properties?${params.toString()}`;
        console.log('Final URL:', finalUrl);
        console.log('URL parameters:', params.toString());

        // Navigate to properties page with query parameters
        router.push(finalUrl);
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
                                            <h3 className="text-align-center size-32">{t('home.title-filter')}</h3>
                                        </div>
                                        
                                      
                                        
                                        <div className="filters z-1 position-relative">
                                            <div className="d-flex flex-lg-nowrap flex-wrap gap-2 justify-content-between w-100">
                                                

                                                <div className="filter-group">
                                                    <select name="property_status" defaultValue="">
                                                        <option value="">{t('home.title-filter-1')}</option>
                                                        {propertyStatuses.map((status) => (
                                                            <option key={status.documentId} value={status.Title}>
                                                                {status.Title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="filter-group">
                                                    <select name="category">
                                                        <option value="">{t('home.title-filter-2')}</option>
                                                        {categories.map((category: Category) => (
                                                            <option key={category.slug} value={category.slug}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="search-button d-flex align-items-center">
                                                        <button type="submit">
                                                            {t('home.btn-filter')}
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </button>
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="filters pt-2">
                                            <div className="d-flex justify-content-between w-100">
                                                <div className="d-flex flex-wrap gap-2 align-items-center">
                                                   
                                                    <Link href={`/${lang}/properties`} className="text-decoration-none text-primary ms-2">
                                                        {t('home.btn-all-properties')}
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
