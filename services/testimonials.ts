import { query } from "./strapi";
import { getLocaleWithFallback } from '@/utils/get-current-locale';
const { STRAPI_HOST } = process.env;

export function getTestimonials(locale?: string) {
    const currentLocale = getLocaleWithFallback(locale);
    const queryString = `testimonials?locale=${encodeURIComponent(currentLocale)}`;

    return query(queryString)
    .then(res => {
        return res.data.map((item: any) => ({
            testimonial_content: item.testimonial_content,
            name_of_client: item.name_of_client,
            position_of_client: item.position_of_client,
        }));
    });
}
