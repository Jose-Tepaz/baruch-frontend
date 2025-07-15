import { query } from './strapi'
import { getLocaleWithFallback } from '@/utils/get-current-locale'

const { STRAPI_HOST } = process.env

interface PropertyStatus {
  id: number
  documentId: string
  Title: string
}

interface PropertyData {
  id: number
  title: string
  description: string
  price: number
  address: string
  main_image?: {
    url: string
  }
  slug: string
  documentId: string
  property_status: PropertyStatus
  category: any
}

export function getProperties(
    { categoryId, locale }: 
    { categoryId?: string; locale?: string }
) {
    console.log('=== get-properties.ts: Function called with params ===');
    console.log('=== get-properties.ts: categoryId:', categoryId);
    console.log('=== get-properties.ts: locale (input):', locale);
    
    const currentLocale = getLocaleWithFallback(locale);
    console.log('=== get-properties.ts: currentLocale (after fallback):', currentLocale);
    
    let queryString = `properties?populate=main_image&populate=property_status&populate=category&pagination[limit]=100&locale=${encodeURIComponent(currentLocale)}`;
    
    // Solo agregar filtro de categoría si se proporciona categoryId
    if (categoryId && categoryId.trim() !== '') {
        queryString += `&filters[category][slug][$contains]=${categoryId}`;
    }
    
    // Solo mostrar logs en desarrollo
    if (process.env.NODE_ENV === 'development') {
        console.log('=== get-properties.ts DEBUG ===');
        console.log('CategoryId:', categoryId || 'ALL');
        console.log('Locale:', currentLocale);
        console.log('Query string:', queryString);
        console.log('Full URL:', `${process.env.STRAPI_HOST}/api/${queryString}`);
        console.log('SERVER/CLIENT:', typeof window !== 'undefined' ? 'CLIENT' : 'SERVER');
    }
    
    return query(queryString)
    .then(res => {
        if (process.env.NODE_ENV === 'development') {
            console.log('=== get-properties.ts API Response ===');
            console.log('Data count:', res.data?.length || 0);
        }
        
        if (!res || !res.data) {
            if (process.env.NODE_ENV === 'development') {
                console.log('Invalid response structure:', res);
            }
            return { properties: [], pagination: res?.meta?.pagination || {} };
        }
        
        if (!Array.isArray(res.data)) {
            if (process.env.NODE_ENV === 'development') {
                console.log('Response data is not an array:', res.data);
            }
            return { properties: [], pagination: res?.meta?.pagination || {} };
        }
        
        if (res.data.length === 0) {
            if (process.env.NODE_ENV === 'development') {
                console.log('No properties found in response');
            }
            return { properties: [], pagination: res?.meta?.pagination || {} };
        }
        
        const { data, meta } = res
        const properties = data.map((property: PropertyData) => {
            const {
                id,
                title,
                description,
                price,
                address,
                main_image: rawimage,
                slug,
                documentId,
                property_status,
                category
            } = property

            const image = rawimage ? `${STRAPI_HOST}${rawimage.url}` : ''
            const propertyStatus = property_status?.Title || ''
            
            if (process.env.NODE_ENV === 'development') {
                console.log('=== get-properties.ts Property Mapping ===');
                console.log('Property title:', title);
                console.log('Property status:', propertyStatus);
                console.log('Category:', category);
            }

            return {
                id,
                title,
                description,
                price,
                address,
                image,
                slug,
                documentId,
                propertyStatus,
                category
            }
        })

        return {
            properties,
            pagination: meta.pagination
        }
    })
    .catch(error => {
        console.error('=== get-properties.ts Error ===', error);
        return { properties: [], pagination: {} };
    })
}
