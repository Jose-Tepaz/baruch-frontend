import { query } from "./strapi";
import { getLocaleWithFallback } from '@/utils/get-current-locale';
const { STRAPI_HOST } = process.env;

export function getHomeInfo(locale?: string) {
    const currentLocale = getLocaleWithFallback(locale);
    
    // Arreglar la consulta para populizar correctamente why_choose_us
    const queryString = `home?populate[0]=banner_img&populate[1]=abouttitle&populate[2]=abouttitle.about_title&populate[3]=abouttitle.about_title.img_1&populate[4]=abouttitle.about_title.img_2&populate[5]=why_choose_us&populate[6]=why_choose_us.img_1&populate[7]=why_choose_us.img_2&locale=${encodeURIComponent(currentLocale)}`;

    return query(queryString)
    .then(res => {
        
        
        // Validar y construir URLs de manera segura
        const banner_img = res.data.banner_img?.[0]?.url 
            ? `${STRAPI_HOST}${res.data.banner_img[0].url}` 
            : null;
            
        const image_1 = res.data.abouttitle?.about_title?.img_1?.url 
            ? `${STRAPI_HOST}${res.data.abouttitle.about_title.img_1.url}` 
            : null;
            
        const image_2 = res.data.abouttitle?.about_title?.img_2?.url 
            ? `${STRAPI_HOST}${res.data.abouttitle.about_title.img_2.url}` 
            : null;
            
        // Arreglar el acceso a las imágenes de why_choose_us
        const image_1_why = res.data.why_choose_us?.img_1?.url 
            ? `${STRAPI_HOST}${res.data.why_choose_us.img_1.url}` 
            : null;
            
        const image_2_why = res.data.why_choose_us?.img_2?.url 
            ? `${STRAPI_HOST}${res.data.why_choose_us.img_2.url}` 
            : null;

        // Actualizar los datos solo si existen
        if (banner_img) res.data.banner_img = banner_img;
        if (image_1) res.data.abouttitle.about_title.img_1 = image_1;
        if (image_2) res.data.abouttitle.about_title.img_2 = image_2;
        if (image_1_why) res.data.why_choose_us.img_1 = image_1_why;
        if (image_2_why) res.data.why_choose_us.img_2 = image_2_why;

        
        return res;
    });
}