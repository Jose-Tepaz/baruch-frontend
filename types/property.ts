export interface PropertyDetail {
    id: number;
    keyword: string; // This will be used as title
    images: {
        [key: string]: string;
    };
    address: string;
    city: string;
    state: string;
    status: string;
    label: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    garages: number;
    rooms: number;
    minPrice: number;
    maxPrice: number;
    minSize: number;
    maxSize: number;
    agent: {
        name: string;
        image: string;
    };
    amenities: string[];
    is_private?: boolean;
}

export interface PropertyResponse {
    success: boolean;
    data: PropertyDetail;
}

export interface PropertyListItem {
    id: number;
    keyword: string;
    images?: {
        [key: string]: string;
    };
    address: string;
    city: string;
    state: string;
    status: string;
    label: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    garages: number;
    rooms: number;
    minPrice: number;
    maxPrice: number;
    minSize: number;
    maxSize: number;
    amenities: string[];
    agent?: {
        name: string;
        image: string;
    };
    is_private?: boolean;
}

export interface Unit {
    id: number;
    housing_number: string;
    bedrooms: string;
    bathrooms: string;
    built_area: string;
    lot_area: string;
    storage_room: boolean;
    garage: boolean;
    is_available: boolean;
    price: number;
    floor?: {
        id: number;
        documentId: string;
        name: string;
        url: string;
    };
} 