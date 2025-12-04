const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export function query(url: string) {
    const fullUrl = `${STRAPI_HOST}/api/${url}`;
    
    return fetch(fullUrl, {
        headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept-Language': url.includes('locale=') ? url.split('locale=')[1].split('&')[0] : 'en',
        },
        cache: 'no-store', // Deshabilitar caché para asegurar contenido fresco
    }).then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
        }
        
        return res.json();
    }).then(data => {
        return data;
    }).catch(error => {
        // Error silencioso en producción - se propaga para manejo superior
        throw error;
    });
}
