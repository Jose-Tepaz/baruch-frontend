import { query } from "./strapi";
import { getLocaleWithFallback } from '@/utils/get-current-locale';
const { STRAPI_HOST } = process.env;



export  function getHomeInfo(locale?: string) {
    const currentLocale = getLocaleWithFallback(locale);
    
    // Simplificar la consulta para debugging
   
    const queryString = `home?populate[0]=banner_img&[0]=abouttitle&populate[1]=abouttitle.about_title&populate[2]=abouttitle.about_title.img_1&populate[3]=abouttitle.about_title.img_2&locale=${encodeURIComponent(currentLocale)}`;


    

    return query(queryString)
    .then(res => {
        console.log(res);
        const banner_img = `${STRAPI_HOST}${res.data.banner_img[0].url}`;
        const image_1 = `${STRAPI_HOST}${res.data.abouttitle.about_title.img_1.url}`;
        const image_2 = `${STRAPI_HOST}${res.data.abouttitle.about_title.img_2.url}`;
        res.data.banner_img = banner_img;
        res.data.abouttitle.about_title.img_1 = image_1;
        res.data.abouttitle.about_title.img_2 = image_2;
        console.log(res.data.banner_img);
        return res;

        
    });
}