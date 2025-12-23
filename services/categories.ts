import { query } from "./strapi";
import { checkStrapiConfig } from "./config";
import { getLocaleWithFallback } from '@/utils/get-current-locale';
const { STRAPI_HOST } = process.env;

// Definir la interfaz para la categoría de la API
interface CategoryData {
    name: string;
    slug: string;
    description?: string;
    is_visible: boolean; // true if the category is visible, false if it is not
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
    const queryString = `categories?fields[0]=name&fields[1]=slug&fields[2]=description&fields[3]=is_visible&populate[image][fields][0]=url&locale=${encodeURIComponent(currentLocale)}`;

    return query(queryString)
    .then(res => {
        // Verificar que res.data existe y es un array
        if (!res.data || !Array.isArray(res.data)) {
            return [];
        }
        
        return res.data.map((category: CategoryData) => {
            const {name, slug, description, is_visible, image: rawimage} = category;
            const image = rawimage
                ? (rawimage.url.startsWith('http') ? rawimage.url : `${STRAPI_HOST}${rawimage.url}`)
                : '';
            return {name, slug, description, is_visible, image}
        })
    })
    .catch(error => {
        // Error silencioso en producción - devolver array vacío
        return [];
    });
}