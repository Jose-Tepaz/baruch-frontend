import { query } from "./strapi";
const { STRAPI_HOST } = process.env;


export function getCategories() {
    return query("categories?fields[0]=name&fields[1]=slug&fields[2]=description&populate[image][fields][0]=url")
    .then(res => {
        console.log('API Response:', JSON.stringify(res.data, null, 2));
        return res.data.map(category => {
            console.log('Category:', category);
            const {name, slug, description, image: rawimage} = category;
            console.log('Raw Image:', rawimage);
            const image = rawimage ? `${STRAPI_HOST}${rawimage.url}` : '';
            return {name, slug, description, image}
        })
    });
}