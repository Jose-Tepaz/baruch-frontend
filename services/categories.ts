import { query } from "./strapi";
import { checkStrapiConfig } from "./config";
import { getLocaleWithFallback } from '@/utils/get-current-locale';
const { STRAPI_HOST } = process.env;

// Definir la interfaz para la categoría de la API
interface CategoryData {
    name: string;
    slug: string;
    description?: string;
    image?: {
        url: string;
    };
}

export function getCategories(locale?: string) {
    // Verificar configuración antes de hacer la llamada
    if (!checkStrapiConfig()) {
        throw new Error('Strapi configuration is missing. Please check your environment variables.');
    }

    const currentLocale = getLocaleWithFallback(locale);
    const queryString = `categories?fields[0]=name&fields[1]=slug&fields[2]=description&populate[image][fields][0]=url&locale=${encodeURIComponent(currentLocale)}`;
    
    console.log('=== getCategories DEBUG ===');
    console.log('Locale:', currentLocale);
    console.log('Query string:', queryString);

    return query(queryString)
    .then(res => {
        console.log('Categories API Response:', JSON.stringify(res.data, null, 2));
        return res.data.map((category: CategoryData) => {
            const {name, slug, description, image: rawimage} = category;
            const image = rawimage ? `${STRAPI_HOST}${rawimage.url}` : '';
            return {name, slug, description, image}
        })
    })
    .catch(error => {
        console.error('Error in getCategories:', error);
        throw error;
    });
}