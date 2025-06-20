import { query } from "./strapi";
const { STRAPI_HOST } = process.env;

export  function getHomeInfo() {
    return query("home?populate[0]=abouttitle&populate[1]=abouttitle.about_title&populate[2]=abouttitle.about_title.img_1&populate[3]=abouttitle.about_title.img_2")
    .then(res => {
        console.log(res);
        const image_1 = `${STRAPI_HOST}${res.data.abouttitle.about_title.img_1.url}`;
        const image_2 = `${STRAPI_HOST}${res.data.abouttitle.about_title.img_2.url}`;
        res.data.abouttitle.about_title.img_1 = image_1;
        res.data.abouttitle.about_title.img_2 = image_2;
        return res;
    });
}